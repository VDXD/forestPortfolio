import React, { useEffect, useRef, useState } from "react";

const BackgroundSound = () => {
  const [audioReady, setAudioReady] = useState(false); // Track if the audio is ready to play
  const backgroundSoundRef = useRef(null);

  const handleUserInteraction = () => {
    if (backgroundSoundRef.current) {
      backgroundSoundRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
      setAudioReady(true);
    }
  };

  useEffect(() => {
    // Initialize audio but don't play it yet
    backgroundSoundRef.current = new Audio("/sounds/Backgound.mp3");
    backgroundSoundRef.current.loop = true;
    backgroundSoundRef.current.volume = 0.3;

    // Add event listener for user interaction (click)
    document.addEventListener("click", handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  return audioReady ? null : (
    <div
      className="audio-warning"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
        fontSize: "20px",
      }}
    >
      Click anywhere to start the sound
    </div>
  );
};

export default BackgroundSound;
