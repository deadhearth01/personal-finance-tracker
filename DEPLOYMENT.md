# Deployment Guide 🚀

This guide covers various deployment options for Personal Finance Tracker, a React-based web application optimized for static hosting.

## 🌟 Quick Deploy Options

### 🎯 Vercel (Recommended)

Personal Finance Tracker is optimized for Vercel deployment with zero configuration required.

#### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy" - No configuration needed!

3. **Automatic Deployments**:
   - Every push to `main` triggers automatic deployment
   - Pull request previews available
   - Production URL provided instantly

#### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   npm run build
   vercel --prod
   ```

3. **Follow prompts** and get instant deployment URL

#### Vercel Configuration

The included `vercel.json` handles all routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 🌐 Netlify

#### Method 1: Drag & Drop

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - Visit [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deploy area
   - Get instant deployment URL

#### Method 2: GitHub Integration

1. **Connect Repository**:
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Deploy**: Automatic deployment on every push

#### Method 3: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### 📄 GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add deploy script to package.json**:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/', // Add this line
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings
   - Enable GitHub Pages from `gh-pages` branch

## 🐳 Docker Deployment

### Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Handle client-side routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types
        text/plain
        text/css
        text/js
        text/xml
        text/javascript
        application/javascript
        application/json
        application/xml+rss;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run

```bash
# Build image
docker build -t personal-finance-tracker .

# Run container
docker run -p 8080:80 personal-finance-tracker
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## ☁️ Cloud Platform Deployments

### AWS S3 + CloudFront

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Create S3 bucket**:
   - Enable static website hosting
   - Set index document to `index.html`
   - Set error document to `index.html`

3. **Upload files**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name
   ```

4. **Setup CloudFront**:
   - Create CloudFront distribution
   - Point to S3 bucket
   - Set default root object to `index.html`
   - Configure custom error pages for SPA routing

### Google Cloud Platform

1. **Enable Cloud Storage and Cloud CDN**

2. **Create storage bucket**:
   ```bash
   gsutil mb gs://your-bucket-name
   ```

3. **Build and upload**:
   ```bash
   npm run build
   gsutil -m cp -r dist/* gs://your-bucket-name
   ```

4. **Configure bucket for web hosting**:
   ```bash
   gsutil web set -m index.html -e index.html gs://your-bucket-name
   ```

### Azure Static Web Apps

1. **Create Azure Static Web App** in Azure Portal

2. **Connect GitHub repository**

3. **Configure build**:
   ```yaml
   # .github/workflows/azure-static-web-apps.yml
   app_location: "/"
   api_location: ""
   output_location: "dist"
   ```

## 🔧 Build Optimization

### Production Build

```bash
npm run build
```

This creates an optimized build with:
- Minified CSS (~21KB → 4KB gzipped)
- Minified JavaScript (~1.4MB → 337KB gzipped)
- Optimized assets and images
- Source maps for debugging

### Build Analysis

Analyze bundle size:
```bash
npm install --save-dev vite-bundle-analyzer
```

Add to `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [
    react(),
    analyzer() // Add this for bundle analysis
  ],
})
```

### Performance Optimization

1. **Code Splitting**: Already implemented with dynamic imports
2. **Tree Shaking**: Automatic with Vite
3. **Asset Optimization**: Images and fonts optimized
4. **Caching**: Proper cache headers for static assets

## 🌍 Environment Configuration

### Environment Variables

Create `.env.production`:
```bash
# Optional environment variables
VITE_APP_NAME=Personal Finance Tracker
VITE_APP_VERSION=1.0.0
```

Access in code:
```typescript
const appName = import.meta.env.VITE_APP_NAME
```

### Different Environments

1. **Development**: `npm run dev` → `http://localhost:5174`
2. **Preview**: `npm run preview` → `http://localhost:4173`
3. **Production**: Build → Deploy to hosting platform

## 📊 Monitoring & Analytics

### Adding Google Analytics

1. **Install gtag**:
   ```bash
   npm install gtag
   ```

2. **Add to main.tsx**:
   ```typescript
   import { gtag } from 'gtag'

   if (import.meta.env.PROD) {
     gtag('config', 'GA_MEASUREMENT_ID')
   }
   ```

### Performance Monitoring

Monitor with:
- **Lighthouse CI**: Automated performance testing
- **Web Vitals**: Core performance metrics
- **Vercel Analytics**: Built-in analytics for Vercel deployments

## 🔒 Security Headers

For enhanced security, add headers in your hosting platform:

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
```

## 🚨 Troubleshooting

### Common Issues

1. **404 on Refresh**: Configure server to serve `index.html` for all routes
2. **Asset Loading Issues**: Check base URL configuration in `vite.config.ts`
3. **Build Failures**: Ensure Node.js 18+ and sufficient memory
4. **Large Bundle Size**: Review imports and enable tree shaking

### Debug Commands

```bash
# Check build output
npm run build && du -sh dist/*

# Preview production build locally
npm run preview

# Check for TypeScript errors
npm run type-check

# Lint code
npm run lint
```

## 📈 Scaling Considerations

### CDN Configuration

- Enable gzip compression
- Set appropriate cache headers
- Use HTTP/2 for better performance
- Configure edge locations globally

### Performance Best Practices

1. **Lazy Loading**: Components load on demand
2. **Image Optimization**: Use WebP format when possible
3. **Code Splitting**: Separate vendor and app bundles
4. **Caching Strategy**: Implement proper browser caching

## 🎯 Deployment Checklist

Before deploying to production:

- [ ] Run `npm run build` successfully
- [ ] Test production build with `npm run preview`
- [ ] Check all features work correctly
- [ ] Verify mobile responsiveness
- [ ] Test in different browsers
- [ ] Configure proper redirects for SPA
- [ ] Set up analytics (optional)
- [ ] Configure error monitoring (optional)
- [ ] Set up automated deployments
- [ ] Test the live deployment URL

## 📞 Support

For deployment issues:
- Check the [Issues](https://github.com/yourusername/personal-finance-tracker/issues) page
- Review platform-specific documentation
- Contact platform support for hosting-related problems

---

**Happy Deploying! 🚀**
