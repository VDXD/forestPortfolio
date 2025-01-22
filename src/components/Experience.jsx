// import React, { Suspense, useRef, useState } from "react";
// import { PointerLockControls } from "@react-three/drei";
// import Player from "./Player";
// import Terminal from "./Terminal";
// import { Canvas } from "@react-three/fiber";
// import ComputerModel from "./ComputerModel";
// import PlayerInteraction from "./PlayerInteraction";
// import Ground from "./Ground";
// import GrassField from "./GrassFeild";

// function Experience() {
//   const [showTerminal, setShowTerminal] = useState(false);
//   const [playerPosition, setPlayerPosition] = useState([0, 1.5, 0]);
//   const pointerLockRef = useRef(null);

//   const modelPosition = [0, 0.32, 0];

//   const handleOpenTerminal = () => {
//     setShowTerminal(true);
//     pointerLockRef.current.unlock();
//   };

//   const handleCloseTerminal = () => {
//     setShowTerminal(false);
//     pointerLockRef.current.lock();
//   };

//   return (
//     <>
//       <Suspense fallback={null}>
//         <Canvas shadows camera={{ position: [0, 0, 0], fov: 30 }}>
//           <color attach="background" args={["#0a0a0a"]} />

//     {/* <ambientLight intensity={1} /> */}

//           <spotLight
//             color={[0.5, 0, 0.2]}
//             intensity={25}
//             angle={0.3}
//             penumbra={0.8}
//             position={[1, 2, 3]}
//             castShadow
//             shadow-bias={-0.0001}
//             shadow-mapSize-width={2048}
//             shadow-mapSize-height={2048}
//             shadow-camera-far={10}
//             shadow-camera-near={0.5}
//             shadow-camera-left={-5}
//             shadow-camera-right={5}
//             shadow-camera-top={5}
//             shadow-camera-bottom={-5}
//           />

//           <spotLight
//             color={[0, 0.3, 0.5]}
//             intensity={20}
//             angle={0.3}
//             penumbra={0.9}
//             position={[-1, 2, 3]}
//             castShadow
//             shadow-bias={-0.0001}
//             shadow-mapSize-width={2048}
//             shadow-mapSize-height={2048}
//             shadow-camera-far={10}
//             shadow-camera-near={0.5}
//             shadow-camera-left={-5}
//             shadow-camera-right={5}
//             shadow-camera-top={5}
//             shadow-camera-bottom={-5}
//           />

//           <fog attach="fog" args={["#101010", 5, 20]} />

//           <ambientLight intensity={0.3} color={[0.05, 0.05, 0.1]} />

//           <Ground />
//           <GrassField />

//           <ComputerModel
//             position={modelPosition}
//             onClick={handleOpenTerminal}
//             playerPosition={playerPosition}
//           />

//           <Player
//             controlsEnabled={!showTerminal}
//             onPositionUpdate={(pos) => setPlayerPosition(pos)}
//           />

//           <PlayerInteraction setShowTerminal={showTerminal} />

//           <PointerLockControls ref={pointerLockRef} />
//         </Canvas>

//         {showTerminal && <Terminal onClose={handleCloseTerminal} />}
//       </Suspense>
//     </>
//   );
// }

// export default Experience;

import React, { Suspense, useRef, useState, useEffect } from "react";
import { PointerLockControls } from "@react-three/drei";
import Player from "./Player";
import Terminal from "./Terminal";
import { Canvas } from "@react-three/fiber";
import ComputerModel from "./ComputerModel";
import PlayerInteraction from "./PlayerInteraction";
import Ground from "./Ground";
import GrassField from "./GrassFeild";
import RiddleModal from "./Riddle";

function Experience() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [playerPosition, setPlayerPosition] = useState([0, 1.5, 0]);
  const pointerLockRef = useRef(null);
  const [riddle, setRiddle] = useState(null);
  const [lives, setLives] = useState(3);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [showInstruction, setShowInstruction] = useState(true);
  const [isMoving, setIsMoving] = useState(false); // Track player's movement

  const modelPosition = [0, 0.32, 0];

  // Audio object for the background night sound
  const backgroundSoundRef = useRef(null);

  // Load and play the background sound
  useEffect(() => {
    backgroundSoundRef.current = new Audio("/sounds/Backgound.mp3"); // Path to your night forest sound file
    backgroundSoundRef.current.loop = true;
    backgroundSoundRef.current.volume = 0.3; // Adjust volume if needed
    backgroundSoundRef.current.play();

    return () => {
      backgroundSoundRef.current.pause(); // Pause the sound on cleanup
      backgroundSoundRef.current = null;
    };
  }, []);

  const riddles = [
    {
      question: "What has keys but can't open locks?",
      answer: "piano",
    },
    {
      question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
      answer: "the letter m",
    },
    {
      question: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?",
      answer: "echo",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstruction(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenRiddle = () => {
    const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];
    setRiddle(randomRiddle);
    setLives(3); // Reset lives
    setAnsweredCorrectly(false);
    pointerLockRef.current.unlock();
  };

  const handleCloseRiddle = () => {
    setRiddle(null);
    pointerLockRef.current.lock();
  };

  const handleRiddleAnswer = (input) => {
    if (!riddle) return;
    if (input.toLowerCase() === riddle.answer.toLowerCase()) {
      setAnsweredCorrectly(true);
      setRiddle(null); // Close riddle on correct answer
    } else {
      setLives((prevLives) => {
        if (prevLives === 1) {
          setRiddle(null); // Close riddle on game over
        }
        return prevLives - 1;
      });
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        <Canvas shadows camera={{ position: [0, 0, 0], fov: 30 }}>
          <color attach="background" args={["#0a0a0a"]} />

          {/* Lights */}
          <spotLight
            color={[0.5, 0, 0.2]}
            intensity={25}
            angle={0.3}
            penumbra={0.8}
            position={[1, 2, 3]}
            castShadow
            shadow-bias={-0.0001}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={10}
            shadow-camera-near={0.5}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />

          <spotLight
            color={[0, 0.3, 0.5]}
            intensity={20}
            angle={0.3}
            penumbra={0.9}
            position={[-1, 2, 3]}
            castShadow
            shadow-bias={-0.0001}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={10}
            shadow-camera-near={0.5}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />

          <fog attach="fog" args={["#101010", 5, 20]} />

          <ambientLight intensity={0.3} color={[0.05, 0.05, 0.1]} />

          <Ground isMoving={isMoving} />
          <GrassField />

          <ComputerModel
            position={modelPosition}
            onClick={handleOpenRiddle}
            playerPosition={playerPosition}
          />

          <Player
            controlsEnabled={!showTerminal && !riddle}
            onPositionUpdate={(pos) => setPlayerPosition(pos)}
            onMovementChange={setIsMoving} // Pass movement state to parent
          />

          <PlayerInteraction setShowTerminal={showTerminal} />

          <PointerLockControls ref={pointerLockRef} />
        </Canvas>

        {riddle && (
          <RiddleModal
            riddle={riddle}
            onAnswer={handleRiddleAnswer}
            lives={lives}
            onClose={handleCloseRiddle}
          />
        )}

        {showTerminal && <Terminal onClose={handleCloseTerminal} />}

        {showInstruction && (
          <div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 text-white py-2 px-4 rounded-lg backdrop-blur-md transition-opacity ease-out ${
              showInstruction ? "opacity-100" : "opacity-0"
            }`}
          >
            Press "F" for flashlight
          </div>
        )}
      </Suspense>
    </>
  );
}

export default Experience;

