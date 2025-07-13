# CiviRecens

CiviRecens est une application web complète qui gère les rendez-vous, les citoyens, les demandes et le personnel des institutions civiles.

## Architecture du Projet

Le projet est organisé selon une architecture front-end/back-end séparée :

### Backend (Node.js/Express)
- **Routes** : `/api/appointments`, `/api/citizens`, `/api/demandes`, `/api/institutions`, `/api/staff`
- **Structure** :
  - `controllers/` : Logique métier
  - `models/` : Définition des modèles de données
  - `routes/` : Gestion des routes API
  - `middleware/` : Fonctionnalités intermédiaires
  - `types/` : Définitions de types TypeScript
  - `utils/` : Fonctions utilitaires

### Frontend
Application web moderne avec une interface utilisateur dédiée.

## Installation

### Backend
1. Naviguez vers le dossier backend
2. Installez les dépendances :
```bash
npm install
```
3. Configurez les variables d'environnement dans `.env`
4. Lancez le serveur :
```bash
npm start
```

### Frontend
1. Naviguez vers le dossier frontend
2. Installez les dépendances :
```bash
npm install
```
3. Lancez l'application :
```bash
npm start
```

## Fonctionnalités Principales

- Gestion des rendez-vous
- Gestion des citoyens
- Gestion des demandes
- Gestion des institutions
- Gestion du personnel

## Technologies Utilisées

- Backend : Node.js, Express.js, TypeScript
- Frontend : (à préciser selon la configuration)
- Base de données : (à préciser selon la configuration)

## Configuration

Le projet utilise des variables d'environnement pour la configuration. Créez un fichier `.env` dans le dossier backend avec les variables nécessaires.

## Contribution

Pour contribuer au projet :
1. Fork le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add some amazing feature'`)
4. Push à la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.
