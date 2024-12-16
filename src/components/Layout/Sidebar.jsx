import { Box, Text, Input, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import FileTree from "./FileTree";
import FileExplorerHeader from "./FileExplorerHeader";
import { useFileExplorer } from "../../contexts/FileExplorerContext";

const Sidebar = () => {
  const { files, createFile, createFolder } = useFileExplorer();
  const [isCreating, setIsCreating] = useState(false);
  const [creationType, setCreationType] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [currentPath, setCurrentPath] = useState("");

  const handleNewFile = () => {
    setIsCreating(true);
    setCreationType("file");
    setNewItemName("");
  };

  const handleNewFolder = () => {
    setIsCreating(true);
    setCreationType("folder");
    setNewItemName("");
  };

  const handleCreate = () => {
    if (!newItemName) return;

    const basePath = currentPath || "";
    
    if (creationType === "file") {
      createFile(basePath, newItemName);
    } else {
      createFolder(basePath, newItemName);
    }

    setIsCreating(false);
    setNewItemName("");
    setCreationType(null);
  };

  return (
    <Box w="240px" bg="vscode.sidebar" color="gray.300" borderRight="1px solid" borderColor="vscode.border">
      <Box p={2}>
        <Text fontSize="xs" textTransform="uppercase" mb={2} color="gray.500">
          Explorer
        </Text>
        <FileExplorerHeader onNewFile={handleNewFile} onNewFolder={handleNewFolder} />
        
        {isCreating && (
          <VStack spacing={2} mt={2} p={2}>
            <Input
              size="sm"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`New ${creationType} name`}
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleCreate();
                }
              }}
            />
            <Button 
              size="sm" 
              onClick={handleCreate}
              colorScheme="blue"
              w="full"
            >
              Create
            </Button>
          </VStack>
        )}
        
        <Box mt={2}>
          {files.length === 0 ? (
            <Text fontSize="sm" color="gray.500" p={2}>
              No files yet. Create a new file or folder to get started.
            </Text>
          ) : (
            <FileTree files={files} onPathSelect={setCurrentPath} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;