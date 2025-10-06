# 🏔️ SummitPlan

Une application web mobile-first inspirée du design Duolingo pour gérer tes aventures en montagne, voyages et ascensions.

## ✨ Fonctionnalités

### 🎯 Gestion des voyages et ascensions
- Créer et organiser tes voyages et ascensions
- Distinguer clairement entre voyages touristiques et ascensions techniques
- Suivre le statut : planification, en cours, terminé

### ⛰️ Sommets
- Ajouter les sommets à conquérir
- Enregistrer altitude, coordonnées GPS et dates
- Notes et informations sur les voies

### 📍 Étapes quotidiennes
- Planifier ton itinéraire jour par jour
- Enregistrer les lieux, altitudes et coordonnées
- Lister les activités et lieux à visiter

### 🎒 Gestion du matériel
- Organiser ton équipement par catégorie
- Suivre le poids de chaque article
- Répartir entre sac à dos, valise et bagage main
- Cocher les articles emballés

### 💪 Acclimatation
- Suivre tes séances en tente hypoxique
- Enregistrer durée et altitude simulée
- Notes sur ton ressenti

### ✈️ Transports
- Ajouter tous tes billets (avion, train, bus)
- Organisation chronologique
- Références de réservation et horaires

### 💰 Dépenses
- Tracker ton budget jour par jour
- Support multi-devises avec taux de change
- Catégorisation des dépenses
- Vue d'ensemble des dépenses par catégorie

## 🚀 Installation

### Prérequis
- Node.js 18+ installé
- Un compte Supabase (gratuit)

### Étapes

1. **Clone le projet**
```bash
cd SummitPlan-Duolinguo
```

2. **Installe les dépendances**
```bash
npm install
```

3. **Configure Supabase**

   a. Crée un compte sur [supabase.com](https://supabase.com)

   b. Crée un nouveau projet

   c. Dans le SQL Editor, exécute le fichier `SUPABASE_SCHEMA.sql` pour créer les tables

   d. Récupère tes credentials :
      - Va dans Project Settings > API
      - Copie l'URL du projet et la clé `anon/public`

4. **Configure les variables d'environnement**
```bash
cp .env.example .env
```

Édite le fichier `.env` et ajoute tes credentials Supabase :
```
VITE_SUPABASE_URL=ton_url_supabase
VITE_SUPABASE_ANON_KEY=ta_clé_anon_supabase
```

5. **Lance l'application**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📦 Build pour production

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.

## 🎨 Design

L'application utilise un design inspiré de Duolingo avec :
- Couleurs vives et encourageantes
- Cartes arrondies avec ombres
- Boutons avec effet 3D
- Interface mobile-first responsive
- Badges et indicateurs visuels

### Palette de couleurs
- 🟢 Vert (`duo-green`): Actions principales, succès
- 🔵 Bleu (`duo-blue`): Navigation, liens
- 🟡 Jaune (`duo-yellow`): Alertes, mise en évidence
- 🟣 Violet (`duo-purple`): Acclimatation
- 🟠 Orange (`duo-orange`): Dépenses, matériel
- 🔴 Rouge (`duo-red`): Suppressions, alertes

## 🛠️ Technologies utilisées

- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Styling utilitaire
- **Supabase** - Backend as a Service (PostgreSQL)
- **Lucide React** - Icônes
- **date-fns** - Manipulation de dates

## 📱 Compatible Bolt.new

Cette application est 100% compatible avec [bolt.new](https://bolt.new) ! Tu peux :

1. Copier tous les fichiers dans un nouveau projet Bolt
2. Configurer les variables d'environnement dans Bolt
3. L'application fonctionnera immédiatement

## 🔐 Authentification

**Note** : Pour simplifier le développement initial, l'authentification n'est pas encore implémentée.

Pour ajouter l'authentification Supabase :

1. Active l'authentification dans ton projet Supabase
2. Utilise `supabase.auth.signUp()` et `supabase.auth.signIn()`
3. Remplace `user_id: '00000000-0000-0000-0000-000000000000'` par `auth.uid()` dans les composants

## 📄 Structure du projet

```
SummitPlan-Duolinguo/
├── src/
│   ├── components/
│   │   ├── tabs/
│   │   │   ├── SummitsTab.tsx
│   │   │   ├── StagesTab.tsx
│   │   │   ├── EquipmentTab.tsx
│   │   │   ├── AcclimatizationTab.tsx
│   │   │   ├── TransportTab.tsx
│   │   │   └── ExpensesTab.tsx
│   │   ├── TripsList.tsx
│   │   ├── TripDetail.tsx
│   │   └── CreateTripModal.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── SUPABASE_SCHEMA.sql
├── package.json
└── README.md
```

## 🤝 Contribution

N'hésite pas à fork ce projet et à l'adapter à tes besoins !

## 📝 License

MIT - Libre d'utilisation

---

Bon voyage et bonnes ascensions ! 🏔️✨
