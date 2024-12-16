import { 
  FiFile, 
  FiPackage, 
  FiFileText,
  FiCode 
} from "react-icons/fi";
import { 
  DiJavascript1,
  DiReact,
  DiCss3,
  DiHtml5,
  DiNodejsSmall,
  DiPython
} from "react-icons/di";
import { VscJson } from "react-icons/vsc";

export const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  
  switch (ext) {
    case 'js':
      return DiJavascript1;
    case 'jsx':
      return DiReact;
    case 'ts':
    case 'tsx':
      return DiNodejsSmall;
    case 'css':
      return DiCss3;
    case 'html':
      return DiHtml5;
    case 'json':
      return VscJson;
    case 'md':
      return FiFileText;
    case 'py':
      return DiPython;
    default:
      return FiFile;
  }
};

export const getFileLanguage = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  
  switch (ext) {
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'javascript';
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'typescript';
    case 'css':
      return 'css';
    case 'html':
      return 'html';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'py':
      return 'python';
    case 'java':
      return 'java';
    case 'cs':
      return 'csharp';
    case 'php':
      return 'php';
    default:
      return 'plaintext';
  }
};