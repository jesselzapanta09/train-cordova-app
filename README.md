# MSIT 114 - Activity 24 - IndexedDB

A complete offline-first mobile CRUD application for managing trains, built with React, Vite, Tailwind CSS, and IndexedDB, integrated into Apache Cordova.

---

## Project Structure

```
trainApp/
├── cordova/                  
└── app/                      
```
---

## Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/jesselzapanta09/train-cordova-app.git
cd train-cordova-app
```

### 2. Install dependencies
```bash
cd app
npm install
```

### 3. Build for Cordova
```bash
npm run build
```
This outputs the built app directly into `trainApp/cordova/www/`.

### 4. Run in browser (dev mode)
```bash
npm run dev
```
The APP should now be running at http://localhost:5173/train-cordova-app/

### 5. Build & run Cordova (Android example)
```bash
cd cordova

npm install

cordova platform add android

cordova run android
```

### 5. Build Android app

```bash
cordova build android
```
---

## Features

- Authentication
- Update Profile
- rain Management (CRUD)

## Author

**Jessel Zapanta** — MSIT 114