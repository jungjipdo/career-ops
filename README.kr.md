# Career-Ops — AI 기반 취업 파이프라인 (한국 포크)

[English](README.md) | [Español](README.es.md) | **한국어**

<p align="center">
  <a href="https://x.com/santifer"><img src="docs/hero-banner.jpg" alt="Career-Ops — Multi-Agent Job Search System" width="800"></a>
</p>

<p align="center">
  <em>몇 달을 힘들게 취업 활동 하다가, 내가 원하던 시스템을 직접 만들었습니다.</em><br>
  회사는 AI로 지원자를 걸러냅니다. <strong>이제 지원자가 AI로 <em>회사를 고릅니다.</em></strong><br>
  <em>오픈소스로 공개합니다.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude_Code-000?style=flat&logo=anthropic&logoColor=white" alt="Claude Code">
  <img src="https://img.shields.io/badge/OpenCode-111827?style=flat&logo=terminal&logoColor=white" alt="OpenCode">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white" alt="Go">
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat&logo=playwright&logoColor=white" alt="Playwright">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT">
</p>

---

<p align="center">
  <img src="docs/demo.gif" alt="Career-Ops Demo" width="800">
</p>

<p align="center"><strong>740+ 채용 공고 평가 · 100+ 맞춤 이력서 · 꿈의 직장 입사 성공</strong></p>

## 이게 뭔가요?

Career-Ops는 AI 코딩 CLI를 **취업 전용 커맨드 센터**로 바꿔줍니다. 엑셀에 수동으로 지원 내역을 관리하는 대신, AI가 다음을 자동으로 처리합니다:

- **채용 공고 평가** — A-F 6블록 구조 분석 (10가지 가치 기준)
- **맞춤형 PDF 생성** — ATS 최적화 이력서를 공고별로 자동 커스터마이징
- **PDF 이력서 파싱** — 기존 이력서 PDF를 markitdown으로 파싱하여 자동 온보딩
- **포털 자동 스캔** — Greenhouse, Ashby, Lever, 원티드, 점핏 등 45+ 회사 채용 페이지 탐색
- **대량 병렬 처리** — 10+ 공고를 동시에 분석
- **2-Speed Funnel** — Quick Screen(3분)으로 빠르게 거르고, 고득점 공고만 Deep Dive
- **단일 트래커** — 무결성 검사 포함, 행동 기반 상태 관리

> **중요: 이 도구는 스팸 도구가 아닙니다.** Career-ops는 필터입니다 — 수백 개 공고 중 내 시간을 투자할 가치가 있는 소수를 찾아줍니다. 3.0/5 미만은 지원하지 않는 것을 강력 권고합니다. 내 시간도, 채용 담당자의 시간도 소중합니다.

> **이 시스템은 절대 자동으로 지원서를 제출하지 않습니다.** AI가 평가하고 추천하지만, 최종 제출 버튼은 항상 사용자가 직접 누릅니다.

## 이 포크의 특징 (한국 시장 커스터마이징) 🇰🇷

이 레포는 원본 [santifer/career-ops](https://github.com/santifer/career-ops)의 포크로, 한국 취업 시장에 맞게 다음이 커스터마이징되어 있습니다:

### ✅ 포함된 커스터마이징

| 영역 | 내용 |
|------|------|
| **Archetype 확장** | AI 전용 6개 → 한국 시장 포함 12개 (Backend, Full-stack, Frontend, Security, Blockchain, DevOps, Data, AI/ML, Platform, LLMOps, SA, PM) |
| **한국 기업 30+** | 네이버, 카카오, 토스, 쿠팡, 배민, 당근, 라인, 무신사, 몰로코 등 사전 설정 |
| **한국어 키워드** | `개발자`, `엔지니어`, `백엔드`, `프론트엔드` 등 25개 한국어 직무 키워드 필터 |
| **연봉 리서치 소스** | Glassdoor/Levels.fyi 대신 잡플래닛, 크레딧잡, 블라인드코리아, 넥스트유니콘 |
| **면접 프로세스** | 서류→코테→기술면접→임원면접→처우협의 한국형 라운드 참조 |
| **프로필 한국 필드** | 한국어 이름, 생년, 병역, 학력 (한국식 표기) |
| **행동 기반 상태** | Screened, Apply Now, Network First, Build Proof, Watch 5개 추가 |
| **2-Speed Funnel** | Quick Screen(A+B만) → Deep Dive(3.5+) 분리 운영 |
| **운영 리듬 가이드** | 매일 스캔 → 수 Quick Screen → 금 스프린트 → 월 Calibration |
| **PDF 이력서 파서** | markitdown 기반 PDF→Markdown 변환 → cv.md + profile.yml 자동 생성 |
| **채용 Red Flags** | 한국 채용 공고의 경고 신호 자동 감지 |

## 주요 기능

| 기능 | 설명 |
|------|------|
| **자동 파이프라인** | URL 붙여넣기 → 전체 평가 + PDF + 트래커 등록 |
| **6블록 평가** | 역할 요약, CV 매칭, 레벨 전략, 연봉 리서치, 맞춤화 계획, 면접 준비(STAR+R) |
| **PDF 이력서 파싱** | 기존 이력서 PDF를 넣으면 cv.md + profile.yml 자동 생성 (markitdown) |
| **2-Speed Funnel** | Quick Screen(3분) → 3.5+ 공고만 Deep Dive. 시간과 토큰 절약 |
| **면접 스토리 뱅크** | 평가할 때마다 STAR+R 스토리가 누적 — 5-10개 마스터 스토리로 모든 행동 면접 대응 |
| **ATS PDF 생성** | JD 키워드 주입, Space Grotesk + DM Sans 디자인의 맞춤 이력서 |
| **포털 스캐너** | 45+ 글로벌 기업 + 30+ 한국 기업 사전 설정, 한국 구직 사이트 지원 |
| **행동 기반 트래커** | Score→Action 매핑 (즉시 지원 / 네트워킹 먼저 / 시장 관찰 / 증빙 보강) |
| **대시보드 TUI** | 터미널 UI로 파이프라인 탐색, 필터, 정렬 |
| **Human-in-the-Loop** | AI가 평가하고 추천, 결정과 행동은 내가. 자동 지원 절대 없음 |

## 빠른 시작

```bash
# 1. 클론 및 설치
git clone https://github.com/jungjipdo/career-ops.git
cd career-ops && npm install
npx playwright install chromium   # PDF 생성에 필요

# 2. 설치 확인
npm run doctor                     # 모든 전제조건 검증

# 3. (선택) PDF 이력서로 자동 온보딩
npm run resume-parse -- 이력서.pdf -o /tmp/resume-raw.md
# → Claude에게: "이 파일을 읽고 cv.md와 profile.yml을 생성해줘"

# 포트폴리오는 별도로:
npm run resume-parse -- 포트폴리오.pdf --type portfolio -o /tmp/portfolio-raw.md
# → Claude에게: "이 파일을 읽고 article-digest.md를 생성해줘"

# 4. 또는 수동 설정
cp config/profile.example.yml config/profile.yml  # 내 정보로 편집
cp templates/portals.example.yml portals.yml       # 회사 목록 커스텀
# cv.md 파일 직접 생성

# 5. Claude로 개인화
claude   # 이 디렉토리에서 Claude Code 실행

# Claude에게 요청하면 됩니다:
# "archetypes를 백엔드 엔지니어 쪽으로 바꿔줘"
# "내 프로필을 이 이력서 기반으로 업데이트해줘"
# "portals.yml에 이 회사 5개 추가해줘"

# 6. 사용 시작
# 채용 공고 URL을 붙여넣거나 /career-ops 실행
```

> **venv + markitdown 자동 설치:** `npm run resume-parse`를 처음 실행하면 Python venv와 markitdown이 자동으로 설치됩니다. 별도 설치 불필요.

## 사용법

```
/career-ops                → 사용 가능한 전체 명령어 표시
/career-ops {JD 붙여넣기}  → 전체 자동 파이프라인 (분석 + PDF + 트래커)
/career-ops scan           → 포털의 새 공고 스캔
/career-ops pdf            → ATS 최적화 이력서 PDF 생성
/career-ops batch          → 여러 공고 일괄 분석
/career-ops tracker        → 지원 현황 확인
/career-ops apply          → 지원서 폼 작성 AI 도우미
/career-ops pipeline       → 대기 URL 처리
/career-ops contacto       → 링크드인 아웃리치 메시지
/career-ops deep           → 기업 심층 분석
/career-ops interview-prep → 기업별 면접 준비
/career-ops onboarding     → PDF 이력서로 초기 설정 (이 포크 추가)
```

## 2-Speed Funnel (이 포크 추가)

모든 공고에 풀 파이프라인을 돌리지 않습니다.

```
Quick Screen (3분)          Deep Dive (3.5+ only)
━━━━━━━━━━━━━━━━           ━━━━━━━━━━━━━━━━━━━
A블록 + B블록 + Score  ──→  C-F 전체 + PDF + 연봉 리서치
                            + contacto + deep + interview-prep

Score→Action:
  4.0+ → 즉시 지원 (Priority Lane: PDF→연락처→딥리서치→면접준비)
  3.5  → 네트워킹 먼저 or 즉시 지원
  3.0  → 시장 관찰 or 증빙 보강
  < 3.0 → SKIP
```

## 운영 리듬

```
매일 스캔 (5분)
    │
    ▼
수요일 Quick Screen (30분)
    │
    ├─ Score 3.0 미만 → SKIP
    ├─ Score 3.0~3.4 → 시장 관찰 / 증빙 보강
    └─ Score 3.5+ → 즉시 지원 / 네트워킹 먼저
                │
                ▼
        금요일 지원 스프린트 (1시간)
                │
                └─ Deep Dive → PDF → 직접 제출
                        │
                        ▼
                월간 Calibration (1시간)
                        └─ Gap 분석 → 필터 조정
```

자세한 내용: [docs/OPERATIONS-RHYTHM.md](docs/OPERATIONS-RHYTHM.md)

## 한국 연봉/기업 리서치 소스

| 소스 | 용도 | URL |
|------|------|-----|
| 잡플래닛 | 연봉 정보 + 면접 후기 + 기업 평점 | [jobplanet.co.kr](https://www.jobplanet.co.kr) |
| 크레딧잡 | 기업 재무/평균연봉/고용 데이터 | [kreditjob.com](https://www.kreditjob.com) |
| 블라인드 | 현직자 연봉 정보 + 솔직한 평가 | [teamblind.com/kr](https://www.teamblind.com/kr) |
| 넥스트유니콘 | 스타트업 투자/성장 데이터 | [nextunicorn.kr](https://www.nextunicorn.kr) |
| 혁신의숲 | 스타트업 리서치 | [innoforest.co.kr](https://www.innoforest.co.kr) |

한국 구직 사이트: [원티드](https://www.wanted.co.kr) · [점핏](https://www.jumpit.co.kr) · [프로그래머스](https://career.programmers.co.kr) · [로켓펀치](https://www.rocketpunch.com)

## 프로젝트 구조

```
career-ops/
├── CLAUDE.md                    # AI 에이전트 동작 지침
├── cv.md                        # 내 이력서 (직접 작성 또는 PDF 파싱)
├── article-digest.md            # 포트폴리오 증명 자료 (포트폴리오 PDF 파싱)
├── resume-parse.mjs             # PDF→Markdown 변환 (Node.js 래퍼)
├── config/
│   └── profile.yml              # 내 프로필 설정 (한국 필드 포함)
├── scripts/
│   └── pdf-to-md.py             # markitdown 기반 변환 스크립트
├── modes/                       # 스킬 모드
│   ├── _shared.md               # 공통 컨텍스트 (시스템)
│   ├── _profile.md              # 내 개인화 오버라이드 (Archetype 12개 + 한국 컨텍스트)
│   ├── kr/
│   │   └── onboarding.md        # PDF 이력서 온보딩 모드 🇰🇷
│   ├── oferta.md                # 공고 평가
│   ├── pdf.md                   # PDF 생성
│   ├── scan.md                  # 포털 스캐너
│   └── ...
├── templates/
│   ├── cv-template.html         # ATS 최적화 이력서 템플릿
│   ├── portals.example.yml      # 스캐너 설정 템플릿
│   └── states.yml               # 지원 상태 정의 (행동 기반 상태 포함)
├── docs/
│   ├── SETUP.md                 # 설정 가이드
│   ├── KR-JOB-MARKET.md         # 한국 취업 시장 가이드 🇰🇷
│   └── OPERATIONS-RHYTHM.md     # 운영 리듬 가이드 🇰🇷
├── .venv/                       # Python 가상환경 (gitignore)
├── markitdown/                  # Microsoft markitdown 소스 (gitignore)
├── dashboard/                   # Go TUI 대시보드
├── data/                        # 트래킹 데이터 (gitignore)
├── reports/                     # 평가 리포트 (gitignore)
└── output/                      # 생성된 PDF (gitignore)
```

## 기술 스택

- **Agent**: Claude Code + 커스텀 스킬 & 모드
- **PDF 생성**: Playwright + HTML 템플릿
- **PDF 파싱**: [markitdown](https://github.com/microsoft/markitdown) (Microsoft, MIT 라이선스)
- **Scanner**: Playwright + Greenhouse API + WebSearch
- **Dashboard**: Go + Bubble Tea + Lipgloss (Catppuccin Mocha 테마)
- **Data**: Markdown 테이블 + YAML 설정 + TSV 배치 파일

## 면책 조항

**career-ops는 로컬 오픈소스 도구이지, 호스팅 서비스가 아닙니다.** 이 소프트웨어를 사용함으로써:

1. **데이터는 내가 관리합니다.** 이력서, 연락처 등 개인 데이터는 내 컴퓨터에 저장되며, 내가 선택한 AI 제공자(Anthropic, OpenAI 등)로 직접 전송됩니다.
2. **AI는 내가 통제합니다.** 기본 프롬프트는 AI가 자동으로 지원서를 제출하지 않도록 설계되어 있지만, 프롬프트를 수정하거나 다른 모델을 사용한다면 본인 책임입니다.
3. **서드파티 ToS를 준수해야 합니다.** 이 도구를 사용하여 스팸 지원이나 ATS 시스템 과부하를 유발하지 마세요.
4. **보장 사항 없음.** 평가는 추천이지 사실이 아닙니다. AI 모델은 스킬이나 경험을 환각할 수 있습니다.

자세한 내용은 [LEGAL_DISCLAIMER.md](LEGAL_DISCLAIMER.md) 참조. [MIT 라이선스](LICENSE).

## 출처 및 크레딧

- **원본 프로젝트:** [santifer/career-ops](https://github.com/santifer/career-ops) — Santiago Fernández가 740+ 공고 평가, 100+ 맞춤 이력서 생성, Head of Applied AI 입사에 사용한 AI 취업 파이프라인
- **PDF 파서:** [microsoft/markitdown](https://github.com/microsoft/markitdown) — Microsoft AutoGen Team의 경량 문서→Markdown 변환 유틸리티 (MIT 라이선스)
- **한국 커스터마이징:** [jungjipdo/career-ops](https://github.com/jungjipdo/career-ops) — 한국 취업 시장 Archetype 확장, 연봉 소스 변경, 2-Speed Funnel, 운영 리듬 가이드

## 라이선스

MIT

---

<p align="center">
  <strong>원본:</strong> <a href="https://github.com/santifer/career-ops">santifer/career-ops</a> · <strong>이 포크:</strong> <a href="https://github.com/jungjipdo/career-ops">jungjipdo/career-ops</a>
</p>
