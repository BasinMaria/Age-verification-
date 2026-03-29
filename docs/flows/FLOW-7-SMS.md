# 📱 ПОТОК 7: SMS Consent (TCPA) и Телефон пользователя

## ⚠️ СТАТУС: НЕ НУЖЕН ДЛЯ MVP

Bestme **НЕ отправляет SMS** пользователям (нет OTP по SMS, нет маркетинговых рассылок).

---

## Содержание

1. [Как телефон работает в BestMe](#1-как-телефон-работает-в-bestme)
2. [Почему TCPA не применяется](#2-почему-tcpa-не-применяется)
3. [Интерфейс — добавление телефона](#3-интерфейс--добавление-телефона)
4. [Что указать в документах](#4-что-указать-в-документах)
5. [Если в будущем добавите отправку SMS](#5-если-в-будущем-добавите-отправку-sms)

---

## 1. Как телефон работает в BestMe

> Номер телефона — это **данные профиля пользователя**, которые он добавляет и контролирует **сам**.
> BestMe = платформа. Мы **НЕ звоним**, **НЕ отправляем SMS**, **НЕ продаём** номера.

| Аспект | Описание |
|---|---|
| **Кто добавляет** | Пользователь сам, добровольно, в настройках профиля |
| **Кто контролирует** | Пользователь — может добавить, изменить, удалить в любой момент |
| **Видимость** | Пользователь **сам выбирает** кто видит телефон (никто / подписчики / все) |
| **BestMe отправляет SMS?** | ❌ **НЕТ** — ни OTP, ни маркетинг, ни уведомления |
| **BestMe продаёт номера?** | ❌ **НЕТ** |
| **BestMe звонит?** | ❌ **НЕТ** |
| **Для чего** | Как визитка — пользователь (обычно бизнес-профиль) публикует свой номер для связи с клиентами |

### Аналогия

Это работает как **Instagram бизнес-профиль** — бизнес ставит телефон в профиль, клиенты видят его и звонят. Платформа не имеет к этому отношения.

---

## 2. Почему TCPA не применяется

| Закон | Требование | Применяется к BestMe? | Почему |
|---|---|---|---|
| [TCPA 47 U.S.C. §227(b)](https://www.law.cornell.edu/uscode/text/47/227) | Согласие на получение SMS от **отправителя** | ❌ **НЕТ** | BestMe **не отправляет** SMS |
| GDPR Art. 6 | Правовое основание для обработки данных | ✅ Да — consent | Пользователь добровольно вводит телефон |
| CCPA | Раскрытие сбора данных | ✅ Да | Указать в Privacy Policy что собираем телефон |

> **TCPA** регулирует **отправку** SMS/звонков. Если компания НЕ отправляет SMS — TCPA не применяется.
> Хранение номера телефона регулируется **GDPR / CCPA** — как любые персональные данные.

---

## 3. Интерфейс — добавление телефона

### 3.1. Экран добавления/изменения телефона

```
┌─────────────────────────────────────┐
│  Phone number                       │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ +1 (XXX) XXX-XXXX          │    │
│  └─────────────────────────────┘    │
│                                     │
│  Who can see your phone number?     │
│                                     │
│  ○ Nobody (private)                 │  ← по умолчанию
│  ○ My followers only                │
│  ○ Everyone                         │
│                                     │
│  ℹ️ Your phone number is stored     │
│  securely. BestMe does NOT call     │
│  or text you at this number.        │
│                                     │
│  [Save]                             │
│                                     │
└─────────────────────────────────────┘
```

### 3.2. Frontend тексты

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Phone number | `phone_number_title` |
| **Input placeholder** | +1 (XXX) XXX-XXXX | `phone_input_placeholder` |
| **Visibility label** | Who can see your phone number? | `phone_visibility_label` |
| **Option: Private** | Nobody (private) | `phone_visibility_private` |
| **Option: Followers** | My followers only | `phone_visibility_followers` |
| **Option: Public** | Everyone | `phone_visibility_public` |
| **Info text** | Your phone number is stored securely. BestMe does NOT call or text you at this number. | `phone_info_text` |
| **Saved** | Phone number saved | `phone_saved` |
| **Removed** | Phone number removed | `phone_removed` |
| **Remove button** | Remove phone number | `phone_remove_button` |

### 3.3. Видимость по умолчанию

| Настройка | Значение по умолчанию | Почему |
|---|---|---|
| **phone_visibility** | `private` (Nobody) | CAADCA + GDPR — минимизация данных. Пользователь СОЗНАТЕЛЬНО выбирает публичность |

### 3.4. Backend

| Поле | Тип | Описание |
|---|---|---|
| `phone_number` | VARCHAR (encrypted) | Номер телефона (AES-256 шифрование) |
| `phone_visibility` | ENUM | `private`, `followers`, `public` — по умолчанию `private` |
| `phone_updated_at` | TIMESTAMP | Когда изменён |

> **Шифрование:** телефон хранится зашифрованным (как и dob_encrypted). В открытом виде показывается только тем, кому пользователь разрешил.

---

## 4. Что указать в документах

### 4.1. Privacy Policy

Добавить в раздел «Data We Collect»:

```
PHONE NUMBER

You may optionally add a phone number to your profile. Your phone
number is:
- Stored securely with encryption at rest
- Visible only to people you choose (private by default)
- NOT used by BestMe to call or text you
- NOT shared with third parties
- NOT sold

You can remove your phone number at any time in Settings > Profile.
```

### 4.2. Terms of Service

Добавить в раздел «Your Account»:

```
PHONE NUMBER

If you add a phone number to your profile, you control who can see
it. BestMe does not use your phone number to contact you. Other
users may use your publicly visible phone number to contact you
directly — BestMe is not responsible for such communications.
```

### 4.3. Community Guidelines

> Уже покрыто секцией «Privacy» — запрещено делиться чужими данными без согласия. Телефон пользователя, который он **сам** опубликовал — его решение.

---

## 5. Если в будущем добавите отправку SMS

> **Когда понадобится:** OTP по SMS, маркетинговые SMS, уведомления через SMS.

| | |
|---|---|
| **Закон** | [TCPA 47 U.S.C. §227(b)](https://www.law.cornell.edu/uscode/text/47/227) — штраф **$1 500** за КАЖДОЕ SMS без согласия |
| **Что нужно** | Отдельный чекбокс согласия **ДО** первого SMS |

### Frontend тексты (для будущего)

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Checkbox** | ☐ I agree to receive SMS from Bestme at this number. Message frequency: as needed (OTP, security, account). Standard SMS rates apply. Reply STOP to opt out. [SMS Communication Policy] | `agree_receive_sms_at_number` |

> Чекбокс **ПУСТОЙ** по умолчанию. При смене номера — согласие СБРАСЫВАЕТСЯ.

### Backend (для будущего)

| Поле | Значение |
|---|---|
| `sms_consent` | `true` / `false` — привязан к ЭТОМУ номеру |
| `sms_consent_at` | Timestamp (UTC) |
| `sms_consent_ip` | IP пользователя |

---

> **Связанные документы:**
> - [COMPLIANCE.md](../../COMPLIANCE.md) — основной документ
> - [LEGAL-DOCUMENTS.md](../LEGAL-DOCUMENTS.md) — юридические документы
> - [DATA-STORAGE.md](../DATA-STORAGE.md) — хранение данных и шифрование
