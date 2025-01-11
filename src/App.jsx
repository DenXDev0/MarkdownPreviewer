import { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

marked.setOptions({
  breaks: true,
  highlight: function (code, lang) {
    return hljs.highlightAuto(code).value;
  },
});

const App = () => {
  const defaultMarkdown = `
# Header 1: Welcome to the Markdown Previewer!
## Header 2: This is a sub-heading

[Learn More about Markdown](https://marked.js.org/)

\`\`\`javascript
// JavaScript code example
function greet() {
  console.log("Hello, Markdown!");
}
\`\`\`

- List Item 1
- List Item 2
- List Item 3

> Blockquote: "Markdown is great!"

![Sample Image](https://via.placeholder.com/150)

**Bold Text Example**

Inline \`code example\`

\`\`\`html
<!-- HTML code example -->
<div>
  <h1>Welcome to Markdown</h1>
  <p>This is a paragraph inside a div element.</p>
</div>
\`\`\`

### Task List Example
- [x] Task 1
- [ ] Task 2
- [ ] Task 3

### Horizontal Rule Example
---

**End of Markdown Example**
`;

  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [syncScroll, setSyncScroll] = useState(false);
  const editorRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    hljs.highlightAll();
  }, [markdown]);

  const handleReset = () => setMarkdown(defaultMarkdown);

  const handleScroll = (source) => {
    if (!syncScroll) return;

    const sourceScroll = source === "editor" ? editorRef.current : previewRef.current;
    const targetScroll = source === "editor" ? previewRef.current : editorRef.current;

    targetScroll.scrollTop = sourceScroll.scrollTop;
  };

  return (
    <div className="app">
      <h1 className="app-title">Markdown Previewer</h1>
      <div className="btn-group">
        <button className="sync-button" onClick={() => setSyncScroll(!syncScroll)}>
          {syncScroll ? "SyncScroll : ON" : "SyncScroll : OFF"}
        </button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
      <div className="container">
        <div className="editor-container">
          <div className="editor-header">Editor</div>
          <textarea
            ref={editorRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            onScroll={() => handleScroll("editor")}
            id="editor"
          />
        </div>
        <div className="preview-container">
          <div className="preview-header">Preview</div>
          <div
            ref={previewRef}
            id="preview"
            onScroll={() => handleScroll("preview")}
            dangerouslySetInnerHTML={{ __html: marked(markdown) }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
