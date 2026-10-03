import React, { useState, useEffect } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { Search, CornerDownLeft } from 'lucide-react';

export const KeyboardA11yModule: React.FC = () => {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [commandResult, setCommandResult] = useState('');
  const [ariaAnnouncement, setAriaAnnouncement] = useState('');

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape' && paletteOpen) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paletteOpen]);

  const triggerLiveAnnouncement = (msg: string) => {
    setAriaAnnouncement(msg);
    setTimeout(() => setAriaAnnouncement(''), 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Hotkeys & Command Palette */}
      <ChallengeCard
        id="keyboard-shortcuts"
        badge="SHORTCUTS"
        badgeColor="yellow"
        title="Global Command Palette (Ctrl+K)"
        description="Verify global keyboard shortcuts (Ctrl+K / Cmd+K), focus management, and key navigation."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#161B26] rounded-lg border border-slate-800">
            <span className="text-xs text-slate-300">Keyboard Combination:</span>
            <div className="flex items-center gap-1 font-mono text-xs bg-black/60 px-2 py-1 rounded border border-slate-700">
              <span className="text-yellow-400">Ctrl</span> + <span className="text-yellow-400">K</span>
            </div>
            <button
              data-testid="btn-open-palette"
              onClick={() => setPaletteOpen(true)}
              className="btn-neo-yellow text-xs py-1 px-3"
            >
              Open Palette
            </button>
          </div>

          {commandResult && (
            <div data-testid="palette-command-result" className="p-2 bg-[#00F5D4]/10 border border-[#00F5D4] rounded text-xs font-mono text-[#00F5D4]">
              ⚡ Executed Command: {commandResult}
            </div>
          )}

          {/* Command Palette Modal */}
          {paletteOpen && (
            <div
              data-testid="command-palette-modal"
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-24 p-4"
              onClick={() => setPaletteOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#161B26] border-2 border-black rounded-xl max-w-lg w-full shadow-brutal overflow-hidden text-white"
              >
                <div className="flex items-center px-4 py-3 border-b border-slate-800">
                  <Search className="w-4 h-4 text-slate-400 mr-2" />
                  <input
                    type="text"
                    autoFocus
                    data-testid="command-palette-input"
                    placeholder="Type command and press Enter (e.g. Export)..."
                    value={commandQuery}
                    onChange={(e) => setCommandQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setCommandResult(commandQuery || 'Default Action');
                        setPaletteOpen(false);
                      }
                    }}
                    className="w-full bg-transparent border-0 text-sm text-white focus:outline-none"
                  />
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">ESC</span>
                </div>

                <div className="p-2 max-h-48 overflow-y-auto space-y-1">
                  {[
                    'Export System Analytics Data',
                    'Run Automated Health Check',
                    'Toggle Dark / Light Theme',
                    'Reset User Preferences'
                  ]
                    .filter(c => c.toLowerCase().includes(commandQuery.toLowerCase()))
                    .map(cmd => (
                      <div
                        key={cmd}
                        data-testid={`palette-item-${cmd}`}
                        onClick={() => {
                          setCommandResult(cmd);
                          setPaletteOpen(false);
                        }}
                        className="px-3 py-2 rounded text-xs font-mono flex items-center justify-between hover:bg-[#FEE440] hover:text-black cursor-pointer"
                      >
                        <span>{cmd}</span>
                        <CornerDownLeft className="w-3 h-3 opacity-60" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </ChallengeCard>

      {/* 2. ARIA Live & Tab Focus */}
      <ChallengeCard
        id="a11y-focus-tab"
        badge="ACCESSIBILITY"
        badgeColor="cyan"
        title="Sequential Tab Focus & Live Regions"
        description="Verify tab navigation order with focus indicators and test dynamic ARIA live announcements."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Sequential Tab Index Fields:</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                tabIndex={1}
                data-testid="tab-input-1"
                placeholder="Field 1"
                className="bg-[#161B26] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00BBF9] focus:ring-1 focus:ring-[#00BBF9]"
              />
              <input
                type="text"
                tabIndex={2}
                data-testid="tab-input-2"
                placeholder="Field 2"
                className="bg-[#161B26] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00BBF9] focus:ring-1 focus:ring-[#00BBF9]"
              />
              <input
                type="text"
                tabIndex={3}
                data-testid="tab-input-3"
                placeholder="Field 3"
                className="bg-[#161B26] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00BBF9] focus:ring-1 focus:ring-[#00BBF9]"
              />
            </div>
          </div>

          <div>
            <button
              data-testid="btn-trigger-announcement"
              onClick={() => triggerLiveAnnouncement('System status updated: All services verified')}
              className="btn-neo-cyan text-xs py-1.5 px-3 mb-2"
            >
              Trigger Live Announcement 📢
            </button>

            {/* ARIA Live Region */}
            <div
              role="status"
              aria-live="polite"
              data-testid="aria-live-status"
              className="p-2 bg-[#0C101A] border border-slate-800 rounded font-mono text-xs text-[#00BBF9] min-h-8"
            >
              {ariaAnnouncement || 'No current announcement.'}
            </div>
          </div>
        </div>
      </ChallengeCard>
    </div>
  );
};
