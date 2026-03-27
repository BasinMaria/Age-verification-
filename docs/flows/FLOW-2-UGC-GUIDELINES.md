# 🟢 ПОТОК 2: UGC Community Guidelines

| | |
|---|---|
| **Цель** | Получить явное согласие на правила сообщества перед первой публикацией |
| **Закон** | [Apple App Store §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [Google Play UGC Policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) · [DSA Art. 14](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) |
| **Триггер** | Показывается **1 раз** при **ПЕРВОЙ** попытке создать пост, комментарий, загрузить фото |
| **Блокировка** | Пока согласие не дано — контент **НЕ публикуется**. Кнопка «Accept» заблокирована, пока не поставлена галочка |
| **Важно** | Чекбокс **НЕ pre-checked** — пользователь должен сам поставить галочку |

---

## 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme Community Guidelines | `bestme_community_guidelines_title` |
| **Body intro** | Before publishing your first content, please review our rules. | `before_publishing_first_content_review_rules` |
| **Prohibited 1** | • Child sexual abuse material (CSAM) | `prohibited_csam` |
| **Prohibited 2** | • Hate speech and discrimination | `prohibited_hate_speech_discrimination` |
| **Prohibited 3** | • Threats, bullying, and harassment | `prohibited_threats_bullying_harassment` |
| **Prohibited 4** | • Violence and graphic content | `prohibited_violence_graphic_content` |
| **Prohibited 5** | • Fraud and spam | `prohibited_fraud_spam` |
| **Warning** | Violations will result in content removal and account termination. | `violations_removal_termination` |
| **Links** | [Terms of Service] · [Community Guidelines] | `tos_and_community_guidelines` |
| **Checkbox** | ☐ I agree to the Community Guidelines | `agree_to_community_guidelines` |
| **Primary Button** | Accept and continue | `accept_and_continue` |
| **Cancel Button** | Cancel | `cancel` |

> **Для дизайнера:** Чекбокс = **ПУСТОЙ** по умолчанию (☐, не ☑). Кнопка «Accept and continue» заблокирована (disabled) пока чекбокс не отмечен.

---

## ⚙️ Логика Frontend

```
1. Пользователь впервые нажимает «Создать пост» / «Комментировать» / «Загрузить фото»
       │
       ▼
2. Показать модальное окно Community Guidelines
   Кнопка «Accept and continue» — ЗАБЛОКИРОВАНА (disabled)
       │
       ├── Пользователь ставит галочку ☑ → кнопка активируется
       │       │
       │       └── Нажимает «Accept and continue» → записать согласие → разрешить публикацию
       │
       └── Пользователь нажимает «Cancel» → окно закрывается, контент НЕ публикуется
```

---

## 💾 Backend / База данных

В таблицу `legal_consents_log` записать:

| Поле | Значение |
|---|---|
| `user_id` | ID пользователя |
| `consent_type` | `community_guidelines_accepted` |
| `consent_version` | `1.0` |
| `consented_at` | Timestamp (UTC) |
| `ip_address` | IP пользователя |
