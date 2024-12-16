import { Box } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useFileExplorer } from "../../contexts/FileExplorerContext";
import { getFileLanguage } from "../../utils/fileUtils";

const CodeEditor = () => {
  const { activeEditor, files, updateFileContent } = useFileExplorer();

  const getFileContent = (path) => {
    const findContent = (items) => {
      for (const item of items) {
        if (item.path === path) return item.content;
        if (item.children) {
          const content = findContent(item.children);
          if (content !== undefined) return content;
        }
      }
    };
    return findContent(files) || "";
  };

  const handleEditorChange = (value) => {
    if (activeEditor && value !== null) {
      updateFileContent(activeEditor, value);
    }
  };

  if (!activeEditor) {
    return (
      <Box 
        h="calc(100vh - 32px)" 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        color="gray.500"
      >
        Select or create a file to start editing
      </Box>
    );
  }

  return (
    <Box h="calc(100vh - 32px)" position="relative">
      <Editor
        height="100%"
        language={getFileLanguage(activeEditor)}
        value={getFileContent(activeEditor)}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          padding: { top: 10 }
        }}
      />
    </Box>
  );
};

export default CodeEditor;