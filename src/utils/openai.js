/**
 * OpenAI Integration for One-Pager Generation
 */

// Removing top-level import to prevent load-time crashes
// import OpenAI from 'openai' 

const SYSTEM_PROMPT = `You are an expert marketing copywriter and one-pager designer. 
Your task is to transform user input into a professional, persuasive one-pager structure.

Return a JSON object with this exact structure:
{
  "headline": "Compelling headline (max 10 words)",
  "subheadline": "Supporting subheadline (max 20 words)",
  "problem": "Clear problem statement (2-3 sentences)",
  "solution": "Your solution description (2-3 sentences)",
  "benefits": [
    {"title": "Benefit name", "description": "Brief description"},
    // 4 benefits total
  ],
  "features": [
    "Feature 1",
    "Feature 2",
    // 6 features total
  ],
  "cta": {
    "primary": "Primary CTA button text",
    "secondary": "Secondary CTA button text",
    "text": "Supporting CTA text"
  },
  "stats": [
    {"value": "10,000+", "label": "Stat label"},
    // 3 stats total
  ]
}

Guidelines:
- Be concise and impactful
- Use action-oriented language
- Focus on benefits, not just features
- Make it scannable and easy to read
- Adapt tone based on user's selected tone
`

export async function generateOnePager(inputData) {
  const { prompt, tone } = inputData

  // Get API key from environment
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || ''

  if (!apiKey) {
    throw new Error(
      'OpenAI API Key is missing! \n\n' +
      'If you are running locally, check your .env file.\n' +
      'If you are on Vercel, go to Settings > Environment Variables and add VITE_OPENAI_API_KEY.'
    )
  }

  try {
    // Dynamic import to ensure the library is only loaded when needed
    // This prevents "process is not defined" or other bundling errors on initial load
    const { default: OpenAI } = await import('openai')

    // Initialize OpenAI only when needed
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Required for client-side usage
    })

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate a ${tone} one-pager for: ${prompt}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    })

    const result = JSON.parse(completion.choices[0].message.content)
    return result
  } catch (error) {
    console.error('OpenAI generation failed:', error)
    // Pass precise error message to the user
    throw new Error(error.message || 'Failed to generate one-pager.')
  }
}

export const EXAMPLE_PROMPTS = [
  {
    title: 'SaaS Platform',
    prompt: 'A SaaS platform that helps e-commerce businesses automate their customer support using AI chatbots and smart routing',
  },
  {
    title: 'Fitness App',
    prompt: 'A mobile app for fitness enthusiasts to track workouts, nutrition, and get personalized coaching from certified trainers',
  },
  {
    title: 'Enterprise Tool',
    prompt: 'An enterprise solution for managing remote teams, tracking productivity, and improving collaboration across time zones',
  },
]
