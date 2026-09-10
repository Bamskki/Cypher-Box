/**
 * No em-dash in text a user can read.
 *
 * A house rule that was audited by hand and kept losing. An audit in September
 * 2026 found six violations in `src/services` and concluded the directory had
 * rotted because it was missing from the list of places to grep. A full scan
 * said otherwise: `src/screens` had been on that list the whole time and held
 * forty. Being listed is not what keeps a directory clean; something failing is.
 *
 * SCOPE. Text a user can read, which is narrower than every em-dash in the
 * tree:
 *
 *   comments        skipped. Not user-facing, and the codebase uses em-dashes
 *                   in prose comments deliberately.
 *   console.*       skipped. Developer output, most of it behind __DEV__.
 *   `return '—'`    skipped. An em-dash standing in for "no value" in a table
 *                   cell is a typographic convention, not prose, and replacing
 *                   it with a hyphen would just look wrong.
 *   loc/*.json      not scanned. Those are inherited BlueWallet translations in
 *                   other languages; the rule is about English copy.
 *
 * The scanner is deliberately line-based and slightly blunt. A false positive
 * costs someone one punctuation change; a false negative is how forty of these
 * accumulated in a directory that was already being audited.
 */

import fs from 'fs';
import path from 'path';

const REPO_ROOT = path.resolve(__dirname, '../..');
const ROOTS = ['src'];
const EM_DASH = '—';

/**
 * Files whose user-facing em-dashes are fixed on branches that have not merged
 * yet (the Ark L1 audit copy pass, and the money-safety change that rewrites
 * the Lightning cancel block).
 *
 * DELETE THIS LIST once those land. It exists so this test can start guarding
 * everything else today instead of waiting, and every entry is a known debt
 * rather than an accepted one.
 */
const PENDING_ON_OTHER_BRANCHES = new Set([
    'src/services/ark/history.ts',
    'src/services/ark/backgroundNotifications.ts',
    'src/services/ark/safFolderBackup.ts',
    'src/services/ark/lightning.ts',
    'src/services/lightningSwap/providers/strike.ts',
]);

function walk(dir: string, out: string[] = []): string[] {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
            walk(full, out);
        } else if (/\.tsx?$/.test(entry.name)) {
            out.push(full);
        }
    }
    return out;
}

function offendingLines(body: string): { line: number; text: string }[] {
    const out: { line: number; text: string }[] = [];
    const lines = body.split('\n');
    let inBlockComment = false;

    lines.forEach((raw, idx) => {
        const trimmed = raw.trim();
        let seg = raw;

        if (inBlockComment) {
            if (!raw.includes('*/')) return;
            inBlockComment = false;
            seg = raw.split('*/', 2)[1] ?? '';
        }
        // Remove block comments that open AND close on this line first. Without
        // this, every single-line `/** ... */` doc comment reads as live code:
        // that was 22 false positives on the first run, all of them comments.
        seg = seg.replace(/\/\*[\s\S]*?\*\//g, '');

        const open = seg.indexOf('/*');
        if (open >= 0) {
            inBlockComment = true;
            seg = seg.slice(0, open);
        }
        if (trimmed.startsWith('//') || trimmed.startsWith('*')) return;

        // Trailing line comment. The lookbehind keeps "https://" intact.
        seg = seg.replace(/(?<![:"'`])\/\/.*$/, '');
        if (!seg.includes(EM_DASH)) return;

        // "no value" placeholder, see the scope note above.
        if (/return\s*['"`]—['"`]/.test(seg)) return;

        // Developer output. Checked across a small window because these calls
        // are routinely wrapped over several lines.
        const window = lines.slice(Math.max(0, idx - 3), idx + 1).join('\n');
        if (/console\.(log|warn|error|info|debug)\s*\(/.test(window)) return;

        out.push({ line: idx + 1, text: trimmed.slice(0, 120) });
    });
    return out;
}

describe('no em-dash in user-facing copy', () => {
    it('finds none, anywhere under src', () => {
        const offenders: string[] = [];
        for (const root of ROOTS) {
            for (const abs of walk(path.join(REPO_ROOT, root))) {
                const rel = path.relative(REPO_ROOT, abs);
                if (PENDING_ON_OTHER_BRANCHES.has(rel)) continue;
                if (rel.endsWith('noEmDashInUserCopy.test.ts')) continue;
                for (const hit of offendingLines(fs.readFileSync(abs, 'utf8'))) {
                    offenders.push(`${rel}:${hit.line}  ${hit.text}`);
                }
            }
        }
        expect(offenders).toEqual([]);
    });
});
