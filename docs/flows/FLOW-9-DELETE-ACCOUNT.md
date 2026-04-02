# 🔴 ПОТОК 9: Delete Account (GDPR Art. 17 + Apple §5.1.1(v))

| | |
|---|---|
| **Цель** | Дать пользователю возможность полностью удалить аккаунт изнутри приложения |
| **Закон** | [GDPR Art. 17](https://gdpr-info.eu/art-17-gdpr/) · [Apple Account Deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) · [Apple §5.1.1(v)](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) · [Google Account Deletion](https://support.google.com/googleplay/android-developer/answer/13327111?hl=en) |
| **Платформы** | iOS, Android, Backend |
| **Приоритет** | **Критический (Blocker для релиза)** — без этого Apple и Google **ЗАБАНЯТ** приложение |
| **Путь** | Settings → Account → Delete Account |

---

## 🛑 Anti-Reject правила

| # | Правило | Что запрещено |
|---|---|---|
| 1 | **Никаких писем в поддержку** | Нельзя просить пользователя писать на email для удаления |
| 2 | **Никаких ссылок на сайт** | Процесс начинается и завершается **внутри** приложения |
| 3 | **Прозрачность 30 дней** | Пользователь ДОЛЖЕН быть предупреждён о 30-дневном сроке |
| 4 | **Легко доступно** | Максимум 2-3 клика. НЕ скрывать кнопку |

---

## 📱 Frontend — User Flow

```
1. [Delete Account] (красная кнопка)
       │
       ▼
2. Подтверждение личности: пароль ИЛИ Face ID / Touch ID / PIN
       │
       ▼
3. Alert: "Delete Account? Your profile, photos, and posts will be hidden
   immediately and permanently deleted in 30 days. If you change your
   mind, just log in again before then."
       │
       ├── «Cancel» → ничего не делать
       └── «Delete» → запрос на Backend → разлогинить → стартовый экран
```

### Frontend тексты

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Button** | Delete Account | `delete_account` |
| **Alert Title** | Delete Account? | `delete_account_confirm_title` |
| **Alert Body** | Are you sure you want to delete your account? Your profile, photos, and posts will be hidden immediately and permanently deleted in 30 days. If you change your mind, just log in again before then. | `delete_account_confirm_body` |
| **Cancel** | Cancel | `cancel` |
| **Delete** | Delete | `delete_confirm` |

---

## ⚙️ Backend — «Мягкое удаление» (30 дней)

```
1. Запрос на удаление
       ▼
2. status = "scheduled_for_deletion"
   deletion_requested_at = NOW()
   deletion_scheduled_for = NOW() + 30 days
       ▼
3. Изоляция данных (НЕМЕДЛЕННО):
   Профиль → НЕВИДИМ, посты → СКРЫТЫ, поиск → НЕ выдаётся
       ▼
4. Email: "Your account is scheduled for deletion. It will be
   completely erased in 30 days. Log back in to cancel."
       ▼
5. Token Revocation:
   - Apple ID → POST https://appleid.apple.com/auth/revoke
   - Google   → POST https://oauth2.googleapis.com/revoke
   - Facebook → DELETE https://graph.facebook.com/{user-id}/permissions
       ▼
6. Cron Job (ежедневно): deletion_scheduled_for < NOW() → Hard Delete
```

**Восстановление:** Логин до истечения 30 дней → статус снимается, аккаунт активный.

---

## 🍏 Apple Token Revocation

| Параметр | Значение |
|---|---|
| **Endpoint** | `POST https://appleid.apple.com/auth/revoke` |
| `client_id` | App ID |
| `client_secret` | JWT |
| `token` | `refresh_token` пользователя |
| **Документация** | [Apple Revoke Tokens](https://developer.apple.com/documentation/sign_in_with_apple/revoke_tokens) |

## 🔵 Google Token Revocation

| Параметр | Значение |
|---|---|
| **Endpoint** | `POST https://oauth2.googleapis.com/revoke` |
| `token` | `access_token` пользователя |
| **Документация** | [Google Revoke Token](https://developers.google.com/identity/protocols/oauth2/web-server#tokenrevoke) |

## 📘 Facebook Token Revocation

| Параметр | Значение |
|---|---|
| **Endpoint** | `DELETE https://graph.facebook.com/{user-id}/permissions` |
| **Headers** | `Authorization: Bearer {user_access_token}` |
| **Документация** | [Facebook Revoking Permissions](https://developers.facebook.com/docs/facebook-login/permissions/requesting-and-revoking#revoking) |

---

## 🌐 Веб-форма удаления (ОБЯЗАТЕЛЬНО для Google Play)

Google Play с дек. 2023 требует **веб-страницу** для удаления данных.

**URL:** `bestme.app/delete-account`
**Форма:** Email → код подтверждения → удаление (те же 30 дней).
**Указать в:** Play Console → Data Safety → Data deletion.

---

## 💾 База данных

| Поле | Значение |
|---|---|
| `users.status` | `active` / `scheduled_for_deletion` / `deleted` |
| `users.deletion_requested_at` | Timestamp запроса |
| `users.deletion_scheduled_for` | Timestamp удаления (запрос + 30 дней) |

| Cron Job | Что делает |
|---|---|
| `daily_account_cleanup` | `deletion_scheduled_for < NOW()` + `status = scheduled_for_deletion` → Hard Delete |
