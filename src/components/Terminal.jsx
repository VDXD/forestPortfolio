import React, { useState, useRef, useEffect } from "react";

export default function Terminal({ onClose }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    `Kitsune Is Not A Corporation. All.... Is IDK!?
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠙⠻⢶⣄⡀⠀⠀⠀⢀⣤⠶⠛⠛⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣇⠀⠀⣙⣿⣦⣤⣴⣿⣁⠀⠀⣸⠇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣡⣾⣿⣿⣿⣿⣿⣿⣿⣷⣌⠋⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣷⣄⡈⢻⣿⡟⢁⣠⣾⣿⣦⠀⠀⠀⠀ ██   ██ ██ ████████ ███████ ██    ██ ███    ██ ███████ ███████ ███████ 
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⠘⣿⠃⣿⣿⣿⣿⡏⠀⠀⠀⠀ ██  ██  ██    ██    ██      ██    ██ ████   ██ ██      ██      ██   
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠈⠛⣰⠿⣆⠛⠁⠀⡀⠀⠀⠀⠀⠀ █████   ██    ██    ███████ ██    ██ ██ ██  ██ █████   █████   █████   
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣦⠀⠘⠛⠋⠀⣴⣿⠁⠀⠀⠀⠀⠀ ██  ██  ██    ██         ██ ██    ██ ██  ██ ██ ██      ██      ██ 
⠀⠀⠀⠀⠀⠀⣀⣤⣶⣾⣿⣿⣿⣿⡇⠀⠀⠀⢸⣿⣏⠀⠀⠀⠀⠀⠀ ██   ██ ██    ██    ███████  ██████  ██   ████ ███████ ███████ ███████ 
⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠀⠀⠀⠾⢿⣿⠀⠀⠀⠀⠀⠀
⠀⣠⣿⣿⣿⣿⣿⣿⡿⠟⠋⣁⣠⣤⣤⡶⠶⠶⣤⣄⠈⠀⠀⠀⠀⠀⠀
⢰⣿⣿⣮⣉⣉⣉⣤⣴⣶⣿⣿⣋⡥⠄⠀⠀⠀⠀⠉⢻⣄⠀⠀⠀⠀⠀
⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣋⣁⣤⣀⣀⣤⣤⣤⣤⣄⣿⡄⠀⠀⠀⠀
⠀⠙⠿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠋⠉⠁⠀⠀⠀⠀⠈⠛⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
Type 'help' to see available commands.`,
  ]);

  const terminalRef = useRef(null);

  const commands = {
    help: [
      "Available commands:",
      "- whois      → Who is Kitsune",
      "- projects   → View Kitsune Projects",
      "- contact    → Let's talk",
      "- clear      → Clear the terminal",
      "- exit       → Close the terminal",
    ],
    whois: [
      "No",
    ],
    projects: [
      "📌 Flow - A video conferencing platform with Next.js & Spring Boot.",
      "📌 3D Portfolio - Interactive WebGL-based personal site.",
      "📌 File Sharing App - Upload & share files via custom links.",
      "📌 React Native Photo Editor - Mobile app with background removal.",
    ],
    contact: [
      "📬 You can reach me at:",
      "- Email: rajputvedant213@gmail.com",
      "- GitHub: github.com/VDXD",
    ],
    banner: [
      `Kitsune Is Not A Corporation. All.... Is IDK!?
     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀
     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⠙⠻⢶⣄⡀⠀⠀⠀⢀⣤⠶⠛⠛⡇⠀⠀⠀
     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣇⠀⠀⣙⣿⣦⣤⣴⣿⣁⠀⠀⣸⠇⠀⠀⠀
     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣡⣾⣿⣿⣿⣿⣿⣿⣿⣷⣌⠋⠀⠀⠀⠀
     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣷⣄⡈⢻⣿⡟⢁⣠⣾⣿⣦⠀⠀⠀⠀ ██   ██ ██ ████████ ███████ ██    ██ ███    ██ ███████ ███████ ███████ 
     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⣿⣿⠘⣿⠃⣿⣿⣿⣿⡏⠀⠀⠀⠀ ██  ██  ██    ██    ██      ██    ██ ████   ██ ██      ██      ██   
     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠈⠛⣰⠿⣆⠛⠁⠀⡀⠀⠀⠀⠀⠀ █████   ██    ██    ███████ ██    ██ ██ ██  ██ █████   █████   █████   
     ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣦⠀⠘⠛⠋⠀⣴⣿⠁⠀⠀⠀⠀⠀ ██  ██  ██    ██         ██ ██    ██ ██  ██ ██ ██      ██      ██ 
     ⠀⠀⠀⠀⠀⠀⣀⣤⣶⣾⣿⣿⣿⣿⡇⠀⠀⠀⢸⣿⣏⠀⠀⠀⠀⠀⠀ ██   ██ ██    ██    ███████  ██████  ██   ████ ███████ ███████ ███████ 
     ⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠀⠀⠀⠾⢿⣿⠀⠀⠀⠀⠀⠀
     ⠀⣠⣿⣿⣿⣿⣿⣿⡿⠟⠋⣁⣠⣤⣤⡶⠶⠶⣤⣄⠈⠀⠀⠀⠀⠀⠀
     ⢰⣿⣿⣮⣉⣉⣉⣤⣴⣶⣿⣿⣋⡥⠄⠀⠀⠀⠀⠉⢻⣄⠀⠀⠀⠀⠀
     ⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣋⣁⣤⣀⣀⣤⣤⣤⣤⣄⣿⡄⠀⠀⠀⠀
     ⠀⠙⠿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠋⠉⠁⠀⠀⠀⠀⠈⠛⠃⠀⠀⠀⠀
     ⠀⠀⠀⠀⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
     Type 'help' to see available commands.`,
    ],
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();
    let newOutput = [...output, `> ${trimmedInput}`];

    if (trimmedInput === "clear") {
      setOutput([]);
    } else if (trimmedInput === "exit") {
      onClose();
    } else if (commands[trimmedInput.replace("cd ", "")]) {
      newOutput = [...newOutput, ...commands[trimmedInput.replace("cd ", "")]];
      setOutput(newOutput);
    } else {
      newOutput.push(
        "❌ Command not found. Type 'help' for available commands."
      );
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
    <div className="fixed inset-0 bg-black flex justify-center items-center p-4">
      <div className="w-full h-full max-w-[90vw] max-h-[90vh] bg-black border-[6px] border-green-900 rounded-lg shadow-2xl flex flex-col retro-terminal">
        <div
          ref={terminalRef}
          className="flex-1 p-4 overflow-y-auto text-green-400 font-mono text-sm scan-lines"
        >
          {output.map((line, index) => (
            <pre key={index} className="whitespace-pre-wrap">
              {line}
            </pre>
          ))}
          {/* Input inside the body */}
          <form onSubmit={handleCommand} className="flex items-center">
            <span className="text-green-400 font-mono">
              kitsune@portfolio:~$
            </span>
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
    </div>
  );
}

