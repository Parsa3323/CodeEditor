import { HStack, Select, Button } from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../../constants/languages";

const EditorHeader = ({ language, onLanguageChange, onExecute, isExecuting }) => {
  return (
    <HStack spacing={4}>
      <Select
        value={language}
        onChange={onLanguageChange}
        bg="vscode.sidebar"
        borderColor="vscode.accent"
        width="200px"
        isDisabled={isExecuting}
      >
        {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
          <option key={lang} value={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </Select>
      <Button
        onClick={onExecute}
        bg="vscode.accent"
        _hover={{ bg: "vscode.accent", opacity: 0.9 }}
        isLoading={isExecuting}
        loadingText="Running..."
      >
        Run Code
      </Button>
    </HStack>
  );
};

export default EditorHeader;