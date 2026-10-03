import React, { useState, useEffect } from 'react';
import { ChallengeCard } from '../components/ChallengeCard';
import { Lock, Unlock, Key, Cookie, Database, LogOut } from 'lucide-react';

export const AuthAndStorageModule: React.FC = () => {
  const [username, setUsername] = useState('gigachad');
  const [password, setPassword] = useState('secretpassword123');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState('');

  // Inspect storage
  const [storageDump, setStorageDump] = useState<{
    local: string;
    session: string;
    cookie: string;
  }>({ local: '', session: '', cookie: '' });

  const refreshStorage = () => {
    setStorageDump({
      local: localStorage.getItem('auth_token') || 'None',
      session: sessionStorage.getItem('session_active') || 'None',
      cookie: document.cookie || 'None'
    });
  };

  useEffect(() => {
    // Check if token exists on load
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsLoggedIn(true);
    }
    refreshStorage();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (username === 'gigachad' && password === 'secretpassword123') {
      localStorage.setItem('auth_token', 'jwt_rizz_token_999');
      sessionStorage.setItem('session_active', 'true');
      document.cookie = 'user_rizz_role=vip_tester; path=/; max-age=3600; SameSite=Lax';
      setIsLoggedIn(true);
      refreshStorage();
    } else {
      setAuthError('Invalid credentials! Only certified gigachads allowed.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('session_active');
    document.cookie = 'user_rizz_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setIsLoggedIn(false);
    refreshStorage();
  };

  return (
    <ChallengeCard
      id="auth-and-storage"
      badge="🔐 GATEKEPT"
      badgeColor="purple"
      title="Authentication, Cookies & Browser Storage"
      description="Practice login flows, storage inspection, session state persistence, and Playwright storageState()."
      playwrightCode={`// 1. Perform login
await page.getByTestId('auth-input-username').fill('gigachad');
await page.getByTestId('auth-input-password').fill('secretpassword123');
await page.getByTestId('btn-auth-login').click();

// 2. Assert VIP protected chamber
await expect(page.getByTestId('protected-vip-chamber')).toBeVisible();

// 3. Inspect cookies & localStorage in Playwright
const cookies = await page.context().cookies();
expect(cookies.some(c => c.name === 'user_rizz_role')).toBeTruthy();

// 4. Save storage state for reuse in other tests!
await page.context().storageState({ path: 'storageState.json' });

// 5. Logout
await page.getByTestId('btn-auth-logout').click();
await expect(page.getByTestId('auth-login-form')).toBeVisible();`}
      playwrightTip="Use test.use({ storageState: 'storageState.json' }) to bypass repeating logins in every test!"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Login Form or VIP Chamber */}
        <div>
          {!isLoggedIn ? (
            <form onSubmit={handleLogin} data-testid="auth-login-form" className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-[#FF4365]" />
                <span className="text-xs font-mono font-bold text-white uppercase">Protected Member Gate</span>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Username:</label>
                <input
                  type="text"
                  data-testid="auth-input-username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#161B26] border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#7B2CBF]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Password:</label>
                <input
                  type="password"
                  data-testid="auth-input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#161B26] border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#7B2CBF]"
                />
              </div>

              {authError && (
                <div data-testid="auth-error-msg" className="text-xs font-mono text-[#FF4365] bg-[#FF4365]/20 p-2 rounded">
                  ⚠️ {authError}
                </div>
              )}

              <button
                type="submit"
                data-testid="btn-auth-login"
                className="btn-neo-purple w-full py-2 text-xs bg-[#7B2CBF] text-white hover:bg-[#6a24a6] border-2 border-black rounded shadow-brutal font-bold"
              >
                Sign In to VIP Penthouse 🔑
              </button>
            </form>
          ) : (
            <div data-testid="protected-vip-chamber" className="space-y-4 p-4 bg-[#7B2CBF]/10 border-2 border-[#7B2CBF] rounded-xl text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Unlock className="w-5 h-5 text-[#00F5D4]" />
                  <h4 className="font-bold text-sm text-[#00F5D4]">VIP Executive Penthouse</h4>
                </div>
                <button
                  data-testid="btn-auth-logout"
                  onClick={handleLogout}
                  className="btn-neo-pink text-xs py-1 px-2.5 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
              <p className="text-xs text-slate-300">
                Welcome back, <strong className="text-white font-mono">{username}</strong>! Your JWT auth token is persisted in <code>localStorage</code> and session cookie is active.
              </p>
            </div>
          )}
        </div>

        {/* Right: Storage Inspector */}
        <div className="p-3 bg-[#0B0E17] border border-slate-800 rounded-lg space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400 font-bold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#00F5D4]" />
              <span>Storage Monitor</span>
            </span>
            <button
              onClick={refreshStorage}
              data-testid="btn-refresh-storage"
              className="text-[10px] text-[#00BBF9] hover:underline"
            >
              Refresh
            </button>
          </div>

          <div>
            <span className="text-slate-500">localStorage('auth_token'):</span>
            <div data-testid="inspect-local-storage" className="text-[#00F5D4] truncate mt-0.5">
              {storageDump.local}
            </div>
          </div>

          <div>
            <span className="text-slate-500">sessionStorage('session_active'):</span>
            <div data-testid="inspect-session-storage" className="text-[#FEE440] truncate mt-0.5">
              {storageDump.session}
            </div>
          </div>

          <div>
            <span className="text-slate-500">document.cookie:</span>
            <div data-testid="inspect-cookies" className="text-[#FF4365] truncate mt-0.5">
              {storageDump.cookie}
            </div>
          </div>
        </div>
      </div>
    </ChallengeCard>
  );
};
