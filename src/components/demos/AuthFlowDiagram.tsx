"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Play, RotateCcw } from "lucide-react";

const STEPS = [
  { id: "client", label: "Client", sub: "React App", x: 60, y: 40 },
  { id: "login", label: "Login Form", sub: "Credentials", x: 60, y: 130 },
  { id: "api", label: "API Server", sub: "ASP.NET Core", x: 280, y: 130 },
  { id: "validate", label: "Validate", sub: "Check DB", x: 280, y: 220 },
  { id: "jwt", label: "Sign JWT", sub: "Generate Token", x: 280, y: 310 },
  { id: "cookie", label: "Set Cookie", sub: "HTTP-Only", x: 280, y: 400 },
  {
    id: "protected",
    label: "Protected Route",
    sub: "Authorized ✓",
    x: 60,
    y: 400,
  },
];

const ARROWS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
];

const BOX_W = 150;
const BOX_H = 60;
const SVG_W = 490;
const SVG_H = 490;

function midX(step: (typeof STEPS)[number]) {
  return step.x + BOX_W / 2;
}
function midY(step: (typeof STEPS)[number]) {
  return step.y + BOX_H / 2;
}

function arrowPath(from: (typeof STEPS)[number], to: (typeof STEPS)[number]) {
  const fx = midX(from);
  const fy = midY(from);
  const tx = midX(to);
  const ty = midY(to);

  // Determine exit/entry sides
  if (Math.abs(tx - fx) > Math.abs(ty - fy)) {
    // Horizontal dominant
    const startX = fx < tx ? from.x + BOX_W : from.x;
    const endX = fx < tx ? to.x : to.x + BOX_W;
    return `M${startX},${fy} L${endX},${ty}`;
  } else {
    // Vertical dominant
    const startY = fy < ty ? from.y + BOX_H : from.y;
    const endY = fy < ty ? to.y : to.y + BOX_H;
    return `M${fx},${startY} L${tx},${endY}`;
  }
}

export default function AuthFlowDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      // Initial state: hide everything
      gsap.set(".auth-box", { autoAlpha: 0, scale: 0.85 });
      gsap.set(".auth-arrow", { strokeDashoffset: 1, autoAlpha: 0 });
      gsap.set(".auth-label", { autoAlpha: 0 });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  const play = () => {
    if (!svgRef.current) return;
    setPlaying(true);
    setFinished(false);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setPlaying(false);
        setFinished(true);
      },
    });
    tlRef.current = tl;

    // Reveal boxes and arrows sequentially
    STEPS.forEach((_, i) => {
      tl.to(
        `.auth-box-${i}`,
        { autoAlpha: 1, scale: 1, duration: 0.4 },
        i === 0 ? 0 : `+=0.1`,
      );
      tl.to(`.auth-label-${i}`, { autoAlpha: 1, duration: 0.3 }, "-=0.2");

      if (i < ARROWS.length) {
        tl.to(
          `.auth-arrow-${i}`,
          { autoAlpha: 1, strokeDashoffset: 0, duration: 0.4 },
          "-=0.1",
        );
      }
    });
  };

  const reset = () => {
    tlRef.current?.kill();
    if (!svgRef.current) return;

    gsap.set(".auth-box", { autoAlpha: 0, scale: 0.85 });
    gsap.set(".auth-arrow", { strokeDashoffset: 1, autoAlpha: 0 });
    gsap.set(".auth-label", { autoAlpha: 0 });
    setPlaying(false);
    setFinished(false);
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-200">
          JWT Authentication Flow
        </p>
        <div className="flex gap-2">
          {!playing && !finished && (
            <button
              onClick={play}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              <Play size={12} />
              Start Flow
            </button>
          )}
          {(playing || finished) && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Diagram */}
      <div className="p-4 flex justify-center overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full max-w-[490px]"
          role="img"
          aria-label="JWT authentication flow diagram"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#22d3ee" />
            </marker>
          </defs>

          {/* Arrows */}
          {ARROWS.map(([fi, ti], i) => {
            const d = arrowPath(STEPS[fi], STEPS[ti]);
            return (
              <path
                key={`arrow-${i}`}
                className={`auth-arrow auth-arrow-${i}`}
                d={d}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeDasharray="1"
                pathLength="1"
                markerEnd="url(#arrowhead)"
              />
            );
          })}

          {/* Boxes */}
          {STEPS.map((step, i) => (
            <g key={step.id}>
              <rect
                className={`auth-box auth-box-${i}`}
                x={step.x}
                y={step.y}
                width={BOX_W}
                height={BOX_H}
                rx="10"
                fill={
                  i === STEPS.length - 1
                    ? "rgba(16,185,129,0.2)"
                    : "rgba(30,41,59,0.9)"
                }
                stroke={i === STEPS.length - 1 ? "#10b981" : "#334155"}
                strokeWidth="1.5"
              />
              <g className={`auth-label auth-label-${i}`}>
                <text
                  x={step.x + BOX_W / 2}
                  y={step.y + 24}
                  textAnchor="middle"
                  fill="#e2e8f0"
                  fontSize="13"
                  fontWeight="600"
                >
                  {step.label}
                </text>
                <text
                  x={step.x + BOX_W / 2}
                  y={step.y + 42}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="10"
                >
                  {step.sub}
                </text>
              </g>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
