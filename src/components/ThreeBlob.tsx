/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Billboard, // <- faces camera automatically
  Text,
  useTexture,
} from "@react-three/drei";
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
  const geometry = useMemo(() => new THREE.SphereGeometry(1.2, 128, 128), []);
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
    [geometry]
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
  phi: number // polar from +Y (0..π)
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
}: {
  item: MenuItem;
  radius: number; // distance from center
  baseColor: string; // pin body color
  draggingRef: React.MutableRefObject<boolean>;
  onNavigate: (href: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const pinRef = useRef<THREE.Group>(null!);

  // position on the sphere, then face the camera (Billboard)
  const pos = atSphere(radius, item.theta, item.phi);

  // gentle hover bobbing / breathing
  useFrame(({ clock }) => {
    if (!pinRef.current) return;
    const t = clock.getElapsedTime();
    const s = hovered ? 1.1 : 1.0;
    pinRef.current.scale.setScalar(s + Math.sin(t * 2.2) * 0.02);
  });

  return (
    <group position={pos}>
      {/* Make the whole pin always face the camera for legibility */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <group
          ref={pinRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            if (!draggingRef.current) onNavigate(item.href);
          }}
        >
          {/* Pin head (sphere) */}
          <mesh position={[0, 0.16, 0]}>
            <sphereGeometry args={[0.14, 32, 32]} />
            <meshStandardMaterial
              color={baseColor}
              roughness={0.35}
              metalness={0.1}
              emissive={hovered ? baseColor : "black"}
              emissiveIntensity={hovered ? 0.3 : 0}
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
          <Text
            position={[0, -0.28, 0]}
            fontSize={0.18}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="black"
          >
            {item.label}
          </Text>
        </group>
      </Billboard>
    </group>
  );
}

/* ----------------------- Inertia driver (inside R3F) ---------------------- */

function InertiaDriver({
  groupRef,
  draggingRef,
  velRef,
}: {
  groupRef: React.RefObject<THREE.Group>;
  draggingRef: React.MutableRefObject<boolean>;
  velRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  useFrame(() => {
    if (!draggingRef.current && groupRef.current) {
      velRef.current.x *= 0.94;
      velRef.current.y *= 0.94;

      if (Math.abs(velRef.current.x) < 0.0005) velRef.current.x = 0;
      if (Math.abs(velRef.current.y) < 0.0005) velRef.current.y = 0;

      if (velRef.current.x || velRef.current.y) {
        groupRef.current.rotation.y += velRef.current.x;
        const nextX = groupRef.current.rotation.x + velRef.current.y;
        groupRef.current.rotation.x = THREE.MathUtils.clamp(nextX, -0.9, 0.9);
      }
    }
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
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const router = useRouter();

  // Rotation state
  const groupRef = useRef<THREE.Group>(null!);
  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const vel = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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
    []
  );

  const onPointerDown = (e: any) => {
    dragging.current = true;
    setIsGrabbing(true);
    last.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: any) => {
    if (!dragging.current || !groupRef.current || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    const sx = dx * 0.005; // yaw
    const sy = dy * 0.005; // pitch
    groupRef.current.rotation.y += sx;
    const nextX = groupRef.current.rotation.x + sy;
    groupRef.current.rotation.x = THREE.MathUtils.clamp(nextX, -0.9, 0.9);
    vel.current.x = sx;
    vel.current.y = sy;
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: any) => {
    dragging.current = false;
    setIsGrabbing(false);
    last.current = null;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const onNavigate = (href: string) => router.push(href);
  const paused = reduced;

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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={() => {
          dragging.current = false;
          setIsGrabbing(false);
          last.current = null;
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
            paused={paused}
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
            />
          ))}
        </group>

        {/* Inertia after drag release */}
        <InertiaDriver
          groupRef={groupRef}
          draggingRef={dragging}
          velRef={vel}
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
