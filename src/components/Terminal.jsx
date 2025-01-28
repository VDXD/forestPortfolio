import React, { useState, useRef, useEffect } from "react";

export function text() {
  return (
    <span className="text-green-400 font-mono text-glow">
      kitsune@portfolio:~$
    </span>
  );
}

export default function Terminal({ onClose }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([
    `Kitsune Is Not A Corporation. It's my freaking name!
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
  const [currentLine, setCurrentLine] = useState("");
  const [typing, setTyping] = useState(false);

  const terminalRef = useRef(null);

  const commands = {
    help: [
      "Available commands:",
      "- whois      → Who is Kitsune",
      "- projects   → View Kitsune Projects",
      "- social     → Stalking me????",
      "- banner     → View Header",
      "- help       → like until your IQ is -1 yk what this does",
      "- clear      → Clear the terminal",
      "- exit       → Close the terminal",
    ],
    whois: [
      "Hey, I'm Vedant aka Kitsune.",
      "I'm a newbie trying to understand the 3D world concepts to make awesome and amazing websites for you.",
      "I've done by Bachelor's degree in computer science, and my motive is to learn more and more about how some line of code make such a beautiful and interactive websites.",
      "When I'm not learning, I like to do 3D modeling and know more about game devlopment.",
      "I'm not a professional yet but I like to work and help you, feel free to contact me. ",
    ],
    projects: [
      "This is litrally my second project so yeah.....",
      "You can check my Github tho",
      "I'll add more projects as I grow",
    ],
    social: [
      `- This is where you see my cool projects: <a href="https://github.com/VDXD" target="_blank" rel="noopener noreferrer" class="underline text-blue-400">Github</a>`,
      `- This is where you can contact me: <a href="https://www.linkedin.com/in/vedant-rajput-3591b2290/" target="_blank" rel="noopener noreferrer" class="underline text-blue-400">LinkedIn</a>`,
      `- This is where you can see me (meeee): <a href="https://www.instagram.com/kitsuneee.__/" target="_blank" rel="noopener noreferrer" class="underline text-blue-400">Instagram</a>`,
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

    if (trimmedInput === "clear") {
      setOutput([]);
    } else if (trimmedInput === "exit") {
      onClose();
    } else if (commands[trimmedInput]) {
      typeOutput([`> ${trimmedInput}`, ...commands[trimmedInput]]);
    } else {
      typeOutput([
        `> ${trimmedInput}`,
        "❌ Command not found. Type 'help' for available commands.",
      ]);
    }

    setInput("");
  };

  const typeOutput = (lines) => {
    setTyping(true);

    const appendLine = (line, callback) => {
      let currentText = "";
      let i = 0;

      const typeChar = () => {
        if (i < line.length) {
          currentText += line[i];
          setCurrentLine(currentText);
          i++;
          setTimeout(typeChar, 1); // Adjust typing speed here
        } else {
          setOutput((prev) => [...prev, line]);
          setCurrentLine("");
          callback();
        }
      };

      typeChar();
    };

    const processLines = (index) => {
      if (index < lines.length) {
        appendLine(lines[index], () => processLines(index + 1));
      } else {
        setTyping(false);
      }
    };

    processLines(0);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output, currentLine]);

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="w-full h-full max-w-[90vw] max-h-[90vh] bg-black rounded-lg shadow-2xl flex flex-col retro-terminal">
        <div
          ref={terminalRef}
          className="flex-1 p-4 overflow-y-auto text-green-400 font-mono text-sm scan-lines"
        >
          {output.map((line, index) => (
            <pre
              key={index}
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: line }}
            ></pre>
          ))}

          {typing && <pre className="whitespace-pre-wrap ">{currentLine}</pre>}
          {!typing && (
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
          )}
        </div>
      </div>
    </div>
  );
}
