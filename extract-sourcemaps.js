/*
  Extract original sources from webpack source maps into recovered-src/
  Usage:
    node extract-sourcemaps.js
*/

const fs = require('fs');
const path = require('path');

const WORKDIR = __dirname;
const OUTPUT_DIR = path.join(WORKDIR, 'src');
const BUILD_DIR = path.join(WORKDIR, 'build');

/** Normalize webpack source paths into filesystem paths under OUTPUT_DIR */
function normalizeSourcePath(src) {
  if (!src) return 'unknown.js';
  // strip webpack protocol prefixes
  src = src.replace(/^webpack:\/\//, '');
  src = src.replace(/^\.\//, '');
  // sometimes sources look like 'webpack:///src/...'
  src = src.replace(/^\/+/, '');
  // drop any query/hash
  src = src.split('?')[0].split('#')[0];
  // if it starts with src/, remove the src/ prefix since we're already writing to src/
  if (src.startsWith('src/')) {
    src = src.substring(4);
  } else if (!src.startsWith('public/') && !src.startsWith('node_modules/')) {
    // put everything else at the root of src/ (for files that were originally in src/)
    src = src;
  }
  return path.join(OUTPUT_DIR, src);
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function extractFromMap(mapPath) {
  const absMap = path.isAbsolute(mapPath) ? mapPath : path.join(WORKDIR, mapPath);
  if (!fs.existsSync(absMap)) {
    console.warn(`[warn] sourcemap not found: ${absMap}`);
    return { written: 0 };
  }
  const raw = fs.readFileSync(absMap, 'utf8');
  let map;
  try {
    map = JSON.parse(raw);
  } catch (e) {
    console.error(`[error] invalid sourcemap JSON: ${absMap}`);
    return { written: 0 };
  }

  const sources = map.sources || [];
  const contents = map.sourcesContent || [];
  if (!Array.isArray(sources) || sources.length === 0) {
    console.warn(`[warn] no sources listed in: ${absMap}`);
    return { written: 0 };
  }

  let written = 0;
  sources.forEach((src, i) => {
    const outPath = normalizeSourcePath(src);
    const content = contents[i];
    if (typeof content !== 'string') {
      // no inline source; write placeholder to keep structure
      ensureDir(outPath);
      if (!fs.existsSync(outPath)) {
        fs.writeFileSync(outPath, `/* source content not inlined for ${src} */\n`);
        written += 1;
      }
      return;
    }
    ensureDir(outPath);
    fs.writeFileSync(outPath, content, 'utf8');
    written += 1;
  });

  return { written };
}

function main() {
  console.log('[info] Extracting sources to:', OUTPUT_DIR);
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Prefer maps from build/ if present, else from root-level static/js
  const candidateJsRoots = [
    path.join(BUILD_DIR, 'static/js'),
    path.join(WORKDIR, 'static/js'),
  ];

  let jsRoot = candidateJsRoots.find((p) => fs.existsSync(p));
  if (!jsRoot) {
    console.error('[error] No static/js folder found in build/ or project root.');
    process.exit(1);
  }

  const candidateCssRoots = [
    path.join(BUILD_DIR, 'static/css'),
    path.join(WORKDIR, 'static/css'),
  ];

  let cssRoot = candidateCssRoots.find((p) => fs.existsSync(p));

  const jsMaps = ['main.421d4183.chunk.js.map', '2.77f50c9b.chunk.js.map']
    .map((f) => path.join(jsRoot, f));

  const cssMaps = cssRoot ? ['main.f063b82f.chunk.css.map'].map((f) => path.join(cssRoot, f)) : [];

  const maps = [...jsMaps, ...cssMaps];

  let total = 0;
  maps.forEach((m) => {
    const res = extractFromMap(m);
    console.log(`[info] ${m} -> wrote ${res.written} files`);
    total += res.written;
  });

  console.log(`[done] Wrote ~${total} files into ${OUTPUT_DIR}`);
  console.log('[note] If some files contain a placeholder, the sourcemap lacked inline sources for them.');
}

main();


