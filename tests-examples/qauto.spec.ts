import { test, expect } from "@playwright/test";

test.describe(
  "Verification of qauto app",
  { tag: ["@qauto", "@regression", "@add_car"] },
  () => {
    test.describe.configure({ mode: "serial" });
    const loginName = process.env.LOGIN_USERNAME;
    const loginPass = process.env.LOGIN_PASS;

    test("open main page", async ({ page }) => {
      await page.goto("/");
      await page.waitForTimeout(3000);
      const signinButton = page.locator("button.header_signin");
      await signinButton.click();
    });

    test("usage of getByRole", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Sign In" }).click();
    });

    test("usage of getByText", async ({ page }) => {
      await page.goto("/");
      await expect(page.getByText("Sign In")).toBeVisible();
    });

    test.skip("usage of getByLabel", async ({ page }) => {
      await page.goto("/");
      await page.getByRole("button", { name: "Sign In" }).click();
      await expect(page.getByLabel("Email")).toBeVisible();
    });

    test.skip("usage of fill method", async ({ page }) => {
      await page.goto("/");
      // @ts-ignore
        await  loginWIthParams(page, loginName, loginPass)
      await page.waitForTimeout(3000);
    });

    test("usage of fill method and soft assert for pass field", async ({
      page,
    }) => {
      await page.goto("/");
      // @ts-ignore
      await  loginWIthParams(page, loginName, loginPass)
      await page.locator('input[name="password"]').clear();
      await page.getByRole("button", { name: "Login" }).click({ force: true });
      // soft assertion
      await expect
        .soft(page.locator("div.invalid-feedback p"))
        .toContainText("Password required");
        // @ts-ignore
      await page.locator('input[name="password"]').fill(loginPass);
      await page.getByRole("button", { name: "Login" }).click({ force: true });

      await page.waitForURL("/panel/garage");

      const textOnGaragePage = page.locator(".panel-page h1");
      await textOnGaragePage.waitFor({ state: "visible" });
      await expect(textOnGaragePage).toContainText("Garage");
      // await page.evaluate(() => {
      //   localStorage.setItem("key-my1", "value-my1");
      // });
      // const readLSVal = await page.evaluate(() => {
      //   return localStorage.getItem("key-my1");
      // });
      // console.log(`data from local storage: ${readLSVal}`);
      // // page evaluate for session storage
      // await page.evaluate(() => {
      //   sessionStorage.setItem("session-key-my-2", "session-value-my-2");
      // });
      // const readSessVal = await page.evaluate(() => {
      //   return sessionStorage.getItem("session-key-my-2");
      // });
      // console.log(`data from session storage: ${readSessVal}`);
      // await writeToSessionStorage(page, "key2", "value_for_key2");
    });

    // const writeToSessionStorage = async (page, key, value) => {
    //   await page.evaluate(
    //     (key, value) => {
    //       sessionStorage.setItem(key, value);
    //     },
    //     key,
    //     value
    //   );
    // };

    test.skip(
      "usage few selectors",
      { tag: "@contain_screenshot" },
      async ({ page }) => {
        await page.goto("/");
        // @ts-ignore
        await loginWIthParams(page, loginName, loginPass)
        await page
          .locator('button:has-text("SignIn"), button:has-text("Login")')
          .click();
        await page.waitForURL("/panel/garage");
        await page.waitForTimeout(2000);
        // need to rewrite
        await expect(page).toHaveScreenshot("main-page-actual.png");
      }
    );
    async function loginWIthParams(page: Page, loginNameParam: string, loginPassParam: string) {
        await page.getByRole("button", { name: "Sign In" }).click();
        await page.locator('input[name="email"]').fill(loginNameParam);
        await page.locator('input[name="password"]').fill(loginPassParam);
    }
  }
);
