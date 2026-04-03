# TrainApp — React + Cordova Mobile Application

A complete offline-first mobile CRUD application for managing trains, built with React, Vite, Tailwind CSS, and IndexedDB, integrated into Apache Cordova.

---

## Project Structure

```
trainApp/
├── cordova/                  
└── app/                      

```

---

## Setup & Build

### 1. Install dependencies
```bash
cd trainApp/app
npm install
```

### 2. Build for Cordova
```bash
npm run build
```
This outputs the built app directly into `trainApp/cordova/www/`.

### 3. Run in browser (dev mode)
```bash
npm run dev
```

### 4. Build & run Cordova (Android example)
```bash
cd ../cordova
cordova run android
```

---

## Features

### Authentication
- Register with username, password, and optional profile photo
- Login / Logout
- Passwords hashed with SHA-256 via Web Crypto API (no external libs)
- Session persisted in `localStorage`

### Profile
- Update username, password, and profile picture
- Profile photo shown in bottom nav

### Train Management (CRUD)
- **Create** trains with name, price, route, and image
- **Read** all trains with search/filter
- **Update** trains via bottom sheet modal
- **Delete** trains with confirmation dialog

### Database (IndexedDB)
- DB name: `train_app_db`
- Object stores: `users`, `trains`
- All operations are async/await with proper error handling

---

## Tech Stack
- **React 18** — UI
- **React Router 6** — Client-side routing
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Utility-first styling
- **IndexedDB** — Offline-first local database
- **Web Crypto API** — Password hashing (no external dependency)
- **Apache Cordova** — Native mobile wrapper
