"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { FloatingPhotoCard } from "@/components/3d/FloatingPhotoCard";
import { PhotoAsset } from "@/types";
import * as THREE from "three";

interface FloatingWallCanvasProps {
  photos: PhotoAsset[];
  selectedPhoto: PhotoAsset | null;
  onSelectPhoto: (photo: PhotoAsset) => void;
}

function SceneCluster({
  photos,
  selectedPhoto,
  onSelectPhoto,
}: FloatingWallCanvasProps) {
  const clusterRef = useRef<THREE.Group>(null);

  // Smooth mouse-driven spatial rotation
  useFrame((state, delta) => {
    if (!clusterRef.current) return;
    const targetY = state.pointer.x * 0.22;
    const targetX = -state.pointer.y * 0.16;

    clusterRef.current.rotation.y = THREE.MathUtils.lerp(
      clusterRef.current.rotation.y,
      targetY,
      delta * 3.5
    );
    clusterRef.current.rotation.x = THREE.MathUtils.lerp(
      clusterRef.current.rotation.x,
      targetX,
      delta * 3.5
    );
  });

  // Pre-calculated organic 3D spatial layout positions [x, y, z] and scales [w, h]
  const cardLayouts: {
    pos: [number, number, number];
    scale: [number, number];
    speed: number;
  }[] = [
    // 0. Hero Center Foreground (Closest to viewer, Pre-Wedding Golden Hour)
    { pos: [0.05, 0.1, 0.9], scale: [2.3, 1.5], speed: 1.2 },
    // 1. Top-Left Mid-Ground (Araku Morning Mist)
    { pos: [-1.9, 0.8, -0.6], scale: [2.1, 1.4], speed: 1.5 },
    // 2. Top-Right Mid-Ground (Paderu Wedding Ritual)
    { pos: [1.95, 0.9, -0.4], scale: [2.1, 1.4], speed: 1.4 },
    // 3. Bottom-Left Closer (Canopy Wildlife Hornbill)
    { pos: [-1.45, -0.95, 0.4], scale: [1.3, 1.8], speed: 1.7 },
    // 4. Bottom-Right Closer (Maredumilli Monsoon Rain on Teak)
    { pos: [1.55, -0.9, 0.5], scale: [1.3, 1.8], speed: 1.6 },
    // 5. Bottom-Center Deep Background (Generational Family Blessings)
    { pos: [0.0, -1.5, -0.8], scale: [1.8, 1.2], speed: 1.3 },
  ];

  return (
    <group ref={clusterRef}>
      {photos.slice(0, 6).map((photo, idx) => {
        const layout = cardLayouts[idx] || {
          pos: [0, 0, 0],
          scale: [2.0, 1.3],
          speed: 1.4,
        };

        return (
          <FloatingPhotoCard
            key={photo.id || idx}
            position={layout.pos}
            scale={layout.scale}
            floatSpeed={layout.speed}
            url={photo.url}
            title={photo.caption || photo.alt}
            location={photo.location || "ASR District"}
            isSelected={selectedPhoto?.id === photo.id}
            onSelect={() => onSelectPhoto(photo)}
          />
        );
      })}
    </group>
  );
}

export function FloatingWallCanvas({
  photos,
  selectedPhoto,
  onSelectPhoto,
}: FloatingWallCanvasProps) {
  return (
    <div className="w-full h-full min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] relative select-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Warm Studio Natural Lighting */}
          <ambientLight intensity={1.5} color="#FAF7F0" />
          <directionalLight
            position={[5, 7, 5]}
            intensity={1.8}
            color="#FFF6E5"
            castShadow
          />
          <pointLight
            position={[-4, -3, 3]}
            intensity={0.8}
            color="#D8C9B3"
          />
          <pointLight
            position={[4, -2, 2]}
            intensity={0.6}
            color="#EBE3D7"
          />

          <SceneCluster
            photos={photos}
            selectedPhoto={selectedPhoto}
            onSelectPhoto={onSelectPhoto}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
