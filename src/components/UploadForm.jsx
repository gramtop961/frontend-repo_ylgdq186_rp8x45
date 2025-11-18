import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function UploadForm() {
  const [htf, setHtf] = useState(null)
  const [ltf, setLtf] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    if (!htf || !ltf) {
      setError('Please select both HTF and LTF images')
      return
    }
    const form = new FormData()
    form.append('htf', htf)
    form.append('ltf', ltf)

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) {
        const t = await res.text()
        throw new Error(t || 'Request failed')
      }
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">High Timeframe (HTF) Image</label>
          <input type="file" accept="image/*" onChange={(e) => setHtf(e.target.files[0])} className="block w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lower Timeframe (LTF) Image</label>
          <input type="file" accept="image/*" onChange={(e) => setLtf(e.target.files[0])} className="block w-full" />
        </div>
        <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50">
          {loading ? 'Analyzing…' : 'Analyze'}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

      {result && (
        <div className="mt-6 p-4 rounded border bg-white/50">
          <p className="font-semibold">Direction: <span className="uppercase">{result.direction}</span></p>
          <p>Entry: {result.entry}</p>
          <p>Stop: {result.stop}</p>
          <p>Target: {result.target}</p>
          <p className="text-sm text-gray-600 mt-2">{result.reasoning}</p>
        </div>
      )}
    </div>
  )
}
