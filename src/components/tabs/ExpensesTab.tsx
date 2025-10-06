import { useState, useEffect } from 'react'
import { Plus, DollarSign, Trash2, TrendingUp } from 'lucide-react'
import { supabase } from '../../lib/supabase'

interface Expense {
  id: string
  date: string
  description: string
  amount: number
  currency: string
  category: 'transport' | 'hebergement' | 'nourriture' | 'materiel' | 'activite' | 'autre'
  exchange_rate: number | null
  amount_home_currency: number | null
  notes: string | null
}

interface ExpensesTabProps {
  tripId: string
}

const CATEGORIES = [
  { value: 'transport', label: 'Transport', color: 'bg-duo-blue', emoji: '✈️' },
  { value: 'hebergement', label: 'Hébergement', color: 'bg-duo-purple', emoji: '🏨' },
  { value: 'nourriture', label: 'Nourriture', color: 'bg-duo-orange', emoji: '🍽️' },
  { value: 'materiel', label: 'Matériel', color: 'bg-duo-green', emoji: '⛰️' },
  { value: 'activite', label: 'Activité', color: 'bg-duo-yellow', emoji: '🎫' },
  { value: 'autre', label: 'Autre', color: 'bg-duo-gray', emoji: '📦' },
]

const COMMON_CURRENCIES = ['EUR', 'USD', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'NPR', 'INR', 'THB']

export default function ExpensesTab({ tripId }: ExpensesTabProps) {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [homeCurrency] = useState('EUR')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    currency: 'EUR',
    category: 'nourriture' as Expense['category'],
    exchange_rate: '',
    amount_home_currency: '',
    notes: '',
  })

  useEffect(() => {
    loadExpenses()
  }, [tripId])

  const loadExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('trip_id', tripId)
        .order('date', { ascending: false })

      if (error) throw error
      setExpenses(data || [])
    } catch (error) {
      console.error('Error loading expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.from('expenses').insert([
        {
          trip_id: tripId,
          date: formData.date,
          description: formData.description,
          amount: parseFloat(formData.amount),
          currency: formData.currency,
          category: formData.category,
          exchange_rate: formData.exchange_rate ? parseFloat(formData.exchange_rate) : null,
          amount_home_currency: formData.amount_home_currency ? parseFloat(formData.amount_home_currency) : null,
          notes: formData.notes || null,
        },
      ])

      if (error) throw error
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        amount: '',
        currency: 'EUR',
        category: 'nourriture',
        exchange_rate: '',
        amount_home_currency: '',
        notes: '',
      })
      setShowForm(false)
      loadExpenses()
    } catch (error) {
      console.error('Error adding expense:', error)
      alert('Erreur lors de l\'ajout de la dépense')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette dépense ?')) return

    try {
      const { error } = await supabase.from('expenses').delete().eq('id', id)
      if (error) throw error
      loadExpenses()
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  // Auto-calculate home currency amount when exchange rate or amount changes
  const handleAmountOrRateChange = (field: 'amount' | 'exchange_rate', value: string) => {
    const newFormData = { ...formData, [field]: value }

    if (newFormData.amount && newFormData.exchange_rate) {
      const amount = parseFloat(newFormData.amount)
      const rate = parseFloat(newFormData.exchange_rate)
      if (!isNaN(amount) && !isNaN(rate)) {
        newFormData.amount_home_currency = (amount * rate).toFixed(2)
      }
    }

    setFormData(newFormData)
  }

  const filteredExpenses = expenses.filter(expense =>
    filterCategory === 'all' ? true : expense.category === filterCategory
  )

  const totalInHomeCurrency = filteredExpenses.reduce((sum, expense) => {
    const amount = expense.amount_home_currency || expense.amount
    return sum + amount
  }, 0)

  const expensesByCategory = CATEGORIES.map(cat => {
    const categoryExpenses = filteredExpenses.filter(e => e.category === cat.value)
    const total = categoryExpenses.reduce((sum, e) => sum + (e.amount_home_currency || e.amount), 0)
    return { ...cat, total, count: categoryExpenses.length }
  }).filter(cat => cat.count > 0)

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="card-duo bg-gradient-to-br from-duo-green to-green-600 text-white border-0">
        <div className="text-sm opacity-90 mb-1">Total des dépenses</div>
        <div className="text-4xl font-bold mb-3">
          {totalInHomeCurrency.toFixed(2)} {homeCurrency}
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {expensesByCategory.slice(0, 3).map(cat => (
            <div key={cat.value} className="bg-white/20 rounded-lg p-2">
              <div className="text-xs opacity-90">{cat.label}</div>
              <div className="font-bold">{cat.total.toFixed(0)} {homeCurrency}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilterCategory('all')}
          className={filterCategory === 'all' ? 'btn-duo-primary !py-2 !px-4 text-sm' : 'btn-duo-outline !py-2 !px-4 text-sm'}
        >
          Tout
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setFilterCategory(cat.value)}
            className={filterCategory === cat.value ? 'btn-duo-secondary !py-2 !px-4 text-sm' : 'btn-duo-outline !py-2 !px-4 text-sm'}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Add button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="btn-duo-primary w-full">
          <Plus className="w-5 h-5 inline mr-1" />
          Ajouter une dépense
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="card-duo">
          <h3 className="text-xl font-bold mb-4">Nouvelle dépense</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                <label className="block font-bold mb-2">Catégorie</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Expense['category'] })}
                  className="input-duo"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.emoji} {cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">Description</label>
              <input
                type="text"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ex: Restaurant traditionnel"
                className="input-duo"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2">Montant</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.amount}
                  onChange={(e) => handleAmountOrRateChange('amount', e.target.value)}
                  placeholder="25.50"
                  className="input-duo"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Devise</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="input-duo"
                >
                  {COMMON_CURRENCIES.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
            </div>

            {formData.currency !== homeCurrency && (
              <div className="bg-yellow-50 border-2 border-duo-yellow rounded-2xl p-4">
                <div className="font-bold text-duo-dark mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Conversion en {homeCurrency}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-sm">
                      Taux de change (1 {formData.currency} = ? {homeCurrency})
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      value={formData.exchange_rate}
                      onChange={(e) => handleAmountOrRateChange('exchange_rate', e.target.value)}
                      placeholder="0.92"
                      className="input-duo"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-sm">
                      Montant en {homeCurrency}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.amount_home_currency}
                      onChange={(e) => setFormData({ ...formData, amount_home_currency: e.target.value })}
                      placeholder="23.46"
                      className="input-duo"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block font-bold mb-2">Notes</label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Détails supplémentaires..."
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

      {/* Expenses list */}
      {filteredExpenses.length === 0 ? (
        !showForm && (
          <div className="card-duo text-center py-12">
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold mb-2">Aucune dépense</h3>
            <p className="text-gray-600">Commence à tracker ton budget !</p>
          </div>
        )
      ) : (
        <div className="space-y-2">
          {filteredExpenses.map((expense) => {
            const category = CATEGORIES.find(c => c.value === expense.category)
            return (
              <div key={expense.id} className="card-duo !p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge-duo text-xs ${category?.color} text-white`}>
                        {category?.emoji} {category?.label}
                      </span>
                      <span className="text-xs text-gray-600">
                        {new Date(expense.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <h4 className="font-bold">{expense.description}</h4>
                  </div>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-duo-red hover:bg-red-50 p-2 rounded-lg ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-duo-green">
                      {expense.amount.toFixed(2)} {expense.currency}
                    </div>
                    {expense.amount_home_currency && expense.currency !== homeCurrency && (
                      <div className="text-sm text-gray-600">
                        ≈ {expense.amount_home_currency.toFixed(2)} {homeCurrency}
                        {expense.exchange_rate && (
                          <span className="text-xs"> (taux: {expense.exchange_rate})</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {expense.notes && (
                  <p className="text-sm text-gray-600 mt-2 pt-2 border-t border-gray-200">
                    {expense.notes}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
