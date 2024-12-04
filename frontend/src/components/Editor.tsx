// import Editor from "@monaco-editor/react";
//
// export default function CodeEditor() {
//   const handleEditorChange = (value: unknown) => {
//     console.log("Editor content:", value);
//   };
//
//   return (
//     <Editor
//       height="90vh"
//       defaultLanguage="rust"
//       defaultValue="// Write your code here"
//       theme="vs-dark"
//       onChange={handleEditorChange}
//     />
//   );
// }
//

// import MonacoEditor from 'react-monaco-editor';
//
// export default function CodeEditor() {
const options = {
  autoIndent: 'full',
  contextmenu: true,
  fontFamily: 'monospace',
  fontSize: 13,
  lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: 'always',
  minimap: {
    enabled: true,
  },
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: true,
};
//
//   return (
//     <MonacoEditor
//       height="400"
//       options={options}
//     />
//   );
// }
//
//
const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
  autoIndent: 'full',
  contextmenu: true,
  fontFamily: 'monospace',
  fontSize: 13,
  lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: 'always',
  minimap: {
    enabled: true,
  },
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: true,
}

import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';


const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [file, setFile] = useState();
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-light');
  const handleFileChange = (event: any) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  const setDarkTheme = (e: any) => {
    e.preventDefault();
    setTheme((prev) => (prev === 'vs-dark' ? 'hc-black' : 'vs-dark'));
  };

  const setLightTheme = (e: any) => {
    e.preventDefault();
    setTheme('vs-light');
  };
  useEffect(() => {
    if (file) {
      var reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target && e.target.result) {
          setCode(e.target.result as unknown as any);
        }
      };
      reader.readAsText(file);
      let newLanguage = 'javascript';
      const extension = file.name?.split('.').pop();
      if (['css', 'html', 'python', 'dart'].includes(extension)) {
        newLanguage = extension;
      }
      setLanguage(newLanguage);
    }
  }, [file]);

  // The Options object goes here and is passed to the editor below

  return (
    <div>
      <div>
        <button onClick={setDarkTheme} type="button">
          Set dark theme ({theme === 'vs-dark' ? 'hc-black' : 'vs-dark'})
        </button>
        {theme !== 'vs-light' && (
          <button onClick={setLightTheme} type="button">
            Set light theme
          </button>
        )}
        <input type="file" onChange={handleFileChange} />
      </div>
      <hr />
      <MonacoEditor
        height="500"
        width='500'
        language={language}
        value={code}
        options={editorOptions}
        theme={theme}
      />
    </div>);
};

export default CodeEditor
