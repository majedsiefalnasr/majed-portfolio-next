import { test, expect } from "@playwright/test";
import { features } from "../lib/features";

test.describe("Portfolio", () => {
  test("home loads with hero and key sections", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Design that makes your product click/i,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /How can he help your product/i }),
    ).toBeVisible();
    await expect(page.getByText(/Charles Chan/).first()).toBeVisible();
  });

  test("primary navigation works", async ({ page }) => {
    await page.goto("/");
    // Page links live behind the menu button at every breakpoint.
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "Work", exact: true }).click();
    await expect(page).toHaveURL(/\/work$/);
    await expect(
      page.getByRole("heading", { level: 1 }),
    ).toBeVisible();
  });

  test("work detail renders MDX + custom blocks", async ({ page }) => {
    await page.goto("/work/zidney");
    await expect(
      page.getByRole("heading", { level: 1, name: "Zidney" }),
    ).toBeVisible();
    await expect(page.getByText("The challenge")).toBeVisible();
    // MetricBlock custom MDX component
    await expect(page.getByText("Task completion")).toBeVisible();
  });

  test("blog index lists posts and detail renders", async ({ page }) => {
    test.skip(!features.blog, "blog is feature-flagged off");
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
    test.skip(!features.newsletter, "newsletter is feature-flagged off");
    await page.goto("/who-am-i");
    await page.getByPlaceholder("Email address").fill("test@example.com");
    await page.getByRole("button", { name: /Subscribe/i }).click();
    await expect(page.getByText(/you.re on the list/i)).toBeVisible();
  });

  test("flagship work entry renders all template sections", async ({
    page,
  }) => {
    await page.goto("/work/atlas-freight");
    await expect(
      page.getByRole("heading", { level: 1, name: "Atlas Freight" }),
    ).toBeVisible();
    for (const section of [
      "Executive summary",
      "Research insights",
      "Design decisions",
      "Validation and testing",
      "Lessons learned",
    ]) {
      await expect(
        page.getByRole("heading", { name: section }),
      ).toBeVisible();
    }
    // Demo disclosure must stay until real client work replaces it.
    await expect(page.getByText(/Flagship demo case study/i)).toBeVisible();
  });

  test("booking CTA is wired", async ({ page }) => {
    await page.goto("/");
    const booking = page.locator("#booking");
    await expect(
      booking.getByRole("link", { name: "Book a 20-minute intro call" }),
    ).toHaveAttribute("href", /.+/);
    // Scoped to #booking: the ContactCTA has its own "Email me" link.
    await expect(
      booking.getByRole("link", { name: "Email me", exact: true }),
    ).toHaveAttribute("href", /^mailto:/);
  });

  test("CV and resume downloads are wired", async ({ page }) => {
    test.skip(!features.cvDownloads, "CV downloads are feature-flagged off");
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /Download CV/i }).first(),
    ).toHaveAttribute("href", "/cv.pdf");
    await expect(
      page.getByRole("link", { name: /Download Resume/i }).first(),
    ).toHaveAttribute("href", "/resume.pdf");
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
