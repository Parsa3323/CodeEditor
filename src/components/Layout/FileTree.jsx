import { Box, Icon, Text, HStack, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { FiChevronRight, FiChevronDown, FiFolder, FiMoreVertical } from "react-icons/fi";
import { useFileExplorer } from "../../contexts/FileExplorerContext";
import { getFileIcon } from "../../utils/fileUtils";

const FileTreeItem = ({ item, depth = 0 }) => {
  const { selectedFile, expandedFolders, toggleFolder, openFile, deleteItem } = useFileExplorer();

  const handleClick = () => {
    if (item.type === "folder") {
      toggleFolder(item.path);
    } else {
      openFile(item.path);
    }
  };

  const isExpanded = expandedFolders.has(item.path);
  const isSelected = selectedFile === item.path;

  return (
    <Box>
      <HStack
        spacing={1}
        pl={`${depth * 12}px`}
        py={1}
        px={2}
        cursor="pointer"
        bg={isSelected ? "vscode.selection" : "transparent"}
        _hover={{ bg: "vscode.hover" }}
        role="group"
      >
        <Box flex={1} onClick={handleClick}>
          <HStack spacing={1}>
            {item.type === "folder" && (
              <Icon as={isExpanded ? FiChevronDown : FiChevronRight} boxSize={3} />
            )}
            <Icon
              as={item.type === "folder" ? FiFolder : getFileIcon(item.name)}
              color={item.type === "folder" ? "blue.300" : "inherit"}
              boxSize={4}
            />
            <Text fontSize="sm">{item.name}</Text>
          </HStack>
        </Box>
        <Box opacity={0} _groupHover={{ opacity: 1 }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiMoreVertical />}
              variant="ghost"
              size="xs"
              aria-label="File options"
              minW="20px"
              h="20px"
              p={0}
              _hover={{ bg: "vscode.hover" }}
            />
            <MenuList bg="vscode.sidebar" borderColor="vscode.border">
              <MenuItem 
                onClick={() => deleteItem(item.path)}
                _hover={{ bg: "vscode.hover" }}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
      {item.type === "folder" && isExpanded && item.children?.map((child) => (
        <FileTreeItem
          key={child.path}
          item={child}
          depth={depth + 1}
        />
      ))}
    </Box>
  );
};

const FileTree = ({ files }) => {
  return (
    <Box>
      {files.map((item) => (
        <FileTreeItem key={item.path} item={item} />
      ))}
    </Box>
  );
};

export default FileTree;