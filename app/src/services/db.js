const DB_NAME = 'train_app_db';
const DB_VERSION = 1;

let dbInstance = null;

function openDB() {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
        userStore.createIndex('username', 'username', { unique: true });
      }

      if (!db.objectStoreNames.contains('trains')) {
        const trainStore = db.createObjectStore('trains', { keyPath: 'id', autoIncrement: true });
        trainStore.createIndex('train_name', 'train_name', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

function transaction(storeName, mode = 'readonly') {
  return openDB().then((db) => {
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    return { tx, store };
  });
}

function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ─── USER OPERATIONS ────────────────────────────────────────────────────────

export async function addUser(userData) {
  const { store } = await transaction('users', 'readwrite');
  return promisifyRequest(store.add(userData));
}

export async function getUserByUsername(username) {
  const { store } = await transaction('users', 'readonly');
  const index = store.index('username');
  return promisifyRequest(index.get(username));
}

export async function getUserById(id) {
  const { store } = await transaction('users', 'readonly');
  return promisifyRequest(store.get(id));
}

export async function updateUser(userData) {
  const { store } = await transaction('users', 'readwrite');
  return promisifyRequest(store.put(userData));
}

// ─── TRAIN OPERATIONS ───────────────────────────────────────────────────────

export async function addTrain(trainData) {
  const { store } = await transaction('trains', 'readwrite');
  return promisifyRequest(store.add(trainData));
}

export async function getTrains() {
  const { store } = await transaction('trains', 'readonly');
  return promisifyRequest(store.getAll());
}

export async function getTrainById(id) {
  const { store } = await transaction('trains', 'readonly');
  return promisifyRequest(store.get(id));
}

export async function updateTrain(trainData) {
  const { store } = await transaction('trains', 'readwrite');
  return promisifyRequest(store.put(trainData));
}

export async function deleteTrain(id) {
  const { store } = await transaction('trains', 'readwrite');
  return promisifyRequest(store.delete(id));
}
