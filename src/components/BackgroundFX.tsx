"use client";

/** Soft, colorful blobs fixed behind the whole page content. */
export default function BackgroundFX() {
  return (
    <>
      <style>{`
        @keyframes blob-a {
          0%,100% { transform: translate(-240px,-160px) scale(1); }
          33%      { transform: translate(-120px, -80px) scale(1.05); }
          66%      { transform: translate(-300px,-200px) scale(0.95); }
        }
        @keyframes blob-b {
          0%,100% { transform: translate(200px,60px) scale(1); }
          33%      { transform: translate(280px,20px) scale(0.92); }
          66%      { transform: translate(140px,120px) scale(1.06); }
        }
        @keyframes blob-c {
          0%,100% { transform: translate(-40px,260px) scale(1); }
          33%      { transform: translate(-120px,300px) scale(1.06); }
          66%      { transform: translate(40px,220px) scale(0.94); }
        }
        @media (prefers-reduced-motion: reduce) {
          .blob-a,.blob-b,.blob-c { animation: none !important; }
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Blob A – top-left, cyan */}
        <div
          className="blob-a absolute left-[-12%] top-[-10%] h-[46vmax] w-[46vmax] blur-3xl"
          style={{
            opacity: 0.5,
            background:
              "radial-gradient(35% 35% at 50% 50%, rgba(56,189,248,0.45), transparent 70%)",
            animation: "blob-a 28s cubic-bezier(0.22,1,0.36,1) infinite",
          }}
        />
        {/* Blob B – top-right, purple */}
        <div
          className="blob-b absolute right-[-14%] top-[4%] h-[48vmax] w-[48vmax] blur-3xl"
          style={{
            opacity: 0.4,
            background:
              "radial-gradient(35% 35% at 50% 50%, rgba(168,85,247,0.45), transparent 70%)",
            animation: "blob-b 32s cubic-bezier(0.22,1,0.36,1) infinite",
          }}
        />
        {/* Blob C – bottom-left, rose */}
        <div
          className="blob-c absolute left-[12%] bottom-[-12%] h-[44vmax] w-[44vmax] blur-3xl"
          style={{
            opacity: 0.35,
            background:
              "radial-gradient(35% 35% at 50% 50%, rgba(244,63,94,0.38), transparent 70%)",
            animation: "blob-c 34s cubic-bezier(0.22,1,0.36,1) infinite",
          }}
        />
      </div>
    </>
  );
}
