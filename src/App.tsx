"use client";
import { useState } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 18 + 16;

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure? 🥺",
      "Think again...",
      "You're lying 🙈",
      "You don't miss me at all?",
      "Your heart says yes tho",
      "Liar liar 😤",
      "Really?? 😢",
      "Ok... I'm sad now",
      "I'm literally crying 😭",
      "Still don't believe you",
      "Just press the other one, Nan",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div
      className="flex h-screen flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #ffe4f0 0%, #ffd6e8 50%, #ffc8e0 100%)",
        fontFamily: "'Sarabun', 'Kanit', sans-serif",
      }}
    >
      {/* floating hearts */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {["💕", "🩷", "💗", "✨", "🌸", "💝", "🩷", "💕"].map((emoji, i) => (
          <span
            key={i}
            className="absolute animate-bounce text-2xl opacity-40"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      {yesPressed ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-white/70 p-10 shadow-2xl backdrop-blur">
          <img
            className="h-[220px] rounded-2xl"
            src="https://gifdb.com/images/high/milk-and-mocha-kiss-2vwjr4s7usa2g5kj.gif"
            alt="cute"
          />
          <div className="text-3xl font-bold text-pink-500">
            I knew it, Nan! 🥰
          </div>
          <div className="text-xl text-pink-400">I miss you too 💕</div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-white/70 p-10 shadow-2xl backdrop-blur">
          <img
            className="h-[200px] rounded-2xl"
            src="https://gifdb.com/images/high/cute-love-bear-roses-ou7zho5oosxnpo6k.gif"
            alt="cute bear"
          />
          <h1 className="text-4xl font-bold text-pink-500">
            Do you miss me, Nan? 🌸
          </h1>
          <p className="text-lg text-pink-400">Just be honest 👀</p>
          <div className="flex items-center gap-4">
            <button
              className="rounded-full bg-pink-400 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-pink-500 hover:scale-105 active:scale-95"
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              Yes 🩷
            </button>
            <button
              onClick={handleNoClick}
              className="rounded-full bg-gray-300 px-6 py-3 font-bold text-gray-600 shadow transition hover:bg-gray-400"
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
          {noCount >= 3 && (
            <p className="animate-pulse text-sm text-pink-300">
              I miss you tho... 🥺
            </p>
          )}
        </div>
      )}
    </div>
  );
}
