"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StudioCameraModelProps {
  onShutterClick?: () => void;
  isTriggered?: boolean;
}

export function StudioCameraModel({
  onShutterClick,
  isTriggered,
}: StudioCameraModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const shutterRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animate camera rotation gently following mouse position and continuous slow idle drift
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Target rotation based on mouse coordinates
    const targetY = state.pointer.x * 0.45;
    const targetX = -state.pointer.y * 0.3;

    // Smooth linear interpolation (lerp) for luxurious, heavy physical feel
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY + Math.sin(state.clock.elapsedTime * 0.5) * 0.05,
      delta * 3.5
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX + Math.cos(state.clock.elapsedTime * 0.5) * 0.03,
      delta * 3.5
    );

    // Shutter button depression animation
    if (shutterRef.current) {
      const targetShutterY = isTriggered ? 0.76 : 0.82;
      shutterRef.current.position.y = THREE.MathUtils.lerp(
        shutterRef.current.position.y,
        targetShutterY,
        delta * 15
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.03 : 1}
    >
      {/* 1. Main Camera Body (Chassis) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.4, 0.9]} />
        <meshStandardMaterial
          color="#121214"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* 2. Top Plate (Machined Brushed Titanium / Brass) */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[2.42, 0.16, 0.92]} />
        <meshStandardMaterial
          color="#2a2a2e"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* 3. Base Plate */}
      <mesh position={[0, -0.72, 0]} receiveShadow>
        <boxGeometry args={[2.42, 0.12, 0.92]} />
        <meshStandardMaterial
          color="#222225"
          roughness={0.35}
          metalness={0.75}
        />
      </mesh>

      {/* 4. Leatherette Front Grip Accents */}
      <mesh position={[0.7, 0, 0.46]}>
        <boxGeometry args={[0.85, 1.25, 0.03]} />
        <meshStandardMaterial
          color="#0a0a0b"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      <mesh position={[-0.7, 0, 0.46]}>
        <boxGeometry args={[0.85, 1.25, 0.03]} />
        <meshStandardMaterial
          color="#0a0a0b"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* 5. Lens Outer Barrel */}
      <mesh
        position={[0, -0.05, 0.75]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.62, 0.65, 0.8, 32]} />
        <meshStandardMaterial
          color="#1a1a1c"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* 6. Lens Aperture / Focus Ribbed Ring */}
      <mesh position={[0, -0.05, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.64, 0.64, 0.25, 32]} />
        <meshStandardMaterial
          color="#c5a880"
          roughness={0.35}
          metalness={0.7}
        />
      </mesh>

      {/* 7. Front Glass Element */}
      <mesh position={[0, -0.05, 1.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.05, 32]} />
        <meshStandardMaterial
          color="#081420"
          roughness={0.05}
          metalness={0.3}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* 8. Shutter Button (Clickable) */}
      <mesh
        ref={shutterRef}
        position={[0.78, 0.82, 0.15]}
        onClick={(e) => {
          e.stopPropagation();
          onShutterClick?.();
        }}
        castShadow
      >
        <cylinderGeometry args={[0.12, 0.12, 0.14, 20]} />
        <meshStandardMaterial
          color="#c5a880"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* 9. Shutter Speed Dial */}
      <mesh position={[0.35, 0.83, 0.05]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
        <meshStandardMaterial
          color="#222226"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* 10. Optical Viewfinder Window */}
      <mesh position={[-0.75, 0.76, 0.42]}>
        <boxGeometry args={[0.28, 0.18, 0.12]} />
        <meshStandardMaterial
          color="#0d1b2a"
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* 11. Red Dot Heritage Accent Mark */}
      <mesh position={[0.78, 0.42, 0.47]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
        <meshStandardMaterial
          color="#d9383a"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}
