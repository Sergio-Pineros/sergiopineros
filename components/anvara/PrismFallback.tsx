"use client";
import { useState } from "react";
import { Opportunity } from "@/lib/anvara/data";
export default function PrismFallback({
  data,
  selected,
  onSelect,
  flat = false,
  focus = false,
}: {
  data: Opportunity[];
  selected: string;
  onSelect: (id: string) => void;
  flat?: boolean;
  focus?: boolean;
}) {
  const [angle, setAngle] = useState(0.58);
  const project = ([x, y, z]: number[]) => {
    const a = flat ? 0 : angle;
    return [
      390 + (x * Math.cos(a) + z * Math.sin(a)) * 66,
      220 - y * 67 + (z * Math.cos(a) - x * Math.sin(a)) * 25,
    ];
  };
  const corners = [
    [-2.7, -1.9, -1.6],
    [2.7, -1.9, -1.6],
    [2.7, 1.9, -1.6],
    [-2.7, 1.9, -1.6],
    [-2.7, -1.9, 1.6],
    [2.7, -1.9, 1.6],
    [2.7, 1.9, 1.6],
    [-2.7, 1.9, 1.6],
  ];
  const point = (o: Opportunity) =>
    project([
      (o.effort - 5.5) * 0.54,
      (o.impact - 5.5) * 0.38,
      flat ? 0 : (o.confidence - 5.5) * 0.35,
    ]);
  const target = data.find((o) => o.id === selected);
  const center = focus && target ? point(target) : [390, 220];
  return (
    <div className="av-prism-fallback">
      {target && (
        <span className="av-prism-selected">Selected: {target.short}</span>
      )}
      <svg
        viewBox={
          focus
            ? `${center[0] - 280} ${center[1] - 180} 560 360`
            : "0 0 780 440"
        }
        role="group"
        aria-label="Projected decision prism. The same estimates are represented in this non-WebGL fallback."
      >
        <defs>
          <linearGradient id="prism-glass">
            <stop stopColor="#4f85df" stopOpacity=".13" />
            <stop offset="1" stopColor="#a26ae8" stopOpacity=".06" />
          </linearGradient>
          <radialGradient id="prism-fallback-glow">
            <stop stopColor="#a3a7ff" stopOpacity=".25" />
            <stop offset="1" stopColor="#a3a7ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="390"
          cy="260"
          rx="290"
          ry="160"
          fill="url(#prism-fallback-glow)"
        />
        {[
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [0, 1, 5, 4],
          [3, 2, 6, 7],
        ].map((face, i) => (
          <polygon
            key={i}
            points={face.map((n) => project(corners[n]).join(",")).join(" ")}
            fill="url(#prism-glass)"
            stroke="#8c9fd1"
            strokeWidth=".7"
            opacity=".7"
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={project(corners[i])[0]}
            y1={project(corners[i])[1]}
            x2={project(corners[i + 4])[0]}
            y2={project(corners[i + 4])[1]}
            stroke="#9ca5d8"
            strokeWidth=".8"
          />
        ))}
        {[-1, 0, 1].map((y) => (
          <polyline
            key={y}
            points={[
              [-2.7, y, -1.6],
              [2.7, y, -1.6],
              [2.7, y, 1.6],
              [-2.7, y, 1.6],
              [-2.7, y, -1.6],
            ]
              .map((p) => project(p).join(","))
              .join(" ")}
            fill="none"
            stroke="#99a6d4"
            strokeWidth=".5"
            opacity=".23"
          />
        ))}
        {data.flatMap((o) =>
          o.dependencies
            .filter((id) => data.some((d) => d.id === id))
            .map((id) => {
              const a = point(o),
                b = point(data.find((d) => d.id === id)!);
              return (
                <line
                  key={`${o.id}-${id}`}
                  x1={a[0]}
                  y1={a[1]}
                  x2={b[0]}
                  y2={b[1]}
                  stroke="#a9a4e0"
                  strokeWidth=".7"
                  strokeDasharray="3 5"
                  opacity=".5"
                />
              );
            }),
        )}
        {data.map((o, i) => {
          const [x, y] = point(o);
          return (
            <g
              key={o.id}
              className="av-projected-point"
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${o.title}`}
              aria-pressed={selected === o.id}
              onClick={() => onSelect(o.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(o.id);
                }
              }}
            >
              <title>{`${o.title}: effort ${o.effort}, value ${o.impact}, evidence ${o.confidence}`}</title>
              <circle
                cx={x}
                cy={y}
                r={selected === o.id ? 20 : 15}
                fill="transparent"
              />
              <circle
                cx={x}
                cy={y}
                r={selected === o.id ? 7 : 5}
                fill={
                  o.side === "brand"
                    ? "#60a2ff"
                    : o.side === "rightsholder"
                      ? "#b28aff"
                      : "#969fff"
                }
                stroke="#fff"
                strokeWidth={selected === o.id ? 2 : 0}
              />
              <text
                x={x + 12}
                y={y - 10}
                fill="#d3daf5"
                fontSize={selected === o.id ? 12 : 10}
              >
                {selected === o.id ? o.short : String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
        <g fill="#a9b8dc" fontSize="10" letterSpacing="1">
          <text x="355" y="420">
            EFFORT →
          </text>
          <text transform="translate(100 255) rotate(-90)">VALUE →</text>
          <text x="535" y="95">
            EVIDENCE ↗
          </text>
        </g>
      </svg>
      <div className="av-projection-controls">
        <button
          onClick={() => setAngle((v) => v - 0.2)}
          aria-label="Rotate projected prism left"
        >
          ←
        </button>
        <span>3D projection / WebGL unavailable in this browser</span>
        <button
          onClick={() => setAngle((v) => v + 0.2)}
          aria-label="Rotate projected prism right"
        >
          →
        </button>
      </div>
    </div>
  );
}
