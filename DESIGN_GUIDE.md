# 🎨 Guide de Design - SummitPlan

## 🌈 Philosophie du design

Le design de SummitPlan s'inspire fortement de **Duolingo** pour créer une expérience :
- **Ludique et encourageante** : Couleurs vives, badges, progression visuelle
- **Claire et lisible** : Typographie simple, hiérarchie visuelle forte
- **Mobile-first** : Optimisé pour smartphone, utilisable en voyage
- **Motivante** : Design qui donne envie de planifier et partir à l'aventure !

## 🎨 Palette de couleurs

### Couleurs principales (inspirées Duolingo)

| Couleur | Code HEX | Usage | Émotion |
|---------|----------|-------|---------|
| 🟢 Vert (duo-green) | `#58CC02` | Actions principales, succès, validation | Énergie, nature, go ! |
| 🔵 Bleu (duo-blue) | `#1CB0F6` | Navigation, liens, informations | Confiance, ciel, aventure |
| 🟡 Jaune (duo-yellow) | `#FFC800` | Alertes douces, mise en avant | Soleil, attention positive |
| 🟣 Violet (duo-purple) | `#CE82FF` | Acclimatation, features premium | Mystère, altitude |
| 🟠 Orange (duo-orange) | `#FF9600` | Dépenses, équipement | Chaleur, matériel |
| 🔴 Rouge (duo-red) | `#FF4B4B` | Suppressions, alertes importantes | Attention, danger |

### Couleurs secondaires

| Couleur | Code HEX | Usage |
|---------|----------|-------|
| Gris (duo-gray) | `#AFAFAF` | Textes secondaires, désactivé |
| Foncé (duo-dark) | `#4B4B4B` | Texte principal |
| Background | `#F7F7F7` | Fond de l'app |
| Blanc | `#FFFFFF` | Cartes, modals |

## 🎯 Composants de base

### Boutons

#### Bouton primaire (vert)
```tsx
<button className="btn-duo-primary">
  Action principale
</button>
```
- Background: Vert `#58CC02`
- Texte: Blanc
- Border-bottom: 4px vert foncé
- Effet: Ombre 3D, pressed au clic
- Usage: Actions principales (Créer, Ajouter, Valider)

#### Bouton secondaire (bleu)
```tsx
<button className="btn-duo-secondary">
  Action secondaire
</button>
```
- Background: Bleu `#1CB0F6`
- Usage: Navigation, filtres actifs

#### Bouton outline
```tsx
<button className="btn-duo-outline">
  Action tertiaire
</button>
```
- Background: Blanc
- Border: 2px bleu
- Usage: Annuler, filtres inactifs

#### Bouton danger (rouge)
```tsx
<button className="btn-duo-danger">
  Supprimer
</button>
```
- Background: Rouge `#FF4B4B`
- Usage: Actions destructives

### Cartes

#### Carte standard
```tsx
<div className="card-duo">
  Contenu
</div>
```
- Background: Blanc
- Border-radius: 1rem (16px)
- Padding: 1.25rem (20px)
- Shadow: Ombre douce
- Border: 2px gris clair
- Hover: Border devient bleue

#### Carte active
```tsx
<div className="card-duo-active">
  Contenu
</div>
```
- Border: Bleue
- Background: Bleu très clair

### Inputs

#### Input standard
```tsx
<input className="input-duo" type="text" />
```
- Border-radius: 1rem
- Border: 2px gris
- Focus: Border bleue, pas d'outline
- Padding: 12px 16px

### Badges

#### Badges colorés
```tsx
<span className="badge-green">Statut</span>
<span className="badge-blue">Info</span>
<span className="badge-yellow">Attention</span>
<span className="badge-purple">Premium</span>
<span className="badge-orange">Highlight</span>
<span className="badge-gray">Neutre</span>
```

## 📐 Espacements

### Système de spacing (Tailwind)
- `gap-2` : 8px - Entre éléments très proches
- `gap-3` : 12px - Entre éléments dans un groupe
- `gap-4` : 16px - Entre groupes
- `gap-6` : 24px - Entre sections

### Padding des cartes
- Mobile : `p-4` ou `p-5` (16-20px)
- Desktop : `p-6` (24px)

## 🔤 Typographie

### Font family
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

### Tailles de texte

| Usage | Classe | Taille |
|-------|--------|--------|
| Titre principal | `text-3xl` | 30px |
| Titre section | `text-2xl` | 24px |
| Titre carte | `text-xl` | 20px |
| Titre petit | `text-lg` | 18px |
| Texte normal | `text-base` | 16px |
| Texte petit | `text-sm` | 14px |
| Texte très petit | `text-xs` | 12px |

### Poids (font-weight)

| Usage | Classe | Poids |
|-------|--------|-------|
| Titres importants | `font-bold` | 700 |
| Titres secondaires | `font-semibold` | 600 |
| Texte normal | (défaut) | 400 |

## 🎭 Effets et animations

### Ombres

#### Ombre Duolingo (3D)
```css
box-shadow: 0 4px 0 0 rgba(0,0,0,0.15)
```
Usage: Boutons

#### Ombre card
```css
box-shadow: 0 2px 4px rgba(0,0,0,0.1)
```
Usage: Cartes

### Transitions
```css
transition: all 0.2s ease
```

### Hover effects
- Cartes : `hover:scale-[1.02]`
- Boutons : `hover:shadow-duo-hover` + changement de couleur
- Links : `hover:underline`

## 📱 Responsive Design

### Breakpoints
- Mobile first : Défaut < 768px
- Tablet : `md:` 768px+
- Desktop : `lg:` 1024px+

### Grilles
```tsx
<div className="grid grid-cols-2 gap-3">    {/* Mobile: 2 colonnes */}
<div className="grid grid-cols-3 gap-4">    {/* Mobile: 3 colonnes */}
<div className="grid md:grid-cols-4 gap-4"> {/* Mobile: 1, Desktop: 4 */}
```

## 🎯 Patterns de design spécifiques

### Header avec gradient
```tsx
<div className="card-duo bg-gradient-to-br from-duo-blue to-blue-600 text-white border-0">
  {/* Contenu */}
</div>
```

### Stats cards
```tsx
<div className="grid grid-cols-3 gap-3">
  <div className="card-duo text-center">
    <div className="text-3xl font-bold text-duo-green">42</div>
    <div className="text-sm text-gray-600">Label</div>
  </div>
</div>
```

### Liste avec checkboxes
```tsx
<div className="flex items-center gap-3">
  <CheckCircle className="w-6 h-6 text-duo-green" />
  <span>Item complété</span>
</div>
```

### Filtres horizontaux scrollables
```tsx
<div className="flex gap-2 overflow-x-auto pb-2">
  <button className="btn-duo-primary !py-2">Filtre 1</button>
  <button className="btn-duo-outline !py-2">Filtre 2</button>
</div>
```

## 🎨 Associations de couleurs par fonctionnalité

| Fonctionnalité | Couleur principale | Icône |
|----------------|-------------------|-------|
| Sommets | 🟢 Vert | Mountain |
| Voyages | 🔵 Bleu | Plane |
| Étapes | 🔴 Rouge | MapPin |
| Matériel | 🟡 Jaune | Package |
| Acclimatation | 🟣 Violet | TrendingUp |
| Transport | 🔵 Bleu | Plane/Train/Bus |
| Dépenses | 🟠 Orange | DollarSign |

## ✨ Micro-interactions

### Loading states
```tsx
<div className="animate-spin rounded-full h-12 w-12 border-4 border-duo-blue border-t-transparent" />
```

### Button pressed effect
```tsx
active:translate-y-1 active:shadow-none
```

### Card hover
```tsx
hover:scale-[1.02] transition-transform
```

## 🎯 Exemples complets

### Modal
```tsx
<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
    <div className="sticky top-0 bg-white border-b-2 border-gray-200 px-6 py-4">
      <h2 className="text-2xl font-bold">Titre</h2>
    </div>
    <div className="p-6">
      {/* Contenu */}
    </div>
  </div>
</div>
```

### Empty state
```tsx
<div className="card-duo text-center py-12">
  <Icon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
  <h3 className="text-xl font-bold mb-2">Titre</h3>
  <p className="text-gray-600 mb-6">Description</p>
  <button className="btn-duo-primary">Action</button>
</div>
```

## 💡 Conseils

### Do ✅
- Utiliser les couleurs Duolingo de manière cohérente
- Espacements généreux (respiration visuelle)
- Animations subtiles et rapides (200ms)
- Boutons gros et facilement cliquables (mobile)
- Feedback visuel immédiat sur les actions

### Don't ❌
- Mélanger trop de couleurs sur un même écran
- Textes trop petits (< 14px pour le contenu)
- Animations lentes ou excessives
- Boutons trop petits (< 44x44px touch target)
- Manquer de contraste texte/background

## 🎨 Inspirations

- **Duolingo** : Couleurs, boutons 3D, badges
- **Strava** : Stats sportives, progression
- **Notion** : Organisation, clarté
- **Apple Design** : Simplicité, spacing

---

**Remember** : Le design doit être fun, clair et encourageant ! 🏔️✨
