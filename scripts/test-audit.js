/**
 * Automated Production Audit & Quality Assurance Test Suite
 * Mahammad Irfan Shaik — ML Engineer & Data Scientist Portfolio
 * Usage: node scripts/test-audit.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failedTests++;
  }
}

console.log('\n============================================================');
console.log('🔍 RUNNING COMPREHENSIVE PRODUCTION AUDIT TEST SUITE');
console.log('============================================================\n');

// --- 1. File Structure & Core Assets ---
console.log('📁 1. Core Assets & File Structure:');
const requiredFiles = [
  'index.html',
  'package.json',
  'vercel.json',
  '.gitignore',
  '.env.example',
  'robots.txt',
  'sitemap.xml',
  'assets/favicon.svg',
  'assets/resume.pdf',
  'resume.pdf',
  'data/projects-config.json',
  'data/projects-live.json',
  'projects/smart-security-camera.html',
  'projects/weather-forecasting.html',
  'projects/ipl-analytics-dashboard.html',
  'projects/eye-disease-classification.html',
  'projects/toxic-comment-classifier.html',
  'projects/school-performance-analytics.html',
  'projects/detail.html',
  'css/style.css',
  'css/components.css',
  'css/animations.css',
  'css/case-study.css',
  'js/data.js',
  'js/projectConfig.js',
  'js/technologyDetector.js',
  'js/repositoryParser.js',
  'js/githubService.js',
  'js/projectTransformer.js',
  'js/projectSync.js',
  'js/modal.js',
  'js/contact.js',
  'js/main.js',
  'js/case-study.js',
  'api/github-webhook.js',
  'scripts/sync-github.js',
  'vite.config.js'
];

requiredFiles.forEach(file => {
  const fullPath = path.join(ROOT_DIR, file);
  assert(fs.existsSync(fullPath), `File exists: ${file}`);
  if (fs.existsSync(fullPath)) {
    const stats = fs.statSync(fullPath);
    assert(stats.size > 0, `File is non-empty (${stats.size} bytes): ${file}`);
  }
});

// --- 2. Resume & PDF Configuration ---
console.log('\n📄 2. Resume & PDF Integrity Check:');
const resumePath = path.join(ROOT_DIR, 'assets', 'resume.pdf');
const resumeSize = fs.existsSync(resumePath) ? fs.statSync(resumePath).size : 0;
assert(resumeSize > 10000, `Actual resume PDF is valid and populated (${resumeSize} bytes)`);

// Check HTML files for Resume button configuration
const htmlFiles = [
  'index.html',
  'projects/smart-security-camera.html',
  'projects/weather-forecasting.html',
  'projects/ipl-analytics-dashboard.html',
  'projects/eye-disease-classification.html',
  'projects/toxic-comment-classifier.html',
  'projects/school-performance-analytics.html',
  'projects/detail.html'
];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
  assert(!content.includes('download='), `No 'download' attribute on Resume in ${file}`);
  assert(content.includes('target="_blank"'), `Resume has target="_blank" in ${file}`);
  assert(content.includes('rel="noopener noreferrer"'), `Resume has rel="noopener noreferrer" in ${file}`);
  assert(!content.includes('CASE STUDY SECTIONS'), `No 'CASE STUDY SECTIONS' sidebar text in ${file}`);
  assert(!content.includes('case-study-toc'), `No 'case-study-toc' classes in ${file}`);
  assert(!content.includes('case-study-layout-grid'), `No 'case-study-layout-grid' in ${file}`);
});

// --- 3. Security & Secret Exposure Audit ---
console.log('\n🔒 3. Security & Credential Audit:');
const sensitivePatterns = [
  /ghp_[a-zA-Z0-9]{36}/,
  /github_pat_[a-zA-Z0-9_]{82}/,
  /AKIA[0-9A-Z]{16}/,
  /bearer\s+['"][a-zA-Z0-9_\-\.]{20,}['"]/i
];

function scanDirForSecrets(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirForSecrets(fullPath);
    } else if (/\.(js|html|json|css|md)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      sensitivePatterns.forEach(pattern => {
        const hasSecret = pattern.test(content);
        assert(!hasSecret, `No exposed secrets in ${path.relative(ROOT_DIR, fullPath)}`);
      });
    }
  }
}
scanDirForSecrets(ROOT_DIR);

// --- 4. JSON Syntax & Data Integrity ---
console.log('\n📊 4. Data Configuration Integrity:');
const jsonFiles = [
  'data/projects-config.json',
  'data/projects-live.json',
  'package.json',
  'vercel.json'
];

jsonFiles.forEach(file => {
  try {
    const raw = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8');
    const parsed = JSON.parse(raw);
    assert(typeof parsed === 'object' && parsed !== null, `Valid JSON structure in ${file}`);
  } catch (err) {
    assert(false, `JSON parse error in ${file}: ${err.message}`);
  }
});

// --- 5. Verified Contact Panel & Direct Action Audit ---
console.log('\n📬 5. Verified Contact Panel & Direct Action Channels:');
const indexHtmlContent = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const contactJsContent = fs.readFileSync(path.join(ROOT_DIR, 'js', 'contact.js'), 'utf8');

// Ensure NO form elements exist in Contact section
assert(!indexHtmlContent.includes('id="contactForm"'), 'No contactForm exists in index.html');
assert(!indexHtmlContent.includes('name="access_key"'), 'No Web3Forms access_key input in index.html');
assert(!indexHtmlContent.includes('name="botcheck"'), 'No botcheck honeypot in index.html');
assert(!indexHtmlContent.includes('id="formStatusBox"'), 'No formStatusBox in index.html');
assert(!contactJsContent.includes('https://api.web3forms.com/submit'), 'No Web3Forms API endpoint in js/contact.js');

// Ensure Verified Contact Information & Direct Action Links exist
assert(indexHtmlContent.includes('href="mailto:smdirfan182@gmail.com"'), 'Direct mailto link exists in index.html');
assert(indexHtmlContent.includes('href="tel:+916303600159"'), 'Direct tel link exists in index.html');
assert(indexHtmlContent.includes('href="https://www.linkedin.com/in/mahammad-irfan-shaik-579828286/"'), 'Verified LinkedIn link exists in index.html');
assert(indexHtmlContent.includes('href="https://github.com/IRFAN18727"'), 'Verified GitHub link exists in index.html');
assert(indexHtmlContent.includes('Email Me'), 'Direct Email Me action button exists in index.html');

// --- 6. Summary & Exit Code ---
console.log('\n============================================================');
console.log(`AUDIT RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
console.log('============================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL PRODUCTION AUDIT CHECKS PASSED PERFECTLY!\n');
  process.exit(0);
}
