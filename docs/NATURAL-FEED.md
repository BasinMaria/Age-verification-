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
9. [🟢 PHASE 1: App Entry & Zero-Second Load (Запуск приложения)](#9--phase-1-app-entry--zero-second-load-запуск-приложения)
10. [🟡 PHASE 2: Scrolling Engine (Логика скролла)](#10--phase-2-scrolling-engine-логика-скролла)
11. [🟠 PHASE 3: Impression Tracking & Feed Generation (Защита от дублей + Нагрузки)](#11--phase-3-impression-tracking--feed-generation-защита-от-дублей--нагрузки)
12. [🔴 PHASE 4: Content Fallback System (Резервный алгоритм)](#12--phase-4-content-fallback-system-резервный-алгоритм)
13. [🟣 PHASE 5: Anti-Fraud & Rate Limiting (Защита от накрутки)](#13--phase-5-anti-fraud--rate-limiting-защита-от-накрутки)
14. [📱 PHASE 6: Cold Start — Алгоритм для нового пользователя (без подписок и друзей)](#14--phase-6-cold-start--алгоритм-для-нового-пользователя-без-подписок-и-друзей)

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
| **Cold Start** | ✅ 4 фазы разогрева | ✅ **PHASE 6** — матрица 5×6 (Content Group × Category) с Base Weight. Переключается на подписки при ≥ 5 подписок. [→ Раздел 14](#14--phase-6-cold-start--алгоритм-для-нового-пользователя-без-подписок-и-друзей) |
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

### Frontend — PHASE 1 (Запуск приложения)

- [ ] Сценарий A: Фоновая предзагрузка ленты во время Onboarding
- [ ] Сценарий A: Медиа-кэш первых 3 постов при получении токена
- [ ] Сценарий B: Splash Screen + подъём кэша из SQLite/Room
- [ ] Сценарий B: Silent Fetch свежей порции параллельно с показом кэша
- [ ] Сценарий C: WorkManager (Android) / Background Tasks (iOS) раз в 4ч

### Frontend — PHASE 2 (Скролл)

- [ ] Prefetch trigger на 7-м посте (запрос следующих 10)
- [ ] Virtualized List (RecyclerView / LazyColumn / UICollectionView)
- [ ] Скролл вверх — только из RAM, без сетевых запросов
- [ ] Размонтирование постов за 20+ позиций от viewport

### Frontend — PHASE 3 (Отслеживание просмотров)

- [ ] Буфер просмотренных ID (>1 сек на экране)
- [ ] Отправка пачкой при 10 ID / сворачивании / переключении вкладки
- [ ] `offline_seen` в локальной БД при потере сети
- [ ] Блокировка запроса новой ленты до синхронизации `offline_seen`

### Таблицы БД

- [ ] `posts.popularity_score NUMERIC` — добавлена колонка
- [ ] `seen_posts` — таблица просмотров с TTL 14 дней (PHASE 3)
- [ ] `seen_posts` — композитный индекс `(user_id, post_id)` (PHASE 3)
- [ ] `seen_posts` — RLS `auth.uid() = user_id` (PHASE 5)
- [ ] `post_likes` — `UNIQUE(user_id, post_id)` (PHASE 5)
- [ ] `user_hidden_posts` — скрытые посты
- [ ] `user_not_interested` — «не интересно»
- [ ] `user_content_languages` — выбранные языки
- [ ] Все индексы созданы
- [ ] `pg_cron` для очистки `seen_posts` старше 14 дней (PHASE 3)

### Backend — PHASE 4 (Fallback)

- [ ] Time Expansion: 24ч → 3д → 7д → 14д
- [ ] Category Fallback: пустая категория → Глобальный Топ
- [ ] Strict Unique: даже при fallback — `seen_posts` абсолютен

### Backend — PHASE 5 (Anti-Fraud)

- [ ] RPC `batch_mark_seen` — SECURITY DEFINER
- [ ] Max Batch Size: 50 (обычный) / 100 (офлайн)
- [ ] Rate Limit: 60 просмотров / минуту
- [ ] RPC `like_post` — SECURITY DEFINER
- [ ] Like Rate Limit: 1 лайк / секунду → 429
- [ ] Прямые INSERT через REST API запрещены (RLS `WITH CHECK (false)`)

---

## 9. 🟢 PHASE 1: App Entry & Zero-Second Load (Запуск приложения)

**Цель:** Логика загрузки контента в зависимости от того, в какой раз пользователь открывает приложение. Цель — **0 секунд ожидания** при появлении первого поста на экране.

### 9.1. Сценарий A: Самый первый вход (Onboarding Background Fetch)

| Параметр | Описание |
|---|---|
| **Ситуация** | Пользователь только что зарегистрировался и видит экраны приветствия (Welcome Screens). Локальный кэш телефона абсолютно пуст. |
| **Действие (Клиент)** | Как только токен регистрации получен, приложение **в фоновом потоке** запрашивает у Supabase первую порцию ленты (10 постов по алгоритму «Холодного старта»). |
| **Медиа-кэш** | Приложение "втихую" скачивает JSON и медиафайлы (фото/видео, аватарки) **как минимум для первых 3-х постов** из полученного списка. |
| **Результат** | Когда пользователь нажимает финальную кнопку «Начать / Перейти в ленту», рендер 1-го поста происходит за **0 секунд** прямо из памяти телефона. |

**Диаграмма:**
```
Регистрация → Токен получен
      │
      ├─ [Frontend, фон] → запрос GET /feed?limit=10 (Cold Start)
      │       │
      │       └─ ответ → кэш JSON + скачать медиа первых 3 постов
      │
      └─ [Frontend, UI] → Welcome Screen 1 → 2 → 3 → «Начать»
                                                          │
                                                          └─ Показать пост из кэша → 0 сек
```

### 9.2. Сценарий B: Повторный вход (Local Cache First + Splash Screen Masking)

| Параметр | Описание |
|---|---|
| **Ситуация** | Пользователь ранее пользовался приложением, закрыл его и теперь открывает снова. |
| **Действие (Клиент)** | При нажатии на иконку приложения отображается **Splash Screen** (экран с логотипом). В эту же миллисекунду приложение поднимает из локальной БД (SQLite/Room) непросмотренный остаток ленты с прошлой сессии. |
| **Фоновый запрос (Silent Fetch)** | Параллельно клиент отправляет запрос в Supabase на новую свежую порцию постов. |
| **Результат** | Splash Screen плавно исчезает (максимум через **0.5–1 сек**), и юзер сразу видит локально сохраненный пост. Новые посты от Supabase тихо добавляются "вниз" ленты. |

**Диаграмма:**
```
Нажал иконку
      │
      ├─ [UI] → Splash Screen (логотип, 0.5–1 сек)
      │
      ├─ [Фон, локальная БД] → SELECT * FROM local_feed WHERE seen = 0
      │       └─ показать первый пост из кэша
      │
      └─ [Фон, сеть] → GET /feed?cursor=... (свежая порция)
              └─ ответ → добавить посты вниз ленты в фоне
```

### 9.3. Сценарий C: Фоновое обновление ОС (Background App Refresh)

| Параметр | Описание |
|---|---|
| **Ситуация** | Телефон заблокирован, приложение лежит в фоне. |
| **Действие** | Использовать нативные инструменты (**WorkManager** для Android / **Background Tasks** для iOS), чтобы раз в несколько часов приложение тихо просыпалось, запрашивало у Supabase свежую 10-шаговую порцию и сохраняло в локальный кэш. |
| **Результат** | При следующем открытии приложения свежие посты **уже в кэше** → мгновенный показ. |

**Ограничения:**
- iOS: Background App Refresh контролируется системой, нет гарантии срабатывания
- Android: WorkManager c `Constraints(requiresNetwork = true)`, `PeriodicWorkRequest` каждые 4 часа
- Обе платформы: расход батареи минимален (1 запрос = ~10 KB JSON + медиа первых 3 постов)

### 9.4. Сводная таблица сценариев запуска

| Сценарий | Кэш | Сеть | Время до первого поста | Источник данных |
|---|---|---|---|---|
| A. Первый вход | Пуст | ✅ | 0 сек (фоновая предзагрузка во время onboarding) | Supabase → RAM |
| B. Повторный вход | Есть | ✅ | 0 сек (локальная БД) | SQLite/Room → UI, потом Supabase дозагрузка |
| B. Повторный вход | Есть | ❌ | 0 сек (локальная БД) | SQLite/Room → UI (офлайн-режим) |
| C. Background refresh | Обновлён | ✅ | 0 сек (кэш уже свежий) | Локальный кэш |

---

## 10. 🟡 PHASE 2: Scrolling Engine (Логика скролла)

**Цель:** Как приложение подгружает контент, когда юзер уже внутри и листает ленту. Бесшовный, бесконечный скролл без задержек и подёргиваний.

### 10.1. Feed Pagination (Строгие порции)

| Правило | Описание |
|---|---|
| **Размер чанка** | Supabase отдает посты строго **порциями по 10 штук**, согласно нашему алгоритму чередования форматов и категорий (см. Секцию 2, Шаги 1–6). |
| **Запрет полной выгрузки** | Никакой выгрузки всей базы. Только cursor-based pagination. |
| **Формат ответа** | JSON массив из 10 объектов + `next_cursor` для следующей страницы. |

### 10.2. Prefetching Trigger (Невидимый порог)

| Правило | Описание |
|---|---|
| **Порог запроса** | Триггер фонового запроса следующей порции устанавливается на **7-м посте** текущего массива. |
| **Механизм** | Юзер смотрит пост №7 → приложение отправляет запрос в Supabase на посты №11–20. К моменту, когда юзер доскроллит до 10-го поста, новые посты **уже скачаны** и готовы к показу. |
| **Буфер** | Запас в 3 поста (7→10) дает ~6–15 сек на загрузку при средней скорости скролла. |

**Диаграмма:**
```
Пост 1  2  3  4  5  6  [7]  8  9  10  │  11  12  ...  20
                         │                │
                         └─ запрос ──────►│ Supabase
                            GET /feed      └─ ответ готов к показу
                            ?cursor=10
```

### 10.3. Virtualized List (Статичный DOM)

| Правило | Описание |
|---|---|
| **Скролл вверх** | Возврат назад (свайп вверх к предыдущим постам) использует **только оперативную память**. Запрещено отправлять сетевые запросы при скролле вверх. |
| **Ощущение** | Лента должна ощущаться **монолитной** — как одна бесконечная страница без стыков. |
| **Реализация** | `RecyclerView` (Android) / `LazyColumn` (Compose) / `UICollectionView` (iOS) с viewHolder recycling. В DOM одновременно не более 5–7 видимых элементов. |
| **Размонтирование** | Посты, удалённые из viewport на 20+ позиций, размонтируются из DOM, но их данные сохраняются в RAM-буфере для мгновенного восстановления при скролле вверх. |

---

## 11. 🟠 PHASE 3: Impression Tracking & Feed Generation (Защита от дублей + Нагрузки)

**Цель:** Как система отслеживает просмотренные посты (seen_posts), предотвращает дубли и оптимизирует нагрузки на БД.

### 11.1. Supabase Schema & Indexes (Структура БД)

| Элемент | Описание |
|---|---|
| **Таблица** | `seen_posts` (поля: `user_id UUID`, `post_id UUID`, `viewed_at TIMESTAMPTZ DEFAULT NOW()`) |
| **Композитный индекс** | `CREATE UNIQUE INDEX idx_seen_posts ON seen_posts(user_id, post_id)` — для сверхбыстрого поиска и защиты от дублей |
| **Очистка (TTL)** | Настроить `pg_cron` для удаления записей старше **14 дней**: `DELETE FROM seen_posts WHERE viewed_at < NOW() - INTERVAL '14 days'` |
| **Зачем TTL** | Предотвращает тормоза БД и позволяет повторно использовать контент, когда юзер его уже забыл |

```sql
-- Создание таблицы
CREATE TABLE seen_posts (
  user_id  UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id  UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- Индекс для TTL-запросов очистки
CREATE INDEX idx_seen_posts_viewed_at ON seen_posts(viewed_at);

-- RLS: юзер видит/пишет только свои записи
ALTER TABLE seen_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY seen_posts_user ON seen_posts
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- pg_cron: очистка каждый день в 4:00 UTC
SELECT cron.schedule('clean-seen-posts', '0 4 * * *',
  $$DELETE FROM seen_posts WHERE viewed_at < NOW() - INTERVAL '14 days'$$
);
```

### 11.2. Client-Side Batch Tracking (Сбор просмотров на клиенте)

| Правило | Описание |
|---|---|
| **Нет мгновенной отправки** | Клиент **НЕ** отправляет запрос на каждый просмотренный пост. |
| **Локальный буфер** | Клиент копит просмотренные ID (пост был на экране >1 сек) в локальный массив. |
| **Отправка «пачкой»** | Массив отправляется в Supabase пакетом при: а) пролистывании 10 постов, б) сворачивании приложения, в) переключении вкладки. |
| **RPC-функция** | `rpc('batch_mark_seen', { post_ids: [...] })` — одна функция записывает все ID за один вызов. |

```typescript
// Клиент: буфер просмотров
const seenBuffer: string[] = [];

function onPostVisible(postId: string, duration: number) {
  if (duration >= 1000 && !seenBuffer.includes(postId)) {
    seenBuffer.push(postId);
  }
  if (seenBuffer.length >= 10) {
    flushSeenBuffer();
  }
}

async function flushSeenBuffer() {
  if (seenBuffer.length === 0) return;
  const batch = [...seenBuffer];
  seenBuffer.length = 0;
  await supabase.rpc('batch_mark_seen', { post_ids: batch });
}

// Вызвать flushSeenBuffer() при:
// - AppState → background
// - Переключении вкладки
// - Каждые 10 накопленных ID
```

### 11.3. Offline Sync Strategy (Защита при потере сети)

| Шаг | Описание |
|---|---|
| **1. Нет сети** | Если пропал интернет и юзер листал локальный кэш, просмотренные ID сохраняются в **локальную таблицу** `offline_seen` (SQLite/Room). |
| **2. Сеть вернулась** | Клиент **блокирует** запрос новой ленты до тех пор, пока массив `offline_seen` не будет успешно отправлен и записан в Supabase. |
| **3. Порядок** | Сначала → `batch_mark_seen(offline_seen)` → подтверждение → очистить `offline_seen` → только потом → запрос новой ленты. |
| **Зачем** | Без этого юзер получит **дубли** — посты, которые он уже видел офлайн, снова появятся в ленте. |

### 11.4. Cursor Pagination (Генерация слотов «Новое»)

| Правило | Описание |
|---|---|
| **seen_posts игнорируется** | Для свежих постов (New Content Slots) таблица `seen_posts` **игнорируется полностью** (для экономии ресурсов сервера). |
| **Логика** | Используется **курсорная пагинация**. Сервер просто отдает новые посты, дата создания которых меньше таймстампа последнего увиденного нового поста. |
| **Курсор** | `WHERE created_at < :last_seen_new_timestamp ORDER BY created_at DESC LIMIT N` |

### 11.5. Database Exclusion (Генерация слотов «Популярное»)

| Правило | Описание |
|---|---|
| **seen_posts ОБЯЗАТЕЛЬНА** | Для поиска хитов (популярных постов) Supabase **обязана** отсекать то, что юзер уже видел. |
| **Оператор** | Использовать строго высокоскоростной оператор `NOT EXISTS`. Оператор `NOT IN` **запрещён** из-за нагрузки. |
| **TTL-окно** | Запрос проверяет историю просмотров только за период TTL (14 дней). |

```sql
-- ✅ ПРАВИЛЬНО: NOT EXISTS (быстро)
SELECT p.*
FROM posts p
WHERE p.popularity_score > 0
  AND NOT EXISTS (
    SELECT 1 FROM seen_posts sp
    WHERE sp.user_id = :uid
      AND sp.post_id = p.id
      AND sp.viewed_at > NOW() - INTERVAL '14 days'
  )
ORDER BY p.popularity_score DESC
LIMIT 10;

-- ❌ ЗАПРЕЩЕНО: NOT IN (медленно, жрёт память)
-- WHERE p.id NOT IN (SELECT post_id FROM seen_posts WHERE user_id = :uid)
```

### 11.6. Batch Deduplication (Защита от дублей внутри порции)

| Правило | Описание |
|---|---|
| **Уникальность ID** | При формировании ответа из 10 постов Supabase обязана проверять массив на **уникальность ID**. |
| **Конфликт «Популярное» vs «Новое»** | Один и тот же пост **не может** занимать слот «Популярное» и «Новое» одновременно. |
| **Приоритет** | Если ID совпадает — пост отдается как «Популярное», а для «Нового» из БД добирается следующий уникальный пост. |
| **Реализация** | В RPC-функции: собрать оба массива → `DISTINCT ON (post_id)` → при коллизии оставить в «Популярном». |

---

## 12. 🔴 PHASE 4: Content Fallback System (Резервный алгоритм)

**Цель:** Что делает Supabase, если подходящие посты в БД закончились. Система **никогда** не должна отдавать пустой ответ или ломать 10-шаговый цикл.

### 12.1. Time Expansion (Смещение времени)

| Шаг | Описание |
|---|---|
| **По умолчанию** | Алгоритм ищет контент за последние **24 часа**. |
| **Fallback** | Если запрос возвращает 0 результатов, Supabase динамически расширяет окно поиска: |
| **Шаг 1** | 24 часа → **3 дня** |
| **Шаг 2** | 3 дня → **7 дней** |
| **Шаг 3** | 7 дней → **14 дней** (максимум = TTL seen_posts) |

```sql
-- Пример реализации в RPC-функции
DO $$
DECLARE
  result_count INT := 0;
  time_window INTERVAL := '24 hours';
  windows INTERVAL[] := ARRAY['3 days', '7 days', '14 days'];
BEGIN
  -- Попытка с 24 часами
  SELECT COUNT(*) INTO result_count FROM posts p
    WHERE p.created_at > NOW() - time_window
      AND NOT EXISTS (SELECT 1 FROM seen_posts sp WHERE sp.user_id = uid AND sp.post_id = p.id);

  -- Расширение окна при 0 результатов
  IF result_count = 0 THEN
    FOREACH time_window IN ARRAY windows LOOP
      SELECT COUNT(*) INTO result_count FROM posts p
        WHERE p.created_at > NOW() - time_window
          AND NOT EXISTS (...);
      EXIT WHEN result_count > 0;
    END LOOP;
  END IF;
END $$;
```

### 12.2. Category Fallback (Пропуск пустых зон)

| Правило | Описание |
|---|---|
| **Ситуация** | В узкой категории (например, «Окружающая среда») физически нет постов даже за 14 дней. |
| **Действие** | Сервер **пропускает этот слот** и берет контент из категории №1 (Глобальный Топ — посты с наивысшим popularity_score). |
| **Цель** | Не отдавать клиенту «пустоту» и не ломать наш 10-шаговый цикл. |
| **Логика** | `IF category_posts = 0 THEN → SELECT FROM posts ORDER BY popularity_score DESC` |

### 12.3. Strict Unique Enforcement (Строгая уникальность)

| Правило | Описание |
|---|---|
| **Абсолютное правило** | `seen_posts` является **абсолютным**. Даже при расширении времени до 14 дней или смещении категорий, серверу **запрещено** отдавать просмотренный пост. |
| **Пока юзер не увидит всё** | Пост не возвращается, пока его запись не будет удалена TTL-очисткой (через 14 дней). |
| **Крайний случай** | Если после всех fallback'ов и за 14 дней не найдено ни одного непросмотренного поста → отдать End-of-Feed card (см. Секцию 7.6). |

### 12.4. Сводная таблица Fallback-стратегии

| Приоритет | Стратегия | Условие срабатывания | Действие |
|---|---|---|---|
| 1 | Стандартный запрос | Посты есть за 24ч | Отдать по popularity_score |
| 2 | Time Expansion → 3 дня | 0 постов за 24ч | Расширить окно до 3 дней |
| 3 | Time Expansion → 7 дней | 0 постов за 3 дня | Расширить окно до 7 дней |
| 4 | Time Expansion → 14 дней | 0 постов за 7 дней | Расширить окно до 14 дней |
| 5 | Category Fallback | 0 постов в целевой категории | Взять из Глобального Топа |
| 6 | End-of-Feed | Вообще нет непросмотренных постов | Показать End-of-Feed card |

---

## 13. 🟣 PHASE 5: Anti-Fraud & Rate Limiting (Защита от накрутки)

**Цель:** Исключить возможность искусственной накрутки просмотров, лайков и попадания в топ через подмену API-запросов.

### 13.1. Защита накрутки просмотров (View Fraud)

#### Action 1: Max Batch Size (Ограничение размера пакета)

| Правило | Описание |
|---|---|
| **Лимит** | Жесткий лимит на массив ID при отправке просмотров. |
| **Нормальный режим** | Максимум **50 постов** за один запрос. |
| **Офлайн-синхронизация** | Максимум **100 постов** за запрос (после появления из офлайна). |
| **Превышение** | Если клиент присылает больше — RPC-функция **отклоняет весь запрос** (Drop). |

```sql
-- Внутри RPC batch_mark_seen
IF array_length(post_ids, 1) > 50 THEN
  RAISE EXCEPTION 'Batch size exceeds limit (max 50)';
END IF;
```

#### Action 2: Physical Reality Check (Проверка физической реальности)

| Правило | Описание |
|---|---|
| **Логика** | Человек физически не может посмотреть 100 постов за 10 секунд. |
| **Rate Limit** | Один `user_id` может записать в `seen_posts` **не более 60 просмотров в минуту**. |
| **Превышение** | Всё, что выше — **игнорируется** (Spam Filter), без ошибки клиенту. |

```sql
-- Проверка внутри RPC-функции
DECLARE recent_count INT;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM seen_posts
  WHERE user_id = auth.uid()
    AND viewed_at > NOW() - INTERVAL '1 minute';

  IF recent_count + array_length(post_ids, 1) > 60 THEN
    -- Тихо обрезать до допустимого лимита
    post_ids := post_ids[1 : GREATEST(0, 60 - recent_count)];
  END IF;
END;
```

#### Action 3: Supabase RLS — Row Level Security

| Правило | Описание |
|---|---|
| **Жёсткое правило** | На таблице `seen_posts` — `CHECK (auth.uid() = user_id)`. |
| **Результат** | **Никто** не может отправить API-запрос на добавление просмотра от имени другого пользователя. |
| **Реализация** | RLS-политика (уже описана в Секции 11.1). |

### 13.2. Защита накрутки лайков/реакций (Engagement Fraud)

#### Action 1: Strict Idempotency (Строгая идемпотентность)

| Правило | Описание |
|---|---|
| **Уникальный индекс** | В таблице лайков (`post_likes`) **обязателен** уникальный композитный индекс `UNIQUE(user_id, post_id)`. |
| **Результат** | Даже если хакер отправит 1000 запросов на лайк одного поста за секунду, база данных запишет **только 1 лайк**, а остальные отбросит без ошибки. |
| **ON CONFLICT** | `INSERT INTO post_likes ... ON CONFLICT (user_id, post_id) DO NOTHING` |

```sql
CREATE TABLE post_likes (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Запись лайка (идемпотентная)
INSERT INTO post_likes (user_id, post_id)
VALUES (auth.uid(), :post_id)
ON CONFLICT (user_id, post_id) DO NOTHING;
```

#### Action 2: Like Rate Limit (Ограничение частоты лайков)

| Правило | Описание |
|---|---|
| **Лимит** | Не более **1 лайка в секунду** от одного юзера. |
| **Превышение** | Возвращать ошибку **429 (Too Many Requests)**. |
| **Цель** | Запретить «пулемётные» лайки от ботов и скриптов. |

```sql
-- Внутри RPC like_post
DECLARE last_like TIMESTAMPTZ;
BEGIN
  SELECT MAX(created_at) INTO last_like
  FROM post_likes
  WHERE user_id = auth.uid();

  IF last_like IS NOT NULL AND last_like > NOW() - INTERVAL '1 second' THEN
    RAISE EXCEPTION 'Too many requests' USING ERRCODE = '42901'; -- 429
  END IF;

  INSERT INTO post_likes (user_id, post_id)
  VALUES (auth.uid(), p_post_id)
  ON CONFLICT (user_id, post_id) DO NOTHING;
END;
```

### 13.3. Защита API (Endpoint Security)

#### Action 1: RPC Only (Только RPC-функции)

| Правило | Описание |
|---|---|
| **Запрет** | Для записи лайков и просмотров **отключить** стандартный REST API Supabase (запретить прямые INSERT). |
| **Метод** | RLS-политика: `FOR INSERT USING (false)` на таблицах `seen_posts` и `post_likes`. |
| **Результат** | Прямой `POST /rest/v1/seen_posts` → **403 Forbidden**. Только `POST /rest/v1/rpc/batch_mark_seen` работает. |

```sql
-- Запретить прямые INSERT через REST API
CREATE POLICY no_direct_insert_seen ON seen_posts
  FOR INSERT WITH CHECK (false);

-- Разрешить INSERT только из RPC-функций (SECURITY DEFINER)
-- RPC-функция batch_mark_seen должна быть SECURITY DEFINER
CREATE OR REPLACE FUNCTION batch_mark_seen(post_ids UUID[])
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER  -- выполняется с правами создателя, минуя RLS
AS $$ ... $$;
```

#### Action 2: Custom Functions (Кастомные функции)

| Правило | Описание |
|---|---|
| **Принцип** | Запись `seen_posts` и лайков должна идти **ТОЛЬКО** через защищенные PostgreSQL-функции (RPC). |
| **Внутри RPC** | Именно внутри этих RPC-функций проверяются лимиты (размер батча, частота запросов) **до того**, как данные попадут в таблицу. |
| **Цепочка** | Клиент → Supabase REST → RPC-функция → [проверка лимитов] → INSERT (или отказ). |

### 13.4. Сводная таблица Anti-Fraud защит

| Вектор атаки | Защита | Лимит | Действие при превышении |
|---|---|---|---|
| Массовая отправка seen_posts | Max Batch Size | 50 ID / запрос (100 при офлайн-синхронизации) | Drop всего запроса |
| Быстрая накрутка просмотров | Rate Limit views | 60 просмотров / минуту | Тихое игнорирование лишних |
| Просмотр от чужого имени | RLS `auth.uid() = user_id` | — | 403 Forbidden |
| Множественный лайк одного поста | UNIQUE(user_id, post_id) | 1 лайк на пост | ON CONFLICT DO NOTHING |
| «Пулемётные» лайки | Rate Limit likes | 1 лайк / секунду | 429 Too Many Requests |
| Прямой INSERT через REST | RPC Only + RLS `WITH CHECK (false)` | — | 403 Forbidden |
| Подмена user_id в RPC | `auth.uid()` внутри SECURITY DEFINER | — | Всегда берётся из JWT-токена |

---

## 14. 📱 PHASE 6: Cold Start — Алгоритм для нового пользователя (без подписок и друзей)

> **Ситуация:** Пользователь только что зарегистрировался. У него **нет подписок, нет друзей, нет сообществ**. Natural Feed (который показывает контент от подписок) для него **пуст**. Этот алгоритм определяет, **что именно показывать** такому пользователю, пока он не обзаведётся подписками.

---

### 14.1. Базовые элементы алгоритма

#### Content Groups (5 групп контента) — фиксированный порядок

| № | Content Group | Почему именно этот порядок |
|---|---|---|
| **1** | 📝 **Blog** (Блог-профили) | **The Hook.** Блогеры создают самый визуально привлекательный, качественный и профессиональный контент. Первое впечатление: «Вау, здесь красивый и полезный контент!» |
| **2** | 💬 **Discussion** (Дискуссии) | **The Engagement.** Показывает, что приложение «живое». Активные обсуждения и комментарии сразу вовлекают пользователя в сообщество и вызывают желание участвовать. |
| **3** | 👥 **Communities** (Сообщества) | **The Belonging.** Тематические хабы по интересам. Помогает новому пользователю найти «своё племя» и нишевые темы для подписки. |
| **4** | 👤 **Users** (Обычные пользователи) | **The Social Proof.** Контент обычных людей. Создаёт уютное ощущение, что платформа не только для инфлюенсеров, а для таких же, как и я. |
| **5** | 🏢 **Business** (Бизнес-профили) | **The Commercial Value.** Размещён последним **намеренно**. Коммерческий контент слишком рано = ощущение маркетплейса. Показываем только после того, как пользователь «подсел» на сообщество. |

#### Categories (6 категорий) — фиксированный порядок с базовыми весами

| № | Категория | Base Weight | Почему |
|---|---|---|---|
| **1** | 🥇 **Эстетика** — Personal Care & Beauty | +500 | Самый огромный и визуальный рынок в мире (> $1 трлн). До/После, обзоры косметики, рутина ухода → бешеный трафик. |
| **2** | 🥈 **Питание** — Healthy Eating & Nutrition | +400 | Едят все. Рецепты здоровых завтраков, витамины, советы нутрициологов → самый «сохраняемый» контент. |
| **3** | 🥉 **Спорт** — Physical Activity | +300 | Высокая визуальная привлекательность. Мотивация, красивые тела, подборки упражнений. Чуть уступает еде, т.к. требует реальных усилий. |
| **4** | 🧘‍♀️ **Ментальное здоровье** — Psychology & Wellness | +200 | Самый быстрорастущий сегмент. Посты психологов про отношения, стресс, выгорание → самые длинные дискуссии в комментариях. |
| **5** | ⏱ **Режим дня** — Daily Routine & Biohacking | +100 | Контент для «продвинутых» (гики продуктивности, бизнесмены). Аудитория меньше, но очень лояльная. |
| **6** | 🌱 **Окружающая среда** — Eco & Environment | 0 | Самая сложная для виральности тема. Люди поддерживают экологию на словах, но лайкают реже всего. |

#### Status — чередование

В каждом цикле из 6 постов статус **строго чередуется**: 🔥 Popular → 🆕 New → 🔥 Popular → 🆕 New → 🔥 Popular → 🆕 New.

---

### 14.2. Матрица постов — Полная таблица 5 циклов (30 постов)

> **Ключевое правило:** Каждый следующий цикл (loop) **сдвигает Content Groups на одну позицию вперёд**. Поскольку групп контента **5**, а категорий **6**, первый и последний пост каждого цикла — **один и тот же Content Group**, но из **разной категории** и с **разным статусом**.

#### 🔄 Loop 1 (Посты 1–6)

| № поста | Content Group | Status | Category |
|---|---|---|---|
| 1 | 📝 Blog | 🔥 Popular | 🥇 Эстетика |
| 2 | 💬 Discussion | 🆕 New | 🥈 Питание |
| 3 | 👥 Communities | 🔥 Popular | 🥉 Спорт |
| 4 | 👤 Users | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 5 | 🏢 Business | 🔥 Popular | ⏱ Режим дня |
| 6 | 📝 Blog | 🆕 New | 🌱 Окружающая среда |

#### 🔄 Loop 2 (Посты 7–12)

| № поста | Content Group | Status | Category |
|---|---|---|---|
| 7 | 💬 Discussion | 🔥 Popular | 🥇 Эстетика |
| 8 | 👥 Communities | 🆕 New | 🥈 Питание |
| 9 | 👤 Users | 🔥 Popular | 🥉 Спорт |
| 10 | 🏢 Business | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 11 | 📝 Blog | 🔥 Popular | ⏱ Режим дня |
| 12 | 💬 Discussion | 🆕 New | 🌱 Окружающая среда |

> **Обратите внимание на пост №11:** цикл Content Groups начался заново, но категория уже ⏱ Режим дня. На 1-м круге (пост №1) юзер видел популярного блогера про Эстетику. На 2-м круге (пост №11) юзер увидит популярного блогера про Режим дня.

#### 🔄 Loop 3 (Посты 13–18)

| № поста | Content Group | Status | Category |
|---|---|---|---|
| 13 | 👥 Communities | 🔥 Popular | 🥇 Эстетика |
| 14 | 👤 Users | 🆕 New | 🥈 Питание |
| 15 | 🏢 Business | 🔥 Popular | 🥉 Спорт |
| 16 | 📝 Blog | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 17 | 💬 Discussion | 🔥 Popular | ⏱ Режим дня |
| 18 | 👥 Communities | 🆕 New | 🌱 Окружающая среда |

#### 🔄 Loop 4 (Посты 19–24)

| № поста | Content Group | Status | Category |
|---|---|---|---|
| 19 | 👤 Users | 🔥 Popular | 🥇 Эстетика |
| 20 | 🏢 Business | 🆕 New | 🥈 Питание |
| 21 | 📝 Blog | 🔥 Popular | 🥉 Спорт |
| 22 | 💬 Discussion | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 23 | 👥 Communities | 🔥 Popular | ⏱ Режим дня |
| 24 | 👤 Users | 🆕 New | 🌱 Окружающая среда |

#### 🔄 Loop 5 (Посты 25–30)

| № поста | Content Group | Status | Category |
|---|---|---|---|
| 25 | 🏢 Business | 🔥 Popular | 🥇 Эстетика |
| 26 | 📝 Blog | 🆕 New | 🥈 Питание |
| 27 | 💬 Discussion | 🔥 Popular | 🥉 Спорт |
| 28 | 👥 Communities | 🆕 New | 🧘‍♀️ Ментальное здоровье |
| 29 | 👤 Users | 🔥 Popular | ⏱ Режим дня |
| 30 | 🏢 Business | 🆕 New | 🌱 Окружающая среда |

> **После Loop 5 (пост №30) цикл начинается заново как Loop 1** — тот же порядок Content Groups, что и в первом цикле, но все посты будут **другими** (дедупликация через `seen_posts`).

---

### 14.3. Формула сдвига (для разработчика)

```
Для поста на позиции N (начиная с 0):

content_group_index = N % 5
  Порядок: [Blog, Discussion, Communities, Users, Business]

category_index = N % 6
  Порядок: [Эстетика, Питание, Спорт, Ментальное здоровье, Режим дня, Окружающая среда]

status = (N % 2 == 0) ? "Popular" : "New"
```

> **Почему это работает:** Поскольку 5 (Content Groups) и 6 (Categories) — **взаимно простые числа** (НОД = 1), полный цикл всех уникальных комбинаций Content Group × Category составляет **5 × 6 = 30 позиций**. За 30 постов пользователь увидит **каждую возможную пару** Content Group + Category ровно один раз.

---

### 14.4. Base Weight — система базовых весов категорий (ТЗ разработчикам)

> **Цель:** Чтобы лента работала идеально даже в первый день запуска приложения, когда внутренних данных об активности нет.

#### Стартовые баллы категорий

```
Эстетика:             +500 баллов
Питание:              +400 баллов
Спорт:                +300 баллов
Ментальное здоровье:  +200 баллов
Режим дня:            +100 баллов
Окружающая среда:       0 баллов
```

#### Как это работает

| Этап | Логика |
|---|---|
| **Старт (первые дни)** | Каждое утро категории «просыпаются» не с нулём баллов, а с мировым приоритетом (Base Weight). Система по умолчанию показывает Эстетику, Питание, Спорт — мировой опыт доказывает, что это зацепит ~90% людей. |
| **Рост активности** | Внутренняя активность (создание постов, лайки, комменты, сообщества) **добавляет баллы** к категории сверх Base Weight. |
| **Органическое изменение** | Если пользователи Bestme начнут безумно активно обсуждать «Ментальное здоровье» (создавать сообщества, писать комменты), то эта категория за счёт **внутренних баллов активности** легко обгонит Эстетику и выйдет на 1-е место. |
| **Защита от пустоты** | Base Weight гарантирует, что даже если в категории мало постов, она не провалится в ноль и будет показывать хоть что-то. |

#### Формула приоритета категории

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

> **Важно:** Base Weight — это **не персонализация**. Одинаковые стартовые баллы для ВСЕХ пользователей. Это системная метрика, основанная на мировой статистике, а не на профиле конкретного пользователя. **DSA Art. 27 compliant** (не является профилированием).

---

### 14.5. Когда Cold Start заканчивается

| Условие | Действие |
|---|---|
| Пользователь подписался на **≥ 5 аккаунтов/сообществ** | Cold Start **выключается**. Лента переключается на **Natural Feed** (контент от подписок). |
| Пользователь подписался на **1–4 аккаунта** | **Гибридный режим:** 50% постов из подписок + 50% из Cold Start алгоритма. |
| Пользователь не подписался ни на кого | Cold Start **продолжает работать** бессрочно. |

---

### 14.6. Сводная таблица Cold Start vs Natural Feed vs Smart Feed

| Аспект | 📱 Cold Start | 🍃 Natural Feed | ✨ Smart Feed |
|---|---|---|---|
| **Когда** | Нет подписок (< 5) | Есть подписки (≥ 5) | Есть подписки (≥ 5) |
| **Источник контента** | Вся платформа (Global) | Подписки + Сообщества + Друзья | Вся платформа (Wide Reach) |
| **Порядок** | Матрица 5×6 (Content Group × Category) | По Popularity Score | По персональному Score (W1–W12) |
| **Профилирование** | ❌ Нет | ❌ Нет | ✅ Да |
| **Персонализация** | ❌ Нет (одинаково для всех новых) | ❌ Нет | ✅ Да |
| **Base Weight** | ✅ Используется | ❌ Не нужен | ❌ Не нужен |
| **Деление на категории** | ✅ 6 категорий с ротацией | ❌ Без деления | ✅ Через W1 (Interests) |
| **Закон (DSA)** | ✅ Не профилирование | ✅ Обязательная альтернатива | ✅ Основная лента |

---

### 14.7. Чеклист для разработчика (Cold Start)

- [ ] Создать массив Content Groups: `['blog', 'discussion', 'community', 'user', 'business']`
- [ ] Создать массив Categories: `['aesthetics', 'nutrition', 'sport', 'mental_health', 'daily_routine', 'environment']`
- [ ] Реализовать формулу сдвига: `content_group = N % 5`, `category = N % 6`, `status = N % 2`
- [ ] Прописать Base Weight для каждой категории (+500, +400, +300, +200, +100, 0)
- [ ] Реализовать `CategoryPriority = BaseWeight + InternalActivityScore`
- [ ] Рассчитывать `InternalActivityScore` раз в час (pg_cron / Edge Function)
- [ ] Переключать на Natural Feed при ≥ 5 подписок
- [ ] Гибридный режим при 1–4 подписках (50/50)
- [ ] Дедупликация через `seen_posts` (как в основном алгоритме)
- [ ] Fallback при пустой категории → подтянуть из категории №1 (Эстетика)

---

> **Связанные документы:**
> - [SMART-FEED-TZ.md](SMART-FEED-TZ.md) — ТЗ Smart Feed (формула скоринга W1–W12, Cold Start, Diversity)
> - [FEED-UI.md](FEED-UI.md) — Интерфейс ленты, настройки, права пользователя
> - [AI-ALGORITHMS.md](AI-ALGORITHMS.md) — AI-системы BestMe (лента, поиск, модерация)
> - [COMPLIANCE.md](../COMPLIANCE.md) — Основной документ compliance
