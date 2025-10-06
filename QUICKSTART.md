# ⚡ Démarrage rapide - SummitPlan

## 🎯 En 5 minutes chrono !

### 1️⃣ Installe les dépendances
```bash
npm install
```

### 2️⃣ Configure Supabase

**Option A : Utilise Supabase (recommandé pour la production)**

1. Va sur [supabase.com](https://supabase.com) et crée un compte
2. Crée un nouveau projet
3. Dans le SQL Editor, copie-colle le contenu de `SUPABASE_SCHEMA.sql`
4. Crée un fichier `.env` :
```bash
VITE_SUPABASE_URL=https://ton-projet.supabase.co
VITE_SUPABASE_ANON_KEY=ta-clé-ici
```

**Option B : Mode développement sans Supabase**

Pour tester rapidement sans configurer Supabase, tu peux modifier temporairement le code pour utiliser le localStorage :

1. Crée un fichier `.env` avec des valeurs vides :
```bash
VITE_SUPABASE_URL=http://localhost
VITE_SUPABASE_ANON_KEY=demo
```

2. Les données seront stockées localement (elles seront perdues en actualisant)

### 3️⃣ Lance l'app
```bash
npm run dev
```

🎉 Ouvre [http://localhost:3000](http://localhost:3000)

## 🧪 Test rapide

1. Clique sur "Voir mes voyages"
2. Clique sur "Nouveau"
3. Choisis "Ascension" ou "Voyage"
4. Remplis le formulaire
5. Explore toutes les fonctionnalités !

## 📦 Pour utiliser sur Bolt.new

1. Va sur [bolt.new](https://bolt.new)
2. Copie tous les fichiers de ce projet
3. Suis les instructions dans `BOLT_INSTRUCTIONS.md`

## 🆘 Besoin d'aide ?

- Consulte le `README.md` pour la documentation complète
- Vérifie `BOLT_INSTRUCTIONS.md` pour l'utilisation sur Bolt
- Les erreurs Supabase ? Vérifie que les variables d'environnement sont bien configurées

---

Bon voyage ! 🏔️
