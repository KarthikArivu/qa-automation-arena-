import React, { useEffect, useRef, useState } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { Ghost, ShieldCheck, ShieldAlert } from 'lucide-react';

export const ShadowDomModule: React.FC = () => {
  const openShadowHostRef = useRef<HTMLDivElement | null>(null);
  const closedShadowHostRef = useRef<HTMLDivElement | null>(null);
  const [openShadowState, setOpenShadowState] = useState('Default Open Shadow Text');
  const [closedShadowCount, setClosedShadowCount] = useState(0);

  useEffect(() => {
    // 1. Attach Open Shadow DOM
    if (openShadowHostRef.current && !openShadowHostRef.current.shadowRoot) {
      const shadow = openShadowHostRef.current.attachShadow({ mode: 'open' });
      shadow.innerHTML = `
        <style>
          .shadow-container {
            padding: 12px;
            background: #111827;
            border: 2px dashed #00F5D4;
            border-radius: 8px;
            color: #f3f4f6;
            font-family: monospace;
          }
          input {
            background: #1f2937;
            border: 1px solid #374151;
            color: white;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 12px;
          }
          button {
            background: #00F5D4;
            color: black;
            font-weight: bold;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            margin-left: 6px;
            cursor: pointer;
          }
          .tag {
            color: #00F5D4;
            font-weight: bold;
            margin-bottom: 6px;
            display: block;
          }
        </style>
        <div class="shadow-container" data-testid="open-shadow-container">
          <span class="tag">🌐 OPEN SHADOW DOM BOUNDARY</span>
          <p style="margin: 4px 0 8px 0; font-size: 12px;">Playwright auto-pierces open shadow roots!</p>
          <input id="open-shadow-input" data-testid="open-shadow-input" placeholder="Type inside shadow..." />
          <button id="open-shadow-btn" data-testid="open-shadow-btn">Pierce Me</button>
          <div id="open-shadow-output" data-testid="open-shadow-output" style="margin-top: 8px; color: #FEE440; font-size: 12px;">Waiting...</div>
        </div>
      `;

      const btn = shadow.getElementById('open-shadow-btn');
      const input = shadow.getElementById('open-shadow-input') as HTMLInputElement;
      const output = shadow.getElementById('open-shadow-output');

      btn?.addEventListener('click', () => {
        if (output && input) {
          output.innerText = `Pierced Successfully! Input: "${input.value}"`;
        }
      });
    }

    // 2. Attach Closed Shadow DOM
    if (closedShadowHostRef.current) {
      // Check if not already initialized
      try {
        const closedShadow = closedShadowHostRef.current.attachShadow({ mode: 'closed' });
        closedShadow.innerHTML = `
          <style>
            .closed-container {
              padding: 12px;
              background: #1e1b4b;
              border: 2px dashed #FF4365;
              border-radius: 8px;
              color: white;
              font-family: monospace;
              font-size: 12px;
            }
          </style>
          <div class="closed-container">
            <span style="color: #FF4365; font-weight: bold;">🔒 CLOSED SHADOW ROOT</span>
            <p style="margin: 4px 0;">External document cannot access element.shadowRoot directly.</p>
          </div>
        `;
      } catch (err) {
        // already attached
      }
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Open Shadow DOM */}
      <ChallengeCard
        id="open-shadow-dom"
        badge="👻 SHADOW PIERCE"
        badgeColor="green"
        title="Open Shadow DOM Piercing"
        description="Playwright locators seamlessly pierce Open Shadow DOM boundaries without special syntax!"
        playwrightCode={`// Notice: No special shadow syntax needed!
// Playwright pierces open shadow roots automatically.
await page.getByTestId('open-shadow-input').fill('Aura Points +1000');
await page.getByTestId('open-shadow-btn').click();

await expect(page.getByTestId('open-shadow-output'))
  .toContainText('Pierced Successfully!');`}
        playwrightTip="Unlike Cypress or Selenium which require .shadow() commands, Playwright's locator engine pierces open shadow roots by default."
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#00F5D4]" />
            <span>Standard Custom Web Component:</span>
          </div>
          {/* Host Element for Open Shadow Root */}
          <div ref={openShadowHostRef} data-testid="open-shadow-host" />
        </div>
      </ChallengeCard>

      {/* 2. Closed Shadow DOM */}
      <ChallengeCard
        id="closed-shadow-dom"
        badge="🔒 CLOSED SHADOW"
        badgeColor="pink"
        title="Closed Shadow DOM Boundary"
        description="Demonstrating closed shadow roots where element.shadowRoot returns null to the outside world."
        playwrightCode={`// For closed shadow roots, standard DOM APIs return null.
// Playwright requires evaluation or testing open components:
const shadowRootNull = await page.evaluate(() => {
  const host = document.querySelector('[data-testid="closed-shadow-host"]');
  return host ? host.shadowRoot : 'not-found';
});
expect(shadowRootNull).toBeNull();`}
        playwrightTip="In modern frontend engineering, avoid mode: 'closed' when possible to preserve testability and accessibility."
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldAlert className="w-4 h-4 text-[#FF4365]" />
            <span>Closed Mode Host:</span>
          </div>
          {/* Host Element for Closed Shadow Root */}
          <div ref={closedShadowHostRef} data-testid="closed-shadow-host" />
        </div>
      </ChallengeCard>
    </div>
  );
};
