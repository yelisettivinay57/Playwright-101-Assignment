// LambdaTest setup - custom fixture for running tests on TestMu AI cloud
// Import `test` from this file in test specs instead of @playwright/test

import * as base from "@playwright/test";
import path from "path";
import { chromium } from "playwright";

// default capabilities, will be patched based on project name
const capabilities: Record<string, any> = {
  browserName: "Chrome",
  browserVersion: "latest",
  "LT:Options": {
    platform: "Windows 10",
    build: "Playwright 101 Assignment",
    name: "Playwright Test",
    user: "yeliskumar",
    accessKey: "LT_Kj6e5KswSKvfVQQqPmokuIGd96bS5cUYChtL5q5o3UMdc7H",
    network: true,
    video: true,
    console: true,
    visual: true,
  },
};

// patches capabilities based on project name format: browserName:browserVersion:platform@lambdatest
const modifyCapabilities = (configName: string, testName: string) => {
  const config = configName.split("@lambdatest")[0];
  const [browserName, browserVersion, platform] = config.split(":");

  capabilities.browserName = browserName || capabilities.browserName;
  capabilities.browserVersion = browserVersion || capabilities.browserVersion;
  capabilities["LT:Options"]["platform"] = platform || capabilities["LT:Options"]["platform"];
  capabilities["LT:Options"]["name"] = testName;
};

const getErrorMessage = (obj: any, keys: string[]): string | undefined =>
  keys.reduce((o, key) => (typeof o === "object" ? o[key] : undefined), obj);

const test = base.test.extend({
  page: async ({ page, playwright }, use, testInfo) => {
    const fileName = testInfo.file.split(path.sep).pop();

    if (testInfo.project.name.match(/lambdatest/)) {
      modifyCapabilities(
        testInfo.project.name,
        `${testInfo.title} - ${fileName}`
      );

      const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities)
        )}`,
      });

      const ltPage = await browser.newPage(testInfo.project.use);
      await use(ltPage);

      const testStatus = {
        action: "setTestStatus",
        arguments: {
          status: testInfo.status,
          remark: getErrorMessage(testInfo, ["error", "message"]),
        },
      };
      await ltPage.evaluate(() => {},
        `lambdatest_action: ${JSON.stringify(testStatus)}`);
      await ltPage.close();
      await browser.close();
    } else {
      // Run locally
      await use(page);
    }
  },
});

export default test;
export const expect = test.expect;
