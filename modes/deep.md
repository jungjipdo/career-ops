# Modo: deep — Deep Research Prompt

Genera un prompt estructurado para Perplexity/Claude/ChatGPT con 6 ejes:

```
## Deep Research: [Empresa] — [Rol]

Contexto: Estoy evaluando una candidatura para [rol] en [empresa]. Necesito información accionable para la entrevista.

### 1. Estrategia AI
- ¿Qué productos/features usan AI/ML?
- ¿Cuál es su stack de AI? (modelos, infra, tools)
- ¿Tienen blog de engineering? ¿Qué publican?
- ¿Qué papers o talks han dado sobre AI?

### 2. Movimientos recientes (últimos 6 meses)
- ¿Contrataciones relevantes en AI/ML/product?
- ¿Acquisitions o partnerships?
- ¿Product launches o pivots?
- ¿Rondas de funding o cambios de liderazgo?

### 3. Cultura de engineering
- ¿Cómo shipean? (cadencia de deploy, CI/CD)
- ¿Mono-repo o multi-repo?
- ¿Qué lenguajes/frameworks usan?
- ¿Remote-first o office-first?
- ¿Glassdoor/Blind reviews sobre eng culture?

### 4. Retos probables
- ¿Qué problemas de scaling tienen?
- ¿Reliability, cost, latency challenges?
- ¿Están migrando algo? (infra, models, platforms)
- ¿Qué pain points menciona la gente en reviews?

### 5. Competidores y diferenciación
- ¿Quiénes son sus main competitors?
- ¿Cuál es su moat/diferenciador?
- ¿Cómo se posicionan vs competencia?

### 6. Ángulo del candidato
Dado mi perfil (read from cv.md and profile.yml for specific experience):
- ¿Qué valor único aporto a este equipo?
- ¿Qué proyectos míos son más relevantes?
- ¿Qué historia debería contar en la entrevista?
```

Personalizar cada sección con el contexto específico de la oferta evaluada.

## 한국 기업 리서치 참조 소스

한국 기업 대상 deep research 시, 아래 소스를 **자동으로 참조**하여 정보 품질을 높인다.

### 기업 평판 & 내부 정보

| 소스 | URL | 활용 |
|------|-----|------|
| **잡플래닛** | https://www.jobplanet.co.kr | 직원 리뷰, 연봉 정보, 면접 후기 |
| **블라인드** | https://www.teamblind.com/kr | 현직자 익명 리뷰, 내부 문화 |
| **크레딧잡** | https://www.kreditjob.com | 기업 재무 상태, 인원 변동 추이 |

### 스타트업 투자 & 성장 정보

| 소스 | URL | 활용 |
|------|-----|------|
| **혁신의 숲** | https://www.innoforest.co.kr | 스타트업 투자/매출/고용 지표 |
| **넥스트 유니콘** | https://www.nextunicorn.kr | 투자 라운드, 밸류에이션 |
| **플래텀** | https://platum.kr | 스타트업 뉴스, 인수합병 |
| **지디넷코리아** | https://zdnet.co.kr | IT/테크 산업 뉴스 |

### 기술 블로그 (면접 준비 + 기술 스택 파악)

한국 주요 IT 기업 기술 블로그. 해당 기업에 지원 시 최근 글 2-3개를 읽어 면접 화젯거리를 준비한다.

| 기업 | 블로그 URL |
|------|-----------|
| 네이버 | https://d2.naver.com/home |
| 카카오 | https://tech.kakao.com/blog |
| 토스 | https://toss.tech/ |
| 당근 | https://medium.com/daangn |
| 우아한형제들 | https://techblog.woowahan.com/ |
| 라인 | https://engineering.linecorp.com/ko/blog |
| 쿠팡 | https://medium.com/coupang-engineering/kr/home |
| 뱅크샐러드 | https://blog.banksalad.com/tech/ |
| 카카오페이 | https://tech.kakaopay.com/ |
| 데보션(SK) | https://devocean.sk.com/ |
| 무신사 | https://medium.com/musinsa-tech |
| 컬리 | https://helloworld.kurly.com/ |
| 몰로코 | https://www.moloco.com/blog |
| 센드버드 | https://sendbird.com/ko/blog |

### 블록체인/보안 특화

| 기업 | 블로그/리소스 |
|------|-------------|
| 플라네타리움 | https://snack.planetarium.dev/kor/ |
| 해치랩스 | https://medium.com/haechi-audit-kr |
| S2W | https://medium.com/s2wblog |

### 활용 규칙

1. **기업명이 한국 기업일 때** → 잡플래닛 + 크레딧잡 + 블라인드를 자동 조사
2. **스타트업일 때** → 혁신의숲 + 넥스트유니콘에서 투자 정보 확인
3. **기술 블로그가 있는 기업** → 최근 글 2-3개 요약하여 포함
4. **정보를 찾을 수 없는 경우** → "정보 부족"으로 명시 (추측 금지)
