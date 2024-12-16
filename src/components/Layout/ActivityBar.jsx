import { Box, VStack, Icon, Tooltip } from "@chakra-ui/react";
import { FiFile, FiSearch, FiGitBranch, FiSettings } from "react-icons/fi";

const ActivityBar = () => {
  const items = [
    { icon: FiFile, label: "Explorer" },
    { icon: FiSearch, label: "Search" },
    { icon: FiGitBranch, label: "Source Control" },
    { icon: FiSettings, label: "Settings" },
  ];

  return (
    <Box w="48px" bg="vscode.bg" borderRight="1px solid" borderColor="vscode.sidebar">
      <VStack spacing={2} pt={2}>
        {items.map((item, index) => (
          <Tooltip key={index} label={item.label} placement="right">
            <Box
              p={2}
              cursor="pointer"
              _hover={{ bg: "vscode.sidebar" }}
              color="gray.500"
            >
              <Icon as={item.icon} boxSize={5} />
            </Box>
          </Tooltip>
        ))}
      </VStack>
    </Box>
  );
};

export default ActivityBar;