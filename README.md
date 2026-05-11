# Playwright 101 Assignment

Playwright test automation for TestMu AI certification. Runs 3 test scenarios on TestMu AI cloud in parallel across 2 browser/OS combos.

## Scenarios

1. Simple Form Demo - enter message, verify it displays
2. Drag \& Drop Sliders - move slider from 15 to 95
3. Input Form Submit - validate empty form error, fill \& submit, verify success msg

## Browser configs

* Windows 10 + Chrome (latest)
* macOS Catalina + Firefox (latest)

## Set LambdaTest Credentials
In Gitpod terminal, set environment variables:
```bash
set LT_USERNAME=<yeliskumar>
set LT_ACCESS_KEY=<LT_Kj6e5KswSKvfVQQqPmokuIGd96bS5cUYChtL5q5o3UMdc7H>
```

## How to run

npm install
export LT\_USERNAME="your\_username"
export LT\_ACCESS\_KEY="your\_access\_key"
npm test


On Windows use `set` instead of `export`, or just edit the `.env` file.

## Logs \& recording

Network logs, video, screenshots and console logs are all enabled in the capabilities config.

## LambdaTest Execution
- Total Playwright tests: 6

## LambdaTest Test IDs
Google browser
Scenario 1  DA-WIN-3125602-1778503601383072402AWT,
Scenario 2  DA-WIN-3125602-1778503601384003672QWL,
Scenario 3  DA-WIN-3125602-1778503632586673485NTK
 
Firefox browser
Scenario 1 DA-MAC-3125602-1778503654153714128VPC,
Scenario 2 DA-MAC-3125602-1778503684621380712EAI,
Scenario 3 DA-MAC-3125602-1778503688819145670YAA
