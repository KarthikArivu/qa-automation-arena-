import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ChallengeCard } from '../components/ChallengeCard';
import { Eye, EyeOff, Sparkles, Check } from 'lucide-react';

export const FormControlsModule: React.FC = () => {
  // Input states
  const [textVal, setTextVal] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [rizzScore, setRizzScore] = useState(69);
  const [vibeColor, setVibeColor] = useState('#00F5D4');
  const [switchToggled, setSwitchToggled] = useState(false);
  const [radioChoice, setRadioChoice] = useState('no_cap');
  const [selectedSlangs, setSelectedSlangs] = useState<string[]>(['fr_fr']);
  const [favAesthetic, setFavAesthetic] = useState('hyperpop');
  
  // Combobox
  const [comboSearch, setComboSearch] = useState('');
  const [comboOpen, setComboOpen] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState('');
  const memeOptions = ['Gigachad', 'Dogecoin', 'Sigma Male', 'Giga Brain', 'SpongeBob Mocking', 'Pedro Raccoon'];

  // Debounced input
  const [debouncedInput, setDebouncedInput] = useState('');
  const [debouncedResult, setDebouncedResult] = useState('');
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    if (!debouncedInput) {
      setDebouncedResult('');
      return;
    }
    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedResult(`Filtered for "${debouncedInput}" (Ready to assert!)`);
      setIsDebouncing(false);
    }, 600);
    return () => clearTimeout(handler);
  }, [debouncedInput]);

  // Form Validation
  const [formEmail, setFormEmail] = useState('');
  const [formAge, setFormAge] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess(false);

    if (!formEmail.includes('@') || !formEmail.includes('.')) {
      setFormError('L + Ratio! Valid email required fr fr.');
      return;
    }
    const ageNum = parseInt(formAge, 10);
    if (isNaN(ageNum) || ageNum < 13 || ageNum > 99) {
      setFormError('Age must be between 13 and 99. Do not be delulu.');
      return;
    }
    if (!agreeTerms) {
      setFormError('Bro you must agree to the Gen Z terms!');
      return;
    }

    setFormSuccess(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const toggleSlang = (item: string) => {
    setSelectedSlangs(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Core Inputs */}
      <ChallengeCard
        id="text-inputs"
        badge="⚡ BASICS"
        badgeColor="green"
        title="Inputs & Textareas"
        description="Fill inputs, toggle password visibility, verify character count in dynamic textareas."
        playwrightCode={`// 1. Fill text and clear
await page.getByTestId('input-username').fill('karthik_god');
await expect(page.getByTestId('input-username')).toHaveValue('karthik_god');

// 2. Toggle password & verify type attribute
await page.getByTestId('input-password').fill('SecretRizz123');
await page.getByTestId('btn-toggle-password').click();
await expect(page.getByTestId('input-password')).toHaveAttribute('type', 'text');

// 3. Multiline textarea
await page.getByTestId('textarea-bio').fill('Just a chill dev coding e2e tests fr fr');
await expect(page.getByTestId('char-counter')).toContainText('39 / 120');`}
        playwrightTip="Use fill() rather than type() unless you explicitly need to simulate physical key press intervals."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Username <span className="text-[#FF4365]">*</span>
            </label>
            <input
              type="text"
              data-testid="input-username"
              placeholder="e.g. sigma_coder_2026"
              value={textVal}
              onChange={(e) => setTextVal(e.target.value)}
              className="w-full bg-[#161B26] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00F5D4]"
            />
            {textVal && (
              <p className="text-[11px] font-mono text-[#00F5D4] mt-1" data-testid="username-echo">
                Echo: {textVal}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Secret Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                data-testid="input-password"
                placeholder="Super secretive password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161B26] border border-slate-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-[#00F5D4]"
              />
              <button
                type="button"
                data-testid="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-slate-300">Bio (Max 120)</label>
              <span className="text-[11px] font-mono text-slate-400" data-testid="char-counter">
                {bio.length} / 120
              </span>
            </div>
            <textarea
              data-testid="textarea-bio"
              maxLength={120}
              rows={2}
              placeholder="Drop your unfiltered vibe..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#161B26] border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-[#00F5D4] resize-none"
            />
          </div>
        </div>
      </ChallengeCard>

      {/* 2. Sliders, Switches & Color Pickers */}
      <ChallengeCard
        id="sliders-switches"
        badge="💅 CONTROLS"
        badgeColor="yellow"
        title="Range Sliders & Switches"
        description="Interact with HTML5 range sliders, toggle switches, and native color pickers."
        playwrightCode={`// 1. Adjust range slider using fill() or evaluate()
const slider = page.getByTestId('slider-rizz');
await slider.fill('95');
await expect(page.getByTestId('rizz-badge')).toHaveText('95% RIZZ');

// 2. Click custom switch
await page.getByTestId('toggle-switch').click();
await expect(page.getByTestId('toggle-status')).toHaveText('MAINFRAME OVERCLOCKED');

// 3. Set Color Picker value
await page.getByTestId('input-color-picker').fill('#ff4365');`}
        playwrightTip="For range inputs, page.locator().fill('value') will trigger an input and change event reliably."
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-slate-300">Rizz Level Slider</label>
              <span
                data-testid="rizz-badge"
                className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FEE440] text-black"
              >
                {rizzScore}% RIZZ
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={rizzScore}
              data-testid="slider-rizz"
              onChange={(e) => setRizzScore(Number(e.target.value))}
              className="w-full accent-[#FEE440] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#161B26] rounded-lg border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Overclock Matrix</div>
              <div
                data-testid="toggle-status"
                className={`text-[11px] font-mono ${switchToggled ? 'text-[#00F5D4]' : 'text-slate-400'}`}
              >
                {switchToggled ? 'MAINFRAME OVERCLOCKED' : 'Standard Idle Mode'}
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={switchToggled}
              data-testid="toggle-switch"
              onClick={() => setSwitchToggled(!switchToggled)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors border border-black ${
                switchToggled ? 'bg-[#00F5D4]' : 'bg-slate-700'
              }`}
            >
              <div
                className={`bg-black w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  switchToggled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-mono text-slate-300">Vibe Color Picker:</label>
            <input
              type="color"
              data-testid="input-color-picker"
              value={vibeColor}
              onChange={(e) => setVibeColor(e.target.value)}
              className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
            />
            <span
              data-testid="color-code"
              className="font-mono text-xs px-2 py-1 bg-black/40 rounded border border-slate-700"
              style={{ color: vibeColor }}
            >
              {vibeColor}
            </span>
          </div>
        </div>
      </ChallengeCard>

      {/* 3. Checkboxes & Radio Buttons */}
      <ChallengeCard
        id="checkboxes-radios"
        badge="🗿 SELECTIONS"
        badgeColor="purple"
        title="Radios, Checkboxes & Selects"
        description="Verify radio option selections, multi-checkbox checking/unchecking, and dropdown choices."
        playwrightCode={`// 1. Select Radio Option
await page.getByTestId('radio-delulu').check();
await expect(page.getByTestId('radio-delulu')).toBeChecked();

// 2. Toggle Checkbox
await page.getByTestId('check-no_cap').check();
await expect(page.getByTestId('check-no_cap')).toBeChecked();

// 3. Native Select Option
await page.getByTestId('select-aesthetic').selectOption('cyberpunk');
await expect(page.getByTestId('select-aesthetic')).toHaveValue('cyberpunk');`}
        playwrightTip="Use check() and uncheck() on checkboxes/radios rather than click() so Playwright asserts the desired state."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Select Your Reality:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'no_cap', label: 'No Cap 🧢' },
                { id: 'delulu', label: 'Delulu 🦄' },
                { id: 'fr_fr', label: 'Fr Fr 🔥' },
                { id: 'based', label: 'Based 🗿' }
              ].map(opt => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                    radioChoice === opt.id
                      ? 'bg-[#7B2CBF]/20 border-[#7B2CBF] text-white font-bold'
                      : 'bg-[#161B26] border-slate-800 text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="genz_reality"
                    data-testid={`radio-${opt.id}`}
                    value={opt.id}
                    checked={radioChoice === opt.id}
                    onChange={() => setRadioChoice(opt.id)}
                    className="accent-[#7B2CBF]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Multi-Checkboxes:</label>
            <div className="flex flex-wrap gap-2">
              {['aura', 'rizz', 'skibidi'].map(slang => (
                <label
                  key={slang}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161B26] border border-slate-800 text-xs text-slate-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    data-testid={`check-${slang}`}
                    checked={selectedSlangs.includes(slang)}
                    onChange={() => toggleSlang(slang)}
                    className="accent-[#00F5D4] rounded"
                  />
                  <span className="capitalize">{slang}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Native Dropdown:</label>
            <select
              data-testid="select-aesthetic"
              value={favAesthetic}
              onChange={(e) => setFavAesthetic(e.target.value)}
              className="w-full bg-[#161B26] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F5D4]"
            >
              <option value="hyperpop">Hyperpop & Neon</option>
              <option value="cyberpunk">Cyberpunk Glitch</option>
              <option value="cottagecore">Cottagecore Chill</option>
              <option value="darkacademia">Dark Academia</option>
            </select>
          </div>
        </div>
      </ChallengeCard>

      {/* 4. Combobox & Debounced Search */}
      <ChallengeCard
        id="combobox-debounced"
        badge="🔍 DYNAMIC"
        badgeColor="cyan"
        title="Combobox & Debounced Search"
        description="Filter dynamically via custom autocomplete combobox and assert debounced async search."
        playwrightCode={`// 1. Combobox interaction
await page.getByTestId('input-combobox').fill('Giga');
await page.getByTestId('combo-option-Gigachad').click();
await expect(page.getByTestId('input-combobox')).toHaveValue('Gigachad');

// 2. Debounced search (wait for async debounce to settle)
await page.getByTestId('input-debounced').fill('Rizzler');
await expect(page.getByTestId('debounced-loading')).toBeVisible();
await expect(page.getByTestId('debounced-result')).toContainText('Filtered for "Rizzler"');`}
        playwrightTip="For debounced search, use toContainText() or toBeVisible() which automatically retries until timeout."
      >
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Custom Memes Combobox:
            </label>
            <input
              type="text"
              data-testid="input-combobox"
              placeholder="Search meme (e.g. Giga)..."
              value={comboSearch}
              onFocus={() => setComboOpen(true)}
              onChange={(e) => {
                setComboSearch(e.target.value);
                setComboOpen(true);
              }}
              className="w-full bg-[#161B26] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00BBF9]"
            />
            {comboOpen && (
              <div
                data-testid="combobox-dropdown"
                className="absolute z-10 w-full mt-1 bg-[#121620] border border-slate-700 rounded-lg shadow-xl max-h-40 overflow-y-auto"
              >
                {memeOptions
                  .filter(m => m.toLowerCase().includes(comboSearch.toLowerCase()))
                  .map(option => (
                    <div
                      key={option}
                      data-testid={`combo-option-${option}`}
                      onClick={() => {
                        setSelectedMeme(option);
                        setComboSearch(option);
                        setComboOpen(false);
                      }}
                      className="px-3 py-2 text-xs text-slate-200 hover:bg-[#00BBF9] hover:text-black cursor-pointer font-mono"
                    >
                      {option}
                    </div>
                  ))}
              </div>
            )}
            {selectedMeme && (
              <p className="text-[11px] font-mono text-[#00BBF9] mt-1" data-testid="selected-meme-tag">
                Selected: {selectedMeme}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Debounced Live Input (600ms):
            </label>
            <input
              type="text"
              data-testid="input-debounced"
              placeholder="Start typing to trigger debounce..."
              value={debouncedInput}
              onChange={(e) => setDebouncedInput(e.target.value)}
              className="w-full bg-[#161B26] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00BBF9]"
            />
            <div className="mt-2 min-h-6">
              {isDebouncing && (
                <span data-testid="debounced-loading" className="text-xs text-yellow-400 font-mono animate-pulse">
                  ⏳ Waiting for you to stop typing...
                </span>
              )}
              {debouncedResult && !isDebouncing && (
                <span data-testid="debounced-result" className="text-xs text-[#00F5D4] font-mono">
                  {debouncedResult}
                </span>
              )}
            </div>
          </div>
        </div>
      </ChallengeCard>

      {/* 5. Complete Form Validation */}
      <div className="md:col-span-2">
        <ChallengeCard
          id="form-validation"
          badge="🔥 FULL FLOW"
          badgeColor="pink"
          title="Strict Form Validation & Success Celebration"
          description="Test form errors on invalid inputs, correction, submission, and confetti trigger."
          playwrightCode={`// 1. Test failing validation
await page.getByTestId('btn-submit-form').click();
await expect(page.getByTestId('form-error-alert')).toBeVisible();

// 2. Fill valid values
await page.getByTestId('form-input-email').fill('based.tester@genz.io');
await page.getByTestId('form-input-age').fill('21');
await page.getByTestId('form-checkbox-agree').check();

// 3. Submit and verify success banner
await page.getByTestId('btn-submit-form').click();
await expect(page.getByTestId('form-success-banner')).toBeVisible();
await expect(page.getByTestId('form-success-banner')).toContainText('RIZZ CERTIFIED');`}
          playwrightTip="Asserting error states first and then correcting them is a gold standard e2e test pattern."
        >
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Email Address <span className="text-[#FF4365]">*</span>
                </label>
                <input
                  type="text"
                  data-testid="form-input-email"
                  placeholder="vibes@sigma.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-[#161B26] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF4365]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Age (13 - 99) <span className="text-[#FF4365]">*</span>
                </label>
                <input
                  type="number"
                  data-testid="form-input-age"
                  placeholder="24"
                  value={formAge}
                  onChange={(e) => setFormAge(e.target.value)}
                  className="w-full bg-[#161B26] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF4365]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agreeTerms"
                data-testid="form-checkbox-agree"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 accent-[#FF4365] rounded cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="text-xs text-slate-300 cursor-pointer">
                I hereby swear I am not a boring boomer bot and will write clean Playwright tests.
              </label>
            </div>

            {formError && (
              <div
                role="alert"
                data-testid="form-error-alert"
                className="p-3 bg-[#FF4365]/20 border border-[#FF4365] rounded-lg text-xs font-mono text-[#FF4365] font-bold"
              >
                ⚠️ {formError}
              </div>
            )}

            {formSuccess && (
              <div
                data-testid="form-success-banner"
                className="p-4 bg-[#00F5D4]/20 border border-[#00F5D4] rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00F5D4]" />
                  <div>
                    <h4 className="text-sm font-bold text-[#00F5D4]">RIZZ CERTIFIED fr fr!</h4>
                    <p className="text-xs text-slate-300">You passed form validation with maximum clout.</p>
                  </div>
                </div>
                <span className="font-mono text-xs bg-[#00F5D4] text-black px-2 py-1 rounded font-bold">
                  200 OK
                </span>
              </div>
            )}

            <button
              type="submit"
              data-testid="btn-submit-form"
              className="btn-neo-pink w-full py-2.5 text-sm"
            >
              Verify & Send It 🚀
            </button>
          </form>
        </ChallengeCard>
      </div>
    </div>
  );
};
