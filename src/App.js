import { marked } from "marked";
import { useState } from "react";
import { defaultContent } from "./defaulContent";
import * as DOMPurify from 'dompurify';

function App() {
  marked.use({
    breaks: true,
  });
  
  const [content, setContent] = useState(defaultContent)
  let clean = DOMPurify.sanitize(content);

  
  function handleChange(event) {
    setContent(event.target.value)
  }
  return (
    <div className="App">
      <textarea id="editor" onChange={handleChange} value={clean}></textarea>
      <div
        id="preview"
        dangerouslySetInnerHTML={{
          __html: marked(clean),
        }}
      ></div>
    </div>
  );
}

export default App;
