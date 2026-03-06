#!/usr/bin/env node
/**
 * Verifica que todas las imágenes referenciadas en content.es.json y content.en.json
 * existan en public/. Útil cuando se borran fotos.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILES = ['data/content.es.json', 'data/content.en.json'];

function collectImageRefs(obj, refs = new Set()) {
  if (typeof obj === 'string' && /\.(webp|png|jpg|jpeg)$/i.test(obj)) {
    refs.add(obj.startsWith('/') ? obj.slice(1) : obj);
  }
  if (Array.isArray(obj)) obj.forEach(o => collectImageRefs(o, refs));
  else if (obj && typeof obj === 'object') Object.values(obj).forEach(o => collectImageRefs(o, refs));
  return refs;
}

function findRefsInJson(data, path = '') {
  const result = [];
  if (typeof data === 'string' && /\.(webp|png|jpg|jpeg)$/i.test(data)) {
    result.push({ path: data.startsWith('/') ? data.slice(1) : data, jsonPath: path });
  }
  if (Array.isArray(data)) {
    data.forEach((item, i) => result.push(...findRefsInJson(item, `${path}[${i}]`)));
  } else if (data && typeof data === 'object') {
    for (const [k, v] of Object.entries(data)) result.push(...findRefsInJson(v, path ? `${path}.${k}` : k));
  }
  return result;
}

let hasErrors = false;
for (const file of FILES) {
  const filepath = path.join(ROOT, file);
  if (!fs.existsSync(filepath)) continue;

  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const refs = findRefsInJson(data);

  const missing = refs.filter(({ path: p }) => !fs.existsSync(path.join(ROOT, 'public', p)));

  if (missing.length > 0) {
    hasErrors = true;
    console.log(`\n${file}: ${missing.length} referencias a archivos que NO existen:\n`);
    missing.forEach(({ path: p, jsonPath }) => console.log(`  - ${p}\n    (${jsonPath})`));
  } else {
    console.log(`${file}: OK (${refs.length} referencias, todas existen)`);
  }
}

process.exit(hasErrors ? 1 : 0);
