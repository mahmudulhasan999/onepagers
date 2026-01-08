import { Loader2, Sparkles } from 'lucide-react'

export default function LoadingState() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="card text-center py-16">
                <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center animate-pulse">
                        <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <Loader2 className="w-8 h-8 text-primary-600 absolute -top-2 -right-2 animate-spin" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Generating Your One-Pager
                </h3>
                <p className="text-gray-600 mb-8">
                    AI is structuring your content into a professional layout...
                </p>

                {/* Skeleton Preview */}
                <div className="max-w-2xl mx-auto space-y-4 text-left">
                    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-32 bg-gray-200 rounded-lg animate-pulse mt-6"></div>
                </div>
            </div>
        </div>
    )
}
