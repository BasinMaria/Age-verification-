# 🍎 ПОТОК 6: App Tracking Transparency (только iOS)

## ⚠️ СТАТУС: ЗАВИСИТ ОТ FACEBOOK LOGIN

> Если BestMe использует **кнопку «Войти через Facebook»** — это значит **Facebook SDK** интегрирован в приложение.
> Facebook SDK **передаёт данные** (события, device info) на сервера Meta → это **трекинг** → нужен **ATT**.

---

## Содержание

1. [Facebook Login — за и против](#1-facebook-login--за-и-против)
2. [Что именно Facebook SDK делает](#2-что-именно-facebook-sdk-делает)
3. [Что требует Apple если есть Facebook SDK](#3-что-требует-apple-если-есть-facebook-sdk)
4. [Минимальная реализация ATT](#4-минимальная-реализация-att)
5. [Что указать в документах](#5-что-указать-в-документах)
6. [Альтернатива — убрать Facebook Login](#6-альтернатива--убрать-facebook-login)
7. [Рекомендация для BestMe](#7-рекомендация-для-bestme)

---

## 1. Facebook Login — за и против

### ✅ ЗА (оставить Facebook Login)

| # | Аргумент | Вес |
|---|---|---|
| 1 | Удобство для пользователя — многие привыкли к «Войти через Facebook» | Средний |
| 2 | Быстрая регистрация — не нужно вводить email/пароль | Средний |
| 3 | Получаем имя + email + аватар автоматически | Низкий (то же даёт Google/Apple Sign-In) |

### ❌ ПРОТИВ (убрать Facebook Login)

| # | Аргумент | Вес | Детали |
|---|---|---|---|
| 1 | **ATT диалог обязателен** | 🔴 Критично | Apple ОТКЛОНИТ приложение если Facebook SDK есть но ATT не реализован |
| 2 | **Privacy Manifest обязателен** | 🔴 Критично | С апреля 2024 Apple требует PrivacyInfo.xcprivacy для каждого SDK. Facebook SDK = необходимо декларировать все данные |
| 3 | **App Privacy Labels (Nutrition Labels)** | 🔴 Критично | В App Store Connect нужно раскрыть ВСЕ данные которые собирает Facebook SDK — это длинный список (Device ID, Browsing History, Purchases, Other Data) |
| 4 | **Бюрократия Meta** | 🟡 Существенно | Facebook Developer Portal: верификация бизнеса, Data Processing Agreement, подтверждение Privacy Policy URL, Review от Meta |
| 5 | **Пользователи всё реже используют Facebook** | 🟡 Существенно | Молодая аудитория (wellness) чаще использует Apple/Google Sign-In. Facebook Login снижает доверие у privacy-conscious пользователей |
| 6 | **Дополнительный код и поддержка** | 🟡 Существенно | Facebook SDK обновляется часто, может ломаться, требует тестирования на каждый релиз |
| 7 | **GDPR: передача данных в Meta** | 🟡 Существенно | Meta = Data Processor → нужен Data Processing Agreement. Передача данных в США → нужно обоснование (EU-US Data Privacy Framework или SCCs) |
| 8 | **Google Play Data Safety** | 🟡 Существенно | В Play Console → Data Safety нужно раскрыть что Facebook SDK собирает данные |
| 9 | **Риск отказа в публикации** | 🔴 Критично | В прошлый раз Facebook SDK создал много проблем при публикации. Apple ревьюеры тщательно проверяют приложения с Facebook SDK |
| 10 | **Limited Login (restricted mode)** | 🟡 Информация | Facebook предлагает «Limited Login» (без IDFA, без полного трекинга) — но это сложнее в реализации и ограничивает функциональность |

---

## 2. Что именно Facebook SDK делает

> ⚠️ **Важно понимать:** Facebook Login ≠ просто кнопка авторизации. Facebook SDK — это полноценная библиотека, которая:

| Что делает | Передаёт в Meta? | Нужен ATT? |
|---|---|---|
| **Авторизация** (email, name, avatar) | ✅ Да — события login | Нет |
| **App Events** (открытие приложения, экраны, действия) | ✅ Да — автоматически | **✅ ДА** |
| **Advertising ID (IDFA)** — если пользователь разрешил ATT | ✅ Да | **✅ ДА** |
| **Device Fingerprinting** (модель, ОС, язык) | ✅ Да | Нет — но требует Privacy Manifest |
| **Deferred Deep Links** | ✅ Да | **✅ ДА** |

> Даже если вы используете Facebook SDK **ТОЛЬКО** для Login, SDK автоматически отправляет App Events в Meta.
> Это = «tracking» по определению Apple → нужен ATT.

### Facebook Limited Login (альтернатива)

С 2023 Facebook предлагает **Limited Login** — режим без IDFA и без полного трекинга:

| Аспект | Standard Login | Limited Login |
|---|---|---|
| Данные пользователя | email, name, avatar, friends | email, name, avatar (ограничено) |
| App Events | ✅ Отправляются в Meta | ❌ НЕ отправляются |
| IDFA / Tracking | ✅ Используется (с ATT) | ❌ НЕ используется |
| ATT нужен? | **✅ ДА** | **❌ НЕТ** (если правильно настроить) |
| Сложность | Стандартная | Сложнее — нужен Nonce, JWT verification |
| App Privacy Labels | Длинный список | Короткий список |

> **Если решите оставить Facebook Login** — используйте **Limited Login**. Это снимает необходимость ATT.

---

## 3. Что требует Apple если есть Facebook SDK

### Если стандартный Facebook SDK (Standard Login)

| # | Требование | Что делать | Срок |
|---|---|---|---|
| 1 | **ATT диалог** | Показать ATT permission перед первым запуском Facebook SDK функций | 2-3 дня |
| 2 | **NSUserTrackingUsageDescription** | Добавить в Info.plist текст объясняющий зачем нужен tracking | 10 мин |
| 3 | **PrivacyInfo.xcprivacy** | Декларировать все данные которые собирает Facebook SDK | 1-2 часа |
| 4 | **App Privacy Labels** | В App Store Connect → App Privacy заполнить все категории данных | 1-2 часа |
| 5 | **Data Safety (Google Play)** | В Play Console → Data Safety раскрыть данные Facebook SDK | 1 час |
| 6 | **Privacy Policy** | Добавить раздел о Facebook SDK, какие данные передаются в Meta | 1 час |
| 7 | **Meta Business Verification** | Верифицировать бизнес в Meta Developer Portal | 3-14 дней |
| 8 | **Data Processing Agreement** | Подписать DPA с Meta (в настройках Facebook Developer Portal) | 1 час |

### Если Facebook Limited Login

| # | Требование | Что делать |
|---|---|---|
| 1 | **ATT диалог** | ❌ **НЕ НУЖЕН** |
| 2 | **NSUserTrackingUsageDescription** | ❌ **НЕ НУЖЕН** |
| 3 | **PrivacyInfo.xcprivacy** | ✅ Нужен — но список данных короче |
| 4 | **App Privacy Labels** | ✅ Нужен — но список короче |
| 5 | **Nonce verification** | ✅ Нужна серверная проверка JWT токена |
| 6 | **Отключить Auto-Logging Events** | ✅ `Settings.shared.isAutoLogAppEventsEnabled = false` |

---

## 4. Минимальная реализация ATT (если Standard Facebook Login)

### Info.plist

```xml
<key>NSUserTrackingUsageDescription</key>
<string>BestMe uses this to provide a better experience. You can change this in Settings at any time.</string>
```

> ⚠️ **Нельзя** писать «Allow tracking for personalized ads» — Apple отклонит. Текст должен быть нейтральным.

### Когда показывать ATT

| Когда | Правильно? | Почему |
|---|---|---|
| При первом запуске (splash screen) | ❌ НЕТ | Apple отклонит — нужен контекст |
| При регистрации | ❌ НЕТ | Нельзя гейтить регистрацию за ATT |
| **После регистрации, перед первым контентом** | ✅ ДА | Пользователь уже в приложении, понимает контекст |
| Через Permission Priming (2 шага) | ✅ ДА (лучший вариант) | Наш экран объяснения → системный диалог |

### Permission Priming — 2 шага

```
ШАГ 1: Наш экран (custom)
┌─────────────────────────────────────┐
│                                     │
│        🔒                           │
│                                     │
│   Help us improve your experience   │
│                                     │
│   We'd like to personalize your     │
│   BestMe experience. You can        │
│   change this anytime in Settings.  │
│                                     │
│   [Continue]    [Not now]           │
│                                     │
└─────────────────────────────────────┘

Если «Continue» → показать системный ATT диалог
Если «Not now» → НЕ показывать ATT. ATT.status = .notDetermined

ШАГ 2: Системный iOS диалог
┌─────────────────────────────────────┐
│                                     │
│   "BestMe" Would Like Permission   │
│   to Track Your Activity Across    │
│   Other Companies' Apps and        │
│   Websites                         │
│                                     │
│   BestMe uses this to provide a    │
│   better experience. You can       │
│   change this in Settings at any   │
│   time.                            │
│                                     │
│   [Ask App Not to Track] [Allow]   │
│                                     │
└─────────────────────────────────────┘
```

> **Правила Apple:**
> - ❌ Нельзя **гейтить** функционал за ATT (нельзя: «разрешите иначе не покажем ленту»)
> - ❌ Нельзя **стимулировать** (нельзя: «разрешите и получите бонус»)
> - ❌ Нельзя показывать ATT при первом открытии (нет контекста)
> - ✅ Можно объяснить зачем нужно (custom pre-prompt)
> - ✅ Можно не показывать повторно если пользователь отказал

---

## 5. Что указать в документах

### 5.1. Privacy Policy

Добавить раздел:

```
THIRD-PARTY LOGIN SERVICES

When you sign in using Facebook, we receive your name, email address,
and profile photo from Meta Platforms, Inc. We use this information
solely for account creation and authentication.

[Если Standard Login:]
The Facebook SDK integrated in our app may collect device information
and app usage events. For details on data collected by Meta, see
Meta's Privacy Policy: https://www.facebook.com/privacy/policy

[Если Limited Login:]
We use Facebook Limited Login, which does not share your activity
data with Meta. Only your basic profile information (name, email)
is shared for authentication purposes.

You can disconnect your Facebook account at any time in
Settings > Account > Connected Accounts.
```

### 5.2. Terms of Service

Добавить в раздел «Third-Party Services»:

```
THIRD-PARTY LOGIN

BestMe offers sign-in via third-party services (Apple, Google,
Facebook). By using these services, you also agree to their
respective terms and privacy policies. BestMe is not responsible
for the data practices of these third-party services.
```

### 5.3. App Store Connect → App Privacy

> Если Facebook Standard Login — раскрыть в App Privacy Labels:

| Категория данных | Тип | Linked to User? | Used for Tracking? |
|---|---|---|---|
| Contact Info — Email | Collected | ✅ Yes | ❌ No |
| Contact Info — Name | Collected | ✅ Yes | ❌ No |
| Identifiers — User ID | Collected | ✅ Yes | ❌ No |
| Identifiers — Device ID | Collected (Facebook SDK) | ✅ Yes | ✅ Yes (Standard) / ❌ No (Limited) |
| Usage Data — Product Interaction | Collected (Facebook SDK) | ✅ Yes | ✅ Yes (Standard) / ❌ No (Limited) |

### 5.4. Google Play Console → Data Safety

| Данные | Collected? | Shared? | Purpose |
|---|---|---|---|
| Email | ✅ | ❌ | Account management |
| Name | ✅ | ❌ | Account management |
| Device ID | ✅ (Standard) / ❌ (Limited) | ✅ (Standard) / ❌ (Limited) | Analytics (Standard) |

### 5.5. Meta Developer Portal

| Шаг | Что сделать | Когда |
|---|---|---|
| 1 | Создать App в developers.facebook.com | До разработки |
| 2 | Настроить Facebook Login product | До разработки |
| 3 | Верифицировать бизнес (Business Verification) | До публикации — может занять **3-14 дней** |
| 4 | Подписать Data Processing Agreement | До публикации |
| 5 | Указать Privacy Policy URL | До публикации |
| 6 | Указать Data Deletion URL (`bestme.app/delete-account`) | До публикации |
| 7 | Указать Deauthorize Callback URL | До публикации |
| 8 | Пройти App Review от Meta (для доступа к email) | До публикации — может занять **1-5 дней** |

---

## 6. Альтернатива — убрать Facebook Login

> **Если убрать Facebook Login** — жизнь значительно упрощается:

| Без Facebook | С Facebook (Standard) | С Facebook (Limited) |
|---|---|---|
| ATT: ❌ не нужен | ATT: ✅ обязателен | ATT: ❌ не нужен |
| Privacy Manifest: короткий | Privacy Manifest: длинный | Privacy Manifest: средний |
| App Privacy Labels: минимум | App Privacy Labels: длинный список | App Privacy Labels: средний |
| Meta бюрократия: ❌ нет | Meta бюрократия: **✅ 3-14 дней** | Meta бюрократия: **✅ 3-14 дней** |
| Риск отказа Apple: низкий | Риск отказа Apple: **повышенный** | Риск отказа Apple: средний |
| Token Revocation при удалении: не нужен | Token Revocation: **✅ обязателен** (ПОТОК 9) | Token Revocation: **✅ обязателен** |

### Что остаётся без Facebook:

| Метод входа | Покрывает? | SDK |
|---|---|---|
| **Apple Sign-In** | ✅ iOS пользователи (100%) | Apple AuthenticationServices (встроен) |
| **Google Sign-In** | ✅ Android + Web + iOS | Google Sign-In SDK (лёгкий) |
| **Email + пароль** | ✅ Все остальные | Supabase Auth (уже есть) |

> Apple Sign-In + Google Sign-In + Email = покрытие **100% пользователей**.
> Facebook Login добавляет удобство для ~5-15% пользователей, но значительную бюрократию.

---

## 7. Рекомендация для BestMe

### 🏆 Рекомендация: **Убрать Facebook Login из MVP**

| Причина | Объяснение |
|---|---|
| **Минимум риска при публикации** | Apple/Google ревью проще без Facebook SDK |
| **Не нужен ATT** | Одна сложная задача меньше |
| **Не нужна Meta бюрократия** | Экономия 2-3 недели на бизнес-верификации |
| **100% покрытие** | Apple + Google + Email покрывают всех пользователей |
| **Можно добавить позже** | Facebook Login можно добавить в v2 когда приложение уже опубликовано |

### Если всё-таки оставить Facebook Login:

| Вариант | Рекомендация |
|---|---|
| Standard Login | ❌ **НЕ рекомендуется** — слишком много бюрократии и данных |
| **Limited Login** | ✅ **Если очень нужен Facebook** — используйте Limited Login (без ATT, минимум данных) |

### Что нужно сделать если оставляете Facebook:

- [ ] Выбрать: Standard или Limited Login
- [ ] Зарегистрировать приложение в Meta Developer Portal
- [ ] Пройти Business Verification (3-14 дней)
- [ ] Подписать Data Processing Agreement
- [ ] (Standard) Реализовать ATT Permission Priming
- [ ] (Standard) Добавить NSUserTrackingUsageDescription в Info.plist
- [ ] Добавить PrivacyInfo.xcprivacy для Facebook SDK
- [ ] Обновить App Privacy Labels
- [ ] Обновить Google Play Data Safety
- [ ] Добавить раздел в Privacy Policy
- [ ] Добавить Token Revocation при удалении аккаунта (ПОТОК 9)
- [ ] Добавить Deauthorize Callback URL
- [ ] Добавить Data Deletion URL (bestme.app/delete-account)
- [ ] Отключить AutoLogAppEvents (для Limited Login): `Settings.shared.isAutoLogAppEventsEnabled = false`

---

> **Связанные документы:**
> - [COMPLIANCE.md](../../COMPLIANCE.md) — основной документ
> - [FLOW-9-DELETE-ACCOUNT.md](FLOW-9-DELETE-ACCOUNT.md) — Token Revocation при удалении аккаунта
> - [AI-ALGORITHMS.md](../AI-ALGORITHMS.md) — AI, алгоритмы, прозрачность
> - [LEGAL-DOCUMENTS.md](../LEGAL-DOCUMENTS.md) — юридические документы
