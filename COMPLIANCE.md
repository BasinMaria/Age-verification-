# 18+ Социальная сеть — Что делать по закону в каждой стране

> **Дата:** Март 2026
> **Проект:** Социальная сеть **18+** с мировым охватом (App Store + Google Play)
> **Модель:** Регистрация только для лиц 18+. Все до 18 — блокируются.
> **Способы входа:** Google, Facebook, Apple Sign-In + собственная регистрация (email, имя, пароль, дата рождения)

---

## Содержание

1. [Твоя ситуация и главный принцип](#1-твоя-ситуация-и-главный-принцип)
2. [Определение страны по GeoIP — не спрашивать пользователя](#2-определение-страны-по-geoip--не-спрашивать-пользователя)
3. [Каждая страна — что делать по закону (с линками)](#3-каждая-страна--что-делать-по-закону-с-линками)
4. [Стратегия быстрого запуска — что первым делом](#4-стратегия-быстрого-запуска--что-первым-делом)
5. [Форма даты рождения — при регистрации и через соцсети](#5-форма-даты-рождения--при-регистрации-и-через-соцсети)
6. [App Store и Google Play — как опубликовать 18+ приложение](#6-app-store-и-google-play--как-опубликовать-18-приложение)
7. [Какие данные хранить, какие удалять](#7-какие-данные-хранить-какие-удалять)
8. [Чек-лист перед запуском](#8-чек-лист-перед-запуском)

---

## 1. Твоя ситуация и главный принцип

**У тебя: социальная сеть 18+ для всего мира.**

Это значит:
- Ты НЕ допускаешь никого до 18 лет.
- Ты НЕ «сервис направленный на детей» → не попадаешь под COPPA / Families Policy.
- Тебе НЕ нужен родительский контроль, согласие родителей, детский режим.

**Но!** Простого чекбокса «мне есть 18» — недостаточно. Во многих странах закон требует БОЛЬШЕ, чем самодекларацию.

**Главный принцип:**
```
При регистрации → собрать дату рождения → рассчитать возраст:
  - >= 18 → пустить
  - < 18 → ЗАБЛОКИРОВАТЬ
  - Удалить дату рождения СРАЗУ после расчёта
  - Хранить только: age_bracket = "18+" и country = "US"/"DE"/...
```

В некоторых странах кроме даты рождения нужны дополнительные меры. Ниже — ВСЕ страны с разбором.

---

## 2. Определение страны по GeoIP — не спрашивать пользователя

**Да, можно определять страну автоматически по IP-адресу. Не нужно спрашивать.**

### Как работает

```
Пользователь открывает приложение
    │
    ▼
Сервер видит IP-адрес → GeoIP-сервис → код страны (US, DE, AU...)
    │
    ▼
Применяем правила для этой страны
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

## 3. Каждая страна — что делать по закону (с линками)

### Как читать таблицу

- **«DOB достаточно»** = собирай дату рождения, рассчитай возраст, блокируй < 18 — и этого хватит по закону.
- **«DOB + …»** = нужно что-то дополнительно.
- **«Блокировать страну»** = на первом этапе проще заблокировать GeoIP-регион, чем выполнять сложные требования.

---

### 🇺🇸 США (федеральный уровень)

| | |
|---|---|
| **Что делать** | DOB достаточно. Собирай дату рождения → блокируй < 18 → удаляй DOB сразу. |
| **Почему этого хватит** | COPPA применяется к сервисам «направленным на детей до 13» или имеющим «фактическое знание» о детях. Если ты 18+ и блокируешь всех < 18, COPPA на тебя НЕ распространяется. Но: если узнаешь что пользователь < 13 — обязана удалить его данные. |
| **Закон** | **COPPA** — Children's Online Privacy Protection Act, 16 CFR Part 312 |
| **Линк** | https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312 |
| **Штраф** | до $53 088 за каждое нарушение |

> ⚠️ **ВАЖНО: Калифорния и другие штаты — см. ниже!**

---

### 🇺🇸 Калифорния (отдельно от федерального)

| | |
|---|---|
| **Что делать** | DOB + **высокие настройки приватности по умолчанию** для всех пользователей. Если ты определяешь возраст (а ты определяешь через DOB) — данные для определения возраста нельзя использовать ни для чего другого. |
| **Почему** | California Age-Appropriate Design Code Act (CAADCA, AB 2273) — требует «оценивать возраст с разумной уверенностью» для сервисов, к которым «вероятно имеют доступ дети». В марте 2026 Девятый округ подтвердил: требования по age estimation и высоким настройкам приватности — действуют. |
| **Закон** | **CAADCA** — California Age-Appropriate Design Code Act (AB 2273, California Civil Code §1798.99.28–99.40) |
| **Линк** | https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273 |
| **Решение суда** | Ninth Circuit, март 2026: https://www.hklaw.com/en/insights/publications/2026/03/ninth-circuit-issues-mixed-ruling-on-california-age-appropriate-design |
| **Что конкретно делать** | 1) DOB при регистрации. 2) Удалять DOB сразу — не использовать для другого. 3) Максимальные настройки приватности по умолчанию для всех. 4) Не отслеживать геолокацию без явного согласия. |

---

### 🇺🇸 Техас

| | |
|---|---|
| **Что делать** | DOB достаточно для 18+ соцсети. Закон требует согласие родителя для < 18 — но ты блокируешь всех < 18, значит закон соблюдён. |
| **Закон** | **HB 18** — Securing Children Online through Parental Empowerment Act |
| **Линк** | https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=HB18 |

---

### 🇺🇸 Юта

| | |
|---|---|
| **Что делать** | DOB достаточно. Закон требует верифицируемое согласие родителя для < 18 — ты блокируешь < 18. |
| **Закон** | **SB 152** — Social Media Regulation Act + App Store Accountability Act |
| **Линк** | https://le.utah.gov/~2023/bills/static/SB0152.html |
| **Примечание** | App Store Accountability Act (вступает в силу май 2026) — требует чтобы магазины приложений сами проверяли возраст. Это обязанность Apple/Google, не твоя. |

---

### 🇺🇸 Вирджиния

| | |
|---|---|
| **Что делать** | DOB достаточно. Закон ограничивает время в соцсетях для < 18 до 1 часа/день. Ты блокируешь < 18 → не применяется. |
| **Закон** | **SB 854** — поправки к Virginia Consumer Data Protection Act |
| **Линк** | https://lis.virginia.gov/bill-details/20251/SB854 |

---

### 🇺🇸 Луизиана

| | |
|---|---|
| **Что делать** | DOB достаточно. Закон требует верификацию возраста и согласие родителя для < 18. Ты блокируешь < 18. |
| **Закон** | **HB 570** — App Store Accountability Act (вступает в силу июль 2026) |
| **Линк** | https://www.legis.la.gov/legis/BillInfo.aspx?s=25RS&b=HB570 |

---

### 🇺🇸 KOSA (федеральный законопроект — ЕЩЁ НЕ ПРИНЯТ)

| | |
|---|---|
| **Статус** | Законопроект S.1748 — перевнесён в Сенат в мае 2025. На март 2026 **НЕ принят** — не является законом. |
| **Если примут** | Потребуются: duty of care, отключение «аддиктивных» функций для < 17, ежегодные аудиты. Для 18+ соцсети — влияние минимально, если ты действительно блокируешь < 18. |
| **Линк** | https://www.congress.gov/bill/119th-congress/senate-bill/1748 |
| **Что делать сейчас** | Ничего — закон не принят. Мониторить. |

---

### 🇨🇦 Канада

| | |
|---|---|
| **Что делать** | DOB достаточно. Действующий закон (PIPEDA) не запрещает 18+ сервис с проверкой по DOB. |
| **Закон** | **PIPEDA** — Personal Information Protection and Electronic Documents Act |
| **Линк** | https://laws-lois.justice.gc.ca/eng/acts/p-8.6/ |
| **Примечание** | Обсуждается новый законопроект о запрете соцсетей для < 16 — пока не принят. Мониторить. |

---

### 🇪🇺 Евросоюз (все 27 стран)

| | |
|---|---|
| **Что делать** | DOB достаточно для проверки возраста. **НО дополнительно нужно:** 1) Privacy Policy (на языке пользователя минимум EN + основные языки). 2) Правовое основание обработки данных (GDPR Art. 6). 3) Если нет офиса в ЕС — назначить представителя (GDPR Art. 27). 4) Рекомендуется DPIA (Data Protection Impact Assessment). |
| **Почему** | GDPR Art. 8 устанавливает возраст цифрового согласия (13–16 по странам) — но ты блокируешь всех < 18, значит это не проблема. Однако GDPR всё равно регулирует КАК ты обрабатываешь данные всех пользователей из ЕС. |
| **Законы** | **GDPR** — General Data Protection Regulation (EU) 2016/679; **DSA** — Digital Services Act (EU) 2022/2065 |
| **Линки** | GDPR полный текст: https://gdpr-info.eu/ • GDPR Art. 8 (дети): https://gdpr-info.eu/art-8-gdpr/ • GDPR Art. 6 (основания): https://gdpr-info.eu/art-6-gdpr/ • GDPR Art. 27 (представитель): https://gdpr-info.eu/art-27-gdpr/ • DSA: https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| **Штрафы** | GDPR: до **€20 млн или 4% мирового оборота** • DSA: до **6% мирового оборота** |
| **Что конкретно делать** | 1) DOB при регистрации → блок < 18 → удалить DOB. 2) Privacy Policy на EN + DE + FR + ES + IT + PT. 3) Cookie consent banner. 4) Если нет офиса в ЕС → назначить представителя (Art. 27). 5) Не использовать данные для профилирования без согласия. |

---

### 🇫🇷 Франция (в дополнение к ЕС)

| | |
|---|---|
| **Что делать** | Всё что для ЕС + следить за новым законом. Франция обсуждает обязательную проверку возраста через ID / double anonymat (двойную анонимизацию). Пока НЕ принят для соцсетей. |
| **Закон** | **Loi n° 2024-449** (порнографические сайты — уже действует); для соцсетей — законопроект в обсуждении |
| **Линк** | https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049563651 |
| **Что делать сейчас** | DOB достаточно. Мониторить. |

---

### 🇩🇪 Германия (в дополнение к ЕС)

| | |
|---|---|
| **Что делать** | Всё что для ЕС + Privacy Policy на немецком языке. Германия строго применяет GDPR (возраст цифрового согласия — 16). |
| **Закон** | **GDPR** + **JuSchG** (Jugendschutzgesetz — Закон о защите молодёжи), **TMG** (Telemediengesetz) |
| **Линки** | JuSchG: https://www.gesetze-im-internet.de/juschg/ • GDPR Art. 8 + немецкая имплементация: https://gdpr-info.eu/art-8-gdpr/ |
| **Что делать сейчас** | DOB + Privacy Policy на немецком. Для 18+ — достаточно. |

---

### 🇬🇧 Великобритания

| | |
|---|---|
| **Что делать** | ⚠️ **DOB НЕДОСТАТОЧНО.** Ofcom прямо говорит: самодекларация (ввод даты рождения) — **НЕ является «высокоэффективной»** проверкой возраста. Нужен дополнительный метод. |
| **Закон** | **Online Safety Act 2023** (c.50) |
| **Линк на закон** | https://www.legislation.gov.uk/ukpga/2023/50/contents |
| **Руководство Ofcom** | https://www.ofcom.org.uk/online-safety/illegal-and-harmful-content/online-safety-regulatory-documents |
| **Ofcom про проверку возраста** | https://www.ofcom.org.uk/online-safety/protecting-children/ |
| **Штраф** | до **10% мирового дохода** или блокировка сервиса в UK |
| **Допустимые методы** | Проверка по документу (паспорт), оценка возраста по лицу (facial age estimation), Open Banking, проверка через мобильного оператора, кредитная карта |
| **НЕдопустимые методы** | Самодекларация (ввод даты), чекбокс «мне 18+», дебетовая карта без проверки возраста |
| **Что конкретно делать** | **Вариант A (быстрый запуск):** заблокировать UK по GeoIP → разблокировать после интеграции Yoti/OneID. **Вариант B:** DOB как первый фильтр + интеграция с Yoti (~$0.10–0.50/проверка) или OneID (Open Banking). |
| **Провайдеры** | Yoti: https://www.yoti.com/business/age-verification/ • OneID: https://oneid.uk/ • AgeChecked: https://agechecked.com/ |

---

### 🇦🇺 Австралия

| | |
|---|---|
| **Что делать** | ⚠️ **DOB НЕДОСТАТОЧНО.** Закон требует «разумные меры» — самодекларация НЕ считается. Жёсткий запрет до 16 — родители НЕ могут дать согласие. |
| **Закон** | **Online Safety Amendment (Social Media Minimum Age) Act 2024** (No. 127, 2024) |
| **Линк на закон** | https://www.legislation.gov.au/C2024A00127/asmade |
| **Парламент (документы)** | https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7284 |
| **eSafety Commissioner** | https://www.esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions |
| **Штраф** | до **AUD $49.5 млн** (~$32 млн USD) |
| **Что конкретно делать** | **Вариант A (быстрый запуск):** заблокировать Австралию по GeoIP → разблокировать после интеграции biometric/eKYC. **Вариант B:** DOB + интеграция с Yoti (facial age estimation) или Persona (eKYC). |
| **Провайдеры** | Yoti: https://www.yoti.com/ • Persona: https://withpersona.com/ • IDnow: https://www.idnow.io/ |

---

### 🇧🇷 Бразилия

| | |
|---|---|
| **Что делать** | ⚠️ **DOB НЕДОСТАТОЧНО.** Digital ECA прямо запрещает самодекларацию. Требует «надёжные и проверяемые» механизмы. |
| **Закон** | **Lei nº 15.211/2025** — Estatuto Digital da Criança e do Adolescente (Digital ECA) — вступил в силу **17 марта 2026** |
| **Линк на закон** | https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Lei/L15211.htm |
| **Анализ закона** | https://www.demarest.com.br/en/eca-digital-nova-lei-de-protecao-de-criancas-e-adolescentes-no-ambiente-digital/ |
| **Штраф** | до **10% дохода в Бразилии**, приостановка сервиса, полный запрет |
| **Что конкретно делать** | **Вариант A (быстрый запуск):** заблокировать Бразилию по GeoIP → разблокировать после интеграции ID-верификации. **Вариант B:** DOB + дополнительная проверка (кредитная карта или ID). |

---

### 🇨🇳 Китай

| | |
|---|---|
| **Что делать** | 🔴 **ЗАБЛОКИРОВАТЬ на первом этапе.** Обязательна регистрация по реальному имени (национальный ID). Без китайского партнёра — невозможно. |
| **Закон** | **Положение о защите несовершеннолетних в киберпространстве** (Госсовет КНР, 2024) + **Закон о кибербезопасности** + **PIPL** (Personal Information Protection Law) |
| **Линк** (EN перевод) | https://www.chinalawtranslate.com/en/online-protection-of-minors/ |
| **Линк** (оригинал CN) | https://www.gov.cn/zhengce/content/202310/content_6911288.htm |
| **Что делать** | Заблокировать CN по GeoIP. Запускаться в Китае только если найдёшь китайского партнёра для верификации. |

---

### 🇰🇷 Южная Корея

| | |
|---|---|
| **Что делать** | 🔴 **ЗАБЛОКИРОВАТЬ на первом этапе.** Требуется верификация через гос. систему (i-PIN или мобильный номер привязанный к реальному имени). |
| **Закон** | **PIPA** — Personal Information Protection Act, Art. 22-2 (защита данных детей до 14 — согласие родителя через i-PIN) |
| **Линк на закон** (EN) | https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62389&type=part&key=4 |
| **Комиссия PIPC** | https://www.pipc.go.kr/eng/user/lgp/law/lawDetail.do |
| **Что делать** | Заблокировать KR по GeoIP. Для 18+ соцсети — можно разблокировать позже, интегрировав мобильную верификацию через корейского провайдера. |

---

### 🇮🇳 Индия

| | |
|---|---|
| **Что делать** | DOB достаточно **на данный момент**. DPDP Act считает всех < 18 «детьми», но конкретный метод верификации пока не определён регулятором. Для 18+ соцсети — DOB и блок < 18 пока покрывает требования. |
| **Закон** | **DPDP Act 2023** — Digital Personal Data Protection Act, Section 9 (обработка данных детей) |
| **Линк на закон** (PDF) | https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf |
| **Section 9 текст** | https://indiankanoon.org/doc/98869575/ |
| **Штраф** | Определяется правилами (DPDP Rules 2025) |
| **Что конкретно делать** | 1) DOB при регистрации → блок < 18. 2) Не профилировать, не трекать, не показывать таргетированную рекламу детям (а ты их и не пускаешь). 3) Мониторить DPDP Rules — метод верификации может быть уточнён. |

---

### 🇮🇱 Израиль

| | |
|---|---|
| **Что делать** | DOB достаточно. Специального закона о верификации возраста для соцсетей **НЕТ** (на март 2026). Законопроекты обсуждаются. |
| **Статус** | Законопроекты на рассмотрении Кнессета (ограничение для 14–16 лет) |
| **Что делать** | DOB → блок < 18. Мониторить законодательство. |

---

### 🇯🇵 Япония

| | |
|---|---|
| **Что делать** | DOB достаточно. **НЕТ** специального закона об обязательной верификации возраста для соцсетей. |
| **Статус** | Платформы устанавливают порог 13+ по собственной политике. Правительство делает упор на «интернет-грамотность». |
| **Что делать** | DOB → блок < 18. Всё. |

---

### 🇲🇾 Малайзия

| | |
|---|---|
| **Что делать** | 🔴 **ЗАБЛОКИРОВАТЬ на первом этапе.** С 2026 — обязательная eKYC (проверка по нац. документу) для всех соцсетей. |
| **Закон** | **Online Safety Act 2025** — запрет соцсетей для < 16 + обязательная eKYC |
| **Анализ** | https://www.mayerbrown.com/en/insights/publications/2025/12/malaysias-proposed-social-media-ban-for-children-how-it-compares-with-australia-and-singapore |
| **Штраф** | до **RM 10 млн** (~$2.2 млн USD) |
| **Что делать** | Заблокировать MY по GeoIP. Разблокировать после интеграции eKYC. |

---

### 🌍 Все остальные страны (нет специальных законов)

| | |
|---|---|
| **Что делать** | DOB достаточно. Большинство стран мира не имеют специальных законов о верификации возраста в соцсетях. |
| **Принцип** | Применять строгие правила по умолчанию: DOB → блок < 18 → удалить DOB → хранить только age_bracket и country. |

---

### Итоговая сводка — ВСЕ страны

| Страна | DOB хватит? | Нужно дополнительно | Закон | Линк | Рекомендация для быстрого запуска |
|---|---|---|---|---|---|
| 🇺🇸 **США** (федеральный) | ✅ Да | Удалять DOB сразу | COPPA, 16 CFR 312 | [eCFR](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312) | Запускать |
| 🇺🇸 **Калифорния** | ⚠️ Да + | Максимальная приватность по умолчанию | CAADCA (AB 2273) | [Legislature](https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202120220AB2273) | Запускать с высокими настройками приватности |
| 🇺🇸 **Техас** | ✅ Да | — | HB 18 | [Capitol](https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=HB18) | Запускать |
| 🇺🇸 **Юта** | ✅ Да | — | SB 152 | [Legislature](https://le.utah.gov/~2023/bills/static/SB0152.html) | Запускать |
| 🇨🇦 **Канада** | ✅ Да | — | PIPEDA | [Justice](https://laws-lois.justice.gc.ca/eng/acts/p-8.6/) | Запускать |
| 🇯🇵 **Япония** | ✅ Да | — | Нет спец. закона | — | Запускать |
| 🇮🇱 **Израиль** | ✅ Да | Мониторить | Законопроект | — | Запускать |
| 🇮🇳 **Индия** | ✅ Да (пока) | Мониторить DPDP Rules | DPDP Act §9 | [IndiaCode](https://www.indiacode.nic.in/bitstream/123456789/22037/1/a2023-22.pdf) | Запускать |
| 🇪🇺 **ЕС** (27 стран) | ✅ Да | Privacy Policy, GDPR compliance, представитель | GDPR + DSA | [GDPR](https://gdpr-info.eu/) / [DSA](https://eur-lex.europa.eu/eli/reg/2022/2065/oj) | Запускать с Privacy Policy |
| 🇫🇷 **Франция** | ✅ Да | + Privacy Policy на FR | GDPR + Loi 2024-449 | [Legifrance](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049563651) | Запускать |
| 🇩🇪 **Германия** | ✅ Да | + Privacy Policy на DE | GDPR + JuSchG | [JuSchG](https://www.gesetze-im-internet.de/juschg/) | Запускать |
| 🇬🇧 **UK** | ❌ **Нет** | Enhanced verification (Yoti/OneID) | Online Safety Act 2023 | [Legislation](https://www.legislation.gov.uk/ukpga/2023/50/contents) | ⛔ **Блокировать** → разблокировать с Yoti |
| 🇦🇺 **Австралия** | ❌ **Нет** | Biometric / eKYC | Online Safety Amendment 2024 | [Legislation](https://www.legislation.gov.au/C2024A00127/asmade) | ⛔ **Блокировать** → разблокировать с Yoti/Persona |
| 🇧🇷 **Бразилия** | ❌ **Нет** | ID-верификация | Digital ECA (Lei 15.211/2025) | [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/Lei/L15211.htm) | ⛔ **Блокировать** → разблокировать с ID check |
| 🇨🇳 **Китай** | ❌ **Нет** | Нац. ID + китайский партнёр | Положение 2024 | [ChinaLawTranslate](https://www.chinalawtranslate.com/en/online-protection-of-minors/) | ⛔ **Блокировать** |
| 🇰🇷 **Юж. Корея** | ❌ **Нет** | i-PIN / мобильная верификация | PIPA Art. 22-2 | [KLRI](https://elaw.klri.re.kr/eng_mobile/viewer.do?hseq=62389&type=part&key=4) | ⛔ **Блокировать** |
| 🇲🇾 **Малайзия** | ❌ **Нет** | eKYC по нац. документу | Online Safety Act 2025 | [MayerBrown](https://www.mayerbrown.com/en/insights/publications/2025/12/malaysias-proposed-social-media-ban-for-children-how-it-compares-with-australia-and-singapore) | ⛔ **Блокировать** |
| 🌍 **Остальной мир** | ✅ Да | — | — | — | Запускать |

---

## 4. Стратегия быстрого запуска — что первым делом

### Принцип: запусти где просто → заблокируй где сложно → разблокируй позже

```
╔══════════════════════════════════════════════════════════════╗
║                    БЫСТРЫЙ ЗАПУСК (MVP)                      ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  1. DOB для всех пользователей (регистрация + соцсети)       ║
║  2. GeoIP для определения страны                             ║
║  3. Блок всех < 18                                           ║
║  4. Privacy Policy (EN + DE + FR + ES + IT + PT)             ║
║  5. Максимальные настройки приватности по умолчанию          ║
║                                                              ║
║  ЗАБЛОКИРОВАТЬ по GeoIP:                                     ║
║  ⛔ UK (GB) — нужен Yoti/OneID                               ║
║  ⛔ Австралия (AU) — нужен biometric/eKYC                    ║
║  ⛔ Бразилия (BR) — нужна ID-верификация                     ║
║  ⛔ Китай (CN) — нужен нац. ID + партнёр                     ║
║  ⛔ Южная Корея (KR) — нужен i-PIN                           ║
║  ⛔ Малайзия (MY) — нужна eKYC                               ║
║                                                              ║
║  ЗАПУСКАТЬ:                                                  ║
║  ✅ США (все штаты), Канада, ЕС (27 стран), Япония,          ║
║     Израиль, Индия, и весь остальной мир                     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

### Почему это безопасно

Блокировка по GeoIP — это **законный** подход:
- Ты не нарушаешь закон страны, если ты НЕ предоставляешь сервис в этой стране.
- UK Online Safety Act, австралийский закон, Digital ECA — все применяются только к платформам, которые **работают** в данной юрисдикции.
- Если пользователь из UK зайдёт через VPN — это его ответственность, не твоя (при условии что ты приняла «разумные меры»).

### Что показывать заблокированным пользователям

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  К сожалению, наш сервис пока недоступен        │
│  в вашей стране.                                │
│                                                 │
│  We're sorry, our service is not yet             │
│  available in your country.                     │
│                                                 │
│  Мы работаем над расширением.                    │
│  We are working on expanding availability.      │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Порядок разблокировки (по приоритету)

| Приоритет | Страна | Что нужно сделать | Примерная стоимость | Срок |
|---|---|---|---|---|
| 1 | 🇬🇧 UK | Интегрировать Yoti или OneID | $0.10–0.50 за проверку | 2–4 недели |
| 2 | 🇦🇺 Австралия | Интегрировать Yoti (facial age estimation) | $0.10–0.50 за проверку | 2–4 недели |
| 3 | 🇧🇷 Бразилия | Интегрировать ID-верификацию (Persona/Yoti) | $0.20–1.00 за проверку | 3–6 недель |
| 4 | 🇰🇷 Южная Корея | Найти корейского провайдера (i-PIN / мобильная) | Индивидуально | 2–3 месяца |
| 5 | 🇲🇾 Малайзия | Интегрировать eKYC-провайдера | Индивидуально | 2–3 месяца |
| — | 🇨🇳 Китай | Найти китайского партнёра для нац. ID | Дорого, сложно | 6+ месяцев |

### Как блокировать по GeoIP (код)

```javascript
// На бэкенде: проверка при регистрации
const BLOCKED_COUNTRIES = ['GB', 'AU', 'BR', 'CN', 'KR', 'MY'];

function checkCountryAccess(countryCode) {
  if (BLOCKED_COUNTRIES.includes(countryCode)) {
    return {
      allowed: false,
      message: 'Our service is not yet available in your country.'
    };
  }
  return { allowed: true };
}
```

---

## 5. Форма даты рождения — при регистрации и через соцсети

### Собственная регистрация (email + имя + пароль)

```
Форма регистрации:
  - Email          ← уже есть
  - Имя            ← уже есть
  - Пароль         ← уже есть
  - Дата рождения  ← ДОБАВИТЬ (день / месяц / год)
```

### Вход через Google / Facebook / Apple

**Ни один провайдер НЕ передаёт дату рождения надёжно:**

| Провайдер | Передаёт DOB? | Что делать |
|---|---|---|
| **Google** | Редко (зависит от scope) | Показать форму DOB |
| **Facebook** | Редко (нужно разрешение `user_birthday`) | Показать форму DOB |
| **Apple** | **Никогда** | **Всегда** показать форму DOB |

**Поток:**
```
1. Пользователь нажимает «Войти через Google/Facebook/Apple»
2. Получаем профиль (email, имя)
3. Показываем экран:
   ┌─────────────────────────────────────┐
   │  Для завершения регистрации         │
   │  укажите дату рождения:             │
   │                                     │
   │  [ДД] / [ММ] / [ГГГГ]              │
   │                                     │
   │  Дата используется только для       │
   │  проверки возраста и не сохраняется  │
   │                                     │
   │         [ Продолжить ]              │
   └─────────────────────────────────────┘
4. Рассчитать возраст → если < 18 → отказать
5. Удалить дату рождения, хранить только age_bracket
```

---

## 6. App Store и Google Play — как опубликовать 18+ приложение

### Apple App Store

| Что сделать | Зачем | Линк |
|---|---|---|
| Заполнить **опросник рейтинга** в App Store Connect | Получить правильный рейтинг (17+ или 18+) | [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) |
| Выбрать рейтинг **17+** или **18+** | Новые рейтинги добавлены в 2025 | [Обновление рейтингов](https://developer.apple.com/news/?id=5iajbof4) |
| **НЕ** ставить в категорию Kids | У тебя 18+ соцсеть | — |
| Интегрировать **Apple Age Signals API** | Для штатов США с законами о верификации | [Apple Developer](https://developer.apple.com/) |

### Google Play

| Что сделать | Зачем | Линк |
|---|---|---|
| Указать **целевую аудиторию 18+** в Play Console | Правильная категоризация | [Play Console Help](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en) |
| Включить **«Restrict Declared Minors»** | Запрет загрузки для несовершеннолетних | [Families Policy](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en) |
| Интегрировать **Google Play Age Signals API** | Для штатов США | [Age Signals](https://support.google.com/googleplay/android-developer/answer/16569691?hl=en) |

### Что нужно чтобы ТОЧНО опубликовали

1. ✅ Рейтинг 17+ / 18+
2. ✅ НЕ в категории Kids/Families
3. ✅ Модерация UGC (пользовательского контента) — система жалоб, блокировки
4. ✅ Privacy Policy (обязательна для обоих магазинов)
5. ✅ Механизм проверки возраста (DOB форма — достаточно для публикации)
6. ✅ «Restrict Declared Minors» включено (Google Play)

> **Apple и Google НЕ требуют** enhanced verification (Yoti и т.п.) для публикации. Это требования ЗАКОНОВ стран, не магазинов. Магазинам достаточно: правильный рейтинг + DOB форма + Privacy Policy.

---

## 7. Какие данные хранить, какие удалять

| Данные | Хранить? | Причина | Закон |
|---|---|---|---|
| **Дата рождения** | ❌ **УДАЛИТЬ СРАЗУ** | Минимизация данных | [GDPR Art. 5(1)(c)](https://gdpr-info.eu/art-5-gdpr/), [COPPA §312.7](https://www.ecfr.gov/current/title-16/chapter-I/subchapter-C/part-312/section-312.7) |
| **Возрастная группа** (`18+` / `under18`) | ✅ Да | Контроль доступа | — |
| **Страна** (код) | ✅ Да | Определение юрисдикции | — |
| **IP-адрес** | ❌ **НЕ ХРАНИТЬ** после GeoIP | IP = персональные данные | [GDPR Recital 30](https://gdpr-info.eu/recitals/no-30/) |

### Важно

- DOB НЕ должна попадать в логи, аналитику, бэкапы.
- Расчёт возраста → запись `age_bracket` → удаление DOB — всё в одной транзакции.
- Если у тебя серверные логи записывают тела запросов — убери DOB из логирования.

---

## 8. Чек-лист перед запуском

### ДО ЗАПУСКА — обязательно

- [ ] Добавить **поле DOB** в собственную форму регистрации
- [ ] Добавить **экран DOB** после входа через Google / Facebook / Apple
- [ ] Реализовать **GeoIP** для определения страны (Cloudflare / MaxMind)
- [ ] Реализовать **блокировку стран**: GB, AU, BR, CN, KR, MY
- [ ] Реализовать расчёт возраста → если < 18 → **блок**
- [ ] **Удалять DOB** сразу после расчёта (в той же транзакции)
- [ ] Хранить только: `age_bracket` + `country`
- [ ] **НЕ** хранить IP-адрес после GeoIP
- [ ] DOB не попадает в логи, аналитику, бэкапы
- [ ] Настройки приватности — **максимальные по умолчанию** (требование Калифорнии)
- [ ] **Privacy Policy** на EN + DE + FR + ES + IT + PT:
  - Описать сбор DOB (цель: проверка возраста, удаление сразу)
  - Описать GeoIP (цель: определение юрисдикции)
  - Указать правовое основание ([GDPR Art. 6(1)(b)](https://gdpr-info.eu/art-6-gdpr/) или (f))
- [ ] **Terms of Service** — минимальный возраст 18+

### App Store (Apple)

- [ ] Рейтинг **17+** или **18+** в App Store Connect
- [ ] **НЕ** в категории Kids
- [ ] Модерация UGC (система жалоб)

### Google Play

- [ ] Целевая аудитория **18+**
- [ ] «Restrict Declared Minors» — **включить**
- [ ] Модерация UGC (система жалоб)

### ПОСЛЕ ЗАПУСКА — по приоритету

- [ ] 🇬🇧 Интегрировать **Yoti** или **OneID** → разблокировать UK
- [ ] 🇦🇺 Интегрировать **Yoti** (facial age) → разблокировать Австралию
- [ ] 🇧🇷 Интегрировать **ID-верификацию** → разблокировать Бразилию
- [ ] 🇰🇷 Найти корейского провайдера → разблокировать Юж. Корею
- [ ] 🇲🇾 Интегрировать **eKYC** → разблокировать Малайзию
- [ ] Для ЕС: назначить **представителя** (GDPR Art. 27) если нет офиса
- [ ] Для ЕС: подготовить **DPIA** (Data Protection Impact Assessment)

### МОНИТОРИТЬ

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
| 🇪🇺 ЕС | GDPR Art. 8 (дети) | https://gdpr-info.eu/art-8-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 6 (основания обработки) | https://gdpr-info.eu/art-6-gdpr/ |
| 🇪🇺 ЕС | GDPR Art. 27 (представитель) | https://gdpr-info.eu/art-27-gdpr/ |
| 🇪🇺 ЕС | DSA | https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| 🇫🇷 Франция | Loi 2024-449 | https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049563651 |
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

### Магазины приложений

| Что | Линк |
|---|---|
| Apple App Store Review Guidelines | https://developer.apple.com/app-store/review/guidelines/ |
| Google Play Families Policy | https://support.google.com/googleplay/android-developer/answer/9893335?hl=en |
| Google Play целевая аудитория | https://support.google.com/googleplay/android-developer/answer/9867159?hl=en |
| Google Play Age Signals API | https://support.google.com/googleplay/android-developer/answer/16569691?hl=en |

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
