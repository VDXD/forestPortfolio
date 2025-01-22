import React, { useRef, useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

const Ground = ({ isMoving }) => {
  const [isPlaying, setIsPlaying] = useState(false);


  const [diffuse, normal, roughness] = useLoader(THREE.TextureLoader, [
    "/textures/forrest_ground_01_diff_2k.jpg", 
    "/textures/forrest_ground_01_nor_dx_2k.jpg",
    "/textures/forrest_ground_01_rough_2k.jpg",
  ]);


  const soundRef = useRef(null);


  useEffect(() => {
    soundRef.current = new Audio("/sounds/Walking.mp3"); 
    soundRef.current.loop = true;
    soundRef.current.volume = 0.1; 

    return () => {
      soundRef.current.pause();
      soundRef.current = null;
    };
  }, []);


  useEffect(() => {
    if (isMoving && !isPlaying) {
      soundRef.current.play();
      setIsPlaying(true);
    } else if (!isMoving && isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  }, [isMoving]);


  useEffect(() => {
    [diffuse, normal, roughness].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(50, 50); 
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
