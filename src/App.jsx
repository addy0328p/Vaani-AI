import React, { useContext, useEffect, useState } from 'react';
import "./App.css";
import va from "./assets/ai.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import speakimg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";

function App() {
  const { recognition, speaking, setSpeaking, prompt, response, setPrompt, setResponse } = useContext(datacontext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500); // Loading screen for 2.5 sec
  }, []);

  // Function to create random particles
  useEffect(() => {
    const particlesContainer = document.createElement("div");
    particlesContainer.classList.add("particles");
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      particle.style.top = `${Math.random() * 100}vh`;
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.animationDuration = `${Math.random() * 5 + 7}s`;
      particlesContainer.appendChild(particle);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading-screen">
          Vaani is Booting Up...<span className="loading-dots"></span>
        </div>
      ) : (
        <div className='main'>
          <img src={va} alt="Vaani AI" id="vaani" />
          <span>Meet Vaani – Your AI-powered buddy.</span>

          {!speaking ? (
            <button
              onClick={() => {
                setPrompt("listening...");
                setSpeaking(true);
                setResponse(false);
                if (recognition) {
                  recognition.start();
                } else {
                  console.error("Speech recognition not initialized");
                }
              }}
            >
              Click here <CiMicrophoneOn />
            </button>
          ) : (
            <div className='response'>
              {!response ? <img src={speakimg} alt="" id="speak" /> :
                <img src={aigif} alt="AI Voice" id="aigif" />}
              <p>{prompt}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
