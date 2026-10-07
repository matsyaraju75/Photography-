# 3D WebGL Camera Experience Guide
### Three.js, React Three Fiber & Drei Architecture

This document outlines the signature 3D rangefinder camera experience.

---

## 1. Technical Stack
- **`three`**: Core 3D WebGL rendering engine.
- **`@react-three/fiber`**: Declarative React reconciler for Three.js.
- **`@react-three/drei`**: High-performance helpers (`Float`, `ContactShadows`).

---

## 2. Component Pipeline
- `StudioCameraModel.tsx`: Procedural geometry representing a rangefinder body with physically based materials (`meshStandardMaterial`). Includes cursor parallax tracking via `useFrame`.
- `CameraCanvas.tsx`: Three-point studio lighting rig (`directionalLight`, `pointLight`, `ambientLight`), floating drift, and contact ground shadows.
- `CameraExperience3D.tsx`: Orchestrates the transition from Camera &rarr; Shutter &rarr; Flash &rarr; Captured Photograph &rarr; Story Monograph.

---

## 3. Performance & Fallback Strategy
- **Lazy Loading**: Imported dynamically via `next/dynamic` with `{ ssr: false }`, ensuring zero impact on initial First Contentful Paint (FCP).
- **Pixel Ratio Clamping**: Clamped to `dpr={[1, 1.5]}` to prevent GPU throttling on Retina and 4K displays.
- **Graceful Degradation**: If WebGL hardware acceleration is absent or disabled, a high-resolution editorial still frame renders automatically.
