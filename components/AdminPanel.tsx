
import React, { useState } from 'react';
import { 
  Settings, X, Copy, Download, 
  RefreshCw, CheckCircle2, Clipboard, 
  Github, FileJson, ShieldAlert,
  Save
} from 'lucide-react';

interface AdminPanelProps {
  content: any;
  onUpdate: (newContent: any) => void;
  isAdminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  onReset: () => void;
  lastSaved: Date | null;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onUpdate, isAdminMode, setAdminMode, onReset, lastSaved }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'github'>('edit');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const forceManualSync = () => {
    localStorage.setItem('gem_persistence_v3', JSON.stringify(content));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  const downloadForGithub = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "siteContent.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[101] w-14 h-14 bg-[#c5a059] text-black rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(197,160,89,0.4)] hover:scale-110 transition-all group"
      >
        <Settings size={28} className={isOpen ? 'rotate-90' : 'group-hover:rotate-45 transition-transform duration-500'} />
      </button>

      <div className={`fixed inset-y-0 right-0 w-80 md:w-96 bg-stone-950 border-l border-white/10 z-[102] transform transition-transform duration-500 shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10 bg-black/40">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#c5a059] font-serif text-xl tracking-wide uppercase">Site Manager</h2>
              <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex bg-stone-900/50 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('edit')}
                className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-[0.2em] rounded-md transition-all ${activeTab === 'edit' ? 'bg-[#c5a059] text-black' : 'text-stone-500 hover:text-stone-300'}`}
              >
                Editor
              </button>
              <button 
                onClick={() => setActiveTab('github')}
                className={`flex-1 py-2 text-[9px] font-bold uppercase tracking-[0.2em] rounded-md transition-all ${activeTab === 'github' ? 'bg-[#c5a059] text-black' : 'text-stone-500 hover:text-stone-300'}`}
              >
                GitHub Export
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {activeTab === 'edit' ? (
              <div className="space-y-6">
                <div className="bg-[#c5a059]/5 p-5 rounded-2xl border border-[#c5a059]/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">Live Text Editing</span>
                    <button onClick={() => setAdminMode(!isAdminMode)} className={`w-12 h-6 rounded-full transition-all relative ${isAdminMode ? 'bg-[#c5a059]' : 'bg-stone-700'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isAdminMode ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500 leading-relaxed italic">
                    Turn this ON to edit text directly on the page. Click any text to change it.
                  </p>
                </div>

                <button 
                  onClick={forceManualSync}
                  className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${showSaveSuccess ? 'bg-green-600/20 border-green-500 text-green-500' : 'bg-stone-900 border-white/10 text-[#c5a059] hover:bg-stone-800'}`}
                >
                  {showSaveSuccess ? <CheckCircle2 size={18} /> : <Save size={18} />}
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {showSaveSuccess ? 'Saved Locally' : 'Save To Browser'}
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] flex items-center gap-2">
                    <Github size={14} /> GitHub Sync Tool
                  </h3>
                  <p className="text-[10px] text-stone-500 leading-relaxed">
                    To update your live website, download this file and upload it to the <code className="text-[#c5a059]">config/</code> folder in your GitHub repo.
                  </p>
                  
                  <button 
                    onClick={downloadForGithub}
                    className="w-full py-5 bg-[#c5a059] text-black rounded-xl flex flex-col items-center justify-center gap-1 hover:brightness-110 transition-all shadow-lg"
                  >
                    <div className="flex items-center gap-2 font-black uppercase tracking-widest text-[11px]">
                      <Download size={18} /> Download Production JSON
                    </div>
                    <span className="text-[8px] uppercase opacity-70 tracking-tighter">Required for GitHub update</span>
                  </button>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                    <ShieldAlert size={14} /> Spelling Verification
                  </h3>
                  <div className="p-4 bg-black rounded-xl border border-white/5 text-[9px] text-stone-500 font-mono">
                    Checking for 'Enquire'... <br/>
                    {JSON.stringify(content).includes('Enquire') ? (
                      <span className="text-red-500">Error: Typo Found in Data</span>
                    ) : (
                      <span className="text-green-500">Clean: Only 'Inquire' Found</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-black/80">
            <button onClick={onReset} className="w-full py-3 border border-red-500/20 text-red-500 text-[9px] font-bold uppercase tracking-widest hover:bg-red-500/5 transition-all rounded-xl">
              <RefreshCw size={12} className="inline mr-2" /> Reset Site To Original
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
