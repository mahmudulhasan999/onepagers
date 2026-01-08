# Extending the App - Developer Guide

## 🛠️ How to Customize and Extend

This guide shows you how to add new features and customize the app.

---

## 📝 Adding New One-Pager Sections

### 1. Update the Data Model

**File: `src/utils/openai.js`**

Update the system prompt to include new sections:

```javascript
const SYSTEM_PROMPT = `...
{
  "headline": "...",
  "subheadline": "...",
  // Add new sections here
  "testimonials": [
    {"name": "John Doe", "quote": "Amazing product!", "role": "CEO"}
  ],
  "pricing": {
    "plans": [
      {"name": "Starter", "price": "$29/mo", "features": [...]}
    ]
  }
}
...`
```

### 2. Update the Preview Component

**File: `src/components/OnePagerPreview.jsx`**

Add new section rendering:

```javascript
{/* Testimonials Section */}
<div className="mb-8">
  <h4 className="font-semibold text-gray-900 mb-4">What Customers Say</h4>
  <div className="grid grid-cols-2 gap-4">
    {editedData.testimonials?.map((testimonial, idx) => (
      <div key={idx} className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm italic text-gray-700 mb-2">"{testimonial.quote}"</p>
        <div className="text-xs text-gray-600">
          <strong>{testimonial.name}</strong> - {testimonial.role}
        </div>
      </div>
    ))}
  </div>
</div>
```

### 3. Update Mock Data

**File: `src/App.jsx`**

Add generator function:

```javascript
function generateTestimonials(input) {
  return [
    { name: 'Sarah Johnson', quote: 'This changed our business!', role: 'CEO, TechCorp' },
    { name: 'Mike Chen', quote: 'Best investment we made', role: 'CTO, StartupXYZ' },
  ]
}
```

---

## 🎨 Adding New Customization Options

### 1. Add to State

**File: `src/App.jsx`**

```javascript
const [customization, setCustomization] = useState({
  tone: 'marketing',
  primaryColor: '#0ea5e9',
  fontStyle: 'Inter',
  logo: null,
  // New options
  layout: 'modern', // modern, classic, minimal
  accentColor: '#10b981',
  showIcons: true,
})
```

### 2. Add UI Controls

**File: `src/components/InputForm.jsx`**

```javascript
{/* Layout Selection */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-3">
    Layout Style
  </label>
  <div className="grid grid-cols-3 gap-3">
    {LAYOUTS.map((layout) => (
      <button
        key={layout.value}
        type="button"
        onClick={() => onCustomizationChange({ layout: layout.value })}
        className={`p-3 rounded-lg border-2 ${
          customization.layout === layout.value
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-200'
        }`}
      >
        {layout.label}
      </button>
    ))}
  </div>
</div>
```

### 3. Apply in Preview

**File: `src/components/OnePagerPreview.jsx`**

```javascript
<div 
  className={`bg-white shadow-xl rounded-lg overflow-hidden ${
    customization.layout === 'minimal' ? 'p-8' : 'p-12'
  }`}
>
  {/* Content */}
</div>
```

---

## 🌍 Adding Multi-Language Support

### 1. Install i18n

```bash
npm install react-i18next i18next
```

### 2. Create Translation Files

**File: `src/locales/en.json`**
```json
{
  "header": {
    "title": "AI One-Pager",
    "subtitle": "Generate professional one-pagers in seconds"
  },
  "input": {
    "placeholder": "Describe your product...",
    "generate": "Generate One-Pager"
  }
}
```

**File: `src/locales/es.json`**
```json
{
  "header": {
    "title": "Generador de One-Pager IA",
    "subtitle": "Genera one-pagers profesionales en segundos"
  }
}
```

### 3. Configure i18n

**File: `src/i18n.js`**
```javascript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: 'en',
  fallbackLng: 'en',
})

export default i18n
```

### 4. Use in Components

```javascript
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()
  
  return <h1>{t('header.title')}</h1>
}
```

---

## 💾 Adding Database Integration

### Using Supabase

1. **Install Supabase**
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Create Client**
   ```javascript
   // src/lib/supabase.js
   import { createClient } from '@supabase/supabase-js'
   
   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   )
   ```

3. **Save One-Pagers**
   ```javascript
   async function saveOnePager(data) {
     const { data: saved, error } = await supabase
       .from('onepagers')
       .insert([
         {
           user_id: user.id,
           content: data,
           customization: customization,
           created_at: new Date(),
         }
       ])
     
     return saved
   }
   ```

4. **Load One-Pagers**
   ```javascript
   async function loadOnePagers() {
     const { data, error } = await supabase
       .from('onepagers')
       .select('*')
       .eq('user_id', user.id)
       .order('created_at', { ascending: false })
     
     return data
   }
   ```

---

## 🔐 Adding Authentication

### Using Supabase Auth

1. **Setup Auth UI**
   ```javascript
   import { Auth } from '@supabase/auth-ui-react'
   import { ThemeSupa } from '@supabase/auth-ui-shared'
   
   function LoginPage() {
     return (
       <Auth
         supabaseClient={supabase}
         appearance={{ theme: ThemeSupa }}
         providers={['google', 'github']}
       />
     )
   }
   ```

2. **Protect Routes**
   ```javascript
   function App() {
     const [session, setSession] = useState(null)
     
     useEffect(() => {
       supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session)
       })
       
       supabase.auth.onAuthStateChange((_event, session) => {
         setSession(session)
       })
     }, [])
     
     if (!session) return <LoginPage />
     
     return <MainApp />
   }
   ```

---

## 📊 Adding Analytics Tracking

### Track User Actions

```javascript
// src/utils/analytics.js
export function trackEvent(eventName, properties = {}) {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, properties)
  }
  
  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: properties })
  }
  
  // Custom backend
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({ event: eventName, ...properties })
  })
}
```

### Use in Components

```javascript
import { trackEvent } from '../utils/analytics'

function InputForm() {
  const handleGenerate = () => {
    trackEvent('generate_clicked', {
      tone: customization.tone,
      inputType: inputType,
    })
    
    onGenerate(inputData)
  }
}
```

---

## 🎯 Adding Templates

### 1. Create Template System

**File: `src/data/templates.js`**
```javascript
export const TEMPLATES = [
  {
    id: 'saas-startup',
    name: 'SaaS Startup',
    category: 'Marketing',
    thumbnail: '/templates/saas.png',
    data: {
      headline: 'Transform Your Business with AI',
      // ... pre-filled content
    },
    customization: {
      tone: 'marketing',
      primaryColor: '#0ea5e9',
    }
  },
  {
    id: 'investor-pitch',
    name: 'Investor Pitch',
    category: 'Investor',
    // ...
  }
]
```

### 2. Add Template Selector

```javascript
function TemplateGallery({ onSelectTemplate }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {TEMPLATES.map(template => (
        <div 
          key={template.id}
          onClick={() => onSelectTemplate(template)}
          className="card cursor-pointer hover:shadow-lg transition-shadow"
        >
          <img src={template.thumbnail} alt={template.name} />
          <h4 className="font-semibold mt-2">{template.name}</h4>
          <p className="text-sm text-gray-600">{template.category}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## 🔄 Adding Version History

### 1. Track Changes

```javascript
const [history, setHistory] = useState([])

const saveVersion = (data) => {
  setHistory(prev => [...prev, {
    id: Date.now(),
    data: data,
    timestamp: new Date(),
  }])
}
```

### 2. Undo/Redo

```javascript
const [historyIndex, setHistoryIndex] = useState(-1)

const undo = () => {
  if (historyIndex > 0) {
    setHistoryIndex(historyIndex - 1)
    setOnePagerData(history[historyIndex - 1].data)
  }
}

const redo = () => {
  if (historyIndex < history.length - 1) {
    setHistoryIndex(historyIndex + 1)
    setOnePagerData(history[historyIndex + 1].data)
  }
}
```

---

## 🎨 Adding More Export Formats

### Export as HTML

```javascript
function exportAsHTML() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${onePagerData.headline}</title>
        <style>${getStyles()}</style>
      </head>
      <body>
        ${document.getElementById('onepager-canvas').innerHTML}
      </body>
    </html>
  `
  
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'onepager.html'
  link.click()
}
```

### Export as PowerPoint

```bash
npm install pptxgenjs
```

```javascript
import pptxgen from 'pptxgenjs'

function exportAsPPTX() {
  const pptx = new pptxgen()
  const slide = pptx.addSlide()
  
  slide.addText(onePagerData.headline, {
    x: 1, y: 1, fontSize: 32, bold: true
  })
  
  // Add more content...
  
  pptx.writeFile({ fileName: 'onepager.pptx' })
}
```

---

## 🧪 Adding A/B Testing

```javascript
const [variant, setVariant] = useState('A')

useEffect(() => {
  // Randomly assign variant
  setVariant(Math.random() > 0.5 ? 'A' : 'B')
}, [])

return (
  <div>
    {variant === 'A' ? (
      <button className="btn-primary">Generate Now</button>
    ) : (
      <button className="btn-primary">Create One-Pager</button>
    )}
  </div>
)
```

---

## 📱 Making it a PWA

### 1. Add Manifest

**File: `public/manifest.json`**
```json
{
  "name": "AI One-Pager Generator",
  "short_name": "OnePager",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0ea5e9",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

### 2. Add Service Worker

```bash
npm install vite-plugin-pwa -D
```

**File: `vite.config.js`**
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AI One-Pager Generator',
        short_name: 'OnePager',
        theme_color: '#0ea5e9',
      }
    })
  ]
}
```

---

## 🎓 Best Practices

1. **Keep Components Small**: Max 200 lines
2. **Use TypeScript**: Add type safety
3. **Write Tests**: Use Vitest + Testing Library
4. **Document Changes**: Update README
5. **Version Control**: Commit often
6. **Performance**: Monitor bundle size
7. **Accessibility**: Use semantic HTML, ARIA labels

---

## 📚 Useful Libraries

- **Form Handling**: React Hook Form
- **State Management**: Zustand, Jotai
- **Animations**: Framer Motion
- **Charts**: Recharts, Chart.js
- **Date Handling**: date-fns
- **Validation**: Zod
- **Testing**: Vitest, Playwright

---

**Happy coding! 🚀**
