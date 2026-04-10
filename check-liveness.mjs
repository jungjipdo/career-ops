#!/usr/bin/env node

/**
 * check-liveness.mjs — Playwright job link liveness checker
 *
 * Tests whether job posting URLs are still active or have expired.
 * Uses the same detection logic as scan.md step 7.5.
 * Zero Claude API tokens — pure Playwright.
 *
 * Usage:
 *   node check-liveness.mjs <url1> [url2] ...
 *   node check-liveness.mjs --file urls.txt
 *
 * Exit code: 0 if all active, 1 if any expired or uncertain
 */

import { chromium } from 'playwright';
import { readFile } from 'fs/promises';

const EXPIRED_PATTERNS = [
  /job (is )?no longer available/i,
  /job.*no longer open/i,           // Greenhouse: "The job you are looking for is no longer open."
  /position has been filled/i,
  /this job has expired/i,
  /job posting has expired/i,
  /no longer accepting applications/i,
  /this (position|role|job) (is )?no longer/i,
  /this job (listing )?is closed/i,
  /job (listing )?not found/i,
  /the page you are looking for doesn.t exist/i, // Workday /job/ 404
  /\d+\s+jobs?\s+found/i,           // Workday: landed on listing page ("663 JOBS FOUND") instead of a specific job
  /search for jobs page is loaded/i, // Workday SPA indicator for listing page
  /diese stelle (ist )?(nicht mehr|bereits) besetzt/i,
  /offre (expirée|n'est plus disponible)/i,
];

// URL patterns that indicate an ATS has redirected away from the job (closed/expired)
const EXPIRED_URL_PATTERNS = [
  /[?&]error=true/i,   // Greenhouse redirect on closed jobs
];

const APPLY_PATTERNS = [
  /\bapply\b/i,          // catches "Apply", "Apply Now", "Apply for this Job"
  /\bsolicitar\b/i,
  /\bbewerben\b/i,
  /\bpostuler\b/i,
  /submit application/i,
  /easy apply/i,
  /start application/i,  // Ashby
  /ich bewerbe mich/i,   // German Greenhouse
  /지원하기/,             // Korean: Wanted, Jumpit
  /입사지원/,             // Korean: Saramin
  /즉시지원/,             // Korean: immediate apply
];

// Below this length the page is probably just nav/footer (closed ATS page)
const MIN_CONTENT_CHARS = 300;

// Deadline parsing patterns (한국어 + 영어)
const DEADLINE_PATTERNS = [
  /마감일?\s*[:：]?\s*(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/,
  /마감\s*[:：]?\s*(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/,
  /접수\s*기간\s*[:：]?.*?~\s*(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/,
  /모집\s*기간\s*[:：]?.*?~\s*(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/,
  /deadline\s*[:：]?\s*(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/i,
  /closing\s+date\s*[:：]?\s*(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/i,
  /expires?\s*[:：]?\s*(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})/i,
];

const THREE_MONTHS_MS = 90 * 24 * 60 * 60 * 1000;

function checkDeadline(bodyText) {
  for (const pattern of DEADLINE_PATTERNS) {
    const match = bodyText.match(pattern);
    if (match) {
      const [, year, month, day] = match;
      const deadline = new Date(Number(year), Number(month) - 1, Number(day));
      const now = new Date();
      const diff = now - deadline;
      if (diff > THREE_MONTHS_MS) {
        return { status: 'expired', date: `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}` };
      } else if (diff > 0) {
        return { status: 'warning', date: `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}` };
      }
      return { status: 'active', date: `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}` };
    }
  }
  return { status: 'none', date: null };
}

async function checkUrl(page, url) {
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    const status = response?.status() ?? 0;
    if (status === 404 || status === 410) {
      return { result: 'expired', reason: `HTTP ${status}` };
    }

    // Give SPAs (Ashby, Lever, Workday) time to hydrate
    await page.waitForTimeout(2000);

    // Check if the ATS redirected to an error/listing page (e.g. Greenhouse ?error=true)
    const finalUrl = page.url();
    for (const pattern of EXPIRED_URL_PATTERNS) {
      if (pattern.test(finalUrl)) {
        return { result: 'expired', reason: `redirect to ${finalUrl}` };
      }
    }

    const bodyText = await page.evaluate(() => document.body?.innerText ?? '');

    // Check deadline FIRST — a page can look active but have a past deadline
    const deadlineCheck = checkDeadline(bodyText);
    if (deadlineCheck.status === 'expired') {
      return { result: 'expired', reason: `deadline passed: ${deadlineCheck.date} (3개월+ 경과)` };
    }

    // Apply button is the strongest positive signal — check it first.
    // This short-circuits before expired patterns that can appear on active pages
    // (e.g. Workday's split-view layout shows "N JOBS FOUND" even on active job pages).
    if (APPLY_PATTERNS.some(p => p.test(bodyText))) {
      if (deadlineCheck.status === 'warning') {
        return { result: 'uncertain', reason: `apply button found but deadline passed: ${deadlineCheck.date} (⚠️ 마감일 경과)` };
      }
      return { result: 'active', reason: 'apply button detected' };
    }

    for (const pattern of EXPIRED_PATTERNS) {
      if (pattern.test(bodyText)) {
        return { result: 'expired', reason: `pattern matched: ${pattern.source}` };
      }
    }

    if (bodyText.trim().length < MIN_CONTENT_CHARS) {
      return { result: 'expired', reason: 'insufficient content — likely nav/footer only' };
    }

    return { result: 'uncertain', reason: 'content present but no apply button found' };

  } catch (err) {
    return { result: 'expired', reason: `navigation error: ${err.message.split('\n')[0]}` };
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node check-liveness.mjs <url1> [url2] ...');
    console.error('       node check-liveness.mjs --file urls.txt');
    process.exit(1);
  }

  let urls;
  if (args[0] === '--file') {
    const text = await readFile(args[1], 'utf-8');
    urls = text.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  } else {
    urls = args;
  }

  console.log(`Checking ${urls.length} URL(s)...\n`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let active = 0, expired = 0, uncertain = 0;

  // Sequential — project rule: never Playwright in parallel
  for (const url of urls) {
    const { result, reason } = await checkUrl(page, url);
    const icon = { active: '✅', expired: '❌', uncertain: '⚠️' }[result];
    console.log(`${icon} ${result.padEnd(10)} ${url}`);
    if (result !== 'active') console.log(`           ${reason}`);
    if (result === 'active') active++;
    else if (result === 'expired') expired++;
    else uncertain++;
  }

  await browser.close();

  console.log(`\nResults: ${active} active  ${expired} expired  ${uncertain} uncertain`);
  if (expired > 0 || uncertain > 0) process.exit(1);
}

main().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
