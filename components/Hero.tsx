
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  content: any;
  updateContent: (path: string, value: string) => void;
  isAdminMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ content, updateContent, isAdminMode }) => {
  const editableClass = isAdminMode ? "outline-none ring-1 ring-teal-500 rounded p-1" : "";

  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background with Parallax effect via CSS */}
      <div className="absolute inset-0 z-0 scale-110">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] ease-out"
          style={{ backgroundImage: `url(${content.backgroundImage})` }}
        ></div>
        {/* Multi-layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-brightness-75"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="mb-8 flex justify-center animate-fadeInUp">
           <div className="w-16 h-[2px] bg-[#c5a059]"></div>
        </div>
        
        <p className="text-[#c5a059] uppercase tracking-[0.7em] mb-8 text-[10px] md:text-xs font-bold animate-fadeInUp">
          Grand Egyptian Mastery
        </p>
        
        <h1 
          contentEditable={isAdminMode}
          onBlur={(e) => updateContent('hero.title', e.currentTarget.textContent || '')}
          suppressContentEditableWarning
          className={`text-6xl md:text-9xl font-serif text-white mb-10 leading-[0.9] tracking-tighter animate-fadeInUp delay-100 ${editableClass}`}
        >
          {content.title}
        </h1>
        
        <p 
          contentEditable={isAdminMode}
          onBlur={(e) => updateContent('hero.subtitle', e.currentTarget.textContent || '')}
          suppressContentEditableWarning
          className={`text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-16 font-light leading-relaxed animate-fadeInUp delay-200 opacity-90 ${editableClass}`}
        >
          {content.subtitle}
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center animate-fadeInUp delay-300">
          <a href="#booking" className="group relative px-16 py-5 overflow-hidden transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a717e] to-[#0f4e57] transition-all duration-500 group-hover:scale-105"></div>
            <span className="relative text-white font-semibold tracking-[0.3em] uppercase text-xs">Enquire Now</span>
          </a>
          
          <a href="#services" className="px-16 py-5 border border-white/20 text-white hover:bg-white/5 backdrop-blur-md transition-all duration-500 font-semibold tracking-[0.3em] uppercase text-xs">
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
