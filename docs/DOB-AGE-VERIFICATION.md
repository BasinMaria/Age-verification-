# 🎂 DOB — Верификация возраста (Date of Birth)

> **Проверка возраста через DOB = ОБЯЗАТЕЛЬНА для ВСЕХ способов регистрации.**
> Неважно как пользователь входит (email, Google, Facebook, Apple) — он ВСЕГДА видит форму DOB.

---

## Закон

| Закон | Требование |
|---|---|
| COPPA (США) | Дети < 13 — нельзя собирать данные без родителей |
| GDPR Art. 8 (ЕС) | Возраст цифрового согласия 13-16 (по странам) |
| CAADCA (Калифорния) | Максимальная приватность для < 18. DOB self-declaration ≠ age estimation technology (разрешено) |
| Apple §1.1 / Google | Если контент 18+ — нужна проверка возраста |

---

## Полный поток регистрации (email)

```
1. «Создать аккаунт» (Sign Up)
       │
       ▼
2. Ввод: Email, Имя, Пароль
       │
       ▼
3. Показываем экран DOB (дата рождения)
       │
       ▼
4. Рассчитать возраст:
       │
       ├── ≥ 18 → Создать аккаунт → Welcome Screen (ПОТОК 1)
       │
       └── < 18 → Экран отказа → СТОП
```

> ⚠️ **GeoIP проверка (определение страны) происходит на уровне инфраструктуры (Cloudflare), а НЕ на экране регистрации.** Если пользователь из заблокированной страны — Cloudflare заблокирует его ещё ДО того как он увидит форму регистрации. В мобильном приложении — Backend API проверяет `CF-IPCountry` при первом запуске. Подробнее → [BLOCKED-COUNTRIES.md](./BLOCKED-COUNTRIES.md)

---

## Вход через Google / Facebook / Apple

```
1. Нажимает «Sign in with Google/Facebook/Apple»
       │
       ▼
2. Проходит OAuth авторизацию
       │
       ▼
3. Backend проверяет: есть ли DOB у этого пользователя?
       │
       ├── ДА (уже зарегистрирован) → пропустить DOB → вход
       │
       └── НЕТ (первый раз) → Показать экран DOB
              │
              ├── ≥ 18 → Создать аккаунт → Welcome Screen (ПОТОК 1)
              └── < 18 → Экран отказа → СТОП
```

---

## 🖥️ DOB экран — тексты

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Enter your birthdate | `enter_your_birthdate` |
| **Subtitle** | To help keep Bestme safe, we require your birthdate. | `dob_explanation_security` |
| **Privacy note** | Your birthdate won't be visible on your profile. | `birthdate_not_visible_on_profile` |
| **Microcopy** | 🔒 Your date of birth is stored securely and is never shown on your profile. | `dob_stored_securely_never_shown` |
| **Button** | Add birthdate | `add_birthdate` |

---

## 📅 Нейтральный Date Picker

| Платформа | Компонент | Требования |
|---|---|---|
| iOS | `UIDatePicker` (.wheels или .inline) | Календарь **НЕ** открывается на дате 18 лет назад |
| Android | `MaterialDatePicker` | Стандартный Material, дата по умолчанию = сегодня |
| Web | `<input type="date">` | Пустое поле, без pre-fill |

---

## 🛑 Правило «Без подсказок» (Neutral Age Gate)

| ❌ ЗАПРЕЩЕНО | ✅ РАЗРЕШЕНО |
|---|---|
| Упоминание «18+» или «must be 18» | Нейтральный заголовок «Enter your birthdate» |
| «Birthday bonuses» подсказки | Microcopy «stored securely, never shown» |
| Календарь открыт на 18 лет назад | Пустой календарь / сегодняшняя дата |
| Валидация в реальном времени | Ошибка ПОСЛЕ нажатия кнопки |

---

## ❌ Экран отказа (< 18)

| Элемент | Текст (EN) | Ключ |
|---|---|---|
| **Title** | We're sorry | `sorry_18_plus_only_title` |
| **Body** | Unfortunately, Bestme is available only for users aged 18 and older. | `sorry_18_plus_only_body` |
| **Button** | OK | `ok_button` |

**После отказа:**
1. Аккаунт НЕ создаётся
2. Anti-retry: cookie/localStorage + email в «серый список»
3. Redirect на стартовый экран
4. Повторная попытка с тем же email → мгновенный отказ без упоминания возраста

### Экран мгновенного отказа (повторная попытка)

| Элемент | Текст (EN) | Ключ |
|---|---|---|
| **Title** | Registration not available | `registration_not_available` |
| **Body** | Unfortunately, registration is currently not available. Please try again later. | `registration_not_available_body` |
| **Button** | OK | `ok_button` |

> Текст **НЕ упоминает возраст** — чтобы не давать подсказку.

---

## 🔐 Хранение DOB

| Данные | Хранить? | Как | Закон |
|---|---|---|---|
| **DOB (полная дата)** | ✅ Зашифрованной (AES-256-GCM) | `dob_encrypted` в БД | GDPR Art. 32 |
| **age_bracket** | ✅ Открыто | `"18-24"`, `"25-34"`, `"35-44"`, `"45+"` | — |
| **country** | ✅ Открыто | ISO 3166-1 alpha-2 | — |

**Цели хранения DOB:**
1. Проверка возраста 18+
2. Персонализация контента по возрастной группе
3. Бонусы/поздравления в День Рождения

**Правовое основание:** GDPR Art. 6(1)(a) — согласие + Art. 6(1)(b) — договор

---

## 🔒 Шифрование

- **Ключ:** AES-256-GCM, ключ в KMS / Vault / env variable (НЕ в коде)
- **Шифрование на уровне приложения** (application-level encryption)
- DOB расшифровывается только в RAM, никогда не в SQL
- DOB **ЗАПРЕЩЁН** в логах, аналитике (Firebase, Mixpanel, GA) — только `age_bracket`

---

## Anti-retry + device/server lock

- Cookie/localStorage: `dob_rejected = true`
- Email в серый список на сервере
- При повторной попытке → мгновенный отказ без упоминания возраста
- Сброс cookie не помогает если email в сером списке

Подробнее о хранении и шифровании → [DATA-STORAGE.md](./DATA-STORAGE.md)
