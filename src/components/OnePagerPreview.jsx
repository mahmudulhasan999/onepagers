import { useState } from 'react'
import { Check, TrendingUp, Target, Zap, Edit2 } from 'lucide-react'

export default function OnePagerPreview({ data, customization, onEdit }) {
    const [editingField, setEditingField] = useState(null)
    const [editedData, setEditedData] = useState(data)

    const handleEdit = (field, value) => {
        const updated = { ...editedData, [field]: value }
        setEditedData(updated)
        onEdit(updated)
    }

    const EditableText = ({ field, value, className, multiline = false }) => {
        const isEditing = editingField === field

        if (isEditing) {
            return multiline ? (
                <textarea
                    autoFocus
                    value={value}
                    onChange={(e) => handleEdit(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    className={`${className} w-full border-2 border-primary-500 rounded p-2 focus:outline-none`}
                    rows={3}
                />
            ) : (
                <input
                    autoFocus
                    type="text"
                    value={value}
                    onChange={(e) => handleEdit(field, e.target.value)}
                    onBlur={() => setEditingField(null)}
                    className={`${className} w-full border-2 border-primary-500 rounded p-2 focus:outline-none`}
                />
            )
        }

        return (
            <div
                onClick={() => setEditingField(field)}
                className={`${className} cursor-pointer hover:bg-gray-50 rounded p-2 -m-2 transition-colors group relative`}
            >
                {value}
                <Edit2 className="w-4 h-4 absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 transition-opacity" />
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                <span className="text-sm text-gray-500">Click any text to edit</span>
            </div>

            {/* One-Pager Canvas */}
            <div
                id="onepager-canvas"
                className="bg-white shadow-xl rounded-lg overflow-hidden"
                style={{
                    fontFamily: customization.fontStyle,
                    aspectRatio: '8.5 / 11',
                    maxHeight: '1100px'
                }}
            >
                <div className="p-12 h-full flex flex-col">
                    {/* Header Section */}
                    <div className="mb-8">
                        {customization.logo && (
                            <img src={customization.logo} alt="Logo" className="h-12 mb-6" />
                        )}

                        <EditableText
                            field="headline"
                            value={editedData.headline}
                            className="text-4xl font-bold text-gray-900 mb-3"
                        />

                        <EditableText
                            field="subheadline"
                            value={editedData.subheadline}
                            className="text-xl text-gray-600"
                        />
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
                        {editedData.stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div
                                    className="text-3xl font-bold mb-1"
                                    style={{ color: customization.primaryColor }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Problem & Solution */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${customization.primaryColor}20` }}
                                >
                                    <Target
                                        className="w-5 h-5"
                                        style={{ color: customization.primaryColor }}
                                    />
                                </div>
                                <h4 className="font-semibold text-gray-900">The Problem</h4>
                            </div>
                            <EditableText
                                field="problem"
                                value={editedData.problem}
                                className="text-sm text-gray-600 leading-relaxed"
                                multiline
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${customization.primaryColor}20` }}
                                >
                                    <Zap
                                        className="w-5 h-5"
                                        style={{ color: customization.primaryColor }}
                                    />
                                </div>
                                <h4 className="font-semibold text-gray-900">Our Solution</h4>
                            </div>
                            <EditableText
                                field="solution"
                                value={editedData.solution}
                                className="text-sm text-gray-600 leading-relaxed"
                                multiline
                            />
                        </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="mb-8">
                        <h4 className="font-semibold text-gray-900 mb-4">Key Benefits</h4>
                        <div className="grid grid-cols-2 gap-4">
                            {editedData.benefits.map((benefit, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <div
                                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                        style={{ backgroundColor: customization.primaryColor }}
                                    >
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900 text-sm">{benefit.title}</div>
                                        <div className="text-xs text-gray-600">{benefit.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                        <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                            {editedData.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: customization.primaryColor }}
                                    />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-auto pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600 mb-4">{editedData.cta.text}</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                                style={{ backgroundColor: customization.primaryColor }}
                            >
                                {editedData.cta.primary}
                            </button>
                            <button className="px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all">
                                {editedData.cta.secondary}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
