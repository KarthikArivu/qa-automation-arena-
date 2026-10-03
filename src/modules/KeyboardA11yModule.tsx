import React, { useState, useEffect } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { Command, Search, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

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
        badge="⌨️ HOTKEYS"
        badgeColor="yellow"
        title="Global Shortcuts (Ctrl+K) & Palette"
        description="Trigger global keyboard shortcuts using page.keyboard.press() and assert focus trap."
        playwrightCode={`// 1. Press hotkey combo Ctrl+K
await page.keyboard.press('Control+KeyK');
await expect(page.getByTestId('command-palette-modal')).toBeVisible();

// 2. Type inside palette and press Enter
await page.getByTestId('command-palette-input').fill('Deploy');
await page.keyboard.press('Enter');

// 3. Assert command execution
await expect(page.getByTestId('palette-command-result'))
  .toContainText('Deploy To Vercel');`}
        playwrightTip="Use page.keyboard.press('Control+KeyK') or page.keyboard.press('Meta+KeyK') for keyboard shortcuts."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#161B26] rounded-lg border border-slate-800">
            <span className="text-xs text-slate-300">Press hotkey:</span>
            <div className="flex items-center gap-1 font-mono text-xs bg-black/60 px-2 py-1 rounded border border-slate-700">
              <span className="text-yellow-400">Ctrl</span> + <span className="text-yellow-400">K</span>
            </div>
            <button
              data-testid="btn-open-palette"
              onClick={() => setPaletteOpen(true)}
              className="btn-neo-yellow text-xs py-1 px-3"
            >
              Open via Click
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
                    placeholder="Type command and press Enter (e.g. Deploy)..."
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
                    'Deploy To Vercel Fast',
                    'Run Playwright E2E Suite',
                    'Toggle Dark / Light Theme',
                    'Reset All Challenge States'
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
        badge="♿ A11Y & FOCUS"
        badgeColor="cyan"
        title="Focus Order & Live Regions"
        description="Verify tab navigation order with toBeFocused() and assert ARIA live announcements."
        playwrightCode={`// 1. Tab navigation order
await page.getByTestId('tab-input-1').focus();
await expect(page.getByTestId('tab-input-1')).toBeFocused();

await page.keyboard.press('Tab');
await expect(page.getByTestId('tab-input-2')).toBeFocused();

// 2. ARIA Live region
await page.getByTestId('btn-trigger-announcement').click();
await expect(page.getByTestId('aria-live-status'))
  .toHaveText('System status updated to 100% Aura');`}
        playwrightTip="Use toBeFocused() to verify keyboard accessibility without mouse clicks."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Sequential Tab Index Fields:</label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                tabIndex={1}
                data-testid="tab-input-1"
                placeholder="Tab 1"
                className="bg-[#161B26] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00BBF9] focus:ring-1 focus:ring-[#00BBF9]"
              />
              <input
                type="text"
                tabIndex={2}
                data-testid="tab-input-2"
                placeholder="Tab 2"
                className="bg-[#161B26] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00BBF9] focus:ring-1 focus:ring-[#00BBF9]"
              />
              <input
                type="text"
                tabIndex={3}
                data-testid="tab-input-3"
                placeholder="Tab 3"
                className="bg-[#161B26] border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#00BBF9] focus:ring-1 focus:ring-[#00BBF9]"
              />
            </div>
          </div>

          <div>
            <button
              data-testid="btn-trigger-announcement"
              onClick={() => triggerLiveAnnouncement('System status updated to 100% Aura')}
              className="btn-neo-cyan text-xs py-1.5 px-3 mb-2"
            >
              Dispatch Screen Reader Alert 📢
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
