# 🍪 ПОТОК 8: Cookie Consent Banner (ePrivacy / GDPR)

| | |
|---|---|
| **Цель** | Получить согласие на cookies (аналитика, реклама) |
| **Закон** | [ePrivacy Directive 2002/58/EC](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058) · [GDPR Art. 6/7](https://gdpr-info.eu/art-7-gdpr/) · [CNIL Guidelines](https://www.cnil.fr/en/cookies-and-other-tracking-devices) |
| **Когда** | При **первом** посещении web-версии / сайта |
| **Важно** | **НЕ** pre-checked. По умолчанию = «Only essential cookies». ЕС требует **opt-in** |

---

## 🖥️ Frontend тексты

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | We use cookies | `cookie_consent_title` |
| **Body** | Bestme uses cookies to improve your experience. Essential cookies are required for the app to work. Analytics and advertising cookies are optional. | `cookie_consent_description` |
| **Essential** | ✅ Essential cookies (always active) | `cookie_essential_always_active` |
| **Analytics** | ☐ Analytics cookies | `cookie_analytics` |
| **Advertising** | ☐ Advertising cookies | `cookie_advertising` |
| **Accept all** | Accept all | `cookie_accept_all` |
| **Essential only** | Accept essential only | `cookie_accept_essential_only` |
| **Settings** | Cookie settings | `cookie_settings` |

---

## ⚙️ Логика Frontend

```
1. Первое посещение веб-версии
       │
       ▼
2. Cookie Banner внизу экрана
   Essential = ON (нельзя отключить)
   Analytics = OFF, Advertising = OFF
       │
       ├── «Accept all» → все cookies ON
       ├── «Accept essential only» → только essential
       └── «Cookie settings» → детальные настройки
```

---

## 💾 Backend

> Cookie preferences хранить в `localStorage` / cookie браузера. **НЕ** в `legal_consents_log`.
> Для мобильного приложения без WebView с cookies — баннер **НЕ нужен**.
