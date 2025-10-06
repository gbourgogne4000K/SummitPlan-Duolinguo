import { useState } from 'react'
import { Mountain, Plane, Package, TrendingUp, DollarSign, MapPin, Calendar, Home } from 'lucide-react'
import TripsList from './components/TripsList'
import TripDetail from './components/TripDetail'

type View = 'home' | 'trips' | 'trip-detail'

function App() {
  const [currentView, setCurrentView] = useState<View>('home')
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null)

  const handleSelectTrip = (tripId: string) => {
    setSelectedTripId(tripId)
    setCurrentView('trip-detail')
  }

  const handleBackToTrips = () => {
    setCurrentView('trips')
    setSelectedTripId(null)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedTripId(null)
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white border-b-4 border-duo-blue sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="w-8 h-8 text-duo-blue" />
              <h1 className="text-2xl font-bold text-duo-blue">SummitPlan</h1>
            </div>
            {currentView !== 'home' && (
              <button onClick={handleBackToHome} className="btn-duo-outline !py-2 !px-4 text-sm">
                <Home className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {currentView === 'home' && (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="card-duo bg-gradient-to-br from-duo-blue to-blue-600 text-white border-0 shadow-xl">
              <h2 className="text-3xl font-bold mb-2">Planifie tes aventures ! 🏔️</h2>
              <p className="text-blue-100 mb-6">
                Organise tes voyages, ascensions, matériel et budget en un seul endroit
              </p>
              <button
                onClick={() => setCurrentView('trips')}
                className="btn-duo bg-white text-duo-blue border-b-4 border-gray-300 hover:bg-gray-100"
              >
                Voir mes voyages
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-duo text-center">
                <div className="w-12 h-12 bg-duo-green rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mountain className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-1">Ascensions</h3>
                <p className="text-sm text-gray-600">Gère tes sommets et altitudes</p>
              </div>

              <div className="card-duo text-center">
                <div className="w-12 h-12 bg-duo-blue rounded-full flex items-center justify-center mx-auto mb-3">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-1">Transports</h3>
                <p className="text-sm text-gray-600">Billets avion, train, bus</p>
              </div>

              <div className="card-duo text-center">
                <div className="w-12 h-12 bg-duo-yellow rounded-full flex items-center justify-center mx-auto mb-3">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-1">Matériel</h3>
                <p className="text-sm text-gray-600">Liste et poids des bagages</p>
              </div>

              <div className="card-duo text-center">
                <div className="w-12 h-12 bg-duo-purple rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-1">Acclimatation</h3>
                <p className="text-sm text-gray-600">Suivi des séances</p>
              </div>

              <div className="card-duo text-center">
                <div className="w-12 h-12 bg-duo-orange rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-1">Dépenses</h3>
                <p className="text-sm text-gray-600">Budget et devises</p>
              </div>

              <div className="card-duo text-center">
                <div className="w-12 h-12 bg-duo-red rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-1">Étapes</h3>
                <p className="text-sm text-gray-600">Jour par jour</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card-duo">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-duo-blue" />
                Statistiques rapides
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-duo-green">0</div>
                  <div className="text-sm text-gray-600">Voyages</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-duo-blue">0</div>
                  <div className="text-sm text-gray-600">Sommets</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-duo-yellow">0m</div>
                  <div className="text-sm text-gray-600">Dénivelé total</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'trips' && (
          <TripsList onSelectTrip={handleSelectTrip} />
        )}

        {currentView === 'trip-detail' && selectedTripId && (
          <TripDetail tripId={selectedTripId} onBack={handleBackToTrips} />
        )}
      </main>
    </div>
  )
}

export default App
