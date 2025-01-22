// import React, { useState } from "react";

// const RiddleModal = ({ riddle, onAnswer, lives, onClose }) => {
//   const [answer, setAnswer] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onAnswer(answer);
//     setAnswer(""); // Clear input after submission
//   };

//   return (
//     <div className="fixed inset-0 flex justify-center items-center p-6 backdrop-blur-sm">
//       <div className="w-full h-full max-w-full text-center rounded-lg shadow-lg overflow-hidden flex flex-col p-6">
//         <p className="text-white text-2xl font-creepster mb-6">{riddle.question}</p>

//         <form onSubmit={handleSubmit} className="mb-4">
//           <input
//             type="text"
//             className="w-full p-3 text-black bg-white rounded-md font-creepster text-xl"
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Your answer"
//             autoFocus
//           />
//           <button
//             type="submit"
//             className="mt-4 bg-red-600 text-white p-3 rounded w-full font-creepster text-lg"
//           >
//             Submit
//           </button>
//         </form>

//         <p className="text-white text-xl font-creepster mb-2">Lives: {lives}</p>

//         {lives <= 0 && (
//           <p className="text-red-500 font-creepster">You have no lives left! The riddle is over.</p>
//         )}

//       </div>
//     </div>
//   );
// };

// export default RiddleModal;


import React, { useState } from "react";

const RiddleModal = ({ riddle, onAnswer, lives, onClose }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnswer(answer);
    setAnswer(""); 
  };

const heartIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-red-500"
    >
      <path d="M12 21C12 21 5 13 5 8C5 5.5 7 4 8 4C9 4 10 5 12 7C14 5 15 4 16 4C17 4 19 5.5 19 8C19 13 12 21 12 21Z"></path>
    </svg>
  );

  // Render hearts based on remaining lives
  const renderLives = () => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
      hearts.push(
        <span key={i} className="inline-block mx-1">
          {i < lives ? heartIcon : null}
        </span>
      );
    }
    return hearts;
  };

  return (
    <div className="fixed inset-0 flex justify-center  items-center p-20 backdrop-blur-sm">

        
        <p className="absolute top-10 left-80 text-white text-2xl font-creepster">{renderLives()}</p>
      <div className="w-full h-full max-w-lg top-28 text-center rounded-lg shadow-lg overflow-hidden flex flex-col p-8 space-y-6 relative">


        <h2 className="text-red-500 text-4xl font-creepster mb-6">{riddle.question}</h2>

       
        <form onSubmit={handleSubmit} className="mb-6">
          <input
            type="text"
            className="w-full p-4 text-white text-center bg-transparent border-2 border-red-500 rounded-md font-creepster text-lg"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
            autoFocus
          />
          <button
            type="submit"
            className="mt-4 bg-red-600 text-white p-3 rounded w-full font-creepster text-lg"
          >
            Submit
          </button>
        </form>

       
        {lives <= 0 && (
          <p className="text-red-500 font-creepster">You have no lives left! The riddle is over.</p>
        )}
      </div>
    </div>
  );
};

export default RiddleModal;



