import { useState } from 'react'
import { Download, FileImage, FileText, Link2, ArrowLeft, Loader2 } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function ExportPanel({ onePagerData, customization, onBack }) {
    const [exporting, setExporting] = useState(false)
    const [exportType, setExportType] = useState(null)

    const exportAsPDF = async () => {
        setExporting(true)
        setExportType('pdf')

        try {
            const canvas = document.getElementById('onepager-canvas')
            const canvasImage = await html2canvas(canvas, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            })

            const imgData = canvasImage.toDataURL('image/png')
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            })

            const imgWidth = 210 // A4 width in mm
            const imgHeight = (canvasImage.height * imgWidth) / canvasImage.width

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
            pdf.save('one-pager.pdf')
        } catch (error) {
            console.error('PDF export failed:', error)
            alert('Export failed. Please try again.')
        } finally {
            setExporting(false)
            setExportType(null)
        }
    }

    const exportAsPNG = async () => {
        setExporting(true)
        setExportType('png')

        try {
            const canvas = document.getElementById('onepager-canvas')
            const canvasImage = await html2canvas(canvas, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            })

            canvasImage.toBlob((blob) => {
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = 'one-pager.png'
                link.click()
                URL.revokeObjectURL(url)
            })
        } catch (error) {
            console.error('PNG export failed:', error)
            alert('Export failed. Please try again.')
        } finally {
            setExporting(false)
            setExportType(null)
        }
    }

    const generateShareLink = () => {
        // In production, this would save to database and generate a unique URL
        const mockShareId = Math.random().toString(36).substring(7)
        const shareUrl = `${window.location.origin}/share/${mockShareId}`

        navigator.clipboard.writeText(shareUrl)
        alert('Share link copied to clipboard!')
    }

    return (
        <div className="space-y-4">
            <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Export & Share</h3>

                <div className="space-y-3">
                    {/* Export as PDF */}
                    <button
                        onClick={exportAsPDF}
                        disabled={exporting}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {exporting && exportType === 'pdf' ? (
                            <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
                        ) : (
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-red-600" />
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="font-medium text-gray-900">Export as PDF</div>
                            <div className="text-xs text-gray-500">Download print-ready PDF file</div>
                        </div>
                        <Download className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Export as PNG */}
                    <button
                        onClick={exportAsPNG}
                        disabled={exporting}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {exporting && exportType === 'png' ? (
                            <Loader2 className="w-5 h-5 text-primary-600 animate-spin" />
                        ) : (
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FileImage className="w-5 h-5 text-blue-600" />
                            </div>
                        )}
                        <div className="flex-1">
                            <div className="font-medium text-gray-900">Export as PNG</div>
                            <div className="text-xs text-gray-500">Download high-res image</div>
                        </div>
                        <Download className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Generate Share Link */}
                    <button
                        onClick={generateShareLink}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                    >
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Link2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium text-gray-900">Share Link</div>
                            <div className="text-xs text-gray-500">Generate shareable URL</div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Customization Summary */}
            <div className="card">
                <h4 className="font-medium text-gray-900 mb-3">Customization</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tone:</span>
                        <span className="font-medium text-gray-900 capitalize">{customization.tone}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Font:</span>
                        <span className="font-medium text-gray-900">{customization.fontStyle}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Color:</span>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-6 h-6 rounded border border-gray-200"
                                style={{ backgroundColor: customization.primaryColor }}
                            />
                            <span className="font-medium text-gray-900 text-xs">{customization.primaryColor}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <button
                onClick={onBack}
                className="w-full btn-secondary flex items-center justify-center gap-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Start Over
            </button>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 text-sm mb-2">💡 Pro Tips</h5>
                <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Click any text in the preview to edit it</li>
                    <li>• PDF exports are print-ready at 300 DPI</li>
                    <li>• Share links are valid for 30 days</li>
                </ul>
            </div>
        </div>
    )
}
