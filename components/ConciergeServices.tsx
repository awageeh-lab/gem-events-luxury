import React from 'react';

interface ConciergeServicesProps {
  content: any;
}

const ConciergeServices: React.FC<ConciergeServicesProps> = ({ content }) => {
  if (!content) return null;

  return (
    <section className="bg-black py-24 md:py-32 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <span className="text-[#c5a059] uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">
            The Bespoke Standard
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[#c5a059] mb-8">
            {content.title}
          </h2>
          <div className="w-20 h-[1px] bg-[#c5a059]/30 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {content.pillars.map((pillar: any, index: number) => (
            <div key={index} className="group">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-[#c5a059]/20 font-serif text-4xl italic group-hover:text-[#c5a059]/40 transition-colors">
                  0{index + 1}
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-[#c5a059] leading-snug">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-stone-400 text-base md:text-lg font-light leading-relaxed pl-12 border-l border-[#c5a059]/10 group-hover:border-[#c5a059]/40 transition-all duration-700">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConciergeServices;