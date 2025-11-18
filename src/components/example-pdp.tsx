import Image from "next/image";

const heroImages = [
  "/images/example-pdp/travel-buddy-1.webp",
  "/images/example-pdp/travel-buddy-2.webp",
  "/images/example-pdp/travel-buddy-3.webp",
  "/images/example-pdp/travel-buddy-4.webp",
];

const benefits = [
  "✔️ Achieve salon-quality shine anywhere",
  "✔️ Frizz-free hair in minutes",
  "✔️ Daily shine made simple",
  "✔️ Smooth, sleek hair anytime",
];

const icons = [
  { src: "/icons/truck.svg", label: "Fast Shipping" },
  { src: "/icons/box.svg", label: "Free Returns" },
  { src: "/icons/heart.svg", label: "30-Day Money Back Guarantee" },
];

const imageWithTextSections = [
  {
    title: "Always Look Your Best, No Matter Where You Are",
    content:
      "The Travel Buddy Hair Dryer makes it easy to look your best while traveling, thanks to its lightweight design and dual voltage feature. Never worry about bulky dryers or bad hair days; enjoy quick, reliable styling wherever you are.",
    image: heroImages[0],
  },
  {
    title: "Salon-Quality Results in the Comfort of Home",
    content:
      "The Pro-Style Hair Dryer delivers professional performance with its powerful motor and ceramic technology. Create stunning styles with ease using multiple heat settings and a precision nozzle that helps you achieve that perfect blowout every time.",
    image: heroImages[3],
  },
];

const imageWithBenefits = {
  title: "Simple Hair Care While Traveling",
  subtitle:
    "Experience stress-free styling on the go with this compact dryer that fits perfectly in your travel bag, ensuring your hair looks salon-fresh anywhere.",
  image: heroImages[1],
  items: [
    {
      emoji: "✨",
      title: "Compact",
      content: "Fits easily into your luggage, saving space.",
    },
    {
      emoji: "⚡",
      title: "Quick Dry",
      content: "Dries hair faster so you can enjoy your trip.",
    },
    {
      emoji: "🔌",
      title: "Dual Voltage",
      content: "Use worldwide without hassle, no converters needed.",
    },
    {
      emoji: "💇‍♀️",
      title: "Frizz-Free",
      content: "Keep hair smooth and shiny on any adventure.",
    },
  ],
};

const comparisonRows = [
  "Compact",
  "Super-Fast",
  "Dual Voltage",
  "Frizz-Free",
  "Affordable",
];

const percentageStats = [
  { value: 97, text: "reported smoother hair on trips" },
  { value: 96, text: "noticed faster drying time" },
  { value: 98, text: "said it fits in their carry-on" },
];

const faqs = [
  {
    q: "Is the hair dryer travel-friendly?",
    a: "Absolutely! It's compact, lightweight, and has dual voltage, making it perfect for travel.",
  },
  {
    q: "How does dual voltage work?",
    a: "Dual voltage allows the dryer to adapt to different electrical systems, so you can use it worldwide without a converter.",
  },
  {
    q: "Will it fit in my carry-on?",
    a: "Yes, its foldable design ensures it fits easily in any carry-on or travel bag.",
  },
  {
    q: "Does it reduce frizz?",
    a: "Definitely! The anion technology minimizes frizz and enhances shine with each use.",
  },
  {
    q: "Is it powerful enough for thick hair?",
    a: "Yes, with 750W of power, it dries even thick hair quickly and efficiently.",
  },
];

const reviews = [
  {
    name: "Susan B.",
    text: "I love traveling light, and this hair dryer is a game changer!!! It fits perfectly in my carry-on, and I can do my hair super quick.",
  },
  { name: "Ava", text: "Compact and easy to pack. 👍" },
  {
    name: "Abigail",
    text: "It's lightweight and foldable, making it ideal for my busy travel schedule.",
  },
  { name: "Mia", text: "Game changer! 🔥" },
  {
    name: "Zoe",
    text: "I was skeptical about a travel dryer, but this one surprised me with its power and convenience.",
  },
  {
    name: "Grace",
    text: "This dryer keeps my hair shiny and smooth even on long trips.",
  },
];

const featuredReview = reviews[0];

const recommendedProducts = [
  {
    title: "Product 1",
    price: "$19.95",
    compareAt: "$29.95",
    image: "/images/layout/placeholders/product_1.webp",
  },
  {
    title: "Product 2",
    price: "$24.95",
    image: "/images/layout/placeholders/product_2.webp",
  },
  {
    title: "Product 3",
    price: "$15.95",
    compareAt: "$25.95",
    image: "/images/layout/placeholders/product_3.webp",
  },
  {
    title: "Product 4",
    price: "$29.95",
    compareAt: "$39.95",
    image: "/images/layout/placeholders/product_4.webp",
  },
  {
    title: "Product 5",
    price: "$22.95",
    image: "/images/layout/placeholders/product_5.webp",
  },
];

const HeroSection = () => {
  return (
    <section className="bg-white py-10 md:py-14">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-10 2xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="2xl:sticky 2xl:top-24">
            <div className="flex flex-col items-center gap-6">
              <div className="relative aspect-square w-full max-w-[520px] overflow-hidden rounded-3xl border bg-muted">
                <Image
                  src={heroImages[0]}
                  alt="Travel Buddy Hair Dryer"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex w-full gap-3 overflow-x-auto pb-1">
                {heroImages.map((src) => (
                  <div
                    key={src}
                    className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-2xl border bg-white"
                  >
                    <Image
                      src={src}
                      alt="Product thumbnail"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col gap-5 rounded-3xl border bg-white p-5 md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">387 Reviews</p>
            </div>

            <div className="space-y-2">
              <h1 className="text-balance text-2xl font-semibold md:text-3xl">
                Travel Buddy Hair Dryer
              </h1>
              <p className="text-muted-foreground text-base">
                Dry and style your hair on the go with this compact travel
                essential.
              </p>
            </div>

            <p className="text-2xl font-bold">$79.90</p>

            <div className="h-px w-full bg-slate-100" />

            <ul className="space-y-1 text-sm">
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>

            <div className="h-px w-full bg-slate-100" />

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold uppercase tracking-wide">
                  Quantity
                </p>
                <div className="mt-2 inline-flex items-center rounded-2xl border text-base">
                  <button className="h-8 w-10 border-r text-center">-</button>
                  <div className="h-8 w-12 text-center leading-8">1</div>
                  <button className="h-8 w-10 border-l text-center">+</button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold uppercase tracking-wide">Color</p>
                <div className="flex flex-wrap gap-2">
                  {["White", "Black", "Red"].map((color) => (
                    <button
                      key={color}
                      className="rounded-2xl border px-3 py-1 text-sm text-muted-foreground hover:border-black"
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button className="relative mt-2 w-full rounded-3xl bg-black py-4 text-lg font-semibold text-white">
              Add To Cart
            </button>

            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              {icons.map((icon) => (
                <div
                  key={icon.label}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Image
                      src={icon.src}
                      alt={icon.label}
                      width={24}
                      height={24}
                    />
                  </div>
                  <p>{icon.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-4 border-t pt-4">
              <div className="flex gap-4 rounded-3xl bg-muted/60 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold">
                  {featuredReview.name[0]}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-base">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground">{featuredReview.text}</p>
                  <p className="text-xs font-semibold text-black">
                    {featuredReview.name}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <details className="group rounded-2xl border bg-white px-4 py-3 text-left">
                  <summary className="flex cursor-pointer items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🌍</span>
                      <span className="font-medium">Shipping Information</span>
                    </div>
                    <span className="text-xl text-muted-foreground transition group-open:rotate-180">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-2 text-xs text-muted-foreground">
                    We offer tracked and insured shipping for all of our orders.
                    Order processing takes 1-3 business days before shipment.
                  </p>
                </details>

                <details className="group rounded-2xl border bg-white px-4 py-3 text-left">
                  <summary className="flex cursor-pointer items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">↩️</span>
                      <span className="font-medium">Return Policy</span>
                    </div>
                    <span className="text-xl text-muted-foreground transition group-open:rotate-180">
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-2 text-xs text-muted-foreground">
                    We love our products and are confident you will too. Enjoy a
                    30-day risk-free trial. If you're not in love with your
                    results, we'll give you a refund.
                  </p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImageWithTextSection = ({
  section,
  reverse,
}: {
  section: (typeof imageWithTextSections)[number];
  reverse?: boolean;
}) => {
  const layout = reverse ? "md:flex-row-reverse" : "md:flex-row";
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className={`flex flex-col items-center gap-10 ${layout}`}>
          <div className="flex-1">
            <div className="mx-auto max-w-xl space-y-6">
              <h2 className="text-balance text-2xl font-semibold md:text-3xl">
                {section.title}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                {section.content}
              </p>
              <button className="rounded-3xl bg-black px-6 py-3 text-sm font-semibold text-white">
                Get Mine Now
              </button>
            </div>
          </div>
          <div className="flex-1">
            <div className="mx-auto aspect-square max-w-[420px] overflow-hidden rounded-3xl border bg-muted">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImageWithBenefitsSection = () => {
  const left = imageWithBenefits.items.slice(0, 2);
  const right = imageWithBenefits.items.slice(2);
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-balance text-2xl font-semibold md:text-3xl">
            {imageWithBenefits.title}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {imageWithBenefits.subtitle}
          </p>
        </div>
        <div className="mt-10 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-8">
            {left.map((item) => (
              <div
                key={item.title}
                className="space-y-2 text-center md:text-left"
              >
                <div className="text-3xl">{item.emoji}</div>
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-full border bg-muted">
              <Image
                src={imageWithBenefits.image}
                alt={imageWithBenefits.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="space-y-8">
            {right.map((item) => (
              <div
                key={item.title}
                className="space-y-2 text-center md:text-left"
              >
                <div className="text-3xl">{item.emoji}</div>
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  return (
    <section className="bg-muted/40 py-10 md:py-16">
      <div className="container grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="text-balance text-2xl font-semibold md:text-3xl">
            What Makes Travel Buddy Hair Dryer Special
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Unlike others, Travel Buddy Hair Dryer offers compact design, dual
            voltage, and fast drying for travelers.
          </p>
          <button className="rounded-3xl bg-black px-6 py-3 text-sm font-semibold text-white">
            Get Mine Now
          </button>
        </div>
        <div className="mx-auto w-full max-w-md space-y-4">
          <div className="grid grid-cols-4 text-sm font-semibold">
            <div className="col-span-2" />
            <div className="text-center">Travel Buddy Hair Dryer</div>
            <div className="text-center">Others</div>
          </div>
          <div className="overflow-hidden rounded-3xl border bg-white shadow-xl shadow-black/5">
            <div className="grid grid-cols-4 text-sm">
              <div className="col-span-2 bg-[#606c75] text-white">
                {comparisonRows.map((row) => (
                  <div
                    key={row}
                    className="flex h-14 items-center justify-center border-b border-white/15"
                  >
                    {row}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center">
                {comparisonRows.map((row) => (
                  <div
                    key={row}
                    className="flex h-14 items-center justify-center"
                  >
                    <span className="text-xl text-green-500">✔</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-center">
                {comparisonRows.map((row) => (
                  <div
                    key={row}
                    className="flex h-14 items-center justify-center"
                  >
                    <span className="text-xl">✕</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PercentageSection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container grid items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center">
          <div className="relative aspect-square w-full max-w-[420px] overflow-hidden rounded-full border bg-muted">
            <Image
              src={heroImages[2]}
              alt="Transform your travel hair routine"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-balance text-2xl font-semibold md:text-3xl">
            Transform Your Travel Hair Routine
          </h2>
          <div className="space-y-5">
            {percentageStats.map((stat) => (
              <div
                key={stat.text}
                className="flex items-center gap-4 border-b border-gray-300 pb-5 last:border-0 last:pb-0"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-[#606c75] to-gray-300 text-lg font-semibold">
                  <span>{stat.value}%</span>
                </div>
                <p className="text-base">{stat.text}</p>
              </div>
            ))}
          </div>
          <button className="rounded-3xl bg-black px-6 py-3 text-sm font-semibold text-white">
            Get Mine Now
          </button>
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container max-w-4xl space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Your answer might be here! Find the answers most valued by our
            customers.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-3xl border border-black/20 bg-white px-6 py-4 text-left transition hover:bg-black/5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold">
                <span>{item.q}</span>
                <span className="text-xl transition group-open:rotate-180">
                  ⌄
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="flex justify-center">
          <button className="rounded-3xl bg-black px-6 py-3 text-sm font-semibold text-white">
            Get Mine Now
          </button>
        </div>
      </div>
    </section>
  );
};

const GuaranteeSection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Image
              src="/icons/certification.svg"
              alt="Guarantee"
              width={40}
              height={40}
            />
          </div>
          <h2 className="text-balance text-2xl font-semibold md:text-3xl">
            Risk-Free Travel Hair Care with a 30-Day Guarantee!
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Try the Travel Buddy Hair Dryer with peace of mind. Enjoy quick,
            stylish results anywhere with our 30-day money-back guarantee.
          </p>
          <button className="rounded-3xl bg-black px-6 py-3 text-sm font-semibold text-white">
            Get Mine Now
          </button>
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container space-y-8">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl">
            What Customers Are Saying About This Must-Have
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Real users share their experiences with the Travel Buddy Hair Dryer.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex h-full flex-col gap-3 rounded-3xl border bg-white p-5 text-sm"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                  {review.name[0]}
                </div>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Verified buyer
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RecommendedSection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container space-y-8">
        <h2 className="text-center text-2xl font-semibold md:text-3xl">
          Recommended Products
        </h2>
        <div className="flex overflow-x-auto pb-2">
          <div className="flex gap-6">
            {recommendedProducts.map((product) => (
              <div
                key={product.title}
                className="w-[160px] flex-shrink-0 space-y-2 text-sm lg:w-[200px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border bg-muted">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{product.title}</p>
                  <div className="flex items-baseline gap-2">
                    <span>{product.price}</span>
                    {product.compareAt && (
                      <span className="text-xs text-muted-foreground line-through">
                        {product.compareAt}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ExamplePdp = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      {/* Hide hero-style image sections so we only keep the main gallery + content */}
      {/* <ImageWithTextSection section={imageWithTextSections[0]} /> */}
      {/* <ImageWithTextSection section={imageWithTextSections[1]} reverse /> */}
      <ImageWithBenefitsSection />
      <ComparisonSection />
      <PercentageSection />
      <FaqSection />
      <GuaranteeSection />
      <ReviewsSection />
      <RecommendedSection />
    </div>
  );
};

export { ExamplePdp };
