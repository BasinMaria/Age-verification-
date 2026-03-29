# 📋 ТЗ: Удаление Facebook Login из приложения BestMe

> **Дата:** 29 марта 2026
> **Приоритет:** 🔴 Высокий — сделать ДО подачи в магазины
> **Оценка:** 1-2 дня (backend + frontend + тестирование)

---

## Почему мы это делаем

### Для команды: мы ценим вашу работу ❤️

Команда проделала отличную работу по интеграции Facebook Login. Код написан, протестирован, работает. **Это не ваша ошибка и не ошибка реализации.** Проблема в том, что **Facebook SDK создаёт огромное количество бюрократических и юридических обязательств**, которые:

- В **прошлый раз уже создали серьёзные проблемы** при попытке публикации
- **Задержат запуск** приложения на **2-4 недели** (Meta Business Verification, DPA, App Review от Meta)
- **Повысят риск отказа** Apple/Google при ревью
- **Добавят постоянные затраты** на поддержку (обновления SDK, Privacy Manifest, ATT)

Решение убрать Facebook — **стратегическое и временное**. Когда приложение будет опубликовано и стабильно, мы можем вернуть Facebook Login в версии 2.0.

---

## 📊 Статистика: насколько критичен Facebook Login?

### Мировая статистика социальных логинов (2025-2026)

| Провайдер | Доля (глобально) | Тренд | Источник |
|---|---|---|---|
| **Google Sign-In** | **~73-75%** | 📈 Рост (был 10% среди social-only в 2024, но с учётом всех логинов доминирует) | thefix.it, 6sense |
| **Facebook Login** | **~12-15%** *(снижается, был 61% среди social logins в Q1 2024)* | 📉 Падение (68% → 61% → продолжает снижаться) | LoginRadius, MarketingScoop |
| **Apple Sign-In** | **~5-8%** | 📈 Быстрый рост, особенно на iOS | LoginRadius |
| **Email + пароль** | **~60-70% всех регистраций** | 📊 Стабильно | Отраслевые данные |

### Ключевые факты

| Факт | Значение |
|---|---|
| **Аудитория BestMe** | Wellness, здоровый образ жизни — **privacy-conscious**, молодая аудитория |
| **Facebook аудитория** | Скорее **старшая аудитория** (35+), подростки уходят из Facebook |
| **Apple + Google + Email** | = **100% покрытие** всех пользователей |
| **Без Facebook теряем** | ~5-15% **удобство** (не пользователей! они могут войти через Google/Email) |
| **Реальная потеря конверсии** | Практически **0%** — все кто имеет Facebook, имеют и email и/или Google аккаунт |

### Вывод по статистике

> **Ни один пользователь не будет потерян.** Каждый кто может войти через Facebook, может так же войти через Google или Email. Facebook Login — это удобство, а не необходимость.

---

## 🔴 Проблемы если ОСТАВИТЬ Facebook Login

### 1. Apple отклонит приложение без ATT

| Проблема | Последствие |
|---|---|
| Facebook SDK **автоматически** отправляет данные (App Events) в Meta | Это = «tracking» по определению Apple |
| Tracking без ATT диалога | Apple **ОТКЛОНИТ** приложение (§5.1.2(i)) |
| Реализация ATT | Дополнительные **2-3 дня** работы |

### 2. Meta бюрократия (уже были проблемы!)

| Шаг | Срок | Описание |
|---|---|---|
| Business Verification | **3-14 дней** | Meta проверяет документы компании. Может запросить доп. документы |
| Data Processing Agreement | 1 час | Юридический договор с Meta |
| App Review от Meta | **1-5 дней** | Meta проверяет как используется их SDK |
| Privacy Policy URL | 1 час | Meta требует отдельный раздел в Privacy Policy |
| Data Deletion URL | 1 час | Meta требует URL для удаления данных |
| Deauthorize Callback URL | 2 часа | Meta требует callback при отключении |

> **ИТОГО: 1-3 недели** только на бюрократию Meta — **ДО** подачи в Apple/Google!

### 3. App Store Connect — расширенные Privacy Labels

С Facebook SDK нужно раскрыть **больше данных** в App Privacy:

| Без Facebook | С Facebook |
|---|---|
| Email, Name, User ID | Email, Name, User ID, **Device ID**, **Usage Data**, **Browsing History**, **Purchases**, **Other Data** |
| Tracking: ❌ None | Tracking: ✅ **Yes — Device ID, Usage Data** |

> Чем длиннее список Privacy Labels — тем **больше вопросов** у Apple reviewer.

### 4. Google Play Data Safety — тоже сложнее

| Без Facebook | С Facebook |
|---|---|
| Collected: Email, Name | Collected: Email, Name, **Device ID, Usage Data** |
| Shared: Nothing | Shared: **Device ID, Usage Data → Meta** |

### 5. Обязательства при удалении аккаунта (ПОТОК 9)

С Facebook Login нужно при удалении аккаунта:
```
DELETE https://graph.facebook.com/{user-id}/permissions
Authorization: Bearer {user-access-token}
```

Без Facebook — это **не нужно**.

### 6. Постоянные затраты на поддержку

| Что | Как часто | Время |
|---|---|---|
| Обновление Facebook SDK | Каждые 2-3 месяца | 2-4 часа |
| Обновление Privacy Manifest | При каждом обновлении SDK | 1-2 часа |
| Проверка App Events | При каждом релизе | 1 час |
| Meta Business Verification renewal | Ежегодно | 1-3 дня |

---

## ✅ Что остаётся без Facebook

| Метод входа | Покрывает | SDK | Сложность |
|---|---|---|---|
| **Apple Sign-In** | ✅ 100% iOS пользователей | Встроен в iOS (AuthenticationServices) | ✅ Уже реализован |
| **Google Sign-In** | ✅ Android + Web + iOS | Google Sign-In SDK (лёгкий, без трекинга) | ✅ Уже реализован |
| **Email + пароль** | ✅ Все остальные | Supabase Auth (уже есть) | ✅ Уже реализован |

> **Apple + Google + Email = 100% покрытие.** Нет пользователя, который не сможет зарегистрироваться.

---

## 📝 Задачи для команды

### Общая стратегия

> **НЕ удалять код навсегда.** Создать отдельную ветку/папку с сохранённым кодом Facebook Login для возможного возвращения в v2.

### Шаг 1: Сохранить текущий код Facebook Login

```
📁 archive/facebook-login/
├── README.md          ← Описание: "Facebook Login код, сохранён для v2"
├── ios/               ← iOS-специфичный код Facebook Login
├── android/           ← Android-специфичный код Facebook Login
├── backend/           ← Backend обработчики Facebook OAuth
├── config/            ← Конфиги (Facebook App ID, Secret placeholder)
└── tests/             ← Тесты Facebook Login
```

**Задачи:**
- [ ] Создать папку `archive/facebook-login/`
- [ ] Скопировать ВСЕ файлы связанные с Facebook Login
- [ ] Добавить `README.md` с описанием что это и зачем сохранено
- [ ] Commit с сообщением: `archive: save Facebook Login code for future v2 integration`

### Шаг 2: Удалить Facebook SDK из проекта

**iOS:**
- [ ] Удалить `FacebookCore`, `FacebookLogin`, `FacebookShare` из Podfile / Package.swift / SPM
- [ ] Удалить `FBSDKLoginKit` import из всех файлов
- [ ] Удалить `FacebookAppID`, `FacebookClientToken`, `FacebookDisplayName` из Info.plist
- [ ] Удалить `fb{APP_ID}` из URL Schemes в Info.plist
- [ ] Удалить `fbapi`, `fb-messenger-share-api` из LSApplicationQueriesSchemes
- [ ] Удалить `FBSDKApplicationDelegate` вызовы из AppDelegate
- [ ] Удалить `NSUserTrackingUsageDescription` из Info.plist **(если был добавлен ТОЛЬКО для Facebook)**
- [ ] Run `pod install` / обновить SPM

**Android:**
- [ ] Удалить `implementation 'com.facebook.android:facebook-login:...'` из build.gradle
- [ ] Удалить `com.facebook.sdk.ApplicationId` из AndroidManifest.xml
- [ ] Удалить `com.facebook.sdk.ClientToken` из AndroidManifest.xml
- [ ] Удалить `FacebookActivity` из AndroidManifest.xml
- [ ] Удалить все import `com.facebook.*`
- [ ] Sync Gradle

**Backend (Supabase):**
- [ ] Удалить Facebook OAuth provider из Supabase Auth конфигурации (Dashboard → Authentication → Providers → Facebook → Disable)
- [ ] Сохранить (в archive/) Edge Functions для Facebook token verification, если есть
- [ ] Удалить Facebook Token Revocation код из процесса удаления аккаунта (ПОТОК 9)

**Frontend (UI):**
- [ ] Удалить кнопку «Войти через Facebook» с экрана входа
- [ ] Удалить кнопку «Зарегистрироваться через Facebook» с экрана регистрации
- [ ] Удалить «Facebook» из экрана «Подключённые аккаунты» в настройках
- [ ] Обновить layout экранов входа/регистрации (2 кнопки вместо 3)

### Шаг 3: Обновить конфигурацию

- [ ] Удалить Facebook App ID из переменных окружения (`.env`, Supabase secrets)
- [ ] Удалить Facebook Client Token
- [ ] Удалить Facebook App Secret
- [ ] Обновить PrivacyInfo.xcprivacy — убрать данные связанные с Facebook SDK
- [ ] Обновить App Privacy Labels в App Store Connect — убрать Device ID, Usage Data tracking

### Шаг 4: Тестирование

- [ ] ✅ Регистрация через Apple Sign-In работает
- [ ] ✅ Регистрация через Google Sign-In работает
- [ ] ✅ Регистрация через Email работает
- [ ] ✅ Вход через Apple Sign-In работает
- [ ] ✅ Вход через Google Sign-In работает
- [ ] ✅ Вход через Email работает
- [ ] ✅ Удаление аккаунта работает (без Facebook revocation)
- [ ] ✅ Нет упоминаний Facebook в UI
- [ ] ✅ Нет Facebook SDK в зависимостях (проверить `Podfile.lock`, `build.gradle`)
- [ ] ✅ Приложение компилируется и запускается без ошибок

### Шаг 5: Финальная проверка

- [ ] Privacy Policy — убрать раздел «Third-Party Login — Facebook» (оставить Apple, Google)
- [ ] Terms of Service — убрать упоминание Facebook из списка провайдеров
- [ ] Screenshots для магазинов — убедиться что нет кнопки Facebook
- [ ] Нигде не осталось логотипа Facebook

---

## 🔮 Когда вернём Facebook Login (v2.0)

| Условие | Описание |
|---|---|
| **Приложение опубликовано** | Первая версия прошла ревью Apple и Google |
| **Стабильный трафик** | Есть пользователи, приложение стабильно |
| **Meta Verification пройдена** | Бизнес верифицирован в Meta (3-14 дней) заранее |
| **Limited Login** | Используем Limited Login (без ATT, без трекинга) |
| **Команда готова** | Есть 3-5 дней на интеграцию + тестирование + ревью |

> **План:** Код уже сохранён в `archive/facebook-login/`. Когда условия выполнены — переносим код обратно, переключаем на Limited Login, тестируем, отправляем обновление.

---

## 📊 Сравнение: сейчас vs после удаления

| Параметр | С Facebook | Без Facebook |
|---|---|---|
| **Методы входа** | Apple + Google + Facebook + Email | Apple + Google + Email |
| **Покрытие пользователей** | 100% | **100%** (те же пользователи) |
| **ATT диалог (iOS)** | ✅ Обязателен | ❌ Не нужен |
| **Privacy Manifest** | Длинный (Facebook данные) | Короткий |
| **App Privacy Labels** | Длинный список + Tracking: Yes | Короткий + Tracking: **No** |
| **Meta бюрократия** | 1-3 недели | **0** |
| **Риск отказа Apple** | 🔴 Повышенный | 🟢 Минимальный |
| **Время до публикации** | +2-4 недели | **Сразу** |
| **Token Revocation** | Нужен для Facebook | Не нужен |
| **SDK поддержка** | Обновлять каждые 2-3 мес | Не нужно |

---

## Связанные документы

- [FLOW-6-ATT.md](flows/FLOW-6-ATT.md) — детальный анализ ATT и Facebook Login (за/против)
- [FLOW-7-SMS.md](flows/FLOW-7-SMS.md) — телефон пользователя (не затронут этим ТЗ)
- [FLOW-9-DELETE-ACCOUNT.md](flows/FLOW-9-DELETE-ACCOUNT.md) — удаление аккаунта (упростится без Facebook)
- [COMPLIANCE.md](../COMPLIANCE.md) — основной документ compliance
- [DEVELOPER-CHECKLIST.md](DEVELOPER-CHECKLIST.md) — чеклист разработчика

---

> **Итог:** Убираем Facebook Login из MVP → экономим 2-4 недели → снижаем риск отказа при публикации → сохраняем код для v2.0. Ни один пользователь не будет потерян — Apple + Google + Email покрывают 100%.
