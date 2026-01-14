const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = `<!doctype html><html><head></head><body><a id="tel" href="tel:+551199999999">Ligar</a></body></html>`;
const dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
const window = dom.window;

// Stub gtag to capture calls
window.gtag = function () {
  console.log('GTAG_CALL', Array.from(arguments));
};

// Load and execute main.js inside the JSDOM window
const mainJsPath = path.resolve(__dirname, '../assets/js/main.js');
const mainJs = fs.readFileSync(mainJsPath, 'utf8');
window.eval(mainJs);

// Wait shortly to allow any DOMContentLoaded handlers to attach
setTimeout(() => {
  const a = window.document.getElementById('tel');
  if (!a) {
    console.error('Tel link not found');
    process.exit(2);
  }
  // Simulate user click
  a.click();
  // Allow any synchronous console logs to appear
  setTimeout(() => { process.exit(0); }, 200);
}, 100);
