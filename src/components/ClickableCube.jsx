// const ClickableCube = ({ onClick, position }) => {
//   return (
//     <mesh
//       position={position} // Adjust the position in front of the player
//       onPointerDown={onClick} // Add event handler
//       scale={[1, 1, 1]} // Cube size
//       castShadow
//     >
//       <boxGeometry />
//       <meshStandardMaterial color="blue" />
//     </mesh>
//   );
// };

// export default ClickableCube;

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ClickableCube = ({ onClick, position, playerPosition }) => {
  const meshRef = useRef();
  const interactionRadius = 5; // Maximum interaction distance
  const distance = useRef(Infinity);

  useFrame(() => {
    if (meshRef.current && playerPosition) {
      // Calculate distance from player to cube
      distance.current = new THREE.Vector3(...position).distanceTo(
        new THREE.Vector3(...playerPosition)
      );

      // Highlight cube if within interaction radius
      const isInRange = distance.current <= interactionRadius;
      meshRef.current.material.color.set(isInRange ? "yellow" : "blue");
      meshRef.current.scale.set(
        isInRange ? 1.2 : 1,
        isInRange ? 1.2 : 1,
        isInRange ? 1.2 : 1
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerDown={() => {
        if (distance.current <= interactionRadius) {
          onClick();
        }
      }}
      scale={[1, 1, 1]}
      castShadow
    >
      <boxGeometry />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default ClickableCube;
