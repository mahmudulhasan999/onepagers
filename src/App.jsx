import { useState } from 'react'
import InputForm from './components/InputForm'
import OnePagerPreview from './components/OnePagerPreview'
import ExportPanel from './components/ExportPanel'
import Header from './components/Header'
import LoadingState from './components/LoadingState'
import { generateOnePager } from './utils/openai'

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
      const generatedData = await generateOnePager(inputData)
      setOnePagerData(generatedData)
      setCurrentStep('preview')
    } catch (error) {
      console.error('Generation failed:', error)
      alert(error.message)
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

export default App
