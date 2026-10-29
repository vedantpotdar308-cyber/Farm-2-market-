const fs = require('fs');
const path = require('path');

const distHtmlPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(distHtmlPath, 'utf8');

// Find the module script
const scriptStart = html.indexOf('<script type="module"');
const scriptEnd = html.indexOf('</script>', scriptStart) + '</script>'.length;

if (scriptStart !== -1 && scriptEnd !== -1) {
  const scriptTag = html.substring(scriptStart, scriptEnd);
  
  // Extract pure JS inside <script> to verify syntax
  const jsCode = scriptTag.replace(/<script[^>]*>|<\/script>/g, '');
  try {
    new Function(jsCode);
    console.log('✓ Script JavaScript syntax is 100% valid.');
  } catch (err) {
    console.error('✗ FATAL: Script syntax error detected:', err.message);
    process.exit(1);
  }

  // Remove script tag from its original position (head)
  html = html.substring(0, scriptStart) + html.substring(scriptEnd);
  
  // Place script tag safely AFTER <div id="root"></div>
  const rootMarker = '<div id="root"></div>';
  const rootPos = html.indexOf(rootMarker);
  if (rootPos !== -1) {
    html = html.substring(0, rootPos + rootMarker.length) + '\n    ' + scriptTag + html.substring(rootPos + rootMarker.length);
    console.log('✓ Safely relocated <script> tag to immediately after #root before </body>');
  } else {
    console.warn('! Warning: <div id="root"></div> not found, script kept in place.');
  }

  // Write back to dist/index.html
  fs.writeFileSync(distHtmlPath, html, 'utf8');
} else {
  console.log('! No <script type="module"> tag found.');
}

// Verify output file syntax again
const updatedHtml = fs.readFileSync(distHtmlPath, 'utf8');
const updatedStart = updatedHtml.indexOf('<script type="module"');
const updatedEnd = updatedHtml.indexOf('</script>', updatedStart) + '</script>'.length;
const updatedJs = updatedHtml.substring(updatedStart, updatedEnd).replace(/<script[^>]*>|<\/script>/g, '');
try {
  new Function(updatedJs);
  console.log('✓ Final dist/index.html verified valid syntax!');
} catch (err) {
  console.error('✗ FATAL: Final syntax check failed:', err.message);
  process.exit(1);
}

// Copy to docs/index.html (GitHub Pages target)
const docsDir = path.join(__dirname, 'docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
fs.copyFileSync(distHtmlPath, path.join(docsDir, 'index.html'));
console.log('✓ Copied to docs/index.html (GitHub Pages target)');

// Copy to standalone html files
fs.copyFileSync(distHtmlPath, path.join(__dirname, 'Farm2Market_Website.html'));
console.log('✓ Copied to Farm2Market/Farm2Market_Website.html');

fs.copyFileSync(distHtmlPath, path.join(__dirname, '..', 'Farm2Market_Website.html'));
console.log('✓ Copied to d:/download/Farm2Market_Website.html');
