# CiviRecens

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

CiviRecens est une application web moderne pour la gestion et le recensement des citoyens.

## Fonctionnalités

- Gestion des utilisateurs avec authentification
- Interface utilisateur moderne et réactive
- Système de gestion des données citoyennes
- Tableaux de bord et rapports

## Technologies utilisées

- Frontend: React avec TypeScript
- UI: Material-UI
- State Management: Zustand
- Authentification: JWT

## Installation

1. Cloner le repository

```bash
git clone https://github.com/elhalj/CiviRecens.git
```

2. Installer les dépendances

```bash
cd CiviRecens
cnpm install
```

3. Démarrer le serveur de développement

```bash
cnpm run dev
```

## Structure du projet

```
src/
├── components/     # Composants réutilisables
├── pages/          # Pages de l'application
├── services/       # Services et API
├── store/          # Configuration Redux
└── utils/          # Utilitaires
```

## Contribuer

1. Créer une branche pour votre fonctionnalité

```bash
git checkout -b feature/amazing-feature
```

2. Commiter vos changements

```bash
git commit -m 'Ajout: nouvelle fonctionnalité'
```

3. Pousser la branche

```bash
git push origin feature/amazing-feature
```

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
