import React from 'react';
import { ArrowLeft, ShieldCheck, Star } from 'lucide-react';

interface ConciergePageProps {
  onBack: () => void;
  content: any;
}

const ConciergePage: React.FC<ConciergePageProps> = ({ onBack, content }) => {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[#c5a059] uppercase tracking-[0.3em] text-[10px] font-bold mb-16 hover:translate-x-[-8px] transition-transform group"
        >
          <ArrowLeft size={16} className="group-hover:text-white transition-colors" /> Back to Legacy
        </button>

        <div className="text-center mb-24 animate-fadeInUp">
          <div className="flex items-center justify-center gap-3 mb-6">
            <ShieldCheck className="text-[#c5a059]" size={24} />
            <span className="text-[#c5a059] uppercase tracking-[0.5em] text-[10px] font-bold">The Bespoke Standard</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-[#c5a059] mb-8">
            {content.title}
          </h1>
          <div className="w-24 h-[1px] bg-[#c5a059]/30 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24 animate-fadeInUp delay-200">
          {content.pillars.map((pillar: any, index: number) => (
            <div key={index} className="relative group">
              <div className="absolute -top-12 -left-6 text-9xl font-serif text-[#c5a059]/5 italic group-hover:text-[#c5a059]/10 transition-colors select-none">
                0{index + 1}
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <Star size={14} className="text-[#c5a059] animate-pulse" />
                  <h3 className="text-2xl md:text-4xl font-serif text-[#c5a059] leading-tight">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-stone-300 text-lg font-light leading-relaxed pl-8 border-l border-[#c5a059]/10 group-hover:border-[#c5a059]/40 transition-all duration-1000">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 glass-panel rounded-3xl text-center border-[#c5a059]/20 animate-fadeInUp delay-300">
          <h4 className="text-[#c5a059] font-serif text-3xl mb-6 italic">A personal jeweller for every guest.</h4>
          <p className="text-stone-400 font-light mb-10 max-w-xl mx-auto">
            Our concierge team is available 24/7 to transform the impossible into the unforgettable. 
            From private desert landing strips to midnight museum access.
          </p>
          <a 
            href="#booking" 
            onClick={(e) => {
              e.preventDefault();
              onBack();
              setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}
            className="inline-block px-12 py-5 bg-stone-900 border border-[#c5a059]/30 text-[#c5a059] font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-[#c5a059] hover:text-black transition-all"
          >
            Access Concierge
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConciergePage;