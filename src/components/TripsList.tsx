import { useState, useEffect } from 'react'
import { Plus, Mountain, Plane, Calendar, MapPin } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { format } from 'date-fns'
import CreateTripModal from './CreateTripModal'

interface Trip {
  id: string
  name: string
  type: 'voyage' | 'ascension'
  start_date: string
  end_date: string
  status: 'planification' | 'en_cours' | 'termine'
  description: string | null
}

interface TripsListProps {
  onSelectTrip: (tripId: string) => void
}

export default function TripsList({ onSelectTrip }: TripsListProps) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'voyage' | 'ascension'>('all')

  useEffect(() => {
    loadTrips()
  }, [])

  const loadTrips = async () => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .order('start_date', { ascending: false })

      if (error) throw error
      setTrips(data || [])
    } catch (error) {
      console.error('Error loading trips:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTrips = trips.filter(trip =>
    filter === 'all' ? true : trip.type === filter
  )

  const getStatusBadge = (status: Trip['status']) => {
    switch (status) {
      case 'planification':
        return <span className="badge-yellow">Planification</span>
      case 'en_cours':
        return <span className="badge-green">En cours</span>
      case 'termine':
        return <span className="badge-gray">Terminé</span>
    }
  }

  const getTypeIcon = (type: Trip['type']) => {
    return type === 'ascension'
      ? <Mountain className="w-5 h-5 text-duo-green" />
      : <Plane className="w-5 h-5 text-duo-blue" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-duo-blue border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-duo-dark">Mes voyages</h2>
        <button onClick={() => setShowCreateModal(true)} className="btn-duo-primary">
          <Plus className="w-5 h-5 inline mr-1" />
          Nouveau
        </button>
      </div>

      {/* Filter buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'btn-duo-primary !py-2' : 'btn-duo-outline !py-2'}
        >
          Tous
        </button>
        <button
          onClick={() => setFilter('voyage')}
          className={filter === 'voyage' ? 'btn-duo-secondary !py-2' : 'btn-duo-outline !py-2'}
        >
          <Plane className="w-4 h-4 inline mr-1" />
          Voyages
        </button>
        <button
          onClick={() => setFilter('ascension')}
          className={filter === 'ascension' ? 'btn-duo-primary !py-2' : 'btn-duo-outline !py-2'}
        >
          <Mountain className="w-4 h-4 inline mr-1" />
          Ascensions
        </button>
      </div>

      {/* Trips list */}
      {filteredTrips.length === 0 ? (
        <div className="card-duo text-center py-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {filter === 'ascension' ? (
              <Mountain className="w-10 h-10 text-gray-400" />
            ) : (
              <Plane className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <h3 className="text-xl font-bold mb-2">Aucun voyage</h3>
          <p className="text-gray-600 mb-6">
            Commence à planifier ta prochaine aventure !
          </p>
          <button onClick={() => setShowCreateModal(true)} className="btn-duo-primary">
            Créer mon premier voyage
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTrips.map(trip => (
            <div
              key={trip.id}
              onClick={() => onSelectTrip(trip.id)}
              className="card-duo cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(trip.type)}
                  <h3 className="text-xl font-bold">{trip.name}</h3>
                </div>
                {getStatusBadge(trip.status)}
              </div>

              {trip.description && (
                <p className="text-gray-600 mb-3 line-clamp-2">{trip.description}</p>
              )}

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(trip.start_date), 'd MMM')} - {format(new Date(trip.end_date), 'd MMM yyyy')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create trip modal */}
      {showCreateModal && (
        <CreateTripModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            loadTrips()
          }}
        />
      )}
    </div>
  )
}
