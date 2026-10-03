import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { CategoryNav, CategoryId } from './components/CategoryNav';
import { FullTestCheatsheetModal } from './components/FullTestCheatsheetModal';

// Modules
import { FormControlsModule } from './modules/FormControlsModule';
import { ClicksAndGesturesModule } from './modules/ClicksAndGesturesModule';
import { AsyncAndWaitingModule } from './modules/AsyncAndWaitingModule';
import { DialogsAndPopupsModule } from './modules/DialogsAndPopupsModule';
import { IframesAndWindowsModule } from './modules/IframesAndWindowsModule';
import { FilesModule } from './modules/FilesModule';
import { TablesModule } from './modules/TablesModule';
import { ShadowDomModule } from './modules/ShadowDomModule';
import { NetworkChaosModule } from './modules/NetworkChaosModule';
import { AuthAndStorageModule } from './modules/AuthAndStorageModule';
import { KeyboardA11yModule } from './modules/KeyboardA11yModule';
import { VisualEdgeCasesModule } from './modules/VisualEdgeCasesModule';

import { Sparkles, Terminal, Rocket, Check, ArrowRight, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [isSuiteModalOpen, setIsSuiteModalOpen] = useState(false);

  // Module registry for filtering
  const allModules = useMemo(() => [
    {
      id: 'forms',
      title: '01. Rizz & Inputs (Form Controls)',
      category: 'forms',
      keywords: 'input text password textarea range slider color switch radio checkbox select dropdown combobox debounce validation',
      component: <FormControlsModule key="forms" />
    },
    {
      id: 'clicks',
      title: '02. Tap In & Gestures (Mouse & Gestures)',
      category: 'clicks',
      keywords: 'click double right contextmenu hover tooltip coordinates modifiers shift ctrl drag drop kanban canvas drawing',
      component: <ClicksAndGesturesModule key="clicks" />
    },
    {
      id: 'async',
      title: '03. The Waiting Room (Async & Auto-Waiting)',
      category: 'async',
      keywords: 'async wait autowait delay timeout spinner detach countdown disabled attribute state infinite scroll skeleton',
      component: <AsyncAndWaitingModule key="async" />
    },
    {
      id: 'dialogs',
      title: '04. Pop Off (Dialogs, Modals & Toasts)',
      category: 'dialogs',
      keywords: 'dialog alert confirm prompt native modal backdrop nested drawer toast snackbar notification escape',
      component: <DialogsAndPopupsModule key="dialogs" />
    },
    {
      id: 'iframes',
      title: '05. The Multiverse (iFrames & Multi-Tab Windows)',
      category: 'iframes',
      keywords: 'iframe framelocator nested child popup window open target blank tab new page context',
      component: <IframesAndWindowsModule key="iframes" />
    },
    {
      id: 'files',
      title: '06. Drop & Fetch (File Uploads & Downloads)',
      category: 'files',
      keywords: 'file upload download setinputfiles single multi dropzone blob receipt txt',
      component: <FilesModule key="files" />
    },
    {
      id: 'tables',
      title: '07. Receipts & Grids (Data Tables)',
      category: 'tables',
      keywords: 'table data grid rows sort filter search pagination delete select all inline edit',
      component: <TablesModule key="tables" />
    },
    {
      id: 'shadow',
      title: '08. The Shadow Realm (Shadow DOM & Web Components)',
      category: 'shadow',
      keywords: 'shadow dom open closed shadowroot custom web component pierce evaluate',
      component: <ShadowDomModule key="shadow" />
    },
    {
      id: 'network',
      title: '09. Chaos Engineering (Network Interception & Mocking)',
      category: 'network',
      keywords: 'network route mock api 200 404 500 status code delay slow 3g flaky offline disconnected intercept',
      component: <NetworkChaosModule key="network" />
    },
    {
      id: 'auth',
      title: '10. Gatekept (Auth, Cookies & Storage)',
      category: 'auth',
      keywords: 'auth login session localstorage sessionstorage cookies storagestate protected jwt vip token',
      component: <AuthAndStorageModule key="auth" />
    },
    {
      id: 'keyboard',
      title: '11. Vibe Check (Keyboard Hotkeys & A11y)',
      category: 'keyboard',
      keywords: 'keyboard shortcuts ctrl k hotkey palette a11y tobefocused aria live announcement tabindex',
      component: <KeyboardA11yModule key="keyboard" />
    },
    {
      id: 'visual',
      title: '12. No Cap (Visual Edge Cases & Snapshots)',
      category: 'visual',
      keywords: 'visual regression screenshot toHaveScreenshot display none visibility hidden opacity offscreen animation freeze',
      component: <VisualEdgeCasesModule key="visual" />
    },
  ], []);

  // Filter modules
  const visibleModules = useMemo(() => {
    return allModules.filter(mod => {
      const matchesCategory = activeCategory === 'all' || mod.category === activeCategory;
      const matchesQuery = !searchQuery ||
        mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.keywords.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [allModules, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#080A10] text-slate-100 flex flex-col font-sans selection:bg-[#00F5D4] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSuiteModal={() => setIsSuiteModalOpen(true)}
        totalChallenges={allModules.length}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-6 px-4 sm:px-6 border-b border-slate-800/80 bg-gradient-to-b from-[#101524] to-[#080A10]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-mono font-bold bg-[#00F5D4]/15 text-[#00F5D4] border border-[#00F5D4]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% REAL DOM PLAYGROUND</span>
            </span>
            <span className="text-xs font-mono font-bold bg-[#FF4365]/15 text-[#FF4365] border border-[#FF4365]/30 px-2.5 py-0.5 rounded-full">
              VERCEL ZERO-CONFIG DEPLOY
            </span>
            <span className="text-xs font-mono font-bold bg-[#7B2CBF]/20 text-[#c77dff] border border-[#7B2CBF]/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <span>👑 DEV: KARTHIK ARIVU</span>
            </span>
            <span className="text-xs font-mono font-bold bg-[#FEE440]/15 text-[#FEE440] border border-[#FEE440]/30 px-2.5 py-0.5 rounded-full">
              ALL LOCATORS & ASSERTIONS INCLUDED
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-display mb-3">
            Level Up Your <span className="text-[#00F5D4] underline decoration-wavy decoration-[#FF4365]">Playwright</span> Rizz
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-6">
            Tired of boring, antique demo sites with 2005 tables? Built by <strong className="text-[#00F5D4] font-bold">Karthik Arivu</strong>, this is the definitive, high-voltage arena covering every single challenge you'll ever face in JavaScript / TypeScript Playwright automation.
          </p>

          {/* Quick CLI Banner */}
          <div className="p-3 bg-[#06080E] border-2 border-black rounded-xl shadow-brutal flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs max-w-3xl">
            <div className="flex items-center gap-2 text-slate-300">
              <Terminal className="w-4 h-4 text-[#00F5D4]" />
              <span className="text-slate-400">Run Locally:</span>
              <code className="text-[#FEE440] font-bold">npx playwright test</code>
            </div>
            <button
              onClick={() => setIsSuiteModalOpen(true)}
              className="text-[#00F5D4] hover:underline font-bold flex items-center gap-1"
            >
              <span>View bundled master test suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Category Navigation Pills */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {visibleModules.length === 0 ? (
          <div className="text-center py-16 bg-[#0E121B] rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-white mb-2">No matching challenges found</h3>
            <p className="text-xs text-slate-400 mb-4">Try clearing your search query or selecting "All Modules".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="btn-neo-cyan text-xs py-1.5 px-4"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {visibleModules.map(mod => (
              <section key={mod.id} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display flex items-center gap-2">
                    <span>{mod.title}</span>
                  </h2>
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    category: {mod.category}
                  </span>
                </div>
                {mod.component}
              </section>
            ))}
          </div>
        )}

        {/* Vercel Deployment Guide Banner */}
        <section className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-[#111726] to-[#0A0D15] border-2 border-black shadow-brutal text-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00F5D4]">
                <Rocket className="w-4 h-4" />
                <span>READY FOR VERCEL DEPLOYMENT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display">
                Deploy This Entire Arena In 30 Seconds
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                This project is pre-configured with <code className="text-[#FEE440]">vercel.json</code>, clean SPA rewrites, static iframe fixtures, and Vite bundler optimizations. Push to GitHub and import directly to Vercel, or run <code className="text-[#00F5D4]">npx vercel</code> in your terminal.
              </p>
            </div>

            <div className="bg-[#06080E] p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2">
              <div className="text-slate-400 font-bold">1-Command Vercel Deploy:</div>
              <div className="text-[#00F5D4] bg-black/60 p-2 rounded border border-slate-700 select-all">
                npx vercel --prod
              </div>
              <div className="text-[11px] text-slate-400">
                Framework: <strong>Vite</strong> | Output: <strong>dist</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#06080E] py-6 px-4 text-center text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>Built with pure Gen Z energy & Playwright automation power by <strong className="text-[#00F5D4] font-bold">Karthik Arivu</strong> ⚡</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Vercel Optimized ⚡</span>
            <span>JavaScript & TypeScript</span>
            <span>No Cap fr fr 🧢</span>
          </div>
        </div>
      </footer>

      {/* Master Test Suite Modal */}
      <FullTestCheatsheetModal
        isOpen={isSuiteModalOpen}
        onClose={() => setIsSuiteModalOpen(false)}
      />
    </div>
  );
};

export default App;
