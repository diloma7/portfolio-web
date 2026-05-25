"use client";

import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Billboard, // <- faces camera automatically
  Html,
  useTexture,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

/* ------------------------ Blob geometry w/ wobble ------------------------ */

function BlobMesh({
  color = "#ff8f3f",
  wireframe = false,
  paused = false,
  imageSrc,
}: {
  color?: string;
  wireframe?: boolean;
  paused?: boolean;
  imageSrc?: string;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const geometry = useMemo(() => new THREE.SphereGeometry(1.2, 48, 48), []);
  const texture = useTexture(imageSrc ?? "") as THREE.Texture | undefined;

  const material = useMemo(() => {
    if (imageSrc && texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.35,
        metalness: 0.05,
      });
    }
    return new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.0,
      thickness: 0.5,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      wireframe,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, wireframe, imageSrc, texture?.uuid]);

  // Cache original positions for wobble
  const original = useMemo(
    () => geometry.attributes.position.array.slice(0) as Float32Array,
    [geometry],
  );

  useFrame(({ clock }) => {
    if (paused) return;
    const t = clock.getElapsedTime();
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    // Organic wobble
    for (let i = 0; i < arr.length; i += 3) {
      const ox = original[i + 0],
        oy = original[i + 1],
        oz = original[i + 2];
      const r = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const k =
        0.06 * Math.sin(2.0 * r + t * 1.4) + 0.04 * Math.sin(3.2 * r + t * 1.1);
      const s = 1.0 + k;
      arr[i + 0] = ox * s;
      arr[i + 1] = oy * s;
      arr[i + 2] = oz * s;
    }
    pos.needsUpdate = true;
  });

  return <mesh ref={mesh} geometry={geometry} material={material} />;
}

/* -------------------------- Helpers + types -------------------------- */

type MenuItem = { label: string; href: string; theta: number; phi: number };

function atSphere(
  r: number,
  theta: number, // azimuth around Y (radians)
  phi: number, // polar from +Y (0..π)
): [number, number, number] {
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

/* ----------------------- Pin (map-location style) ----------------------- */

function MapPin({
  item,
  radius,
  baseColor,
  draggingRef,
  onNavigate,
  onHoverChange,
}: {
  item: MenuItem;
  radius: number; // distance from center
  baseColor: string; // pin body color
  draggingRef: React.MutableRefObject<boolean>;
  onNavigate: (href: string) => void;
  onHoverChange: (hovered: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const pinRef = useRef<THREE.Group>(null!);

  // position on the sphere, then face the camera (Billboard)
  const pos = atSphere(radius, item.theta, item.phi);

  // gentle hover bobbing / breathing
  useFrame(({ clock }) => {
    if (!pinRef.current) return;
    const t = clock.getElapsedTime();
    const s = hovered ? 1.08 : 1.0;
    pinRef.current.scale.setScalar(s + Math.sin(t * 2.2) * 0.02);
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    onHoverChange(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    onHoverChange(false);
    document.body.style.cursor = "";
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!draggingRef.current) onNavigate(item.href);
  };
  return (
    <group position={pos}>
      {/* Make the whole pin always face the camera for legibility */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <group
          ref={pinRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleClick}
        >
          {/* Pin head (sphere) */}
          <mesh position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.14, 32, 32]} />
            <meshStandardMaterial
              color={baseColor}
              roughness={0.35}
              metalness={0.1}
              emissive={hovered ? baseColor : "black"}
              emissiveIntensity={hovered ? 0.35 : 0}
            />
          </mesh>

          {/* Pin tip (cone) */}
          <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.075, 0.18, 32]} />
            <meshStandardMaterial
              color={baseColor}
              roughness={0.4}
              metalness={0.05}
            />
          </mesh>

          {/* Label under the pin */}
          <Html
            transform
            distanceFactor={8}
            position={[0, -0.32, 0]}
            style={{ pointerEvents: "none" }}
          >
            <motion.span
              initial={false}
              animate={{
                opacity: hovered ? 1 : 0,
                y: hovered ? 0 : 12,
                filter: hovered ? "blur(0px)" : "blur(8px)",
              }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur"
            >
              {item.label}
            </motion.span>
          </Html>
        </group>
      </Billboard>
    </group>
  );
}

/* ----------------------- Inertia driver (inside R3F) ---------------------- */

function RotationDriver({
  groupRef,
  draggingRef,
  paused,
  velocity,
  targetRotation,
  idleTimer,
  hoveredPin,
}: {
  groupRef: React.RefObject<THREE.Group>;
  draggingRef: React.MutableRefObject<boolean>;
  paused: boolean;
  velocity: React.MutableRefObject<{ x: number; y: number }>;
  targetRotation: React.MutableRefObject<{ x: number; y: number }>;
  idleTimer: React.MutableRefObject<number>;
  hoveredPin: React.MutableRefObject<boolean>;
}) {
  useFrame((_, delta) => {
    if (!groupRef.current || paused) return;

    if (hoveredPin.current) {
      velocity.current.x = 0;
      velocity.current.y = 0;
      idleTimer.current = 0;
      targetRotation.current.x = groupRef.current.rotation.x;
      targetRotation.current.y = groupRef.current.rotation.y;
      return;
    }

    if (!draggingRef.current) {
      velocity.current.x = THREE.MathUtils.damp(
        velocity.current.x,
        0,
        3.4,
        delta,
      );
      velocity.current.y = THREE.MathUtils.damp(
        velocity.current.y,
        0,
        3.4,
        delta,
      );

      targetRotation.current.y += velocity.current.x * delta;
      targetRotation.current.x = THREE.MathUtils.clamp(
        targetRotation.current.x + velocity.current.y * delta,
        -0.9,
        0.9,
      );

      const nearlyStill =
        Math.abs(velocity.current.x) < 0.01 &&
        Math.abs(velocity.current.y) < 0.01;

      if (nearlyStill) {
        idleTimer.current += delta;
        targetRotation.current.y +=
          Math.sin(idleTimer.current * 0.35) * delta * 0.35;
        targetRotation.current.x = THREE.MathUtils.clamp(
          targetRotation.current.x +
            Math.cos(idleTimer.current * 0.5) * delta * 0.18,
          -0.6,
          0.6,
        );
      } else {
        idleTimer.current = 0;
      }
    } else {
      idleTimer.current = 0;
    }

    const { rotation } = groupRef.current;
    rotation.y = THREE.MathUtils.damp(
      rotation.y,
      targetRotation.current.y,
      6,
      delta,
    );
    rotation.x = THREE.MathUtils.damp(
      rotation.x,
      targetRotation.current.x,
      6,
      delta,
    );
  });

  return null;
}

/* --------------------------------- Export --------------------------------- */

export default function ThreeBlob({
  className,
  dark = false,
  imageSrc,
  scale = 1,
}: {
  className?: string;
  dark?: boolean;
  imageSrc?: string;
  scale?: number;
}) {
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const router = useRouter();

  // Rotation state
  const groupRef = useRef<THREE.Group>(null!);
  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number; time: number } | null>(null);
  const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const idleTimer = useRef(0);
  const hoveredPin = useRef(false);

  const [isGrabbing, setIsGrabbing] = useState(false);

  // Menu items placed on a sphere (angles in radians)
  const items: MenuItem[] = useMemo(
    () => [
      { label: "About Me", href: "/about", theta: 0.0, phi: Math.PI * 0.4 },
      {
        label: "Projects",
        href: "/projects",
        theta: Math.PI * 0.7,
        phi: Math.PI * 0.58,
      },
      {
        label: "Contact Me",
        href: "/contact",
        theta: Math.PI * 1.45,
        phi: Math.PI * 0.5,
      },
    ],
    [],
  );

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = true;
    setIsGrabbing(true);

    last.current = {
      x: e.clientX,
      y: e.clientY,
      time: e.nativeEvent.timeStamp,
    };
    velocity.current = { x: 0, y: 0 };
    if (groupRef.current) {
      targetRotation.current.x = groupRef.current.rotation.x;
      targetRotation.current.y = groupRef.current.rotation.y;
    }
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current || !groupRef.current || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    const dt = Math.max(
      (e.nativeEvent.timeStamp - last.current.time) / 1000,
      0.016,
    );
    const yawDelta = dx * 0.0025;
    const pitchDelta = dy * 0.0025;

    targetRotation.current.y += yawDelta;
    targetRotation.current.x = THREE.MathUtils.clamp(
      targetRotation.current.x + pitchDelta,
      -0.9,
      0.9,
    );

    velocity.current.x = yawDelta / dt;
    velocity.current.y = pitchDelta / dt;

    groupRef.current.rotation.y = targetRotation.current.y;
    groupRef.current.rotation.x = targetRotation.current.x;

    last.current = {
      x: e.clientX,
      y: e.clientY,
      time: e.nativeEvent.timeStamp,
    };
  };
  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = false;
    setIsGrabbing(false);
    last.current = null;
    velocity.current.x = 0;
    velocity.current.y = 0;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };
  const handlePinHoverChange = (hovering: boolean) => {
    hoveredPin.current = hovering;
    if (hovering) {
      dragging.current = false;
      setIsGrabbing(false);
      last.current = null;
      velocity.current.x = 0;
      velocity.current.y = 0;
      if (groupRef.current) {
        targetRotation.current.x = groupRef.current.rotation.x;
        targetRotation.current.y = groupRef.current.rotation.y;
      }
    }
  };

  const onNavigate = (href: string) => router.push(href);
  const paused = prefersReducedMotion;

  // Theme-aware pin color
  const pinColor = dark ? "#8ab4ff" : "#7aa2ff";

  return (
    <div
      className={className}
      style={{ cursor: isGrabbing ? "grabbing" : "grab", userSelect: "none" }}
    >
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        onPointerDown={(e) =>
          onPointerDown(e as unknown as ThreeEvent<PointerEvent>)
        }
        onPointerMove={(e) =>
          onPointerMove(e as unknown as ThreeEvent<PointerEvent>)
        }
        onPointerUp={(e) =>
          onPointerUp(e as unknown as ThreeEvent<PointerEvent>)
        }
        onPointerLeave={() => {
          dragging.current = false;
          setIsGrabbing(false);
          last.current = null;
          velocity.current.x = 0;
          velocity.current.y = 0;
          document.body.style.cursor = "";
        }}
      >
        {/* Lights */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[2.5, 3, 2]} intensity={1.2} />
        <directionalLight position={[-3, -2, -2]} intensity={0.3} />

        {/* Rotating group (blob + pins) */}
        <group ref={groupRef} scale={scale}>
          <BlobMesh
            color={dark ? "#ffb457" : "#ff8f3f"}
            paused={paused ?? false}
            imageSrc={imageSrc}
          />

          {/* Map pins on an invisible sphere around the blob */}
          {items.map((item) => (
            <MapPin
              key={item.label}
              item={item}
              radius={1.95} // slightly above the blob surface (blob radius ~1.2)
              baseColor={pinColor}
              draggingRef={dragging}
              onNavigate={onNavigate}
              onHoverChange={handlePinHoverChange}
            />
          ))}
        </group>

        {/* Inertia after drag release */}
        <RotationDriver
          groupRef={groupRef}
          draggingRef={dragging}
          paused={paused ?? false}
          velocity={velocity}
          targetRotation={targetRotation}
          idleTimer={idleTimer}
          hoveredPin={hoveredPin}
        />

        {/* Studio look */}
        <Environment preset="city" />
        <ContactShadows
          position={[0, -1.25, 0]}
          opacity={dark ? 0.5 : 0.25}
          blur={3.4}
          scale={8}
          far={5}
        />
      </Canvas>
    </div>
  );
}
