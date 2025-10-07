# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [2.0.0] - 2025-01-07

### ✨ Ajouté

#### Fonctionnalités majeures
- **Chargement parallèle** : Les personnages se chargent simultanément (3-5x plus rapide)
- **Système de cache localStorage** : Durée de 1h, chargement instantané après première visite
- **Retry automatique** : Gestion intelligente des erreurs 504 et timeouts avec backoff exponentiel
- **Vue Personnages** : Nouvelle vue centrée sur un personnage avec filtres avancés
  - Filtre par statut (Toutes/Terminées/Accessibles/Verrouillées)
  - Filtre par extension
  - Recherche par nom de quête
  - Tableau détaillé avec badges colorés
- **Vue Statistiques** : Dashboard avec métriques globales
  - Nombre de quêtes terminées/accessibles/verrouillées
  - Pourcentage de complétion
  - Barre de progression visuelle
- **Export de données** : 3 formats disponibles
  - JSON (données brutes)
  - CSV complet (toutes les quêtes)
  - CSV résumé (statistiques par personnage)

#### Interface utilisateur
- **Onglets de navigation** : Chronologie / Personnages / Statistiques / Exporter
- **Bouton Refresh** : Dans la barre de navigation pour vider le cache
- **Indicateur de cache** : Affiche combien de personnages sont chargés depuis le cache (⚡)
- **Barre de progression** : Affiche le chargement en temps réel avec pourcentage

#### Contenu du jeu
- Support **End of Dragons**
- Support **Secrets of the Obscure**
- Support **Janthir Wilds**
- Ajout des quêtes Icebrood Saga manquantes (stories 94-98)

#### Système de couleurs amélioré
- 🟢 **Vert** : Quête terminée
- 🔴 **Rouge** : Accessible mais non terminée
- 🟠 **Orange** : Extension manquante
- 🔵 **Bleu** : Niveau insuffisant
- ⚫ **Gris** : Incompatible (race/backstory)

#### Développement
- Fichier `.gitignore` complet
- Configuration ESLint (`.eslintrc.js`)
- Configuration Prettier (`.prettierrc`)
- Configuration EditorConfig (`.editorconfig`)
- Scripts npm améliorés (lint, format, build:clean)
- Documentation complète (README.md, CONTRIBUTING.md, LICENSE)

### 🎨 Amélioré

- **Performance** : Chargement 3-5x plus rapide grâce au parallélisme
- **UX** : Feedback visuel pendant le chargement
- **Légende** : Mise à jour avec les nouvelles couleurs et significations
- **Tooltips** : Informations détaillées sur les restrictions d'accès
- **Design** : Boutons modernisés avec effets hover et états actifs
- **CSS** : Classes spécifiques pour éviter les conflits Materialize

### 🐛 Corrigé

- **Erreur Materialize** : Fix `href="#!"` invalide en utilisant `href="#"` avec `e.preventDefault()`
- **Couleurs personnages** : Fix classes CSS `.status.green`, `.status.red`, etc. avec `!important`
- **Crash loading** : Gestion d'erreur pour éviter le crash lors du chargement des personnages
- **Quêtes manquantes** : Ajout des IDs manquants pour Icebrood Saga dans `quests_line.js` et `tuto_line.js`
- **Checks défensifs** : Vérification `tuto[id] && tuto[id][lang]` avant accès pour éviter les erreurs

### 🔄 Modifié

- **Build output** : De `build/` vers `dist/` (webpack déjà configuré)
- **Package.json** : 
  - Nom : `observatory-recovered` → `gw2-observatory`
  - Version : 1.0.0 → 2.0.0
  - Ajout description, author, license
- **Tabs navigation** : Remplacement des tabs Materialize par des boutons personnalisés

### ⚠️ Déprécié

- Ancienne méthode de chargement séquentiel (remplacée par parallèle)

### 🗑️ Supprimé

- Rien pour cette version

---

## [1.0.0] - Legacy

### Fonctionnalités initiales

- Vue chronologie par saisons
- Affichage des personnages et quêtes
- Support des extensions jusqu'à Path of Fire
- Système de couleurs de base (rouge/gris)
- Légende et informations importantes
- Support multilingue (FR/EN)
- Intégration API Guild Wars 2

---

## Format des versions

- **MAJOR** (X.0.0) : Changements incompatibles avec l'API
- **MINOR** (x.X.0) : Nouvelles fonctionnalités compatibles
- **PATCH** (x.x.X) : Corrections de bugs

---

[2.0.0]: https://github.com/votre-repo/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/votre-repo/releases/tag/v1.0.0

