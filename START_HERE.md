# 🎯 COMMENCE ICI - SummitPlan

> 👋 Bienvenue ! Ce fichier est ton point de départ pour utiliser SummitPlan.

## 🏔️ C'est quoi SummitPlan ?

Une **application web mobile** avec un design inspiré de **Duolingo** pour gérer **tous les aspects** de tes voyages et ascensions en montagne :

- ⛰️ Sommets et altitudes
- 📍 Itinéraire jour par jour
- 🎒 Matériel et poids des bagages
- 💪 Suivi acclimatation
- ✈️ Billets de transport
- 💰 Budget multi-devises
- 📍 Coordonnées GPS de tous les lieux

## ⚡ Démarrage ultra-rapide (5 minutes)

### Option A : Test local

```bash
# 1. Installe les dépendances
npm install

# 2. Crée un fichier .env
cp .env.example .env

# 3. Lance l'app (elle fonctionnera sans Supabase pour le design)
npm run dev
```

**Limite** : Sans Supabase, les données ne seront pas sauvegardées.

### Option B : Avec Supabase (recommandé)

```bash
# 1. Installe les dépendances
npm install

# 2. Va sur supabase.com et crée un projet (2 min)

# 3. Exécute SUPABASE_SCHEMA.sql dans le SQL Editor

# 4. Crée un fichier .env avec tes credentials
VITE_SUPABASE_URL=https://ton-projet.supabase.co
VITE_SUPABASE_ANON_KEY=ta-cle-ici

# 5. Lance l'app
npm run dev
```

**Avantage** : Données persistantes, multi-device.

### Option C : Sur Bolt.new (le plus simple !)

1. Va sur [bolt.new](https://bolt.new)
2. Copie tous les fichiers de ce dossier
3. Suis le guide **[BOLT_INSTRUCTIONS.md](BOLT_INSTRUCTIONS.md)**

**Avantage** : Pas d'installation locale, tout dans le navigateur !

## 📚 Documentation

| Je veux... | Lire ce fichier |
|------------|-----------------|
| 🚀 Démarrer en 5 minutes | **[QUICKSTART.md](QUICKSTART.md)** |
| 📖 Comprendre le projet en détail | **[README.md](README.md)** |
| ⚡ Utiliser sur Bolt.new | **[BOLT_INSTRUCTIONS.md](BOLT_INSTRUCTIONS.md)** |
| ✨ Voir toutes les fonctionnalités | **[FEATURES.md](FEATURES.md)** |
| 🎨 Personnaliser le design | **[DESIGN_GUIDE.md](DESIGN_GUIDE.md)** |
| 🗄️ Comprendre la base de données | **[SUPABASE_SCHEMA.sql](SUPABASE_SCHEMA.sql)** |
| 🧪 Tester avec des données | **[SAMPLE_DATA.sql](SAMPLE_DATA.sql)** |
| 📂 Naviguer le code | **[FILES_LIST.md](FILES_LIST.md)** |
| 🗺️ Vue d'ensemble | **[INDEX.md](INDEX.md)** |

## 🎯 Scénario d'utilisation

### Exemple : Préparer l'ascension du Mont Blanc

1. **Crée ton voyage**
   - Clique sur "Nouveau"
   - Choisis "Ascension"
   - Nomme-le "Mont Blanc 2024"
   - Dates : 15-20 juillet

2. **Ajoute le sommet**
   - Onglet "Sommets"
   - Mont Blanc, 4808m
   - Coordonnées GPS
   - Date prévue : 19 juillet

3. **Planifie tes étapes**
   - Onglet "Étapes"
   - Jour 1 : Les Houches (1000m)
   - Jour 2 : Refuge Tête Rousse (3167m)
   - Jour 3-4 : Refuge du Goûter (3817m)
   - Jour 5 : Sommet + redescente !

4. **Liste ton matériel**
   - Onglet "Matériel"
   - Piolet, crampons, baudrier...
   - Indique le poids de chaque article
   - Répartis dans sac à dos/valise
   - Coche au fur et à mesure

5. **Acclimatation**
   - Onglet "Acclimatation"
   - Ajoute tes séances en tente hypoxique
   - Suivi des heures et altitudes simulées

6. **Réserve tes transports**
   - Onglet "Transport"
   - Avion Paris → Genève
   - Bus Genève → Chamonix
   - Ordre automatique

7. **Track ton budget**
   - Onglet "Dépenses"
   - Vols, refuges, nourriture
   - Multi-devises (EUR, CHF...)
   - Conversion automatique

## ✅ Vérification rapide

Tout fonctionne si :
- ✅ L'app s'ouvre sur `http://localhost:3000`
- ✅ Tu vois l'écran d'accueil avec les features
- ✅ Tu peux cliquer sur "Voir mes voyages"
- ✅ Tu peux créer un nouveau voyage

Si ça ne marche pas :
1. Vérifie la console du navigateur (F12)
2. Vérifie que `npm install` a réussi
3. Regarde **[BOLT_INSTRUCTIONS.md](BOLT_INSTRUCTIONS.md)** section "Problèmes fréquents"

## 🎨 Aperçu du design

```
┌─────────────────────────────────┐
│  🏔️ SummitPlan          [Home] │ ← Header bleu
├─────────────────────────────────┤
│                                 │
│  Planifie tes aventures ! 🏔️   │ ← Hero card
│  ┌───────────────────────────┐ │   gradient bleu
│  │ [Voir mes voyages]        │ │
│  └───────────────────────────┘ │
│                                 │
│  ┌─────┐ ┌─────┐ ┌─────┐      │
│  │ 🏔️  │ │ ✈️  │ │ 🎒  │      │ ← Feature cards
│  │Asc. │ │Tran.│ │Mat. │      │   colorées
│  └─────┘ └─────┘ └─────┘      │
│                                 │
│  Stats rapides                  │
│  ┌─────────────────────────┐   │
│  │  0    │  0   │   0m    │   │ ← Stats
│  │Voyages│Somm. │Dénivelé │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

Design **Duolingo** : Couleurs vives, boutons 3D, animations fun !

## 🚀 Prochaines étapes

1. ✅ **Fais tourner l'app** (5 min)
2. 📖 **Lis le README** pour comprendre (10 min)
3. 🧪 **Teste les fonctionnalités** (15 min)
4. 🎨 **Personnalise les couleurs** si tu veux
5. 🚀 **Utilise-la pour ton prochain voyage !**

## 🎁 Bonus

### Données d'exemple
Pour tester rapidement avec des données réalistes :
1. Configure Supabase
2. Exécute **[SAMPLE_DATA.sql](SAMPLE_DATA.sql)**
3. Tu auras 3 voyages d'exemple :
   - Ascension Mont Blanc
   - Voyage au Japon
   - Trek Everest Base Camp

### Personnalisation rapide
Change les couleurs dans `tailwind.config.js` :
```js
colors: {
  'duo-green': '#58CC02',  // ← Change ça
  'duo-blue': '#1CB0F6',   // ← Et ça
}
```

## 💡 Astuce pro

**Mobile-first** : L'app est optimisée pour mobile. Teste-la sur ton téléphone (ouvre http://ton-ip-locale:3000) ou avec les DevTools (F12 → Toggle device toolbar).

## 🎯 En résumé

| Plateforme | Temps setup | Complexité | Recommandé pour |
|------------|-------------|------------|-----------------|
| **Bolt.new** | 5 min | ⭐ Facile | Tester rapidement |
| **Local** | 10 min | ⭐⭐ Moyen | Développement |
| **Local + Supabase** | 15 min | ⭐⭐⭐ Expert | Production |

## 📞 Aide

Bloqué ? Check dans l'ordre :
1. Console navigateur (F12)
2. **[BOLT_INSTRUCTIONS.md](BOLT_INSTRUCTIONS.md)** - Section troubleshooting
3. **[README.md](README.md)** - Doc complète

## 🎉 C'est parti !

Tu es prêt ! Lance cette commande et commence l'aventure :

```bash
npm run dev
```

Puis ouvre [http://localhost:3000](http://localhost:3000) 🚀

---

**Bon voyage et bonnes ascensions !** 🏔️✨

[→ Lire le guide complet (README.md)](README.md)
[→ Démarrage rapide (QUICKSTART.md)](QUICKSTART.md)
[→ Pour Bolt.new (BOLT_INSTRUCTIONS.md)](BOLT_INSTRUCTIONS.md)
