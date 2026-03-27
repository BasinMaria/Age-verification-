# 📷 ПОТОК 4: Camera Permission + 🎙️ ПОТОК 4Б: Microphone + 🎥 ПОТОК 4В: Camera+Microphone

Три связанных потока для медиа-разрешений. Все следуют одному паттерну: **наш экран объяснения → системный диалог ОС**.

---

## 📷 ПОТОК 4: Camera Permission

| | |
|---|---|
| **Цель** | Объяснить зачем нужен доступ к камере ПЕРЕД системным диалогом |
| **Закон** | [Google Play Prominent Disclosure](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | При **первой** попытке сделать фото/видео (аватарка, пост) |
| **Можно пропустить** | Да, «Not now» — действие прервётся |

### Frontend тексты

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme needs access to your camera | `camera_permission_title` |
| **Body** | We use your camera so you can: | `camera_permission_description` |
| **Bullet 1** | • Take photos and videos for your posts | `camera_permission_take_photos_videos_posts` |
| **Bullet 2** | • Update your profile picture | `camera_permission_update_profile_picture` |
| **Bullet 3** | • Capture moments to share with friends | `camera_permission_capture_moments_share_friends` |
| **Settings note** | You can change this access at any time in your device settings. | `camera_permission_change_in_device_settings` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

### Info.plist (iOS)

Ключ: `NSCameraUsageDescription`
Значение: `"This allows you to take photos and record videos to share in your profile and posts."`

### Логика Frontend

```
1. Пользователь нажимает «Сделать фото»
       │
       ▼
2. Проверить статус разрешения ОС:
       │
       ├── NOT_DETERMINED → Показать наш экран
       │       ├── «Continue» → системный диалог
       │       │       ├── Allow → открыть камеру
       │       │       └── Don't Allow → вернуть назад
       │       └── «Not now» → закрыть
       │
       └── DENIED → Показать экран:
           "You previously declined camera access.
            Please enable it in your device settings."
           Кнопка: [Go to Settings] → Deep Link в настройки
```

---

## 🎙️ ПОТОК 4Б: Microphone Permission

| | |
|---|---|
| **Триггер** | При **первой** попытке записать голосовое сообщение в чате |
| **Платформы** | iOS и Android |

### Frontend тексты

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme needs access to your microphone | `microphone_permission_title` |
| **Body** | We use your microphone so you can: | `microphone_permission_description` |
| **Bullet 1** | • Record and send voice messages in chats | `microphone_permission_record_voice_messages` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

### Info.plist (iOS)

Ключ: `NSMicrophoneUsageDescription`
Значение: `"This allows you to record voice messages in chats and capture audio for your videos."`

### Логика — аналогична ПОТОК 4 (Camera).

---

## 🎥 ПОТОК 4В: Camera + Microphone (видео с звуком)

| | |
|---|---|
| **Триггер** | При **первой** попытке снять видео с звуком для поста |
| **Платформы** | iOS и Android |

### Frontend тексты

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme needs access to your camera and microphone | `camera_mic_permission_title` |
| **Body** | We need these permissions so you can: | `camera_mic_permission_description` |
| **Bullet 1** | • Record videos with sound for your posts and profile | `camera_mic_permission_record_videos_with_sound` |

### Info.plist (iOS)

Оба ключа:
- `NSCameraUsageDescription`
- `NSMicrophoneUsageDescription`

### Логика Frontend

```
1. Пользователь нажимает «Снять видео»
       │
       ▼
2. Проверить ОБА разрешения:
       │
       ├── Оба NOT_DETERMINED → ОДИН общий экран → ДВА системных диалога последовательно
       ├── Один DENIED → экран для недостающего
       └── Оба DENIED → [Go to Settings]
```

---

## 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`** ни для одного из этих потоков. Доступ к камере/микрофону контролируется на уровне ОС.
