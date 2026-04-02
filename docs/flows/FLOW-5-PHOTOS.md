# 🖼️ ПОТОК 5: Photos (Gallery) Permission

| | |
|---|---|
| **Цель** | Объяснить зачем нужен доступ к галерее ПЕРЕД системным диалогом |
| **Закон** | [Google Play Prominent Disclosure](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | При **первой** попытке выбрать фото из галереи телефона |
| **Можно пропустить** | Да, «Not now» — действие прервётся |

---

## 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme needs access to your photos | `photos_permission_title` |
| **Body intro** | We need access to your photo library so you can: | `photos_permission_description` |
| **Bullet 1** | • Upload existing photos and videos to your profile | `photos_permission_upload_existing_to_profile` |
| **Bullet 2** | • Share media in messages with your friends | `photos_permission_share_media_in_messages` |
| **Bullet 3** | • Save photos from Bestme to your device | `photos_permission_save_photos_to_device` |
| **Settings note** | You can change this access at any time in your device settings. | `photos_permission_change_in_device_settings` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

---

## ⚙️ Info.plist (iOS)

Ключ: `NSPhotoLibraryUsageDescription`
Значение: `"This allows you to select photos and videos from your library to attach to your posts and messages."`

---

## ⚙️ Логика Frontend

```
1. Пользователь нажимает «Выбрать из галереи»
       │
       ▼
2. Проверить статус разрешения ОС:
       │
       ├── NOT_DETERMINED → Показать наш экран
       │       ├── «Continue» → системный диалог
       │       │       ├── Allow → открыть галерею
       │       │       └── Don't Allow → вернуть назад
       │       └── «Not now» → закрыть
       │
       └── DENIED → Экран:
           "You previously declined photo library access.
            Please enable it in your device settings."
           Кнопка: [Go to Settings] → Deep Link в настройки
```

---

## 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.** Контролируется на уровне ОС.
