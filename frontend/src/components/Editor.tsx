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
import { Button } from './ui/button';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [file, setFile] = useState();
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const handleFileChange = (event: any) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const changeTheme = () => {
    if (theme == 'vs-lignt') {
      setTheme('vs-dark')
    } else if (theme == 'vs-dark') {
      setTheme('vs-lignt')
    }
  }

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
      <div className='space-y-3 space-x-3'>
        {(
          <Button onClick={changeTheme} type="button">
            change theme
          </Button>
        )}
        <input type="file" onChange={handleFileChange} />
      </div>
      <hr />
      <MonacoEditor
        height="800"
        width='800'
        language={language}
        value={code}
        options={editorOptions}
        theme={theme}
      />
    </div>);
};

export default CodeEditor
