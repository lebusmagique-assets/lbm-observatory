# 📝 Commandes Rapides

Guide de référence rapide pour travailler sur Observatory.

## 🚀 Démarrage

```bash
# Installation initiale
npm install

# Lancer en développement
npm start
# ou
npm run dev

# L'app sera disponible sur : http://localhost:3000/observatory/
```

## 🏗️ Build

```bash
# Build de production
npm run build

# Build propre (supprime dist/ d'abord)
npm run build:clean

# Servir le build en local
npm run serve:dist
# Puis visiter : http://localhost:8000/observatory/
```

## 🧹 Qualité de Code

```bash
# Vérifier le code (ESLint)
npm run lint

# Corriger automatiquement
npm run lint:fix

# Formater le code (Prettier)
npm run format
```

## 🔧 Maintenance

```bash
# Mettre à jour les dépendances
npm update

# Vérifier les dépendances obsolètes
npm outdated

# Nettoyer node_modules et reinstaller
rm -rf node_modules package-lock.json
npm install

# Nettoyer le cache npm
npm cache clean --force
```

## 📦 Gestion des dossiers

```bash
# Supprimer le dossier dist
rm -rf dist

# Supprimer l'ancien dossier build (legacy)
rm -rf build

# Supprimer les deux et rebuild
rm -rf dist build && npm run build
```

## 🐛 Debugging

```bash
# Lancer avec plus de logs
npm start -- --verbose

# Vérifier la taille du bundle
npm run build
ls -lh dist/static/js/

# Analyser les imports (optionnel, nécessite webpack-bundle-analyzer)
# npm install --save-dev webpack-bundle-analyzer
# Ajouter dans webpack.config.js et rebuild
```

## 🔍 Inspection

```bash
# Voir la structure du projet
tree -I 'node_modules|dist|build' -L 3

# Compter les lignes de code
find src -name '*.js' -o -name '*.jsx' | xargs wc -l

# Rechercher dans le code
grep -r "pattern" src/
```

## 🌐 Test de l'API GW2

```bash
# Tester l'API (remplacez VOTRE_CLE)
curl "https://api.guildwars2.com/v2/account?access_token=VOTRE_CLE"

# Tester les personnages
curl "https://api.guildwars2.com/v2/characters?access_token=VOTRE_CLE"

# Tester les quêtes d'un personnage
curl "https://api.guildwars2.com/v2/characters/NOM_PERSONNAGE/quests?access_token=VOTRE_CLE"
```

## 📊 Performances

```bash
# Mesurer la taille du build
du -sh dist/

# Voir les plus gros fichiers
du -ah dist/ | sort -rh | head -20

# Compresser le build pour déploiement
tar -czf observatory-dist.tar.gz dist/
```

## 🔄 Git

```bash
# Status
git status

# Ajouter les changements
git add .

# Commit
git commit -m "feat: description du changement"

# Push
git push origin main

# Créer une nouvelle branche
git checkout -b feature/nouvelle-fonctionnalite

# Voir les branches
git branch -a
```

## 🎯 Raccourcis utiles

```bash
# Tout en une fois : lint + format + build
npm run lint:fix && npm run format && npm run build

# Nettoyer et redémarrer proprement
rm -rf dist node_modules package-lock.json && npm install && npm start

# Build et servir immédiatement
npm run build && npm run serve:dist
```

## 📝 Notes

- Le serveur de dev utilise le **port 3000**
- Le build de production va dans `/dist`
- L'ancien code legacy est dans `/build` (peut être supprimé)
- Le cache localStorage dure **1 heure**
- Le publicPath est `/observatory/` (pour GitHub Pages ou sous-dossier)

## 🆘 Problèmes courants

### Port 3000 déjà utilisé
```bash
# Trouver le processus
lsof -ti:3000

# Le tuer
kill $(lsof -t -i:3000)

# Ou changer le port dans webpack.config.js
```

### Cache problématique
```bash
# Vider le cache du navigateur (Cmd+Shift+R sur Mac)
# Ou utiliser le mode incognito

# Vider le cache npm
npm cache clean --force
```

### Build qui échoue
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Vérifier Node version
node -v  # Devrait être >= 14.x
```

---

**Astuce** : Ajoutez ces commandes à vos alias bash/zsh pour aller plus vite !

```bash
# Dans ~/.bashrc ou ~/.zshrc
alias obs-start="cd ~/observatory && npm start"
alias obs-build="cd ~/observatory && npm run build"
alias obs-clean="cd ~/observatory && rm -rf dist build"
```

