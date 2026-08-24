import { expect, test, type Page } from "@playwright/test";
import { TEST_SEED_EMAIL, TEST_SEED_PASSWORD } from "../lib/dev/travel-story";

function monthLabel(monthsAgo: number): string {
  const asOf = new Date().toISOString().slice(0, 10);
  const [year, month] = asOf.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1 - monthsAgo, 1));
  return date.toLocaleDateString("en-MY", { month: "long", year: "numeric", timeZone: "UTC" });
}

async function signIn(page: Page) {
  await page.goto("/sign-in");
  await page.getByLabel("Email").fill(TEST_SEED_EMAIL);
  await page.getByLabel("Password").fill(TEST_SEED_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/home", { timeout: 45_000 });
}

test.describe("Hafiz can see the months", () => {
  test("Journey shows month closes and the five tabs stay calm", async ({ page }) => {
    await signIn(page);

    await expect(page.getByRole("heading", { name: /Hey,/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Hold what stayed" })).toBeVisible();
    await expect(page.getByText(`${monthLabel(1)} nothing stayed. This month some of it did.`)).toBeVisible();
    await expect(page.getByRole("heading", { name: "You’re okay" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Keep the buffer" })).toHaveCount(0);
    await expect(page.getByText("The months")).toBeVisible();
    const months = page.locator("section").filter({ hasText: "The months" });
    await expect(months.getByText("This month", { exact: true })).toBeVisible();
    await expect(months.getByText(monthLabel(1), { exact: true })).toBeVisible();
    await expect(months.getByText(monthLabel(2), { exact: true })).toBeVisible();
    await expect(page.getByText("In", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Out", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Kept", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Months remembered")).toHaveCount(0);

    await page.getByText("Earlier months").click();
    await expect(page.getByText(monthLabel(3))).toBeVisible();

    await page.getByRole("link", { name: "Money" }).click();
    await expect(page.getByText("What you have, net.")).toBeVisible();
    await expect(page.getByText("Own", { exact: true })).toBeVisible();
    await expect(page.getByText("Owe", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Edit" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Remove" })).toHaveCount(0);
    await page.getByRole("button", { name: "Edit" }).click();
    await expect(page.getByRole("button", { name: "Done" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Remove" }).first()).toBeVisible();
    await page.getByRole("button", { name: "Done" }).click();
    await expect(page.getByRole("button", { name: "Remove" })).toHaveCount(0);
    await page.getByText("Earlier months").click();
    await expect(page.getByText(monthLabel(3))).toBeVisible();

    await page.getByRole("link", { name: "Find" }).click();
    await expect(page.getByRole("heading", { name: /One thing\.|Quiet today\./ })).toBeVisible();

    await page.getByRole("link", { name: "Learn" }).click();
    await expect(page.getByText("Learn", { exact: true }).first()).toBeVisible();

    await page.getByRole("link", { name: "You" }).click();
    await expect(page.getByText("Japan in December")).toBeVisible();
    await expect(page.getByRole("button", { name: "Edit" })).toBeVisible();
    await expect(page.getByText("How much you’d put aside each month.")).toHaveCount(0);
  });
});
