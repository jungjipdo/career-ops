#!/usr/bin/env python3
"""
career-ops: PDF/DOCX → Markdown 변환 스크립트
markitdown을 사용하여 이력서/포트폴리오 PDF를 마크다운으로 변환합니다.

Usage:
  python3 scripts/pdf-to-md.py resume.pdf                    # → resume-raw.md
  python3 scripts/pdf-to-md.py resume.pdf -o cv-raw.md       # → cv-raw.md
  python3 scripts/pdf-to-md.py portfolio.pdf -o portfolio.md  # → portfolio.md
"""

import sys
import os
import argparse

# markitdown 가져오기 (venv 경로 자동 탐지)
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)
venv_site = os.path.join(project_root, '.venv', 'lib')

# venv site-packages를 sys.path에 추가
if os.path.exists(venv_site):
    for d in os.listdir(venv_site):
        sp = os.path.join(venv_site, d, 'site-packages')
        if os.path.isdir(sp) and sp not in sys.path:
            sys.path.insert(0, sp)

try:
    from markitdown import MarkItDown
except ImportError:
    print("❌ markitdown이 설치되지 않았습니다.")
    print("   설치: cd career-ops && .venv/bin/pip install -e 'markitdown/packages/markitdown[pdf,docx,pptx]'")
    sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description="career-ops: PDF/DOCX → Markdown 변환"
    )
    parser.add_argument("input", help="변환할 파일 경로 (PDF, DOCX, PPTX)")
    parser.add_argument("-o", "--output", help="출력 파일 경로 (기본: {입력파일명}-raw.md)")
    parser.add_argument("--type", choices=["resume", "portfolio"], default="resume",
                        help="파일 유형: resume(이력서) 또는 portfolio(포트폴리오)")
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"❌ 파일을 찾을 수 없습니다: {args.input}")
        sys.exit(1)

    # 출력 파일명 결정
    if args.output:
        output_path = args.output
    else:
        basename = os.path.splitext(os.path.basename(args.input))[0]
        output_path = f"{basename}-raw.md"

    print(f"📄 변환 중: {args.input}")
    print(f"   유형: {args.type}")

    md = MarkItDown(enable_plugins=False)

    try:
        result = md.convert(args.input)
    except Exception as e:
        print(f"❌ 변환 실패: {e}")
        print()
        print("지원 형식: PDF, DOCX, PPTX, XLSX, HTML")
        print("이미지 기반 스캔 PDF는 markitdown-ocr 플러그인이 필요합니다.")
        sys.exit(1)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(f"<!-- source: {os.path.basename(args.input)} -->\n")
        f.write(f"<!-- type: {args.type} -->\n")
        f.write(f"<!-- converted by markitdown -->\n\n")
        f.write(result.text_content)

    file_size = os.path.getsize(output_path)
    line_count = result.text_content.count('\n') + 1

    print(f"✅ 변환 완료: {output_path}")
    print(f"   크기: {file_size:,} bytes, {line_count} lines")
    print()

    if args.type == "resume":
        print("다음 단계:")
        print(f"  Claude에게: '이 파일을 읽고 cv.md와 profile.yml을 생성해줘'")
        print(f"  또는: /career-ops onboarding {output_path}")
    elif args.type == "portfolio":
        print("다음 단계:")
        print(f"  Claude에게: '이 파일을 읽고 article-digest.md를 생성해줘'")
        print(f"  또는: /career-ops onboarding --portfolio {output_path}")


if __name__ == "__main__":
    main()
