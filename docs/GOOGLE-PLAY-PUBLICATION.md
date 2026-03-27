# 🤖 Google Play — данные для публикации

---

## Обязательные требования

| # | Требование | Статус | Подробнее |
|---|---|---|---|
| 1 | Content Rating = 18+ | Заполнить через IARC опросник в Play Console | |
| 2 | Privacy Policy URL | `bestme.app/privacy` | Play Console → Store Listing |
| 3 | Data Safety Section | Заполнить полностью | Какие данные, зачем, шифрование |
| 4 | Restrict Declared Minors | Включить в Play Console | Обязательно при 18+ контенте |
| 5 | Модерация UGC | Реализована | [UGC-MODERATION.md](./UGC-MODERATION.md) |
| 6 | Удаление аккаунта (в приложении) | Кнопка в настройках | [FLOW-9-DELETE-ACCOUNT.md](./flows/FLOW-9-DELETE-ACCOUNT.md) |
| 7 | Веб-форма удаления данных | `bestme.app/delete-account` | Указать в Data Safety → Data deletion |
| 8 | DOB проверка | При регистрации | [DOB-AGE-VERIFICATION.md](./DOB-AGE-VERIFICATION.md) |
| 9 | Target SDK | targetSdkVersion ≥ 34 (Android 14) | Обязательно с августа 2024 |
| 10 | App Bundle | AAB формат (не APK) | Обязательно с 2021 |
| 11 | Google Token Revocation | При удалении аккаунта | [FLOW-9-DELETE-ACCOUNT.md](./flows/FLOW-9-DELETE-ACCOUNT.md) |

---

## Структура проекта (что проверяют)

| # | Элемент | Требование |
|---|---|---|
| 1 | Формат | AAB (Android App Bundle), не APK |
| 2 | applicationId | Уникальный, формат `com.bestme.app` |
| 3 | versionCode | Целое число, увеличивается с каждым релизом |
| 4 | Signing Key | Upload Key → Play App Signing |
| 5 | AndroidManifest | Все permissions обоснованы |
| 6 | targetSdkVersion | ≥ 34 (обязательно с 2024) |
| 7 | minSdkVersion | Рекомендуется ≥ 24 (Android 7.0) |
| 8 | ProGuard/R8 | Обфускация включена |
| 9 | 64-bit | Обязательно с 2019 |
| 10 | Размер | < 150 MB (AAB), < 200 MB (APK on-demand) |

---

## AndroidManifest.xml — разрешения

| Permission | Зачем | Поток |
|---|---|---|
| `CAMERA` | Фото/видео для постов | ПОТОК 4 |
| `RECORD_AUDIO` | Голосовые сообщения | ПОТОК 4Б |
| `READ_MEDIA_IMAGES` (API 33+) | Выбор фото из галереи | ПОТОК 5 |
| `READ_MEDIA_VIDEO` (API 33+) | Выбор видео из галереи | ПОТОК 5 |
| `ACCESS_FINE_LOCATION` | Радар — найти друзей | ПОТОК 10 |
| `ACCESS_COARSE_LOCATION` | Радар — приблизительное расстояние | ПОТОК 10 |
| `POST_NOTIFICATIONS` (API 33+) | Push-уведомления | ПОТОК 3 |

> ⚠️ **НЕ добавлять:** `ACCESS_BACKGROUND_LOCATION` — фонового трекинга НЕТ

---

## Data Safety Section — что указать

| Данные | Собираем? | Передаём? | Шифрование? | Удаление? |
|---|---|---|---|---|
| Email | ✅ | ❌ | ✅ (Supabase Auth) | По запросу |
| Name | ✅ | ❌ | ❌ | По запросу |
| Date of birth | ✅ | ❌ | ✅ (AES-256-GCM) | По запросу |
| Photos/Videos | ✅ (UGC) | ❌ | ✅ (in transit) | По запросу |
| Location | ✅ (Radar) | ❌ | ✅ (in transit) | Не хранится |
| IP address | ✅ (GeoIP) | ❌ | — | НЕ хранится |

---

## Сроки ревью

- **Первая подача:** 1-3 рабочих дня (иногда до 7)
- **Обновление:** 1-3 рабочих дня
- **Production vs Internal testing:** Internal testing = мгновенно

---

## Все причины отказа → [REJECTION-REASONS.md](./REJECTION-REASONS.md)
