# 18+ Социальная сеть BestMe — Что делать по закону в каждой стране

> **Дата:** Март 2026
> **Проект:** Социальная сеть **18+** с мировым охватом (App Store + Google Play)
> **Модель:** Регистрация только для лиц 18+. Все до 18 — блокируются.
> **Способы входа:** Google, Facebook, Apple Sign-In + собственная регистрация (email, имя, пароль, дата рождения)

### 🌐 О платформе BestMe — полное описание + compliance по каждой функции

**BestMe** — международная социальная платформа в сфере здорового образа жизни (wellbeing). Объединяет пользователей, экспертов и бизнесы в единой экосистеме.

#### Все функции платформы и их правовое покрытие

| # | Функция | Описание | Что нужно по закону / правилам магазинов | Статус |
|---|---|---|---|---|
| | **👤 ПОЛЬЗОВАТЕЛИ** | | | |
| 1 | Личный профиль | Аватар, имя, био, настройки | Профиль = **приватный по умолчанию** (CAADCA Калифорния). Email/телефон/DOB **скрыты** от других (GDPR Art. 25). Кнопка «Удалить аккаунт» (GDPR Art. 17 + Apple) | ☐ |
| 2 | Лента контента (Feed) | Посты, фото, видео | Весь контент = UGC → **модерация обязательна** (Apple §1.2, Google UGC, DSA Art. 16). Кнопка «Report» на каждом посте | ☐ |
| 3 | Подписки | Подписка на пользователей, блогеров, бизнес-профили | Нет спец. требований. Пользователь может отписаться в любой момент | ✅ |
| 4 | Лайки | Лайк на пост/комментарий | Нет спец. требований | ✅ |
| 5 | Комментарии | Комментарии к постам | UGC → **модерация обязательна**. Кнопка «Report» на каждом комментарии | ☐ |
| 6 | Репосты / Шер | Поделиться постом | Нет спец. требований | ✅ |
| 7 | Чаты и общение | Личные сообщения, групповые чаты | **Модерация**: возможность пожаловаться на сообщение (Apple §1.2). **Блокировка** пользователя скрывает чат. **E2E шифрование** рекомендуется (GDPR Art. 32 — безопасность) | ☐ |
| 8 | Нотификации (Push) | Уведомления о лайках, комментариях, подписках, сообщениях | **Запрос разрешения** перед отправкой (Apple §5.1.1). По умолчанию = **минимальные** (CAADCA). Возможность **отключить** в настройках | ☐ |
| | **📝 БЛОГИ** | | | |
| 9 | Блоги (отдельный мир) | Блогеры создают контент как специалисты. Блог = личная страница автора с постами, фото, видео | UGC → **модерация обязательна**. Кнопка «Report» на блоге и на каждом посте блога. Community Guidelines распространяются на блоги | ☐ |
| 10 | Подписка на блог | Пользователи подписываются на блогеров | Нет спец. требований. Отписка в любой момент | ✅ |
| | **🏢 БИЗНЕС-ПРОФИЛИ** | | | |
| 11 | Бизнес-профили | Специалисты (тренеры, коучи, нутрициологи), услуги, места (салоны, студии, залы), обучение (курсы, мастер-классы), продукты, B2B | Privacy Policy должна описать: обработку данных бизнес-аккаунтов, какие данные видны публично. **Модерация** бизнес-контента так же как UGC | ☐ |
| 12 | Подписка на бизнес-профиль | Пользователи подписываются на бизнесы | Нет спец. требований | ✅ |
| 13 | Рейтинг бизнес-профиля | Пользователи оценивают бизнес (звёзды/баллы) | UGC (отзывы). Кнопка «Report» на отзыве. Бизнес может ответить на отзыв. Нельзя удалять негативные отзывы без причины (DSA Art. 14 — прозрачность правил) | ☐ |
| | **👥 СООБЩЕСТВА** | | | |
| 14 | Группы по интересам | Создание и участие в группах | UGC → **модерация обязательна**. Администраторы группы + глобальная модерация платформы. Community Guidelines | ☐ |
| 15 | Тематические страницы | Страницы по категориям | Модерация контента | ☐ |
| 16 | Дискуссии | Обсуждения внутри групп/сообществ | UGC → модерация. Кнопка «Report» | ☐ |
| | **🎯 КАТЕГОРИИ И ЦЕЛИ** | | | |
| 17 | Категории платформы | Питание, уход/красота, спорт, окружение, режим дня, ментальное здоровье | Контент = UGC, модерация health-claims **НЕ обязательна** для соцсети (мы НЕ медицинский сервис). Disclaimer: «Контент не является медицинской рекомендацией» | ✅ |
| 18 | Цели пользователя | Пользователь ставит себе цели: пить больше воды, делать больше шагов, и т.д. | **Персональные данные** о здоровье → GDPR Art. 9 (специальные категории данных). Но: если пользователь сам вводит свои цели (self-reported), это НЕ «данные о здоровье» в юридическом смысле → обычная обработка по GDPR Art. 6(1)(b). Описать в Privacy Policy | ☐ |
| | **🎁 БОНУСЫ И GAMIFICATION** | | | |
| 19 | Баллы за активность | Баллы за регистрацию, контент, взаимодействие, выполнение челленджей | **НЕ** является финансовой деятельностью — это loyalty program. Лицензия не нужна (аналог: Reddit karma, Duolingo gems). Описать в Terms of Service: баллы не имеют денежной стоимости | ✅ |
| 20 | Обмен баллов на подарки | Баллы → подарки/скидки | Loyalty program. Если подарки = физические товары → нужно описать условия доставки в ToS. Если подарки = цифровые → нет доп. требований | ☐ |
| 21 | Челленджи | Задания для пользователей | UGC (если челленджи создают пользователи). Модерация | ☐ |
| | **🤖 AI И УМНЫЕ ФУНКЦИИ** | | | |
| 22 | Персональные рекомендации | AI подбирает контент и услуги | [EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj): рекомендательные системы = «минимальный риск» → обязательства ограничены **прозрачностью** (раскрыть что используется AI). Добавить в Privacy Policy | ☐ |
| 23 | AI-поиск | Поиск через embeddings и векторные базы | Прозрачность: раскрыть в Privacy Policy что поиск использует AI | ☐ |
| 24 | ~~Проверка достоверности информации~~ | ~~AI проверяет контент~~ | **УБРАНО** — если не используем AI для проверки контента, этот пункт НЕ нужен. Если используем → достаточно disclaimer в ToS/Privacy Policy (НЕ в UI) | — |

### 🌐 Языки

| Что | Языки | Примечание |
|---|---|---|
| **Интерфейс приложения (UI)** | EN, RU, ES, FR, DE, AR, HE | Все экраны, кнопки, тексты, ключи переводов |
| **Юридические документы** (Privacy Policy, Terms of Service) | EN + DE, FR, ES, IT, PT | Только документы. IT и PT — только для документов, НЕ для UI |
| **Community Guidelines** | EN + DE, FR, ES, IT, PT | Юридический документ — те же языки |

> **Важно:** IT (итальянский) и PT (португальский) — нужны **ТОЛЬКО** для юридических документов (Privacy Policy, Terms of Service, Community Guidelines). В интерфейс приложения (UI) на данном этапе эти языки **НЕ добавляются**.

---

## Содержание

1. [🏪 ГЛАВНОЕ — Публикация в магазины (App Store + Google Play)](#1--главное--публикация-в-магазины-app-store--google-play)
   - [👨‍💻 Что проверяют в КОДЕ при ревью (правила для разработчиков)](#-что-проверяют-в-коде-при-ревью-приложения-apple--google--правила-для-разработчиков)
2. [✅ ОТКРЫТЫЕ СТРАНЫ — где хватает базовых 10 пунктов](#2--открытые-страны--где-хватает-базовых-10-пунктов)
3. [⛔ ВСЁ ОСТАЛЬНОЕ — ЗАБЛОКИРОВАНО](#3--всё-остальное--заблокировано)
4. [Форма даты рождения — при регистрации и через соцсети](#4-форма-даты-рождения--при-регистрации-и-через-соцсети)
5. [📋 Обязательные экраны согласий (Consent Flows)](#5--обязательные-экраны-согласий-consent-flows)
6. [🛡️ Модерация UGC — система жалоб и контент-модерации](#6--модерация-ugc--система-жалоб-и-контент-модерации)
7. [GeoIP — задание](#7-geoip--задание)
8. [Какие данные хранить, какие удалять (+ про IP и сессии)](#8-какие-данные-хранить-какие-удалять)
9. [Детальный разбор по каждой стране (с линками на законы)](#9-детальный-разбор-по-каждой-стране-с-линками-на-законы)
10. [📌 ПОЛНЫЙ СПИСОК ВСЕГО НЕОБХОДИМОГО СЕЙЧАС — Master Checklist](#10--полный-список-всего-необходимого-сейчас--master-checklist)
11. [Все ссылки на законы (одним списком)](#все-ссылки-на-законы-одним-списком)

---

## 1. 🏪 ГЛАВНОЕ — Публикация в магазины (App Store + Google Play)

> **Это самое важное.** Без публикации в магазины — ничего не работает.
> Apple и Google НЕ требуют Yoti, ID-верификацию или биометрию.
> Магазинам достаточно: **правильный рейтинг + форма DOB + Privacy Policy.**

---

### 📱 Apple App Store — что нужно для публикации 18+ приложения

| # | Что сделать | Обязательно? | Зачем | Линк (документация Apple) |
|---|---|---|---|---|
| 1 | **Заполнить опросник рейтинга** в App Store Connect (Content Descriptions) | ✅ Да | Apple назначит правильный рейтинг (17+). Отвечай честно: «есть ли UGC?» → да, «есть модерация?» → да, «есть контент для взрослых?» → да. | [App Store Review Guidelines §2.3.6](https://developer.apple.com/app-store/review/guidelines/#legal) |
| 2 | **Получить рейтинг 17+** (или новый рейтинг 18+) | ✅ Да | С июля 2025 Apple добавил рейтинги 13+, 16+, 18+. Для 18+ соцсети — выбери **17+** или **18+**. | [Apple Developer — рейтинги](https://developer.apple.com/news/?id=5iajbof4) |
| 3 | **НЕ ставить в категорию Kids** | ✅ Да | Категория Kids = Families Policy = куча требований. У тебя 18+ → **никогда** Kids. | [App Store Review Guidelines §1.3](https://developer.apple.com/app-store/review/guidelines/) |
| 4 | **Privacy Policy** (ссылка в App Store Connect) | ✅ Да | Обязательна для ВСЕХ приложений. Минимум на EN. Описать: какие данные собираешь, зачем, как удаляешь. | [App Store Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| 5 | **Модерация UGC** (система жалоб + блокировки) | ✅ Да | Apple требует: кнопка «пожаловаться», блокировка пользователей, модерация контента. Без этого — отказ. | [App Store Review Guidelines §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) |
| 6 | **Механизм проверки возраста** в самом приложении | ✅ Да | Форма ввода даты рождения (DOB) — **достаточна** для публикации. Apple НЕ требует ID-верификацию. | [App Store Review Guidelines §1.1](https://developer.apple.com/app-store/review/guidelines/) |
| 7 | **Удаление аккаунта** — кнопка в настройках приложения | ✅ Да — **БЕЗ ЭТОГО БАН** | С июня 2022 Apple **ОБЯЗАТЕЛЬНО** требует кнопку удаления аккаунта в приложении. Должна быть легко доступна (не скрыта). Удаление = удалить ВСЕ данные пользователя | [Apple Account Deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) |
| 8 | Интегрировать **Apple Age Signals API** (для США) | ⚠️ Рекомендуется | Для штатов США с законами о верификации возраста при загрузке. Юта, Луизиана — App Store будет передавать сигнал возраста. | [Apple Developer](https://developer.apple.com/) |

**Резюме Apple:** Рейтинг 17+/18+ + DOB форма + Privacy Policy + модерация UGC + **удаление аккаунта** = **опубликуют.**

---

### 🤖 Google Play — что нужно для публикации 18+ приложения

| # | Что сделать | Обязательно? | Зачем | Линк (документация Google) |
|---|---|---|---|---|
| 1 | **Указать целевую аудиторию 18+** в Play Console (Target Audience) | ✅ Да | Google спросит: «Для кого ваше приложение?» → выбери **только 18+**. НЕ включай группы ниже 18. | [Play Console — целевая аудитория](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en) |
| 2 | **Заполнить опросник Content Rating** (IARC) | ✅ Да | Google использует IARC. Отвечай честно → получишь рейтинг **18+** / **Adults Only**. | [Play Console — Content Rating](https://support.google.com/googleplay/android-developer/answer/188189?hl=en) |
| 3 | **Включить «Restrict Declared Minors»** | ✅ Да | Запрещает загрузку для аккаунтов, которые Google пометил как несовершеннолетние. **Включи обязательно.** | [Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) |
| 4 | **НЕ включать Families Policy / Designed for Families** | ✅ Да | Families = детское приложение. У тебя 18+ → **никогда** Families. | [Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) |
| 5 | **Privacy Policy** (ссылка в Play Console) | ✅ Да | Обязательна для ВСЕХ приложений. Описать: какие данные, зачем, как удаляешь. | [Play Console — Privacy Policy](https://support.google.com/googleplay/android-developer/answer/9859455?hl=en) |
| 6 | **Data Safety Section** — заполнить | ✅ Да | Google требует декларацию: какие данные собираешь, передаёшь ли третьим лицам, есть ли шифрование. | [Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en) |
| 7 | **Модерация UGC** (система жалоб + блокировки) | ✅ Да | Google требует для приложений с UGC: жалобы, блокировка, модерация. | [User-Generated Content Policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| 8 | **Механизм проверки возраста** в приложении | ✅ Да | DOB форма — **достаточна**. Google НЕ требует ID / биометрию для публикации. | — |
| 9 | **⚠️ Удаление аккаунта + ВЕБ-ФОРМА удаления данных** | ✅ Да — **БЕЗ ЭТОГО БАН** | С декабря 2023 Google **ОБЯЗАТЕЛЬНО** требует: 1) Кнопка удаления аккаунта **в приложении** 2) **Веб-страница** для запроса удаления данных (для тех кто уже удалил приложение). Если нет — **отказ в публикации или удаление из магазина** | [Google Account Deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en) |
| 10 | Интегрировать **Google Play Age Signals API** (для США) | ⚠️ Рекомендуется | Для штатов с App Store Accountability Act (Юта с мая 2026, Луизиана с июля 2026). | [Age Signals API](https://support.google.com/googleplay/android-developer/answer/16569691?hl=en) |

> ⚠️ **КРИТИЧНО — Удаление аккаунта (пункт 9):**
> Google Play с декабря 2023 **блокирует** приложения без веб-формы удаления данных.
> Нужно **ДВА механизма**:
> 1. Кнопка «Удалить аккаунт» **внутри приложения** (Настройки → Удалить аккаунт)
> 2. **Веб-страница** на сайте (например: `bestme.app/delete-account`) для тех кто уже удалил приложение
> Ссылку на веб-страницу нужно указать в **Play Console → Data Safety → Data deletion**.
> Без этого → **ОТКАЗ в публикации** или **УДАЛЕНИЕ из магазина**.

**Резюме Google Play:** Аудитория 18+ + IARC рейтинг + Restrict Minors + DOB форма + Privacy Policy + Data Safety + модерация UGC + **удаление аккаунта (in-app + веб-форма)** = **опубликуют.**

---

### ⚡ Минимум для публикации — сводка

```
╔═══════════════════════════════════════════════════════════════════════╗
║              МИНИМУМ ДЛЯ ПУБЛИКАЦИИ В ОБА МАГАЗИНА                   ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  1. ✅ Рейтинг 17+ / 18+ (Apple) и Adults Only (Google)              ║
║  2. ✅ НЕ в Kids/Families категориях                                  ║
║  3. ✅ «Restrict Declared Minors» включено (Google Play)              ║
║  4. ✅ Форма ввода даты рождения (DOB) при регистрации                ║
║  5. ✅ Блокировка пользователей < 18 лет                              ║
║  6. ✅ Privacy Policy (ссылка в обоих магазинах)                       ║
║  7. ✅ Data Safety заполнена (Google Play)                             ║
║  8. ✅ Модерация UGC: кнопка «пожаловаться» + блокировка юзеров       ║
║  9. ✅ Удаление аккаунта: кнопка в приложении (Apple + Google)        ║
║  10.✅ ВЕБ-ФОРМА удаления данных на сайте (Google Play обязательно)   ║
║                                                                       ║
║  ❌ НЕ нужно для публикации:                                          ║
║  • ID-верификация (Yoti, паспорт и т.п.)                              ║
║  • Биометрия (распознавание лица)                                     ║
║  • eKYC                                                               ║
║  • Проверка кредитной карты                                           ║
║                                                                       ║
║  Всё что выше ❌ — это требования ЗАКОНОВ отдельных стран,             ║
║  а НЕ магазинов. Магазины опубликуют без них.                         ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

### 👨‍💻 Что проверяют в КОДЕ при ревью приложения (Apple + Google) — правила для разработчиков

> **Это раздел для программистов.** Ниже — конкретные правила: что можно, что нельзя, что ломает публикацию.
> Ревьюеры Apple и Google проверяют не только UI, но и **код, API, библиотеки, дизайн**.

---

#### 🔴 Запрещённые практики в коде — БАН при обнаружении

| # | Что НЕЛЬЗЯ делать | Почему | Кто проверяет | Ссылка |
|---|---|---|---|---|
| 1 | **Вызывать Private API** (Apple) — любые undocumented методы UIKit, objc_msgSend к скрытым селекторам | Apple сканирует бинарник **автоматически** (static analysis). Находит вызовы _private selectors → **мгновенный отказ** | Apple автомат + ручной ревью | [Apple §2.5.1](https://developer.apple.com/app-store/review/guidelines/#software-requirements) |
| 2 | **Загружать исполняемый код** после установки (кроме JavaScriptCore / WebKit) | Нельзя скачивать .dylib, .so, интерпретаторы, код через eval(). Исключение: JS в WebView, JavaScriptCore | Apple + Google | [Apple §2.5.2](https://developer.apple.com/app-store/review/guidelines/#software-requirements) |
| 3 | **Использовать deprecated API** без fallback | Если API помечено deprecated → должен быть fallback на новый API. Приложение не должно крашиться | Apple + Google | [Apple §2.1](https://developer.apple.com/app-store/review/guidelines/#performance) |
| 4 | **Запрашивать лишние permissions** | Если просишь Camera но нигде не используешь → отказ. Каждое разрешение должно быть обосновано | Apple + Google | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage), [Google Permissions](https://support.google.com/googleplay/android-developer/answer/9888170) |
| 5 | **Отсутствие Purpose Strings** (iOS) | Каждое разрешение (камера, микрофон, фото, геолокация) **обязано** иметь текст в Info.plist объясняющий ЗАЧЕМ | Apple автомат | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| 6 | **Собирать данные без раскрытия** | Если собираешь аналитику, отпечатки устройств, рекламные идентификаторы — и не указал в Privacy Policy / Data Safety → отказ | Apple + Google | [Apple §5.1.2](https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing) |
| 7 | **Fingerprinting** (Apple, с iOS 17) | Apple запретил **device fingerprinting** — нельзя собирать уникальную комбинацию характеристик устройства для идентификации | Apple | [Apple Required Reason API](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api) |
| 8 | **Использовать Required Reason API без Privacy Manifest** (iOS) | С весны 2024: API вроде `UserDefaults`, `fileModificationDate`, `systemUptime`, `diskSpace` требуют указания причины в `PrivacyInfo.xcprivacy` | Apple автомат | [Apple Privacy Manifest](https://developer.apple.com/documentation/bundleresources/privacy_manifest_files) |
| 9 | **Краш при запуске** или на основных экранах | Если приложение крашится при review → мгновенный отказ. Тестировать на **реальных устройствах**, не только эмуляторе | Apple + Google | [Apple §2.1](https://developer.apple.com/app-store/review/guidelines/#performance) |
| 10 | **Скрытые функции** (hidden features, A/B tests, remote config переключатели которые меняют поведение после ревью) | Apple проверяет: приложение при ревью = то же что получат пользователи. Если обнаружат «ревью-режим» → бан разработчика | Apple | [Apple §2.3.1](https://developer.apple.com/app-store/review/guidelines/#accurate-metadata) |

---

#### 🟢 Что МОЖНО и РЕКОМЕНДУЕТСЯ

| # | Что можно | Пояснение |
|---|---|---|
| 1 | **Любые open-source библиотеки** (MIT, Apache, BSD) | Свободно. Проверить что лицензия не GPL (GPL может требовать открытие исходников) |
| 2 | **React Native / Flutter / Expo / Capacitor** | Cross-platform фреймворки — разрешены обоими магазинами |
| 3 | **Supabase SDK** | Обычный HTTPS-клиент — никаких ограничений. Supabase Auth, Database, Storage, Edge Functions — всё разрешено |
| 4 | **WebView** для отдельных страниц | Можно показывать Privacy Policy, Terms of Service, веб-формы через WKWebView (iOS) / WebView (Android) |
| 5 | **Push notifications через APNs / FCM** | Стандартные механизмы — разрешены. Нужен только запрос разрешения у пользователя |
| 6 | **Аналитика** (Firebase Analytics, Mixpanel, Amplitude) | Разрешено. Но нужно: объявить в Data Safety (Google), Privacy Nutrition Label (Apple), и **НЕ отправлять DOB в аналитику** (только age_bracket) |
| 7 | **In-App Purchases** через StoreKit / Google Play Billing | Для платных функций — **обязательно** через систему магазина (30% комиссия). Свои платёжные системы запрещены для цифровых товаров |
| 8 | **Шифрование** (AES, TLS, HTTPS) | Разрешено. Но если используешь шифрование — Apple может спросить про **Export Compliance** (выбрать YES: «Uses encryption» → «only standard HTTPS/TLS» → без ограничений) |
| 9 | **Background fetch, notifications, location (при обосновании)** | Можно, если есть реальная функция. Нельзя: фоновый трекинг без причины |

---

#### 📐 Правила дизайна — Apple Human Interface Guidelines + Google Material Design

> **Важно:** Магазины проверяют не только код, но и **дизайн и UX**. Нарушение гайдлайнов дизайна = отказ.

##### 🍎 Apple — Human Interface Guidelines (HIG)

| # | Правило | Что будет если нарушить | Ссылка |
|---|---|---|---|
| 1 | **Использовать нативные элементы** (UINavigationBar, UITabBar, SF Symbols) или их аналоги | Если UI выглядит «чужеродно» для iOS — ревьюер может отказать как «не iOS-like experience» | [HIG](https://developer.apple.com/design/human-interface-guidelines/) |
| 2 | **Поддерживать Dynamic Type** (настройки размера шрифта в iOS) | Рекомендация. Если текст обрезается при крупном шрифте — могут отказать | [HIG — Typography](https://developer.apple.com/design/human-interface-guidelines/typography) |
| 3 | **Поддерживать Dark Mode** | Настоятельная рекомендация с iOS 13. Не обязательно, но если в Dark Mode текст не читается — отказ | [HIG — Dark Mode](https://developer.apple.com/design/human-interface-guidelines/color#dark-mode) |
| 4 | **Поддерживать Safe Area** (notch, Dynamic Island, Home Indicator) | Контент НЕ должен обрезаться за notch / Dynamic Island. Это проверяется | [HIG — Layout](https://developer.apple.com/design/human-interface-guidelines/layout) |
| 5 | **Поддерживать все размеры экранов** (iPhone SE → iPhone 16 Pro Max + iPad если Universal) | Если при ревью на каком-то размере экрана — UI ломается → отказ | [HIG — Layout](https://developer.apple.com/design/human-interface-guidelines/layout) |
| 6 | **НЕ копировать системные иконки** для других целей | Нельзя использовать иконку Settings ⚙️ для чего-то другого | [HIG — Icons](https://developer.apple.com/design/human-interface-guidelines/app-icons) |
| 7 | **Accessibility** — VoiceOver labels на основных кнопках | Рекомендация. Apple всё чаще проверяет базовую доступность | [HIG — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) |

##### 🤖 Google — Material Design

| # | Правило | Что будет если нарушить | Ссылка |
|---|---|---|---|
| 1 | **Следовать Material Design 3** (или обосновать свой дизайн) | Google менее строг чем Apple к дизайну. Но крайне некачественный UI → отказ | [Material Design](https://m3.material.io/) |
| 2 | **Поддерживать edge-to-edge** (с Android 15) | Android 15 (2024) — приложения рисуются под status bar и navigation bar. Если не адаптировать → контент за системными элементами | [Android Edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge) |
| 3 | **Поддерживать разные DPI** (mdpi → xxxhdpi) и размеры экранов | Если на планшете / foldable — UI ломается → могут отказать | [Android — Screen Compatibility](https://developer.android.com/guide/practices/screens_support) |
| 4 | **Predictive Back Gesture** (Android 14+) | Рекомендуется. Система показывает предпросмотр «назад» — приложение должно поддерживать | [Android Predictive Back](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture) |

---

#### 🔄 Обновления SDK — обязаны ли разработчики обновляться?

> **Да, это ОБЯЗАТЕЛЬНО.** И Apple, и Google устанавливают **минимальные версии SDK** и дают дедлайн.

##### 🍎 Apple — правила обновления

| Правило | Описание | Последствия невыполнения |
|---|---|---|
| **Минимальный Xcode + SDK** | Apple каждый год (осенью) объявляет: «С [дата] все новые приложения и обновления должны быть собраны на Xcode [версия] с iOS SDK [версия]» | **Нельзя отправить обновление** пока не обновишь Xcode. Существующее приложение остаётся в магазине, но обновить его не получится |
| **Deadline обычно:** | Весна следующего года (примерно апрель) для новых приложений. Для обновлений — аналогично | Пример: iOS 18 SDK (Xcode 16) — обязательно с весны 2025 |
| **UIKit / SwiftUI deprecated API** | Если Apple удалит API в новом SDK — код не скомпилируется. Нужно мигрировать | Сборка не пройдёт → невозможно отправить в магазин |
| **Privacy Manifest (PrivacyInfo.xcprivacy)** | С мая 2024 — обязательно для всех новых приложений и обновлений | Без него → отказ при ревью |
| **Новые устройства** | Если вышел iPhone с новым размером экрана / Dynamic Island — приложение должно корректно отображаться | Apple тестирует на новейших устройствах |

##### 🤖 Google — правила обновления

| Правило | Описание | Последствия невыполнения |
|---|---|---|
| **Target API Level** | Google каждый год повышает минимальный `targetSdkVersion`. Примерно **август каждого года** для новых приложений, **ноябрь** — для обновлений | **Нельзя отправить обновление** пока не обновишь targetSdkVersion. Старые приложения могут быть скрыты из магазина для новых устройств |
| **Deadline 2025:** | `targetSdkVersion = 35` (Android 15) — обязательно с августа 2025 для новых, ноября 2025 для обновлений | Если не обновить → приложение станет недоступно на новых устройствах |
| **Скрытие старых приложений** | С 2024 Google **скрывает** приложения, которые не обновлялись 2+ года и имеют старый targetSdkVersion, из результатов поиска для устройств с новым Android | Приложение формально в магазине, но его не найти |
| **Permissions model** | Каждая новая версия Android меняет модель разрешений. Если targetSdk новый, а код не адаптирован → краш или потеря функций | Нужно тестировать на новой версии Android |

---

#### 🧪 Как убедиться что дизайн НЕ сломается при обновлении — чеклист для разработчиков

| # | Что делать | Когда | Инструмент |
|---|---|---|---|
| 1 | **Тестировать на beta-версиях iOS/Android** | Каждое лето (июнь-сентябрь) Apple и Google выпускают beta новых ОС | Xcode beta + iOS beta, Android Studio + Android beta |
| 2 | **Подписаться на Apple Developer News и Android Developer Blog** | Постоянно | [Apple Developer News](https://developer.apple.com/news/), [Android Developers Blog](https://android-developers.googleblog.com/) |
| 3 | **Запускать UI-тесты на всех размерах экранов** | Перед каждым релизом | Xcode Previews, Android Studio Layout Validation |
| 4 | **Проверять deprecated warnings** при сборке | Каждая сборка | Xcode warnings panel, Android Lint |
| 5 | **Автоматические скриншот-тесты** | CI/CD | [swift-snapshot-testing](https://github.com/pointfreeco/swift-snapshot-testing) (iOS), [Paparazzi](https://github.com/cashapp/paparazzi) (Android) |
| 6 | **Проверять Dark Mode** | Перед каждым релизом | Переключить в настройках устройства / эмулятора |
| 7 | **Проверять Dynamic Type / Font Scale** | Перед каждым релизом | Настройки доступности устройства |
| 8 | **Проверять Safe Area / notch / Dynamic Island** | Перед каждым релизом | Запустить на эмуляторах разных устройств |
| 9 | **Проверять RTL (right-to-left)** если поддерживаем арабский/иврит | Перед каждым релизом | Переключить язык устройства на AR/HE |
| 10 | **Обновить зависимости** (npm/pod/gradle) | Минимум раз в квартал | Dependabot / Renovate + ручная проверка |

---

#### ⚠️ Export Compliance (шифрование) — что указать в App Store Connect

> Если приложение использует **ЛЮБОЕ шифрование** (HTTPS, AES, TLS) — Apple спросит при загрузке.

| Вопрос Apple | Наш ответ | Почему |
|---|---|---|
| «Does your app use encryption?» | **Yes** | Мы используем HTTPS + AES-256-GCM для DOB |
| «Does your app qualify for any of the exemptions?» | **Yes** | Стандартное шифрование (HTTPS/TLS для сетевых запросов) — exempt |
| «Does your app implement proprietary encryption?» | **No** | Мы используем стандартные алгоритмы (AES-256-GCM, TLS 1.3) — не собственные |
| Нужен ли ERN (Encryption Registration Number)? | **Нет** | ERN нужен только для собственных проприетарных алгоритмов шифрования или приложений, продающихся в embargoed countries |

> **Для Supabase:** HTTPS-соединение с Supabase — стандартный TLS → попадает под exemption. AES-256-GCM для DOB — стандартный алгоритм → тоже exempt. Ничего дополнительного делать не нужно.

---

#### 📋 Сводный чеклист для разработчиков — «Пройду ли я ревью?»

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║               ЧЕКЛИСТ РАЗРАБОТЧИКА — ПЕРЕД ОТПРАВКОЙ В МАГАЗИН               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  КОД:                                                                         ║
║  ☐ Нет вызовов Private API                                                    ║
║  ☐ Нет загрузки исполняемого кода (eval, dlopen, динамические библиотеки)     ║
║  ☐ Все deprecated API заменены или имеют fallback                              ║
║  ☐ Privacy Manifest (PrivacyInfo.xcprivacy) заполнен (iOS)                    ║
║  ☐ Info.plist: Purpose String для КАЖДОГО запрашиваемого разрешения (iOS)     ║
║  ☐ Нет лишних разрешений — каждое обосновано реальной функцией                ║
║  ☐ Export Compliance = Yes → Standard encryption exemption (iOS)               ║
║  ☐ targetSdkVersion = актуальная версия (Android)                             ║
║  ☐ Приложение НЕ крашится на основных экранах                                 ║
║                                                                               ║
║  ДИЗАЙН:                                                                      ║
║  ☐ Safe Area / notch / Dynamic Island — контент не обрезается                  ║
║  ☐ Все размеры экранов — от SE до Pro Max (iOS), от 5" до tablet (Android)   ║
║  ☐ Dark Mode — текст читается, контрастность достаточная                      ║
║  ☐ Dynamic Type (iOS) / Font Scale (Android) — UI не ломается при крупном     ║
║  ☐ Edge-to-edge (Android 15+) — контент не за status/navigation bar           ║
║  ☐ RTL проверен (если есть AR/HE в локализации)                               ║
║                                                                               ║
║  SDK И ОБНОВЛЕНИЯ:                                                            ║
║  ☐ Xcode + iOS SDK — актуальная версия (проверить Apple требования)           ║
║  ☐ Android targetSdkVersion — актуальная (проверить Google требования)        ║
║  ☐ Все зависимости обновлены (нет известных CVE)                              ║
║  ☐ Протестировано на beta-версии следующей ОС (если доступна)                 ║
║                                                                               ║
║  ДАННЫЕ:                                                                      ║
║  ☐ Data Safety (Google Play) заполнена и соответствует реальности              ║
║  ☐ Privacy Nutrition Label (Apple) заполнена и соответствует реальности       ║
║  ☐ DOB не попадает в аналитику — только age_bracket                           ║
║  ☐ Нет fingerprinting / скрытого сбора данных                                 ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## 2. ✅ ОТКРЫТЫЕ СТРАНЫ — где хватает базовых 10 пунктов

> **Принцип: в этих странах хватает РОВНО ТОГО ЧТО НУЖНО ДЛЯ МАГАЗИНОВ.**
> DOB форма + блок < 18 + Privacy Policy + модерация UGC = закон соблюдён.
> **Всё остальное — ЗАБЛОКИРОВАНО (только 9 стран).**
>
> ✅ = Проверено. Наших 10 пунктов достаточно для запуска. Дополнительные доработки НЕ нужны.

### Основные страны запуска

| Страна | Закон | Линк на закон | Почему хватает наших 10 пунктов |
|---|---|---|---|
| 🇺🇸 **США** (все штаты, включая Калифорнию) | COPPA (16 CFR 312) + CAADCA (AB 2273) | [COPPA](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312) / [CAADCA](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273) | COPPA = для сервисов направленных на детей до 13. Мы 18+ → не подпадаем. Калифорния: нужны профили приватные по умолчанию (это просто настройка, не блокировка) |
| 🇨🇦 **Канада** | PIPEDA | [Justice](https://laws-lois.justice.gc.ca/eng/acts/p-8.6/) | Нет спец. требований к 18+ сервису. DOB хватает |
| 🇪🇺 **ЕС** (27 стран, включая Францию, Германию + Латвия, Литва, Эстония) | GDPR Art. 8 + DSA Art. 28 | [GDPR Art. 8](https://gdpr-info.eu/art-8-gdpr/) / [DSA Art. 28](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | **GDPR Art. 8 = ВОЗРАСТНОЙ закон**: каждая страна ЕС устанавливает «возраст цифрового согласия» (от 13 до 16). Мы блокируем ВСЕХ < 18 → автоматически соблюдаем ВСЕ 27 стран (см. таблицу ниже) |
| 🇯🇵 **Япония** | Нет спец. закона | — | Нет закона о верификации возраста в соцсетях. DOB хватает |
| 🇮🇱 **Израиль** | Нет спец. закона (март 2026) | — | Спец. закона нет. Мониторить |
| 🇮🇳 **Индия** | DPDP Act 2023, §9 | [IndiaCode](https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf) | Метод верификации не определён регулятором. DOB хватает (пока). Мониторить |
| 🇺🇦 **Украина** | Закон «О защите персональных данных» (№ 2297-VI) | [Рада](https://zakon.rada.gov.ua/laws/show/2297-17) | Нет спец. требований к верификации возраста. DOB хватает |
| 🇰🇿 **Казахстан** | Закон «О персональных данных» (№ 94-V) | [adilet.zan.kz](https://adilet.zan.kz/rus/docs/Z1300000094) | Нет спец. закона о верификации возраста. DOB хватает |
| 🇬🇪 **Грузия** | Закон «О защите персональных данных» (2011) | [matsne.gov.ge](https://matsne.gov.ge/en/document/view/1561437) | Ориентируется на стандарты ЕС. DOB хватает |
| 🇦🇲 **Армения** | Закон «О защите персональных данных» (2015) | [arlis.am](https://www.arlis.am/documentview.aspx?docID=98818) | DOB хватает. Нет спец. требований |
| 🇦🇿 **Азербайджан** | Закон «О персональных данных» (2010) | [e-qanun.az](https://e-qanun.az/framework/19957) | DOB хватает. Нет спец. требований |
| 🇲🇩 **Молдова** | Закон «О защите персональных данных» (№ 133, 2011) | [legis.md](https://www.legis.md/cautare/getResults?doc_id=110584) | Ориентируется на ЕС. DOB хватает |
| 🇺🇿 **Узбекистан** | Закон «О персональных данных» (2019) | [lex.uz](https://lex.uz/docs/4396428) | DOB хватает. Нет спец. требований |
| 🇰🇬 **Кыргызстан** | Закон «О персональных данных» (2008) | — | DOB хватает |
| 🇹🇯 **Таджикистан** | — | — | Нет спец. закона. DOB хватает |

### Европа (не ЕС) — OPEN ✅

| Страна | Закон | Линк на закон | Почему хватает наших 10 пунктов |
|---|---|---|---|
| 🇨🇭 **Швейцария** | nDSG (новый закон о данных, 2023) | [fedlex.admin.ch](https://www.fedlex.admin.ch/eli/cc/2022/491/en) | Закон аналогичен GDPR. Нет спец. требований к верификации возраста в соцсетях. DOB + Privacy Policy хватает |
| 🇳🇴 **Норвегия** | GDPR (через EEA) + personopplysningsloven | [lovdata.no](https://lovdata.no/dokument/NL/lov/2018-06-15-38) | Часть EEA → применяется GDPR напрямую. Возраст цифрового согласия = 13. Мы блокируем < 18 → соблюдено |
| 🇮🇸 **Исландия** | GDPR (через EEA) | [government.is](https://www.government.is/topics/governance-and-national-budget/data-protection/) | Часть EEA → GDPR. Возраст = 13. DOB хватает |
| 🇱🇮 **Лихтенштейн** | GDPR (через EEA) | [gesetze.li](https://www.gesetze.li/konso/2018235000) | Часть EEA → GDPR. DOB хватает |
| 🇷🇸 **Сербия** | Zakon o zaštiti podataka o ličnosti (2018) | [paragraf.rs](https://www.paragraf.rs/propisi/zakon_o_zastiti_podataka_o_licnosti.html) | Модель на основе GDPR. Нет спец. требований к возрасту в соцсетях. DOB хватает |
| 🇲🇪 **Черногория** | Zakon o zaštiti podataka o ličnosti (2023) | [gov.me](https://www.gov.me/en/documents/0b4cbca6-0426-4ad2-ad3f-d24d0e89c16b) | Новый закон на основе GDPR. DOB хватает |
| 🇧🇦 **Босния и Герцеговина** | Zakon o zaštiti ličnih podataka (2006) | — | Старый закон, нет спец. требований к соцсетям. DOB хватает |
| 🇦🇱 **Албания** | Ligji Nr. 9887 «Për mbrojtjen e të dhënave personale» (2008) | [idp.al](https://www.idp.al/) | Закон о защите данных на базе EU Directive 95/46. DOB хватает |
| 🇲🇰 **Северная Македония** | Закон за заштита на личните податоци (2020) | [dzlp.mk](https://www.dzlp.mk/) | Модель GDPR. DOB хватает |
| 🇹🇷 **Турция** | KVKK (Закон №6698, 2016) | [kvkk.gov.tr](https://www.kvkk.gov.tr/Icerik/6649/Personal-Data-Protection-Law) | Закон о персональных данных на основе EU 95/46. Нет спец. требований к верификации возраста. DOB + Privacy Policy хватает. ⚠️ Возможны локальные запросы BTK (регулятор), но для старта DOB достаточно |

### Азия и Океания — OPEN ✅

| Страна | Закон | Линк на закон | Почему хватает наших 10 пунктов |
|---|---|---|---|
| 🇸🇬 **Сингапур** | PDPA (Personal Data Protection Act, 2012) | [pdpc.gov.sg](https://www.pdpc.gov.sg/Overview-of-PDPA/The-Legislation/Personal-Data-Protection-Act) | Есть давление на app stores по защите детей ([IMDA](https://www.imda.gov.sg/)), но обязательная ID-верификация НЕ требуется для соцсетей. DOB + UGC модерация хватает |
| 🇹🇼 **Тайвань** | PDPA (Personal Data Protection Act, 2012) | [law.moj.gov.tw](https://law.moj.gov.tw/ENG/LawClass/LawAll.aspx?pcode=I0050021) | Нет спец. закона о верификации возраста в соцсетях. DOB хватает |
| 🇭🇰 **Гонконг** | PDPO (Personal Data (Privacy) Ordinance, Cap. 486) | [pcpd.org.hk](https://www.pcpd.org.hk/english/data_privacy_law/ordinance_at_a_Glance/ordinance.html) | Нет universal rule для age verification в соцсетях. DOB + Privacy Policy хватает |
| 🇹🇭 **Таиланд** | PDPA (2019, вступил 2022) | [thaipdpa.com](https://thaipdpa.com/en) | Модель на основе GDPR. Нет спец. требований к верификации возраста. DOB хватает |
| 🇻🇳 **Вьетнам** | Nghị định 13/2023/NĐ-CP (о персональных данных) | [thuvienphapluat.vn](https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Nghi-dinh-13-2023-ND-CP-bao-ve-du-lieu-ca-nhan-556733.aspx) | Согласие родителя для < 16, но мы блокируем < 18 → соблюдено. DOB хватает |
| 🇵🇭 **Филиппины** | DPA (Data Privacy Act, RA 10173, 2012) | [privacy.gov.ph](https://www.privacy.gov.ph/data-privacy-act/) | Нет спец. закона о верификации возраста. DOB хватает |
| 🇮🇩 **Индонезия** | PDP Law (UU 27/2022) | [peraturan.bpk.go.id](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) | Согласие родителя для < 17 (возраст совершеннолетия). Мы блокируем < 18 → соблюдено. DOB хватает |
| 🇵🇰 **Пакистан** | Нет спец. закона (март 2026) | — | Закон о персональных данных на стадии рассмотрения. DOB хватает |
| 🇧🇩 **Бангладеш** | Digital Security Act 2018 | — | Нет спец. требований к верификации возраста. DOB хватает |
| 🇱🇰 **Шри-Ланка** | Personal Data Protection Act (No. 9 of 2022) | [parliament.lk](https://www.parliament.lk/uploads/acts/gbills/english/6242.pdf) | Модель GDPR. Нет спец. требований. DOB хватает |
| 🇳🇵 **Непал** | Privacy Act 2018 | — | Базовый закон о privacy. Нет спец. требований к соцсетям. DOB хватает |
| 🇳🇿 **Новая Зеландия** | Privacy Act 2020 | [legislation.govt.nz](https://www.legislation.govt.nz/act/public/2020/0031/latest/LMS23223.html) | Нет обязательной ID-верификации для соцсетей (в отличие от Австралии). DOB хватает |

### Америка (кроме США и Канады) — OPEN ✅

| Страна | Закон | Линк на закон | Почему хватает наших 10 пунктов |
|---|---|---|---|
| 🇲🇽 **Мексика** | LFPDPPP (Ley Federal de Protección de Datos Personales, 2010) | [diputados.gob.mx](https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf) | Нет спец. требований к верификации возраста. DOB хватает |
| 🇨🇱 **Чили** | Ley 19.628 (Protección de la Vida Privada, 1999) | [bcn.cl](https://www.bcn.cl/leychile/navegar?idNorma=141599) | Старый закон. Нет спец. требований к соцсетям. DOB хватает |
| 🇨🇴 **Колумбия** | Ley 1581 de 2012 (Habeas Data) | [sic.gov.co](https://www.sic.gov.co/tema/proteccion-de-datos-personales) | Согласие родителя для < 18, но мы блокируем < 18 → соблюдено. DOB хватает |
| 🇵🇪 **Перу** | Ley 29733 (Protección de Datos Personales, 2011) | [gob.pe](https://www.gob.pe/institucion/anpd/informes-publicaciones/2184901-ley-n-29733-ley-de-proteccion-de-datos-personales) | Нет спец. требований к верификации возраста. DOB хватает |
| 🇺🇾 **Уругвай** | Ley 18.331 (Protección de Datos Personales, 2008) | [impo.com.uy](https://www.impo.com.uy/bases/leyes/18331-2008) | Адекватный уровень защиты по стандартам ЕС. DOB хватает |
| 🇦🇷 **Аргентина** | Ley 25.326 (Protección de Datos Personales, 2000) | [infoleg.gob.ar](http://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/64790/norma.htm) | Адекватный уровень по стандартам ЕС. Нет спец. закона о верификации возраста. DOB хватает |

### Африка — OPEN ✅

| Страна | Закон | Линк на закон | Почему хватает наших 10 пунктов |
|---|---|---|---|
| 🇿🇦 **ЮАР** | POPIA (Protection of Personal Information Act, 2013) | [justice.gov.za](https://www.justice.gov.za/inforeg/legal/InfoRegSA-act-2013-004.pdf) | Модель на основе GDPR. Ребёнок = < 18, но согласие родителя НЕ обязательно для сервисов которые блокируют < 18. DOB хватает |
| 🇳🇬 **Нигерия** | NDPR (Nigeria Data Protection Regulation, 2019) → NDPA 2023 | [nitda.gov.ng](https://nitda.gov.ng/ndpr/) | Базовые требования к данным. Нет спец. закона о верификации возраста в соцсетях. DOB хватает |
| 🇰🇪 **Кения** | Data Protection Act, 2019 | [odpc.go.ke](https://www.odpc.go.ke/dpa-act/) | Модель GDPR. Ребёнок = < 18, нужно согласие для обработки данных детей. Мы блокируем < 18 → соблюдено. DOB хватает |
| 🇬🇭 **Гана** | Data Protection Act, 2012 (Act 843) | [dataprotection.org.gh](https://www.dataprotection.org.gh/) | Базовые требования к данным. Нет спец. закона. DOB хватает |

### Что мы делаем во ВСЕХ открытых странах — ровно 10 пунктов:

```
  1. ✅ Рейтинг 17+ / 18+ (Apple) и Adults Only (Google)
  2. ✅ НЕ в Kids/Families категориях
  3. ✅ «Restrict Declared Minors» включено (Google Play)
  4. ✅ Форма ввода даты рождения (DOB) при регистрации
  5. ✅ Блокировка пользователей < 18 лет
  6. ✅ Privacy Policy (ссылка в обоих магазинах)
  7. ✅ Data Safety заполнена (Google Play)
  8. ✅ Модерация UGC: кнопка «пожаловаться» + блокировка юзеров
  9. ✅ Удаление аккаунта: кнопка в приложении (Apple + Google)
  10.✅ Веб-форма удаления данных на сайте (Google Play обязательно)
```

**И ВСЁ. Больше ничего не нужно для этих стран.**
**Без пунктов 9 и 10 — БЛОКИРОВКА ПУБЛИКАЦИИ в магазинах.**

### Для Калифорнии — одна дополнительная настройка (не блокировка!)

Калифорния (CAADCA) требует «максимальные настройки приватности по умолчанию». Это значит:
- **Профиль = приватный по умолчанию** (пользователь сам может сделать публичным)
- **Геолокация = выключена по умолчанию** (пользователь сам включает)
- **Push-уведомления = минимальные по умолчанию**

Это НЕ блокировка. Это просто настройки по умолчанию — полезны для ВСЕХ пользователей.

### Для ЕС — Privacy Policy (уже входит в наши 10 пунктов)

Privacy Policy нужна на EN + основные языки (DE, FR, ES, IT, PT). Описать:
1. Сбор DOB (цели: проверка возраста 18+, персонализация контента, бонусы на День Рождения; хранение в зашифрованном виде)
2. GeoIP (цель: определение юрисдикции)
3. Правовое основание: [GDPR Art. 6(1)(a)](https://gdpr-info.eu/art-6-gdpr/) явное согласие + [Art. 6(1)(b)](https://gdpr-info.eu/art-6-gdpr/) исполнение договора
4. Cookie consent banner (если есть куки)

### ❗ Почему могут ОТКАЗАТЬ в публикации или УДАЛИТЬ из магазина (Apple / Google) — ВСЕ возможные причины

> **Это ПОЛНЫЙ список ВСЕХ причин бана/отказа** — не только по возрасту, а ВООБЩЕ ВСЕ.
> Если магазин откажет — приложение не будет доступно НИГДЕ.

| # | Причина отказа / бана | Правило | Как избежать | Магазин | Линк |
|---|---|---|---|---|---|
| | **📋 ОБЯЗАТЕЛЬНЫЕ ЭЛЕМЕНТЫ** | | | | |
| 1 | **Нет модерации UGC** — нет кнопки «пожаловаться», нет блокировки юзеров | Apple §1.2, Google UGC Policy | Реализовать: кнопка жалобы + блокировка + модерация контента | Оба | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) / [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| 2 | **Нет Privacy Policy** | Apple §5.1.1, Google обязательно | Опубликовать Privacy Policy и указать ссылку в обоих магазинах | Оба | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| 3 | **Неправильный рейтинг** — указал что контент безопасный, а есть UGC для взрослых | Apple §2.3.6, Google IARC | Честно ответить на опросник рейтинга → получить 17+/18+ | Оба | [Apple §2.3.6](https://developer.apple.com/app-store/review/guidelines/#legal) |
| 4 | **В категории Kids/Families** а контент 18+ | Apple §1.3, Google Families | НЕ ставить в Kids. Указать 18+ аудиторию | Оба | [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) |
| 5 | **Нет проверки возраста** при 18+ контенте | Apple §1.1, Google правила | Реализовать DOB форму — этого достаточно | Оба | [Apple §1.1](https://developer.apple.com/app-store/review/guidelines/) |
| 6 | **Data Safety не заполнена** (Google Play) | Google обязательно | Заполнить Data Safety Section: какие данные, зачем, шифрование | Google | [Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en) |
| 7 | **Restrict Declared Minors НЕ включен** (Google Play) при 18+ контенте | Google Families Policy | Включить «Restrict Declared Minors» в Play Console | Google | [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) |
| | **🗑️ УДАЛЕНИЕ АККАУНТА (КРИТИЧНО!)** | | | | |
| 8 | **Нет кнопки «Удалить аккаунт» в приложении** | Apple обязательно с июня 2022 | Кнопка «Delete Account» в настройках | Apple | [Apple Account Deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) |
| 9 | **Нет ВЕБ-ФОРМЫ для удаления данных** | Google Play обязательно с дек. 2023 | Создать веб-страницу `bestme.app/delete-account` и указать ссылку в Data Safety | Google | [Google Account Deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en) |
| 10 | **Удаление аккаунта слишком сложное** (скрыто, много шагов) | Apple §5.1.1(v) | Максимум 2-3 клика: Настройки → Аккаунт → Удалить. НЕ требовать звонок/email для удаления | Apple | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| | **📱 ТЕХНИЧЕСКИЕ ПРИЧИНЫ** | | | | |
| 11 | **Приложение не работает / крашится** | Обе платформы | Протестировать перед отправкой. Все экраны должны работать | Оба | — |
| 12 | **Пустые экраны / заглушки** | Apple §2.1, Google | **Простым языком:** Каждая кнопка и каждый экран в приложении должны работать. Если кнопка ведёт на пустой экран с надписью «Coming Soon» или «В разработке» — Apple **откажет**. Перед отправкой на ревью пройтись по ВСЕМ экранам и убедиться что везде есть реальный контент/функционал. Если фича не готова — **убрать кнопку** | Оба | [Apple §2.1](https://developer.apple.com/app-store/review/guidelines/#functionality) |
| 13 | **Нет демо-аккаунта для ревьюера** | Apple требует | Предоставить тестовый логин/пароль в App Store Connect для ревью | Apple | [Apple Review](https://developer.apple.com/app-store/review/) |
| 14 | **Приложение = обёртка над веб-сайтом** (WebView без native функций) | Apple §4.2 | Должна быть native функциональность, не просто WebView | Apple | [Apple §4.2](https://developer.apple.com/app-store/review/guidelines/#minimum-functionality) |
| | **🔒 ПРИВАТНОСТЬ И ДАННЫЕ** | | | | |
| 15 | **Сбор данных без раскрытия** — приложение собирает данные которые не описаны в Data Safety / Privacy Policy | Apple §5.1.1, Google Data Safety | ВСЕ собираемые данные описать в Privacy Policy + Data Safety | Оба | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| 16 | **Tracking без ATT** (iOS) — трекинг пользователя без запроса разрешения на iOS 14.5+ | Apple §5.1.2(i) ATT | Показать системный диалог ATT ПЕРЕД любым трекингом (IDFA, Facebook SDK и т.д.) | Apple | [Apple ATT](https://developer.apple.com/documentation/apptrackingtransparency) |
| 17 | **NSUserTrackingUsageDescription отсутствует** в Info.plist (iOS) | Apple ATT | Добавить строку в Info.plist: описание зачем нужен трекинг | Apple | [Apple ATT](https://developer.apple.com/documentation/apptrackingtransparency) |
| 18 | **Передача данных третьим лицам без раскрытия** | Google Data Safety, Apple §5.1.2 | Перечислить ВСЕ SDK: аналитика (Firebase, Amplitude), рекламу, crash reporting | Оба | — |
| | **⚠️ КОНТЕНТ** | | | | |
| 19 | **Нелегальный контент** (CSAM, терроризм, экстремизм) | Обе платформы + законы ВСЕХ стран | Модерация + правила сообщества + auto-detection (PhotoDNA для CSAM) | Оба | — |
| 20 | **Порнография без ограничений** | Apple §1.1.4 — запрещает порно полностью | Apple НЕ допускает порнографический контент. Google — только с правильным рейтингом | Apple | [Apple §1.1.4](https://developer.apple.com/app-store/review/guidelines/) |
| 21 | **Health claims без disclaimer** | Apple §1.4.1 | Если есть контент о здоровье → disclaimer «Не является медицинской рекомендацией» | Apple | [Apple §1.4.1](https://developer.apple.com/app-store/review/guidelines/) |
| | **💰 ПОКУПКИ И ПЛАТЕЖИ** | | | | |
| 22 | **Встроенные покупки в обход магазина** (на iOS) | Apple §3.1.1 — обязательно через In-App Purchase | Если есть подписки/покупки на iOS → только через Apple IAP (комиссия 15-30%) | Apple | [Apple §3.1.1](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase) |
| 23 | **Ссылки на внешнюю оплату** (на iOS) | Apple §3.1.1 | НЕ давать ссылки «купи на нашем сайте» из iOS-приложения. **⚠️ НО:** Если **бизнес-профиль** (пользовательский UGC-контент) добавляет свои ссылки, PDF с ценами или квалификацией — это **НЕ нарушение** §3.1.1. Apple запрещает **приложению** (разработчику) направлять пользователей на внешнюю оплату, но **НЕ запрещает** пользователям (бизнесам) публиковать свои собственные ссылки в своих профилях. Бизнес-профиль = UGC, разработчик не несёт ответственности за содержимое ссылок бизнес-пользователя. ⚠️ **Рекомендация:** Уточнить эту интерпретацию с юристом перед релизом, так как Apple может быть строже в пограничных случаях. | Apple | — |
| | **🔧 ПРОЧЕЕ** | | | | |
| 24 | **Спам / скам / мошенничество** | Обе платформы | Реальное приложение с реальной функциональностью | Оба | — |
| 25 | **Копия/клон другого приложения** | Apple §4.1, Google | Приложение должно быть уникальным, не клоном | Оба | — |
| 26 | **Манипуляция рейтингами** (просьба поставить 5 звёзд до использования) | Apple §5.6.1, Google | Не просить рейтинг ДО того как пользователь воспользовался приложением | Оба | [Apple §5.6.1](https://developer.apple.com/app-store/review/guidelines/#app-store) |

**Если все 10 обязательных пунктов выполнены → причин для отказа НЕТ.**

---

## 3. ⛔ ВСЁ ОСТАЛЬНОЕ — ЗАБЛОКИРОВАНО

> **Принцип: заблокированы ТОЛЬКО эти 9 стран. Все остальные страны мира — ОТКРЫТЫ** (наших 10 пунктов хватает).
> Не нарушаем закон = не работаем в этой стране.
> Разблокируем потихоньку, по мере разработки.

### Список заблокированных стран (конкретные коды для GeoIP)

| Страна | Код | Почему блокируем | Что требует закон КРОМЕ наших 10 пунктов | Закон | Линк | Штраф |
|---|---|---|---|---|---|---|
| 🇬🇧 **Великобритания** | `GB` | DOB = самодекларация → Ofcom говорит: **НЕ считается** | ID/паспорт, facial age estimation (Yoti), Open Banking | **Online Safety Act 2023** | [Legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2023/50/contents) | до **10% мирового дохода** |
| 🇦🇺 **Австралия** | `AU` | DOB **НЕ считается**. Жёсткий запрет до 16 | Biometric / eKYC | **Online Safety Amendment Act 2024** | [Legislation.gov.au](https://www.legislation.gov.au/C2024A00127/asmade) | до **AUD $49.5 млн** |
| 🇧🇷 **Бразилия** | `BR` | Самодекларация **ЗАПРЕЩЕНА** прямо в законе | ID-верификация | **Digital ECA** (Lei 15.211/2025) | [Planalto.gov.br](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Lei/L15211.htm) | до **10% дохода в Бразилии** |
| 🇨🇳 **Китай** | `CN` | Обязательна регистрация по **нац. ID**. Без китайского партнёра — невозможно | Национальный ID + китайский партнёр | **Положение 2024** + **PIPL** | [ChinaLawTranslate](https://www.chinalawtranslate.com/en/online-protection-of-minors/) | Блокировка сервиса |
| 🇰🇷 **Юж. Корея** | `KR` | Обязательна верификация через **гос. систему** (i-PIN) | i-PIN / мобильная верификация | **PIPA** Art. 22-2 | [KLRI](https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62389&type=part&key=4) | Значительные штрафы |
| 🇲🇾 **Малайзия** | `MY` | Обязательная **eKYC** для всех соцсетей с 2026 | eKYC по нац. документу | **Online Safety Act 2025** | [MayerBrown](https://www.mayerbrown.com/en/insights/publications/2025/12/malaysias-proposed-social-media-ban-for-children-how-it-compares-with-australia-and-singapore) | до **RM 10 млн** |
| 🇷🇺 **Россия** | `RU` | Данные граждан РФ **обязательно хранить на серверах в РФ**. Без серверов в РФ — нарушение закона. Роскомнадзор заблокирует | Серверы в РФ + регистрация в реестре ОРИ | **ФЗ-152** «О персональных данных» | [consultant.ru](http://www.consultant.ru/document/cons_doc_LAW_61801/) | Блокировка + штрафы |
| 🇧🇾 **Беларусь** | `BY` | Строгий гос. контроль интернета. Сервис могут заблокировать без предупреждения | — | Закон «О персональных данных» (99-З) | [pravo.by](https://pravo.by/document/?guid=12551&p0=H12100099) | Блокировка |
| 🇹🇲 **Туркменистан** | `TM` | Интернет практически закрыт. Единственный провайдер — гос. «Туркментелеком». Нет рынка | — | — | — | — |

### Как блокировать

> ⚠️ **Писать свой код для геоблокировки НЕ нужно.** Блокировка реализуется на уровне инфраструктуры:

| Платформа | Как блокируются страны | Что делать |
|---|---|---|
| **Веб-сайт** | **Cloudflare Firewall Rules** — по заголовку `CF-IPCountry`. Настраивается в панели Cloudflare, код не нужен | Создать правило: `ip.geoip.country in {"GB" "AU" "BR" "CN" "KR" "MY" "RU" "BY" "TM"}` → Block |
| **Мобильное приложение (iOS/Android)** | **Backend API** — при первом запуске приложение отправляет запрос на сервер, сервер определяет страну по IP (через Cloudflare `CF-IPCountry` или MaxMind), возвращает `{ allowed: false }` → приложение показывает экран блокировки | Backend-задача, не frontend |

### Что показывать заблокированным пользователям (мобильное приложение)

Экран блокировки страны (ключ: `country_blocked_screen`):

| Язык | Текст |
|---|---|
| 🇬🇧 EN | We're sorry, our service is not yet available in your country. We are working on expanding availability. |
| 🇷🇺 RU | К сожалению, наш сервис пока недоступен в вашей стране. Мы работаем над расширением. |

### Почему блокировка — это законно и безопасно

- Ты **не нарушаешь закон** страны, если ты **НЕ предоставляешь** сервис в этой стране.
- UK Online Safety Act, австралийский закон, Digital ECA — все применяются только к платформам, которые **работают** в данной юрисдикции.
- Если пользователь из UK зайдёт через VPN — это его ответственность, не твоя (при условии что ты приняла «разумные меры» = GeoIP блокировку).
- **Это стандартная практика** — Netflix, Hulu, множество сервисов блокируют страны.

### ⛔ ЛОКАЛИЗАЦИЯ БАЗ ДАННЫХ — страны где требуется хранить данные на местных серверах

> **Проблема:** некоторые страны ТРЕБУЮТ хранить персональные данные своих граждан **на серверах в этой стране**. Без местных серверов → нарушение закона → блокировка / штрафы.
> На текущем этапе BestMe НЕ может разворачивать серверы в каждой из этих стран.

#### Страны с требованиями локализации данных

| Страна | Код | Требование | Закон | Статус для BestMe | Примечание |
|---|---|---|---|---|---|
| 🇷🇺 **Россия** | `RU` | Хранить ПД граждан РФ **на серверах в РФ** | ФЗ-152, ст. 18 ч. 5 | ⛔ **ЗАБЛОКИРОВАНА** (уже в списке) | Роскомнадзор блокирует за нарушение |
| 🇨🇳 **Китай** | `CN` | Хранить данные **в Китае**. Трансграничная передача = аудит безопасности | PIPL Art. 40 + Положение 2024 | ⛔ **ЗАБЛОКИРОВАН** (уже в списке) | Невозможно без китайского партнёра |
| 🇻🇳 **Вьетнам** | `VN` | С 2023: ряд данных хранить **на территории Вьетнама** | Nghị định 13/2023/NĐ-CP | ⚠️ **Оставить ОТКРЫТЫМ** | Закон применяется к «важным» данным и крупным платформам. Малые платформы = низкий риск. Мониторить |
| 🇮🇩 **Индонезия** | `ID` | Раньше требовали локальные серверы, в 2024 **смягчили** | PP 71/2019 → GR 2024 | ✅ **ОТКРЫТА** | Трансграничная передача разрешена при наличии механизмов защиты |
| 🇮🇳 **Индия** | `IN` | DPDP Act 2023: пока **НЕТ требования** локализации (убрали из финальной версии) | DPDP Act 2023 | ✅ **ОТКРЫТА** | Мониторить DPDP Rules — могут добавить ограничения |
| 🇰🇿 **Казахстан** | `KZ` | С 2016: ПД граждан КЗ хранить **в базах данных на территории КЗ** | Закон РК №94-V, ст. 16 | ⚠️ **Оставить ОТКРЫТЫМ** | На практике контроль слабый для иностранных сервисов. Мониторить |
| 🇳🇬 **Нигерия** | `NG` | NDPR: нет жёсткого требования, но **рекомендовано** хранить копию локально | NDPR 2019 | ✅ **ОТКРЫТА** | Рекомендация, не обязательство |
| 🇹🇷 **Турция** | `TR` | KVKK: трансграничная передача = **согласие** пользователя ИЛИ адекватная страна | KVKK (закон 6698) | ✅ **ОТКРЫТА** | Достаточно получить согласие в Privacy Policy / Consent Flow |

#### ❓ Как быть с чатами? Если один пользователь в одной стране, а другой — в другой?

> **Вопрос:** если два пользователя из разных стран переписываются — как хранить данные, если каждая страна требует хранить у себя?

**Ответ: это НЕ реализуемо на текущем этапе, и НЕ нужно.**

Вот почему:
1. **Мы БЛОКИРУЕМ страны с жёсткой локализацией** (Россия, Китай) → проблема не возникает
2. **Остальные открытые страны** (США, ЕС, Канада, Япония, Израиль и т.д.) → **НЕ требуют** хранить данные локально. GDPR позволяет хранить данные в **любой стране с адекватным уровнем защиты** (Израиль = адекватная страна по решению ЕС) или при наличии Standard Contractual Clauses (SCC)
3. **Чаты хранятся ЦЕНТРАЛИЗОВАННО** на наших серверах (Израиль / облако). Оба участника чата → данные на одном сервере. Это нормальная практика (WhatsApp, Telegram, Signal — все так делают)
4. **Израиль = адекватная страна** по решению ЕС → трансграничная передача данных ЕС→Израиль **разрешена** без дополнительных мер

> **Решение для запуска:** Все данные (включая чаты) хранятся на серверах BestMe в Израиле (или облаке). Страны с жёсткой локализацией данных = заблокированы.

#### Итог по локализации

```
УЖЕ ЗАБЛОКИРОВАНЫ (локализация + другие причины):
  ⛔ 🇷🇺 Россия — серверы в РФ обязательны
  ⛔ 🇨🇳 Китай — серверы в Китае обязательны

ОТКРЫТЫ (локализация НЕ проблема):
  ✅ 🇺🇸 США — нет требования локализации
  ✅ 🇪🇺 ЕС — Израиль = адекватная страна (Decision 2011/61/EU)
  ✅ 🇨🇦 Канада — нет требования локализации  
  ✅ 🇯🇵 Япония — нет требования локализации
  ✅ 🇮🇱 Израиль — мы тут
  ✅ 🇮🇳 Индия — нет требования (убрали из DPDP)
  ✅ 🇹🇷 Турция — согласие пользователя достаточно
  ✅ 🇮🇩 Индонезия — смягчили в 2024
  ⚠️ 🇻🇳 Вьетнам — мониторить (малые платформы = низкий риск)
  ⚠️ 🇰🇿 Казахстан — мониторить (слабый контроль)

ДОПОЛНИТЕЛЬНЫХ БЛОКИРОВОК НЕ НУЖНО.
```

---

## 4. Форма даты рождения — при регистрации и через соцсети

> **ВАЖНО: Проверка возраста через DOB = ОБЯЗАТЕЛЬНА для ВСЕХ способов регистрации.**
> Неважно как пользователь входит (email, Google, Facebook, Apple) — он ВСЕГДА видит форму DOB.

### Собственная регистрация (email + имя + пароль)

```
Форма регистрации:
  - Email          ← уже есть
  - Имя            ← уже есть
  - Пароль         ← уже есть
  - Дата рождения  ← ДОБАВИТЬ (день / месяц / год)
```

#### Полный поток собственной регистрации (email)

```
1. Пользователь нажимает «Создать аккаунт» (Sign Up)
       │
       ▼
2. Ввод: Email, Имя, Пароль
       │
       ▼
3. Проверяем GeoIP → определяем страну
       │
       ├── Страна в списке заблокированных (GB, AU, BR, CN, KR, MY, RU, BY, TM)?
       │   └── ДА → Показать экран «Сервис недоступен в вашей стране» → СТОП
       │
       └── НЕТ → Продолжаем
              │
              ▼
4. Показываем экран DOB (дата рождения):
   ┌─────────────────────────────────────┐
   │  Enter your birthdate               │
   │                                     │
   │  To help keep Bestme safe, we       │
   │  require your birthdate.            │
   │  Your birthdate won't be visible    │
   │  on your profile.                   │
   │                                     │
   │  ┌──────────────────────────┐       │
   │  │  [Нейтральный DatePicker] │       │
   │  │  или поле ДД / ММ / ГГГГ │       │
   │  └──────────────────────────┘       │
   │                                     │
   │  🔒 Your date of birth is stored    │
   │  securely and is never shown on     │
   │  your profile.                      │
   │                                     │
   │         [ Add birthdate ]           │
   └─────────────────────────────────────┘
       │
       ▼
5. Рассчитать возраст:

   ├── ≥ 18 → Продолжить → Создать аккаунт
   │         │
   │         ▼
   │   6. Сохранить в базу:
   │      { email, name, password_hash,
   │        dob_encrypted: "AES(1990-05-15)",
   │        age_bracket: "25-34",
   │        country: "US" }
   │         │
   │         ▼
   │   7. Выдать JWT → пользователь вошёл
   │         │
   │         ▼
   │   8. Показать Welcome Screen (ПОТОК 1)
   │
   └── < 18 → ОТКАЗ → показать экран отказа:

       ┌─────────────────────────────────────┐
       │           ❌                         │
       │                                     │
       │   Sorry, Bestme is only             │
       │   available for users 18            │
       │   and older.                        │
       │                                     │
       │   Извините, Bestme доступен         │
       │   только для пользователей          │
       │   старше 18 лет.                    │
       │                                     │
       │          [ OK ]                     │
       └─────────────────────────────────────┘
              │
              ▼
       Нажатие OK → что происходит:
       - Аккаунт НЕ создаётся
       - Записать email в таблицу dob_rejections (anti-retry)
       - Установить cookie/localStorage: age_rejected = true
       - Перенаправить на стартовый экран приложения (экран входа/регистрации)
       - При повторной попытке с тем же email → сразу отказ
```

### Вход через Google / Facebook / Apple

**Почему мы НЕ можем полагаться на возраст из соцсети:**

| Провайдер | Передаёт DOB? | Почему нельзя на это полагаться | Что делать |
|---|---|---|---|
| **Google** | Редко (зависит от scope `profile`) | 1) DOB может быть скрыт в настройках Google 2) Даже если получим — это самодекларация, а не проверка 3) Не все scope дают birthday | **ВСЕГДА** показать форму DOB |
| **Facebook** | Редко (нужно `user_birthday` permission) | 1) Нужно пройти App Review у Facebook 2) Разрешение может быть отклонено 3) Пользователь мог указать фейковую дату | **ВСЕГДА** показать форму DOB |
| **Apple** | **Никогда** | Apple принципиально НЕ передаёт возраст/DOB. Только email + имя. | **ВСЕГДА** показать форму DOB |

**Вывод: при ЛЮБОМ способе входа — ВСЕГДА показывать форму DOB.**

### Полный поток регистрации через соцсеть

```
1. Пользователь нажимает «Войти через Google/Facebook/Apple»
       │
       ▼
2. Получаем от провайдера: email + имя
   (НЕ получаем: возраст, дату рождения)
       │
       ▼
3. Проверяем GeoIP → определяем страну
       │
       ├── Страна в списке заблокированных (GB, AU, BR, CN, KR, MY, RU, BY, TM)?
       │   └── ДА → Показать сообщение «Сервис недоступен в вашей стране» → СТОП
       │
       └── НЕТ → Продолжаем
              │
              ▼
4. Показываем экран DOB (тот же экран, что и при обычной регистрации):
   ┌─────────────────────────────────────┐
   │  Enter your birthdate               │
   │                                     │
   │  To help keep Bestme safe, we       │
   │  require your birthdate.            │
   │  Your birthdate won't be visible    │
   │  on your profile.                   │
   │                                     │
   │  ┌──────────────────────────┐       │
   │  │  [Нейтральный DatePicker] │       │
   │  │  или поле ДД / ММ / ГГГГ │       │
   │  └──────────────────────────┘       │
   │                                     │
   │  🔒 Your date of birth is stored    │
   │  securely and is never shown on     │
   │  your profile.                      │
   │                                     │
   │         [ Add birthdate ]           │
   └─────────────────────────────────────┘
       │
       ▼
5. Рассчитать возраст:

   ├── ≥ 18 → Продолжить регистрацию
   │         │
   │         ▼
   │   6. Сохранить в базу:
   │      { email, name, dob_encrypted: "AES(1990-05-15)",
   │        age_bracket: "25-34", country: "US" }
   │      DOB хранится в ЗАШИФРОВАННОМ виде (encryption at rest, GDPR Art. 32)
   │         │
   │         ▼
   │   7. Выдать JWT токен → пользователь вошёл
   │
   └── < 18 → ОТКАЗ → показать экран отказа (см. ниже «Экран отказа при возрасте < 18»)
```

### 🖥️ DOB экран — тексты и ключи переводов (для соцсети и обычной регистрации)

> Стиль как у Pinterest — простой экран с полем даты рождения (см. скриншот).

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Enter your birthdate | `enter_your_birthdate` |
| **Body** | To help keep Bestme safe, we require your birthdate. Your birthdate won't be visible on your profile. | `birthdate_required_for_safety` |
| **Input placeholder** | mm/dd/yyyy | `date_format_placeholder` |
| **Hint** | Use your own birthday, even if this is a business account. | `use_own_birthday_hint` |
| **Primary Button** | Add birthdate | `add_birthdate` |
| **Error (< 18)** | Sorry, Bestme is only available for users 18 and older. | `sorry_18_plus_only` |
| **Privacy note** | Your date of birth is stored securely and is never shown on your profile. | `dob_usage_privacy_note` |

> **Для дизайнера:** Формат даты зависит от локали пользователя (mm/dd/yyyy для US, dd/mm/yyyy для EU).
> Экран блокирует навигацию — пользователь НЕ может закрыть экран или пропустить.

#### 🎁 Microcopy под полем DOB — обязательный поясняющий текст (GDPR Art. 13)

> **Для UI/UX:** Прямо под полем ввода Даты Рождения на экране регистрации нужен маленький серый поясняющий текст.
> По закону ЕС пользователь должен понимать зачем он отдаёт данные, **до** того как нажмёт кнопку.
> **⚠️ ВАЖНО (COPPA):** Текст НЕ ДОЛЖЕН подсказывать пользователю какой возраст нужен для прохода! Нейтральный ввод — без упоминания «18+» в microcopy. Иначе несовершеннолетний просто введёт нужную дату.

| Язык | Текст (microcopy под полем DOB) | Ключ перевода |
|---|---|---|
| 🇬🇧 EN | Your date of birth is stored securely and is never shown on your profile. | `dob_microcopy` |
| 🇷🇺 RU | Ваша дата рождения хранится в зашифрованном виде и никогда не отображается в профиле. | `dob_microcopy` |

### 📅 Нейтральный календарь (Date Picker) — требования к UI

> **Критически важно для прохождения модерации Apple и Google!**

| Платформа | Компонент | Детали |
|---|---|---|
| **iOS** | Стандартный `UIDatePicker` (стиль `.wheels` или `.inline`) | Нативный «барабан» или календарь. НЕ кастомный UI |
| **Android** | `MaterialDatePicker` (Material Design) | Стандартный системный выбор даты |
| **Web** | `<input type="date">` или нейтральные поля `ДД / ММ / ГГГГ` | Либо нативный date picker браузера, либо три отдельных поля |

**⚠️ ВАЖНО — начальная позиция календаря:**

| ❌ НЕЛЬЗЯ | ✅ ПРАВИЛЬНО |
|---|---|
| Открывать календарь на дате ровно 18 лет назад | Открывать на **сегодняшней дате** |
| Открывать календарь на дате ровно 13 лет назад | Открывать с **пустым полем** (пользователь сам прокручивает) |
| Подставлять год рождения по умолчанию | Год = текущий (или пустой) |

> **Почему:** Если календарь открывается уже отмотанным на 18 лет назад — это считается «подсказкой» минимального возраста. Apple и Google могут отклонить приложение. Пользователь должен **сам осознанно** прокрутить год до даты своего рождения.

### 🛑 Правило «Без подсказок» (Neutral Age Gate)

> **Критически важно для прохождения модерации Apple и Google!**
> При вводе даты рождения интерфейс должен быть **абсолютно нейтральным**.
> Мы **НЕ ИМЕЕМ ПРАВА** давать пользователю подсказки о минимальном возрасте.

**Что запрещено на экране DOB:**

| ❌ НЕЛЬЗЯ | Почему |
|---|---|
| Писать «Вам должно быть 18+» на экране ввода DOB | Подсказка: несовершеннолетний введёт фейковую дату |
| Писать «Укажите дату если вам исполнилось 18» | Подсказка минимального возраста |
| Упоминать «18+», «birthday bonuses» в microcopy | Намёк на требуемый возраст |
| Отматывать календарь на 18 лет назад | Подсказка через UI |
| Показывать возрастной рейтинг «18+» на экране DOB | Подсказка |
| Красная подсветка поля при возрасте < 18 **до нажатия кнопки** | Подсказка через валидацию в реальном времени |

**Что разрешено:**

| ✅ МОЖНО | Почему |
|---|---|
| Нейтральный заголовок «Enter your birthdate» | Не намекает на возраст |
| Microcopy «Your date of birth is stored securely...» | Говорит о безопасности, не о возрасте |
| Ошибка **ПОСЛЕ нажатия кнопки**: «Sorry, Bestme is only available for users 18+» | Это результат проверки, не подсказка |
| Пустой календарь / сегодняшняя дата | Нейтральная начальная позиция |

### ❌ Экран отказа при возрасте < 18 — что видит пользователь и что происходит дальше

**Когда появляется:** После нажатия кнопки «Add birthdate», если возраст < 18.

**Экран отказа:**

```
┌─────────────────────────────────────┐
│                                     │
│              ❌                      │
│                                     │
│   Sorry, Bestme is only             │
│   available for users 18            │
│   and older.                        │
│                                     │
│   Извините, Bestme доступен         │
│   только для пользователей          │
│   старше 18 лет.                    │
│                                     │
│            [ OK ]                   │
│                                     │
└─────────────────────────────────────┘
```

| Элемент | Текст (EN) | Текст (RU) | Ключ перевода |
|---|---|---|---|
| **Иконка** | ❌ (красный крестик или замок) | ❌ | — |
| **Заголовок** | Sorry, Bestme is only available for users 18 and older. | Извините, Bestme доступен только для пользователей старше 18 лет. | `sorry_18_plus_only` |
| **Кнопка** | OK | OK | `ok_button` |

**Что происходит после нажатия OK:**

```
Пользователь нажимает OK
       │
       ▼
1. Аккаунт НЕ создаётся (данные НЕ сохраняются в базу пользователей)
       │
       ▼
2. Anti-retry: записать в таблицу dob_rejections:
   { email, rejected_at, device_id/cookie }
       │
       ▼
3. Установить cookie/localStorage: age_rejected = true
       │
       ▼
4. Перенаправить на СТАРТОВЫЙ ЭКРАН приложения
   (экран входа: «Войти» / «Создать аккаунт» / «Войти через Google»)
       │
       ▼
5. Если пользователь попробует снова с тем же email:
   → Сразу показать экран отказа (без DOB формы)
   → «Регистрация невозможна» / «Registration is not available»
```

#### 🔁 Экран мгновенного отказа при повторной попытке с тем же email

**Когда появляется:** Пользователь ранее получил отказ по возрасту (< 18) и пытается зарегистрироваться повторно с тем же email. Форма даты рождения НЕ показывается — отказ мгновенный.

```
┌─────────────────────────────────────┐
│                                     │
│              🚫                     │
│                                     │
│   Registration is not available.    │
│                                     │
│   Регистрация невозможна.           │
│                                     │
│            [ OK ]                   │
│                                     │
└─────────────────────────────────────┘
```

| Элемент | Текст (EN) | Текст (RU) | Ключ перевода |
|---|---|---|---|
| **Иконка** | 🚫 (запрет) | 🚫 | — |
| **Сообщение** | Registration is not available. | Регистрация невозможна. | `registration_not_available` |
| **Кнопка** | OK | OK | `ok_button` |

**Что происходит после нажатия OK:**
- Перенаправить на **стартовый экран** (экран входа)
- Пользователь может закрыть приложение или попробовать войти с другим email

**⚠️ Отличие от первого отказа:**

| | Первый отказ (< 18) | Повторная попытка с тем же email |
|---|---|---|
| **DOB форма** | Показывается | ❌ НЕ показывается |
| **Сообщение** | «Bestme доступен только для 18+» | «Регистрация невозможна» (без упоминания возраста) |
| **Иконка** | ❌ | 🚫 |
| **Ключ** | `sorry_18_plus_only` | `registration_not_available` |
| **Причина скрытия возраста** | При повторном отказе мы НЕ раскрываем причину, чтобы пользователь не мог понять логику и обойти её |

```
Пользователь вводит email → Backend проверяет dob_rejections
       │
       ├── email НЕТ в dob_rejections → продолжить регистрацию (показать DOB форму)
       │
       └── email ЕСТЬ в dob_rejections → МГНОВЕННЫЙ ОТКАЗ:
              │
              ├── НЕ показывать DOB форму
              ├── НЕ показывать причину («только 18+»)
              ├── Показать: «Регистрация невозможна»
              └── Кнопка OK → Стартовый экран
```

> **Важно для программиста:**
> - НЕ перенаправлять на внешний сайт
> - НЕ показывать «попробуйте через X дней»
> - НЕ давать возможность «изменить дату» на том же экране
> - НЕ раскрывать причину отказа при повторной попытке (не упоминать возраст)
> - Просто вернуть на стартовый экран. Пользователь может закрыть приложение

### Защита от обхода DOB-проверки

| Проблема | Решение |
|---|---|
| Пользователь вводит фейковую дату (30 лет назад) | Это **самодекларация** — наша ответственность ограничена. Мы применяем «разумные меры» (DOB форма). Законы большинства стран это принимают |
| Пользователь повторно регистрируется с другой датой | Привязываем проверку к email. Если email уже в базе → «аккаунт уже существует» |
| Пользователь < 18 обходит через VPN из заблокированной страны | VPN → другая страна → получает DOB форму → если вводит < 18 → блок. Мы приняли «разумные меры» (GeoIP + DOB) |

### 🔒 Anti-retry + device/server lock — что это значит

> **Anti-retry** = защита от повторных попыток ввода DOB после отказа.
> **Device lock** = блокировка на уровне устройства.
> **Server lock** = блокировка на уровне сервера.

**Зачем это нужно:** если пользователь ввёл дату рождения, показывающую возраст < 18, мы отклоняем регистрацию. Без anti-retry он просто обновит страницу и попробует снова с другой датой.

| Мера | Как реализовать | Где блокировать |
|---|---|---|
| **Email lock (server)** | Если email получил отказ по возрасту → записать email в таблицу `dob_rejections`. При повторной попытке с этим email → сразу отказ, без DOB формы | Сервер (база данных) |
| **Device fingerprint (device)** | Сохранить `localStorage` / cookie с флагом `age_rejected=true`. При повторном входе с этого браузера/устройства → сразу отказ | Браузер / приложение |
| **IP rate limit (server)** | Ограничить количество DOB-проверок с одного IP: макс. 3 попытки за 24 часа | Сервер |
| **Cooldown period** | После отказа — блок на 24 часа (или до очистки кэша) | Сервер + устройство |

```
Пользователь вводит DOB → < 18 → ОТКАЗ
       │
       ├── Записать в БД: { email, rejected_at, ip_hash }
       ├── Установить cookie/localStorage: age_rejected = true
       │
       ▼
Повторная попытка с тем же email/устройством → сразу ОТКАЗ
(без показа DOB формы, без возможности изменить дату)
```

> **Важно:** Это НЕ юридическое требование, а **best practice** для защиты. Магазины НЕ требуют anti-retry, но это показывает «разумные меры» и снижает риски.

---

## 5. 📋 Обязательные экраны согласий (Consent Flows)

> **Все экраны ниже — ОБЯЗАТЕЛЬНЫ для публикации.**
> Без них App Store / Google Play **отклонят** приложение, или мы нарушим закон.
> Каждый экран привязан к конкретному закону / правилу магазина.
> Для каждого указаны: тексты для frontend, ключи переводов, логика UI, требования к backend.

```
ПОРЯДОК ПОКАЗА ЭКРАНОВ (после успешной регистрации / входа):

  ┌─────────────────────────────────────────┐
  │ Регистрация (email/Google/Facebook/Apple)│
  │ + DOB → проверка возраста (Секция 4)     │
  └────────────────┬────────────────────────┘
                   ▼
  ПОТОК 1: Welcome Screen (Privacy Defaults + Profile Choice)
  (один раз, автоматически, ПЕРЕД лентой)
  Платформы: iOS + Android
                   │
                   ▼
  → Пользователь попадает в Ленту (Feed)
  Дальнейшие потоки показываются ПО ТРЕБОВАНИЮ
  (когда пользователь впервые нажимает соответствующую кнопку):
                   │
  ┌────────────────┼────────────────────────────┐
  │                │                             │
  ▼                ▼                             ▼
  ПОТОКИ           ПОТОКИ                        ПОТОКИ
  ПО ДЕЙСТВИЮ      ПО ДЕЙСТВИЮ                   ПО ПЛАТФОРМЕ
  (iOS+Android):   (iOS+Android):                (разные):
  │                │                             │
  ├─ Первый пост → ├─ Первое фото              ├─ iOS 14.5+:
  │  ПОТОК 2:      │  с камеры →                │  ПОТОК 6: ATT
  │  UGC Guidelines│  ПОТОК 4: Camera            │  ❌ НЕ НУЖЕН для MVP
  │                │                             │  (нет маркетинговых SDK)
  │                ├─ Первое голосовое →         │
  │                │  ПОТОК 4Б: Microphone       ├─ Веб-сайт:
  │                │                             │  ПОТОК 8: Cookie
  │                ├─ Первое видео →             │
  │                │  ПОТОК 4В: Camera+Mic       │
  │                │                             │
  │                ├─ Первый выбор из галереи →  │
  │                │  ПОТОК 5: Photos            │
  │                │                             │
  │                └─ Нажал «Push» или           │
  │                   онбординг →                │
  │                   ПОТОК 3: Push Notifications│
  │                                              │
  └── В любой момент:                            │
      Settings → Account →                       │
      ПОТОК 9: Delete Account                    │

  ⚠️ ПОТОК 7 (SMS Consent) — ❌ НЕ НУЖЕН для MVP
     Bestme не отправляет SMS пользователям.
```

---

### 🔵 ПОТОК 1: Welcome Screen — Privacy Defaults + Profile Visibility Choice

| | |
|---|---|
| **Цель** | 1) Проинформировать пользователя, что его профиль ПРИВАТНЫЙ по умолчанию (требование CAADCA). 2) Дать ему ВЫБОР сделать профиль публичным (наша бизнес-цель: соцсеть лучше работает с публичными профилями). 3) Показать ссылки на ToS и Privacy Policy |
| **Закон** | [GDPR Art. 25(2)](https://gdpr-info.eu/art-25-gdpr/) — «Data protection by default» + [CAADCA (AB 2273)](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273) — «максимальные настройки приватности по умолчанию» |
| **Платформы** | iOS и Android — одинаковый экран на обеих платформах |
| **Триггер** | Показывается **1 раз** сразу после успешной регистрации, **ПЕРЕД** лентой (Feed) |
| **Блокировка** | Пользователь **НЕ МОЖЕТ** пользоваться приложением, пока не нажмёт кнопку «I understand, continue». Нельзя закрыть, нельзя свайпнуть, нет кнопки «назад» |
| **После нажатия** | Переход на Feed (лента). Экран больше **НИКОГДА** не показывается этому пользователю |

#### 🖥️ Frontend: тексты, ключи переводов, что нарисовать дизайнеру

| Элемент | Текст (EN) | Ключ перевода | Заметка для дизайнера |
|---|---|---|---|
| **Title** | Welcome to Bestme | `welcome_to_bestme` | Крупный заголовок, вверху экрана |
| **Body 1** | Your profile is **private** by default. Only your username is visible to others. | `profile_private_by_default` | Жирным выделить "private" |
| **Body 2** | Your email, phone number, and date of birth are **always** hidden from other users. | `email_phone_dob_always_hidden` | Жирным выделить "always" |
| **Toggle** | Make my profile public (your name, photos, and posts will be visible to all members) | `make_profile_public_toggle` | Toggle/switch — **ВЫКЛЮЧЕН по умолчанию** (OFF). При включении: `profile_visibility = "public"`. При выключении: остаётся `"private"` |
| **Подпись под toggle** | You can change this at any time in Settings → [Privacy & Visibility] | `change_in_settings_privacy_visibility` | Мелкий текст под toggle. `[Privacy & Visibility]` = ссылка → открывает настройки приватности |
| **Primary Button** | I understand, continue | `i_understand_continue` | Кнопка работает и с toggle ON и с toggle OFF |
| **Footer** | By continuing, you acknowledge our [Terms of Service] and [Privacy Policy]. | `by_continuing_acknowledge_terms_privacy` | Мелкий текст. `[Terms of Service]` и `[Privacy Policy]` = кликабельные ссылки → открывают соответствующие документы |

> **Почему "acknowledge" а не "agree":**
> - ToS и Privacy Policy = ИНФОРМИРОВАНИЕ (пользователь ознакомлен).
> - Согласие на обработку данных (GDPR consent) пользователь уже дал при регистрации (DOB microcopy + checkbox).
> - "Acknowledge" = «я ознакомлен» — это безопаснее юридически, чем "agree" (не создаёт дополнительных обязательств).
> - Если юрист скажет вернуть "agree" — это тоже допустимо, т.к. ToS = договор (GDPR Art. 6(1)(b)), а не consent.

#### ⚙️ Логика Frontend (для программиста)

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

> **Важно для программиста:** Не показывать системный запрос разрешений (камера/фото/микрофон) на этом экране. Здесь нет запроса данных — только информирование. Разрешения запрашиваются позже, в контексте (ПОТОК 4).

#### 💾 Backend / База данных

**1. Таблица `users`** — при регистрации:

| Поле | Значение по умолчанию | Комментарий |
|---|---|---|
| `profile_visibility` | `"private"` | CAADCA: приватный по умолчанию. Меняется на `"public"` если toggle = ON |

**2. Таблица `legal_consents_log`** — при нажатии «I understand, continue»:

| Поле | Значение |
|---|---|
| `user_id` | ID пользователя |
| `consent_type` | `privacy_defaults_acknowledged` |
| `consent_version` | `2.0` (версия текста — изменена с 1.0 т.к. текст обновлён) |
| `profile_visibility_chosen` | `"private"` или `"public"` (что выбрал пользователь НА МОМЕНТ регистрации — аудит, даже если потом изменит в настройках) |
| `consented_at` | Timestamp (UTC) |
| `ip_address` | IP пользователя (для GDPR proof) |

#### ❓ Юридические ответы

**Q: Законно ли «уговаривать» пользователя сделать профиль публичным?**
A: ✅ **ДА**, при условии что:
- По умолчанию = PRIVATE (CAADCA compliance ✅)
- Toggle = OFF по умолчанию (пользователь должен СОЗНАТЕЛЬНО включить) ✅
- Нет dark patterns: кнопка «I understand, continue» работает одинаково и с toggle ON и с toggle OFF ✅
- Нет наказания за выбор «private» (функционал одинаковый) ✅

**Q: Законно ли НЕ давать пропустить этот экран?**
A: ✅ **ДА**. GDPR Art. 25(2) ТРЕБУЕТ проинформировать пользователя о настройках приватности. Блокировка экрана = гарантия что пользователь проинформирован. Это стандартная практика (Pinterest, Instagram, TikTok делают то же самое).

**Q: Футер "By continuing, you acknowledge our ToS and PP" — это законно?**
A: ✅ **ДА**. ToS = контракт (GDPR Art. 6(1)(b)). Принятие контракта = обязательное условие использования сервиса. Privacy Policy = информирование (GDPR Art. 13) — не требует отдельного согласия, достаточно ссылки. Это НЕ forced consent — пользователь может не регистрироваться если не согласен.

---

### 🟢 ПОТОК 2: UGC Community Guidelines

| | |
|---|---|
| **Цель** | Получить явное согласие на правила сообщества перед первой публикацией |
| **Закон** | [Apple App Store §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [Google Play UGC Policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| **Триггер** | Показывается **1 раз** при **ПЕРВОЙ** попытке создать пост, комментарий, загрузить фото |
| **Блокировка** | Пока согласие не дано — контент **НЕ публикуется**. Кнопка «Accept» заблокирована, пока не поставлена галочка |
| **Важно** | Чекбокс **НЕ pre-checked** — пользователь должен сам поставить галочку (явное действие) |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme Community Guidelines | `bestme_community_guidelines_title` |
| **Body intro** | Before publishing your first content, please review our rules. | `before_publishing_first_content_review_rules` |
| **Prohibited 1** | • Child sexual abuse material (CSAM) | `prohibited_csam` |
| **Prohibited 2** | • Hate speech and discrimination | `prohibited_hate_speech_discrimination` |
| **Prohibited 3** | • Threats, bullying, and harassment | `prohibited_threats_bullying_harassment` |
| **Prohibited 4** | • Violence and graphic content | `prohibited_violence_graphic_content` |
| **Prohibited 5** | • Fraud and spam | `prohibited_fraud_spam` |
| **Warning** | Violations will result in content removal and account termination. | `violations_removal_termination` |
| **Links** | [Terms of Service] · [Community Guidelines] | `tos_and_community_guidelines` |
| **Checkbox** | ☐ I agree to the Community Guidelines | `agree_to_community_guidelines` |
| **Primary Button** | Accept and continue | `accept_and_continue` |
| **Cancel Button** | Cancel | `cancel` |

> **Важно для дизайнера:** Чекбокс должен быть **ПУСТЫМ** по умолчанию (☐, не ☑). Кнопка «Accept and continue» заблокирована (disabled/greyed out) пока чекбокс не отмечен.

#### ⚙️ Логика Frontend

```
1. Пользователь впервые нажимает «Создать пост» / «Комментировать» / «Загрузить фото»
       │
       ▼
2. Показать модальное окно Community Guidelines
   Кнопка «Accept and continue» — ЗАБЛОКИРОВАНА (disabled)
       │
       ├── Пользователь ставит галочку ☑ → кнопка «Accept and continue» активируется
       │       │
       │       └── Нажимает «Accept and continue» → записать согласие → разрешить публикацию
       │
       └── Пользователь нажимает «Cancel» → окно закрывается, контент НЕ публикуется
```

#### 💾 Backend / База данных

В таблицу `legal_consents_log` записать:

| Поле | Значение |
|---|---|
| `user_id` | ID пользователя |
| `consent_type` | `community_guidelines_accepted` |
| `consent_version` | `1.0` |
| `consented_at` | Timestamp (UTC) |
| `ip_address` | IP пользователя |

---

### 🔔 ПОТОК 3: Push Notifications Permission

| | |
|---|---|
| **Цель** | Объяснить зачем нужны push-уведомления ПЕРЕД системным диалогом |
| **Закон** | [Google Play User Data Policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [App Store Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | Показывается **ДО** системного диалога запроса разрешений. На этапе онбординга или при первой попытке отправить уведомление |
| **Блокировка** | Экран можно **пропустить**, нажав «Not now» |
| **Важно** | Должен быть в потоке использования, не только в Privacy Policy |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme wants to send you notifications | `notifications_permission_title` |
| **Body intro** | We use push notifications to keep you updated on: | `notifications_permission_description` |
| **Bullet 1** | • Messages from friends | `notifications_messages_from_friends` |
| **Bullet 2** | • Important account security alerts | `notifications_security_alerts` |
| **Bullet 3** | • Comments on your posts | `notifications_comments_on_posts` |
| **Marketing note** | Marketing notifications are only sent with your explicit consent. | `marketing_notifications_consent` |
| **Settings note** | You can turn them off at any time in Settings → Notifications. | `turn_off_notifications_in_settings` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

#### ⚙️ Логика Frontend

```
1. Показать наш экран с объяснением (Prominent Disclosure)
       │
       ├── Пользователь нажимает «Continue»
       │       │
       │       ▼
       │   Вызвать стандартное СИСТЕМНОЕ окно iOS/Android:
       │   «"Bestme" Would Like to Send You Notifications: Allow / Don't Allow»
       │       │
       │       ├── Allow → push_notifications_enabled = true
       │       └── Don't Allow → push_notifications_enabled = false
       │
       └── Пользователь нажимает «Not now»
               │
               ▼
           Окно закрывается, системный запрос НЕ вызывается
           (оставляем попытку на потом)
```

#### 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.**
> Запрос пушей регулируется на уровне ОС (iOS/Android хранит статус).

Для бэкенда: в таблице пользователя (`users` или таблице настроек уведомлений) обновить:

| Поле | Значение |
|---|---|
| `push_notifications_enabled` | `true` / `false` — по результату системного окна iOS/Android |

---

### 📷 ПОТОК 4: Camera Permission

| | |
|---|---|
| **Цель** | Объяснить зачем нужен доступ к камере ПЕРЕД системным диалогом |
| **Закон** | [Google Play User Data Policy — Prominent Disclosure](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [App Store Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | При **первой** попытке сделать фото/видео внутри приложения (аватарка, пост) |
| **Блокировка** | Можно пропустить «Not now», но тогда действие (создание поста) прервётся |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme needs access to your camera | `camera_permission_title` |
| **Body intro** | We use your camera so you can: | `camera_permission_description` |
| **Bullet 1** | • Take photos and videos for your posts | `camera_permission_take_photos_videos_posts` |
| **Bullet 2** | • Update your profile picture | `camera_permission_update_profile_picture` |
| **Bullet 3** | • Capture moments to share with friends | `camera_permission_capture_moments_share_friends` |
| **Settings note** | You can change this access at any time in your device settings. | `camera_permission_change_in_device_settings` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

#### ⚙️ Info.plist (iOS)

Ключ: `NSCameraUsageDescription`
Значение: `"This allows you to take photos and record videos to share in your profile and posts."`

#### ⚙️ Логика Frontend

```
1. Пользователь впервые нажимает «Сделать фото»
       │
       ▼
2. Проверить статус разрешения ОС:
       │
       ├── Статус = NOT_DETERMINED (ещё не спрашивали):
       │   → Показать наш экран с объяснением (Шаг 1)
       │       ├── «Continue» → вызвать системный диалог (Шаг 2)
       │       │       ├── Allow → открыть камеру
       │       │       └── Don't Allow → вернуть назад
       │       └── «Not now» → закрыть, действие прервано
       │
       └── Статус = DENIED (ранее отказал):
           → Показать экран с изменённым UI:
               Текст: "You previously declined camera access.
                       Please enable it in your device settings to
                       take photos and videos."
               Кнопка: [Go to Settings] → Deep Link в настройки приложения
```

#### 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.**
> Доступ к камере контролируется на уровне ОС. Бэкенду не нужны юридические логи.

---

### 🎙️ ПОТОК 4Б: Microphone Permission (только для голосовых сообщений в чате)

| | |
|---|---|
| **Цель** | Объяснить зачем нужен доступ к микрофону ПЕРЕД системным диалогом |
| **Закон** | [Google Play Prominent Disclosure](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | При **первой** попытке записать голосовое сообщение в чате |
| **Платформы** | iOS и Android |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme needs access to your microphone | `microphone_permission_title` |
| **Body intro** | We use your microphone so you can: | `microphone_permission_description` |
| **Bullet 1** | • Record and send voice messages in chats | `microphone_permission_record_voice_messages` |
| **Settings note** | You can change this access at any time in your device settings. | `microphone_permission_change_in_device_settings` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

#### ⚙️ Info.plist (iOS)

Ключ: `NSMicrophoneUsageDescription`
Значение: `"This allows you to record voice messages in chats and capture audio for your videos."`

#### ⚙️ Логика Frontend

```
1. Пользователь впервые нажимает «Записать голосовое сообщение» в чате
       │
       ▼
2. Проверить статус разрешения ОС:
       │
       ├── Статус = NOT_DETERMINED (ещё не спрашивали):
       │   → Показать наш экран с объяснением (Шаг 1)
       │       ├── «Continue» → вызвать системный диалог (Шаг 2)
       │       │       ├── Allow → записать голосовое
       │       │       └── Don't Allow → вернуть назад
       │       └── «Not now» → закрыть, действие прервано
       │
       └── Статус = DENIED (ранее отказал):
           → Показать экран с изменённым UI:
               Текст: "You previously declined microphone access.
                       Please enable it in your device settings to
                       send voice messages."
               Кнопка: [Go to Settings] → Deep Link в настройки приложения
```

#### 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.** Доступ к микрофону контролируется на уровне ОС.

---

### 🎥 ПОТОК 4В: Camera + Microphone (для съёмки видео с звуком)

| | |
|---|---|
| **Цель** | Объяснить зачем нужен доступ к камере И микрофону ПЕРЕД системным диалогом |
| **Закон** | [Google Play Prominent Disclosure](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | При **первой** попытке снять видео с звуком для поста |
| **Платформы** | iOS и Android |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme needs access to your camera and microphone | `camera_mic_permission_title` |
| **Body intro** | We need these permissions so you can: | `camera_mic_permission_description` |
| **Bullet 1** | • Record videos with sound for your posts and profile | `camera_mic_permission_record_videos_with_sound` |
| **Settings note** | You can change this access at any time in your device settings. | `camera_mic_permission_change_in_device_settings` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

#### ⚙️ Info.plist (iOS)

Оба ключа должны быть прописаны:
- `NSCameraUsageDescription`: `"This allows you to take photos and record videos to share in your profile and posts."`
- `NSMicrophoneUsageDescription`: `"This allows you to record voice messages in chats and capture audio for your videos."`

#### ⚙️ Логика Frontend

```
1. Пользователь впервые нажимает «Снять видео» для поста
       │
       ▼
2. Проверить статус обоих разрешений (Camera + Microphone):
       │
       ├── Оба = NOT_DETERMINED:
       │   → Показать ОДИН общий экран с объяснением (Шаг 1)
       │       ├── «Continue» → вызвать ДВА системных диалога последовательно:
       │       │   1️⃣ Camera: Allow / Don't Allow
       │       │   2️⃣ Microphone: Allow / Don't Allow
       │       │       ├── Оба Allow → снять видео
       │       │       └── Любой Don't Allow → вернуть назад
       │       └── «Not now» → закрыть, действие прервано
       │
       ├── Один DENIED, другой NOT_DETERMINED:
       │   → Показать экран для недостающего разрешения
       │
       └── Оба DENIED:
           → Экран с [Go to Settings] → Deep Link в настройки
```

#### 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.** Контролируется ОС.

---

### 🖼️ ПОТОК 5: Photos (Gallery) Permission

| | |
|---|---|
| **Цель** | Объяснить зачем нужен доступ к галерее ПЕРЕД системным диалогом |
| **Закон** | [Google Play User Data Policy — Prominent Disclosure](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [App Store Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | При **первой** попытке выбрать фото из галереи телефона |
| **Блокировка** | Можно пропустить «Not now», но тогда действие прервётся |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme needs access to your photos | `photos_permission_title` |
| **Body intro** | We need access to your photo library so you can: | `photos_permission_description` |
| **Bullet 1** | • Upload existing photos and videos to your profile | `photos_permission_upload_existing_to_profile` |
| **Bullet 2** | • Share media in messages with your friends | `photos_permission_share_media_in_messages` |
| **Bullet 3** | • Save photos from Bestme to your device | `photos_permission_save_photos_to_device` |
| **Settings note** | You can change this access at any time in your device settings. | `photos_permission_change_in_device_settings` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

#### ⚙️ Info.plist (iOS)

Ключ: `NSPhotoLibraryUsageDescription`
Значение: `"This allows you to select photos and videos from your library to attach to your posts and messages."`

#### ⚙️ Логика Frontend

```
1. Пользователь впервые нажимает «Выбрать из галереи»
       │
       ▼
2. Проверить статус разрешения ОС:
       │
       ├── Статус = NOT_DETERMINED:
       │   → Показать наш экран с объяснением (Шаг 1)
       │       ├── «Continue» → вызвать системный диалог (Шаг 2)
       │       │       ├── Allow → открыть галерею
       │       │       └── Don't Allow → вернуть назад
       │       └── «Not now» → закрыть, действие прервано
       │
       └── Статус = DENIED:
           → Показать экран с изменённым UI:
               Текст: "You previously declined photo library access.
                       Please enable it in your device settings to
                       upload photos and videos."
               Кнопка: [Go to Settings] → Deep Link в настройки приложения
```

#### 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.**
> Доступ к фото контролируется на уровне ОС.

---

### 🍎 ПОТОК 6: App Tracking Transparency (только iOS)

> **⚠️ ВЫВОД ДЛЯ MVP: ATT НЕ НУЖЕН.**
> Bestme НЕ использует маркетинговые трекеры (Facebook SDK, AppsFlyer, Adjust, Branch).
> Аналитика (Firebase / Apple Analytics) используется только для себя и данные НЕ передаются другим компаниям.
> → ATT можно полностью пропустить в первой версии.
> Когда маркетологи попросят прикрутить трекеры → программисты добавят ATT за пару дней в следующем обновлении.

| | |
|---|---|
| **Статус** | ❌ **НЕ НУЖЕН для MVP** — нет рекламных/трекинговых SDK |
| **Когда понадобится** | Если добавите Facebook SDK, AppsFlyer, Adjust, или любой SDK передающий IDFA третьим лицам |
| **Закон** | [Apple §5.1.2(i)](https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing) |
| **Реализация** | Паттерн Permission Priming (2 шага): наш экран объяснения → системный iOS диалог. Задача на 2-3 дня |

---

### 📱 ПОТОК 7: SMS Consent (TCPA)

> **⚠️ ВАЖНО:** Bestme НЕ отправляет SMS пользователям (нет OTP по SMS, нет маркетинговых рассылок).
> Номер телефона — это данные, которые **бизнес-пользователи** публикуют **добровольно** в своём бизнес-профиле для связи с клиентами (как визитка). Это их собственный выбор, а не наша рассылка.
>
> **Когда TCPA нужен:** TCPA защищает от НЕЖЕЛАТЕЛЬНЫХ звонков/SMS от КОМПАНИИ пользователю. Если Bestme не отправляет SMS → TCPA consent **НЕ нужен**.
>
> **Когда TCPA станет нужен:** Если в будущем добавите OTP-подтверждение по SMS, маркетинговые SMS-рассылки или push-уведомления через SMS — тогда нужно будет добавить чекбокс согласия.

| | |
|---|---|
| **Статус** | ❌ **НЕ НУЖЕН для MVP** — Bestme не отправляет SMS пользователям |
| **Закон** | [TCPA 47 U.S.C. §227(b)](https://www.law.cornell.edu/uscode/text/47/227) — штраф **$1 500** за КАЖДОЕ SMS без письменного согласия |
| **Когда понадобится** | Если добавите: OTP по SMS, маркетинговые SMS, уведомления через SMS |

#### Если в будущем добавите отправку SMS — вот готовая реализация:

<details>
<summary>🔽 Развернуть спецификацию SMS Consent (для будущего)</summary>

**Когда:** При добавлении / изменении номера телефона в Account Settings.

**Реализация:** Форма ввода номера с чекбоксом согласия. Чекбокс **НЕ pre-checked** (явный opt-in).

##### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Input Title** | Phone number: +1 (XXX) XXX-XXXX | `phone_number` |
| **Checkbox** | ☐ I agree to receive SMS from Bestme at this number. Message frequency: as needed (OTP, security, account). Standard SMS rates apply. Reply STOP to opt out. [SMS Communication Policy] | `agree_receive_sms_at_number` |
| **Visibility note** | Your phone is NEVER visible to other users (phone_visibility = Only Me). | `phone_never_visible_to_other_users` |
| **Save Button** | Save | `save` |
| **Cancel Button** | Cancel | `cancel` |

> **Важно для дизайнера:** Чекбокс должен быть **ПУСТЫМ** по умолчанию (☐, не ☑).

##### ⚙️ Логика Frontend

```
1. Пользователь нажимает «Add phone» или «Edit» номер в Account Settings
       │
       ▼
2. Показать форму ввода номера + чекбокс
   Чекбокс = ПУСТОЙ по умолчанию
       │
       ├── Если это ПЕРВОЕ добавление номера:
       │   → Чекбокс ПУСТОЙ, нужно явное согласие
       │
       ├── Если пользователь МЕНЯЕТ существующий номер на НОВЫЙ:
       │   → Чекбокс автоматически ОЧИЩАЕТСЯ (нужно новое согласие для нового номера)
       │
       ├── «Save» → отправить на сервер: { phone, sms_consent: true/false }
       │
       └── «Cancel» → закрыть, номер НЕ обновляется, старое согласие остаётся
```

##### 💾 Backend / База данных

| Поле | Значение |
|---|---|
| `phone_number` | Новый номер |
| `sms_consent` | `true` / `false` — привязан строго к ЭТОМУ номеру |
| `sms_consent_at` | Timestamp (UTC) — точное время согласия |
| `sms_consent_ip` | IP пользователя — для аудита TCPA |

> **ВАЖНО:** Если номер изменился → старое согласие **больше не действует**. Новое согласие = для нового номера.

</details>

---

### 🍪 ПОТОК 8: Cookie Consent Banner (ePrivacy / GDPR)

| | |
|---|---|
| **Цель** | Получить согласие на использование cookies (аналитика, реклама) |
| **Закон** | [ePrivacy Directive 2002/58/EC](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058) (ЕС) · [GDPR Art. 6/7](https://gdpr-info.eu/art-7-gdpr/) · [CNIL Guidelines](https://www.cnil.fr/en/cookies-and-other-tracking-devices) (Франция) |
| **Когда** | При **первом** посещении web-версии / сайта приложения. Для мобильного приложения — при наличии WebView с куками или SDK аналитики на веб-ресурсах |
| **Блокировка** | Пользователь может отказаться (нажать «Reject non-essential»). Обязательные (strictly necessary) куки работают без согласия |
| **Важно** | **НЕ** pre-checked. По умолчанию выбрано «Only essential cookies». ЕС требует **opt-in**, не opt-out |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | We use cookies | `cookie_consent_title` |
| **Body** | Bestme uses cookies to improve your experience. Essential cookies are required for the app to work. Analytics and advertising cookies are optional. | `cookie_consent_description` |
| **Essential label** | ✅ Essential cookies (always active) | `cookie_essential_always_active` |
| **Analytics label** | ☐ Analytics cookies | `cookie_analytics` |
| **Advertising label** | ☐ Advertising cookies | `cookie_advertising` |
| **Primary Button** | Accept all | `cookie_accept_all` |
| **Secondary Button** | Accept essential only | `cookie_accept_essential_only` |
| **Tertiary link** | Cookie settings | `cookie_settings` |
| **Privacy link** | [Privacy Policy] | `privacy_policy_link` |

> **Для дизайнера:** По умолчанию Analytics и Advertising = **ВЫКЛЮЧЕНЫ** (☐). Только Essential = включён всегда и нельзя отключить. Это требование ЕС (opt-in, не opt-out).

#### ⚙️ Логика Frontend

```
1. Пользователь впервые открывает веб-версию / сайт
       │
       ▼
2. Показать Cookie Banner внизу экрана
   Essential cookies = ON (нельзя отключить)
   Analytics = OFF по умолчанию
   Advertising = OFF по умолчанию
       │
       ├── «Accept all» → включить все cookies, закрыть баннер
       │
       ├── «Accept essential only» → только essential, закрыть баннер
       │
       └── «Cookie settings» → показать детальные настройки с toggle для каждого типа
```

#### 💾 Backend / База данных

> Cookie preferences **НЕ нужно** записывать в `legal_consents_log`.
> Хранить cookie consent preference в `localStorage` / cookie самого браузера.
> Для мобильного приложения: если нет WebView с cookies — этот баннер **НЕ нужен** (SDK-аналитика для MVP работает без ATT, т.к. нет трекинговых SDK).

---

### 🔴 ПОТОК 9: Delete Account (GDPR Art. 17 + Apple §5.1.1(v))

| | |
|---|---|
| **Цель** | Дать пользователю возможность полностью удалить аккаунт изнутри приложения |
| **Закон** | [GDPR Art. 17](https://gdpr-info.eu/art-17-gdpr/) — право на удаление · [GDPR Art. 17(2)](https://gdpr-info.eu/art-17-gdpr/) — уведомление третьих лиц · [Apple Account Deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) · [Apple §5.1.1(v)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) · [Google Account Deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en) |
| **Платформы** | iOS, Android, Backend |
| **Приоритет** | **Критический (Blocker для релиза)** — без этого Apple и Google **ЗАБАНЯТ** приложение |
| **Когда** | Доступно в любой момент: Settings (Настройки) → Account (Аккаунт) → Delete Account |

#### 🛑 Главные правила (Anti-Reject)

| # | Правило | Что запрещено | Что будет |
|---|---|---|---|
| 1 | **Никаких писем в поддержку** | Запрещено просить пользователя писать на email для удаления профиля | **Отказ в публикации** |
| 2 | **Никаких ссылок на сайт** | Процесс должен начинаться и завершаться **строго внутри** мобильного приложения | **Отказ в публикации** |
| 3 | **Прозрачность 30 дней** | Пользователь **ДОЛЖЕН** быть прямо в UI предупреждён, что полное физическое удаление займёт 30 дней | Apple §5.1.1(v) |
| 4 | **Легко доступно** | Максимум 2-3 клика: Настройки → Аккаунт → Удалить. НЕ скрывать кнопку | Apple §5.1.1(v) |

#### 📱 Задача для Frontend (UI/UX & Логика экранов)

**Путь к кнопке:** Settings (Настройки) ➡️ Account (Аккаунт) ➡️ Кнопка **красного цвета** `Delete Account` (в самом низу).

**User Flow:**

```
1. Пользователь нажимает [Delete Account] (красная кнопка)
       │
       ▼
2. Шаг безопасности:
   Приложение запрашивает подтверждение личности:
   - Ввод пароля от аккаунта Bestme
   - ИЛИ системный Face ID / Touch ID / PIN-код телефона
   Если проверка НЕ пройдена → процесс прерывается
       │
       ▼
3. Окно предупреждения (Alert):
   ┌──────────────────────────────────────────────┐
   │  Delete Account?                              │
   │                                               │
   │  Are you sure you want to delete your         │
   │  account? Your profile, photos, and posts     │
   │  will be hidden immediately and permanently   │
   │  deleted in 30 days. If you change your       │
   │  mind, just log in again before then.         │
   │                                               │
   │  [Cancel]              [Delete] (красная)     │
   └──────────────────────────────────────────────┘
       │
       ├── «Cancel» → закрыть, ничего не делать
       │
       └── «Delete» → отправить запрос на Backend
              │
              ▼
4. Разлогинить пользователя (Clear session)
   → перекинуть на стартовый экран (Вход/Регистрация)
```

**Frontend тексты и ключи переводов:**

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Button** | Delete Account | `delete_account` |
| **Alert Title** | Delete Account? | `delete_account_confirm_title` |
| **Alert Body** | Are you sure you want to delete your account? Your profile, photos, and posts will be hidden immediately and permanently deleted in 30 days. If you change your mind, just log in again before then. | `delete_account_confirm_body` |
| **Cancel Button** | Cancel | `cancel` |
| **Delete Button** | Delete | `delete_confirm` |

#### ⚙️ Задача для Backend (Логика «Мягкого удаления» и писем)

Аккаунт **НЕ удаляется физически** из БД в ту же секунду. Внедряем **30-дневный Grace Period** (Заморозку).

**Backend Flow:**

```
1. Получен запрос на удаление от Frontend
       │
       ▼
2. Изменить статус пользователя в БД:
   status = "scheduled_for_deletion"
   deletion_requested_at = NOW()
   deletion_scheduled_for = NOW() + 30 days
       │
       ▼
3. Изоляция данных (НЕМЕДЛЕННО):
   - Профиль пользователя → НЕВИДИМ для всех
   - Посты, комментарии, аватарка → СКРЫТЫ
   - В поиске НЕ выдаётся
   - Прямые ссылки → «Пользователь не найден»
       │
       ▼
4. Отправить email пользователю:
   Тема: "Bestme Account Deletion Request"
   Текст: "Hello! Your Bestme account is scheduled for
   deletion. It will be completely erased in 30 days.
   If this wasn't you, or if you changed your mind,
   simply log back into the app before [ДАТА],
   and the deletion will be canceled."
       │
       ▼
5. Token Revocation (в зависимости от способа регистрации):
   - Apple ID → POST https://appleid.apple.com/auth/revoke
   - Google   → POST https://oauth2.googleapis.com/revoke
   - Facebook → DELETE https://graph.facebook.com/{user-id}/permissions
   (подробности в разделах ниже)
       │
       ▼
6. Ежедневный Cron Job проверяет:
   Если прошло 30 дней и юзер НЕ заходил
   → Hard Delete: навсегда стереть ВСЕ данные из базы
```

**Восстановление (Cancel Deletion):** Если пользователь **логинится** в приложение до истечения 30 дней → статус `scheduled_for_deletion` **снимается**, аккаунт снова полностью активный (посты, профиль — всё видно).

#### 🍏 Apple ID Token Revocation (ОБЯЗАТЕЛЬНО для Sign in with Apple)

> Согласно правилам Apple, при удалении аккаунта, который был создан через **Sign in with Apple**, мы **обязаны** программно отозвать токен авторизации через Apple REST API.

**Когда:** В момент перехода в статус `scheduled_for_deletion`, если пользователь регистрировался через Apple ID.

**Что делать:**

| Параметр | Значение |
|---|---|
| **Endpoint** | `POST https://appleid.apple.com/auth/revoke` |
| **Content-Type** | `application/x-www-form-urlencoded` |
| `client_id` | App ID нашего приложения (без Team ID) |
| `client_secret` | JWT, подписанный приватным ключом разработчика Apple |
| `token` | `refresh_token` или `access_token` пользователя (сохранён при регистрации) |
| `token_type_hint` | `refresh_token` или `access_token` |
| **Ожидаемый ответ** | `200 OK` — токен аннулирован |

> 📎 Документация Apple: [Sign in with Apple REST API - Revoke Token](https://developer.apple.com/documentation/sign_in_with_apple/revoke_tokens)

#### 🔵 Google Token Revocation (ОБЯЗАТЕЛЬНО для Sign in with Google)

> При удалении аккаунта, созданного через **Sign in with Google**, Backend должен отозвать токен авторизации через Google API.

**Когда:** В момент перехода в статус `scheduled_for_deletion`, если пользователь регистрировался через Google.

**Что делать:**

| Параметр | Значение |
|---|---|
| **Endpoint** | `POST https://oauth2.googleapis.com/revoke` |
| **Content-Type** | `application/x-www-form-urlencoded` |
| `token` | `access_token` или `refresh_token` пользователя (сохранён при регистрации) |
| **Ожидаемый ответ** | `200 OK` — токен аннулирован |

> 📎 Документация Google: [Revoking a token](https://developers.google.com/identity/protocols/oauth2/web-server#tokenrevoke)

#### 📘 Facebook Token Revocation (если используется Sign in with Facebook)

> При удалении аккаунта, созданного через **Facebook Login**, Backend должен удалить разрешения через Graph API.

**Что делать:**

| Параметр | Значение |
|---|---|
| **Endpoint** | `DELETE https://graph.facebook.com/{user-id}/permissions` |
| **Headers** | `Authorization: Bearer {user_access_token}` |
| **Ожидаемый ответ** | `{"success": true}` |

> 📎 Документация Facebook: [Deleting Permissions](https://developers.facebook.com/docs/facebook-login/permissions/requesting-and-revoking#revoking)

#### 🌐 Веб-форма удаления данных (ОБЯЗАТЕЛЬНО для Google Play)

> Google Play с декабря 2023 **требует** помимо кнопки в приложении ещё и **веб-страницу** для запроса удаления данных (для тех кто уже удалил приложение).

**URL:** `bestme.app/delete-account`

**Форма:** Пользователь вводит email → получает письмо с кодом подтверждения → подтверждает удаление → аккаунт уходит в `scheduled_for_deletion` (те же 30 дней).

**Указать ссылку в:** Play Console → Data Safety → Data deletion.

#### 💾 Backend / База данных

| Поле | Значение |
|---|---|
| `users.status` | `active` / `scheduled_for_deletion` / `deleted` |
| `users.deletion_requested_at` | Timestamp запроса на удаление |
| `users.deletion_scheduled_for` | Timestamp физического удаления (запрос + 30 дней) |

| Cron Job | Что делает |
|---|---|
| `daily_account_cleanup` | Ежедневно: найти аккаунты где `deletion_scheduled_for < NOW()` и `status = scheduled_for_deletion` → **Hard Delete** всех данных |

---

### 📊 Сводная таблица: какие потоки хранить в `legal_consents_log`

| Поток | Записывать в `legal_consents_log`? | Почему |
|---|---|---|
| **ПОТОК 1** Welcome Screen (Privacy Defaults + Profile Choice) | ✅ **ДА** | Нужно доказательство для GDPR + CAADCA (суд). Включает выбор `profile_visibility` |
| **ПОТОК 2** UGC Community Guidelines | ✅ **ДА** | Нужно доказательство для Apple/Google и для модерации |
| **ПОТОК 3** Push Notifications | ❌ НЕТ | Контролируется ОС (iOS/Android) |
| **ПОТОК 4** Camera | ❌ НЕТ | Контролируется ОС |
| **ПОТОК 5** Photos | ❌ НЕТ | Контролируется ОС |
| **ПОТОК 6** ATT (iOS) | ❌ НЕТ (не нужен для MVP) | Нет трекинговых SDK |
| **ПОТОК 7** SMS Consent | ❌ НЕТ (не нужен для MVP) | Bestme не отправляет SMS |
| **ПОТОК 8** Cookie Consent | ❌ НЕТ | Хранится в localStorage/cookie браузера |
| **ПОТОК 9** Delete Account | ✅ **ДА** (в таблице `users`) | `users.status`, `deletion_requested_at`, `deletion_scheduled_for` + email уведомление + Apple Token Revoke |

---

## 6. 🛡️ Модерация UGC — система жалоб и контент-модерации

> **ОБЯЗАТЕЛЬНО для публикации в App Store и Google Play.**
> Без модерации UGC — **отказ в публикации**.
> Законы: [Apple App Store §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [Google Play UGC Policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) · [DSA Art. 16](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) (ЕС)

### Что ОБЯЗАТЕЛЬНО реализовать

| # | Требование | Закон / Правило | Что делать | Линк |
|---|---|---|---|---|
| 1 | **Кнопка «Пожаловаться»** (Report) на каждом посте/комментарии/профиле | Apple §1.2, Google UGC, DSA Art. 16 | Кнопка → выбор причины → отправка на сервер | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) |
| 2 | **Блокировка пользователей** (Block user) | Apple §1.2, Google UGC | Пользователь может заблокировать другого → контент скрыт | [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| 3 | **Контент-модерация** (удаление контента) | Apple §1.2, Google UGC | Модераторы / автоматика удаляют нарушающий контент | — |
| 4 | **Community Guidelines** (правила сообщества) | Apple §1.2, Google UGC, DSA Art. 14 | Опубликовать правила + показать при первой публикации (ПОТОК 2) | [DSA Art. 14](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) |
| 5 | **Механизм обжалования** (Appeal) | DSA Art. 20 (ЕС) | Пользователь может оспорить удаление контента | [DSA Art. 20](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) |
| 6 | **Уведомление о результате жалобы** | DSA Art. 17 (ЕС) | Сообщить заявителю о результате рассмотрения | [DSA Art. 17](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) |

### 🖥️ Frontend тексты и ключи переводов — Report

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Report button** | Report | `report_button` |
| **Report title** | Report this content | `report_this_content` |
| **Reason: Spam** | Spam or misleading | `report_reason_spam` |
| **Reason: Hate** | Hate speech or discrimination | `report_reason_hate` |
| **Reason: Violence** | Violence or threats | `report_reason_violence` |
| **Reason: CSAM** | Child exploitation (CSAM) | `report_reason_csam` |
| **Reason: Harassment** | Bullying or harassment | `report_reason_harassment` |
| **Reason: Nudity** | Nudity or sexual content | `report_reason_nudity` |
| **Reason: Fraud** | Fraud or scam | `report_reason_fraud` |
| **Reason: Other** | Other | `report_reason_other` |
| **Submit button** | Submit report | `submit_report` |
| **Confirmation** | Thank you. We will review this report within 24 hours. | `report_submitted_confirmation` |

### 🖥️ Frontend тексты и ключи переводов — Block User

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Block button** | Block user | `block_user_button` |
| **Confirm** | Block @{username}? They won't be able to see your profile or contact you. | `block_user_confirm` |
| **Blocked** | You have blocked @{username}. | `user_blocked_confirmation` |
| **Unblock** | Unblock | `unblock_button` |

### 🖥️ Frontend тексты и ключи переводов — Content Removal Notice

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Notice title** | Content removed | `content_removed_title` |
| **Notice body** | Your content was removed for violating our Community Guidelines: {reason}. | `content_removed_reason` |
| **Appeal link** | If you believe this was a mistake, you can [appeal this decision]. | `content_removed_appeal` |
| **Appeal button** | Appeal | `appeal_button` |
| **Appeal submitted** | Your appeal has been submitted. We will review it within 48 hours. | `appeal_submitted_confirmation` |

---

## 7. GeoIP — задание

### ✅ Что сделать (одноразовая настройка)

**Веб-сайт — Cloudflare Firewall Rules:**

1. Зайти в **Cloudflare Dashboard** → Security → WAF → Custom Rules
2. Создать правило:
   - **Expression:** `ip.geoip.country in {"GB" "AU" "BR" "CN" "KR" "MY" "RU" "BY" "TM"}`
   - **Action:** Block
3. ⚠️ Добавить тестового пользователя в **белый список** (IP Allowlist) чтобы тестировать из заблокированных стран

**Мобильное приложение — Backend API:**

Cloudflare автоматически добавляет заголовок `CF-IPCountry` к каждому запросу → backend читает его и сохраняет `users.country`. Если страна в списке заблокированных → вернуть `{ allowed: false }` → приложение показывает экран блокировки.

### Что нужно в Privacy Policy

Одна строка: *«We use your IP address to determine your country for legal compliance. We do not store your IP address.»*

---

## 8. Какие данные хранить, какие удалять

| Данные | Хранить? | Причина | Закон |
|---|---|---|---|
| **Дата рождения** | ✅ **ХРАНИТЬ ЗАШИФРОВАННОЙ** | Цели: 1) проверка возраста 18+, 2) персонализация контента по возрастной группе, 3) бонусы/поздравления в День Рождения. **Encryption at rest** (AES-256). Правовое основание: согласие Art. 6(1)(a) + договор Art. 6(1)(b) | [GDPR Art. 32](https://gdpr-info.eu/art-32-gdpr/), [Art. 6](https://gdpr-info.eu/art-6-gdpr/) |
| **Возрастная группа** (`age_bracket`: `"18-24"`, `"25-34"`, `"35-44"`, `"45+"`) | ✅ Да | Контроль доступа, рекомендации AI, аналитика (быстрый доступ без расшифровки DOB) | — |
| **Страна** (код) | ✅ Да | Определение юрисдикции | — |
| **IP-адрес** | ❌ **НЕ ХРАНИТЬ** после GeoIP | IP = персональные данные | [GDPR Recital 30](https://gdpr-info.eu/recitals/no-30/) |

### 🔐 Хранение DOB — бизнес-решение и техническая защита

> **Почему мы храним полную дату рождения (а не удаляем сразу):**
> BestMe — это wellbeing-платформа с бонусной системой. Мы хотим:
> 1. **Поздравлять** пользователей с Днём Рождения и дарить бонусные баллы 🎁
> 2. **Персонализировать** контент под возрастную группу пользователя
> 3. Проверять возраст (18+) при регистрации

> **Это абсолютно законно по GDPR**, если выполнить 3 условия:

| # | Условие | Где описать | Что сделать |
|---|---|---|---|
| 1 | **Прямо указать цели** сбора DOB | Privacy Policy, раздел «Какие данные мы собираем» | Добавить абзац: «Мы собираем полную дату рождения для: 1) проверки возраста 18+, 2) персонализации контента, 3) начисления бонусов в День Рождения» |
| 2 | **Показать пользователю** зачем это нужно | UI: microcopy под полем DOB при регистрации | Текст: «Ваша дата рождения хранится в зашифрованном виде и никогда не отображается в профиле.» (⚠️ НЕ упоминать «18+» — нейтральный ввод!) |
| 3 | **Зашифровать** DOB в базе данных | Backend: encryption at rest | Поле `dob_encrypted` — AES-256. При утечке базы злоумышленники НЕ получат открытые даты рождения |

#### 📄 Готовый текст для Privacy Policy — раздел «Date of Birth»

> **Скопировать в Privacy Policy** (раздел «Data Collection & Purposes»):

```
Date of Birth (DOB)

We collect your full date of birth for the following purposes:

1. Age verification — to ensure all users are 18 years or older, 
   as required by applicable laws (COPPA, GDPR Art. 8, etc.).
2. Content personalization — to tailor content and recommendations 
   to your age group.
3. Birthday bonuses — to provide you with special rewards, gifts, 
   and congratulations on your birthday.

Legal basis (GDPR): Your explicit consent (Art. 6(1)(a)) and 
performance of our contract with you (Art. 6(1)(b) — Terms of Service).

Security: Your date of birth is stored in encrypted form 
(encryption at rest) in accordance with GDPR Art. 32. 
In the event of a data breach, your date of birth cannot be 
read in plain text.

You may request deletion of your date of birth at any time by 
deleting your account (GDPR Art. 17).
```

#### 🖥️ Backend — технические требования к хранению DOB

| # | Требование | Детали | Закон |
|---|---|---|---|
| 1 | **Формат хранения** | `YYYY-MM-DD` (ISO 8601) | — |
| 2 | **Шифрование (encryption at rest)** | Поле `dob_encrypted` — AES-256 или аналог. Ключ шифрования хранится **отдельно** от базы данных (Key Management Service / env variable, НЕ в коде) | [GDPR Art. 32](https://gdpr-info.eu/art-32-gdpr/) |
| 3 | **🚫 DOB НЕ в логах, аналитике, бэкапах** | **СТРОГО ЗАПРЕЩЕНО** передавать точную дату рождения в любые сторонние SDK (Google Analytics, Firebase, Mixpanel, AppsFlyer и т.д.) и записывать в текстовые логи сервера. В аналитику передавать ТОЛЬКО `age_bracket` (например: "18-24", "25-34"). Бэкенд: настроить фильтрацию логов (Sanitization), чтобы DOB никогда не записывался в логи в открытом виде | GDPR Art. 5 (минимизация + безопасность) |
| 4 | **Cron job — День Рождения** | Ежедневный скрипт: расшифровать DOB → найти пользователей где `MM-DD == сегодня` → начислить бонусные баллы → отправить Push-уведомление «С Днём Рождения! 🎉 Вам начислены бонусные баллы!» | Бизнес-логика |
| 5 | **Удаление при удалении аккаунта** | Когда пользователь удаляет аккаунт → `dob_encrypted` удаляется вместе со всеми данными | GDPR Art. 17 |
| 6 | **Data Safety (Google Play)** | В Data Safety Section указать: «Date of birth — collected, encrypted, used for age verification and personalization» | Google Play |

#### 📝 Задание на разработку — Database Architecture (Users Table)

> **Юридическое обоснование (GDPR):**
> - **Art. 5** (Минимизация и безопасность): Храним только то, что нужно, и защищаем то, что храним (шифруем точную дату).
> - **Art. 6(1)(a)** (Согласие): Пользователь сам разрешил нам использовать дату для бонусов на День Рождения.
> - **Art. 6(1)(b)** (Контракт/ToS): Нам нужен возраст и страна, чтобы соблюдать законы (не пускать < 18 и показывать легальный контент).

В таблице Users данные о возрасте и локации хранятся в **трёх отдельных полях:**

| # | Поле | Формат | Как вычисляется | Для чего используется | Кто читает |
|---|---|---|---|---|---|
| 1 | `dob_encrypted` | Зашифрованная строка (AES-256-GCM или AES-256-CBC) | Бэкенд шифрует DOB при регистрации, перед записью в БД | **Только** cron job `daily_birthday_check` раз в год для бонуса в ДР. В остальных случаях это поле **НЕ читается** | Только бэкенд (расшифровка в RAM) |
| 2 | `age_bracket` | Строка (Enum): `"18-24"`, `"25-34"`, `"35-44"`, `"45+"` | Вычисляется сервером **один раз** при регистрации на основе введённой (ещё не зашифрованной) DOB. Раз в год (в ДР) система может пересчитать когорту | Алгоритмы рекомендаций (AI), подбор контента, внутренняя аналитика. **Именно это поле (а не DOB)** отдаётся для персонализации | AI, аналитика, фронтенд |
| 3 | `country` | ISO 3166-1 alpha-2 (`"US"`, `"DE"`, `"IL"`) | Из настроек телефона при регистрации или по IP-адресу (GeoIP, с согласия пользователя) | Соблюдение локальных законов (показ/скрытие контента), базовая аналитика | Бэкенд, аналитика |

#### 🔐 Шифрование чувствительных данных — техническое задание для Backend

> **Основание:** [GDPR Art. 32](https://gdpr-info.eu/art-32-gdpr/) — закон требует защищать персональные данные от утечек соразмерными техническими мерами. DOB = PII (Personally Identifiable Information).

**1. Требование к хранению (Encryption at Rest):**

Поле `dob_encrypted` в базе данных хранится **исключительно** в зашифрованном виде.
- Алгоритм: **AES-256-GCM** (предпочтительно) или **AES-256-CBC**
- Открытая DOB **никогда** не записывается в базу данных

**2. Управление ключами (Key Management):**

| Правило | Детали |
|---|---|
| Ключи **НЕ** в базе данных | Ключи шифрования хранятся **отдельно** от зашифрованных данных |
| Ключи **НЕ** в коде | Запрещено хардкодить ключи в исходном коде приложения |
| Где хранить | Environment Variables (переменные окружения) **или** специализированные сервисы: AWS KMS, HashiCorp Vault, Google Cloud KMS |

**3. Логика работы (Application Level Encryption):**

```
ЗАПИСЬ (Insert/Update):
  Мобильный клиент → HTTPS → Backend получает DOB в открытом виде
       │
       ▼
  Backend шифрует DOB ключом из KMS/env
       │
       ▼
  INSERT INTO users (dob_encrypted) VALUES ('зашифрованная_строка')
  (в БД попадает ТОЛЬКО зашифрованное значение)


ЧТЕНИЕ (Select — только для cron job ДР):
  Backend SELECT dob_encrypted FROM users
       │
       ▼
  Расшифровать в оперативной памяти (RAM) сервера
       │
       ▼
  Выполнить логику (проверка MM-DD == сегодня → бонус)
       │
       ▼
  Немедленно удалить расшифрованное значение из RAM
  (не кешировать, не логировать, не передавать дальше)
```

**4. Запрет прямого SQL-поиска:**

> Из-за шифрования на уровне приложения, прямой SQL-поиск по DOB **невозможен**:
> ```sql
> -- ❌ ЭТО НЕ БУДЕТ РАБОТАТЬ (и это правильно):
> SELECT * FROM users WHERE dob = '1990-05-15'
> ```
> Это **ожидаемое и правильное поведение** для обеспечения безопасности.
> Для аналитики и поиска по возрасту используется отдельное **незашифрованное** поле `age_bracket`.

---

### 🟢 Реализация в Supabase — подробное руководство для разработчика

> Мы используем **Supabase** (PostgreSQL + Auth + Edge Functions + Vault).
> Ниже — конкретные инструкции, как реализовать шифрование, расчёт age_bracket и определение страны.

---

#### 1️⃣ `dob_encrypted` — как шифровать дату рождения в Supabase

**Supabase предлагает два подхода к шифрованию:**

| Подход | Как работает | Плюсы | Минусы |
|---|---|---|---|
| **A) Supabase Vault** (рекомендуется) | Встроенный менеджер секретов Supabase. Шифрование выполняется расширением `pgsodium` прямо в PostgreSQL | Ключи управляются Supabase, не нужно писать свой код шифрования, шифрование на уровне БД | Привязка к инфраструктуре Supabase |
| **B) Application-Level Encryption** (Edge Function) | Шифруем DOB в Edge Function (серверный код) перед записью в Supabase | Ключ полностью под твоим контролем, можно мигрировать | Нужно писать код шифрования самому |

**Подход A — Supabase Vault (рекомендуемый):**

```sql
-- 1. Включить расширения (Supabase Dashboard → Database → Extensions)
CREATE EXTENSION IF NOT EXISTS pgsodium;
CREATE EXTENSION IF NOT EXISTS supabase_vault;

-- 2. Создать секретный ключ в Vault
--    (Supabase Dashboard → Settings → Vault → Create New Secret)
--    Или через SQL:
SELECT vault.create_secret(
  'my-dob-encryption-key-256bit-here',  -- 32-байтовый ключ (генерировать: openssl rand -hex 32)
  'dob_encryption_key',                 -- имя секрета
  'Ключ для шифрования даты рождения'   -- описание
);

-- 3. Таблица users — поле dob_encrypted хранит зашифрованный bytea
ALTER TABLE users ADD COLUMN dob_encrypted bytea;

-- 4. Запись: шифрование при INSERT
--    (выполняется в Edge Function или через RPC-функцию)
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

**Подход B — Application-Level Encryption (Edge Function):**

```typescript
// supabase/functions/register-user/index.ts
import { createClient } from '@supabase/supabase-js'

// Ключ шифрования — в Supabase Edge Function Secrets
// (Supabase Dashboard → Edge Functions → Secrets → DOB_ENCRYPTION_KEY)
const ENCRYPTION_KEY = Deno.env.get('DOB_ENCRYPTION_KEY')! // 256-bit key (ровно 32 символа hex)

async function encryptDOB(dob: string): Promise<string> {
  // ⚠️ Валидация ключа: должен быть ровно 32 байта (256 бит)
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
  // IV генерируется случайно для КАЖДОЙ операции шифрования
  // (AES-GCM требует уникальный IV для каждого шифрования одним ключом)
  const iv = crypto.getRandomValues(new Uint8Array(12)) // 96-bit IV
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(dob)
  )
  // Формат: base64(iv + ciphertext)
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
    new TextEncoder().encode(ENCRYPTION_KEY),  // должен быть ровно 32 байта (проверено при encrypt)
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

**Где хранить ключ шифрования:**

| Хранилище | Как добавить |
|---|---|
| **Supabase Vault** (подход A) | Dashboard → Settings → Vault → «Add new secret» → имя: `dob_encryption_key` |
| **Edge Function Secrets** (подход B) | Dashboard → Edge Functions → выбрать функцию → Secrets → `DOB_ENCRYPTION_KEY` = `<32-hex-chars>` |
| **❌ НЕ ХРАНИТЬ** в коде | Запрещено класть ключ в `.env` файл, который коммитится в Git |
| **❌ НЕ ХРАНИТЬ** в таблице Supabase | Ключ не должен лежать в той же БД, что и зашифрованные данные |

---

#### 2️⃣ Что ещё нужно шифровать по закону?

> **GDPR Art. 32** требует «соразмерные технические меры» для защиты **персональных данных** (PII).

| Данные | Шифровать? | Обоснование |
|---|---|---|
| **Дата рождения** (`dob_encrypted`) | ✅ **ДА — обязательно** | PII — по дате + имени можно идентифицировать личность. Используем AES-256-GCM |
| **Email** | ⚠️ **Нет** (но защитить доступ) | Email нужен для входа — Supabase Auth хранит его в `auth.users`. Supabase уже шифрует данные at rest на уровне диска (AES-256). Дополнительное шифрование email сломает логин. **Защита**: RLS (Row Level Security) + запретить доступ к `auth.users` через API |
| **Пароль** | ✅ **Автоматически** | Supabase Auth хэширует пароли (bcrypt) — ты не храниш пароль в открытом виде |
| **Имя пользователя** | ⚠️ **Нет** | Имя — публичное (отображается в профиле). Шифровать публичные данные бессмысленно |
| **Фото профиля** | ❌ **Нет** | Публичное — не PII в контексте шифрования |
| **Личные сообщения (чат)** | ⚠️ **Рекомендуется E2E** | GDPR Art. 32 рекомендует. Для MVP — Supabase at-rest encryption достаточно. Для v2 — добавить E2E шифрование |
| **IP-адрес** | ❌ **Не хранить** | Мы используем IP только для определения страны (GeoIP), после чего удаляем. В БД хранится только `country` (двухбуквенный код) — это не PII |
| **age_bracket** | ❌ **Нет** | Обобщённая группа ("25-34") — не PII. Невозможно идентифицировать человека |
| **country** | ❌ **Нет** | Двухбуквенный код страны — не PII |

> **Итого: шифровать вручную нужно ТОЛЬКО `dob_encrypted`.** Остальное защищается:
> - Supabase **Disk Encryption** (AES-256 at rest — включено по умолчанию)
> - **RLS** (Row Level Security) — каждый пользователь видит только свои данные
> - **SSL/TLS** — все соединения зашифрованы в транзите
> - **Supabase Auth** — пароли хэшируются автоматически

---

#### 3️⃣ `age_bracket` — как вычислять и зачем

**Что это:** обобщённая возрастная группа пользователя (когорта). НЕ точный возраст.

**Зачем нужна:**
| Цель | Почему `age_bracket`, а не `dob_encrypted` |
|---|---|
| **Рекомендации AI** | Алгоритм подбора контента получает `"25-34"` — этого достаточно для персонализации. Передавать точную DOB алгоритму — нарушение GDPR Art. 5 (минимизация) |
| **Аналитика** | Внутренний дашборд показывает: «60% пользователей — 18-24». Для этого не нужна точная DOB |
| **Контент по возрасту** | Если нужно показать/скрыть определённый контент для разных возрастных групп — достаточно когорты |
| **Быстрый доступ** | Не нужно расшифровывать DOB каждый раз. `age_bracket` — открытое поле, SQL-запросы работают мгновенно |

**Как вычислять (логика):**

```typescript
// Вызывается ОДИН РАЗ при регистрации, ДО шифрования DOB
function calculateAgeBracket(dob: string): string {
  const birthDate = new Date(dob)           // "1990-05-15" → Date

  // ⚠️ Валидация: проверить, что дата корректна
  if (isNaN(birthDate.getTime())) {
    throw new Error(`Invalid date of birth: ${dob}`)
  }

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()

  // Корректировка: если день рождения ещё не наступил в этом году
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  // Определяем когорту
  if (age >= 18 && age <= 24) return '18-24'
  if (age >= 25 && age <= 34) return '25-34'
  if (age >= 35 && age <= 44) return '35-44'
  return '45+'  // 45 и старше
}

// Пример:
// calculateAgeBracket('1990-05-15') → '25-34' (если сейчас 2026 год, возраст 35 → '35-44')
// calculateAgeBracket('2004-01-10') → '18-24' (если сейчас 2026, возраст 22)
```

**Когда пересчитывать:**

| Момент | Что делать |
|---|---|
| **Регистрация** | Вычислить `age_bracket` из открытой DOB → записать в `users.age_bracket` |
| **День рождения (раз в год)** | Cron job `daily_birthday_check`: расшифровать DOB → пересчитать `age_bracket` → обновить в БД (если когорта изменилась, например 24→25 = из "18-24" в "25-34") |

**SQL для Supabase — создание поля:**

```sql
-- Поле age_bracket с проверкой допустимых значений
ALTER TABLE users ADD COLUMN age_bracket text
  CHECK (age_bracket IN ('18-24', '25-34', '35-44', '45+'));
```

---

#### 4️⃣ `country` — как определять страну через Cloudflare + Supabase

**Схема работы:**

```
Пользователь открывает приложение
        │
        ▼
Запрос проходит через Cloudflare (автоматически — Supabase использует CF)
        │
        ▼
Cloudflare добавляет заголовок: CF-IPCountry: US
(определяет страну по IP, сам IP дальше НЕ передаётся в нашу БД)
        │
        ▼
Edge Function / Backend читает заголовок
        │
        ▼
Сохраняет в users.country = "US"
(двухбуквенный код ISO 3166-1 alpha-2)
```

**Edge Function — чтение страны при регистрации:**

```typescript
// supabase/functions/register-user/index.ts
Deno.serve(async (req) => {
  // Cloudflare автоматически добавляет заголовок CF-IPCountry
  const country = req.headers.get('cf-ipcountry') || 'XX'  // 'XX' = неизвестно

  // Проверить: не заблокированная ли страна?
  const BLOCKED_COUNTRIES = ['GB', 'AU', 'BR', 'CN', 'KR', 'MY', 'RU', 'BY', 'TM']
  if (BLOCKED_COUNTRIES.includes(country)) {
    return new Response(JSON.stringify({
      error: 'country_blocked',
      message: 'Service is not available in your region'
    }), { status: 403 })
  }

  // Сохранить country в таблицу users
  const { error } = await supabase
    .from('users')
    .update({ country })
    .eq('id', userId)

  // ...
})
```

**Зачем `country` нужен:**

| Цель | Пример |
|---|---|
| **Какие правила применять** | Пользователь из `DE` (Германия) → применить GDPR-правила для ЕС, показать Consent Flow на немецком |
| **Блокировка стран** | `GB`, `AU`, `BR` и др. — заблокированы. Если `country` совпадает → не пускать |
| **Контент по стране** | Определённый контент может быть доступен/недоступен в конкретных странах (лицензии, локальные законы) |
| **Аналитика** | Понимать, откуда пользователи: «70% из US, 15% из DE, 10% из IL» |

> **Важно:** `country` — это НЕ шифрованное поле. Двухбуквенный код страны — не PII (персональные данные). По коду `US` невозможно идентифицировать конкретного человека.

---

#### 5️⃣ Cron Job — ежедневная проверка дней рождения в Supabase

**Два варианта реализации:**

| Вариант | Как работает |
|---|---|
| **A) pg_cron** (SQL в PostgreSQL) | Расширение `pg_cron` запускает SQL-функцию по расписанию прямо в базе данных |
| **B) Supabase Edge Function + внешний триггер** | Scheduled Edge Function (через cron.org или GitHub Actions), которая вызывает Edge Function каждый день |

**Вариант A — pg_cron (рекомендуется для Supabase Pro и выше):**

```sql
-- Включить расширение
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Функция: найти именинников и начислить бонусы
CREATE OR REPLACE FUNCTION daily_birthday_check()
RETURNS void AS $$
DECLARE
  user_record RECORD;
  decrypted_dob text;
  today_mmdd text;
BEGIN
  today_mmdd := to_char(NOW(), 'MM-DD');

  -- Перебираем всех пользователей (активных)
  FOR user_record IN
    SELECT id, dob_encrypted FROM users WHERE status = 'active'
  LOOP
    -- Расшифровать DOB (пример для pgsodium)
    decrypted_dob := convert_from(
      pgsodium.crypto_aead_det_decrypt(
        user_record.dob_encrypted,
        convert_to(user_record.id::text, 'utf8'),
        (SELECT decrypted_secret FROM vault.decrypted_secrets
         WHERE name = 'dob_encryption_key')::uuid
      ), 'utf8'
    );

    -- Проверить: MM-DD совпадает с сегодняшним днём?
    IF substring(decrypted_dob FROM 6 FOR 5) = today_mmdd THEN
      -- 🎂 День рождения! Начислить бонус
      INSERT INTO birthday_bonuses (user_id, bonus_date, bonus_type)
      VALUES (user_record.id, NOW(), 'birthday_2026');

      -- Отправить Push-уведомление (через Edge Function или webhook)
      PERFORM net.http_post(
        'https://<project>.supabase.co/functions/v1/send-birthday-push',
        jsonb_build_object('user_id', user_record.id)::text,
        'application/json'
      );

      -- Пересчитать age_bracket (если когорта изменилась)
      -- (опционально — вызвать отдельную функцию)
    END IF;

    -- Расшифрованное значение НЕ сохраняется — оно в локальной переменной,
    -- которая уничтожается после каждой итерации цикла
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Расписание: каждый день в 06:00 UTC
SELECT cron.schedule(
  'daily-birthday-check',
  '0 6 * * *',  -- cron-выражение: каждый день в 06:00
  $$ SELECT daily_birthday_check(); $$
);
```

**Вариант B — Edge Function (для Supabase Free):**

```typescript
// supabase/functions/daily-birthday-check/index.ts
// Вызывается внешним cron-сервисом (cron-job.org, GitHub Actions, etc.)

Deno.serve(async (req) => {
  // Проверить секретный токен (защита от несанкционированных вызовов)
  const authHeader = req.headers.get('Authorization')
  if (authHeader !== `Bearer ${Deno.env.get('CRON_SECRET')}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!  // service role для доступа ко всем пользователям
  )

  // Получить всех активных пользователей
  const { data: users } = await supabase
    .from('users')
    .select('id, dob_encrypted')
    .eq('status', 'active')

  const todayMMDD = new Date().toISOString().slice(5, 10) // "03-25"

  for (const user of users || []) {
    const dob = await decryptDOB(user.dob_encrypted) // расшифровать → "1990-05-15"
    const dobMMDD = dob.slice(5, 10) // "05-15"

    if (dobMMDD === todayMMDD) {
      // 🎂 День рождения!
      await supabase.from('birthday_bonuses').insert({
        user_id: user.id,
        bonus_date: new Date().toISOString(),
        bonus_type: 'birthday_2026'
      })

      // Push-уведомление
      // ... (вызов FCM / APNs через Edge Function)
    }
    // Расшифрованная DOB НЕ логируется, НЕ кэшируется
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
})
```

---

#### 6️⃣ Полная схема таблицы `users` в Supabase

```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),

  -- Персональные данные
  name text NOT NULL,
  -- email хранится в auth.users (управляется Supabase Auth)

  -- 🔐 Зашифрованная DOB (ЕДИНСТВЕННОЕ поле, которое мы шифруем вручную)
  dob_encrypted bytea NOT NULL,

  -- 📊 Возрастная когорта (НЕ зашифрована — безопасно, т.к. это обобщённая группа)
  age_bracket text NOT NULL CHECK (age_bracket IN ('18-24', '25-34', '35-44', '45+')),

  -- 🌍 Страна (НЕ зашифрована — двухбуквенный код, не PII)
  country char(2) NOT NULL,  -- ISO 3166-1 alpha-2: "US", "DE", "IL"

  -- Профиль
  profile_visibility text NOT NULL DEFAULT 'private'
    CHECK (profile_visibility IN ('private', 'public')),

  -- Статус аккаунта (для мягкого удаления)
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

#### 📋 Итого — что нужно сделать разработчику

| # | Задача | Где в Supabase | Статус |
|---|---|---|---|
| 1 | Включить расширение `pgsodium` + `supabase_vault` (или использовать Edge Function encryption) | Database → Extensions | ☐ |
| 2 | Создать ключ шифрования в Vault (или Edge Function Secrets) | Settings → Vault / Edge Functions → Secrets | ☐ |
| 3 | Добавить поле `dob_encrypted` (bytea) в таблицу `users` | Database → SQL Editor | ☐ |
| 4 | Добавить поле `age_bracket` (text с CHECK) в таблицу `users` | Database → SQL Editor | ☐ |
| 5 | Добавить поле `country` (char(2)) в таблицу `users` | Database → SQL Editor | ☐ |
| 6 | Написать Edge Function для регистрации: вычислить age_bracket → зашифровать DOB → определить country из CF-IPCountry → сохранить в БД | Edge Functions | ☐ |
| 7 | Настроить RLS (Row Level Security) на таблицу `users` | Database → Policies | ☐ |
| 8 | Настроить cron job `daily_birthday_check` (pg_cron или внешний) | Database → Extensions / External cron | ☐ |
| 9 | **Никогда** не логировать DOB, не передавать в аналитику, не кэшировать | Код-ревью | ☐ |

---

### ❓ «Если не хранить IP — как поддерживать сессию?»

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

**Пример (Node.js / Express):**
```javascript
// При входе — создаём JWT токен
const token = jwt.sign(
  { userId: user.id, ageBracket: '18+', country: 'US' },
  SECRET_KEY,
  { expiresIn: '30d' }
);
// Отправляем токен пользователю
res.cookie('session', token, { httpOnly: true, secure: true });

// При каждом запросе — проверяем токен (НЕ IP)
function authMiddleware(req, res, next) {
  const token = req.cookies.session;       // ← токен из cookie
  const decoded = jwt.verify(token, SECRET_KEY);  // ← проверка
  req.user = decoded;                      // ← знаем кто это
  next();
  // IP-адрес здесь вообще НЕ нужен и НЕ сохраняется
}
```

**Почему IP НЕ нужен для сессии:**
- Токен (JWT / cookie) — это «паспорт» пользователя. Он уникален.
- IP-адрес может меняться (Wi-Fi → мобильная сеть → VPN) — если бы сессия была на IP, она бы слетала при каждом переключении.
- **Ни одна** современная платформа не привязывает сессию к IP. Все используют токены.

**Когда IP используется — и сразу удаляется:**
```
Запрос приходит на сервер
    │
    ├── IP → GeoIP сервис → код страны (например "DE")
    │         └── IP больше не нужен → НЕ сохраняем
    │
    └── Cookie/JWT → идентификация пользователя → сессия
```

### Важно

- DOB хранится **ЗАШИФРОВАННОЙ** в базе данных (AES-256 или аналог, encryption at rest — GDPR Art. 32).
- DOB НЕ должна попадать в логи, аналитику, бэкапы **в открытом виде**. В бэкапах — только в зашифрованном виде.
- Если у тебя серверные логи записывают тела запросов — убери DOB из логирования (не логировать поле `date_of_birth`).
- При утечке базы данных злоумышленники **НЕ должны** получить открытые даты рождения в связке с именами и email (Art. 32).
- IP-адрес тоже не должен попадать в логи надолго — настрой ротацию логов (макс. 7 дней) или замаскируй IP в логах.
- Ежедневный **cron job** проверяет у кого сегодня День Рождения → начисляет бонусные баллы + Push-уведомление с поздравлением.

### GDPR — права пользователей на удаление данных (обязательно для ЕС)

> Это НЕ только про возраст. Это требования GDPR к ЛЮБОЙ обработке данных.
> Но для публикации в магазины — нужна Privacy Policy, а в ней описать эти права.

| Право | Статья GDPR | Что должно быть в приложении | Линк |
|---|---|---|---|
| **Право на удаление** (right to erasure) | Art. 17 | Кнопка «Удалить мой аккаунт» → удаляет ВСЕ данные пользователя (профиль, посты, сообщения) | [Art. 17](https://gdpr-info.eu/art-17-gdpr/) |
| **Право на доступ** (right of access) | Art. 15 | Пользователь может запросить копию ВСЕХ своих данных. Реализовать: экспорт в JSON/CSV | [Art. 15](https://gdpr-info.eu/art-15-gdpr/) |
| **Право на исправление** | Art. 16 | Пользователь может изменить свои данные (имя, email и т.д.) | [Art. 16](https://gdpr-info.eu/art-16-gdpr/) |
| **Право на перенос данных** | Art. 20 | Пользователь может забрать свои данные (тот же экспорт JSON) | [Art. 20](https://gdpr-info.eu/art-20-gdpr/) |
| **Уведомление о утечке** | Art. 33 | Если утечка → уведомить регулятор в 72 часа, пользователей — без задержки | [Art. 33](https://gdpr-info.eu/art-33-gdpr/) |

> **Apple тоже требует**: с 2022 все приложения должны иметь функцию **удаления аккаунта**.
> Это совпадает с GDPR Art. 17. Одна реализация = две птицы одним ударом.
> [Apple — Account Deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/)

---

## 9. Детальный разбор по каждой стране (с линками на законы)

> Подробности по каждой стране — если нужно разобраться детально.
> Краткую сводку см. в [Секции 2 (простые страны)](#2--где-проще-всего-запуститься--страны-где-dob-достаточно) и [Секции 3 (блокировать)](#3--что-блокировать--страны-с-жёсткими-требованиями).

---

### 🇺🇸 США (федеральный уровень)

| | |
|---|---|
| **Что делать** | DOB достаточно. Собирай дату рождения → блокируй < 18 → храни DOB зашифрованной (для персонализации и бонусов). |
| **Почему этого хватит** | COPPA применяется к сервисам «направленным на детей до 13» или имеющим «фактическое знание» о детях. Если ты 18+ и блокируешь всех < 18, COPPA на тебя НЕ распространяется. Но: если узнаешь что пользователь < 13 — обязана удалить его данные. |
| **Закон** | **COPPA** — Children's Online Privacy Protection Act, 16 CFR Part 312 |
| **Линк** | https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312 |
| **Штраф** | до $53 088 за каждое нарушение |

---

### 🇺🇸 Калифорния

| | |
|---|---|
| **Что делать** | DOB достаточно. **Блокировать Калифорнию НЕ нужно.** Нужно просто сделать настройки приватности «максимальными по умолчанию». |
| **Что значит «максимальные настройки приватности»** — конкретно: | |

**Вот что конкретно нужно сделать для Калифорнии (и это полезно для всех пользователей):**

| # | Что сделать | Пример | Зачем |
|---|---|---|---|
| 1 | **Профиль приватный по умолчанию** | При регистрации: `profile_visibility = "private"`, НЕ `"public"`. Пользователь может сам изменить на public. | Закон требует «высокие настройки приватности по умолчанию» |
| 2 | **Геолокация выключена по умолчанию** | НЕ запрашивать GPS при первом входе. Включать ТОЛЬКО если пользователь сам нажмёт «показать моё местоположение». | Закон запрещает отслеживать точную геолокацию без явного согласия |
| 3 | **Нет таргетированной рекламы по умолчанию** | Если показываешь рекламу — показывай КОНТЕКСТНУЮ (по тематике), а НЕ по поведению/профилю пользователя. | Закон запрещает профилирование без согласия |
| 4 | **Данные DOB — с явным согласием** | DOB хранится зашифрованной. Пользователь **явно соглашается** на 3 цели при регистрации (microcopy под полем DOB): 1) проверка возраста, 2) персонализация, 3) бонусы на ДР. CAADCA запрещает использовать данные **age estimation** (технология определения возраста) для других целей — но DOB = **самодекларация с согласием**, а не age estimation. | Указать все цели сбора в UI + Privacy Policy |
| 5 | **Уведомления — минимальные по умолчанию** | Включены только «критические» push (безопасность, пароль). Остальные — выключены, пользователь сам включает. | Часть «privacy by default» |

| | |
|---|---|
| **Почему НЕ нужно блокировать** | Всё что требует CAADCA — это просто правильные настройки по умолчанию. Это несложно, и это хорошая практика для ВСЕХ пользователей, не только калифорнийских. |
| **Закон** | **CAADCA** — California Age-Appropriate Design Code Act (AB 2273, California Civil Code §1798.99.28–99.40) |
| **Линк на закон** | https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273 |
| **Решение суда** | Ninth Circuit, март 2026: https://www.hklaw.com/en/insights/publications/2026/03/ninth-circuit-issues-mixed-ruling-on-california-age-appropriate-design |
| **Вывод** | ✅ Просто сделай приватность по умолчанию максимальной → Калифорния не проблема. |

---

### 🇺🇸 Техас, Юта, Вирджиния, Луизиана

| Штат | Закон | Линк | Комментарий |
|---|---|---|---|
| **Техас** | HB 18 | [Capitol](https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=HB18) | Согласие родителя для < 18. Ты блокируешь < 18 → соблюдён |
| **Юта** | SB 152 | [Legislature](https://le.utah.gov/~2023/bills/static/SB0152.html) | Аналогично. App Store Accountability Act (май 2026) — обязанность Apple/Google, не твоя |
| **Вирджиния** | SB 854 | [Legislature](https://lis.virginia.gov/bill-details/20251/SB854) | Ограничения для < 18. Ты блокируешь < 18 |
| **Луизиана** | HB 570 | [Legislature](https://www.legis.la.gov/legis/BillInfo.aspx?s=25RS&b=HB570) | Аналогично (июль 2026) |

---

### 🇺🇸 KOSA (федеральный законопроект — ЕЩЁ НЕ ПРИНЯТ)

| | |
|---|---|
| **Статус** | Законопроект S.1748 — перенесён в Сенат в мае 2025. На март 2026 **НЕ принят**. *(последняя проверка: март 2026)* |
| **Если примут** | Duty of care, отключение «аддиктивных» функций для < 17, ежегодные аудиты. Для 18+ — минимальное влияние. |
| **Линк** | https://www.congress.gov/bill/119th-congress/senate-bill/1748 |
| **Действие** | Ничего. Мониторить. |

---

### 🇨🇦 Канада

| | |
|---|---|
| **Что делать** | DOB достаточно. |
| **Закон** | **PIPEDA** — Personal Information Protection and Electronic Documents Act |
| **Линк** | https://laws-lois.justice.gc.ca/eng/acts/p-8.6/ |
| **Примечание** | Обсуждается законопроект о запрете соцсетей для < 16 — пока НЕ принят. Мониторить. |

---

### 🇪🇺 Евросоюз (27 стран) — ПОДРОБНО

> **Главный вопрос: достаточно ли наших 10 пунктов для ЕС?**
> **Ответ: ДА.** Потому что мы блокируем ВСЕХ < 18, а самый высокий возраст цифрового согласия в ЕС = 16.
> Мы превышаем требования КАЖДОЙ страны ЕС.

#### Что такое GDPR Art. 8 — это ВОЗРАСТНОЙ закон

**GDPR Статья 8** — «Условия применения согласия ребёнка в отношении услуг информационного общества»:
- Устанавливает **минимальный возраст**, с которого ребёнок может **самостоятельно** дать согласие на обработку данных в онлайн-сервисах
- По умолчанию = **16 лет**
- Каждая страна ЕС может СНИЗИТЬ до **13 лет** (но не ниже)
- Ниже этого возраста → нужно согласие родителя
- **Линк на статью**: https://gdpr-info.eu/art-8-gdpr/

**Мы блокируем < 18 → автоматически соблюдаем ВСЕ страны ЕС.** Не нужно знать, 13 или 16 — мы блокируем всех до 18.

#### Таблица: возраст цифрового согласия в КАЖДОЙ стране ЕС

| Страна | Возраст цифрового согласия (GDPR Art. 8) | Национальный закон | Линк | Наши 10 пунктов хватает? |
|---|---|---|---|---|
| 🇦🇹 **Австрия** | **14** | DSG §4(4) | [RIS](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001597) | ✅ Мы блокируем < 18, хватит |
| 🇧🇪 **Бельгия** | **13** | Закон от 30.07.2018, Art. 7 | [Ejustice](https://www.ejustice.just.fgov.be/cgi_loi/change_lg.pl?language=fr&la=F&cn=2018073046&table_name=loi) | ✅ |
| 🇧🇬 **Болгария** | **14** | LPDP Art. 25а | [Lex.bg](https://lex.bg/laws/ldoc/2135426048) | ✅ |
| 🇭🇷 **Хорватия** | **16** (по умолчанию GDPR) | GDPR напрямую | — | ✅ |
| 🇨🇾 **Кипр** | **14** | Закон 125(I)/2018, Art. 8 | [CyLaw](http://www.cylaw.org/nomoi/enop/non-ind/2018_1_125/full.html) | ✅ |
| 🇨🇿 **Чехия** | **15** | Zákon č. 110/2019 Sb., §7 | [Zakonyprolidi](https://www.zakonyprolidi.cz/cs/2019-110) | ✅ |
| 🇩🇰 **Дания** | **13** | Databeskyttelsesloven §6(2) | [Retsinformation](https://www.retsinformation.dk/eli/lta/2018/502) | ✅ |
| 🇪🇪 **Эстония** | **13** | IKS §1011 | [Riigiteataja](https://www.riigiteataja.ee/akt/104012019011) | ✅ |
| 🇫🇮 **Финляндия** | **13** | Tietosuojalaki 1050/2018, §5 | [Finlex](https://www.finlex.fi/fi/laki/ajantasa/2018/20181050) | ✅ |
| 🇫🇷 **Франция** | **15** | Loi 78-17 (модиф.), Art. 45 | [Legifrance](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037090394/) | ✅ |
| 🇩🇪 **Германия** | **16** (по умолчанию GDPR) | GDPR напрямую + BDSG | [Gesetze-im-Internet](https://www.gesetze-im-internet.de/bdsg_2018/) | ✅ |
| 🇬🇷 **Греция** | **15** | Ν. 4624/2019, Art. 21 | [Kodiko](https://www.kodiko.gr/nomothesia/document/543861/nomos-4624-2019) | ✅ |
| 🇭🇺 **Венгрия** | **16** (по умолчанию GDPR) | Infotörvény | [Net.jogtar](https://net.jogtar.hu/jogszabaly?docid=a1100112.tv) | ✅ |
| 🇮🇪 **Ирландия** | **16** (по умолчанию GDPR) | DPA 2018, §31 | [Irishstatutebook](https://www.irishstatutebook.ie/eli/2018/act/7/enacted/en/html) | ✅ |
| 🇮🇹 **Италия** | **14** | D.Lgs. 101/2018, Art. 2-quinquies | [Normattiva](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2018-08-10;101) | ✅ |
| 🇱🇻 **Латвия** | **13** | FPDPL, §17 | [Likumi.lv](https://likumi.lv/ta/id/300099-fizisko-personu-datu-apstrades-likums) | ✅ |
| 🇱🇹 **Литва** | **14** | ADATĮ, Art. 6 | [E-seimas](https://www.e-tar.lt/portal/lt/legalAct/TAP-f1a3e08d8e5f8259a72827afe027534a) | ✅ |
| 🇱🇺 **Люксембург** | **16** (по умолчанию GDPR) | Loi du 1er août 2018 | [Legilux](https://legilux.public.lu/eli/etat/leg/loi/2018/08/01/a686/jo) | ✅ |
| 🇲🇹 **Мальта** | **13** | DPA Cap. 586, Art. 3 | [Legislation.mt](https://legislation.mt/eli/cap/586/eng/pdf) | ✅ |
| 🇳🇱 **Нидерланды** | **16** (по умолчанию GDPR) | UAVG Art. 5 | [Wetten.nl](https://wetten.overheid.nl/BWBR0040940/) | ✅ |
| 🇵🇱 **Польша** | **16** (по умолчанию GDPR) | Ustawa z 10.05.2018 | [Isap.sejm.gov.pl](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20180001000) | ✅ |
| 🇵🇹 **Португалия** | **13** | Lei 58/2019, Art. 16 | [DRE](https://dre.pt/dre/detalhe/lei/58-2019-123815982) | ✅ |
| 🇷🇴 **Румыния** | **16** (по умолчанию GDPR) | Legea 190/2018 | [Legislatie.just.ro](https://legislatie.just.ro/Public/DetaliiDocument/201381) | ✅ |
| 🇸🇰 **Словакия** | **16** (по умолчанию GDPR) | Zákon 18/2018, §15 | [Slov-lex](https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2018/18/) | ✅ |
| 🇸🇮 **Словения** | **15** | ZVOP-2, Art. 6 | [Pisrs.si](http://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO8233) | ✅ |
| 🇪🇸 **Испания** | **14** | LOPDGDD Art. 7 | [BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) | ✅ |
| 🇸🇪 **Швеция** | **13** | Kompletterande dataskyddslag (2018:218) | [Riksdagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2018218-med-kompletterande-bestammelser-till_sfs-2018-218/) | ✅ |

**Итог по ЕС:**
- Максимальный возраст в ЕС = **16** (Германия, Ирландия, Нидерланды, Люксембург, Венгрия, Хорватия, Польша, Румыния, Словакия)
- Мы блокируем < **18** → превышаем требования ВСЕХ 27 стран
- **Наших 10 пунктов ДОСТАТОЧНО** для ВСЕГО ЕС

#### Что ещё требует GDPR кроме возраста (и что мы делаем)

| Требование GDPR | Статья | Что мы делаем | Линк |
|---|---|---|---|
| **Privacy Policy** — описать какие данные, зачем, как удаляем | Art. 13, 14 | Уже в наших 8 пунктах (пункт 6) | [Art. 13](https://gdpr-info.eu/art-13-gdpr/) |
| **Правовое основание** для обработки данных | Art. 6 | Используем Art. 6(1)(b) — необходимость для исполнения договора (регистрация = договор) | [Art. 6](https://gdpr-info.eu/art-6-gdpr/) |
| **Минимизация данных** — собирать только необходимое | Art. 5(1)(c) | Собираем DOB → проверяем возраст → **храним DOB зашифрованной** (цели: возраст, бонусы на ДР, персонализация). Правовое основание: согласие Art. 6(1)(a) + договор Art. 6(1)(b). Шифрование: Art. 32 | [Art. 5](https://gdpr-info.eu/art-5-gdpr/) |
| **Право на удаление** — пользователь может попросить удалить свои данные | Art. 17 | Реализовать кнопку «Удалить мой аккаунт» | [Art. 17](https://gdpr-info.eu/art-17-gdpr/) |
| **Право на доступ** — пользователь может запросить копию своих данных | Art. 15 | Реализовать экспорт данных (JSON/CSV) | [Art. 15](https://gdpr-info.eu/art-15-gdpr/) |
| **Право на перенос** — пользователь может забрать свои данные | Art. 20 | Тот же экспорт данных | [Art. 20](https://gdpr-info.eu/art-20-gdpr/) |
| **Уведомление о утечке** — при утечке сообщить в 72 часа | Art. 33 | План реагирования на инциденты | [Art. 33](https://gdpr-info.eu/art-33-gdpr/) |
| **Представитель в ЕС** — если нет офиса в ЕС | Art. 27 | **ОБЯЗАТЕЛЬНО до первого юзера из ЕС** (см. подробности ниже) | [Art. 27](https://gdpr-info.eu/art-27-gdpr/) |

#### 🇪🇺 EU Representative (GDPR Art. 27) — подробно для компании из Израиля

> **Вопрос:** BestMe находится в Израиле. У нас нет ни людей, ни офиса в Европе. Что нужно делать?

**Ответ: нужно назначить «Представителя в ЕС» (EU Representative). Это ОБЯЗАТЕЛЬНО.**

**Что это такое:**
- GDPR Art. 27 требует: если компания **не имеет офиса в ЕС**, но **обрабатывает данные граждан ЕС** → она ОБЯЗАНА назначить **представителя (representative)** в одной из стран ЕС
- Представитель = **контактное лицо** для регуляторов и пользователей из ЕС. Это НЕ юридический офис. Это просто адрес и контакт
- Представитель **отвечает на запросы** регуляторов (DPA) и пользователей от имени компании

**Что конкретно нужно сделать:**

| # | Шаг | Детали | Когда |
|---|---|---|---|
| 1 | **Найти EU Representative сервис** | Это коммерческие компании которые предоставляют эту услугу. Не нужно нанимать человека или арендовать офис | **ДО запуска** (до первого юзера из ЕС) |
| 2 | **Заключить договор** | Договор о назначении представителя | До запуска |
| 3 | **Указать в Privacy Policy** | В Privacy Policy добавить: имя представителя, адрес в ЕС, email для связи | До запуска |
| 4 | **Указать в приложении** | В настройках / О приложении: контакт представителя | До запуска |

**Популярные EU Representative сервисы (для стартапов из Израиля):**

| Сервис | Цена | Примечание |
|---|---|---|
| **DataRep** (Ирландия) | ~€1,200–2,400/год | Популярен среди стартапов. Простая онлайн-регистрация |
| **EU-REP.Global** | ~€1,000–3,000/год | Работает с компаниями из Израиля |
| **Prighter Group** | ~€1,000–2,000/год | Автоматический портал для запросов |
| **GDPR-Rep.eu** | ~€99–200/мес | Бюджетный вариант |

> **Важно для Израиля:**
> - Израиль имеет статус **«адекватной страны»** по решению ЕС (Decision 2011/61/EU) → передача данных из ЕС в Израиль **разрешена** без дополнительных мер (SCC не нужны)
> - Но EU Representative всё равно **обязателен** — это отдельное требование от вопроса передачи данных
> - EU Representative = НЕ юрист. Это просто **почтовый адрес + контакт** в ЕС для регуляторов

**Что написать в Privacy Policy:**
```
EU Representative (GDPR Art. 27):
[Имя компании-представителя]
[Адрес в ЕС]
Email: [email]
```

> **Стоимость:** ~€100-200/месяц. Это одна из самых дешёвых compliance-задач.
> **Без этого:** штраф до €10 млн (GDPR Art. 83(4)(a)).

#### DSA Art. 28 — дополнительное требование ЕС (с февраля 2024)

**Digital Services Act (DSA), Статья 28** — «Защита несовершеннолетних онлайн»:
- Платформы обязаны принять **«соразмерные меры»** для высокого уровня приватности и безопасности несовершеннолетних
- Нельзя показывать **таргетированную рекламу** на основе профилирования несовершеннолетних
- **Линк**: https://eur-lex.europa.eu/eli/reg/2022/2065/oj (Art. 28)
- **Мы блокируем < 18 → несовершеннолетних НЕТ на платформе → DSA Art. 28 соблюдён автоматически**

| | |
|---|---|
| **Что делать** | DOB + Privacy Policy + GDPR compliance. Если нет офиса в ЕС → назначить представителя (Art. 27). |
| **Законы** | **GDPR** (EU) 2016/679 — **Статья 8** (возраст), **Статья 17** (удаление), **Статья 5** (минимизация); **DSA** (EU) 2022/2065 — **Статья 28** (защита несовершеннолетних) |
| **Линки** | GDPR: https://gdpr-info.eu/ • Art. 8 (дети): https://gdpr-info.eu/art-8-gdpr/ • Art. 6 (основания): https://gdpr-info.eu/art-6-gdpr/ • Art. 17 (удаление): https://gdpr-info.eu/art-17-gdpr/ • Art. 27 (представитель): https://gdpr-info.eu/art-27-gdpr/ • DSA: https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| **Штрафы** | GDPR: до **€20 млн или 4% мирового оборота** • DSA: до **6% мирового оборота** |

---

### 🇫🇷 Франция

| | |
|---|---|
| **Что делать** | DOB + Privacy Policy на FR. Закон об ID для соцсетей пока НЕ принят. |
| **Возрастной закон** | **GDPR Art. 8 → Франция установила 15 лет** (Loi 78-17, Art. 45). Мы блокируем < 18 → соблюдён |
| **Закон о порносайтах** | **Loi n° 2024-449** — обязательная верификация для ПОРНОСАЙТОВ (не соцсетей). Мы = соцсеть, НЕ порносайт → этот закон НЕ применяется |
| **Законопроект о соцсетях** | Обсуждается законопроект об обязательной ID-верификации для соцсетей — **НЕ принят** на март 2026. Мониторить |
| **Линки** | Loi 2024-449: https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049563651 • GDPR Art. 8 Франция: https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037090394/ |

---

### 🇩🇪 Германия

| | |
|---|---|
| **Что делать** | DOB + Privacy Policy на DE. Для 18+ — достаточно. |
| **Возрастной закон** | **GDPR Art. 8 → Германия = 16 лет** (по умолчанию GDPR). Мы блокируем < 18 → соблюдён |
| **JuSchG** | **Jugendschutzgesetz** — закон о защите молодёжи. Требует рейтинг для контента. Для 18+ сервиса: рейтинг 18+ + DOB достаточно |
| **Закон** | **GDPR** (напрямую) + **BDSG** (нем. закон о защите данных) + **JuSchG** |
| **Линки** | JuSchG: https://www.gesetze-im-internet.de/juschg/ • BDSG: https://www.gesetze-im-internet.de/bdsg_2018/ |

---

### 🇬🇧 Великобритания — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Ofcom: самодекларация (DOB) — **НЕ «высокоэффективная»** проверка. |
| **Закон** | **Online Safety Act 2023** (c.50) |
| **Линк на закон** | https://www.legislation.gov.uk/ukpga/2023/50/contents |
| **Ofcom руководства** | https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/online-safety-regulatory-documents • https://www.ofcom.org.uk/online-safety/protecting-children/ |
| **Штраф** | до **10% мирового дохода** |
| **Допустимые методы** | ID/паспорт, facial age estimation (Yoti), Open Banking (OneID), мобильный оператор, кредитная карта |
| **НЕдопустимые** | Самодекларация (DOB), чекбокс «мне 18+» |
| **Провайдеры** | [Yoti](https://www.yoti.com/business/age-verification/) • [OneID](https://oneid.uk/) • [AgeChecked](https://agechecked.com/) |

---

### 🇦🇺 Австралия — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Самодекларация НЕ считается. Жёсткий запрет до 16 — родители НЕ могут дать согласие. |
| **Закон** | **Online Safety Amendment (Social Media Minimum Age) Act 2024** (No. 127) |
| **Линк на закон** | https://www.legislation.gov.au/C2024A00127/asmade |
| **eSafety** | https://www.esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions |
| **Штраф** | до **AUD $49.5 млн** (~$32М USD) |
| **Провайдеры** | [Yoti](https://www.yoti.com/) • [Persona](https://withpersona.com/) • [IDnow](https://www.idnow.io/) |

---

### 🇧🇷 Бразилия — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Digital ECA **запрещает** самодекларацию. Требует «надёжные и проверяемые» механизмы. |
| **Закон** | **Lei nº 15.211/2025** — Digital ECA — вступил в силу **17 марта 2026** |
| **Линк на закон** | https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Lei/L15211.htm |
| **Анализ** | https://www.demarest.com.br/en/eca-digital-nova-lei-de-protecao-de-criancas-e-adolescentes-no-ambiente-digital/ |
| **Штраф** | до **10% дохода в Бразилии**, приостановка, запрет |

---

### 🇨🇳 Китай — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Обязательна регистрация по реальному имени (нац. ID). Без китайского партнёра — невозможно. |
| **Закон** | Положение о защите несовершеннолетних онлайн (2024) + Закон о кибербезопасности + PIPL |
| **Линки** | EN: https://www.chinalawtranslate.com/en/online-protection-of-minors/ • CN: https://www.gov.cn/zhengce/content/202310/content_6911288.htm |

---

### 🇰🇷 Южная Корея — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Обязательна верификация через гос. систему (i-PIN / мобильный привязанный к реальному имени). |
| **Закон** | **PIPA** Art. 22-2 |
| **Линк** | https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62389&type=part&key=4 • https://www.pipc.go.kr/eng/user/lgp/law/lawDetail.do |

---

### 🇮🇳 Индия

| | |
|---|---|
| **Что делать** | DOB достаточно (пока). Метод верификации не определён регулятором. |
| **Закон** | **DPDP Act 2023**, Section 9 |
| **Линки** | PDF: https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf • §9: https://indiankanoon.org/doc/98869575/ |
| **Примечание** | Мониторить DPDP Rules — метод может быть уточнён. |

---

### 🇮🇱 Израиль

| | |
|---|---|
| **Что делать** | DOB достаточно. Спец. закона **НЕТ** (на март 2026). |
| **Статус** | Законопроекты на рассмотрении Кнессета. Мониторить. |

---

### 🇯🇵 Япония

| | |
|---|---|
| **Что делать** | DOB достаточно. **НЕТ** спец. закона о верификации возраста в соцсетях. |

---

### 🇲🇾 Малайзия — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | С 2026 — обязательная eKYC для ВСЕХ соцсетей. |
| **Закон** | **Online Safety Act 2025** |
| **Анализ** | https://www.mayerbrown.com/en/insights/publications/2025/12/malaysias-proposed-social-media-ban-for-children-how-it-compares-with-australia-and-singapore |
| **Штраф** | до **RM 10 млн** (~$2.2М USD) |

---

### 🇷🇺 Россия — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | ФЗ-152 требует хранить персональные данные граждан РФ **на серверах в России** (ст. 18 ч. 5). Без серверов в РФ — нарушение. Роскомнадзор заблокирует сервис. |
| **Закон** | **ФЗ-152** «О персональных данных» + **ФЗ-149** «Об информации» |
| **Линк** | http://www.consultant.ru/document/cons_doc_LAW_61801/ |
| **Штраф** | Блокировка + штрафы до 18 млн ₽ |

---

### 🇧🇾 Беларусь — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Строгий государственный контроль интернета. Сервис могут заблокировать без предупреждения. |
| **Закон** | Закон «О персональных данных» (№ 99-З от 2021) |
| **Линк** | https://pravo.by/document/?guid=12551&p0=H12100099 |

---

### 🇹🇲 Туркменистан — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Интернет практически закрыт. Единственный провайдер — гос. «Туркментелеком». Нет рынка. |

---

### 🇺🇦 Украина — ✅ ОТКРЫТА

| | |
|---|---|
| **Что делать** | DOB хватает. Наших 10 пунктов достаточно. |
| **Закон** | Закон «О защите персональных данных» (№ 2297-VI) |
| **Линк** | https://zakon.rada.gov.ua/laws/show/2297-17 |

---

### 🇰🇿 Казахстан — ✅ ОТКРЫТ

| | |
|---|---|
| **Что делать** | DOB хватает. Наших 10 пунктов достаточно. |
| **Закон** | Закон «О персональных данных» (№ 94-V от 2013) |
| **Линк** | https://adilet.zan.kz/rus/docs/Z1300000094 |

---

### 🇬🇪🇦🇲🇦🇿🇲🇩🇺🇿🇰🇬🇹🇯 Грузия, Армения, Азербайджан, Молдова, Узбекистан, Кыргызстан, Таджикистан — ✅ ОТКРЫТЫ

| | |
|---|---|
| **Что делать** | DOB хватает во всех этих странах. Наших 10 пунктов достаточно. |
| **Законы** | Свои законы о персональных данных (см. таблицу ссылок в конце), но **ни одна** не требует спец. верификации возраста. |

---

## 10. 📌 ПОЛНЫЙ СПИСОК ВСЕГО НЕОБХОДИМОГО СЕЙЧАС — Master Checklist

> **Это ЕДИНЫЙ ПОЛНЫЙ список АБСОЛЮТНО ВСЕГО, что нужно сделать для запуска.**
> Включает: публикацию в магазины, техническую реализацию, все экраны согласий, модерацию, документы, переводы.
> Всё что здесь покрыто → работает в ОТКРЫТЫХ странах (США, Канада, ЕС 27 стран, Япония, Израиль, Индия, СНГ + все остальные кроме 9 заблокированных).

---

### 🅰️ ПУБЛИКАЦИЯ В МАГАЗИНЫ

#### Apple App Store

| # | Что | Закон / Правило | Статус |
|---|---|---|---|
| 1 | Заполнить **опросник рейтинга** (Content Descriptions) | [Apple §2.3.6](https://developer.apple.com/app-store/review/guidelines/#legal) | ☐ |
| 2 | Получить рейтинг **17+ или 18+** | [Apple §2.3.6](https://developer.apple.com/app-store/review/guidelines/#legal) | ☐ |
| 3 | **НЕ** ставить в категорию Kids | [Apple §1.3](https://developer.apple.com/app-store/review/guidelines/) | ☐ |
| 4 | **Privacy Policy** ссылка в App Store Connect | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) | ☐ |
| 5 | Реализовать **модерацию UGC**: Report + Block | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) | ☐ |
| 6 | Реализовать **DOB форму** проверки возраста | [Apple §1.1](https://developer.apple.com/app-store/review/guidelines/) | ☐ |
| 7 | **NSUserTrackingUsageDescription** в Info.plist | ❌ НЕ НУЖНО для MVP (нет трекинговых SDK) | — |
| 8 | Реализовать **удаление аккаунта** | [Apple Account Deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) | ☐ |

#### Google Play

| # | Что | Закон / Правило | Статус |
|---|---|---|---|
| 1 | Указать **целевую аудиторию 18+** | [Play Console](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en) | ☐ |
| 2 | Заполнить **Content Rating** (IARC) → 18+ | [IARC](https://support.google.com/googleplay/android-developer/answer/188189?hl=en) | ☐ |
| 3 | Включить **«Restrict Declared Minors»** | [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) | ☐ |
| 4 | **НЕ** включать Families / Designed for Families | [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) | ☐ |
| 5 | **Privacy Policy** ссылка в Play Console | [Play Console](https://support.google.com/googleplay/android-developer/answer/9859455?hl=en) | ☐ |
| 6 | Заполнить **Data Safety Section** | [Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en) | ☐ |
| 7 | Реализовать **модерацию UGC**: Report + Block | [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) | ☐ |
| 8 | Реализовать **DOB форму** проверки возраста | — | ☐ |
| 9 | ⚠️ Реализовать **удаление аккаунта** в приложении | [Google Account Deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en) | ☐ |
| 10 | ⚠️ Создать **веб-форму удаления данных** (`bestme.app/delete-account`) | [Google Account Deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en) | ☐ |
| 11 | Указать ссылку на веб-форму в **Data Safety → Data deletion** | [Google Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en) | ☐ |

---

### 🅱️ ПРОВЕРКА ВОЗРАСТА

| # | Что | Закон | Статус |
|---|---|---|---|
| 1 | Добавить **поле DOB** в форму регистрации (email) | Магазины + COPPA | ☐ |
| 2 | Добавить **экран DOB** после входа через Google/Facebook/Apple (ВСЕГДА, как Pinterest) | Магазины + COPPA | ☐ |
| 3 | Расчёт возраста → если < 18 → **блок** (НЕ создавать аккаунт) | [COPPA](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312) | ☐ |
| 4 | **Хранить DOB зашифрованной** (AES-256, encryption at rest) | [GDPR Art. 32](https://gdpr-info.eu/art-32-gdpr/) | ☐ |
| 5 | Хранить: `dob_encrypted` + `age_bracket` + `country` | GDPR Art. 5 + Art. 6(1)(a),(b) | ☐ |
| 6 | DOB **НЕ попадает** в логи, аналитику в **открытом виде** | [GDPR Art. 5](https://gdpr-info.eu/art-5-gdpr/) | ☐ |
| 7 | **Cron job**: ежедневная проверка дней рождения → бонусы + Push | Бизнес-логика | ☐ |

---

### 🅲️ GeoIP И БЛОКИРОВКА СТРАН

| # | Что | Закон | Статус |
|---|---|---|---|
| 1 | Реализовать **GeoIP** определение страны (Cloudflare / MaxMind) | — | ☐ |
| 2 | **Блокировка 9 стран**: GB, AU, BR, CN, KR, MY, RU, BY, TM | Законы этих стран | ☐ |
| 3 | Показать заблокированным: «Service not available in your country» | — | ☐ |
| 4 | **НЕ** хранить IP-адрес после GeoIP | [GDPR Recital 30](https://gdpr-info.eu/recitals/no-30/) | ☐ |

---

### 🅳️ ВСЕ ЭКРАНЫ СОГЛАСИЙ (9 потоков)

| # | Поток | Триггер | Блокирует? | Чекбокс? | Записывать в БД? | Закон |
|---|---|---|---|---|---|---|
| 1 | **Welcome Screen** (Privacy Defaults + Profile Choice) | После регистрации, ПЕРЕД лентой | ✅ ДА — нельзя пропустить | Нет (есть toggle для profile_visibility) | ✅ `legal_consents_log` | [GDPR Art. 25(2)](https://gdpr-info.eu/art-25-gdpr/) + [CAADCA](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273) |
| 2 | **UGC Community Guidelines** | Первая попытка создать контент | ✅ ДА — контент не публикуется | ☐ НЕ pre-checked | ✅ `legal_consents_log` | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| 3 | **Push Notifications** | Онбординг / первая попытка пуша | ❌ Можно пропустить | Нет | ❌ (ОС хранит) | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) · [Google User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) |
| 4 | **Camera Permission** | Первое фото/видео | ❌ Можно пропустить | Нет | ❌ (ОС хранит) | Apple §5.1.1 · Google Prominent Disclosure |
| 5 | **Photos Permission** | Первый выбор из галереи | ❌ Можно пропустить | Нет | ❌ (ОС хранит) | Apple §5.1.1 · Google Prominent Disclosure |
| 6 | **ATT (iOS)** | ❌ НЕ НУЖЕН для MVP (нет трекинговых SDK) | — | — | ❌ (iOS хранит) | [Apple §5.1.2(i)](https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing) |
| 7 | **SMS Consent (TCPA)** | ❌ НЕ НУЖЕН для MVP (Bestme не отправляет SMS) | — | — | — | [TCPA §227(b)](https://www.law.cornell.edu/uscode/text/47/227) |
| 8 | **Cookie Consent** | Первый визит на веб-сайт | ❌ Можно отказаться | ☐ НЕ pre-checked (analytics/ads) | ❌ (localStorage) | [ePrivacy 2002/58/EC](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058) · [GDPR Art. 7](https://gdpr-info.eu/art-7-gdpr/) |
| 9 | **Delete Account** | В настройках (Settings → Account) | — | — | ✅ `users.status` + email + Apple Token Revoke | [GDPR Art. 17](https://gdpr-info.eu/art-17-gdpr/) · [Apple §5.1.1(v)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |

---

### 🅴️ МОДЕРАЦИЯ UGC

| # | Что | Закон | Статус |
|---|---|---|---|
| 1 | Кнопка **«Report»** на каждом посте/комментарии/профиле | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) · [DSA Art. 16](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | ☐ |
| 2 | Выбор **причины жалобы** (CSAM, Hate, Violence, Spam, Other) | DSA Art. 16 | ☐ |
| 3 | Кнопка **«Block user»** | Apple §1.2 · Google UGC | ☐ |
| 4 | **Удаление контента** модераторами | Apple §1.2 · Google UGC | ☐ |
| 5 | **Community Guidelines** опубликованы | Apple §1.2 · Google UGC · [DSA Art. 14](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | ☐ |
| 6 | Механизм **обжалования** (Appeal) удаления контента | [DSA Art. 20](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) (ЕС) | ☐ |
| 7 | **Уведомление** заявителю о результате жалобы | [DSA Art. 17](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) (ЕС) | ☐ |

---

### 🅵️ НАСТРОЙКИ ПРИВАТНОСТИ

| # | Что | Закон | Статус |
|---|---|---|---|
| 1 | Профиль = **приватный по умолчанию** (для Калифорнии) | [CAADCA (AB 2273)](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273) | ☐ |
| 2 | Геолокация = **выключена по умолчанию** | CAADCA | ☐ |
| 3 | Push-уведомления = **минимальные по умолчанию** | CAADCA | ☐ |
| 4 | Email, телефон, дата рождения = **ВСЕГДА скрыты** от других | [GDPR Art. 25](https://gdpr-info.eu/art-25-gdpr/) | ☐ |
| 5 | Кнопка **«Удалить аккаунт»** в настройках | [GDPR Art. 17](https://gdpr-info.eu/art-17-gdpr/) · [Apple](https://developer.apple.com/support/offering-account-deletion-in-your-app/) | ☐ |
| 6 | Кнопка **«Экспорт данных»** (скачать свои данные) | [GDPR Art. 15](https://gdpr-info.eu/art-15-gdpr/) / [Art. 20](https://gdpr-info.eu/art-20-gdpr/) | ☐ |

---

### 🅶️ ЮРИДИЧЕСКИЕ ДОКУМЕНТЫ

| # | Документ | Языки | Закон | Статус |
|---|---|---|---|---|
| 1 | **Privacy Policy** | EN + DE, FR, ES, IT, PT | [GDPR Art. 13/14](https://gdpr-info.eu/art-13-gdpr/) · [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) | ☐ |
| 2 | **Terms of Service** (18+ минимальный возраст) | EN + DE, FR, ES, IT, PT | Apple · Google | ☐ |
| 3 | **Community Guidelines** | EN + DE, FR, ES, IT, PT | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [DSA Art. 14](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | ☐ |
| 4 | **SMS Communication Policy** | ❌ НЕ НУЖНО для MVP (Bestme не отправляет SMS) | — |
| 5 | ⚠️ **EU Representative** — назначить представителя в ЕС | — | [GDPR Art. 27](https://gdpr-info.eu/art-27-gdpr/) | ☐ |
| 6 | Указать **EU Representative** в Privacy Policy | EN + все языки PP | GDPR Art. 27 | ☐ |
| 7 | **AI Disclaimer** в ToS (если используется AI-проверка контента) | EN + все языки ToS | [EU AI Act Art. 50](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) | ☐ |

**Что описать в Privacy Policy:**
- [ ] Сбор DOB — **полная дата рождения** хранится зашифрованной (encryption at rest). Цели: 1) проверка возраста (18+), 2) персонализация контента по возрастной группе, 3) начисление бонусов/подарков в День Рождения. Правовое основание: явное согласие [GDPR Art. 6(1)(a)](https://gdpr-info.eu/art-6-gdpr/) + исполнение договора [Art. 6(1)(b)](https://gdpr-info.eu/art-6-gdpr/). Безопасность: [GDPR Art. 32](https://gdpr-info.eu/art-32-gdpr/)
- [ ] GeoIP (цель: определение юрисдикции) — указать что GeoIP ≠ GPS геолокация
- [ ] Правовое основание: [GDPR Art. 6(1)(b)](https://gdpr-info.eu/art-6-gdpr/) или (f)
- [ ] Cookies — какие и зачем (если используются)
- [ ] Права пользователей: удаление, доступ, исправление, перенос данных
- [ ] Как подать запрос на удаление (email / кнопка / веб-форма)
- [ ] Третьи лица (аналитика, SDK) — перечислить
- [ ] AI/рекомендательные системы — раскрыть что используется AI для персонализации ([EU AI Act Art. 52](https://eur-lex.europa.eu/eli/reg/2024/1689/oj), прозрачность)
- [ ] AI-проверка контента — disclaimer что автоматическая проверка не гарантирует достоверность
- [ ] Бонусная система — описать что баллы = loyalty points, не финансовый инструмент
- [ ] Блоги — описать что контент блога = UGC, блогер несёт ответственность за свой контент
- [ ] Рейтинги бизнес-профилей — описать что отзывы = UGC, правила модерации отзывов
- [ ] Цели пользователя (здоровье) — описать что цели = self-reported данные, НЕ медицинские данные
- [ ] Нотификации — описать какие push-уведомления отправляются и как отключить
- [ ] Чаты — описать обработку сообщений (хранение, модерация при жалобе)
- [ ] Подписки — описать обработку данных о подписках (на кого подписан)
- [ ] Бизнес-профили — описать какие данные бизнеса публичны, какие приватны
- [ ] **EU Representative** — имя, адрес в ЕС, email представителя (GDPR Art. 27)
- [ ] **Хранение данных** — указать где хранятся данные (Израиль), почему это законно (adequacy decision ЕС)

---

### 🅷️ ПЕРЕВОДЫ UI

| # | Что | Языки | Статус |
|---|---|---|---|
| 1 | Все экраны приложения (UI) | EN, RU, ES, FR, DE, AR, HE | ☐ |
| 2 | Все ключи переводов из Потоков 1-8 (Секция 5) | EN, RU, ES, FR, DE, AR, HE | ☐ |
| 3 | Все ключи переводов модерации (Секция 6) | EN, RU, ES, FR, DE, AR, HE | ☐ |
| 4 | DOB экран (social login) | EN, RU, ES, FR, DE, AR, HE | ☐ |
| 5 | Экран блокировки страны | EN (+ RU для видимости) | ☐ |

---

### 🅸️ БАЗА ДАННЫХ — таблицы

| # | Таблица / Поле | Для чего | Закон |
|---|---|---|---|
| 1 | `legal_consents_log` (user_id, consent_type, version, timestamp, IP) | ПОТОК 1 + ПОТОК 2 согласия | GDPR |
| 2 | `users.push_notifications_enabled` (true/false) | Статус push-уведомлений | — |
| 3 | `users.analytics_enabled` (true/false) | ATT выбор (iOS) — ❌ НЕ НУЖНО для MVP | — |
| 4 | `users.sms_consent` + `sms_consent_at` + `sms_consent_ip` | SMS согласие — ❌ НЕ НУЖНО для MVP (Bestme не отправляет SMS) | TCPA |
| 5 | `users.dob_encrypted` (зашифрованная дата YYYY-MM-DD) | Полная дата рождения (encryption at rest, AES-256). Цели: проверка возраста, бонусы на ДР, персонализация | GDPR Art. 32 |
| 6 | `users.age_bracket` (Enum: `"18-24"`, `"25-34"`, `"35-44"`, `"45+"`) | Возрастная когорта — вычисляется при регистрации. Используется для рекомендаций AI и аналитики (вместо DOB). Пересчитывается раз в год | — |
| 7 | `users.country` (код страны) | GeoIP результат | — |
| 8 | `users.status` (`active` / `scheduled_for_deletion` / `deleted`) | Статус аккаунта (мягкое удаление, 30-дневный grace period) | GDPR Art. 17 · Apple §5.1.1(v) |
| 9 | `users.deletion_requested_at` (timestamp) | Дата запроса на удаление аккаунта | GDPR Art. 17 |
| 10 | `users.deletion_scheduled_for` (timestamp) | Дата физического удаления (запрос + 30 дней) | GDPR Art. 17 |
| 11 | Cron Job: `daily_account_cleanup` | Ежедневно: аккаунты где `deletion_scheduled_for < NOW()` → **Hard Delete** | GDPR Art. 17 |
| 12 | Cron Job: `daily_birthday_check` | Ежедневно: расшифровать DOB → найти именинников → бонусы + Push | Бизнес-логика |

---

### 🅹️ ЧТО ПОКРЫТО ЭТИМ СПИСКОМ — какие страны работают

```
С ЭТИМ СПИСКОМ РАБОТАЮТ (без доработок) — проверено ✅:

  ОСНОВНЫЕ:
  ✅ 🇺🇸 США (все штаты, включая Калифорнию)
  ✅ 🇨🇦 Канада
  ✅ 🇪🇺 ЕС (все 27 стран: Германия, Франция, Испания, Италия, и т.д.)
  ✅ 🇯🇵 Япония
  ✅ 🇮🇱 Израиль
  ✅ 🇮🇳 Индия

  ЕВРОПА (не ЕС):
  ✅ 🇨🇭 Швейцария, 🇳🇴 Норвегия, 🇮🇸 Исландия, 🇱🇮 Лихтенштейн
  ✅ 🇷🇸 Сербия, 🇲🇪 Черногория, 🇧🇦 Босния и Герцеговина
  ✅ 🇦🇱 Албания, 🇲🇰 Северная Македония, 🇹🇷 Турция

  СНГ:
  ✅ 🇺🇦 Украина, 🇰🇿 Казахстан, 🇬🇪 Грузия, 🇦🇲 Армения
  ✅ 🇦🇿 Азербайджан, 🇲🇩 Молдова, 🇺🇿 Узбекистан
  ✅ 🇰🇬 Кыргызстан, 🇹🇯 Таджикистан

  АЗИЯ И ОКЕАНИЯ:
  ✅ 🇸🇬 Сингапур, 🇹🇼 Тайвань, 🇭🇰 Гонконг
  ✅ 🇹🇭 Таиланд, 🇻🇳 Вьетнам, 🇵🇭 Филиппины, 🇮🇩 Индонезия
  ✅ 🇵🇰 Пакистан, 🇧🇩 Бангладеш, 🇱🇰 Шри-Ланка, 🇳🇵 Непал
  ✅ 🇳🇿 Новая Зеландия

  АМЕРИКА:
  ✅ 🇲🇽 Мексика, 🇨🇱 Чили, 🇨🇴 Колумбия
  ✅ 🇵🇪 Перу, 🇺🇾 Уругвай, 🇦🇷 Аргентина

  АФРИКА:
  ✅ 🇿🇦 ЮАР, 🇳🇬 Нигерия, 🇰🇪 Кения, 🇬🇭 Гана

  + Все остальные страны мира (кроме 9 заблокированных)

ЗАБЛОКИРОВАНЫ (нужны доработки):
  ⛔ 🇬🇧 UK — нужна Yoti/OneID
  ⛔ 🇦🇺 Австралия — нужна biometric/eKYC
  ⛔ 🇧🇷 Бразилия — нужна ID-верификация
  ⛔ 🇨🇳 Китай — нужен нац. ID + китайский партнёр
  ⛔ 🇰🇷 Юж. Корея — нужна i-PIN
  ⛔ 🇲🇾 Малайзия — нужна eKYC
  ⛔ 🇷🇺 Россия — нужны серверы в РФ
  ⛔ 🇧🇾 Беларусь — гос. контроль
  ⛔ 🇹🇲 Туркменистан — нет рынка
```

---

### 🔓 Заблокированные страны — почему и что нужно

| Страна | Почему заблокирована | Что нужно для разблокировки |
|---|---|---|
| 🇬🇧 UK | Online Safety Act 2023 — DOB недостаточно | ID-верификация (Yoti/OneID) |
| 🇦🇺 Австралия | Online Safety Amendment Act 2024 — нужна biometric | Facial age estimation (Yoti) |
| 🇧🇷 Бразилия | Lei 15.211/2025 — нужна ID-верификация | ID-верификация |
| 🇨🇳 Китай | Нац. ID + локальные серверы + китайский партнёр | Слишком сложно для MVP |
| 🇰🇷 Юж. Корея | PIPA — нужна i-PIN верификация | Корейский провайдер |
| 🇲🇾 Малайзия | Online Safety Act 2025 — нужна eKYC | eKYC провайдер |
| 🇷🇺 Россия | ФЗ-152 — серверы обязательно в РФ | Серверы в РФ |
| 🇧🇾 Беларусь | Госконтроль интернета | Нецелесообразно |
| 🇹🇲 Туркменистан | Нет рынка | Нецелесообразно |

### ⚡ ДО ЗАПУСКА — обязательно

- [ ] 🇪🇺 Назначить **EU Representative** (GDPR Art. 27) — ~€100-200/мес. **ОБЯЗАТЕЛЬНО ДО первого юзера из ЕС!** (см. Секция 9, ЕС)
- [ ] Указать EU Representative в **Privacy Policy** (имя, адрес в ЕС, email)

### 👀 МОНИТОРИТЬ

- [ ] 🇺🇸 **KOSA** (S.1748) — если примут, потребуются изменения | [Congress](https://www.congress.gov/bill/119th-congress/senate-bill/1748)
- [ ] 🇨🇦 Новый закон Канады (ограничение до 16) | Мониторить
- [ ] 🇮🇱 Закон Израиля (на рассмотрении) | Мониторить
- [ ] 🇮🇳 DPDP Rules — метод верификации может быть уточнён | Мониторить
- [ ] 🇪🇺 EU Digital Identity Wallet (конец 2026) | Мониторить
- [ ] 🇫🇷 Франция — обязательная ID-верификация для соцсетей | Мониторить
- [ ] 🇻🇳 Вьетнам — ужесточение локализации данных | Мониторить
- [ ] 🇰🇿 Казахстан — контроль за локализацией данных | Мониторить

---

## Все ссылки на законы (краткий справочник)

> Полные тексты законов — для юристов и при необходимости. Основные ссылки, которые реально нужны разработчикам, уже указаны в соответствующих потоках выше.

### Основные законы (используем в работе)

| Закон | Зачем нам | Ссылка |
|---|---|---|
| **GDPR** (ЕС) | Главный закон — приватность, согласия, удаление данных | https://gdpr-info.eu/ |
| **CAADCA** (Калифорния) | Приватность по умолчанию, нейтральный DOB | https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273 |
| **COPPA** (США) | Не подпадаем (18+), но DOB должен быть нейтральным | https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312 |
| **DSA** (ЕС) | Модерация UGC, жалобы, Community Guidelines | https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| **Apple Guidelines** | Правила App Store | https://developer.apple.com/app-store/review/guidelines/ |
| **Google Play Policy** | Правила Play Store | https://support.google.com/googleplay/android-developer/answer/9893335 |

### Заблокированные страны (почему)

| Страна | Закон | Ссылка |
|---|---|---|
| 🇬🇧 UK | Online Safety Act 2023 | https://www.legislation.gov.uk/ukpga/2023/50/contents |
| 🇦🇺 Австралия | Online Safety Amendment Act 2024 | https://www.legislation.gov.au/C2024A00127/asmade |
| 🇧🇷 Бразилия | Lei 15.211/2025 | https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Lei/L15211.htm |
| 🇨🇳 Китай | Положение о защите несовершеннолетних онлайн | https://www.chinalawtranslate.com/en/online-protection-of-minors/ |
| 🇰🇷 Юж. Корея | PIPA | https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62389&type=part&key=4 |
| 🇲🇾 Малайзия | Online Safety Act 2025 | https://www.mayerbrown.com/en/insights/publications/2025/12/malaysias-proposed-social-media-ban-for-children-how-it-compares-with-australia-and-singapore |
| 🇷🇺 Россия | ФЗ-152 «О персональных данных» | http://www.consultant.ru/document/cons_doc_LAW_61801/ |

### GeoIP сервисы

| Сервис | Ссылка |
|---|---|
| MaxMind GeoLite2 | https://dev.maxmind.com/geoip/geolite2-free-geolocation-data |
| ipinfo.io | https://ipinfo.io/ |
| Cloudflare CF-IPCountry | https://developers.cloudflare.com/fundamentals/reference/http-request-headers/#cf-ipcountry |
