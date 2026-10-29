# Worked examples, TY 2026-27

All figures were checked with a small Python calculator (`python -I`, 30 Oct 2026) that applies the s.202 and old-regime slabs, the s.156 rebate and marginal relief, surcharge with marginal relief, and 4% cess.

Assumptions unless stated:
- Resident individual below 60, with no other income.
- Professional receipts from IT services are taxed under s.58 Table Sl. 3 (old 44ADA, 50% deemed). This is the conservative reading.
- "Old-regime stack" = Rs 2,75,000: s.123 (80C) Rs 1,50,000 + s.124(3) (80CCD(1B)) Rs 50,000 + s.126 (80D) self Rs 25,000 + s.126 senior parents Rs 50,000.

Use the same layout when you compute for the user: inputs, then each regime slab by slab, then the comparison, then cash-flow consequences (TDS, advance tax, GST, how much to set aside).

## Contents

1. Presumptive freelancer, Rs 20 lakh receipts
2. Presumptive freelancer, Rs 45 lakh receipts
3. Presumptive freelancer, Rs 70 lakh receipts (the 5% cash condition)
4. Salary plus freelance
5. Company vs proprietor at Rs 40 lakh profit, retained vs distributed
6. Why paying your spouse does not cut presumptive tax

---

## 1. Presumptive freelancer, Rs 20 lakh receipts

**Inputs:** gross receipts Rs 20,00,000, all by bank or UPI.

**Deemed income** = 50% x 20,00,000 = **Rs 10,00,000**.

**New regime:**

| Slab | Amount | Tax |
|---|---|---|
| 0 - 4,00,000 at 0% | 4,00,000 | 0 |
| 4,00,001 - 8,00,000 at 5% | 4,00,000 | 20,000 |
| 8,00,001 - 10,00,000 at 10% | 2,00,000 | 20,000 |
| Slab tax | | 40,000 |
| Rebate s.156(2) (income at most Rs 12 lakh) | | -40,000 |
| **Tax** | | **0** |

**Old regime with the stack:**
- Taxable income = 10,00,000 - 2,75,000 = 7,25,000.
- Slab tax = 0 + 12,500 (5% of 2,50,000) + 45,000 (20% of 2,25,000) = 57,500.
- Plus cess 2,300 = **Rs 59,800**.
- With no deductions it would be Rs 1,17,000.

**Result:** the new regime wins by Rs 59,800, and the tax is nil.

**Cash-flow consequences:**
- **TDS.** If every client deducts 10%, Rs 2,00,000 is withheld against zero tax. The whole Rs 2 lakh is a refund, so file the return on time.
- **Lower deduction.** Ask about the automated lower-deduction certificate [verify that it is live].
- **Advance tax:** none, because tax after TDS is below Rs 10,000.
- **GST.** Registration is mandatory only when aggregate turnover **exceeds** Rs 20 lakh (Rs 10 lakh in Manipur, Mizoram, Nagaland and Tripura). At exactly Rs 20 lakh it is not yet required; the next invoice crosses the line. Decide before that invoice (see `gst-for-it-services.md`).
- **Headroom.** Receipts up to Rs 24,00,000 still give nil tax (deemed Rs 12 lakh).
- **Set aside:** 0% for income tax. Set aside 100% of any GST collected.

## 2. Presumptive freelancer, Rs 45 lakh receipts

**Inputs:** gross receipts Rs 45,00,000. The limit is below Rs 50 lakh, so the 5% cash condition does not apply. There is no audit because profit is declared under s.58.

**Deemed income** = 50% x 45,00,000 = **Rs 22,50,000**.

**New regime:**

| Slab | Amount | Tax |
|---|---|---|
| 0 - 4 lakh at 0% | 4,00,000 | 0 |
| 4 - 8 lakh at 5% | 4,00,000 | 20,000 |
| 8 - 12 lakh at 10% | 4,00,000 | 40,000 |
| 12 - 16 lakh at 15% | 4,00,000 | 60,000 |
| 16 - 20 lakh at 20% | 4,00,000 | 80,000 |
| 20 - 22.5 lakh at 25% | 2,50,000 | 62,500 |
| Slab tax | | 2,62,500 |
| Cess 4% | | 10,500 |
| **Tax** | | **2,73,000** (6.07% of receipts) |

**Old regime with the stack:**
- Taxable income = 22,50,000 - 2,75,000 = 19,75,000.
- Slab tax = 12,500 + 1,00,000 + 30% x 9,75,000 (2,92,500) = 4,05,000.
- Plus cess 16,200 = **Rs 4,21,200**.
- The old regime would need about Rs 7,50,000 of deductions just to break even.

**Result:** new regime, saving Rs 1,48,200 over the old.

**Cash-flow consequences:**
- **TDS, all clients at 10%.** Rs 4,50,000 withheld against Rs 2,73,000 of tax, so the refund is Rs 1,77,000.
- **TDS, mixed clients.** Say Rs 30 lakh comes from companies deducting 10% (Rs 3,00,000 TDS) and Rs 15 lakh from small clinics or foreign clients with no TDS. TDS of Rs 3,00,000 still exceeds the Rs 2,73,000 tax, so no advance tax is due and the refund is Rs 27,000.
- **GST.** Registration is mandatory above Rs 20 lakh. On Rs 45 lakh of domestic taxable fees, 18% GST adds Rs 8,10,000. That money goes straight to the GST vault, because it is not yours.
- **Set aside:** about 6-7% of fee receipts that carry no TDS. Receipts with 10% TDS already over-cover the tax.
- **Aggressive position, for a CA only.** If the work were treated as a software *business* under Sl. 1 at 6% deemed profit, deemed income would be 2,70,000 and tax nil, saving Rs 2,73,000 a year. Because s.62(4) names "information technology" as a specified profession, this reading is aggressive. Do not file it without a written CA opinion on the actual contracts.

## 3. Presumptive freelancer, Rs 70 lakh receipts

**The condition.** The Rs 75 lakh limit applies only if cash receipts are at most 5% of gross receipts: 5% x 70,00,000 = **Rs 3,50,000 maximum in cash**. A non-account-payee cheque or draft counts as cash.

**Deemed income** = 50% x 70,00,000 = **Rs 35,00,000**.

**New regime:**
- Slab tax up to 24 lakh = 3,00,000.
- Plus 30% x (35,00,000 - 24,00,000) = 3,30,000.
- Slab tax 6,30,000; cess 25,200.
- **Tax Rs 6,55,200** (9.36% of receipts).

**Old regime with the stack:**
- Taxable income = 32,25,000.
- Slab tax = 1,12,500 + 30% x 22,25,000 (6,67,500) = 7,80,000.
- Plus cess 31,200 = **Rs 8,11,200**.

**Result:** new regime. There is no tax audit (s.63(2)), because profit is declared under s.58.

**The cliff if cash goes above 5%.** The presumptive limit falls back to Rs 50 lakh, so Rs 70 lakh of receipts are outside it. You then need books, a tax audit (profession receipts over Rs 50 lakh), and tax on actual profit:
- Actual profit Rs 45 lakh: tax Rs 9,67,200, which is Rs 3,12,000 more.
- Actual profit Rs 50 lakh: tax Rs 11,23,200, which is Rs 4,68,000 more.
- Plus the audit fee, and the s.428(c) fee of Rs 75,000 / Rs 1,50,000 if the audit is missed.

**Collect everything by bank or UPI.**

**Advance tax:**
- Suppose only Rs 30 lakh of receipts carried 10% TDS (Rs 3,00,000).
- Balance = 6,55,200 - 3,00,000 = **Rs 3,55,200, due in full by 15 Mar 2027** (s.408(2)).
- If it is missed: 1% on the March shortfall under s.425, then 1% a month from 1 Apr 2027 under s.424 until paid.

**Next decision.** At Rs 75 lakh the presumptive ceiling is reached (tax Rs 7,33,200, 9.8% of receipts). Above it, compare a company (example 5) before the year starts, not after.

## 4. Salary plus freelance

**Inputs:** salary Rs 10,00,000, plus freelance IT receipts of Rs 8,00,000 (presumptive, deemed Rs 4,00,000).

**New regime:**
- Salary income = 10,00,000 - 75,000 standard deduction = 9,25,000.
- Freelance deemed income = 50% x 8,00,000 = 4,00,000.
- Total income = **Rs 13,25,000**.

| Slab | Tax |
|---|---|
| 0 - 4 lakh | 0 |
| 4 - 8 lakh at 5% | 20,000 |
| 8 - 12 lakh at 10% | 40,000 |
| 12 - 13.25 lakh at 15% | 18,750 |
| Slab tax | 78,750 |

- Marginal relief check: tax cannot exceed income above Rs 12 lakh (1,25,000). 78,750 is lower, so no relief applies.
- Cess 3,150. **Tax Rs 81,900.**
- **The lesson.** Salary alone (Rs 9,25,000) is nil tax. The freelance work therefore costs Rs 81,900, which is 10.2% of the freelance receipts. The rebate is all-or-nothing on *total* income.
- **Headroom.** Freelance receipts up to Rs 5,50,000 (deemed Rs 2,75,000, total Rs 12,00,000) would have cost **nil**. Marginal relief covers total income up to about Rs 12,70,588.

**Old regime:**
- Total income before deductions = 10,00,000 - 50,000 + 4,00,000 = 13,50,000.

| Deductions | Taxable | Tax incl. cess |
|---|---|---|
| Stack Rs 2,75,000 | 10,75,000 | Rs 1,40,400 |
| + self-occupied home-loan interest Rs 2,00,000 | 8,75,000 | Rs 91,000 |
| + HRA exemption Rs 1,50,000 | 7,25,000 | Rs 59,800 |

- Break-even: about Rs 5,19,000 of deductions.
- **Result:** the old regime wins only with the full stack plus a home loan plus HRA (Rs 22,100 cheaper).
- **Lock-in.** With business income, choosing the old regime is made by form before the due date. It carries forward, and you can withdraw only once (s.202(4)). Do not choose it for one year's HRA.

**Legal fix in the new regime: employer NPS (s.124(1)-(2)).**
- Assume basic pay is Rs 5,00,000. The employer contributes 14% x 5,00,000 = Rs 70,000 to NPS inside the same CTC.
- Total income = 13,25,000 - 70,000 = 12,55,000.
- Slab tax = 60,000 + 15% x 55,000 = 68,250. Marginal relief caps it at 55,000 (the income above Rs 12 lakh).
- Plus cess 2,200 = **Rs 57,200. Saving Rs 24,700.**
- The Rs 70,000 is locked in NPS.

**Advance tax:**
- Employer TDS covers the salary part.
- If freelance clients deducted 10% (Rs 80,000), the balance of Rs 1,900 is below Rs 10,000, so no advance tax.
- With no client TDS, pay Rs 81,900 by 15 Mar 2027.

**ITR:** a form that takes both salary and presumptive income [verify the TY 2026-27 form].

## 5. Company vs proprietor at Rs 40 lakh profit

**Inputs:**
- Real profit Rs 40,00,000.
- Example: receipts Rs 90 lakh, minus Rs 50 lakh for two contractors, tools and hosting.
- Receipts are above Rs 75 lakh, so presumptive is unavailable. Both structures need books and an audit (a tax audit for the proprietor, a statutory audit for the company).
- New regime throughout.

**A. Proprietor:**
- Total income Rs 40,00,000.
- Slab tax = 3,00,000 + 30% x 16,00,000 (4,80,000) = 7,80,000.
- Plus cess 31,200 = **Rs 8,11,200** (20.28%).
- Cash after tax: **Rs 31,88,800**.
- The old regime with the stack would be Rs 9,67,200, so not better.

**B. Private company (s.200, 22%), Badal's salary Rs 12,75,000, rest retained:**

| Step | Amount |
|---|---|
| Company profit after salary = 40,00,000 - 12,75,000 | 27,25,000 |
| Tax at 22% | 5,99,500 |
| Surcharge 10% | 59,950 |
| Cess 4% on 6,59,450 | 26,378 |
| **Company tax (25.168%)** | **6,85,828** |
| Badal's salary tax: 12,75,000 - 75,000 = 12,00,000, rebate | 0 |
| **Total tax** | **6,85,828 (17.15%)** |
| Profit retained in the company after tax | 20,39,172 |

- Saving vs proprietor: 8,11,200 - 6,85,828 = **Rs 1,25,372 a year**.
- Company compliance costs roughly Rs 40,000 to Rs 1,50,000 a year [verify], so the **net saving is about Rs 0 to Rs 85,000**. At Rs 40 lakh this is close to break-even. It grows with profit: at Rs 60 lakh profit, retained, the tax rate is 19.8% vs 26.3%.
- **Add employer NPS.** Contribute 14% of basic, with basic assumed at 50% of salary: 14% x 6,37,500 = Rs 89,250. That lowers company tax by 89,250 x 25.168% = Rs 22,462, to Rs 6,63,366. The money is locked until retirement.

**C. Same company, retained profit paid out as dividend:**

| Step | Amount |
|---|---|
| Dividend = 27,25,000 - 6,85,828 | 20,39,172 |
| Badal's total income = 12,00,000 + 20,39,172 | 32,39,172 |
| Slab tax = 3,00,000 + 30% x 8,39,172 | 5,51,752 |
| Cess 4% | 22,070 |
| **Badal's personal tax** (dividend TDS of 10%, Rs 2,03,917, is credited against it) | **5,73,822** |
| **Total tax = 6,85,828 + 5,73,822** | **12,59,650 (31.49%)** |
| Cash in hand = 12,75,000 + 20,39,172 - 5,73,822 | 27,40,350 |

- **Rs 4,48,450 less cash in hand** than the proprietor.

**Verdict:**
- A company at Rs 40 lakh profit only pays off if most of the profit stays in the company for hiring or building a product, and the liability shield or client requirements matter.
- If the profit will be spent, stay a proprietor.
- If receipts can stay at or below Rs 75 lakh, presumptive is cheaper still: at Rs 75 lakh, Rs 7,33,200 with no audit.

## 6. Why paying your spouse does not cut presumptive tax

**Under presumptive (s.58 Sl. 3):**
- Deemed income is 50% of receipts whatever you spend, and s.58(4) allows no further deduction.
- Paying your spouse Rs 6 lakh for design or accounts work does **not** lower your Rs 22.5 lakh deemed income in example 2. Saving: **Rs 0**.
- The spouse also has Rs 6 lakh of their own income, which is nil tax only if their total stays at or below Rs 12 lakh.

**On books (example 5A, Rs 40 lakh profit):**
- A genuine market-rate Rs 6 lakh fee to a spouse who actually does the work is a business expense.
- Your income falls to Rs 34,00,000: 3,00,000 + 30% x 10,00,000 = 6,00,000; plus cess = **Rs 6,24,000**.
- The spouse's Rs 6 lakh is nil tax.
- Saving: 8,11,200 - 6,24,000 = **Rs 1,87,200**.
- **Conditions:**
  - The work must be real, documented and at fair value, paid by bank transfer, with TDS where it applies.
  - Otherwise the clubbing rule (s.99, old 64) adds the income back to you.
  - The detail of the clubbing exception for income from a spouse's own skills needs a CA [verify].
  - Paying a family member who does no work is misreporting (200% penalty, s.439).
