← Назад к [COMPLIANCE.md](../COMPLIANCE.md)

# 🤖 AI и Алгоритмы — прозрачность, законы, реализация

> **BestMe использует AI в трёх направлениях:** 1) Персональные рекомендации контента (лента), 2) AI-поиск, 3) Автомодерация контента.
> Все три направления **регулируются законами** — DSA, EU AI Act, Apple/Google.

---

## Оглавление

1. [Какие AI-системы используются](#1-какие-ai-системы-используются-в-bestme)
2. [Законы](#2-законы-которые-регулируют-ai)
3. [Алгоритмическая лента — требования](#3-алгоритмическая-лента--рекомендации)
4. [AI-поиск](#4-ai-поиск)
5. [AI-модерация контента](#5-ai-модерация-контента)
6. [Что писать в Privacy Policy](#6-что-писать-в-privacy-policy)
7. [Что писать в Terms of Service](#7-что-писать-в-terms-of-service)
8. [Что показать в приложении (UI)](#8-что-показать-в-приложении-ui)
9. [MVP — минимальная реализация](#9-mvp--минимальная-реализация)
10. [Чеклист](#10-чеклист)

---

## 1. Какие AI-системы используются в BestMe

| # | Система | Что делает | Категория риска (EU AI Act) |
|---|---|---|---|
| 1 | **Алгоритмическая лента** | Рекомендует посты/блоги на основе интересов пользователя | Minimal risk — система рекомендаций |
| 2 | **AI-поиск** | Умный поиск контента, пользователей, сообществ | Minimal risk |
| 3 | **AI-модерация** | Автоматическая проверка контента на нарушения (CSAM, spam, hate speech) | Limited risk — влияет на права пользователей |

> **Все три системы = Limited / Minimal risk** по EU AI Act. Высокого риска (High-risk) нет.
> Основное требование: **прозрачность** — пользователь должен знать, что контентом управляет алгоритм.

---

## 2. Законы, которые регулируют AI

| Закон | Что требует | Применимость |
|---|---|---|
| [**EU AI Act**](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) Art. 50 | Прозрачность: пользователь должен знать, что взаимодействует с AI-системой | ✅ Алгоритмическая лента, AI-поиск, AI-модерация |
| [**DSA**](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) Art. 27 | Рекомендательные системы: раскрыть параметры + дать альтернативу (хронологическая лента) | ✅ Алгоритмическая лента |
| [**DSA**](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) Art. 14 | Описать в ToS как работает модерация контента | ✅ AI-модерация |
| [**DSA**](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) Art. 15 | Отчёт о прозрачности (ежегодный) — объём модерации | ✅ AI-модерация (после масштабирования) |
| [**GDPR**](https://gdpr-info.eu/art-22-gdpr/) Art. 22 | Право не подвергаться автоматическому решению, имеющему правовые последствия | ✅ AI-модерация (удаление контента) |
| [**Apple §1.2**](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) | UGC-приложения должны иметь механизм модерации | ✅ AI-модерация |
| **CCPA/CPRA** | Раскрыть автоматическое принятие решений (automated decision-making) | ✅ AI-модерация |

---

## 3. Алгоритмическая лента — рекомендации

> 📋 **Полная техническая спецификация (ТЗ для программистов):** [SMART-FEED-TZ.md](SMART-FEED-TZ.md) — 12 сигналов ранжирования с формулами, Cold Start стратегия, Diversity Slots, штрафные множители, API endpoints, таблицы БД, фазы реализации.

### Что требует DSA Art. 27

> Онлайн-платформы, использующие рекомендательные системы, **ОБЯЗАНЫ:**
> 1. Раскрыть в Terms of Service **основные параметры** ранжирования
> 2. Предоставить хотя бы **ОДНУ альтернативу**, не основанную на профилировании — т.е. **хронологическую ленту**

### Параметры ранжирования ленты BestMe

| Параметр | Описание | Вес |
|---|---|---|
| **Интересы пользователя** | Категории wellness, которые пользователь выбрал или с которыми взаимодействует | Высокий |
| **Популярность поста** | Количество лайков, комментариев, сохранений | Средний |
| **Свежесть** | Время публикации (новые посты выше) | Средний |
| **Социальный граф** | Посты от подписок пользователя в приоритете | Высокий |
| **Тип контента** | Баланс между фото, текстом, блогом | Низкий |

> ⚠️ **Что НЕ используется:** раса, этническая принадлежность, религия, политические взгляды, сексуальная ориентация, состояние здоровья.

### Natural Feed 🍃 (альтернатива без профилирования)

| Аспект | Описание |
|---|---|
| **Что это** | Лента лучших и новых постов от подписок и сообществ пользователя, ранжированная по **системной популярности** (лайки, комменты, сохранения). Без персонального AI-профилирования |
| **Как включить** | Переключатель в настройках ленты или иконка вверху экрана Feed |
| **Область контента** | Только подписки + сообщества + друзья. Свои посты НЕ показываются |
| **Ранжирование** | Popularity Score — одинаковый для всех (не зависит от поведения пользователя) |
| **New Content Slots** | Каждый 10-й слот — свежий пост (< 2ч) для органического продвижения |
| **DSA Art. 27** | Это **обязательная** альтернатива. Без неё — нарушение DSA |
| **По умолчанию** | Smart Feed (по умолчанию) — пользователь может переключить на Natural Feed |

### 🖥️ UI — переключатель ленты

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Иконка/кнопка** | ✨ / 🍃 | `feed_mode_toggle` |
| **Алгоритмическая** | Smart Feed | `feed_mode_smart` |
| **Хронологическая** | Natural Feed | `feed_mode_natural` |
| **Подсказка (tooltip)** | Your feed is sorted by our recommendation algorithm. Switch to Natural Feed to see top posts from your subscriptions, ranked by community popularity. | `feed_mode_explanation` |
| **Настройки** | Feed preferences | `feed_preferences` |
| **В настройках** | Default feed: [Smart Feed ▼] / [Natural Feed ▼] | `default_feed_setting` |

> **Для дизайнера:** Две вкладки вверху ленты: «Smart Feed ✨» и «Natural Feed 🍃». **НЕ используйте** «For You», «Recent», «Trending» — только «Smart Feed» и «Natural Feed».

---

## 4. AI-поиск

### Что это

AI-поиск в BestMe помогает пользователям находить контент, людей, сообщества и бизнес-профили. Использует NLP (Natural Language Processing) для понимания запросов.

### Требования прозрачности

| Требование | Реализация |
|---|---|
| Пользователь должен знать, что результаты персонализированы | Иконка 🤖 или текст «AI-powered search» рядом с поисковой строкой |
| Не дискриминировать по защищённым характеристикам | Результаты не ранжируются по расе, полу, религии и т.д. |
| Раскрыть в Privacy Policy | Описать что поисковые запросы обрабатываются для улучшения результатов |

### 🖥️ UI

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Placeholder** | Search people, posts, communities... | `search_placeholder` |
| **AI badge** | ✨ AI-powered | `search_ai_powered` |
| **Disclosure** | Search results are personalized based on your activity. | `search_personalized_disclosure` |

---

## 5. AI-модерация контента

### Как работает

```
Пользователь публикует контент
       │
       ▼
AI-система проверяет:
├── CSAM (детская эксплуатация) → НЕМЕДЛЕННО удалить + отчёт NCMEC
├── Nudity (обнажённость) → Автоудаление + уведомление автору
├── Hate speech → Флаг для модератора (НЕ автоудаление)
├── Spam → Автоудаление + уведомление
├── Violence → Флаг для модератора
└── Чистый контент → Публикуется
       │
       ▼
Если контент удалён AI:
├── Автор получает уведомление (DSA Art. 17) с причиной
├── Автор может обжаловать (Appeal) — DSA Art. 20
└── Человек-модератор рассматривает апелляцию
```

### Категории AI-модерации

| Категория | Автоматическое действие | Человек проверяет? | Закон |
|---|---|---|---|
| **CSAM** | Немедленное удаление + отчёт | Да (подтверждение) | 18 U.S.C. § 2258A, EU Directive 2011/93 |
| **Spam** | Автоудаление | Нет (при апелляции — да) | Apple §1.2, Google UGC |
| **Nudity** | Автоудаление | При апелляции | Apple §1.2, Community Guidelines |
| **Hate speech** | Флаг → очередь модерации | ✅ Да, обязательно | DSA Art. 14 |
| **Violence** | Флаг → очередь модерации | ✅ Да, обязательно | DSA Art. 14 |
| **Self-harm** | Флаг → модерация + ресурсы | ✅ Да, обязательно | Wellness-специфика |
| **Misinformation (здоровье)** | Флаг → модерация | ✅ Да, обязательно | Wellness-специфика |

> ⚠️ **GDPR Art. 22:** Автоматическое решение, существенно затрагивающее пользователя (удаление контента, бан), должно иметь **право на человеческое рассмотрение**. Поэтому при ЛЮБОМ AI-решении → пользователь может подать **апелляцию**, которую рассмотрит человек.

### Уведомление автору при удалении AI (DSA Art. 17)

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Content flagged by automated system | `ai_content_flagged_title` |
| **Body** | Your content was reviewed by our automated moderation system and was found to violate our Community Guidelines: **{reason}**. | `ai_content_flagged_body` |
| **Disclosure** | This decision was made by an automated system. You have the right to appeal and have a human reviewer look at this decision. | `ai_decision_disclosure` |
| **Appeal** | Appeal this decision | `appeal_ai_decision` |

### Что писать в Community Guidelines про AI-модерацию

В Community Guidelines BestMe **ОБЯЗАТЕЛЬНО** указать:

1. BestMe использует **автоматические системы** (AI) для предварительной проверки контента
2. AI может **ошибаться** — пользователь всегда может **обжаловать** решение
3. Финальное решение по апелляции принимает **человек-модератор**
4. Типы контента, которые проверяются автоматически (список выше)

---

## 6. Что писать в Privacy Policy

> Добавить в Privacy Policy следующий раздел:

### Текст для Privacy Policy (EN)

```
AUTOMATED DECISION-MAKING AND PROFILING

BestMe uses automated systems in the following ways:

1. Content Recommendations: We use algorithms to personalize your feed
   based on your interests, interactions, and who you follow. You can
   switch to a chronological feed at any time in Feed settings.

2. Search: Our search functionality uses AI to provide relevant results
   based on your query and activity.

3. Content Moderation: We use automated tools to detect content that may
   violate our Community Guidelines, including spam, nudity, and illegal
   content. When content is removed by an automated system, you will be
   notified and may appeal the decision for human review.

Under GDPR Article 22, you have the right not to be subject to decisions
based solely on automated processing that significantly affect you. All
automated content moderation decisions can be appealed for human review.

Under the EU AI Act, we disclose that our recommendation and moderation
systems use artificial intelligence. These systems are classified as
limited/minimal risk under the EU AI Act.

We do not use profiling based on race, ethnicity, religion, political
opinions, sexual orientation, or health status for content recommendations.
```

---

## 7. Что писать в Terms of Service

> Добавить в Terms of Service следующий раздел:

### Текст для Terms of Service (EN)

```
RECOMMENDATION SYSTEM (DSA Art. 27)

BestMe uses an algorithmic recommendation system to personalize your
content feed. The main parameters used for ranking content are:

- Your stated interests and wellness categories
- Your interactions (likes, comments, saves)
- Content from accounts you follow
- Content popularity and recency

You can switch to a chronological feed (sorted by publication time only)
at any time using the feed toggle or in Settings > Feed Preferences.

CONTENT MODERATION

BestMe uses a combination of automated tools and human moderators to
enforce our Community Guidelines. Automated tools may flag or remove
content that appears to violate our rules.

If your content is removed:
- You will be notified with the reason for removal
- You may appeal the decision within 6 months
- Appeals are reviewed by a human moderator within 48 hours

For details on prohibited content, see our Community Guidelines.
```

---

## 8. Что показать в приложении (UI)

### 8.1. Настройки ленты

| Место | Что показать |
|---|---|
| **Feed (верх экрана)** | Переключатель «Smart Feed ✨» / «Natural Feed 🍃» |
| **Settings → Feed Preferences** | Выбор ленты по умолчанию + объяснение алгоритма |

### 8.2. О рекомендациях (Settings)

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Пункт меню** | About recommendations | `about_recommendations` |
| **Описание** | Your Smart Feed is personalized using an algorithm that considers your interests, interactions, and who you follow. You can switch to Natural Feed (chronological order) at any time. | `recommendations_description` |
| **Ссылка** | Learn more in our Terms of Service | `learn_more_tos` |

### 8.3. Раскрытие AI при модерации

Когда контент удалён AI — в уведомлении **ОБЯЗАТЕЛЬНО** указать:
- Что решение принято **автоматической системой** (не человеком)
- **Причину** удаления
- **Кнопку апелляции**

### 8.4. Раскрытие AI в поиске

- Маленький badge «✨ AI-powered» рядом с поисковой строкой
- При первом использовании — tooltip: «Search results are personalized»

---

## 9. MVP — минимальная реализация

> Для первого релиза BestMe:

| # | Что сделать | Приоритет | Сложность |
|---|---|---|---|
| 1 | **Переключатель ленты** «Smart Feed ✨» / «Natural Feed 🍃» | 🔴 Обязательно (DSA Art. 27) | Простая |
| 2 | **Описание алгоритма** в Settings | 🔴 Обязательно (DSA Art. 27) | Текст |
| 3 | **AI-модерация** — хотя бы CSAM + spam detection | 🔴 Обязательно (Apple/Google) | Средняя |
| 4 | **Уведомление** «решение AI + апелляция» при удалении | 🔴 Обязательно (GDPR Art. 22, DSA Art. 17) | Простая |
| 5 | **Privacy Policy** раздел об AI | 🔴 Обязательно | Текст |
| 6 | **Terms of Service** раздел о рекомендациях | 🔴 Обязательно | Текст |
| 7 | Badge «AI-powered» в поиске | 🟡 Рекомендуется (EU AI Act Art. 50) | Простейшая |
| 8 | Ежегодный Transparency Report | 🟢 Позже (после масштабирования) | — |

### Что можно отложить на v2

- Подробная статистика модерации (Transparency Report)
- Тонкая настройка параметров ленты пользователем
- Объяснение «почему именно этот пост показан»
- A/B тестирование алгоритмов ленты

---

## 10. Чеклист

### В приложении

- [ ] Переключатель ленты «Smart Feed ✨» / «Natural Feed 🍃» — работает
- [ ] Settings → About recommendations — текст есть
- [ ] Settings → Feed Preferences — выбор по умолчанию
- [ ] При удалении контента AI → уведомление с причиной + кнопка Appeal
- [ ] В уведомлении указано что решение автоматическое
- [ ] Badge «AI-powered» в поиске
- [ ] AI-модерация: CSAM detection включён
- [ ] AI-модерация: spam detection включён

### В документах

- [ ] Privacy Policy — раздел «Automated Decision-Making and Profiling»
- [ ] Terms of Service — раздел «Recommendation System» с параметрами
- [ ] Terms of Service — раздел «Content Moderation» с описанием AI + appeal
- [ ] Community Guidelines — указано что используется AI-модерация
- [ ] Community Guidelines — указано право на апелляцию

### Backend

- [ ] Таблица `ai_moderation_log` — лог всех AI-решений (для аудита DSA)
- [ ] API endpoint для переключения ленты (algorithmic / chronological)
- [ ] API endpoint для апелляции AI-решения

---

## 💾 Backend — таблица `ai_moderation_log`

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID записи |
| `content_id` | UUID FK | ID контента (пост/комментарий) |
| `content_type` | ENUM | `post`, `comment`, `photo` |
| `ai_model` | VARCHAR | Название модели (для аудита) |
| `ai_decision` | ENUM | `approved`, `flagged`, `auto_removed` |
| `ai_reason` | ENUM | `csam`, `spam`, `nudity`, `hate`, `violence`, `self_harm`, `clean` |
| `ai_confidence` | FLOAT | Уверенность модели (0.0–1.0) |
| `human_review` | ENUM | `pending`, `confirmed`, `overturned`, `not_needed` |
| `created_at` | TIMESTAMP | Когда проверено |

---

> **Связанные документы:**
> - [SMART-FEED-TZ.md](SMART-FEED-TZ.md) — 🛠 **ТЗ: Smart Feed AI** — полная техническая спецификация рекомендательной системы (12 сигналов, формулы, Cold Start, Diversity Slots, API, БД)
> - [COMPLIANCE.md](../COMPLIANCE.md) — основной документ
> - [UGC-MODERATION.md](UGC-MODERATION.md) — система жалоб и модерации
> - [COMMUNITY-GUIDELINES.md](COMMUNITY-GUIDELINES.md) — полный текст Community Guidelines
> - [LEGAL-DOCUMENTS.md](LEGAL-DOCUMENTS.md) — юридические документы
