# Career-Ops 사용 가이드 🇰🇷

Career-Ops는 Claude Code 터미널에서 실행하는 AI 기반 취업 자동화 파이프라인입니다.

---

## 시작하기

```bash
# 1. career-ops 디렉토리로 이동
cd ~/직장\(취업\)/career-ops

# 2. Claude Code 시작
claude

# 3. 메뉴 확인
/career-ops
```

---

## 핵심 워크플로우

```
scan (공고 탐색) → pipeline (일괄 평가) → tracker (현황 확인) → pdf (이력서 생성)
```

---

## 명령어별 사용법

### 1. 🔍 `/career-ops scan` — 공고 탐색

원티드/점핏/글로벌 포털에서 블록체인/보안 관련 공고를 자동 스캔합니다.

```
> /career-ops scan
```

**동작:**
- portals.yml에 등록된 모든 포털을 Playwright로 실시간 스캔
- 타이틀 키워드 필터링 → 경력 필터링 → 시니어리티 체크
- 중복/만료 공고 자동 제거
- 신규 공고를 `data/pipeline.md`에 추가

**출력 예시:**
```
Portal Scan — 2026-04-10
━━━━━━━━━━━━━━━━━━━━━━━━
Queries 실행: 12
발견된 공고: 48개
필터 통과: 26개
중복: 13개
만료: 8개
신규 추가: 5개

  + Theori | Offensive Security Researcher
  + Sky Mavis | Web3 Security Engineer
  ...

📋 파이프라인에 총 18개 공고가 대기 중입니다.
→ /career-ops pipeline 으로 평가를 시작할까요? (Y/N)
```

**실행 주기:** 주 1회 권장 (월요일)

---

### 2. 📋 `/career-ops pipeline` — 대기 공고 일괄 평가

`data/pipeline.md`의 Pending 공고를 순차적으로 평가합니다.

```
> /career-ops pipeline
```

**동작:**
- 각 URL에 Playwright로 접속 → JD 추출
- 6블록(A~F) 평가 수행
- `reports/` 디렉토리에 리포트 자동 생성
- `data/applications.md` 트래커에 점수 기록
- 완료 후 `npm run dedup` + `npm run verify` 자동 실행

**출력 예시:**
```
| # | 회사 | 포지션 | Score | PDF | 추천 |
|---|------|--------|-------|-----|------|
| 015 | Theori | Offensive Security | 4.5 | ❌ | 즉시 지원 |
| 016 | Sky Mavis | Web3 Security | 3.8 | ❌ | 보류 |

✅ 파이프라인 처리 완료. 2개 평가, 1개 Score 4.0+
Score 4.0+ 공고에 대해 /career-ops pdf 로 이력서 생성을 진행할까요?
```

---

### 3. 🎯 `/career-ops {URL}` — 공고 즉시 평가 (원스탑)

관심 있는 공고 URL을 직접 붙여넣으면 평가 → 리포트 → 트래커까지 자동 처리합니다.

```
> /career-ops https://www.wanted.co.kr/wd/83127
```

또는 JD 텍스트를 직접 붙여넣기:

```
> /career-ops
[JD 텍스트 붙여넣기]
```

**가장 자주 사용하게 될 명령어입니다.**
LinkedIn이나 지인 추천으로 발견한 공고를 즉시 평가할 때 사용하세요.

---

### 4. 📊 `/career-ops tracker` — 지원 현황 대시보드

전체 지원 현황을 시각화된 대시보드로 보여줍니다.

```
> /career-ops tracker
```

**출력 예시:**
```
🎯 Career-Ops Dashboard — 2026-04-10
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 전체:  14개 평가 | 평균 Score 3.6/5

📊 점수 분포:
  ⭐ 4.0+ (즉시 지원) ....... 5개  ████████░░
  🟡 3.0~3.9 (보류/보강) .... 6개  ████░░░░░░
  🔴 3.0 미만 (스킵) ........ 3개  ██░░░░░░░░

📋 상태별:
  Evaluated ................ 12개
  Applied .................. 2개
```

**상태 업데이트:**
```
> "해치랩스 Applied로 변경해줘"
→ ✅ 해치랩스 — Security Researcher: Evaluated → Applied 변경 완료
```

---

### 5. 📄 `/career-ops pdf` — ATS 최적화 이력서 생성

특정 공고에 맞춤 이력서를 PDF로 생성합니다.

```
> /career-ops pdf
```

→ 어떤 공고 대상인지 물어봄 (회사명 또는 리포트 번호)

**생성물:**
- ATS 키워드 최적화된 이력서
- `output/` 디렉토리에 PDF 저장

---

### 6. 🏢 `/career-ops deep` — 기업 심층 리서치

관심 기업에 대해 잡플래닛/블라인드/기술블로그 등을 종합하여 리서치합니다.

```
> /career-ops deep
```

→ 회사명 물어봄

**조사 항목:**
1. AI/기술 전략
2. 최근 6개월 동향 (투자, 인수, 출시)
3. 엔지니어링 문화 (잡플래닛/블라인드 리뷰)
4. 기술 스택 (기술 블로그)
5. 경쟁사 및 차별점
6. 나의 매칭 포인트

---

### 7. 🎤 `/career-ops interview-prep` — 면접 준비

특정 공고에 대한 맞춤 면접 준비 자료를 생성합니다.

```
> /career-ops interview-prep
```

**생성물:**
- STAR 스토리 3~5개
- 예상 기술 질문 + 모범 답변
- 행동 면접 질문 대비
- 역질문 리스트

---

### 8. 💬 `/career-ops contacto` — LinkedIn 네트워킹

특정 기업의 핵심 인물을 찾고 DM 초안을 작성합니다.

```
> /career-ops contacto
```

→ 회사명 물어봄

**생성물:**
- LinkedIn 연락처 탐색
- Cold DM 초안 (한국어/영어)
- 후속 메시지 타이밍 제안

---

### 9. 📝 `/career-ops oferta` — 평가만 (PDF 없이)

```
> /career-ops oferta
```

→ URL/텍스트 물어봄 → 6블록(A~F) 평가 리포트만 생성

`/career-ops {URL}`과의 차이: PDF 자동 생성과 트래커 전체 파이프라인 없이 **평가만** 수행.

---

### 10. ⚖️ `/career-ops ofertas` — 복수 공고 비교

여러 공고를 한 번에 비교 평가합니다.

```
> /career-ops ofertas
```

→ 여러 URL 입력 → 비교 테이블로 정리

---

### 11. 🔄 `/career-ops onboarding` — 초기 설정

PDF 이력서로 career-ops 초기 설정을 자동화합니다.

```
> /career-ops onboarding ~/이력서.pdf
> /career-ops onboarding --portfolio ~/포트폴리오.pdf
```

**처음 한 번만 실행하면 됩니다.**

---

## 자주 쓰는 npm 명령어

```bash
npm run verify     # 파이프라인 무결성 검증
npm run dedup      # 트래커 중복 제거
npm run liveness -- {URL}  # URL 활성 여부 체크
npm run doctor     # 전체 시스템 헬스체크
```

---

## 실전 시나리오

### 시나리오 A: 주간 루틴

```
1. /career-ops scan              ← 새 공고 탐색
2. Y (pipeline 실행)              ← 일괄 평가
3. /career-ops tracker           ← 결과 확인
4. /career-ops pdf               ← Score 4.0+ 이력서 생성
```

### 시나리오 B: LinkedIn에서 공고 발견

```
1. /career-ops https://www.wanted.co.kr/wd/12345
   → 자동 평가 + 리포트 + 트래커
2. /career-ops deep              ← 회사 리서치
3. /career-ops pdf               ← 이력서 생성
4. /career-ops contacto          ← LinkedIn DM
```

### 시나리오 C: 면접 잡힘

```
1. /career-ops deep              ← 회사 심층 조사
2. /career-ops interview-prep    ← STAR 스토리 + 질문 준비
```

---

## 파일 구조

```
career-ops/
├── config/profile.yml     ← 내 프로필 (개인정보, git 미추적)
├── cv.md                  ← 내 이력서 (git 미추적)
├── article-digest.md      ← 포트폴리오 증거 (git 미추적)
├── data/
│   ├── applications.md    ← 지원 트래커 (git 미추적)
│   ├── pipeline.md        ← 평가 대기 목록 (git 미추적)
│   └── scan-history.tsv   ← 스캔 이력 (git 미추적)
├── reports/               ← 평가 리포트 (git 미추적)
├── output/                ← 생성된 PDF (git 미추적)
├── portals.yml            ← 스캔 대상 포털 설정
└── modes/                 ← 각 모드별 로직
```

> ⚠️ 개인정보 파일은 모두 `.gitignore`에 등록되어 GitHub에 올라가지 않습니다.
