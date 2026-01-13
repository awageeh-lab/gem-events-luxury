
import React from 'react';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  logoUrl: string;
}

const Footer: React.FC<FooterProps> = ({ logoUrl }) => {
  return (
    <footer className="bg-black border-t border-stone-900 py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start max-w-[320px]">
            <Logo src={logoUrl} className="h-32 md:h-40 mb-8 grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer" />
            <p className="text-stone-500 text-[11px] tracking-[0.25em] uppercase leading-relaxed font-light">
              Premium Event Management & Global Bespoke Travel Concierge based in Egypt.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-12 text-stone-500">
              <Instagram size={24} className="cursor-pointer hover:text-teal-400 transition-all hover:scale-125" />
              <Linkedin size={24} className="cursor-pointer hover:text-teal-400 transition-all hover:scale-125" />
              <Twitter size={24} className="cursor-pointer hover:text-teal-400 transition-all hover:scale-125" />
            </div>
            <p className="text-stone-600 text-[10px] tracking-[0.5em] uppercase font-medium">
              &copy; 2024 GEM Events. Crafted for Distinction.
            </p>
          </div>

          <div className="hidden md:flex flex-col items-end gap-3 text-[10px] tracking-[0.3em] uppercase text-stone-500 font-bold">
            <a href="#" className="hover:text-amber-500 transition-colors duration-300">Legal Policy</a>
            <a href="#" className="hover:text-amber-500 transition-colors duration-300">Privacy Concierge</a>
            <a href="#" className="hover:text-amber-500 transition-colors duration-300">Partner Access</a>
          </div>
        </div>

        <div className="mt-24 text-center text-teal-900/10 text-[60px] md:text-[140px] font-serif font-bold pointer-events-none select-none whitespace-nowrap overflow-hidden leading-none italic tracking-tighter">
          GRAND EGYPTIAN MASTERY
        </div>
      </div>
    </footer>
  );
};

export default Footer;
