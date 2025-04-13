
import React, { useEffect, useRef } from "react";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 200,
  bgColor = "#ffffff",
  fgColor = "#000000"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!value) return;
    
    // Simple QR code drawing using canvas (in a real app, use a proper QR code library)
    const drawQrPlaceholder = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set canvas dimensions
      canvas.width = size;
      canvas.height = size;
      
      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, size, size);
      
      // Draw border
      ctx.strokeStyle = fgColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, size - 20, size - 20);
      
      // Draw position detection patterns (corners)
      const drawPositionPattern = (x: number, y: number) => {
        ctx.fillStyle = fgColor;
        // Outer square
        ctx.fillRect(x, y, 30, 30);
        // Inner white square
        ctx.fillStyle = bgColor;
        ctx.fillRect(x + 5, y + 5, 20, 20);
        // Inner black square
        ctx.fillStyle = fgColor;
        ctx.fillRect(x + 10, y + 10, 10, 10);
      };
      
      // Top-left corner
      drawPositionPattern(20, 20);
      // Top-right corner
      drawPositionPattern(size - 50, 20);
      // Bottom-left corner
      drawPositionPattern(20, size - 50);
      
      // Draw some fake QR code patterns
      ctx.fillStyle = fgColor;
      for (let i = 0; i < 20; i++) {
        const x = Math.floor(Math.random() * (size - 60)) + 30;
        const y = Math.floor(Math.random() * (size - 60)) + 30;
        const w = Math.floor(Math.random() * 10) + 5;
        const h = Math.floor(Math.random() * 10) + 5;
        ctx.fillRect(x, y, w, h);
      }
      
      // Draw some horizontal lines
      for (let i = 0; i < 5; i++) {
        const y = Math.floor(Math.random() * (size - 80)) + 40;
        ctx.fillRect(30, y, size - 60, 3);
      }
      
      // Draw some vertical lines
      for (let i = 0; i < 5; i++) {
        const x = Math.floor(Math.random() * (size - 80)) + 40;
        ctx.fillRect(x, 30, 3, size - 60);
      }
    };
    
    drawQrPlaceholder();
  }, [value, size, bgColor, fgColor]);
  
  return (
    <div className="rounded-lg overflow-hidden bg-white">
      <canvas ref={canvasRef} width={size} height={size} />
    </div>
  );
};

export default QRCodeDisplay;
