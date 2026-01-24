
import React, { useState, useEffect } from 'react';

interface LogoProps {
  src: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ src, className = "h-20" }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Re-initialize whenever the source URL changes
  useEffect(() => {
    if (src) {
      setError(false);
      setLoading(true);
    } else {
      setLoading(false);
      setError(true);
    }
  }, [src]);

  // Handle the text-based fallback when an image fails to load
  if ((!src || error) && !loading) {
    return (
      <div className={`flex flex-col items-center justify-center select-none ${className} min-w-[140px] animate-fadeIn`}>
        <div className="flex items-center gap-3">
           <div className="w-6 md:w-10 h-[1px] bg-[#c5a059]/40"></div>
           <span className="text-[#c5a059] font-serif text-3xl md:text-4xl tracking-[0.25em] font-bold leading-none">GEM</span>
           <div className="w-6 md:w-10 h-[1px] bg-[#c5a059]/40"></div>
        </div>
        <span className="text-stone-500 text-[7px] md:text-[9px] tracking-[0.6em] uppercase mt-2 font-bold">Events Management</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center select-none ${className} relative`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-5 h-5 border-2 border-[#c5a059]/20 border-t-[#c5a059] rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={src} 
        alt="GEM Events Logo" 
        className={`h-full w-auto object-contain transition-all duration-1000 ease-in-out ${loading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          console.warn("Logo failed to load from source:", src);
          setLoading(false);
          setError(true);
        }}
      />
    </div>
  );
};

export default Logo;
