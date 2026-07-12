import { supabase } from '../lib/supabase';
import { STORAGE_KEYS } from '../constants/version';
import { remoteLogoutSession } from './supabaseDocuments';

/**
 * Authenticate against public.app_users via SECURITY DEFINER RPC.
 * Returns user profile + session token, or throws.
 */
export async function loginWithEmailPassword(email, password) {
  const trimmedEmail = String(email || '').trim();
  const rawPassword = String(password || '');

  if (!trimmedEmail || !rawPassword) {
    throw new Error('Email and password are required.');
  }

  const { data, error } = await supabase.rpc('authenticate_app_user', {
    p_email: trimmedEmail,
    p_password: rawPassword,
  });

  if (error) {
    throw new Error(error.message || 'Unable to reach authentication service.');
  }

  if (!data || !data.id || !data.session_token) {
    throw new Error('Invalid email or password.');
  }

  return {
    id: data.id,
    email: data.email,
    role: data.role,
    fullName: data.full_name || '',
    sessionToken: data.session_token,
    sessionExpiresAt: data.session_expires_at || null,
  };
}

export function saveSession(user) {
  sessionStorage.setItem(STORAGE_KEYS.loggedIn, 'true');
  sessionStorage.setItem(
    STORAGE_KEYS.sessionUser,
    JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      sessionExpiresAt: user.sessionExpiresAt || null,
    })
  );
  if (user.sessionToken) {
    sessionStorage.setItem(STORAGE_KEYS.sessionToken, user.sessionToken);
  }
}

export async function clearSession() {
  const token = getSessionToken();
  try {
    await remoteLogoutSession(token);
  } catch {
    // ignore network errors on logout
  }
  sessionStorage.removeItem(STORAGE_KEYS.loggedIn);
  sessionStorage.removeItem(STORAGE_KEYS.sessionUser);
  sessionStorage.removeItem(STORAGE_KEYS.sessionToken);
}

export function getSessionUser() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEYS.sessionUser);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getSessionToken() {
  return sessionStorage.getItem(STORAGE_KEYS.sessionToken) || '';
}

export function isLoggedIn() {
  return (
    sessionStorage.getItem(STORAGE_KEYS.loggedIn) === 'true' &&
    Boolean(getSessionUser()?.id) &&
    Boolean(getSessionToken())
  );
}

/** localStorage draft keys scoped per user so data does not leak across accounts */
export function userDraftKey(userId = getSessionUser()?.id) {
  return userId ? `${STORAGE_KEYS.draft}:${userId}` : STORAGE_KEYS.draft;
}

export function userActiveDocKey(userId = getSessionUser()?.id) {
  return userId ? `${STORAGE_KEYS.activeDocId}:${userId}` : STORAGE_KEYS.activeDocId;
}
