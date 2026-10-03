# ⚡ PLAYWRIGHT RIZZ LAB (The Ultimate Gen Z E2E Arena)

> **No Cap, Pure Automation.** A high-voltage, neo-brutalist testing ground engineered specifically for mastering **JavaScript & TypeScript Playwright**. Ready for 1-click zero-config deployment to **Vercel**.

---

## 🚀 Quick Start (Local)

```bash
# 1. Navigate to the project directory
cd playwright-genz-lab

# 2. Install dependencies (already installed)
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎭 Running the Included Playwright Test Suite

The repository includes a ready-to-run Playwright test suite in `e2e-tests/playwright-suite.spec.js` covering every challenge module on the site:

```bash
# Install Playwright browser binaries (one-time setup)
npx playwright install chromium

# Run all end-to-end tests headless
npm run test:e2e

# Or launch Playwright's interactive visual UI Mode
npx playwright test --ui

# View HTML Test Report
npx playwright show-report
```

---

## ☁️ How to Deploy to Vercel

This repository is pre-configured with a custom `vercel.json` optimized for Vite, with zero cold starts and static asset routing for all nested iframes and fixtures.

### Option A: Via Vercel CLI (Fastest)

```bash
# Run in the project directory
npx vercel

# For production deployment:
npx vercel --prod
```

### Option B: Via GitHub & Vercel Dashboard

1. Push this directory to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial playwright gen z lab"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/playwright-genz-lab.git
   git push -u origin main
   ```
2. Log in to [Vercel Dashboard](https://vercel.com).
3. Click **Add New Project** -> **Import Git Repository**.
4. Select `playwright-genz-lab`.
5. Keep default settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**! 🚀

---

## 🏆 What Can You Practice? (Coverage Matrix)

| Module | What You Practice | Playwright APIs |
| :--- | :--- | :--- |
| **01. Rizz & Inputs** | Text, password show/hide, dynamic textarea counters, range sliders, switches, color pickers, radios, multi-checkboxes, custom combobox autocomplete, debounced search, form validation & confetti. | `locator.fill()`, `locator.check()`, `locator.uncheck()`, `locator.selectOption()`, `expect().toHaveValue()`, `expect().toBeChecked()` |
| **02. Tap In & Gestures** | Single click, double click, right-click context menu, mouse hover tooltips, modifier keys (`Shift`, `Ctrl`), coordinate clicks, drag-and-drop Kanban, HTML5 canvas drawing. | `locator.dblclick()`, `locator.click({ button: 'right' })`, `locator.hover()`, `locator.dragTo()`, `page.mouse.move()`, `page.mouse.down()`, `page.mouse.up()` |
| **03. The Waiting Room** | Auto-waiting on delayed DOM elements (2.5s delay), disappearing spinners (3s), attribute changes (disabled $\rightarrow$ enabled), infinite scroll containers, skeleton loaders. | `expect().toBeVisible({ timeout })`, `expect().toBeHidden()`, `expect().toBeEnabled()`, `locator.scrollIntoViewIfNeeded()` |
| **04. Pop Off** | Native browser dialogs (`window.alert`, `window.confirm`, `window.prompt`), accessible modals with focus trap and `Escape` dismiss, nested modals, slide drawers, auto-dismissing toasts. | `page.on('dialog', dialog => dialog.accept())`, `dialog.dismiss()`, `page.keyboard.press('Escape')` |
| **05. The Multiverse** | Single standalone `<iframe>`, deeply chained nested `<iframe>` documents, popup windows spawned via `window.open()`, `target="_blank"` multi-tab management. | `page.frameLocator()`, `outerFrame.frameLocator()`, `page.waitForEvent('popup')`, `browserContext.pages()` |
| **06. Drop & Fetch** | Single file upload, multiple files upload, drag-and-drop file dropzone, file type validators, native file download interception (static & dynamic blobs). | `locator.setInputFiles()`, `page.waitForEvent('download')`, `download.saveAs()` |
| **07. Receipts & Grids** | Dynamic data table with search filtering, sortable headers (ascending/descending), pagination, select all checkboxes, inline delete, add row form. | `locator.filter({ hasText })`, table cell indexing, row deletion assertions |
| **08. Shadow Realm** | Open Shadow DOM boundaries (testing Playwright's automatic piercing engine) vs Closed Shadow DOM boundaries. | `page.locator()` (auto-pierces open shadow roots), `page.evaluate()` |
| **09. Chaos Engineering** | Network request interception, mocking status codes (200, 201, 400, 401, 404, 500), simulated 2.5s network latency, flaky request handling, simulated offline mode. | `page.route()`, `route.fulfill()`, `page.waitForResponse()`, `page.context().setOffline(true)` |
| **10. Gatekept** | Auth login form, `localStorage` JWT token storage, `sessionStorage`, cookie management, protected VIP route, Playwright storage state saving/loading. | `page.context().cookies()`, `page.context().storageState()`, `test.use({ storageState })` |
| **11. Vibe Check** | Keyboard shortcuts (`Ctrl+K` Command Palette), sequential Tab navigation (`toBeFocused()`), ARIA live region announcements (`aria-live="polite"`). | `page.keyboard.press('Control+KeyK')`, `expect().toBeFocused()`, accessible role selectors |
| **12. No Cap** | CSS edge cases: `display: none`, `visibility: hidden`, `opacity: 0`, offscreen element scrolling, animation freezing for visual regression snapshots. | `expect().toBeAttached()`, `expect().toBeHidden()`, `expect().toHaveScreenshot({ animations: 'disabled' })` |

---

## 💡 Playwright Pro Tips Cheat Sheet

1. **Auto-Waiting Over Arbitrary Timeouts**:
   Never write `await page.waitForTimeout(3000)`. Playwright web-first assertions like `await expect(locator).toBeVisible()` automatically retry with a default 5-second polling window.

2. **Dialog Event Registration**:
   Always attach `page.on('dialog')` **before** clicking the button that triggers the alert:
   ```javascript
   page.once('dialog', async dialog => {
     await dialog.accept();
   });
   await page.getByTestId('btn-native-alert').click();
   ```

3. **Popups and Downloads Concurrency**:
   Use `Promise.all()` to listen for events concurrently with the triggering action to eliminate race conditions:
   ```javascript
   const [popup] = await Promise.all([
     page.waitForEvent('popup'),
     page.getByTestId('btn-open-popup').click()
   ]);
   ```

4. **In-Memory File Uploads**:
   You don't need real files on your hard drive to test uploads:
   ```javascript
   await page.getByTestId('input-file').setInputFiles({
     name: 'test.txt',
     mimeType: 'text/plain',
     buffer: Buffer.from('mock file payload')
   });
   ```

---

## 🎨 Tech Stack
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS (Neo-Brutalist Gen Z aesthetic, Space Grotesk & JetBrains Mono)
- **Icons**: Lucide React
- **Animations / Micro-interactions**: Canvas Confetti
- **Testing Engine**: Playwright Test Runner (`@playwright/test`)
- **Hosting Target**: Vercel (Configured with `vercel.json`)
