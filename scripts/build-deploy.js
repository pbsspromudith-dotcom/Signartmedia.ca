import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'out');
const zipFile = path.join(rootDir, 'signartmedia-deploy.zip');

console.log('🚀 Step 1: Building Next.js static export for signartmedia.ca...');
process.env.NEXT_EXPORT = 'true';

execSync('npx next build', {
  cwd: rootDir,
  stdio: 'inherit',
  env: { ...process.env, NEXT_EXPORT: 'true' },
});

console.log('🔍 Step 2: Verifying build outputs...');
const indexHtml = path.join(outDir, 'index.html');
const htaccess = path.join(outDir, '.htaccess');
const healthPhp = path.join(outDir, 'health.php');
const nextDir = path.join(outDir, '_next');

if (!fs.existsSync(indexHtml)) {
  console.error('❌ Error: out/index.html not found!');
  process.exit(1);
}
if (!fs.existsSync(htaccess)) {
  console.log('⚠️ .htaccess missing in out, copying from public/.htaccess...');
  fs.copyFileSync(path.join(rootDir, 'public', '.htaccess'), htaccess);
}
if (!fs.existsSync(healthPhp)) {
  console.log('⚠️ health.php missing in out, copying from public/health.php...');
  fs.copyFileSync(path.join(rootDir, 'public', 'health.php'), healthPhp);
}

console.log('📦 Step 3: Generating clean production deployment zip (signartmedia-deploy.zip)...');
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

// Use powershell Compress-Archive on the contents of out directory
execSync(
  `powershell -Command "Compress-Archive -Path '${outDir}\\*' -DestinationPath '${zipFile}' -Force"`,
  { cwd: rootDir, stdio: 'inherit' }
);

const stats = fs.statSync(zipFile);
console.log(`✅ Deployment package created successfully: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
console.log(`📍 File location: ${zipFile}`);
console.log('👉 You can upload this zip file directly into your Hostinger or cPanel public_html directory!');

