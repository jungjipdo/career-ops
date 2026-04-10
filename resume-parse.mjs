#!/usr/bin/env node
/**
 * career-ops: PDF/DOCX → Markdown 변환 (Node.js 래퍼)
 *
 * .venv/bin/python3 + markitdown을 자동으로 호출합니다.
 * Python venv가 없으면 자동 설치를 안내합니다.
 *
 * Usage:
 *   node resume-parse.mjs resume.pdf                           # → resume-raw.md
 *   node resume-parse.mjs resume.pdf -o cv-raw.md              # → cv-raw.md
 *   node resume-parse.mjs portfolio.pdf --type portfolio       # → portfolio-raw.md
 *   npm run resume-parse -- resume.pdf -o cv-raw.md            # npm script 사용
 */

import { execSync, execFileSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VENV_PYTHON = resolve(__dirname, '.venv', 'bin', 'python3');
const SCRIPT = resolve(__dirname, 'scripts', 'pdf-to-md.py');
const MARKITDOWN_PKG = resolve(__dirname, 'markitdown', 'packages', 'markitdown');

function ensureVenv() {
  if (!existsSync(VENV_PYTHON)) {
    console.log('📦 Python venv가 없습니다. 설치 중...');

    try {
      execSync('python3 -m venv .venv', { cwd: __dirname, stdio: 'inherit' });
    } catch {
      console.error('❌ Python 3.10+ 이 필요합니다. python3 --version 을 확인해주세요.');
      process.exit(1);
    }

    // markitdown 설치
    const pip = resolve(__dirname, '.venv', 'bin', 'pip');
    if (existsSync(MARKITDOWN_PKG)) {
      console.log('📦 markitdown 로컬 소스에서 설치 중...');
      execSync(`"${pip}" install -e "${MARKITDOWN_PKG}[pdf,docx,pptx]"`, {
        cwd: __dirname,
        stdio: 'inherit',
      });
    } else {
      console.log('📦 markitdown PyPI에서 설치 중...');
      execSync(`"${pip}" install "markitdown[pdf,docx,pptx]"`, {
        cwd: __dirname,
        stdio: 'inherit',
      });
    }

    console.log('✅ 설치 완료!\n');
  }
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
career-ops: PDF/DOCX → Markdown 변환

사용법:
  npm run resume-parse -- 이력서.pdf                      # → 이력서-raw.md
  npm run resume-parse -- 이력서.pdf -o cv-raw.md         # → cv-raw.md
  npm run resume-parse -- 포트폴리오.pdf --type portfolio # → 포트폴리오-raw.md

옵션:
  -o, --output    출력 파일 경로 (기본: {입력파일명}-raw.md)
  --type          파일 유형: resume(이력서) 또는 portfolio(포트폴리오) (기본: resume)
  --setup         venv + markitdown 강제 재설치
`);
    process.exit(0);
  }

  if (args.includes('--setup')) {
    // 강제 재설치
    if (existsSync(resolve(__dirname, '.venv'))) {
      execSync(`rm -rf "${resolve(__dirname, '.venv')}"`, { stdio: 'inherit' });
    }
    ensureVenv();
    console.log('✅ Setup 완료!');
    process.exit(0);
  }

  ensureVenv();

  try {
    execFileSync(VENV_PYTHON, [SCRIPT, ...args], {
      cwd: __dirname,
      stdio: 'inherit',
    });
  } catch (err) {
    process.exit(err.status || 1);
  }
}

main();
