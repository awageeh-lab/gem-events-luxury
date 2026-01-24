import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StickySection from './components/StickySection';
import BookingCard from './components/BookingCard';
import Footer from './components/Footer';
import AIPlanner from './components/AIPlanner';
import AdminPanel from './components/AdminPanel';
import ExperiencePage from './components/ExperiencePage';
import JourneysPage from './components/JourneysPage';
import ConciergePage from './components/ConciergePage';
import { siteContent as initialContent } from './config/siteContent';

export type AppView = 'home' | 'experience' | 'journeys' | 'concierge';

const App: React.FC = () => {
  const [content, setContent] = useState(initialContent);
  const [isAdminMode, setAdminMode] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [currentView, setCurrentView] = useState<AppView>('home');

  useEffect(() => {
    // Versioning helps clear old storage for production updates
    const CURRENT_VERSION = 'gem_final_master_v9.0';
    const savedVersion = localStorage.getItem('gem_app_version');
    
    if (savedVersion !== CURRENT_VERSION) {
      localStorage.clear(); 
      localStorage.setItem('gem_app_version', CURRENT_VERSION);
      localStorage.setItem('gem_persistence_v3', JSON.stringify(initialContent));
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

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['experience', 'journeys', 'concierge'].includes(hash)) {
        setCurrentView(hash as AppView);
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash(); 
    return () => window.removeEventListener('hashchange', handleHash);
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

  const renderCurrentView = () => {
    switch (currentView) {
      case 'experience':
        return <ExperiencePage onBack={() => window.location.hash = ''} />;
      case 'journeys':
        return <JourneysPage onBack={() => window.location.hash = ''} content={content.globalExperience} stickyContent={content.stickySection} />;
      case 'concierge':
        return <ConciergePage onBack={() => window.location.hash = ''} content={content.concierge} />;
      case 'home':
      default:
        return (
          <main className="animate-fadeIn">
            <Hero content={content.hero} />
            
            <section id="services" className="py-32 bg-black relative">
              <div className="container mx-auto px-6 text-center">
                <span className="text-[#c5a059] uppercase tracking-[0.4em] text-xs mb-6 block font-bold animate-fadeInUp">
                  {content.philosophy.badge}
                </span>
                <h2 className="text-5xl md:text-7xl font-serif text-[#c5a059] mb-10 leading-tight animate-fadeInUp delay-100">
                  {content.philosophy.title}
                </h2>
                <div className="max-w-3xl mx-auto animate-fadeInUp delay-200">
                  <p className="text-xl md:text-2xl text-stone-400 font-light leading-relaxed">
                    {content.philosophy.mainText}
                  </p>
                </div>
              </div>
            </section>

            {/* Rendering all Egypt itineraries consecutively on the home page */}
            <div className="space-y-0">
              <StickySection content={content.stickySection} startIndex={0} />
              {content.stickySection2 && (
                <StickySection content={content.stickySection2} startIndex={content.stickySection.items.length} />
              )}
            </div>
            
            <div id="booking" className="scroll-mt-32">
              <BookingCard content={content.booking} />
            </div>

            <AIPlanner />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen selection:bg-[#c5a059]/30 selection:text-[#c5a059] bg-black">
      <Navbar 
        logoUrl={content.brand.logoUrl} 
        onNavigate={(view) => window.location.hash = view} 
        currentView={currentView}
      />
      
      {renderCurrentView()}

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