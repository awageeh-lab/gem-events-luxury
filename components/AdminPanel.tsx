
import React, { useState, useRef } from 'react';
import { 
  Settings, X, Save, Copy, Image as ImageIcon, Type, Globe, 
  Upload, Plus, Trash2, List, Share2, Link as LinkIcon, 
  Table, Download, RefreshCw, AlertTriangle
} from 'lucide-react';

interface AdminPanelProps {
  content: any;
  onUpdate: (newContent: any) => void;
  isAdminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  onReset: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onUpdate, isAdminMode, setAdminMode, onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'workspace'>('editor');
  const [error, setError] = useState<string | null>(null);
  
  const heroInputRef = useRef<HTMLInputElement>(null);
  const stickyInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (path: string, value: string) => {
    try {
      const newContent = JSON.parse(JSON.stringify(content));
      const keys = path.split('.');
      let current = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      onUpdate(newContent);
      setError(null);
    } catch (err) {
      setError("Failed to update setting. Please try a different value.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit file size to 2MB to prevent browser crashes and localStorage issues
    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large (Limit: 2MB). Large images can crash the app or slow down performance. Please use a compressed version.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleInputChange(path, reader.result as string);
    };
    reader.onerror = () => {
      setError("Could not read file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const generateShareableLink = () => {
    try {
      const configStr = btoa(unescape(encodeURIComponent(JSON.stringify(content))));
      const url = new URL(window.location.href);
      url.searchParams.set('config', configStr);
      
      // Check for URL length limits
      if (url.toString().length > 10000) {
        alert("The website data is too large to share via a single link (likely due to large images). Try using external image URLs instead of uploading large files.");
        return;
      }
      
      navigator.clipboard.writeText(url.toString());
      alert("Collaborative link copied! Your team will see exactly what you see.");
    } catch (e) {
      alert("Could not generate link. The data is too complex.");
    }
  };

  const exportToCSV = () => {
    const items = content.stickySection.items;
    let csv = "Title,Location,Description\n";
    items.forEach((item: any) => {
      csv += `"${item.title}","${item.location}","${item.description.replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GEM_Experiences.csv`;
    a.click();
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#c5a059] text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-110 transition-all border-4 border-black/20 group"
      >
        <Settings size={28} className={isOpen ? 'animate-spin' : 'group-hover:rotate-90 transition-transform duration-500'} />
      </button>

      <div className={`fixed inset-y-0 right-0 w-80 md:w-96 bg-stone-950 border-l border-white/10 z-[101] transform transition-transform duration-500 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="bg-black/50 border-b border-white/10">
            <div className="p-6 flex justify-between items-center">
              <div>
                <h2 className="text-[#c5a059] font-serif text-xl tracking-wide">GEM Master Console</h2>
                <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em]">Safety-Optimized Suite</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex px-6 border-t border-white/5">
              <button onClick={() => setActiveTab('editor')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'editor' ? 'border-[#c5a059] text-[#c5a059]' : 'border-transparent text-stone-600'}`}>Visual Editor</button>
              <button onClick={() => setActiveTab('workspace')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === 'workspace' ? 'border-teal-500 text-teal-500' : 'border-transparent text-stone-600'}`}>Workspace</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-10 scrollbar-hide">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-3 text-red-400">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                <p className="text-[10px] font-bold uppercase tracking-wider">{error}</p>
              </div>
            )}

            {activeTab === 'editor' ? (
              <>
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10 shadow-inner">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Live Visual Editor</span>
                    <button onClick={() => setAdminMode(!isAdminMode)} className={`w-14 h-7 rounded-full transition-all duration-300 relative ${isAdminMode ? 'bg-teal-600' : 'bg-stone-700'}`}>
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg transition-all duration-300 ${isAdminMode ? 'left-8' : 'left-1'}`} />
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500 leading-relaxed italic">Enable to edit text directly on the page. All changes save automatically.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-[#c5a059]">
                    <ImageIcon size={18} />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Media Asset Manager</h3>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <span className="text-[9px] text-stone-500 uppercase mb-2 block font-bold tracking-widest">Brand Logo (Max 2MB)</span>
                      <div className="flex gap-2">
                        <input type="text" placeholder="URL..." value={content.brand.logoUrl.startsWith('data:') ? 'Custom Image' : content.brand.logoUrl} onChange={(e) => handleInputChange('brand.logoUrl', e.target.value)} className="flex-1 bg-black border border-white/10 rounded-xl p-3 text-[10px] text-stone-300 outline-none" />
                        <button onClick={() => logoInputRef.current?.click()} className="bg-stone-900 p-3 rounded-xl border border-white/10 text-stone-400 hover:text-white"><Upload size={14} /></button>
                      </div>
                      <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'brand.logoUrl')} />
                    </div>

                    <div>
                      <span className="text-[9px] text-stone-500 uppercase mb-2 block font-bold tracking-widest">Hero Background (Max 2MB)</span>
                      <div className="flex gap-2">
                        <input type="text" placeholder="URL..." value={content.hero.backgroundImage.startsWith('data:') ? 'Custom Image' : content.hero.backgroundImage} onChange={(e) => handleInputChange('hero.backgroundImage', e.target.value)} className="flex-1 bg-black border border-white/10 rounded-xl p-3 text-[10px] text-stone-300 outline-none" />
                        <button onClick={() => heroInputRef.current?.click()} className="bg-stone-900 p-3 rounded-xl border border-white/10 text-stone-400 hover:text-white"><Upload size={14} /></button>
                      </div>
                      <input type="file" ref={heroInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'hero.backgroundImage')} />
                    </div>

                    <div>
                      <span className="text-[9px] text-stone-500 uppercase mb-2 block font-bold tracking-widest">Itinerary Background (Max 2MB)</span>
                      <div className="flex gap-2">
                        <input type="text" placeholder="URL..." value={content.stickySection.backgroundImage.startsWith('data:') ? 'Custom Image' : content.stickySection.backgroundImage} onChange={(e) => handleInputChange('stickySection.backgroundImage', e.target.value)} className="flex-1 bg-black border border-white/10 rounded-xl p-3 text-[10px] text-stone-300 outline-none" />
                        <button onClick={() => stickyInputRef.current?.click()} className="bg-stone-900 p-3 rounded-xl border border-white/10 text-stone-400 hover:text-white"><Upload size={14} /></button>
                      </div>
                      <input type="file" ref={stickyInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'stickySection.backgroundImage')} />
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-teal-400">
                    <Type size={18} />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Global Text Settings</h3>
                  </div>
                  <div className="space-y-4">
                    <textarea 
                      placeholder="Brand Manifesto"
                      value={content.brand.philosophy} 
                      onChange={(e) => handleInputChange('brand.philosophy', e.target.value)} 
                      className="w-full bg-black border border-white/10 rounded-xl p-4 text-[10px] text-stone-400 focus:border-teal-500 outline-none h-20 resize-none leading-relaxed" 
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-10 animate-fadeIn">
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-blue-400">
                    <Table size={18} />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Data Backup</h3>
                  </div>
                  <button onClick={exportToCSV} className="w-full p-4 bg-stone-900 border border-white/5 rounded-2xl flex flex-col items-center gap-3 hover:bg-stone-800 transition-all text-stone-400 hover:text-green-400">
                    <Download size={20} />
                    <span className="text-[9px] font-bold uppercase tracking-widest">Download Catalog CSV</span>
                  </button>
                </div>

                <div className="space-y-6 pt-10 border-t border-white/5">
                  <div className="flex items-center gap-2 text-red-400">
                    <RefreshCw size={18} />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Danger Zone</h3>
                  </div>
                  <button onClick={onReset} className="w-full p-4 border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500/10 transition-all rounded-xl">Hard Reset Factory Data</button>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-black/50 space-y-4">
            <button 
              onClick={generateShareableLink}
              className="w-full py-4 bg-gradient-to-r from-[#c5a059] to-[#8d6e35] text-black font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:brightness-110 active:scale-[0.98] transition-all rounded-xl shadow-lg"
            >
              <LinkIcon size={16} /> Generate Shared Link
            </button>
            <p className="text-[9px] text-stone-700 text-center uppercase tracking-[0.4em] font-medium italic">Edits persist automatically in your browser memory.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
