← Назад к [NATURAL-FEED.md](NATURAL-FEED.md) | [SMART-FEED-TZ.md](SMART-FEED-TZ.md)

# 📊 Popularity Score — Формула ранжирования контента (ТЗ)

> **Что это:** Системная метрика, которая определяет «качество» поста на основе реакций аудитории. **Одинаковая для ВСЕХ пользователей** — не зависит от профиля конкретного человека.
>
> **Где используется:** Natural Feed 🍃 (для ранжирования постов от подписок) и Cold Start (для выбора «Popular» постов в каждой категории).
>
> **Юридический статус:** Popularity Score = системная метрика, одинаковая для всех = **НЕ профилирование** (DSA Art. 27 compliant).
>
> **Когда реализовать:** MVP (v1.0).

---

## Оглавление

1. [Формула (полная)](#1-формула-полная)
2. [TypeScript-код для разработчика](#2-typescript-код-для-разработчика)
3. [Таблица весов engagement](#3-таблица-весов-engagement)
4. [Нормализация — зачем делим на √(followers)](#4-нормализация--зачем-делим-на-followers)
5. [Time Decay — затухание со временем](#5-time-decay--затухание-со-временем)
6. [Защита от накрутки](#6-защита-от-накрутки)
7. [Пересчёт Score — когда и как](#7-пересчёт-score--когда-и-как)
8. [База данных](#8-база-данных)
9. [Чеклист для разработчика](#9-чеклист-для-разработчика)

---

## 1. Формула (полная)

```
Popularity Score = engagementRate × timeDecay

Где:
  engagementScore = likes × 1.0 + comments × 2.0 + saves × 3.0 + shares × 2.5
  engagementRate  = engagementScore / √(author_followers_count)
  timeDecay       = e^(-0.693 × hours_since_publication / 24)
```

**Простым языком:** Считаем все реакции (с весами), делим на корень из числа подписчиков автора (чтобы маленькие аккаунты могли конкурировать с большими), и умножаем на коэффициент свежести (новые посты ценнее старых).

---

## 2. TypeScript-код для разработчика

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

---

## 3. Таблица весов engagement

| Действие | Вес | Почему |
|---|---|---|
| 👍 Лайк | **1.0** | Базовая единица — самое простое действие |
| 💬 Комментарий | **2.0** | Требует усилий — пользователь вовлечён |
| 🔄 Репост / Поделиться | **2.5** | Пользователь рекомендует другим |
| 🔖 Сохранение | **3.0** | Самое ценное — пользователь хочет вернуться |

---

## 4. Нормализация — зачем делим на √(followers)

> **Проблема:** Без нормализации аккаунт с 10 000 подписчиков (100 лайков) всегда выше аккаунта с 50 подписчиков (30 лайков). Но 30/50 = 60% вовлечённости vs 100/10000 = 1%.

| Подписчики | Лайки | Raw Score | √followers | Rate |
|---|---|---|---|---|
| 50 | 30 | 30 | 7.07 | **4.24** |
| 500 | 100 | 100 | 22.36 | **4.47** |
| 10 000 | 100 | 100 | 100 | **1.00** |
| 10 000 | 500 | 500 | 100 | **5.00** |

Квадратный корень — компромисс: маленькие аккаунты получают шанс, но крупные не обнуляются.

---

## 5. Time Decay — затухание со временем

| Возраст поста | Time Decay | Эффект |
|---|---|---|
| 0 часов | 1.00 | Полный Score |
| 6 часов | 0.84 | Почти полный |
| 12 часов | 0.71 | –29% |
| 24 часа | 0.50 | **Половина** |
| 48 часов | 0.25 | Четверть |
| 72 часа | 0.125 | Почти не видно |

---

## 6. Защита от накрутки

| Правило | Описание |
|---|---|
| Только уникальные пользователи | Повторные лайки/комменты от одного пользователя не считаются |
| Аккаунты < 24 часов | Лайки от свежезарегистрированных аккаунтов **НЕ** считаются |
| Лимит по IP | Более 50 лайков от одного IP за час → все обнуляются |
| Самолайки | Автор не может лайкнуть свой пост (или лайк не влияет на Score) |

---

## 7. Пересчёт Score — когда и как

| Параметр | Значение |
|---|---|
| **Инкрементальный пересчёт** | При каждом новом лайке/комменте/сохранении (trigger / RPC) |
| **Полный пересчёт** | Каждые 15 минут (pg_cron) для учёта time decay |
| **Хранение** | Колонка `popularity_score NUMERIC` в таблице `posts` |
| **Индекс** | `CREATE INDEX idx_posts_popularity ON posts (popularity_score DESC)` |

---

## 8. База данных

### Колонка в таблице `posts`

```sql
ALTER TABLE posts ADD COLUMN popularity_score NUMERIC DEFAULT 0;
CREATE INDEX idx_posts_popularity ON posts (popularity_score DESC);
CREATE INDEX idx_posts_popularity_type ON posts (post_type, popularity_score DESC);
CREATE INDEX idx_posts_category_popularity ON posts (category, popularity_score DESC);
```

### Функция пересчёта (pg_cron каждые 15 минут)

```sql
CREATE OR REPLACE FUNCTION recalculate_popularity_scores()
RETURNS void AS $$
BEGIN
  UPDATE posts SET popularity_score = (
    (likes_count * 1.0 + comments_count * 2.0 + saves_count * 3.0 + shares_count * 2.5)
    / GREATEST(SQRT(author_followers_count), 1)
    * EXP(-0.693 * EXTRACT(EPOCH FROM (NOW() - created_at)) / 3600 / 24)
  )
  WHERE created_at > NOW() - INTERVAL '14 days';
END;
$$ LANGUAGE plpgsql;
```

---

## 9. Чеклист для разработчика

- [ ] Добавить колонку `popularity_score NUMERIC DEFAULT 0` в `posts`
- [ ] Создать индекс `idx_posts_popularity`
- [ ] Создать индекс `idx_posts_popularity_type`
- [ ] Создать индекс `idx_posts_category_popularity`
- [ ] Реализовать функцию `calcPopularityScore()` (TypeScript)
- [ ] Реализовать SQL-функцию `recalculate_popularity_scores()`
- [ ] Настроить pg_cron для пересчёта каждые 15 минут
- [ ] Инкрементальный пересчёт при лайке/комменте/сохранении (trigger или RPC)
- [ ] Защита от накрутки: уникальность, аккаунты < 24ч, лимит по IP, самолайки
- [ ] Покрыть формулу unit-тестами (проверить нормализацию, decay)

---

> **Связанные документы:**
> - [NATURAL-FEED.md](NATURAL-FEED.md) — Алгоритм ленты (Cold Start + Returning User)
> - [SMART-FEED-TZ.md](SMART-FEED-TZ.md) — Smart Feed (персонализированная лента)
> - [FEED-UI.md](FEED-UI.md) — Интерфейс ленты, права пользователя
