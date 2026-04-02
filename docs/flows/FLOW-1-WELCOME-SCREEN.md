# 🔵 ПОТОК 1: Welcome Screen — Privacy Defaults + Profile Visibility Choice

| | |
|---|---|
| **Цель** | 1) Проинформировать пользователя, что его профиль ПРИВАТНЫЙ по умолчанию (требование CAADCA). 2) Дать ему ВЫБОР сделать профиль публичным. 3) Показать ссылки на ToS и Privacy Policy |
| **Закон** | [GDPR Art. 25(2)](https://gdpr-info.eu/art-25-gdpr/) — «Data protection by default» + [CAADCA (AB 2273)](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273) — «максимальные настройки приватности по умолчанию» |
| **Платформы** | iOS и Android — одинаковый экран на обеих платформах |
| **Триггер** | Показывается **1 раз** сразу после успешной регистрации, **ПЕРЕД** лентой (Feed) |
| **Блокировка** | Пользователь **НЕ МОЖЕТ** пользоваться приложением, пока не нажмёт кнопку «I understand, continue». Нельзя закрыть, нельзя свайпнуть, нет кнопки «назад» |
| **После нажатия** | Переход на Feed (лента). Экран больше **НИКОГДА** не показывается этому пользователю |

---

## 🖥️ Frontend: тексты, ключи переводов, что нарисовать дизайнеру

| Элемент | Текст (EN) | Ключ перевода | Заметка для дизайнера |
|---|---|---|---|
| **Title** | Welcome to Bestme | `welcome_to_bestme` | Крупный заголовок, вверху экрана |
| **Body 1** | Your profile is **private** by default. Only your username is visible to others. | `profile_private_by_default` | Жирным выделить "private" |
| **Body 2** | Your email, phone number, and date of birth are **always** hidden from other users. | `email_phone_dob_always_hidden` | Жирным выделить "always" |
| **Toggle** | Make my profile public (your name, photos, and posts will be visible to all members) | `make_profile_public_toggle` | Toggle/switch — **ВЫКЛЮЧЕН по умолчанию** (OFF). При включении: `profile_visibility = "public"`. При выключении: остаётся `"private"` |
| **Подпись под toggle** | You can change this at any time in Settings → Privacy & Visibility | `change_in_settings_privacy_visibility` | Мелкий текст под toggle. **НЕ делать кликабельной ссылкой** на этом экране — это только информирование |
| **Primary Button** | I understand, continue | `i_understand_continue` | Кнопка работает и с toggle ON и с toggle OFF |
| **Footer** | By continuing, you acknowledge our [Terms of Service] and [Privacy Policy]. | `by_continuing_acknowledge_terms_privacy` | Мелкий текст. `[Terms of Service]` и `[Privacy Policy]` = кликабельные ссылки |

> **Почему "acknowledge" а не "agree":** "acknowledge" = «я ознакомлен» — безопаснее юридически. Оба варианта законны.

---

## ⚙️ Логика Frontend (для программиста)

```
1. Пользователь завершил регистрацию (DOB проверен, >= 18)
       │
       ▼
2. Backend создаёт пользователя с profile_visibility = "private"  ← ОБЯЗАТЕЛЬНО (CAADCA)
       │
       ▼
3. Показать Welcome Screen (ПОТОК 1)
   • Экран блокирует навигацию — нельзя закрыть, нельзя перейти куда-либо
   • Toggle «Make my profile public» = OFF по умолчанию
       │
       ▼
4. Пользователь нажимает «I understand, continue»
       │
       ├── Toggle был ON? → PATCH /api/users/me { profile_visibility: "public" }
       │
       └── Toggle был OFF? → Ничего не менять (остаётся "private")
       │
       ▼
5. Записать событие в backend → перейти на Feed (лента)
   Экран больше НИКОГДА не показывается этому пользователю
```

> **Важно для программиста:** Не показывать системный запрос разрешений (камера/фото/микрофон) на этом экране. Разрешения запрашиваются позже, в контексте (ПОТОК 4).

---

## 💾 Backend / База данных

**1. Таблица `users`** — при регистрации:

| Поле | Значение по умолчанию | Комментарий |
|---|---|---|
| `profile_visibility` | `"private"` | CAADCA: приватный по умолчанию. Меняется на `"public"` если toggle = ON |

**2. Таблица `legal_consents_log`** — при нажатии «I understand, continue»:

| Поле | Значение |
|---|---|
| `user_id` | ID пользователя |
| `consent_type` | `privacy_defaults_acknowledged` |
| `consent_version` | `2.0` |
| `profile_visibility_chosen` | `"private"` или `"public"` |
| `consented_at` | Timestamp (UTC) |
| `ip_address` | IP пользователя (для GDPR proof) |

---

## 🔗 Что делают ссылки на этом экране

| Ссылка | Куда ведёт | Как открывается |
|---|---|---|
| `Privacy & Visibility` (под toggle) | **НЕ открывать** на этом экране. Текст = информирование. Ссылка станет кликабельной **после** входа (в Settings) | Просто текст-подсказка, НЕ активная ссылка |
| `[Terms of Service]` (в footer) | bestme.app/terms | **in-app browser** (SafariViewController / Chrome Custom Tab) |
| `[Privacy Policy]` (в footer) | bestme.app/privacy | **in-app browser** |

---

## 📊 Что видно при Private vs Public профиле

> private ≠ невидимый. Private = ограниченная видимость (как Instagram private account).

| Что видят другие пользователи | Private (по умолчанию) | Public |
|---|---|---|
| Username | ✅ видно | ✅ видно |
| Аватар (фото профиля) | ✅ видно | ✅ видно |
| Имя (display name) | ✅ видно | ✅ видно |
| Посты / блоги | ❌ скрыто (только followers) | ✅ видно всем |
| Фото в профиле | ❌ скрыто (только followers) | ✅ видно всем |
| Email / телефон / DOB | ❌ **ВСЕГДА** скрыто | ❌ **ВСЕГДА** скрыто |
| Возможность подписаться (Follow) | ✅ можно отправить запрос | ✅ можно подписаться |
| Чат (DM) | ✅ можно написать | ✅ можно написать |

> **Имя (display name) ВИДНО ВСЕГДА** — это требование закона. Пользователь должен быть идентифицируем по имени. Private означает ограничение на КОНТЕНТ (посты, фото), а не на базовую идентификацию.

---

## ❓ FAQ

**Q: Почему "private by default"?**
A: CAADCA (AB 2273) ТРЕБУЕТ максимальные настройки приватности по умолчанию. Apple и Google ревьюеры проверяют это.

**Q: Законно ли toggle для public?**
A: ✅ ДА. По умолчанию = PRIVATE, toggle = OFF, нет dark patterns, нет наказания за "private".

**Q: Законно ли блокировать экран?**
A: ✅ ДА. GDPR Art. 25(2) ТРЕБУЕТ проинформировать о настройках приватности. Стандартная практика (Pinterest, Instagram, TikTok).

**Q: "acknowledge" vs "agree"?**

| | "acknowledge" | "agree" |
|---|---|---|
| Перевод | «Я ознакомлен» | «Я согласен» |
| Для Bestme | ✅ Безопаснее | ✅ Тоже допустимо |
| **Используем** | **"acknowledge"** | — |
