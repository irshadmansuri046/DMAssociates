# Database layer (client-first)

Current implementation: IndexedDB (`src/database/indexedDb.js`).

## Future Supabase adapter

Implement `DocumentRepository` methods against Postgres tables:

- `documents` (id, type, template_id, locale, status, payload jsonb, created_at, updated_at)
- `parties` (document_id, role, party_type, fields jsonb)
- `properties` (document_id, fields jsonb)
- `payments` (document_id, row jsonb)
- `gov_records` (document_id, module, fields jsonb)
- `generated_pdfs` (document_id, storage_path, metadata)

Keep `repositories/DocumentRepository.js` as the only import surface for UI/services so generators never bind to IndexedDB or Supabase directly.
