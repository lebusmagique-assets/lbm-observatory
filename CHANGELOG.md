# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.2] - 2024-12-19

### Fixed
- **Janthir Wilds Quest Mapping**: Corrigé le mapping des quêtes de Janthir Wilds avec les vrais IDs de l'API Guild Wars 2
- **Quest Data Access**: Ajouté des vérifications de sécurité dans la fonction `block()` pour éviter les erreurs "Cannot read properties of undefined"
- **Story 151**: Ajouté le Prologue: The Tyrian Alliance avec ses 8 quêtes (710, 712, 716, 717, 719, 720, 722, 723)
- **Duplicate Removal**: Supprimé les doublons dans `quests_line.js`

### Technical Details
- Stories 145-164 maintenant correctement mappées avec leurs vraies quêtes
- Vérifications de sécurité ajoutées pour les données de quêtes manquantes
- Structure de données optimisée pour éviter les erreurs runtime

## [2.0.1] - 2024-12-19

### Added
- Version initiale avec support complet des extensions Guild Wars 2
- Interface utilisateur moderne avec Materialize CSS
- Suivi des quêtes par personnage
- Support multilingue (français/anglais)
- Cache local pour optimiser les performances
- Export de données (JSON/CSV)