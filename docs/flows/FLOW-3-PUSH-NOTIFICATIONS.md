# 🔔 ПОТОК 3: Push Notifications Permission

| | |
|---|---|
| **Цель** | Объяснить зачем нужны push-уведомления ПЕРЕД системным диалогом |
| **Закон** | [Google Play User Data Policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | Показывается **ДО** системного диалога запроса разрешений |
| **Блокировка** | Экран можно **пропустить** нажав «Not now» |

---

## 🖥️ Frontend тексты и ключи переводов

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

---

## ⚙️ Логика Frontend

```
1. Показать наш экран с объяснением (Prominent Disclosure)
       │
       ├── «Continue»
       │       │
       │       ▼
       │   Системное окно iOS/Android:
       │   «"Bestme" Would Like to Send You Notifications: Allow / Don't Allow»
       │       │
       │       ├── Allow → push_notifications_enabled = true
       │       └── Don't Allow → push_notifications_enabled = false
       │
       └── «Not now» → закрыть, системный запрос НЕ вызывается
```

---

## 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.** Контролируется на уровне ОС.

| Поле | Значение |
|---|---|
| `push_notifications_enabled` | `true` / `false` — по результату системного окна |
