// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Automation Testing Arena - E2E Verification Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // 1. Text Inputs, Password Visibility & Bio Textarea
  test('Form Controls: Inputs & Password Toggle', async ({ page }) => {
    // Fill text input and verify echo
    const userInput = page.getByTestId('input-username');
    await userInput.fill('karthik_qa_lead');
    await expect(page.getByTestId('username-echo')).toContainText('karthik_qa_lead');

    // Password input and show/hide toggle
    const passInput = page.getByTestId('input-password');
    await passInput.fill('UltraSecretPass123');
    await expect(passInput).toHaveAttribute('type', 'password');
    await page.getByTestId('btn-toggle-password').click();
    await expect(passInput).toHaveAttribute('type', 'text');

    // Textarea and character counter
    await page.getByTestId('textarea-bio').fill('Automating testing scenarios with precision');
    await expect(page.getByTestId('char-counter')).toContainText('43 / 120');
  });

  // 2. Sliders, Switches & Radios
  test('Form Controls: Sliders, Switches & Radio Buttons', async ({ page }) => {
    // Slider
    const slider = page.getByTestId('slider-rizz');
    await slider.fill('90');
    await expect(page.getByTestId('rizz-badge')).toHaveText('90% RATING');

    // Custom Switch
    await page.getByTestId('toggle-switch').click();
    await expect(page.getByTestId('toggle-status')).toHaveText('FLAG_STATUS_ACTIVE');

    // Radio
    await page.getByTestId('radio-delulu').check();
    await expect(page.getByTestId('radio-delulu')).toBeChecked();

    // Checkbox
    await page.getByTestId('check-aura').check();
    await expect(page.getByTestId('check-aura')).toBeChecked();
  });

  // 3. Form Validation and Confetti
  test('Form Validation: Reject invalid and submit valid form', async ({ page }) => {
    // 1. Trigger error
    await page.getByTestId('btn-submit-form').click();
    await expect(page.getByTestId('form-error-alert')).toBeVisible();

    // 2. Fill valid values
    await page.getByTestId('form-input-email').fill('tester@enterprise.com');
    await page.getByTestId('form-input-age').fill('25');
    await page.getByTestId('form-checkbox-agree').check();

    // 3. Submit successfully
    await page.getByTestId('btn-submit-form').click();
    await expect(page.getByTestId('form-success-banner')).toBeVisible();
    await expect(page.getByTestId('form-success-banner')).toContainText('VALIDATION PASSED');
  });

  // 4. Double Click & Right Click Context Menu
  test('Gestures: Double Click & Right Click Context Menu', async ({ page }) => {
    // Double click
    await page.getByTestId('btn-double-click').dblclick();
    await expect(page.getByTestId('double-click-score')).toHaveText('1');

    // Right click
    await page.getByTestId('right-click-zone').click({ button: 'right' });
    await expect(page.getByTestId('context-menu')).toBeVisible();

    // Select context menu action
    await page.getByTestId('menu-item-rizz').click();
    await expect(page.getByTestId('context-action-result')).toContainText('Parameters Boosted');
  });

  // 5. Hover & Modifier Keys
  test('Gestures: Mouse Hover & Shift/Ctrl Click Modifiers', async ({ page }) => {
    // Mouse hover reveals secret tooltip
    await page.getByTestId('hover-target').hover();
    await expect(page.getByTestId('secret-tooltip')).toBeVisible();

    // Click with Shift modifier
    await page.getByTestId('modifier-click-btn').click({ modifiers: ['Shift'] });
    await expect(page.getByTestId('modifier-pill')).toContainText('Shift');
  });

  // 6. Drag and Drop Kanban
  test('Drag and Drop: Move Kanban card to Progress column', async ({ page }) => {
    const card = page.getByTestId('card-Develop E2E Suite');
    const targetCol = page.getByTestId('column-progress');

    await card.dragTo(targetCol);
    await expect(targetCol).toContainText('Develop E2E Suite');
  });

  // 7. Auto-Waiting & Delayed Appearance
  test('Async: Auto-waiting for delayed DOM element', async ({ page }) => {
    await page.getByTestId('btn-trigger-delayed').click();
    await expect(page.getByTestId('loader-delay')).toBeVisible();

    // Auto-waits up to 5s for appearance
    await expect(page.getByTestId('delayed-element-target')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('delayed-element-target')).toContainText('DATA LOADED IN DOM');
  });

  // 8. Native Dialogs: window.alert and window.confirm
  test('Dialogs: Intercept native alert and confirm', async ({ page }) => {
    // Alert listener
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('System Notification');
      await dialog.accept();
    });
    await page.getByTestId('btn-native-alert').click();

    // Confirm listener
    page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await page.getByTestId('btn-native-confirm').click();
    await expect(page.getByTestId('confirm-result-display')).toContainText('Confirmed: Record Deleted');
  });

  // 9. Accessible Modal & Nested Modal
  test('Modals: Open modal, nested modal, and dismiss with Escape', async ({ page }) => {
    await page.getByTestId('btn-open-modal').click();
    await expect(page.getByTestId('modal-dialog')).toBeVisible();

    // Open nested modal
    await page.getByTestId('btn-open-nested-modal').click();
    await expect(page.getByTestId('nested-modal-dialog')).toBeVisible();

    // Dismiss with Escape key
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('nested-modal-dialog')).toBeHidden();
  });

  // 10. Single & Nested iFrames
  test('iFrames: Piercing simple iframe and nested child frame', async ({ page }) => {
    // 1. Simple iFrame
    const simpleFrame = page.frameLocator('iframe#simple-frame');
    await simpleFrame.getByTestId('iframe-secret-input').fill('PlaywrightSecret42');
    await simpleFrame.getByTestId('iframe-submit-btn').click();
    await expect(simpleFrame.getByTestId('iframe-result-msg')).toContainText('PlaywrightSecret42');

    // 2. Deep Nested iFrame
    const outerFrame = page.frameLocator('iframe#nested-parent-frame');
    const childFrame = outerFrame.frameLocator('iframe#child-nested-frame');
    await childFrame.getByTestId('deep-action-btn').click();
    await expect(childFrame.getByTestId('deep-status-text'))
      .toContainText('RIZZ_ACTIVATED_IN_THE_MATRIX');
  });

  // 11. File Upload & Download Interception
  test('Files: In-memory file upload and download verification', async ({ page }) => {
    // In-memory upload
    await page.getByTestId('input-single-file').setInputFiles({
      name: 'playwright-test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Automated receipt verification')
    });
    await expect(page.getByTestId('single-file-result')).toContainText('playwright-test.txt');

    // Intercept file download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByTestId('btn-download-static').click()
    ]);
    expect(download.suggestedFilename()).toBe('sample-download.txt');
  });

  // 12. Data Tables: Search, Sort & Delete
  test('Tables: Search filter and delete row', async ({ page }) => {
    await page.getByTestId('input-table-search').fill('speed');
    await expect(page.getByTestId('table-rows-container')).toContainText('@ishowspeed');

    await page.getByTestId('input-table-search').clear();
    await page.getByTestId('btn-delete-row-3').click();
    await expect(page.getByTestId('table-row-3')).toBeHidden();
  });

  // 13. Open Shadow DOM Piercing
  test('Shadow DOM: Auto-pierce open shadow root', async ({ page }) => {
    await page.getByTestId('open-shadow-input').fill('Testing Shadow Boundary');
    await page.getByTestId('open-shadow-btn').click();
    await expect(page.getByTestId('open-shadow-output')).toContainText('Verified Successfully!');
  });

  // 14. Network Interception & Mocking
  test('Network: Mock HTTP 200 response with custom payload', async ({ page }) => {
    await page.route('**/sample-data.json*', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: { title: 'MOCKED_IN_E2E_TEST', status: 'verified' }
        })
      });
    });

    await page.getByTestId('btn-status-200').click();
    await expect(page.getByTestId('api-response-box')).toContainText('MOCKED_IN_E2E_TEST');
  });

  // 15. Authentication & Storage
  test('Auth: Sign in to Admin Portal and inspect cookies', async ({ page }) => {
    await page.getByTestId('auth-input-username').fill('admin_karthik');
    await page.getByTestId('auth-input-password').fill('secretpassword123');
    await page.getByTestId('btn-auth-login').click();
    await expect(page.getByTestId('protected-vip-chamber')).toBeVisible();

    const cookies = await page.context().cookies();
    expect(cookies.some(c => c.name === 'user_auth_role')).toBeTruthy();
  });
});
