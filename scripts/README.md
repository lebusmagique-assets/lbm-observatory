# 🛠️ Scripts

Ce dossier contient des scripts utilitaires pour faciliter le développement et le déploiement.

---

## 🚀 `release.sh`

Script automatisé pour créer des releases.

### Usage

```bash
# Via npm (recommandé)
npm run release:patch   # 2.0.0 → 2.0.1
npm run release:minor   # 2.0.0 → 2.1.0
npm run release:major   # 2.0.0 → 3.0.0

# Ou directement
./scripts/release.sh patch
./scripts/release.sh minor
./scripts/release.sh major
```

### Ce que fait le script

1. ✅ Vérifie que le dépôt Git est propre (pas de changements non commités)
2. ✅ Affiche la version actuelle
3. ✅ Vérifie l'existence de `CHANGELOG.md` (le crée si absent)
4. ✅ Demande confirmation
5. ✅ Lance le build (`npm run build:clean`)
6. ✅ Bump la version dans `package.json`
7. ✅ Commit le changement de version
8. ✅ Crée un tag Git
9. ✅ Push vers GitHub (main + tag)
10. ✅ Affiche les prochaines étapes

### Exemple d'exécution

```bash
$ npm run release:minor

🔭 Observatory Release Script

📦 Current version: v2.0.0
⬆️  Bump type: minor

⚠️  Before proceeding:
   1. Have you updated CHANGELOG.md?
   2. Are all tests passing?
   3. Does the build work? (npm run build)

Continue with minor release? (y/N) y

🧪 Running build...
✅ Build successful

⬆️  Bumping version...
✅ New version: v2.1.0

🏷️  Creating tag v2.1.0...
🚀 Pushing to GitHub...

✅ Release v2.1.0 created successfully!

📊 Next steps:
   1. Go to GitHub Actions to monitor the build
   2. Wait ~2-3 minutes for the release to be created
   3. Check GitHub Releases for the ZIP file
```

### Prérequis

- Git doit être configuré
- Vous devez avoir les droits de push sur `main`
- Le dépôt doit être propre (pas de changements non commités)
- `CHANGELOG.md` doit être à jour

### En cas d'erreur

**"Git working directory is not clean"**
```bash
git status
git add .
git commit -m "votre message"
```

**"Build failed"**
```bash
npm run build:clean
# Corrigez les erreurs et relancez
```

**"Invalid bump type"**
```bash
# Utilisez: patch, minor, ou major
npm run release:patch
```

---

## 📝 Ajout de nouveaux scripts

Pour ajouter un nouveau script :

1. **Créez le fichier**
   ```bash
   touch scripts/votre-script.sh
   ```

2. **Rendez-le exécutable**
   ```bash
   chmod +x scripts/votre-script.sh
   ```

3. **Ajoutez-le au `package.json`**
   ```json
   {
     "scripts": {
       "votre-commande": "./scripts/votre-script.sh"
     }
   }
   ```

4. **Documentez-le ici**
   Ajoutez une section dans ce README.

---

## 🧪 Scripts utiles à créer

Idées de scripts qui pourraient être ajoutés :

- `deploy.sh` : Déploiement automatique vers un serveur
- `test.sh` : Exécution de tests automatisés
- `optimize-images.sh` : Compression des images
- `generate-docs.sh` : Génération de la documentation
- `backup.sh` : Sauvegarde du projet

---

**Besoin d'aide ? Consultez [`GITHUB_ACTIONS_SETUP.md`](../GITHUB_ACTIONS_SETUP.md)**

