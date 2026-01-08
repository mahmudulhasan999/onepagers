# OpenAI Integration Guide

## Quick Setup (5 minutes)

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Step 2: Install OpenAI SDK

```bash
npm install openai
```

### Step 3: Configure Environment

Create a `.env` file in the project root:

```env
VITE_OPENAI_API_KEY=sk-your-actual-key-here
```

### Step 4: Enable OpenAI in Code

**File: `src/utils/openai.js`**

Uncomment lines 8-12:
```javascript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})
```

Uncomment lines 53-73 (the real implementation) and delete the mock implementation (lines 76-110).

### Step 5: Update App.jsx

**File: `src/App.jsx`**

Replace the `handleGenerate` function (lines 18-48) with:

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
    alert('Failed to generate one-pager. Please try again.')
    setCurrentStep('input')
  }
}
```

Also remove the helper functions at the bottom of App.jsx (lines 50-100) as they're no longer needed.

### Step 6: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## ✅ Testing

1. Open http://localhost:5174
2. Enter a product description
3. Click "Generate One-Pager"
4. Wait 3-5 seconds for AI generation
5. See your professional one-pager!

## 🔧 Customizing the AI Prompt

Edit `SYSTEM_PROMPT` in `src/utils/openai.js` to:
- Change output structure
- Adjust tone/style
- Add more sections
- Modify guidelines

## 💰 Cost Estimation

Using GPT-4 Turbo:
- ~$0.01-0.03 per generation
- 1000 generations = ~$10-30

Using GPT-3.5 Turbo (cheaper):
- ~$0.001-0.003 per generation
- 1000 generations = ~$1-3

To use GPT-3.5, change model in `src/utils/openai.js`:
```javascript
model: "gpt-3.5-turbo"
```

## 🚨 Security Notes

**Current Setup (Development Only)**
```javascript
dangerouslyAllowBrowser: true
```

This exposes your API key in the browser. **DO NOT use in production!**

### Production Setup (Recommended)

1. **Create a backend API**
   ```
   Frontend → Your Backend → OpenAI
   ```

2. **Backend handles API key**
   - Keep key secret on server
   - Add rate limiting
   - Add user authentication
   - Track usage

3. **Example backend endpoint**
   ```javascript
   // backend/api/generate.js
   app.post('/api/generate', async (req, res) => {
     const { prompt, tone } = req.body
     
     // Verify user authentication
     // Check rate limits
     // Call OpenAI
     // Return result
   })
   ```

## 🔄 Alternative AI Providers

### Anthropic Claude

```bash
npm install @anthropic-ai/sdk
```

```javascript
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY
})

const message = await anthropic.messages.create({
  model: 'claude-3-opus-20240229',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: SYSTEM_PROMPT + '\n\n' + prompt }
  ]
})
```

### Google Gemini

```bash
npm install @google/generative-ai
```

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

const result = await model.generateContent(prompt)
```

### Local LLM (Ollama)

```bash
npm install ollama
```

```javascript
import ollama from 'ollama'

const response = await ollama.chat({
  model: 'llama2',
  messages: [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: prompt }
  ]
})
```

## 📊 Monitoring Usage

Track OpenAI usage at:
https://platform.openai.com/usage

Set up billing alerts to avoid surprises!

## 🐛 Troubleshooting

### Error: "Invalid API key"
- Check `.env` file exists
- Verify key starts with `sk-`
- Restart dev server after adding `.env`

### Error: "Rate limit exceeded"
- You've hit OpenAI's rate limit
- Wait a few seconds and try again
- Upgrade your OpenAI plan for higher limits

### Error: "Network error"
- Check internet connection
- Verify OpenAI API is accessible
- Check for CORS issues

### Generation takes too long
- GPT-4 can take 5-10 seconds
- Use GPT-3.5 for faster results
- Add timeout handling

## 🎯 Best Practices

1. **Add error handling**
   ```javascript
   try {
     const result = await generateOnePager(input)
   } catch (error) {
     if (error.status === 429) {
       // Rate limit
     } else if (error.status === 401) {
       // Invalid key
     }
   }
   ```

2. **Add retry logic**
   ```javascript
   const retry = async (fn, retries = 3) => {
     try {
       return await fn()
     } catch (error) {
       if (retries > 0) {
         await new Promise(r => setTimeout(r, 1000))
         return retry(fn, retries - 1)
       }
       throw error
     }
   }
   ```

3. **Cache results**
   - Save generated one-pagers
   - Avoid regenerating same content
   - Use localStorage or database

4. **Add usage tracking**
   - Count API calls
   - Monitor costs
   - Set user limits

## 📚 Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [OpenAI Pricing](https://openai.com/pricing)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)

---

**Need help?** Check the README.md or open an issue!
