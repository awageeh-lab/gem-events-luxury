import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface StickySectionProps {
  content: any;
  startIndex?: number;
}

const StickySection: React.FC<StickySectionProps> = ({ content, startIndex = 0 }) => {
  if (!content) return null;

  return (
    <section className="relative w-full">
      {/* Background Layer: Pinned to screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${content.backgroundImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-20"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-30 -mt-[100vh] pb-32">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="min-h-screen flex flex-col justify-center items-center text-center">
            <h2 className="text-5xl md:text-8xl font-serif text-[#c5a059] mb-8 tracking-tight drop-shadow-2xl">
              {content.title}
            </h2>
            <div className="w-16 h-[2px] bg-[#c5a059] mx-auto mb-8"></div>
            <p className="text-[#c5a059]/90 uppercase tracking-[0.4em] text-[10px] font-bold drop-shadow-lg">
              The Signature Collection
            </p>
          </div>

          <div className="space-y-48">
            {content.items.map((item: any, idx: number) => (
              <StickyItem 
                key={idx} 
                item={item} 
                idx={startIndex + idx} 
                fallbackImage={content.backgroundImage}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StickyItem = ({ item, idx, fallbackImage }: any) => {
  return (
    <div className="group relative glass-panel p-8 md:p-16 hover:border-[#c5a059]/40 transition-all duration-700 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
      {/* Watermark Number */}
      <div className="absolute -top-12 -left-4 md:-top-10 md:-left-10 opacity-10 group-hover:opacity-30 transition-opacity pointer-events-none">
        <span className="text-[120px] md:text-[180px] font-serif text-[#c5a059] leading-none select-none italic">
          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
        </span>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#c5a059]/10 rounded-full text-[#c5a059]">
              {idx % 2 === 0 ? <Sparkles size={18} /> : <Compass size={18} />}
            </div>
            <p className="text-[#c5a059] font-semibold tracking-[0.4em] uppercase text-[10px]">
              {item.location}
            </p>
          </div>

          <h3 className="text-3xl md:text-5xl font-serif text-[#c5a059]">
            {item.title}
          </h3>
          
          <p className="text-white text-base md:text-lg leading-relaxed font-light">
            {item.description}
          </p>
          
          <div className="pt-8">
            <button className="text-white text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-3 group/btn">
              Explore Journey <div className="w-8 h-[1px] bg-[#c5a059] transition-all group-hover/btn:w-16"></div>
            </button>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="aspect-video lg:aspect-[4/3] bg-stone-900 overflow-hidden rounded-xl shadow-2xl border border-white/10 group-hover:border-[#c5a059]/30 transition-all duration-700">
            <img 
              src={fallbackImage} 
              className="w-full h-full object-cover scale-150 grayscale group-hover:scale-110 group-hover:grayscale-0 transition-all duration-[3s]" 
              alt={item.title} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickySection;