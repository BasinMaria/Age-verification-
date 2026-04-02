← Назад к [COMPLIANCE.md](../COMPLIANCE.md)

# 💾 Хранение данных и шифрование

> **Основание:** [GDPR Art. 32](https://gdpr-info.eu/art-32-gdpr/) — закон требует защищать персональные данные от утечек соразмерными техническими мерами.
> Извлечено из [COMPLIANCE.md](../COMPLIANCE.md), Секция 8.

---

## Какие данные хранить, какие удалять

| Данные | Хранить? | Причина | Закон |
|---|---|---|---|
| **Дата рождения** | ✅ **ХРАНИТЬ ЗАШИФРОВАННОЙ** | Цели: 1) проверка возраста 18+, 2) персонализация контента по возрастной группе, 3) бонусы/поздравления в День Рождения. **Encryption at rest** (AES-256). Правовое основание: согласие Art. 6(1)(a) + договор Art. 6(1)(b) | [GDPR Art. 32](https://gdpr-info.eu/art-32-gdpr/), [Art. 6](https://gdpr-info.eu/art-6-gdpr/) |
| **Возрастная группа** (`age_bracket`: `"18-24"`, `"25-34"`, `"35-44"`, `"45+"`) | ✅ Да | Контроль доступа, рекомендации AI, аналитика (быстрый доступ без расшифровки DOB) | — |
| **Страна** (код) | ✅ Да | Определение юрисдикции | — |
| **IP-адрес** | ❌ **НЕ ХРАНИТЬ** после GeoIP | IP = персональные данные | [GDPR Recital 30](https://gdpr-info.eu/recitals/no-30/) |

> **Подробности о DOB-верификации и формах см.** [DOB-AGE-VERIFICATION.md](DOB-AGE-VERIFICATION.md)

---

## Что шифровать по закону (GDPR Art. 32)

| Данные | Шифровать? | Обоснование |
|---|---|---|
| **Дата рождения** (`dob_encrypted`) | ✅ **ДА — обязательно** | PII — по дате + имени можно идентифицировать личность. Используем AES-256-GCM |
| **Email** | ⚠️ **Нет** (но защитить доступ) | Email нужен для входа — Supabase Auth хранит его в `auth.users`. Supabase уже шифрует данные at rest на уровне диска (AES-256). **Защита**: RLS + запретить доступ к `auth.users` через API |
| **Пароль** | ✅ **Автоматически** | Supabase Auth хэширует пароли (bcrypt) |
| **Имя пользователя** | ⚠️ **Нет** | Имя — публичное (отображается в профиле) |
| **Фото профиля** | ❌ **Нет** | Публичное — не PII в контексте шифрования |
| **Личные сообщения (чат)** | ⚠️ **Рекомендуется E2E** | GDPR Art. 32 рекомендует. Для MVP — Supabase at-rest encryption достаточно. Для v2 — E2E шифрование |
| **IP-адрес** | ❌ **Не хранить** | Используем только для GeoIP, после чего удаляем. В БД хранится только `country` |
| **age_bracket** | ❌ **Нет** | Обобщённая группа ("25-34") — не PII |
| **country** | ❌ **Нет** | Двухбуквенный код страны — не PII |

> **Итого: шифровать вручную нужно ТОЛЬКО `dob_encrypted`.** Остальное защищается:
> - Supabase **Disk Encryption** (AES-256 at rest — включено по умолчанию)
> - **RLS** (Row Level Security) — каждый пользователь видит только свои данные
> - **SSL/TLS** — все соединения зашифрованы в транзите
> - **Supabase Auth** — пароли хэшируются автоматически

---

## Supabase — подходы к шифрованию DOB

> Мы используем **Supabase** (PostgreSQL + Auth + Edge Functions + Vault).

| Подход | Как работает | Плюсы | Минусы |
|---|---|---|---|
| **A) Supabase Vault** (рекомендуется) | Встроенный менеджер секретов Supabase. Шифрование выполняется расширением `pgsodium` прямо в PostgreSQL | Ключи управляются Supabase, не нужно писать свой код шифрования, шифрование на уровне БД | Привязка к инфраструктуре Supabase |
| **B) Application-Level Encryption** (Edge Function) | Шифруем DOB в Edge Function (серверный код) перед записью в Supabase | Ключ полностью под твоим контролем, можно мигрировать | Нужно писать код шифрования самому |

### Подход A — Supabase Vault (рекомендуемый)

```sql
-- 1. Включить расширения (Supabase Dashboard → Database → Extensions)
CREATE EXTENSION IF NOT EXISTS pgsodium;
CREATE EXTENSION IF NOT EXISTS supabase_vault;

-- 2. Создать секретный ключ в Vault
SELECT vault.create_secret(
  'my-dob-encryption-key-256bit-here',  -- 32-байтовый ключ (генерировать: openssl rand -hex 32)
  'dob_encryption_key',                 -- имя секрета
  'Ключ для шифрования даты рождения'   -- описание
);

-- 3. Таблица users — поле dob_encrypted хранит зашифрованный bytea
ALTER TABLE users ADD COLUMN dob_encrypted bytea;

-- 4. Запись: шифрование при INSERT
INSERT INTO users (id, dob_encrypted, age_bracket, country)
VALUES (
  auth.uid(),
  pgsodium.crypto_aead_det_encrypt(
    convert_to('1990-05-15', 'utf8'),           -- открытый текст (DOB)
    convert_to(auth.uid()::text, 'utf8'),        -- associated data (привязка к user_id)
    (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'dob_encryption_key')::uuid
  ),
  '25-34',
  'US'
);

-- 5. Чтение: расшифровка (ТОЛЬКО в cron job для birthday check)
SELECT convert_from(
  pgsodium.crypto_aead_det_decrypt(
    dob_encrypted,
    convert_to(id::text, 'utf8'),
    (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'dob_encryption_key')::uuid
  ),
  'utf8'
) AS dob_plaintext
FROM users
WHERE id = '<user_id>';
```

### Подход B — Application-Level Encryption (Edge Function)

```typescript
// supabase/functions/register-user/index.ts
import { createClient } from '@supabase/supabase-js'

const ENCRYPTION_KEY = Deno.env.get('DOB_ENCRYPTION_KEY')!

async function encryptDOB(dob: string): Promise<string> {
  const keyBytes = new TextEncoder().encode(ENCRYPTION_KEY)
  if (keyBytes.length !== 32) {
    throw new Error('DOB_ENCRYPTION_KEY must be exactly 32 bytes (256 bits)')
  }
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    false,
    ['encrypt']
  )
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(dob)
  )
  const combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length)
  combined.set(iv)
  combined.set(new Uint8Array(encrypted), iv.length)
  return btoa(String.fromCharCode(...combined))
}

async function decryptDOB(encryptedBase64: string): Promise<string> {
  const combined = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0))
  const iv = combined.slice(0, 12)
  const ciphertext = combined.slice(12)
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(ENCRYPTION_KEY),
    { name: 'AES-GCM' },
    false,
    ['decrypt']
  )
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  )
  return new TextDecoder().decode(decrypted)
}
```

### Где хранить ключ шифрования

| Хранилище | Как добавить |
|---|---|
| **Supabase Vault** (подход A) | Dashboard → Settings → Vault → «Add new secret» → имя: `dob_encryption_key` |
| **Edge Function Secrets** (подход B) | Dashboard → Edge Functions → выбрать функцию → Secrets → `DOB_ENCRYPTION_KEY` = `<32-hex-chars>` |
| **❌ НЕ ХРАНИТЬ** в коде | Запрещено класть ключ в `.env` файл, который коммитится в Git |
| **❌ НЕ ХРАНИТЬ** в таблице Supabase | Ключ не должен лежать в той же БД, что и зашифрованные данные |

---

## `age_bracket` — как вычислять

**Что это:** обобщённая возрастная группа пользователя (когорта). НЕ точный возраст.

| Цель | Почему `age_bracket`, а не `dob_encrypted` |
|---|---|
| **Рекомендации AI** | Алгоритм подбора контента получает `"25-34"` — этого достаточно для персонализации. Передавать точную DOB алгоритму — нарушение GDPR Art. 5 (минимизация) |
| **Аналитика** | Внутренний дашборд показывает: «60% пользователей — 18-24». Для этого не нужна точная DOB |
| **Быстрый доступ** | Не нужно расшифровывать DOB каждый раз. `age_bracket` — открытое поле, SQL-запросы работают мгновенно |

```typescript
function calculateAgeBracket(dob: string): string {
  const birthDate = new Date(dob)
  if (isNaN(birthDate.getTime())) {
    throw new Error(`Invalid date of birth: ${dob}`)
  }
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  if (age >= 18 && age <= 24) return '18-24'
  if (age >= 25 && age <= 34) return '25-34'
  if (age >= 35 && age <= 44) return '35-44'
  return '45+'
}
```

| Момент | Что делать |
|---|---|
| **Регистрация** | Вычислить `age_bracket` из открытой DOB → записать в `users.age_bracket` |
| **День рождения (раз в год)** | Cron job: расшифровать DOB → пересчитать `age_bracket` → обновить (если когорта изменилась) |

```sql
ALTER TABLE users ADD COLUMN age_bracket text
  CHECK (age_bracket IN ('18-24', '25-34', '35-44', '45+'));
```

---

## `country` — определение через Cloudflare + Supabase

```
Пользователь открывает приложение
        │
        ▼
Запрос проходит через Cloudflare (Supabase использует CF)
        │
        ▼
Cloudflare добавляет заголовок: CF-IPCountry: US
        │
        ▼
Edge Function читает заголовок
        │
        ▼
Сохраняет в users.country = "US"
(IP НЕ сохраняется)
```

```typescript
// supabase/functions/register-user/index.ts
Deno.serve(async (req) => {
  const country = req.headers.get('cf-ipcountry') || 'XX'

  const BLOCKED_COUNTRIES = ['GB', 'AU', 'BR', 'CN', 'KR', 'MY', 'RU', 'BY', 'TM']
  if (BLOCKED_COUNTRIES.includes(country)) {
    return new Response(JSON.stringify({
      error: 'country_blocked',
      message: 'Service is not available in your region'
    }), { status: 403 })
  }

  // Сохранить country в таблицу users
  // ...
})
```

---

## Полная схема таблицы `users`

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),

  -- Персональные данные
  name text NOT NULL,

  -- 🔐 Зашифрованная DOB
  dob_encrypted bytea NOT NULL,

  -- 📊 Возрастная когорта (НЕ зашифрована)
  age_bracket text NOT NULL CHECK (age_bracket IN ('18-24', '25-34', '35-44', '45+')),

  -- 🌍 Страна (НЕ зашифрована)
  country char(2) NOT NULL,

  -- Профиль
  profile_visibility text NOT NULL DEFAULT 'private'
    CHECK (profile_visibility IN ('private', 'public')),

  -- Статус аккаунта
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'scheduled_for_deletion', 'deleted')),
  deletion_requested_at timestamptz,
  deletion_scheduled_for timestamptz,

  -- Push-уведомления
  push_notifications_enabled boolean NOT NULL DEFAULT false,

  -- Метки времени
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS: каждый пользователь видит только свои данные
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

---

## Cron Job — ежедневная проверка дней рождения

### Вариант A — pg_cron (рекомендуется для Supabase Pro)

```sql
CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE OR REPLACE FUNCTION daily_birthday_check()
RETURNS void AS $$
DECLARE
  user_record RECORD;
  decrypted_dob text;
  today_mmdd text;
BEGIN
  today_mmdd := to_char(NOW(), 'MM-DD');

  FOR user_record IN
    SELECT id, dob_encrypted FROM users WHERE status = 'active'
  LOOP
    decrypted_dob := convert_from(
      pgsodium.crypto_aead_det_decrypt(
        user_record.dob_encrypted,
        convert_to(user_record.id::text, 'utf8'),
        (SELECT decrypted_secret FROM vault.decrypted_secrets
         WHERE name = 'dob_encryption_key')::uuid
      ), 'utf8'
    );

    IF substring(decrypted_dob FROM 6 FOR 5) = today_mmdd THEN
      INSERT INTO birthday_bonuses (user_id, bonus_date, bonus_type)
      VALUES (user_record.id, NOW(), 'birthday_2026');

      PERFORM net.http_post(
        'https://<project>.supabase.co/functions/v1/send-birthday-push',
        jsonb_build_object('user_id', user_record.id)::text,
        'application/json'
      );
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

SELECT cron.schedule(
  'daily-birthday-check',
  '0 6 * * *',
  $$ SELECT daily_birthday_check(); $$
);
```

### Вариант B — Edge Function (для Supabase Free)

```typescript
// supabase/functions/daily-birthday-check/index.ts
Deno.serve(async (req) => {
  const authHeader = req.headers.get('Authorization')
  if (authHeader !== `Bearer ${Deno.env.get('CRON_SECRET')}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const { data: users } = await supabase
    .from('users')
    .select('id, dob_encrypted')
    .eq('status', 'active')

  const todayMMDD = new Date().toISOString().slice(5, 10)

  for (const user of users || []) {
    const dob = await decryptDOB(user.dob_encrypted)
    const dobMMDD = dob.slice(5, 10)

    if (dobMMDD === todayMMDD) {
      await supabase.from('birthday_bonuses').insert({
        user_id: user.id,
        bonus_date: new Date().toISOString(),
        bonus_type: 'birthday_2026'
      })
    }
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
})
```

---

## IP-адрес и сессии

**Сессия НЕ привязана к IP-адресу.** Это разные вещи:

```
IP-адрес = адрес сети, откуда пришёл запрос.
             Используется ТОЛЬКО для GeoIP (определить страну).
             После определения страны — УДАЛЯЕТСЯ.

Сессия = авторизованный вход пользователя.
             Поддерживается через ТОКЕН (JWT) или COOKIE.
             НЕ зависит от IP-адреса.
```

**Как работает сессия без хранения IP:**

```
1. Пользователь регистрируется / входит
       │
       ▼
2. Сервер создаёт ТОКЕН (JWT или session ID)
       │
       ▼
3. Токен отправляется пользователю (в cookie или в ответе API)
       │
       ▼
4. При каждом следующем запросе пользователь отправляет ТОКЕН
       │
       ▼
5. Сервер проверяет токен → знает кто это → даёт доступ
       │
       ▼
   IP-адрес вообще НЕ участвует в сессии!
```

```javascript
// При входе — создаём JWT токен
const token = jwt.sign(
  { userId: user.id, ageBracket: '18+', country: 'US' },
  SECRET_KEY,
  { expiresIn: '30d' }
);
res.cookie('session', token, { httpOnly: true, secure: true });

// При каждом запросе — проверяем токен (НЕ IP)
function authMiddleware(req, res, next) {
  const token = req.cookies.session;
  const decoded = jwt.verify(token, SECRET_KEY);
  req.user = decoded;
  next();
}
```

---

## GDPR — права пользователей на данные

| Право | Статья GDPR | Что должно быть в приложении | Линк |
|---|---|---|---|
| **Право на удаление** (right to erasure) | Art. 17 | Кнопка «Удалить мой аккаунт» → удаляет ВСЕ данные пользователя | [Art. 17](https://gdpr-info.eu/art-17-gdpr/) |
| **Право на доступ** (right of access) | Art. 15 | Пользователь может запросить копию ВСЕХ своих данных. Реализовать: экспорт в JSON/CSV | [Art. 15](https://gdpr-info.eu/art-15-gdpr/) |
| **Право на исправление** | Art. 16 | Пользователь может изменить свои данные (имя, email и т.д.) | [Art. 16](https://gdpr-info.eu/art-16-gdpr/) |
| **Право на перенос данных** | Art. 20 | Пользователь может забрать свои данные (тот же экспорт JSON) | [Art. 20](https://gdpr-info.eu/art-20-gdpr/) |
| **Уведомление о утечке** | Art. 33 | Если утечка → уведомить регулятор в 72 часа, пользователей — без задержки | [Art. 33](https://gdpr-info.eu/art-33-gdpr/) |

---

## Важные правила безопасности

- DOB хранится **ЗАШИФРОВАННОЙ** в базе данных (AES-256, encryption at rest — GDPR Art. 32)
- DOB НЕ должна попадать в логи, аналитику, бэкапы **в открытом виде**
- Настроить фильтрацию логов (Sanitization) — DOB никогда не записывается в логи
- IP-адрес не должен попадать в логи надолго — ротация логов (макс. 7 дней) или маскировка IP
- Ежедневный **cron job** проверяет именинников → бонусные баллы + Push

---

## Чеклист для разработчика

| # | Задача | Где в Supabase | Статус |
|---|---|---|---|
| 1 | Включить расширение `pgsodium` + `supabase_vault` | Database → Extensions | ☐ |
| 2 | Создать ключ шифрования в Vault | Settings → Vault | ☐ |
| 3 | Добавить поле `dob_encrypted` (bytea) в таблицу `users` | Database → SQL Editor | ☐ |
| 4 | Добавить поле `age_bracket` (text с CHECK) | Database → SQL Editor | ☐ |
| 5 | Добавить поле `country` (char(2)) | Database → SQL Editor | ☐ |
| 6 | Edge Function для регистрации: age_bracket → шифровать DOB → country | Edge Functions | ☐ |
| 7 | Настроить RLS на таблицу `users` | Database → Policies | ☐ |
| 8 | Настроить cron job `daily_birthday_check` | Database → Extensions | ☐ |
| 9 | **Никогда** не логировать DOB, не передавать в аналитику | Код-ревью | ☐ |

---

> **Связанные документы:**
> - [COMPLIANCE.md](../COMPLIANCE.md) — основной документ
> - [DOB-AGE-VERIFICATION.md](DOB-AGE-VERIFICATION.md) — верификация возраста через DOB
> - [DEVELOPER-CHECKLIST.md](DEVELOPER-CHECKLIST.md) — единый чеклист разработчика
