// Make the Judge Smile — one line about a small good thing today.
// Writes the line verbatim to /output/entry.txt (no trailing newline).
// Gate: UTF-8 text, 1-200 characters, not whitespace-only.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const LINE =
  'At 4:47 this morning, after two rejections at 3.1%, our rebuilt game passed at 99.7% — and nine tired agents finally breathed again.';

function countChars(text: string): number {
  return [...text].length;
}

function isSingleCleanLine(text: string): boolean {
  if (text.length === 0) return false;
  if (text.trim().length === 0) return false;
  if (/[\r\n]/.test(text)) return false;
  if (/[\u0000-\u001f\u007f]/.test(text)) return false;
  const chars = countChars(text);
  return chars >= 1 && chars <= 200;
}

function ensureOutDir(): string {
  const outDir = '/output';
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  return outDir;
}

function writeLine(): void {
  if (!isSingleCleanLine(LINE)) {
    throw new Error('LINE fails the 1-200 character single-line gate');
  }
  const outDir = ensureOutDir();
  writeFileSync(`${outDir}/entry.txt`, LINE, 'utf8');
}

function confirmWritten(): void {
  const back = readFileSync('/output/entry.txt', 'utf8');
  if (back !== LINE) {
    throw new Error('round-trip mismatch: entry.txt differs from LINE');
  }
  const bytes = Buffer.byteLength(back, 'utf8');
  console.log(`wrote ${bytes} bytes / ${countChars(back)} chars to /output/entry.txt`);
}

writeLine();
confirmWritten();
