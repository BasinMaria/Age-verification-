# 18+ Социальная сеть — Что делать по закону в каждой стране

> **Дата:** Март 2026
> **Проект:** Социальная сеть **18+** с мировым охватом (App Store + Google Play)
> **Модель:** Регистрация только для лиц 18+. Все до 18 — блокируются.
> **Способы входа:** Google, Facebook, Apple Sign-In + собственная регистрация (email, имя, пароль, дата рождения)

### 🌐 Языки

| Что | Языки | Примечание |
|---|---|---|
| **Интерфейс приложения (UI)** | EN, RU, ES, FR, DE, AR, HE | Все экраны, кнопки, тексты, ключи переводов |
| **Юридические документы** (Privacy Policy, Terms of Service) | EN + DE, FR, ES, IT, PT | Только документы. IT и PT — только для документов, НЕ для UI |
| **Community Guidelines** | EN + DE, FR, ES, IT, PT | Юридический документ — те же языки |

> **Важно:** IT (итальянский) и PT (португальский) — нужны **ТОЛЬКО** для юридических документов (Privacy Policy, Terms of Service, Community Guidelines). В интерфейс приложения (UI) на данном этапе эти языки **НЕ добавляются**.

---

## Содержание

1. [🏪 ГЛАВНОЕ — Публикация в магазины (App Store + Google Play)](#1--главное--публикация-в-магазины-app-store--google-play)
2. [✅ ОТКРЫТЫЕ СТРАНЫ — где хватает базовых 8 пунктов](#2--открытые-страны--где-хватает-базовых-8-пунктов)
3. [⛔ ВСЁ ОСТАЛЬНОЕ — ЗАБЛОКИРОВАНО](#3--всё-остальное--заблокировано)
4. [🔓 План постепенной разблокировки](#4--план-постепенной-разблокировки)
5. [Форма даты рождения — при регистрации и через соцсети](#5-форма-даты-рождения--при-регистрации-и-через-соцсети)
6. [📋 Обязательные экраны согласий (Consent Flows)](#6--обязательные-экраны-согласий-consent-flows)
7. [🛡️ Модерация UGC — система жалоб и контент-модерации](#7--модерация-ugc--система-жалоб-и-контент-модерации)
8. [GeoIP — определение страны автоматически](#8-geoip--определение-страны-автоматически)
9. [Какие данные хранить, какие удалять (+ про IP и сессии)](#9-какие-данные-хранить-какие-удалять)
10. [Детальный разбор по каждой стране (с линками на законы)](#10-детальный-разбор-по-каждой-стране-с-линками-на-законы)
11. [📌 ПОЛНЫЙ СПИСОК ВСЕГО НЕОБХОДИМОГО СЕЙЧАС — Master Checklist](#11--полный-список-всего-необходимого-сейчас--master-checklist)
12. [Все ссылки на законы (одним списком)](#все-ссылки-на-законы-одним-списком)

---

## 1. 🏪 ГЛАВНОЕ — Публикация в магазины (App Store + Google Play)

> **Это самое важное.** Без публикации в магазины — ничего не работает.
> Apple и Google НЕ требуют Yoti, ID-верификацию или биометрию.
> Магазинам достаточно: **правильный рейтинг + форма DOB + Privacy Policy.**

---

### 📱 Apple App Store — что нужно для публикации 18+ приложения

| # | Что сделать | Обязательно? | Зачем | Линк (документация Apple) |
|---|---|---|---|---|
| 1 | **Заполнить опросник рейтинга** в App Store Connect (Content Descriptions) | ✅ Да | Apple назначит правильный рейтинг (17+). Отвечай честно: «есть ли UGC?» → да, «есть модерация?» → да, «есть контент для взрослых?» → да. | [App Store Review Guidelines §2.3.6](https://developer.apple.com/app-store/review/guidelines/#legal) |
| 2 | **Получить рейтинг 17+** (или новый рейтинг 18+) | ✅ Да | С июля 2025 Apple добавил рейтинги 13+, 16+, 18+. Для 18+ соцсети — выбери **17+** или **18+**. | [Apple Developer — рейтинги](https://developer.apple.com/news/?id=5iajbof4) |
| 3 | **НЕ ставить в категорию Kids** | ✅ Да | Категория Kids = Families Policy = куча требований. У тебя 18+ → **никогда** Kids. | [App Store Review Guidelines §1.3](https://developer.apple.com/app-store/review/guidelines/) |
| 4 | **Privacy Policy** (ссылка в App Store Connect) | ✅ Да | Обязательна для ВСЕХ приложений. Минимум на EN. Описать: какие данные собираешь, зачем, как удаляешь. | [App Store Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| 5 | **Модерация UGC** (система жалоб + блокировки) | ✅ Да | Apple требует: кнопка «пожаловаться», блокировка пользователей, модерация контента. Без этого — отказ. | [App Store Review Guidelines §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) |
| 6 | **Механизм проверки возраста** в самом приложении | ✅ Да | Форма ввода даты рождения (DOB) — **достаточна** для публикации. Apple НЕ требует ID-верификацию. | [App Store Review Guidelines §1.1](https://developer.apple.com/app-store/review/guidelines/) |
| 7 | Интегрировать **Apple Age Signals API** (для США) | ⚠️ Рекомендуется | Для штатов США с законами о верификации возраста при загрузке. Юта, Луизиана — App Store будет передавать сигнал возраста. | [Apple Developer](https://developer.apple.com/) |

**Резюме Apple:** Рейтинг 17+/18+ + DOB форма + Privacy Policy + модерация UGC = **опубликуют.**

---

### 🤖 Google Play — что нужно для публикации 18+ приложения

| # | Что сделать | Обязательно? | Зачем | Линк (документация Google) |
|---|---|---|---|---|
| 1 | **Указать целевую аудиторию 18+** в Play Console (Target Audience) | ✅ Да | Google спросит: «Для кого ваше приложение?» → выбери **только 18+**. НЕ включай группы ниже 18. | [Play Console — целевая аудитория](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en) |
| 2 | **Заполнить опросник Content Rating** (IARC) | ✅ Да | Google использует IARC. Отвечай честно → получишь рейтинг **18+** / **Adults Only**. | [Play Console — Content Rating](https://support.google.com/googleplay/android-developer/answer/188189?hl=en) |
| 3 | **Включить «Restrict Declared Minors»** | ✅ Да | Запрещает загрузку для аккаунтов, которые Google пометил как несовершеннолетние. **Включи обязательно.** | [Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) |
| 4 | **НЕ включать Families Policy / Designed for Families** | ✅ Да | Families = детское приложение. У тебя 18+ → **никогда** Families. | [Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) |
| 5 | **Privacy Policy** (ссылка в Play Console) | ✅ Да | Обязательна для ВСЕХ приложений. Описать: какие данные, зачем, как удаляешь. | [Play Console — Privacy Policy](https://support.google.com/googleplay/android-developer/answer/9859455?hl=en) |
| 6 | **Data Safety Section** — заполнить | ✅ Да | Google требует декларацию: какие данные собираешь, передаёшь ли третьим лицам, есть ли шифрование. | [Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en) |
| 7 | **Модерация UGC** (система жалоб + блокировки) | ✅ Да | Google требует для приложений с UGC: жалобы, блокировка, модерация. | [User-Generated Content Policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| 8 | **Механизм проверки возраста** в приложении | ✅ Да | DOB форма — **достаточна**. Google НЕ требует ID / биометрию для публикации. | — |
| 9 | Интегрировать **Google Play Age Signals API** (для США) | ⚠️ Рекомендуется | Для штатов с App Store Accountability Act (Юта с мая 2026, Луизиана с июля 2026). | [Age Signals API](https://support.google.com/googleplay/android-developer/answer/16569691?hl=en) |

**Резюме Google Play:** Аудитория 18+ + IARC рейтинг + Restrict Minors + DOB форма + Privacy Policy + Data Safety + модерация UGC = **опубликуют.**

---

### ⚡ Минимум для публикации — сводка

```
╔═══════════════════════════════════════════════════════════════════════╗
║              МИНИМУМ ДЛЯ ПУБЛИКАЦИИ В ОБА МАГАЗИНА                   ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  1. ✅ Рейтинг 17+ / 18+ (Apple) и Adults Only (Google)              ║
║  2. ✅ НЕ в Kids/Families категориях                                  ║
║  3. ✅ «Restrict Declared Minors» включено (Google Play)              ║
║  4. ✅ Форма ввода даты рождения (DOB) при регистрации                ║
║  5. ✅ Блокировка пользователей < 18 лет                              ║
║  6. ✅ Privacy Policy (ссылка в обоих магазинах)                       ║
║  7. ✅ Data Safety заполнена (Google Play)                             ║
║  8. ✅ Модерация UGC: кнопка «пожаловаться» + блокировка юзеров       ║
║                                                                       ║
║  ❌ НЕ нужно для публикации:                                          ║
║  • ID-верификация (Yoti, паспорт и т.п.)                              ║
║  • Биометрия (распознавание лица)                                     ║
║  • eKYC                                                               ║
║  • Проверка кредитной карты                                           ║
║                                                                       ║
║  Всё что выше ❌ — это требования ЗАКОНОВ отдельных стран,             ║
║  а НЕ магазинов. Магазины опубликуют без них.                         ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

## 2. ✅ ОТКРЫТЫЕ СТРАНЫ — где хватает базовых 8 пунктов

> **Принцип: в этих странах хватает РОВНО ТОГО ЧТО НУЖНО ДЛЯ МАГАЗИНОВ.**
> DOB форма + блок < 18 + Privacy Policy = закон соблюдён.
> **Всё остальное — ЗАБЛОКИРОВАНО.**

| Страна | Закон | Линк на закон | Почему хватает наших 8 пунктов |
|---|---|---|---|
| 🇺🇸 **США** (все штаты, включая Калифорнию) | COPPA (16 CFR 312) + CAADCA (AB 2273) | [COPPA](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312) / [CAADCA](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273) | COPPA = для сервисов направленных на детей до 13. Мы 18+ → не подпадаем. Калифорния: нужны профили приватные по умолчанию (это просто настройка, не блокировка) |
| 🇨🇦 **Канада** | PIPEDA | [Justice](https://laws-lois.justice.gc.ca/eng/acts/p-8.6/) | Нет спец. требований к 18+ сервису. DOB хватает |
| 🇪🇺 **ЕС** (27 стран, включая Францию, Германию + Латвия, Литва, Эстония) | GDPR Art. 8 + DSA Art. 28 | [GDPR Art. 8](https://gdpr-info.eu/art-8-gdpr/) / [DSA Art. 28](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | **GDPR Art. 8 = ВОЗРАСТНОЙ закон**: каждая страна ЕС устанавливает «возраст цифрового согласия» (от 13 до 16). Мы блокируем ВСЕХ < 18 → автоматически соблюдаем ВСЕ 27 стран (см. таблицу ниже) |
| 🇯🇵 **Япония** | Нет спец. закона | — | Нет закона о верификации возраста в соцсетях. DOB хватает |
| 🇮🇱 **Израиль** | Нет спец. закона (март 2026) | — | Спец. закона нет. Мониторить |
| 🇮🇳 **Индия** | DPDP Act 2023, §9 | [IndiaCode](https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf) | Метод верификации не определён регулятором. DOB хватает (пока). Мониторить |
| 🇺🇦 **Украина** | Закон «О защите персональных данных» (№ 2297-VI) | [Рада](https://zakon.rada.gov.ua/laws/show/2297-17) | Нет спец. требований к верификации возраста. DOB хватает |
| 🇰🇿 **Казахстан** | Закон «О персональных данных» (№ 94-V) | [adilet.zan.kz](https://adilet.zan.kz/rus/docs/Z1300000094) | Нет спец. закона о верификации возраста. DOB хватает |
| 🇬🇪 **Грузия** | Закон «О защите персональных данных» (2011) | [matsne.gov.ge](https://matsne.gov.ge/en/document/view/1561437) | Ориентируется на стандарты ЕС. DOB хватает |
| 🇦🇲 **Армения** | Закон «О защите персональных данных» (2015) | [arlis.am](https://www.arlis.am/documentview.aspx?docID=98818) | DOB хватает. Нет спец. требований |
| 🇦🇿 **Азербайджан** | Закон «О персональных данных» (2010) | [e-qanun.az](https://e-qanun.az/framework/19957) | DOB хватает. Нет спец. требований |
| 🇲🇩 **Молдова** | Закон «О защите персональных данных» (№ 133, 2011) | [legis.md](https://www.legis.md/cautare/getResults?doc_id=110584) | Ориентируется на ЕС. DOB хватает |
| 🇺🇿 **Узбекистан** | Закон «О персональных данных» (2019) | [lex.uz](https://lex.uz/docs/4396428) | DOB хватает. Нет спец. требований |
| 🇰🇬 **Кыргызстан** | Закон «О персональных данных» (2008) | — | DOB хватает |
| 🇹🇯 **Таджикистан** | — | — | Нет спец. закона. DOB хватает |

### Что мы делаем во ВСЕХ открытых странах — ровно 8 пунктов:

```
  1. ✅ Рейтинг 17+ / 18+ (Apple) и Adults Only (Google)
  2. ✅ НЕ в Kids/Families категориях
  3. ✅ «Restrict Declared Minors» включено (Google Play)
  4. ✅ Форма ввода даты рождения (DOB) при регистрации
  5. ✅ Блокировка пользователей < 18 лет
  6. ✅ Privacy Policy (ссылка в обоих магазинах)
  7. ✅ Data Safety заполнена (Google Play)
  8. ✅ Модерация UGC: кнопка «пожаловаться» + блокировка юзеров
```

**И ВСЁ. Больше ничего не нужно для этих стран.**

### Для Калифорнии — одна дополнительная настройка (не блокировка!)

Калифорния (CAADCA) требует «максимальные настройки приватности по умолчанию». Это значит:
- **Профиль = приватный по умолчанию** (пользователь сам может сделать публичным)
- **Геолокация = выключена по умолчанию** (пользователь сам включает)
- **Push-уведомления = минимальные по умолчанию**

Это НЕ блокировка. Это просто настройки по умолчанию — полезны для ВСЕХ пользователей.

### Для ЕС — Privacy Policy (уже входит в наши 8 пунктов)

Privacy Policy нужна на EN + основные языки (DE, FR, ES, IT, PT). Описать:
1. Сбор DOB (цель: проверка возраста, удаление сразу)
2. GeoIP (цель: определение юрисдикции)
3. Правовое основание: [GDPR Art. 6(1)(b)](https://gdpr-info.eu/art-6-gdpr/)
4. Cookie consent banner (если есть куки)

### ❗ Почему могут ОТКАЗАТЬ в публикации (Apple / Google) — ВСЕ возможные причины для 18+ соцсети

> Это не про законы стран. Это про правила МАГАЗИНОВ.
> Если магазин откажет — приложение не будет доступно НИГДЕ.

| # | Причина отказа | Правило | Как избежать | Линк |
|---|---|---|---|---|
| 1 | **Нет модерации UGC** — нет кнопки «пожаловаться», нет блокировки юзеров | Apple §1.2, Google UGC Policy | Реализовать: кнопка жалобы + блокировка + модерация контента | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) / [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| 2 | **Нет Privacy Policy** | Apple §5.1.1, Google обязательно | Опубликовать Privacy Policy и указать ссылку в обоих магазинах | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| 3 | **Неправильный рейтинг** — указал что контент безопасный, а есть UGC для взрослых | Apple §2.3.6, Google IARC | Честно ответить на опросник рейтинга → получить 17+/18+ | [Apple §2.3.6](https://developer.apple.com/app-store/review/guidelines/#legal) |
| 4 | **В категории Kids/Families** а контент 18+ | Apple §1.3, Google Families | НЕ ставить в Kids. Указать 18+ аудиторию | [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) |
| 5 | **Нет проверки возраста** при 18+ контенте | Apple §1.1, Google правила | Реализовать DOB форму — этого достаточно | [Apple §1.1](https://developer.apple.com/app-store/review/guidelines/) |
| 6 | **Data Safety не заполнена** (Google Play) | Google обязательно | Заполнить Data Safety Section: какие данные, зачем, шифрование | [Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en) |
| 7 | **Приложение не работает / крашится** | Обе платформы | Протестировать перед отправкой | — |
| 8 | **Нелегальный контент** (детская порнография, терроризм) | Обе платформы | Модерация + правила сообщества | — |
| 9 | **Спам / скам / мошенничество** | Обе платформы | Реальное приложение с реальной функциональностью | — |
| 10 | **Restrict Declared Minors НЕ включен** (Google Play) при 18+ контенте | Google Families Policy | Включить «Restrict Declared Minors» в Play Console | [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) |

**Если все 8 пунктов выполнены → причин для отказа НЕТ.**

---

## 3. ⛔ ВСЁ ОСТАЛЬНОЕ — ЗАБЛОКИРОВАНО

> **Принцип: заблокированы ТОЛЬКО эти 9 стран. Все остальные страны мира — ОТКРЫТЫ** (наших 8 пунктов хватает).
> Не нарушаем закон = не работаем в этой стране.
> Разблокируем потихоньку, по мере разработки.

### Список заблокированных стран (конкретные коды для GeoIP)

| Страна | Код | Почему блокируем | Что требует закон КРОМЕ наших 8 пунктов | Закон | Линк | Штраф |
|---|---|---|---|---|---|---|
| 🇬🇧 **Великобритания** | `GB` | DOB = самодекларация → Ofcom говорит: **НЕ считается** | ID/паспорт, facial age estimation (Yoti), Open Banking | **Online Safety Act 2023** | [Legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2023/50/contents) | до **10% мирового дохода** |
| 🇦🇺 **Австралия** | `AU` | DOB **НЕ считается**. Жёсткий запрет до 16 | Biometric / eKYC | **Online Safety Amendment Act 2024** | [Legislation.gov.au](https://www.legislation.gov.au/C2024A00127/asmade) | до **AUD $49.5 млн** |
| 🇧🇷 **Бразилия** | `BR` | Самодекларация **ЗАПРЕЩЕНА** прямо в законе | ID-верификация | **Digital ECA** (Lei 15.211/2025) | [Planalto.gov.br](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Lei/L15211.htm) | до **10% дохода в Бразилии** |
| 🇨🇳 **Китай** | `CN` | Обязательна регистрация по **нац. ID**. Без китайского партнёра — невозможно | Национальный ID + китайский партнёр | **Положение 2024** + **PIPL** | [ChinaLawTranslate](https://www.chinalawtranslate.com/en/online-protection-of-minors/) | Блокировка сервиса |
| 🇰🇷 **Юж. Корея** | `KR` | Обязательна верификация через **гос. систему** (i-PIN) | i-PIN / мобильная верификация | **PIPA** Art. 22-2 | [KLRI](https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62389&type=part&key=4) | Значительные штрафы |
| 🇲🇾 **Малайзия** | `MY` | Обязательная **eKYC** для всех соцсетей с 2026 | eKYC по нац. документу | **Online Safety Act 2025** | [MayerBrown](https://www.mayerbrown.com/en/insights/publications/2025/12/malaysias-proposed-social-media-ban-for-children-how-it-compares-with-australia-and-singapore) | до **RM 10 млн** |
| 🇷🇺 **Россия** | `RU` | Данные граждан РФ **обязательно хранить на серверах в РФ**. Без серверов в РФ — нарушение закона. Роскомнадзор заблокирует | Серверы в РФ + регистрация в реестре ОРИ | **ФЗ-152** «О персональных данных» | [consultant.ru](http://www.consultant.ru/document/cons_doc_LAW_61801/) | Блокировка + штрафы |
| 🇧🇾 **Беларусь** | `BY` | Строгий гос. контроль интернета. Сервис могут заблокировать без предупреждения | — | Закон «О персональных данных» (99-З) | [pravo.by](https://pravo.by/document/?guid=12551&p0=H12100099) | Блокировка |
| 🇹🇲 **Туркменистан** | `TM` | Интернет практически закрыт. Единственный провайдер — гос. «Туркментелеком». Нет рынка | — | — | — | — |

### Как блокировать (код)

```javascript
// На бэкенде: проверка при регистрации и при входе
const BLOCKED_COUNTRIES = ['GB', 'AU', 'BR', 'CN', 'KR', 'MY', 'RU', 'BY', 'TM'];

function checkCountryAccess(countryCode) {
  if (BLOCKED_COUNTRIES.includes(countryCode)) {
    return {
      allowed: false,
      message: 'Our service is not yet available in your country. ' +
               'We are working on expanding availability.'
    };
  }
  return { allowed: true };
}
```

### Что показывать заблокированным пользователям

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  К сожалению, наш сервис пока недоступен        │
│  в вашей стране.                                │
│                                                 │
│  We're sorry, our service is not yet            │
│  available in your country.                     │
│                                                 │
│  Мы работаем над расширением.                   │
│  We are working on expanding availability.      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Почему блокировка — это законно и безопасно

- Ты **не нарушаешь закон** страны, если ты **НЕ предоставляешь** сервис в этой стране.
- UK Online Safety Act, австралийский закон, Digital ECA — все применяются только к платформам, которые **работают** в данной юрисдикции.
- Если пользователь из UK зайдёт через VPN — это его ответственность, не твоя (при условии что ты приняла «разумные меры» = GeoIP блокировку).
- **Это стандартная практика** — Netflix, Hulu, множество сервисов блокируют страны.

---

## 4. 🔓 План постепенной разблокировки

> Заблокировала → запустилась → заработала → начинаешь разблокировать по одной стране.

| Приоритет | Страна | Что нужно интегрировать | Провайдер | Стоимость | Срок | Линк |
|---|---|---|---|---|---|---|
| **1** | 🇬🇧 **UK** | Yoti (facial age estimation) или OneID (Open Banking) | Yoti / OneID | $0.10–0.50 / проверка | 2–4 нед. | [Yoti](https://www.yoti.com/business/age-verification/) / [OneID](https://oneid.uk/) |
| **2** | 🇦🇺 **Австралия** | Yoti или Persona (eKYC) | Yoti / Persona | $0.10–0.50 / проверка | 2–4 нед. | [Yoti](https://www.yoti.com/) / [Persona](https://withpersona.com/) |
| **3** | 🇧🇷 **Бразилия** | ID-верификация (Persona / Yoti) | Persona / Yoti | $0.20–1.00 / проверка | 3–6 нед. | [Persona](https://withpersona.com/) |
| **4** | 🇰🇷 **Юж. Корея** | i-PIN / мобильная верификация | Корейский провайдер | Индивидуально | 2–3 мес. | — |
| **5** | 🇲🇾 **Малайзия** | eKYC-провайдер | Индивидуально | Индивидуально | 2–3 мес. | — |
| **6** | 🇷🇺 **Россия** | Серверы в РФ + регистрация в реестре ОРИ | — | Дорого | 3–6 мес. | — |
| **—** | 🇨🇳 **Китай** | Нац. ID + китайский партнёр | — | Очень дорого | 6+ мес. | — |
| **—** | 🇧🇾 **Беларусь** | Оценка рисков | — | — | Неизвестно | — |
| **—** | 🇹🇲 **Туркменистан** | Нет рынка, не планируем | — | — | — | — |

### Как это работает

```
СЕЙЧАС (запуск):
  ✅ Базовые 8 пунктов для всех
  ✅ GeoIP для определения страны
  ✅ Блок < 18
  ✅ Блок стран: GB, AU, BR, CN, KR, MY, RU, BY, TM
  ✅ Открыто: США, Канада, ЕС (27 стран), Япония, Израиль, Индия,
     Украина, Казахстан, Грузия, Армения, Азербайджан, Молдова,
     Узбекистан, Кыргызстан, Таджикистан
     + все остальные страны (у них нет спец. законов → наших 8 пунктов хватает)
  ⛔ Заблокировано ТОЛЬКО: GB, AU, BR, CN, KR, MY, RU, BY, TM

ЧЕРЕЗ 1 МЕСЯЦ:
  🔓 Интегрировала Yoti → разблокируй UK + Австралию

ЧЕРЕЗ 2 МЕСЯЦА:
  🔓 Интегрировала ID-check → разблокируй Бразилию

ЧЕРЕЗ 3+ МЕСЯЦА:
  🔓 Нашла корейского провайдера → разблокируй Юж. Корею
  🔓 Нашла eKYC для Малайзии → разблокируй Малайзию

КОГДА-НИБУДЬ:
  🔓 Поставила серверы в РФ → разблокируй Россию
  🔓 Нашла китайского партнёра → разблокируй Китай
```

---

## 5. Форма даты рождения — при регистрации и через соцсети

> **ВАЖНО: Проверка возраста через DOB = ОБЯЗАТЕЛЬНА для ВСЕХ способов регистрации.**
> Неважно как пользователь входит (email, Google, Facebook, Apple) — он ВСЕГДА видит форму DOB.

### Собственная регистрация (email + имя + пароль)

```
Форма регистрации:
  - Email          ← уже есть
  - Имя            ← уже есть
  - Пароль         ← уже есть
  - Дата рождения  ← ДОБАВИТЬ (день / месяц / год)
```

### Вход через Google / Facebook / Apple

**Почему мы НЕ можем полагаться на возраст из соцсети:**

| Провайдер | Передаёт DOB? | Почему нельзя на это полагаться | Что делать |
|---|---|---|---|
| **Google** | Редко (зависит от scope `profile`) | 1) DOB может быть скрыт в настройках Google 2) Даже если получим — это самодекларация, а не проверка 3) Не все scope дают birthday | **ВСЕГДА** показать форму DOB |
| **Facebook** | Редко (нужно `user_birthday` permission) | 1) Нужно пройти App Review у Facebook 2) Разрешение может быть отклонено 3) Пользователь мог указать фейковую дату | **ВСЕГДА** показать форму DOB |
| **Apple** | **Никогда** | Apple принципиально НЕ передаёт возраст/DOB. Только email + имя. | **ВСЕГДА** показать форму DOB |

**Вывод: при ЛЮБОМ способе входа — ВСЕГДА показывать форму DOB.**

### Полный поток регистрации через соцсеть

```
1. Пользователь нажимает «Войти через Google/Facebook/Apple»
       │
       ▼
2. Получаем от провайдера: email + имя
   (НЕ получаем: возраст, дату рождения)
       │
       ▼
3. Проверяем GeoIP → определяем страну
       │
       ├── Страна в списке заблокированных (GB, AU, BR, CN, KR, MY, RU, BY, TM)?
       │   └── ДА → Показать сообщение «Сервис недоступен в вашей стране» → СТОП
       │
       └── НЕТ → Продолжаем
              │
              ▼
4. Показываем экран DOB:
   ┌─────────────────────────────────────┐
   │  Для завершения регистрации         │
   │  укажите дату рождения:             │
   │                                     │
   │  [ДД] / [ММ] / [ГГГГ]              │
   │                                     │
   │  Дата используется ТОЛЬКО для       │
   │  проверки возраста и НЕ сохраняется │
   │                                     │
   │         [ Продолжить ]              │
   └─────────────────────────────────────┘
       │
       ▼
5. Рассчитать возраст:
   └── < 18 → «Извините, сервис только для 18+» → ОТКАЗАТЬ → НЕ создавать аккаунт
   └── >= 18 → Продолжить регистрацию
       │
       ▼
6. Сохранить в базу: { email, name, age_bracket: "18+", country: "US" }
   УДАЛИТЬ дату рождения (НЕ сохранять!)
       │
       ▼
7. Выдать JWT токен → пользователь вошёл
```

### 🖥️ DOB экран — тексты и ключи переводов (для соцсети и обычной регистрации)

> Стиль как у Pinterest — простой экран с полем даты рождения (см. скриншот).

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Enter your birthdate | `enter_your_birthdate` |
| **Body** | To help keep Bestme safe, we require your birthdate. Your birthdate won't be visible on your profile. | `birthdate_required_for_safety` |
| **Input placeholder** | mm/dd/yyyy | `date_format_placeholder` |
| **Hint** | Use your own birthday, even if this is a business account. | `use_own_birthday_hint` |
| **Primary Button** | Add birthdate | `add_birthdate` |
| **Error (< 18)** | Sorry, Bestme is only available for users 18 and older. | `sorry_18_plus_only` |
| **Privacy note** | Your date of birth is used ONLY for age verification and is NOT stored. | `dob_not_stored_privacy_note` |

> **Для дизайнера:** Формат даты зависит от локали пользователя (mm/dd/yyyy для US, dd/mm/yyyy для EU).
> Экран блокирует навигацию — пользователь НЕ может закрыть экран или пропустить.

### Защита от обхода DOB-проверки

| Проблема | Решение |
|---|---|
| Пользователь вводит фейковую дату (30 лет назад) | Это **самодекларация** — наша ответственность ограничена. Мы применяем «разумные меры» (DOB форма). Законы большинства стран это принимают |
| Пользователь повторно регистрируется с другой датой | Привязываем проверку к email. Если email уже в базе → «аккаунт уже существует» |
| Пользователь < 18 обходит через VPN из заблокированной страны | VPN → другая страна → получает DOB форму → если вводит < 18 → блок. Мы приняли «разумные меры» (GeoIP + DOB) |

---

## 6. 📋 Обязательные экраны согласий (Consent Flows)

> **Все экраны ниже — ОБЯЗАТЕЛЬНЫ для публикации.**
> Без них App Store / Google Play **отклонят** приложение, или мы нарушим закон.
> Каждый экран привязан к конкретному закону / правилу магазина.
> Для каждого указаны: тексты для frontend, ключи переводов, логика UI, требования к backend.

```
ПОРЯДОК ПОКАЗА ЭКРАНОВ (после успешной регистрации / входа):

  Регистрация (email ИЛИ Google/Facebook/Apple)
       │
       ▼
  DOB → проверка возраста (Секция 5)
       │
       ▼
  ПОТОК 1: GDPR Privacy Defaults — профиль публичный
  (один раз, ПЕРЕД лентой)
       │
       ▼
  → Пользователь попадает в Ленту (Feed)
       │
       ├── Первая попытка создать пост/комментарий/фото →
       │   ПОТОК 2: UGC Community Guidelines
       │
       ├── Push-уведомления (онбординг или первая попытка) →
       │   ПОТОК 3: Push Notifications Permission
       │
       ├── Первое фото с камеры →
       │   ПОТОК 4: Camera Permission
       │
       ├── Первый выбор из галереи →
       │   ПОТОК 5: Photos Permission
       │
       ├── Первый запуск на iOS 14.5+ (если есть аналитика/реклама) →
       │   ПОТОК 6: App Tracking Transparency (только iOS)
       │
       ├── Добавление/изменение номера телефона →
       │   ПОТОК 7: SMS Consent
       │
       └── Веб-версия / сайт (если есть cookies) →
           ПОТОК 8: Cookie Consent Banner
```

---

### 🔵 ПОТОК 1: GDPR Privacy Defaults — Welcome Screen

| | |
|---|---|
| **Цель** | Уведомить пользователя о видимости профиля по умолчанию |
| **Закон** | [GDPR Art. 25(2)](https://gdpr-info.eu/art-25-gdpr/) — «Data protection by default» |
| **Триггер** | Показывается **1 раз** сразу после успешной регистрации, **ПЕРЕД** лентой (Feed) |
| **Блокировка** | Пользователь **НЕ МОЖЕТ** пользоваться приложением, пока не нажмёт кнопку согласия |
| **Важно** | После нажатия → переход на Feed (ленту), больше не показывается |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Welcome to Bestme | `welcome_to_bestme` |
| **Body 1** | Your profile is visible to other users by default. | `profile_visible_by_default` |
| **Body 2** | This means your name, photos, and public posts can be seen by all members of the platform. | `name_photos_posts_visible` |
| **Body 3** | You can change this at any time in Settings → [Privacy & Visibility]. | `change_in_settings_privacy_visibility` |
| **Body 4** | Your email, phone number, and date of birth are ALWAYS hidden from other users. | `email_phone_dob_always_hidden` |
| **Primary Button** | I understand, continue | `i_understand_continue` |
| **Footer** | By continuing, you agree to our [Terms of Service] and [Privacy Policy]. | `by_continuing_agree_terms_privacy` |

> **Примечание:** `[Privacy & Visibility]`, `[Terms of Service]`, `[Privacy Policy]` — это ссылки внутри текста.

#### ⚙️ Логика Frontend

```
1. Пользователь завершил регистрацию (DOB проверен, >= 18)
       │
       ▼
2. Показать Welcome Screen (ПОТОК 1)
   Экран блокирует навигацию — нельзя закрыть, нельзя перейти куда-либо
       │
       ▼
3. Пользователь нажимает «I understand, continue»
       │
       ▼
4. Записать согласие в backend → перейти на Feed (лента)
   Экран больше НИКОГДА не показывается этому пользователю
```

#### 💾 Backend / База данных

В таблицу `legal_consents_log` записать:

| Поле | Значение |
|---|---|
| `user_id` | ID пользователя |
| `consent_type` | `privacy_defaults_acknowledged` |
| `consent_version` | `1.0` (версия текста) |
| `consented_at` | Timestamp (UTC) |
| `ip_address` | IP пользователя (для GDPR proof) |

---

### 🟢 ПОТОК 2: UGC Community Guidelines

| | |
|---|---|
| **Цель** | Получить явное согласие на правила сообщества перед первой публикацией |
| **Закон** | [Apple App Store §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [Google Play UGC Policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| **Триггер** | Показывается **1 раз** при **ПЕРВОЙ** попытке создать пост, комментарий, загрузить фото |
| **Блокировка** | Пока согласие не дано — контент **НЕ публикуется**. Кнопка «Accept» заблокирована, пока не поставлена галочка |
| **Важно** | Чекбокс **НЕ pre-checked** — пользователь должен сам поставить галочку (явное действие) |

#### 🖥️ Frontend тексты и ключи переводов

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

> **Важно для дизайнера:** Чекбокс должен быть **ПУСТЫМ** по умолчанию (☐, не ☑). Кнопка «Accept and continue» заблокирована (disabled/greyed out) пока чекбокс не отмечен.

#### ⚙️ Логика Frontend

```
1. Пользователь впервые нажимает «Создать пост» / «Комментировать» / «Загрузить фото»
       │
       ▼
2. Показать модальное окно Community Guidelines
   Кнопка «Accept and continue» — ЗАБЛОКИРОВАНА (disabled)
       │
       ├── Пользователь ставит галочку ☑ → кнопка «Accept and continue» активируется
       │       │
       │       └── Нажимает «Accept and continue» → записать согласие → разрешить публикацию
       │
       └── Пользователь нажимает «Cancel» → окно закрывается, контент НЕ публикуется
```

#### 💾 Backend / База данных

В таблицу `legal_consents_log` записать:

| Поле | Значение |
|---|---|
| `user_id` | ID пользователя |
| `consent_type` | `community_guidelines_accepted` |
| `consent_version` | `1.0` |
| `consented_at` | Timestamp (UTC) |
| `ip_address` | IP пользователя |

---

### 🔔 ПОТОК 3: Push Notifications Permission

| | |
|---|---|
| **Цель** | Объяснить зачем нужны push-уведомления ПЕРЕД системным диалогом |
| **Закон** | [Google Play User Data Policy](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [App Store Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | Показывается **ДО** системного диалога запроса разрешений. На этапе онбординга или при первой попытке отправить уведомление |
| **Блокировка** | Экран можно **пропустить**, нажав «Not now» |
| **Важно** | Должен быть в потоке использования, не только в Privacy Policy |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme wants to send you notifications | `notifications_permission_title` |
| **Body intro** | We use push notifications to keep you updated on: | `notifications_permission_description` |
| **Bullet 1** | • Messages from friends | `notifications_messages_from_friends` |
| **Bullet 2** | • Important account security alerts | `notifications_security_alerts` |
| **Bullet 3** | • Comments on your posts | `notifications_comments_on_posts` |
| **Marketing note** | Marketing notifications are only sent with your explicit consent. | `marketing_notifications_consent` |
| **Settings note** | You can turn them off at any time in Settings → Notifications. | `turn_off_notifications_in_settings` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

#### ⚙️ Логика Frontend

```
1. Показать наш экран с объяснением (Prominent Disclosure)
       │
       ├── Пользователь нажимает «Continue»
       │       │
       │       ▼
       │   Вызвать стандартное СИСТЕМНОЕ окно iOS/Android:
       │   «"Bestme" Would Like to Send You Notifications: Allow / Don't Allow»
       │       │
       │       ├── Allow → push_notifications_enabled = true
       │       └── Don't Allow → push_notifications_enabled = false
       │
       └── Пользователь нажимает «Not now»
               │
               ▼
           Окно закрывается, системный запрос НЕ вызывается
           (оставляем попытку на потом)
```

#### 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.**
> Запрос пушей регулируется на уровне ОС (iOS/Android хранит статус).

Для бэкенда: в таблице пользователя (`users` или таблице настроек уведомлений) обновить:

| Поле | Значение |
|---|---|
| `push_notifications_enabled` | `true` / `false` — по результату системного окна iOS/Android |

---

### 📷 ПОТОК 4: Camera Permission

| | |
|---|---|
| **Цель** | Объяснить зачем нужен доступ к камере ПЕРЕД системным диалогом |
| **Закон** | [Google Play User Data Policy — Prominent Disclosure](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [App Store Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | При **первой** попытке сделать фото/видео внутри приложения (аватарка, пост) |
| **Блокировка** | Можно пропустить «Not now», но тогда действие (создание поста) прервётся |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Bestme needs access to your camera | `camera_permission_title` |
| **Body intro** | We use your camera so you can: | `camera_permission_description` |
| **Bullet 1** | • Take photos and videos for your posts | `camera_permission_take_photos_videos_posts` |
| **Bullet 2** | • Update your profile picture | `camera_permission_update_profile_picture` |
| **Bullet 3** | • Capture moments to share with friends | `camera_permission_capture_moments_share_friends` |
| **Settings note** | You can change this access at any time in your device settings. | `camera_permission_change_in_device_settings` |
| **Primary Button** | Continue | `continue` |
| **Secondary Button** | Not now | `not_now` |

#### ⚙️ Логика Frontend

```
1. Пользователь впервые нажимает «Сделать фото» / «Снять видео»
       │
       ▼
2. Показать наш экран с объяснением (Prominent Disclosure)
       │
       ├── «Continue» → вызвать системное окно:
       │   «"Bestme" Would Like to Access the Camera: Allow / Don't Allow»
       │       │
       │       ├── Allow → открыть камеру, продолжить
       │       └── Don't Allow → вернуть на предыдущий экран
       │
       └── «Not now» → закрыть, вернуть на предыдущий экран, действие прервано
```

#### 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.**
> Доступ к камере контролируется на уровне ОС. Бэкенду не нужны юридические логи.

---

### 🖼️ ПОТОК 5: Photos (Gallery) Permission

| | |
|---|---|
| **Цель** | Объяснить зачем нужен доступ к галерее ПЕРЕД системным диалогом |
| **Закон** | [Google Play User Data Policy — Prominent Disclosure](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) · [App Store Review Guidelines §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) |
| **Триггер** | При **первой** попытке выбрать фото из галереи телефона |
| **Блокировка** | Можно пропустить «Not now», но тогда действие прервётся |

#### 🖥️ Frontend тексты и ключи переводов

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

#### ⚙️ Логика Frontend

```
1. Пользователь впервые нажимает «Выбрать из галереи»
       │
       ▼
2. Показать наш экран с объяснением (Prominent Disclosure)
       │
       ├── «Continue» → вызвать системное окно:
       │   «"Bestme" Would Like to Access Your Photos: Allow / Don't Allow»
       │       │
       │       ├── Allow → открыть галерею, продолжить
       │       └── Don't Allow → вернуть на предыдущий экран
       │
       └── «Not now» → закрыть, вернуть на предыдущий экран, действие прервано
```

#### 💾 Backend / База данных

> **НЕ нужно записывать в `legal_consents_log`.**
> Доступ к фото контролируется на уровне ОС.

---

### 🍎 ПОТОК 6: App Tracking Transparency (только iOS)

| | |
|---|---|
| **Цель** | Получить разрешение на отслеживание (IDFA) на iOS |
| **Закон** | [Apple App Store §5.1.2(i)](https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing) · [App Tracking Transparency (ATT)](https://developer.apple.com/documentation/apptrackingtransparency) |
| **Когда** | При первом запуске на iPhone/iPad с iOS 14.5+, если используются SDK аналитики/рекламы (Facebook Ads, Google Ads, Amplitude, Mixpanel и т.п.) |
| **Реализация** | Системный iOS диалог через `NSUserTrackingUsageDescription` |
| **Обязательность** | **Без этого диалога App Store НЕ пропустит приложение** |
| **Блокировка** | Пользователь должен явно выбрать (Allow / Ask App Not to Track). Без ответа доступ к IDFA невозможен |

#### 🖥️ Frontend тексты

**Info.plist (обязательный ключ):**

| Элемент | Текст (EN) | Ключ |
|---|---|---|
| `NSUserTrackingUsageDescription` | Bestme uses your data to improve feed personalization and in-app analytics. You can withdraw consent anytime in iPhone Settings → Bestme. | `data_usage_personalization_analytics` + `withdraw_consent_iphone_settings_bestme` |

> iOS автоматически подставит этот текст в системный pop-up.

**Soft prompt (наш собственный экран ПЕРЕД системным, рекомендуется для повышения % согласий):**

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | Help us improve your Bestme experience | `help_improve_bestme_experience` |
| **Body** | To provide you with more relevant content and analytics, we'll ask for permission to use app activity data. You're in control and can revoke this later in iPhone Settings. | `permission_use_app_activity_data` + `revoke_later_in_iphone_settings` |
| **Primary Button** | OK | `ok` |
| **Secondary Button** | Learn more | `learn_more` |

#### ⚙️ Логика Frontend

```
1. Первый запуск приложения на iOS 14.5+
       │
       ▼
2. (Опционально) Показать наш soft prompt
       │
       ├── «OK» → перейти к шагу 3
       └── «Learn more» → показать подробности → потом к шагу 3
              │
              ▼
3. Вызвать системный ATT диалог:
   ATTrackingManager.requestTrackingAuthorization()
       │
       ├── .authorized → IDFA доступен, analytics_tracking = true
       ├── .denied → IDFA НЕ доступен, analytics_tracking = false
       └── .notDetermined → ещё не решил (ждём)
```

> **⚠️ ЗАПРЕЩЕНО** использовать IDFA без явного согласия. Это приводит к **блокировке приложения** в App Store.

#### 💾 Backend / База данных

> Хранить в базе этот выбор **НЕ обязательно** — iOS сама хранит статус.

Для внутренней аналитики можно записать:

| Поле | Значение |
|---|---|
| `analytics_enabled` | `true` / `false` — в таблице user preferences |

---

### 📱 ПОТОК 7: SMS Consent (TCPA)

| | |
|---|---|
| **Цель** | Получить легальное согласие на отправку SMS |
| **Закон** | [TCPA 47 U.S.C. §227(b)](https://www.law.cornell.edu/uscode/text/47/227) — штраф **$1 500** за КАЖДОЕ SMS без письменного согласия |
| **Когда** | При добавлении / изменении номера телефона в Account Settings |
| **Реализация** | Форма ввода номера с чекбоксом согласия |
| **Важно** | Чекбокс **НЕ pre-checked** (явный opt-in) |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Input Title** | Phone number: +1 (XXX) XXX-XXXX | `phone_number` |
| **Checkbox** | ☐ I agree to receive SMS from Bestme at this number. Message frequency: as needed (OTP, security, account). Standard SMS rates apply. Reply STOP to opt out. [SMS Communication Policy] | `agree_receive_sms_at_number` |
| **Frequency** | Message frequency: as needed | `sms_frequency_as_needed` |
| **Rates** | Standard SMS rates apply. | `standard_sms_rates_apply` |
| **Opt-out** | Reply STOP to opt out. | `reply_stop_to_opt_out` |
| **Policy link** | [SMS Communication Policy] | `sms_communication_policy` |
| **Visibility note** | Your phone is NEVER visible to other users (phone_visibility = Only Me). | `phone_never_visible_to_other_users` |
| **Save Button** | Save | `save` |
| **Cancel Button** | Cancel | `cancel` |

> **Важно для дизайнера:** Чекбокс должен быть **ПУСТЫМ** по умолчанию (☐, не ☑).

#### ⚙️ Логика Frontend

```
1. Пользователь нажимает «Add phone» или «Edit» номер в Account Settings
       │
       ▼
2. Показать форму ввода номера + чекбокс
   Чекбокс = ПУСТОЙ по умолчанию
       │
       ├── Если пользователь МЕНЯЕТ существующий номер на НОВЫЙ:
       │   → Чекбокс автоматически ОЧИЩАЕТСЯ (нужно новое согласие для нового номера)
       │
       ├── «Save» → отправить на сервер: { phone, sms_consent: true/false }
       │
       └── «Cancel» → закрыть, номер НЕ обновляется, старое согласие остаётся
```

#### 💾 Backend / База данных

| Поле | Значение |
|---|---|
| `phone_number` | Новый номер |
| `sms_consent` | `true` / `false` — привязан строго к ЭТОМУ номеру |
| `sms_consent_at` | Timestamp (UTC) — точное время согласия |
| `sms_consent_ip` | IP пользователя — для аудита TCPA |

> **ВАЖНО:** Если номер изменился → старое согласие **больше не действует**. Новое согласие = для нового номера.
> Для защиты от штрафов TCPA: вместе со статусом `true` перезаписывать timestamp + IP.

---

### 🍪 ПОТОК 8: Cookie Consent Banner (ePrivacy / GDPR)

| | |
|---|---|
| **Цель** | Получить согласие на использование cookies (аналитика, реклама) |
| **Закон** | [ePrivacy Directive 2002/58/EC](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058) (ЕС) · [GDPR Art. 6/7](https://gdpr-info.eu/art-7-gdpr/) · [CNIL Guidelines](https://www.cnil.fr/en/cookies-and-other-tracking-devices) (Франция) |
| **Когда** | При **первом** посещении web-версии / сайта приложения. Для мобильного приложения — при наличии WebView с куками или SDK аналитики на веб-ресурсах |
| **Блокировка** | Пользователь может отказаться (нажать «Reject non-essential»). Обязательные (strictly necessary) куки работают без согласия |
| **Важно** | **НЕ** pre-checked. По умолчанию выбрано «Only essential cookies». ЕС требует **opt-in**, не opt-out |

#### 🖥️ Frontend тексты и ключи переводов

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Title** | We use cookies | `cookie_consent_title` |
| **Body** | Bestme uses cookies to improve your experience. Essential cookies are required for the app to work. Analytics and advertising cookies are optional. | `cookie_consent_description` |
| **Essential label** | ✅ Essential cookies (always active) | `cookie_essential_always_active` |
| **Analytics label** | ☐ Analytics cookies | `cookie_analytics` |
| **Advertising label** | ☐ Advertising cookies | `cookie_advertising` |
| **Primary Button** | Accept all | `cookie_accept_all` |
| **Secondary Button** | Accept essential only | `cookie_accept_essential_only` |
| **Tertiary link** | Cookie settings | `cookie_settings` |
| **Privacy link** | [Privacy Policy] | `privacy_policy_link` |

> **Для дизайнера:** По умолчанию Analytics и Advertising = **ВЫКЛЮЧЕНЫ** (☐). Только Essential = включён всегда и нельзя отключить. Это требование ЕС (opt-in, не opt-out).

#### ⚙️ Логика Frontend

```
1. Пользователь впервые открывает веб-версию / сайт
       │
       ▼
2. Показать Cookie Banner внизу экрана
   Essential cookies = ON (нельзя отключить)
   Analytics = OFF по умолчанию
   Advertising = OFF по умолчанию
       │
       ├── «Accept all» → включить все cookies, закрыть баннер
       │
       ├── «Accept essential only» → только essential, закрыть баннер
       │
       └── «Cookie settings» → показать детальные настройки с toggle для каждого типа
```

#### 💾 Backend / База данных

> Cookie preferences **НЕ нужно** записывать в `legal_consents_log`.
> Хранить cookie consent preference в `localStorage` / cookie самого браузера.
> Для мобильного приложения: если нет WebView с cookies — этот баннер **НЕ нужен** (SDK-аналитика регулируется через ПОТОК 6 ATT на iOS и через Play consent на Android).

---

### 🔴 ПОТОК 9: Delete Account (GDPR Art. 17(2)) — 🚧 В РАЗРАБОТКЕ

| | |
|---|---|
| **Цель** | Дать пользователю возможность удалить аккаунт с объяснением де-индексации |
| **Закон** | [GDPR Art. 17(2)](https://gdpr-info.eu/art-17-gdpr/) — право на удаление + уведомление третьих лиц · [Apple Account Deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) |
| **Статус** | 🚧 В процессе разработки — тексты и логика будут добавлены позже |

---

### 📊 Сводная таблица: какие потоки хранить в `legal_consents_log`

| Поток | Записывать в `legal_consents_log`? | Почему |
|---|---|---|
| **ПОТОК 1** GDPR Privacy Defaults | ✅ **ДА** | Нужно доказательство для GDPR (суд) |
| **ПОТОК 2** UGC Community Guidelines | ✅ **ДА** | Нужно доказательство для Apple/Google и для модерации |
| **ПОТОК 3** Push Notifications | ❌ НЕТ | Контролируется ОС (iOS/Android) |
| **ПОТОК 4** Camera | ❌ НЕТ | Контролируется ОС |
| **ПОТОК 5** Photos | ❌ НЕТ | Контролируется ОС |
| **ПОТОК 6** ATT (iOS) | ❌ НЕТ | Контролируется iOS |
| **ПОТОК 7** SMS Consent | ✅ **ДА** (в отдельной таблице) | TCPA требует доказательство согласия |
| **ПОТОК 8** Cookie Consent | ❌ НЕТ | Хранится в localStorage/cookie браузера |

---

## 7. 🛡️ Модерация UGC — система жалоб и контент-модерации

> **ОБЯЗАТЕЛЬНО для публикации в App Store и Google Play.**
> Без модерации UGC — **отказ в публикации**.
> Законы: [Apple App Store §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [Google Play UGC Policy](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) · [DSA Art. 16](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) (ЕС)

### Что ОБЯЗАТЕЛЬНО реализовать

| # | Требование | Закон / Правило | Что делать | Линк |
|---|---|---|---|---|
| 1 | **Кнопка «Пожаловаться»** (Report) на каждом посте/комментарии/профиле | Apple §1.2, Google UGC, DSA Art. 16 | Кнопка → выбор причины → отправка на сервер | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) |
| 2 | **Блокировка пользователей** (Block user) | Apple §1.2, Google UGC | Пользователь может заблокировать другого → контент скрыт | [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| 3 | **Контент-модерация** (удаление контента) | Apple §1.2, Google UGC | Модераторы / автоматика удаляют нарушающий контент | — |
| 4 | **Community Guidelines** (правила сообщества) | Apple §1.2, Google UGC, DSA Art. 14 | Опубликовать правила + показать при первой публикации (ПОТОК 2) | [DSA Art. 14](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) |
| 5 | **Механизм обжалования** (Appeal) | DSA Art. 20 (ЕС) | Пользователь может оспорить удаление контента | [DSA Art. 20](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) |
| 6 | **Уведомление о результате жалобы** | DSA Art. 17 (ЕС) | Сообщить заявителю о результате рассмотрения | [DSA Art. 17](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) |

### 🖥️ Frontend тексты и ключи переводов — Report

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Report button** | Report | `report_button` |
| **Report title** | Report this content | `report_this_content` |
| **Reason: Spam** | Spam or misleading | `report_reason_spam` |
| **Reason: Hate** | Hate speech or discrimination | `report_reason_hate` |
| **Reason: Violence** | Violence or threats | `report_reason_violence` |
| **Reason: CSAM** | Child exploitation (CSAM) | `report_reason_csam` |
| **Reason: Harassment** | Bullying or harassment | `report_reason_harassment` |
| **Reason: Nudity** | Nudity or sexual content | `report_reason_nudity` |
| **Reason: Fraud** | Fraud or scam | `report_reason_fraud` |
| **Reason: Other** | Other | `report_reason_other` |
| **Submit button** | Submit report | `submit_report` |
| **Confirmation** | Thank you. We will review this report within 24 hours. | `report_submitted_confirmation` |

### 🖥️ Frontend тексты и ключи переводов — Block User

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Block button** | Block user | `block_user_button` |
| **Confirm** | Block @{username}? They won't be able to see your profile or contact you. | `block_user_confirm` |
| **Blocked** | You have blocked @{username}. | `user_blocked_confirmation` |
| **Unblock** | Unblock | `unblock_button` |

### 🖥️ Frontend тексты и ключи переводов — Content Removal Notice

| Элемент | Текст (EN) | Ключ перевода |
|---|---|---|
| **Notice title** | Content removed | `content_removed_title` |
| **Notice body** | Your content was removed for violating our Community Guidelines: {reason}. | `content_removed_reason` |
| **Appeal link** | If you believe this was a mistake, you can [appeal this decision]. | `content_removed_appeal` |
| **Appeal button** | Appeal | `appeal_button` |
| **Appeal submitted** | Your appeal has been submitted. We will review it within 48 hours. | `appeal_submitted_confirmation` |

---

## 8. GeoIP — определение страны автоматически

**Определяй страну автоматически по IP-адресу. Не нужно спрашивать пользователя.**

### Как работает

```
Пользователь открывает приложение
    │
    ▼
Сервер видит IP-адрес → GeoIP-сервис → код страны (US, DE, AU...)
    │
    ▼
Применяем правила для этой страны (пустить / заблокировать)
    │
    ▼
НЕ сохраняем IP-адрес — только код страны
```

### Какой сервис использовать

| Сервис | Цена | Точность | Рекомендация |
|---|---|---|---|
| **Cloudflare** (заголовок `CF-IPCountry`) | Бесплатно (если используешь CF) | ~99% | ✅ Лучший вариант — страна уже приходит в заголовке |
| **MaxMind GeoLite2** | Бесплатно | ~99% | ✅ Хостишь базу у себя, без внешних запросов |
| **ipinfo.io** | Бесплатно до 50K/мес | ~99% | ✅ Простой REST API |

> **Ссылки:**
> - Cloudflare CF-IPCountry: https://developers.cloudflare.com/fundamentals/reference/http-request-headers/#cf-ipcountry
> - MaxMind GeoLite2: https://dev.maxmind.com/geoip/geolite2-free-geolocation-data
> - ipinfo.io: https://ipinfo.io/

### Юридические требования к GeoIP

| Что | Почему | Закон |
|---|---|---|
| НЕ хранить IP-адрес | IP = персональные данные по GDPR | [GDPR Recital 30](https://gdpr-info.eu/recitals/no-30/) |
| Написать в Privacy Policy что используешь GeoIP | Прозрачность | [GDPR Art. 13](https://gdpr-info.eu/art-13-gdpr/) |
| Дать возможность изменить страну | Право на исправление (VPN, путешествия) | [GDPR Art. 16](https://gdpr-info.eu/art-16-gdpr/) |
| Законная основа — «законный интерес» | Определение юрисдикции для compliance | [GDPR Art. 6(1)(f)](https://gdpr-info.eu/art-6-gdpr/) |

---

## 9. Какие данные хранить, какие удалять

| Данные | Хранить? | Причина | Закон |
|---|---|---|---|
| **Дата рождения** | ❌ **УДАЛИТЬ СРАЗУ** | Минимизация данных | [GDPR Art. 5(1)(c)](https://gdpr-info.eu/art-5-gdpr/), [COPPA §312.7](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312/section-312.7) |
| **Возрастная группа** (`18+` / `under18`) | ✅ Да | Контроль доступа | — |
| **Страна** (код) | ✅ Да | Определение юрисдикции | — |
| **IP-адрес** | ❌ **НЕ ХРАНИТЬ** после GeoIP | IP = персональные данные | [GDPR Recital 30](https://gdpr-info.eu/recitals/no-30/) |

### ❓ «Если не хранить IP — как поддерживать сессию?»

**Сессия НЕ привязана к IP-адресу.** Это разные вещи:

```
IP-адрес = адрес сети, откуда пришёл запрос.
             Используется ТОЛЬКО для GeoIP (определить страну).
             После определения страны — УДАЛЯЕТСЯ.

Сессия = авторизованный вход пользователя.
             Поддерживается через ТОКЕН (JWT) или COOKIE.
             НЕ зависит от IP-адреса.
```

**Как работает сессия без хранения IP:**

```
1. Пользователь регистрируется / входит
       │
       ▼
2. Сервер создаёт ТОКЕН (JWT или session ID)
       │
       ▼
3. Токен отправляется пользователю (в cookie или в ответе API)
       │
       ▼
4. При каждом следующем запросе пользователь отправляет ТОКЕН
       │
       ▼
5. Сервер проверяет токен → знает кто это → даёт доступ
       │
       ▼
   IP-адрес вообще НЕ участвует в сессии!
```

**Пример (Node.js / Express):**
```javascript
// При входе — создаём JWT токен
const token = jwt.sign(
  { userId: user.id, ageBracket: '18+', country: 'US' },
  SECRET_KEY,
  { expiresIn: '30d' }
);
// Отправляем токен пользователю
res.cookie('session', token, { httpOnly: true, secure: true });

// При каждом запросе — проверяем токен (НЕ IP)
function authMiddleware(req, res, next) {
  const token = req.cookies.session;       // ← токен из cookie
  const decoded = jwt.verify(token, SECRET_KEY);  // ← проверка
  req.user = decoded;                      // ← знаем кто это
  next();
  // IP-адрес здесь вообще НЕ нужен и НЕ сохраняется
}
```

**Почему IP НЕ нужен для сессии:**
- Токен (JWT / cookie) — это «паспорт» пользователя. Он уникален.
- IP-адрес может меняться (Wi-Fi → мобильная сеть → VPN) — если бы сессия была на IP, она бы слетала при каждом переключении.
- **Ни одна** современная платформа не привязывает сессию к IP. Все используют токены.

**Когда IP используется — и сразу удаляется:**
```
Запрос приходит на сервер
    │
    ├── IP → GeoIP сервис → код страны (например "DE")
    │         └── IP больше не нужен → НЕ сохраняем
    │
    └── Cookie/JWT → идентификация пользователя → сессия
```

### Важно

- DOB НЕ должна попадать в логи, аналитику, бэкапы.
- Расчёт возраста → запись `age_bracket` → удаление DOB — всё в одной транзакции.
- Если у тебя серверные логи записывают тела запросов — убери DOB из логирования.
- IP-адрес тоже не должен попадать в логи надолго — настрой ротацию логов (макс. 7 дней) или замаскируй IP в логах.

### GDPR — права пользователей на удаление данных (обязательно для ЕС)

> Это НЕ только про возраст. Это требования GDPR к ЛЮБОЙ обработке данных.
> Но для публикации в магазины — нужна Privacy Policy, а в ней описать эти права.

| Право | Статья GDPR | Что должно быть в приложении | Линк |
|---|---|---|---|
| **Право на удаление** (right to erasure) | Art. 17 | Кнопка «Удалить мой аккаунт» → удаляет ВСЕ данные пользователя (профиль, посты, сообщения) | [Art. 17](https://gdpr-info.eu/art-17-gdpr/) |
| **Право на доступ** (right of access) | Art. 15 | Пользователь может запросить копию ВСЕХ своих данных. Реализовать: экспорт в JSON/CSV | [Art. 15](https://gdpr-info.eu/art-15-gdpr/) |
| **Право на исправление** | Art. 16 | Пользователь может изменить свои данные (имя, email и т.д.) | [Art. 16](https://gdpr-info.eu/art-16-gdpr/) |
| **Право на перенос данных** | Art. 20 | Пользователь может забрать свои данные (тот же экспорт JSON) | [Art. 20](https://gdpr-info.eu/art-20-gdpr/) |
| **Уведомление о утечке** | Art. 33 | Если утечка → уведомить регулятор в 72 часа, пользователей — без задержки | [Art. 33](https://gdpr-info.eu/art-33-gdpr/) |

> **Apple тоже требует**: с 2022 все приложения должны иметь функцию **удаления аккаунта**.
> Это совпадает с GDPR Art. 17. Одна реализация = две птицы одним ударом.
> [Apple — Account Deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/)

---

## 10. Детальный разбор по каждой стране (с линками на законы)

> Подробности по каждой стране — если нужно разобраться детально.
> Краткую сводку см. в [Секции 2 (простые страны)](#2--где-проще-всего-запуститься--страны-где-dob-достаточно) и [Секции 3 (блокировать)](#3--что-блокировать--страны-с-жёсткими-требованиями).

---

### 🇺🇸 США (федеральный уровень)

| | |
|---|---|
| **Что делать** | DOB достаточно. Собирай дату рождения → блокируй < 18 → удаляй DOB сразу. |
| **Почему этого хватит** | COPPA применяется к сервисам «направленным на детей до 13» или имеющим «фактическое знание» о детях. Если ты 18+ и блокируешь всех < 18, COPPA на тебя НЕ распространяется. Но: если узнаешь что пользователь < 13 — обязана удалить его данные. |
| **Закон** | **COPPA** — Children's Online Privacy Protection Act, 16 CFR Part 312 |
| **Линк** | https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312 |
| **Штраф** | до $53 088 за каждое нарушение |

---

### 🇺🇸 Калифорния

| | |
|---|---|
| **Что делать** | DOB достаточно. **Блокировать Калифорнию НЕ нужно.** Нужно просто сделать настройки приватности «максимальными по умолчанию». |
| **Что значит «максимальные настройки приватности»** — конкретно: | |

**Вот что конкретно нужно сделать для Калифорнии (и это полезно для всех пользователей):**

| # | Что сделать | Пример | Зачем |
|---|---|---|---|
| 1 | **Профиль приватный по умолчанию** | При регистрации: `profile_visibility = "private"`, НЕ `"public"`. Пользователь может сам изменить на public. | Закон требует «высокие настройки приватности по умолчанию» |
| 2 | **Геолокация выключена по умолчанию** | НЕ запрашивать GPS при первом входе. Включать ТОЛЬКО если пользователь сам нажмёт «показать моё местоположение». | Закон запрещает отслеживать точную геолокацию без явного согласия |
| 3 | **Нет таргетированной рекламы по умолчанию** | Если показываешь рекламу — показывай КОНТЕКСТНУЮ (по тематике), а НЕ по поведению/профилю пользователя. | Закон запрещает профилирование без согласия |
| 4 | **Данные DOB — только для проверки возраста** | После проверки возраста → удалить DOB. Нельзя использовать DOB для рекомендаций, аналитики, рекламы. | Закон прямо запрещает использовать данные age estimation для других целей |
| 5 | **Уведомления — минимальные по умолчанию** | Включены только «критические» push (безопасность, пароль). Остальные — выключены, пользователь сам включает. | Часть «privacy by default» |

| | |
|---|---|
| **Почему НЕ нужно блокировать** | Всё что требует CAADCA — это просто правильные настройки по умолчанию. Это несложно, и это хорошая практика для ВСЕХ пользователей, не только калифорнийских. |
| **Закон** | **CAADCA** — California Age-Appropriate Design Code Act (AB 2273, California Civil Code §1798.99.28–99.40) |
| **Линк на закон** | https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273 |
| **Решение суда** | Ninth Circuit, март 2026: https://www.hklaw.com/en/insights/publications/2026/03/ninth-circuit-issues-mixed-ruling-on-california-age-appropriate-design |
| **Вывод** | ✅ Просто сделай приватность по умолчанию максимальной → Калифорния не проблема. |

---

### 🇺🇸 Техас, Юта, Вирджиния, Луизиана

| Штат | Закон | Линк | Комментарий |
|---|---|---|---|
| **Техас** | HB 18 | [Capitol](https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=HB18) | Согласие родителя для < 18. Ты блокируешь < 18 → соблюдён |
| **Юта** | SB 152 | [Legislature](https://le.utah.gov/~2023/bills/static/SB0152.html) | Аналогично. App Store Accountability Act (май 2026) — обязанность Apple/Google, не твоя |
| **Вирджиния** | SB 854 | [Legislature](https://lis.virginia.gov/bill-details/20251/SB854) | Ограничения для < 18. Ты блокируешь < 18 |
| **Луизиана** | HB 570 | [Legislature](https://www.legis.la.gov/legis/BillInfo.aspx?s=25RS&b=HB570) | Аналогично (июль 2026) |

---

### 🇺🇸 KOSA (федеральный законопроект — ЕЩЁ НЕ ПРИНЯТ)

| | |
|---|---|
| **Статус** | Законопроект S.1748 — перевнесён в Сенат в мае 2025. На март 2026 **НЕ принят**. *(последняя проверка: март 2026)* |
| **Если примут** | Duty of care, отключение «аддиктивных» функций для < 17, ежегодные аудиты. Для 18+ — минимальное влияние. |
| **Линк** | https://www.congress.gov/bill/119th-congress/senate-bill/1748 |
| **Действие** | Ничего. Мониторить. |

---

### 🇨🇦 Канада

| | |
|---|---|
| **Что делать** | DOB достаточно. |
| **Закон** | **PIPEDA** — Personal Information Protection and Electronic Documents Act |
| **Линк** | https://laws-lois.justice.gc.ca/eng/acts/p-8.6/ |
| **Примечание** | Обсуждается законопроект о запрете соцсетей для < 16 — пока НЕ принят. Мониторить. |

---

### 🇪🇺 Евросоюз (27 стран) — ПОДРОБНО

> **Главный вопрос: достаточно ли наших 8 пунктов для ЕС?**
> **Ответ: ДА.** Потому что мы блокируем ВСЕХ < 18, а самый высокий возраст цифрового согласия в ЕС = 16.
> Мы превышаем требования КАЖДОЙ страны ЕС.

#### Что такое GDPR Art. 8 — это ВОЗРАСТНОЙ закон

**GDPR Статья 8** — «Условия применения согласия ребёнка в отношении услуг информационного общества»:
- Устанавливает **минимальный возраст**, с которого ребёнок может **самостоятельно** дать согласие на обработку данных в онлайн-сервисах
- По умолчанию = **16 лет**
- Каждая страна ЕС может СНИЗИТЬ до **13 лет** (но не ниже)
- Ниже этого возраста → нужно согласие родителя
- **Линк на статью**: https://gdpr-info.eu/art-8-gdpr/

**Мы блокируем < 18 → автоматически соблюдаем ВСЕ страны ЕС.** Не нужно знать, 13 или 16 — мы блокируем всех до 18.

#### Таблица: возраст цифрового согласия в КАЖДОЙ стране ЕС

| Страна | Возраст цифрового согласия (GDPR Art. 8) | Национальный закон | Линк | Наши 8 пунктов хватает? |
|---|---|---|---|---|
| 🇦🇹 **Австрия** | **14** | DSG §4(4) | [RIS](https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10001597) | ✅ Мы блокируем < 18, хватит |
| 🇧🇪 **Бельгия** | **13** | Закон от 30.07.2018, Art. 7 | [Ejustice](https://www.ejustice.just.fgov.be/cgi_loi/change_lg.pl?language=fr&la=F&cn=2018073046&table_name=loi) | ✅ |
| 🇧🇬 **Болгария** | **14** | LPDP Art. 25а | [Lex.bg](https://lex.bg/laws/ldoc/2135426048) | ✅ |
| 🇭🇷 **Хорватия** | **16** (по умолчанию GDPR) | GDPR напрямую | — | ✅ |
| 🇨🇾 **Кипр** | **14** | Закон 125(I)/2018, Art. 8 | [CyLaw](http://www.cylaw.org/nomoi/enop/non-ind/2018_1_125/full.html) | ✅ |
| 🇨🇿 **Чехия** | **15** | Zákon č. 110/2019 Sb., §7 | [Zakonyprolidi](https://www.zakonyprolidi.cz/cs/2019-110) | ✅ |
| 🇩🇰 **Дания** | **13** | Databeskyttelsesloven §6(2) | [Retsinformation](https://www.retsinformation.dk/eli/lta/2018/502) | ✅ |
| 🇪🇪 **Эстония** | **13** | IKS §1011 | [Riigiteataja](https://www.riigiteataja.ee/akt/104012019011) | ✅ |
| 🇫🇮 **Финляндия** | **13** | Tietosuojalaki 1050/2018, §5 | [Finlex](https://www.finlex.fi/fi/laki/ajantasa/2018/20181050) | ✅ |
| 🇫🇷 **Франция** | **15** | Loi 78-17 (модиф.), Art. 45 | [Legifrance](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037090394/) | ✅ |
| 🇩🇪 **Германия** | **16** (по умолчанию GDPR) | GDPR напрямую + BDSG | [Gesetze-im-Internet](https://www.gesetze-im-internet.de/bdsg_2018/) | ✅ |
| 🇬🇷 **Греция** | **15** | Ν. 4624/2019, Art. 21 | [Kodiko](https://www.kodiko.gr/nomothesia/document/543861/nomos-4624-2019) | ✅ |
| 🇭🇺 **Венгрия** | **16** (по умолчанию GDPR) | Infotörvény | [Net.jogtar](https://net.jogtar.hu/jogszabaly?docid=a1100112.tv) | ✅ |
| 🇮🇪 **Ирландия** | **16** (по умолчанию GDPR) | DPA 2018, §31 | [Irishstatutebook](https://www.irishstatutebook.ie/eli/2018/act/7/enacted/en/html) | ✅ |
| 🇮🇹 **Италия** | **14** | D.Lgs. 101/2018, Art. 2-quinquies | [Normattiva](https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2018-08-10;101) | ✅ |
| 🇱🇻 **Латвия** | **13** | FPDPL, §17 | [Likumi.lv](https://likumi.lv/ta/id/300099-fizisko-personu-datu-apstrades-likums) | ✅ |
| 🇱🇹 **Литва** | **14** | ADATĮ, Art. 6 | [E-seimas](https://www.e-tar.lt/portal/lt/legalAct/TAP-f1a3e08d8e5f8259a72827afe027534a) | ✅ |
| 🇱🇺 **Люксембург** | **16** (по умолчанию GDPR) | Loi du 1er août 2018 | [Legilux](https://legilux.public.lu/eli/etat/leg/loi/2018/08/01/a686/jo) | ✅ |
| 🇲🇹 **Мальта** | **13** | DPA Cap. 586, Art. 3 | [Legislation.mt](https://legislation.mt/eli/cap/586/eng/pdf) | ✅ |
| 🇳🇱 **Нидерланды** | **16** (по умолчанию GDPR) | UAVG Art. 5 | [Wetten.nl](https://wetten.overheid.nl/BWBR0040940/) | ✅ |
| 🇵🇱 **Польша** | **16** (по умолчанию GDPR) | Ustawa z 10.05.2018 | [Isap.sejm.gov.pl](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20180001000) | ✅ |
| 🇵🇹 **Португалия** | **13** | Lei 58/2019, Art. 16 | [DRE](https://dre.pt/dre/detalhe/lei/58-2019-123815982) | ✅ |
| 🇷🇴 **Румыния** | **16** (по умолчанию GDPR) | Legea 190/2018 | [Legislatie.just.ro](https://legislatie.just.ro/Public/DetaliiDocument/201381) | ✅ |
| 🇸🇰 **Словакия** | **16** (по умолчанию GDPR) | Zákon 18/2018, §15 | [Slov-lex](https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2018/18/) | ✅ |
| 🇸🇮 **Словения** | **15** | ZVOP-2, Art. 6 | [Pisrs.si](http://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO8233) | ✅ |
| 🇪🇸 **Испания** | **14** | LOPDGDD Art. 7 | [BOE](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673) | ✅ |
| 🇸🇪 **Швеция** | **13** | Kompletterande dataskyddslag (2018:218) | [Riksdagen](https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-2018218-med-kompletterande-bestammelser-till_sfs-2018-218/) | ✅ |

**Итог по ЕС:**
- Максимальный возраст в ЕС = **16** (Германия, Ирландия, Нидерланды, Люксембург, Венгрия, Хорватия, Польша, Румыния, Словакия)
- Мы блокируем < **18** → превышаем требования ВСЕХ 27 стран
- **Наших 8 пунктов ДОСТАТОЧНО** для ВСЕГО ЕС

#### Что ещё требует GDPR кроме возраста (и что мы делаем)

| Требование GDPR | Статья | Что мы делаем | Линк |
|---|---|---|---|
| **Privacy Policy** — описать какие данные, зачем, как удаляем | Art. 13, 14 | Уже в наших 8 пунктах (пункт 6) | [Art. 13](https://gdpr-info.eu/art-13-gdpr/) |
| **Правовое основание** для обработки данных | Art. 6 | Используем Art. 6(1)(b) — необходимость для исполнения договора (регистрация = договор) | [Art. 6](https://gdpr-info.eu/art-6-gdpr/) |
| **Минимизация данных** — собирать только необходимое | Art. 5(1)(c) | Собираем DOB → проверяем возраст → УДАЛЯЕМ DOB. Храним только `age_bracket` | [Art. 5](https://gdpr-info.eu/art-5-gdpr/) |
| **Право на удаление** — пользователь может попросить удалить свои данные | Art. 17 | Реализовать кнопку «Удалить мой аккаунт» | [Art. 17](https://gdpr-info.eu/art-17-gdpr/) |
| **Право на доступ** — пользователь может запросить копию своих данных | Art. 15 | Реализовать экспорт данных (JSON/CSV) | [Art. 15](https://gdpr-info.eu/art-15-gdpr/) |
| **Право на перенос** — пользователь может забрать свои данные | Art. 20 | Тот же экспорт данных | [Art. 20](https://gdpr-info.eu/art-20-gdpr/) |
| **Уведомление о утечке** — при утечке сообщить в 72 часа | Art. 33 | План реагирования на инциденты | [Art. 33](https://gdpr-info.eu/art-33-gdpr/) |
| **Представитель в ЕС** — если нет офиса в ЕС | Art. 27 | Назначить после запуска (до первого юзера из ЕС) | [Art. 27](https://gdpr-info.eu/art-27-gdpr/) |

#### DSA Art. 28 — дополнительное требование ЕС (с февраля 2024)

**Digital Services Act (DSA), Статья 28** — «Защита несовершеннолетних онлайн»:
- Платформы обязаны принять **«соразмерные меры»** для высокого уровня приватности и безопасности несовершеннолетних
- Нельзя показывать **таргетированную рекламу** на основе профилирования несовершеннолетних
- **Линк**: https://eur-lex.europa.eu/eli/reg/2022/2065/oj (Art. 28)
- **Мы блокируем < 18 → несовершеннолетних НЕТ на платформе → DSA Art. 28 соблюдён автоматически**

| | |
|---|---|
| **Что делать** | DOB + Privacy Policy + GDPR compliance. Если нет офиса в ЕС → назначить представителя (Art. 27). |
| **Законы** | **GDPR** (EU) 2016/679 — **Статья 8** (возраст), **Статья 17** (удаление), **Статья 5** (минимизация); **DSA** (EU) 2022/2065 — **Статья 28** (защита несовершеннолетних) |
| **Линки** | GDPR: https://gdpr-info.eu/ • Art. 8 (дети): https://gdpr-info.eu/art-8-gdpr/ • Art. 6 (основания): https://gdpr-info.eu/art-6-gdpr/ • Art. 17 (удаление): https://gdpr-info.eu/art-17-gdpr/ • Art. 27 (представитель): https://gdpr-info.eu/art-27-gdpr/ • DSA: https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| **Штрафы** | GDPR: до **€20 млн или 4% мирового оборота** • DSA: до **6% мирового оборота** |

---

### 🇫🇷 Франция

| | |
|---|---|
| **Что делать** | DOB + Privacy Policy на FR. Закон об ID для соцсетей пока НЕ принят. |
| **Возрастной закон** | **GDPR Art. 8 → Франция установила 15 лет** (Loi 78-17, Art. 45). Мы блокируем < 18 → соблюдён |
| **Закон о порносайтах** | **Loi n° 2024-449** — обязательная верификация для ПОРНОСАЙТОВ (не соцсетей). Мы = соцсеть, НЕ порносайт → этот закон НЕ применяется |
| **Законопроект о соцсетях** | Обсуждается законопроект об обязательной ID-верификации для соцсетей — **НЕ принят** на март 2026. Мониторить |
| **Линки** | Loi 2024-449: https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049563651 • GDPR Art. 8 Франция: https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000037090394/ |

---

### 🇩🇪 Германия

| | |
|---|---|
| **Что делать** | DOB + Privacy Policy на DE. Для 18+ — достаточно. |
| **Возрастной закон** | **GDPR Art. 8 → Германия = 16 лет** (по умолчанию GDPR). Мы блокируем < 18 → соблюдён |
| **JuSchG** | **Jugendschutzgesetz** — закон о защите молодёжи. Требует рейтинг для контента. Для 18+ сервиса: рейтинг 18+ + DOB достаточно |
| **Закон** | **GDPR** (напрямую) + **BDSG** (нем. закон о защите данных) + **JuSchG** |
| **Линки** | JuSchG: https://www.gesetze-im-internet.de/juschg/ • BDSG: https://www.gesetze-im-internet.de/bdsg_2018/ |

---

### 🇬🇧 Великобритания — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Ofcom: самодекларация (DOB) — **НЕ «высокоэффективная»** проверка. |
| **Закон** | **Online Safety Act 2023** (c.50) |
| **Линк на закон** | https://www.legislation.gov.uk/ukpga/2023/50/contents |
| **Ofcom руководства** | https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/online-safety-regulatory-documents • https://www.ofcom.org.uk/online-safety/protecting-children/ |
| **Штраф** | до **10% мирового дохода** |
| **Допустимые методы** | ID/паспорт, facial age estimation (Yoti), Open Banking (OneID), мобильный оператор, кредитная карта |
| **НЕдопустимые** | Самодекларация (DOB), чекбокс «мне 18+» |
| **Провайдеры** | [Yoti](https://www.yoti.com/business/age-verification/) • [OneID](https://oneid.uk/) • [AgeChecked](https://agechecked.com/) |

---

### 🇦🇺 Австралия — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Самодекларация НЕ считается. Жёсткий запрет до 16 — родители НЕ могут дать согласие. |
| **Закон** | **Online Safety Amendment (Social Media Minimum Age) Act 2024** (No. 127) |
| **Линк на закон** | https://www.legislation.gov.au/C2024A00127/asmade |
| **eSafety** | https://www.esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions |
| **Штраф** | до **AUD $49.5 млн** (~$32М USD) |
| **Провайдеры** | [Yoti](https://www.yoti.com/) • [Persona](https://withpersona.com/) • [IDnow](https://www.idnow.io/) |

---

### 🇧🇷 Бразилия — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Digital ECA **запрещает** самодекларацию. Требует «надёжные и проверяемые» механизмы. |
| **Закон** | **Lei nº 15.211/2025** — Digital ECA — вступил в силу **17 марта 2026** |
| **Линк на закон** | https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Lei/L15211.htm |
| **Анализ** | https://www.demarest.com.br/en/eca-digital-nova-lei-de-protecao-de-criancas-e-adolescentes-no-ambiente-digital/ |
| **Штраф** | до **10% дохода в Бразилии**, приостановка, запрет |

---

### 🇨🇳 Китай — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Обязательна регистрация по реальному имени (нац. ID). Без китайского партнёра — невозможно. |
| **Закон** | Положение о защите несовершеннолетних онлайн (2024) + Закон о кибербезопасности + PIPL |
| **Линки** | EN: https://www.chinalawtranslate.com/en/online-protection-of-minors/ • CN: https://www.gov.cn/zhengce/content/202310/content_6911288.htm |

---

### 🇰🇷 Южная Корея — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Обязательна верификация через гос. систему (i-PIN / мобильный привязанный к реальному имени). |
| **Закон** | **PIPA** Art. 22-2 |
| **Линк** | https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62389&type=part&key=4 • https://www.pipc.go.kr/eng/user/lgp/law/lawDetail.do |

---

### 🇮🇳 Индия

| | |
|---|---|
| **Что делать** | DOB достаточно (пока). Метод верификации не определён регулятором. |
| **Закон** | **DPDP Act 2023**, Section 9 |
| **Линки** | PDF: https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf • §9: https://indiankanoon.org/doc/98869575/ |
| **Примечание** | Мониторить DPDP Rules — метод может быть уточнён. |

---

### 🇮🇱 Израиль

| | |
|---|---|
| **Что делать** | DOB достаточно. Спец. закона **НЕТ** (на март 2026). |
| **Статус** | Законопроекты на рассмотрении Кнессета. Мониторить. |

---

### 🇯🇵 Япония

| | |
|---|---|
| **Что делать** | DOB достаточно. **НЕТ** спец. закона о верификации возраста в соцсетях. |

---

### 🇲🇾 Малайзия — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | С 2026 — обязательная eKYC для ВСЕХ соцсетей. |
| **Закон** | **Online Safety Act 2025** |
| **Анализ** | https://www.mayerbrown.com/en/insights/publications/2025/12/malaysias-proposed-social-media-ban-for-children-how-it-compares-with-australia-and-singapore |
| **Штраф** | до **RM 10 млн** (~$2.2М USD) |

---

### 🇷🇺 Россия — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | ФЗ-152 требует хранить персональные данные граждан РФ **на серверах в России** (ст. 18 ч. 5). Без серверов в РФ — нарушение. Роскомнадзор заблокирует сервис. |
| **Закон** | **ФЗ-152** «О персональных данных» + **ФЗ-149** «Об информации» |
| **Линк** | http://www.consultant.ru/document/cons_doc_LAW_61801/ |
| **Штраф** | Блокировка + штрафы до 18 млн ₽ |

---

### 🇧🇾 Беларусь — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Строгий государственный контроль интернета. Сервис могут заблокировать без предупреждения. |
| **Закон** | Закон «О персональных данных» (№ 99-З от 2021) |
| **Линк** | https://pravo.by/document/?guid=12551&p0=H12100099 |

---

### 🇹🇲 Туркменистан — ⛔ БЛОКИРОВАТЬ

| | |
|---|---|
| **Проблема** | Интернет практически закрыт. Единственный провайдер — гос. «Туркментелеком». Нет рынка. |

---

### 🇺🇦 Украина — ✅ ОТКРЫТА

| | |
|---|---|
| **Что делать** | DOB хватает. Наших 8 пунктов достаточно. |
| **Закон** | Закон «О защите персональных данных» (№ 2297-VI) |
| **Линк** | https://zakon.rada.gov.ua/laws/show/2297-17 |

---

### 🇰🇿 Казахстан — ✅ ОТКРЫТ

| | |
|---|---|
| **Что делать** | DOB хватает. Наших 8 пунктов достаточно. |
| **Закон** | Закон «О персональных данных» (№ 94-V от 2013) |
| **Линк** | https://adilet.zan.kz/rus/docs/Z1300000094 |

---

### 🇬🇪🇦🇲🇦🇿🇲🇩🇺🇿🇰🇬🇹🇯 Грузия, Армения, Азербайджан, Молдова, Узбекистан, Кыргызстан, Таджикистан — ✅ ОТКРЫТЫ

| | |
|---|---|
| **Что делать** | DOB хватает во всех этих странах. Наших 8 пунктов достаточно. |
| **Законы** | Свои законы о персональных данных (см. таблицу ссылок в конце), но **ни одна** не требует спец. верификации возраста. |

---

## 11. 📌 ПОЛНЫЙ СПИСОК ВСЕГО НЕОБХОДИМОГО СЕЙЧАС — Master Checklist

> **Это ЕДИНЫЙ ПОЛНЫЙ список АБСОЛЮТНО ВСЕГО, что нужно сделать для запуска.**
> Включает: публикацию в магазины, техническую реализацию, все экраны согласий, модерацию, документы, переводы.
> Всё что здесь покрыто → работает в ОТКРЫТЫХ странах (США, Канада, ЕС 27 стран, Япония, Израиль, Индия, СНГ + все остальные кроме 9 заблокированных).

---

### 🅰️ ПУБЛИКАЦИЯ В МАГАЗИНЫ

#### Apple App Store

| # | Что | Закон / Правило | Статус |
|---|---|---|---|
| 1 | Заполнить **опросник рейтинга** (Content Descriptions) | [Apple §2.3.6](https://developer.apple.com/app-store/review/guidelines/#legal) | ☐ |
| 2 | Получить рейтинг **17+ или 18+** | [Apple §2.3.6](https://developer.apple.com/app-store/review/guidelines/#legal) | ☐ |
| 3 | **НЕ** ставить в категорию Kids | [Apple §1.3](https://developer.apple.com/app-store/review/guidelines/) | ☐ |
| 4 | **Privacy Policy** ссылка в App Store Connect | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) | ☐ |
| 5 | Реализовать **модерацию UGC**: Report + Block | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) | ☐ |
| 6 | Реализовать **DOB форму** проверки возраста | [Apple §1.1](https://developer.apple.com/app-store/review/guidelines/) | ☐ |
| 7 | **NSUserTrackingUsageDescription** в Info.plist | [Apple §5.1.2(i) ATT](https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing) | ☐ |
| 8 | Реализовать **удаление аккаунта** | [Apple Account Deletion](https://developer.apple.com/support/offering-account-deletion-in-your-app/) | ☐ |

#### Google Play

| # | Что | Закон / Правило | Статус |
|---|---|---|---|
| 1 | Указать **целевую аудиторию 18+** | [Play Console](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en) | ☐ |
| 2 | Заполнить **Content Rating** (IARC) → 18+ | [IARC](https://support.google.com/googleplay/android-developer/answer/188189?hl=en) | ☐ |
| 3 | Включить **«Restrict Declared Minors»** | [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) | ☐ |
| 4 | **НЕ** включать Families / Designed for Families | [Google Families](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) | ☐ |
| 5 | **Privacy Policy** ссылка в Play Console | [Play Console](https://support.google.com/googleplay/android-developer/answer/9859455?hl=en) | ☐ |
| 6 | Заполнить **Data Safety Section** | [Data Safety](https://support.google.com/googleplay/android-developer/answer/10787469?hl=en) | ☐ |
| 7 | Реализовать **модерацию UGC**: Report + Block | [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) | ☐ |
| 8 | Реализовать **DOB форму** проверки возраста | — | ☐ |

---

### 🅱️ ПРОВЕРКА ВОЗРАСТА

| # | Что | Закон | Статус |
|---|---|---|---|
| 1 | Добавить **поле DOB** в форму регистрации (email) | Магазины + COPPA | ☐ |
| 2 | Добавить **экран DOB** после входа через Google/Facebook/Apple (ВСЕГДА, как Pinterest) | Магазины + COPPA | ☐ |
| 3 | Расчёт возраста → если < 18 → **блок** (НЕ создавать аккаунт) | [COPPA](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312) | ☐ |
| 4 | **Удалять DOB** сразу после расчёта (в той же транзакции) | [GDPR Art. 5(1)(c)](https://gdpr-info.eu/art-5-gdpr/) | ☐ |
| 5 | Хранить только: `age_bracket` + `country` | GDPR минимизация | ☐ |
| 6 | DOB **НЕ попадает** в логи, аналитику, бэкапы | [GDPR Art. 5](https://gdpr-info.eu/art-5-gdpr/) | ☐ |

---

### 🅲️ GeoIP И БЛОКИРОВКА СТРАН

| # | Что | Закон | Статус |
|---|---|---|---|
| 1 | Реализовать **GeoIP** определение страны (Cloudflare / MaxMind) | — | ☐ |
| 2 | **Блокировка 9 стран**: GB, AU, BR, CN, KR, MY, RU, BY, TM | Законы этих стран | ☐ |
| 3 | Показать заблокированным: «Service not available in your country» | — | ☐ |
| 4 | **НЕ** хранить IP-адрес после GeoIP | [GDPR Recital 30](https://gdpr-info.eu/recitals/no-30/) | ☐ |

---

### 🅳️ ВСЕ ЭКРАНЫ СОГЛАСИЙ (9 потоков)

| # | Поток | Триггер | Блокирует? | Чекбокс? | Записывать в БД? | Закон |
|---|---|---|---|---|---|---|
| 1 | **Welcome Screen** (GDPR Privacy Defaults) | После регистрации, ПЕРЕД лентой | ✅ ДА — нельзя пропустить | Нет | ✅ `legal_consents_log` | [GDPR Art. 25(2)](https://gdpr-info.eu/art-25-gdpr/) |
| 2 | **UGC Community Guidelines** | Первая попытка создать контент | ✅ ДА — контент не публикуется | ☐ НЕ pre-checked | ✅ `legal_consents_log` | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) |
| 3 | **Push Notifications** | Онбординг / первая попытка пуша | ❌ Можно пропустить | Нет | ❌ (ОС хранит) | [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) · [Google User Data](https://support.google.com/googleplay/android-developer/answer/10144311?hl=en) |
| 4 | **Camera Permission** | Первое фото/видео | ❌ Можно пропустить | Нет | ❌ (ОС хранит) | Apple §5.1.1 · Google Prominent Disclosure |
| 5 | **Photos Permission** | Первый выбор из галереи | ❌ Можно пропустить | Нет | ❌ (ОС хранит) | Apple §5.1.1 · Google Prominent Disclosure |
| 6 | **ATT (iOS)** | Первый запуск iOS 14.5+ | ✅ Системный диалог | Нет | ❌ (iOS хранит) | [Apple §5.1.2(i)](https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing) |
| 7 | **SMS Consent (TCPA)** | Добавление/изменение телефона | ✅ Нужно согласие | ☐ НЕ pre-checked | ✅ (отдельная таблица) | [TCPA §227(b)](https://www.law.cornell.edu/uscode/text/47/227) |
| 8 | **Cookie Consent** | Первый визит на веб-сайт | ❌ Можно отказаться | ☐ НЕ pre-checked (analytics/ads) | ❌ (localStorage) | [ePrivacy 2002/58/EC](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058) · [GDPR Art. 7](https://gdpr-info.eu/art-7-gdpr/) |
| 9 | **Delete Account** | В настройках (Settings) | — | — | 🚧 В разработке | [GDPR Art. 17](https://gdpr-info.eu/art-17-gdpr/) · [Apple](https://developer.apple.com/support/offering-account-deletion-in-your-app/) |

---

### 🅴️ МОДЕРАЦИЯ UGC

| # | Что | Закон | Статус |
|---|---|---|---|
| 1 | Кнопка **«Report»** на каждом посте/комментарии/профиле | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [Google UGC](https://support.google.com/googleplay/android-developer/answer/9876937?hl=en) · [DSA Art. 16](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | ☐ |
| 2 | Выбор **причины жалобы** (CSAM, Hate, Violence, Spam, Other) | DSA Art. 16 | ☐ |
| 3 | Кнопка **«Block user»** | Apple §1.2 · Google UGC | ☐ |
| 4 | **Удаление контента** модераторами | Apple §1.2 · Google UGC | ☐ |
| 5 | **Community Guidelines** опубликованы | Apple §1.2 · Google UGC · [DSA Art. 14](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | ☐ |
| 6 | Механизм **обжалования** (Appeal) удаления контента | [DSA Art. 20](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) (ЕС) | ☐ |
| 7 | **Уведомление** заявителю о результате жалобы | [DSA Art. 17](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) (ЕС) | ☐ |

---

### 🅵️ НАСТРОЙКИ ПРИВАТНОСТИ

| # | Что | Закон | Статус |
|---|---|---|---|
| 1 | Профиль = **приватный по умолчанию** (для Калифорнии) | [CAADCA (AB 2273)](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273) | ☐ |
| 2 | Геолокация = **выключена по умолчанию** | CAADCA | ☐ |
| 3 | Push-уведомления = **минимальные по умолчанию** | CAADCA | ☐ |
| 4 | Email, телефон, дата рождения = **ВСЕГДА скрыты** от других | [GDPR Art. 25](https://gdpr-info.eu/art-25-gdpr/) | ☐ |
| 5 | Кнопка **«Удалить аккаунт»** в настройках | [GDPR Art. 17](https://gdpr-info.eu/art-17-gdpr/) · [Apple](https://developer.apple.com/support/offering-account-deletion-in-your-app/) | ☐ |
| 6 | Кнопка **«Экспорт данных»** (скачать свои данные) | [GDPR Art. 15](https://gdpr-info.eu/art-15-gdpr/) / [Art. 20](https://gdpr-info.eu/art-20-gdpr/) | ☐ |

---

### 🅶️ ЮРИДИЧЕСКИЕ ДОКУМЕНТЫ

| # | Документ | Языки | Закон | Статус |
|---|---|---|---|---|
| 1 | **Privacy Policy** | EN + DE, FR, ES, IT, PT | [GDPR Art. 13/14](https://gdpr-info.eu/art-13-gdpr/) · [Apple §5.1.1](https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage) | ☐ |
| 2 | **Terms of Service** (18+ минимальный возраст) | EN + DE, FR, ES, IT, PT | Apple · Google | ☐ |
| 3 | **Community Guidelines** | EN + DE, FR, ES, IT, PT | [Apple §1.2](https://developer.apple.com/app-store/review/guidelines/#user-generated-content) · [DSA Art. 14](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | ☐ |
| 4 | **SMS Communication Policy** | EN | [TCPA §227](https://www.law.cornell.edu/uscode/text/47/227) | ☐ |

**Что описать в Privacy Policy:**
- [ ] Сбор DOB (цель: проверка возраста, удаление сразу)
- [ ] GeoIP (цель: определение юрисдикции)
- [ ] Правовое основание: [GDPR Art. 6(1)(b)](https://gdpr-info.eu/art-6-gdpr/) или (f)
- [ ] Cookies — какие и зачем (если используются)
- [ ] Права пользователей: удаление, доступ, исправление, перенос данных
- [ ] Как подать запрос на удаление (email / кнопка)
- [ ] Третьи лица (аналитика, SDK) — перечислить

---

### 🅷️ ПЕРЕВОДЫ UI

| # | Что | Языки | Статус |
|---|---|---|---|
| 1 | Все экраны приложения (UI) | EN, RU, ES, FR, DE, AR, HE | ☐ |
| 2 | Все ключи переводов из Потоков 1-8 (Секция 6) | EN, RU, ES, FR, DE, AR, HE | ☐ |
| 3 | Все ключи переводов модерации (Секция 7) | EN, RU, ES, FR, DE, AR, HE | ☐ |
| 4 | DOB экран (social login) | EN, RU, ES, FR, DE, AR, HE | ☐ |
| 5 | Экран блокировки страны | EN (+ RU для видимости) | ☐ |

---

### 🅸️ БАЗА ДАННЫХ — таблицы

| # | Таблица / Поле | Для чего | Закон |
|---|---|---|---|
| 1 | `legal_consents_log` (user_id, consent_type, version, timestamp, IP) | ПОТОК 1 + ПОТОК 2 согласия | GDPR |
| 2 | `users.push_notifications_enabled` (true/false) | Статус push-уведомлений | — |
| 3 | `users.analytics_enabled` (true/false) | ATT выбор (iOS) | — |
| 4 | `users.sms_consent` + `sms_consent_at` + `sms_consent_ip` | SMS согласие привязано к номеру | TCPA |
| 5 | `users.age_bracket` ("18+") | Результат проверки DOB | — |
| 6 | `users.country` (код страны) | GeoIP результат | — |

---

### 🅹️ ЧТО ПОКРЫТО ЭТИМ СПИСКОМ — какие страны работают

```
С ЭТИМ СПИСКОМ РАБОТАЮТ (без доработок):
  ✅ 🇺🇸 США (все штаты, включая Калифорнию)
  ✅ 🇨🇦 Канада
  ✅ 🇪🇺 ЕС (все 27 стран: Германия, Франция, Испания, Италия, и т.д.)
  ✅ 🇯🇵 Япония
  ✅ 🇮🇱 Израиль
  ✅ 🇮🇳 Индия
  ✅ 🇺🇦 Украина, 🇰🇿 Казахстан, 🇬🇪 Грузия, 🇦🇲 Армения
  ✅ 🇦🇿 Азербайджан, 🇲🇩 Молдова, 🇺🇿 Узбекистан
  ✅ 🇰🇬 Кыргызстан, 🇹🇯 Таджикистан
  ✅ Все остальные страны мира (кроме 9 заблокированных)

ЗАБЛОКИРОВАНЫ (нужны доработки):
  ⛔ 🇬🇧 UK — нужна Yoti/OneID
  ⛔ 🇦🇺 Австралия — нужна biometric/eKYC
  ⛔ 🇧🇷 Бразилия — нужна ID-верификация
  ⛔ 🇨🇳 Китай — нужен нац. ID + китайский партнёр
  ⛔ 🇰🇷 Юж. Корея — нужна i-PIN
  ⛔ 🇲🇾 Малайзия — нужна eKYC
  ⛔ 🇷🇺 Россия — нужны серверы в РФ
  ⛔ 🇧🇾 Беларусь — гос. контроль
  ⛔ 🇹🇲 Туркменистан — нет рынка
```

---

### 🔓 ПОСЛЕ ЗАПУСКА — по приоритету

- [ ] 🇬🇧 Интегрировать **Yoti** или **OneID** → разблокировать UK
- [ ] 🇦🇺 Интегрировать **Yoti** (facial age) → разблокировать Австралию
- [ ] 🇧🇷 Интегрировать **ID-верификацию** → разблокировать Бразилию
- [ ] 🇰🇷 Найти корейского провайдера → разблокировать Юж. Корею
- [ ] 🇲🇾 Интегрировать **eKYC** → разблокировать Малайзию
- [ ] 🇷🇺 Поставить **серверы в РФ** → разблокировать Россию
- [ ] Для ЕС: назначить **представителя** (GDPR Art. 27) если нет офиса
- [ ] Для ЕС: подготовить **DPIA** (Data Protection Impact Assessment)

### 👀 МОНИТОРИТЬ

- [ ] 🇺🇸 **KOSA** (S.1748) — если примут, потребуются изменения | [Congress](https://www.congress.gov/bill/119th-congress/senate-bill/1748)
- [ ] 🇨🇦 Новый закон Канады (ограничение до 16) | Мониторить
- [ ] 🇮🇱 Закон Израиля (на рассмотрении) | Мониторить
- [ ] 🇮🇳 DPDP Rules — метод верификации может быть уточнён | Мониторить
- [ ] 🇪🇺 EU Digital Identity Wallet (конец 2026) | Мониторить
- [ ] 🇫🇷 Франция — обязательная ID-верификация для соцсетей | Мониторить

---

## Все ссылки на законы (одним списком)

### Федеральные законы

| Страна | Закон | Линк |
|---|---|---|
| 🇺🇸 США | COPPA (16 CFR 312) | https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312 |
| 🇺🇸 США | FTC COPPA FAQ | https://www.ftc.gov/business-guidance/resources/complying-coppa-frequently-asked-questions |
| 🇺🇸 Калифорния | CAADCA (AB 2273) | https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273 |
| 🇺🇸 Техас | HB 18 | https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=HB18 |
| 🇺🇸 Юта | SB 152 | https://le.utah.gov/~2023/bills/static/SB0152.html |
| 🇺🇸 Вирджиния | SB 854 | https://lis.virginia.gov/bill-details/20251/SB854 |
| 🇺🇸 Луизиана | HB 570 | https://www.legis.la.gov/legis/BillInfo.aspx?s=25RS&b=HB570 |
| 🇺🇸 США | KOSA (S.1748) — НЕ принят | https://www.congress.gov/bill/119th-congress/senate-bill/1748 |
| 🇨🇦 Канада | PIPEDA | https://laws-lois.justice.gc.ca/eng/acts/p-8.6/ |
| 🇪🇺 ЕС | GDPR (полный текст) | https://gdpr-info.eu/ |
| 🇪🇺 ЕС | GDPR Art. 8 (возраст цифрового согласия) | https://gdpr-info.eu/art-8-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 6 (основания обработки) | https://gdpr-info.eu/art-6-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 17 (право на удаление) | https://gdpr-info.eu/art-17-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 15 (право на доступ) | https://gdpr-info.eu/art-15-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 20 (право на перенос) | https://gdpr-info.eu/art-20-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 27 (представитель) | https://gdpr-info.eu/art-27-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 33 (уведомление об утечке) | https://gdpr-info.eu/art-33-gdpr/ |
| 🇪🇺 ЕС | DSA Art. 28 (защита несовершеннолетних) | https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| 🇪🇺 ЕС | DSA Art. 14 (Terms of Service / Community Guidelines) | https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| 🇪🇺 ЕС | DSA Art. 16 (notice and action mechanism — жалобы) | https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| 🇪🇺 ЕС | DSA Art. 17 (уведомление о результате) | https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| 🇪🇺 ЕС | DSA Art. 20 (internal complaint-handling / appeals) | https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| 🇪🇺 ЕС | ePrivacy Directive 2002/58/EC (cookies) | https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32002L0058 |
| 🇪🇺 ЕС | GDPR Art. 7 (conditions for consent) | https://gdpr-info.eu/art-7-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 13 (information to be provided — Privacy Policy) | https://gdpr-info.eu/art-13-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 25 (data protection by design / by default) | https://gdpr-info.eu/art-25-gdpr/ |
| 🇺🇸 США | TCPA 47 U.S.C. §227 (SMS consent) | https://www.law.cornell.edu/uscode/text/47/227 |
| 🇫🇷 Франция | Loi 2024-449 | https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049563651 |
| 🇫🇷 Франция | CNIL Guidelines (cookies) | https://www.cnil.fr/en/cookies-and-other-tracking-devices |
| 🇩🇪 Германия | JuSchG | https://www.gesetze-im-internet.de/juschg/ |
| 🇬🇧 UK | Online Safety Act 2023 | https://www.legislation.gov.uk/ukpga/2023/50/contents |
| 🇬🇧 UK | Ofcom руководство | https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/online-safety-regulatory-documents |
| 🇬🇧 UK | Ofcom защита детей | https://www.ofcom.org.uk/online-safety/protecting-children/ |
| 🇦🇺 Австралия | Online Safety Amendment Act 2024 | https://www.legislation.gov.au/C2024A00127/asmade |
| 🇦🇺 Австралия | eSafety Commissioner | https://www.esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions |
| 🇧🇷 Бразилия | Digital ECA (Lei 15.211/2025) | https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Lei/L15211.htm |
| 🇨🇳 Китай | Положение о защите несовершеннолетних онлайн (EN) | https://www.chinalawtranslate.com/en/online-protection-of-minors/ |
| 🇨🇳 Китай | Оригинал (CN) | https://www.gov.cn/zhengce/content/202310/content_6911288.htm |
| 🇰🇷 Юж. Корея | PIPA (EN) | https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62389&type=part&key=4 |
| 🇰🇷 Юж. Корея | PIPC | https://www.pipc.go.kr/eng/user/lgp/law/lawDetail.do |
| 🇮🇳 Индия | DPDP Act 2023 (PDF) | https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf |
| 🇮🇳 Индия | DPDP Section 9 | https://indiankanoon.org/doc/98869575/ |
| 🇲🇾 Малайзия | Online Safety Act 2025 (анализ) | https://www.mayerbrown.com/en/insights/publications/2025/12/malaysias-proposed-social-media-ban-for-children-how-it-compares-with-australia-and-singapore |

### Страны бывшего СССР

| Страна | Закон | Линк |
|---|---|---|
| 🇷🇺 Россия | ФЗ-152 «О персональных данных» | http://www.consultant.ru/document/cons_doc_LAW_61801/ |
| 🇺🇦 Украина | Закон «О защите персональных данных» (№ 2297-VI) | https://zakon.rada.gov.ua/laws/show/2297-17 |
| 🇧🇾 Беларусь | Закон «О персональных данных» (№ 99-З) | https://pravo.by/document/?guid=12551&p0=H12100099 |
| 🇰🇿 Казахстан | Закон «О персональных данных» (№ 94-V) | https://adilet.zan.kz/rus/docs/Z1300000094 |
| 🇬🇪 Грузия | Закон «О защите персональных данных» (2011) | https://matsne.gov.ge/en/document/view/1561437 |
| 🇦🇲 Армения | Закон «О защите персональных данных» (2015) | https://www.arlis.am/documentview.aspx?docID=98818 |
| 🇦🇿 Азербайджан | Закон «О персональных данных» (2010) | https://e-qanun.az/framework/19957 |
| 🇲🇩 Молдова | Закон «О защите персональных данных» (№ 133) | https://www.legis.md/cautare/getResults?doc_id=110584 |
| 🇺🇿 Узбекистан | Закон «О персональных данных» (2019) | https://lex.uz/docs/4396428 |

### Магазины приложений

| Что | Линк |
|---|---|
| Apple App Store Review Guidelines | https://developer.apple.com/app-store/review/guidelines/ |
| Apple App Store §5.1.1 (Data Collection) | https://developer.apple.com/app-store/review/guidelines/#data-collection-and-storage |
| Apple App Store §5.1.2(i) (ATT) | https://developer.apple.com/app-store/review/guidelines/#data-use-and-sharing |
| Apple App Store §1.2 (UGC) | https://developer.apple.com/app-store/review/guidelines/#user-generated-content |
| Apple ATT Framework | https://developer.apple.com/documentation/apptrackingtransparency |
| Apple Account Deletion Requirement | https://developer.apple.com/support/offering-account-deletion-in-your-app/ |
| Google Play Families Policy | https://support.google.com/googleplay/android-developer/answer/9893335?hl=en |
| Google Play целевая аудитория | https://support.google.com/googleplay/android-developer/answer/9867159?hl=en |
| Google Play Age Signals API | https://support.google.com/googleplay/android-developer/answer/16569691?hl=en |
| Google Play User Data Policy | https://support.google.com/googleplay/android-developer/answer/10144311?hl=en |
| Google Play UGC Policy | https://support.google.com/googleplay/android-developer/answer/9876937?hl=en |

### Провайдеры верификации (для Phase 2)

| Провайдер | Что делает | Линк |
|---|---|---|
| **Yoti** | Facial age estimation, ID check | https://www.yoti.com/business/age-verification/ |
| **OneID** | Open Banking age check (UK) | https://oneid.uk/ |
| **AgeChecked** | Multi-method age check | https://agechecked.com/ |
| **Persona** | eKYC, ID verification | https://withpersona.com/ |
| **IDnow** | Video/Auto ID verification | https://www.idnow.io/ |

### GeoIP сервисы

| Сервис | Линк |
|---|---|
| MaxMind GeoLite2 | https://dev.maxmind.com/geoip/geolite2-free-geolocation-data |
| ipinfo.io | https://ipinfo.io/ |
| Cloudflare CF-IPCountry | https://developers.cloudflare.com/fundamentals/reference/http-request-headers/#cf-ipcountry |
