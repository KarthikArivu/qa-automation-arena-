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
  const [scoreRating, setScoreRating] = useState(75);
  const [accentColor, setAccentColor] = useState('#00F5D4');
  const [switchToggled, setSwitchToggled] = useState(false);
  const [radioChoice, setRadioChoice] = useState('high_priority');
  const [selectedServices, setSelectedServices] = useState<string[]>(['notifications']);
  const [favTheme, setFavTheme] = useState('dark_enterprise');
  
  // Combobox
  const [comboSearch, setComboSearch] = useState('');
  const [comboOpen, setComboOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');
  const regionOptions = ['North America', 'Western Europe', 'Asia Pacific', 'Latin America', 'Middle East', 'Australia'];

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
      setDebouncedResult(`Query filtered for: "${debouncedInput}"`);
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
      setFormError('Invalid email format. Please provide a valid email address.');
      return;
    }
    const ageNum = parseInt(formAge, 10);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 99) {
      setFormError('Age must be between 18 and 99 years.');
      return;
    }
    if (!agreeTerms) {
      setFormError('You must agree to the Terms of Service to submit.');
      return;
    }

    setFormSuccess(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const toggleService = (item: string) => {
    setSelectedServices(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 1. Core Inputs */}
      <ChallengeCard
        id="text-inputs"
        badge="INPUT FIELDS"
        badgeColor="green"
        title="Text, Password & Textarea"
        description="Verify input values, password visibility toggling, and character limits."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Username <span className="text-[#FF4365]">*</span>
            </label>
            <input
              type="text"
              data-testid="input-username"
              placeholder="e.g. karthik_qa_lead"
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
              Account Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                data-testid="input-password"
                placeholder="Enter password..."
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
              <label className="text-xs font-mono text-slate-300">Description (Max 120)</label>
              <span className="text-[11px] font-mono text-slate-400" data-testid="char-counter">
                {bio.length} / 120
              </span>
            </div>
            <textarea
              data-testid="textarea-bio"
              maxLength={120}
              rows={2}
              placeholder="Enter brief description..."
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
        badge="CONTROLS"
        badgeColor="yellow"
        title="Range Sliders & Switches"
        description="Interact with numeric range sliders, custom toggle switches, and color pickers."
      >
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-mono text-slate-300">Score Rating Slider</label>
              <span
                data-testid="rizz-badge"
                className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-[#FEE440] text-black"
              >
                {scoreRating}% RATING
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={scoreRating}
              data-testid="slider-rizz"
              onChange={(e) => setScoreRating(Number(e.target.value))}
              className="w-full accent-[#FEE440] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#161B26] rounded-lg border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">System Feature Flag</div>
              <div
                data-testid="toggle-status"
                className={`text-[11px] font-mono ${switchToggled ? 'text-[#00F5D4]' : 'text-slate-400'}`}
              >
                {switchToggled ? 'FLAG_STATUS_ACTIVE' : 'FLAG_STATUS_DISABLED'}
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
            <label className="text-xs font-mono text-slate-300">Accent Color Picker:</label>
            <input
              type="color"
              data-testid="input-color-picker"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-8 h-8 rounded border-0 cursor-pointer bg-transparent"
            />
            <span
              data-testid="color-code"
              className="font-mono text-xs px-2 py-1 bg-black/40 rounded border border-slate-700"
              style={{ color: accentColor }}
            >
              {accentColor}
            </span>
          </div>
        </div>
      </ChallengeCard>

      {/* 3. Checkboxes & Radio Buttons */}
      <ChallengeCard
        id="checkboxes-radios"
        badge="SELECTIONS"
        badgeColor="purple"
        title="Radio Buttons, Checkboxes & Selects"
        description="Verify radio selections, multiple checkbox states, and native select options."
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-2">Priority Tier:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'standard', label: 'Standard Tier' },
                { id: 'high_priority', label: 'High Priority' },
                { id: 'critical', label: 'Critical' },
                { id: 'delulu', label: 'Expedited Review' }
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
                    name="priority_tier"
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
            <label className="block text-xs font-mono text-slate-400 mb-2">Service Subscriptions:</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'aura', label: 'Audit Logs' },
                { id: 'notifications', label: 'Notifications' },
                { id: 'reports', label: 'Weekly Reports' }
              ].map(service => (
                <label
                  key={service.id}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161B26] border border-slate-800 text-xs text-slate-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    data-testid={`check-${service.id}`}
                    checked={selectedServices.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                    className="accent-[#00F5D4] rounded"
                  />
                  <span>{service.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">Theme Preset:</label>
            <select
              data-testid="select-aesthetic"
              value={favTheme}
              onChange={(e) => setFavTheme(e.target.value)}
              className="w-full bg-[#161B26] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F5D4]"
            >
              <option value="dark_enterprise">Dark Enterprise</option>
              <option value="cyberpunk">High Contrast Slate</option>
              <option value="light_minimal">Light Minimal</option>
              <option value="terminal">Terminal Monochrome</option>
            </select>
          </div>
        </div>
      </ChallengeCard>

      {/* 4. Combobox & Debounced Search */}
      <ChallengeCard
        id="combobox-debounced"
        badge="AUTOCOMPLETE"
        badgeColor="cyan"
        title="Combobox Autocomplete & Debounce"
        description="Filter records through custom autocomplete suggestions and verify debounced search inputs."
      >
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Region Lookup Combobox:
            </label>
            <input
              type="text"
              data-testid="input-combobox"
              placeholder="Search region (e.g. Europe)..."
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
                {regionOptions
                  .filter(r => r.toLowerCase().includes(comboSearch.toLowerCase()))
                  .map(option => (
                    <div
                      key={option}
                      data-testid={`combo-option-${option}`}
                      onClick={() => {
                        setSelectedRegion(option);
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
            {selectedRegion && (
              <p className="text-[11px] font-mono text-[#00BBF9] mt-1" data-testid="selected-meme-tag">
                Selected: {selectedRegion}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Debounced Live Query (600ms):
            </label>
            <input
              type="text"
              data-testid="input-debounced"
              placeholder="Type to trigger debounced filter..."
              value={debouncedInput}
              onChange={(e) => setDebouncedInput(e.target.value)}
              className="w-full bg-[#161B26] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00BBF9]"
            />
            <div className="mt-2 min-h-6">
              {isDebouncing && (
                <span data-testid="debounced-loading" className="text-xs text-yellow-400 font-mono animate-pulse">
                  Query in progress...
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
          badge="FORM SUBMISSION"
          badgeColor="pink"
          title="Strict Form Validation & Handling"
          description="Validate required fields, email format, age boundaries, terms agreement, and success states."
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
                  placeholder="user@enterprise.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full bg-[#161B26] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#FF4365]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Age (18 - 99) <span className="text-[#FF4365]">*</span>
                </label>
                <input
                  type="number"
                  data-testid="form-input-age"
                  placeholder="25"
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
                I agree to the Terms of Service and End User License Agreement.
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
                    <h4 className="text-sm font-bold text-[#00F5D4]">VALIDATION PASSED (HTTP 200)</h4>
                    <p className="text-xs text-slate-300">All input criteria verified successfully.</p>
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
              Submit Application
            </button>
          </form>
        </ChallengeCard>
      </div>
    </div>
  );
};
