import { marked } from "marked";
import { useState } from "react";
import { defaultContent } from "./defaulContent";
import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  marked.use({
    breaks: true,
  });

  const [content, setContent] = useState(defaultContent);
  let clean = DOMPurify.sanitize(content);

  function handleChange(event) {
    setContent(event.target.value);
  }
  return (
    <div className="App container">
      <div>
        <div id="editor-wrapper">
          <div className="wrapper-header">Editor</div>
          <textarea
            id="editor"
            onChange={handleChange}
            value={clean}
          ></textarea>
        </div>
        <div id="preview-wrapper">
          <div className="wrapper-header">Preview</div>
          <div
            id="preview"
            dangerouslySetInnerHTML={{
              __html: marked(clean),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
