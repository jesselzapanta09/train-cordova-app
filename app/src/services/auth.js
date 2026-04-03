import { addUser, getUserByUsername, getUserById, updateUser } from './db.js';

const SESSION_KEY = 'train_app_session';

// ─── PASSWORD HASHING (Web Crypto API) ─────────────────────────────────────

export async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password, hash) {
  const inputHash = await hashPassword(password);
  return inputHash === hash;
}

// ─── SESSION ────────────────────────────────────────────────────────────────

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(user) {
  const sessionData = {
    id: user.id,
    username: user.username,
    profilePicture: user.profilePicture || null,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  return sessionData;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ─── AUTH ACTIONS ────────────────────────────────────────────────────────────

export async function register({ username, password, profilePicture }) {
  if (!username || !password) throw new Error('Username and password are required.');

  const existing = await getUserByUsername(username);
  if (existing) throw new Error('Username is already taken.');

  const passwordHash = await hashPassword(password);

  const userId = await addUser({
    username: username.trim(),
    passwordHash,
    profilePicture: profilePicture || null,
    createdAt: Date.now(),
  });

  const newUser = await getUserById(userId);
  return saveSession(newUser);
}

export async function login({ username, password }) {
  if (!username || !password) throw new Error('Username and password are required.');

  const user = await getUserByUsername(username.trim());
  if (!user) throw new Error('Invalid username or password.');

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) throw new Error('Invalid username or password.');

  return saveSession(user);
}

export function logout() {
  clearSession();
}

export async function updateProfile({ id, username, password, profilePicture, currentUsername }) {
  const existing = await getUserByUsername(username.trim());
  if (existing && existing.id !== id) throw new Error('Username is already taken.');

  const currentUser = await getUserById(id);
  if (!currentUser) throw new Error('User not found.');

  const updated = {
    ...currentUser,
    username: username.trim(),
    profilePicture: profilePicture !== undefined ? profilePicture : currentUser.profilePicture,
  };

  if (password && password.trim() !== '') {
    updated.passwordHash = await hashPassword(password);
  }

  await updateUser(updated);
  return saveSession(updated);
}
