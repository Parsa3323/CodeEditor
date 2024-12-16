import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import VSCodeLayout from "./components/Layout/VSCodeLayout";

function App() {
  return (
    <VSCodeLayout>
      <Box p={4}>
        <CodeEditor />
      </Box>
    </VSCodeLayout>
  );
}

export default App;