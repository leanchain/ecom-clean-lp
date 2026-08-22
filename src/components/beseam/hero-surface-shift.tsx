const KEY_NODES = [
  { id: "ai", x: 118, y: 142, r: 7, label: "AI answers", dx: 13, dy: -12 },
  { id: "search", x: 238, y: 98, r: 6, label: "Search", dx: 12, dy: -10 },
  { id: "feeds", x: 304, y: 218, r: 5, label: "Feeds", dx: 11, dy: 17 },
  {
    id: "competitors",
    x: 102,
    y: 284,
    r: 5,
    label: "Competitors",
    dx: 12,
    dy: 18,
  },
  { id: "catalog", x: 474, y: 138, r: 7, label: "Catalog", dx: 13, dy: -12 },
  {
    id: "product",
    x: 558,
    y: 276,
    r: 9,
    label: "Product truth",
    dx: 14,
    dy: 20,
  },
  { id: "content", x: 438, y: 394, r: 5, label: "Content", dx: -54, dy: 18 },
  {
    id: "onsite",
    x: 874,
    y: 136,
    r: 7,
    label: "Onsite search",
    dx: 13,
    dy: -11,
  },
  {
    id: "recs",
    x: 982,
    y: 250,
    r: 6,
    label: "Recommendations",
    dx: 13,
    dy: 20,
  },
  { id: "pdp", x: 836, y: 398, r: 7, label: "Product page", dx: -76, dy: 19 },
  { id: "behavior", x: 1158, y: 164, r: 6, label: "Behavior", dx: 12, dy: -11 },
  { id: "checkout", x: 1196, y: 356, r: 7, label: "Checkout", dx: 13, dy: 19 },
  { id: "orders", x: 1322, y: 250, r: 6, label: "Orders", dx: 12, dy: -11 },
] as const;

const SMALL_NODES = [
  [56, 82, 2.4],
  [174, 68, 2.8],
  [348, 82, 2.1],
  [54, 216, 2.1],
  [192, 196, 3],
  [350, 300, 2.4],
  [370, 158, 2.2],
  [418, 236, 2.5],
  [516, 76, 2.1],
  [624, 124, 2.9],
  [642, 218, 2.1],
  [520, 366, 2.7],
  [364, 438, 2.1],
  [650, 430, 3],
  [724, 104, 2.5],
  [758, 218, 2.2],
  [732, 338, 2.8],
  [928, 76, 2.1],
  [1046, 116, 2.8],
  [1042, 340, 2.2],
  [918, 454, 2.6],
  [1104, 266, 3],
  [1244, 96, 2.1],
  [1304, 158, 2.6],
  [1284, 394, 2.3],
  [1374, 320, 2.8],
  [1086, 448, 2.2],
  [1236, 462, 2.7],
  [692, 192, 1.9],
  [782, 436, 2.2],
  [1128, 92, 1.9],
  [1360, 198, 2.1],
] as const;

const CURVED_EDGES = [
  "M 118 142 Q 174 106 238 98",
  "M 118 142 Q 212 154 304 218",
  "M 102 284 Q 202 254 304 218",
  "M 238 98 Q 348 82 474 138",
  "M 304 218 Q 394 156 474 138",
  "M 304 218 Q 430 214 558 276",
  "M 474 138 Q 530 188 558 276",
  "M 438 394 Q 500 354 558 276",
  "M 558 276 Q 716 184 874 136",
  "M 558 276 Q 766 250 982 250",
  "M 558 276 Q 684 372 836 398",
  "M 874 136 Q 922 184 982 250",
  "M 874 136 Q 1024 104 1158 164",
  "M 982 250 Q 1080 180 1158 164",
  "M 982 250 Q 1082 310 1196 356",
  "M 836 398 Q 1024 408 1196 356",
  "M 1158 164 Q 1248 178 1322 250",
  "M 1196 356 Q 1272 316 1322 250",
  "M 56 82 Q 82 104 118 142",
  "M 174 68 Q 202 78 238 98",
  "M 348 82 Q 292 82 238 98",
  "M 54 216 Q 76 250 102 284",
  "M 192 196 Q 242 196 304 218",
  "M 350 300 Q 330 252 304 218",
  "M 370 158 Q 424 148 474 138",
  "M 418 236 Q 492 242 558 276",
  "M 516 76 Q 500 104 474 138",
  "M 624 124 Q 552 126 474 138",
  "M 642 218 Q 598 240 558 276",
  "M 520 366 Q 478 374 438 394",
  "M 364 438 Q 396 414 438 394",
  "M 650 430 Q 598 356 558 276",
  "M 724 104 Q 796 104 874 136",
  "M 758 218 Q 814 170 874 136",
  "M 732 338 Q 782 374 836 398",
  "M 928 76 Q 900 102 874 136",
  "M 1046 116 Q 1100 124 1158 164",
  "M 1042 340 Q 1014 292 982 250",
  "M 918 454 Q 874 428 836 398",
  "M 1104 266 Q 1150 314 1196 356",
  "M 1244 96 Q 1202 128 1158 164",
  "M 1304 158 Q 1314 204 1322 250",
  "M 1284 394 Q 1244 374 1196 356",
  "M 1374 320 Q 1350 282 1322 250",
  "M 1086 448 Q 1144 408 1196 356",
  "M 1236 462 Q 1216 406 1196 356",
] as const;

const CLUSTERS = [
  { cx: 188, cy: 194, rx: 164, ry: 148, label: "DISCOVERY", x: 54, y: 348 },
  {
    cx: 536,
    cy: 276,
    rx: 178,
    ry: 188,
    label: "PRODUCT TRUTH",
    x: 382,
    y: 492,
  },
  { cx: 900, cy: 270, rx: 178, ry: 190, label: "STORE", x: 760, y: 492 },
  { cx: 1216, cy: 268, rx: 176, ry: 190, label: "OUTCOME", x: 1116, y: 492 },
] as const;

export default function HeroSurfaceShift() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <g className="hero-kg-clusters">
          {CLUSTERS.map((cluster) => (
            <g key={cluster.label}>
              <ellipse
                cx={cluster.cx}
                cy={cluster.cy}
                rx={cluster.rx}
                ry={cluster.ry}
              />
              <text x={cluster.x} y={cluster.y}>
                {cluster.label}
              </text>
            </g>
          ))}
        </g>

        <g className="hero-kg-edges" fill="none">
          {CURVED_EDGES.map((d, index) => (
            <path
              key={d}
              d={d}
              className={index % 6 === 0 ? "hero-kg-edge-soft" : undefined}
            />
          ))}
        </g>

        <g className="hero-kg-flow-lines" fill="none">
          <path
            id="hero-kg-flow-a"
            d="M 74 156 C 210 74, 374 106, 514 214 S 778 278, 932 196 S 1172 144, 1350 252"
          />
          <path
            id="hero-kg-flow-b"
            d="M 92 300 C 280 218, 430 278, 558 276 S 818 368, 982 250 S 1166 240, 1322 250"
          />
          <path
            id="hero-kg-flow-c"
            d="M 304 218 C 408 176, 490 184, 558 276 S 730 438, 836 398 S 1068 292, 1196 356"
          />
        </g>

        <g className="hero-kg-highlight-paths" fill="none">
          <path
            d="M 118 142 Q 174 106 238 98 Q 348 82 474 138 Q 530 188 558 276 Q 716 184 874 136 Q 1024 104 1158 164 Q 1248 178 1322 250"
            className="hero-kg-highlight hero-kg-highlight-a"
          />
          <path
            d="M 304 218 Q 430 214 558 276 Q 684 372 836 398 Q 1024 408 1196 356 Q 1272 316 1322 250"
            className="hero-kg-highlight hero-kg-highlight-b"
          />
        </g>

        <g className="hero-kg-small-nodes">
          {SMALL_NODES.map(([cx, cy, r], index) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              className={
                index % 7 === 0 ? "hero-kg-small-node-bright" : undefined
              }
            />
          ))}
        </g>

        <g className="hero-kg-key-nodes">
          {KEY_NODES.map((node, index) => (
            <g
              key={node.id}
              className={
                index === 5 || index === 7 || index === 11
                  ? "hero-kg-node hero-kg-node-active"
                  : "hero-kg-node"
              }
              style={{ animationDelay: `${index * -0.7}s` }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 8}
                className="hero-kg-node-halo"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 3}
                className="hero-kg-node-ring"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                className="hero-kg-node-core"
              />
              <text x={node.x + node.dx} y={node.y + node.dy}>
                {node.label}
              </text>
            </g>
          ))}
        </g>

        <g className="hero-kg-signals">
          <circle r="4.4" className="hero-kg-signal hero-kg-signal-dark">
            <animateMotion dur="30s" repeatCount="indefinite" begin="-7s">
              <mpath href="#hero-kg-flow-a" />
            </animateMotion>
          </circle>
          <circle r="3.8" className="hero-kg-signal hero-kg-signal-accent">
            <animateMotion dur="36s" repeatCount="indefinite" begin="-19s">
              <mpath href="#hero-kg-flow-b" />
            </animateMotion>
          </circle>
          <circle r="3.2" className="hero-kg-signal hero-kg-signal-dark">
            <animateMotion dur="42s" repeatCount="indefinite" begin="-29s">
              <mpath href="#hero-kg-flow-c" />
            </animateMotion>
          </circle>
        </g>
      </svg>

      <div className="hero-kg-center-wash absolute left-1/2 top-1/2 h-[72%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#fafafa] blur-3xl" />

      <style>{`
        .hero-kg-clusters ellipse {
          fill: none;
          stroke: #111318;
          stroke-width: 1;
          stroke-dasharray: 2 11;
          stroke-opacity: 0.045;
        }
        .hero-kg-clusters text {
          fill: #111318;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.18em;
          opacity: 0.1;
        }
        .hero-kg-edges path {
          stroke: #111318;
          stroke-width: 1;
          stroke-opacity: 0.07;
          vector-effect: non-scaling-stroke;
        }
        .hero-kg-edges .hero-kg-edge-soft {
          stroke-opacity: 0.035;
        }
        .hero-kg-flow-lines path {
          stroke: #111318;
          stroke-width: 1;
          stroke-opacity: 0.045;
          vector-effect: non-scaling-stroke;
        }
        .hero-kg-small-nodes {
          fill: #111318;
          opacity: 0.13;
        }
        .hero-kg-small-node-bright {
          opacity: 0.28;
        }
        .hero-kg-node {
          animation: hero-kg-node-float 16s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .hero-kg-node-halo {
          fill: #111318;
          opacity: 0.025;
        }
        .hero-kg-node-ring {
          fill: #fafafa;
          stroke: #111318;
          stroke-width: 1;
          stroke-opacity: 0.16;
        }
        .hero-kg-node-core {
          fill: #111318;
          opacity: 0.48;
        }
        .hero-kg-node text {
          fill: #111318;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 8.5px;
          font-weight: 600;
          letter-spacing: 0.07em;
          opacity: 0.2;
        }
        .hero-kg-node-active .hero-kg-node-halo {
          fill: #b8441d;
          opacity: 0.055;
          animation: hero-kg-halo-pulse 10s ease-in-out infinite;
        }
        .hero-kg-node-active .hero-kg-node-ring {
          stroke: #b8441d;
          stroke-opacity: 0.34;
        }
        .hero-kg-node-active .hero-kg-node-core {
          fill: #b8441d;
          opacity: 0.68;
        }
        .hero-kg-highlight {
          stroke: #b8441d;
          stroke-width: 1.25;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 14 18;
          stroke-opacity: 0;
          vector-effect: non-scaling-stroke;
        }
        .hero-kg-highlight-a {
          animation: hero-kg-path-a 24s ease-in-out infinite, hero-kg-dash 12s linear infinite;
        }
        .hero-kg-highlight-b {
          animation: hero-kg-path-b 24s ease-in-out infinite, hero-kg-dash 14s linear infinite reverse;
        }
        .hero-kg-signal-dark {
          fill: #111318;
          opacity: 0.26;
        }
        .hero-kg-signal-accent {
          fill: #b8441d;
          opacity: 0.58;
        }
        .hero-kg-center-wash {
          opacity: 0.87;
        }
        @keyframes hero-kg-path-a {
          0%, 8%, 46%, 100% { stroke-opacity: 0; }
          16%, 38% { stroke-opacity: 0.28; }
        }
        @keyframes hero-kg-path-b {
          0%, 44%, 64%, 100% { stroke-opacity: 0; }
          51%, 59% { stroke-opacity: 0.24; }
        }
        @keyframes hero-kg-dash {
          to { stroke-dashoffset: -64; }
        }
        @keyframes hero-kg-node-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -2px); }
        }
        @keyframes hero-kg-halo-pulse {
          0%, 62%, 100% { transform: scale(0.88); opacity: 0.025; }
          70%, 82% { transform: scale(1.42); opacity: 0.08; }
        }
        @media (max-width: 767px) {
          .hero-kg-node text,
          .hero-kg-clusters text {
            display: none;
          }
          .hero-kg-small-nodes {
            opacity: 0.08;
          }
          .hero-kg-edges path {
            stroke-opacity: 0.04;
          }
          .hero-kg-flow-lines path,
          .hero-kg-clusters ellipse {
            stroke-opacity: 0.025;
          }
          .hero-kg-center-wash {
            opacity: 0.94;
            width: 78%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-kg-signals {
            display: none;
          }
          .hero-kg-highlight,
          .hero-kg-node,
          .hero-kg-node-active .hero-kg-node-halo {
            animation: none;
          }
          .hero-kg-highlight-a {
            stroke-opacity: 0.11;
          }
        }
      `}</style>
    </div>
  );
}
