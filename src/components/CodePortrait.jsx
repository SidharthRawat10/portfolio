import React, { useRef, useEffect, useState } from 'react';
import { Code2, Eye, Sparkles, RefreshCw, Layers } from 'lucide-react';

const CODE_CHARS = [
  'const', 'let', '=>', '{', '}', '[]', ';', '0', '1', '<div/>',
  'async', 'await', 'return', 'state', 'props', 'React', 'Node',
  'API', 'function', '$', '_', '#', '*', '0x7F', 'git', 'npm'
];

export default function CodePortrait({ 
  currentAngle = 0, 
  onAngleChange, 
  forceHover = false,
  className = "" 
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [manualMode, setManualMode] = useState('auto'); // 'auto', 'code', 'photo'
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const animationFrameRef = useRef(null);
  const imgRef = useRef(new Image());

  const angleImages = ['/sidharth-1.jpg', '/sidharth-2.jpg', '/sidharth-3.jpg'];
  const activeSrc = angleImages[currentAngle] || angleImages[0];

  // Preload and sample image onto offscreen canvas
  useEffect(() => {
    setImageLoaded(false);
    const img = imgRef.current;
    img.crossOrigin = 'anonymous';
    img.src = activeSrc;
    img.onload = () => {
      setImageLoaded(true);
    };
  }, [activeSrc]);

  // Code matrix render loop
  useEffect(() => {
    if (!imageLoaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    // Create offscreen canvas for sampling pixel brightness
    const sampleWidth = 52;
    const sampleHeight = 68;
    const offCanvas = document.createElement('canvas');
    offCanvas.width = sampleWidth;
    offCanvas.height = sampleHeight;
    const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });
    offCtx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
    const imgData = offCtx.getImageData(0, 0, sampleWidth, sampleHeight).data;

    let tick = 0;

    const render = () => {
      tick++;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const cellW = width / sampleWidth;
      const cellH = height / sampleHeight;

      ctx.font = '600 7px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let y = 0; y < sampleHeight; y++) {
        for (let x = 0; x < sampleWidth; x++) {
          const idx = (y * sampleWidth + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          // Skip completely transparent/white background pixels if cutout
          const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (a < 20) continue;

          // Character selection based on brightness and tick animation
          const charIdx = Math.floor((brightness * 12 + (tick * 0.05 + x + y)) % CODE_CHARS.length);
          const char = CODE_CHARS[charIdx];

          // Color calculation: Amber gold and Emerald matrix tint with natural brightness
          if (brightness < 0.15) {
            ctx.fillStyle = `rgba(30, 41, 59, 0.4)`;
          } else if (brightness < 0.45) {
            ctx.fillStyle = `rgba(16, 185, 129, ${0.4 + brightness * 0.5})`; // emerald
          } else if (brightness < 0.75) {
            ctx.fillStyle = `rgba(229, 185, 102, ${0.6 + brightness * 0.4})`; // gold
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${0.85 + Math.sin(tick * 0.05 + x) * 0.15})`; // glowing highlights
          }

          ctx.fillText(char, x * cellW + cellW / 2, y * cellH + cellH / 2);
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [imageLoaded, activeSrc]);

  // Mouse move handler for spotlight effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const showRealPhoto = manualMode === 'photo' || ((isHovered || forceHover) && manualMode !== 'code');

  return (
    <div 
      className={`code-portrait-container ${className}`}
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Outer Border HUD Frame */}
      <div className="hud-corner top-l" />
      <div className="hud-corner top-r" />
      <div className="hud-corner btm-l" />
      <div className="hud-corner btm-r" />

      {/* Status Overlay Tag */}
      <div className="portrait-hud-header">
        <div className="hud-status">
          <span className={`hud-dot ${showRealPhoto ? 'photo' : 'matrix'}`} />
          <span className="hud-text">
            {showRealPhoto ? 'REAL-TIME OPTICAL CAPTURE' : 'CODE MATRIX SYNTHESIS'}
          </span>
        </div>
        <span className="hud-metric">60 FPS · LIVE RENDER</span>
      </div>

      {/* Visual Canvas & Photo Display */}
      <div className="portrait-viewport">
        {/* Layer 1: The Real HD Picture (reveals on hover) */}
        <div 
          className="real-photo-layer"
          style={{
            opacity: showRealPhoto ? 1 : 0,
            transform: showRealPhoto ? 'scale(1)' : 'scale(0.98)',
          }}
        >
          <img 
            src={activeSrc} 
            alt="Sidharth Singh Rawat" 
            className="real-photo-img"
          />
          {/* Subtle Cyber Scanner Light Line */}
          <div className="cyber-scanline" />
        </div>

        {/* Layer 2: The Living Animated Code Matrix Canvas */}
        <canvas 
          ref={canvasRef} 
          width={360} 
          height={480}
          className="matrix-canvas-layer"
          style={{
            opacity: showRealPhoto ? 0.08 : 1,
            filter: showRealPhoto ? 'blur(4px)' : 'none',
          }}
        />

        {/* Interactive Hover Hint Floating Pill */}
        <div className={`hover-instruction-pill ${isHovered || forceHover ? 'hidden' : ''}`}>
          <Eye size={13} className="pill-icon" />
          <span>HOVER TO REVEAL REAL PICTURE</span>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="portrait-controls-bar">
        {/* Angle View Selector */}
        <div className="angle-toggles">
          <span className="control-label">PERSPECTIVE:</span>
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              className={`angle-btn ${currentAngle === idx ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onAngleChange) onAngleChange(idx);
              }}
              title={`Switch to Angle 0${idx + 1}`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>

        {/* Mode Override Buttons */}
        <div className="mode-toggles">
          <button 
            className={`mode-btn ${manualMode === 'code' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setManualMode(manualMode === 'code' ? 'auto' : 'code');
            }}
            title="Lock Code Matrix Mode"
          >
            <Code2 size={12} />
            <span>CODE</span>
          </button>
          <button 
            className={`mode-btn ${manualMode === 'photo' ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setManualMode(manualMode === 'photo' ? 'auto' : 'photo');
            }}
            title="Lock Real Photo Mode"
          >
            <Eye size={12} />
            <span>REAL</span>
          </button>
        </div>
      </div>
    </div>
  );
}
