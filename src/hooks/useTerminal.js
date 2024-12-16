import { useState, useRef, useEffect } from 'react';

export const useTerminal = () => {
  const [commands, setCommands] = useState([
    { text: "$ npm run dev", output: "Development server started on http://localhost:3000" }
  ]);
  const [currentCommand, setCurrentCommand] = useState("");
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const newCommand = { text: `$ ${currentCommand}`, output: "" };
      
      // Simulate command output
      switch (currentCommand.trim()) {
        case "clear":
          setCommands([]);
          break;
        case "ls":
          newCommand.output = "src  public  package.json  README.md  vite.config.js";
          setCommands([...commands, newCommand]);
          break;
        case "pwd":
          newCommand.output = "/home/project";
          setCommands([...commands, newCommand]);
          break;
        default:
          newCommand.output = `Command not found: ${currentCommand}`;
          setCommands([...commands, newCommand]);
      }
      
      setCurrentCommand("");
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  return {
    commands,
    currentCommand,
    setCurrentCommand,
    handleCommand,
    inputRef,
    terminalRef
  };
};