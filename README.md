# AI One-Pager Generator

A modern SaaS web application that generates professional one-pagers in seconds using AI.

## Features

✨ **Smart Generation**
- Describe your product or paste existing content
- AI structures content into professional layout
- Multiple tone options (Marketing, Sales, Investor, Internal)

🎨 **Customization**
- Custom brand colors
- Font selection
- Logo upload
- Inline text editing

📤 **Export & Share**
- Export as PDF (print-ready)
- Export as PNG (high-res)
- Generate shareable links

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-4)
- **Export**: html2canvas + jsPDF
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key (optional for development)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables** (optional)
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx              # App header with navigation
│   ├── InputForm.jsx            # Input form with customization
│   ├── LoadingState.jsx         # Loading animation
│   ├── OnePagerPreview.jsx      # Preview with inline editing
│   └── ExportPanel.jsx          # Export and share options
├── utils/
│   └── openai.js                # OpenAI integration
├── App.jsx                      # Main app component
├── main.jsx                     # Entry point
└── index.css                    # Global styles
```

## Integrating OpenAI

The app currently uses mock data for development. To enable real AI generation:

1. **Install OpenAI SDK**
   ```bash
   npm install openai
   ```

2. **Add API key to `.env`**
   ```env
   VITE_OPENAI_API_KEY=sk-...
   ```

3. **Update `src/utils/openai.js`**
   
   Uncomment the OpenAI implementation and remove the mock code.

4. **Update `src/App.jsx`**
   
   Replace the mock generation with:
   ```javascript
   import { generateOnePager } from './utils/openai'
   
   const handleGenerate = async (inputData) => {
     setCurrentStep('generating')
     try {
       const generatedData = await generateOnePager(inputData)
       setOnePagerData(generatedData)
       setCurrentStep('preview')
     } catch (error) {
       console.error('Generation failed:', error)
       setCurrentStep('input')
     }
   }
   ```

## Customization

### Adding New Tones

Edit `src/components/InputForm.jsx`:

```javascript
const TONES = [
  { value: 'marketing', label: 'Marketing', description: 'Persuasive and engaging' },
  { value: 'technical', label: 'Technical', description: 'Detailed and precise' },
  // Add more...
]
```

### Changing Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      }
    }
  }
}
```

## Use Cases

- 📊 Marketing one-pagers
- 💼 Sales pitch sheets
- 💰 Investor decks
- 🚀 Product summaries
- 📝 Internal project briefs

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

## Roadmap

- [ ] User authentication
- [ ] Save/load templates
- [ ] Team collaboration
- [ ] Version history
- [ ] More export formats (PPTX, HTML)
- [ ] Template marketplace
- [ ] A/B testing variants

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using React, Tailwind CSS, and OpenAI
