import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Utensils, Users, ExternalLink, Heart } from 'lucide-react';

interface ExperiencePageProps {
  onBack: () => void;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ onBack }) => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-black text-white flex flex-col items-center">
      <div className="container mx-auto px-6 max-w-6xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[#c5a059] uppercase tracking-[0.3em] text-[10px] font-bold mb-12 hover:translate-x-[-8px] transition-transform group"
        >
          <ArrowLeft size={16} className="group-hover:text-white transition-colors" /> Return to Legacy
        </button>

        {/* Section 1: Corporate Events */}
        <VideoSection 
          icon={<Sparkles size={20} />}
          title="Corporate Productions"
          description="From high-level board summits to massive global congresses. We carve bespoke environments that reflect your corporate prestige, regardless of scale or complexity."
          videoUrl="https://drive.google.com/file/d/1rORi-nXbW-TyyczsJ0OtUP6iuJyx5k1d/preview"
          directUrl="https://drive.google.com/file/d/1rORi-nXbW-TyyczsJ0OtUP6iuJyx5k1d/view"
        />

        <Divider />

        {/* Section 2: Social Dining */}
        <VideoSection 
          icon={<Utensils size={20} />}
          title="Bespoke Social Dining"
          description="Crafting memories through the lens of gastronomy and atmosphere. A private river cruise at sunset is the canvas for an unforgettable evening."
          videoUrl="https://drive.google.com/file/d/1ajtESO9YjMQEvXSPFrU-50gMmC1OHBui/preview"
          directUrl="https://drive.google.com/file/d/1ajtESO9YjMQEvXSPFrU-50gMmC1OHBui/view"
        />

        <Divider />

        {/* Section 3: Team Building */}
        <VideoSection 
          icon={<Users size={20} />}
          title="Strategic Team Building"
          description="Performance is built on connection. Our customized activities bridge gaps and strengthen bonds, whether in the boardroom or on the coast."
          videoUrl="https://drive.google.com/file/d/1QopSAqhBd2xcrpwgRVUvWIbvo0vBhoDf/preview"
          directUrl="https://drive.google.com/file/d/1QopSAqhBd2xcrpwgRVUvWIbvo0vBhoDf/view"
        />

        <Divider />

        {/* Section 4: CSR */}
        <VideoSection 
          icon={<Heart size={20} />}
          title="CSR & Social Legacy"
          description="We are committed to giving back. GEM Events proudly supports meaningful charity initiatives that create lasting impact in our communities."
          videoUrl="https://drive.google.com/file/d/1sDljDlNidF-VItwm-iavy-miGWHY2gMP/preview"
          directUrl="https://drive.google.com/file/d/1sDljDlNidF-VItwm-iavy-miGWHY2gMP/view"
        />

        {/* Footer Action */}
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
              }, 150);
            }}
            className="px-16 py-6 bg-gradient-to-r from-[#c5a059] to-[#8d6e35] text-black font-bold uppercase tracking-[0.3em] text-[11px] hover:scale-105 transition-all gold-glow rounded-sm"
          >
            Initiate Your Vision
          </a>
        </div>
      </div>
    </div>
  );
};

const VideoSection = ({ icon, title, description, videoUrl, directUrl }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="mb-32 w-full animate-fadeInUp">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-[1px] bg-[#c5a059]/30"></div>
          <div className="text-[#c5a059]">{icon}</div>
          <div className="w-12 h-[1px] bg-[#c5a059]/30"></div>
        </div>
        <h2 className="text-5xl md:text-7xl font-serif text-[#c5a059] mb-8 leading-tight tracking-tight">
          {title}
        </h2>
        <p className="text-stone-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      </div>

      <div className="relative group rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-[#c5a059]/10 bg-stone-900/50 aspect-video w-full">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-10 transition-opacity duration-1000">
            <div className="w-12 h-12 border-t-2 border-[#c5a059] rounded-full animate-spin"></div>
          </div>
        )}

        <iframe 
          src={videoUrl} 
          className="absolute inset-0 w-full h-full" 
          allow="autoplay; encrypted-media" 
          allowFullScreen
          frameBorder="0"
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </div>

      <div className="flex flex-col items-center mt-8">
        <a 
          href={directUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group/link flex items-center gap-3 px-6 py-3 border border-[#c5a059]/20 rounded-full text-[#c5a059] hover:bg-[#c5a059]/10 transition-all text-[10px] uppercase tracking-[0.3em] font-bold"
        >
          <ExternalLink size={14} className="group-hover/link:translate-x-1 transition-transform" />
          View Cinematics in HD
        </a>
      </div>
    </div>
  );
};

const Divider = () => (
  <div className="flex justify-center mb-32">
    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent"></div>
  </div>
);

export default ExperiencePage;