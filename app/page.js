"use client";

import { useState, useRef } from "react";

export default function App() {
  const [textAreaContent, setTextAreaContent] = useState("");
  const textAreaRef = useRef(null);
  // const apiKey = import.meta.env.VITE_API_KEY;

  function handleTextAreaChange(event) {
    setTextAreaContent(event.target.value);
  }

  // -- MAIN FUNCTIONS --

  async function speakText() {
    const text = textAreaContent;

    if (!text) {
      console.log("Text area empty");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "xi-api-key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.35,
          style: 0,
          similarity_boost: 1,
          use_speaker_boost: true,
        },
      }),
    };

    try {
      const response = await fetch(
        "https://api.elevenlabs.io/v1/text-to-speech/MCyhrk9hncpxwxzF9GWW?output_format=mp3_44100_128",
        options
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      console.error(err);
    }
  }

  function clearTextArea() {
    setTextAreaContent("");
    textAreaRef.current.focus();
  }

  return (
    <>
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
          <button onClick={speakText} id="speak-btn">
            Speak
          </button>
          <button onClick={clearTextArea} id="clear-btn">
            Clear
          </button>
        </div>
      </main>
    </>
  );
}
