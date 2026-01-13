
import React, { useState } from 'react';
import { Sparkles, Loader2, Wand2 } from 'lucide-react';
import { getEventSuggestions } from '../services/geminiService';

const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<any>(null);
  const [type, setType] = useState('Wedding');

  const handleGenerate = async () => {
    setLoading(true);
    const result = await getEventSuggestions(type, 100);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <section className="py-24 bg-stone-950 border-y border-teal-900/20">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="text-teal-400" />
          <h2 className="text-xs uppercase tracking-[0.4em] text-teal-400 font-bold">Gemini AI Concierge</h2>
        </div>
        <h3 className="text-4xl md:text-5xl font-serif text-white mb-8">Concept Generation</h3>
        <p className="text-stone-400 mb-12 max-w-xl mx-auto font-light">
          Harness the power of AI trained on premium Egyptian hospitality to draft your vision in seconds.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <select 
            className="bg-black border border-white/10 rounded-lg py-3 px-6 text-white min-w-[220px] focus:outline-none focus:border-teal-500 transition-all appearance-none text-sm tracking-widest uppercase font-semibold"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Wedding</option>
            <option>Corporate Retreat</option>
            <option>VIP Desert Tour</option>
            <option>Private Nile Cruise</option>
          </select>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-800 text-white font-bold uppercase tracking-[0.2em] text-xs hover:from-teal-500 hover:to-teal-700 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
            {loading ? 'Consulting Experts...' : 'Generate Itinerary'}
          </button>
        </div>

        {suggestion && (
          <div className="bg-black/80 backdrop-blur-xl border border-teal-500/20 p-8 md:p-12 text-left animate-fadeIn rounded-2xl shadow-2xl">
            <h4 className="text-teal-400 text-[10px] uppercase tracking-[0.4em] mb-3 font-bold">Theme Recommendation</h4>
            <h5 className="text-3xl font-serif text-white mb-4">{suggestion.themeName}</h5>
            <p className="text-amber-500/80 mb-8 font-light italic text-lg border-l-2 border-amber-500/30 pl-6">Venue: {suggestion.venue}</p>
            
            <div className="space-y-6 border-t border-white/5 pt-8">
              {suggestion.itinerary.map((item: any, i: number) => (
                <div key={i} className="flex gap-6 group">
                  <span className="text-teal-500/40 font-serif text-lg min-w-[90px] group-hover:text-teal-400 transition-colors">{item.time}</span>
                  <div>
                    <h6 className="text-white font-semibold mb-1 tracking-wide">{item.activity}</h6>
                    <p className="text-stone-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIPlanner;
