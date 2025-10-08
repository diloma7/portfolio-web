"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  MotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Particles({
  count = 1000,
  paused = false,
  phase = 1,
}: {
  count?: number;
  paused?: boolean;
  phase: number;
}) {
  const points = useRef<THREE.Points>(null!);
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      spd[i] = 0.1 + Math.random() * 0.6;
    }
    return { positions: pos, speeds: spd };
  }, [count]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  const mat = useMemo(() => {
    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#9fb3ff"),
      size: 0.04,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
    });
    material.depthWrite = false;
    return material;
  }, []);

  useFrame(({ clock }) => {
    if (paused) return;
    const t = clock.getElapsedTime();
    const eased = THREE.MathUtils.smoothstep(phase, 0, 1);
    const p = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = p.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const idx = i / 3;
      arr[i + 1] += Math.sin((t + idx) * 0.15 * speeds[idx]) * 0.002 * eased;
      arr[i + 0] += Math.cos((t + idx) * 0.12 * speeds[idx]) * 0.001 * eased;
    }
    p.needsUpdate = true;
    if (points.current) {
      const sway = Math.sin(t * 0.4) * 0.015 * eased;
      points.current.rotation.y = Math.sin(t * 0.05) * 0.06 * eased;
      points.current.rotation.x = sway;
      const scale = THREE.MathUtils.lerp(0.85, 1, eased);
      points.current.scale.setScalar(scale);
    }
    mat.opacity = THREE.MathUtils.lerp(0, 0.7, eased);
  });

  return (
    <points ref={points} geometry={geo} material={mat} visible={phase > 0.02} />
  );
}

export default function ThreeParticlesBackground({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(() => progress.get());

  useMotionValueEvent(progress, "change", (value) => {
    setPhase(value);
  });
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 12], fov: 55 }}
      >
        <fog attach="fog" args={["#0b0b0b", 10, 40]} />
        <Particles
          paused={prefersReducedMotion ?? false}
          phase={prefersReducedMotion ? 0 : phase}
        />
      </Canvas>
    </div>
  );
}
