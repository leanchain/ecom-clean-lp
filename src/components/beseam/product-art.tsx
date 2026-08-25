/**
 * Flat vector product art for the homepage specimens.
 *
 * Drawn rather than photographed on purpose: the specimens are labelled
 * examples, and a stock photograph would read as a real store's catalogue.
 * Two tones plus an ink detail each, one shared 120x120 box, so three of them
 * sitting in a row read as one collection rather than three found images.
 *
 * Palette is deliberately off the brand accent — the orange belongs to the
 * interface, not to the merchandise.
 */

export type ProductArtKind = "tee" | "hoodie" | "shell" | "protein";

const INK = "#2b2f36";

const PALETTE: Record<ProductArtKind, { base: string; shade: string }> = {
  tee: { base: "#e0d5c8", shade: "#c8b9a8" },
  hoodie: { base: "#aab2ba", shade: "#8d97a1" },
  shell: { base: "#4f6479", shade: "#3d5064" },
  protein: { base: "#e7ded3", shade: "#cfc2b3" },
};

function Tee({ base, shade }: { base: string; shade: string }) {
  return (
    <>
      <path
        d="M50 20 L40 24 L22 46 L31 58 L38 50 L37 98 L83 98 L82 50 L89 58 L98 46 L80 24 L70 20 C68 32 52 32 50 20 Z"
        fill={base}
      />
      <path d="M80 24 L98 46 L89 58 L82 50 Z" fill={shade} />
      <path d="M37 89 L83 89 L83 98 L37 98 Z" fill={shade} />
      <path
        d="M50 20 C52 32 68 32 70 20"
        fill="none"
        stroke={INK}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </>
  );
}

function Hoodie({ base, shade }: { base: string; shade: string }) {
  return (
    <>
      <path
        d="M48 24 L37 28 L19 52 L21 85 L34 85 L37 57 L36 101 L84 101 L83 57 L86 85 L99 85 L101 52 L83 28 L72 24 Z"
        fill={base}
      />
      <path d="M83 28 L101 52 L99 85 L86 85 L83 57 Z" fill={shade} />
      <path d="M46 26 C46 10 74 10 74 26 C68 34 52 34 46 26 Z" fill={shade} />
      <path
        d="M46 26 C46 10 74 10 74 26"
        fill="none"
        stroke={INK}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path d="M45 71 L75 71 L78 90 L42 90 Z" fill={shade} />
      <path
        d="M45 71 L75 71 L78 90 L42 90 Z"
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinejoin="round"
        opacity="0.45"
      />
      <path
        d="M54 30 L55 48 M66 30 L65 48"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  );
}

function Shell({ base, shade }: { base: string; shade: string }) {
  return (
    <>
      <path
        d="M46 24 L35 29 L20 51 L22 80 L34 84 L38 57 L37 97 L83 97 L82 57 L86 84 L98 80 L100 51 L85 29 L74 24 Z"
        fill={base}
      />
      <path
        d="M85 29 L100 51 L98 80 L86 84 L82 57 L83 97 L60 97 L60 33 Z"
        fill={shade}
      />
      <path d="M46 24 L60 34 L74 24 L70 17 L60 24 L50 17 Z" fill={INK} />
      <path
        d="M60 34 L60 97"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M37 88 L83 88 L83 97 L37 97 Z" fill={INK} opacity="0.28" />
      <path
        d="M44 63 L54 63 M66 63 L76 63"
        fill="none"
        stroke={INK}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </>
  );
}

function Protein({ base, shade }: { base: string; shade: string }) {
  return (
    <>
      <rect x="33" y="18" width="54" height="15" rx="3.5" fill={INK} />
      <rect x="37" y="33" width="46" height="6" fill={shade} />
      <path
        d="M35 39 L85 39 L87 96 C87 99.3 85.3 101 82 101 L38 101 C34.7 101 33 99.3 33 96 Z"
        fill={base}
      />
      <path
        d="M62 39 L85 39 L87 96 C87 99.3 85.3 101 82 101 L62 101 Z"
        fill={shade}
      />
      <rect x="33" y="55" width="54" height="28" fill={INK} />
      <path
        d="M41 64 L67 64 M41 72 L58 72"
        fill="none"
        stroke={base}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  );
}

const SHAPES = {
  tee: Tee,
  hoodie: Hoodie,
  shell: Shell,
  protein: Protein,
} as const;

export default function ProductArt({
  kind,
  className,
}: {
  kind: ProductArtKind;
  className?: string;
}) {
  const Shape = SHAPES[kind];
  const tones = PALETTE[kind];

  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <Shape {...tones} />
    </svg>
  );
}
