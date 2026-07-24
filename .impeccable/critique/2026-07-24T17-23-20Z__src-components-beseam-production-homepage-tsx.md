---
target: current Beseam homepage
total_score: 25
p0_count: 0
p1_count: 3
timestamp: 2026-07-24T17-23-20Z
slug: src-components-beseam-production-homepage-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Product evidence and active navigation are visible, but the homepage does not communicate a clear live-system state beyond screenshots. |
| 2 | Match System / Real World | 3 | Revenue language is concrete, but terms such as Foundation, Advanced Intelligence, entitlements, and revenue layer require interpretation. |
| 3 | User Control and Freedom | 3 | Demo, login, navigation, privacy controls, and product links are accessible; the page is simply too long and repetitive. |
| 4 | Consistency and Standards | 3 | The system is consistent, but over-consistency creates template sameness across sections. |
| 5 | Error Prevention | 2 | Cookie controls are present, but CTA and product navigation do not clearly set expectations about what happens next. |
| 6 | Recognition Rather Than Recall | 3 | Product names and screenshots are visible, though the suite breadth forces users to remember distinctions across a long page. |
| 7 | Flexibility and Efficiency | 2 | Multiple paths exist, but the page offers no fast role-, problem-, or outcome-based route through the suite. |
| 8 | Aesthetic and Minimalist Design | 1 | Orange emphasis, repeated cards, browser frames, labels, badges, borders, and shadows compete continuously. |
| 9 | Error Recovery | 2 | Not central to a marketing page; booking and privacy surfaces provide basic exits but little recovery guidance. |
| 10 | Help and Documentation | 3 | FAQ, product explanations, package model, contact, and login are available, though contextual clarification comes late. |
| **Total** | | **25/40** | **Acceptable — significant visual and information-design improvements needed** |

## Anti-Patterns Verdict

**LLM assessment**: Yes, the page currently looks AI-generated. It is polished enough to avoid looking unfinished, but it uses the dominant 2025–2026 SaaS recipe: warm off-white ground, orange/coral accent, oversized grotesk headline with italic color emphasis, decorative grid and glow, browser-window screenshot, integration logo strip, dark architecture section, uniform product-card grid, repeated eyebrow labels, icon tiles, pill badges, numbered process, orange CTA band, FAQ, and dark multi-column footer. The result is legible but not ownable. The real product captures are the strongest material on the page, yet they are repeatedly placed inside generic browser chrome and cards that make them feel like template content.

**Deterministic scan**: The source CLI returned no static findings, but the injected browser detector found 115 rendered anti-patterns: 40 nested cards, 30 low-contrast elements, 16 overlong line lengths, 15 tiny-text elements, 10 repeated section kickers, 9 generic image hover transforms, 7 thin-border-plus-wide-shadow ghost cards, 6 all-caps body labels, 3 icon-tile stacks, 2 extreme negative tracking cases, 1 oversized H1, 1 cramped-padding case, and 1 single-font warning. The browser scan also caught the GIF LCP warning.

**Visual overlays**: Injection succeeded in a fresh browser page. The overlay clearly marked the hero as oversized and over-tight, the screenshot frame as a nested ghost card, the CTA and orange labels as low contrast, and the repeated section grammar across the page.

## Overall Impression

The commercial story is much stronger than before and the use of real Dancing Queens product evidence is correct. The single biggest opportunity is to stop styling Beseam like a SaaS website and instead make the product evidence itself the brand: less orange, fewer containers, fewer repeated labels, fewer equal-weight sections, and a proprietary visual narrative built around outside-in observation and verified revenue change.

## What’s Working

1. **The proposition is commercially relevant.** “Find the revenue leaks your stack cannot see” is direct, valuable, and more specific than generic AI automation language.
2. **The product evidence is authentic.** Real screens, real catalog objects, and real commerce data create credibility competitors often lack.
3. **The portfolio is now complete.** Products and entitlements are exposed honestly, including Beta status and package boundaries.

## Priority Issues

### [P1] The page uses saturated AI-SaaS visual grammar

**Why it matters**: A buyer cannot distinguish Beseam from another AI workflow, observability, or optimization startup at a glance. The page explains differentiation in copy while visually signaling category sameness.

**Fix**: Remove the decorative grid, orange blur, browser traffic-light frames, repetitive pill badges, equal card grid, icon tiles, italic-orange phrase in nearly every headline, and repeated reveal behavior. Establish one proprietary composition based on an outside-in revenue trace: commerce artifact, observed signal, intervention, verified outcome. Let real product media sit directly in the layout rather than inside generic laptop/browser metaphors.

**Suggested command**: `$impeccable bolder`

### [P1] Orange is being used as atmosphere, content hierarchy, status, decoration, and CTA simultaneously

**Why it matters**: The color has no semantic discipline, so every section competes and the brand feels loud rather than confident. It also produces many of the 30 contrast failures.

**Fix**: Move to a restrained strategy: neutral/ink surfaces dominate, one darker proprietary signal color handles emphasis, and the existing orange becomes a scarce “revenue leak / intervention” marker used on roughly 5–8% of the page. Use white or ink CTAs with stronger contrast rather than orange fills everywhere.

**Suggested command**: `$impeccable quieter`

### [P1] Product breadth is presented as a catalogue, not a company point of view

**Why it matters**: Six equal product cards plus three secondary cards make Beseam feel like a bundle of modules. Visitors must read every card to infer the system.

**Fix**: Replace the product grid with 3 distinct revenue systems: **Observe** (Visibility, Behavior, Reliability), **Decide** (Foundation, Analytics, Optimization), and **Act** (Commerce Readiness, Advertising, Creative). Within each system, show one dominant real screenshot and a concise list of included products and entitlements. Keep the full entitlement table lower on the page for procurement.

**Suggested command**: `$impeccable distill`

### [P2] Typography is loud but not distinctive

**Why it matters**: Figtree everywhere, a 79px H1, -0.055em tracking, italic orange emphasis, tiny uppercase metadata, and many 10–11px labels reproduce a familiar generated-marketing aesthetic and reduce readability.

**Fix**: Keep a single family only if it is treated deliberately: reduce H1 size and tracking, remove repeated italics, replace most uppercase kickers with sentence-case section introductions, raise small text to 12–14px, and create contrast through proportion and alignment rather than color.

**Suggested command**: `$impeccable typeset`

### [P2] The page is too long and visually flat despite many treatments

**Why it matters**: Each section repeats heading + paragraph + screenshot/cards. The scroll has no memorable peak after the hero, and the orange CTA band is the loudest moment despite being generic.

**Fix**: Create 4–5 deliberate acts with different pacing: proposition, outside-in system, three product systems, proof/governance, conversion. Remove redundant product-detail sections or turn them into a horizontally navigable proof sequence. Reserve the strongest visual moment for verified before/after revenue evidence, not the CTA.

**Suggested command**: `$impeccable layout`

## Persona Red Flags

**Jordan, first-time commerce leader**: The headline is understandable, but “revenue layer,” “Foundation,” “Advanced Intelligence,” and entitlement mechanics appear before a concrete example of a leak being found and fixed. Jordan sees nine products and may not know which one solves the immediate problem.

**Riley, skeptical enterprise evaluator**: Real screenshots help, but the local-demo captions, generic browser frames, and heavy marketing treatment can make authentic evidence feel staged. Riley will want a single traceable story showing source evidence, recommended change, approval, and measured result.

**Casey, distracted mobile buyer**: The mobile page becomes a very long stack of near-identical cards. Product distinctions blur, screenshots are too small to inspect, and the user must scroll through the entire portfolio before reaching proof and trust.

## Minor Observations

- The cookie panel obscures the primary hero CTA during first load.
- The GIF is the LCP asset and still triggers a Next.js priority warning.
- The integration logo strip is expected SaaS furniture and contributes little differentiation.
- The dark platform section is visually stronger than the light sections but still composed from nested rounded cards.
- The orange full-width CTA creates a large color block without adding a unique brand moment.
- Product status pills and feature pills create visual confetti and compress important distinctions into tiny text.

## Questions to Consider

- What if Beseam’s visual identity came from the evidence chain itself—source, leak, intervention, verification—instead of from orange?
- Which single real customer story can carry the homepage from observation to revenue outcome?
- Should buyers understand nine products, or first understand three revenue systems and discover products inside them?
