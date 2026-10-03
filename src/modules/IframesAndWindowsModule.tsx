import React, { useState } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { ExternalLink, Layers } from 'lucide-react';

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
        badge="🖼️ IFRAME"
        badgeColor="green"
        title="Single iFrame Piercing"
        description="Target elements inside an isolated iframe document using Playwright's frameLocator."
        playwrightCode={`// 1. Locate the iframe
const frame = page.frameLocator('iframe#simple-frame');

// 2. Interact with elements inside the frame
await frame.getByTestId('iframe-secret-input').fill('TopSecretRizz42');
await frame.getByTestId('iframe-submit-btn').click();

// 3. Assert frame internal DOM
await expect(frame.getByTestId('iframe-result-msg')).toContainText('TopSecretRizz42');`}
        playwrightTip="frameLocator() is strict and auto-waits for the iframe to load before locating elements."
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Below is a real standalone HTML document loaded inside an <code>&lt;iframe&gt;</code>:
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
        badge="📦 NESTED FRAMES"
        badgeColor="yellow"
        title="Deeply Chained iFrames"
        description="Interact with an iframe embedded within another iframe using chained frameLocator calls."
        playwrightCode={`// Chain multiple frameLocator calls
const outerFrame = page.frameLocator('iframe#nested-parent-frame');
const childFrame = outerFrame.frameLocator('iframe#child-nested-frame');

// Click button inside level 2 child frame
await childFrame.getByTestId('deep-action-btn').click();

// Assert inner child state
await expect(childFrame.getByTestId('deep-status-text'))
  .toContainText('RIZZ_ACTIVATED_IN_THE_MATRIX');`}
        playwrightTip="You can chain .frameLocator() infinitely: page.frameLocator('#frame1').frameLocator('#frame2').locator('#btn').click()"
      >
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Two-level iframe hierarchy (Parent frame embeds Child frame):
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
          badge="📑 MULTI-TAB"
          badgeColor="cyan"
          title="Multiple Tabs & Popup Windows"
          description="Handle window.open() popups and target='_blank' links using page.waitForEvent('popup')."
          playwrightCode={`// 1. Wait for popup event concurrently with the click
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.getByTestId('btn-open-popup-window').click()
]);

// 2. Wait for popup to load and assert inside it
await popup.waitForLoadState();
await expect(popup.getByTestId('popup-heading')).toBeVisible();

// 3. Interact inside the new tab
await popup.getByTestId('popup-confirm-btn').click();
await expect(popup.getByTestId('popup-state')).toHaveText('POPUP_VERIFIED_SUCCESSFULLY');

// 4. Close popup tab
await popup.close();`}
          playwrightTip="Always wrap page.waitForEvent('popup') in Promise.all() alongside the action that triggers it to prevent race conditions!"
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
                🚀 Popup window opened. Playwright tests can control both tabs simultaneously via BrowserContext!
              </div>
            )}
          </div>
        </ChallengeCard>
      </div>
    </div>
  );
};
