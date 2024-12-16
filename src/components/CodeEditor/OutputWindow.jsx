import { Box } from "@chakra-ui/react";

const OutputWindow = ({ output }) => {
  return (
    <Box
      bg="vscode.terminal"
      p={4}
      borderRadius="md"
      fontFamily="monospace"
      minH="100px"
      display="none" // Hide the output window as requested
    >
      <Box color="vscode.text">Output:</Box>
      <Box whiteSpace="pre-wrap" color="vscode.text">
        {output}
      </Box>
    </Box>
  );
};

export default OutputWindow;