import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const GrassBlades = () => {
  const bladeCount = 10000; // Number of grass blades

  // Blade geometry: A tall cylinder resembling a blade of grass
  const bladeGeometry = useMemo(() => new THREE.CylinderGeometry(0.01, 0.02, 2.5, 6), []);

  // Blade material
  const bladeMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: "green" }), []);

  // Random positions for the grass blades
  const positions = useMemo(() => {
    const temp = new Float32Array(bladeCount * 3); // 3 values (x, y, z) per blade
    for (let i = 0; i < bladeCount; i++) {
      temp[i * 3 + 0] = (Math.random() - 0.5) * 100; // X
      temp[i * 3 + 1] = 0; // Y (on the ground)
      temp[i * 3 + 2] = (Math.random() - 0.5) * 100; // Z
    }
    return temp;
  }, [bladeCount]);

  // Instance reference
  const instancedMesh = useRef();

  useFrame(() => {
    if (instancedMesh.current) {
      for (let i = 0; i < bladeCount; i++) {
        const dummy = new THREE.Object3D();
        dummy.position.set(
          positions[i * 3 + 0], // X
          positions[i * 3 + 1], // Y
          positions[i * 3 + 2] // Z
        );
        dummy.rotation.y = Math.random() * Math.PI; // Random rotation
        dummy.updateMatrix();
        instancedMesh.current.setMatrixAt(i, dummy.matrix); // Apply matrix
      }
      instancedMesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={instancedMesh} args={[bladeGeometry, bladeMaterial, bladeCount]} />
  );
};

export default GrassBlades;
