import React, { createContext, useState } from "react";
import run from "../gemini"; // ✅ Import run function from gemini.js

export const datacontext = createContext(); // Keeping name as it is

function UserContext({ children }) { 
    let [speaking, setSpeaking] = useState(false);
    let [prompt, setPrompt] = useState("listening...");
    let [response, setResponse] = useState(false);

    function speak(text) {
        let cleanedText = text
            .replace(/\*\*/g, "") // ✅ Remove **
            .replace(/\*/g, "") // ✅ Remove *
            .replace(/google/gi, "Aditya Pandey"); // ✅ Replace Google

        let text_speak = new SpeechSynthesisUtterance(cleanedText);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "hi-IN";

        window.speechSynthesis.speak(text_speak);
    }

    async function aiResponse(prompt) { 
        try {
            let text = await run(prompt); // ✅ Calling run function
            console.log("AI Response:", text);

            let newText = text
                .replace(/\*\*/g, "")
                .replace(/\*/g, "")
                .replace(/google/gi, "Aditya Pandey");

            setPrompt(newText);
            speak(newText); // ✅ Speak the AI response
            setResponse(true);

            setTimeout(() => {
                setSpeaking(false);
            }, 5000); 
        } catch (error) {
            console.error("AI Error:", error);
        }
    }

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();

    recognition.onresult = (e) => {
        let transcript = e.results[e.resultIndex][0].transcript; 
        setPrompt(transcript);
        takeCommand(transcript.toLowerCase());
    };

    function takeCommand(command) {
      if (command.includes("open") && command.includes("youtube")) {
          window.open("https://www.youtube.com/", "_blank");
          speak("Opening YouTube");
          setPrompt("Opening YouTube...");
      } 
      else if (command.includes("open") && command.includes("google")) {
          window.open("https://www.google.com/", "_blank");
          speak("Opening Google");
          setPrompt("Opening Google...");
      }
      else if (command.includes("open") && command.includes("linkedin")) {
          window.open("https://www.linkedin.com/", "_blank");
          speak("Opening LinkedIn");
          setPrompt("Opening LinkedIn...");
      }
      else if (command.includes("open") && command.includes("instagram")) {
          window.open("https://www.instagram.com/", "_blank");
          speak("Opening Instagram");
          setPrompt("Opening Instagram...");
      }
      else if (command.includes("open") && command.includes("github")) {
          window.open("https://www.github.com/", "_blank");
          speak("Opening GitHub");
          setPrompt("Opening GitHub...");
      }
      else if (command.includes("open") && command.includes("facebook")) {
          window.open("https://www.facebook.com/", "_blank");
          speak("Opening Facebook");
          setPrompt("Opening Facebook...");
      }
      else if (command.includes("open") && command.includes("twitter")) {
          window.open("https://twitter.com/", "_blank");
          speak("Opening Twitter");
          setPrompt("Opening Twitter...");
      }
      else if (
        command.includes("what is your name") || 
        command.includes("tumhara naam kya hai") || 
        command.includes("who are you")
    ) {
        let responseText = "Mera naam Vaani hai, mujhe Aditya Pandey ne banya hai.";
        speak(responseText);
        setPrompt(responseText);
    }
    // ✅ Creator Handling
    else if (
        command.includes("who made you") || 
        command.includes("tumhe kisne banaya") ||
        command.includes("who created you")
    ) {
        let responseText = "Mujhe Aditya Pandey ne banaya hai.";
        speak(responseText);
        setPrompt(responseText);
    }
    else {
        aiResponse(command);
    }
  
      setTimeout(() => {
          setSpeaking(false);
      }, 5000);
  }
  

    let value = { recognition, speaking, setSpeaking, prompt, setPrompt, response, setResponse };

    return <datacontext.Provider value={value}>{children}</datacontext.Provider>;
}

export default UserContext;
