# 📚 Index - SummitPlan

> Guide de navigation rapide pour tous les fichiers du projet

## 🚀 Pour commencer

Nouveau sur le projet ? Commence par ces fichiers dans cet ordre :

1. **[README.md](README.md)** - Vue d'ensemble complète du projet
2. **[QUICKSTART.md](QUICKSTART.md)** - Démarre en 5 minutes
3. **[BOLT_INSTRUCTIONS.md](BOLT_INSTRUCTIONS.md)** - Guide pour Bolt.new

## 📖 Documentation

### Documentation principale

| Fichier | Description | Quand le lire |
|---------|-------------|---------------|
| **[README.md](README.md)** | Documentation complète | En premier |
| **[QUICKSTART.md](QUICKSTART.md)** | Démarrage rapide | Pour lancer rapidement |
| **[BOLT_INSTRUCTIONS.md](BOLT_INSTRUCTIONS.md)** | Guide Bolt.new | Si tu utilises Bolt |
| **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** | Résumé technique | Pour comprendre l'archi |
| **[FEATURES.md](FEATURES.md)** | Liste des fonctionnalités | Pour voir ce qui existe |
| **[FILES_LIST.md](FILES_LIST.md)** | Liste de tous les fichiers | Pour naviguer le code |
| **[DESIGN_GUIDE.md](DESIGN_GUIDE.md)** | Guide de design | Pour personnaliser le style |
| **[INDEX.md](INDEX.md)** | Ce fichier ! | Pour naviguer la doc |

## 🗄️ Base de données

| Fichier | Description | Utilisation |
|---------|-------------|-------------|
| **[SUPABASE_SCHEMA.sql](SUPABASE_SCHEMA.sql)** | Schéma complet | À exécuter dans Supabase |
| **[SAMPLE_DATA.sql](SAMPLE_DATA.sql)** | Données d'exemple | Pour tester l'app |

## ⚛️ Code source

### Structure
```
src/
├── main.tsx              # Point d'entrée React
├── App.tsx               # Composant principal, navigation
├── index.css             # Styles Tailwind + custom
├── vite-env.d.ts        # Types TypeScript
├── lib/
│   └── supabase.ts      # Config Supabase + Types DB
└── components/
    ├── TripsList.tsx           # Liste voyages
    ├── TripDetail.tsx          # Détail voyage
    ├── CreateTripModal.tsx     # Modal création
    └── tabs/
        ├── SummitsTab.tsx           # 🏔️ Sommets
        ├── StagesTab.tsx            # 📍 Étapes
        ├── EquipmentTab.tsx         # 🎒 Matériel
        ├── AcclimatizationTab.tsx   # 💪 Acclimatation
        ├── TransportTab.tsx         # ✈️ Transport
        └── ExpensesTab.tsx          # 💰 Dépenses
```

### Composants détaillés

#### Composants de page

| Fichier | Responsabilité | État |
|---------|---------------|------|
| `App.tsx` | Navigation, routing simple | ✅ |
| `TripsList.tsx` | Afficher la liste, filtres | ✅ |
| `TripDetail.tsx` | Header voyage + onglets | ✅ |
| `CreateTripModal.tsx` | Formulaire création voyage | ✅ |

#### Onglets de fonctionnalités

| Fichier | Fonctionnalité | Tables utilisées |
|---------|---------------|------------------|
| `SummitsTab.tsx` | Gestion sommets | `summits` |
| `StagesTab.tsx` | Étapes jour par jour | `daily_stages` |
| `EquipmentTab.tsx` | Matériel et bagages | `equipment` |
| `AcclimatizationTab.tsx` | Séances hypoxiques | `acclimatization_sessions` |
| `TransportTab.tsx` | Billets transport | `transport_tickets` |
| `ExpensesTab.tsx` | Budget multi-devises | `expenses` |

## ⚙️ Configuration

| Fichier | Description |
|---------|-------------|
| `package.json` | Dépendances npm |
| `vite.config.ts` | Config Vite |
| `tsconfig.json` | Config TypeScript |
| `tailwind.config.js` | Couleurs Duolingo |
| `postcss.config.js` | Config PostCSS |
| `.env.example` | Template variables env |
| `.gitignore` | Fichiers à ignorer |

## 🎨 Design System

### Couleurs principales
- 🟢 Vert `#58CC02` - Actions, succès
- 🔵 Bleu `#1CB0F6` - Navigation, info
- 🟡 Jaune `#FFC800` - Alertes
- 🟣 Violet `#CE82FF` - Acclimatation
- 🟠 Orange `#FF9600` - Dépenses
- 🔴 Rouge `#FF4B4B` - Danger

### Classes CSS principales
```css
.btn-duo-primary      /* Bouton vert principal */
.btn-duo-secondary    /* Bouton bleu */
.btn-duo-outline      /* Bouton outline */
.card-duo             /* Carte standard */
.input-duo            /* Input standard */
.badge-green/blue/etc /* Badges colorés */
```

Voir **[DESIGN_GUIDE.md](DESIGN_GUIDE.md)** pour plus de détails.

## 🗂️ Tables Supabase

| Table | Description | Champs clés |
|-------|-------------|-------------|
| `trips` | Voyages et ascensions | type, start_date, end_date, status |
| `summits` | Sommets | altitude, coordinates, summit_date |
| `daily_stages` | Étapes | day_number, location, altitude |
| `equipment` | Matériel | category, weight_grams, luggage, packed |
| `acclimatization_sessions` | Acclimatation | duration_hours, altitude_simulated |
| `transport_tickets` | Transport | type, order_number, departure/arrival |
| `expenses` | Dépenses | amount, currency, exchange_rate |

## 🎯 Cas d'usage par persona

### 🧗 Tu es alpiniste
1. Crée une **Ascension** (ex: Mont Blanc)
2. Ajoute le sommet dans l'onglet **Sommets**
3. Planifie tes **Étapes** jour par jour avec altitudes
4. Liste ton **Matériel** avec poids (important !)
5. Suivi **Acclimatation** avant le départ
6. Ajoute tes **Billets** avion/train
7. Track tes **Dépenses**

### 🌍 Tu es voyageur
1. Crée un **Voyage** (ex: Tour du Japon)
2. Planifie tes **Étapes** avec lieux à visiter
3. Organise ton **Matériel** dans valises
4. Ajoute tes **Billets** de transport
5. Track ton **Budget** multi-devises

## 🐛 Troubleshooting rapide

### Problème : App ne démarre pas
→ Vérifie que `npm install` a été fait
→ Vérifie les versions Node.js (18+)

### Problème : Erreurs Supabase
→ Vérifie `.env` (URL et clé correctes)
→ Vérifie que le schéma SQL a été exécuté

### Problème : Les données ne s'affichent pas
→ Ouvre la console (F12)
→ Vérifie les RLS policies dans Supabase
→ Vérifie le `user_id` dans le code

### Problème : Styles cassés
→ Vérifie que Tailwind est bien configuré
→ Relance `npm run dev`

## 📚 Ressources externes

### Technologies utilisées
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Lucide Icons](https://lucide.dev)
- [date-fns Docs](https://date-fns.org)

### Inspirations design
- [Duolingo](https://duolingo.com) - Interface ludique
- [Strava](https://strava.com) - Stats sportives
- [Notion](https://notion.so) - Organisation

## 🎯 Checklist de déploiement

Avant de déployer en production :

- [ ] Remplacer le `user_id` hardcodé par vraie auth
- [ ] Configurer les variables d'environnement sur la plateforme
- [ ] Tester sur mobile réel
- [ ] Vérifier les RLS policies Supabase
- [ ] Optimiser les images (si ajoutées)
- [ ] Tester le build : `npm run build`
- [ ] Configurer un domaine custom
- [ ] Activer HTTPS

## 🚀 Commandes utiles

```bash
# Développement
npm install          # Installer les dépendances
npm run dev          # Lancer en dev (port 3000)

# Build
npm run build        # Build pour production
npm run preview      # Preview du build

# Supabase (si CLI installé)
supabase start       # DB locale
supabase db push     # Push migrations
```

## 📞 Support

Des questions ? Vérifie :
1. **[README.md](README.md)** - Doc principale
2. **[BOLT_INSTRUCTIONS.md](BOLT_INSTRUCTIONS.md)** - Guide Bolt
3. **[FEATURES.md](FEATURES.md)** - Liste des features
4. Console navigateur (F12) - Erreurs

## 🎉 Quick Links

- 🚀 **Démarrage rapide** : [QUICKSTART.md](QUICKSTART.md)
- 🎨 **Design** : [DESIGN_GUIDE.md](DESIGN_GUIDE.md)
- 🗄️ **Base de données** : [SUPABASE_SCHEMA.sql](SUPABASE_SCHEMA.sql)
- 📦 **Données test** : [SAMPLE_DATA.sql](SAMPLE_DATA.sql)
- ⚡ **Bolt.new** : [BOLT_INSTRUCTIONS.md](BOLT_INSTRUCTIONS.md)

---

**SummitPlan** - Planifie tes aventures avec style ! 🏔️

Version 1.0 - Compatible Bolt.new ✅
