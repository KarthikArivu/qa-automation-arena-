import React, { useState } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { Globe, WifiOff, AlertOctagon, CheckCircle2, Clock } from 'lucide-react';

export const NetworkChaosModule: React.FC = () => {
  const [statusCode, setStatusCode] = useState<number>(200);
  const [responseOutput, setResponseOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [flakyAttempts, setFlakyAttempts] = useState(0);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);

  // Trigger simulated API call
  const triggerApiCall = async (codeToSimulate: number, delayMs: number = 0) => {
    setIsLoading(true);
    setResponseOutput('Request dispatched...');

    if (isSimulatedOffline) {
      setTimeout(() => {
        setIsLoading(false);
        setResponseOutput('NETWORK_ERROR: Device is currently offline (net::ERR_INTERNET_DISCONNECTED)');
      }, 300);
      return;
    }

    try {
      // We actually call fetch to /sample-data.json or a custom route
      // which Playwright's page.route() can intercept!
      const res = await fetch(`/sample-data.json?simulate_status=${codeToSimulate}`, {
        headers: { 'Accept': 'application/json' }
      });

      if (delayMs > 0) {
        await new Promise(r => setTimeout(r, delayMs));
      }

      if (codeToSimulate === 200) {
        const json = await res.json();
        setResponseOutput(`HTTP 200 OK: ${JSON.stringify(json.data)}`);
      } else if (codeToSimulate === 201) {
        setResponseOutput(`HTTP 201 CREATED: Resource successfully minted on chain!`);
      } else if (codeToSimulate === 400) {
        setResponseOutput(`HTTP 400 BAD REQUEST: "Bro what is that payload?"`);
      } else if (codeToSimulate === 401) {
        setResponseOutput(`HTTP 401 UNAUTHORIZED: Missing Gen Z VIP token`);
      } else if (codeToSimulate === 404) {
        setResponseOutput(`HTTP 404 NOT FOUND: Vibe not found in this universe`);
      } else if (codeToSimulate === 500) {
        setResponseOutput(`HTTP 500 INTERNAL SERVER ERROR: Backend caught fire 🔥`);
      }
    } catch (err: any) {
      setResponseOutput(`FETCH FAILED: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Flaky request handler
  const triggerFlakyRequest = () => {
    setIsLoading(true);
    const nextAttempt = flakyAttempts + 1;
    setFlakyAttempts(nextAttempt);

    setTimeout(() => {
      setIsLoading(false);
      if (nextAttempt < 3) {
        setResponseOutput(`FLAKY FAIL (Attempt ${nextAttempt}/3): 503 Service Unavailable`);
      } else {
        setResponseOutput(`FLAKY SUCCESS (Attempt ${nextAttempt}/3): 200 OK - Third time is the charm!`);
        setFlakyAttempts(0);
      }
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Status Codes & Route Mocking */}
      <ChallengeCard
        id="network-mocking"
        badge="🌐 INTERCEPTION"
        badgeColor="pink"
        title="Mock API Requests & Status Codes"
        description="Intercept HTTP requests using page.route() to mock 200, 404, 500 status codes and custom JSON payloads."
        playwrightCode={`// Intercept request to /sample-data.json
await page.route('**/sample-data.json*', async route => {
  // Return custom mocked response!
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      data: { title: 'MOCKED FROM PLAYWRIGHT', slangScore: 999 }
    })
  });
});

await page.getByTestId('btn-status-200').click();
await expect(page.getByTestId('api-response-box'))
  .toContainText('MOCKED FROM PLAYWRIGHT');`}
        playwrightTip="Use page.route() to simulate server crashes (500) or slow networks without touching backend code."
      >
        <div className="space-y-3">
          <label className="text-xs font-mono text-slate-300 block">Select Status Code to Dispatch:</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 200, label: '200 OK', color: 'btn-neo-green' },
              { code: 201, label: '201 Created', color: 'btn-neo-cyan' },
              { code: 400, label: '400 Bad', color: 'btn-neo-yellow' },
              { code: 401, label: '401 Auth', color: 'btn-neo-yellow' },
              { code: 404, label: '404 Miss', color: 'btn-neo-pink' },
              { code: 500, label: '500 Error', color: 'btn-neo-pink' }
            ].map(item => (
              <button
                key={item.code}
                data-testid={`btn-status-${item.code}`}
                disabled={isLoading}
                onClick={() => triggerApiCall(item.code)}
                className={`${item.color} text-xs py-1.5 font-mono font-bold`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            data-testid="api-response-box"
            className="p-3 bg-[#0B0E17] border border-slate-800 rounded-lg min-h-16 font-mono text-xs text-[#00F5D4] overflow-x-auto"
          >
            {isLoading ? '⏳ Waiting for network response...' : responseOutput || 'Awaiting request trigger...'}
          </div>
        </div>
      </ChallengeCard>

      {/* 2. Latency & Flaky Requests */}
      <ChallengeCard
        id="network-latency-flaky"
        badge="⚡ CHAOS"
        badgeColor="yellow"
        title="Simulated Latency & Flaky APIs"
        description="Handle slow network responses using page.waitForResponse() and retry flaky endpoints."
        playwrightCode={`// 1. Wait for specific API response concurrently
const [response] = await Promise.all([
  page.waitForResponse(res => res.url().includes('sample-data') && res.status() === 200),
  page.getByTestId('btn-slow-network').click()
]);

expect(response.ok()).toBeTruthy();

// 2. Offline Mode
await page.context().setOffline(true);
await page.getByTestId('btn-status-200').click();
await expect(page.getByTestId('api-response-box')).toContainText('ERR_INTERNET_DISCONNECTED');`}
        playwrightTip="Combine page.waitForResponse() with Promise.all() to prevent race conditions during async fetches."
      >
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <button
              data-testid="btn-slow-network"
              disabled={isLoading}
              onClick={() => triggerApiCall(200, 2500)}
              className="btn-neo-yellow text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Simulate 2.5s Latency</span>
            </button>

            <button
              data-testid="btn-flaky-request"
              disabled={isLoading}
              onClick={triggerFlakyRequest}
              className="btn-neo-cyan text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>Flaky API (Attempts: {flakyAttempts})</span>
            </button>
          </div>

          <div className="p-3 bg-[#161B26] border border-slate-800 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WifiOff className={`w-4 h-4 ${isSimulatedOffline ? 'text-[#FF4365]' : 'text-slate-400'}`} />
              <span className="text-xs font-mono text-slate-300">
                Offline Mode Toggle: <span className="font-bold text-white">{isSimulatedOffline ? 'OFFLINE' : 'ONLINE'}</span>
              </span>
            </div>
            <button
              data-testid="btn-toggle-offline"
              onClick={() => setIsSimulatedOffline(!isSimulatedOffline)}
              className={`text-xs px-2.5 py-1 rounded font-mono font-bold border ${
                isSimulatedOffline ? 'bg-[#FF4365] text-white border-black' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              {isSimulatedOffline ? 'Go Online' : 'Go Offline'}
            </button>
          </div>
        </div>
      </ChallengeCard>
    </div>
  );
};
