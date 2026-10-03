import React, { useState } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { EyeOff, Play, Pause, ArrowDown } from 'lucide-react';

export const VisualEdgeCasesModule: React.FC = () => {
  const [animationsPaused, setAnimationsPaused] = useState(false);
  const [offscreenClicked, setOffscreenClicked] = useState(false);
  const [coveredButtonClicked, setCoveredButtonClicked] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Hidden Elements (display:none, visibility:hidden, opacity:0) */}
      <ChallengeCard
        id="hidden-dom-states"
        badge="👻 VISIBILITY"
        badgeColor="pink"
        title="Hidden Elements & Opacity"
        description="Verify the difference between attached in DOM vs visible to user with toBeHidden() and isVisible()."
        playwrightCode={`// 1. Element with display: none
const displayNoneEl = page.getByTestId('el-display-none');
await expect(displayNoneEl).toBeHidden();
await expect(displayNoneEl).toBeAttached(); // Still exists in DOM!

// 2. Element with visibility: hidden
await expect(page.getByTestId('el-visibility-hidden')).toBeHidden();

// 3. Element with opacity: 0
await expect(page.getByTestId('el-opacity-zero')).toBeHidden();`}
        playwrightTip="Playwright checks 4 things for visibility: non-zero width/height, display!=none, visibility!=hidden, opacity!=0."
      >
        <div className="space-y-3 font-mono text-xs">
          <div className="p-2.5 bg-[#161B26] border border-slate-800 rounded">
            <span className="text-slate-400 block mb-1">Elements rendered in DOM:</span>
            
            {/* Display None */}
            <div data-testid="el-display-none" style={{ display: 'none' }}>
              I have style="display: none"
            </div>

            {/* Visibility Hidden */}
            <div data-testid="el-visibility-hidden" style={{ visibility: 'hidden', height: 0 }}>
              I have style="visibility: hidden"
            </div>

            {/* Opacity Zero */}
            <div data-testid="el-opacity-zero" style={{ opacity: 0, height: 0 }}>
              I have style="opacity: 0"
            </div>

            <div className="text-[11px] text-slate-500">
              ✅ 3 hidden elements are present in the DOM tree right now for Playwright assertion.
            </div>
          </div>

          {/* Offscreen element demo */}
          <div className="p-2.5 bg-[#161B26] border border-slate-800 rounded space-y-2">
            <div className="text-slate-300 font-bold">Scrollable Overflow Zone:</div>
            <div className="h-24 overflow-y-scroll border border-slate-700 rounded p-2 bg-[#090D15]">
              <div className="h-32 text-slate-500 text-[11px]">Scroll down to reach the secret button...</div>
              <button
                data-testid="btn-offscreen-secret"
                onClick={() => setOffscreenClicked(true)}
                className="btn-neo-pink text-xs py-1 px-3 w-full"
              >
                Deep Buried Treasure 💎
              </button>
            </div>
            {offscreenClicked && (
              <span data-testid="offscreen-success" className="text-xs text-[#00F5D4] block font-bold">
                Playwright scrolled into view and clicked!
              </span>
            )}
          </div>
        </div>
      </ChallengeCard>

      {/* 2. Visual Regression & Animation Freezing */}
      <ChallengeCard
        id="visual-regression"
        badge="📸 VISUAL REGRESSION"
        badgeColor="green"
        title="Visual Snapshots & Animations"
        description="Pause CSS animations for deterministic toHaveScreenshot() pixel-by-pixel comparisons."
        playwrightCode={`// 1. Deterministic visual screenshot
await expect(page.getByTestId('snapshot-target-card'))
  .toHaveScreenshot('genz-card.png', {
    animations: 'disabled', // Automatically freezes animations!
    maxDiffPixels: 50
  });`}
        playwrightTip="Playwright automatically freezes CSS animations and transitions when taking screenshots by default!"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Toggle Animation:</span>
            <button
              data-testid="btn-toggle-animation"
              onClick={() => setAnimationsPaused(!animationsPaused)}
              className="btn-neo-green text-xs py-1 px-3 flex items-center gap-1.5"
            >
              {animationsPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              <span>{animationsPaused ? 'Resume Pulse' : 'Freeze Animation'}</span>
            </button>
          </div>

          <div
            data-testid="snapshot-target-card"
            className="p-4 rounded-xl border-2 border-[#00F5D4] bg-[#0E1320] text-center shadow-brutal"
          >
            <div
              className={`w-12 h-12 mx-auto rounded-full bg-[#00F5D4] flex items-center justify-center text-black font-bold text-lg mb-2 shadow-brutal ${
                animationsPaused ? '' : 'animate-bounce'
              }`}
            >
              ⚡
            </div>
            <h4 className="font-bold text-sm text-white">Pixel-Perfect Snapshot Target</h4>
            <p className="text-xs text-slate-400 mt-1">
              Ready for <code>expect(locator).toHaveScreenshot()</code>
            </p>
          </div>
        </div>
      </ChallengeCard>
    </div>
  );
};
