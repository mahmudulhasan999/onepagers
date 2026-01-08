import { useState } from 'react'
import { Wand2, FileText, Palette, Type, Upload } from 'lucide-react'

const TONES = [
    { value: 'marketing', label: 'Marketing', description: 'Persuasive and engaging' },
    { value: 'sales', label: 'Sales', description: 'Direct and conversion-focused' },
    { value: 'investor', label: 'Investor', description: 'Professional and data-driven' },
    { value: 'internal', label: 'Internal', description: 'Clear and informative' },
]

const FONTS = [
    { value: 'Inter', label: 'Inter', preview: 'font-sans' },
    { value: 'Georgia', label: 'Georgia', preview: 'font-serif' },
    { value: 'Monospace', label: 'Monospace', preview: 'font-mono' },
]

const EXAMPLE_PROMPTS = [
    'A SaaS platform that helps e-commerce businesses automate their customer support using AI',
    'A mobile app for fitness enthusiasts to track workouts and nutrition with personalized coaching',
    'An enterprise solution for managing remote teams and improving productivity',
]

export default function InputForm({ onGenerate, customization, onCustomizationChange, initialData }) {
    const [inputType, setInputType] = useState('prompt') // prompt or paste
    const [prompt, setPrompt] = useState('')
    const [pastedContent, setPastedContent] = useState('')
    const [showCustomization, setShowCustomization] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const inputData = {
            type: inputType,
            prompt: inputType === 'prompt' ? prompt : pastedContent,
            tone: customization.tone,
        }
        onGenerate(inputData)
    }

    const useExamplePrompt = (example) => {
        setPrompt(example)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-slide-up">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                    Create Your Perfect One-Pager
                </h2>
                <p className="text-lg text-gray-600">
                    Describe your product or paste existing content. AI will structure it into a professional one-pager.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Type Toggle */}
                <div className="card">
                    <div className="flex gap-3 mb-6">
                        <button
                            type="button"
                            onClick={() => setInputType('prompt')}
                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${inputType === 'prompt'
                                    ? 'bg-primary-50 text-primary-700 border-2 border-primary-500'
                                    : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                                }`}
                        >
                            <Wand2 className="w-5 h-5 inline-block mr-2" />
                            Describe Your Product
                        </button>
                        <button
                            type="button"
                            onClick={() => setInputType('paste')}
                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${inputType === 'paste'
                                    ? 'bg-primary-50 text-primary-700 border-2 border-primary-500'
                                    : 'bg-gray-50 text-gray-600 border-2 border-transparent hover:bg-gray-100'
                                }`}
                        >
                            <FileText className="w-5 h-5 inline-block mr-2" />
                            Paste Existing Content
                        </button>
                    </div>

                    {inputType === 'prompt' ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                What do you want to create a one-pager for?
                            </label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Example: A SaaS platform that helps e-commerce businesses automate their customer support using AI chatbots..."
                                className="input-field min-h-[150px] resize-none"
                                required
                            />

                            {/* Example Prompts */}
                            <div className="mt-4">
                                <p className="text-xs text-gray-500 mb-2">Try an example:</p>
                                <div className="flex flex-wrap gap-2">
                                    {EXAMPLE_PROMPTS.map((example, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => useExamplePrompt(example)}
                                            className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                        >
                                            Example {idx + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Paste your existing content (notes, bullets, paragraphs)
                            </label>
                            <textarea
                                value={pastedContent}
                                onChange={(e) => setPastedContent(e.target.value)}
                                placeholder="Paste your messy notes, bullet points, or paragraphs here. AI will organize and polish them into a structured one-pager..."
                                className="input-field min-h-[200px] resize-none"
                                required
                            />
                        </div>
                    )}
                </div>

                {/* Customization Section */}
                <div className="card">
                    <button
                        type="button"
                        onClick={() => setShowCustomization(!showCustomization)}
                        className="w-full flex items-center justify-between text-left"
                    >
                        <div className="flex items-center gap-2">
                            <Palette className="w-5 h-5 text-gray-600" />
                            <span className="font-medium text-gray-900">Customization</span>
                        </div>
                        <span className="text-sm text-gray-500">
                            {showCustomization ? 'Hide' : 'Show'} options
                        </span>
                    </button>

                    {showCustomization && (
                        <div className="mt-6 space-y-6 pt-6 border-t border-gray-200">
                            {/* Tone Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Tone & Style
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {TONES.map((tone) => (
                                        <button
                                            key={tone.value}
                                            type="button"
                                            onClick={() => onCustomizationChange({ tone: tone.value })}
                                            className={`p-3 rounded-lg border-2 text-left transition-all ${customization.tone === tone.value
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="font-medium text-gray-900">{tone.label}</div>
                                            <div className="text-xs text-gray-500 mt-1">{tone.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Primary Color
                                </label>
                                <div className="flex gap-3 items-center">
                                    <input
                                        type="color"
                                        value={customization.primaryColor}
                                        onChange={(e) => onCustomizationChange({ primaryColor: e.target.value })}
                                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                                    />
                                    <input
                                        type="text"
                                        value={customization.primaryColor}
                                        onChange={(e) => onCustomizationChange({ primaryColor: e.target.value })}
                                        className="input-field flex-1"
                                        placeholder="#0ea5e9"
                                    />
                                </div>
                            </div>

                            {/* Font Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Font Style
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {FONTS.map((font) => (
                                        <button
                                            key={font.value}
                                            type="button"
                                            onClick={() => onCustomizationChange({ fontStyle: font.value })}
                                            className={`p-3 rounded-lg border-2 text-center transition-all ${customization.fontStyle === font.value
                                                    ? 'border-primary-500 bg-primary-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className={`font-medium ${font.preview}`}>{font.label}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Logo Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Logo (Optional)
                                </label>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Upload Logo
                                    </button>
                                    <span className="text-sm text-gray-500">PNG, JPG up to 2MB</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Generate Button */}
                <button
                    type="submit"
                    disabled={inputType === 'prompt' ? !prompt.trim() : !pastedContent.trim()}
                    className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Wand2 className="w-5 h-5" />
                    Generate One-Pager
                </button>
            </form>
        </div>
    )
}
