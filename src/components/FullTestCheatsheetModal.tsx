import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Zap } from 'lucide-react';

interface FullTestCheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FULL_SUITE_CODE = `// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Playwright Gen Z Arena - Master Automation Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the playground (e.g. local or deployed Vercel URL)
    await page.goto('/');
  });

  // 1. Text Inputs & Password Toggle
  test('Form Controls: Inputs & Password', async ({ page }) => {
    await page.getByTestId('input-username').fill('karthik_god');
    await expect(page.getByTestId('username-echo')).toContainText('karthik_god');

    await page.getByTestId('input-password').fill('SecretRizz123');
    await page.getByTestId('btn-toggle-password').click();
    await expect(page.getByTestId('input-password')).toHaveAttribute('type', 'text');

    await page.getByTestId('textarea-bio').fill('Automating Playwright like a boss fr fr');
    await expect(page.getByTestId('char-counter')).toContainText('38 / 120');
  });

  // 2. Sliders, Radios & Checkboxes
  test('Form Controls: Sliders & Checkboxes', async ({ page }) => {
    await page.getByTestId('slider-rizz').fill('95');
    await expect(page.getByTestId('rizz-badge')).toHaveText('95% RIZZ');

    await page.getByTestId('toggle-switch').click();
    await expect(page.getByTestId('toggle-status')).toHaveText('MAINFRAME OVERCLOCKED');

    await page.getByTestId('radio-delulu').check();
    await expect(page.getByTestId('radio-delulu')).toBeChecked();

    await page.getByTestId('check-aura').check();
    await expect(page.getByTestId('check-aura')).toBeChecked();
  });

  // 3. Form Validation with Confetti
  test('Form Validation: Error & Success Submission', async ({ page }) => {
    // Click submit empty -> should show error
    await page.getByTestId('btn-submit-form').click();
    await expect(page.getByTestId('form-error-alert')).toBeVisible();

    // Fill valid data
    await page.getByTestId('form-input-email').fill('tester@based.io');
    await page.getByTestId('form-input-age').fill('25');
    await page.getByTestId('form-checkbox-agree').check();

    // Re-submit
    await page.getByTestId('btn-submit-form').click();
    await expect(page.getByTestId('form-success-banner')).toBeVisible();
    await expect(page.getByTestId('form-success-banner')).toContainText('RIZZ CERTIFIED');
  });

  // 4. Clicks, Double Click & Context Menu
  test('Gestures: Double Click & Right Click', async ({ page }) => {
    await page.getByTestId('btn-double-click').dblclick();
    await expect(page.getByTestId('double-click-score')).toHaveText('1');

    await page.getByTestId('right-click-zone').click({ button: 'right' });
    await expect(page.getByTestId('context-menu')).toBeVisible();
    await page.getByTestId('menu-item-rizz').click();
    await expect(page.getByTestId('context-action-result')).toContainText('Mega Rizz Activated');
  });

  // 5. Hover & Modifier Keys
  test('Gestures: Hover & Modifiers', async ({ page }) => {
    await page.getByTestId('hover-target').hover();
    await expect(page.getByTestId('secret-tooltip')).toBeVisible();

    await page.getByTestId('modifier-click-btn').click({ modifiers: ['Shift'] });
    await expect(page.getByTestId('modifier-pill')).toContainText('Shift');
  });

  // 6. Drag and Drop Kanban
  test('Interactions: Drag and Drop', async ({ page }) => {
    await page.getByTestId('card-Cook E2E Tests')
      .dragTo(page.getByTestId('column-progress'));
    await expect(page.getByTestId('column-progress')).toContainText('Cook E2E Tests');
  });

  // 7. Auto-Waiting & Dynamic Elements
  test('Async: Auto-waiting for delayed appearance', async ({ page }) => {
    await page.getByTestId('btn-trigger-delayed').click();
    // Auto-waits up to 5s
    await expect(page.getByTestId('delayed-element-target')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('delayed-element-target')).toContainText('RIZZ LOADED');
  });

  // 8. Native Browser Dialogs
  test('Dialogs: Alert & Confirm', async ({ page }) => {
    // 1. Alert
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('No Cap');
      await dialog.accept();
    });
    await page.getByTestId('btn-native-alert').click();

    // 2. Confirm
    page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await page.getByTestId('btn-native-confirm').click();
    await expect(page.getByTestId('confirm-result-display')).toContainText('NUKED');
  });

  // 9. Single & Nested iFrames
  test('iFrames: Piercing Simple and Deeply Nested Frames', async ({ page }) => {
    // Single iframe
    const simpleFrame = page.frameLocator('iframe#simple-frame');
    await simpleFrame.getByTestId('iframe-secret-input').fill('PlaywrightSecret42');
    await simpleFrame.getByTestId('iframe-submit-btn').click();
    await expect(simpleFrame.getByTestId('iframe-result-msg')).toContainText('PlaywrightSecret42');

    // Chained nested iframe
    const outerFrame = page.frameLocator('iframe#nested-parent-frame');
    const childFrame = outerFrame.frameLocator('iframe#child-nested-frame');
    await childFrame.getByTestId('deep-action-btn').click();
    await expect(childFrame.getByTestId('deep-status-text'))
      .toContainText('RIZZ_ACTIVATED_IN_THE_MATRIX');
  });

  // 10. File Upload & Download
  test('Files: In-memory upload and download capture', async ({ page }) => {
    // In-memory file upload
    await page.getByTestId('input-single-file').setInputFiles({
      name: 'playwright-test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Automated receipt content')
    });
    await expect(page.getByTestId('single-file-result')).toContainText('playwright-test.txt');

    // Intercept download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByTestId('btn-download-static').click()
    ]);
    expect(download.suggestedFilename()).toBe('sample-download.txt');
  });

  // 11. Data Tables: Search, Sort & Delete
  test('Tables: Filter, Sort and Delete row', async ({ page }) => {
    await page.getByTestId('input-table-search').fill('speed');
    await expect(page.getByTestId('table-rows-container')).toContainText('@ishowspeed');

    await page.getByTestId('input-table-search').clear();
    await page.getByTestId('btn-delete-row-3').click();
    await expect(page.getByTestId('table-row-3')).toBeHidden();
  });

  // 12. Open Shadow DOM
  test('Shadow DOM: Direct Auto-piercing', async ({ page }) => {
    await page.getByTestId('open-shadow-input').fill('Pierced through Shadow Root');
    await page.getByTestId('open-shadow-btn').click();
    await expect(page.getByTestId('open-shadow-output')).toContainText('Pierced through Shadow Root');
  });

  // 13. Network Mocking
  test('Network: Intercept and mock API response', async ({ page }) => {
    await page.route('**/sample-data.json*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: { title: 'MOCKED_IN_E2E_TEST' } })
      });
    });

    await page.getByTestId('btn-status-200').click();
    await expect(page.getByTestId('api-response-box')).toContainText('MOCKED_IN_E2E_TEST');
  });

  // 14. Authentication & Storage
  test('Auth: Login and Cookie inspection', async ({ page }) => {
    await page.getByTestId('auth-input-username').fill('gigachad');
    await page.getByTestId('auth-input-password').fill('secretpassword123');
    await page.getByTestId('btn-auth-login').click();
    await expect(page.getByTestId('protected-vip-chamber')).toBeVisible();

    const cookies = await page.context().cookies();
    expect(cookies.some(c => c.name === 'user_rizz_role')).toBeTruthy();
  });
});
`;

export const FullTestCheatsheetModal: React.FC<FullTestCheatsheetModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_SUITE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="full-cheatsheet-modal"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0E121B] border-2 border-[#00F5D4] rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-brutal overflow-hidden text-white animate-fadeIn"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#141A28] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00F5D4]" />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                Playwright Master Test Suite (100% Complete)
              </h3>
              <p className="text-xs text-slate-400">
                Copy this entire file directly into your test runner! Covers all 14 playground modules.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="btn-neo-green text-xs py-1.5 px-3 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Suite!' : 'Copy Entire Suite'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-y-auto bg-[#080B12] font-mono text-xs text-slate-300">
          <pre className="whitespace-pre leading-relaxed">{FULL_SUITE_CODE}</pre>
        </div>
      </div>
    </div>
  );
};
