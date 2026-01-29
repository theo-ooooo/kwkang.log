# kwkang.log

개인 기술 블로그 및 포트폴리오 사이트입니다.

## 📋 프로젝트 소개

Next.js 15와 React 19를 기반으로 구축한 SSR 블로그입니다. 마크다운 기반의 기술 포스팅과 프로필 페이지를 제공하며, PDF 출력 기능을 통해 이력서로도 활용할 수 있습니다.

## ✨ 주요 기능

### 블로그 기능
- 📝 **마크다운 기반 포스팅**: Markdown 파일로 작성된 기술 글을 자동으로 렌더링
- 🏷️ **태그 기반 필터링**: 카테고리별로 글을 필터링하여 탐색
- 🔍 **검색 기능**: 태그를 통한 빠른 글 검색
- 💬 **댓글 시스템**: Utterances를 활용한 GitHub 기반 댓글 기능

### 프로필 페이지
- 👤 **이력서 형식 프로필**: 경력, 기술 스택, 프로젝트 경험 등을 체계적으로 표시
- 📄 **PDF 출력**: 프로필 페이지를 PDF로 다운로드하여 이력서로 활용 가능
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경에서 최적화된 UI
- 🎨 **다크모드**: 사용자 선호도에 따른 다크/라이트 모드 지원

### 기술적 특징
- ⚡ **SSR (Server-Side Rendering)**: Next.js App Router를 활용한 빠른 초기 로딩
- 🎯 **타입 안정성**: TypeScript로 작성된 타입 안전한 코드
- 🚀 **성능 최적화**: 이미지 최적화, 코드 스플리팅 등 성능 최적화 적용
- 🔄 **실시간 업데이트**: JSON 파일 수정만으로 프로필 내용 즉시 반영

## 🛠️ 기술 스택

### Frontend
- **Next.js 15**: React 프레임워크
- **React 19**: UI 라이브러리
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 유틸리티 기반 CSS 프레임워크

### 주요 라이브러리
- **react-markdown**: Markdown 렌더링
- **react-syntax-highlighter**: 코드 하이라이팅
- **next-themes**: 다크모드 관리
- **zustand**: 상태 관리
- **react-icons**: 아이콘 라이브러리

## 📁 프로젝트 구조

```
kwkang.log/
├── contents/          # 마크다운 블로그 포스트
│   └── articles/
│       ├── kotlin/
│       ├── mysql/
│       ├── next.js/
│       ├── react/
│       └── springboot/
├── src/
│   ├── app/          # Next.js App Router 페이지
│   │   ├── profile/  # 프로필 페이지
│   │   └── articles/ # 블로그 포스트 페이지
│   ├── components/   # React 컴포넌트
│   ├── data/         # JSON 데이터 (프로필 정보)
│   ├── hooks/        # Custom React Hooks
│   ├── lib/          # 유틸리티 함수
│   └── stores/       # Zustand 스토어
└── public/           # 정적 파일
```

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
yarn install
```

### 개발 서버 실행

```bash
# 개발 모드 실행
yarn dev

# Turbopack 사용 (더 빠른 개발 서버)
yarn dev:turbo
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 빌드

```bash
# 프로덕션 빌드
yarn build

# 프로덕션 서버 실행
yarn start
```

## 📝 사용 방법

### 블로그 포스트 추가

1. `contents/articles/` 디렉토리에 카테고리 폴더 생성
2. 마크다운 파일 작성 (frontmatter 포함)
3. 자동으로 블로그에 반영

### 프로필 수정

1. `src/data/profile.json` 파일 수정
2. 변경사항이 프로필 페이지에 즉시 반영
3. PDF 출력 기능으로 이력서 다운로드 가능

## 🌐 배포

Vercel을 통해 자동 배포됩니다.

- **프로덕션**: [https://kwkang.net](https://kwkang.net)
- **GitHub**: [https://github.com/theo-ooooo/kwkang.log](https://github.com/theo-ooooo/kwkang.log)

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 👤 작성자

**강경원 (Kyung Won Kang)**
- GitHub: [@theo-ooooo](https://github.com/theo-ooooo)
- Blog: [https://kwkang.net](https://kwkang.net)
