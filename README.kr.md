# Career-Ops — AI 기반 취업 파이프라인

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
- **포털 자동 스캔** — Greenhouse, Ashby, Lever, 원티드, 점핏 등 45+ 회사 채용 페이지 탐색
- **대량 병렬 처리** — 10+ 공고를 동시에 분석
- **단일 트래커** — 무결성 검사 포함, 모든 지원 내역을 한 곳에서 관리

> **중요: 이 도구는 스팸 도구가 아닙니다.** Career-ops는 필터입니다 — 수백 개 공고 중 내 시간을 투자할 가치가 있는 소수를 찾아줍니다. 4.0/5 미만은 지원하지 않는 것을 강력 권고합니다. 내 시간도, 채용 담당자의 시간도 소중합니다.

Career-ops는 에이전틱합니다: Claude Code가 Playwright로 채용 페이지를 탐색하고, 내 이력서 vs JD를 비교 분석(키워드 매칭이 아닌 추론 기반)하며, 공고별 맞춤 이력서를 생성합니다.

> **첫 평가는 정확하지 않을 수 있습니다.** 시스템이 아직 나를 모르기 때문입니다. 이력서, 커리어 스토리, 증명 자료, 선호사항 등을 알려줄수록 점점 정확해집니다. 새로운 리크루터에게 온보딩 시키는 것과 같습니다.

실제로 이 시스템으로 740+ 공고 평가, 100+ 맞춤 이력서 생성, Head of Applied AI 포지션 입사에 성공한 사례가 있습니다.

## 주요 기능

| 기능 | 설명 |
|------|------|
| **자동 파이프라인** | URL 붙여넣기 → 전체 평가 + PDF + 트래커 등록 |
| **6블록 평가** | 역할 요약, CV 매칭, 레벨 전략, 연봉 리서치, 맞춤화 계획, 면접 준비(STAR+R) |
| **면접 스토리 뱅크** | 평가할 때마다 STAR+R 스토리가 누적 — 5-10개 마스터 스토리로 모든 행동 면접 대응 |
| **협상 스크립트** | 연봉 협상 프레임워크, 지역 할인 반박, 경쟁 오퍼 활용법 |
| **ATS PDF 생성** | JD 키워드 주입, Space Grotesk + DM Sans 디자인의 맞춤 이력서 |
| **포털 스캐너** | 45+ 글로벌 기업 + 30+ 한국 기업 사전 설정, 한국 구직 사이트(원티드/점핏/프로그래머스) 지원 |
| **대량 처리** | `claude -p` 워커 기반 병렬 평가 |
| **대시보드 TUI** | 터미널 UI로 파이프라인 탐색, 필터, 정렬 |
| **Human-in-the-Loop** | AI가 평가하고 추천, 결정과 행동은 내가. 자동 지원 절대 없음 |
| **파이프라인 무결성** | 자동 머지, 중복 제거, 상태 정규화, 헬스 체크 |

## 빠른 시작

```bash
# 1. 클론 및 설치
git clone https://github.com/santifer/career-ops.git
cd career-ops && npm install
npx playwright install chromium   # PDF 생성에 필요

# 2. 설치 확인
npm run doctor                     # 모든 전제조건 검증

# 3. 설정
cp config/profile.example.yml config/profile.yml  # 내 정보로 편집
cp templates/portals.example.yml portals.yml       # 회사 목록 커스텀

# 4. 이력서 추가
# 프로젝트 루트에 cv.md 파일 생성 (마크다운 형식)

# 5. Claude로 개인화
claude   # 이 디렉토리에서 Claude Code 실행

# Claude에게 요청하면 됩니다:
# "archetypes를 백엔드 엔지니어 쪽으로 바꿔줘"
# "모드를 한국어로 번역해줘"
# "portals.yml에 이 회사 5개 추가해줘"
# "내 프로필을 이 이력서 기반으로 업데이트해줘"

# 6. 사용 시작
# 채용 공고 URL을 붙여넣거나 /career-ops 실행
```

> **시스템은 Claude가 직접 커스터마이징하도록 설계되어 있습니다.** 모드, archetypes, 점수 가중치, 협상 스크립트 — Claude에게 바꿔달라고 말하면 됩니다.

자세한 설정은 [docs/SETUP.md](docs/SETUP.md) 참조.

## 사용법

Career-ops는 슬래시 커맨드 하나로 모든 모드에 접근합니다:

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
/career-ops training       → 강좌/자격증 가치 평가
/career-ops project        → 포트폴리오 프로젝트 가치 평가
/career-ops interview-prep → 기업별 면접 준비
```

채용 공고 URL이나 텍스트를 바로 붙여넣으면 자동으로 감지하여 전체 파이프라인을 실행합니다.

## 작동 원리

```
채용 공고 URL 또는 텍스트 붙여넣기
        │
        ▼
┌──────────────────┐
│  Archetype       │  분류: LLMOps / Agentic / PM / SA / FDE / Transformation
│  Detection       │
└────────┬─────────┘
         │
┌────────▼─────────┐
│  A-F 6블록 평가  │  매칭, 갭 분석, 연봉 리서치, STAR 스토리
│  (cv.md 참조)    │
└────────┬─────────┘
         │
    ┌────┼────┐
    ▼    ▼    ▼
 리포트  PDF  트래커
  .md   .pdf   .tsv
```

## 한국 시장 커스터마이징 🇰🇷

이 포크에는 한국 취업 시장에 맞춘 다음 커스터마이징이 포함되어 있습니다:

### 한국 구직 사이트 지원

- **원티드**, **점핏**, **프로그래머스 커리어**, **로켓펀치** 등 주요 구직 사이트 검색 지원
- **잡플래닛**, **크레딧잡**, **블라인드** 등 기업 평판 사이트 참조

### 한국 기업 30+ 사전 설정

- **대형 IT**: 네이버, 카카오, 토스, 쿠팡, 배달의민족, 당근, 라인
- **핀테크**: 카카오뱅크, 카카오페이, 뱅크샐러드
- **이커머스**: 무신사, 컬리, 지마켓, 롯데ON
- **콘텐츠**: 리디, 왓챠, 레진코믹스, 넷마블
- **AI/글로벌**: 몰로코, 센드버드, 하이퍼커넥트
- **클라우드/인프라**: NHN클라우드, SK데보션
- **블록체인**: 플라네타리움

### 한국어 키워드 필터

- `개발자`, `엔지니어`, `백엔드`, `프론트엔드`, `풀스택`, `데브옵스`, `보안`, `블록체인` 등 한국어 직무 키워드 자동 감지

### 한국 취업 가이드

- [docs/KR-JOB-MARKET.md](docs/KR-JOB-MARKET.md) — 한국 채용 시장 특성, 이력서/포트폴리오 작성 가이드, 기업 평판 소스 정리

## 사전 설정 포털

스캐너에 **45+ 글로벌 기업** + **30+ 한국 기업**, **19+ 검색 쿼리**가 사전 설정되어 있습니다. `portals.yml`을 복사하여 직접 추가/제거 가능합니다.

**AI Labs:** Anthropic, OpenAI, Mistral, Cohere, LangChain, Pinecone
**Voice AI:** ElevenLabs, PolyAI, Parloa, Hume AI, Deepgram, Vapi, Bland AI
**AI Platforms:** Retool, Airtable, Vercel, Temporal, Glean, Arize AI
**한국 대형 IT:** 네이버, 카카오, 토스, 쿠팡, 배달의민족, 당근, 라인
**한국 핀테크:** 카카오뱅크, 카카오페이, 뱅크샐러드
**한국 이커머스:** 무신사, 컬리, 지마켓, 직방, 여기어때, 롯데ON
**한국 AI/글로벌:** 몰로코, 센드버드, 하이퍼커넥트, 이스트소프트

**구직 사이트:** Ashby, Greenhouse, Lever, Wellfound, Workable, 원티드, 점핏, 프로그래머스

## 대시보드 TUI

터미널에서 파이프라인을 시각적으로 탐색할 수 있습니다:

```bash
cd dashboard
go build -o career-dashboard .
./career-dashboard --path ..
```

기능: 6개 필터 탭, 4가지 정렬 모드, 그룹/플랫 뷰, 인라인 상태 변경.

## 프로젝트 구조

```
career-ops/
├── CLAUDE.md                    # AI 에이전트 동작 지침
├── cv.md                        # 내 이력서 (직접 작성)
├── article-digest.md            # 포트폴리오 증명 자료 (선택)
├── config/
│   └── profile.yml              # 내 프로필 설정
├── modes/                       # 14개 스킬 모드
│   ├── _shared.md               # 공통 컨텍스트
│   ├── _profile.md              # 내 개인화 오버라이드
│   ├── oferta.md                # 공고 평가
│   ├── pdf.md                   # PDF 생성
│   ├── scan.md                  # 포털 스캐너
│   ├── batch.md                 # 대량 처리
│   └── ...
├── templates/
│   ├── cv-template.html         # ATS 최적화 이력서 템플릿
│   ├── portals.example.yml      # 스캐너 설정 템플릿
│   └── states.yml               # 지원 상태 정의
├── batch/                       # 대량 처리 파일
├── dashboard/                   # Go TUI 대시보드
├── data/                        # 트래킹 데이터 (gitignored)
├── reports/                     # 평가 리포트 (gitignored)
├── output/                      # 생성된 PDF (gitignored)
├── fonts/                       # Space Grotesk + DM Sans
├── docs/
│   ├── SETUP.md                 # 설정 가이드
│   ├── CUSTOMIZATION.md         # 커스터마이징 가이드
│   ├── ARCHITECTURE.md          # 아키텍처 설명
│   └── KR-JOB-MARKET.md        # 한국 취업 시장 가이드 🇰🇷
└── examples/                    # 예시 CV, 리포트, 증명 자료
```

## 기술 스택

- **Agent**: Claude Code + 커스텀 스킬 & 모드
- **PDF**: Playwright/Puppeteer + HTML 템플릿
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

## 라이선스

MIT

## 원작자 & 연락처

**원작자:** Santiago — Head of Applied AI. career-ops로 자신의 취업에 성공한 후 오픈소스로 공개.

[![Website](https://img.shields.io/badge/santifer.io-000?style=for-the-badge&logo=safari&logoColor=white)](https://santifer.io)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/santifer/career-ops)
