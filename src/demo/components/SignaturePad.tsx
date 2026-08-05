import React, { useRef, useState, useEffect } from "react";
import { PenTool, RotateCcw, Check } from "lucide-react";

interface SignaturePadProps {
  initialValue?: string | null;
  onSave: (base64Data: string) => void;
  onClear: () => void;
  theme?: "dark" | "light";
}

export default function SignaturePad({ initialValue, onSave, onClear, theme = "dark" }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  // Pad surface + ink follow the active theme so the signature stays
  // high-contrast in both appearances.
  const padBg = theme === "light" ? "#ffffff" : "#09090b";
  const inkColor = theme === "light" ? "#1e293b" : "#f59e0b";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset and configure context
    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Paint the pad surface to match the active theme
    ctx.fillStyle = padBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (initialValue && initialValue.startsWith("data:image")) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        setHasSigned(true);
      };
      img.src = initialValue;
    }
  }, [initialValue, theme]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Check if touch event
    if ("touches" in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const coords = getCoordinates(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setHasSigned(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveSignature();
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const base64Data = canvas.toDataURL("image/png");
    onSave(base64Data);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = padBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
    onClear();
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <PenTool size={14} className="text-amber-500" />
          Representative Digital Signature
        </label>
        {hasSigned && (
          <span className="text-[10px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full flex items-center gap-1 font-bold uppercase tracking-wide">
            <Check size={12} /> Signed
          </span>
        )}
      </div>

      <div className="border border-zinc-800 bg-zinc-950 rounded-lg p-1 shadow-inner relative overflow-hidden">
        <canvas
          id="client-sign-canvas"
          ref={canvasRef}
          width={360}
          height={150}
          className="w-full h-[150px] touch-none cursor-crosshair bg-zinc-950 rounded"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasSigned && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-zinc-650 text-[10px] font-mono tracking-widest lowercase">
            [ Draw digital signature stylus here ]
          </div>
        )}
      </div>

      <div className="flex justify-end mt-2">
        <button
          id="clear-signature-btn"
          type="button"
          onClick={clearCanvas}
          className="text-[10px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer uppercase font-bold"
        >
          <RotateCcw size={12} /> Clear Stylus Pad
        </button>
      </div>
    </div>
  );
}
