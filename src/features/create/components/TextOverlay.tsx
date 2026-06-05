"use client";

import { useState } from "react";
import { Type  } from "lucide-react";

interface TextOverlayProps {
  onAddText: (text: { text: string; x: number; y: number; fontSize: number; color: string }) => void;
}

const colors = ["#FFFFFF", "#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

export default function TextOverlay({ onAddText }: TextOverlayProps) {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [color, setColor] = useState("#FFFFFF");

  const handleAdd = () => {
    if (text.trim()) {
      onAddText({
        text,
        x: 100,
        y: 100,
        fontSize,
        color,
      });
      setText("");
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
      <div className="flex items-center gap-2">
        <Type size={18} className="text-gray-500" />
        <span className="text-sm font-medium">افزودن متن روی عکس</span>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="متن خود را وارد کنید..."
        className="w-full p-3 bg-white dark:bg-gray-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
        rows={2}
      />

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600 dark:text-gray-400">اندازه:</label>
        <input
          type="range"
          min={12}
          max={72}
          value={fontSize}
          onChange={(e) => setFontSize(parseInt(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">{fontSize}px</span>
      </div>

      <div className="flex gap-2 flex-wrap">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`w-8 h-8 rounded-full transition-all ${
              color === c ? "ring-2 ring-blue-500 scale-110" : ""
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <button
        onClick={handleAdd}
        disabled={!text.trim()}
        className="w-full py-2 bg-blue-500 text-white rounded-lg text-sm font-medium disabled:opacity-50"
      >
        افزودن متن
      </button>
    </div>
  );
}