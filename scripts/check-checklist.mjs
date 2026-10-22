// Fails the build when the 15 in estandar.yaml changed after the checklist PDF was made (checklist-data.mjs).
import { readFile, stat } from 'node:fs/promises';
import { loadChecklist, RECORD, SOURCE } from './checklist-data.mjs';

const { hash, pdf } = await loadChecklist();
const record = JSON.parse(await readFile(RECORD, 'utf8').catch(() => '{}'));
const exists = await stat(`public${pdf.file}`).then(() => true, () => false);

if (!exists || record.sourceHash !== hash || record.file !== pdf.file) {
  console.error(`check:checklist: the PDF is missing or older than ${SOURCE}. Run: node scripts/checklist-pdf.mjs`);
  process.exit(1);
}
console.log('check:checklist: the PDF matches the standard.');
