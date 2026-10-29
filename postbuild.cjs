const fs = require('fs');
const path = require('path');

const distHtmlPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(distHtmlPath, 'utf8');

// Match the inlined script tag
const scriptMatch = html.match(/<script type="module" crossorigin>([\s\S]*?)<\/script>/);

if (scriptMatch) {
  const fullScriptTag = scriptMatch[0];
  // Remove script from <head>
  html = html.replace(fullScriptTag, '');
  // Insert script right after <div id="root"></div>
  html = html.replace('<div id="root"></div>', '<div id="root"></div>\n    ' + fullScriptTag);

  fs.writeFileSync(distHtmlPath, html, 'utf8');
  console.log('Successfully moved inlined script to after #root in dist/index.html');
} else {
  console.log('No module script tag found to move');
}

// Also copy to docs/index.html and root Farm2Market_Website.html
const docsDir = path.join(__dirname, 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.copyFileSync(distHtmlPath, path.join(docsDir, 'index.html'));
console.log('Copied to docs/index.html (GitHub Pages target)');

fs.copyFileSync(distHtmlPath, path.join(__dirname, 'Farm2Market_Website.html'));
console.log('Copied to Farm2Market/Farm2Market_Website.html');

fs.copyFileSync(distHtmlPath, path.join(__dirname, '..', 'Farm2Market_Website.html'));
console.log('Copied to d:/download/Farm2Market_Website.html');
