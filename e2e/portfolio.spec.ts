import { test, expect } from "@playwright/test";

test.describe("Portfolio", () => {
  test("home loads with hero and key sections", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Let.s Design Something Amazing/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /What services does he offer/i }),
    ).toBeVisible();
    await expect(page.getByText(/Charles Chan/)).toBeVisible();
  });

  test("primary navigation works", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Case studies" }).first().click();
    await expect(page).toHaveURL(/\/case-studies$/);
    await expect(
      page.getByRole("heading", { level: 1 }),
    ).toBeVisible();
  });

  test("case study detail renders MDX + custom blocks", async ({ page }) => {
    await page.goto("/case-studies/zidney");
    await expect(
      page.getByRole("heading", { level: 1, name: "Zidney" }),
    ).toBeVisible();
    await expect(page.getByText("The challenge")).toBeVisible();
    // MetricBlock custom MDX component
    await expect(page.getByText("Task completion")).toBeVisible();
  });

  test("blog index lists posts and detail renders", async ({ page }) => {
    await page.goto("/blog");
    const firstPost = page
      .getByRole("link", { name: /Designing for clarity/i })
      .first();
    await expect(firstPost).toBeVisible();
    await firstPost.click();
    await expect(page).toHaveURL(/\/blog\/designing-for-clarity$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /Designing for clarity/i }),
    ).toBeVisible();
  });

  test("newsletter form shows success state", async ({ page }) => {
    await page.goto("/who-am-i");
    await page.getByPlaceholder("Email address").fill("test@example.com");
    await page.getByRole("button", { name: /Subscribe/i }).click();
    await expect(page.getByText(/you.re on the list/i)).toBeVisible();
  });

  test("contact CTA exposes mailto", async ({ page }) => {
    await page.goto("/");
    const mailto = page
      .getByRole("link", { name: /majedsiefalnasr@outlook\.com/i })
      .first();
    await expect(mailto).toHaveAttribute("href", /^mailto:/);
  });

  test("skip-to-content link is focusable", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("link", { name: "Skip to content" }),
    ).toBeFocused();
  });
});
