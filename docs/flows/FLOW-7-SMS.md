# 📱 ПОТОК 7: SMS Consent (TCPA)

## ⚠️ СТАТУС: НЕ НУЖЕН ДЛЯ MVP

Bestme **НЕ отправляет SMS** пользователям (нет OTP по SMS, нет маркетинговых рассылок).

Номер телефона — данные, которые **бизнес-пользователи** публикуют **добровольно** в своём бизнес-профиле для связи с клиентами (как визитка).

| | |
|---|---|
| **Статус** | ❌ **НЕ НУЖЕН для MVP** — Bestme не отправляет SMS |
| **Закон** | [TCPA 47 U.S.C. §227(b)](https://www.law.cornell.edu/uscode/text/47/227) — штраф **$1 500** за КАЖДОЕ SMS без согласия |
| **Когда понадобится** | Если добавите: OTP по SMS, маркетинговые SMS, уведомления через SMS |

---

## Если в будущем добавите отправку SMS — готовая реализация:

**Когда:** При добавлении / изменении номера телефона в Account Settings.

### Frontend тексты

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Input Title** | Phone number: +1 (XXX) XXX-XXXX | `phone_number` |
| **Checkbox** | ☐ I agree to receive SMS from Bestme at this number. Message frequency: as needed (OTP, security, account). Standard SMS rates apply. Reply STOP to opt out. [SMS Communication Policy] | `agree_receive_sms_at_number` |
| **Visibility note** | Your phone is NEVER visible to other users. | `phone_never_visible_to_other_users` |

> Чекбокс **ПУСТОЙ** по умолчанию. При смене номера — согласие СБРАСЫВАЕТСЯ.

### Backend

| Поле | Значение |
|---|---|
| `phone_number` | Новый номер |
| `sms_consent` | `true` / `false` — привязан к ЭТОМУ номеру |
| `sms_consent_at` | Timestamp (UTC) |
| `sms_consent_ip` | IP пользователя |
