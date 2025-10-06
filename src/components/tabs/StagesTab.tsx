import { useState, useEffect } from 'react'
import { Plus, MapPin, Mountain, Calendar, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Stage {
  id: string
  day_number: number
  date: string
  location: string
  altitude: number | null
  coordinates_lat: number | null
  coordinates_lng: number | null
  activities: string | null
  notes: string | null
}

interface StagesTabProps {
  tripId: string
}

export default function StagesTab({ tripId }: StagesTabProps) {
  const [stages, setStages] = useState<Stage[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    location: '',
    altitude: '',
    coordinates_lat: '',
    coordinates_lng: '',
    activities: '',
    notes: '',
  })

  useEffect(() => {
    loadStages()
  }, [tripId])

  const loadStages = async () => {
    try {
      const { data, error } = await supabase
        .from('daily_stages')
        .select('*')
        .eq('trip_id', tripId)
        .order('day_number', { ascending: true })

      if (error) throw error
      setStages(data || [])
    } catch (error) {
      console.error('Error loading stages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const nextDayNumber = stages.length > 0 ? Math.max(...stages.map(s => s.day_number)) + 1 : 1

      const { error } = await supabase.from('daily_stages').insert([
        {
          trip_id: tripId,
          day_number: nextDayNumber,
          date: formData.date,
          location: formData.location,
          altitude: formData.altitude ? parseInt(formData.altitude) : null,
          coordinates_lat: formData.coordinates_lat ? parseFloat(formData.coordinates_lat) : null,
          coordinates_lng: formData.coordinates_lng ? parseFloat(formData.coordinates_lng) : null,
          activities: formData.activities || null,
          notes: formData.notes || null,
        },
      ])

      if (error) throw error
      setFormData({
        date: '',
        location: '',
        altitude: '',
        coordinates_lat: '',
        coordinates_lng: '',
        activities: '',
        notes: '',
      })
      setShowForm(false)
      loadStages()
    } catch (error) {
      console.error('Error adding stage:', error)
      alert('Erreur lors de l\'ajout de l\'étape')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette étape ?')) return

    try {
      const { error } = await supabase.from('daily_stages').delete().eq('id', id)
      if (error) throw error
      loadStages()
    } catch (error) {
      console.error('Error deleting stage:', error)
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
          Ajouter une étape
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="card-duo">
          <h3 className="text-xl font-bold mb-4">Nouvelle étape</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="input-duo"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Lieu</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Ex: Refuge du Goûter"
                className="input-duo"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Altitude (m) - optionnel</label>
              <input
                type="number"
                value={formData.altitude}
                onChange={(e) => setFormData({ ...formData, altitude: e.target.value })}
                placeholder="Ex: 3817"
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
                  placeholder="45.8512"
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
                  placeholder="6.8308"
                  className="input-duo"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">Activités / Lieux à visiter</label>
              <textarea
                value={formData.activities}
                onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
                placeholder="Ex: Visite du temple, marché local, ascension..."
                rows={3}
                className="input-duo resize-none"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Notes, conseils, contacts..."
                rows={2}
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

      {/* Stages list */}
      {stages.length === 0 ? (
        !showForm && (
          <div className="card-duo text-center py-12">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">Aucune étape</h3>
            <p className="text-gray-600">Planifie ton itinéraire jour par jour !</p>
          </div>
        )
      ) : (
        <div className="space-y-3">
          {stages.map((stage) => (
            <div key={stage.id} className="card-duo">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="badge-blue mb-2">Jour {stage.day_number}</span>
                  <h3 className="text-lg font-bold">{stage.location}</h3>
                </div>
                <button
                  onClick={() => handleDelete(stage.id)}
                  className="text-duo-red hover:bg-red-50 p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(stage.date).toLocaleDateString('fr-FR')}</span>
                </div>

                {stage.altitude && (
                  <div className="flex items-center gap-2 text-duo-blue font-semibold">
                    <Mountain className="w-4 h-4" />
                    <span>{stage.altitude.toLocaleString()} m</span>
                  </div>
                )}

                {(stage.coordinates_lat && stage.coordinates_lng) && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {stage.coordinates_lat.toFixed(4)}, {stage.coordinates_lng.toFixed(4)}
                    </span>
                  </div>
                )}

                {stage.activities && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="font-semibold text-duo-dark mb-1">Activités :</p>
                    <p className="text-gray-600">{stage.activities}</p>
                  </div>
                )}

                {stage.notes && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="font-semibold text-duo-dark mb-1">Notes :</p>
                    <p className="text-gray-600">{stage.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
