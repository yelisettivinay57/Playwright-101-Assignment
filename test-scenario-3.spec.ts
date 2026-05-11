import test, { expect } from "../lambdatest-setup";

test.describe("Input Form Submit", () => {
  test("should validate form submission with all fields", async ({ page }) => {
    // Step 1: Open the Selenium Playground page and click "Input Form Submit"
    await page.goto("https://www.testmuai.com/selenium-playground/");
    await page.getByText("Input Form Submit").click();

    // Step 2: Click "Submit" without filling in any information
    await page.getByRole("button", { name: "Submit" }).click();

    // Step 3: Assert "Please fill in the fields" error message
    const nameInput = page.locator("#name");
    const validationMessage = await nameInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).toContain("Please fill");

    // Step 4 & 5 & 6: Fill in all fields
    await nameInput.fill("Steve Harry");

    // Using Email (CSS locator by name attribute)
    await page.locator("input[name='Email']").fill("steve57@example.com");

    // Password (using label/placeholder)
    await page.getByPlaceholder("Password").fill("SecurePass123!");

    // Company
    await page.getByPlaceholder("Company").fill("TestMu AI Corp");

    // Website
    await page.getByPlaceholder("Website").fill("https://www.testmuai.com");

    // Step 5: Select "United States" from the Country drop-down using text property
    await page.locator('select[name="Country"]').selectOption({label: 'United States'});

    // City
    await page.getByPlaceholder("City").fill("New York");

    // Address 1
    await page.locator("input[name='Address 1']").fill("146 Main Street");

    // Address 2
    await page.locator("input[name='Address 2']").fill("Suite 456");

    // State
    await page.getByPlaceholder("State").fill("Washington DC");

    // Zip Code
    await page.getByPlaceholder("Zip code").fill("3456");

    // Step 6: Click "Submit"
    await page.getByRole("button", { name: "Submit" }).click();

    // Step 7: Validate the success message
    const successMessage = page.locator(".success-msg");
    await expect(successMessage).toContainText("Thanks for contacting us, we will get back to you shortly.");
  });
});
