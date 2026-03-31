← Назад к [SMART-FEED-TZ.md](SMART-FEED-TZ.md) | [FEED-UI.md](FEED-UI.md) | [COMPLIANCE.md](../COMPLIANCE.md)

# 🍃 Natural Feed — Полный алгоритм ленты по популярности без ИИ-профилирования (ТЗ)

> **Название:** Natural Feed 🍃 (Community Feed)
>
> **Что это:** Лента лучших и новых постов от сообщества, ранжированная по **системной популярности** (лайки, комментарии, сохранения) — **без персонального ИИ-профилирования**. Пользователь видит посты **только от своих подписок, сообществ и друзей**. Пользователь **не видит свои посты** в этой ленте.
>
> **Текст для пользователя (EN):** Top and newest posts from your subscriptions, ranked without personal AI profiling.
> **Текст для пользователя (RU):** Лучшие и новые посты от ваших подписок, ранжированные без персонального ИИ-профилирования.
>
> **Зачем нужна:** DSA Art. 27 **ОБЯЗЫВАЕТ** предоставить альтернативу рекомендательной системе, которая **не основана на профилировании**. Natural Feed — это та самая альтернатива. Ранжирование по популярности (одинаковые метрики для ВСЕХ) ≠ профилирование (индивидуальный подбор на основе анализа поведения).
>
> **Когда реализовать:** MVP (v1.0) — одновременно со Smart Feed. По закону обязательна.

---

## Оглавление

1. [ПОЛНАЯ ТАБЛИЦА: все виды контента, порядок, правила отображения](#1-полная-таблица-все-виды-контента-порядок-правила-отображения)
2. [ПОЛНЫЙ АЛГОРИТМ: пошаговая сборка ленты (от запроса до экрана)](#2-полный-алгоритм-пошаговая-сборка-ленты-от-запроса-до-экрана)
3. [Формула Popularity Score — подробное описание](#3-формула-popularity-score--подробное-описание)
4. [Профильные данные пользователя — что можно и что нельзя использовать](#4-профильные-данные-пользователя--что-можно-и-что-нельзя-использовать)
5. [Разница с Smart Feed — итоговая сводная таблица](#5-разница-с-smart-feed--итоговая-сводная-таблица)
6. [Юридическое обоснование](#6-юридическое-обоснование)
7. [Техническая реализация (SQL, API, БД)](#7-техническая-реализация-sql-api-бд)
8. [Чеклист для разработчика](#8-чеклист-для-разработчика)

---

## 1. ПОЛНАЯ ТАБЛИЦА: все виды контента, порядок, правила отображения

### 1.1. Мастер-таблица — что показывается, в каком порядке, по каким правилам

> **Это главная таблица всего алгоритма.** Программист читает только её и понимает весь Natural Feed целиком.

| № позиции в ленте | Тип слота | Какой контент | `post_type` | Откуда берётся | Как сортируется внутри слота | Правила / лимиты | Пример |
|---|---|---|---|---|---|---|---|
| **1–9** | 🔥 **Popularity** | Любой из 5 типов (кроме system) | `user_post`, `business_post`, `blog_post`, `community_post`, `discussion` | Подписки + Сообщества + Друзья | `ORDER BY popularity_score DESC` | Макс 3 бизнес-поста подряд (Anti-Flood Guard) | 🔥 Пост @anna (Score: 45.2) |
| **10** | 🆕 **New Content Slot** | Свежий пост (< 2 часов) любого типа | `user_post`, `business_post`, `blog_post`, `community_post`, `discussion` | Подписки + Сообщества + Друзья | `ORDER BY created_at DESC` (самые новые первые) | Только посты < 2ч; если нет свежих → заполняется следующим по популярности | 🆕 Пост @friend (5 мин назад) |
| **11–24** | 🔥 **Popularity** | Любой из 5 типов | (как выше) | (как выше) | `ORDER BY popularity_score DESC` | Anti-Flood Guard | 🔥 Пост из сообщества (Score: 11.8) |
| **25** | 📢 **System Post** | Системное уведомление | `system_post` | Платформа (события в подписках/сообществах) | По `created_at DESC` | Макс 1 на 15 обычных постов; отключаемо в Settings | 📢 «Новая дискуссия в Meditation 🧘» |
| **26–29** | 🔥 **Popularity** | (как выше) | (как выше) | (как выше) | `ORDER BY popularity_score DESC` | Anti-Flood Guard | 🔥 Блог-пост @nutritionist (Score: 8.3) |
| **30** | 🆕 **New Content Slot** | Свежий пост (< 2 часов) | (как выше) | (как выше) | `ORDER BY created_at DESC` | (как слот 10) | 🆕 Новая дискуссия (30 мин назад) |
| **31–39** | 🔥 **Popularity** | (как выше) | (как выше) | (как выше) | `ORDER BY popularity_score DESC` | Anti-Flood Guard | ... |
| **40** | 🆕 **New Content Slot** | (как выше) | ... | ... | ... | ... | ... |
| ... | 📢 **System Post** | (вставляется каждые ~15 постов) | ... | ... | ... | Если есть нового для показа | ... |

### 1.2. Визуальная схема одной «страницы» ленты (20 постов)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│         [Smart Feed ✨]       [Natural Feed 🍃] ← АКТИВЕН                   │
├─ # ──┬── Тип слота ──────────┬── Контент ──────────────────────────────────┤
│  1   │ 🔥 Popularity         │ user_post от @anna (Score: 45.2)            │
│  2   │ 🔥 Popularity         │ community_post из «Утренняя йога» (38.1)    │
│  3   │ 🔥 Popularity         │ blog_post от @nutritionist (33.7)           │
│  4   │ 🔥 Popularity         │ business_post от @yoga_studio (31.0)        │
│  5   │ 🔥 Popularity         │ discussion «Как начать медитацию?» (28.5)   │
│  6   │ 🔥 Popularity         │ user_post от @friend_max (25.0)             │
│  7   │ 🔥 Popularity         │ business_post от @trainer (22.1)            │
│  8   │ 🔥 Popularity         │ community_post из «Питание» (18.3)          │
│  9   │ 🔥 Popularity         │ user_post от @kate (15.7)                   │
│ 10   │ 🆕 New Content Slot   │ user_post от @friend (опубликован 5 мин)    │
│ 11   │ 🔥 Popularity         │ blog_post от @coach (12.4)                  │
│ 12   │ 🔥 Popularity         │ business_post от @spa_center (11.8)         │
│ 13   │ 🔥 Popularity         │ discussion «Лучшие практики?» (10.5)        │
│ 14   │ 🔥 Popularity         │ user_post от @friend_olga (9.2)             │
│ 15   │ 📢 System Post        │ 💬 «Новая дискуссия в Meditation 🧘»        │
│ 16   │ 🔥 Popularity         │ community_post из «Бег» (8.0)               │
│ 17   │ 🔥 Popularity         │ user_post от @maria (7.3)                   │
│ 18   │ 🔥 Popularity         │ blog_post от @wellness_blog (6.1)           │
│ 19   │ 🔥 Popularity         │ business_post от @food_delivery (5.3)       │
│ 20   │ 🆕 New Content Slot   │ community_post из «Йога» (45 мин назад)     │
└──────┴───────────────────────┴──────────────────────────────────────────────┘
```

### 1.3. Таблица: 6 категорий контента и их особенности в Natural Feed

| # | Категория | `post_type` | Источник в Natural Feed | Как попадает в ленту | Особенности отображения |
|---|---|---|---|---|---|
| 1 | **Посты профилей** | `user_post` | Пользователь подписан на автора (`follows`) | По Popularity Score + New Content Slots | Стандартная карточка поста |
| 2 | **Бизнес-посты** | `business_post` | Пользователь подписан на бизнес-аккаунт | По Popularity Score + New Content Slots | Метка «Business» на карточке. **Anti-Flood Guard:** макс 3 подряд |
| 3 | **Блог-посты** | `blog_post` | Пользователь подписан на блогера | По Popularity Score + New Content Slots | Карточка с preview статьи (заголовок + первые 2 строки + обложка). **Системное уведомление** при публикации нового |
| 4 | **Посты сообществ** | `community_post` | Пользователь — участник сообщества (`community_members`) | По Popularity Score + New Content Slots | Карточка с меткой сообщества: «в {community_name}» |
| 5 | **Дискуссии** | `discussion` | Пользователь — участник сообщества, где создана дискуссия | По Popularity Score + New Content Slots | Карточка-вопрос (заголовок + кол-во ответов). **Системное уведомление** при создании и при > 10 комментов/24ч |
| 6 | **Системные посты** | `system_post` | Платформа генерирует на основе событий в подписках/сообществах | Вставляются каждые 15 постов (отдельные позиции) | Другой стиль карточки (без лайков/комментов, с кнопкой действия). Отключаемо в Settings |

### 1.4. Типы системных постов — полная таблица

| # | Событие | Текст (EN) | Текст (RU) | Ключ перевода | Когда генерируется | Действие по нажатию |
|---|---|---|---|---|---|---|
| 1 | **Новая дискуссия в сообществе** | 💬 New discussion in {community}: "{title}" | 💬 Новая дискуссия в {community}: «{title}» | `system_new_discussion` | Кто-то создал дискуссию в сообществе пользователя | Открыть дискуссию |
| 2 | **Популярная дискуссия** | 🔥 Trending in {community}: "{title}" | 🔥 Популярно в {community}: «{title}» | `system_trending_discussion` | Дискуссия в сообществе набрала > 10 комментов за 24ч | Открыть дискуссию |
| 3 | **Друг вступил в сообщество** | 👋 Your friend @{username} joined {community} | 👋 Ваш друг @{username} присоединился к {community} | `system_friend_joined` | Друг (взаимная подписка) вступил в то же сообщество | Открыть сообщество |
| 4 | **Новая статья в блоге** | 📝 New article from @{username}: "{title}" | 📝 Новая статья от @{username}: «{title}» | `system_new_blog` | Блогер из подписок опубликовал блог-пост | Открыть статью |
| 5 | **Новое сообщество по теме** | 🌱 New community: "{name}" — {description} | 🌱 Новое сообщество: «{name}» — {description} | `system_new_community` | Создано сообщество, связанное с сообществами пользователя (по категории) | Открыть сообщество |

---

## 2. ПОЛНЫЙ АЛГОРИТМ: пошаговая сборка ленты (от запроса до экрана)

> **Это полный алгоритм, описанный как последовательность шагов.** Программист читает сверху вниз и реализует ровно то, что описано.

### Шаг 0. Входные данные

```
ВХОД:
  - current_user_id  — UUID текущего пользователя
  - page_size        — размер страницы (default: 20)
  - cursor           — курсор предыдущей страницы (nullable)
```

### Шаг 1. Определить ИСТОЧНИКИ контента

```
ПРАВИЛО: Пользователь видит контент ТОЛЬКО из своих явных подписок.
         Платформа НИЧЕГО за него не решает.

ИСТОЧНИКИ:
  A) follows         → SELECT following_id FROM follows WHERE follower_id = current_user_id
  B) communities     → SELECT community_id FROM community_members WHERE user_id = current_user_id
  C) friends (подмножество А) → mutual follows (используется для системных постов типа "друг вступил")

ИСКЛЮЧЕНИЯ (что НЕ показываем):
  - author_id = current_user_id            → свои посты НЕ показываются
  - author_id IN (user_blocks)             → заблокированные
  - post_id  IN (user_hidden_posts)        → скрытые
  - post_id  IN (user_not_interested)      → "не интересно"
  - author.status = 'restricted'           → ограниченные модерацией
  - post.status = 'deleted'                → удалённые
  - post.ai_moderation_status = 'auto_removed' → убранные AI-модерацией
  - post.created_at < NOW() - 14 days      → старше 14 дней
```

### Шаг 2. Получить ОСНОВНОЙ ПУЛЛ постов (по Popularity Score)

```
ЗАПРОС:
  SELECT * FROM posts
  WHERE (автор ∈ follows ИЛИ community ∈ communities)
    AND НЕ исключения из Шага 1
    AND visibility check (public / followers / community)
    AND language filter (по настройкам пользователя, НЕ по поведению)
  ORDER BY popularity_score DESC, created_at DESC
  LIMIT page_size × 2  -- берём с запасом для слотов

РЕЗУЛЬТАТ: массив popular_posts[]
```

### Шаг 3. Получить СВЕЖИЕ ПОСТЫ для New Content Slots

```
ЗАПРОС:
  SELECT * FROM posts
  WHERE (автор ∈ follows ИЛИ community ∈ communities)
    AND НЕ исключения из Шага 1
    AND created_at > NOW() - INTERVAL '2 hours'
    AND post_id NOT IN (popular_posts[].id)  -- дедупликация
  ORDER BY created_at DESC
  LIMIT 10  -- максимум 10 свежих слотов на страницу

РЕЗУЛЬТАТ: массив fresh_posts[]
```

### Шаг 4. Получить СИСТЕМНЫЕ ПОСТЫ

```
ЗАПРОС:
  SELECT * FROM system_posts
  WHERE (target_community ∈ communities ИЛИ target_user ∈ follows)
    AND NOT is_dismissed(current_user_id, system_post_id)
    AND created_at > NOW() - INTERVAL '7 days'
  ORDER BY created_at DESC
  LIMIT 5

РЕЗУЛЬТАТ: массив system_posts[]
```

### Шаг 5. СОБРАТЬ ИТОГОВУЮ ЛЕНТУ (merge)

```
АЛГОРИТМ СБОРКИ:

  final_feed = []
  seen_ids = Set()            // для дедупликации
  popular_idx = 0             // указатель на popular_posts
  fresh_idx = 0               // указатель на fresh_posts
  system_idx = 0              // указатель на system_posts
  position = 1                // номер позиции в ленте
  consecutive_business = 0    // счётчик бизнес-постов подряд
  posts_since_last_system = 0 // счётчик постов после последнего system_post

  ПОКА final_feed.length < page_size И (есть посты в любом из массивов):

    // --- ПРАВИЛО 1: Каждая 10-я позиция = New Content Slot ---
    ЕСЛИ position % 10 == 0 И fresh_idx < fresh_posts.length:
      post = fresh_posts[fresh_idx]
      ЕСЛИ post.id НЕ В seen_ids:
        Добавить post в final_feed с slot = "new_content"
        seen_ids.add(post.id)
        fresh_idx++
        position++
        consecutive_business = 0
        posts_since_last_system++
        ПРОДОЛЖИТЬ

    // --- ПРАВИЛО 2: Каждые 15 постов = System Post ---
    ЕСЛИ posts_since_last_system >= 15 И system_idx < system_posts.length:
      sys = system_posts[system_idx]
      Добавить sys в final_feed с slot = "system"
      system_idx++
      posts_since_last_system = 0
      position++
      ПРОДОЛЖИТЬ

    // --- ПРАВИЛО 3: Основной слот — по Popularity Score ---
    ЕСЛИ popular_idx < popular_posts.length:
      post = popular_posts[popular_idx]
      popular_idx++

      // Дедупликация
      ЕСЛИ post.id В seen_ids:
        ПРОДОЛЖИТЬ (пропустить)

      // Anti-Flood Guard: макс 3 бизнес-поста подряд
      ЕСЛИ post.type == 'business_post':
        ЕСЛИ consecutive_business >= 3:
          // Отложить этот пост, взять следующий не-бизнес
          deferred_business.push(post)
          ПРОДОЛЖИТЬ
        ИНАЧЕ:
          consecutive_business++
      ИНАЧЕ:
        consecutive_business = 0
        // Если есть отложенные бизнес-посты → вставить один после не-бизнеса
        ЕСЛИ deferred_business.length > 0:
          Добавить deferred_business.shift() в final_feed
          seen_ids.add(...)

      Добавить post в final_feed с slot = "popularity"
      seen_ids.add(post.id)
      position++
      posts_since_last_system++

  ВЕРНУТЬ final_feed
```

### Шаг 6. СФОРМИРОВАТЬ ОТВЕТ API

```
ОТВЕТ:
{
  "mode": "natural",
  "page_size": 20,
  "has_more": popular_idx < popular_posts.length,
  "next_cursor": "score:{last_post.popularity_score},id:{last_post.id}",
  "end_of_feed": !has_more,
  "posts": final_feed[]
}

Каждый пост в final_feed содержит:
  - id, type, slot ("popularity" | "new_content" | "system")
  - author {id, username, avatar_url, is_business}
  - content, media[], created_at
  - popularity_score
  - engagement {likes, comments, saves, shares}
  - community {id, name} — если community_post/discussion
  - action_url — для system_post
```

### Визуальная блок-схема алгоритма

```
┌─────────────────────────────────────────────┐
│           ЗАПРОС: GET /api/feed?mode=natural │
└────────────────────┬────────────────────────┘
                     │
         ┌───────────▼───────────┐
         │ Шаг 1: Определить     │
         │ источники (follows,   │
         │ communities, friends) │
         │ + исключения          │
         └───────────┬───────────┘
                     │
    ┌────────────────┼────────────────┐
    ▼                ▼                ▼
┌────────┐    ┌──────────┐    ┌───────────┐
│ Шаг 2: │    │ Шаг 3:   │    │ Шаг 4:    │
│Popular │    │Fresh     │    │System     │
│Posts   │    │Posts     │    │Posts      │
│(Score) │    │(< 2ч)   │    │(события)  │
└───┬────┘    └────┬─────┘    └─────┬─────┘
    │              │                │
    └──────────────┼────────────────┘
                   │
         ┌─────────▼─────────┐
         │ Шаг 5: MERGE      │
         │                   │
         │ Позиции 1–9:      │
         │   🔥 Popularity    │
         │ Позиция 10:       │
         │   🆕 New Content   │
         │ Позиции 11–24:    │
         │   🔥 Popularity    │
         │ Позиция ~25:      │
         │   📢 System Post   │
         │ Позиции 26–29:    │
         │   🔥 Popularity    │
         │ Позиция 30:       │
         │   🆕 New Content   │
         │ ...               │
         │                   │
         │ + Anti-Flood Guard│
         │ + Дедупликация    │
         └─────────┬─────────┘
                   │
         ┌─────────▼─────────┐
         │ Шаг 6: JSON ответ │
         └───────────────────┘
```

---

## 3. Формула Popularity Score — подробное описание

### 3.1. Что такое Popularity Score

Popularity Score — это **системная метрика**, одинаковая для ВСЕХ пользователей. Она определяется **engagement** поста (лайки, комментарии, сохранения, репосты) и **свежестью**. Это **не профилирование** — формула не зависит от поведения конкретного пользователя.

### 3.2. Формула (полная)

```
Popularity Score = engagementRate × timeDecay

Где:
  engagementScore = likes × 1.0 + comments × 2.0 + saves × 3.0 + shares × 2.5
  engagementRate  = engagementScore / √(author_followers_count)
  timeDecay       = e^(-0.693 × hours_since_publication / 24)
```

### 3.3. TypeScript-код для разработчика

```typescript
function calcPopularityScore(post: Post): number {
  // 1. Базовый engagement
  const engagementScore =
    post.likes_count    * 1.0 +     // Лайк — базовая единица
    post.comments_count * 2.0 +     // Комментарий ценнее лайка (вовлечённость)
    post.saves_count    * 3.0 +     // Сохранение — самая ценная реакция
    post.shares_count   * 2.5;      // Репост — высокая ценность

  // 2. Нормализация по подписчикам автора
  const authorFollowers = Math.max(post.author.followers_count, 1);
  const engagementRate = engagementScore / Math.sqrt(authorFollowers);

  // 3. Time Decay — свежесть (24-часовой полураспад)
  const hoursAgo = (Date.now() - post.created_at.getTime()) / (1000 * 60 * 60);
  const timeDecay = Math.exp(-0.693 * hoursAgo / 24);
  // 0ч → 1.0, 24ч → 0.5, 48ч → 0.25, 72ч → 0.125

  // 4. Итоговый Score
  return engagementRate * timeDecay;
}
```

### 3.4. Таблица весов engagement

| Действие | Вес | Почему |
|---|---|---|
| 👍 Лайк | **1.0** | Базовая единица — самое простое действие |
| 💬 Комментарий | **2.0** | Требует усилий — пользователь вовлечён |
| 🔄 Репост / Поделиться | **2.5** | Пользователь рекомендует другим |
| 🔖 Сохранение | **3.0** | Самое ценное — пользователь хочет вернуться |

### 3.5. Нормализация — зачем делим на √(followers)

> **Проблема:** Без нормализации аккаунт с 10 000 подписчиков (100 лайков) всегда выше аккаунта с 50 подписчиков (30 лайков). Но 30/50 = 60% вовлечённости vs 100/10000 = 1%.

| Подписчики | Лайки | Raw Score | √followers | Rate |
|---|---|---|---|---|
| 50 | 30 | 30 | 7.07 | **4.24** |
| 500 | 100 | 100 | 22.36 | **4.47** |
| 10 000 | 100 | 100 | 100 | **1.00** |
| 10 000 | 500 | 500 | 100 | **5.00** |

Квадратный корень — компромисс: маленькие аккаунты получают шанс, но крупные не обнуляются.

### 3.6. Time Decay — затухание со временем

| Возраст поста | Time Decay | Эффект |
|---|---|---|
| 0 часов | 1.00 | Полный Score |
| 6 часов | 0.84 | Почти полный |
| 12 часов | 0.71 | –29% |
| 24 часа | 0.50 | **Половина** |
| 48 часов | 0.25 | Четверть |
| 72 часа | 0.125 | Почти не видно |

### 3.7. Защита от накрутки

| Правило | Описание |
|---|---|
| Только уникальные пользователи | Повторные лайки/комменты от одного пользователя не считаются |
| Аккаунты < 24 часов | Лайки от свежезарегистрированных аккаунтов **НЕ** считаются |
| Лимит по IP | Более 50 лайков от одного IP за час → все обнуляются |
| Самолайки | Автор не может лайкнуть свой пост (или лайк не влияет на Score) |

### 3.8. Пересчёт Popularity Score

| Параметр | Значение |
|---|---|
| **Когда пересчитывать** | При каждом новом лайке/комменте/сохранении (инкрементально) |
| **Полный пересчёт** | Каждые 15 минут (cron job) для учёта time decay |
| **Хранение** | Колонка `popularity_score NUMERIC` в таблице `posts` |
| **Индекс** | `CREATE INDEX idx_posts_popularity ON posts (popularity_score DESC)` |

---

## 4. Профильные данные пользователя — что можно и что нельзя использовать

### 4.1. Если пользователь заполнил в профиле пол, возраст, категории интересов — что с этим делать?

> **КЛЮЧЕВОЙ ПРИНЦИП:** В Natural Feed **нельзя** использовать личные данные для **ранжирования** (это было бы профилирование). Но **можно** использовать для **фильтрации** — если это **явная настройка** пользователя, а не скрытый анализ.

| Данные профиля | Использование в Natural Feed | Использование в Smart Feed | Юридическое обоснование |
|---|---|---|---|
| **Пол** (gender) | ❌ **НЕ используется для ранжирования**. ✅ Используется только для авторской видимости (`visibility = 'women_only'`) — это решение **автора**, не платформы | ✅ Учитывается в W1 (Interests) | GDPR Art. 4(4): фильтрация по полу = профилирование |
| **Возраст** (age_bracket) | ❌ **НЕ используется для ранжирования** | ✅ Может учитываться в v2.0 | GDPR Art. 4(4) |
| **Категории интересов** (из профиля) | ❌ **НЕ используется для ранжирования**. ✅ Может использоваться как **фильтр** в Settings → «Show only posts from my interest categories» — но это ЯВНАЯ настройка, не автоматика | ✅ Учитывается в W1 (Interests) | Пользовательская настройка ≠ профилирование |
| **Язык** | ✅ **Фильтр** по настройкам (Settings → Content languages) — НЕ профилирование | ✅ Учитывается в W7 (LanguageMatch) | DSA Art. 27 разрешает настройки |
| **Подписки** (follows) | ✅ **Основной источник** контента — пользователь сам подписался | ✅ Учитывается в W2 (SocialGraph) | Explicit consent |
| **Сообщества** (communities) | ✅ **Основной источник** контента — пользователь сам вступил | ✅ Учитывается в W6 (CommunityMatch) | Explicit consent |

### 4.2. Опциональный фильтр по категориям интересов (v1.5)

> **Идея:** Если пользователь выбрал в профиле категории интересов (Yoga, Nutrition, Meditation), можно предложить ему **опциональный фильтр** в Natural Feed. Это **НЕ профилирование**, потому что:
> - Пользователь сам включает/выключает фильтр
> - По умолчанию фильтр **ВЫКЛЮЧЕН** (показываем всё)
> - Это аналог выбора раздела в газете, а не персональной рекомендации

| Настройка | Где | По умолчанию | Что делает |
|---|---|---|---|
| **Filter by my interests** | Settings → Feed & Content | ❌ OFF | Когда ON — в Natural Feed показываются только посты, теги которых совпадают с категориями интересов из профиля |
| Категории интересов | Profile → Edit → Interests | Не выбрано | Пользователь сам выбирает: Yoga, Fitness, Nutrition, Meditation, и т.д. |

**Юридическое обоснование:**
- Фильтр **явный** (пользователь сам включает) → не профилирование
- Фильтр **по настройкам** (не по поведению) → DSA Art. 27 допускает
- По умолчанию **ВЫКЛЮЧЕН** → платформа не решает за пользователя
- Аналог: фильтр по языку — тоже настройка пользователя, не профилирование

### 4.3. Гендерный фильтр — почему нельзя

| | Natural Feed 🍃 | Smart Feed ✨ |
|---|---|---|
| **Фильтрация по полу** | ❌ ЗАПРЕЩЕНО | ✅ Допустимо (W1) |
| **Почему** | Фильтрация по полу = оценка личных характеристик = профилирование (GDPR Art. 4(4)) | Smart Feed = персонализированная лента, профилирование разрешено |
| **Исключение** | Автор поста может установить `visibility = 'women_only'` — это его право | — |

### 4.4. Anti-Flood Guard для бизнес-контента

| Правило | Описание |
|---|---|
| **Макс 3 бизнес-поста подряд** | Если после ранжирования идут 4+ бизнес-поста подряд → 4-й и далее сдвигаются за следующий не-бизнес пост |
| **Не ранжирование** | Одинаковое правило для ВСЕХ пользователей |
| **Закон** | DSA Art. 14 — защита от спама |

**Пример:**

```
По популярности:                С Anti-Flood Guard:
1. 🏢 Бизнес (Score: 40)       1. 🏢 Бизнес (Score: 40)
2. 🏢 Бизнес (Score: 38)       2. 🏢 Бизнес (Score: 38)
3. 🏢 Бизнес (Score: 35)       3. 🏢 Бизнес (Score: 35)
4. 🏢 Бизнес (Score: 33) ←     4. 📝 Пост (Score: 30) ← поднят
5. 🏢 Бизнес (Score: 31) ←     5. 🏢 Бизнес (Score: 33) ← сдвинут
6. 📝 Пост (Score: 30)         6. 🏢 Бизнес (Score: 31) ← сдвинут
7. 📝 Пост (Score: 25)         7. 📝 Пост (Score: 25)
```

---

## 5. Разница с Smart Feed — итоговая сводная таблица

| Аспект | Smart Feed ✨ | Natural Feed 🍃 |
|---|---|---|
| **Порядок** | По персональному Score (формула W1–W12) | По **системной популярности** (одинаковая для всех) |
| **Область контента** | Вся платформа (Wide Reach) | **Только подписки + сообщества + друзья** |
| **Свои посты** | Могут показываться | ❌ **Не показываются** |
| **Кто решает что видеть** | Платформа (алгоритм подбирает) | **Пользователь** (сам подписался) |
| **Профилирование** | ✅ Да (интересы, поведение, пол) | ❌ Полностью отключено |
| **Персонализация** | ✅ Да | ❌ Нет (одинаковый Score для всех) |
| **AI / ML (в v2.0)** | ✅ Embeddings, cosine similarity | ❌ Никогда |
| **Пол (gender)** | ✅ Учитывается в W1 (Interests) | ❌ Не учитывается |
| **Возраст (age_bracket)** | ✅ Может учитываться | ❌ Не учитывается |
| **Категории интересов** | ✅ W1 (Interests) — автоматически | ❌ Не для ранжирования. ✅ Опционально — пользователь может включить фильтр |
| **Новые посты** | Буст через W4 (Freshness) + W12 (NewCreatorBoost) | ✅ **New Content Slots** — каждый 10-й слот гарантирован |
| **Diversity Slots** | ✅ Бизнес каждый 5-й, макс 3 подряд | ⚠️ **Anti-Flood Guard**: макс 3 бизнес-поста подряд |
| **Cold Start** | ✅ 4 фазы разогрева | ❌ Не нужен — показываем подписки |
| **Системные посты** | ❌ Нет | ✅ Уведомления о дискуссиях, блогах, сообществах |
| **Фильтры безопасности** | ✅ Заблокированные, удалённые, скрытые | ✅ Те же + свои посты отфильтрованы |
| **Кнопка «Не интересно»** | ✅ Влияет на Score + фильтр | ✅ Только фильтр (скрывает пост) |
| **Кнопка «Скрыть пост»** | ✅ Скрывает + влияет на Score | ✅ Скрывает (без Score) |
| **Язык** | Фильтруется по настройкам + поведению | ✅ Фильтруется по **настройкам** (НЕ по поведению) |
| **Закон** | DSA Art. 27 — основная лента | DSA Art. 27 — **обязательная** альтернатива |
| **Endpoint** | `GET /api/feed?mode=smart` | `GET /api/feed?mode=natural` |
| **Когда кончаются посты** | Маловероятно (Wide Reach) | Реально — см. [Раздел 7.6](#76-когда-контент-заканчивается) |

---

## 6. Юридическое обоснование

### 6.1. Почему Natural Feed обязательна

| Закон | Статья | Требование |
|---|---|---|
| **DSA** | Art. 27 | Платформы с рекомендательными системами **ОБЯЗАНЫ** предоставить хотя бы **одну альтернативу**, не основанную на профилировании |
| **EU AI Act** | Art. 50 | Пользователь должен знать, когда контент ранжируется AI. Natural Feed = режим **без AI** |
| **GDPR** | Art. 22 | Право не подчиняться автоматизированным решениям. Natural Feed = отключение персональной автоматизации |

### 6.2. Почему Popularity Score ≠ профилирование

| Аспект | Профилирование (запрещено в Natural Feed) | Popularity Score (✅ допустимо) |
|---|---|---|
| **Зависит от пользователя?** | ✅ Да — анализ поведения конкретного юзера | ❌ Нет — одинаковый Score для ВСЕХ |
| **Персонализирован?** | ✅ Каждый видит разный порядок | ❌ Все видят одинаковый Score (в пределах подписок) |
| **GDPR Art. 4(4)** | Подпадает под определение «профилирование» | Не подпадает — нет оценки личных аспектов |
| **Аналог** | YouTube: «рекомендуемое для вас» | Reddit: сортировка по upvotes (r/popular) |

### 6.3. Почему «только подписки» ≠ профилирование

> Пользователь **сам** подписался на аккаунты и вступил в сообщества. Это его **явное действие** (explicit consent), а не скрытый анализ поведения. Фильтрация по подпискам — это то же самое, что email inbox: вы видите письма только от тех, кому дали свой адрес.

### 6.4. Что НЕЛЬЗЯ и что МОЖНО в Natural Feed

| ❌ Запрещено | Почему |
|---|---|
| Показывать посты от тех, на кого пользователь НЕ подписан | Это «рекомендация» = профилирование |
| Учитывать интересы/поведение пользователя в Score | Это персонализация |
| Фильтровать по полу автоматически | Это профилирование (GDPR Art. 4(4)) |
| Менять Score в зависимости от того, КТО смотрит | Это персонализация |

| ✅ Допустимо (НЕ является профилированием) | Почему |
|---|---|
| Ранжировать по **системной популярности** (одинаковой для всех) | Не зависит от конкретного пользователя |
| Фильтровать по **подпискам** (явный выбор пользователя) | Explicit action, не анализ поведения |
| Фильтровать по **языку** (настройка пользователя) | Пользовательская настройка |
| Фильтровать по **категориям интересов** (если пользователь сам включил) | Явная настройка, по умолчанию OFF |
| **Anti-Flood Guard** (макс 3 бизнес-поста подряд) | Одинаковое правило для ВСЕХ |
| **New Content Slots** (каждый 10-й — свежий) | Одинаковое правило для ВСЕХ |

---

## 7. Техническая реализация (SQL, API, БД)

### 7.1. SQL-запрос: основной пулл (Popularity)

```sql
SELECT p.*,
       u.username AS author_username,
       u.avatar_url AS author_avatar,
       u.is_business AS author_is_business,
       p.popularity_score
FROM posts p
JOIN users u ON u.id = p.author_id
WHERE p.status = 'published'
  AND p.author_id != :current_user
  AND p.ai_moderation_status != 'auto_removed'
  AND p.author_id NOT IN (
    SELECT blocked_id FROM user_blocks WHERE user_id = :current_user
  )
  AND p.id NOT IN (
    SELECT post_id FROM user_hidden_posts WHERE user_id = :current_user
  )
  AND p.id NOT IN (
    SELECT post_id FROM user_not_interested WHERE user_id = :current_user
  )
  AND u.status != 'restricted'
  AND (
    p.author_id IN (
      SELECT following_id FROM follows WHERE follower_id = :current_user
    )
    OR p.community_id IN (
      SELECT community_id FROM community_members WHERE user_id = :current_user
    )
  )
  AND (
    p.visibility = 'public'
    OR (p.visibility = 'followers' AND p.author_id IN (
      SELECT following_id FROM follows WHERE follower_id = :current_user
    ))
    OR (p.visibility = 'community' AND p.community_id IN (
      SELECT community_id FROM community_members WHERE user_id = :current_user
    ))
  )
  AND (
    NOT EXISTS (SELECT 1 FROM user_content_languages WHERE user_id = :current_user)
    OR p.language IN (
      SELECT language FROM user_content_languages WHERE user_id = :current_user
    )
    OR p.language IS NULL
  )
  AND p.created_at > NOW() - INTERVAL '14 days'
ORDER BY p.popularity_score DESC, p.created_at DESC
LIMIT :page_size * 2;
```

### 7.2. SQL-запрос: свежие посты (New Content Slots)

```sql
SELECT p.*, u.username, u.avatar_url, u.is_business
FROM posts p
JOIN users u ON u.id = p.author_id
WHERE p.status = 'published'
  AND p.author_id != :current_user
  AND p.created_at > NOW() - INTERVAL '2 hours'
  AND p.id NOT IN (:already_shown_ids)
  -- ... (все те же фильтры безопасности)
ORDER BY p.created_at DESC
LIMIT 10;
```

### 7.3. Индексы для производительности

```sql
CREATE INDEX idx_posts_popularity ON posts (popularity_score DESC)
  WHERE status = 'published' AND ai_moderation_status != 'auto_removed';

CREATE INDEX idx_posts_fresh ON posts (created_at DESC)
  WHERE status = 'published' AND ai_moderation_status != 'auto_removed';

CREATE INDEX idx_follows_follower ON follows (follower_id, following_id);
CREATE INDEX idx_community_members_user ON community_members (user_id, community_id);
CREATE INDEX idx_user_blocks_user ON user_blocks (user_id, blocked_id);
CREATE INDEX idx_user_hidden_posts ON user_hidden_posts (user_id, post_id);
CREATE INDEX idx_user_not_interested ON user_not_interested (user_id, post_id);
```

### 7.4. Пагинация

| Параметр | Значение |
|---|---|
| **Размер страницы** | 20 постов (по умолчанию) |
| **Максимум на страницу** | 50 постов |
| **Тип пагинации** | Cursor-based (по `popularity_score` + `post_id`) |
| **Подгрузка** | Infinite scroll |

```
GET /api/feed?mode=natural&page_size=20
→ ответ: "next_cursor": "score:12.5,id:uuid-123"

GET /api/feed?mode=natural&page_size=20&cursor=score:12.5,id:uuid-123
→ посты с popularity_score < 12.5 (или = 12.5 и id < uuid-123)
```

### 7.5. API endpoint

**Запрос:**

```
GET /api/feed?mode=natural&page_size=20
GET /api/feed?mode=natural&page_size=20&cursor=score:12.5,id:uuid-123
```

**Ответ:**

```json
{
  "mode": "natural",
  "page_size": 20,
  "has_more": true,
  "next_cursor": "score:5.3,id:uuid-456",
  "end_of_feed": false,
  "posts": [
    {
      "id": "uuid-1",
      "type": "user_post",
      "slot": "popularity",
      "author": {
        "id": "uuid-author",
        "username": "anna",
        "avatar_url": "...",
        "is_business": false
      },
      "content": "Morning yoga session 🧘",
      "media": [],
      "created_at": "2026-03-30T10:30:00Z",
      "popularity_score": 45.2,
      "engagement": { "likes": 120, "comments": 34, "saves": 15, "shares": 8 },
      "community": null
    },
    {
      "id": "uuid-new-1",
      "type": "community_post",
      "slot": "new_content",
      "author": { "..." : "..." },
      "content": "Just started my meditation journey!",
      "created_at": "2026-03-30T12:45:00Z",
      "popularity_score": 0.5,
      "engagement": { "likes": 2, "comments": 0, "saves": 0, "shares": 0 },
      "community": { "id": "uuid-comm", "name": "Meditation 🧘" }
    },
    {
      "id": "system-1",
      "type": "system_post",
      "slot": "system",
      "content": "💬 New discussion in Meditation 🧘: \"How to stay focused?\"",
      "created_at": "2026-03-30T11:00:00Z",
      "action_url": "/communities/uuid-comm/discussions/uuid-disc"
    }
  ]
}
```

**Поле `slot` в ответе:**

| Значение | Описание |
|---|---|
| `"popularity"` | Основная лента — пост попал по Popularity Score |
| `"new_content"` | New Content Slot — свежий пост (< 2ч) для органического продвижения |
| `"system"` | Системное уведомление |

### 7.6. Когда контент заканчивается

```
Пользователь скроллит вниз
        │
        ▼
   [Есть ещё посты?] ── Да → Подгрузить следующую страницу
        │
       Нет
        │
        ▼
   Уровень 1: Карточка «You're all caught up!»
        │
        ▼
   Уровень 2: Предложить действие
        │
        ▼
   Уровень 3: Показать старые посты (опционально)
```

**Уровень 1 — «Всё просмотрено»:**

| Элемент | Текст (EN) | Текст (RU) | Ключ перевода |
|---|---|---|---|
| **Иконка** | ✅ | ✅ | — |
| **Заголовок** | You're all caught up! | Вы всё просмотрели! | `feed_end_title` |
| **Подзаголовок** | You've seen all top posts from your subscriptions. | Вы видели все лучшие посты от ваших подписок. | `feed_end_subtitle` |

**Уровень 2 — Действие:**

| # | Кнопка | Текст (EN) | Ключ перевода | Действие |
|---|---|---|---|---|
| 1 | **Переключить ленту** | Switch to Smart Feed ✨ | `feed_end_switch_smart` | Переключить на Smart Feed |
| 2 | **Подписаться** | Discover new accounts | `feed_end_discover` | Открыть Explore / Discovery |
| 3 | **Сообщества** | Join a community | `feed_end_join_community` | Открыть список сообществ |

> Если < 10 подписок → «Discover new accounts». Если ≥ 10 → «Switch to Smart Feed ✨».

**Уровень 3 — Старые посты (v1.5):** Продолжить по популярности дальше в прошлое, до 14 дней.

**Пустая лента (0 подписок):**

| Элемент | Текст (EN) | Текст (RU) | Ключ перевода |
|---|---|---|---|
| **Заголовок** | Your feed is empty | Ваша лента пуста | `feed_empty_title` |
| **Подзаголовок** | Follow accounts and join communities to see posts here. | Подпишитесь на аккаунты и вступите в сообщества, чтобы видеть посты здесь. | `feed_empty_subtitle` |
| **Кнопка 1** | Discover accounts | Найти аккаунты | `feed_empty_discover` |
| **Кнопка 2** | Browse communities | Просмотреть сообщества | `feed_empty_communities` |

### 7.7. Таблицы БД

**Колонка `popularity_score` в таблице `posts`:**

```sql
ALTER TABLE posts ADD COLUMN popularity_score NUMERIC DEFAULT 0;

CREATE OR REPLACE FUNCTION recalc_popularity_score(p_id UUID)
RETURNS VOID AS $$
DECLARE
  v_likes INT; v_comments INT; v_saves INT; v_shares INT;
  v_followers INT; v_hours NUMERIC;
  v_engagement NUMERIC; v_rate NUMERIC; v_decay NUMERIC;
BEGIN
  SELECT likes_count, comments_count, saves_count, shares_count,
         EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600.0
  INTO v_likes, v_comments, v_saves, v_shares, v_hours
  FROM posts WHERE id = p_id;

  SELECT GREATEST(followers_count, 1)
  INTO v_followers
  FROM users WHERE id = (SELECT author_id FROM posts WHERE id = p_id);

  v_engagement := v_likes * 1.0 + v_comments * 2.0 + v_saves * 3.0 + v_shares * 2.5;
  v_rate := v_engagement / SQRT(v_followers::NUMERIC);
  v_decay := EXP(-0.693 * v_hours / 24.0);

  UPDATE posts SET popularity_score = v_rate * v_decay WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;
```

**Таблица `user_seen_posts` (дедупликация):**

```sql
CREATE TABLE user_seen_posts (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  seen_at TIMESTAMPTZ DEFAULT NOW(),
  session_id UUID,
  PRIMARY KEY (user_id, post_id)
);
-- TTL: удалять записи старше 24 часов (cron) или Redis SET с TTL
```

**Другие таблицы:**
- `user_hidden_posts (user_id, post_id, created_at)` — скрытые посты
- `user_not_interested (user_id, post_id, created_at)` — «не интересно»
- `user_content_languages (user_id, language, created_at)` — выбранные языки

---

## 8. Чеклист для разработчика

### Backend — Popularity Score

- [ ] Колонка `popularity_score NUMERIC` добавлена в таблицу `posts`
- [ ] Функция `recalc_popularity_score()` создана
- [ ] Инкрементальный пересчёт при лайке/комменте/сохранении
- [ ] Cron job: полный пересчёт каждые 15 минут (для time decay)
- [ ] Защита от накрутки: уникальные юзеры, аккаунты > 24ч, лимит по IP
- [ ] Индекс `idx_posts_popularity` создан

### Backend — Алгоритм сборки ленты (Шаги 1–6)

- [ ] `GET /api/feed?mode=natural` — работает
- [ ] **Шаг 1:** Источники — подписки + сообщества + друзья (НЕ вся платформа)
- [ ] **Шаг 1:** Свои посты НЕ показываются (`author_id != current_user`)
- [ ] **Шаг 2:** Основной пулл по Popularity Score DESC
- [ ] **Шаг 3:** Свежие посты для New Content Slots (< 2ч)
- [ ] **Шаг 4:** Системные посты (new_discussion, trending, friend_joined, new_blog, new_community)
- [ ] **Шаг 5:** Merge — позиции 1–9 (popularity), 10 (new content), ~25 (system), ...
- [ ] **Шаг 5:** Anti-Flood Guard — макс 3 бизнес-поста подряд
- [ ] **Шаг 5:** Дедупликация — один пост = одно показание
- [ ] **Шаг 6:** JSON ответ с `slot` полем

### Backend — Фильтры

- [ ] Фильтр: удалённые посты
- [ ] Фильтр: `ai_moderation_status = 'auto_removed'`
- [ ] Фильтр: заблокированные пользователи
- [ ] Фильтр: скрытые посты (`user_hidden_posts`)
- [ ] Фильтр: «не интересно» (`user_not_interested`)
- [ ] Фильтр: restricted-аккаунты
- [ ] Фильтр: языковой — по настройкам пользователя
- [ ] Фильтр: посты не старше 14 дней
- [ ] Фильтр: видимость (public/followers/community)

### Backend — Пагинация

- [ ] Cursor-based пагинация по `popularity_score + post_id`
- [ ] `end_of_feed = true` когда посты закончились
- [ ] `end_of_feed_reason` возвращается корректно

### Frontend

- [ ] Переключатель «Smart Feed ✨» / «Natural Feed 🍃» работает
- [ ] Infinite scroll с подгрузкой
- [ ] New Content Slots визуально отличаются (badge 🆕 или метка «New»)
- [ ] Системные посты визуально отличаются (другой стиль карточки)
- [ ] Карточка «You're all caught up» при end-of-feed
- [ ] Пустая лента: «Your feed is empty» + кнопки Discover/Communities
- [ ] «Hide» / «Not interested» работает на каждом посте
- [ ] Anti-Flood Guard визуально корректен
- [ ] Бизнес-посты имеют метку «Business»
- [ ] Посты сообществ показывают название сообщества

### Таблицы БД

- [ ] `posts.popularity_score NUMERIC` — добавлена колонка
- [ ] `user_seen_posts` — для дедупликации
- [ ] `user_hidden_posts` — скрытые посты
- [ ] `user_not_interested` — «не интересно»
- [ ] `user_content_languages` — выбранные языки
- [ ] Все индексы созданы (7 штук)

---

> **Связанные документы:**
> - [SMART-FEED-TZ.md](SMART-FEED-TZ.md) — ТЗ Smart Feed (формула скоринга W1–W12, Cold Start, Diversity)
> - [FEED-UI.md](FEED-UI.md) — Интерфейс ленты, настройки, права пользователя
> - [AI-ALGORITHMS.md](AI-ALGORITHMS.md) — AI-системы BestMe (лента, поиск, модерация)
> - [COMPLIANCE.md](../COMPLIANCE.md) — Основной документ compliance
