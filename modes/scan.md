# Modo: scan — Portal Scanner (Descubrimiento de Ofertas)

Escanea portales de empleo configurados, filtra por relevancia de título, y añade nuevas ofertas al pipeline para evaluación posterior.

## Ejecución recomendada

Ejecutar como subagente para no consumir contexto del main:

```
Agent(
    subagent_type="general-purpose",
    prompt="[contenido de este archivo + datos específicos]",
    run_in_background=True
)
```

## Configuración

Leer `portals.yml` que contiene:
- `search_queries`: Lista de queries WebSearch con `site:` filters por portal (descubrimiento amplio)
- `tracked_companies`: Empresas específicas con `careers_url` para navegación directa
- `title_filter`: Keywords positive/negative/seniority_boost para filtrado de títulos

## Estrategia de descubrimiento (3 niveles)

### Nivel 1 — Playwright directo (PRINCIPAL)

**Para cada empresa en `tracked_companies`:** Navegar a su `careers_url` con Playwright (`browser_navigate` + `browser_snapshot`), leer TODOS los job listings visibles, y extraer título + URL de cada uno. Este es el método más fiable porque:
- Ve la página en tiempo real (no resultados cacheados de Google)
- Funciona con SPAs (Ashby, Lever, Workday)
- Detecta ofertas nuevas al instante
- No depende de la indexación de Google

**Cada empresa DEBE tener `careers_url` en portals.yml.** Si no la tiene, buscarla una vez, guardarla, y usar en futuros scans.

### Nivel 2 — Greenhouse API (COMPLEMENTARIO)

Para empresas con Greenhouse, la API JSON (`boards-api.greenhouse.io/v1/boards/{slug}/jobs`) devuelve datos estructurados limpios. Usar como complemento rápido de Nivel 1 — es más rápido que Playwright pero solo funciona con Greenhouse.

### Nivel 3 — WebSearch queries (DESCUBRIMIENTO AMPLIO)

Los `search_queries` con `site:` filters cubren portales de forma transversal (todos los Ashby, todos los Greenhouse, etc.). Útil para descubrir empresas NUEVAS que aún no están en `tracked_companies`, pero los resultados pueden estar desfasados.

**Prioridad de ejecución:**
1. Nivel 1: Playwright → todas las `tracked_companies` con `careers_url`
2. **Nivel 1.5: Korean job portals** → Playwright keyword search en portales coreanos
3. Nivel 2: API → todas las `tracked_companies` con `api:`
4. Nivel 3: WebSearch → todos los `search_queries` con `enabled: true`

Los niveles son aditivos — se ejecutan todos, los resultados se mezclan y deduplicar.

### Nivel 1.5 — Korean Job Portal Playwright Scan (한국 채용 사이트 직접 스캔)

Los portales de empleo coreanos (Wanted, Jumpit, RocketPunch) NO son páginas de carreras de empresas, sino agregadores con búsqueda por keyword. Se escanean con Playwright navegando a su URL de búsqueda.

Leer `portals.yml → kr_job_portals` para la configuración:

#### Wanted (원티드)
- URL: `https://www.wanted.co.kr/search?query={keyword}&tab=position`
- **Extraer de la snapshot:**
  - Links que empiecen con `/wd/` → URLs de ofertas
  - Para cada link: título (texto del link o `strong`), empresa (texto adjunto)
  - Si visible, experiencia requerida (p.ej. "경력 2-5년", "신입·경력")
- **Scroll**: infinite scroll. Hacer 2-3 scrolls (`browser_scroll` down), esperar 1-2s entre scrolls. Parar si no aparecen nuevos items.
- **Output**: `https://www.wanted.co.kr/wd/{id}`
- **Keywords**: los definidos en `kr_job_portals[name=원티드].keywords`

#### Jumpit (점핏)
- URL: `https://www.jumpit.co.kr/positions?keyword={keyword}`
- **Extraer de la snapshot:**
  - Links que empiecen con `/position/` → URLs de ofertas
  - Para cada link: título, empresa, y experiencia si disponibles
- **Scroll**: infinite scroll. 2-3 scrolls.
- **Output**: `https://www.jumpit.co.kr/position/{id}`
- **Keywords**: los definidos en `kr_job_portals[name=점핏].keywords`

#### RocketPunch (로켓펀치)
- URL: `https://www.rocketpunch.com/jobs?keywords={keyword}`
- **Extraer de la snapshot:**
  - Job cards con título y empresa
  - Links a páginas individuales de ofertas
- **Pagination**: Hacer click en "다음" o siguiente si existe. Max 3 páginas.
- **Output**: full rocketpunch URL

#### Ejecución:
1. Para cada portal en `kr_job_portals` con `enabled: true`:
   a. Para cada keyword en su `keywords` list:
      - Navegar a `search_url` con el keyword sustituido
      - Snapshot + scroll para obtener más resultados
      - Extraer {title, url, company, experience_text} para cada listing
   b. Dedup intra-portal (misma URL de distintos keywords)
2. Aplicar el filtro de 3 etapas (Stage A/B/C) del paso 6
3. Dedup contra scan-history.tsv + pipeline.md + applications.md
4. Añadir nuevos al pipeline.md

## Workflow

1. **Leer configuración**: `portals.yml`
2. **Leer historial**: `data/scan-history.tsv` → URLs ya vistas
3. **Leer dedup sources**: `data/applications.md` + `data/pipeline.md`

4. **Nivel 1 — Playwright scan** (paralelo en batches de 3-5):
   Para cada empresa en `tracked_companies` con `enabled: true` y `careers_url` definida:
   a. `browser_navigate` a la `careers_url`
   b. `browser_snapshot` para leer todos los job listings
   c. Si la página tiene filtros/departamentos, navegar las secciones relevantes
   d. Para cada job listing extraer: `{title, url, company}`
   e. Si la página pagina resultados, navegar páginas adicionales
   f. Acumular en lista de candidatos
   g. Si `careers_url` falla (404, redirect), intentar `scan_query` como fallback y anotar para actualizar la URL

5. **Nivel 2 — Greenhouse APIs** (paralelo):
   Para cada empresa en `tracked_companies` con `api:` definida y `enabled: true`:
   a. WebFetch de la URL de API → JSON con lista de jobs
   b. Para cada job extraer: `{title, url, company}`
   c. Acumular en lista de candidatos (dedup con Nivel 1)

6. **Nivel 3 — WebSearch queries** (paralelo si posible):
   Para cada query en `search_queries` con `enabled: true`:
   a. Ejecutar WebSearch con el `query` definido
   b. De cada resultado extraer: `{title, url, company}`
      - **title**: del título del resultado (antes del " @ " o " | ")
      - **url**: URL del resultado
      - **company**: después del " @ " en el título, o extraer del dominio/path
   c. Acumular en lista de candidatos (dedup con Nivel 1+2)

6. **Filtrar por título** — 3-stage smart filter:

   **Stage A: Title keyword filter** (portals.yml `title_filter`):
   - Al menos 1 keyword de `positive` debe aparecer en el título (case-insensitive substring match)
   - 0 keywords de `negative` deben aparecer
   - `seniority_boost` keywords dan prioridad pero no son obligatorios
   - ⚠️ **CRITICAL: En esta etapa usar SOLO los keywords de title_filter. NO hacer juicio propio sobre si el candidato encaja. NO skippear por nivel de experiencia percibido, seniority, o stack inferido.**

   **Stage B: Experience requirement filter** (title-based parsing):
   - Si el título contiene patrones de experiencia, extraer el número:
     - `"(N년 이상)"`, `"(경력 N-M년)"`, `"(N+ years)"`, `"(N+years exp)"` → extraer N
     - `"(7년 이상)"` → 7, `"(경력 2-5년)"` → 2 (usar el mínimo)
   - Comparar con `config/profile.yml → candidate.max_yoe_filter`
   - Si requisito ≤ max_yoe_filter → PASS
   - Si requisito > max_yoe_filter → registrar como `skipped_experience`
   - Sin mención de experiencia en título → PASS (asumimos "경력무관" o "협의")

   **Stage C: Seniority gate** (conservative):
   - Títulos con "Staff", "Principal", "Director", "VP", "CTO", "Head of" → `skipped_seniority`
   - Títulos con "Senior", "Lead", "시니어", "수석", "팀장" → PASS (evaluación posterior decide)
   - Todo lo demás → PASS

7. **Deduplicar** contra 3 fuentes:
   - `scan-history.tsv` → URL exacta ya vista
   - `applications.md` → empresa + rol normalizado ya evaluado
   - `pipeline.md` → URL exacta ya en pendientes o procesadas

7.5. **Verificar liveness de resultados** — ANTES de añadir a pipeline:

   Los resultados de WebSearch pueden estar desactualizados (Google cachea resultados durante semanas o meses). Para evitar evaluar ofertas expiradas, verificar con Playwright cada URL nueva que provenga del Nivel 3. Los Niveles 1 y 2 son inherentemente en tiempo real y no requieren esta verificación.

   Para cada URL nueva de Nivel 3 (secuencial — NUNCA Playwright en paralelo):
   a. `browser_navigate` a la URL
   b. `browser_snapshot` para leer el contenido
   c. Clasificar:
      - **Activa**: título del puesto visible + descripción del rol + botón Apply/Submit/Solicitar
      - **Expirada** (cualquiera de estas señales):
        - URL final contiene `?error=true` (Greenhouse redirige así cuando la oferta está cerrada)
        - Página contiene: "job no longer available" / "no longer open" / "position has been filled" / "this job has expired" / "page not found"
        - Solo navbar y footer visibles, sin contenido JD (contenido < ~300 chars)
        - **Fecha de cierre pasada (deadline check):**
          - Buscar en la página: "마감일", "마감", "접수 기간", "deadline", "closing date", "expires"
          - Si existe una fecha de cierre y es **anterior a hoy - 3 meses** → `skipped_expired`
          - Si es anterior a hoy pero dentro de 3 meses → marcar como `⚠️ deadline_warning`
            en el pipeline.md entry: `- [ ] {url} | {company} | {title} | ⚠️ 마감일 {fecha}`
          - Si no existe fecha de cierre explícita → tratar como activa (mayoría de portales)
          - ⚠️ **한국 사이트 주의:** 원티드(Wanted), 점핏(Jumpit) 등에서 공고가 활성 게재 중이지만
            실제 마감일이 이미 지난 경우가 빈번함. 반드시 마감일 필드를 체크할 것.
   d. Si expirada: registrar en `scan-history.tsv` con status `skipped_expired` y descartar
   e. Si activa: continuar al paso 8

   **No interrumpir el scan entero si una URL falla.** Si `browser_navigate` da error (timeout, 403, etc.), marcar como `skipped_expired` y continuar con la siguiente.

8. **Para cada oferta nueva verificada que pase filtros**:
   a. Añadir a `pipeline.md` sección "Pendientes": `- [ ] {url} | {company} | {title}`
   b. Registrar en `scan-history.tsv`: `{url}\t{date}\t{query_name}\t{title}\t{company}\tadded`

9. **Ofertas filtradas por título**: registrar en `scan-history.tsv` con status `skipped_title`
10. **Ofertas duplicadas**: registrar con status `skipped_dup`
11. **Ofertas expiradas (Nivel 3)**: registrar con status `skipped_expired`

## Extracción de título y empresa de WebSearch results

Los resultados de WebSearch vienen en formato: `"Job Title @ Company"` o `"Job Title | Company"` o `"Job Title — Company"`.

Patrones de extracción por portal:
- **Ashby**: `"Senior AI PM (Remote) @ EverAI"` → title: `Senior AI PM`, company: `EverAI`
- **Greenhouse**: `"AI Engineer at Anthropic"` → title: `AI Engineer`, company: `Anthropic`
- **Lever**: `"Product Manager - AI @ Temporal"` → title: `Product Manager - AI`, company: `Temporal`

Regex genérico: `(.+?)(?:\s*[@|—–-]\s*|\s+at\s+)(.+?)$`

## URLs privadas

Si se encuentra una URL no accesible públicamente:
1. Guardar el JD en `jds/{company}-{role-slug}.md`
2. Añadir a pipeline.md como: `- [ ] local:jds/{company}-{role-slug}.md | {company} | {title}`

## Scan History

`data/scan-history.tsv` trackea TODAS las URLs vistas:

```
url	first_seen	portal	title	company	status
https://...	2026-02-10	Ashby — AI PM	PM AI	Acme	added
https://...	2026-02-10	Greenhouse — SA	Junior Dev	BigCo	skipped_title
https://...	2026-02-10	Ashby — AI PM	SA AI	OldCo	skipped_dup
https://...	2026-02-10	WebSearch — AI PM	PM AI	ClosedCo	skipped_expired
```

## Resumen de salida

```
Portal Scan — {YYYY-MM-DD}
━━━━━━━━━━━━━━━━━━━━━━━━━━
Queries ejecutados: N
Ofertas encontradas: N total
Filtradas por título: N relevantes
Duplicadas: N (ya evaluadas o en pipeline)
Expiradas descartadas: N (links muertos, Nivel 3)
Nuevas añadidas a pipeline.md: N

  + {company} | {title} | {query_name}
  ...

📋 파이프라인에 총 {M}개 공고가 대기 중입니다.
→ /career-ops pipeline 으로 평가를 시작할까요? (Y/N)
```

**⚠️ CRITICAL: 스캔 완료 후 pipeline을 자동 실행하지 않는다. 반드시 사용자에게 확인을 구한다.**

## Gestión de careers_url

Cada empresa en `tracked_companies` debe tener `careers_url` — la URL directa a su página de ofertas. Esto evita buscarlo cada vez.

**Patrones conocidos por plataforma:**
- **Ashby:** `https://jobs.ashbyhq.com/{slug}`
- **Greenhouse:** `https://job-boards.greenhouse.io/{slug}` o `https://job-boards.eu.greenhouse.io/{slug}`
- **Lever:** `https://jobs.lever.co/{slug}`
- **Custom:** La URL propia de la empresa (ej: `https://openai.com/careers`)

**Si `careers_url` no existe** para una empresa:
1. Intentar el patrón de su plataforma conocida
2. Si falla, hacer un WebSearch rápido: `"{company}" careers jobs`
3. Navegar con Playwright para confirmar que funciona
4. **Guardar la URL encontrada en portals.yml** para futuros scans

**Si `careers_url` devuelve 404 o redirect:**
1. Anotar en el resumen de salida
2. Intentar scan_query como fallback
3. Marcar para actualización manual

## Mantenimiento del portals.yml

- **SIEMPRE guardar `careers_url`** cuando se añade una empresa nueva
- Añadir nuevos queries según se descubran portales o roles interesantes
- Desactivar queries con `enabled: false` si generan demasiado ruido
- Ajustar keywords de filtrado según evolucionen los roles target
- Añadir empresas a `tracked_companies` cuando interese seguirlas de cerca
- Verificar `careers_url` periódicamente — las empresas cambian de plataforma ATS
