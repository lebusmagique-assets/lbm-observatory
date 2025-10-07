# 🤝 Guide de Contribution

Merci de votre intérêt pour contribuer à Guild Wars 2 Observatory !

## 📋 Code de Conduite

Soyez respectueux et constructif dans vos interactions avec la communauté.

## 🚀 Comment contribuer

### 1. Fork et Clone

```bash
# Fork le projet sur GitHub puis :
git clone https://github.com/votre-username/observatory.git
cd observatory
npm install
```

### 2. Créer une branche

```bash
git checkout -b feature/ma-super-feature
# ou
git checkout -b fix/correction-bug
```

### 3. Développer

```bash
# Lancer le serveur de dev
npm start

# Vérifier le code
npm run lint
npm run format
```

### 4. Commit

Utilisez des messages de commit clairs :

```bash
git commit -m "feat: ajoute la fonctionnalité X"
git commit -m "fix: corrige le bug Y"
git commit -m "docs: met à jour le README"
```

**Préfixes recommandés :**
- `feat:` nouvelle fonctionnalité
- `fix:` correction de bug
- `docs:` documentation
- `style:` formatage, style
- `refactor:` refactoring
- `test:` ajout de tests
- `chore:` tâches de maintenance

### 5. Push et Pull Request

```bash
git push origin feature/ma-super-feature
```

Puis ouvrez une Pull Request sur GitHub avec :
- Un titre clair
- Une description détaillée des changements
- Des captures d'écran si pertinent

## 🎯 Domaines de contribution

### Fonctionnalités suggérées

- [ ] Mode sombre/clair
- [ ] Comparaison entre personnages
- [ ] Graphiques de progression
- [ ] Notifications de nouvelles saisons
- [ ] Support multilingue étendu
- [ ] Mode offline complet
- [ ] Intégration Discord

### Bugs connus

Consultez les [Issues](https://github.com/votre-repo/issues) pour voir les bugs à corriger.

## 📚 Standards de code

### JavaScript/React

- Utilisez des composants fonctionnels quand possible
- Nommez les composants en PascalCase
- Nommez les fonctions en camelCase
- Commentez le code complexe
- Évitez les console.log en production

### Style

- Utilisez Prettier pour le formatage
- Suivez les conventions SCSS existantes
- Utilisez les variables CSS pour les couleurs

### Git

- Commits atomiques (un changement = un commit)
- Messages en français ou anglais
- Pas de commits directs sur main

## 🧪 Tests

Avant de soumettre :

```bash
# Vérifier le lint
npm run lint

# Formater le code
npm run format

# Tester le build
npm run build
```

## 📝 Documentation

Si vous ajoutez une fonctionnalité, pensez à :
- Mettre à jour le README.md
- Ajouter des commentaires dans le code
- Documenter les nouvelles fonctions

## ❓ Questions

Pour toute question :
- Ouvrez une [Discussion](https://github.com/votre-repo/discussions)
- Consultez le [README](README.md)

Merci de contribuer ! 🎮✨

