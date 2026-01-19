import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface ExperiencePageProps {
  videoUrl?: string;
  title: string;
  description: string;
  onBack: () => void;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ videoUrl, onBack }) => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-black text-white flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-6xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[#c5a059] uppercase tracking-[0.3em] text-[10px] font-bold mb-12 hover:translate-x-[-8px] transition-transform"
        >
          <ArrowLeft size={16} /> Back to Legacy
        </button>

        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#c5a059]/40"></div>
            <Sparkles className="text-[#c5a059]" size={20} />
            <div className="w-12 h-[1px] bg-[#c5a059]/40"></div>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-[#c5a059] mb-8 leading-tight tracking-tight">
            Corporate Events
          </h1>
          <p className="text-stone-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            Whether you are making a board meeting or you have more than 1000 employee. Look at a tight budget or want Luxury, we can Carve something special for your corporate needs.
          </p>
        </div>

        {/* Cinematic Video Container */}
        <div className="relative group rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(197,160,89,0.2)] border border-[#c5a059]/20 bg-stone-900 aspect-video w-full">
          <iframe 
            src={videoUrl} 
            className="absolute inset-0 w-full h-full" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
            frameBorder="0"
          ></iframe>
          
          {/* Subtle Overlay to match theme if iframe hasn't loaded */}
          <div className="absolute inset-0 pointer-events-none border-[1px] border-[#c5a059]/10 rounded-3xl"></div>
        </div>

        <div className="mt-20 flex flex-col items-center">
          <div className="w-20 h-[1px] bg-[#c5a059] mb-12"></div>
          <p className="text-[#c5a059] uppercase tracking-[0.5em] text-[10px] font-bold mb-8">
            The Visionaries of GEM Events
          </p>
          <a 
            href="#booking" 
            onClick={(e) => { 
              e.preventDefault();
              onBack();
              setTimeout(() => {
                const element = document.getElementById('booking');
                element?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="px-12 py-5 bg-gradient-to-r from-[#c5a059] to-[#8d6e35] text-black font-bold uppercase tracking-[0.3em] text-xs hover:scale-105 transition-all gold-glow rounded-sm"
          >
            Craft Your Experience
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;