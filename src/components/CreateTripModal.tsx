import { useState } from 'react'
import { X, Mountain, Plane } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface CreateTripModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function CreateTripModal({ onClose, onSuccess }: CreateTripModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'voyage' as 'voyage' | 'ascension',
    start_date: '',
    end_date: '',
    description: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // For demo purposes, using a dummy user_id
      // In production, you'd get this from auth context
      const { error } = await supabase.from('trips').insert([
        {
          ...formData,
          user_id: '00000000-0000-0000-0000-000000000000', // Replace with actual auth.uid()
          status: 'planification',
        },
      ])

      if (error) throw error
      onSuccess()
    } catch (error) {
      console.error('Error creating trip:', error)
      alert('Erreur lors de la création du voyage')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-duo-dark">Nouveau voyage</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Type selection */}
          <div>
            <label className="block font-bold mb-3 text-duo-dark">Type d'aventure</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'voyage' })}
                className={formData.type === 'voyage' ? 'card-duo-active' : 'card-duo'}
              >
                <Plane className="w-8 h-8 mx-auto mb-2 text-duo-blue" />
                <div className="font-bold">Voyage</div>
                <div className="text-sm text-gray-600">Découverte et exploration</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'ascension' })}
                className={formData.type === 'ascension' ? 'card-duo-active' : 'card-duo'}
              >
                <Mountain className="w-8 h-8 mx-auto mb-2 text-duo-green" />
                <div className="font-bold">Ascension</div>
                <div className="text-sm text-gray-600">Conquête de sommets</div>
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block font-bold mb-2 text-duo-dark">
              Nom du {formData.type}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={formData.type === 'ascension' ? 'Ex: Mont Blanc' : 'Ex: Tour du Japon'}
              className="input-duo"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2 text-duo-dark">Date de début</label>
              <input
                type="date"
                required
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="input-duo"
              />
            </div>
            <div>
              <label className="block font-bold mb-2 text-duo-dark">Date de fin</label>
              <input
                type="date"
                required
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="input-duo"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold mb-2 text-duo-dark">
              Description (optionnel)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Objectifs, itinéraire prévu, notes..."
              rows={4}
              className="input-duo resize-none"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-duo-primary w-full"
          >
            {loading ? 'Création...' : 'Créer le voyage'}
          </button>
        </form>
      </div>
    </div>
  )
}
