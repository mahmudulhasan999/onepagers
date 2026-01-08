# Deployment Guide

## 🚀 Deploying Your AI One-Pager Generator

This guide covers deploying to popular hosting platforms.

---

## Option 1: Vercel (Recommended)

**Best for:** Fast deployment, automatic CI/CD, serverless functions

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/onepager.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variables:
     - `VITE_OPENAI_API_KEY` = your key

3. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your app is live! 🎉

### Automatic Deployments
Every push to `main` branch auto-deploys!

---

## Option 2: Netlify

**Best for:** Simple static hosting, form handling, edge functions

### Steps:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Or deploy via UI**
   - Go to https://netlify.com
   - Drag & drop the `dist` folder
   - Configure environment variables in Settings

### Configuration File

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Option 3: GitHub Pages

**Best for:** Free hosting, simple static sites

### Steps:

1. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/onepager",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default {
     base: '/onepager/'
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

## Option 4: AWS S3 + CloudFront

**Best for:** Enterprise, custom domains, CDN

### Steps:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create S3 bucket**
   - Go to AWS S3 Console
   - Create bucket (e.g., `onepager-app`)
   - Enable static website hosting

3. **Upload files**
   ```bash
   aws s3 sync dist/ s3://onepager-app
   ```

4. **Configure CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure SSL certificate

---

## Option 5: Docker + Any Cloud

**Best for:** Full control, microservices, Kubernetes

### Dockerfile

Create `Dockerfile`:
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Deploy

```bash
docker build -t onepager .
docker run -p 80:80 onepager
```

---

## 🔒 Environment Variables

### Production Setup

**DO NOT expose API keys in browser!**

Create a backend API:

```javascript
// backend/server.js
import express from 'express'
import OpenAI from 'openai'

const app = express()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, tone } = req.body
    
    // Add authentication here
    // Add rate limiting here
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Generate a ${tone} one-pager for: ${prompt}` }
      ],
      response_format: { type: "json_object" }
    })
    
    res.json(JSON.parse(completion.choices[0].message.content))
  } catch (error) {
    res.status(500).json({ error: 'Generation failed' })
  }
})

app.listen(3000)
```

Update frontend to call your API:
```javascript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, tone })
})
```

---

## 🌐 Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

### Cloudflare (Recommended for CDN)
1. Add site to Cloudflare
2. Update nameservers
3. Enable CDN + SSL

---

## 📊 Analytics

### Google Analytics

Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible (Privacy-friendly)

```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🔐 Security Checklist

- [ ] API keys in environment variables (not in code)
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting on API endpoints
- [ ] User authentication (if needed)
- [ ] Input validation
- [ ] XSS protection
- [ ] CSP headers configured

---

## ⚡ Performance Optimization

### 1. Code Splitting

Vite does this automatically!

### 2. Image Optimization

Use WebP format:
```bash
npm install -D vite-plugin-imagemin
```

### 3. Lazy Loading

```javascript
const OnePagerPreview = lazy(() => import('./components/OnePagerPreview'))
```

### 4. CDN for Assets

Use Cloudflare or AWS CloudFront

### 5. Compression

Enable gzip/brotli on server

---

## 📈 Monitoring

### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-dsn",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
})
```

### Uptime Monitoring

- UptimeRobot (free)
- Pingdom
- StatusCake

---

## 🧪 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test in production mode locally
- [ ] Check all environment variables
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Verify all exports work (PDF/PNG)
- [ ] Check loading states
- [ ] Test error handling
- [ ] Review console for errors
- [ ] Run Lighthouse audit (90+ score)

---

## 🚨 Troubleshooting

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment variables not working
- Restart dev server after adding `.env`
- Check variable names start with `VITE_`
- Verify `.env` is in project root

### 404 on refresh
Add redirect rules (see Netlify config above)

### Slow loading
- Enable CDN
- Optimize images
- Check bundle size: `npm run build -- --analyze`

---

## 📚 Resources

- [Vite Deployment Docs](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

---

**Ready to deploy? Choose your platform and follow the steps above!** 🚀
