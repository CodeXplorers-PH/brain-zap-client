import React from "react";

export default function BrainZapLoader() {
  return (
    <div className="flex items-center justify-center bg-gray-900">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-6 bg-violet-400 rounded-full"
            style={{
              animation: "pulseBar 1s ease-in-out infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Inline style tag for keyframes */}
      <style>{`
        @keyframes pulseBar {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1.5); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
