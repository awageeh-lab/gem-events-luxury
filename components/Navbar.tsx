import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { AppView } from '../App';

interface NavbarProps {
  logoUrl: string;
  onNavigate?: (view: AppView) => void;
  currentView?: AppView;
}

const Navbar: React.FC<NavbarProps> = ({ logoUrl, onNavigate, currentView = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navigateTo = (view: AppView) => {
    window.location.hash = view;
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const scrollToBooking = () => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'home') {
      window.location.hash = '';
      setTimeout(() => {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-1000 ${isScrolled || currentView !== 'home' ? 'bg-black/95 backdrop-blur-xl py-3 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" onClick={handleLogoClick} className="block transition-transform hover:scale-105 duration-700">
            <Logo src={logoUrl} className={isScrolled ? "h-16 md:h-20" : "h-24 md:h-32"} />
          </a>
        </div>

        <div className="hidden md:flex items-center gap-12 text-[11px] font-bold tracking-[0.4em] uppercase text-stone-300">
          <button 
            onClick={() => navigateTo('experience')} 
            className={`hover:text-[#c5a059] transition-colors cursor-pointer tracking-[0.5em] ${currentView === 'experience' ? 'text-[#c5a059]' : ''}`}
          >
            Experience
          </button>
          <button 
            onClick={() => navigateTo('journeys')} 
            className={`hover:text-[#c5a059] transition-colors cursor-pointer tracking-[0.5em] ${currentView === 'journeys' ? 'text-[#c5a059]' : ''}`}
          >
            Journeys
          </button>
          <button 
            onClick={() => navigateTo('concierge')} 
            className={`hover:text-[#c5a059] transition-colors cursor-pointer tracking-[0.5em] ${currentView === 'concierge' ? 'text-[#c5a059]' : ''}`}
          >
            Concierge
          </button>
          <button 
            onClick={scrollToBooking}
            className="px-10 py-3 bg-gradient-to-r from-[#c5a059]/10 to-[#8d6e35]/20 border border-[#c5a059]/50 text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-700 font-bold tracking-[0.3em] rounded-sm shadow-lg"
          >
            INQUIRE
          </button>
        </div>

        <button className="md:hidden text-white p-2 z-[70] transition-colors hover:text-[#c5a059]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-stone-950 z-[65] flex flex-col items-center justify-center gap-12 animate-fadeIn">
          <button onClick={() => navigateTo('experience')} className="text-3xl font-serif text-[#c5a059] tracking-[0.2em] uppercase">Experience</button>
          <button onClick={() => navigateTo('journeys')} className="text-3xl font-serif text-[#c5a059] tracking-[0.2em] uppercase">Journeys</button>
          <button onClick={() => navigateTo('concierge')} className="text-3xl font-serif text-[#c5a059] tracking-[0.2em] uppercase">Concierge</button>
          <button 
            onClick={scrollToBooking}
            className="text-2xl font-bold text-[#c5a059] border border-[#c5a059]/30 px-12 py-4 rounded-sm uppercase tracking-widest bg-stone-900"
          >
            INQUIRE
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;