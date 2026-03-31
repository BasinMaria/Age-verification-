← Назад к [AI-ALGORITHMS.md](AI-ALGORITHMS.md) | [NATURAL-FEED.md](NATURAL-FEED.md) | [FEED-UI.md](FEED-UI.md) | [COMPLIANCE.md](../COMPLIANCE.md)

# 🛠 ТЗ: Smart Feed — Рекомендательная система BestMe

> **Цель:** Реализовать алгоритм ранжирования контента (Scoring System) для персонализированной ленты Smart Feed и ленты по популярности Natural Feed.
> Алгоритм ОБЯЗАН соответствовать требованиям **DSA Art. 27**, **EU AI Act**, **GDPR**.
>
> **MVP (v1.0–v1.5):** Rule-based scoring — взвешенная сумма сигналов с ручными весами. Обычный алгоритм, **не AI**.
> **v2.0:** Machine Learning — embeddings, cosine similarity, автоматическая подстройка весов. **Настоящий AI**.

---

## Оглавление

1. [Два режима ленты (API)](#1-два-режима-ленты-api)
   - [Rule-Based vs AI — что используется на каждой фазе](#️-rule-based-vs-ai--что-именно-используется-на-каждой-фазе)
2. [Smart Feed — Формула ранжирования](#2-smart-feed--формула-ранжирования)
3. [Все сигналы ранжирования (12 сигналов)](#3-все-сигналы-ранжирования)
4. [Детальное описание каждого сигнала](#4-детальное-описание-каждого-сигнала)
5. [Правила разнообразия (Diversity Slots)](#5-правила-разнообразия-diversity-slots)
6. [Буст нового контента (New Content Boost)](#6-буст-нового-контента-new-content-boost)
7. [Штрафные сигналы (Penalty)](#7-штрафные-сигналы-penalty)
8. [Cold Start — новые пользователи](#8-cold-start--новые-пользователи)
9. [Natural Feed 🍃 — Лента по популярности без профилирования](#9-natural-feed---лента-по-популярности-без-профилирования)
10. [ЖЁСТКИЕ ОГРАНИЧЕНИЯ (GDPR / AI Act)](#10-жёсткие-ограничения-gdpr--ai-act)
11. [Архитектура API](#11-архитектура-api)
12. [Таблицы БД](#12-таблицы-бд)
13. [Фазы реализации](#13-фазы-реализации)
14. [Чеклист](#14-чеклист)

---

## 1. Два режима ленты (API)

| Режим | Endpoint | Описание | Профилирование |
|---|---|---|---|
| **Smart Feed 🤖** | `GET /api/feed?mode=smart` | Персонализированная лента на основе скоринга | ✅ Да (ранжирование) |
| **Natural Feed 🍃** | `GET /api/feed?mode=natural` | Лента по системной популярности: `ORDER BY popularity_score DESC`. Только подписки/сообщества/друзья. Свои посты не показываются | ❌ Полностью отключено |

> **DSA Art. 27:** Оба режима **ОБЯЗАТЕЛЬНЫ**. Без Natural Feed = нарушение DSA.
> Пользователь переключает через UI-тогл вверху ленты: «Smart Feed ✨» / «Natural Feed 🍃»

### ⚠️ Rule-Based vs AI — что именно используется на каждой фазе

| Фаза | Подход | Что делает формула | AI / ML? |
|---|---|---|---|
| **MVP (v1.0)** | **Rule-based scoring** (взвешенная сумма) | Пересечение тегов, подписки, `likes/max_likes`, time decay — чистая арифметика | ❌ Нет. Обычный алгоритм с ручными весами |
| **v1.5** | Rule-based scoring + больше сигналов | Добавляются язык, сообщества, блоги — но логика та же | ❌ Нет |
| **v2.0** | **Machine Learning** | Embeddings (векторизация контента), cosine similarity, автоматическая подстройка весов | ✅ Настоящий AI |

> **Важно для разработчиков:** Формула `Final Score = W1×Interests + W2×SocialGraph + ...` — это **взвешенная сумма** (weighted sum). На этапе MVP это **не AI и не машинное обучение**. Это rule-based алгоритм, где:
> - Каждый сигнал (W1–W12) вычисляется **детерминированно** (if/else, пересечение множеств, деление)
> - Веса задаются **вручную** через конфиг
> - Результат **полностью предсказуем** — одинаковые входные данные всегда дают одинаковый Score
>
> **AI появляется только в v2.0**, когда:
> 1. Теги заменяются на **embeddings** (векторные представления от нейросети) — `cosineSimilarity(user.embedding, post.embedding)`
> 2. Веса **обучаются автоматически** на поведении пользователей (а не задаются вручную)
> 3. Система **предсказывает** вероятность взаимодействия, а не просто считает совпадения

---

## 2. Smart Feed — Формула ранжирования

### Итоговая формула (Rule-Based Scoring)

> **Тип:** Взвешенная сумма (weighted sum) — НЕ нейросеть. Работает как обычный алгоритм на всех фазах до v2.0.

```
Final Score = (
    W1  × Interests           // Интересы пользователя
  + W2  × SocialGraph          // Подписки и друзья
  + W3  × Popularity           // Популярность поста
  + W4  × Freshness            // Свежесть
  + W5  × ContentType          // Тип контента (разнообразие)
  + W6  × CommunityMatch       // Сообщества пользователя
  + W7  × LanguageMatch        // Язык контента
  + W8  × BlogSubscription     // Подписка на блог/бизнес
  + W9  × DiscussionActivity   // Активность в дискуссиях
  + W10 × DwellTime            // Время задержки внимания
  + W11 × FriendsOfFriends     // Друзья друзей
  + W12 × NewCreatorBoost      // Буст новых авторов
)
× QualityMultiplier            // Множитель качества (0.0–1.0)
× PenaltyMultiplier            // Штраф за жалобы/негатив (0.0–1.0)
```

### Матрица весов

| # | Сигнал | Переменная | Вес | Приоритет | Диапазон |
|---|---|---|---|---|---|
| W1 | Интересы пользователя | `Interests` | **0.20** | 🔴 Высокий | 0.0–1.0 |
| W2 | Социальный граф (подписки + друзья) | `SocialGraph` | **0.18** | 🔴 Высокий | 0.0 или 1.0 |
| W3 | Популярность поста | `Popularity` | **0.12** | 🟡 Средний | 0.0–1.0 |
| W4 | Свежесть (Time Decay) | `Freshness` | **0.10** | 🟡 Средний | 0.0–1.0 |
| W5 | Тип контента (разнообразие) | `ContentType` | **0.04** | 🟢 Низкий | 0.0–1.0 |
| W6 | Совпадение сообщества | `CommunityMatch` | **0.10** | 🟡 Средний | 0.0–1.0 |
| W7 | Язык контента | `LanguageMatch` | **0.06** | 🟡 Средний | 0.0 или 1.0 |
| W8 | Подписка на блог/бизнес | `BlogSubscription` | **0.08** | 🟡 Средний | 0.0 или 1.0 |
| W9 | Активность в дискуссиях | `DiscussionActivity` | **0.04** | 🟢 Низкий | 0.0–1.0 |
| W10 | Время задержки внимания (Dwell) | `DwellTime` | **0.04** | 🟢 Низкий | 0.0–1.0 |
| W11 | Друзья друзей | `FriendsOfFriends` | **0.02** | 🟢 Низкий | 0.0 или 0.5 |
| W12 | Буст новых авторов | `NewCreatorBoost` | **0.02** | 🟢 Низкий | 0.0–1.0 |
| — | **Итого** | — | **1.00** | — | — |

> Веса настраиваются через конфиг (env/DB), а НЕ захардкожены в коде. Это позволяет A/B-тестировать.

---

## 3. Все сигналы ранжирования

```
┌─────────────────────────────────────────────────────┐
│                  ПОЗИТИВНЫЕ СИГНАЛЫ                  │
├─────────────────────────────────────────────────────┤
│  W1  Interests        — категории wellness          │
│  W2  SocialGraph      — подписки + друзья           │
│  W3  Popularity       — лайки, комменты, сохранения │
│  W4  Freshness        — время публикации            │
│  W5  ContentType      — разнообразие типов          │
│  W6  CommunityMatch   — общие сообщества            │
│  W7  LanguageMatch    — совпадение языка            │
│  W8  BlogSubscription — подписка на блог/бизнес     │
│  W9  DiscussionAct.   — участие в дискуссиях        │
│  W10 DwellTime        — задержка внимания           │
│  W11 FriendsOfFriends — 2-й круг связей             │
│  W12 NewCreatorBoost  — бонус новым авторам         │
├─────────────────────────────────────────────────────┤
│               ШТРАФНЫЕ МНОЖИТЕЛИ                     │
├─────────────────────────────────────────────────────┤
│  QualityMultiplier    — от 1.0 (отлично) до 0.3     │
│  PenaltyMultiplier    — от 1.0 (чисто) до 0.0       │
└─────────────────────────────────────────────────────┘
```

---

## 4. Детальное описание каждого сигнала

### W1 — Интересы пользователя (0.20)

**Что это:** Близость между тегами/категориями поста и интересами пользователя (выбранные категории wellness при регистрации + взаимодействия).

**Источники данных:**
- Категории, выбранные при онбординге (Goals: yoga, meditation, nutrition, fitness и т.д.)
- Категории постов, которые пользователь лайкал, комментировал, сохранял за последние 30 дней
- Категории сообществ, в которых состоит

**Формула:**
```typescript
function calcInterests(user: User, post: Post): number {
  // ────────────────────────────────────────────────────
  // MVP (rule-based): Простое пересечение тегов.
  // Это НЕ AI — обычная операция над множествами.
  // ────────────────────────────────────────────────────
  const userTags = new Set([...user.selected_categories, ...user.interacted_categories]);
  const postTags = new Set(post.tags);
  const intersection = [...userTags].filter(t => postTags.has(t));
  return intersection.length / Math.max(postTags.size, 1); // 0.0–1.0

  // ────────────────────────────────────────────────────
  // v2.0 (AI/ML): Vector similarity — НАСТОЯЩИЙ AI.
  // Нейросеть создаёт embedding-векторы для пользователя и поста.
  // Cosine similarity находит семантическое сходство,
  // даже если теги разные (yoga ≈ morning-routine ≈ stretching).
  // ────────────────────────────────────────────────────
  // return cosineSimilarity(user.embedding, post.embedding);
}
```

**Пример:**
- Пользователь выбрал: `yoga`, `meditation`, `healthy-eating`
- Пост с тегами: `yoga`, `morning-routine` → Interests = 0.5 (1 из 2 совпало)
- Пост с тегами: `yoga`, `meditation` → Interests = 1.0 (2 из 2 совпало)

---

### W2 — Социальный граф (0.18)

**Что это:** Пост от аккаунта, на который пользователь подписан, или от друга.

**Формула:**
```typescript
function calcSocialGraph(user: User, post: Post): number {
  const isFollowing = user.following.includes(post.author_id);
  const isFriend = user.friends.includes(post.author_id);

  if (isFriend) return 1.0;      // Друг — максимальный приоритет
  if (isFollowing) return 0.8;    // Подписка — высокий приоритет
  return 0.0;                     // Незнакомый автор
}
```

**Примечание:** «Друг» = взаимная подписка (оба подписаны друг на друга).

---

### W3 — Популярность поста (0.12)

**Что это:** Нормализованное значение на основе engagement за последние 48 часов.

**Формула:**
```typescript
function calcPopularity(post: Post): number {
  // Суммируем взвешенные реакции за последние 48ч
  const rawScore =
    post.likes_48h * 1.0 +
    post.comments_48h * 2.0 +     // Коммент ценнее лайка
    post.saves_48h * 3.0 +        // Сохранение — самая ценная реакция
    post.shares_48h * 2.5;

  // Нормализация: делим на максимум в текущем batch + 1 (чтобы не /0)
  const maxInBatch = getMaxPopularityInBatch();
  return Math.min(rawScore / (maxInBatch + 1), 1.0);
}
```

**Защита от накрутки:**
- Считаются ТОЛЬКО уникальные пользователи
- Лайки с аккаунтов младше 24 часов НЕ считаются
- Более 50 лайков от одного IP за час → все обнуляются

---

### W4 — Свежесть / Time Decay (0.10)

**Что это:** Экспоненциальное затухание. Чем свежее пост, тем выше множитель.

**Формула:**
```typescript
function calcFreshness(post: Post): number {
  const hoursAgo = (Date.now() - post.created_at.getTime()) / (1000 * 60 * 60);
  const halfLife = 24; // Период полураспада = 24 часа

  // Экспоненциальное затухание
  return Math.exp(-0.693 * hoursAgo / halfLife);
  // 0 часов → 1.0
  // 24 часа → 0.5
  // 48 часов → 0.25
  // 72 часа → 0.125
  // 7 дней → ~0.006 (почти 0)
}
```

| Возраст поста | Freshness Score |
|---|---|
| Только что (0ч) | 1.000 |
| 6 часов | 0.841 |
| 12 часов | 0.707 |
| 24 часа | 0.500 |
| 48 часов | 0.250 |
| 72 часа | 0.125 |
| 7 дней | 0.006 |

---

### W5 — Тип контента / Разнообразие (0.04)

**Что это:** Пенализация однообразия. Если пользователь видел 8+ одинаковых типов контента подряд → слегка повышается вес других типов.

**Типы контента:**
- `photo` — фото-пост
- `text` — текстовый пост
- `blog` — блог-статья
- `discussion` — дискуссия
- `community_post` — пост в сообществе
- `business_post` — пост от бизнеса

**Формула:**
```typescript
function calcContentType(post: Post, recentFeed: Post[]): number {
  const lastN = recentFeed.slice(0, 8); // Последние 8 постов в ленте
  const sameTypeCount = lastN.filter(p => p.type === post.type).length;

  if (sameTypeCount <= 3) return 1.0;   // Нормально, нет штрафа
  if (sameTypeCount <= 5) return 0.7;   // Немного пенализировать
  if (sameTypeCount <= 7) return 0.4;   // Сильно пенализировать
  return 0.2;                            // Почти заблокировать этот тип
}
```

---

### W6 — Совпадение сообщества (0.10)

**Что это:** Пост из сообщества, в котором состоит пользователь, или из тематически близкого сообщества.

**Формула:**
```typescript
function calcCommunityMatch(user: User, post: Post): number {
  if (!post.community_id) return 0.0; // Пост не из сообщества

  // Пользователь — участник этого сообщества
  if (user.communities.includes(post.community_id)) return 1.0;

  // Сообщество имеет пересечение тегов с интересами пользователя
  const community = getCommunity(post.community_id);
  const tagOverlap = calcTagOverlap(user.selected_categories, community.tags);
  return tagOverlap * 0.5; // Максимум 0.5 для нечленов
}
```

---

### W7 — Язык контента (0.06)

**Что это:** Контент на языке пользователя получает приоритет.

**Формула:**
```typescript
function calcLanguageMatch(user: User, post: Post): number {
  const userLangs = user.content_languages; // ["en", "ru"] — выбраны в настройках

  if (userLangs.includes(post.language)) return 1.0; // Совпадение
  return 0.0; // Контент на неизвестном языке → минимальный вес
}
```

**Примечание:** Язык поста определяется автоматически (AI language detection) при публикации. Пользователь выбирает предпочтительные языки в Settings → Content Languages.

---

### W8 — Подписка на блог / бизнес-профиль (0.08)

**Что это:** Пользователь подписан на блог или бизнес-профиль автора.

**Формула:**
```typescript
function calcBlogSubscription(user: User, post: Post): number {
  const author = getUser(post.author_id);

  // Подписка на бизнес-профиль
  if (author.is_business && user.business_subscriptions.includes(author.id)) return 1.0;

  // Подписка на блог (автор ведёт блог)
  if (author.has_blog && user.blog_subscriptions.includes(author.id)) return 1.0;

  return 0.0;
}
```

---

### W9 — Активность в дискуссиях (0.04)

**Что это:** Если пользователь участвует в дискуссии (создал или комментировал), новые ответы/посты в этой дискуссии получают повышенный приоритет.

**Формула:**
```typescript
function calcDiscussionActivity(user: User, post: Post): number {
  if (!post.discussion_id) return 0.0;

  // Пользователь создал дискуссию
  if (post.discussion_id && user.created_discussions.includes(post.discussion_id))
    return 1.0;

  // Пользователь комментировал в дискуссии
  if (user.participated_discussions.includes(post.discussion_id))
    return 0.7;

  return 0.0;
}
```

---

### W10 — Время задержки внимания / Dwell Time (0.04)

**Что это:** Неявный сигнал. Если пользователь задерживается на постах определённого автора/темы (не пролистывает) → это implicit positive signal.

**Как собирается:**
- Frontend отправляет событие: `{ post_id, dwell_ms }` когда пост был ≥ 3 сек на экране
- Агрегируем: среднее dwell time по тегам и авторам за 7 дней

**Формула:**
```typescript
function calcDwellTime(user: User, post: Post): number {
  // Среднее время задержки на постах этого автора
  const avgDwellAuthor = user.dwell_stats.by_author[post.author_id] || 0;
  // Среднее время задержки на постах этой категории
  const avgDwellCategory = Math.max(
    ...post.tags.map(tag => user.dwell_stats.by_tag[tag] || 0)
  );

  const combined = (avgDwellAuthor + avgDwellCategory) / 2;
  // Нормализуем: 10+ секунд = 1.0
  return Math.min(combined / 10000, 1.0); // dwell_ms в миллисекундах
}
```

> ⚠️ **GDPR:** Dwell time — это **поведенческое профилирование**. Оно уже раскрыто в Privacy Policy как «your interactions». Данные хранятся **агрегированно** (по категориям), а НЕ поэкранно. Сырые dwell events удаляются через 7 дней.

---

### W11 — Друзья друзей (0.02)

**Что это:** Пост от человека, который является другом друга (2-й круг связей). Слабый сигнал для discovery.

**Формула:**
```typescript
function calcFriendsOfFriends(user: User, post: Post): number {
  // Уже друг или подписка → это W2, не W11
  if (user.friends.includes(post.author_id)) return 0.0;
  if (user.following.includes(post.author_id)) return 0.0;

  // Автор поста — друг кого-то из друзей пользователя
  const isFoF = user.friends.some(friendId => {
    const friend = getUser(friendId);
    return friend.friends.includes(post.author_id);
  });

  return isFoF ? 0.5 : 0.0;
}
```

> **Оптимизация:** Список friends-of-friends кэшируется и обновляется раз в 6 часов (фоновый job).

---

### W12 — Буст новых авторов (0.02)

**Что это:** Посты от новых авторов (аккаунт < 30 дней, < 100 подписчиков) получают временный бонус для discovery. Даёт шанс новым блогерам, сообществам, бизнесам быть увиденными.

**Формула:**
```typescript
function calcNewCreatorBoost(post: Post): number {
  const author = getUser(post.author_id);
  const accountAgeDays = (Date.now() - author.created_at.getTime()) / (1000*60*60*24);
  const followers = author.followers_count;

  // Аккаунт < 30 дней И < 100 подписчиков → бонус
  if (accountAgeDays < 30 && followers < 100) {
    // Линейное затухание: день 1 = 1.0, день 30 = 0.0
    return Math.max(0, 1.0 - (accountAgeDays / 30));
  }

  return 0.0;
}
```

| Возраст аккаунта | Подписчиков | Boost |
|---|---|---|
| 1 день | < 100 | 0.97 |
| 7 дней | < 100 | 0.77 |
| 15 дней | < 100 | 0.50 |
| 30 дней | < 100 | 0.00 |
| Любой | ≥ 100 | 0.00 |

---

## 5. Правила разнообразия (Diversity Slots)

### Проблема
Без правил разнообразия лента может состоять из 20 постов друзей подряд, или 15 бизнес-постов. Это плохой UX.

### Решение: Slot-based mixing

После расчёта Final Score, алгоритм **перемешивает** результаты по правилам:

```
Позиция в ленте:
┌────────────────────────────────────────────────┐
│  Slot 1:  Лучший пост по Score (любой тип)     │
│  Slot 2:  Пост друга/подписки                  │
│  Slot 3:  Лучший пост по Score (любой тип)     │
│  Slot 4:  Пост из сообщества пользователя      │
│  Slot 5:  🏢 Бизнес-пост (каждый 5-й)         │
│  Slot 6:  Лучший пост по Score (любой тип)     │
│  Slot 7:  Блог-статья / дискуссия              │
│  Slot 8:  Пост друга/подписки                  │
│  Slot 9:  Лучший пост по Score (любой тип)     │
│  Slot 10: 🆕 Новый контент (NewCreatorBoost)   │
│  Slot 11: Лучший пост по Score (любой тип)     │
│  ...повтор паттерна...                         │
└────────────────────────────────────────────────┘
```

### Правила Slot-mixing

| Правило | Описание | Частота |
|---|---|---|
| **Бизнес-посты** | Каждый 5-й слот — пост от бизнес-профиля (если есть) | 1 из 5 (20%) |
| **Контент друзей** | Каждый 3-й или 4-й слот — пост друга/подписки | 1 из 3–4 (25-33%) |
| **Сообщества** | Каждый 4-й слот — пост из сообщества пользователя | 1 из 4 (25%) |
| **Блоги/дискуссии** | Каждый 7-й слот — блог-статья или дискуссия | 1 из 7 (14%) |
| **Новые авторы** | Каждый 10-й слот — пост от нового автора (< 30 дней) | 1 из 10 (10%) |
| **Запрет подряд** | Не более 3 постов одного типа подряд | Жёсткое ограничение |
| **Запрет автор** | Не более 2 постов от одного автора на экран (20 постов) | Жёсткое ограничение |

### Алгоритм Slot-mixing (псевдокод)

```typescript
function buildFeed(scoredPosts: ScoredPost[], user: User): Post[] {
  const feed: Post[] = [];
  const pools = {
    business: scoredPosts.filter(p => p.author.is_business).sort(byScore),
    friends:  scoredPosts.filter(p => user.friends.includes(p.author_id)).sort(byScore),
    community: scoredPosts.filter(p => user.communities.includes(p.community_id)).sort(byScore),
    blogs:    scoredPosts.filter(p => p.type === 'blog' || p.type === 'discussion').sort(byScore),
    newCreators: scoredPosts.filter(p => isNewCreator(p.author)).sort(byScore),
    general:  scoredPosts.sort(byScore),
  };

  for (let slot = 1; slot <= PAGE_SIZE; slot++) {
    let post: Post | null = null;

    if (slot % 5 === 0)       post = pools.business.shift();
    else if (slot % 10 === 0) post = pools.newCreators.shift();
    else if (slot % 4 === 0)  post = pools.community.shift();
    else if (slot % 7 === 0)  post = pools.blogs.shift();
    else if (slot % 3 === 0)  post = pools.friends.shift();

    // Fallback на лучший по Score
    if (!post) post = pools.general.shift();
    if (!post) break;

    // Проверка: не более 3 подряд одного типа
    if (lastNSameType(feed, post.type, 3)) {
      // Вставить пост другого типа из general pool
      post = pools.general.find(p => p.type !== post!.type) || post;
    }

    feed.push(post);
    // Удалить из всех пулов
    removeFromAllPools(pools, post.id);
  }

  return feed;
}
```

---

## 6. Буст нового контента (New Content Boost)

### Проблема
Новый пост ещё не имеет лайков/комментариев → Popularity = 0. Без буста он утонет.

### Решение: Temporary Freshness Bonus

```typescript
function newContentBoost(post: Post): number {
  const minutesSincePublish = (Date.now() - post.created_at.getTime()) / (1000*60);

  // Первые 60 минут — усиленный буст
  if (minutesSincePublish < 60) {
    return 1.0; // Максимальный Freshness
  }

  // 1–6 часов — повышенный буст (пост прошёл модерацию, ещё набирает обороты)
  if (minutesSincePublish < 360) {
    return 0.8;
  }

  // Далее — стандартный Time Decay (W4)
  return calcFreshness(post);
}
```

### Дополнительные правила для нового контента

| Правило | Описание |
|---|---|
| **Первые 100 показов** | Пост гарантированно показывается минимум 100 уникальным пользователям (exploration phase) |
| **Прошёл модерацию** | Буст даётся ТОЛЬКО постам, прошедшим AI-модерацию (status = `approved`) |
| **A/B exploration** | 5% ленты — случайные НОВЫЕ посты для exploration (не зависят от Score) |

---

## 7. Штрафные сигналы (Penalty)

### QualityMultiplier — Качество контента

```typescript
function calcQualityMultiplier(post: Post): number {
  let quality = 1.0;

  // Автор верифицирован → бонус
  if (post.author.is_verified) quality *= 1.1;

  // Пост имеет изображения/медиа → бонус
  if (post.has_media) quality *= 1.05;

  // Пост очень короткий (< 20 символов) → штраф
  if (post.text_length < 20 && !post.has_media) quality *= 0.7;

  // Пост содержит ссылки (может быть спам) → лёгкий штраф
  if (post.external_links_count > 2) quality *= 0.8;

  return Math.min(quality, 1.2); // Максимум +20% бонус
}
```

### PenaltyMultiplier — Штрафы за жалобы и негатив

```typescript
function calcPenaltyMultiplier(post: Post): number {
  let penalty = 1.0;

  // Жалобы от пользователей
  const reportCount = post.report_count;
  if (reportCount >= 1) penalty *= 0.8;   // 1 жалоба → -20%
  if (reportCount >= 3) penalty *= 0.5;   // 3 жалобы → -50% (× 0.8 × 0.5 = 0.4)
  if (reportCount >= 5) penalty *= 0.2;   // 5+ жалоб → почти невидим (0.08)

  // AI-модерация: флаг "подозрительный"
  if (post.ai_moderation_status === 'flagged') penalty *= 0.3;

  // AI-модерация: определён негативный контент
  if (post.ai_sentiment === 'negative' && post.ai_sentiment_confidence > 0.8)
    penalty *= 0.6;

  // Автор заблокирован/ограничен → полный штраф
  if (post.author.status === 'restricted') penalty *= 0.1;

  // Минимум: даже при штрафе пост не исчезает полностью из ленты
  // (чтобы не было "shadow ban", что нарушает DSA)
  return Math.max(penalty, 0.05);
}
```

### Порядок отображения при штрафах

| Кол-во жалоб | Пенализация | Что видит пользователь |
|---|---|---|
| 0 | 1.0 (нет штрафа) | Нормальная позиция |
| 1–2 | 0.8 | Немного ниже в ленте |
| 3–4 | 0.4 | Значительно ниже |
| 5+ | 0.08 | Почти в самом конце |
| AI flagged | 0.3 (× penalty) | В самом конце + пометка для модератора |
| Auto-removed | 0.0 (скрыт) | Не показывается (ожидает модерации/апелляции) |

---

## 8. Cold Start — новые пользователи

### Проблема
У нового пользователя нет истории: нет подписок, нет лайков, нет dwell time. Как показать релевантную ленту?

### Стратегия: 4 фазы разогрева

```
Фаза 0: Регистрация        → Онбординг-данные
Фаза 1: 0–3 взаимодействия → Popularity-first + Onboarding
Фаза 2: 4–20 взаимодействий → Гибрид Popularity + Interests
Фаза 3: 21+ взаимодействий  → Полный Smart Feed
```

### Фаза 0 — Онбординг (при регистрации)

При регистрации пользователь выбирает:

| Данные | Как используем |
|---|---|
| **Категории wellness** (минимум 3) | → W1 Interests (начальные интересы) |
| **Языки контента** | → W7 LanguageMatch |
| **Страна** (GeoIP) | → Локальный контент получает +10% |

> Это даёт МИНИМАЛЬНЫЙ набор данных для ненулевой персонализации с первого же открытия ленты.

### Фаза 1 — Popularity-first (0–3 взаимодействия)

**Что показываем:**
1. **Топ-посты** в выбранных категориях (Interests + Popularity)
2. **Популярные посты** за последние 7 дней (Global Trending)
3. **Рекомендуемые сообщества** по выбранным категориям
4. **Популярные бизнес-профили** в выбранных категориях

**Формула (Cold Start):**
```
ColdStart Score = (0.35 × Interests) + (0.30 × GlobalPopularity) + (0.15 × Freshness) + (0.10 × LanguageMatch) + (0.10 × GeoRelevance)
```

> SocialGraph = 0 (нет подписок), DwellTime = 0 (нет истории), поэтому увеличиваем вес Popularity и Interests.

### Фаза 2 — Гибрид (4–20 взаимодействий)

Постепенно **увеличиваем** веса:
- W2 SocialGraph (если пользователь подписался на кого-то)
- W10 DwellTime (первые сигналы поведения)

Постепенно **уменьшаем**:
- GlobalPopularity (заменяется на персональную Popularity)

```typescript
function getWeightsForUser(user: User): Weights {
  const interactions = user.total_interactions; // лайки + комменты + сохранения

  if (interactions < 4) return COLD_START_WEIGHTS;
  if (interactions < 21) {
    // Линейная интерполяция между ColdStart и Full weights
    const t = (interactions - 4) / 17; // 0.0 → 1.0
    return interpolateWeights(COLD_START_WEIGHTS, FULL_WEIGHTS, t);
  }
  return FULL_WEIGHTS;
}
```

### Фаза 3 — Полный Smart Feed (21+ взаимодействий)

Используется полная формула из [Раздела 2](#2-smart-feed---формула-ранжирования).

### Карточки "помоги нам узнать тебя лучше"

В Cold Start фазах 0–1, в ленту вставляются **интерактивные карточки**:

| Карточка | Тип | Позиция |
|---|---|---|
| «Подпишись на 5 авторов» | Рекомендации блогеров в выбранных категориях | Slot 3 |
| «Вступи в сообщество» | Рекомендации сообществ по категориям | Slot 6 |
| «Тебе может понравиться» | 5 постов для лайка/пропуска (быстрый сбор Interests) | Slot 9 |

---

## 9. Natural Feed 🍃 — Лента по популярности без профилирования

### Принцип
**ПОЛНОСТЬЮ** отключён AI-скоринг. Никакого профилирования. Ранжирование по **системной популярности** (одинаковой для всех).

> **Полная спецификация Natural Feed:** [NATURAL-FEED.md](NATURAL-FEED.md) — алгоритм Popularity Score, 6 категорий контента, New Content Slots, дедупликация, системные посты.

### Ключевые отличия от Smart Feed

| Аспект | Smart Feed ✨ | Natural Feed 🍃 |
|---|---|---|
| **Ранжирование** | Персональный Score (W1–W12) | Системный Popularity Score (одинаковый для всех) |
| **Область контента** | Вся платформа | Только подписки + сообщества + друзья |
| **Свои посты** | Могут показываться | ❌ Не показываются |
| **Профилирование** | ✅ Да | ❌ Полностью отключено |
| **Новые посты** | Буст через W4 + W12 | New Content Slots (каждый 10-й слот) |

### Формула Popularity Score (кратко)

```
Popularity Score = (likes×1 + comments×2 + saves×3 + shares×2.5) / √followers × timeDecay
```

Подробнее: [NATURAL-FEED.md, Раздел 5](NATURAL-FEED.md#5-алгоритм-popularity-score).

### Что Natural Feed фильтрует

| Фильтр | Причина | Тип |
|---|---|---|
| **Свои посты** | Пользователь НЕ видит себя в ленте | Фильтр |
| **Удалённый контент** | Пост удалён автором или модератором | Фильтр (не показывать) |
| **Auto-removed AI** | Пост автоматически удалён AI-модерацией | Фильтр |
| **Заблокированные пользователи** | Пользователь заблокировал автора | Фильтр |
| **Приватность** | Пост visibility = `followers`, а пользователь не подписан | Фильтр |
| **Язык** | ✅ Фильтруется по настройкам пользователя (НЕ по поведению) | Фильтр |
| **Вне подписок** | Автор не в подписках и не в сообществах пользователя | Фильтр |
| **Интересы** | ❌ НЕ учитываются | — |

### Natural Feed — Что видит пользователь

```
┌──────────────────────────────────────────┐
│  [Smart Feed ✨]  [Natural Feed 🍃] ← АКТ│
├──────────────────────────────────────────┤
│  🔥 Популярный пост @anna (Score: 45)   │
│  🔥 Фото @yoga_master (Score: 38)       │
│  🔥 Дискуссия в Meditation (Score: 33)   │
│  ...                                      │
│  🆕 НОВЫЙ пост @friend (5 мин назад)    │ ← New Content Slot
│  🔥 Бизнес @spa_center (Score: 12)       │
│  ...по системной популярности...          │
└──────────────────────────────────────────┘
```

> **DSA Art. 27:** Natural Feed = обязательная альтернатива. Это "non-profiling" mode. Пользователь **ДОЛЖЕН** иметь возможность переключиться одним нажатием. Popularity Score = системная метрика, не профилирование.

---

## 10. ЖЁСТКИЕ ОГРАНИЧЕНИЯ (GDPR / AI Act)

### ⛔ Запрещённые фичи (features) для ML/AI

Модели машинного обучения и алгоритмы ранжирования **НЕ ДОЛЖНЫ** получать на вход:

| # | Запрещённая фича | Закон |
|---|---|---|
| 1 | Раса и этническая принадлежность | GDPR Art. 9, EU AI Act |
| 2 | Религия | GDPR Art. 9 |
| 3 | Политические взгляды | GDPR Art. 9 |
| 4 | Сексуальная ориентация | GDPR Art. 9 |
| 5 | Состояние здоровья | GDPR Art. 9 |
| 6 | Членство в профсоюзах | GDPR Art. 9 |
| 7 | Генетические / биометрические данные | GDPR Art. 9 |
| 8 | Дата рождения (точная) | Используется только `age_bracket` |

> **Требование к Data Engineering:** Исключить эти параметры на уровне формирования датасета и векторизации (embeddings). Эти данные — «слепая зона» для ИИ.

### ✅ Разрешённые фичи

| # | Фича | Обоснование |
|---|---|---|
| 1 | Выбранные категории интересов | Явный выбор пользователя (consent) |
| 2 | Подписки и друзья | Явное действие пользователя |
| 3 | Лайки, комменты, сохранения | Явное взаимодействие |
| 4 | Dwell time (агрегированный) | Неявный сигнал, раскрыт в Privacy Policy |
| 5 | Язык контента | Настройка пользователя |
| 6 | Возрастная когорта (`age_bracket`) | Анонимизировано (не точная дата) |
| 7 | Страна (GeoIP) | Только для локального контента |
| 8 | Участие в сообществах/дискуссиях | Явное действие |

### Аудит: Логирование рекомендаций

Для соответствия DSA Art. 27 каждый показ ленты **логируется**:

```sql
INSERT INTO feed_audit_log (user_id, post_id, position, final_score, feed_mode, created_at)
VALUES (:user_id, :post_id, :position, :score, 'smart', NOW());
```

Этот лог нужен для:
- Ежегодного Transparency Report (DSA Art. 15)
- Отладки алгоритма
- A/B тестирования
- Ответа на запросы пользователей «почему мне показали этот пост»

---

## 11. Архитектура API

### GET /api/feed

```
GET /api/feed?mode=smart&page=1&page_size=20
GET /api/feed?mode=natural&page=1&page_size=20
```

**Параметры запроса:**

| Параметр | Тип | Обязательный | По умолчанию | Описание |
|---|---|---|---|---|
| `mode` | `smart` \| `natural` | Нет | `smart` (или user default) | Режим ленты |
| `page` | integer | Нет | 1 | Номер страницы |
| `page_size` | integer | Нет | 20 | Постов на странице (max 50) |

**Ответ (Smart Feed):**

```json
{
  "mode": "smart",
  "page": 1,
  "page_size": 20,
  "has_more": true,
  "cold_start_phase": null,
  "posts": [
    {
      "id": "uuid",
      "type": "photo",
      "author": { "id": "uuid", "username": "anna", "is_business": false },
      "content": "...",
      "created_at": "2026-03-29T10:00:00Z",
      "engagement": { "likes": 42, "comments": 5, "saves": 3 },
      "community": { "id": "uuid", "name": "Yoga Daily" },
      "_feed_meta": {
        "score": 0.87,
        "slot_type": "general",
        "signals": {
          "interests": 0.8,
          "social_graph": 1.0,
          "popularity": 0.4,
          "freshness": 0.7
        }
      }
    }
  ]
}
```

> **`_feed_meta`** — только для debug-режима (dev/staging). В production НЕ отдаётся.

### PUT /api/user/feed-preferences

```json
{
  "default_mode": "smart",
  "content_languages": ["en", "ru"],
  "categories": ["yoga", "meditation", "nutrition"]
}
```

### POST /api/feed/interaction

```json
{
  "post_id": "uuid",
  "type": "dwell",
  "dwell_ms": 8500
}
```

---

## 12. Таблицы БД

### feed_scores (кэш скоров, пересчитывается)

| Поле | Тип | Описание |
|---|---|---|
| `user_id` | UUID FK | Для какого пользователя |
| `post_id` | UUID FK | Какой пост |
| `final_score` | FLOAT | Итоговый score |
| `w1_interests` | FLOAT | Значение сигнала W1 |
| `w2_social` | FLOAT | Значение сигнала W2 |
| `w3_popularity` | FLOAT | Значение сигнала W3 |
| ... | ... | ... для всех W1–W12 |
| `quality_mult` | FLOAT | QualityMultiplier |
| `penalty_mult` | FLOAT | PenaltyMultiplier |
| `calculated_at` | TIMESTAMP | Когда рассчитано |

> **Стратегия обновления:** Пересчитывать при открытии ленты, если `calculated_at` > 5 минут. Фоновый job пересчитывает top-1000 постов каждые 15 минут.

### feed_audit_log (DSA compliance)

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID записи |
| `user_id` | UUID FK | Пользователь |
| `post_id` | UUID FK | Пост |
| `position` | INT | Позиция в ленте (1, 2, 3...) |
| `final_score` | FLOAT | Score на момент показа |
| `feed_mode` | ENUM | `smart`, `natural` |
| `slot_type` | VARCHAR | `general`, `business`, `friend`, `community`, `new_creator` |
| `created_at` | TIMESTAMP | Когда показано |

### user_feed_preferences

| Поле | Тип | Описание |
|---|---|---|
| `user_id` | UUID PK FK | Пользователь |
| `default_mode` | ENUM | `smart`, `natural` |
| `content_languages` | TEXT[] | Языки контента |
| `updated_at` | TIMESTAMP | Последнее обновление |

### user_interaction_stats (агрегированная статистика для scoring)

| Поле | Тип | Описание |
|---|---|---|
| `user_id` | UUID FK | Пользователь |
| `category` | VARCHAR | Категория wellness |
| `interaction_count` | INT | Кол-во взаимодействий за 30 дней |
| `avg_dwell_ms` | INT | Среднее время задержки |
| `updated_at` | TIMESTAMP | Последний пересчёт |

---

## 13. Фазы реализации

### MVP (v1.0) — Минимум для запуска

> **Подход: Rule-based scoring (обычный алгоритм, без AI/ML)**

| # | Задача | Сигналы | Сложность |
|---|---|---|---|
| 1 | Два режима ленты (Smart / Natural) | API endpoint + mode param | 🟡 Средняя |
| 2 | Базовый Smart Feed | W1 + W2 + W3 + W4 (4 сигнала) | 🟡 Средняя |
| 3 | Penalty за жалобы | PenaltyMultiplier (жалобы + AI flag) | 🟢 Простая |
| 4 | Diversity: запрет 3+ подряд | ContentType slot check | 🟢 Простая |
| 5 | Diversity: бизнес каждый 5-й | Business slot rule | 🟢 Простая |
| 6 | Cold Start фаза 0–1 | Onboarding categories + Global Trending | 🟡 Средняя |
| 7 | Natural Feed (популярность) | Popularity Score + подписки/сообщества + New Content Slots | 🟡 Средняя |
| 8 | UI переключатель ленты | «Smart Feed ✨» / «Natural Feed 🍃» toggle | 🟢 Простая |
| 9 | Feed audit log | Таблица feed_audit_log | 🟢 Простая |

### v1.5 — Расширение

> **Подход: Rule-based scoring (по-прежнему без AI/ML, добавляются новые rule-based сигналы)**

| # | Задача | Сигналы |
|---|---|---|
| 10 | Язык контента | W7 LanguageMatch |
| 11 | Сообщества | W6 CommunityMatch |
| 12 | Блоги/бизнес подписки | W8 BlogSubscription |
| 13 | Cold Start фазы 2–3 | Плавная интерполяция весов |
| 14 | Карточки «помоги узнать тебя лучше» | UI в Cold Start |

### v2.0 — Полная персонализация

> **Подход: Machine Learning (здесь появляется настоящий AI)**

| # | Задача | Сигналы | Что меняется по сравнению с rule-based |
|---|---|---|---|
| 15 | Dwell Time трекинг | W10 DwellTime | ML-модель анализирует паттерны просмотра |
| 16 | Дискуссии | W9 DiscussionActivity | — |
| 17 | Друзья друзей | W11 FriendsOfFriends | — |
| 18 | Буст новых авторов | W12 NewCreatorBoost | — |
| 19 | **Vector Search (embeddings)** | **Cosine similarity для W1** | **Теги → нейросетевые векторы. Семантическое сходство вместо пересечения множеств** |
| 20 | **A/B тестирование весов** | **Config-driven → ML-driven weights** | **Веса обучаются автоматически на поведении пользователей** |
| 21 | «Почему этот пост показан» | Explainability UI | DSA/AI Act: объяснение решений AI |

---

## 14. Чеклист

### Backend

- [ ] API `GET /api/feed?mode=smart|natural` — работает
- [ ] Smart Feed: W1 Interests — реализован
- [ ] Smart Feed: W2 SocialGraph — реализован
- [ ] Smart Feed: W3 Popularity — реализован
- [ ] Smart Feed: W4 Freshness (Time Decay) — реализован
- [ ] PenaltyMultiplier — жалобы + AI flags снижают позицию
- [ ] Diversity: запрет 3+ подряд одного типа
- [ ] Diversity: бизнес-пост каждый 5-й слот
- [ ] Cold Start: онбординг-категории → начальная лента
- [ ] Natural Feed: `ORDER BY popularity_score DESC` + подписки/сообщества + New Content Slots
- [ ] `feed_audit_log` — логирование каждого показа (DSA Art. 27)
- [ ] `user_feed_preferences` — хранение выбора mode + languages
- [ ] Запрещённые фичи (раса, религия и т.д.) **НЕ** попадают в scoring

### Frontend

- [ ] Переключатель «Smart Feed ✨» / «Natural Feed 🍃» в Feed
- [ ] Settings → Feed Preferences (default mode + languages)
- [ ] Settings → About Recommendations (объяснение алгоритма)
- [ ] Cold Start: карточки «подпишись», «вступи в сообщество»
- [ ] Dwell Time tracking: отправка `POST /api/feed/interaction` при задержке ≥ 3 сек

### Юридические документы

- [ ] Privacy Policy → раздел «Automated Decision-Making» обновлён
- [ ] Terms of Service → раздел «Recommendation System» с параметрами
- [ ] Пользователь может переключить на Natural Feed одним нажатием

---

> **Связанные документы:**
> - [NATURAL-FEED.md](NATURAL-FEED.md) — ТЗ Natural Feed (Popularity Score, подписки, New Content Slots, дедупликация)
> - [FEED-UI.md](FEED-UI.md) — Интерфейс ленты, настройки, права пользователя, тексты для ToS/PP
> - [AI-ALGORITHMS.md](AI-ALGORITHMS.md) — общее описание AI-систем + модерация
> - [COMPLIANCE.md](../COMPLIANCE.md) — основной документ compliance
> - [UGC-MODERATION.md](UGC-MODERATION.md) — система жалоб и модерации
> - [COMMUNITY-GUIDELINES.md](COMMUNITY-GUIDELINES.md) — правила сообщества
