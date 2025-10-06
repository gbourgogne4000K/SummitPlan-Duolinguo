# 📁 Liste complète des fichiers - SummitPlan

## 📦 Fichiers de configuration

| Fichier | Description |
|---------|-------------|
| `package.json` | Dépendances npm et scripts |
| `vite.config.ts` | Configuration Vite |
| `tsconfig.json` | Configuration TypeScript |
| `tsconfig.node.json` | Configuration TypeScript pour Node |
| `tailwind.config.js` | Configuration Tailwind CSS + couleurs Duolingo |
| `postcss.config.js` | Configuration PostCSS |
| `.gitignore` | Fichiers à ignorer par Git |
| `.env.example` | Exemple de variables d'environnement |

## 🌐 Fichiers web

| Fichier | Description |
|---------|-------------|
| `index.html` | Point d'entrée HTML |

## ⚛️ Code source React

### Racine src/

| Fichier | Description |
|---------|-------------|
| `src/main.tsx` | Point d'entrée React |
| `src/App.tsx` | Composant principal, navigation |
| `src/index.css` | Styles Tailwind + classes custom Duolingo |
| `src/vite-env.d.ts` | Types TypeScript pour Vite |

### Composants principaux (src/components/)

| Fichier | Description |
|---------|-------------|
| `TripsList.tsx` | Liste de tous les voyages avec filtres |
| `TripDetail.tsx` | Page détail d'un voyage avec onglets |
| `CreateTripModal.tsx` | Modal de création voyage/ascension |

### Onglets de fonctionnalités (src/components/tabs/)

| Fichier | Description |
|---------|-------------|
| `SummitsTab.tsx` | Gestion des sommets (ascensions uniquement) |
| `StagesTab.tsx` | Étapes quotidiennes de l'itinéraire |
| `EquipmentTab.tsx` | Matériel, poids, bagages |
| `AcclimatizationTab.tsx` | Séances d'acclimatation hypoxique |
| `TransportTab.tsx` | Billets avion/train/bus chronologiques |
| `ExpensesTab.tsx` | Budget et dépenses multi-devises |

### Configuration backend (src/lib/)

| Fichier | Description |
|---------|-------------|
| `supabase.ts` | Client Supabase + types TypeScript de la DB |

## 🗄️ Base de données

| Fichier | Description |
|---------|-------------|
| `SUPABASE_SCHEMA.sql` | Schéma complet SQL à exécuter dans Supabase |

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| `README.md` | Documentation complète du projet |
| `QUICKSTART.md` | Guide de démarrage rapide (5 minutes) |
| `BOLT_INSTRUCTIONS.md` | Instructions détaillées pour Bolt.new |
| `FEATURES.md` | Liste exhaustive des fonctionnalités |
| `PROJECT_SUMMARY.md` | Résumé technique du projet |
| `FILES_LIST.md` | Ce fichier ! |

## 📊 Structure arborescente complète

```
SummitPlan-Duolinguo/
│
├── 📄 Configuration
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .gitignore
│   └── .env.example
│
├── 🌐 Web
│   └── index.html
│
├── 💾 Base de données
│   └── SUPABASE_SCHEMA.sql
│
├── 📚 Documentation
│   ├── README.md
│   ├── QUICKSTART.md
│   ├── BOLT_INSTRUCTIONS.md
│   ├── FEATURES.md
│   ├── PROJECT_SUMMARY.md
│   └── FILES_LIST.md
│
└── 📁 src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── vite-env.d.ts
    │
    ├── 📁 lib/
    │   └── supabase.ts
    │
    └── 📁 components/
        ├── TripsList.tsx
        ├── TripDetail.tsx
        ├── CreateTripModal.tsx
        │
        └── 📁 tabs/
            ├── SummitsTab.tsx
            ├── StagesTab.tsx
            ├── EquipmentTab.tsx
            ├── AcclimatizationTab.tsx
            ├── TransportTab.tsx
            └── ExpensesTab.tsx
```

## 📊 Statistiques

- **Total de fichiers** : 29 fichiers
- **Fichiers TypeScript/TSX** : 13 fichiers
- **Fichiers de configuration** : 8 fichiers
- **Fichiers documentation** : 6 fichiers
- **Composants React** : 10 composants

## 🎯 Fichiers essentiels pour Bolt.new

Pour importer dans Bolt.new, voici les fichiers **obligatoires** :

### Critiques ⭐⭐⭐
1. `package.json`
2. `vite.config.ts`
3. `tsconfig.json`
4. `tailwind.config.js`
5. `index.html`
6. `src/main.tsx`
7. `src/App.tsx`
8. `src/index.css`
9. Tous les fichiers dans `src/components/`
10. `src/lib/supabase.ts`
11. `SUPABASE_SCHEMA.sql`

### Recommandés ⭐⭐
1. `.env.example`
2. `README.md`
3. `BOLT_INSTRUCTIONS.md`

### Optionnels ⭐
1. `.gitignore`
2. `QUICKSTART.md`
3. `FEATURES.md`
4. Autres fichiers de doc

## 🔄 Ordre de création recommandé pour Bolt.new

1. Configuration : `package.json`, `vite.config.ts`, `tsconfig.json`
2. Styles : `tailwind.config.js`, `postcss.config.js`
3. Base : `index.html`, `src/main.tsx`, `src/index.css`
4. Supabase : `src/lib/supabase.ts`
5. App principale : `src/App.tsx`
6. Composants : `CreateTripModal.tsx`, `TripsList.tsx`, `TripDetail.tsx`
7. Onglets : Les 6 fichiers dans `tabs/`
8. Supabase SQL : Exécuter `SUPABASE_SCHEMA.sql` dans Supabase
9. Config env : Créer `.env` avec tes credentials

---

**Tous les fichiers sont prêts à être utilisés sur Bolt.new !** 🚀
