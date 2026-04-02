# 📍 ПОТОК 10: Location / Radar Permission (Геолокация)

| | |
|---|---|
| **Цель** | Получить разрешение на геолокацию для функции «Радар — найти друзей поблизости» |
| **Закон** | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) · [Apple §5.1.2](https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing) · [Google Play User Data Policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) |
| **Триггер** | Пользователь **сам** заходит во вкладку «Карта / Радар» и нажимает кнопку «Включить радар» |
| **Тип разрешения** | **When In Use** (При использовании приложения) — НЕ «Always» |
| **Фоновый трекинг** | ❌ **НЕТ** — приложение **НЕ отслеживает** геолокацию в фоновом режиме |

---

## ⚠️ Почему НЕТ фонового трекинга — доказательство для Apple/Google

| Факт | Доказательство |
|---|---|
| Запрашиваем только **When In Use** | Info.plist содержит ТОЛЬКО `NSLocationWhenInUseUsageDescription`. Ключ `NSLocationAlwaysUsageDescription` **ОТСУТСТВУЕТ** |
| Нет Background Location Mode | В `Info.plist → UIBackgroundModes` **НЕТ** значения `location` |
| Нет Background Fetch для геолокации | Background Fetch (если используется) — только для push notifications, НЕ для определения координат |
| Геолокация работает ТОЛЬКО при открытом экране Радар | Когда пользователь уходит с экрана Радар → запрос координат **ПРЕКРАЩАЕТСЯ** (`locationManager.stopUpdatingLocation()`) |
| В Android Manifest нет фоновой геолокации | `ACCESS_FINE_LOCATION` + `ACCESS_COARSE_LOCATION` — только foreground. **НЕТ** `ACCESS_BACKGROUND_LOCATION` |

---

## Полный поток — первый запуск

```
1. Пользователь заходит во вкладку «Карта / Радар»
       │
       ▼
2. Видит экран с кнопкой:
   ┌─────────────────────────────────────┐
   │                                     │
   │    📍 Find friends nearby           │
   │                                     │
   │    Enable the radar to discover     │
   │    Bestme members near you.         │
   │    Your exact location is never     │
   │    shared — only approximate        │
   │    distance is shown.               │
   │                                     │
   │    [ Enable Radar ]                 │
   │                                     │
   └─────────────────────────────────────┘
       │
       ▼
3. Нажимает «Enable Radar»
       │
       ▼
4. ТОЛЬКО СЕЙЧАС вылезает СИСТЕМНОЕ окно телефона:
   iOS:  "Allow "Bestme" to use your location?"
         • While Using the App  ← рекомендуем
         • Once
         • Don't Allow
   Android: "Allow Bestme to access this device's location?"
         • While using the app  ← рекомендуем
         • Only this time
         • Don't allow
       │
       ├── «While Using» → Радар работает, друзья найдены
       │
       ├── «Once» → Радар работает 1 раз
       │
       └── «Don't Allow» → Экран:
           "Location access is needed to find friends nearby.
            You can enable it in Settings."
           [Go to Settings] → Deep Link
```

---

## 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Find friends nearby | `radar_title` |
| **Body** | Enable the radar to discover Bestme members near you. Your exact location is never shared — only approximate distance is shown. | `radar_description` |
| **Primary Button** | Enable Radar | `enable_radar` |
| **Denied Title** | Location access needed | `location_denied_title` |
| **Denied Body** | Location access is needed to find friends nearby. You can enable it in Settings. | `location_denied_body` |
| **Settings Button** | Go to Settings | `go_to_settings` |

---

## ⚙️ Info.plist (iOS)

```
NSLocationWhenInUseUsageDescription:
"This allows you to discover Bestme members near you on the Radar map. Your exact location is never shared with other users."
```

> ⚠️ **НЕ добавлять** `NSLocationAlwaysUsageDescription` и `NSLocationAlwaysAndWhenInUseUsageDescription` — они не нужны и вызовут вопросы на ревью.

---

## AndroidManifest.xml

```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<!-- НЕ добавлять: android.permission.ACCESS_BACKGROUND_LOCATION -->
```

---

## ⚙️ Логика — когда ОСТАНАВЛИВАТЬ запрос координат

| Событие | Действие |
|---|---|
| Пользователь открыл вкладку «Радар» | `startUpdatingLocation()` |
| Пользователь УШЁЛ с вкладки «Радар» | `stopUpdatingLocation()` ← **ОБЯЗАТЕЛЬНО** |
| Приложение ушло в фон (background) | `stopUpdatingLocation()` ← **ОБЯЗАТЕЛЬНО** |
| Пользователь нажал «Выключить радар» | `stopUpdatingLocation()` |

> Это доказывает Apple/Google что фонового трекинга НЕТ.

---

## 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.** Контролируется на уровне ОС.

| Данные | Хранить? | Примечание |
|---|---|---|
| Точные координаты | ❌ НЕ хранить в БД | Используются только в RAM для расчёта расстояния |
| Приблизительный район (city/area) | ✅ Опционально | Для показа «рядом с вами» без точных координат |
| Расстояние до других пользователей | Только в ответе API | Не сохраняется |

---

## Что нужно в Privacy Policy

Одна строка: *«We use your location data only while you are actively using the Radar feature to show nearby members. Your exact coordinates are never stored or shared with other users. Only approximate distance is displayed.»*
