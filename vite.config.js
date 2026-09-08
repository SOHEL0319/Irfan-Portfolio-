import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

function copyStaticDirs() {
  return {
    name: 'copy-static-dirs',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist');
      
      const copyRecursive = (src, dest) => {
        if (!fs.existsSync(src)) return;
        const stats = fs.statSync(src);
        if (stats.isDirectory()) {
          if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
          fs.readdirSync(src).forEach(file => {
            copyRecursive(resolve(src, file), resolve(dest, file));
          });
        } else {
          const destDir = resolve(dest, '..');
          if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
          fs.copyFileSync(src, dest);
        }
      };

      const toCopy = ['assets', 'data', 'js', 'css', 'robots.txt', 'sitemap.xml', 'resume.pdf'];
      toCopy.forEach(item => {
        copyRecursive(resolve(__dirname, item), resolve(distDir, item));
      });
    }
  };
}

export default defineConfig({
  plugins: [copyStaticDirs()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'smart-security-camera': resolve(__dirname, 'projects/smart-security-camera.html'),
        'weather-forecasting': resolve(__dirname, 'projects/weather-forecasting.html'),
        'ipl-analytics-dashboard': resolve(__dirname, 'projects/ipl-analytics-dashboard.html'),
        'eye-disease-classification': resolve(__dirname, 'projects/eye-disease-classification.html'),
        'toxic-comment-classifier': resolve(__dirname, 'projects/toxic-comment-classifier.html'),
        'school-performance-analytics': resolve(__dirname, 'projects/school-performance-analytics.html'),
        'detail': resolve(__dirname, 'projects/detail.html')
      }
    }
  }
});
