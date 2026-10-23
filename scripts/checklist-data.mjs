// The checklist's data: the 15 of src/content/pages/es/estandar.yaml (groups + pdf block) and its fingerprint.
// Shared by checklist-pdf.mjs (writes the PDF and records the fingerprint) and check-checklist.mjs (the build
// fails when the YAML changed after the PDF was made), so /estandar/, /recursos/ and the PDF never disagree.
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

export const SOURCE = 'src/content/pages/es/estandar.yaml';
export const RECORD = 'src/data/checklist.json';

export async function loadChecklist() {
  const page = parse(await readFile(SOURCE, 'utf8'));
  const data = { groups: page.list.groups, pdf: page.pdf };
  const hash = createHash('sha256').update(JSON.stringify(data)).digest('hex');
  return { ...data, hash };
}
