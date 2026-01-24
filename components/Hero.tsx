
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  content: any;
}

const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 scale-110">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] ease-out"
          style={{ backgroundImage: `url(${content.backgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-black/10 backdrop-brightness-90"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <p className="text-[#c5a059] uppercase tracking-[0.7em] mt-24 mb-8 text-[10px] md:text-xs font-bold animate-fadeInUp">
          Grand Egyptian Mastery
        </p>
        
        <h1 className="text-6xl md:text-9xl font-serif text-[#c5a059] mb-10 leading-[0.9] tracking-tighter animate-fadeInUp delay-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          {content.title}
        </h1>
        
        <p className="text-lg md:text-xl text-stone-100 max-w-2xl mx-auto mb-16 font-light leading-relaxed animate-fadeInUp delay-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {content.subtitle}
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center animate-fadeInUp delay-300">
          <a href="#booking" className="group relative px-16 py-5 overflow-hidden transition-all duration-500 shadow-lg gold-glow">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059] to-[#8d6e35] transition-all duration-500 group-hover:scale-105"></div>
            <span className="relative text-black font-bold tracking-[0.3em] uppercase text-xs">Inquire Now</span>
          </a>
          
          <a href="#services" className="px-16 py-5 border border-[#c5a059]/30 text-white hover:bg-[#c5a059]/10 backdrop-blur-md transition-all duration-500 font-semibold tracking-[0.3em] uppercase text-xs">
            Our Legacy
          </a>
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/40 animate-bounce transition-colors hover:text-[#c5a059]">
        <ChevronDown size={32} strokeWidth={1} />
      </div>
    </section>
  );
};

export default Hero;
