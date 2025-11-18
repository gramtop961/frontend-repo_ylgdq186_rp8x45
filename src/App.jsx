import UploadForm from './components/UploadForm'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold text-gray-900">ICT Trading Engine</h1>
        <p className="text-gray-600 mt-2">Upload an HTF chart and an LTF chart to get a precise, rule-based ICT signal.</p>
        <div className="mt-8">
          <UploadForm />
        </div>
      </div>
    </div>
  )
}
