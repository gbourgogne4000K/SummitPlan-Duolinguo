# 🚀 Instructions pour Bolt.new

## Comment importer ce projet dans Bolt.new

### Méthode 1 : Import direct (recommandé)

1. Va sur [bolt.new](https://bolt.new)
2. Crée un nouveau projet
3. Copie-colle le contenu de chaque fichier dans l'éditeur Bolt
4. Suis les étapes de configuration ci-dessous

### Méthode 2 : Via GitHub

1. Push ce projet sur GitHub
2. Sur Bolt.new, utilise l'option "Import from GitHub"
3. Suis les étapes de configuration ci-dessous

## 📋 Configuration Supabase dans Bolt

1. **Crée ton projet Supabase**
   - Va sur [supabase.com](https://supabase.com)
   - Crée un nouveau projet (gratuit)
   - Attends que le projet soit initialisé (2-3 minutes)

2. **Configure la base de données**
   - Dans Supabase, va dans "SQL Editor"
   - Clique sur "New Query"
   - Copie-colle le contenu du fichier `SUPABASE_SCHEMA.sql`
   - Clique sur "Run" pour exécuter le script

3. **Récupère tes credentials**
   - Va dans "Project Settings" (icône ⚙️)
   - Section "API"
   - Copie :
     - `Project URL` → c'est ton `VITE_SUPABASE_URL`
     - `anon public` key → c'est ton `VITE_SUPABASE_ANON_KEY`

4. **Configure les variables d'environnement dans Bolt**
   - Dans Bolt.new, va dans les paramètres du projet
   - Ajoute les variables d'environnement :
     ```
     VITE_SUPABASE_URL=https://ton-projet.supabase.co
     VITE_SUPABASE_ANON_KEY=ta-clé-anon-ici
     ```

5. **Lance l'application**
   - Bolt devrait automatiquement détecter et installer les dépendances
   - L'application se lancera automatiquement
   - Tu peux maintenant créer tes premiers voyages ! 🎉

## 🔧 Commandes disponibles

Dans le terminal de Bolt :

```bash
# Installer les dépendances (si nécessaire)
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

## ✅ Checklist de vérification

Avant de commencer à utiliser l'app, vérifie que :

- [ ] Le projet Supabase est créé et actif
- [ ] Le schéma SQL a été exécuté sans erreur
- [ ] Les variables d'environnement sont configurées
- [ ] L'application démarre sans erreur
- [ ] Tu peux créer un voyage test

## 🐛 Problèmes fréquents

### "Failed to fetch" ou erreurs Supabase

**Solution** : Vérifie que :
- Les variables d'environnement sont bien configurées
- L'URL Supabase ne contient pas d'espace ou de caractère en trop
- La clé anon est la bonne (pas la clé service_role !)

### Les données ne s'affichent pas

**Solution** :
- Ouvre la console du navigateur (F12)
- Vérifie les erreurs
- Va dans Supabase > Table Editor pour vérifier que les tables existent
- Vérifie que les Row Level Security (RLS) policies sont bien créées

### L'application ne démarre pas

**Solution** :
- Vérifie que tous les fichiers ont été correctement copiés
- Supprime `node_modules` et réinstalle : `npm install`
- Vérifie qu'il n'y a pas d'erreur de syntaxe dans les fichiers

## 🎨 Personnalisation

Tu peux facilement personnaliser :

### Couleurs
Édite `tailwind.config.js` pour changer les couleurs :
```js
colors: {
  'duo-green': '#58CC02',  // Change ces valeurs
  'duo-blue': '#1CB0F6',
  // ...
}
```

### Nom de l'application
Change "SummitPlan" dans :
- `index.html` (balise `<title>`)
- `src/App.tsx` (header)
- `package.json` (nom du package)

### Devises par défaut
Dans `src/components/tabs/ExpensesTab.tsx`, modifie :
```typescript
const COMMON_CURRENCIES = ['EUR', 'USD', ...] // Ajoute tes devises
```

## 🚀 Déploiement

Une fois que tout fonctionne sur Bolt, tu peux déployer sur :

- **Vercel** : Connecte ton repo GitHub à Vercel
- **Netlify** : Drag & drop le dossier `dist/` après `npm run build`
- **Supabase Hosting** : Utilise `supabase deploy`

N'oublie pas de configurer les variables d'environnement sur ta plateforme de déploiement !

---

Besoin d'aide ? Vérifie le fichier README.md pour plus de détails ! 🏔️
