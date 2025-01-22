import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const PlayerInteraction = ({ setShowTerminal }) => {
  const raycaster = useRef(new THREE.Raycaster());
  const { camera, scene } = useThree();

  useFrame(() => {
    raycaster.current.setFromCamera({ x: 0, y: 0 }, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;

      // Traverse up the parent chain to find "ComputerModel"
      let parent = intersectedObject;
      while (parent) {
        if (parent.name === "ComputerModel") {
          console.log("Raycast hit ComputerModel!");
          
          return; // Exit once the model is found
        }
        parent = parent.parent;
      }

      document.body.style.cursor = "default";
    } else {
      document.body.style.cursor = "default";
    }
  });

  return null;
};

export default PlayerInteraction;
