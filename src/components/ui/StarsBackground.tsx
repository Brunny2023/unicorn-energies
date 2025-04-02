
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
      const starCount = Math.floor(window.innerWidth / 6); // More stars
      const newStars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 3 + 1, // Larger stars
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.7 + 0.3, // Higher opacity
          animationDelay: `${Math.random() * 3}s`, // Shorter delay
          animationDuration: `${Math.random() * 3 + 2}s`, // Faster animation
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
    <div className="fixed inset-0 z-0 bg-gradient-to-b from-unicorn-black to-unicorn-darkPurple">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-unicorn-purple/20 via-transparent to-transparent animate-pulse-glow"></div>
      
      {/* Shooting stars */}
      <div className="absolute w-full h-full overflow-hidden">
        <span className="shooting-star"></span>
        <span className="shooting-star" style={{ animationDelay: '1.5s' }}></span>
        <span className="shooting-star" style={{ animationDelay: '3s' }}></span>
      </div>
      
      {/* Stars */}
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
      
      {/* Larger glowing orbs */}
      <div className="absolute w-32 h-32 rounded-full bg-unicorn-gold/10 blur-xl top-1/4 left-1/4 animate-pulse-glow"></div>
      <div className="absolute w-24 h-24 rounded-full bg-unicorn-purple/20 blur-xl top-3/4 right-1/4 animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Radial glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-unicorn-purple/5 to-transparent"></div>
    </div>
  );
};

export default StarsBackground;
