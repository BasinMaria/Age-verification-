# 🍎 ПОТОК 6: App Tracking Transparency (только iOS)

## ⚠️ СТАТУС: НЕ НУЖЕН ДЛЯ MVP

Bestme **НЕ использует** маркетинговые трекеры (Facebook SDK, AppsFlyer, Adjust, Branch).
Аналитика (Firebase / Apple Analytics) используется только для себя и данные НЕ передаются другим компаниям.

→ ATT можно полностью пропустить в первой версии.

| | |
|---|---|
| **Статус** | ❌ **НЕ НУЖЕН для MVP** — нет рекламных/трекинговых SDK |
| **Когда понадобится** | Если добавите Facebook SDK, AppsFlyer, Adjust, или любой SDK передающий IDFA третьим лицам |
| **Закон** | [Apple §5.1.2(i)](https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing) |
| **Реализация** | Паттерн Permission Priming (2 шага): наш экран объяснения → системный iOS диалог. Задача на 2-3 дня |
