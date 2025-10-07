# 🎮 Guild Wars 2 Observatory

<div align="center">

![Guild Wars 2](https://img.shields.io/badge/Guild%20Wars%202-Observatory-yellow?style=for-the-badge)
![React](https://img.shields.io/badge/React-16.14.0-61DAFB?style=for-the-badge&logo=react)
![Version](https://img.shields.io/badge/version-2.0.0-blue?style=for-the-badge)

**Keep your story in mind** - Track your Guild Wars 2 story progress across all characters

[Installation](#-installation) • [Fonctionnalités](#-fonctionnalités) • [Utilisation](#-utilisation) • [Développement](#-développement)

</div>

---

## 📖 À propos

Observatory est une application web moderne pour suivre votre progression dans les quêtes de Guild Wars 2. Elle permet de visualiser en un coup d'œil quelles quêtes ont été complétées par vos personnages, lesquelles sont accessibles, et lesquelles sont verrouillées par des restrictions (niveau, extension, backstory).

### ✨ Nouveautés v2.0

- ⚡ **Chargement parallèle** : 3-5x plus rapide grâce au chargement simultané des personnages
- 💾 **Cache localStorage** : Chargement instantané après la première visite (cache 1h)
- 🔄 **Retry automatique** : Gestion intelligente des erreurs 504 et timeouts
- 📊 **Statistiques globales** : Vue d'ensemble de votre progression
- 👥 **Vue par personnage** : Filtrez et recherchez les quêtes par personnage
- 🎯 **Filtres avancés** : Par extension, statut, nom de quête
- 💾 **Export de données** : JSON et CSV pour analyse externe
- 🎨 **Interface modernisée** : Design amélioré avec onglets et boutons stylisés

---

## 🚀 Installation

### Prérequis

- **Node.js** >= 14.x
- **npm** >= 6.x

### Étapes d'installation

```bash
# Cloner le repository
git clone <votre-repo-url>
cd observatory

# Installer les dépendances
npm install

# Lancer en mode développement
npm start
```

L'application sera accessible sur `http://localhost:3000/observatory/`

---

## 🎯 Fonctionnalités

### 📈 Vue Chronologie

Vue traditionnelle organisée par saisons et histoires, affichant toutes les quêtes dans l'ordre chronologique du jeu.

**Fonctionnalités :**
- Timeline complète de toutes les saisons (Core → Janthir Wilds)
- Codes couleur pour chaque personnage
- Indicateurs de progression par quête
- Liens vers tutoriels et wiki

### 👤 Vue Personnages

Nouvelle vue centrée sur un personnage spécifique avec des outils de filtrage avancés.

**Fonctionnalités :**
- Sélection du personnage dans un dropdown
- **Filtres par statut :**
  - ✅ Toutes
  - 🟢 Terminées
  - 🔴 Accessibles (non terminées)
  - 🔒 Verrouillées
- **Filtre par extension** : Afficher uniquement les quêtes d'une saison
- **Recherche** : Trouver une quête par son nom
- **Tableau détaillé** : Nom, extension, histoire, niveau, statut
- **Statistiques** : Nombre de quêtes par statut

### 📊 Vue Statistiques

Vue d'ensemble de votre progression globale.

**Métriques affichées :**
- Total de quêtes terminées
- Quêtes accessibles restantes
- Quêtes verrouillées
- Pourcentage de complétion global
- Barre de progression visuelle

### 💾 Système de Cache

**Optimisation des performances :**
- Cache localStorage (1h de durée)
- Chargement instantané des données en cache
- Indicateur visuel : ⚡ X personnages en cache
- Bouton **Refresh** pour forcer la mise à jour

### 🎨 Codes Couleur

| Couleur | Signification |
|---------|---------------|
| 🟢 **Vert** | Quête terminée |
| 🔴 **Rouge** | Accessible, non terminée |
| 🟠 **Orange** | Extension manquante |
| 🔵 **Bleu** | Niveau insuffisant |
| ⚫ **Gris** | Incompatible (race/backstory) |

### 📤 Export de Données

**3 formats d'export disponibles :**

1. **JSON** : Toutes les données brutes (backup complet)
2. **CSV - Toutes les quêtes** : Tableau détaillé de chaque quête par personnage
3. **CSV - Résumé** : Statistiques par personnage (progression, complétion)

---

## 🔧 Utilisation

### Configuration initiale

1. **Obtenir votre clé API** :
   - Rendez-vous sur [ArenaNet Account](https://account.arena.net/applications)
   - Créez une nouvelle clé avec les permissions :
     - ✅ account
     - ✅ characters
     - ✅ progression
     - ✅ pvp

2. **Lancer l'application** :
   ```bash
   npm start
   ```

3. **Entrer votre clé API** :
   - Sélectionnez votre langue (FR/EN)
   - Collez votre clé API
   - Cliquez sur "RAFRAÎCHIR"

4. **Naviguer dans l'interface** :
   - **Chronologie** : Vue traditionnelle par timeline
   - **Personnages** : Vue filtrée par personnage
   - **Statistiques** : Vue d'ensemble de la progression
   - **Exporter** : Télécharger vos données

### Raccourcis et astuces

- **Refresh** : Vider le cache et recharger les données fraîches
- **Reset** : Supprimer la clé API et recommencer
- **Légende** : Cliquez sur le bouton "LÉGENDE" pour voir les codes couleur
- **Important** : Infos sur le fonctionnement de l'API

---

## 🛠️ Développement

### Structure du projet

```
observatory/
├── src/
│   ├── component/          # Composants React
│   │   ├── App.js         # Composant principal
│   │   ├── Account.js     # Affichage compte et accès
│   │   ├── History.js     # Vue chronologie + navigation
│   │   ├── Statistics.js  # Vue statistiques (NEW)
│   │   └── CharacterView.js # Vue par personnage (NEW)
│   ├── function/          # Fonctions utilitaires
│   │   ├── getAccount.js
│   │   ├── getCharacters.js
│   │   ├── getDoneQuests.js
│   │   ├── getBackstories.js
│   │   ├── cacheHelper.js      # Gestion cache (NEW)
│   │   ├── fetchWithRetry.js   # Retry logic (NEW)
│   │   └── exportHelper.js     # Export données (NEW)
│   ├── style/             # Styles SCSS/CSS
│   ├── quests_line.js     # Mapping des quêtes
│   ├── tuto_line.js       # Liens tutoriels
│   └── index.js           # Point d'entrée
├── public/
│   └── index.html
├── dist/                  # Build de production
├── build/                 # Ancien code (legacy)
├── webpack.config.js
├── package.json
└── README.md
```

### Scripts disponibles

```bash
# Développement
npm start              # Lance le serveur de dev (port 3000)
npm run dev           # Alias de npm start

# Build
npm run build         # Build de production dans /dist
npm run build:clean   # Nettoie dist/ puis build

# Qualité de code
npm run lint          # Vérifie le code avec ESLint
npm run lint:fix      # Corrige automatiquement les erreurs
npm run format        # Formate le code avec Prettier

# Serveur local
npm run serve:dist    # Sert le build de production (port 8000)
```

### Technologies utilisées

**Frontend :**
- React 16.14.0
- React Router 5.3.4
- Materialize CSS 1.0.0
- Lodash 4.17.21

**Build & Dev :**
- Webpack 5
- Babel 7
- Sass
- Webpack Dev Server

**API :**
- [Guild Wars 2 API v2](https://api.guildwars2.com/v2)

---

## 🎨 Personnalisation

### Modifier la durée du cache

Éditez `src/function/cacheHelper.js` :

```javascript
const CACHE_DURATION = 1000 * 60 * 60 // 1 heure (défaut)
// Changez en :
const CACHE_DURATION = 1000 * 60 * 30 // 30 minutes
```

### Ajouter de nouvelles extensions

1. Mettez à jour `src/quests_line.js` avec les nouveaux IDs de quêtes
2. Ajoutez les entrées dans `src/tuto_line.js` pour les liens
3. Mettez à jour `src/component/History.js` dans `expansionRequirements`

---

## 📝 Changelog

### v2.0.0 (2025-01-07)

**✨ Nouvelles fonctionnalités :**
- Chargement parallèle des personnages (3-5x plus rapide)
- Système de cache localStorage (1h)
- Retry automatique pour les erreurs 504
- Vue Personnages avec filtres avancés
- Vue Statistiques globales
- Export JSON/CSV
- Indicateur visuel de cache
- Support End of Dragons, Secrets of the Obscure, Janthir Wilds

**🎨 Améliorations UI :**
- Onglets modernisés avec boutons stylisés
- Bouton Refresh dans la navigation
- Barre de progression du chargement
- Tooltips détaillés sur les quêtes
- Légende mise à jour avec nouvelles couleurs

**🐛 Corrections :**
- Fix erreur Materialize avec href="#!"
- Fix couleurs des personnages (green/red/etc.)
- Fix crash lors du chargement de nouvelles extensions
- Fix gestion des quêtes Icebrood Saga manquantes

### v1.0.0 (Legacy)

Version originale avec vue chronologie uniquement.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 🙏 Remerciements

- [ArenaNet](https://www.arena.net/) pour l'API Guild Wars 2
- [Materialize CSS](https://materializecss.com/) pour le framework UI
- La communauté Guild Wars 2

---

## 📞 Support

Pour toute question ou problème :
- Ouvrez une [issue](https://github.com/votre-repo/issues)
- Contact : MaT.3817

---

<div align="center">

**Fait avec ❤️ par la communauté Guild Wars 2**

[⬆ Retour en haut](#-guild-wars-2-observatory)

</div>

