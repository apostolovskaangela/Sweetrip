E2E testing guidance

This project does not include a full Detox/Detox config by default. Below are steps to add Detox for native end-to-end tests (Android/iOS) or Playwright for web E2E.

Detox (native):

1. Install Detox and follow setup: https://wix.github.io/Detox/docs/introduction/getting-started
2. Add Detox config and test runner scripts in `package.json`.
3. Write tests under `e2e/` and run via `detox test`.

Playwright (web):

1. Install Playwright and follow setup: https://playwright.dev/docs/intro
2. Use the web build (`expo start --web`) and run Playwright tests against the local server.

If you want, I can scaffold a basic Detox config and a sample test file for Android/iOS.
