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
    window.alert('System Notification: Action completed successfully.');
  };

  const triggerConfirm = () => {
    const res = window.confirm('Are you sure you want to permanently delete this record?');
    setConfirmResult(res ? 'Confirmed: Record Deleted' : 'Dismissed: Deletion Cancelled');
  };

  const triggerPrompt = () => {
    const answer = window.prompt('Enter operator identifier:', 'admin_karthik');
    setPromptResult(answer !== null ? `Submitted: "${answer}"` : 'Prompt Cancelled');
  };

  const showToast = (type: 'success' | 'warn') => {
    const id = Date.now();
    const msg = type === 'success' ? 'Operation executed successfully.' : 'Warning: Resource limit approaching threshold.';
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
        badge="DIALOGS"
        badgeColor="pink"
        title="Native Alerts, Confirms & Prompts"
        description="Verify handling of browser native alert(), confirm(), and prompt() dialogs."
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
        badge="MODALS"
        badgeColor="purple"
        title="Custom Modals & Focus Trap"
        description="Interact with accessible HTML dialogs, backdrop dismissal, Escape hotkey, and nested modals."
      >
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              data-testid="btn-open-modal"
              onClick={() => setIsModalOpen(true)}
              className="btn-neo-green text-xs py-2 px-4"
            >
              Open Primary Modal 🪟
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
                <h4 className="text-base font-bold text-[#00F5D4] mb-2">Primary Modal Dialog</h4>
                <p className="text-xs text-slate-300 mb-4">
                  Accessible modal dialog with backdrop dismiss and Escape key binding.
                </p>
                <div className="flex justify-between items-center">
                  <button
                    data-testid="btn-open-nested-modal"
                    onClick={() => setIsNestedModalOpen(true)}
                    className="btn-neo-yellow text-xs py-1.5 px-3"
                  >
                    Open Sub-Modal 🌀
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

          {/* Nested Sub-Modal */}
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
                <h5 className="text-sm font-bold text-[#FEE440] mb-2">Sub-Level Modal (Level 2)</h5>
                <p className="text-xs text-slate-300 mb-3">Nested child dialog requiring secondary confirmation.</p>
                <button
                  data-testid="btn-close-nested-modal"
                  onClick={() => setIsNestedModalOpen(false)}
                  className="btn-neo-yellow text-xs py-1 px-3 w-full"
                >
                  Close Sub-Modal
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
                    <h4 className="font-bold text-white text-sm">Slide-out Navigation Drawer</h4>
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
          badge="NOTIFICATIONS"
          badgeColor="yellow"
          title="Toast Notifications & Auto-Dismiss"
          description="Spawn temporary toast alerts and verify visibility before and after auto-dismissal."
        >
          <div className="flex items-center gap-3">
            <button
              data-testid="btn-spawn-toast-success"
              onClick={() => showToast('success')}
              className="btn-neo-green text-xs py-2 px-3"
            >
              Trigger Success Toast 🟢
            </button>
            <button
              data-testid="btn-spawn-toast-warn"
              onClick={() => showToast('warn')}
              className="btn-neo-pink text-xs py-2 px-3"
            >
              Trigger Warning Toast 🔴
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
