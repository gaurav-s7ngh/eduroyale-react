import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lagPos, setLagPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop for the lagging box cursor
    let animationFrameId;
    const animateLag = () => {
      setLagPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return {
          x: prev.x + dx * 0.14,
          y: prev.y + dy * 0.14,
        };
      });
      animationFrameId = requestAnimationFrame(animateLag);
    };
    animateLag();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <>
      <div 
        className="cur" 
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      >
        🗡️
      </div>
      <div 
        className="cur-r" 
        style={{ left: `${lagPos.x}px`, top: `${lagPos.y}px` }}
      ></div>
    </>
  );
}