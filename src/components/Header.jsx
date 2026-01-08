import { Sparkles } from 'lucide-react'

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
            <div className="container mx-auto px-4 py-4 max-w-7xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">AI One-Pager</h1>
                            <p className="text-xs text-gray-500">Generate professional one-pagers in seconds</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Examples</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
                        <button className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                            Sign In
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
