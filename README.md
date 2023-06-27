# Timeweaver

- [Timeweaver](#timeweaver)
  - [What is Timeweaver?](#what-is-timeweaver)
- [Project Setup](#project-setup)
  - [Pre-requisites](#pre-requisites)
    - [Domain](#domain)
    - [Node.js](#nodejs)
    - [Docker](#docker)
  - [Environment](#environment)
  - [The Stack](#the-stack)
  - [SSL Certificates](#ssl-certificates)
  - [Google Cloud Project Setup.](#google-cloud-project-setup)
- [Deploy](#deploy)
  - [Steps:](#steps)

## What is Timeweaver?

Timeweaver takes people, locations, and events, then using their metadata, weaves them together in a relational tapestry that can be represented on a timeline. View the events over a person's life, the people they are associated with, and the places they have been. List the entire history of a given location. Find all of the people and places involved in an event.

Each tapestry you create can represent an historical topic, a family geneology, or simply a specific life journey. Just enter the relevant people, places, and events and let timeweaver do the rest.

# Project Setup

---

## Pre-requisites

### Domain

For accessibility outside of the localhost, you can add an entry to **/etc/hosts** to point to the IP and give it a domain name to use. This domain name will then be used when setting up the OAuth config with Google.

For a more production like environment, [Nginx Proxy Manager](https://nginxproxymanager.com/) can be used as a reverse proxy from the host to the UI and Server services. It can be added to the docker compose, or you can add it's network to the docker compose to join it.

### Node.js

[Node Version Manager](https://github.com/nvm-sh/nvm) allows you to select/change version of Node/npm without effort. Once installed, `nvm install lts/gallium`.

### Docker

[Docker](https://www.docker.com/) is used for a more production ready environment. Docker Desktop provides a GUI and includes Docker Compose, which is also used to create two services.

---

## Environment

ESLint is used for code standards. Prettier is used for code styling.

Dotenv is used to read in a **.env** file for sensative and envronment based settings. Create a **.env.dev** and **.env.prod** file based on the **.env-example** file and make sure they do not get checked in.

The UI is built with angular and uses the environments files for environment configuration. UI source is in the **/ui/src** folder.

The backend is written with TypeScript and consists of an express server using google authentication and typical session management and security middleware.

Package scripts serve the UI with a watcher and use ts-node-dev to transpile the typescript for the server components. Building generates source and places it into the **docker** folder and zips everything up as a portable package, requiring only `docker-compose up-d` to run.

Use `npm start` for an interactive menu to select dev and build tasks.

---

## The Stack

- Angular UI
- NgRx for UI state using actions and effects.
- Express for the backend APIs.
  - Passport with the Google Open Auth 2 strategy to handle user authentication and permissions for Google APIs.
  - Express sessions for session managemt (will need to change eventually)
  - Firestore for session store, because:
- Firebase for storing user rules and caching API data so you don't hit Google's quota restrictions.

---

## SSL Certificates

SSL Certificates are stored in the **certs** directory, but not checked into version control. Update **angular.json** to point to the correct SSL certificate in order to use https with the angular UI during development. If you need to create a self signed certificate, run the following from the **certs** directory:

`./ssl.sh my.domain.com`

Be sure to add the certificate and the CA to your browser/OS and set trust settings.
(Thanks to: https://devopscube.com/create-self-signed-certificates-openssl)

In order to use the **.env** file for your certs, first, base64 encode them and save the base64 result as a string for the SSL_CERT, SSL_KEY, and SSL_CA values.

---

## Google Cloud Project Setup.

The project uses Google OAuth and the Firebase Firestore. Use the Cloud Console to setup a new project:

1.  Go to: https://console.cloud.google.com/
    - Add a new project.
1.  Menu > APIs & Services > OAuth consent screen.
    - External User Type
    - Skip scopes for now (The sensative scope will require HTTPS to be setup)
    - Add test users (including yourself).
1.  Create Credentials > OAuth Client ID
    - Web Application
    - Add origin URI (https://mydomain.com:4200)
    - Add authorized redirect URI (https://mydomain.com:4200/auth)
    - Create
    - Download JSON.
      - Copy the values of the JSON to the .env file, using .env-example as a guide. Be sure the .env file is not checked in.
1.  Menu > APIs & Services > Credentials.
    - Create Credentials > Service Account
    - Create App Engine Service Admin
    - Add Email
1.  Menu > APIs & Services > Credentials.
    - Create Credentials > Service Account
    - Create Firebase Admin SDK Administrator Service
    - Add Email
1.  Menu > APIs & Services > Enabled APIs and Services
    - Enable APIs and Services
      - Google Cloud Firestore API
1.  Menu > Firestore
    - Select Native Mode
1.  Go to the firebase console: https://console.firebase.google.com/
    - Add Project
    - Quickstart documentation is here: https://firebase.google.com/docs/firestore/quickstart
1.  From the firebase console: https://console.firebase.google.com
    - Gear Icon > Project Settings > Service Accounts
    - Generate a new private key
      - Update the **.env** file with relevant values from the JSON file.
1.  Install the Firebase Admin SDK and initialize the project.
    - `npm install -g firebase-tools`
    - Create a folder to use as a workspace and change directories to it.
    - `firebase login`
    - `firebase init`
    - Select **Realtime Database**.
    - Select your project.

# Deploy

Deployment is done by creating a deploy zip consisting of the required source along with a docker compose file. Docker compose builds two services and joins them to an existing [Nginx Proxy Manager](https://nginxproxymanager.com/) reverse proxy. Adjust the network config appropriately.

## Steps:

1. Ensure there is a .env file in the **gek-docker/server** directory.
1. Run `npm run build:package`. This cleans and builds the project with production configurations and environment, copies everything required to the **gek-docker** directory, then creates **/dist/gek.tar.gz**.
1. Copy **gek.tar.gz** to the production server and unzip it (`tar -xf gek.tar.gz`).
1. Build the containers and start them:
   - `docker-compose build`
   - `docker-compose up -d`
