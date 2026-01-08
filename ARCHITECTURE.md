# Application Architecture

## 🏗️ System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│                     (React + Tailwind CSS)                       │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                         APP.JSX (Main)                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Input Step  │→ │ Generate Step│→ │ Preview Step │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                  │
│  State Management:                                               │
│  • currentStep (input/generating/preview)                        │
│  • onePagerData (generated content)                              │
│  • customization (tone, colors, fonts)                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   InputForm      │  │  LoadingState    │  │ OnePagerPreview  │
│                  │  │                  │  │                  │
│ • Prompt input   │  │ • Spinner        │  │ • Layout render  │
│ • Paste mode     │  │ • Skeleton UI    │  │ • Inline edit    │
│ • Customization  │  │ • Progress       │  │ • Dynamic style  │
│ • Tone selector  │  │                  │  │                  │
│ • Color picker   │  │                  │  │                  │
│ • Font selector  │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
                                                      │
                                                      ▼
                                            ┌──────────────────┐
                                            │  ExportPanel     │
                                            │                  │
                                            │ • PDF export     │
                                            │ • PNG export     │
                                            │ • Share link     │
                                            │ • Customization  │
                                            │   summary        │
                                            └──────────────────┘
```

## 📊 Data Flow

```
User Input
    │
    ▼
┌─────────────────┐
│  InputForm      │
│  (User types)   │
└─────────────────┘
    │
    │ onGenerate({ prompt, tone })
    ▼
┌─────────────────┐
│  App.jsx        │
│  handleGenerate │
└─────────────────┘
    │
    │ setCurrentStep('generating')
    ▼
┌─────────────────┐
│  LoadingState   │
│  (Shows loader) │
└─────────────────┘
    │
    │ await generateOnePager()
    ▼
┌─────────────────┐
│  OpenAI API     │  ← Future: Real AI
│  (Mock for now) │
└─────────────────┘
    │
    │ Returns structured JSON
    ▼
┌─────────────────┐
│  App.jsx        │
│  setOnePagerData│
└─────────────────┘
    │
    │ setCurrentStep('preview')
    ▼
┌─────────────────┐
│ OnePagerPreview │
│ (Renders result)│
└─────────────────┘
    │
    │ User clicks export
    ▼
┌─────────────────┐
│  ExportPanel    │
│  html2canvas +  │
│  jsPDF          │
└─────────────────┘
    │
    ▼
Downloaded File
```

## 🎨 Component Hierarchy

```
App
├── Header
│   ├── Logo
│   └── Navigation
│
└── Main
    ├── InputForm (Step 1)
    │   ├── Input Type Toggle
    │   ├── Textarea
    │   ├── Example Prompts
    │   └── Customization Panel
    │       ├── Tone Selector
    │       ├── Color Picker
    │       ├── Font Selector
    │       └── Logo Upload
    │
    ├── LoadingState (Step 2)
    │   ├── Spinner
    │   └── Skeleton Preview
    │
    └── Preview Layout (Step 3)
        ├── OnePagerPreview (2/3 width)
        │   ├── Header Section
        │   │   ├── Logo
        │   │   ├── Headline (editable)
        │   │   └── Subheadline (editable)
        │   ├── Stats Bar
        │   │   └── 3x Stat Cards
        │   ├── Problem/Solution Grid
        │   │   ├── Problem Card (editable)
        │   │   └── Solution Card (editable)
        │   ├── Benefits Grid
        │   │   └── 4x Benefit Cards
        │   ├── Features List
        │   │   └── 6x Feature Items
        │   └── CTA Section
        │       ├── CTA Text
        │       ├── Primary Button
        │       └── Secondary Button
        │
        └── ExportPanel (1/3 width)
            ├── Export as PDF
            ├── Export as PNG
            ├── Share Link
            ├── Customization Summary
            └── Back Button
```

## 🔄 State Management

```javascript
// App.jsx State
{
  // Navigation
  currentStep: 'input' | 'generating' | 'preview',
  
  // Generated Content
  onePagerData: {
    headline: string,
    subheadline: string,
    problem: string,
    solution: string,
    benefits: Array<{title, description}>,
    features: Array<string>,
    cta: {primary, secondary, text},
    stats: Array<{value, label}>
  },
  
  // Customization
  customization: {
    tone: 'marketing' | 'sales' | 'investor' | 'internal',
    primaryColor: string (hex),
    fontStyle: 'Inter' | 'Georgia' | 'Monospace',
    logo: File | null
  }
}
```

## 🎯 User Journey

```
1. Landing
   ↓
2. Choose Input Type
   ├─→ Describe Product (Prompt)
   └─→ Paste Content
   ↓
3. Enter Content
   ↓
4. (Optional) Customize
   ├─→ Select Tone
   ├─→ Pick Color
   ├─→ Choose Font
   └─→ Upload Logo
   ↓
5. Click "Generate"
   ↓
6. Loading (2-5 seconds)
   ↓
7. Preview Generated One-Pager
   ↓
8. (Optional) Edit Text Inline
   ↓
9. Export
   ├─→ Download PDF
   ├─→ Download PNG
   └─→ Copy Share Link
   ↓
10. Start Over or Done
```

## 🔌 Integration Points

```
┌─────────────────────────────────────────┐
│         Frontend (React)                 │
│                                          │
│  ┌────────────────────────────────┐     │
│  │  OpenAI Integration            │     │
│  │  (src/utils/openai.js)         │     │
│  └────────────────────────────────┘     │
│                 │                        │
└─────────────────┼────────────────────────┘
                  │
                  ▼
        ┌─────────────────┐
        │   OpenAI API    │  ← Future
        │   GPT-4 Turbo   │
        └─────────────────┘

┌─────────────────────────────────────────┐
│         Export Layer                     │
│                                          │
│  ┌────────────────┐  ┌────────────────┐ │
│  │  html2canvas   │  │     jsPDF      │ │
│  │  (Screenshot)  │  │  (PDF Gen)     │ │
│  └────────────────┘  └────────────────┘ │
└─────────────────────────────────────────┘
```

## 📦 File Structure

```
src/
├── components/           # UI Components
│   ├── Header.jsx       # Top navigation
│   ├── InputForm.jsx    # Input & customization
│   ├── LoadingState.jsx # Loading animation
│   ├── OnePagerPreview.jsx  # Preview & editing
│   └── ExportPanel.jsx  # Export options
│
├── utils/               # Utilities
│   └── openai.js       # AI integration
│
├── App.jsx             # Main app logic
├── main.jsx            # Entry point
└── index.css           # Global styles

public/                 # Static assets
├── vite.svg           # Default icon

Config Files:
├── tailwind.config.js  # Tailwind setup
├── postcss.config.js   # PostCSS setup
├── vite.config.js      # Vite config
└── package.json        # Dependencies
```

## 🚀 Build & Deploy Flow

```
Development:
npm run dev → Vite Dev Server → http://localhost:5174

Production:
npm run build
    ↓
Vite builds to /dist
    ↓
    ├─→ Vercel (Auto-deploy from Git)
    ├─→ Netlify (Drag & drop dist/)
    ├─→ GitHub Pages (gh-pages)
    └─→ Custom Server (nginx)
```

## 🔐 Security Architecture

```
Current (Development):
Browser → OpenAI API
         (API key exposed - NOT for production!)

Production (Recommended):
Browser → Your Backend API → OpenAI API
          (API key safe)    (Server-side)
          
          Backend handles:
          • Authentication
          • Rate limiting
          • Usage tracking
          • Error handling
```

## 📊 Performance Considerations

```
Bundle Size:
├── React + ReactDOM: ~140 KB
├── Tailwind CSS: ~10 KB (purged)
├── Lucide Icons: ~5 KB (tree-shaken)
├── html2canvas: ~50 KB
├── jsPDF: ~150 KB
└── App Code: ~30 KB
    ────────────────
    Total: ~385 KB (gzipped: ~120 KB)

Load Time:
├── First Paint: <1s
├── Interactive: <2s
└── Full Load: <3s

Generation Time:
├── Mock: 2s
└── OpenAI: 3-10s (depends on API)
```

## 🎨 Styling Architecture

```
Tailwind CSS
    ↓
Custom Theme (tailwind.config.js)
    ├── Colors (primary palette)
    ├── Fonts (Inter, Georgia, Mono)
    └── Animations (fade-in, slide-up)
    ↓
Component Classes (index.css)
    ├── .btn-primary
    ├── .btn-secondary
    ├── .input-field
    └── .card
    ↓
Inline Styles (for dynamic customization)
    └── style={{ color: customization.primaryColor }}
```

## 🧪 Testing Strategy (Future)

```
Unit Tests (Vitest)
├── Component rendering
├── State management
└── Utility functions

Integration Tests
├── User flow (input → generate → export)
└── API integration

E2E Tests (Playwright)
├── Full user journey
└── Export functionality
```

---

This architecture is designed to be:
- ✅ **Simple**: Easy to understand
- ✅ **Scalable**: Easy to extend
- ✅ **Maintainable**: Clean separation of concerns
- ✅ **Performant**: Optimized bundle size
- ✅ **Flexible**: Customizable and adaptable
