import { Box } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";

const MonacoEditor = ({ language, code, onChange }) => {
  return (
    <Box
      borderWidth="1px"
      borderColor="vscode.sidebar"
      borderRadius="md"
      overflow="hidden"
    >
      <Editor
        height="400px"
        language={language}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </Box>
  );
};

export default MonacoEditor;