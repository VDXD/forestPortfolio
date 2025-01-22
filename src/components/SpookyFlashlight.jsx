import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SpookyFlashlight = ({ flashlightOn, flashlightRef, flashlightTargetRef }) => {
  const fogRef = useRef();
  const clock = useRef(new THREE.Clock());

  useEffect(() => {
   
    if (fogRef.current) {
      fogRef.current.color = new THREE.Color(0x000000);
      fogRef.current.density = 0.02; 
    }
  }, []);

  useFrame(() => {
    if (flashlightRef.current) {
      
      const time = clock.current.getElapsedTime();
      const flicker = Math.sin(time * 10) * 0.2 + Math.random() * 0.1;

      flashlightRef.current.intensity = flashlightOn
        ? 20 + flicker 
        : 0;
      flashlightRef.current.angle = 0.5 + Math.random() * 0.02; 
    }
  });

  return (
    <>
     
      <fog attach="fog" ref={fogRef} near={5} far={50} />

      
      <spotLight
        ref={flashlightRef}
        color={[0.9, 0.7, 0.6]} 
        intensity={flashlightOn ? 20 : 0} 
        angle={0.5} 
        penumbra={0.8} 
        distance={20} 
        castShadow
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024}
      >
        <object3D ref={flashlightTargetRef} />
      </spotLight>

      

    </>
  );
};

export default SpookyFlashlight;
