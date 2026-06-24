# My Blog

데이터베이스 없이 소스 코드에 글을 작성하고 **정적으로 생성(SSG)**되는 블로그 스타터.

## 스택

- **Next.js 15 (App Router)** — `generateStaticParams` 기반 SSG
- **TypeScript**
- **MDX** (`next-mdx-remote` + `gray-matter` frontmatter)
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **Shiki** (`rehype-pretty-code`) — 빌드 타임 코드 하이라이팅

## 시작하기

```bash
npm install
npm run dev      # http://localhost:3000
```

## 새 글 쓰기

`content/posts/` 에 `.mdx` 파일을 추가합니다.

```mdx
---
title: "글 제목"
date: "2026-06-25"
description: "한 줄 설명"
tags: ["tag1", "tag2"]
---

본문...
```

파일을 추가하면 빌드 시 자동으로 목록과 개별 페이지가 생성됩니다.

## 빌드 & 배포

```bash
npm run build    # .next 에 정적 페이지 생성
npm start        # 프로덕션 서버
```

- **Vercel**: 저장소를 연결하면 무설정 배포됩니다.
- **순수 정적 호스팅**(GitHub Pages 등): `next.config.mjs`의 `output: 'export'` 주석을 해제하고 `npm run build` 후 `out/` 디렉터리를 배포하세요.

## 구조

```
app/
  layout.tsx              # 공통 레이아웃
  page.tsx                # 포스트 목록 (SSG)
  posts/[slug]/page.tsx   # 개별 포스트 (SSG)
content/posts/*.mdx       # 글 (소스에 하드코딩)
lib/posts.ts              # 포스트 로딩/파싱
components/PostCard.tsx
```
