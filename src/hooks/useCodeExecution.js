import { useState } from 'react';
import { executeCode } from '../services/api';

export const useCodeExecution = () => {
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (language, code) => {
    setIsExecuting(true);
    setError(null);
    
    try {
      const result = await executeCode(language, code);
      setOutput(result.run.output);
    } catch (error) {
      setError(error.message);
      setOutput(`Error executing code: ${error.message}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return {
    output,
    isExecuting,
    error,
    execute
  };
};