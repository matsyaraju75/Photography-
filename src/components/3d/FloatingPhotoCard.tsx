"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Image as DreiImage, Float } from "@react-three/drei";
import * as THREE from "three";

interface FloatingPhotoCardProps {
  position: [number, number, number];
  url: string;
  title: string;
  location: string;
  scale: [number, number];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function FloatingPhotoCard({
  position,
  url,
  title,
  location,
  scale,
  floatSpeed = 1.4,
  rotationIntensity = 0.15,
  floatIntensity = 0.3,
  isSelected = false,
  onSelect,
}: FloatingPhotoCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Smooth hover scale & focus lift
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = hovered || isSelected ? 1.05 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
      floatingRange={[-0.04, 0.04]}
    >
      <group
        ref={groupRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        {/* Physical Mat Frame Behind Image */}
        <mesh position={[0, 0, -0.015]}>
          <planeGeometry args={[scale[0] + 0.14, scale[1] + 0.14]} />
          <meshStandardMaterial
            color={isSelected ? "#2F4A3A" : hovered ? "#765B43" : "#FAF7F0"}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Thin Outer Shadow Frame */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[scale[0] + 0.18, scale[1] + 0.18]} />
          <meshStandardMaterial
            color="#D8C9B3"
            roughness={0.9}
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* 3D Photograph Plane */}
        <DreiImage
          url={url}
          scale={scale}
          transparent
          toneMapped={false}
        />
      </group>
    </Float>
  );
}
