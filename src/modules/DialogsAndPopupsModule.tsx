import React, { useState, useEffect } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { X, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const DialogsAndPopupsModule: React.FC = () => {
  // Native dialog states
  const [confirmResult, setConfirmResult] = useState<string>('');
  const [promptResult, setPromptResult] = useState<string>('');

  // Custom Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);

  // Toast
  const [toasts, setToasts] = useState<Array<{ id: number; msg: string; type: 'success' | 'warn' }>>([]);

  // Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const triggerAlert = () => {
    window.alert('🚨 Certified Gen Z Alert: No Cap Detected!');
  };

  const triggerConfirm = () => {
    const res = window.confirm('Are you absolutely sure you want to delete your cringe history?');
    setConfirmResult(res ? 'Confirmed: History NUKED 💀' : 'Dismissed: Cringe preserved 🦄');
  };

  const triggerPrompt = () => {
    const answer = window.prompt('Enter your legendary gamer tag:', 'SigmaCoder99');
    setPromptResult(answer !== null ? `Submitted: "${answer}"` : 'Prompt Cancelled');
  };

  const showToast = (type: 'success' | 'warn') => {
    const id = Date.now();
    const msg = type === 'success' ? '⚡ Action executed successfully!' : '⚠️ Warning: High sodium levels detected!';
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isNestedModalOpen) {
          setIsNestedModalOpen(false);
        } else if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isNestedModalOpen]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Native Browser Dialogs */}
      <ChallengeCard
        id="native-dialogs"
        badge="🚨 DIALOGS"
        badgeColor="pink"
        title="Native Alerts, Confirms & Prompts"
        description="Handle native browser dialogs using page.on('dialog') listener before triggering the event."
        playwrightCode={`// 1. Handling window.alert
page.once('dialog', async dialog => {
  expect(dialog.message()).toContain('No Cap');
  await dialog.accept();
});
await page.getByTestId('btn-native-alert').click();

// 2. Handling window.confirm (Accept or Dismiss)
page.once('dialog', async dialog => {
  await dialog.accept(); // or dialog.dismiss()
});
await page.getByTestId('btn-native-confirm').click();
await expect(page.getByTestId('confirm-result-display')).toContainText('NUKED');

// 3. Handling window.prompt
page.once('dialog', async dialog => {
  await dialog.accept('RizzlerMaster');
});
await page.getByTestId('btn-native-prompt').click();
await expect(page.getByTestId('prompt-result-display')).toContainText('RizzlerMaster');`}
        playwrightTip="Crucial: Register page.on('dialog') BEFORE clicking the button that triggers the alert, otherwise Playwright will auto-dismiss it!"
      >
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              data-testid="btn-native-alert"
              onClick={triggerAlert}
              className="btn-neo-pink text-xs py-1.5 px-3"
            >
              Trigger Alert()
            </button>
            <button
              data-testid="btn-native-confirm"
              onClick={triggerConfirm}
              className="btn-neo-yellow text-xs py-1.5 px-3"
            >
              Trigger Confirm()
            </button>
            <button
              data-testid="btn-native-prompt"
              onClick={triggerPrompt}
              className="btn-neo-cyan text-xs py-1.5 px-3"
            >
              Trigger Prompt()
            </button>
          </div>

          <div className="p-2.5 bg-[#161B26] rounded-lg border border-slate-800 space-y-1 font-mono text-xs">
            <div className="text-slate-400">Confirm Result: <span data-testid="confirm-result-display" className="text-[#00F5D4] font-bold">{confirmResult || 'None'}</span></div>
            <div className="text-slate-400">Prompt Result: <span data-testid="prompt-result-display" className="text-[#FEE440] font-bold">{promptResult || 'None'}</span></div>
          </div>
        </div>
      </ChallengeCard>

      {/* 2. Custom Accessible Modals & Nested Modals */}
      <ChallengeCard
        id="custom-modals"
        badge="🪟 MODALS"
        badgeColor="purple"
        title="Custom Modals & Focus Trap"
        description="Interact with accessible HTML modals, backdrop dismissal, Escape hotkey, and nested modals."
        playwrightCode={`// 1. Open primary modal
await page.getByTestId('btn-open-modal').click();
await expect(page.getByTestId('modal-dialog')).toBeVisible();

// 2. Open nested sub-modal
await page.getByTestId('btn-open-nested-modal').click();
await expect(page.getByTestId('nested-modal-dialog')).toBeVisible();

// 3. Close with Escape key
await page.keyboard.press('Escape');
await expect(page.getByTestId('nested-modal-dialog')).toBeHidden();`}
        playwrightTip="Use page.keyboard.press('Escape') to test keyboard accessibility on custom dialogs."
      >
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              data-testid="btn-open-modal"
              onClick={() => setIsModalOpen(true)}
              className="btn-neo-green text-xs py-2 px-4"
            >
              Open VIP Modal 🪟
            </button>
            <button
              data-testid="btn-open-drawer"
              onClick={() => setIsDrawerOpen(true)}
              className="btn-neo-dark text-xs py-2 px-4"
            >
              Open Slide Drawer ➡️
            </button>
          </div>

          {/* Modal Backdrop & Dialog */}
          {isModalOpen && (
            <div
              data-testid="modal-backdrop"
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <div
                role="dialog"
                aria-modal="true"
                data-testid="modal-dialog"
                onClick={(e) => e.stopPropagation()}
                className="bg-[#161B26] border-2 border-black rounded-xl p-6 max-w-sm w-full shadow-brutal text-white relative animate-fadeIn"
              >
                <button
                  data-testid="btn-close-modal"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
                <h4 className="text-base font-bold text-[#00F5D4] mb-2">Level 1 Secret Chamber</h4>
                <p className="text-xs text-slate-300 mb-4">
                  You are inside the accessible modal. Press ESC or click backdrop to exit.
                </p>
                <div className="flex justify-between items-center">
                  <button
                    data-testid="btn-open-nested-modal"
                    onClick={() => setIsNestedModalOpen(true)}
                    className="btn-neo-yellow text-xs py-1.5 px-3"
                  >
                    Open Inception Modal 🌀
                  </button>
                  <button
                    data-testid="btn-modal-action"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-neo-pink text-xs py-1.5 px-3"
                  >
                    Confirm & Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Nested Inception Modal */}
          {isNestedModalOpen && (
            <div
              data-testid="nested-modal-backdrop"
              className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4"
            >
              <div
                role="dialog"
                data-testid="nested-modal-dialog"
                className="bg-[#11141C] border-2 border-[#FEE440] rounded-xl p-5 max-w-xs w-full shadow-brutal text-white relative"
              >
                <h5 className="text-sm font-bold text-[#FEE440] mb-2">🌀 Inception Level 2</h5>
                <p className="text-xs text-slate-300 mb-3">Deepest layer of the modal tree.</p>
                <button
                  data-testid="btn-close-nested-modal"
                  onClick={() => setIsNestedModalOpen(false)}
                  className="btn-neo-yellow text-xs py-1 px-3 w-full"
                >
                  Exit Inception
                </button>
              </div>
            </div>
          )}

          {/* Slide Drawer */}
          {isDrawerOpen && (
            <div
              data-testid="drawer-backdrop"
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 flex justify-end"
            >
              <div
                data-testid="slide-drawer"
                onClick={(e) => e.stopPropagation()}
                className="bg-[#161B26] w-72 h-full border-l-2 border-black p-5 shadow-brutal flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-white text-sm">Slide-out Drawer</h4>
                    <button
                      data-testid="btn-close-drawer"
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    A drawer is frequently used for sidebars and mobile navigation menus.
                  </p>
                </div>
                <button
                  data-testid="btn-drawer-confirm"
                  onClick={() => setIsDrawerOpen(false)}
                  className="btn-neo-cyan text-xs py-2 w-full"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          )}
        </div>
      </ChallengeCard>

      {/* 3. Toast Notifications */}
      <div className="md:col-span-2">
        <ChallengeCard
          id="toast-notifications"
          badge="🍞 TOASTS"
          badgeColor="yellow"
          title="Toast Notifications & Auto-Dismiss"
          description="Spawn temporary snackbars and test visibility before and after auto-dismissal."
          playwrightCode={`// Spawn toast and assert visibility
await page.getByTestId('btn-spawn-toast-success').click();
const toast = page.getByTestId('toast-notification');
await expect(toast).toBeVisible();
await expect(toast).toContainText('Action executed successfully');

// Wait for auto-dismiss (4s)
await expect(toast).toBeHidden({ timeout: 6000 });`}
          playwrightTip="Toast messages often have role='status' or role='alert' for screen reader announcements."
        >
          <div className="flex items-center gap-3">
            <button
              data-testid="btn-spawn-toast-success"
              onClick={() => showToast('success')}
              className="btn-neo-green text-xs py-2 px-3"
            >
              Spawn Success Toast 🟢
            </button>
            <button
              data-testid="btn-spawn-toast-warn"
              onClick={() => showToast('warn')}
              className="btn-neo-pink text-xs py-2 px-3"
            >
              Spawn Warning Toast 🔴
            </button>
          </div>

          {/* Toast Container */}
          <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
            {toasts.map(t => (
              <div
                key={t.id}
                role="alert"
                data-testid="toast-notification"
                className={`flex items-center justify-between p-3 rounded-lg border-2 border-black shadow-brutal text-xs font-mono font-bold animate-slideIn ${
                  t.type === 'success' ? 'bg-[#00F5D4] text-black' : 'bg-[#FF4365] text-white'
                }`}
              >
                <span>{t.msg}</span>
                <button
                  onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
                  className="ml-3 hover:opacity-75"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </ChallengeCard>
      </div>
    </div>
  );
};
