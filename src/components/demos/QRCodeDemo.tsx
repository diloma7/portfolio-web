"use client";

import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";
import { QrCode, Download } from "lucide-react";

export default function QRCodeDemo() {
  const [name, setName] = useState("");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!name.trim()) {
      setDataUrl(null);
      return;
    }

    const profileUrl = `https://diloma.dev/profile/${encodeURIComponent(name.trim().toLowerCase().replace(/\s+/g, "-"))}`;

    QRCode.toCanvas(canvasRef.current, profileUrl, {
      width: 200,
      margin: 2,
      color: { dark: "#e2e8f0", light: "#00000000" },
    }).catch(() => {});

    QRCode.toDataURL(profileUrl, {
      width: 400,
      margin: 2,
      color: { dark: "#0f172a", light: "#ffffff" },
    })
      .then(setDataUrl)
      .catch(() => {});
  }, [name]);

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `qr-${name.trim().toLowerCase().replace(/\s+/g, "-")}.png`;
    a.click();
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700/50 flex items-center gap-2">
        <QrCode size={16} className="text-cyan-400" />
        <p className="text-sm font-medium text-slate-200">
          QR Profile Generator
        </p>
      </div>

      <div className="p-5 space-y-5">
        <p className="text-xs text-slate-500">
          Type a name to generate a QR code linking to a digital profile.
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name…"
          maxLength={60}
          className="w-full bg-slate-800/80 border border-slate-700/50 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-cyan-500/60 transition-colors"
        />

        {/* QR output */}
        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-[200px] h-[200px] rounded-xl border border-slate-700/40 flex items-center justify-center transition-opacity ${name.trim() ? "opacity-100" : "opacity-20"}`}
          >
            <canvas ref={canvasRef} />
          </div>

          {name.trim() && (
            <>
              <p className="text-xs text-slate-500 text-center break-all px-4">
                diloma.dev/profile/
                {name.trim().toLowerCase().replace(/\s+/g, "-")}
              </p>
              <button
                onClick={download}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
              >
                <Download size={12} />
                Download QR
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
