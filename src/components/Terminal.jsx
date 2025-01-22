import React, { useState, useRef, useEffect } from "react";

export default function Terminal({ onClose }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    "Welcome to the Portfolio Terminal! 🚀",
    "Type 'help' to see available commands.",
  ]);
  const terminalRef = useRef(null);

  const commands = {
    help: [
      "Available commands:",
      "- cd about      → Learn about me",
      "- cd projects   → See my projects",
      "- cd contact    → Get in touch",
      "- clear         → Clear the terminal",
      "- exit          → Close the terminal",
    ],
    about: [
      "👋 Hi, I'm Vedant! I'm a frontend designer who loves working with 3D and graphics.",
      "Tech Stack: JavaScript, TypeScript, Java, Unity, Blender, Three.js",
    ],
    projects: [
      "📌 Flow - A video conferencing platform with Next.js & Spring Boot.",
      "📌 3D Portfolio - Interactive WebGL-based personal site.",
      "📌 File Sharing App - Upload & share files via custom links.",
      "📌 React Native Photo Editor - Mobile app with background removal.",
    ],
    contact: [
      "📬 You can reach me at:",
      "- Email: vedant@example.com",
      "- GitHub: github.com/kitsune",
      "- LinkedIn: linkedin.com/in/vedant",
    ],
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();
    let newOutput = [...output, `> ${trimmedInput}`];

    if (trimmedInput === "clear") {
      setOutput([]);
    } else if (trimmedInput === "exit") {
      onClose(); // Close terminal
    } else if (commands[trimmedInput.replace("cd ", "")]) {
      newOutput = [...newOutput, ...commands[trimmedInput.replace("cd ", "")]];
      setOutput(newOutput);
    } else {
      newOutput.push("❌ Command not found. Type 'help' for available commands.");
      setOutput(newOutput);
    }

    setInput("");
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center p-6">
      <div className="w-full max-w-4xl h-[80vh] bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Terminal Header */}
        <div className="bg-gray-800 p-3 flex justify-between text-white">
          <span>🔹 Portfolio Terminal</span>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            X
          </button>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className="flex-1 p-4 overflow-y-auto text-green-400 font-mono text-sm"
        >
          {output.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleCommand} className="p-3 bg-gray-800 flex">
          <span className="text-green-400 font-mono">➜</span>
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-green-400 font-mono ml-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
