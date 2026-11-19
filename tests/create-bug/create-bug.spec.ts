import { test, expect } from '../fixtures/pages';

test.use({ channel: 'chrome' });

test('user can log in and create a bug', async ({ page, loginPage, boardPage, createBugModal }) => {
  await loginPage.loginWithFirstUser();
  await expect(page).toHaveURL(/\/board$/);
  const title = `Playwright-created bug ${Date.now()}`;
  await boardPage.clickNewBugButton();
  await expect(createBugModal.dialog).toBeVisible();

  await createBugModal.fillBugForm({
    title,
    severity: 'high',
    description: 'Created by a Playwright end-to-end test',
  });
  await createBugModal.submit();

  await expect(await boardPage.getBugRowByTitle(title)).toBeVisible();
});
