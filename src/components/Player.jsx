// import React, { useRef, useState } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import SpookyFlashlight from "./SpookyFlashlight";

// const Player = ({ controlsEnabled, onPositionUpdate }) => {
//   const playerRef = useRef();
//   const flashlightRef = useRef();
//   const flashlightTargetRef = useRef();
//   const velocity = useRef(new THREE.Vector3());
//   const direction = useRef(new THREE.Vector3());
//   const speed = 5;
//   const gravity = -9.8;
//   const jumpStrength = 5;
//   const [onGround, setOnGround] = useState(true);
//   const [flashlightOn, setFlashlightOn] = useState(false);

//   const keys = useRef({
//     w: false,
//     a: false,
//     s: false,
//     d: false,
//     space: false,
//   });

//   React.useEffect(() => {
//     const keyDown = (e) => {
//       const key = e.code.replace("Key", "").toLowerCase();
//       keys.current[key] = true;

//       if (key === "f") {
//         setFlashlightOn((prev) => !prev);
//       }
//     };

//     const keyUp = (e) => {
//       const key = e.code.replace("Key", "").toLowerCase();
//       keys.current[key] = false;
//     };

//     if (controlsEnabled) {
//       window.addEventListener("keydown", keyDown);
//       window.addEventListener("keyup", keyUp);
//     }

//     return () => {
//       window.removeEventListener("keydown", keyDown);
//       window.removeEventListener("keyup", keyUp);
//     };
//   }, [controlsEnabled]);

//   useFrame(({ camera }, delta) => {
//     if (!playerRef.current || !controlsEnabled) return;

//     camera.getWorldDirection(direction.current);
//     direction.current.normalize();

//     const forward = keys.current.w ? 1 : keys.current.s ? -1 : 0;
//     const strafe = keys.current.a ? 1 : keys.current.d ? -1 : 0;

//     velocity.current.x =
//       (direction.current.x * forward + direction.current.z * strafe) * speed;
//     velocity.current.z =
//       (direction.current.z * forward - direction.current.x * strafe) * speed;

//     if (playerRef.current.position.y > 1.5) {
//       velocity.current.y += gravity * delta;
//       setOnGround(false);
//     } else {
//       velocity.current.y = 0;
//       playerRef.current.position.y = 1.5;
//       setOnGround(true);
//     }

//     if (keys.current.space && onGround) {
//       velocity.current.y = jumpStrength;
//       setOnGround(false);
//     }

//     playerRef.current.position.addScaledVector(velocity.current, delta);
//     camera.position.copy(playerRef.current.position);

//     if (flashlightRef.current) {
//       flashlightRef.current.position
//         .copy(camera.position)
//         .add(direction.current.clone().multiplyScalar(1.5));
//       flashlightRef.current.target.position
//         .copy(flashlightRef.current.position)
//         .add(direction.current.clone().multiplyScalar(5));
//       flashlightRef.current.target.updateMatrixWorld();
//     }

//     onPositionUpdate?.(playerRef.current.position.toArray());
//   });

//   return (
//     <>
//       <group ref={playerRef} position={[0, 1.5, 30]} />

//       {/* <spotLight
//         ref={flashlightRef}
//         color={[1, 1, 0.9]} // Warm flashlight color
//         intensity={flashlightOn ? 20 : 0} // Toggle intensity with flashlight state
//         angle={0.5} // Narrow beam for a spotlight effect
//         penumbra={0.5}
//         distance={15} // Effective distance of the flashlight
//         castShadow
//       >
//         <object3D ref={flashlightTargetRef} />
//       </spotLight> */}

//       <SpookyFlashlight
//         flashlightOn={flashlightOn}
//         flashlightRef={flashlightRef}
//         flashlightTargetRef={flashlightTargetRef}
//       />
//     </>
//   );
// };

// export default Player;

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SpookyFlashlight from "./SpookyFlashlight";

const Player = ({ controlsEnabled, onPositionUpdate, onMovementChange }) => {
  const playerRef = useRef();
  const flashlightRef = useRef();
  const flashlightTargetRef = useRef();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const speed = 5;
  const gravity = -9.8;
  const jumpStrength = 5;
  const [onGround, setOnGround] = useState(true);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [isMoving, setIsMoving] = useState(false); // Track if player is moving

  const keys = useRef({
    w: false,
    a: false,
    s: false,
    d: false,
    space: false,
  });

  React.useEffect(() => {
    const keyDown = (e) => {
      const key = e.code.replace("Key", "").toLowerCase();
      keys.current[key] = true;

      if (key === "f") {
        setFlashlightOn((prev) => !prev);
      }
    };

    const keyUp = (e) => {
      const key = e.code.replace("Key", "").toLowerCase();
      keys.current[key] = false;
    };

    if (controlsEnabled) {
      window.addEventListener("keydown", keyDown);
      window.addEventListener("keyup", keyUp);
    }

    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [controlsEnabled]);

  useFrame(({ camera }, delta) => {
    if (!playerRef.current || !controlsEnabled) return;

    camera.getWorldDirection(direction.current);
    direction.current.normalize();

    const forward = keys.current.w ? 1 : keys.current.s ? -1 : 0;
    const strafe = keys.current.a ? 1 : keys.current.d ? -1 : 0;

    velocity.current.x =
      (direction.current.x * forward + direction.current.z * strafe) * speed;
    velocity.current.z =
      (direction.current.z * forward - direction.current.x * strafe) * speed;

    if (playerRef.current.position.y > 1.5) {
      velocity.current.y += gravity * delta;
      setOnGround(false);
    } else {
      velocity.current.y = 0;
      playerRef.current.position.y = 1.5;
      setOnGround(true);
    }

    if (keys.current.space && onGround) {
      velocity.current.y = jumpStrength;
      setOnGround(false);
    }

    playerRef.current.position.addScaledVector(velocity.current, delta);
    camera.position.copy(playerRef.current.position);

    // Check if player is moving
    const moving = velocity.current.x !== 0 || velocity.current.z !== 0;
    if (moving !== isMoving) {
      setIsMoving(moving);
      onMovementChange?.(moving); // Notify parent about movement
    }

    if (flashlightRef.current) {
      flashlightRef.current.position
        .copy(camera.position)
        .add(direction.current.clone().multiplyScalar(1.5));
      flashlightRef.current.target.position
        .copy(flashlightRef.current.position)
        .add(direction.current.clone().multiplyScalar(5));
      flashlightRef.current.target.updateMatrixWorld();
    }

    onPositionUpdate?.(playerRef.current.position.toArray());
  });

  return (
    <>
      <group ref={playerRef} position={[0, 1.5, 30]} />

      <SpookyFlashlight
        flashlightOn={flashlightOn}
        flashlightRef={flashlightRef}
        flashlightTargetRef={flashlightTargetRef}
      />
    </>
  );
};

export default Player;
