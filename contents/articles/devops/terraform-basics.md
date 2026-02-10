---
title: "Terraform 기초 - Infrastructure as Code"
date: "2026-02-10"
tag: "terraform,iac,infrastructure"
---

Terraform은 **Infrastructure as Code** 도구로, 인프라를 코드로 정의하고 관리할 수 있습니다.  
이 글에서는 Terraform의 기본 개념과 실무 사용법을 정리합니다.

---

## 1. 기본 구조

```hcl
# main.tf
provider "aws" {
  region = "ap-northeast-2"
}

resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-unique-bucket-name"
}

resource "aws_instance" "web" {
  ami           = "ami-xxx"
  instance_type = "t2.micro"
}
```

---

## 2. 변수 사용

```hcl
# variables.tf
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

# main.tf
resource "aws_instance" "web" {
  instance_type = var.instance_type
}
```

---

## 3. 출력

```hcl
# outputs.tf
output "instance_ip" {
  value = aws_instance.web.public_ip
}
```

---

## 4. 상태 관리

```bash
# 초기화
terraform init

# 계획 확인
terraform plan

# 적용
terraform apply

# 삭제
terraform destroy
```

---

## 5. 실무 팁

1. **상태 파일**: `.tfstate`는 안전하게 관리 (S3, Terraform Cloud)
2. **모듈화**: 재사용 가능한 모듈로 분리
3. **버전 관리**: Terraform 버전 고정
4. **워크스페이스**: 환경별로 워크스페이스 사용

Terraform은 "인프라를 코드로 관리한다"는 철학을 따릅니다.

