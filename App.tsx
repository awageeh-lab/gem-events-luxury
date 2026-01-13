
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
  // Initialize state with safety try-catch
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('gem_persistence_v1');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load saved content, using defaults", e);
    }
    return initialContent;
  });

  const [isAdminMode, setAdminMode] = useState(false);

  // Load configuration from URL if it exists (Overwrites local storage for sharing)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const configParam = params.get('config');
    if (configParam) {
      try {
        const decodedConfig = JSON.parse(decodeURIComponent(escape(atob(configParam))));
        setContent(decodedConfig);
        console.log("Loaded shared configuration from URL");
      } catch (e) {
        console.error("Failed to parse shared configuration", e);
      }
    }
  }, []);

  // Safe persistence to local storage
  useEffect(() => {
    try {
      localStorage.setItem('gem_persistence_v1', JSON.stringify(content));
    } catch (e) {
      console.error("Storage limit reached. Try using smaller images.", e);
      // We don't alert here to avoid spamming the user, but we keep the app running
    }
  }, [content]);

  const updateContent = (path: string, value: string) => {
    try {
      const newContent = JSON.parse(JSON.stringify(content));
      const keys = path.split('.');
      let current = newContent;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      setContent(newContent);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all changes to factory defaults? This cannot be undone.")) {
      localStorage.removeItem('gem_persistence_v1');
      window.location.search = ''; 
      window.location.reload();
    }
  };

  const editableClass = isAdminMode ? "outline-none ring-2 ring-teal-500/50 ring-offset-4 ring-offset-black rounded transition-all cursor-text" : "";

  return (
    <div className="min-h-screen selection:bg-[#c5a059]/30 selection:text-[#c5a059] bg-black">
      <Navbar logoUrl={content.brand.logoUrl} />
      
      <main>
        <Hero content={content.hero} updateContent={updateContent} isAdminMode={isAdminMode} />
        
        {/* Experience Philosophy Section */}
        <section id="services" className="py-32 bg-black overflow-hidden relative border-y border-white/5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1a717e]/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c5a059]/5 blur-[120px] rounded-full"></div>
          
          <div className="container mx-auto px-6 flex flex-col items-center">
            <div className="max-w-5xl text-center">
              <span 
                contentEditable={isAdminMode}
                onBlur={(e) => updateContent('philosophy.badge', e.currentTarget.textContent || '')}
                suppressContentEditableWarning
                className={`text-[#c5a059] uppercase tracking-[0.4em] text-xs mb-6 block font-bold ${editableClass}`}
              >
                {content.philosophy.badge}
              </span>
              
              <h2 
                contentEditable={isAdminMode}
                onBlur={(e) => updateContent('philosophy.title', e.currentTarget.textContent || '')}
                suppressContentEditableWarning
                className={`text-5xl md:text-7xl font-serif text-white mb-10 leading-tight ${editableClass}`}
              >
                {content.philosophy.title}
              </h2>
              
              <div className="mb-16 max-w-3xl mx-auto">
                <p 
                  contentEditable={isAdminMode}
                  onBlur={(e) => updateContent('philosophy.mainText', e.currentTarget.textContent || '')}
                  suppressContentEditableWarning
                  className={`text-xl md:text-2xl text-stone-400 font-light leading-relaxed ${editableClass}`}
                >
                  {content.philosophy.mainText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 text-left">
                {content.philosophy.cards.map((card: any, idx: number) => (
                  <div key={idx} className="group p-8 border border-white/5 hover:border-[#1a717e]/30 transition-all duration-500 bg-stone-900/20 backdrop-blur-sm">
                    <div className="text-[#1a717e] font-serif text-4xl mb-6 italic opacity-50 group-hover:opacity-100 transition-opacity">{card.id}</div>
                    <h3 
                      contentEditable={isAdminMode}
                      onBlur={(e) => updateContent(`philosophy.cards.${idx}.title`, e.currentTarget.textContent || '')}
                      suppressContentEditableWarning
                      className={`text-xl font-serif text-white mb-4 uppercase tracking-wider ${editableClass}`}
                    >
                      {card.title}
                    </h3>
                    <p 
                      contentEditable={isAdminMode}
                      onBlur={(e) => updateContent(`philosophy.cards.${idx}.text`, e.currentTarget.textContent || '')}
                      suppressContentEditableWarning
                      className={`text-stone-500 font-light leading-relaxed text-sm ${editableClass}`}
                    >
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <StickySection content={content.stickySection} updateContent={updateContent} isAdminMode={isAdminMode} />
        
        <AIPlanner />
        
        <BookingCard content={content.booking} updateContent={updateContent} isAdminMode={isAdminMode} />
      </main>

      <Footer logoUrl={content.brand.logoUrl} />

      <AdminPanel 
        content={content} 
        onUpdate={setContent} 
        isAdminMode={isAdminMode} 
        setAdminMode={setAdminMode}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;
