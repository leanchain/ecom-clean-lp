const KEY_NODES = [
  { id: "ai", x: 188, y: 154, r: 4.6, label: "AI answers", dx: 9, dy: -8 },
  { id: "search", x: 326, y: 102, r: 4.2, label: "Search", dx: 8, dy: -7 },
  { id: "feeds", x: 344, y: 252, r: 3.5, label: "Feeds", dx: 8, dy: 12 },
  {
    id: "competitors",
    x: 116,
    y: 306,
    r: 3.4,
    label: "Competitors",
    dx: 8,
    dy: 12,
  },
  { id: "catalog", x: 574, y: 128, r: 4.4, label: "Catalog", dx: 9, dy: -8 },
  {
    id: "product",
    x: 648,
    y: 286,
    r: 5.2,
    label: "Product truth",
    dx: 10,
    dy: 15,
  },
  { id: "content", x: 492, y: 416, r: 3.5, label: "Content", dx: -43, dy: 13 },
  {
    id: "onsite",
    x: 916,
    y: 122,
    r: 4.3,
    label: "Onsite search",
    dx: 9,
    dy: -8,
  },
  {
    id: "recs",
    x: 1052,
    y: 258,
    r: 3.9,
    label: "Recommendations",
    dx: 9,
    dy: 13,
  },
  { id: "pdp", x: 888, y: 430, r: 4.3, label: "Product page", dx: -55, dy: 13 },
  { id: "behavior", x: 1250, y: 150, r: 3.8, label: "Behavior", dx: 8, dy: -8 },
  { id: "checkout", x: 1290, y: 390, r: 4.2, label: "Checkout", dx: 9, dy: 13 },
  { id: "orders", x: 1450, y: 270, r: 4, label: "Orders", dx: 8, dy: -8 },
] as const;

const SATELLITE_NODES = [
  [54, 116, 1.1],
  [94, 72, 0.9],
  [132, 118, 1.3],
  [162, 76, 1],
  [216, 84, 1.4],
  [260, 58, 0.9],
  [276, 146, 1.1],
  [356, 52, 1],
  [394, 116, 1.4],
  [76, 232, 0.9],
  [154, 226, 1.3],
  [236, 244, 1],
  [284, 308, 1.1],
  [176, 354, 1.4],
  [58, 366, 0.9],
  [398, 286, 1.1],
  [442, 202, 1.2],
  [476, 94, 1],
  [526, 68, 1.3],
  [624, 72, 1.1],
  [682, 118, 1.4],
  [540, 210, 1],
  [598, 234, 1.2],
  [714, 214, 1],
  [758, 294, 1.5],
  [562, 344, 1.1],
  [622, 386, 1.4],
  [706, 406, 1],
  [438, 472, 1.2],
  [554, 490, 0.9],
  [774, 464, 1.2],
  [816, 92, 1],
  [862, 62, 1.3],
  [948, 58, 1],
  [1000, 102, 1.4],
  [834, 188, 1.1],
  [920, 236, 1.2],
  [1000, 190, 1],
  [1112, 182, 1.4],
  [1128, 292, 1.1],
  [1012, 344, 1.3],
  [940, 370, 1],
  [968, 468, 1.1],
  [1060, 440, 1.4],
  [1164, 414, 1],
  [1168, 94, 1.1],
  [1226, 68, 1.4],
  [1328, 92, 1],
  [1378, 146, 1.3],
  [1188, 230, 1],
  [1320, 226, 1.2],
  [1398, 342, 1],
  [1486, 150, 1.2],
  [1518, 234, 1],
  [1480, 362, 1.3],
  [1360, 458, 1.1],
  [1240, 486, 0.9],
] as const;

const BRIDGE_NODES = [
  [452, 156, 2],
  [470, 304, 1.8],
  [792, 180, 2.1],
  [804, 346, 1.8],
  [1160, 230, 2],
  [1178, 348, 1.8],
] as const;

const EDGES = [
  "M 54 116 Q 118 116 188 154",
  "M 94 72 Q 140 104 188 154",
  "M 132 118 Q 156 132 188 154",
  "M 162 76 Q 238 72 326 102",
  "M 216 84 Q 266 88 326 102",
  "M 260 58 Q 300 76 326 102",
  "M 276 146 Q 304 126 326 102",
  "M 356 52 Q 340 74 326 102",
  "M 394 116 Q 356 108 326 102",
  "M 188 154 Q 258 120 326 102",
  "M 188 154 Q 254 188 344 252",
  "M 154 226 Q 244 226 344 252",
  "M 236 244 Q 286 242 344 252",
  "M 284 308 Q 316 282 344 252",
  "M 116 306 Q 224 278 344 252",
  "M 176 354 Q 148 330 116 306",
  "M 58 366 Q 84 336 116 306",
  "M 344 252 Q 400 198 452 156",
  "M 326 102 Q 390 112 452 156",
  "M 452 156 Q 510 134 574 128",
  "M 476 94 Q 526 106 574 128",
  "M 526 68 Q 550 92 574 128",
  "M 624 72 Q 602 96 574 128",
  "M 682 118 Q 630 118 574 128",
  "M 574 128 Q 610 190 648 286",
  "M 540 210 Q 596 228 648 286",
  "M 598 234 Q 622 254 648 286",
  "M 714 214 Q 684 246 648 286",
  "M 758 294 Q 706 288 648 286",
  "M 470 304 Q 554 296 648 286",
  "M 492 416 Q 566 374 648 286",
  "M 438 472 Q 468 446 492 416",
  "M 554 490 Q 526 454 492 416",
  "M 562 344 Q 592 324 648 286",
  "M 622 386 Q 632 336 648 286",
  "M 706 406 Q 680 354 648 286",
  "M 648 286 Q 714 228 792 180",
  "M 792 180 Q 854 142 916 122",
  "M 816 92 Q 860 106 916 122",
  "M 862 62 Q 888 88 916 122",
  "M 948 58 Q 932 88 916 122",
  "M 1000 102 Q 958 112 916 122",
  "M 834 188 Q 876 152 916 122",
  "M 648 286 Q 736 316 804 346",
  "M 804 346 Q 844 390 888 430",
  "M 940 370 Q 916 400 888 430",
  "M 968 468 Q 930 448 888 430",
  "M 774 464 Q 832 448 888 430",
  "M 916 122 Q 974 178 1052 258",
  "M 920 236 Q 984 240 1052 258",
  "M 1000 190 Q 1024 218 1052 258",
  "M 1112 182 Q 1086 218 1052 258",
  "M 1128 292 Q 1090 274 1052 258",
  "M 1012 344 Q 1032 302 1052 258",
  "M 888 430 Q 962 348 1052 258",
  "M 1052 258 Q 1102 246 1160 230",
  "M 1160 230 Q 1202 188 1250 150",
  "M 1168 94 Q 1210 116 1250 150",
  "M 1226 68 Q 1238 106 1250 150",
  "M 1328 92 Q 1290 118 1250 150",
  "M 1378 146 Q 1312 146 1250 150",
  "M 1188 230 Q 1218 190 1250 150",
  "M 1052 258 Q 1116 300 1178 348",
  "M 888 430 Q 1040 404 1178 348",
  "M 1178 348 Q 1234 368 1290 390",
  "M 1164 414 Q 1226 402 1290 390",
  "M 1240 486 Q 1262 438 1290 390",
  "M 1360 458 Q 1328 424 1290 390",
  "M 1398 342 Q 1346 362 1290 390",
  "M 1250 150 Q 1350 178 1450 270",
  "M 1290 390 Q 1382 344 1450 270",
  "M 1320 226 Q 1382 240 1450 270",
  "M 1486 150 Q 1468 206 1450 270",
  "M 1518 234 Q 1484 252 1450 270",
  "M 1480 362 Q 1468 316 1450 270",
  "M 648 286 Q 872 188 1052 258",
  "M 344 252 Q 604 356 888 430",
  "M 574 128 Q 876 44 1250 150",
  "M 916 122 Q 1160 72 1450 270",
  "M 492 416 Q 874 512 1290 390",
] as const;

export default function HeroSurfaceShift() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="-140 -90 1760 760"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <g className="hero-kg-edges" fill="none">
          {EDGES.map((d, index) => (
            <path
              key={d}
              d={d}
              className={
                index > EDGES.length - 6 ? "hero-kg-edge-weak" : undefined
              }
            />
          ))}
        </g>

        <g className="hero-kg-bridges">
          {BRIDGE_NODES.map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>

        <g className="hero-kg-satellites">
          {SATELLITE_NODES.map(([cx, cy, r], index) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              className={
                index % 9 === 0 ? "hero-kg-satellite-bright" : undefined
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
              style={{ animationDelay: `${index * -0.9}s` }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 4}
                className="hero-kg-node-halo"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 1.4}
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

        <g className="hero-kg-journeys" fill="none">
          <path
            id="hero-kg-journey-a"
            d="M 188 154 C 332 94, 494 138, 648 286 S 858 154, 916 122 S 1116 182, 1250 150 S 1382 212, 1450 270"
          />
          <path
            id="hero-kg-journey-b"
            d="M 344 252 C 482 214, 560 234, 648 286 S 778 426, 888 430 S 1068 300, 1178 348 S 1360 338, 1450 270"
          />
          <circle r="1.8" className="hero-kg-signal hero-kg-signal-dark">
            <animateMotion dur="38s" repeatCount="indefinite" begin="-11s">
              <mpath href="#hero-kg-journey-a" />
            </animateMotion>
          </circle>
          <circle r="1.6" className="hero-kg-signal hero-kg-signal-accent">
            <animateMotion dur="46s" repeatCount="indefinite" begin="-27s">
              <mpath href="#hero-kg-journey-b" />
            </animateMotion>
          </circle>
        </g>
      </svg>

      <div className="hero-kg-center-wash absolute left-1/2 top-1/2 h-[82%] w-[68%] -translate-x-1/2 -translate-y-1/2" />

      <style>{`
        .hero-kg-edges path {
          stroke: #111318;
          stroke-width: 0.75;
          stroke-opacity: 0.055;
          vector-effect: non-scaling-stroke;
        }
        .hero-kg-edge-weak {
          stroke-opacity: 0.022 !important;
        }
        .hero-kg-satellites {
          fill: #111318;
          opacity: 0.12;
        }
        .hero-kg-satellite-bright {
          opacity: 0.24;
        }
        .hero-kg-bridges {
          fill: #111318;
          opacity: 0.2;
        }
        .hero-kg-node {
          animation: hero-kg-node-float 19s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .hero-kg-node-halo {
          fill: #111318;
          opacity: 0.018;
        }
        .hero-kg-node-ring {
          fill: #fafafa;
          stroke: #111318;
          stroke-width: 0.75;
          stroke-opacity: 0.13;
          vector-effect: non-scaling-stroke;
        }
        .hero-kg-node-core {
          fill: #111318;
          opacity: 0.38;
        }
        .hero-kg-node text {
          fill: #111318;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 5.4px;
          font-weight: 600;
          letter-spacing: 0.055em;
          opacity: 0.16;
        }
        .hero-kg-node-active .hero-kg-node-halo {
          fill: #b8441d;
          opacity: 0.035;
          animation: hero-kg-halo-pulse 12s ease-in-out infinite;
        }
        .hero-kg-node-active .hero-kg-node-ring {
          stroke: #b8441d;
          stroke-opacity: 0.24;
        }
        .hero-kg-node-active .hero-kg-node-core {
          fill: #b8441d;
          opacity: 0.54;
        }
        .hero-kg-journeys path {
          stroke: #b8441d;
          stroke-width: 0.9;
          stroke-linecap: round;
          stroke-dasharray: 2 13;
          stroke-opacity: 0.075;
          vector-effect: non-scaling-stroke;
        }
        .hero-kg-signal-dark {
          fill: #111318;
          opacity: 0.2;
        }
        .hero-kg-signal-accent {
          fill: #b8441d;
          opacity: 0.45;
        }
        .hero-kg-center-wash {
          background: radial-gradient(ellipse at center, rgba(250, 250, 250, 0.995) 0%, rgba(250, 250, 250, 0.97) 42%, rgba(250, 250, 250, 0.7) 70%, rgba(250, 250, 250, 0) 100%);
        }
        @keyframes hero-kg-node-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(0, -1px); }
        }
        @keyframes hero-kg-halo-pulse {
          0%, 64%, 100% { transform: scale(0.9); opacity: 0.015; }
          72%, 84% { transform: scale(1.3); opacity: 0.05; }
        }
        @media (max-width: 767px) {
          .hero-kg-node text {
            display: none;
          }
          .hero-kg-satellites {
            opacity: 0.07;
          }
          .hero-kg-bridges {
            opacity: 0.12;
          }
          .hero-kg-edges path {
            stroke-opacity: 0.032;
          }
          .hero-kg-center-wash {
            width: 82%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-kg-journeys circle {
            display: none;
          }
          .hero-kg-node,
          .hero-kg-node-active .hero-kg-node-halo {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
