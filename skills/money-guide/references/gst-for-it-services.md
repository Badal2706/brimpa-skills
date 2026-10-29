# GST for an IT service provider (websites, software, hosting)

Status date: 30 Oct 2026.
- The registration (CGST s.22) and composition (CGST s.10) rules below were read in the CBIC text: state them as fact.
- Items marked "per secondary sources" come from news or CA sources.
- Items marked [verify] go on the verify-with-CA list.

## 1. Do you have to register?

- **Mandatory** when aggregate turnover in the FY **exceeds Rs 20 lakh** (CGST s.22).
- The limit is **Rs 10 lakh** if you supply from a special category State. After the exclusions in the Explanation, that effectively means **Manipur, Mizoram, Nagaland and Tripura**.
- The Rs 40 lakh limit applies only to suppliers of goods exclusively. It does not apply to IT services.
- Aggregate turnover includes exports and exempt supplies [verify wording].
- Inter-State supplies of services below the threshold do not force registration (IGST exemption notification 10/2017-IT) [verify].
- **Voluntary registration** is allowed.

**Decision guide:**

| Client mix | Under Rs 20 lakh | Over Rs 20 lakh |
|---|---|---|
| Mostly GST-registered companies (can take ITC) | Register voluntarily: they can claim the 18%, you look established, and you can claim ITC on your own costs | Mandatory |
| Mostly clinics, hospitals, individuals (cannot take ITC) | Stay unregistered if you can: GST would be a pure 18% cost to them | Mandatory. Consider composition if every client is in your own State (section 3) |
| Foreign clients | Stay unregistered or register; exports are zero-rated either way | Mandatory, and file an LUT |

## 2. Rate and codes

- **18%** for IT and software services, SAC group 9983. Examples: 998313 IT consulting, 998314 IT design and development, 998315 hosting and infrastructure.
- After the GST rate rationalisation effective **22 Sep 2025**, the slabs are mostly 5% / 18% / 40% (demerit), and IT services stayed at 18% (per secondary sources) [verify SAC-level rate].
- **Split:** CGST 9% + SGST 9% when the client is in your State; IGST 18% when the client is in another State.

**Clinic and hospital clients:**
- Most healthcare services by clinical establishments are exempt [verify notification 12/2017-CT(R)]. These clients **cannot claim ITC**, so your 18% is a real cost to them.
- Quote "fee + 18% GST" explicitly from the first conversation, so the GST does not surprise them at the invoice.
- Expect price pushback.

## 3. Composition scheme for services, CGST s.10(2A)

- **Eligibility:** previous-FY aggregate turnover up to **Rs 50 lakh**.
- **Rate:** up to 3% CGST plus equivalent SGST; prescribed at **6% total** (per secondary sources: Notification 2/2019-CT(R)).
- **Barred** if you make any **inter-State outward supply** (including exports and any client in another State), supply through an e-commerce operator that collects TCS, or make non-taxable supplies.
- **Consequences (s.10(4)):** you cannot collect GST from the client, and you get no ITC. You pay the 6% out of your fee.
- **When it suits:** a small, purely intra-State practice serving clinics and individuals. On a Rs 1,00,000 job, regular GST costs the clinic Rs 1,18,000. Under composition you might charge about Rs 1,06,000 and pay about Rs 6,360 (6% of turnover) yourself.
- **When it does not suit:** any out-of-State or foreign client, or B2B clients who want ITC.
- Composition **does** exist for services; the common claim that it is "not available for services" is wrong.

## 4. Export of services (foreign clients)

The export rules below are [verify]: IGST Act s.2(6) and s.16.

- **Zero-rated** when all of these hold:
  - you are in India;
  - the client and the place of supply are outside India;
  - payment comes in convertible foreign exchange (or INR where RBI permits);
  - you and the client are not merely establishments of the same person.
- **File an LUT (Form RFD-11) every FY,** before the first export invoice of the year, so you export without paying IGST and waiting for a refund.
- **Invoice endorsement:** "Supply meant for export under LUT without payment of IGST".
- Keep FIRC or e-FIRA bank records for every receipt.
- Foreign clients do not deduct Indian TDS. Set aside your income-tax percentage yourself.

## 5. Invoices

These rules (CGST Rules 46/47) are [verify]:
- Issue within **30 days** of supplying the service.
- Serial number: up to 16 characters, unique per FY (e.g. `BR/26-27/0042`).
- Show your GSTIN and the client's (B2B), the client's name and address, the place of supply (State), the SAC, the taxable value, the rate, and the CGST+SGST or IGST split.
- SAC digits: 4 digits up to Rs 5 crore aggregate turnover, 6 digits above (e-invoice portal notice, Notification 78/2020-CT).
- **E-invoicing (IRN)** is mandatory above Rs 5 crore aggregate turnover in any FY since 2017-18 (Notification 10/2023-CT, from 1 Aug 2023; unchanged as of Oct 2026 per secondary sources, and a cut to Rs 2 crore is only a proposal) [verify]. Not relevant yet.

**Practical invoice line for a clinic website:**
```
Website design and development, Phase 2 (SAC 998314)   Rs 60,000
CGST 9%                                                Rs  5,400
SGST 9%                                                Rs  5,400
Total                                                  Rs 70,800
TDS, if the client deducts it, is computed on Rs 60,000 (fee excluding GST) [verify]
```

## 6. Returns and payments

All dates [verify]; check the portal, because one-off extensions happen.

| Filer type | Return | Due |
|---|---|---|
| Monthly | GSTR-1 (sales) | 11th of next month |
| Monthly | GSTR-3B (summary + payment) | 20th of next month |
| QRMP (aggregate turnover up to Rs 5 crore) | PMT-06 payment for months 1 and 2 | 25th of the next month |
| QRMP | IFF (optional B2B invoices) for months 1 and 2 | 13th of the next month |
| QRMP | GSTR-1 | 13th after the quarter |
| QRMP | GSTR-3B | 22nd (Category X: Gujarat, Maharashtra, Karnataka, MP, Goa, Kerala, TN, Telangana, AP, Chhattisgarh and some UTs) or 24th (other States) after the quarter |
| All | GSTR-9 annual return | 31 December after the FY. Optional up to Rs 2 crore; per secondary sources, made permanent from FY 2024-25 |
| Above Rs 5 crore | GSTR-9C self-certified reconciliation statement, with GSTR-9 | 31 December after the FY [verify] |

- **QRMP suits a solo freelancer.** Use the QRMP scheme with the fixed-sum or self-assessed PMT-06 method.
- **3-year bar** (per secondary sources: GSTN advisory, enforced from late 2025): returns cannot be filed more than 3 years after their due date.
- **Interest and late fees** [verify]:
  - Late payment: 18% p.a.
  - GSTR-3B late fee: Rs 50 a day (Rs 20 for nil returns), subject to caps.
- **Not registering once over the threshold:** penalty of 100% of the tax plus interest [verify].
- **Collecting GST and not paying it:** prosecution and arrest above thresholds [verify].
- **Fake ITC invoices:** the same.

## 7. Monthly GST routine (10 minutes)

1. Every receipt: move the GST portion to the tax vault the same day (see `money-system.md`).
2. By the 10th: upload invoices to IFF/GSTR-1 (or the monthly GSTR-1 by the 11th).
3. Check the GSTR-2B ITC on your purchases (laptop, hosting, SaaS bills that carry your GSTIN).
4. Pay PMT-06 or GSTR-3B from the vault.
5. Once a year, before 1 April: file the LUT if you have foreign clients.
