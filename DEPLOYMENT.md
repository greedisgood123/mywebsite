# Deployment Guide

## 🚀 Deployment Options

This guide covers multiple deployment strategies for your modern website, from simple hosting to advanced CI/CD pipelines.

## 🌐 GitHub Pages (Recommended for Beginners)

### Quick Setup
1. **Create GitHub Repository**
   ```bash
   # Go to GitHub.com and create a new repository
   # Don't initialize with README since we already have one
   ```

2. **Push to GitHub**
   ```bash
   # Add remote repository
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

   # Push your code
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access Your Site**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`
   - It may take a few minutes to deploy

### Custom Domain (Optional)
```bash
# Create CNAME file in repository root
echo "yourdomain.com" > CNAME

# Commit and push
git add CNAME
git commit -m "feat: add custom domain"
git push
```

### GitHub Pages Limitations
- Static files only (no server-side processing)
- 1GB storage limit
- 100GB bandwidth limit per month
- Custom domain SSL certificate provided

## 🏗️ Netlify (Easy Deployment)

### Setup
1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Sign up/login with GitHub
   - Click "New site from Git"
   - Select your repository

2. **Deploy Settings**
   - Build command: (leave empty for static site)
   - Publish directory: `/` (root directory)
   - Click "Deploy site"

3. **Features Included**
   - ✅ Custom domains with SSL
   - ✅ Form handling
   - ✅ Continuous deployment
   - ✅ CDN distribution
   - ✅ Analytics integration

### Netlify Configuration
Create `netlify.toml` in your repository:
```toml
[build]
  publish = "."
  command = "echo 'Static site - no build needed'"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## ☁️ Vercel (Modern Alternative)

### Setup
1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository

2. **Deploy Settings**
   - Framework Preset: "Other"
   - Root Directory: `./` (leave default)
   - Build Command: (leave empty)
   - Output Directory: `./` (leave default)

3. **Features Included**
   - ✅ Custom domains with SSL
   - ✅ Serverless functions
   - ✅ Edge network
   - ✅ Preview deployments
   - ✅ Analytics

## 🐙 Advanced CI/CD with GitHub Actions

### GitHub Actions Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'

    - name: Install dependencies
      run: |
        if [ -f package.json ]; then
          npm ci
        fi

    - name: Build site
      run: |
        if [ -f package.json ]; then
          npm run build
        else
          echo "Static site - no build needed"
        fi

    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

### Automated Testing
Add testing to your workflow:
```yaml
- name: Run tests
  run: |
    if [ -f package.json ]; then
      npm test
    fi

- name: Lighthouse audit
  run: |
    npm install -g lighthouse
    lighthouse https://your-site.com --output=json --output-path=./lighthouse-results.json

- name: Accessibility audit
  run: |
    npm install -g pa11y
    pa11y https://your-site.com
```

## 🔧 Build Tools and Optimization

### Package.json for Build Process
```json
{
  "name": "modern-website",
  "version": "1.0.0",
  "description": "Modern website with best practices",
  "scripts": {
    "dev": "serve .",
    "build": "html-minifier --input-dir . --output-dir dist --file-ext html",
    "optimize": "imagemin assets/images/* --out-dir assets/images/optimized",
    "test": "echo 'Running tests...'",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "serve": "^14.0.1",
    "html-minifier": "^4.0.0",
    "imagemin-cli": "^7.0.0",
    "gh-pages": "^4.0.0",
    "lighthouse": "^10.0.0",
    "pa11y": "^6.0.0"
  }
}
```

### HTML Minification
```bash
# Install html-minifier
npm install -g html-minifier

# Minify HTML files
html-minifier --input-dir . --output-dir dist --file-ext html --collapse-whitespace --remove-comments
```

### CSS and JS Minification
```bash
# Install minifiers
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss assets/css/styles.css -o assets/css/styles.min.css

# Minify JavaScript
uglifyjs assets/js/main.js -o assets/js/main.min.js
```

## 📊 Performance Monitoring

### Google Analytics Setup
```html
<!-- Add to <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Core Web Vitals Monitoring
```javascript
// Monitor Core Web Vitals
import {onCLS, onFID, onFCP, onLCP, onTTFB} from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onFCP(console.log);
onLCP(console.log);
onTTFB(console.log);
```

### Error Tracking
```javascript
// Basic error tracking
window.addEventListener('error', function(event) {
  // Send to error tracking service
  console.error('Error:', event.error);
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
  console.error('Unhandled rejection:', event.reason);
});
```

## 🔒 Security Best Practices

### HTTPS Everywhere
- Always use HTTPS in production
- Redirect HTTP to HTTPS
- Use security headers

### Content Security Policy
```html
<!-- Add security headers -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;">
```

### Secure Headers
```nginx
# Nginx configuration
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 🌍 Internationalization (i18n)

### Multi-language Setup
```bash
# Directory structure for multiple languages
/
├── index.html          # Default (English)
├── index.es.html       # Spanish
├── index.fr.html       # French
└── assets/
    ├── css/
    └── js/
```

### Language Detection
```javascript
// Basic language detection
const userLang = navigator.language || navigator.userLanguage;
const supportedLangs = ['en', 'es', 'fr'];

if (supportedLangs.includes(userLang.substring(0, 2))) {
  // Redirect to appropriate language version
  window.location.href = `index.${userLang.substring(0, 2)}.html`;
}
```

## 📈 Scaling and Maintenance

### CDN Integration
```html
<!-- Use CDN for assets -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
```

### Asset Optimization
```bash
# Compress images
npm install -g imagemin-cli
imagemin assets/images/* --out-dir=assets/images/optimized --plugin=mozjpeg --plugin=pngquant

# Convert to WebP
cwebp image.jpg -o image.webp -q 80
```

### Cache Busting
```html
<!-- Add version/hash to assets -->
<link rel="stylesheet" href="assets/css/styles.css?v=1.0.0">
<script src="assets/js/main.js?v=1.0.0"></script>
```

## 🚨 Troubleshooting Deployment

### Common Issues
1. **404 Errors**: Check file paths and case sensitivity
2. **Mixed Content**: Ensure all resources use HTTPS
3. **CORS Errors**: Configure proper CORS headers
4. **Build Failures**: Check build logs for errors

### Debugging Steps
```bash
# Test locally first
npm run dev

# Check for broken links
npm install -g broken-link-checker
blc https://your-site.com

# Validate HTML
npm install -g html-validator-cli
html-validator index.html
```

## 📚 Resources

### Hosting Platforms
- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://netlify.com/)
- [Vercel](https://vercel.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)

### Learning Resources
- [Web.dev Deployment](https://web.dev/deployment/)
- [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

### Tools
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)
- [Pingdom](https://tools.pingdom.com/)

---

## 🎯 Recommended Deployment Path

For beginners, I recommend this progression:

1. **Start**: GitHub Pages (free, easy, integrated with Git)
2. **Scale**: Netlify (better performance, forms, analytics)
3. **Advanced**: Vercel (edge network, serverless functions)
4. **Enterprise**: AWS S3 + CloudFront (full control, CDN)

Choose based on your needs, but always start with the simplest option that meets your requirements!
