# 🚀 Guide de Release

## Comment créer une nouvelle release

### Méthode 1 : Via les tags Git (recommandé)

1. **Assurez-vous que tout est commité**
   ```bash
   git status
   git add .
   git commit -m "chore: prepare release v2.0.0"
   ```

2. **Créez un tag de version**
   ```bash
   git tag v2.0.0
   ```

3. **Poussez le tag vers GitHub**
   ```bash
   git push origin v2.0.0
   ```

4. **La GitHub Action se déclenche automatiquement** 🎉
   - Build du projet
   - Création d'un ZIP `observatory-v2.0.0.zip`
   - Création d'une release GitHub avec le ZIP en asset

### Méthode 2 : Via l'interface GitHub

1. Allez sur votre repository GitHub
2. Cliquez sur "Releases" dans la sidebar
3. Cliquez sur "Draft a new release"
4. Créez un nouveau tag (ex: `v2.0.0`)
5. Remplissez le titre et la description
6. Cliquez sur "Publish release"
7. La GitHub Action se déclenche et attache le ZIP automatiquement

---

## 📋 Workflow de Release

### 1. Préparer le CHANGELOG

Avant de créer une release, mettez à jour `CHANGELOG.md` :

```markdown
## [2.0.0] - 2025-01-08

### ✨ Ajouts
- Ajout du système de cache localStorage
- Ajout de la vue statistiques
- Ajout de la vue par personnage avec filtres
- Ajout de l'export JSON/CSV

### 🐛 Corrections
- Correction du contraste des couleurs (WCAG 2.1 AAA)
- Correction des erreurs 504 avec retry logic
- Correction de l'accessibilité avec ARIA

### ♻️ Refactoring
- Chargement parallèle des personnages
- Extraction du CSS en production
- Amélioration de la structure du projet
```

### 2. Mettre à jour la version

Mettez à jour `package.json` :
```bash
npm version patch   # 2.0.0 -> 2.0.1
npm version minor   # 2.0.0 -> 2.1.0
npm version major   # 2.0.0 -> 3.0.0
```

Cette commande met à jour automatiquement le `package.json` et crée un commit + tag.

### 3. Pousser les changements

```bash
git push origin main
git push origin --tags
```

---

## 🔄 Workflows disponibles

### 1. `release.yml` - Build and Release
**Déclenché par :** Push de tags `v*`

**Actions :**
- ✅ Build du projet
- ✅ Création d'un ZIP du dossier `dist/`
- ✅ Création d'une release GitHub
- ✅ Upload du ZIP comme asset
- ✅ Conservation des artifacts pendant 30 jours

### 2. `build.yml` - Build Check
**Déclenché par :** Push ou PR sur `main`/`develop`

**Actions :**
- ✅ Build du projet pour vérifier qu'il compile
- ✅ Affichage de la taille du build
- ✅ Conservation des artifacts pendant 7 jours

### 3. `lint.yml` - Code Quality
**Déclenché par :** Push ou PR sur `main`/`develop`

**Actions :**
- ✅ Vérification ESLint
- ✅ Vérification Prettier

---

## 📦 Contenu de la release

Chaque release contient :

```
observatory-v2.0.0.zip
├── index.html
└── static/
    ├── css/
    │   └── main.[hash].css
    ├── js/
    │   └── bundle.[hash].js
    └── media/
        └── [images]
```

---

## 🏷️ Convention de nommage des tags

Utilisez le [Semantic Versioning](https://semver.org/) :

- `vX.0.0` : Version majeure (breaking changes)
- `vX.Y.0` : Version mineure (nouvelles fonctionnalités)
- `vX.Y.Z` : Patch (corrections de bugs)

**Exemples :**
- `v1.0.0` : Première release stable
- `v1.1.0` : Ajout de nouvelles fonctionnalités
- `v1.1.1` : Correction de bugs
- `v2.0.0` : Refonte majeure avec breaking changes

---

## 🧪 Tester avant la release

```bash
# Build local
npm run build:clean

# Tester le build
npm run serve:dist

# Vérifier la qualité du code
npm run lint
npm run format

# Ouvrir http://localhost:8000
```

---

## 🔧 Personnaliser la release

Pour modifier le contenu de la release, éditez `.github/workflows/release.yml` :

```yaml
- name: Create GitHub Release
  uses: softprops/action-gh-release@v1
  with:
    name: Release ${{ steps.get_version.outputs.VERSION }}
    body: |
      Votre description personnalisée ici
```

---

## ❓ Troubleshooting

### La GitHub Action échoue

1. Vérifiez les logs dans l'onglet "Actions" de votre repository
2. Assurez-vous que `GITHUB_TOKEN` a les permissions nécessaires
3. Vérifiez que le build fonctionne en local : `npm run build`

### Le ZIP est vide

Vérifiez que le dossier `dist/` est bien créé après le build.

### Le CHANGELOG n'apparaît pas

Assurez-vous que `CHANGELOG.md` existe et respecte le format :
```markdown
## [X.Y.Z] - YYYY-MM-DD
```

---

## 📝 Checklist avant release

- [ ] Tous les tests passent
- [ ] Le CHANGELOG est à jour
- [ ] La version dans `package.json` est correcte
- [ ] Le build local fonctionne (`npm run build`)
- [ ] L'application fonctionne en local (`npm run serve:dist`)
- [ ] Tous les commits sont poussés
- [ ] Le tag est créé et poussé

---

**Bonne release ! 🎉**

