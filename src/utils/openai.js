/**
 * OpenAI Integration for One-Pager Generation
 * 
 * To use this:
 * 1. Install openai: npm install openai
 * 2. Create a .env file with: VITE_OPENAI_API_KEY=your_api_key_here
 * 3. Uncomment the code below and replace the mock implementation in App.jsx
 */

// import OpenAI from 'openai'

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true // Only for development
// })

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
- Adapt tone based on user's selected tone (marketing/sales/investor/internal)
`

export async function generateOnePager(inputData) {
    const { prompt, tone } = inputData

    // MOCK IMPLEMENTATION - Replace with actual OpenAI call
    // Uncomment below for real implementation:

    /*
    try {
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
      throw new Error('Failed to generate one-pager')
    }
    */

    // Mock implementation for development
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                headline: `Transform Your ${extractKeyword(prompt)} Business`,
                subheadline: 'Streamline operations, boost productivity, and scale faster with our innovative solution',
                problem: 'Traditional approaches are slow, expensive, and inefficient. Teams struggle with fragmented workflows and lack of visibility into what matters most.',
                solution: 'Our platform unifies your entire workflow in one place, automating repetitive tasks and providing real-time insights to help you make better decisions faster.',
                benefits: [
                    { title: 'Save Time', description: 'Automate 80% of manual tasks' },
                    { title: 'Reduce Costs', description: 'Cut operational expenses by 50%' },
                    { title: 'Scale Faster', description: 'Grow without adding headcount' },
                    { title: 'Better Insights', description: 'Real-time analytics and reporting' },
                ],
                features: [
                    'Automated workflow management',
                    'Real-time collaboration tools',
                    'Advanced analytics dashboard',
                    'Seamless integrations',
                    'Enterprise-grade security',
                    '24/7 customer support',
                ],
                cta: {
                    primary: 'Start Free Trial',
                    secondary: 'Schedule Demo',
                    text: 'Join 10,000+ companies already using our platform'
                },
                stats: [
                    { value: '10,000+', label: 'Active Users' },
                    { value: '98%', label: 'Satisfaction Rate' },
                    { value: '50%', label: 'Cost Reduction' },
                ]
            })
        }, 2000)
    })
}

function extractKeyword(text) {
    const words = text.split(' ')
    const meaningfulWords = words.filter(w =>
        w.length > 4 &&
        !['about', 'using', 'helps', 'platform'].includes(w.toLowerCase())
    )
    return meaningfulWords[0] || 'Business'
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
