import UserInterface from "./ui/userInterface";

export default function App() {

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



  return (
    <>
      <UserInterface />
    </>
  );
}
