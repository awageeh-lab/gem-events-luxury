
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StickySection from './components/StickySection';
import BookingCard from './components/BookingCard';
import Footer from './components/Footer';
import AIPlanner from './components/AIPlanner';
import AdminPanel from './components/AdminPanel';
import { siteContent as initialContent } from './config/siteContent';

const App: React.FC = () => {
  const [content, setContent] = useState(initialContent);
  const [isAdminMode, setAdminMode] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    const CURRENT_VERSION = 'gem_v2.6_stable';
    const savedVersion = localStorage.getItem('gem_app_version');
    
    if (savedVersion !== CURRENT_VERSION) {
      // Clear old data safely
      localStorage.clear(); 
      localStorage.setItem('gem_app_version', CURRENT_VERSION);
      localStorage.setItem('gem_persistence_v3', JSON.stringify(initialContent));
      
      // We don't reload immediately to prevent potential loops
      setContent(initialContent);
      setLastSaved(new Date());
    } else {
      const saved = localStorage.getItem('gem_persistence_v3');
      if (saved) {
        try {
          setContent(JSON.parse(saved));
          setLastSaved(new Date());
        } catch (e) {
          console.error("Failed to parse saved content", e);
          setContent(initialContent);
        }
      }
    }
  }, []);

  const handleUpdate = (newContent: any) => {
    setContent(newContent);
    setLastSaved(new Date());
  };

  const handleReset = () => {
    if (window.confirm("Reset all changes to factory defaults?")) {
      localStorage.removeItem('gem_persistence_v3');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#c5a059]/30 selection:text-[#c5a059] bg-black">
      <Navbar logoUrl={content.brand.logoUrl} />
      
      <main>
        <Hero content={content.hero} />
        
        <section id="services" className="py-32 bg-black relative">
          <div className="container mx-auto px-6 text-center">
            <span className="text-[#c5a059] uppercase tracking-[0.4em] text-xs mb-6 block font-bold">
              {content.philosophy.badge}
            </span>
            
            <h2 className="text-5xl md:text-7xl font-serif text-[#c5a059] mb-10 leading-tight">
              {content.philosophy.title}
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-stone-400 font-light leading-relaxed">
                {content.philosophy.mainText}
              </p>
            </div>
          </div>
        </section>

        <StickySection content={content.stickySection} />
        <AIPlanner />
        <BookingCard content={content.booking} />
      </main>

      <Footer logoUrl={content.brand.logoUrl} content={content.footer} />

      <AdminPanel 
        content={content} 
        onUpdate={handleUpdate}
        isAdminMode={isAdminMode}
        setAdminMode={setAdminMode}
        onReset={handleReset}
        lastSaved={lastSaved}
      />
    </div>
  );
};

export default App;
