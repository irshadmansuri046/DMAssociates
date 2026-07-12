/**
 * Minimal IndexedDB wrapper for DM Associates documents.
 * Schema v1: store `documents` keyed by id.
 */

const DB_NAME = 'deeds_platform_db';
const DB_VERSION = 1;
const STORE = 'documents';

function openDb() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB not available'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('documentType', 'documentType', { unique: false });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
        store.createIndex('status', 'status', { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('IndexedDB open failed'));
  });
}

function txDone(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error || new Error('Transaction aborted'));
  });
}

export const db = {
  async putDocument(doc) {
    const database = await openDb();
    const tx = database.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put({ ...doc, updatedAt: new Date().toISOString() });
    await txDone(tx);
    database.close();
    return doc;
  },

  async getDocument(id) {
    const database = await openDb();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(id);
      req.onsuccess = () => {
        database.close();
        resolve(req.result || null);
      };
      req.onerror = () => {
        database.close();
        reject(req.error);
      };
    });
  },

  async listDocuments() {
    const database = await openDb();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => {
        database.close();
        const rows = (req.result || []).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
        resolve(rows);
      };
      req.onerror = () => {
        database.close();
        reject(req.error);
      };
    });
  },

  async deleteDocument(id) {
    const database = await openDb();
    const tx = database.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(id);
    await txDone(tx);
    database.close();
  },
};

export default db;
