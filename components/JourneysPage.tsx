import React, { useState } from 'react';
import { ArrowLeft, Globe, Compass, Play } from 'lucide-react';

interface JourneysPageProps {
  onBack: () => void;
  content: any;
  stickyContent: any;
}

const JourneysPage: React.FC<JourneysPageProps> = ({ onBack, content, stickyContent }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="pt-40 pb-32 min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[#c5a059] uppercase tracking-[0.3em] text-[10px] font-bold mb-16 hover:translate-x-[-8px] transition-transform group"
        >
          <ArrowLeft size={16} className="group-hover:text-white transition-colors" /> Return to Legacy
        </button>

        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6 animate-fadeInUp">
            <Globe className="text-[#c5a059]" size={24} />
            <span className="text-[#c5a059] uppercase tracking-[0.6em] text-[10px] font-bold">The Global Legacy</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-[#c5a059] mb-10 animate-fadeInUp delay-100">
            {content.title}
          </h1>
          <p className="text-stone-400 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed animate-fadeInUp delay-200">
            {content.subtitle}
          </p>
        </div>

        {/* Global Video Section */}
        <div className="relative group rounded-3xl overflow-hidden shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] border border-[#c5a059]/20 bg-stone-900/50 aspect-video w-full mb-32 animate-fadeInUp delay-300">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-950 z-10 transition-opacity duration-1000">
              <div className="w-16 h-16 border-t-2 border-[#c5a059] rounded-full animate-spin"></div>
            </div>
          )}

          <iframe 
            src={content.videoUrl} 
            className="absolute inset-0 w-full h-full" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
            frameBorder="0"
            onLoad={() => setIsLoaded(true)}
          ></iframe>
        </div>

        <div className="text-center mb-16">
          <span className="text-[#c5a059] uppercase tracking-[0.5em] text-[10px] font-bold">Curated Itineraries</span>
          <div className="w-12 h-[1px] bg-[#c5a059]/30 mx-auto mt-6"></div>
        </div>

        {/* Itinerary Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {stickyContent.items.map((item: any, idx: number) => (
            <div key={idx} className="group glass-panel p-12 rounded-3xl hover:border-[#c5a059]/40 transition-all duration-700 hover-lift">
               <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <Compass size={24} className="text-[#c5a059] opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[#c5a059] text-[10px] uppercase tracking-widest font-bold">{item.location}</span>
                </div>
                <span className="text-[#c5a059]/10 font-serif text-5xl italic group-hover:text-[#c5a059]/20 transition-colors">0{idx + 1}</span>
               </div>
               <h3 className="text-3xl font-serif text-[#c5a059] mb-8">{item.title}</h3>
               <p className="text-stone-400 font-light leading-relaxed mb-10 text-lg">{item.description}</p>
               <button className="text-white text-[10px] uppercase tracking-[0.5em] font-bold flex items-center gap-4 group/btn">
                  INQUIRE <div className="w-10 h-[1px] bg-[#c5a059] transition-all group-hover/btn:w-20"></div>
               </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JourneysPage;