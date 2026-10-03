import React from 'react';
import { Flame, Code2, Sparkles, Terminal, Search, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSuiteModal: () => void;
  totalChallenges: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenSuiteModal,
  totalChallenges,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#080A10]/90 backdrop-blur-md border-b-2 border-black px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00F5D4] border-2 border-black shadow-brutal flex items-center justify-center text-black font-black text-xl">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white font-display">
                PLAYWRIGHT <span className="text-[#00F5D4]">RIZZ</span> LAB
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#FF4365] text-white px-2 py-0.5 rounded-full border border-black shadow-sm">
                NO CAP FR
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              The Ultimate Gen Z End-to-End Automation Arena
            </p>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
          {/* Quick filter search */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              data-testid="navbar-search-input"
              placeholder="Search test scenarios (e.g. iframe, popup)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#121622] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00F5D4]"
            />
          </div>

          {/* Developer Credit Badge */}
          <div
            data-testid="dev-credit-badge"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#161B26] border-2 border-black rounded-lg shadow-brutal font-mono text-[11px] whitespace-nowrap"
          >
            <span className="text-slate-400">Dev:</span>
            <span className="text-[#00F5D4] font-bold">Karthik Arivu</span>
            <span className="text-[10px]">👑</span>
          </div>

          {/* Master Test Suite Modal button */}
          <button
            onClick={onOpenSuiteModal}
            data-testid="btn-open-master-suite"
            className="btn-neo-green text-xs py-1.5 px-3 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Master Test Suite</span>
          </button>
        </div>
      </div>
    </header>
  );
};
