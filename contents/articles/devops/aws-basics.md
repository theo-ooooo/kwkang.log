---
title: "AWS 기초 - 클라우드 인프라 이해하기"
date: "2026-03-15"
tag: "aws,cloud,infrastructure"
---

AWS는 **클라우드 컴퓨팅 플랫폼**으로, 서버, 스토리지, 데이터베이스 등을 온디맨드로 제공합니다.  
이 글에서는 AWS의 핵심 서비스와 실무에서 자주 사용하는 패턴을 정리합니다.

---

## 1. 핵심 서비스

- **EC2**: 가상 서버
- **S3**: 객체 스토리지
- **RDS**: 관리형 데이터베이스
- **Lambda**: 서버리스 함수
- **CloudFront**: CDN

---

## 2. EC2 인스턴스

```bash
# 인스턴스 생성
aws ec2 run-instances \
  --image-id ami-xxx \
  --instance-type t2.micro \
  --key-name my-key

# SSH 접속
ssh -i my-key.pem ec2-user@<public-ip>
```

---

## 3. S3 버킷

```javascript
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

// 파일 업로드
s3.putObject({
  Bucket: "my-bucket",
  Key: "file.txt",
  Body: "Hello World",
});
```

---

## 4. Lambda 함수

```javascript
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Lambda" }),
  };
};
```

---

## 5. 실무 팁

1. **비용 최적화**: 사용하지 않는 리소스 정리
2. **보안**: IAM 역할과 정책 적절히 설정
3. **모니터링**: CloudWatch로 리소스 모니터링
4. **자동화**: Infrastructure as Code (Terraform, CloudFormation)

AWS는 "필요한 만큼만 사용하고 비용을 지불한다"는 철학을 따릅니다.

