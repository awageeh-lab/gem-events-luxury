
import React from 'react';

interface LogoProps {
  src: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ src, className = "h-20" }) => {
  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <img 
        src={src} 
        alt="GEM Events Logo" 
        className="h-full w-auto object-contain transition-all duration-700 ease-in-out"
        onError={(e) => {
          // Fallback if image fails to load
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x160/000000/FFFFFF?text=GEM+EVENTS';
        }}
      />
    </div>
  );
};

export default Logo;
