import { createContext, useContext, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const FileExplorerContext = createContext();

export const useFileExplorer = () => {
  const context = useContext(FileExplorerContext);
  if (!context) {
    throw new Error("useFileExplorer must be used within a FileExplorerProvider");
  }
  return context;
};

export const FileExplorerProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [activeEditor, setActiveEditor] = useState(null);

  const createFile = (parentPath, fileName) => {
    const newFile = {
      name: fileName,
      type: "file",
      path: parentPath ? `${parentPath}/${fileName}` : fileName,
      content: ""
    };

    setFiles(prevFiles => {
      if (!parentPath) {
        return [...prevFiles, newFile];
      }

      const updateFilesRecursively = (items) => {
        return items.map(item => {
          if (item.path === parentPath && item.type === "folder") {
            return {
              ...item,
              children: [...(item.children || []), newFile]
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateFilesRecursively(item.children)
            };
          }
          return item;
        });
      };

      return updateFilesRecursively(prevFiles);
    });

    // Automatically open the new file
    setActiveEditor(newFile.path);
    setSelectedFile(newFile.path);
  };

  const createFolder = (parentPath, folderName) => {
    const newFolder = {
      name: folderName,
      type: "folder",
      path: parentPath ? `${parentPath}/${folderName}` : folderName,
      children: []
    };

    setFiles(prevFiles => {
      if (!parentPath) {
        return [...prevFiles, newFolder];
      }

      const updateFilesRecursively = (items) => {
        return items.map(item => {
          if (item.path === parentPath && item.type === "folder") {
            return {
              ...item,
              children: [...(item.children || []), newFolder]
            };
          }
          if (item.children) {
            return {
              ...item,
              children: updateFilesRecursively(item.children)
            };
          }
          return item;
        });
      };

      return updateFilesRecursively(prevFiles);
    });

    // Automatically expand the new folder
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      newSet.add(newFolder.path);
      return newSet;
    });
  };

  const updateFileContent = (path, content) => {
    setFiles(prevFiles => {
      const updateContent = (items) => {
        return items.map(item => {
          if (item.path === path) {
            return { ...item, content };
          }
          if (item.children) {
            return {
              ...item,
              children: updateContent(item.children)
            };
          }
          return item;
        });
      };
      return updateContent(prevFiles);
    });
  };

  const deleteItem = (path) => {
    setFiles(prevFiles => {
      const deleteRecursively = (items) => {
        return items.filter(item => {
          if (item.path === path) return false;
          if (item.children) {
            return {
              ...item,
              children: deleteRecursively(item.children)
            };
          }
          return true;
        });
      };
      return deleteRecursively(prevFiles);
    });

    if (activeEditor === path) {
      setActiveEditor(null);
      setSelectedFile(null);
    }
  };

  const downloadProject = async () => {
    const zip = new JSZip();

    const addToZip = (items, currentPath = "") => {
      items.forEach(item => {
        const itemPath = currentPath ? `${currentPath}/${item.name}` : item.name;
        if (item.type === "file") {
          zip.file(itemPath, item.content || "");
        } else if (item.children) {
          addToZip(item.children, itemPath);
        }
      });
    };

    addToZip(files);
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "project.zip");
  };

  const toggleFolder = (folderPath) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath);
      } else {
        newSet.add(folderPath);
      }
      return newSet;
    });
  };

  const openFile = (filePath) => {
    setSelectedFile(filePath);
    setActiveEditor(filePath);
  };

  return (
    <FileExplorerContext.Provider
      value={{
        files,
        selectedFile,
        expandedFolders,
        activeEditor,
        createFile,
        createFolder,
        deleteItem,
        toggleFolder,
        openFile,
        updateFileContent,
        downloadProject
      }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
};