import { useState, useEffect } from 'react'
import { Plus, Plane, Brain as Train, Bus, Car, Trash2, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface TransportTicket {
  id: string
  type: 'avion' | 'train' | 'bus' | 'autre'
  order_number: number
  departure: string
  arrival: string
  departure_time: string
  arrival_time: string | null
  booking_reference: string | null
  notes: string | null
}

interface TransportTabProps {
  tripId: string
}

const TRANSPORT_TYPES = [
  { value: 'avion', label: 'Avion', icon: Plane, color: 'text-duo-blue' },
  { value: 'train', label: 'Train', icon: Train, color: 'text-duo-green' },
  { value: 'bus', label: 'Bus', icon: Bus, color: 'text-duo-orange' },
  { value: 'autre', label: 'Autre', icon: Car, color: 'text-duo-purple' },
]

export default function TransportTab({ tripId }: TransportTabProps) {
  const [tickets, setTickets] = useState<TransportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'avion' as TransportTicket['type'],
    departure: '',
    arrival: '',
    departure_time: '',
    arrival_time: '',
    booking_reference: '',
    notes: '',
  })

  useEffect(() => {
    loadTickets()
  }, [tripId])

  const loadTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('transport_tickets')
        .select('*')
        .eq('trip_id', tripId)
        .order('order_number', { ascending: true })

      if (error) throw error
      setTickets(data || [])
    } catch (error) {
      console.error('Error loading tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const nextOrderNumber = tickets.length > 0 ? Math.max(...tickets.map(t => t.order_number)) + 1 : 1

      const { error } = await supabase.from('transport_tickets').insert([
        {
          trip_id: tripId,
          type: formData.type,
          order_number: nextOrderNumber,
          departure: formData.departure,
          arrival: formData.arrival,
          departure_time: formData.departure_time,
          arrival_time: formData.arrival_time || null,
          booking_reference: formData.booking_reference || null,
          notes: formData.notes || null,
        },
      ])

      if (error) throw error
      setFormData({
        type: 'avion',
        departure: '',
        arrival: '',
        departure_time: '',
        arrival_time: '',
        booking_reference: '',
        notes: '',
      })
      setShowForm(false)
      loadTickets()
    } catch (error) {
      console.error('Error adding ticket:', error)
      alert('Erreur lors de l\'ajout du billet')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce billet ?')) return

    try {
      const { error } = await supabase.from('transport_tickets').delete().eq('id', id)
      if (error) throw error
      loadTickets()
    } catch (error) {
      console.error('Error deleting ticket:', error)
    }
  }

  const getTransportConfig = (type: string) => {
    return TRANSPORT_TYPES.find(t => t.value === type) || TRANSPORT_TYPES[0]
  }

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>
  }

  return (
    <div className="space-y-4">
      {/* Info */}
      <div className="card-duo bg-purple-50 border-duo-purple">
        <div className="flex gap-3">
          <Plane className="w-5 h-5 text-duo-purple flex-shrink-0 mt-1" />
          <div className="text-sm">
            <p className="font-bold text-duo-purple mb-1">Organisation des transports</p>
            <p className="text-gray-700">
              Ajoute tous tes billets dans l'ordre chronologique pour avoir une vue claire de ton itinéraire.
            </p>
          </div>
        </div>
      </div>

      {/* Add button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn-duo-primary w-full">
          <Plus className="w-5 h-5 inline mr-1" />
          Ajouter un billet
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="card-duo">
          <h3 className="text-xl font-bold mb-4">Nouveau billet</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Type de transport</label>
              <div className="grid grid-cols-4 gap-2">
                {TRANSPORT_TYPES.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value as TransportTicket['type'] })}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        formData.type === type.value
                          ? 'border-duo-blue bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-1 ${type.color}`} />
                      <div className="text-xs font-semibold">{type.label}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2">Départ</label>
                <input
                  type="text"
                  required
                  value={formData.departure}
                  onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                  placeholder="Paris CDG"
                  className="input-duo"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Arrivée</label>
                <input
                  type="text"
                  required
                  value={formData.arrival}
                  onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                  placeholder="Katmandou"
                  className="input-duo"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2">Heure départ</label>
                <input
                  type="datetime-local"
                  required
                  value={formData.departure_time}
                  onChange={(e) => setFormData({ ...formData, departure_time: e.target.value })}
                  className="input-duo"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Heure arrivée</label>
                <input
                  type="datetime-local"
                  value={formData.arrival_time}
                  onChange={(e) => setFormData({ ...formData, arrival_time: e.target.value })}
                  className="input-duo"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">Référence de réservation</label>
              <input
                type="text"
                value={formData.booking_reference}
                onChange={(e) => setFormData({ ...formData, booking_reference: e.target.value })}
                placeholder="ABC123"
                className="input-duo"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Terminal, compagnie, numéro de vol..."
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

      {/* Tickets list */}
      {tickets.length === 0 ? (
        !showForm && (
          <div className="card-duo text-center py-12">
            <Plane className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">Aucun billet</h3>
            <p className="text-gray-600">Ajoute tes billets de transport !</p>
          </div>
        )
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => {
            const config = getTransportConfig(ticket.type)
            const Icon = config.icon
            return (
              <div key={ticket.id} className="card-duo">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="badge-blue">#{ticket.order_number}</span>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                    <span className="font-semibold text-sm">{config.label}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="text-duo-red hover:bg-red-50 p-2 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Route */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1">
                    <div className="font-bold text-lg">{ticket.departure}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(ticket.departure_time).toLocaleString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />

                  <div className="flex-1 text-right">
                    <div className="font-bold text-lg">{ticket.arrival}</div>
                    {ticket.arrival_time && (
                      <div className="text-sm text-gray-600">
                        {new Date(ticket.arrival_time).toLocaleString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                {(ticket.booking_reference || ticket.notes) && (
                  <div className="pt-3 border-t border-gray-200 space-y-1 text-sm">
                    {ticket.booking_reference && (
                      <div className="text-gray-600">
                        <span className="font-semibold">Référence:</span> {ticket.booking_reference}
                      </div>
                    )}
                    {ticket.notes && (
                      <div className="text-gray-600">{ticket.notes}</div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
