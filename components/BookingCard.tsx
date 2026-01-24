
import React from 'react';
import { Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';

interface BookingCardProps {
  content: any;
}

const BookingCard: React.FC<BookingCardProps> = ({ content }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('client-name');
    const email = formData.get('client-email');
    const nature = formData.get('inquiry-nature');
    const vision = formData.get('project-vision');

    const subject = encodeURIComponent(`New Luxury Inquiry: ${name}`);
    const body = encodeURIComponent(
      `Nature of Inquiry: ${nature}\n\nClient Name: ${name}\nClient Email: ${email}\n\nProject Vision:\n${vision}\n\nSent from GEM Events Web Portal`
    );

    // This triggers the user's email client to send the data to the specified address
    window.location.href = `mailto:info@gem-events.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="booking" className="relative py-24 md:py-48 overflow-hidden bg-black">
      <div className="absolute top-0 right-0 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#c5a059]/5 blur-[100px] md:blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-16 lg:gap-24">
          
          <div className="flex-[0.8] flex flex-col justify-center text-left">
            <span className="text-[#c5a059] uppercase tracking-[0.5em] text-[10px] font-bold mb-8 block">Global Concierge</span>
            <h2 className="text-4xl md:text-7xl font-serif text-[#c5a059] mb-8 md:mb-10 leading-tight">
              {content.title}
            </h2>
            <p className="text-stone-400 text-lg md:text-xl mb-12 md:mb-16 font-light leading-relaxed max-w-xl">
              {content.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 border-t border-white/10 pt-12 md:pt-16">
              <div className="space-y-2">
                <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">Private Office</p>
                <a href={`tel:${content.phone}`} className="text-white text-lg font-light hover:text-[#c5a059] transition-colors tracking-wide">
                  {content.phone}
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">Email Inquiry</p>
                <a href={`mailto:${content.email}`} className="text-white text-lg font-light hover:text-[#c5a059] transition-colors tracking-wide">
                  {content.email}
                </a>
              </div>
            </div>

            <div className="mt-12">
              <a 
                href={`https://wa.me/${content.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-8 py-4 border border-[#c5a059]/30 rounded-full text-[#c5a059] hover:bg-[#c5a059]/10 transition-all group shadow-xl"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Start WhatsApp Chat</span>
              </a>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative h-full p-[1px] rounded-3xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059]/40 via-transparent to-[#c5a059]/40"></div>
              
              <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-[40px] p-8 md:p-16 rounded-3xl flex flex-col">
                <div className="mb-10 text-center">
                  <h3 className="text-2xl md:text-3xl font-serif text-[#c5a059] mb-4">Initial Consultation</h3>
                  <div className="w-12 h-[1px] bg-[#c5a059] mx-auto"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2 group">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 group-focus-within:text-[#c5a059] transition-colors">Client Name</label>
                      <input name="client-name" type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#c5a059] outline-none transition-all placeholder:text-stone-700" required />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[10px] uppercase tracking-widest text-stone-500 group-focus-within:text-[#c5a059] transition-colors">Email Address</label>
                      <input name="client-email" type="email" placeholder="client@example.com" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:border-[#c5a059] outline-none transition-all placeholder:text-stone-700" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500">Nature of Inquiry</label>
                    <select name="inquiry-nature" className="w-full bg-transparent border-b border-white/20 py-4 text-stone-400 focus:text-white outline-none cursor-pointer">
                      <option className="bg-stone-900" value="Private Retreat">Private Retreat</option>
                      <option className="bg-stone-900" value="Corporate Incentive">Corporate Incentive</option>
                      <option className="bg-stone-900" value="Leisure Expedition">Leisure Expedition</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500">Project Vision</label>
                    <textarea name="project-vision" rows={3} placeholder="Tell us about your vision..." className="w-full bg-transparent border-b border-white/20 py-4 text-white focus:border-[#c5a059] outline-none transition-all resize-none placeholder:text-stone-700"></textarea>
                  </div>

                  <div className="pt-8">
                    <button type="submit" className="w-full bg-[#c5a059] text-black font-bold h-16 rounded-lg flex items-center justify-center gap-3 group/submit hover:bg-[#d4b47a] transition-all gold-glow">
                      <span className="uppercase tracking-[0.4em] text-xs">Send Inquiry</span>
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    <p className="text-[8px] text-stone-600 mt-4 text-center uppercase tracking-widest">A concierge will contact you within 24 hours</p>
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
