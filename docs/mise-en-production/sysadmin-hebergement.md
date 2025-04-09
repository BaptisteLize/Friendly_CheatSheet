# S17E02 - Sysadmin

Tout ce qui suit a été entièrement écrit et réalisé par [Enzo](https://github.com/enzoclock), merci pour tout 

## Introduction au métier de Sysadmin

### Notion de Serveurs

On distingue : 
- **serveurs physique**
  - une unité d'un rack (rack = une baie) dans un data-center
  - la machine que vous avez devant les yeux
  - Raspberry PI 
- **serveurs applicatif**
  - Live serveur
  - Apache (PHP)
  - Node.js (createServer / Express)
  - Serveur Vite
  - NGinx
  - Postgres, Oracle, MongoDB

[Vidéo de découverte d'un datacenter](https://www.youtube.com/watch?v=rO6bXt7d2L8)

### Solutions d'hébergement

#### Solutions `On-Premise`

- J'achête un serveur à la maison, que je branche sur mon réseau internet, et dont je gère l'infrastructure et la sécurité
  - _"mon serveur dans le placard sous l'escalier"_

- Avantages : 
  - **coût** : pas d'abonnement (investissement initial) mais on paie l'electricité
  - **contrôle** : accès à la machine à 100%

- Inconvénients : 
  - **infrastructure** : on gère les backups, on évite le downtime (pas de coupures réseaux, ...)
  - **scalabilité** : si notre traffic augmente, alors il faut investir plus

- Exemple typique : 
  - une entreprise qui veut un controle total sur ces données
  - pour des tests à la maison
  - projets "hobby"
  - pré-prod 

#### Solutions `Cloud`

Location d'une machine (ou partie d'une machine) dans un datacenter
- _"Le Cloud, c'est la machine de quelqu'un d'autre"_

**Fournisseur Cloud** les plus populaires : 
- `AWS` (Amazon Web Service)
- `GCP` (Google Cloud Platform)
- `MA` (Microsoft Azure)
- `Oracle`
- `OVH`
- `o2Switch`
- `infomaniak`
- `Digital Ocean`
- `Hostinger`

- Avantages : 
  - **infrastructure** : rien à géré, le fournisseur s'occupe de nous avoir un uptime de 99.9%
  - **scalabilité** : pour augmenter la charge, l'hébergeur s'occupe de nous fournir plus de serveurs

- Inconvénients : 
  - **dépendance** : dépendant du service
  - **coût** : abonnement, plus ou moins cher selon le service
  - **loi/confiance** : qui s'occupe de sécuriser les données

### Offres Cloud

- **Serveur dédié physique**
  - _on loue une ou plusieurs unités dans un rack : on loue la machine complète_
  - coût plus important

- **Serveur dédié virtuel (VPS)**
  - VPS = Virtual Private Serveur
  - _on loue une VM (indépendante) à l'intérieur d'une unité_. 
  - ressentie "machine complète".
  - **avantages** :
    - moins cher que le serveur ocmplet
    - mais on a un contôle à 100% sur la machine 
    - en général, on a les accès `root` à la machine en SSH
  - **inconvénients** : 
    - on ne gère pas l'infrastructure MAIS on gère tout le reste : 
      - installation des logiciels (Node, Postgres)
      - backup de BDD
      - mise à jour de l'OS

- **Serveur mutualisé**
  - _on loue un bout d'une VM sur lequel les logiciels sont déjà installé_
    - ex : Déjà Wordpress + MySQL d'installé, et la seul chose qu'on puisse faire est d'y placer notre code
    - **avantages**
      - encore moins cher que le serveur VPS
    - **inconvénients** 
      - bcp moins de contrôle

### `...as a Service`

- `SaaS` : Software as a Service
  - ex : Google Drive, Trello, BBB, Spotify, Netflix, Adobe...
  - destination : clients finaux
  - l'entreprise/l'hébergeur loue un **logiciel**
  - une majorité de dev travaille dans les SaaS

- `PaaS` : Platform as a Service
  - ex : Heroku, Vercel, Github pages, AWS S3 (statique), offre mutualisé
  - destination : des developeurs qui mettent en ligne leur site
  - l'entreprise/l'hébergeur nous fourni des **serveurs applicatifs**
  - solution clef en main pour le déploiement -> moins de contrôle

- `IaaS` : Infrastructure as a service
  - ex : un VPS chez GCP, un EC2 chez AWS
  - destination : des developpeurs qui mettent leur service en ligne
  - l'entreprise/l'hébergeur nous founie l'infrastructure (la machine connecté à internet)
  - serveur brut -> bcp de configuration mais contrôle plus fin

`DBaaS` : Database as a service
  - sous catégorie de PaaS qui fourni le serveur applicatif d'une base de donénes
  - ex : MongoAtlas, Firebase


### Les 7 travaux de l'administrateur système

#### `Dev` vs `Ops`

- `Dev` = son rôle est de concevoir et développer l'application, rajouter des fonctionnalités
- `Ops` = son rôle est mettre en ligne l'application et de s'assurer qu'elle soit toujours dispo et sécurité
- ==> deux approches opposées

- `Devops` = une mouvance qui tend à réconcilier ces deux approches complémentaires
  - des scripts de déploiement automatissés
  - des tests 


- Choisir le bon type d'hébergement
  - selon le nombre d'utilisateur
  - selon le prix
  - selon des demandes client particulières

- Installer le serveur
  - gérer l'instracture si besoin
  - installer Linux

- Configuration du serveur
  - installer Node
  - installer Postgres
  - mettre à jour le système d'exploitation

- Sécurisé le serveur
  - protéger le serveurs des attaques (DDOS)
  - suivre les bonnes recommandations de sécurités

- Mettre en production l'application
  - déploiement

- Maintenance du serveur
  - vérifier les logs
  - vérifier l'uptime

- Évoluer et migrer le serveur
  - si la demande augmente, on considère une autre offfre

## Mise en pratique

- Aujourd'hui, on prend une offre VPS chez AWS
  - `Linux Ubuntu` -> on passe par Kourou
- On installe les logiciels nécessaires pour faire tourner Okanban (Node, Postgres)
- On met en place notre BDD
- On lance l'application


## A vous ! 

**Kourou** : https://kourou.oclock.io/ressources/vm-cloud/
- `Créer la VM` (si elle n'existe pas)
- `Démarrer la VM` (si elle existe)
- (tant qu'à faire, aller sur Kourou DEPUIS Chrome de votre Téléporteur)
- vous la garderez **UN AN** 🎉 !

Lancer vos **Téléporteurs**
- si ce n'est pas déjà fait ce matin
- car vous aurez besoin du VPN

Accepter le **ochallenge** d'hier 
- pour ceux qui ne l'ont pas fait
- `S17-okanban-PSEUDOGITHUB`
- pas besoin de le cloner
- https://kourou.oclock.io/ressources/recap-quotidien/sushi-s17e01-tests-automatises/

Rejoindre le LiveSahre
- ça copier/coller souvent !
- https://prod.liveshare.vsengsaas.visualstudio.com/join?F1C88AAEEE90C6FDD417BAE6495A8FAA0848


## Vocabulaire 

- **Hôte** = votre poste de travail (Windows, Mac, Linux)
- **Téléporteur** = VM Téléporteur (habituelle) = celle qui est sur votre hôte
- **VM Kourou** = **VPS* = ***VM Cloud** = celle qu'on vient de commander sur AWS via Kourou


## Rappels : comment lancer le projet en local ?

Rappels : 
- On clone le projet
- Installer les dépendances : `npm i`
- Vérifier la version de node : `node -v`
- Créer le `.env` : `cp .env.example .env` + éditer
- Se rendre dans Postgres et créer la BDD : `CREATE DATABASE okanban`
- Créer les tables dans la BDD : `npm run db:reset`
- Créer le `dist` client : `npm run build`
- Lancer l'application : `npm start`

Notes : 
- sur Linux (et Windows), problème avec le `npm install` ? 
  - `cd client`
  - `rm package-lock.json`
  - `rm -rf node_modules`
  - `npm install`
  - `cd ..`


## Plan d'action pour le déploiement sur le VPS ? 

- [x] Commander un VPS Linux Ubuntu sur AWS (via Kourou)
- [x] Se connecter à ce VPS (via SSH)
- [x] Vérifier la version du système d'exploitation et si tout est à jour
- [x] Vérifier si `git` est installé
- [x] Créer et associé une clef SSH auprès de Github
- [x] Cloner le dépôt
- [x] Base de données
  - [x] Installer un serveur Postgres (via APT)
  - [x] Créer un utilisateur de BDD et la BDD Okanban
- [x] Installer `Node.js` (et `npm`) (via NVM)
- [x] Déploiement
  - [x] Installer les dépendances
  - [x] Gérer les variables d'environnement
  - [x] Créer les tables
  - [x] Build le client
  - [x] Démarrer l'application
- [ ] Bonus
  - [ ] Faire tourner Okanban en tâche de fond (via PM2)
  - [ ] Lancer Okanban au démarrage du système (via PM2)
  - [ ] Faire en sorte d'accéder à Okanban depuis le port 80 (par défaut) plutôt que 3000 (via un reverse proxy NGINX)


## Se connecter à notre VPS

Depuis un terminal de votre Téléporteur (vous pouvez tester avec votre hôte), peu importe la localisation du terminal : 
- SSH = Secure SHell = protocole pour se connecter à distance à machine
  - COMMANDE : `ssh utilisateur@hôte`

- ✅ `ssh student@PSEUDOGITHUB-server.eddi.cloud`
  - répondre `yes` pour se connecter
  - le prompt change : `student@PSEUDOGITHUB-server:~$`
  - ⚠️ si la commande Timeout, essayer, sur la Même machine où vous utilisez le terminal, de vous connecter avec Chrome à Kourou sur cette page https://kourou.oclock.io/ressources/vm-cloud/ (pour whitelister votre IP)
  - le mot de passe a été retiré de cette commande SSH pour vous faciliter la vie MAIS c'est un problème de sécurité

- Pour retourner sur votre machine :
  - `exit`
  - et à nouveau `ssh ...` pour se connecter

## Gérer son système Linux (Ubuntu)

```bash
# Info du système
uname -a

# Notre utilisateur courant
whoami

# Version d'Ubuntu
lsb_release -a

# Nom de l'hôte
hostname

# Espace libre
df -h

# Gestionnaire de tâche (liste des processus)
htop
# Touche 'q' pour quitter
```


```bash
# Mettre à jour la liste des package Linux (l'annuaire des packages)
✅ sudo apt update

# Mettre à jour les packages déjà installés
✅ sudo apt upgrade
# Confirmer l'installation avec Y
```

```bash
# Mettre à jour le Kernel
# Si un écran ROSE s'affiche, c'est pour mettre à jour le Kernel d'Ubuntu, donc : 
# - Choisir "OK" en appuyant sur la touche ENTER (1ère fois)
# - Choisir "OK" en appuyant sur la touche ENTER (2eme fois)

# Puis je vous propose de redémarrer son VPS
sudo reboot
# On se fait éjecté de SSH, normal puisque ça redémarre

# On attend une petite minute, puis on se reconnecte en SSH
ssh student@PSEUDOGITHUB-server.eddi.cloud
```

⚠️ Mot de passe `sudo` (pour TOUTES LES FOIS où on en aura besoin) : 
- `par dessus les nuages`
- il faudra le taper à chaque fois qu'on se déconnecte/reconnecte en SSH
- lorsqu'on le tape, rien ne s'affiche, c'est normal, c'est une sécurité pour qu'on ne voit pas le nombre de caractère derrière notre dos

Vocabulaire : 
- `SUDO` = **Super User Do** = prendre les droits de l'administrateur `root`
- `APT` = **Advanced Packaging Tool** = le gestionnaire de packet le plus populaire sur Linux (_APT est à Linux ce que NPM est à Node.js_)
- `Kernel` = Le code "coeur" du système d'exploitation

## Ajouter une clé SSH à son VPS

```bash
# Vérifier la version de git
git version

# Savoir où est placé notre terminal
pwd # print working directory -> /home/student (HOME FOLDER)
ls # LiSt -> rien 
ls -a # LiSt + fichiers cachés

# Se placer dans le répertoire home (HOME FOLDER)
cd ~ # ALT GR + 2 (x2) (Window) || OPT + N (puis Espace pour valider) (Mac)

# ❌ Tenter de cloner
git clone git@github.com:O-clock-Sushi/S17-okanban-PSEUDOGITHUB.git

# Are you sure you want to continue connecting (yes/no/[fingerprint])? --> Valider avec "yes"

# git@github.com: Permission denied (publickey).
# fatal: Could not read from remote repository.
# Nous n'avons pas les droits 
```

C'est une sécurité de Github : on ne peut pas cloner un dépôt depuis n'importe quelle machine (et tant mieux !). Il faut "déclarer" cette machine auprès de Github.

Il faut donc : 
- créer une clé SSH sur la machine
- l'ajouter à l'agent SSH de la machine
- la fournir à Github (soit au niveau du dépôt, soit au niveau du compte)

Pour cela : 
- [on suit la documentation](https://docs.github.com/fr/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=linux)


```bash
# Générer la clé SSH (⚠️ avec votre email Github !)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Nommer la clef SSH
ENTER # pour choisir la valeur proposée par défaut

# Choix de la passphrase
ENTER # laisser vide

# Confirmer la passphrase
ENTER # laisse vide

# Où est là clef SSH ? 
ls ~/.ssh

# Celle que je dois fournir à Github, c'est la clef publique
cat ~/.ssh/id_ed25519.pub

# Ressemble à qqch comme (y compris le mail et le ssh-ed25519): 
# ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIAaVbMTsxJtcayl46reqIeTlUtLlKSHAE4uSZq3iIgWk enzo.testa@oclock.io

# Démarrer l'agent SSH
eval "$(ssh-agent -s)"

# Ajouter la clé privée à l'agent SSH
ssh-add ~/.ssh/id_ed25519
```

Déclarons à présent notre clé SSH (publique) auprès de Github
- ✅ soit au niveau du dépôt à cloner 
  - cette clé SSH permet alors de cloner UNIQUEMENT un dépôt particulier
  - plus sécurisé !
- soit au niveau de son compte Github 
  - cette clé SSH permettrait de cloner et push sur n'importe quel dépôt

Sur Github : 
- On se rend sur le dépôt à cloner : 
  - https://github.com/O-clock-Sushi/S17-okanban-PSEUDOGITHUB
  - ⚠️ ATTENTION, le VOTRE, pas le mien !
- Dans les `Settings `
  - https://github.com/O-clock-Sushi/S17-okanban-PSEUDOGITHUB/settings
- `Deploy Keys`
  - https://github.com/O-clock-Sushi/S17-okanban-enzoclock/settings/keys
- Bouton `Add deploy Key`
  - Title : `VPS VM Kourou` (c'est à titre indicatif)
  - Clé : celle qu'on a copié tout à l'heure (pour la retrouver `cat ~/.ssh/id_ed25519.pub`)
  - Allow Write Acces : NO (comme ça, un attaquant ne pourrait pas PUSH sur notre dépot)
  - VALIDER

```bash
# MOMENT DE VÉRITÉ (🥁🥁🥁) : on clone 

# Se placer dans le dossier où l'on va cloner
cd ~ # On pourrait créer un dossier intermédiaire, mais ne nous embettons pas

# Cloner
git clone git@github.com:O-clock-Sushi/S17-okanban-PSEUDOGITHUB.git
# Valider avec 'yes' si besoin pour le premier clone

# Vérifier
ls # -> C'est ok le dossier est là 
```


## Serveur de Bases de données Postgres

- Il se lance en "tâche de fond" grâce `systemctl`, qui gère les processus d'arrière plan.

```bash
# Lister tous les services
systemctl list-units --type=service --all

# Vérifier les infos du service Postres
systemctl status postgresql
# ❌ Unit postgresql.service could not be found.

# Installer Postgres
✅ sudo apt install -y postgresql
# -y : pour confirmer automatiquement l'installation
# mdp : par dessus les nuages

# Vérifier l'installation
systemctl status postgresql
# ✅ Active: active (exited) since Tue 2025-04-08 13:19:07 CEST; 13s ago
```

```bash
# Se connecter à Postgres via psql
sudo -i -u postgres psql

# Observer l'état du serveur Postgres
\l    # lister les base de données existantes
\du   # lister les utilisateurs existants
\c    # vérifier la connexion courante

# Créer un utilisateur
CREATE ROLE okanban WITH LOGIN PASSWORD 'okanban';
# Note : techniquement, sur un serveur de production (comme c'est le cas ici), il serait de bon ton de choisir un mdp plus complexe

# Créer la base de données pour Okanban
CREATE DATABASE okanban WITH OWNER okanban;

# Exit psql
exit

# Essayer de se connecter à Okanban depuis bash
psql -U okanban -d okanban -h localhost
# le "-h localhost" permet de passer par un connexion TCP/IP plutot qu'une "socket UNIX" (désactivé par défaut avec Postgres)

# Quitter psql
exit
```

## Installation de Node.js

Pour installer Node.js, on va installer **NVM = Node Version Manager** (gestionnaire de version pour Node).
- Pourquoi utiliser NVM ? pour pouvoir mettre à jour facilement Node lorsque le besoin s'en fait ressentir.

```bash
# Installer NVM
# Documentation : https://github.com/nvm-sh/nvm
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash

# Puis au choix : 
# - quitter le terminal puis se reconnecter en SSH
# - taper les 3 commandes proposées
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Vérification
nvm -v

# Installer Node avec NVM
# CF : choisir sa version de Node : https://github.com/nodejs/Release
nvm install 22

# Vérification
node -v # -> v22.XX.XX
```

## Déploiement

```bash
# Se placer dans le dépôt à déployer
cd S17-okanban-PSEUDOGITHUB

# Installer les dépendances
npm install

# Problème du --prefix client à régler
cd client && rm -rf node_modules && rm package-lock.json && npm i && cd ..

# Créer le .env à partir du .env.example
cp .env.example .env

# Observer le contenu du .env
cat .env

# Modifier le contenu
# il nous faut un éditeur 
# - VSCode -> pas installé -> pas d'interface graphique
# - VIM -> peu faire l'affaire -> mais faut savoir quitter VIM (:wq)
# - nano -> plus beginner friendly que VIM

```

- `NANO` = éditeur de texte dans le terminal
  - Sauvegarder dans nano : `CTRL + O` puis ENTER
  - Quitter nano : `CTRL + X`


```bash
# Créer les tables dans la BDD
npm run db:create
# Pour créer les tables sans y mettre les fausses données, qui étaient utiles au developpement

# Vérification
psql -U okanban -d okanban -h localhost # mdp: okanban
\dt # C'est ok !
exit # Quitter psql
```


```bash
# build le front (dossier dist)
npm run build

# Lancer l'application
npm run start
```

Tester : 
- Trouver l'adresse HTTP de sa machine VPS sur la page 
  - https://kourou.oclock.io/ressources/vm-cloud/
  - quelque chose comme : http://enzoclock-server.eddi.cloud
- Avec son navigateur (celui où on a ouvert la page de gestion de VM) : 
  - `http://enzoclock-server.eddi.cloud:3000` ❌
  - `http://enzoclock-server.eddi.cloud:3000/api/lists` ✅

- Explication :
  - depuis Chrome sur mon Téléporteur : 
    - le front se charge (car on accède à http://enzoclock-server.eddi.cloud:3000)
    - mais le front ne trouve pas le backend :
      - car apiBaseURL = http://localhost:3000
      - et que actuellement, rien ne tourne sur mon Téléporteur
      - il faut changer la base URL pour pointer vers le VPS

```bash
# Couper le processus node
CTRL + C

# Eviter les variables d'environnement
nano .env
# Déplacement uniquement avec le clavier
# Remplacer :
VITE_API_BASE_URL=http://PSEUDOGITHUB-server.eddi.cloud:3000/api
# Attention, ne mettez pas un "/" final sinon cassé (expérience)
# Attention, http pour le moment

# Sauvegarder
CTRL + O (puis ENTER)

# Quitter nano
CTRL + X

# Build le front a nouveau avec la nouvelle variable d'environnement
npm run build

# Lancer le serveur
npm run start
```

Vérification : 
- a priori, depuis le CHROME de votre Téléporteur (du moins, la machine sur laquelle vous aviez ouvert la page d'administration des VM Kourou), ALORS vous devriez pouvoir accéder à votre Okanban : 
- `http://PSEUDOGITHUB-server.eddi.cloud:3000`

## Bonus - Rendre l'application plus accessible

Problème : 
- ce n'est pas accessible au reste du monde (pare feu qui bloque tous les ports par défaut)
- ce n'est pas pratique de devoir préciser le port 3000
- je ne peux même pas fermer mon ordi, sans quoi le tunnel SSH se ferme, donc l'application s'arrête

### PM2 - Process Manager pour Node.js

Problématique : 
- lorsque je lance `npm run start`, je lance mon serveur Node HTTP, mais pas en tâche de fond : 
  - donc si je quitte le terminal, l'application s'arrête 🤯.

Idée : 
- utiliser un process manager pour Node.js (PM2) afin de :
  - lancer l'application en tâche de fond
  - la relancer au re-démarrage

PM2 :
- "PM2 is a daemon process manager" (daemon = tâche de fond)
- outil très utilisé dans l'industrie 
  - rare de faire juste `npm run start` => en général on passe plutot par PM2.

```bash
# Fermer votre serveur Okanban
CTRL + C

# Installation (en global avec le -g)
npm install -g pm2

# Se replacer dans le projet Okanban
cd ~/S17-okanban-PSEUDOGITHUB

# Observer les applications lancées par PM2
pm2 ls # y'a rien, c'est normal

# Lancer l'application okanban avec pm2 (ChatGPT)
pm2 start npm --name okanban -- run start

# Voir les logs du serveur
pm2 logs okanban

# Vérifier l'état du serveur 
pm2 monitor okanban

# Quelques commandes complémentaire
pm2 restart app_name
pm2 reload app_name
pm2 stop app_name
pm2 delete app_name
```

==> `http://PSEUDOGITHUB-server.eddi.cloud:3000/` fonctionne toujours même après avoir quitté le terminal, c'est un succès !

#### Lancer PM2 automatiquement au démarrage du VPS

```bash
# Démarrer PM2 au démarrage du VPS
pm2 startup

# Puis copier la commande fournie, par exemple  
sudo env PATH=$PATH:/home/student/.nvm/versions/node/v22.14.0/bin /home/student/.nvm/versions/node/v22.14.0/lib/node_modules/pm2/bin/pm2 startup systemd -u student --hp /home/student
```


### Choisir le port pour l'application 

Actuellement, l'application tourne sur : 
- `http://PSEUDOGITHUB-server.eddi.cloud:3000/`

Ce qu'on veut : 
- `http://PSEUDOGITHUB-server.eddi.cloud`
- (strictement équivalent à) `http://PSEUDOGITHUB-server.eddi.cloud:80`

On pourrait se dire : 
- je n'ai qu'à choisir dans le `.env` le `PORT=8O`
  - ❌ sécurité de node, ça ne marchera pas!

Ce qu'on va faire :
- installer un serveur "spécial", qu'on appelle un **REVERSE PROXY**
  - pour rediriger les flux entrant sur le port 80 --> 3000
- on installe pour cela `NGINX`
  - se pronone "engine-x"
  - très utilisé dans l'industrie, en particulier avec Node

Tant qu'à faire, on va faire encore mieux : 
- ❌ `http://PSEUDOGITHUB-server.eddi.cloud:3000`
- ❌ `http://PSEUDOGITHUB-server.eddi.cloud:80`
- ✅ `http://okanban.PSEUDOGITHUB-server.eddi.cloud:80`

Pourquoi ce prefix (sous-domaine) ? 
- comme ça, si vous souhaitez déployer également (oblog, onews, oquiz...), la voie est libre !
- très facile à gérer avec `NGINX`


```bash
# Installer NGINX
sudo apt install -y nginx

# Vérifier l'état du service NGINX
sudo systemctl status nginx
# Active: active (running) since ...

# Autre moyen de vérifier
curl http://PSEUDOGITHUB-server.eddi.cloud/
# On voit la page par défaut d'NGINX sur le port 80 !

# Configuration de NGINX
ls /etc/nginx
```

Objectif :
- déclarer la configuration pour Okanban dans `sites-available`
  - `okanban.PSEUDOGITHUB-server.eddi.cloud` -> `localhost:3000`
- active cette configuration en créant un lien symbolique vers `sites-enabled`
- relance le serveur nginx


#### Création de la configuration NGINX pour Okanban

```bash
# Créer un fichier okanban.conf dans les sites-available
sudo nano /etc/nginx/sites-available/okanban.conf
# (Copier le contenu indiqué plus bas)

# Activer cette configuration en créant un lien symbolique vers sites-enabled
sudo ln -s /etc/nginx/sites-available/okanban.conf /etc/nginx/sites-enabled/okanban.conf

# Vérifier la syntaxe de notre configuration
sudo nginx -t
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful

# Relancer le serveur NGINX avec la nouvelle configuration
sudo systemctl reload nginx
```

```bash
# ATTENTION MODIFIER BIEN VOTRE USERNAME

server {
  listen 80;

  server_name okanban.PSEUDOGITHUB-server.eddi.cloud;

  location / {
    proxy_pass      http://localhost:3000;
  }
}

## Enregistrer et quitter Nano comme d'habitude
CTRL + O (puis ENTER)   puis CTRL + X
```
Bien penser à redémarrer nginx : `sudo systemctl restart nginx`
Vérifier le status qui doit être active (running) à ce stade : `sudo systemctl status nginx`

Pour finir, on remodifie les variables d'environnement du build front pour prendre la nouvelle adresse de l'API

```bash
nano ~/S17-okanban-PSEUDOGITHUB/.env

# Nouvelle valeur pour l'API BASE URL
VITE_API_BASE_URL=http://okanban.PSEUDOGITHUB-server.eddi.cloud/api

# Sauvegarder, quitter nano, puis relancer le build
cd ~/S17-okanban-PSEUDOGITHUB
npm run build
```


### Rendre notre port 80 accessible au reste du monde 

- https://kourou.oclock.io/ressources/vm-cloud/
  - **RENDRE LA VM PUBLIQUE**
  - (parfois il faut cliquer 3-4 fois)
  - (parfois, elle repasse en privé pour une raison que j'ignore)



## A retenir

- `APT` = package manager pour Linux
- `Systemctl` = gestionnaire de services pour Linux
- `PM2` = process manager pour Node.js
- `NGINX` = serveur HTTP (qui sert souvent de reverse proxy)
