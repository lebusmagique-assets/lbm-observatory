# 🤖 Configuration GitHub Actions

Ce document explique comment configurer et utiliser les GitHub Actions pour votre projet Observatory.

---

## 📁 Fichiers créés

```
.github/
├── workflows/
│   ├── release.yml      # Build + Release automatique sur les tags
│   ├── build.yml        # Vérification du build sur PR/push
│   └── lint.yml         # Vérification qualité du code
├── RELEASE.md           # Guide complet pour créer des releases
└── BADGES.md            # Badges à ajouter au README
```

---

## 🚀 Utilisation rapide

### Créer une release

```bash
# 1. Préparez votre release
git add .
git commit -m "feat: new awesome feature"

# 2. Créez un tag de version
git tag v2.0.0

# 3. Poussez le tag
git push origin v2.0.0
```

✨ **La GitHub Action se déclenche automatiquement !**

Elle va :
1. ✅ Builder le projet (`npm run build`)
2. ✅ Créer un ZIP `observatory-v2.0.0.zip` du dossier `dist/`
3. ✅ Créer une release GitHub avec ce ZIP en asset
4. ✅ Générer les notes de release depuis `CHANGELOG.md`

---

## 🔧 Configuration requise

### 1. Pousser les workflows sur GitHub

```bash
git add .github/
git commit -m "ci: add GitHub Actions workflows"
git push origin main
```

### 2. Vérifier les permissions

Allez dans les paramètres de votre repository GitHub :

1. **Settings** → **Actions** → **General**
2. Sous "Workflow permissions", sélectionnez :
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
3. Cliquez sur **Save**

### 3. Activer les workflows

Les workflows sont automatiquement activés après le push. Vous pouvez les voir dans l'onglet **Actions** de votre repository.

---

## 📋 Workflows détaillés

### 1. 🚀 `release.yml` - Build and Release

**Déclenché par :** Push de tags `v*` (ex: `v1.0.0`, `v2.1.3`)

**Actions effectuées :**
1. Checkout du code
2. Installation de Node.js 18
3. Installation des dépendances (`npm ci`)
4. Build du projet (`npm run build`)
5. Création d'un ZIP du dossier `dist/`
6. Création d'une release GitHub
7. Upload du ZIP comme asset de la release
8. Génération automatique des notes de release depuis `CHANGELOG.md`

**Artifacts :**
- ZIP de production disponible dans la release
- Artifacts de build conservés 30 jours

### 2. 🔨 `build.yml` - Build Check

**Déclenché par :** Push ou Pull Request sur `main` ou `develop`

**Actions effectuées :**
1. Vérification que le projet build correctement
2. Affichage de la taille du build
3. Upload des artifacts (conservés 7 jours)

**Utilité :**
- Détecte les erreurs de build avant le merge
- Permet de voir la taille du build dans les PRs

### 3. ✨ `lint.yml` - Code Quality

**Déclenché par :** Push ou Pull Request sur `main` ou `develop`

**Actions effectuées :**
1. Vérification ESLint
2. Vérification Prettier

**Utilité :**
- Maintient la qualité du code
- Assure un formatage cohérent

---

## 📦 Contenu de la release

Chaque release GitHub contient :

### 1. Assets téléchargeables
- `observatory-v2.0.0.zip` : Build de production prêt à déployer
- Source code (zip)
- Source code (tar.gz)

### 2. Notes de release automatiques
```markdown
## 🚀 Observatory - v2.0.0

Guild Wars 2 Quest Tracker

### 📦 Installation
1. Téléchargez le fichier observatory-v2.0.0.zip
2. Extrayez le contenu
3. Servez les fichiers avec un serveur web
4. Accédez à index.html

### ✨ Nouveautés
[Extrait du CHANGELOG.md]

### 📊 Build Info
- Node.js: 18
- Build date: 2025-01-08
- Commit: abc123
```

---

## 🧪 Tester localement avant release

```bash
# 1. Build local
npm run build:clean

# 2. Tester le build
npm run serve:dist
# Ouvrir http://localhost:8000

# 3. Créer un ZIP test
cd dist && zip -r ../observatory-test.zip . && cd ..

# 4. Vérifier le contenu du ZIP
unzip -l observatory-test.zip
```

---

## 🏷️ Convention de versioning

Utilisez [Semantic Versioning](https://semver.org/) :

```
vMAJEUR.MINEUR.PATCH

v2.0.0
│ │ │
│ │ └─ PATCH: Corrections de bugs (backward compatible)
│ └─── MINEUR: Nouvelles fonctionnalités (backward compatible)
└───── MAJEUR: Breaking changes
```

**Exemples :**
- `v1.0.0` → `v1.0.1` : Fix d'un bug
- `v1.0.0` → `v1.1.0` : Ajout d'une fonctionnalité
- `v1.0.0` → `v2.0.0` : Refonte majeure

---

## 🔍 Monitoring et debugging

### Voir les logs d'exécution

1. Allez dans l'onglet **Actions** de votre repository
2. Cliquez sur un workflow run
3. Développez les steps pour voir les logs détaillés

### Télécharger les artifacts

1. Allez dans l'onglet **Actions**
2. Sélectionnez un workflow run
3. Dans la section "Artifacts", téléchargez le build

### Debug en cas d'échec

Si un workflow échoue :

1. ✅ Vérifiez les logs dans GitHub Actions
2. ✅ Testez le build en local : `npm run build`
3. ✅ Vérifiez que `CHANGELOG.md` existe et est bien formaté
4. ✅ Vérifiez les permissions dans Settings → Actions
5. ✅ Vérifiez que le tag respecte le format `v*`

---

## 📊 Badges GitHub

Ajoutez ces badges dans votre `README.md` pour afficher le statut des workflows :

```markdown
![Build](https://github.com/USERNAME/observatory/actions/workflows/build.yml/badge.svg)
![Release](https://github.com/USERNAME/observatory/actions/workflows/release.yml/badge.svg)
![Version](https://img.shields.io/github/v/release/USERNAME/observatory)
```

Voir [`.github/BADGES.md`](.github/BADGES.md) pour plus de badges.

---

## 🔄 Workflow de développement recommandé

### Feature branches

```bash
# 1. Créer une branche
git checkout -b feature/new-view

# 2. Développer et commiter
git add .
git commit -m "feat: add new character comparison view"

# 3. Pousser et créer une PR
git push origin feature/new-view
```

→ Le workflow `build.yml` et `lint.yml` se déclenchent automatiquement sur la PR

### Merge vers main

```bash
# Après validation de la PR
git checkout main
git merge feature/new-view
git push origin main
```

→ Les workflows `build.yml` et `lint.yml` se déclenchent sur main

### Créer une release

```bash
# 1. Mettre à jour CHANGELOG.md
# 2. Mettre à jour la version
npm version minor  # v2.0.0 → v2.1.0

# 3. Pousser
git push origin main --tags
```

→ Le workflow `release.yml` se déclenche et crée la release

---

## 🛠️ Personnalisation

### Modifier le contenu de la release

Éditez `.github/workflows/release.yml`, section `body:` :

```yaml
body: |
  ## 🚀 Votre titre personnalisé
  
  Votre description
```

### Changer la branche cible

Éditez `.github/workflows/build.yml` et `lint.yml` :

```yaml
on:
  push:
    branches:
      - main
      - develop
      - votre-branche  # ⬅️ Ajoutez ici
```

### Ajouter des étapes

Ajoutez des steps dans les workflows :

```yaml
- name: Votre étape personnalisée
  run: |
    echo "Commandes à exécuter"
    npm run custom-script
```

---

## ✅ Checklist de mise en production

Avant de créer votre première release :

- [ ] Les 3 workflows sont poussés sur GitHub
- [ ] Les permissions GitHub Actions sont configurées
- [ ] `CHANGELOG.md` est à jour
- [ ] La version dans `package.json` est correcte
- [ ] Le build fonctionne en local (`npm run build`)
- [ ] L'application fonctionne (`npm run serve:dist`)
- [ ] Tous les tests passent
- [ ] Le tag est créé (`git tag v2.0.0`)
- [ ] Le tag est poussé (`git push origin v2.0.0`)

---

## 🎉 Première release

```bash
# 1. Vérifier que tout est prêt
npm run build:clean
npm run serve:dist

# 2. Créer le tag
git tag v2.0.0

# 3. Pousser
git push origin v2.0.0

# 4. Attendre 2-3 minutes

# 5. Aller sur GitHub → Releases
# La release v2.0.0 est créée avec le ZIP !
```

---

**Questions ? Consultez [`.github/RELEASE.md`](.github/RELEASE.md) pour plus de détails.**

