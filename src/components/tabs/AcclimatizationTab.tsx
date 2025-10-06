import { useState, useEffect } from 'react'
import { Plus, TrendingUp, Calendar, Clock, Mountain, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface AcclimatizationSession {
  id: string
  date: string
  duration_hours: number
  altitude_simulated: number | null
  notes: string | null
}

interface AcclimatizationTabProps {
  tripId: string
}

export default function AcclimatizationTab({ tripId }: AcclimatizationTabProps) {
  const [sessions, setSessions] = useState<AcclimatizationSession[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    date: '',
    duration_hours: '',
    altitude_simulated: '',
    notes: '',
  })

  useEffect(() => {
    loadSessions()
  }, [tripId])

  const loadSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('acclimatization_sessions')
        .select('*')
        .eq('trip_id', tripId)
        .order('date', { ascending: false })

      if (error) throw error
      setSessions(data || [])
    } catch (error) {
      console.error('Error loading sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('acclimatization_sessions').insert([
        {
          trip_id: tripId,
          date: formData.date,
          duration_hours: parseFloat(formData.duration_hours),
          altitude_simulated: formData.altitude_simulated ? parseInt(formData.altitude_simulated) : null,
          notes: formData.notes || null,
        },
      ])

      if (error) throw error
      setFormData({
        date: '',
        duration_hours: '',
        altitude_simulated: '',
        notes: '',
      })
      setShowForm(false)
      loadSessions()
    } catch (error) {
      console.error('Error adding session:', error)
      alert('Erreur lors de l\'ajout de la séance')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette séance ?')) return

    try {
      const { error } = await supabase.from('acclimatization_sessions').delete().eq('id', id)
      if (error) throw error
      loadSessions()
    } catch (error) {
      console.error('Error deleting session:', error)
    }
  }

  const totalHours = sessions.reduce((sum, session) => sum + session.duration_hours, 0)

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-duo text-center">
          <div className="text-3xl font-bold text-duo-purple">{sessions.length}</div>
          <div className="text-sm text-gray-600">Séances</div>
        </div>
        <div className="card-duo text-center">
          <div className="text-3xl font-bold text-duo-green">{totalHours.toFixed(1)}h</div>
          <div className="text-sm text-gray-600">Durée totale</div>
        </div>
      </div>

      {/* Info card */}
      <div className="card-duo bg-blue-50 border-duo-blue">
        <div className="flex gap-3">
          <TrendingUp className="w-5 h-5 text-duo-blue flex-shrink-0 mt-1" />
          <div className="text-sm">
            <p className="font-bold text-duo-blue mb-1">Pourquoi s'acclimater ?</p>
            <p className="text-gray-700">
              L'acclimatation en tente hypoxique prépare ton corps aux altitudes élevées en simulant
              les conditions de haute montagne. Idéal avant une ascension !
            </p>
          </div>
        </div>
      </div>

      {/* Add button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn-duo-primary w-full">
          <Plus className="w-5 h-5 inline mr-1" />
          Ajouter une séance
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="card-duo">
          <h3 className="text-xl font-bold mb-4">Nouvelle séance</h3>
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
              <label className="block font-bold mb-2">Durée (heures)</label>
              <input
                type="number"
                step="0.5"
                required
                value={formData.duration_hours}
                onChange={(e) => setFormData({ ...formData, duration_hours: e.target.value })}
                placeholder="2.5"
                className="input-duo"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Altitude simulée (m) - optionnel</label>
              <input
                type="number"
                value={formData.altitude_simulated}
                onChange={(e) => setFormData({ ...formData, altitude_simulated: e.target.value })}
                placeholder="3500"
                className="input-duo"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Ressenti, fréquence cardiaque, remarques..."
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

      {/* Sessions list */}
      {sessions.length === 0 ? (
        !showForm && (
          <div className="card-duo text-center py-12">
            <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">Aucune séance</h3>
            <p className="text-gray-600">Commence ton programme d'acclimatation !</p>
          </div>
        )
      ) : (
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="card-duo">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-duo-purple" />
                  <h3 className="text-lg font-bold">
                    Séance d'acclimatation
                  </h3>
                </div>
                <button
                  onClick={() => handleDelete(session.id)}
                  className="text-duo-red hover:bg-red-50 p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(session.date).toLocaleDateString('fr-FR')}</span>
                </div>

                <div className="flex items-center gap-2 text-duo-purple font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>{session.duration_hours}h</span>
                </div>

                {session.altitude_simulated && (
                  <div className="flex items-center gap-2 text-duo-blue font-semibold">
                    <Mountain className="w-4 h-4" />
                    <span>{session.altitude_simulated.toLocaleString()} m simulés</span>
                  </div>
                )}

                {session.notes && (
                  <p className="text-gray-600 mt-2 pt-2 border-t border-gray-200">
                    {session.notes}
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
