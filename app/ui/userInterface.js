"use client";

import { useState, useRef } from "react";

export default function UserInterface() {
  const [textAreaContent, setTextAreaContent] = useState("");
  const textAreaRef = useRef(null);
  // const apiKey = import.meta.env.VITE_API_KEY;

  function handleTextAreaChange(event) {
    setTextAreaContent(event.target.value);
  }

  function clearTextArea() {
    setTextAreaContent("");
    textAreaRef.current.focus();
  }

  return (
    <main>
      <div className="text-area-container">
        <textarea
          autoFocus
          ref={textAreaRef}
          value={textAreaContent}
          onChange={handleTextAreaChange}
          name="text-area-content"
          id="text-area"
          rows="13"
          placeholder="Enter text..."
        ></textarea>
      </div>

      <div className="btns-container">
        {/* <button onClick={speakText} id="speak-btn"> */}
        <button onClick={() => alert("todo")} id="speak-btn">
          Speak
        </button>
        <button onClick={clearTextArea} id="clear-btn">
          Clear
        </button>
      </div>
    </main>
  );
}
