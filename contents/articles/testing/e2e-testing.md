---
title: "E2E 테스트 - 사용자 시나리오 기반 테스트"
date: "2026-03-20"
tag: "testing,e2e,cypress,playwright"
---

E2E(End-to-End) 테스트는 **사용자 관점에서 전체 시스템을 테스트**하는 방법입니다.  
이 글에서는 Cypress, Playwright 등을 활용한 E2E 테스트 작성 방법을 정리합니다.

---

## 1. Cypress 기본

```javascript
describe("User Flow", () => {
  it("should login and view profile", () => {
    cy.visit("/login");
    cy.get("[data-cy=email]").type("user@example.com");
    cy.get("[data-cy=password]").type("password");
    cy.get("[data-cy=submit]").click();
    cy.url().should("include", "/profile");
  });
});
```

---

## 2. Playwright 기본

```javascript
import { test, expect } from "@playwright/test";

test("should login", async ({ page }) => {
  await page.goto("/login");
  await page.fill("[data-cy=email]", "user@example.com");
  await page.fill("[data-cy=password]", "password");
  await page.click("[data-cy=submit]");
  await expect(page).toHaveURL("/profile");
});
```

---

## 3. 페이지 객체 패턴

```javascript
class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(email, password) {
    await this.page.fill("[data-cy=email]", email);
    await this.page.fill("[data-cy=password]", password);
    await this.page.click("[data-cy=submit]");
  }
}
```

---

## 4. 실무 팁

1. **중요 시나리오만**: 모든 기능을 E2E로 테스트하지 말 것
2. **안정성**: 플레이키한 테스트는 유지보수 비용 증가
3. **병렬 실행**: 여러 브라우저에서 병렬 실행으로 시간 단축
4. **스크린샷**: 실패 시 스크린샷 자동 저장

E2E 테스트는 "사용자 관점에서 시스템을 검증한다"는 철학을 따릅니다.

