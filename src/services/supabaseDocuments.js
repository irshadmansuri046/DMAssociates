import { supabase } from '../lib/supabase';
import { getSessionToken } from './authService';

function requireToken() {
  const token = getSessionToken();
  if (!token) {
    throw new Error('Not authenticated');
  }
  return token;
}

/**
 * Save filled form + unlock payment to Supabase only after paid PDF generation.
 * Does not upload/store the PDF file itself.
 */
export async function remoteFinalizePaidDocument(document, payment) {
  const { data, error } = await supabase.rpc('finalize_paid_document', {
    p_token: requireToken(),
    p_document: document,
    p_payment: payment,
  });
  if (error) throw new Error(error.message || 'Failed to save document to database');
  return data;
}

export async function remoteGetDocument(id) {
  const { data, error } = await supabase.rpc('get_user_document', {
    p_token: requireToken(),
    p_document_id: id,
  });
  if (error) throw new Error(error.message || 'Failed to load document');
  return data || null;
}

export async function remoteListDocuments() {
  const { data, error } = await supabase.rpc('list_user_documents', {
    p_token: requireToken(),
  });
  if (error) throw new Error(error.message || 'Failed to list documents');
  return Array.isArray(data) ? data : [];
}

export async function remoteDeleteDocument(id) {
  const { data, error } = await supabase.rpc('delete_user_document', {
    p_token: requireToken(),
    p_document_id: id,
  });
  if (error) throw new Error(error.message || 'Failed to delete document');
  return Boolean(data);
}

export async function remoteLogoutSession(token) {
  if (!token) return;
  await supabase.rpc('logout_app_session', { p_token: token });
}
