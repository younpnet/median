# median.younp.net 변경 이력

## 2026-10-07 — 배포 세트 v13 (레이아웃·메뉴·색상 개편)

**레이아웃**
- 기본 폭 768px(`max-w-3xl`)로 통일. 섹션 배경은 화면 전체 폭(100%)을 유지하고 내용만 768px 안에 배치
- 서브페이지(연도·가구원수·역대 추이·개인정보)에도 홈과 같은 상단 고정 메뉴 적용(홈·중위소득이란?·기준 중위소득 표·복지 혜택·계산 방법·소득 분위 계산기·FAQ·정리 + 계산기 버튼)
- 로고·"중위소득 정보센터" 타이틀에 홈(`/`) 링크. 홈 링크는 `index.html` 대신 `/`로 통일(중복 URL 방지)
- 금액표 기본 보기: 월 소득 + 카드

**디자인**
- 서브페이지의 검정(ink) 강조 박스를 메인과 같은 기본 블루로 변경
- 강조색 다양화: 급여별 고유색(생계 블루·의료 로즈·주거 앰버·교육 바이올렛), 증가율은 에메랄드, 팁·주의·주요 내용은 앰버, 개념 카드는 에메랄드
- 폰트: Pretendard 제거, 시스템 폰트 스택(`-apple-system, "Malgun Gothic", "맑은 고딕", helvetica, "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", sans-serif`) — 외부 폰트 요청 1개 감소

**파일별 버전 (현재)**
| 파일 | 버전 |
|---|---|
| index.html | v13 |
| privacy.html | v5 |
| household-1~6.html | v4 |
| year-2017~2027.html, history.html | v2 |
| sitemap.xml | v5 |
| feed.xml | v4 |
| service-worker.js | v5 (캐시 median-cache-v5) |
| tailwind.config.js, src/input.css | 폰트 스택 변경 |

**배포 시 확인**
- Tailwind 빌드가 새 색상 클래스(rose/amber/violet/emerald)를 포함해야 하므로 반드시 Netlify 빌드를 거쳐야 함(`netlify.toml` 그대로 사용)
- 서비스워커 캐시가 갱신되도록 v5로 올렸으나, 이미 접속한 브라우저는 새로고침 1~2회 후 반영될 수 있음

## 2026-10-06 — v11~v12
데이터 전면 검증(2017~2024년 3·4·5인 값 정정, 연도별 급여 비율), 연도별 실제 페이지 11개, 역대 추이 페이지, 가구원수 페이지 반올림 수정

## 2026-09-30 — v5~v10
SEO(WebApplication 스키마, robots/sitemap), URL 공유형 계산기, Tailwind 빌드 전환, PWA, 가구원수별 페이지, 2026년 데이터 오류 수정, RSS

## 2026-09-23 — v1~v4
기본안 + OG/파비콘/스키마, 공유 버튼, 관련 글 JSON 분리, 개인정보처리방침
