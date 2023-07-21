import { marked } from "marked";
import { useState } from "react";
import { defaultContent } from "./defaulContent";
import DOMPurify from "dompurify";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  marked.use({
    breaks: true,
  });

  const allowedTags = [
    "p",
    "a",
    "strong",
    "b",
    "em",
    "i",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "code",
    "pre",
    "span",
    "br",
    "hr",
  ];
  const allowedAttributes = ["href", "title", "target", "style"];

  const [content, setContent] = useState(defaultContent);
  let clean = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttributes,
  });
  clean = clean.replace(/&gt;/g, ">").replace(/&lt;/g, "<"); // Escaping < and >

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
