import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:3000";

test("should allow user to sign in", async ({ page }) => {
  await page.goto(`${UI_URL}/auth`);

  // Expect the title to contain "TeleGuard"
  await expect(page).toHaveTitle(/TeleGuard/);

  // Fill in the email and password fields
  await page.locator("[name=email]").fill("arthur@gmail.com");
  await page.locator("[name=password]").fill("Hamidhamid1");

  // Click the submit button to sign in
  await page.getByRole("button", { name: "Submit" }).click();

  // Fill in the passkey
  const passkey = page.locator('input[autocomplete="one-time-code"]');
  await passkey.fill("123123");

  // Assert the passkey value is correctly filled
  await expect(passkey).toHaveValue("123123");

  // Ensure the OTP submit button is visible
  const submitPasskeyContainer = page.locator('div[class="OTP-submit-button"]');
  await expect(submitPasskeyContainer).toBeVisible();

  // Click "Continue" and wait for the page to navigate to /dashboard
  await Promise.all([
    submitPasskeyContainer.getByRole("button", { name: "Continue" }).click(),
    page.waitForURL(`${UI_URL}/dashboard`),
  ]);

  // Verify that the page URL is /dashboard
  expect(page.url()).toBe(`${UI_URL}/dashboard`);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
