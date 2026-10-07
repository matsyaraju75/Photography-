"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import { StudioCameraModel } from "@/components/3d/StudioCameraModel";

interface CameraCanvasProps {
  onShutterClick?: () => void;
  isTriggered?: boolean;
}

export function CameraCanvas({
  onShutterClick,
  isTriggered,
}: CameraCanvasProps) {
  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] relative select-none">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        dpr={[1, 1.5]} // Limit pixel ratio to 1.5 for maximum GPU performance
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Studio Lighting Setup */}
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[4, 5, 4]}
            intensity={2.8}
            color="#fff4e6"
            castShadow
          />
          <pointLight
            position={[-4, 2, -2]}
            intensity={1.8}
            color="#a8c5db"
          />
          <pointLight
            position={[0, -3, 2]}
            intensity={1.0}
            color="#c5a880"
          />

          {/* Floating Camera Model */}
          <Float
            speed={1.6}
            rotationIntensity={0.2}
            floatIntensity={0.4}
            floatingRange={[-0.05, 0.05]}
          >
            <StudioCameraModel
              onShutterClick={onShutterClick}
              isTriggered={isTriggered}
            />
          </Float>

          {/* Contact Shadow beneath camera */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.6}
            scale={5}
            blur={2.4}
            far={4}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
