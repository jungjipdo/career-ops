# Mode: onboarding — PDF 이력서/포트폴리오로 career-ops 초기 설정

PDF 이력서를 마크다운으로 변환한 뒤, 구조를 분석하여 career-ops의 핵심 파일들을 자동 생성합니다.

## 사용법

```
/career-ops onboarding {이력서 파일 경로}
/career-ops onboarding --portfolio {포트폴리오 파일 경로}
```

## Workflow

### Step 0 — 파일 변환

입력이 PDF/DOCX 파일 경로인 경우:

```bash
.venv/bin/python3 scripts/pdf-to-md.py {path} -o /tmp/resume-raw.md --type resume
# 또는 포트폴리오:
.venv/bin/python3 scripts/pdf-to-md.py {path} -o /tmp/portfolio-raw.md --type portfolio
```

입력이 이미 마크다운 텍스트인 경우: 직접 사용.

### Step 1 — 이력서 모드 (--type resume)

#### 1a. Raw text에서 구조 분석

변환된 마크다운에서 다음 섹션을 식별:

| 추출 대상 | 매핑 파일 | 필드 |
|-----------|-----------|------|
| 이름, 연락처, 이메일 | `config/profile.yml` → `candidate` | full_name, email, phone |
| 한국어 이름 | `config/profile.yml` → `candidate.kr_name` | kr_name |
| GitHub, LinkedIn URL | `config/profile.yml` → `candidate` | github, linkedin |
| 위치/거주지 | `config/profile.yml` → `location` | country, city |
| 병역 사항 | `config/profile.yml` → `candidate` | military_status, military_details |
| 생년 | `config/profile.yml` → `candidate` | birth_year |
| 학력 | `config/profile.yml` → `candidate` | kr_education_detail |
| 가장 최근 직함 | `config/profile.yml` → `target_roles` | primary (추론) |
| 경력 전체 | `cv.md` | 마크다운 이력서 형태 |
| 스킬/기술 스택 | `cv.md` | Skills 섹션 |
| 주요 강점 3-5개 | `config/profile.yml` → `narrative` | superpowers (추론) |

#### 1b. cv.md 생성

`examples/` 폴더의 예시 CV 포맷을 참고하여 다음 구조로 생성:

```markdown
# {이름}

## Professional Summary
(경력 요약 — 2-3줄)

## Work Experience
### {회사명} — {직함}
*{기간}*
- {업무 내용 bullet}
- ...

## Projects
### {프로젝트명}
- {설명}
- **Stack:** {기술 스택}
- **Impact:** {성과}

## Education
{학교} — {전공} ({졸업연도})

## Skills
**Languages:** ...
**Frameworks:** ...
**Tools:** ...

## Certifications
- ...
```

#### 1c. profile.yml 업데이트

추출한 정보로 `config/profile.yml`의 더미 데이터를 **실제 데이터로 교체**.
단, 다음 필드는 **절대 자동 생성하지 않고** 빈칸/주석으로 남김:
- `compensation` (연봉 목표는 사용자만 입력)
- `canva_resume_design_id`
- `dashboard` (데모 URL)

### Step 2 — 포트폴리오 모드 (--type portfolio)

#### 2a. 포트폴리오 raw text에서 프로젝트 추출

포트폴리오 PDF에서 각 프로젝트를 식별하여 `article-digest.md`에 구조화:

```markdown
# Article Digest — Proof Points

## {프로젝트 1 이름}
- **Role:** {본인 역할}
- **Stack:** {기술 스택}
- **Impact:** {정량적 성과}
- **URL:** {링크, 있으면}
- **Key Achievement:** {핵심 성과 1줄}
- **Detail:** {상세 설명 2-3줄}

## {프로젝트 2 이름}
...
```

#### 2b. profile.yml에 proof_points 추가

포트폴리오에서 추출한 프로젝트를 `narrative.proof_points` 배열에 추가:

```yaml
proof_points:
  - name: "프로젝트명"
    url: "https://..."
    hero_metric: "정량적 성과"
```

### Step 3 — 사용자 검토

생성/수정된 파일을 보여주고 확인 요청:

```
📁 생성된 파일:
  ✅ cv.md (이력서)
  ✅ config/profile.yml (프로필)
  ✅ article-digest.md (포트폴리오) — 포트폴리오 모드인 경우

이 내용이 맞나요? 수정이 필요한 부분이 있으면 알려주세요.
```

## 중요 규칙

1. **NEVER invent information.** PDF에 없는 내용을 추측하지 않기. 추출할 수 없으면 빈칸.
2. **compensation은 절대 자동 채우지 않기.** 사용자만 입력.
3. **한국어/영어 이력서 모두 처리.** 한국어 이력서면 kr_name, military_status, birth_year 필드 채우기.
4. **기존 파일이 있으면 덮어쓰기 전 확인.** "기존 cv.md가 있습니다. 덮어쓸까요?"
5. **이력서 → cv.md + profile.yml**, **포트폴리오 → article-digest.md** 완전 분리.
