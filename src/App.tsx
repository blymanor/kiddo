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
  "โอ้ย เอาหน้ามาจุ้บเดี๋ยวนิ",
  "กดใช่ได้ละมั้ง",
];

const FLOATING_HEARTS = [
  { mark: "♡", left: 4, top: 6, size: 22, color: "#fb7185" },
  { mark: "♥", left: 14, top: 88, size: 18, color: "#f43f5e" },
  { mark: "♡", left: 24, top: 22, size: 16, color: "#f59e0b" },
  { mark: "♥", left: 34, top: 10, size: 20, color: "#ec4899" },
  { mark: "♡", left: 46, top: 94, size: 22, color: "#fb7185" },
  { mark: "♥", left: 57, top: 4, size: 18, color: "#fb7185" },
  { mark: "♥", left: 68, top: 36, size: 26, color: "#f43f5e" },
  { mark: "♡", left: 82, top: 74, size: 22, color: "#fb7185" },
  { mark: "♥", left: 93, top: 12, size: 18, color: "#ec4899" },
  { mark: "♡", left: 74, top: 92, size: 16, color: "#f43f5e" },
  { mark: "♥", left: 40, top: 64, size: 16, color: "#ec4899" },
  { mark: "♡", left: 10, top: 44, size: 20, color: "#ec4899" },
];

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [shake, setShake] = useState(false);
  const [showNoGif, setShowNoGif] = useState(false);

  const yesScale = Math.min(4.2, 1 + noCount * 0.12);
  const yesShift = Math.min(42, noCount * 6);

  const noScale = Math.max(0.82, 1 - noCount * 0.08);

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
      const timer = window.setTimeout(() => {
        setNoPos({ x: 0, y: 0 });
      }, 520);

      return () => window.clearTimeout(timer);
    }
  }, [noCount]);

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#fff7f1] px-4 py-8 text-[#382235] sm:px-6">
      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffd2df_0,transparent_34%),radial-gradient(circle_at_bottom_right,#ffd9b5_0,transparent_32%),linear-gradient(145deg,#fff8f3_0%,#ffe9ef_52%,#fff3df_100%)]" />

      {/* floating hearts */}
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

      {/* card */}
      <section
        className={`relative w-full max-w-[300px] rounded-[24px] bg-white/82 p-2.5 shadow-[0_24px_80px_rgba(164,72,96,0.22)] ring-1 ring-white/80 backdrop-blur-md sm:max-w-[420px] sm:p-5 ${
          shake ? "[animation:shake_0.42s_ease]" : ""
        }`}
      >
        {/* gif */}
        <div className="overflow-hidden rounded-[20px] bg-[#fff1e8] p-2 shadow-inner shadow-rose-200/50">
          <img
            className="aspect-[4/3] w-full rounded-[15px] object-center"
            src={currentGif}
            alt={yesPressed ? "cute happy gif" : "cute waiting gif"}
          />
        </div>

        {yesPressed ? (
          <div className="px-2 pb-3 pt-5 text-center sm:px-3 sm:pb-4 sm:pt-7">
            <div className="text-[1.6rem] font-black leading-[1.08] text-[#d83d68] sm:text-2xl">
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
            {/* text */}
            <div className="px-2 pb-2 pt-5 text-center sm:px-3 sm:pt-7">
              <div className="mb-4 min-h-9">
                {noCount > 0 && (
                  <p className="pop-in mx-auto w-fit rounded-full bg-[#fff0f3] px-4 py-2 text-sm font-bold text-[#b74360] shadow-sm ring-1 ring-rose-100">
                    {noText}
                  </p>
                )}
              </div>

              <h1 className="text-[1.6rem] font-black leading-[1.05] text-[#d83d68] sm:text-2xl">
                น้องแนนคิดถึงพี่เพลงไม๊
              </h1>
            </div>

            {/* buttons */}
            <div className="relative mt-5 overflow-visible px-1 pb-2 pt-4 sm:mt-6">
              <div className="mx-auto flex items-center justify-center gap-3 sm:gap-5">
                {/* YES */}
                <div className="relative z-30 flex h-[96px] w-[96px] items-center justify-center sm:h-[120px] sm:w-[120px]">
                  <button
                    onClick={() => setYesPressed(true)}
                    className="h-12 w-24 rounded-full bg-[#e84470] text-sm font-black text-white shadow-[0_16px_32px_rgba(216,61,104,0.34)] transition-all duration-300 hover:bg-[#d83d68] focus:outline-none focus:ring-4 focus:ring-[#f8b5c5] sm:h-16 sm:w-32 sm:text-lg"
                    style={{
                      transform: `translateX(${yesShift}px) scale(${yesScale})`,
                      transformOrigin: "center",
                      transition: "transform 0.35s ease",
                    }}
                  >
                    YES
                  </button>
                </div>

                {/* NO */}
                <div className="relative z-10 flex h-[96px] w-[96px] items-center justify-center sm:h-[120px] sm:w-[120px]">
                  <button
                    onClick={handleNo}
                    className="h-12 w-24 rounded-full border border-[#d7bbc9] bg-white text-sm font-black text-[#745366] shadow-[0_10px_24px_rgba(89,58,76,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#be8fa5] hover:bg-[#fff0f5] focus:outline-none focus:ring-4 focus:ring-[#edd3df] active:translate-y-0 sm:h-16 sm:w-32 sm:text-lg"
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

      {/* animations */}
      <style>{`
        .floating-heart {
          animation: floatHeart ease-in-out infinite;
        }

        @keyframes floatHeart {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @keyframes shake {
          0% {
            transform: translateX(0);
          }

          25% {
            transform: translateX(-4px);
          }

          50% {
            transform: translateX(4px);
          }

          75% {
            transform: translateX(-2px);
          }

          100% {
            transform: translateX(0);
          }
        }

        .pop-in {
          animation: popIn 0.25s ease;
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }

          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </main>
  );
}
