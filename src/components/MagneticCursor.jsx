// src/components/MagneticCursor.jsx
import React, { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 12;

export default function MagneticCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const trailsRef = useRef([]);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });
  const trailPositionsRef = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  );
  const rafRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Hide on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseEnterInteractive = () => setIsHovering(true);
    const onMouseLeaveInteractive = () => setIsHovering(false);

    const attachHoverListeners = () => {
      const interactiveEls = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, select, label"
      );
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
      return interactiveEls;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    let interactiveEls = attachHoverListeners();

    // Re-attach on DOM mutations
    const observer = new MutationObserver(() => {
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      interactiveEls = attachHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation loop
    const animate = () => {
      const dot = cursorDotRef.current;
      const ring = cursorRingRef.current;
      const trails = trailsRef.current;

      if (dot) {
        dot.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }

      // Ring lags behind with lerp (gravity feel)
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.13;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.13;

      if (ring) {
        ring.style.transform = `translate(${ringPosRef.current.x - 18}px, ${ringPosRef.current.y - 18}px)`;
      }

      // Update trail positions with cascading lag
      const trailPos = trailPositionsRef.current;
      trailPos[0].x += (posRef.current.x - trailPos[0].x) * 0.25;
      trailPos[0].y += (posRef.current.y - trailPos[0].y) * 0.25;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trailPos[i].x += (trailPos[i - 1].x - trailPos[i].x) * 0.22;
        trailPos[i].y += (trailPos[i - 1].y - trailPos[i].y) * 0.22;
      }

      trails.forEach((el, i) => {
        if (!el) return;
        const size = 6 - i * 0.35;
        const opacity = (1 - i / TRAIL_LENGTH) * 0.55;
        el.style.transform = `translate(${trailPos[i].x - size / 2}px, ${trailPos[i].y - size / 2}px)`;
        el.style.opacity = opacity;
        el.style.width = `${Math.max(size, 1)}px`;
        el.style.height = `${Math.max(size, 1)}px`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      {/* Gravity Trail Dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed top-0 left-0 rounded-full"
          style={{
            background:
              i < 4
                ? "rgba(0, 242, 254, 0.7)"
                : i < 8
                ? "rgba(255, 0, 85, 0.6)"
                : "rgba(255, 159, 67, 0.5)",
            boxShadow:
              i < 4
                ? "0 0 6px rgba(0, 242, 254, 0.8)"
                : "0 0 4px rgba(255, 0, 85, 0.6)",
            transition: "opacity 0.1s ease",
            willChange: "transform",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Outer Magnetic Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 rounded-full"
        style={{
          width: isHovering ? 48 : 36,
          height: isHovering ? 48 : 36,
          marginLeft: isHovering ? -6 : 0,
          marginTop: isHovering ? -6 : 0,
          border: isHovering
            ? "2px solid rgba(255, 0, 85, 0.9)"
            : "1.5px solid rgba(0, 242, 254, 0.7)",
          boxShadow: isHovering
            ? "0 0 20px rgba(255, 0, 85, 0.5), inset 0 0 10px rgba(255, 0, 85, 0.1)"
            : "0 0 15px rgba(0, 242, 254, 0.4), inset 0 0 8px rgba(0, 242, 254, 0.08)",
          transition:
            "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, margin 0.25s ease",
          willChange: "transform",
          backdropFilter: isHovering ? "blur(2px)" : "none",
          background: isHovering ? "rgba(255, 0, 85, 0.06)" : "transparent",
          pointerEvents: "none",
        }}
      />

      {/* Inner Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 rounded-full"
        style={{
          width: isClicking ? 5 : 8,
          height: isClicking ? 5 : 8,
          marginLeft: isClicking ? 1.5 : 0,
          marginTop: isClicking ? 1.5 : 0,
          background: isHovering
            ? "radial-gradient(circle, #ff0055, #ff4d88)"
            : "radial-gradient(circle, #00f2fe, #0080ff)",
          boxShadow: isHovering
            ? "0 0 12px rgba(255, 0, 85, 1)"
            : "0 0 10px rgba(0, 242, 254, 1)",
          transition: "width 0.15s ease, height 0.15s ease, background 0.2s ease, box-shadow 0.2s ease, margin 0.15s ease",
          willChange: "transform",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
