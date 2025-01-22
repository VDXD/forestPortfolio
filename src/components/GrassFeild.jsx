// import React from "react";
// import GrassBlock from "./Grass";

// const GrassField = () => {
//   const grassPositions = [
//     { position: [1, 0, 1.2], rotation: [0, Math.PI / 4, 0], scale: 20 },
//     { position: [1.3, 0, 0], rotation: [0, Math.PI / 2, 0], scale: 15 },
//     { position: [0, 0, -2.4], rotation: [0, Math.PI, 0], scale: 30 },
//     { position: [1.2, 0, -1], rotation: [0, Math.PI / 2, 0], scale: 18 },
    
//     { position: [-1, 0, -1], rotation: [0, Math.PI / 4, 0], scale: 20 },
//     { position: [-1, 0, 0], rotation: [0, Math.PI / 2, 0], scale: 15 },
//     { position: [-1.4, 0, 1.5], rotation: [0, Math.PI, 0], scale: 30 },
//     { position: [-2, 0, 0], rotation: [0, Math.PI / 2, 0], scale: 18 },
//     // Add more positions as needed
//   ];

//   return (
//     <>
//       {grassPositions.map((props, index) => (
//         <GrassBlock
//           key={index}
//           position={props.position}
//           rotation={props.rotation}
//           scale={[props.scale, props.scale, props.scale]}
//         />
//       ))}
//     </>
//   );
// };

// export default GrassField;

import React, { useMemo } from "react";
import GrassBlock from "./Grass";

const GrassField = () => {
  const numberOfGrassBlocks = 400; 
  const radiusToAvoid = 1;
  const areaSize = 30; 

  const grassPositions = useMemo(() => {
    const positions = [];
    while (positions.length < numberOfGrassBlocks) {
      const x = Math.random() * areaSize - areaSize / 2; // Random x within the area
      const z = Math.random() * areaSize - areaSize / 2; // Random z within the area

      if (Math.sqrt(x * x + z * z) > radiusToAvoid) {
        const position = [x, 0, z];
        const rotation = [0, Math.random() * Math.PI * 2, 0]; // Random rotation
        const scale = Math.random() * 10 + 10; // Random scale between 10 and 20
        positions.push({ position, rotation, scale });
      }
    }
    return positions;
  }, [numberOfGrassBlocks, radiusToAvoid, areaSize]); 

  return (
    <>
      {grassPositions.map((props, index) => (
        <GrassBlock
          key={index}
          position={props.position}
          rotation={props.rotation}
          scale={[props.scale, props.scale, props.scale]}
        />
      ))}
    </>
  );
};

export default GrassField;



