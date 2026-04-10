# Modo: tracker — 지원 이력 대시보드

`data/applications.md`를 읽어 시각화된 대시보드를 출력한다.

## 표시 항목

### 📊 전체 통계

```
🎯 Career-Ops Dashboard — {YYYY-MM-DD}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 전체:  {N}개 평가 | 평균 Score {X.X}/5

📊 점수 분포:
  ⭐ 4.0+ (즉시 지원) ....... {N}개  ████████░░
  🟡 3.0~3.9 (보류/보강) .... {N}개  ████░░░░░░
  🔴 3.0 미만 (스킵) ........ {N}개  ██░░░░░░░░

📋 상태별:
  Evaluated ................ {N}개
  Applied .................. {N}개
  Interview ................ {N}개
  SKIP ..................... {N}개

📎 PDF 생성률: {N}/{M} ({X}%)
📝 Report 생성률: {N}/{M} ({X}%)
```

### 🏆 Score Top 5

상위 5개를 하이라이트로 표시:

```
| 순위 | 점수 | 회사 | 포지션 | 상태 |
```

### 📋 전체 트래커 (applications.md)

`data/applications.md` 원본 테이블 표시.

### 📋 파이프라인 현황 (pipeline.md)

```
Pending:   {N}개
Processed: {M}개
```

## 상태 업데이트

사용자가 상태 변경 요청 시:

```
"해치랩스 Applied로 변경해줘"
→ applications.md의 해당 행 Status를 Applied로 변경
```

**응답 예시:**
```
✅ 해치랩스 — [KALOS] Security Researcher: Evaluated → Applied 변경 완료
```

## 상태 흐름

```
Evaluated → Applied → Responded → Contact → Interview → Offer
                                                    ↘ Rejected
                                            ↘ SKIP
```

| 상태 | 의미 |
|------|------|
| `Evaluated` | 평가 완료, 아직 미지원 |
| `Applied` | 지원서 제출 완료 |
| `Responded` | 기업/리쿠르터가 연락 → 후보자 응답 |
| `Contact` | 후보자가 선제 접촉 (LinkedIn DM 등) |
| `Interview` | 면접 일정 확정 |
| `Offer` | 최종 오퍼 수령 |
| `Rejected` | 불합격 |
| `SKIP` | 지원 부적합 (Hard Blocker) |
