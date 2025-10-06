import { useState, useEffect } from 'react'
import { Plus, Mountain, MapPin, Calendar, Trash2, Edit } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Summit {
  id: string
  name: string
  altitude: number
  coordinates_lat: number | null
  coordinates_lng: number | null
  summit_date: string | null
  notes: string | null
}

interface SummitsTabProps {
  tripId: string
}

export default function SummitsTab({ tripId }: SummitsTabProps) {
  const [summits, setSummits] = useState<Summit[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    altitude: '',
    coordinates_lat: '',
    coordinates_lng: '',
    summit_date: '',
    notes: '',
  })

  useEffect(() => {
    loadSummits()
  }, [tripId])

  const loadSummits = async () => {
    try {
      const { data, error } = await supabase
        .from('summits')
        .select('*')
        .eq('trip_id', tripId)
        .order('altitude', { ascending: false })

      if (error) throw error
      setSummits(data || [])
    } catch (error) {
      console.error('Error loading summits:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('summits').insert([
        {
          trip_id: tripId,
          name: formData.name,
          altitude: parseInt(formData.altitude),
          coordinates_lat: formData.coordinates_lat ? parseFloat(formData.coordinates_lat) : null,
          coordinates_lng: formData.coordinates_lng ? parseFloat(formData.coordinates_lng) : null,
          summit_date: formData.summit_date || null,
          notes: formData.notes || null,
        },
      ])

      if (error) throw error
      setFormData({
        name: '',
        altitude: '',
        coordinates_lat: '',
        coordinates_lng: '',
        summit_date: '',
        notes: '',
      })
      setShowForm(false)
      loadSummits()
    } catch (error) {
      console.error('Error adding summit:', error)
      alert('Erreur lors de l\'ajout du sommet')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce sommet ?')) return

    try {
      const { error } = await supabase.from('summits').delete().eq('id', id)
      if (error) throw error
      loadSummits()
    } catch (error) {
      console.error('Error deleting summit:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>
  }

  return (
    <div className="space-y-4">
      {/* Add button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn-duo-primary w-full">
          <Plus className="w-5 h-5 inline mr-1" />
          Ajouter un sommet
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="card-duo">
          <h3 className="text-xl font-bold mb-4">Nouveau sommet</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Nom du sommet</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Mont Blanc"
                className="input-duo"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Altitude (m)</label>
              <input
                type="number"
                required
                value={formData.altitude}
                onChange={(e) => setFormData({ ...formData, altitude: e.target.value })}
                placeholder="Ex: 4808"
                className="input-duo"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates_lat}
                  onChange={(e) => setFormData({ ...formData, coordinates_lat: e.target.value })}
                  placeholder="45.8326"
                  className="input-duo"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={formData.coordinates_lng}
                  onChange={(e) => setFormData({ ...formData, coordinates_lng: e.target.value })}
                  placeholder="6.8652"
                  className="input-duo"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">Date du sommet (prévue)</label>
              <input
                type="date"
                value={formData.summit_date}
                onChange={(e) => setFormData({ ...formData, summit_date: e.target.value })}
                className="input-duo"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Difficultés, voies, conseils..."
                rows={3}
                className="input-duo resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" className="btn-duo-primary flex-1">
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-duo-outline flex-1"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Summits list */}
      {summits.length === 0 ? (
        !showForm && (
          <div className="card-duo text-center py-12">
            <Mountain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">Aucun sommet</h3>
            <p className="text-gray-600">Ajoute les sommets que tu veux conquérir !</p>
          </div>
        )
      ) : (
        <div className="space-y-3">
          {summits.map((summit) => (
            <div key={summit.id} className="card-duo">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-duo-green" />
                  <h3 className="text-lg font-bold">{summit.name}</h3>
                </div>
                <button
                  onClick={() => handleDelete(summit.id)}
                  className="text-duo-red hover:bg-red-50 p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-duo-blue font-bold">
                  <Mountain className="w-4 h-4" />
                  <span>{summit.altitude.toLocaleString()} m</span>
                </div>

                {summit.summit_date && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(summit.summit_date).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}

                {(summit.coordinates_lat && summit.coordinates_lng) && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {summit.coordinates_lat.toFixed(4)}, {summit.coordinates_lng.toFixed(4)}
                    </span>
                  </div>
                )}

                {summit.notes && (
                  <p className="text-gray-600 mt-2 pt-2 border-t border-gray-200">
                    {summit.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
