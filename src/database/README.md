# Database layer

## Supabase (auth + paid PDF saves)

Project: **DM Associates** (`nuihydhkqbvwvngbbahu`)

### When data is saved

- Form drafts stay **local only** (`localStorage` / IndexedDB).
- Supabase is written **only when the user pays and generates the PDF**.
- The PDF file itself is **not** uploaded — only form fields + unlock payment.

### Auth

- `app_users` — email, bcrypt hash, role (`admin` | `user`)
- `app_sessions` — session tokens (7 days)
- RPC: `authenticate_app_user`, `logout_app_session`

### Document tables (scoped by `user_id`)

| Table | Purpose |
|-------|---------|
| `documents` | Full deed JSON in `payload` + metadata |
| `parties` | Sellers / buyers |
| `properties` | Property fields |
| `payments` | Property consideration installments |
| `gov_records` | Gov modules |
| `title_history` | Title milestones |
| `witnesses` | Witnesses |
| `download_payments` | Platform unlock fee (₹999) after pay |
| `generated_pdfs` | Legacy metadata table (unused for file storage) |

RPC used on PDF generate: `finalize_paid_document(token, document, payment)`

### Demo users

| Email | Password | Role |
|-------|----------|------|
| irshad@demo.com | irshad123 | admin |
| jahid@demo.com | jahid123 | user |

### Gujarat location master (cascading dropdowns)

| Table | Count / purpose |
|-------|-----------------|
| `gu_districts` | 34 districts |
| `gu_talukas` | 268 talukas |
| `gu_places` | Village/city (HQ + samples) |
| `gu_sro_offices` | Sub-Registrar offices |
| `gu_sro_coverage` | Jurisdiction mapping |

RPCs: `list_gu_districts`, `list_gu_talukas`, `list_gu_places`, `list_gu_sro_offices`  
UI: `GujaratLocationFields` — District → Taluka → Village/City → SRO (auto-select if one)

