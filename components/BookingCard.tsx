
import React, { useState } from 'react';
import { Send, Star, User, Phone, Mail, ArrowRight } from 'lucide-react';

interface BookingCardProps {
  content: any;
  updateContent: (path: string, value: string) => void;
  isAdminMode: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({ content, updateContent, isAdminMode }) => {
  const [formData, setFormData] = useState({ name: '', email: '', type: 'Private Retreat', details: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Inquiry Received. A member of our Senior Concierge team will contact you shortly.");
  };

  const editableClass = isAdminMode ? "outline-none ring-1 ring-teal-500 rounded p-1" : "";

  return (
    <section id="booking" className="relative py-48 overflow-hidden bg-black">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1a717e]/10 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#c5a059]/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-24">
          
          <div className="flex-[0.8] flex flex-col justify-center text-left">
            <span className="text-[#c5a059] uppercase tracking-[0.5em] text-[10px] font-bold mb-8 block">Global Concierge</span>
            <h2 
              contentEditable={isAdminMode}
              onBlur={(e) => updateContent('booking.title', e.currentTarget.textContent || '')}
              suppressContentEditableWarning
              className={`text-5xl md:text-7xl font-serif text-white mb-10 leading-tight ${editableClass}`}
            >
              {content.title}
            </h2>
            <p 
              contentEditable={isAdminMode}
              onBlur={(e) => updateContent('booking.description', e.currentTarget.textContent || '')}
              suppressContentEditableWarning
              className={`text-stone-400 text-xl mb-16 font-light leading-relaxed max-w-xl ${editableClass}`}
            >
              {content.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
              <div className="space-y-2">
                <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">Private Office</p>
                <p className="text-white text-lg font-light">+20 (100) GEM-EXP</p>
              </div>
              <div className="space-y-2">
                <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">Email Inquiry</p>
                <p className="text-white text-lg font-light">luxury@gem-events.com</p>
              </div>
            </div>
          </div>

          {/* Luxury Glassmorphism Form */}
          <div className="flex-1">
            <div className="relative h-full p-[1px] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              {/* Animated Border Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/40 via-transparent to-[#1a717e]/40"></div>
              
              <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-[40px] p-10 md:p-16 rounded-3xl flex flex-col">
                <div className="mb-12 text-center">
                  <h3 className="text-3xl font-serif text-white mb-4">Initial Consultation</h3>
                  <div className="w-12 h-[1px] bg-[#c5a059] mx-auto"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 group-focus-within:text-[#c5a059] transition-colors">Client Name</label>
                      <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#c5a059] outline-none transition-all placeholder:text-stone-700" required />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 group-focus-within:text-[#c5a059] transition-colors">Email Address</label>
                      <input type="email" placeholder="client@example.com" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#c5a059] outline-none transition-all placeholder:text-stone-700" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500">Nature of Inquiry</label>
                    <select className="w-full bg-transparent border-b border-white/20 py-4 text-stone-400 focus:text-white outline-none cursor-pointer">
                      <option className="bg-stone-900">Private Retreat</option>
                      <option className="bg-stone-900">Corporate Incentive</option>
                      <option className="bg-stone-900">Leisure Expedition</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500">Project Vision</label>
                    <textarea rows={3} placeholder="Tell us about the scale and location of your vision..." className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#c5a059] outline-none transition-all resize-none placeholder:text-stone-700"></textarea>
                  </div>

                  <div className="pt-8">
                    <button type="submit" className="w-full bg-[#c5a059] text-black font-bold h-16 rounded-lg flex items-center justify-center gap-3 group/submit hover:bg-[#d4b47a] transition-all">
                      <span className="uppercase tracking-[0.4em] text-xs">Send Inquiry</span>
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingCard;
