🎭 Playwright JavaScript Testing Framework
This repository contains a comprehensive Playwright-based testing framework designed for End-to-End (E2E) UI testing, API testing, and File operations. It leverages the Page Object Model (POM) pattern for maintainability and is pre-configured for multi-browser execution and CI/CD integration.

🚀 Features
UI Testing: Robust automated tests for web applications using Playwright.

API Testing: Seamless integration with REST APIs for authentication, data setup, and validation.

File Operations: Built-in utilities for Excel file manipulation and automated download handling.

Page Object Model (POM): Clean and reusable code structure for UI interactions.

Multi-Browser Support: Out-of-the-box support for Chromium, Firefox, WebKit, Edge, and Chrome.

CI/CD Ready: Integrated GitHub Actions workflows and Azure Playwright service support.

Advanced Reporting: Rich visual feedback via HTML and Allure reports.

📂 Project Structure
Plaintext

├── tests/                # Test suites (UI, API, and File operations)
├── pageObjects/          # POM classes for UI element abstraction
├── utils/                # Utility classes (API helpers, Excel readers, etc.)
├── testdata/             # JSON and JS files for externalized test data
├── playwright.config.js  # Main Playwright configuration
├── playwright_multibrowser.config.js  # Cross-browser testing config
├── playwright.service.config.js       # Azure Playwright service config
├── .github/workflows/    # CI/CD pipeline definitions
└── package.json          # Project dependencies and scripts
🛠️ Prerequisites
Node.js: version 14 or higher

Package Manager: npm or yarn

📥 Installation
Clone the repository:

Bash

git clone <your-repository-url>
cd <repository-folder>
Install dependencies:

Bash

npm install
Install Playwright browsers:

Bash

npx playwright install
