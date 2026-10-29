"""TY 2026-27 individual tax calculator (Income-tax Act 2025 slabs per Finance Act 2026 memo).
Resident individual below 60. Normal-rate income only (no special-rate capital gains)."""

NEW = [(400000, 0), (800000, .05), (1200000, .10), (1600000, .15), (2000000, .20), (2400000, .25), (None, .30)]
OLD = [(250000, 0), (500000, .05), (1000000, .20), (None, .30)]


def slab(inc, slabs):
    tax, lo = 0.0, 0
    for hi, r in slabs:
        top = inc if hi is None else min(inc, hi)
        if top > lo:
            tax += (top - lo) * r
        if hi is None or inc <= hi:
            break
        lo = hi
    return tax


def surcharge(inc, base, slabs, regime):
    # thresholds: 50L 10%, 1cr 15%, 2cr 25%, (old) 5cr 37%; marginal relief at each threshold
    steps = [(5000000, .10), (10000000, .15), (20000000, .25)]
    if regime == "old":
        steps.append((50000000, .37))
    rate, thr = 0, None
    for t, r in steps:
        if inc > t:
            rate, thr = r, t
    if not rate:
        return 0.0
    sc = base * rate
    # marginal relief: tax+surcharge cannot exceed tax at threshold (+ its surcharge) + income above threshold
    prev_rate = 0
    for t, r in steps:
        if t == thr:
            break
        prev_rate = r
    at_thr = slab(thr, slabs) * (1 + prev_rate)
    if base + sc > at_thr + (inc - thr):
        sc = at_thr + (inc - thr) - base
    return sc


def tax_new(inc):
    t = slab(inc, NEW)
    if inc <= 1200000:
        t = max(0, t - 60000)
    else:
        t = min(t, inc - 1200000)  # marginal relief s.156(2)(b)
    t += surcharge(inc, t, NEW, "new")
    return round(t * 1.04)


def tax_old(inc):
    t = slab(inc, OLD)
    if inc <= 500000:
        t = max(0, t - 12500)
    t += surcharge(inc, t, OLD, "old")
    return round(t * 1.04)


def L(x):
    return f"Rs {x:,.0f}"


if __name__ == "__main__":
    print("== Check memo worked figures (new regime) ==")
    for inc in [1200000, 1250000, 1500000, 2000000, 2400000, 3000000, 5000000]:
        t = tax_new(inc)
        print(f"{inc:>10,}  new {t:>10,}  ({t/inc*100:.1f}%)   old {tax_old(inc):>10,}")

    print("\n== Slab-by-slab new regime ==")
    for inc in [1000000, 2250000, 3500000, 3600000, 1325000, 2000000]:
        lo = 0; parts = []
        for hi, r in NEW:
            top = inc if hi is None else min(inc, hi)
            if top > lo:
                parts.append(f"{(top-lo):,.0f}@{int(r*100)}%={(top-lo)*r:,.0f}")
            if hi is None or inc <= hi: break
            lo = hi
        print(inc, " | ".join(parts), "slab", f"{slab(inc, NEW):,.0f}", "final", f"{tax_new(inc):,}")

    print("\n== Slab-by-slab old regime ==")
    for inc in [725000, 1975000, 3225000, 3250000, 1025000, 2340000]:
        lo = 0; parts = []
        for hi, r in OLD:
            top = inc if hi is None else min(inc, hi)
            if top > lo:
                parts.append(f"{(top-lo):,.0f}@{int(r*100)}%={(top-lo)*r:,.0f}")
            if hi is None or inc <= hi: break
            lo = hi
        print(inc, " | ".join(parts), "slab", f"{slab(inc, OLD):,.0f}", "final", f"{tax_old(inc):,}")

    print("\n== Break-even old-regime deductions (non-salary) ==")
    for g in [1500000, 2000000, 2400000, 3000000, 4000000]:
        tn = tax_new(g)
        d = 0
        while tax_old(g - d) > tn:
            d += 1000
        print(f"gross {g:,}: new {tn:,}; old needs deductions ~{d:,}")
    print("salaried (std ded 75k new / 50k old)")
    for g in [1500000, 2000000, 2400000, 3000000]:
        tn = tax_new(g - 75000)
        d = 0
        while tax_old(g - 50000 - d) > tn:
            d += 1000
        print(f"salary {g:,}: new {tn:,}; old needs deductions beyond std ~{d:,}")

    print("\n== Presumptive s.58 Sl.3 examples ==")
    stack = 150000 + 50000 + 25000 + 50000  # 80C, NPS 1B, 80D self, 80D senior parents
    for rec in [2000000, 4500000, 7000000]:
        di = rec // 2
        tn, to = tax_new(di), tax_old(di - stack)
        tds = rec * 0.10
        print(f"receipts {rec:,} deemed {di:,}: new {tn:,} ({tn/rec*100:.2f}% of receipts); "
              f"old w/ stack {stack:,} -> income {di-stack:,} tax {to:,}; TDS@10% {tds:,.0f}; refund(new) {tds-tn:,.0f}")
    # aggressive 6% reading at 45L for comparison
    print("45L at 6% (Sl.1 reading):", tax_new(int(4500000 * .06)))
    # 70L: 8% if cash
    print("\n== Salary + freelance ==")
    sal, rec = 1000000, 800000
    ti_new = sal - 75000 + rec // 2
    ti_old = sal - 50000 + rec // 2
    print("new TI", ti_new, "tax", tax_new(ti_new), "slab before relief", slab(ti_new, NEW))
    for ded in [stack, stack + 200000, stack + 200000 + 150000]:
        print(" old TI", ti_old - ded, "ded", ded, "tax", tax_old(ti_old - ded))
    # without freelance
    print("salary only new", tax_new(sal - 75000), "old w/ stack", tax_old(sal - 50000 - stack))
    print("marginal cost of freelance (new):", tax_new(ti_new) - tax_new(sal - 75000))

    print("\n== Company vs proprietor at 40L profit ==")
    P = 4000000
    prop = tax_new(P)
    print("proprietor new regime on 40L:", prop, f"{prop/P*100:.2f}%")
    print("proprietor old regime w/ stack:", tax_old(P - stack))
    sal = 1275000
    corp_rate = 0.22 * 1.10 * 1.04
    profit_after_sal = P - sal
    ctax = profit_after_sal * corp_rate
    sal_tax = tax_new(sal - 75000)
    print("corp rate", corp_rate, "company profit", profit_after_sal, "corp tax", round(ctax), "salary tax", sal_tax)
    print("retained: total tax", round(ctax + sal_tax), f"{(ctax+sal_tax)/P*100:.2f}%", "post-tax retained", round(profit_after_sal - ctax))
    div = profit_after_sal - ctax
    ti = sal - 75000 + div
    pt = tax_new(round(ti))
    print("distributed: dividend", round(div), "personal TI", round(ti), "personal tax", pt,
          "extra over salary-only", pt - sal_tax, "total", round(ctax + pt), f"{(ctax+pt)/P*100:.2f}%",
          "cash in hand", round(sal + div - pt))
    print("proprietor cash in hand", P - prop)
    # variant: with employer NPS 14% of salary (assume basic = 50% of CTC salary)
    # Variant: salary 12.75L + employer NPS on basic 50%: NPS = 0.14*637500 = 89,250 deductible both sides
    nps = round(0.14 * sal * 0.5)
    ctax2 = (P - sal - nps) * corp_rate
    print("with employer NPS", nps, "corp tax", round(ctax2), "total tax", round(ctax2 + tax_new(sal - 75000)),
          "NPS saved in corp tax", round(ctax - ctax2))
    # sanity: at 30L and 60L, 1cr the memo table
    for p in [3000000, 6000000, 10000000]:
        c = (p - sal) * corp_rate
        d = p - sal - c
        print(p, "prop", f"{tax_new(p)/p*100:.1f}%", "co retained", f"{c/p*100:.1f}%",
              "co distributed", f"{(c + tax_new(round(sal-75000+d)))/p*100:.1f}%")

    print("\n== Bucket %: tax as % of receipts, Sl.3 new regime ==")
    for rec in [2400000, 3000000, 4000000, 5000000, 6000000, 7500000]:
        print(rec, f"{tax_new(rec//2)/rec*100:.1f}%", tax_new(rec // 2))
    print("\n== LTCG harvest saving ==", 125000 * .125, 125000 * .125 * 1.04)
