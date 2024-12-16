import { Box, Flex, Icon, Text, Input, VStack } from "@chakra-ui/react";
import { FiX, FiTerminal } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const Terminal = ({ onToggle }) => {
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

  return (
    <Box
      h="200px"
      bg="vscode.terminal"
      borderTop="1px solid"
      borderColor="gray.700"
    >
      <Flex
        align="center"
        px={4}
        py={1}
        borderBottom="1px solid"
        borderColor="gray.700"
        bg="vscode.bg"
      >
        <Flex align="center" flex="1">
          <Icon as={FiTerminal} mr={2} />
          <Text fontSize="sm">Terminal</Text>
        </Flex>
        <Icon
          as={FiX}
          cursor="pointer"
          onClick={onToggle}
          _hover={{ color: "white" }}
        />
      </Flex>
      <Box
        ref={terminalRef}
        p={2}
        color="gray.300"
        fontFamily="monospace"
        fontSize="sm"
        overflowY="auto"
        h="calc(200px - 32px)"
      >
        <VStack align="stretch" spacing={1}>
          {commands.map((cmd, i) => (
            <Box key={i}>
              <Text color="gray.300">{cmd.text}</Text>
              {cmd.output && (
                <Text color="gray.400" whiteSpace="pre-wrap">
                  {cmd.output}
                </Text>
              )}
            </Box>
          ))}
          <Flex align="center">
            <Text color="gray.300">$ </Text>
            <Input
              ref={inputRef}
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleCommand}
              variant="unstyled"
              pl={2}
              autoFocus
              _focus={{ outline: "none" }}
            />
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default Terminal;