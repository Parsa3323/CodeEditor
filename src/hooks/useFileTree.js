import { useState } from 'react';

export const useFileTree = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [creationType, setCreationType] = useState(null);
  const [newItemName, setNewItemName] = useState("");

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

  const resetCreation = () => {
    setIsCreating(false);
    setNewItemName("");
    setCreationType(null);
  };

  return {
    currentPath,
    setCurrentPath,
    isCreating,
    creationType,
    newItemName,
    setNewItemName,
    handleNewFile,
    handleNewFolder,
    resetCreation
  };
};