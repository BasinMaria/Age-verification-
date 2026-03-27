# 🍎 Apple App Store — данные для публикации

---

## Обязательные требования

| # | Требование | Статус | Подробнее |
|---|---|---|---|
| 1 | Age Rating = 17+ | Заполнить в App Store Connect | Честно ответить на опросник рейтинга |
| 2 | Privacy Policy URL | Указать `bestme.app/privacy` | В App Store Connect → App Information |
| 3 | Support URL | Указать `bestme.app/support` | Обязательно |
| 4 | Тестовый аккаунт | Логин + пароль для ревьюера | App Store Connect → App Review → Demo Account |
| 5 | Модерация UGC | Реализована | [UGC-MODERATION.md](./UGC-MODERATION.md) |
| 6 | Удаление аккаунта | Кнопка в приложении | [FLOW-9-DELETE-ACCOUNT.md](./flows/FLOW-9-DELETE-ACCOUNT.md) |
| 7 | DOB проверка | При регистрации | [DOB-AGE-VERIFICATION.md](./DOB-AGE-VERIFICATION.md) |
| 8 | Apple Token Revocation | При удалении аккаунта | [FLOW-9-DELETE-ACCOUNT.md](./flows/FLOW-9-DELETE-ACCOUNT.md) |

---

## Структура проекта (что проверяют)

| # | Элемент | Требование |
|---|---|---|
| 1 | Bundle ID | Уникальный, формат `com.bestme.app` |
| 2 | Provisioning Profile | Distribution, не Development |
| 3 | Info.plist | Все Purpose Strings заполнены |
| 4 | Icons | 1024x1024 (App Store), все размеры для устройств |
| 5 | Launch Screen | Стандартный storyboard |
| 6 | Архитектура | arm64 обязательно |
| 7 | PrivacyInfo.xcprivacy | Обязательно с 2024 — Privacy Manifest |
| 8 | Entitlements | Только те что используются |
| 9 | Размер | < 4 GB (App Store limit) |

---

## Info.plist — Purpose Strings

| Ключ | Значение | Поток |
|---|---|---|
| `NSCameraUsageDescription` | This allows you to take photos and record videos to share in your profile and posts. | ПОТОК 4 |
| `NSMicrophoneUsageDescription` | This allows you to record voice messages in chats and capture audio for your videos. | ПОТОК 4Б |
| `NSPhotoLibraryUsageDescription` | This allows you to select photos and videos from your library to attach to your posts and messages. | ПОТОК 5 |
| `NSLocationWhenInUseUsageDescription` | This allows you to discover Bestme members near you on the Radar map. Your exact location is never shared with other users. | ПОТОК 10 |

> ⚠️ **НЕ добавлять:** `NSLocationAlwaysUsageDescription`, `NSUserTrackingUsageDescription` (не нужно для MVP)

---

## Export Compliance (шифрование)

Bestme использует HTTPS (TLS) + AES-256-GCM (для DOB). При подаче в App Store Connect:

| Вопрос | Ответ |
|---|---|
| Does your app use encryption? | **Yes** |
| Is it exempt under Category 5 Part 2? | **Yes** — стандартное шифрование (HTTPS/TLS) |
| Does it qualify for exemption? | **Yes** — EAR §740.17(b)(1) |

---

## Метаданные листинга

| Элемент | Требования |
|---|---|
| Скриншоты | Реальные скриншоты, не mockups. Для каждого размера устройства |
| Description | Функционал приложения, без упоминания конкурентов |
| Keywords | Релевантные, без чужих брендов |
| App Name | Не содержит чужих торговых марок |

---

## Сроки ревью

- **Первая подача:** 24-48 часов (может до 7 дней)
- **Обновление:** 24-48 часов
- **Expedited Review:** Запросить через [Apple Expedited Review](https://developer.apple.com/contact/app-store/) при критических багах

---

## Все причины отказа → [REJECTION-REASONS.md](./REJECTION-REASONS.md)
