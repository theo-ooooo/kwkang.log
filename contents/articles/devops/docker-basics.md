---
title: "Docker 기초 - 컨테이너와 이미지 이해하기"
date: "2026-03-11"
tag: "docker,containerization"
---

Docker는 **컨테이너 기반 가상화** 기술로, 애플리케이션을 환경에 독립적으로 실행할 수 있게 해줍니다.  
이 글에서는 Docker의 기본 개념과 실무에서 자주 사용하는 명령어를 정리합니다.

---

## 1. 기본 개념

- **이미지(Image)**: 실행 가능한 패키지
- **컨테이너(Container)**: 이미지의 실행 인스턴스
- **Dockerfile**: 이미지를 빌드하기 위한 스크립트

---

## 2. Dockerfile 예시

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

---

## 3. 기본 명령어

```bash
# 이미지 빌드
docker build -t my-app .

# 컨테이너 실행
docker run -p 3000:3000 my-app

# 실행 중인 컨테이너 확인
docker ps

# 컨테이너 로그
docker logs <container-id>

# 컨테이너 중지
docker stop <container-id>
```

---

## 4. Docker Compose

```yaml
version: "3.8"
services:
  app:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
```

```bash
docker-compose up
```

---

## 5. 실무 팁

1. **레이어 캐싱**: Dockerfile에서 자주 변경되지 않는 부분을 먼저 COPY
2. **멀티 스테이지 빌드**: 빌드 도구는 별도 스테이지에서 사용
3. **.dockerignore**: 불필요한 파일은 빌드 컨텍스트에서 제외

Docker는 "어디서나 동일하게 실행된다"는 철학을 따릅니다.

