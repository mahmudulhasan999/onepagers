import { useState } from 'react'
import InputForm from './components/InputForm'
import OnePagerPreview from './components/OnePagerPreview'
import ExportPanel from './components/ExportPanel'
import Header from './components/Header'
import LoadingState from './components/LoadingState'

function App() {
  const [currentStep, setCurrentStep] = useState('input') // input, generating, preview
  const [onePagerData, setOnePagerData] = useState(null)
  const [customization, setCustomization] = useState({
    tone: 'marketing',
    primaryColor: '#0ea5e9',
    fontStyle: 'Inter',
    logo: null,
  })

  const handleGenerate = async (inputData) => {
    setCurrentStep('generating')

    try {
      // Simulate AI generation (replace with actual OpenAI API call)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock generated data
      const generatedData = {
        headline: generateHeadline(inputData),
        subheadline: generateSubheadline(inputData),
        problem: generateProblem(inputData),
        solution: generateSolution(inputData),
        benefits: generateBenefits(inputData),
        features: generateFeatures(inputData),
        cta: generateCTA(inputData),
        stats: generateStats(inputData),
      }

      setOnePagerData(generatedData)
      setCurrentStep('preview')
    } catch (error) {
      console.error('Generation failed:', error)
      setCurrentStep('input')
    }
  }

  const handleEdit = () => {
    setCurrentStep('input')
  }

  const handleCustomizationChange = (updates) => {
    setCustomization(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {currentStep === 'input' && (
          <div className="animate-fade-in">
            <InputForm
              onGenerate={handleGenerate}
              customization={customization}
              onCustomizationChange={handleCustomizationChange}
              initialData={onePagerData}
            />
          </div>
        )}

        {currentStep === 'generating' && (
          <LoadingState />
        )}

        {currentStep === 'preview' && onePagerData && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <OnePagerPreview
                  data={onePagerData}
                  customization={customization}
                  onEdit={setOnePagerData}
                />
              </div>
              <div className="lg:col-span-1">
                <ExportPanel
                  onePagerData={onePagerData}
                  customization={customization}
                  onBack={handleEdit}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// Helper functions for content generation (will be replaced with AI)
function generateHeadline(input) {
  return input.prompt ?
    `Transform Your ${input.prompt.split(' ')[0]} Business` :
    'Your Compelling Headline Here'
}

function generateSubheadline(input) {
  return 'Streamline operations, boost productivity, and scale faster with our innovative solution'
}

function generateProblem(input) {
  return 'Traditional approaches are slow, expensive, and inefficient. Teams struggle with fragmented workflows and lack of visibility.'
}

function generateSolution(input) {
  return 'Our platform unifies your entire workflow in one place, automating repetitive tasks and providing real-time insights to help you make better decisions faster.'
}

function generateBenefits(input) {
  return [
    { title: 'Save Time', description: 'Automate 80% of manual tasks' },
    { title: 'Reduce Costs', description: 'Cut operational expenses by 50%' },
    { title: 'Scale Faster', description: 'Grow without adding headcount' },
    { title: 'Better Insights', description: 'Real-time analytics and reporting' },
  ]
}

function generateFeatures(input) {
  return [
    'Automated workflow management',
    'Real-time collaboration tools',
    'Advanced analytics dashboard',
    'Seamless integrations',
    'Enterprise-grade security',
    '24/7 customer support',
  ]
}

function generateCTA(input) {
  return {
    primary: 'Start Free Trial',
    secondary: 'Schedule Demo',
    text: 'Join 10,000+ companies already using our platform'
  }
}

function generateStats(input) {
  return [
    { value: '10,000+', label: 'Active Users' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '50%', label: 'Cost Reduction' },
  ]
}

export default App
