import { extendTheme } from "@chakra-ui/react";

const colors = {
  vscode: {
    bg: "#1e1e1e",
    sidebar: "#252526",
    editor: "#1e1e1e",
    terminal: "#1e1e1e",
    accent: "#007acc",
    text: "#d4d4d4",
    hover: "rgba(255, 255, 255, 0.1)",
    selection: "rgba(51, 153, 255, 0.2)",
    border: "#474747"
  },
};

const styles = {
  global: {
    "html, body": {
      bg: "vscode.bg",
      color: "vscode.text",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      margin: 0,
      padding: 0,
      overflow: "hidden",
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      _hover: {
        bg: "vscode.accent",
      },
    },
  },
  Input: {
    baseStyle: {
      field: {
        bg: "transparent",
        color: "vscode.text",
        borderColor: "vscode.border",
        _hover: {
          borderColor: "vscode.accent",
        },
        _focus: {
          borderColor: "vscode.accent",
          boxShadow: "none",
        },
      },
    },
  },
};

export default extendTheme({
  colors,
  styles,
  components,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});