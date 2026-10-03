import React, { useEffect, useRef } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export const ShadowDomModule: React.FC = () => {
  const openShadowHostRef = useRef<HTMLDivElement | null>(null);
  const closedShadowHostRef = useRef<HTMLDivElement | null>(null);

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
          <span class="tag">🌐 OPEN SHADOW ROOT BOUNDARY</span>
          <p style="margin: 4px 0 8px 0; font-size: 12px;">Encapsulated component DOM tree (Mode: Open).</p>
          <input id="open-shadow-input" data-testid="open-shadow-input" placeholder="Enter shadow input..." />
          <button id="open-shadow-btn" data-testid="open-shadow-btn">Verify Input</button>
          <div id="open-shadow-output" data-testid="open-shadow-output" style="margin-top: 8px; color: #FEE440; font-size: 12px;">Waiting...</div>
        </div>
      `;

      const btn = shadow.getElementById('open-shadow-btn');
      const input = shadow.getElementById('open-shadow-input') as HTMLInputElement;
      const output = shadow.getElementById('open-shadow-output');

      btn?.addEventListener('click', () => {
        if (output && input) {
          output.innerText = `Verified Successfully! Input: "${input.value}"`;
        }
      });
    }

    // 2. Attach Closed Shadow DOM
    if (closedShadowHostRef.current) {
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
            <p style="margin: 4px 0;">External document cannot access element.shadowRoot directly via public DOM APIs.</p>
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
        badge="OPEN SHADOW"
        badgeColor="green"
        title="Open Shadow DOM Boundary"
        description="Verify input and click interactions within open encapsulated shadow roots."
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#00F5D4]" />
            <span>Custom Web Component (Open Root):</span>
          </div>
          <div ref={openShadowHostRef} data-testid="open-shadow-host" />
        </div>
      </ChallengeCard>

      {/* 2. Closed Shadow DOM */}
      <ChallengeCard
        id="closed-shadow-dom"
        badge="CLOSED SHADOW"
        badgeColor="pink"
        title="Closed Shadow DOM Boundary"
        description="Demonstrate closed shadow DOM trees where element.shadowRoot returns null externally."
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldAlert className="w-4 h-4 text-[#FF4365]" />
            <span>Custom Web Component (Closed Mode):</span>
          </div>
          <div ref={closedShadowHostRef} data-testid="closed-shadow-host" />
        </div>
      </ChallengeCard>
    </div>
  );
};
