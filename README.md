# Juntue Dela Fuente · QA Engineer

[![Playwright Tests](https://github.com/LanceVV20/LanceVV20.github.io/actions/workflows/playwright.yml/badge.svg)](https://github.com/LanceVV20/LanceVV20.github.io/actions/workflows/playwright.yml)

**🌐 Live portfolio: [lancevv20.github.io](https://lancevv20.github.io)**

QA Engineer with 4+ years testing large-scale eCommerce platforms, global payment systems, and enterprise websites. Currently leading QA for a frontend team, coaching three QA engineers, and driving a Playwright automation initiative.

## What's in this repo

| | |
|---|---|
| [`index.html`](index.html) | Portfolio site (GitHub Pages) |
| [`case-study.html`](case-study.html) | SauceDemo QA case study: test plan, test cases, bug reports, summary report |
| [`automation/`](automation) | Playwright + TypeScript E2E suite (Page Object Model) |
| [`.github/workflows/`](.github/workflows/playwright.yml) | CI: runs the suite on every push and weekly |

## SauceDemo case study

A full QA cycle on [SauceDemo](https://www.saucedemo.com), a public practice store.

- **21 test cases** across login, inventory, cart, and checkout, all passing for `standard_user`
- **7 bugs** found and documented (1 Blocker, 2 Critical, 3 Major, 1 Minor)
- **28 automated checks** in CI

Known bugs are kept in the suite as `test.fail()` regression checks. CI stays green while a bug is open, and once it's fixed the test passes unexpectedly and flags the ticket for closure.

### Run the tests

```bash
cd automation
npm ci
npx playwright install chromium
npm test
```

## Experience

- **QA Engineer, Kinguin** (Contract, Remote · Poland), Apr 2024 to present
- **QA Analyst, SLMP Digital** (Full time, Remote · Philippines), Jan 2022 to present

## Toolbox

Playwright · Postman · JIRA · Confluence · Testomat · Planner.io · Kibana · Kubernetes · MongoDB · HeidiSQL · Strapi · LambdaTest · BrowserStack · Screaming Frog · Lighthouse · PageSpeed Insights

## Contact

📧 sparkledelafuente666@gmail.com
