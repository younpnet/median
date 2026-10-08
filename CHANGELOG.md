# median.younp.net 변경 이력

## 2026-10-08 — 배포 세트 v15 (이용약관·문의 페이지 추가)

- 이용약관(`/terms`), 문의(`/contact`) 페이지 신설. 개인정보처리방침과 같은 디자인, 문의 이메일은 개인정보처리방침과 같은 주소(복사 방지 표시 방식 동일)
- 이용약관: 서비스 내용, 정보의 성격(보건복지부 고시 우선·참고용), 책임의 제한, 광고·외부 링크, 저작권, 이용자 의무, 약관 변경(시행 2026-10-08)
- 문의: 오류 제보·기능 제안·제휴·개인정보 문의 안내, 개별 수급 상담은 129·복지로·주민센터로 안내
- 모든 페이지 푸터에 개인정보처리방침·이용약관·문의 링크, 개인정보처리방침 푸터도 같은 형식으로 정리
- sitemap.xml에 /terms, /contact 추가, 서비스워커 캐시 v7(새 페이지 미리 저장)

| 파일 | 버전 |
|---|---|
| index.html | v15 |
| privacy.html | v7 |
| terms.html, contact.html | v1 |
| household-1~6.html | v6 |
| year-2017~2027.html, history.html | v4 |
| sitemap.xml | v7 |
| service-worker.js | v7 (캐시 median-cache-v7) |

## 2026-10-08 — 배포 세트 v14 (금액 표시 안정화·URL 통일·SEO 정리)

**홈 금액이 로드마다 달라 보이던 문제**
- 원인 1: 금액 카운트업 애니메이션(0원→최종값, 0.7초) 도중에 캡처되면 중간값이 보였음. 복지 타일은 애니메이션 없이 최종값을 써서 같은 화면에서 숫자가 어긋나 보였음
- 원인 2: 서비스워커가 HTML도 "캐시 먼저" 방식이라 재방문자에게 예전 배포본이 번갈아 보였음
- 조치: 2027년 금액(히어로·요약·정리 문장), 가구원별 카드, 급여별 타일을 HTML에 직접 기입. 첫 화면은 애니메이션 없이 최종값 표시(가구원 수 변경 등 조작 시에만 애니메이션)
- 서비스워커 v6: 페이지(HTML)는 네트워크 우선(오프라인일 때만 캐시), CSS·이미지는 기존 방식 유지

**URL 통일 (확장자 없는 주소)**
- canonical, og:url, JSON-LD url, 내부 링크, sitemap.xml, feed.xml 링크, 연도 선택 이동을 `/year-2027` 형식으로 통일(Netlify가 실제로 내보내는 주소와 일치)
- 홈 canonical·og:url은 사이트맵과 같은 `https://median.younp.net/`
- feed.xml의 guid는 기존 값 유지(RSS 구독기에서 글이 중복으로 보이지 않도록)

**메타·접근성**
- 홈 og:title·twitter:title·WebPage 스키마 이름을 title과 일치, og:site_name을 "중위소득 정보센터"로 통일
- 홈에 `<main>` 랜드마크 추가

**파일별 버전 (현재)**
| 파일 | 버전 |
|---|---|
| index.html | v14 |
| privacy.html | v6 |
| household-1~6.html | v5 |
| year-2017~2027.html, history.html | v3 |
| sitemap.xml | v6 |
| feed.xml | v5 |
| service-worker.js | v6 (캐시 median-cache-v6) |

**배포 구조 정리**
- 사이트 네트워크 워크플로 대상 폴더를 루트(`--root "."`)에서 `--root "public"`으로 변경(실제 배포 폴더에 관련 글 링크가 들어가도록)
- 루트에만 있어 배포되지 않던 `ads.txt`(실제 사이트에서 404였음), `og-image.png`를 public으로 복사
- og:image 크기 메타를 실제 이미지 크기(1000×528)로 수정
- 루트의 HTML·xml·js·json·icons 사본은 배포되지 않으므로 삭제(public이 원본)
- 참고: AdSense 스크립트는 저장소 코드에 없음(functions/_middleware.js는 Cloudflare 전용이라 Netlify에서 미동작). 광고 삽입 경로 확인 필요

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
