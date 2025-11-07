"use client";
import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

export default function Voice() {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [history, setHistory] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [translation, setTranslation] = useState("");

  // ✅ Ensure this only runs in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 🗣️ Siswati → English Dictionary (you can expand this)
  const siswatiDictionary = {
    ngiyakutsandza: "I love you",
    utsandza: "you love",
    sikhuluma: "we speak / to talk",
    ngiyakhuluma: "I am speaking",
    umsebenti: "work",
    mngani: "friend",
    sibonene: "we will see each other",
    ngiyajabula: "I am happy",
    ngiyalalela: "I am listening",
    sawubona: "hello",
    yebo: "yes",
    cha: "no",
  };
 
  // 🆕 Added extra Siswati words
  const extendedSiswati = {
    utsite: "you said",
    gogo: "grandmother",
    ngikubite: "I called you",
    unjani: "how are you",
    uyaphila: "are you well",
    yati: "said that",
    ngiyafuna: "I want",
    ngitawubona: "I will see",
  };

  // Merge new words into the main dictionary
  Object.assign(siswatiDictionary, extendedSiswati);

  // 🧠 Translate Siswati words
  const translateSiswati = (text) => {
    if (!text) return "";
    const words = text.toLowerCase().split(" ");
    const translatedWords = words.map((word) => siswatiDictionary[word] || word);
    return translatedWords.join(" ");
  };

  // 🔄 Auto-update translation whenever transcript changes
  useEffect(() => {
    if (transcript) {
      setTranslation(translateSiswati(transcript));
    }
  }, [transcript]);

  if (!isClient) {
    return <p>Loading browser features...</p>;
  }

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition. Please use Chrome.</p>;
  }

  // 🖼️ Frontend UI
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1
        style={{
          color: listening ? "#00e0ff" : "#0077ff",
          textShadow: listening
            ? "0 0 20px #00e0ff, 0 0 40px #00e0ff"
            : "none",
          transition: "all 0.3s ease-in-out",
        }}
      >
        🗣️ Sikhuluma Voice eSiswati
      </h1>
      <p>Click the button and start speaking in Siswati.</p>

      {/* 🎙️ Start Speaking Button */}
      <button
        onClick={() => {
          SpeechRecognition.startListening({ language: "ss-ZA" });
          if (transcript.trim() !== "") {
            setHistory((prev) => [...prev, transcript]);
          }
        }}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          backgroundColor: listening ? "#4caf50" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        {listening ? "Listening..." : "Start Speaking"}
      </button>

      {/* 🧹 Clear Button */}
      <button
        onClick={resetTranscript}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>

      {/* 💬 Transcript Display */}
      <div style={{ marginTop: "30px", fontSize: "1.2em", color: "#333" }}>
        <strong>What you said:</strong>
        <p style={{ marginTop: "10px" }}>{transcript}</p>
      </div>

      {/* 🌍 English Translation */}
      {translation && (
        <div style={{ marginTop: "20px", color: "#2a7ae2" }}>
          <strong>English Translation:</strong>
          <p>{translation}</p>
        </div>
      )}

      {/* 🕓 Speech History */}
      <div
        style={{
          marginTop: "30px",
          color: "#444",
          textAlign: "left",
          padding: "0 30px",
        }}
      >
        <h3>📁 Speech History</h3>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
