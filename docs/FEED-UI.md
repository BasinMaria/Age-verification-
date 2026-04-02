← Назад к [SMART-FEED-TZ.md](SMART-FEED-TZ.md) | [NATURAL-FEED.md](NATURAL-FEED.md) | [COMPLIANCE.md](../COMPLIANCE.md)

# 📱 Интерфейс ленты — UI, настройки, права пользователя

> **Цель документа:** Описать ВСЕ элементы управления лентой, которые доступны пользователю, — и по закону, и для удобства. Указать что добавить в ToS и Privacy Policy. Без дублирования того, что уже описано в [SMART-FEED-TZ.md](SMART-FEED-TZ.md) (формулы) и [NATURAL-FEED.md](NATURAL-FEED.md) (хронология).

---

## Оглавление

1. [Два алгоритма — простое объяснение](#1-два-алгоритма--простое-объяснение)
2. [Права пользователя на управление лентой (по закону)](#2-права-пользователя-на-управление-лентой-по-закону)
3. [UI элементы на экране ленты](#3-ui-элементы-на-экране-ленты)
4. [Меню поста (три точки ···)](#4-меню-поста-три-точки-)
5. [Настройки профиля — Feed & Content](#5-настройки-профиля--feed--content)
6. [Сброс ленты (Reset Smart Feed)](#6-сброс-ленты-reset-smart-feed)
7. [Что добавить в Terms of Service](#7-что-добавить-в-terms-of-service)
8. [Что добавить в Privacy Policy](#8-что-добавить-в-privacy-policy)
9. [API endpoints для управления лентой](#9-api-endpoints-для-управления-лентой)
10. [Таблицы БД для настроек](#10-таблицы-бд-для-настроек)
11. [Чеклист](#11-чеклист)

---

## 1. Два алгоритма — простое объяснение

### Для пользователя (текст в приложении)

| Режим | Иконка | Как объяснить пользователю | Как на самом деле работает |
|---|---|---|---|
| **Smart Feed ✨** | ✨ | «Curated by our AI based on your wellness goals, interests, and community trends.» | Rule-based scoring (MVP) → ML scoring (v2.0). Формула W1–W12, см. [SMART-FEED-TZ.md](SMART-FEED-TZ.md) |
| **Natural Feed 🍃** | 🍃 | «Top and newest posts from your subscriptions, ranked without personal AI profiling.» | Popularity Score (системная метрика: лайки, комменты, сохранения) + New Content Slots. Только подписки/сообщества/друзья. Без профилирования. См. [NATURAL-FEED.md](NATURAL-FEED.md) |

### Для разработчика: Rule-Based vs AI

| Фаза | Smart Feed ✨ | Natural Feed 🍃 |
|---|---|---|
| **MVP (v1.0)** | Rule-based scoring (взвешенная сумма W1–W12). Это **обычный алгоритм с IF/ELSE**, не AI | `ORDER BY popularity_score DESC` — системная популярность (одинаковая для всех). Только подписки + сообщества |
| **v1.5** | Rule-based + больше сигналов (сообщества, язык, блоги). По-прежнему **не AI** | + New Content Slots, системные посты |
| **v2.0** | **Настоящий AI/ML** — embeddings, cosine similarity, auto-tuned weights | **Без изменений** — Natural Feed никогда не использует AI |

> **Ключевой момент:** На этапах MVP и v1.5 формула `Final Score = W1×Interests + W2×SocialGraph + ...` — это **арифметика**, не AI. AI появляется **только в v2.0**. Подробнее: [SMART-FEED-TZ.md, Раздел 1](SMART-FEED-TZ.md#1-два-режима-ленты-api).

---

## 2. Права пользователя на управление лентой (по закону)

> Вот **полный список** того, что пользователь имеет право сделать со своей лентой по европейским и калифорнийским законам (2026).

### Обязательные права (MUST HAVE)

| # | Право | Что может сделать пользователь | Закон | Где в UI |
|---|---|---|---|---|
| 1 | **Выключить алгоритм** | Переключить ленту с «Smart Feed» на «Natural Feed» одним нажатием | DSA Art. 27 | Переключатель вверху ленты |
| 2 | **Знать, почему показан контент** | Прочитать объяснение параметров ранжирования | DSA Art. 27 + AI Act Art. 50 | Settings → About recommendations |
| 3 | **Пожаловаться на контент** | Нажать «Report» на любом посте | DSA Art. 16 + Apple §1.2 | Меню поста (···) → Report |
| 4 | **Заблокировать пользователя** | Нажать «Block» — контент этого автора исчезает из ленты | DSA Art. 16 + Apple §1.2 | Меню поста (···) → Block |
| 5 | **Обжаловать решение AI** | Если AI-модерация удалила пост пользователя — нажать «Appeal» | GDPR Art. 22 + DSA Art. 20 | Уведомление об удалении → Appeal |
| 6 | **Удалить аккаунт + забыть** | Удалить аккаунт. Алгоритм полностью и навсегда забывает все лайки, интересы, векторы | GDPR Art. 17 | Settings → Delete account |

### Рекомендуемые права (SHOULD HAVE — улучшают compliance)

| # | Право | Что может сделать пользователь | Закон | Где в UI |
|---|---|---|---|---|
| 7 | **Скрыть пост** | Нажать «Hide» — конкретный пост больше не показывается в ленте | DSA Art. 27 (управление рекомендациями) | Меню поста (···) → Hide |
| 8 | **Не интересно** | Нажать «Not interested» — алгоритм снижает вес подобного контента | DSA Art. 27 | Меню поста (···) → Not interested |
| 9 | **Изменить интересы** | Зайти в настройки и изменить выбранные категории wellness | DSA Art. 27 + GDPR Art. 16 (исправление данных) | Settings → My interests |
| 10 | **Сбросить ленту** | Нажать «Reset Smart Feed» — алгоритм забывает историю лайков/просмотров, лента обучается заново | GDPR Art. 16 (исправление) + GDPR Art. 21 (возражение против профилирования) | Settings → Feed & Content → Reset |
| 11 | **Выбрать ленту по умолчанию** | Установить «Natural Feed» как основную ленту (вместо «Smart Feed») | DSA Art. 27 | Settings → Feed & Content |

### Чего пользователь НЕ может (и это нормально)

| Что | Почему нет | Закон |
|---|---|---|
| Отключить AI-модерацию | Это обязанность платформы, а не выбор пользователя | DSA Art. 14, Apple §1.2 |
| Отключить таргетированную рекламу | У BestMe **нет рекламы** → нечего отключать | DSA Art. 26-28 (не применимо) |
| Увидеть кто оплатил спонсорский пост | У BestMe **нет спонсорских постов** | DSA Art. 26 (не применимо) |
| Экспортировать «алгоритмический профиль» | Закон не требует (только персональные данные по GDPR Art. 20) | — |

---

## 3. UI элементы на экране ленты

### Верх экрана Feed

```
┌─────────────────────────────────────────────┐
│  [Smart Feed ✨]    [Natural Feed 🍃]       │
│  ─────────────────────────────────────────  │
│                                             │
│  📝 Post content...                         │
│     ❤️ 42    💬 5    🔖 3         [···]     │
│                                             │
│  📸 Photo post...                           │
│     ❤️ 128   💬 12   🔖 8        [···]     │
│                                             │
│  ... infinite scroll ...                    │
└─────────────────────────────────────────────┘
```

### Переключатель ленты (Feed Toggle)

| Элемент | Значение | Ключ перевода |
|---|---|---|
| **Вкладка 1** | Smart Feed ✨ | `feed_tab_smart` |
| **Вкладка 2** | Natural Feed 🍃 | `feed_tab_natural` |
| **Tooltip (при первом показе)** | Your feed is personalized. Tap «Natural Feed» for chronological order. | `feed_toggle_tooltip` |

> **Для дизайнера:** Две вкладки вверху экрана, как в Twitter/X или Instagram. Активная вкладка подчёркнута. Переключение — одно нажатие. **Используйте ТОЛЬКО названия «Smart Feed» и «Natural Feed»** — никаких «For You», «Recent», «Trending».

---

## 4. Меню поста (три точки ···)

При нажатии на `···` на любом посте в ленте — появляется bottom sheet с действиями:

### Действия в меню поста

| # | Действие | Иконка | Текст (EN) | Текст (RU) | Ключ перевода | Закон | Обязательно? |
|---|---|---|---|---|---|---|---|
| 1 | **Не интересно** | 👎 | Not interested | Не интересно | `post_not_interested` | DSA Art. 27 | ✅ Да |
| 2 | **Скрыть пост** | 🙈 | Hide this post | Скрыть этот пост | `post_hide` | DSA Art. 27 | ✅ Да |
| 3 | **Пожаловаться** | 🚩 | Report | Пожаловаться | `post_report` | DSA Art. 16 | ✅ Да |
| 4 | **Заблокировать автора** | 🚫 | Block @username | Заблокировать @username | `post_block_author` | Apple §1.2 | ✅ Да |
| 5 | **Скопировать ссылку** | 🔗 | Copy link | Скопировать ссылку | `post_copy_link` | — | ⬜ Опция |
| 6 | **Поделиться** | ↗️ | Share | Поделиться | `post_share` | — | ⬜ Опция |

### Разница между «Не интересно» и «Скрыть пост»

| Аспект | 👎 Not interested | 🙈 Hide this post |
|---|---|---|
| **Что происходит** | Пост скрывается + алгоритм учитывает (снижает вес подобного контента) | Только этот пост скрывается |
| **Влияет на Smart Feed** | ✅ Да — сигнал для алгоритма | ❌ Нет — только фильтр |
| **Влияет на Natural Feed** | ✅ Пост скрывается из обеих лент | ✅ Пост скрывается из обеих лент |
| **Можно отменить?** | ✅ Undo (снэкбар на 5 сек после нажатия) | ✅ Undo (снэкбар на 5 сек) |
| **Хранение** | `user_not_interested` таблица | `user_hidden_posts` таблица |

### Снэкбар после действия

| Действие | Текст снэкбара (EN) | Ключ перевода | Кнопка |
|---|---|---|---|
| Not interested | Post hidden. We'll show less like this. | `snackbar_not_interested` | [Undo] |
| Hide | Post hidden. | `snackbar_hidden` | [Undo] |
| Block | @username blocked. | `snackbar_blocked` | [Undo] |
| Report | Thanks for reporting. We'll review this. | `snackbar_reported` | — |

---

## 5. Настройки профиля — Feed & Content

### Путь: Settings → Feed & Content

```
┌──────────────────────────────────────────┐
│  ⚙️ Settings                              │
│  ─────────────────────────────────────── │
│                                           │
│  📋 Feed & Content                        │
│  ├── Default feed        [Smart Feed ▼]  │
│  ├── My interests / Goals     [Edit →]    │
│  ├── Content languages        [EN, RU →]  │
│  ├── 🔄 Reset Smart Feed      [Reset]     │
│  └── About recommendations    [→]         │
│                                           │
│  🔒 Privacy                               │
│  ├── ...                                  │
│                                           │
│  🗑️ Account                               │
│  ├── Delete account           [→]         │
│                                           │
└──────────────────────────────────────────┘
```

### Элементы настроек ленты

| # | Настройка | Тип | Значения | По умолчанию | Ключ перевода | Закон |
|---|---|---|---|---|---|---|
| 1 | **Default feed** | Dropdown | `Smart Feed` / `Natural Feed` | `Smart Feed` | `setting_default_feed` | DSA Art. 27 |
| 2 | **My interests / Goals** | Экран выбора | Список категорий wellness (мульти-выбор) | Выбранное при онбординге | `setting_my_interests` | DSA Art. 27 + GDPR Art. 16 |
| 3 | **Content languages** | Мульти-выбор | Языки | Язык устройства | `setting_content_languages` | — |
| 4 | **Reset Smart Feed** | Кнопка | — | — | `setting_reset_feed` | GDPR Art. 16, Art. 21 |
| 5 | **About recommendations** | Информационный экран | Текст + ссылка на ToS | — | `setting_about_recommendations` | DSA Art. 27 + AI Act Art. 50 |

### 5.1. Default feed — выбор ленты по умолчанию

| Значение | Описание |
|---|---|
| **For You** (по умолчанию) → `Smart Feed` | При каждом входе в приложение открывается Smart Feed |
| **Recent** → `Natural Feed` | При каждом входе в приложение открывается Natural Feed |

> **Backend:** `user_feed_preferences.default_mode = 'smart' | 'natural'`

### 5.2. My interests / Goals — редактирование интересов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Заголовок** | My wellness interests | `interests_title` |
| **Подзаголовок** | Choose topics you care about. This helps us show relevant content in your Smart Feed. | `interests_subtitle` |
| **Примечание** | Changes take effect immediately. Your Natural Feed is not affected. | `interests_note` |

> **Категории:** Те же что при онбординге — yoga, meditation, nutrition, fitness, mental health, sleep, mindfulness, journaling и т.д.
> **Минимум:** 1 категория. **Максимум:** без ограничений.
> **Backend:** `PUT /api/user/feed-preferences` с обновлённым `categories[]`.

### 5.3. About recommendations — прозрачность алгоритма

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Заголовок** | How your feed works | `about_recs_title` |
| **Текст** | (см. ниже) | `about_recs_body` |
| **Ссылка** | Read our Terms of Service | `about_recs_tos_link` |

**Текст для экрана «About recommendations»:**

```
HOW YOUR FEED WORKS

Smart Feed ✨
Your Smart Feed shows posts selected based on:
• Your interests and wellness goals
• Accounts you follow
• Posts you've liked, commented on, or saved
• How popular and recent a post is
• Communities you've joined
• Your language preferences

We do NOT use your race, ethnicity, religion, political views, sexual orientation, or health conditions to rank content.

Natural Feed 🍃
Your Natural Feed shows all posts in order of publication time — newest first. No algorithm, no personalization. Filtered only by your language settings.

You can switch between feeds at any time.

YOUR CONTROLS
• Change your interests: Settings → My Interests
• Switch default feed: Settings → Feed & Content
• Reset your feed: Settings → Feed & Content → Reset Smart Feed
• Hide or report any post: tap ··· on any post
```

---

## 6. Сброс ленты (Reset Smart Feed)

### Что это

Функция «обнулить» Smart Feed — алгоритм забывает историю лайков и просмотров пользователя. Лента начинает обучаться с чистого листа. Аккаунт, посты и подписки **НЕ удаляются**.

> **Юридическое основание:**
> - GDPR Art. 16 — Право на исправление данных
> - GDPR Art. 21 — Право на возражение против профилирования
> - Аналог функции «Reset Feed» в TikTok (добавлена под давлением европейских регуляторов)

### UI

| Элемент | Текст (EN) | Текст (RU) | Ключ перевода |
|---|---|---|---|
| **Кнопка** | 🔄 Reset Smart Feed | 🔄 Сбросить умную ленту | `reset_feed_button` |
| **Описание** | Your subscriptions and posts will stay, but the algorithm will forget your likes and viewing history. Your feed will start learning from scratch. | Ваши подписки и посты останутся, но алгоритм забудет историю лайков и просмотров. Лента начнёт обучаться с нуля. | `reset_feed_description` |
| **Подтверждение (dialog)** | Are you sure? This cannot be undone. Your feed will show generic content until it learns your preferences again. | Вы уверены? Это нельзя отменить. Лента будет показывать общий контент, пока не узнает ваши предпочтения заново. | `reset_feed_confirm` |
| **Кнопка OK** | Reset | Сбросить | `reset_feed_confirm_ok` |
| **Кнопка Cancel** | Cancel | Отмена | `reset_feed_confirm_cancel` |
| **Успех** | Done! Your feed has been reset. | Готово! Ваша лента сброшена. | `reset_feed_success` |

### Что происходит при нажатии Reset

| # | Действие | Описание |
|---|---|---|
| 1 | Очистить `user_interaction_stats` | Удалить историю взаимодействий за 30 дней |
| 2 | Очистить `feed_scores` | Удалить кэш скоров |
| 3 | Очистить `user_not_interested` | Удалить все «не интересно» отметки |
| 4 | Вернуть Cold Start фазу 0 | Пользователь снова проходит фазы разогрева (0 → 1 → 2 → 3) |
| 5 | **НЕ удалять:** подписки, посты, аккаунт, категории из онбординга | Подписки = явное действие пользователя, не «данные алгоритма» |
| 6 | Логировать | `legal_consents_log: feed_reset, timestamp` |

### API

```
POST /api/user/feed/reset

Response: { "status": "ok", "cold_start_phase": 0 }
```

---

## 7. Что добавить в Terms of Service

> **Добавить в ToS раздел «Recommendation System and Content Feed».**
> Этот текст **дополняет** существующий текст в [AI-ALGORITHMS.md](AI-ALGORITHMS.md) Секция 7.

### Текст для ToS (EN)

```
RECOMMENDATION SYSTEM AND CONTENT FEED

1. FEED MODES
   BestMe offers two feed modes:
   (a) "Smart Feed" — a personalized feed that ranks content based on your
       interests, interactions, and who you follow.
   (b) "Natural Feed" — a chronological feed that shows all posts in order of
       publication time, without any personalization or profiling.

   You can switch between modes at any time. You can set your preferred
   default feed in Settings → Feed & Content.

2. RANKING PARAMETERS (DSA Art. 27)
   The Smart Feed ranks content based on these main parameters:
   • Your stated wellness interests and goals
   • Accounts you follow and your friends
   • Content popularity (likes, comments, saves)
   • How recently the content was published
   • Communities you have joined
   • Your language preferences
   • Content type diversity

   We do NOT use race, ethnicity, religion, political views, sexual
   orientation, or health conditions as ranking parameters.

3. YOUR CONTROLS
   You have the following controls over your feed:
   • Switch to chronological feed ("Natural Feed") at any time
   • Set your default feed mode
   • Edit your interests and wellness goals
   • Hide individual posts or mark them as "Not interested"
   • Block users whose content you don't want to see
   • Reset your Smart Feed to start fresh (clears interaction history)
   • Report content that violates our Community Guidelines

4. DATA AND PROFILING
   The Smart Feed uses profiling (analysis of your interactions) to
   personalize content. The Natural Feed does not use any profiling.

   You may object to profiling at any time by:
   (a) Switching to the Natural Feed
   (b) Resetting your Smart Feed (Settings → Feed & Content → Reset)

5. AI DISCLOSURE (EU AI Act Art. 50)
   As of version 2.0, the Smart Feed may use machine learning models
   to rank content. Prior versions use rule-based algorithms (not AI).
   The Natural Feed never uses AI or machine learning.
```

### Текст для ToS (RU)

```
РЕКОМЕНДАТЕЛЬНАЯ СИСТЕМА И ЛЕНТА КОНТЕНТА

1. РЕЖИМЫ ЛЕНТЫ
   BestMe предлагает два режима ленты:
   (а) «Smart Feed» (Умная лента) — персонализированная лента, которая
       ранжирует контент на основе ваших интересов, взаимодействий и подписок.
   (б) «Natural Feed» (Натуральная лента) — хронологическая лента,
       показывающая все посты по времени публикации без какой-либо
       персонализации или профилирования.

   Вы можете переключаться между режимами в любой момент. Режим по
   умолчанию можно выбрать в Настройки → Лента и контент.

2. ПАРАМЕТРЫ РАНЖИРОВАНИЯ (DSA Art. 27)
   Smart Feed ранжирует контент по следующим основным параметрам:
   • Ваши интересы и цели в сфере здоровья
   • Аккаунты, на которые вы подписаны, и ваши друзья
   • Популярность контента (лайки, комментарии, сохранения)
   • Дата публикации контента
   • Сообщества, в которых вы состоите
   • Ваши языковые предпочтения
   • Разнообразие типов контента

   Мы НЕ используем расу, этническую принадлежность, религию,
   политические взгляды, сексуальную ориентацию или состояние здоровья
   в качестве параметров ранжирования.

3. ВАШИ ВОЗМОЖНОСТИ УПРАВЛЕНИЯ
   Вы можете:
   • Переключиться на хронологическую ленту (Natural Feed) в любой момент
   • Установить режим ленты по умолчанию
   • Редактировать свои интересы и цели
   • Скрывать отдельные посты или отмечать их как «Не интересно»
   • Блокировать пользователей
   • Сбросить умную ленту и начать с чистого листа
   • Жаловаться на контент, нарушающий правила сообщества

4. ДАННЫЕ И ПРОФИЛИРОВАНИЕ
   Smart Feed использует профилирование (анализ ваших действий)
   для персонализации контента. Natural Feed не использует
   никакого профилирования.

   Вы можете возразить против профилирования в любой момент:
   (а) Переключившись на Natural Feed
   (б) Сбросив умную ленту (Настройки → Лента и контент → Сброс)

5. РАСКРЫТИЕ ИИ (EU AI Act Art. 50)
   Начиная с версии 2.0, Smart Feed может использовать модели
   машинного обучения для ранжирования контента. В более ранних версиях
   используются алгоритмы на правилах (не ИИ). Natural Feed никогда
   не использует ИИ или машинное обучение.
```

---

## 8. Что добавить в Privacy Policy

> **Добавить/обновить раздел «Automated Decision-Making and Profiling».**
> Дополняет текст в [AI-ALGORITHMS.md](AI-ALGORITHMS.md) Секция 6.

### Текст для Privacy Policy (EN)

```
CONTENT FEED AND PROFILING

How We Personalize Your Feed
When you use the Smart Feed, we process the following data to rank
content for you:
• Categories and wellness goals you selected during onboarding
• Your interactions: posts you liked, commented on, saved, or spent
  time viewing (dwell time)
• Accounts you follow and your mutual connections (friends)
• Communities you have joined
• Your language preferences
• Your approximate location (country, via IP address) — only to
  suggest local content, NOT for tracking

This processing is based on your consent (GDPR Art. 6(1)(a)) and is
necessary to provide the personalized service you requested (Art. 6(1)(b)).

Data We Do NOT Use for Ranking
We explicitly exclude the following from our recommendation algorithm:
race, ethnicity, religion, political opinions, sexual orientation,
health conditions, genetic or biometric data, exact date of birth
(only anonymized age bracket is used).

Your Right to Opt Out of Profiling
You can opt out of content profiling at any time by:
1. Switching to the Natural Feed (chronological) — tap the
   "Natural Feed" tab at the top of your feed.
2. Setting Natural Feed as your default feed in Settings → Feed & Content.
3. Resetting your Smart Feed (Settings → Feed & Content → Reset).
   This deletes your interaction history used by the algorithm.

When you use the Natural Feed, no profiling takes place. Posts are
shown strictly in reverse chronological order, filtered by your
language preferences only.

Data Retention for Feed
• Interaction statistics (likes, dwell time aggregates) are retained
  for 30 days on a rolling basis.
• Feed audit logs (which posts were shown to you) are retained for
  12 months for compliance with DSA Art. 27 transparency requirements.
• When you reset your Smart Feed, interaction statistics are deleted
  immediately.
• When you delete your account, ALL feed-related data is permanently
  deleted within 30 days (GDPR Art. 17).
```

### Текст для Privacy Policy (RU)

```
ЛЕНТА КОНТЕНТА И ПРОФИЛИРОВАНИЕ

Как мы персонализируем вашу ленту
Когда вы используете Smart Feed (Умную ленту), мы обрабатываем следующие
данные для ранжирования контента:
• Категории и цели, которые вы выбрали при регистрации
• Ваши действия: посты, которые вы лайкнули, прокомментировали,
  сохранили или просматривали (время задержки внимания)
• Аккаунты, на которые вы подписаны, и ваши взаимные подписки (друзья)
• Сообщества, в которых вы состоите
• Ваши языковые предпочтения
• Ваше приблизительное местоположение (страна, через IP-адрес) —
  только для рекомендации локального контента, НЕ для отслеживания

Обработка данных основана на вашем согласии (GDPR ст. 6(1)(а)) и
необходима для предоставления запрошенной персонализированной
услуги (ст. 6(1)(б)).

Какие данные мы НЕ используем для ранжирования
Мы явно исключаем из нашего алгоритма рекомендаций: расу, этническую
принадлежность, религию, политические взгляды, сексуальную ориентацию,
состояние здоровья, генетические и биометрические данные, точную дату
рождения (используется только анонимизированная возрастная группа).

Ваше право отказаться от профилирования
Вы можете отказаться от профилирования контента в любой момент:
1. Переключитесь на Natural Feed (Натуральную ленту) — нажмите вкладку
   «Natural Feed» вверху ленты.
2. Установите Natural Feed как ленту по умолчанию в Настройки →
   Лента и контент.
3. Сбросьте умную ленту (Настройки → Лента и контент → Сброс).
   Это удалит историю взаимодействий, используемую алгоритмом.

Когда вы используете Natural Feed, никакого профилирования не
происходит. Посты показываются строго в обратном хронологическом порядке,
фильтруясь только по вашим языковым настройкам.

Сроки хранения данных ленты
• Статистика взаимодействий (лайки, среднее время просмотра) хранится
  30 дней на скользящей основе.
• Логи аудита ленты (какие посты были вам показаны) хранятся 12 месяцев
  для соответствия требованиям прозрачности DSA ст. 27.
• При сбросе умной ленты статистика взаимодействий удаляется немедленно.
• При удалении аккаунта ВСЕ данные ленты удаляются безвозвратно
  в течение 30 дней (GDPR ст. 17).
```

---

## 9. API endpoints для управления лентой

> Полная спецификация API ленты — в [SMART-FEED-TZ.md](SMART-FEED-TZ.md), Раздел 11. Здесь только endpoint-ы для **пользовательского управления**.

| # | Endpoint | Метод | Описание | Закон |
|---|---|---|---|---|
| 1 | `/api/feed?mode=smart\|natural` | GET | Получить ленту | DSA Art. 27 |
| 2 | `/api/user/feed-preferences` | PUT | Обновить настройки (default mode, languages, categories) | DSA Art. 27 |
| 3 | `/api/user/feed/reset` | POST | Сбросить Smart Feed (очистить историю) | GDPR Art. 16, 21 |
| 4 | `/api/feed/not-interested` | POST | Отметить пост как «не интересно» | DSA Art. 27 |
| 5 | `/api/feed/hide` | POST | Скрыть пост | DSA Art. 27 |
| 6 | `/api/user/block` | POST | Заблокировать пользователя | DSA Art. 16 |
| 7 | `/api/report` | POST | Пожаловаться на контент | DSA Art. 16 |

### POST /api/feed/not-interested

```json
// Request
{ "post_id": "uuid" }

// Response
{ "status": "ok" }
```

### POST /api/feed/hide

```json
// Request
{ "post_id": "uuid" }

// Response
{ "status": "ok" }
```

### POST /api/user/feed/reset

```json
// Request (no body)

// Response
{ "status": "ok", "cold_start_phase": 0 }
```

---

## 10. Таблицы БД для настроек

> Основные таблицы (feed_scores, feed_audit_log, user_feed_preferences, user_interaction_stats) — в [SMART-FEED-TZ.md](SMART-FEED-TZ.md), Раздел 12. Здесь — **дополнительные** таблицы для управления.

### user_hidden_posts

```sql
CREATE TABLE user_hidden_posts (
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id    UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- RLS: пользователь видит и создаёт только свои записи
ALTER TABLE user_hidden_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_hidden_posts_own ON user_hidden_posts
  FOR ALL USING (auth.uid() = user_id);
```

### user_not_interested

```sql
CREATE TABLE user_not_interested (
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id    UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

ALTER TABLE user_not_interested ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_not_interested_own ON user_not_interested
  FOR ALL USING (auth.uid() = user_id);
```

### user_blocks (если ещё не создана)

```sql
CREATE TABLE user_blocks (
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, blocked_id)
);

ALTER TABLE user_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY user_blocks_own ON user_blocks
  FOR ALL USING (auth.uid() = user_id);
```

---

## 11. Чеклист

### Обязательно (по закону)

- [ ] Переключатель «Smart Feed ✨» / «Natural Feed 🍃» работает (DSA Art. 27)
- [ ] Settings → «About recommendations» с описанием параметров (DSA Art. 27 + AI Act Art. 50)
- [ ] Кнопка «Report» на каждом посте (DSA Art. 16)
- [ ] Кнопка «Block» на каждом посте (Apple §1.2)
- [ ] Кнопка «Appeal» при AI-удалении поста (GDPR Art. 22 + DSA Art. 20)
- [ ] Удаление аккаунта удаляет ВСЕ данные ленты (GDPR Art. 17)
- [ ] ToS содержит раздел «Recommendation System» с параметрами ранжирования
- [ ] Privacy Policy содержит раздел «Content Feed and Profiling»

### Рекомендуется (лучшая практика 2026)

- [ ] Кнопка «Not interested» на каждом посте
- [ ] Кнопка «Hide this post» на каждом посте
- [ ] Settings → «My interests» — редактирование категорий
- [ ] Settings → «Default feed» — выбор ленты по умолчанию
- [ ] Settings → «Reset Smart Feed» — сброс истории
- [ ] Snackbar с [Undo] после «Hide» / «Not interested» / «Block»
- [ ] Settings → «Content languages» — языковой фильтр для Smart Feed

### Тексты для перевода

- [ ] `feed_tab_for_you`, `feed_tab_recent` — вкладки ленты
- [ ] `feed_toggle_tooltip` — подсказка при первом показе
- [ ] `post_not_interested`, `post_hide`, `post_report`, `post_block_author` — меню поста
- [ ] `snackbar_not_interested`, `snackbar_hidden`, `snackbar_blocked`, `snackbar_reported`
- [ ] `feed_end_title`, `feed_end_subtitle`, `feed_end_switch_smart` — конец ленты
- [ ] `feed_empty_title`, `feed_empty_subtitle` — пустая лента
- [ ] `setting_default_feed`, `setting_my_interests`, `setting_content_languages`, `setting_reset_feed`, `setting_about_recommendations`
- [ ] `reset_feed_button`, `reset_feed_description`, `reset_feed_confirm`, `reset_feed_success`
- [ ] `about_recs_title`, `about_recs_body`

---

> **Связанные документы:**
> - [SMART-FEED-TZ.md](SMART-FEED-TZ.md) — ТЗ Smart Feed (формула скоринга W1–W12, Cold Start, Diversity Slots, API, DB)
> - [NATURAL-FEED.md](NATURAL-FEED.md) — ТЗ Natural Feed (хронологическая лента, SQL, пагинация, конец контента)
> - [AI-ALGORITHMS.md](AI-ALGORITHMS.md) — AI-системы BestMe (лента, поиск, модерация)
> - [UGC-MODERATION.md](UGC-MODERATION.md) — Система жалоб и модерации
> - [LEGAL-DOCUMENTS.md](LEGAL-DOCUMENTS.md) — Юридические документы (ToS, PP, CG)
> - [COMPLIANCE.md](../COMPLIANCE.md) — Основной документ compliance
