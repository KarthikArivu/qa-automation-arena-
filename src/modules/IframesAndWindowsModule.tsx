import React, { useState } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { ExternalLink } from 'lucide-react';

export const IframesAndWindowsModule: React.FC = () => {
  const [popupTriggered, setPopupTriggered] = useState(false);

  const openPopupWindow = () => {
    window.open('/popup-window.html', 'PlaywrightPopup', 'width=600,height=500');
    setPopupTriggered(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Single iFrame */}
      <ChallengeCard
        id="single-iframe"
        badge="IFRAME"
        badgeColor="green"
        title="Single iFrame Document"
        description="Target and interact with input and button elements inside an isolated iframe document."
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Standalone HTML sub-document loaded inside an <code>&lt;iframe&gt;</code>:
          </p>
          <div className="rounded-lg overflow-hidden border border-slate-700">
            <iframe
              id="simple-frame"
              data-testid="iframe-simple-element"
              src="/iframe-simple.html"
              className="w-full h-44 bg-[#111827] border-0"
              title="Simple Target Frame"
            />
          </div>
        </div>
      </ChallengeCard>

      {/* 2. Nested Chained iFrames */}
      <ChallengeCard
        id="nested-iframes"
        badge="NESTED FRAMES"
        badgeColor="yellow"
        title="Deeply Nested iFrames"
        description="Interact with child iframe elements embedded inside an outer parent iframe."
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Multi-level frame hierarchy (Parent frame embedding Child frame):
          </p>
          <div className="rounded-lg overflow-hidden border border-slate-700">
            <iframe
              id="nested-parent-frame"
              data-testid="iframe-nested-parent"
              src="/iframe-nested.html"
              className="w-full h-52 bg-[#0f172a] border-0"
              title="Nested Parent Frame"
            />
          </div>
        </div>
      </ChallengeCard>

      {/* 3. New Tab / Popups */}
      <div className="md:col-span-2">
        <ChallengeCard
          id="popups-and-tabs"
          badge="MULTI-WINDOW"
          badgeColor="cyan"
          title="Multiple Tabs & Popup Windows"
          description="Handle window.open() popups and target='_blank' hyperlinks across multiple browser pages."
        >
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                data-testid="btn-open-popup-window"
                onClick={openPopupWindow}
                className="btn-neo-cyan text-xs py-2 px-4 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Trigger window.open() Popup</span>
              </button>

              <a
                href="/popup-window.html"
                target="_blank"
                rel="noreferrer"
                data-testid="link-blank-tab"
                className="btn-neo-dark text-xs py-2 px-4 flex items-center gap-2 inline-flex"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Anchor target="_blank"</span>
              </a>
            </div>

            {popupTriggered && (
              <div
                data-testid="popup-trigger-status"
                className="p-3 bg-[#00BBF9]/10 border border-[#00BBF9]/40 rounded-lg text-xs font-mono text-[#00BBF9]"
              >
                ✅ Popup window opened. Ready for multi-page context verification.
              </div>
            )}
          </div>
        </ChallengeCard>
      </div>
    </div>
  );
};
