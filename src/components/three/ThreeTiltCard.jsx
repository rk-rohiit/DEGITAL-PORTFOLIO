// src/components/three/ThreeTiltCard.jsx
import React, { useRef, useState } from "react";

export default function ThreeTiltCard({
  children,
  className = "",
  tiltMaxAngleX = 12,
  tiltMaxAngleY = 12,
  glare = true,
  scale = 1.02,
}) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "all 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)",
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltMaxAngleX;
    const rotateY = ((x - centerX) / centerX) * tiltMaxAngleY;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: "transform 0.1s ease-out",
    });

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlareStyle({
        opacity: 0.6,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 111, 97, 0.25) 0%, rgba(255,255,255,0.4) 30%, transparent 70%)`,
      });
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "all 0.5s cubic-bezier(0.03, 0.98, 0.52, 0.99)",
    });
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            ...glareStyle,
            mixBlendMode: "overlay",
            borderRadius: "inherit",
          }}
        />
      )}
    </div>
  );
}
