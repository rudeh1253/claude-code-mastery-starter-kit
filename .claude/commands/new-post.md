---
description: 새 MDX 블로그 글을 frontmatter 규약에 맞춰 스캐폴딩합니다
argument-hint: "<글 제목>"
allowed-tools: Read, Write, Bash(date:*)
---

# 새 블로그 글 생성

사용자가 입력한 제목으로 `content/posts/` 에 새 `.mdx` 파일을 스캐폴딩한다.

## 입력

- 글 제목: `$ARGUMENTS`
- 제목이 비어 있으면 어떤 글을 쓸지 한 줄로 물어보고 중단한다.

## 절차

1. **slug 생성**: 제목을 kebab-case slug로 변환한다.
   - 소문자화, 공백/특수문자는 `-` 로, 연속 `-` 는 하나로, 양끝 `-` 제거.
   - 한글 제목이면 의미를 살린 짧은 영문 slug를 직접 만든다 (예: "Tailwind v4 마이그레이션" → `tailwind-v4-migration`).

2. **충돌 확인**: `content/posts/<slug>.mdx` (그리고 `.md`)가 이미 존재하면 덮어쓰지 말고, slug 뒤에 `-2`, `-3` … 을 붙여 빈 이름을 찾는다.

3. **날짜**: `date '+%Y-%m-%d'` 로 오늘 날짜를 구한다. (`YYYY-MM-DD` 포맷 필수 — `lib/posts.ts` 정렬 키)

4. **파일 작성**: `content/posts/<slug>.mdx` 를 아래 골격으로 생성한다. frontmatter 필드는 `lib/posts.ts`의 `PostMeta` 규약(`title`, `date`, `description`, `tags`)을 정확히 따른다.

   ```mdx
   ---
   title: "<원본 제목 그대로>"
   date: "<오늘 날짜>"
   description: "<제목에서 유추한 한 줄 설명 초안 — 사용자가 다듬도록>"
   tags: ["<유추한 태그>"]
   ---

   ## 들어가며

   여기에 본문을 작성하세요.
   ```

## 완료 후

- 생성한 파일 경로, slug, 채워 넣은 frontmatter를 요약한다.
- `description` 과 `tags` 는 초안이므로 검토를 권한다.
- `npm run dev` 후 `/posts/<slug>` 에서 미리볼 수 있음을 안내한다.
