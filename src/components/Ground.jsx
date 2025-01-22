// import { MeshReflectorMaterial, Text } from "@react-three/drei";
// import { useLoader } from "@react-three/fiber";
// import React, { useEffect } from "react";
// import * as THREE from "three";

// const Ground = () => {
//   const [roughness, normal] = useLoader(THREE.TextureLoader, [
//     "textures/terrain-roughness.jpg",
//     "textures/terrain-normal.jpg",
//   ]);

//   useEffect(() => {
//     [normal, roughness].forEach((t) => {
//       t.wrapS = THREE.RepeatWrapping;
//       t.wrapT = THREE.RepeatWrapping;
//       t.repeat.set(5, 5);
//       t.offset.set(0, 0);
//     });

//     normal.encoding = THREE.LinearEncoding;
//   }, [normal, roughness]);

//   return (
//     <>
//       <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
//         <planeGeometry args={[30, 30]} />
//         <MeshReflectorMaterial
//           normalMap={normal}
//           normalScale={[0.15, 0.15]}
//           roughnessMap={roughness}
//           roughness={1}
//         />
//       </mesh>
//     </>
//   );
// };

// export default Ground;

// import React, { useEffect, useState } from "react";
// import { useLoader } from "@react-three/fiber";
// import { useAudio } from "@react-three/drei";
// import * as THREE from "three";

// const Ground = () => {
//   const [play, setPlay] = useState(false);

//   // Load textures
//   const [diffuse, normal, roughness] = useLoader(THREE.TextureLoader, [
//     "/textures/forrest_ground_01_diff_2k.jpg", // Replace with your texture paths
//     "/textures/forrest_ground_01_nor_dx_2k.jpg",
//     "/textures/forrest_ground_01_rough_2k.jpg",
//   ]);

//   const [sound] = useAudio({
//     src: "/sounds/Walking.mp3", // Replace with your sound path
//     loop: true,
//     volume: 0.2, // Adjust the volume
//   });

//   useEffect(() => {
//     [diffuse, normal, roughness].forEach((texture) => {
//       texture.wrapS = THREE.RepeatWrapping;
//       texture.wrapT = THREE.RepeatWrapping;
//       texture.repeat.set(50, 50); // Adjust repeat for scaling
//       texture.anisotropy = 16;
//     });
//   }, [diffuse, normal, roughness]);

//   return (
//     <>
//       <mesh
//         rotation-x={-Math.PI / 2}
//         position={[0, 0, 0]}
//         receiveShadow
//         onClick={() => setPlay(!play)}
//       >
//         <planeGeometry args={[100, 100]} /> {/* Large plane */}
//         <meshStandardMaterial
//           map={diffuse}
//           normalMap={normal}
//           roughnessMap={roughness}
//           roughness={1}
//         />
//       </mesh>
//       {play && sound}
//     </>
//   );
// };

// export default Ground;

import React, { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Ground = ({ isMoving }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Load textures
  const [diffuse, normal, roughness] = useLoader(THREE.TextureLoader, [
    "/textures/forrest_ground_01_diff_2k.jpg", // Replace with your texture paths
    "/textures/forrest_ground_01_nor_dx_2k.jpg",
    "/textures/forrest_ground_01_rough_2k.jpg",
  ]);

  // Audio object and ref
  const soundRef = useRef(null);

  // Initialize the sound
  useEffect(() => {
    soundRef.current = new Audio("/sounds/Walking.mp3"); // Path to your sound
    soundRef.current.loop = true;
    soundRef.current.volume = 0.1; // Adjust volume if needed

    return () => {
      soundRef.current.pause();
      soundRef.current = null;
    };
  }, []);

  // Start or stop sound based on movement
  useEffect(() => {
    if (isMoving && !isPlaying) {
      soundRef.current.play();
      setIsPlaying(true);
    } else if (!isMoving && isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  }, [isMoving]);

  // Configure textures
  useEffect(() => {
    [diffuse, normal, roughness].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(50, 50); // Adjust repeat for scaling
      texture.anisotropy = 16;
    });
  }, [diffuse, normal, roughness]);

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        map={diffuse}
        normalMap={normal}
        roughnessMap={roughness}
        roughness={1}
      />
    </mesh>
  );
};

export default Ground;
