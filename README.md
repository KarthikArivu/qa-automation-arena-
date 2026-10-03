# ⚡ QA Automation Arena

> **Created by Dev: Karthik Arivu 👑**  
> A comprehensive, modern web application engineered specifically for mastering **JavaScript & TypeScript Playwright** end-to-end automation testing.

---

## 🚀 Quick Start

```bash
# 1. Navigate to the project directory
cd playwright-genz-lab

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎭 Running the Included Playwright Test Suite

The repository includes a ready-to-run Playwright test suite in `e2e-tests/playwright-suite.spec.js` covering all 12 modules on the site:

```bash
# Install Playwright browser binaries (one-time setup)
npx playwright install chromium

# Run all end-to-end tests headlessly
npm run test:e2e

# Or launch Playwright's interactive visual UI Mode
npx playwright test --ui

# View HTML Test Report
npx playwright show-report
```

---

## 🏆 Module Coverage Matrix

| Module | What You Practice | Key Playwright APIs |
| :--- | :--- | :--- |
| **01. Form Controls & Validation** | Text, password show/hide, dynamic textarea counters, range sliders, switches, color pickers, radios, multi-checkboxes, custom combobox autocomplete, debounced search, form validation. | `locator.fill()`, `locator.check()`, `locator.uncheck()`, `locator.selectOption()`, `expect().toHaveValue()`, `expect().toBeChecked()` |
| **02. User Actions & Mouse Gestures** | Single click, double click, right-click context menu, mouse hover tooltips, modifier keys (`Shift`, `Ctrl`), coordinate clicks, drag-and-drop Kanban, HTML5 canvas drawing. | `locator.dblclick()`, `locator.click({ button: 'right' })`, `locator.hover()`, `locator.dragTo()`, `page.mouse.move()`, `page.mouse.down()`, `page.mouse.up()` |
| **03. Asynchronous Operations & Dynamic DOM** | Auto-waiting on delayed DOM elements (2.5s delay), disappearing spinners (3s), attribute changes (disabled $\rightarrow$ enabled), infinite scroll containers, skeleton loaders. | `expect().toBeVisible({ timeout })`, `expect().toBeHidden()`, `expect().toBeEnabled()`, `locator.scrollIntoViewIfNeeded()` |
| **04. Dialogs, Modals & Notifications** | Native browser dialogs (`window.alert`, `window.confirm`, `window.prompt`), accessible modals with focus trap and `Escape` dismiss, nested modals, slide drawers, auto-dismissing toasts. | `page.on('dialog', dialog => dialog.accept())`, `dialog.dismiss()`, `page.keyboard.press('Escape')` |
| **05. Frames & Multi-Window Management** | Single standalone `<iframe>`, deeply chained nested `<iframe>` documents, popup windows spawned via `window.open()`, `target="_blank"` multi-tab management. | `page.frameLocator()`, `outerFrame.frameLocator()`, `page.waitForEvent('popup')`, `browserContext.pages()` |
| **06. File Transfers & Downloads** | Single file upload, multiple files upload, drag-and-drop file dropzone, file type validators, native file download interception (static & dynamic blobs). | `locator.setInputFiles()`, `page.waitForEvent('download')`, `download.saveAs()` |
| **07. Data Tables & Records Management** | Dynamic data table with search filtering, sortable headers (ascending/descending), pagination, select all checkboxes, inline delete, add row form. | `locator.filter({ hasText })`, table cell indexing, row deletion assertions |
| **08. Web Components & Shadow DOM** | Open Shadow DOM boundaries (testing Playwright's automatic piercing engine) vs Closed Shadow DOM boundaries. | `page.locator()` (auto-pierces open shadow roots), `page.evaluate()` |
| **09. Network Simulation & Error Handling** | Network request interception, mocking status codes (200, 201, 400, 401, 404, 500), simulated 2.5s network latency, flaky request handling, simulated offline mode. | `page.route()`, `route.fulfill()`, `page.waitForResponse()`, `page.context().setOffline(true)` |
| **10. Authentication & Session Storage** | Login form, `localStorage` JWT token storage, `sessionStorage`, cookie management, protected dashboard route, Playwright storage state saving/loading. | `page.context().cookies()`, `page.context().storageState()`, `test.use({ storageState })` |
| **11. Keyboard Navigation & Accessibility** | Keyboard shortcuts (`Ctrl+K` Command Palette), sequential Tab navigation (`toBeFocused()`), ARIA live region announcements (`aria-live="polite"`). | `page.keyboard.press('Control+KeyK')`, `expect().toBeFocused()`, accessible role selectors |
| **12. Visual Rendering & Display States** | CSS display states: `display: none`, `visibility: hidden`, `opacity: 0`, offscreen element scrolling, animation freezing for visual regression snapshots. | `expect().toBeAttached()`, `expect().toBeHidden()`, `expect().toHaveScreenshot({ animations: 'disabled' })` |

---

## 🎨 Tech Stack
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS (Space Grotesk & JetBrains Mono)
- **Icons**: Lucide React
- **Testing Engine**: Playwright Test Runner (`@playwright/test`)
- **Author**: Karthik Arivu
