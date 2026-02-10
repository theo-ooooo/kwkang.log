---
title: "Kubernetes 기초 - 컨테이너 오케스트레이션"
date: "2026-02-10"
tag: "kubernetes,k8s,orchestration"
---

Kubernetes는 **컨테이너 오케스트레이션 플랫폼**으로, 대규모 컨테이너 배포와 관리를 자동화합니다.  
이 글에서는 Kubernetes의 핵심 개념과 기본 리소스를 정리합니다.

---

## 1. 핵심 개념

- **Pod**: 하나 이상의 컨테이너 그룹
- **Deployment**: Pod의 배포와 업데이트 관리
- **Service**: Pod에 대한 네트워크 접근 제공
- **Namespace**: 리소스 논리적 분리

---

## 2. Deployment 예시

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: app
        image: my-app:latest
        ports:
        - containerPort: 3000
```

---

## 3. Service 예시

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  selector:
    app: my-app
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

---

## 4. 기본 명령어

```bash
# 배포
kubectl apply -f deployment.yaml

# 상태 확인
kubectl get pods
kubectl get services

# 로그 확인
kubectl logs <pod-name>

# 삭제
kubectl delete deployment my-app
```

---

## 5. 실무 팁

1. **리소스 제한**: CPU/메모리 제한 설정
2. **헬스 체크**: liveness/readiness probe 설정
3. **ConfigMap/Secret**: 설정과 시크릿 분리 관리

Kubernetes는 "컨테이너를 자동으로 관리한다"는 철학을 따릅니다.

