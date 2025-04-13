
import { useEffect, useState } from 'react';

type Star = {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDelay: string;
  animationDuration: string;
};

const StarsBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      // Reduce star count slightly to improve performance
      const starCount = Math.floor(window.innerWidth / 8);
      const newStars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 2.5 + 0.5, // Slightly smaller stars
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.6 + 0.2, // Lower opacity
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${Math.random() * 3 + 1.5}s`,
        });
      }

      setStars(newStars);
    };

    generateStars();
    window.addEventListener('resize', generateStars);
    
    return () => {
      window.removeEventListener('resize', generateStars);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-unicorn-black to-unicorn-darkPurple">
      {/* Animated gradient overlay - using inline styling to avoid external resources */}
      <div className="absolute inset-0 bg-gradient-radial from-unicorn-purple/20 via-transparent to-transparent animate-pulse-glow"></div>
      
      {/* Shooting stars - reduced count and slowed down */}
      <div className="absolute w-full h-full overflow-hidden">
        <span className="shooting-star" style={{ animationDuration: '3.5s' }}></span>
        <span className="shooting-star" style={{ animationDelay: '2s', animationDuration: '3s' }}></span>
        <span className="shooting-star" style={{ animationDelay: '4s', animationDuration: '4s' }}></span>
      </div>
      
      {/* Stars with reduced visibility to avoid interference with text */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}
      
      {/* Reduced size and opacity of glowing orbs */}
      <div className="absolute w-24 h-24 rounded-full bg-unicorn-gold/5 blur-xl top-1/4 left-1/4 animate-pulse-glow" style={{ animationDuration: '4s' }}></div>
      <div className="absolute w-16 h-16 rounded-full bg-unicorn-purple/10 blur-xl top-3/4 right-1/4 animate-pulse-glow" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}></div>
    </div>
  );
};

export default StarsBackground;
