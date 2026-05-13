"use client";
import { useEffect, useState } from "react";

const GIF_MAIN =
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3c3M4cmYzYTB4aXZnZnF4YzI3cXQ0YWkxaG9za2VuenVycmtlZGpnYiZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/xUPGcyGUoajDl0nP9u/giphy.gif";
const GIF_YES =
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3Y2J5d3F3dmlzY3Z4dzY5MDU1eHo1dWF6dDV6amdhZG83NHl3eWgzdyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/3QcftXNHnzDHGNA8W6/giphy.gif";
const GIF_NO =
  "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3N3BkYzE1eTluNzRob2pyYWw2dmRtOWFmajVtNmxkZmM0Nng2MTlzdyZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/3o6ozw4tndtKMvjYbe/giphy.gif";

const NO_PHRASES = [
  "จริงอะ เปลี่ยนใจหน่อย :<",
  "พี่เพลงบึ้งและ 😕",
  "เลือกอันอื่นหน่อยอ้วน 🥺",
  "กดใช่เดี๋ยวพาไปกินหนม",
  "ยังอีก ๆ",
  "โอ้ย เอาหน้ามาจุ้บ",
  "กดใช่ได้ละมั้ง",
];

const FLOATING_HEARTS = [
  { mark: "♡", left: 7, top: 12, size: 28, color: "#fb7185" },
  { mark: "♥", left: 18, top: 72, size: 20, color: "#f43f5e" },
  { mark: "♡", left: 25, top: 38, size: 18, color: "#f59e0b" },
  { mark: "♥", left: 36, top: 18, size: 22, color: "#ec4899" },
  { mark: "♡", left: 52, top: 78, size: 24, color: "#fb7185" },
  { mark: "♥", left: 61, top: 10, size: 18, color: "#fb7185" },
  { mark: "♥", left: 73, top: 38, size: 30, color: "#f43f5e" },
  { mark: "♡", left: 84, top: 60, size: 26, color: "#fb7185" },
  { mark: "♥", left: 91, top: 18, size: 20, color: "#ec4899" },
  { mark: "♡", left: 68, top: 68, size: 18, color: "#f43f5e" },
  { mark: "♥", left: 43, top: 58, size: 18, color: "#ec4899" },
  { mark: "♡", left: 14, top: 28, size: 24, color: "#ec4899" },
  { mark: "♥", left: 30, top: 84, size: 22, color: "#fb7185" },
  { mark: "♡", left: 47, top: 44, size: 16, color: "#f43f5e" },
  { mark: "♥", left: 58, top: 58, size: 24, color: "#ec4899" },
  { mark: "♡", left: 79, top: 82, size: 22, color: "#f59e0b" },
  { mark: "♥", left: 88, top: 32, size: 24, color: "#fb7185" },
];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [shake, setShake] = useState(false);
  const [showNoGif, setShowNoGif] = useState(false);

  const yesScale = Math.min(12, 1.1 ** noCount);
  const yesShift = Math.min(88, Math.max(0, yesScale - 1) * 14);
  const noScale = Math.max(0.72, 1 - noCount * 0.08);
  const noText =
    noCount === 0 ? "" : NO_PHRASES[(noCount - 1) % NO_PHRASES.length];
  const currentGif = yesPressed ? GIF_YES : showNoGif ? GIF_NO : GIF_MAIN;

  const handleNo = () => {
    if (noCount >= 2) {
      setNoPos({
        x: (Math.random() - 0.5) * 46,
        y: (Math.random() - 0.5) * 58,
      });
    }

    setNoCount((count) => count + 1);
    setShake(true);
    setShowNoGif(true);
    window.setTimeout(() => setShake(false), 420);
    window.setTimeout(() => setShowNoGif(false), 1500);
  };

  useEffect(() => {
    if (noCount > 2) {
      const timer = window.setTimeout(() => setNoPos({ x: 0, y: 0 }), 520);
      return () => window.clearTimeout(timer);
    }
  }, [noCount]);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#fff7f1] px-4 py-8 text-[#382235] sm:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffd2df_0,transparent_34%),radial-gradient(circle_at_bottom_right,#ffd9b5_0,transparent_32%),linear-gradient(145deg,#fff8f3_0%,#ffe9ef_52%,#fff3df_100%)]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {FLOATING_HEARTS.map((heart, index) => (
          <span
            key={`${heart.mark}-${index}`}
            className="floating-heart absolute select-none font-black"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              color: heart.color,
              fontSize: heart.size,
              opacity: 0.46,
              animationDelay: `${index * 0.45}s`,
              animationDuration: `${4.4 + (index % 4) * 0.45}s`,
            }}
          >
            {heart.mark}
          </span>
        ))}
      </div>

      <section
        className={`relative w-full max-w-[360px] rounded-[28px] bg-white/82 p-3 shadow-[0_24px_80px_rgba(164,72,96,0.22)] ring-1 ring-white/80 backdrop-blur-md sm:max-w-[440px] sm:p-5 ${
          shake ? "[animation:shake_0.42s_ease]" : ""
        }`}
      >
        <div className="overflow-hidden rounded-[22px] bg-[#fff1e8] p-2 shadow-inner shadow-rose-200/50">
          <img
            className="aspect-[4/3] w-full rounded-[17px] object-center"
            src={currentGif}
            alt={yesPressed ? "cute happy gif" : "cute waiting gif"}
          />
        </div>

        {yesPressed ? (
          <div className="px-2 pb-3 pt-6 text-center sm:px-3 sm:pb-4 sm:pt-7">
            <div className="text-xl font-black leading-[1.08] tracking-normal text-[#d83d68] sm:text-2xl">
              เค้าคิดถึงมากกว่า 🥺
            </div>
            <div className="px-2 pb-1 pt-5 text-center sm:px-3 sm:pb-2 sm:pt-7">
              <div className="mb-4 min-h-9">
                <p className="pop-in mx-auto w-fit rounded-full bg-[#fff0f3] px-4 py-2 text-sm font-bold text-[#b74360] shadow-sm ring-1 ring-rose-100">
                  ขอให้ตอนเลิกงาน น้องแนนไม่เปียกฝน :3
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="px-2 pb-2 pt-6 text-center sm:px-3 sm:pt-7">
              <div className="mb-4 min-h-9">
                {noCount > 0 && (
                  <p className="pop-in mx-auto w-fit rounded-full bg-[#fff0f3] px-4 py-2 text-sm font-bold text-[#b74360] shadow-sm ring-1 ring-rose-100">
                    {noText}
                  </p>
                )}
              </div>
              <h1 className="text-[2rem] font-black leading-[1.05] tracking-normal text-[#d83d68] sm:text-3xl">
                น้องแนนคิดถึงพี่เพลงไม๊
              </h1>
            </div>

            <div className="relative mt-5 overflow-visible px-1 pb-2 pt-4 sm:mt-6">
              <div className="mx-auto flex items-center justify-center gap-3 sm:gap-5">
                <div className="relative z-30 flex h-[108px] w-[108px] items-center justify-center sm:h-[120px] sm:w-[120px]">
                  <button
                    onClick={() => setYesPressed(true)}
                    className="h-14 w-28 rounded-full bg-[#e84470] text-base font-black text-white shadow-[0_16px_32px_rgba(216,61,104,0.34)] transition-transform duration-300 hover:bg-[#d83d68] focus:outline-none focus:ring-4 focus:ring-[#f8b5c5] sm:h-16 sm:w-32 sm:text-lg"
                    style={{
                      transform: `translateX(${yesShift}px) scale(${yesScale})`,
                      transformOrigin: "center",
                    }}
                  >
                    YES
                  </button>
                </div>

                <div className="relative z-10 flex h-[108px] w-[108px] items-center justify-center sm:h-[120px] sm:w-[120px]">
                  <button
                    onClick={handleNo}
                    className="h-14 w-28 rounded-full border border-[#d7bbc9] bg-white text-base font-black text-[#745366] shadow-[0_10px_24px_rgba(89,58,76,0.14)] transition duration-300 hover:-translate-y-0.5 hover:border-[#be8fa5] hover:bg-[#fff0f5] focus:outline-none focus:ring-4 focus:ring-[#edd3df] active:translate-y-0 sm:h-16 sm:w-32 sm:text-lg"
                    style={{
                      transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noScale})`,
                      transformOrigin: "center",
                    }}
                  >
                    NO
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
