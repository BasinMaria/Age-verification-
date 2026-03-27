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

## 💾 Backend / База данных

### Таблица `reports`

| Поле | Тип | Описание |
|---|---|---|
| `id` | UUID | ID жалобы |
| `reporter_id` | UUID FK | Кто пожаловался |
| `reported_content_id` | UUID | ID контента (пост/комментарий/профиль) |
| `reported_content_type` | ENUM | `post`, `comment`, `profile` |
| `reason` | ENUM | `spam`, `hate`, `violence`, `csam`, `harassment`, `nudity`, `fraud`, `other` |
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
