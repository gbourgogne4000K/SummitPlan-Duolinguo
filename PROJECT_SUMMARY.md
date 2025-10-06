# 📋 Résumé du projet SummitPlan

## 🎯 Description

**SummitPlan** est une application web mobile-first avec un design inspiré de Duolingo pour gérer tes aventures en montagne et voyages. Elle permet de planifier, organiser et suivre tous les aspects d'un voyage ou d'une ascension.

## 🏗️ Architecture technique

### Frontend
- **React 18** avec TypeScript
- **Vite** comme build tool
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **date-fns** pour les dates

### Backend
- **Supabase** (PostgreSQL + API REST automatique)
- **Row Level Security** pour la sécurité
- 8 tables relationnelles

### Design
- Style Duolingo : couleurs vives, cartes arrondies, ombres 3D
- Mobile-first responsive
- Palette : Vert (actions), Bleu (navigation), Jaune (alertes), Violet, Orange, Rouge

## 📂 Structure des fichiers

```
SummitPlan-Duolinguo/
├── src/
│   ├── components/
│   │   ├── tabs/              # 6 onglets de fonctionnalités
│   │   ├── TripsList.tsx      # Liste des voyages
│   │   ├── TripDetail.tsx     # Détail d'un voyage
│   │   └── CreateTripModal.tsx
│   ├── lib/
│   │   └── supabase.ts        # Configuration + Types
│   ├── App.tsx                # Composant principal
│   ├── main.tsx
│   └── index.css              # Styles Tailwind
├── SUPABASE_SCHEMA.sql        # Schéma base de données
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── Documentation (README, BOLT_INSTRUCTIONS, etc.)
```

## 🗄️ Schéma de base de données

### Tables principales

1. **trips** - Voyages et ascensions
   - Type (voyage/ascension), dates, statut, description

2. **summits** - Sommets à conquérir (pour ascensions)
   - Nom, altitude, coordonnées GPS, date

3. **daily_stages** - Étapes quotidiennes
   - Jour, lieu, altitude, coordonnées, activités

4. **equipment** - Matériel et bagages
   - Nom, catégorie, poids, type de bagage, emballé

5. **acclimatization_sessions** - Séances d'acclimatation
   - Date, durée, altitude simulée

6. **transport_tickets** - Billets de transport
   - Type (avion/train/bus), départ/arrivée, horaires, ordre

7. **expenses** - Dépenses
   - Montant, devise, taux de change, catégorie

## 🎨 Composants principaux

### App.tsx
- Navigation entre Home, Liste des voyages, Détail
- Header avec logo

### TripsList.tsx
- Affiche tous les voyages
- Filtres (Tous/Voyages/Ascensions)
- Modal de création

### TripDetail.tsx
- Header avec infos du voyage
- Navigation par onglets
- Charge le bon composant selon l'onglet actif

### Onglets (tabs/)
- **SummitsTab** : Gestion des sommets
- **StagesTab** : Étapes quotidiennes
- **EquipmentTab** : Matériel et poids
- **AcclimatizationTab** : Séances hypoxiques
- **TransportTab** : Billets chronologiques
- **ExpensesTab** : Budget multi-devises

## 🔧 Configuration requise

### Variables d'environnement (.env)
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
```

### Dépendances npm
```json
{
  "@supabase/supabase-js": "^2.39.3",
  "date-fns": "^3.0.6",
  "lucide-react": "^0.309.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0"
}
```

## 🚀 Commandes

```bash
npm install      # Installer les dépendances
npm run dev      # Lancer en développement (port 3000)
npm run build    # Build pour production
npm run preview  # Preview du build
```

## ✨ Fonctionnalités clés

### Ce qui est unique
1. **Design ludique** type Duolingo
2. **Spécialisation montagne** (altitude, acclimatation, sommets)
3. **Gestion complète** (matériel + budget + transport + itinéraire)
4. **Suivi du poids** des bagages
5. **Multi-devises** avec conversion
6. **Coordonnées GPS** partout
7. **Ordre chronologique** des transports

### Différenciation Voyages vs Ascensions
- **Voyages** : Pas d'onglet sommets, focus découverte
- **Ascensions** : Onglets sommets + acclimatation

## 🎯 Compatible Bolt.new

✅ 100% compatible bolt.new
✅ Aucune dépendance système
✅ Configuration simple (juste Supabase)
✅ Pas de backend custom
✅ Pas de serveur Node requis

## 📝 Documentation disponible

- **README.md** : Documentation complète
- **BOLT_INSTRUCTIONS.md** : Guide pour Bolt.new
- **QUICKSTART.md** : Démarrage rapide
- **FEATURES.md** : Liste de toutes les fonctionnalités
- **SUPABASE_SCHEMA.sql** : Schéma SQL complet

## 🔒 Sécurité

- Row Level Security (RLS) activé
- Policies par utilisateur
- Variables d'environnement pour les secrets
- Validation côté client et serveur

## 🎨 Personnalisation facile

### Couleurs
Modifier `tailwind.config.js`

### Devises
Modifier `COMMON_CURRENCIES` dans `ExpensesTab.tsx`

### Catégories
Modifier les tableaux `CATEGORIES` dans chaque onglet

## 🐛 Points d'attention

1. **Authentification** : Actuellement simplifiée (user_id hardcodé)
   - À implémenter pour la production
   - Remplacer par `auth.uid()`

2. **Date-fns locale** : Retiré pour compatibilité Bolt
   - Format de date simplifié

3. **Variables env** : Vérifier qu'elles sont bien configurées
   - Erreur courante : espaces dans l'URL

## 🚀 Prochaines étapes possibles

1. Ajouter l'authentification réelle
2. Mode hors-ligne (PWA)
3. Upload de photos
4. Export PDF de l'itinéraire
5. Cartes interactives
6. Import GPX
7. Météo temps réel

---

**Projet créé pour** : Gérer des voyages et ascensions avec style ! 🏔️

**Technologies** : React + TypeScript + Supabase + Tailwind

**Design** : Inspiré de Duolingo (fun, coloré, encourageant)

**Status** : ✅ Prêt à l'emploi sur Bolt.new !
