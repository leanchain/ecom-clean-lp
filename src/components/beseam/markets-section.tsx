import { Reveal } from "@/components/beseam/reveal";

/**
 * Markets are a product capability, not a dropdown, so the section has to show
 * the thing that actually differs: the sentence a shopper types.
 *
 * The question leads in each column, in the local language, because that is the
 * part a merchant can verify against their own experience in two seconds. The
 * three rows underneath say what changes with it.
 *
 * These are illustrations of the kind of difference Beseam observes, and the
 * closing line says so. No claim is made about what is true for any particular
 * catalogue — that is what a scan is for.
 */

const MARKETS = [
  {
    place: "Switzerland",
    flag: "🇨🇭",
    language: "Deutsch",
    question: "„Welche Regenjacke eignet sich zum Velofahren im Winter?“",
    translation: "Which rain jacket works for cycling in winter?",
    rows: [
      [
        "The words",
        "Velo, not Fahrrad. A product page written for Germany reads foreign here.",
      ],
      [
        "The comparison",
        "Local outdoor retailers, not the brands that dominate the answer in the UK.",
      ],
      [
        "The assumption",
        "Prices in CHF, and a clear answer about what happens at the border on a return.",
      ],
    ],
  },
  {
    place: "United Kingdom",
    flag: "🇬🇧",
    language: "English",
    question: "“Best waterproof jacket for cycling to work?”",
    translation: null,
    rows: [
      [
        "The words",
        "Commuting is “cycling to work”, and the scheme language turns up in the query itself.",
      ],
      ["The comparison", "Marketplace listings as often as brand stores."],
      [
        "The assumption",
        "Next-day delivery and free returns, taken for granted rather than asked about.",
      ],
    ],
  },
  {
    place: "Italy",
    flag: "🇮🇹",
    language: "Italiano",
    question:
      "«Qual è la migliore giacca antipioggia per andare in bici in città?»",
    translation: "Which is the best rain jacket for cycling in the city?",
    rows: [
      ["The words", "Antipioggia, and in città — the use is urban, not sport."],
      [
        "The comparison",
        "Brands whose product pages are actually written in Italian.",
      ],
      [
        "The assumption",
        "EU sizing, and sizing guidance that does not assume a UK chart.",
      ],
    ],
  },
] as const;

export default function MarketsSection() {
  return (
    <section
      id="markets"
      className="scroll-mt-24 border-y border-black/18 bg-ink-deep text-white"
    >
      <div className="mx-auto max-w-[92rem] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-16">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-signal">
                Markets
              </p>
              <h2 className="mt-7 max-w-[20ch] text-balance font-display text-[clamp(2.3rem,3.8vw,3.9rem)] font-normal leading-[1.03] tracking-[-0.02em]">
                Shoppers do not ask the same questions everywhere.
              </h2>
            </div>
            <p className="max-w-[52ch] text-[17px] leading-[1.72] text-white/70">
              The same product sells differently in every market. Different
              words, different rivals, different things taken for granted about
              delivery and returns. Beseam asks the questions shoppers actually
              ask there, in their language, and looks at what comes back.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-12 grid border-t-2 border-white/70 lg:mt-16 lg:grid-cols-3">
            {MARKETS.map((market) => (
              <article
                key={market.place}
                className="border-b border-white/14 py-8 lg:border-b-0 lg:border-l lg:border-white/14 lg:px-8 lg:py-9 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
              >
                <p className="flex flex-wrap items-baseline gap-x-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-signal">
                  <span
                    aria-hidden="true"
                    className="text-[15px] leading-none"
                  >
                    {market.flag}
                  </span>
                  {market.place}
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-white/30"
                  />
                  <span className="text-white/56">{market.language}</span>
                </p>

                <p
                  lang={
                    market.language === "Deutsch"
                      ? "de"
                      : market.language === "Italiano"
                        ? "it"
                        : "en"
                  }
                  className="mt-5 font-display text-[clamp(1.2rem,1.65vw,1.55rem)] leading-[1.32] text-white/92 lg:min-h-[3.9em]"
                >
                  {market.question}
                </p>
                {market.translation ? (
                  <p className="mt-2 text-[12px] leading-[1.5] text-white/56">
                    {market.translation}
                  </p>
                ) : (
                  <p
                    aria-hidden="true"
                    className="mt-2 hidden text-[12px] leading-[1.5] text-transparent lg:block"
                  >
                    &nbsp;
                  </p>
                )}

                <dl className="mt-7 border-t border-white/14">
                  {market.rows.map(([term, detail]) => (
                    <div
                      key={term}
                      className="border-b border-white/12 py-3.5 last:border-b-0"
                    >
                      <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white/58">
                        {term}
                      </dt>
                      <dd className="mt-1.5 max-w-[46ch] text-[14px] leading-[1.6] text-white/74">
                        {detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-10 max-w-[74ch] border-l-2 border-signal pl-4 text-[14px] leading-[1.7] text-white/60">
            Examples of the kind of difference a market makes. What actually
            differs for your catalogue is what Beseam observes — market by
            market, in the language your shoppers use.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
