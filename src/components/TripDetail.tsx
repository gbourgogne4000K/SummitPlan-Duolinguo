import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Mountain,
  Package,
  TrendingUp,
  Plane,
  DollarSign,
  MapPin,
  Calendar,
  MoreVertical,
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import SummitsTab from './tabs/SummitsTab'
import EquipmentTab from './tabs/EquipmentTab'
import AcclimatizationTab from './tabs/AcclimatizationTab'
import TransportTab from './tabs/TransportTab'
import ExpensesTab from './tabs/ExpensesTab'
import StagesTab from './tabs/StagesTab'

interface Trip {
  id: string
  name: string
  type: 'voyage' | 'ascension'
  start_date: string
  end_date: string
  status: 'planification' | 'en_cours' | 'termine'
  description: string | null
}

interface TripDetailProps {
  tripId: string
  onBack: () => void
}

type Tab = 'summits' | 'stages' | 'equipment' | 'acclimatization' | 'transport' | 'expenses'

export default function TripDetail({ tripId, onBack }: TripDetailProps) {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('stages')

  useEffect(() => {
    loadTrip()
  }, [tripId])

  const loadTrip = async () => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single()

      if (error) throw error
      setTrip(data)
      // Set default tab based on trip type
      if (data.type === 'ascension') {
        setActiveTab('summits')
      }
    } catch (error) {
      console.error('Error loading trip:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-duo-blue border-t-transparent"></div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Voyage non trouvé</p>
        <button onClick={onBack} className="btn-duo-outline mt-4">
          Retour
        </button>
      </div>
    )
  }

  const tabs = [
    ...(trip.type === 'ascension'
      ? [{ id: 'summits' as Tab, label: 'Sommets', icon: Mountain }]
      : []),
    { id: 'stages' as Tab, label: 'Étapes', icon: MapPin },
    { id: 'equipment' as Tab, label: 'Matériel', icon: Package },
    ...(trip.type === 'ascension'
      ? [{ id: 'acclimatization' as Tab, label: 'Acclimatation', icon: TrendingUp }]
      : []),
    { id: 'transport' as Tab, label: 'Transport', icon: Plane },
    { id: 'expenses' as Tab, label: 'Dépenses', icon: DollarSign },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-duo bg-gradient-to-br from-duo-blue to-blue-600 text-white border-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/90 hover:text-white mb-4 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {trip.type === 'ascension' ? (
                <Mountain className="w-6 h-6" />
              ) : (
                <Plane className="w-6 h-6" />
              )}
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                {trip.type === 'ascension' ? 'Ascension' : 'Voyage'}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{trip.name}</h1>
            {trip.description && (
              <p className="text-blue-100 mb-3">{trip.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(trip.start_date).toLocaleDateString('fr-FR')} -{' '}
                {new Date(trip.end_date).toLocaleDateString('fr-FR')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 pb-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={
                  activeTab === tab.id
                    ? 'btn-duo-primary !py-2 !px-4 text-sm'
                    : 'btn-duo-outline !py-2 !px-4 text-sm'
                }
              >
                <Icon className="w-4 h-4 inline mr-1" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div>
        {activeTab === 'summits' && <SummitsTab tripId={tripId} />}
        {activeTab === 'stages' && <StagesTab tripId={tripId} />}
        {activeTab === 'equipment' && <EquipmentTab tripId={tripId} />}
        {activeTab === 'acclimatization' && <AcclimatizationTab tripId={tripId} />}
        {activeTab === 'transport' && <TransportTab tripId={tripId} />}
        {activeTab === 'expenses' && <ExpensesTab tripId={tripId} />}
      </div>
    </div>
  )
}
