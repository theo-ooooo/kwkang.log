---
title: "CI/CD 파이프라인 - 자동화된 배포 전략"
date: "2026-02-10"
tag: "ci-cd,devops,automation"
---

CI/CD는 **지속적 통합과 지속적 배포**를 자동화하여 개발 생산성을 크게 향상시킵니다.  
이 글에서는 GitHub Actions, GitLab CI 등을 활용한 CI/CD 파이프라인 구축 방법을 정리합니다.

---

## 1. CI/CD 개념

- **CI (Continuous Integration)**: 코드 변경을 자동으로 빌드하고 테스트
- **CD (Continuous Deployment)**: 자동으로 프로덕션에 배포

---

## 2. GitHub Actions 예시

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        run: |
          # 배포 스크립트
```

---

## 3. GitLab CI 예시

```yaml
stages:
  - test
  - deploy

test:
  stage: test
  script:
    - npm install
    - npm test

deploy:
  stage: deploy
  script:
    - ./deploy.sh
  only:
    - main
```

---

## 4. 실무 전략

1. **단계별 배포**: dev → staging → production
2. **롤백 계획**: 배포 실패 시 자동 롤백
3. **알림**: 배포 성공/실패 알림 설정

CI/CD는 "자동화로 배포 시간을 단축한다"는 철학을 따릅니다.

