/**
 * OpenAI Integration for One-Pager Generation
 */

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Allowed for client-side demo; use backend for production
})

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

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // Or "gpt-4o" if available to your key
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
    throw new Error('Failed to generate one-pager. Please check your API key and try again.')
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
