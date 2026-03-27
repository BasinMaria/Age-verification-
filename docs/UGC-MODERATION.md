# 🛡️ Модерация UGC — система жалоб и контент-модерации

> **ОБЯЗАТЕЛЬНО для публикации в App Store и Google Play.** Без модерации UGC — **отказ**.

---

## Законы

| Закон | Что требует |
|---|---|
| [Apple App Store §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) | Кнопка жалобы + блокировка + модерация контента |
| [Google Play UGC Policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) | Кнопка жалобы + блокировка + модерация |
| [DSA Art. 14](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | Community Guidelines — опубликовать правила |
| [DSA Art. 16](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | Механизм жалоб (notice & action) |
| [DSA Art. 17](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | Уведомление заявителю о результате |
| [DSA Art. 20](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | Механизм обжалования (appeal) |

---

## Что ОБЯЗАТЕЛЬНО реализовать

| # | Требование | Закон | Что делать |
|---|---|---|---|
| 1 | **Кнопка «Пожаловаться»** (Report) | Apple §1.2, Google UGC, DSA Art. 16 | Кнопка на каждом посте/комментарии/профиле → выбор причины → отправка |
| 2 | **Блокировка пользователей** (Block) | Apple §1.2, Google UGC | Пользователь блокирует другого → контент скрыт |
| 3 | **Контент-модерация** (удаление) | Apple §1.2, Google UGC | Модераторы / автоматика удаляют контент |
| 4 | **Community Guidelines** | Apple §1.2, Google UGC, DSA Art. 14 | Опубликовать правила + показать при первой публикации → см. [ПОТОК 2](./flows/FLOW-2-UGC-GUIDELINES.md) |
| 5 | **Обжалование** (Appeal) | DSA Art. 20 (ЕС) | Пользователь может оспорить удаление |
| 6 | **Уведомление о результате** | DSA Art. 17 (ЕС) | Сообщить заявителю о результате |

---

## Сроки рассмотрения

| Тип | Срок | Основание |
|---|---|---|
| Обычная жалоба | **24 часа** | Стандартная практика (Apple/Google ожидают) |
| CSAM (детская эксплуатация) | **Немедленно** | Закон обязывает + отчёт в NCMEC |
| Апелляция (appeal) | **48 часов** | DSA Art. 20 — «без чрезмерной задержки» |
| Уведомление заявителю | **Сразу после решения** | DSA Art. 17 |

---

## Интерфейс управления (Admin Panel)

Для модераторов нужна **админ-панель** со следующими элементами:

| Элемент | Функция |
|---|---|
| Очередь жалоб | Список всех необработанных жалоб, отсортированный по приоритету (CSAM → violence → остальное) |
| Просмотр контента | Возможность видеть жалобный контент + профиль автора |
| Действия | Кнопки: «Удалить контент», «Предупредить автора», «Заблокировать автора», «Отклонить жалобу» |
| История решений | Лог всех действий модератора (для аудита DSA) |
| Апелляции | Отдельная очередь для обжалований |
| Статистика | Количество жалоб/решений за период |

---

## 🖥️ Frontend тексты — Report

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
| **Reason: Health misinfo** | Dangerous health misinformation | `report_reason_health_misinfo` |
| **Reason: Other** | Other | `report_reason_other` |
| **Submit** | Submit report | `submit_report` |
| **Confirmation** | Thank you. We will review this report within 24 hours. | `report_submitted_confirmation` |

---

## 🖥️ Frontend тексты — Block User

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Block button** | Block user | `block_user_button` |
| **Confirm** | Block @{username}? They won't be able to see your profile or contact you. | `block_user_confirm` |
| **Blocked** | You have blocked @{username}. | `user_blocked_confirmation` |
| **Unblock** | Unblock | `unblock_button` |

---

## 🖥️ Frontend тексты — Content Removal Notice

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Content removed | `content_removed_title` |
| **Body** | Your content was removed for violating our Community Guidelines: {reason}. | `content_removed_reason` |
| **Appeal** | If you believe this was a mistake, you can [appeal this decision]. | `content_removed_appeal` |
| **Appeal button** | Appeal | `appeal_button` |
| **Appeal submitted** | Your appeal has been submitted. We will review it within 48 hours. | `appeal_submitted_confirmation` |

---

## 📱 Форма жалобы — как выглядит (визуал)

> **MVP — самый простой способ, который пройдёт Apple/Google/DSA проверки.**

### Шаг 1: Кнопка Report (на каждом посте/комментарии/профиле)

```
┌─────────────────────────────────────┐
│  [Фото / Контент поста]            │
│                                     │
│  ❤️ 💬 🔖                      ••• │  ← три точки = меню
│                                     │
└─────────────────────────────────────┘

Нажатие на ••• открывает меню:
┌─────────────────────────────────────┐
│  📋 Copy link                       │
│  🔇 Mute @username                  │
│  🚫 Block @username                 │
│  ────────────────────────────       │
│  🚩 Report                          │  ← ОБЯЗАТЕЛЬНО
└─────────────────────────────────────┘
```

### Шаг 2: Модальное окно выбора причины

```
┌─────────────────────────────────────┐
│           Report this content       │
│                                     │
│  Why are you reporting this?        │
│                                     │
│  ○ Spam or misleading               │
│  ○ Hate speech or discrimination    │
│  ○ Violence or threats              │
│  ○ Child exploitation (CSAM)        │
│  ○ Bullying or harassment           │
│  ○ Nudity or sexual content         │
│  ○ Fraud or scam                    │
│  ○ Dangerous health misinformation  │  ← wellness-специфика
│  ○ Other                            │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ Additional details (optional)│    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Cancel]        [Submit report]    │
│                                     │
└─────────────────────────────────────┘
```

### Шаг 3: Подтверждение

```
┌─────────────────────────────────────┐
│                                     │
│           ✅                        │
│                                     │
│  Thank you for your report          │
│                                     │
│  We will review this report within  │
│  24 hours. You will be notified of  │
│  the outcome.                       │
│                                     │
│  Your identity is kept confidential │
│  — the reported user will NOT know  │
│  who reported them.                 │
│                                     │
│           [OK]                      │
│                                     │
└─────────────────────────────────────┘
```

> **Для дизайнера:** Это модальное окно (bottom sheet на мобильном). Минимум 2 экрана: выбор причины → подтверждение.

---

## 📬 Статус жалобы — что видит пользователь

### Где пользователь видит статус своих жалоб

**Место:** Settings → My Reports (или Notifications)

```
┌─────────────────────────────────────┐
│  My Reports                         │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📝 Report #1                │    │
│  │ Post by @user123            │    │
│  │ Reason: Spam                │    │
│  │ Status: ✅ Resolved         │    │
│  │ Action: Content removed     │    │
│  │ Mar 25, 2026                │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📝 Report #2                │    │
│  │ Comment by @spammer         │    │
│  │ Reason: Hate speech         │    │
│  │ Status: 🔍 Under review     │    │
│  │ Mar 27, 2026                │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 📝 Report #3                │    │
│  │ Profile @fakebiz            │    │
│  │ Reason: Fraud               │    │
│  │ Status: ❌ Dismissed         │    │
│  │ No violation found          │    │
│  │ Mar 20, 2026                │    │
│  └─────────────────────────────┘    │
│                                     │
└─────────────────────────────────────┘
```

### Статусы жалобы (DSA Art. 17 — уведомление о результате)

| Статус | Иконка | Текст (EN) | Ключ |
|---|---|---|---|
| **Отправлено** | 📝 | Submitted — under review | `report_status_submitted` |
| **На рассмотрении** | 🔍 | Under review | `report_status_under_review` |
| **Контент удалён** | ✅ | Resolved — content removed | `report_status_content_removed` |
| **Автор предупреждён** | ✅ | Resolved — user warned | `report_status_user_warned` |
| **Автор заблокирован** | ✅ | Resolved — user banned | `report_status_user_banned` |
| **Отклонено** | ❌ | Dismissed — no violation found | `report_status_dismissed` |

### Push-уведомление о результате

| Когда | Текст (EN) | Ключ |
|---|---|---|
| Жалоба рассмотрена — action taken | Your report was reviewed. Action was taken against the content. | `report_result_action_taken` |
| Жалоба отклонена | Your report was reviewed. We did not find a violation. | `report_result_dismissed` |

> **DSA Art. 17 требует:** уведомить заявителя о результате + указать причину + указать возможность обжалования.

---

## 🔧 MVP — минимальная реализация модерации

> **Самый простой способ, чтобы пройти Apple/Google/DSA проверки:**

| # | Что сделать | Приоритет | Описание |
|---|---|---|---|
| 1 | **Кнопка Report** на каждом контенте | 🔴 Обязательно | ••• меню → Report → выбор причины |
| 2 | **Block user** | 🔴 Обязательно | Кнопка блокировки + двусторонний блок |
| 3 | **Community Guidelines** | 🔴 Обязательно | Текст на bestme.app/guidelines + ПОТОК 2 |
| 4 | **Email-уведомление модератору** | 🔴 Обязательно | При жалобе → email на moderation@bestme.app |
| 5 | **Модератор удаляет через Supabase** | 🟡 MVP | На старте = ручное удаление через Supabase Dashboard |
| 6 | **Уведомление заявителю** | 🔴 Обязательно (DSA) | Push/email о результате |
| 7 | **Appeal кнопка** | 🔴 Обязательно (DSA) | При удалении → email для обжалования |
| 8 | **Admin Panel (полная)** | 🟢 Позже (v2) | Веб-панель модерации |

### MVP Flow (простейший)

```
Пользователь нажимает Report
       │
       ▼
Выбирает причину → Submit
       │
       ▼
Запись в таблицу reports (status: pending)
       │
       ▼
Email-уведомление на moderation@bestme.app
       │
       ▼
Модератор открывает Supabase Dashboard
       │
       ├── Удалить контент → UPDATE reports SET status='actioned'
       │   └── Push-уведомление заявителю: "Action taken"
       │   └── Push-уведомление автору: "Content removed" + Appeal кнопка
       │
       └── Отклонить → UPDATE reports SET status='dismissed'
           └── Push-уведомление заявителю: "No violation found"
```

> **На первом этапе admin panel = Supabase Dashboard.** Это законно — закон не требует красивую панель, он требует **процесс рассмотрения жалоб в течение 24 часов.**

---

## 🖥️ Интерфейс модерации (Admin Panel) — v2

> **Для масштабирования после MVP.**

### Очередь жалоб

```
┌────────────────────────────────────────────────────────┐
│  📋 Moderation Queue            Filter: [All ▼]  🔄    │
│                                                        │
│  🔴 URGENT (2)                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 🚨 CSAM Report    @user456    Post #789         │  │
│  │    Reported: 5 min ago    Reporter: @reporter1   │  │
│  │    [View] [Remove + Report NCMEC] [Dismiss]      │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  🟡 PENDING (15)                                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Hate speech        @troll99    Comment #321      │  │
│  │    Reported: 2h ago    Reporter: @user007        │  │
│  │    [View] [Remove] [Warn] [Dismiss]              │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Spam               @spammer   Post #555         │  │
│  │    Reported: 3h ago    Reporter: @user088        │  │
│  │    [View] [Remove] [Ban user] [Dismiss]          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ✅ RESOLVED TODAY: 23   ⏳ AVG RESPONSE: 4.2h         │
└────────────────────────────────────────────────────────┘
```

### Действия модератора

| Кнопка | Что делает | Уведомления |
|---|---|---|
| **View** | Открыть контент + профиль автора + историю жалоб | — |
| **Remove** | Удалить контент | Автору: «Content removed» + причина + Appeal. Заявителю: «Action taken» |
| **Warn** | Предупредить автора (контент может остаться) | Автору: «Warning» + причина |
| **Ban user** | Заблокировать аккаунт автора | Автору: «Account suspended» + причина + Appeal |
| **Dismiss** | Отклонить жалобу (нет нарушения) | Заявителю: «No violation found» |

---

## 💾 Backend / База данных

### Таблица `reports`

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID жалобы |
| `reporter_id` | UUID FK | Кто пожаловался |
| `reported_content_id` | UUID | ID контента (пост/комментарий/профиль) |
| `reported_content_type` | ENUM | `post`, `comment`, `profile` |
| `reason` | ENUM | `spam`, `hate`, `violence`, `csam`, `harassment`, `nudity`, `fraud`, `health_misinfo`, `other` |
| `status` | ENUM | `pending`, `reviewed`, `actioned`, `dismissed` |
| `moderator_id` | UUID FK | Кто рассмотрел |
| `moderator_action` | ENUM | `content_removed`, `user_warned`, `user_banned`, `dismissed` |
| `created_at` | TIMESTAMP | Когда создана |
| `reviewed_at` | TIMESTAMP | Когда рассмотрена |

### Таблица `blocked_users`

| Поле | Тип | Описание |
|---|---|---|
| `blocker_id` | UUID FK | Кто заблокировал |
| `blocked_id` | UUID FK | Кого заблокировал |
| `created_at` | TIMESTAMP | Когда |

### Таблица `appeals`

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID апелляции |
| `report_id` | UUID FK | К какой жалобе |
| `user_id` | UUID FK | Кто обжалует |
| `reason` | TEXT | Текст обжалования |
| `status` | ENUM | `pending`, `approved`, `rejected` |
| `created_at` | TIMESTAMP | Когда |
| `reviewed_at` | TIMESTAMP | Когда рассмотрена |

---

> **Связанные документы:**
> - [COMPLIANCE.md](../COMPLIANCE.md) — основной документ
> - [COMMUNITY-GUIDELINES.md](COMMUNITY-GUIDELINES.md) — полный текст Community Guidelines
> - [AI-ALGORITHMS.md](AI-ALGORITHMS.md) — AI, алгоритмы, прозрачность, AI-модерация
> - [LEGAL-DOCUMENTS.md](LEGAL-DOCUMENTS.md) — юридические документы
> - [FLOW-2-UGC-GUIDELINES.md](flows/FLOW-2-UGC-GUIDELINES.md) — ПОТОК 2 (экран согласия)
