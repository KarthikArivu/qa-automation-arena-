import React, { useState, useEffect, useRef } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { Loader2, Sparkles, RefreshCw } from 'lucide-react';

export const AsyncAndWaitingModule: React.FC = () => {
  // Delayed Appearance
  const [isAppearing, setIsAppearing] = useState(false);
  const [hasAppeared, setHasAppeared] = useState(false);

  // Disappearing Spinner
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [spinnerFinished, setSpinnerFinished] = useState(false);

  // Staggered Enable
  const [countdown, setCountdown] = useState<number | null>(null);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  // Progress Bar
  const [progress, setProgress] = useState(0);
  const [progressRunning, setProgressRunning] = useState(false);

  // Skeleton Loader
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [skeletonData, setSkeletonData] = useState<{ title: string; desc: string } | null>(null);

  // Infinite Scroll
  const [feedItems, setFeedItems] = useState<string[]>([
    'POV: You wrote your first Playwright locator',
    'Bro thinks manual testing is faster 💀',
    'When your selector survives a UI refactor 🗿',
    'No cap, auto-waiting changed my life fr fr'
  ]);
  const feedScrollRef = useRef<HTMLDivElement | null>(null);

  // Trigger Delayed Appearance
  const triggerDelayedAppearance = () => {
    setIsAppearing(true);
    setHasAppeared(false);
    setTimeout(() => {
      setHasAppeared(true);
      setIsAppearing(false);
    }, 2500);
  };

  // Trigger Disappearing Spinner
  const triggerSpinner = () => {
    setSpinnerActive(true);
    setSpinnerFinished(false);
    setTimeout(() => {
      setSpinnerActive(false);
      setSpinnerFinished(true);
    }, 3000);
  };

  // Trigger Staggered Countdown
  const triggerCountdown = () => {
    setCountdown(3);
    setButtonEnabled(false);
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setButtonEnabled(true);
      setCountdown(null);
    }
  }, [countdown]);

  // Trigger Progress
  const triggerProgress = () => {
    setProgress(0);
    setProgressRunning(true);
  };

  useEffect(() => {
    if (!progressRunning) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProgressRunning(false);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [progressRunning]);

  // Trigger Skeleton
  const triggerSkeleton = () => {
    setSkeletonLoading(true);
    setSkeletonData(null);
    setTimeout(() => {
      setSkeletonLoading(false);
      setSkeletonData({
        title: 'Certified Alpha Test Asset',
        desc: 'Fetched asynchronously from the serverless edge with 0ms cold start.'
      });
    }, 2000);
  };

  // Infinite scroll listener
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      // Append more items
      setFeedItems(prev => [
        ...prev,
        `Meme Card #${prev.length + 1}: Playwright locator.waitFor() hits different`,
        `Meme Card #${prev.length + 2}: Flaky test disappeared into the ether`
      ]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Delayed Element Appearance */}
      <ChallengeCard
        id="delayed-appearance"
        badge="⏱️ AUTO-WAIT"
        badgeColor="green"
        title="Delayed Element Appearance"
        description="Simulate asynchronous DOM mounting. Test Playwright's automatic retry and waiting mechanisms."
        playwrightCode={`// Click button to start 2.5s timer
await page.getByTestId('btn-trigger-delayed').click();

// Playwright auto-waits up to default timeout (30s) for toBeVisible!
await expect(page.getByTestId('delayed-element-target')).toBeVisible({ timeout: 5000 });
await expect(page.getByTestId('delayed-element-target')).toContainText('RIZZ LOADED');`}
        playwrightTip="Never use arbitrary page.waitForTimeout(3000)! Playwright assertions auto-wait and poll automatically."
      >
        <div className="space-y-4">
          <button
            data-testid="btn-trigger-delayed"
            disabled={isAppearing}
            onClick={triggerDelayedAppearance}
            className="btn-neo-green w-full text-xs py-2"
          >
            {isAppearing ? 'Mounting to DOM (Wait 2.5s)...' : 'Spawn Delayed Element (2.5s)'}
          </button>

          <div className="min-h-16 flex items-center justify-center p-3 bg-[#161B26] rounded-lg border border-slate-800">
            {isAppearing && (
              <div data-testid="loader-delay" className="flex items-center gap-2 text-xs font-mono text-[#00F5D4]">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Simulating backend latency...</span>
              </div>
            )}
            {hasAppeared && (
              <div
                data-testid="delayed-element-target"
                className="w-full p-2.5 bg-[#00F5D4]/20 border border-[#00F5D4] rounded text-center text-xs font-mono text-[#00F5D4] font-bold animate-fadeIn"
              >
                ✨ RIZZ LOADED IN DOM fr fr!
              </div>
            )}
            {!isAppearing && !hasAppeared && (
              <span className="text-xs text-slate-500 font-mono">Click button to trigger delayed render</span>
            )}
          </div>
        </div>
      </ChallengeCard>

      {/* 2. Disappearing Element / Spinners */}
      <ChallengeCard
        id="disappearing-spinner"
        badge="👻 DETACHMENT"
        badgeColor="pink"
        title="Disappearing Spinners & Loaders"
        description="Assert that an element is currently in the DOM and then disappears or becomes hidden."
        playwrightCode={`// 1. Trigger spinner
await page.getByTestId('btn-start-spinner').click();
await expect(page.getByTestId('active-spinner')).toBeVisible();

// 2. Wait for it to disappear from the DOM
await expect(page.getByTestId('active-spinner')).toBeHidden({ timeout: 5000 });
await expect(page.getByTestId('spinner-done-badge')).toBeVisible();`}
        playwrightTip="toBeHidden() asserts that the element either has display:none/visibility:hidden or is removed from the DOM."
      >
        <div className="space-y-4">
          <button
            data-testid="btn-start-spinner"
            disabled={spinnerActive}
            onClick={triggerSpinner}
            className="btn-neo-pink w-full text-xs py-2"
          >
            {spinnerActive ? 'Processing...' : 'Start Loading Spinner (3s)'}
          </button>

          <div className="min-h-16 flex items-center justify-center p-3 bg-[#161B26] rounded-lg border border-slate-800">
            {spinnerActive && (
              <div data-testid="active-spinner" className="flex items-center gap-2 text-xs font-mono text-[#FF4365]">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Heavy payload processing...</span>
              </div>
            )}
            {spinnerFinished && !spinnerActive && (
              <div
                data-testid="spinner-done-badge"
                className="w-full p-2 bg-[#00F5D4]/20 border border-[#00F5D4] rounded text-center text-xs font-mono text-[#00F5D4] font-bold"
              >
                ✅ Loading Complete (Spinner successfully detached)
              </div>
            )}
            {!spinnerActive && !spinnerFinished && (
              <span className="text-xs text-slate-500 font-mono">Spinner is currently idle</span>
            )}
          </div>
        </div>
      </ChallengeCard>

      {/* 3. Attribute Mutation (Disabled -> Enabled) */}
      <ChallengeCard
        id="attribute-change"
        badge="⏳ STATE"
        badgeColor="yellow"
        title="Dynamic Attribute State"
        description="Buttons or inputs transitioning from disabled to enabled after timed countdowns."
        playwrightCode={`// 1. Start countdown
await page.getByTestId('btn-start-countdown').click();

// 2. Button is disabled initially
await expect(page.getByTestId('btn-staggered-action')).toBeDisabled();

// 3. Auto-waits until enabled
await expect(page.getByTestId('btn-staggered-action')).toBeEnabled({ timeout: 6000 });
await page.getByTestId('btn-staggered-action').click();`}
        playwrightTip="toBeEnabled() automatically retries until the disabled attribute is removed or false."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              data-testid="btn-start-countdown"
              onClick={triggerCountdown}
              className="btn-neo-yellow text-xs py-1.5 px-3"
            >
              Start 3s Countdown
            </button>
            <span data-testid="countdown-timer-display" className="font-mono text-xs text-yellow-400">
              {countdown !== null ? `Unlocks in: ${countdown}s` : buttonEnabled ? 'Unlocked!' : 'Locked'}
            </span>
          </div>

          <button
            data-testid="btn-staggered-action"
            disabled={!buttonEnabled}
            onClick={() => alert('VIP Action Executed!')}
            className={`w-full py-2.5 rounded-lg font-bold text-xs border-2 transition-all ${
              buttonEnabled
                ? 'bg-[#00F5D4] text-black border-black cursor-pointer shadow-brutal'
                : 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed'
            }`}
          >
            {buttonEnabled ? '🚀 VIP Claim Button (Ready!)' : '🔒 Button Disabled'}
          </button>
        </div>
      </ChallengeCard>

      {/* 4. Infinite Scroll Feed */}
      <ChallengeCard
        id="infinite-scroll"
        badge="📜 SCROLL"
        badgeColor="purple"
        title="Infinite Scroll Container"
        description="Scroll containers to trigger dynamic lazy loading and assert newly appended elements."
        playwrightCode={`// Scroll down the infinite container
const scrollBox = page.getByTestId('infinite-scroll-box');
await scrollBox.evaluate(node => node.scrollTop = node.scrollHeight);

// Assert newly loaded item exists
await expect(page.getByTestId('feed-item-4')).toBeVisible();`}
        playwrightTip="Use locator.scrollIntoViewIfNeeded() or element.evaluate() to trigger scroll listeners."
      >
        <div
          ref={feedScrollRef}
          data-testid="infinite-scroll-box"
          onScroll={handleScroll}
          className="h-36 overflow-y-auto space-y-2 pr-1 border border-slate-800 rounded-lg p-2 bg-[#090D15]"
        >
          {feedItems.map((item, idx) => (
            <div
              key={idx}
              data-testid={`feed-item-${idx}`}
              className="p-2 bg-[#161B26] border border-slate-700/60 rounded text-xs font-mono text-slate-200"
            >
              {item}
            </div>
          ))}
          <div className="text-center text-[10px] text-slate-500 font-mono py-1">
            ⬇️ Scroll down inside box to load more cards...
          </div>
        </div>
      </ChallengeCard>
    </div>
  );
};
