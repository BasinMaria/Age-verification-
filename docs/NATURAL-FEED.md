← Назад к [SMART-FEED-TZ.md](SMART-FEED-TZ.md) | [FEED-UI.md](FEED-UI.md) | [COMPLIANCE.md](../COMPLIANCE.md)

# 🍃 Natural Feed — Единый алгоритм ленты (ТЗ)

> **Название:** Natural Feed 🍃
>
> **Что это:** Лента контента **без персонального ИИ-профилирования**. Работает для ВСЕХ типов пользователей: новых (Cold Start) и вернувшихся (с подписками). Алгоритм **детерминированный** — одинаковые входные данные всегда дают одинаковый результат.
>
> **Текст для пользователя (EN):** Top and newest posts from your subscriptions, ranked without personal AI profiling.
> **Текст для пользователя (RU):** Лучшие и новые посты от ваших подписок, ранжированные без персонального ИИ-профилирования.
>
> **Юридическая основа:** DSA Art. 27 **ОБЯЗЫВАЕТ** предоставить альтернативу рекомендательной системе, **не основанную на профилировании**.
>
> **Когда реализовать:** MVP (v1.0) — одновременно со Smart Feed.

---

## Оглавление

1. [Определение типа пользователя](#1-определение-типа-пользователя)
2. [Архитектура ленты: Блочная система 4+6](#2-архитектура-ленты-блочная-система-46)
3. [Сценарий A: Новый пользователь (Cold Start)](#3-сценарий-a-новый-пользователь-cold-start)
4. [Сценарий B: Вернувшийся пользователь (есть подписки)](#4-сценарий-b-вернувшийся-пользователь-есть-подписки)
5. [Content Groups — 5 групп контента](#5-content-groups--5-групп-контента)
6. [Categories — 6 категорий с базовыми весами](#6-categories--6-категорий-с-базовыми-весами)
7. [Discovery Loop — алгоритм ротации (Блок Б)](#7-discovery-loop--алгоритм-ротации-блок-б)
8. [Пагинация — как лента растёт при скролле](#8-пагинация--как-лента-растёт-при-скролле)
9. [Fallback-правила (замена пустых слотов)](#9-fallback-правила-замена-пустых-слотов)
10. [Системные посты](#10-системные-посты)
11. [Профильные данные — что можно и нельзя использовать](#11-профильные-данные--что-можно-и-нельзя-использовать)
12. [База данных (Таблицы, Индексы)](#12-база-данных-таблицы-индексы)
13. [API endpoint](#13-api-endpoint)
14. [Юридическое обоснование](#14-юридическое-обоснование)
15. [Разница с Smart Feed](#15-разница-с-smart-feed)
16. [PHASE 1: App Entry & Zero-Second Load](#16-phase-1-app-entry--zero-second-load)
17. [PHASE 2: Scrolling Engine](#17-phase-2-scrolling-engine)
18. [PHASE 3: Impression Tracking](#18-phase-3-impression-tracking)
19. [PHASE 4: Content Fallback System](#19-phase-4-content-fallback-system)
20. [PHASE 5: Anti-Fraud & Rate Limiting](#20-phase-5-anti-fraud--rate-limiting)
21. [Чеклист для разработчика](#21-чеклист-для-разработчика)

---

## 1. Определение типа пользователя

При каждом запросе ленты сервер **первым делом** определяет, к какому типу относится пользователь:

```
subscriptions_count = friends + communities + blog_follows + business_follows
```

| Условие | Тип | Алгоритм ленты |
|---|---|---|
| `subscriptions_count = 0` | 📱 **Новый** (Cold Start) | Только Discovery Loop (10 постов = 10 из Блока Б) |
| `subscriptions_count = 1–4` | 🔄 **Гибридный** | Блок А (сколько есть, max 4) + Блок Б (добивает до 10) |
| `subscriptions_count ≥ 5` | 🏠 **Вернувшийся** | Блок А (4 поста) + Блок Б (6 постов) = 10 |

> **Ключевое правило:** Каждая «порция» (batch) ленты = **ровно 10 постов**. Соотношение Блок А / Блок Б зависит от количества подписок.

---

## 2. Архитектура ленты: Блочная система 4+6

Каждый запрос ленты (по 10 постов) собирается из двух блоков:

```
┌─────────────────────────────────────────────────────────┐
│                   ПОРЦИЯ (10 постов)                     │
├─────────────────────────────────────────────────────────┤
│  📦 БЛОК А: «Мои подписки» (Слоты 1–4)                 │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Слот 1: 🫂 Пост от Друга                        │    │
│  │ Слот 2: 👥 Пост из Моего Сообщества             │    │
│  │ Слот 3: 📝 Пост от Моей Подписки (Блог)         │    │
│  │ Слот 4: 🏢 Пост от Моей Подписки (Бизнес)       │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  📦 БЛОК Б: «Discovery» (Слоты 5–10)                   │
│  ┌─────────────────────────────────────────────────┐    │
│  │ Слот 5:  ContentGroup[0] + Status + Category[0] │    │
│  │ Слот 6:  ContentGroup[1] + Status + Category[1] │    │
│  │ Слот 7:  ContentGroup[2] + Status + Category[2] │    │
│  │ Слот 8:  ContentGroup[3] + Status + Category[3] │    │
│  │ Слот 9:  ContentGroup[4] + Status + Category[4] │    │
│  │ Слот 10: ContentGroup[0] + Status + Category[5] │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Сценарий A: Новый пользователь (Cold Start)

### Когда: `subscriptions_count = 0`

У пользователя нет друзей, подписок, сообществ. **Блок А пуст.** Вся порция из 10 постов = Discovery Loop.

> **Важно:** При Cold Start порция по-прежнему 10 постов, но оба «куска» заполняются Discovery:
> - Слоты 1–4: первые 4 поста текущего Loop
> - Слоты 5–10: следующие 6 постов того же Loop
> 
> Итого: один полный Loop = 10 постов (а не 6, как в Discovery Loop alone). Но для нового пользователя **первый Loop растягивается**: первые 6 — один цикл Content Groups, вторые 4 — начало следующего.

**Нет. Для простоты и красоты алгоритма используем единую схему:**

Для нового пользователя **каждая порция = 1 полный Discovery Loop (6 постов) + начало следующего Loop (4 поста)**:

Но ещё проще: **Блок А пуст → все 10 слотов заполняются из Discovery Loop подряд.**

```
Порция 1 (посты 1–10):   Discovery позиции 0–9
Порция 2 (посты 11–20):  Discovery позиции 10–19
Порция 3 (посты 21–30):  Discovery позиции 20–29
```

Формула Discovery Loop одна и та же (см. [раздел 7](#7-discovery-loop--алгоритм-ротации-блок-б)). Просто для нового пользователя все 10 слотов порции = Discovery.

---

## 4. Сценарий B: Вернувшийся пользователь (есть подписки)

### Когда: `subscriptions_count ≥ 5`

### 📦 Блок А: «Мои подписки» (первые 4 поста)

Сервер берёт по **1 самому свежему непросмотренному посту** из социального графа:

| Слот | Источник | Сортировка | `post_type` |
|---|---|---|---|
| **1** | 🫂 Друг (из `friends`) | Самый свежий непросмотренный | `user_post` |
| **2** | 👥 Сообщество (из `community_members`) | Самый свежий непросмотренный | `community_post` или `discussion` |
| **3** | 📝 Блог-подписка (из `follows` где `type = blog`) | Самый свежий непросмотренный | `blog_post` |
| **4** | 🏢 Бизнес-подписка (из `follows` где `type = business`) | Самый свежий непросмотренный | `business_post` |

**Правило замены (Fallback для Блока А):**

| Ситуация | Действие |
|---|---|
| Нет свежих постов от друзей | Слот 1 → 🔥 Popular `user_post` из Discovery |
| Нет свежих постов из сообществ | Слот 2 → 🔥 Popular `community_post` из Discovery |
| Нет свежих постов от блогов | Слот 3 → 🔥 Popular `blog_post` из Discovery |
| Нет свежих постов от бизнесов | Слот 4 → 🔥 Popular `business_post` из Discovery |
| Нет данных ни от кого | Все 4 слота → Discovery (как в Cold Start) |

> **«Свежий»** = `created_at` за последние 14 дней И не в `seen_posts`.

### 📦 Блок Б: «Discovery» (следующие 6 постов)

Сразу под подписками сервер вставляет **1 стандартный цикл (Loop)** из Discovery алгоритма.

Для первой порции (Loop 1) это:

| Слот | Content Group | Status | Category |
|---|---|---|---|
| **5** | 📝 Blog | 🔥 Popular | 🥇 Эстетика |
| **6** | 💬 Discussion | 🆕 New | 🥈 Питание |
| **7** | 👥 Communities | 🔥 Popular | 🥉 Спорт |
| **8** | 👤 Users | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| **9** | 🏢 Business | 🔥 Popular | ⏱ Режим дня |
| **10** | 📝 Blog | 🆕 New | 🌱 Окружающая среда |

### Защита от слипания категорий

> **Правило:** Если категория Слота 5 (первый пост Блока Б) **совпала** с категорией поста в Слоте 4 (последний пост Блока А), сервер **принудительно сдвигает** категорию Слота 5 на один шаг вперёд по колесу категорий.

### Гибридный режим (1–4 подписки)

| Подписки | Блок А | Блок Б |
|---|---|---|
| 1 | 1 пост от подписки | 9 постов из Discovery |
| 2 | 2 поста от подписок | 8 постов из Discovery |
| 3 | 3 поста от подписок | 7 постов из Discovery |
| 4 | 4 поста от подписок | 6 постов из Discovery |
| ≥ 5 | 4 поста от подписок | 6 постов из Discovery |

> Если у пользователя 3 подписки, Блок А = 3 слота (какие есть), Блок Б добивает до 10.

---

## 5. Content Groups — 5 групп контента

Порядок **фиксированный** и **одинаковый для всех пользователей**:

| № | Content Group | `post_type` | Зачем именно этот порядок |
|---|---|---|---|
| **0** | 📝 **Blog** | `blog_post` | **The Hook.** Самый визуально привлекательный, профессиональный контент. Первое впечатление: «Вау, тут красивый и полезный контент!» |
| **1** | 💬 **Discussion** | `discussion` | **The Engagement.** Показывает, что приложение «живое». Активные обсуждения сразу вовлекают в сообщество. |
| **2** | 👥 **Communities** | `community_post` | **The Belonging.** Тематические хабы. Помогает найти «своё племя» и нишевые темы для подписки. |
| **3** | 👤 **Users** | `user_post` | **The Social Proof.** Контент обычных людей. Платформа не только для инфлюенсеров — тут такие же, как и я. |
| **4** | 🏢 **Business** | `business_post` | **The Commercial Value.** Последним **намеренно**. Коммерческий контент слишком рано = ощущение маркетплейса. |

---

## 6. Categories — 6 категорий с базовыми весами

Порядок определяет **приоритет показа** при равных условиях. Base Weight задаёт стартовые баллы категорий:

| № | Категория | Base Weight | `category` slug | Почему этот приоритет |
|---|---|---|---|---|
| **0** | 🥇 **Эстетика** — Personal Care & Beauty | +500 | `aesthetics` | Самый огромный и визуальный рынок в мире (> $1 трлн). До/После, обзоры косметики → бешеный трафик. |
| **1** | 🥈 **Питание** — Healthy Eating & Nutrition | +400 | `nutrition` | Едят все. Рецепты, витамины, советы нутрициологов → самый «сохраняемый» контент. |
| **2** | 🥉 **Спорт** — Physical Activity | +300 | `sport` | Высокая визуальная привлекательность. Мотивация, подборки упражнений. |
| **3** | 🧘‍♀️ **Ментальное здоровье** — Psychology & Wellness | +200 | `mental_health` | Самый быстрорастущий сегмент. Самые длинные дискуссии в комментариях. |
| **4** | ⏱ **Режим дня** — Daily Routine & Biohacking | +100 | `daily_routine` | Контент для «продвинутых». Аудитория меньше, но очень лояльная. |
| **5** | 🌱 **Окружающая среда** — Eco & Environment | 0 | `environment` | Самая сложная для виральности тема. Лайкают реже всего. |

### Формула приоритета категории

```
CategoryPriority = BaseWeight + InternalActivityScore

InternalActivityScore = (
  posts_count_24h × 1
  + comments_count_24h × 2
  + likes_count_24h × 0.5
  + communities_count × 10
  + discussions_count_24h × 3
)
```

> **Base Weight — НЕ персонализация.** Одинаковые стартовые баллы для ВСЕХ пользователей. Системная метрика на основе мировой статистики. **DSA Art. 27 compliant.**

### Как Base Weight меняется со временем

| Этап | Логика |
|---|---|
| **Старт (первые дни)** | Категории «просыпаются» каждое утро с Base Weight. Эстетика, Питание, Спорт доминируют. |
| **Рост активности** | Внутренняя активность (посты, лайки, комменты, сообщества) **добавляет баллы** сверх Base Weight. |
| **Органическое изменение** | Если пользователи активно обсуждают «Ментальное здоровье», эта категория обгонит Эстетику. |
| **Защита от пустоты** | Base Weight гарантирует: даже если в категории мало постов, она не провалится в ноль. |

---

## 7. Discovery Loop — алгоритм ротации (Блок Б)

### 7.1. Формула сдвига (для разработчика)

```
Для поста на Discovery-позиции N (начиная с 0):

content_group_index = N % 5
  Массив: ['blog', 'discussion', 'community', 'user', 'business']

category_index = N % 6
  Массив: ['aesthetics', 'nutrition', 'sport', 'mental_health', 'daily_routine', 'environment']

status = (N % 2 == 0) ? 'popular' : 'new'
```

> **Почему это работает:** 5 (Content Groups) и 6 (Categories) — **взаимно простые числа** (НОД = 1). Полный цикл уникальных комбинаций = **5 × 6 = 30 позиций**. За 30 постов пользователь увидит **каждую возможную пару** Content Group + Category ровно один раз.

### 7.2. Полная матрица — 5 циклов (30 Discovery-позиций)

#### 🔄 Loop 1 (Discovery-позиции 0–5)

| Позиция | Content Group | Status | Category |
|---|---|---|---|
| 0 | 📝 Blog | 🔥 Popular | 🥇 Эстетика |
| 1 | 💬 Discussion | 🆕 New | 🥈 Питание |
| 2 | 👥 Communities | 🔥 Popular | 🥉 Спорт |
| 3 | 👤 Users | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 4 | 🏢 Business | 🔥 Popular | ⏱ Режим дня |
| 5 | 📝 Blog | 🆕 New | 🌱 Окружающая среда |

#### 🔄 Loop 2 (Discovery-позиции 6–11)

| Позиция | Content Group | Status | Category |
|---|---|---|---|
| 6 | 💬 Discussion | 🔥 Popular | 🥇 Эстетика |
| 7 | 👥 Communities | 🆕 New | 🥈 Питание |
| 8 | 👤 Users | 🔥 Popular | 🥉 Спорт |
| 9 | 🏢 Business | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 10 | 📝 Blog | 🔥 Popular | ⏱ Режим дня |
| 11 | 💬 Discussion | 🆕 New | 🌱 Окружающая среда |

> **Обратите внимание на позицию 10:** цикл Content Groups начался заново, но категория уже ⏱ Режим дня. На позиции 0 юзер видел популярного блогера про Эстетику. На позиции 10 — популярного блогера про Режим дня.

#### 🔄 Loop 3 (Discovery-позиции 12–17)

| Позиция | Content Group | Status | Category |
|---|---|---|---|
| 12 | 👥 Communities | 🔥 Popular | 🥇 Эстетика |
| 13 | 👤 Users | 🆕 New | 🥈 Питание |
| 14 | 🏢 Business | 🔥 Popular | 🥉 Спорт |
| 15 | 📝 Blog | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 16 | 💬 Discussion | 🔥 Popular | ⏱ Режим дня |
| 17 | 👥 Communities | 🆕 New | 🌱 Окружающая среда |

#### 🔄 Loop 4 (Discovery-позиции 18–23)

| Позиция | Content Group | Status | Category |
|---|---|---|---|
| 18 | 👤 Users | 🔥 Popular | 🥇 Эстетика |
| 19 | 🏢 Business | 🆕 New | 🥈 Питание |
| 20 | 📝 Blog | 🔥 Popular | 🥉 Спорт |
| 21 | 💬 Discussion | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 22 | 👥 Communities | 🔥 Popular | ⏱ Режим дня |
| 23 | 👤 Users | 🆕 New | 🌱 Окружающая среда |

#### 🔄 Loop 5 (Discovery-позиции 24–29)

| Позиция | Content Group | Status | Category |
|---|---|---|---|
| 24 | 🏢 Business | 🔥 Popular | 🥇 Эстетика |
| 25 | 📝 Blog | 🆕 New | 🥈 Питание |
| 26 | 💬 Discussion | 🔥 Popular | 🥉 Спорт |
| 27 | 👥 Communities | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 28 | 👤 Users | 🔥 Popular | ⏱ Режим дня |
| 29 | 🏢 Business | 🆕 New | 🌱 Окружающая среда |

> **После позиции 29 цикл начинается заново с позиции 0**, но все посты будут **другими** (дедупликация через `seen_posts`).

### 7.3. Как выбирается конкретный пост для Discovery-слота

```
1. Определить content_group, category, status по формуле сдвига.
2. Если status = 'popular':
   → SELECT * FROM posts
     WHERE post_type = {content_group}
       AND category = {category}
       AND id NOT IN (SELECT post_id FROM seen_posts WHERE user_id = ?)
     ORDER BY popularity_score DESC
     LIMIT 1
3. Если status = 'new':
   → SELECT * FROM posts
     WHERE post_type = {content_group}
       AND category = {category}
       AND id NOT IN (SELECT post_id FROM seen_posts WHERE user_id = ?)
     ORDER BY created_at DESC
     LIMIT 1
4. Если пост не найден → Fallback (см. раздел 9).
```

---

## 8. Пагинация — как лента растёт при скролле

### 8.1. Для вернувшегося пользователя (≥ 5 подписок)

Каждая порция = **Блок А (4 поста) + Блок Б (6 постов)**. При скролле:

```
Порция 1 (посты 1–10):
  Блок А: 4 свежих поста от Друзей/Подписок/Сообществ/Бизнесов
  Блок Б: Discovery Loop позиции 0–5

Порция 2 (посты 11–20):
  Блок А: Следующие 4 свежих поста от Друзей/Подписок (другие авторы)
  Блок Б: Discovery Loop позиции 6–11

Порция 3 (посты 21–30):
  Блок А: Ещё 4 поста от Друзей/Подписок (если остались)
  Блок Б: Discovery Loop позиции 12–17

... и так далее.
```

> **Если у юзера МНОГО постов от друзей** — они раздаются по 4 штуки в каждой порции. Между каждыми 4 социальными постами юзер всегда видит 6 Discovery-постов для расширения кругозора.

### 8.2. Для нового пользователя (Cold Start)

Блок А пуст. Все 10 постов = Discovery:

```
Порция 1 (посты 1–10):   Discovery позиции 0–9
Порция 2 (посты 11–20):  Discovery позиции 10–19
Порция 3 (посты 21–30):  Discovery позиции 20–29
Порция 4 (посты 31–40):  Discovery позиции 0–9  (цикл заново, другие посты)
```

### 8.3. Cursor-based пагинация

```
Клиент хранит:
  - discovery_offset: int  (текущая позиция в Discovery Loop, 0–29, циклически)
  - last_seen_at: timestamp (курсор для Блока А)
  - seen_post_ids: Set<UUID> (дедупликация)
```

---

## 9. Fallback-правила (замена пустых слотов)

### 9.1. Fallback для Блока А (подписки)

| Ситуация | Действие |
|---|---|
| Нет свежих постов от друзей | Слот → 🆕 New `user_post` (новый пользователь платформы) |
| Нет свежих постов из сообществ | Слот → 🔥 Popular `community_post` из Discovery |
| Нет свежих постов от блогов | Слот → 🔥 Popular `blog_post` из Discovery |
| Нет свежих постов от бизнесов | Слот → 🔥 Popular `business_post` из Discovery |
| У юзера < 4 типов подписок | Заполненные слоты идут первыми, пустые — пропускаются, Блок Б расширяется |

### 9.2. Fallback для Блока Б (Discovery)

| Ситуация | Действие |
|---|---|
| Нет постов в нужной категории + content_group | Попробовать **следующую категорию** (сдвиг +1) |
| Следующая категория тоже пуста | Попробовать **категорию №0** (Эстетика — всегда самая заполненная) |
| Нет постов нужного content_group | Попробовать **следующий content_group** (сдвиг +1) |
| Нет Popular-постов | Переключить на New (свежий) |
| Нет New-постов | Переключить на Popular |
| Полностью пуста | Показать `system_post` (приглашение подписаться) |

### 9.3. Time Expansion (расширение окна времени)

Если контент заканчивается, сервер расширяет временное окно:

| Попытка | Временное окно | Описание |
|---|---|---|
| 1 | Последние 24 часа | По умолчанию |
| 2 | Последние 3 дня | Если < 10 постов |
| 3 | Последняя неделя | Если всё ещё < 10 |
| 4 | Последние 14 дней | Максимум |

---

## 10. Системные посты

Системные уведомления вставляются **между порциями**, а не внутри:

| # | Событие | Текст (EN) | Текст (RU) | Когда |
|---|---|---|---|---|
| 1 | Новая дискуссия в сообществе | 💬 New discussion in {community}: "{title}" | 💬 Новая дискуссия в {community}: «{title}» | Создание дискуссии |
| 2 | Популярная дискуссия | 🔥 Trending: "{title}" | 🔥 Популярно: «{title}» | > 10 комментов / 24ч |
| 3 | Новый пост блогера | ✍️ {blog_name} published new post | ✍️ {blog_name} опубликовал новый пост | Публикация |
| 4 | Рост сообщества | 👥 {community} reached {N} members! | 👥 {community} достигло {N} участников! | Порог подписчиков |
| 5 | Приглашение подписаться | 🌟 Discover creators you'll love | 🌟 Откройте авторов для себя | Cold Start (каждые 30 постов) |

**Правила:** Макс 1 системный пост на 15 обычных. Отключаемо в Settings. Стиль карточки отличается (без лайков/комментов, с кнопкой действия).

---

## 11. Профильные данные — что можно и нельзя использовать

| Данные профиля | Natural Feed | Почему |
|---|---|---|
| Пол | ❌ НЕ используется | Было бы профилированием (GDPR Art 4(4)) |
| Возраст | ❌ НЕ используется | Было бы профилированием |
| Категории интересов | ❌ НЕ используется для ранжирования | v1.5: можно как **опциональный фильтр** в Settings |
| Язык | ✅ Используется | Фильтр по `user_content_languages` или `Accept-Language`. Не профилирование — пользователь сам выбирает язык |
| Подписки (follows, friends) | ✅ Используется (Блок А) | Пользователь сам подписался — его выбор |
| История просмотров | ✅ Только для дедупликации | `seen_posts` — чтобы не показывать то же самое |

### Anti-Flood Guard

**Макс 3 `business_post` подряд** в любом месте ленты. Если 3-й бизнес-пост подряд → вставить следующий не-бизнесовый.

> Это **защита от спама**, а не ранжирование. DSA Art. 27 compliant.

---

## 12. База данных (Таблицы, Индексы)

### 12.1. Основные таблицы

```sql
-- Главная таблица постов
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id),
  post_type TEXT NOT NULL CHECK (post_type IN ('user_post','business_post','blog_post','community_post','discussion','system_post')),
  category TEXT CHECK (category IN ('aesthetics','nutrition','sport','mental_health','daily_routine','environment')),
  content TEXT,
  media_urls TEXT[],
  popularity_score NUMERIC DEFAULT 0,
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  saves_count INT DEFAULT 0,
  shares_count INT DEFAULT 0,
  is_deleted BOOLEAN DEFAULT false,
  is_auto_removed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Просмотренные посты (дедупликация)
CREATE TABLE seen_posts (
  user_id UUID REFERENCES profiles(id),
  post_id UUID REFERENCES posts(id),
  seen_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- Скрытые посты
CREATE TABLE user_hidden_posts (
  user_id UUID REFERENCES profiles(id),
  post_id UUID REFERENCES posts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- "Не интересно"
CREATE TABLE user_not_interested (
  user_id UUID REFERENCES profiles(id),
  post_id UUID REFERENCES posts(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- Блокировки
CREATE TABLE user_blocks (
  blocker_id UUID REFERENCES profiles(id),
  blocked_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (blocker_id, blocked_id)
);

-- Языковые предпочтения
CREATE TABLE user_content_languages (
  user_id UUID REFERENCES profiles(id),
  language_code TEXT NOT NULL,
  PRIMARY KEY (user_id, language_code)
);

-- Приоритет категорий (пересчитывается каждый час)
CREATE TABLE category_priorities (
  category TEXT PRIMARY KEY,
  base_weight INT NOT NULL,
  internal_activity_score NUMERIC DEFAULT 0,
  total_priority NUMERIC GENERATED ALWAYS AS (base_weight + internal_activity_score) STORED,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Стартовые данные для category_priorities
INSERT INTO category_priorities (category, base_weight) VALUES
  ('aesthetics', 500),
  ('nutrition', 400),
  ('sport', 300),
  ('mental_health', 200),
  ('daily_routine', 100),
  ('environment', 0);
```

### 12.2. Индексы

```sql
-- Popularity Score
CREATE INDEX idx_posts_popularity ON posts (popularity_score DESC) WHERE NOT is_deleted;
CREATE INDEX idx_posts_type_category_pop ON posts (post_type, category, popularity_score DESC) WHERE NOT is_deleted;
CREATE INDEX idx_posts_type_category_new ON posts (post_type, category, created_at DESC) WHERE NOT is_deleted;

-- Подписки (для Блока А)
CREATE INDEX idx_posts_author_created ON posts (author_id, created_at DESC) WHERE NOT is_deleted;

-- Дедупликация
CREATE INDEX idx_seen_posts_user ON seen_posts (user_id, post_id);

-- TTL для seen_posts (удалять записи старше 14 дней)
-- pg_cron: DELETE FROM seen_posts WHERE seen_at < NOW() - INTERVAL '14 days';
```

### 12.3. Row Level Security (RLS)

```sql
ALTER TABLE seen_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY seen_posts_user ON seen_posts
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE user_hidden_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY hidden_posts_user ON user_hidden_posts
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE user_not_interested ENABLE ROW LEVEL SECURITY;
CREATE POLICY not_interested_user ON user_not_interested
  FOR ALL USING (auth.uid() = user_id);

ALTER TABLE user_blocks ENABLE ROW LEVEL SECURITY;
CREATE POLICY blocks_user ON user_blocks
  FOR ALL USING (auth.uid() = blocker_id);
```

---

## 13. API endpoint

### `GET /api/feed/natural`

**Query params:**

| Param | Type | Required | Description |
|---|---|---|---|
| `discovery_offset` | int | Нет (default: 0) | Текущая позиция в Discovery Loop (0–29, циклически) |
| `last_seen_at` | timestamp | Нет | Курсор для Блока А (пагинация по подпискам) |
| `limit` | int | Нет (default: 10) | Количество постов в порции |
| `language` | string | Нет | Фильтр языка (если не указан — из `user_content_languages` или `Accept-Language`) |

**Response:**

```json
{
  "posts": [
    {
      "slot": 1,
      "block": "A",
      "source": "friend",
      "post": { "id": "...", "post_type": "user_post", "category": "nutrition", ... }
    },
    {
      "slot": 2,
      "block": "A",
      "source": "community",
      "post": { "id": "...", "post_type": "community_post", ... }
    },
    ...
    {
      "slot": 5,
      "block": "B",
      "source": "discovery",
      "discovery_meta": {
        "content_group": "blog",
        "status": "popular",
        "category": "aesthetics"
      },
      "post": { "id": "...", "post_type": "blog_post", ... }
    },
    ...
  ],
  "pagination": {
    "next_discovery_offset": 6,
    "next_last_seen_at": "2026-04-02T18:00:00Z",
    "has_more": true
  },
  "meta": {
    "user_type": "returning",
    "block_a_count": 4,
    "block_b_count": 6,
    "feed_type": "natural"
  }
}
```

### `POST /api/feed/seen`

Batch-отправка просмотренных постов:

```json
{
  "post_ids": ["uuid1", "uuid2", "uuid3"]
}
```

---

## 14. Юридическое обоснование

### Почему Natural Feed обязательна

| Закон | Требование | Как выполняем |
|---|---|---|
| **DSA Art. 27** | Предоставить альтернативу рекомендательной системе, не основанную на профилировании | Natural Feed = ранжирование по Popularity Score (одинаковое для всех) + Discovery Loop (детерминированная ротация) |
| **GDPR Art. 4(4)** | Профилирование = автоматическая обработка личных данных для оценки личных аспектов | Natural Feed НЕ анализирует личные данные для ранжирования |
| **Apple Guidelines** | Пользователь должен контролировать свой опыт | Переключатель Smart Feed ↔ Natural Feed |

### Что считается профилированием, а что нет

| Метод | Профилирование? | Почему |
|---|---|---|
| Popularity Score (лайки, комменты) | ❌ Нет | Одинаковая метрика для ВСЕХ. Не зависит от профиля пользователя. |
| Discovery Loop (5×6 матрица) | ❌ Нет | Детерминированная ротация, одинаковая для ВСЕХ новых пользователей. |
| Base Weight категорий | ❌ Нет | Мировая статистика, одинаковая для ВСЕХ. |
| Контент от подписок (Блок А) | ❌ Нет | Пользователь **сам** подписался. Его явный выбор. |
| Языковой фильтр | ❌ Нет | Пользователь **сам** выбирает языки. |
| Анализ поведения (клики, время просмотра) → ранжирование | ✅ **Да** | Это Smart Feed, не Natural Feed. |

---

## 15. Разница с Smart Feed

| Аспект | 📱 Cold Start | 🍃 Natural Feed (Returning) | ✨ Smart Feed |
|---|---|---|---|
| **Когда** | Нет подписок (0) | Есть подписки (≥ 1) | Есть подписки (≥ 5) |
| **Блок А** | ❌ Нет | ✅ 1–4 поста от подписок | ✅ Персонализирован |
| **Блок Б** | ✅ Все 10 = Discovery | ✅ 6–9 постов Discovery | ✅ AI-рекомендации |
| **Источник** | Вся платформа (Global) | Подписки + Global Discovery | Вся платформа (Wide) |
| **Порядок** | Матрица 5×6 | Подписки + Матрица 5×6 | Персональный Score (W1–W12) |
| **Профилирование** | ❌ Нет | ❌ Нет | ✅ Да |
| **Персонализация** | ❌ Нет | ❌ Нет | ✅ Да |
| **DSA Compliant** | ✅ | ✅ Обязательная альтернатива | ✅ Основная лента |

---

## 16. PHASE 1: App Entry & Zero-Second Load

### Сценарий A: Самый первый вход (Onboarding Background Fetch)

```
Пользователь видит:        Onboarding slides (свайп 1-2-3)
В это время Backend:        Уже генерирует первую порцию Cold Start (10 постов)
Результат:                   К моменту окончания Onboarding лента готова
```

| Параметр | Значение |
|---|---|
| **Когда начинать** | Сразу после успешной регистрации (до окончания Onboarding) |
| **Что запрашивать** | `GET /api/feed/natural?discovery_offset=0&limit=10` |
| **Куда сохранять** | Локальный кеш (SQLite / AsyncStorage) |
| **Таймаут** | 5 секунд. Если не успел — показать Skeleton UI |

### Сценарий B: Повторный вход (Local Cache First)

```
1. Показать кешированную ленту мгновенно (0 ms)
2. В фоне запросить свежую порцию
3. Если есть новые посты → показать "Pull to refresh" badge
4. НЕ менять текущую позицию скролла
```

| Параметр | Значение |
|---|---|
| **Кеш хранить** | 50 последних постов |
| **TTL кеша** | 30 минут (после этого — обязательный refresh) |
| **Фоновый запрос** | Сразу при app launch, параллельно с показом кеша |

### Сценарий C: Фоновое обновление ОС (Background App Refresh)

| Платформа | Механизм | Когда |
|---|---|---|
| **iOS** | `BGAppRefreshTask` | ОС решает (обычно каждые 15–30 мин при WiFi) |
| **Android** | `WorkManager` (PeriodicWorkRequest) | Каждые 15 минут |

---

## 17. PHASE 2: Scrolling Engine

### Строгие порции

```
Каждый запрос = ровно 10 постов.
Клиент запрашивает новую порцию, когда пользователь доскроллил до поста #7 (prefetch trigger).
```

| Параметр | Значение |
|---|---|
| **Размер порции** | 10 постов (всегда) |
| **Prefetch trigger** | Пост #7 текущей порции (3 поста до конца) |
| **Virtualized list** | Держать в DOM/памяти только ~20 постов (текущие 10 + буфер 10) |
| **Skeleton** | Показывать при загрузке порции (3 серых карточки) |

---

## 18. PHASE 3: Impression Tracking

### Отслеживание просмотров

```sql
-- Структура
CREATE TABLE seen_posts (
  user_id UUID,
  post_id UUID,
  seen_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- TTL: удалять записи старше 14 дней
-- pg_cron: DELETE FROM seen_posts WHERE seen_at < NOW() - INTERVAL '14 days';
```

### Client-Side Batch Tracking

```
1. Клиент собирает post_ids в буфер по мере скролла
2. Отправляет батч каждые 10 просмотренных постов ИЛИ при уходе из ленты
3. Endpoint: POST /api/feed/seen { post_ids: [...] }
```

### Offline Sync

```
Если сеть недоступна:
1. Сохранить seen_post_ids в локальное хранилище
2. При восстановлении сети — отправить накопленный батч
3. Дедупликация: ON CONFLICT (user_id, post_id) DO NOTHING
```

---

## 19. PHASE 4: Content Fallback System

### Time Expansion

```sql
-- Попытка 1: последние 24 часа
WHERE created_at > NOW() - INTERVAL '24 hours'

-- Попытка 2: последние 3 дня
WHERE created_at > NOW() - INTERVAL '3 days'

-- Попытка 3: последняя неделя
WHERE created_at > NOW() - INTERVAL '7 days'

-- Попытка 4: последние 14 дней (максимум)
WHERE created_at > NOW() - INTERVAL '14 days'
```

### Category Fallback

```
Если нет постов в нужной category:
1. Попробовать category_index + 1
2. Если и там нет → category_index = 0 (Эстетика)
3. Если Эстетика пуста → любой пост нужного content_group
```

### End of Feed

| Уровень | Условие | Действие |
|---|---|---|
| 1 | Все 14 дней исчерпаны | Показать карточку: «Вы всё просмотрели! 🎉» + кнопка «Подписаться на новых авторов» |
| 2 | После карточки | Показать «Посты старше 14 дней» (архив, без ограничений) |
| 3 | Абсолютно пусто | Illustration + «Подпишитесь на авторов» + «Вступите в сообщество» |

---

## 20. PHASE 5: Anti-Fraud & Rate Limiting

### Защита просмотров

| Правило | Значение |
|---|---|
| Max batch size | 50 post_ids за один запрос (Cold Start: 100) |
| Rate limit | Макс 60 просмотров в минуту |
| Физическая проверка | Минимум 1.5 секунды между просмотрами |
| Duplicate rejection | `ON CONFLICT DO NOTHING` |

### Защита лайков/реакций

| Правило | Значение |
|---|---|
| Idempotency | `PRIMARY KEY (user_id, post_id)` — повторный лайк = toggle |
| Rate limit | Макс 1 лайк в секунду |
| Self-like | `CHECK (user_id != author_id)` |
| Fresh accounts | Лайки от аккаунтов < 24ч не влияют на Popularity Score |

### API Security

| Правило | Значение |
|---|---|
| RPC only | Все операции через Supabase RPC functions, не прямые INSERT |
| RLS | Row Level Security на всех таблицах пользовательских данных |
| Rate limiting | Supabase Edge Functions с rate limiter |

---

## 21. Чеклист для разработчика

### Backend — Определение типа пользователя

- [ ] Подсчёт `subscriptions_count` (friends + communities + blog_follows + business_follows)
- [ ] Маршрутизация: 0 → Cold Start, 1–4 → Гибрид, ≥ 5 → Returning

### Backend — Блок А (Подписки)

- [ ] Запрос свежего поста от друзей (`friends` → `user_post`)
- [ ] Запрос свежего поста из сообществ (`community_members` → `community_post`/`discussion`)
- [ ] Запрос свежего поста от блогов (`follows type=blog` → `blog_post`)
- [ ] Запрос свежего поста от бизнесов (`follows type=business` → `business_post`)
- [ ] Fallback для каждого пустого слота
- [ ] Фильтрация: `NOT is_deleted`, `NOT in seen_posts`, `NOT in user_hidden_posts`, `NOT in user_blocks`

### Backend — Блок Б (Discovery Loop)

- [ ] Массив Content Groups: `['blog', 'discussion', 'community', 'user', 'business']`
- [ ] Массив Categories: `['aesthetics', 'nutrition', 'sport', 'mental_health', 'daily_routine', 'environment']`
- [ ] Формула сдвига: `content_group = N % 5`, `category = N % 6`, `status = N % 2`
- [ ] Для Popular: `ORDER BY popularity_score DESC LIMIT 1`
- [ ] Для New: `ORDER BY created_at DESC LIMIT 1`
- [ ] Fallback при пустой категории/content_group
- [ ] Защита от слипания категорий (Блок А → Блок Б)

### Backend — Base Weight & Categories

- [ ] Таблица `category_priorities` с Base Weight (+500, +400, +300, +200, +100, 0)
- [ ] `InternalActivityScore` пересчёт каждый час (pg_cron)
- [ ] `CategoryPriority = BaseWeight + InternalActivityScore`

### Backend — Пагинация

- [ ] `discovery_offset` (0–29, циклический)
- [ ] `last_seen_at` (курсор для Блока А)
- [ ] Порция = ровно 10 постов

### Backend — Фильтры безопасности

- [ ] `is_deleted = false`
- [ ] `is_auto_removed = false`
- [ ] `NOT IN user_blocks`
- [ ] `NOT IN user_not_interested`
- [ ] `NOT IN user_hidden_posts`
- [ ] `NOT IN seen_posts`
- [ ] Языковой фильтр (`user_content_languages`)
- [ ] Anti-Flood Guard (макс 3 `business_post` подряд)

### Backend — Popularity Score

- [ ] См. отдельный документ: [POPULARITY-SCORE.md](POPULARITY-SCORE.md)

### Frontend — App Entry (PHASE 1)

- [ ] Background fetch при Onboarding
- [ ] Local Cache First при повторном входе
- [ ] Pull-to-refresh badge
- [ ] Skeleton UI при загрузке

### Frontend — Scrolling (PHASE 2)

- [ ] Порции по 10 постов
- [ ] Prefetch trigger на посте #7
- [ ] Virtualized list (~20 постов в памяти)

### Frontend — Impression Tracking (PHASE 3)

- [ ] Batch отправка seen_post_ids (каждые 10 постов)
- [ ] Offline sync (буфер в локальном хранилище)
- [ ] `ON CONFLICT DO NOTHING`

### БД

- [ ] Таблица `posts` (с `post_type`, `category`, `popularity_score`)
- [ ] Таблица `seen_posts` (TTL 14 дней)
- [ ] Таблица `user_hidden_posts`
- [ ] Таблица `user_not_interested`
- [ ] Таблица `user_blocks`
- [ ] Таблица `user_content_languages`
- [ ] Таблица `category_priorities`
- [ ] Индексы: popularity, type+category+popularity, type+category+created_at, author+created_at
- [ ] RLS на всех пользовательских таблицах
- [ ] pg_cron: пересчёт popularity_score каждые 15 минут
- [ ] pg_cron: пересчёт InternalActivityScore каждый час
- [ ] pg_cron: удаление seen_posts старше 14 дней

---

> **Связанные документы:**
> - [POPULARITY-SCORE.md](POPULARITY-SCORE.md) — Формула Popularity Score (вынесена в отдельный документ)
> - [SMART-FEED-TZ.md](SMART-FEED-TZ.md) — Smart Feed (персонализированная лента W1–W12)
> - [FEED-UI.md](FEED-UI.md) — Интерфейс ленты, настройки, права пользователя
> - [AI-ALGORITHMS.md](AI-ALGORITHMS.md) — AI-системы BestMe
> - [COMPLIANCE.md](../COMPLIANCE.md) — Основной документ compliance
