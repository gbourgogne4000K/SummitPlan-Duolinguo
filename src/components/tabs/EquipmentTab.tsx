import { useState, useEffect } from 'react'
import { Plus, Package, Weight, CheckCircle2, Circle, Trash2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Equipment {
  id: string
  name: string
  category: 'vetement' | 'materiel_montagne' | 'camping' | 'electronique' | 'autre'
  weight_grams: number | null
  luggage: 'sac_a_dos' | 'valise' | 'bagage_main' | null
  packed: boolean
  notes: string | null
}

interface EquipmentTabProps {
  tripId: string
}

const CATEGORIES = [
  { value: 'vetement', label: 'Vêtement', color: 'bg-duo-blue' },
  { value: 'materiel_montagne', label: 'Matériel montagne', color: 'bg-duo-green' },
  { value: 'camping', label: 'Camping', color: 'bg-duo-orange' },
  { value: 'electronique', label: 'Électronique', color: 'bg-duo-purple' },
  { value: 'autre', label: 'Autre', color: 'bg-duo-gray' },
]

const LUGGAGE_TYPES = [
  { value: 'sac_a_dos', label: 'Sac à dos' },
  { value: 'valise', label: 'Valise' },
  { value: 'bagage_main', label: 'Bagage main' },
]

export default function EquipmentTab({ tripId }: EquipmentTabProps) {
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [filterLuggage, setFilterLuggage] = useState<string>('all')
  const [formData, setFormData] = useState({
    name: '',
    category: 'vetement' as Equipment['category'],
    weight_grams: '',
    luggage: 'sac_a_dos' as Equipment['luggage'],
    notes: '',
  })

  useEffect(() => {
    loadEquipment()
  }, [tripId])

  const loadEquipment = async () => {
    try {
      const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('trip_id', tripId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setEquipment(data || [])
    } catch (error) {
      console.error('Error loading equipment:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('equipment').insert([
        {
          trip_id: tripId,
          name: formData.name,
          category: formData.category,
          weight_grams: formData.weight_grams ? parseInt(formData.weight_grams) : null,
          luggage: formData.luggage,
          packed: false,
          notes: formData.notes || null,
        },
      ])

      if (error) throw error
      setFormData({
        name: '',
        category: 'vetement',
        weight_grams: '',
        luggage: 'sac_a_dos',
        notes: '',
      })
      setShowForm(false)
      loadEquipment()
    } catch (error) {
      console.error('Error adding equipment:', error)
      alert('Erreur lors de l\'ajout du matériel')
    }
  }

  const togglePacked = async (id: string, currentPacked: boolean) => {
    try {
      const { error } = await supabase
        .from('equipment')
        .update({ packed: !currentPacked })
        .eq('id', id)

      if (error) throw error
      loadEquipment()
    } catch (error) {
      console.error('Error updating equipment:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet équipement ?')) return

    try {
      const { error } = await supabase.from('equipment').delete().eq('id', id)
      if (error) throw error
      loadEquipment()
    } catch (error) {
      console.error('Error deleting equipment:', error)
    }
  }

  const filteredEquipment = equipment.filter(item =>
    filterLuggage === 'all' ? true : item.luggage === filterLuggage
  )

  const totalWeight = filteredEquipment.reduce(
    (sum, item) => sum + (item.weight_grams || 0),
    0
  )

  const packedCount = filteredEquipment.filter(item => item.packed).length

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card-duo text-center">
          <div className="text-2xl font-bold text-duo-blue">{filteredEquipment.length}</div>
          <div className="text-sm text-gray-600">Articles</div>
        </div>
        <div className="card-duo text-center">
          <div className="text-2xl font-bold text-duo-green">{packedCount}</div>
          <div className="text-sm text-gray-600">Emballés</div>
        </div>
        <div className="card-duo text-center">
          <div className="text-2xl font-bold text-duo-orange">
            {(totalWeight / 1000).toFixed(1)}kg
          </div>
          <div className="text-sm text-gray-600">Poids</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterLuggage('all')}
          className={filterLuggage === 'all' ? 'btn-duo-primary !py-2 !px-4 text-sm' : 'btn-duo-outline !py-2 !px-4 text-sm'}
        >
          Tout
        </button>
        {LUGGAGE_TYPES.map(type => (
          <button
            key={type.value}
            onClick={() => setFilterLuggage(type.value)}
            className={filterLuggage === type.value ? 'btn-duo-secondary !py-2 !px-4 text-sm' : 'btn-duo-outline !py-2 !px-4 text-sm'}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Add button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn-duo-primary w-full">
          <Plus className="w-5 h-5 inline mr-1" />
          Ajouter du matériel
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="card-duo">
          <h3 className="text-xl font-bold mb-4">Nouveau matériel</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Nom</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Veste Gore-Tex"
                className="input-duo"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Catégorie</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Equipment['category'] })}
                className="input-duo"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2">Poids (g)</label>
                <input
                  type="number"
                  value={formData.weight_grams}
                  onChange={(e) => setFormData({ ...formData, weight_grams: e.target.value })}
                  placeholder="500"
                  className="input-duo"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Bagage</label>
                <select
                  value={formData.luggage || ''}
                  onChange={(e) => setFormData({ ...formData, luggage: e.target.value as Equipment['luggage'] })}
                  className="input-duo"
                >
                  {LUGGAGE_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">Notes</label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Taille, couleur, marque..."
                className="input-duo"
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

      {/* Equipment list */}
      {filteredEquipment.length === 0 ? (
        !showForm && (
          <div className="card-duo text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">Aucun équipement</h3>
            <p className="text-gray-600">Crée ta liste de matériel !</p>
          </div>
        )
      ) : (
        <div className="space-y-2">
          {filteredEquipment.map((item) => {
            const category = CATEGORIES.find(c => c.value === item.category)
            return (
              <div
                key={item.id}
                className={`card-duo !p-4 flex items-center gap-3 ${item.packed ? 'bg-green-50' : ''}`}
              >
                <button
                  onClick={() => togglePacked(item.id, item.packed)}
                  className="flex-shrink-0"
                >
                  {item.packed ? (
                    <CheckCircle2 className="w-6 h-6 text-duo-green" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <h4 className={`font-bold ${item.packed ? 'line-through text-gray-500' : ''}`}>
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`badge-duo text-xs ${category?.color} text-white`}>
                      {category?.label}
                    </span>
                    {item.weight_grams && (
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <Weight className="w-3 h-3" />
                        {item.weight_grams}g
                      </span>
                    )}
                    {item.luggage && (
                      <span className="text-xs text-gray-600">
                        {LUGGAGE_TYPES.find(t => t.value === item.luggage)?.label}
                      </span>
                    )}
                  </div>
                  {item.notes && (
                    <p className="text-xs text-gray-600 mt-1">{item.notes}</p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-shrink-0 text-duo-red hover:bg-red-50 p-2 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
