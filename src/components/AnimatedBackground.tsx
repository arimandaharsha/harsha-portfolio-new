'use client';

import React, { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Predefined shooting stars
    const shootingStars = [
      { x: 100, y: 100, dx: 2, dy: 1, length: 180, opacity: 0.5 },
      { x: 600, y: 200, dx: 1.5, dy: 1, length: 140, opacity: 0.4 },
      { x: 900, y: 400, dx: 2.2, dy: 1.2, length: 200, opacity: 0.6 },
      { x: 300, y: 600, dx: 1.8, dy: 0.8, length: 160, opacity: 0.5 },
      { x: 1200, y: 300, dx: 2.1, dy: 1.1, length: 170, opacity: 0.5 },
    ];

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, width, height);
      // Draw shooting stars
      shootingStars.forEach(star => {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length * 0.2);
        ctx.stroke();
        ctx.restore();
        // Animate
        star.x += star.dx;
        star.y += star.dy;
        if (star.x > width || star.y > height) {
          star.x = Math.random() * width * 0.5;
          star.y = Math.random() * height * 0.5;
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }} />
  );
} 