import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const handleEditorChange = (value: unknown) => {
    console.log("Editor content:", value);
  };

  return (
    <Editor
      height="90vh"
      defaultLanguage="rust"
      defaultValue="// Write your code here"
      theme="vs-dark"
      onChange={handleEditorChange}
    />
  );
}
