---
title: Presumptive tax for IT freelancers, TY 2026-27 - s.58 (old 44ADA) limits, effective rates and the 5% cash cliff
topic: finance/tax-india
tags: [tax, india, presumptive, 44ada, section-58, freelancer, it-services, effective-rate, new-regime, advance-tax, books-vs-presumptive, legal-vs-illegal]
source: Income-tax Act 2025 as amended by Finance Act 2026 (s.58, 62(4), 63, 156, 202, 408), Memorandum to Finance Bill 2026 (rates); tax figures computed with a Python slab calculator on 2026-10-30; plus a worked comparison from a Hindi tax-consultant reel (Aug 2026, middle re-transcribed with Whisper large-v3), recomputed
source_type: docs
confidence: high
date: 2026-10-30
---

# Presumptive tax for IT freelancers (s.58 Sl. 3, old 44ADA)

## The point in one line
An Indian resident doing IT work as a profession can declare 50% of gross receipts as profit, with no books, no audit and one advance-tax payment by 15 March, on receipts up to Rs 50 lakh, or Rs 75 lakh if cash is at most 5%. In the new regime that works out to 0-9.8% of receipts.

## Rules (Income-tax Act 2025, as of Oct 2026)
- **Who:** a resident individual or a partnership firm. Not an LLP (s.58(11)(b)).
- **Profession:** s.62(4)(a) lists "information technology" among the specified professions.
- **Limit:** gross receipts up to Rs 50 lakh, or Rs 75 lakh if cash receipts are at most 5%. A non-account-payee cheque or draft counts as cash (s.58(9)).
- **Deemed profit:** 50% of receipts, or more if you declare more. No further deductions (s.58(4)).
- **Declaring less than 50%:** needs books and a tax audit (s.58(3), s.62, s.63).
- **No tax audit** when profit is declared under s.58 (s.63(2)). Otherwise a profession with receipts over Rs 50 lakh needs an audit.
- **Advance tax:** the whole amount by 15 March; payment by 31 March still counts (s.408(2)-(3)).
- **Rates on top:** the new-regime slabs (s.202) apply to the deemed income. The rebate under s.156(2) makes total income up to Rs 12 lakh nil.

## Effective tax (new regime, no other income, 4% cess included; verified by calculator)

| Gross receipts | Deemed income | Tax | % of receipts |
|---|---|---|---|
| Rs 20 lakh | Rs 10 lakh | 0 | 0% |
| Rs 24 lakh | Rs 12 lakh | 0 | 0% |
| Rs 30 lakh | Rs 15 lakh | Rs 1,09,200 | 3.6% |
| Rs 40 lakh | Rs 20 lakh | Rs 2,08,000 | 5.2% |
| Rs 45 lakh | Rs 22.5 lakh | Rs 2,73,000 | 6.1% |
| Rs 50 lakh | Rs 25 lakh | Rs 3,43,200 | 6.9% |
| Rs 60 lakh | Rs 30 lakh | Rs 4,99,200 | 8.3% |
| Rs 70 lakh | Rs 35 lakh | Rs 6,55,200 | 9.4% |
| Rs 75 lakh | Rs 37.5 lakh | Rs 7,33,200 | 9.8% |

The old regime loses at every one of these levels for a typical freelancer. It needs about Rs 7.5 lakh of deductions at Rs 22.5 lakh income, and Rs 7.75 lakh above Rs 24 lakh, just to match.

## Example: the 5% cash cliff at Rs 70 lakh receipts
- **Cash at most Rs 3.5 lakh:** deemed Rs 35 lakh, tax Rs 6,55,200, no audit.
- **Cash above 5%:** the presumptive limit drops to Rs 50 lakh. You need books and an audit, and tax is on actual profit. At an actual profit of Rs 50 lakh, tax is Rs 11,23,200 (Rs 4.68 lakh more), plus audit fees.

## Things that do not work under presumptive
- **Paying a spouse or parent.** Deemed income stays at 50% of receipts, so the tax saving is zero.
- **"Claiming expenses"** (laptop, rent, internet). They are already deemed to be inside the 50%.

## Caveats
- **Profession vs business.** Treating IT services as a *business* under s.58 Sl. 1 (6% / 8% deemed, up to Rs 3 crore) is an aggressive position. s.62(4) names IT as a profession. At Rs 45 lakh receipts the gap is Rs 2.73 lakh a year. Get a written CA opinion first; packaged SaaS or product licences are a stronger case than custom contract work.
- TDS of 10% from clients usually exceeds this tax, so file on time to get the refund.
- Whether GST collected is part of "gross receipts" depends on the accounting [verify with a CA].
- ITR forms for TY 2026-27 were not yet seen as of Oct 2026.
- Not tax advice.

## Presumptive vs actual expenses: a reel's example recomputed (added 2026-10-30)
Source: a Hindi reel by a tax consultant (Aug 2026) comparing two freelancers with Rs 30 lakh receipts; classified **legal** (a scheme written into the Act, not a loophole).

| | Ankit (books, actual expenses) | Priya (presumptive, s.58 Sl. 3) |
|---|---|---|
| Receipts | Rs 30,00,000 | Rs 30,00,000 |
| Expenses | Rs 6,00,000 with bills (laptop, internet, office rent) | deemed 50% |
| Taxable income | Rs 24,00,000 | Rs 15,00,000 |
| Tax, new regime incl. cess | Rs 3,12,000 | Rs 1,09,200 |

Difference Rs 2,02,800 a year. Working for Rs 24 lakh: 4-8 L 5% = 20,000; 8-12 L 10% = 40,000; 12-16 L 15% = 60,000; 16-20 L 20% = 80,000; 20-24 L 25% = 1,00,000; total 3,00,000 + 4% cess.

**When books win:** provable costs above about 50% of receipts (paid contractors or staff, heavy hardware), a business loss to carry forward, or an LLP (presumptive not available). Above Rs 50 lakh receipts, books also mean a tax audit (fee for not getting one: Rs 75,000 / Rs 1.5 lakh, s.428(c)).

### What the source got wrong
- Calls it "Section 44ADA"; from 1 Apr 2026 it is s.58 Table Sl. 3 of the Income-tax Act 2025 (substance unchanged).
- "If 95% of payments are digital the limit is Rs 75 lakh": the test is cash receipts at most 5% of gross receipts, and non-account-payee cheques count as cash.
- "Lakhs of difference in tax": the taxable gap is Rs 9 lakh; the tax gap is about Rs 2 lakh.
- Omits eligibility (resident, not an LLP, listed professions only) and that declaring below 50% brings books plus audit.

## Related
- skills/money-guide/SKILL.md and skills/money-guide/references/worked-examples.md (Rs 20 / 45 / 70 lakh fully worked)
- finance/income-tax-act-2025-section-mapping.md
- finance/tax-saving-moves-ranked-freelancer.md
- finance/freelancer-money-system.md
