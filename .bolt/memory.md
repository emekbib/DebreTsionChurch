# Project memory

## Product intent & audience

- Custom church website to share information with its congregation and the surrounding community.
- Serves both existing members and newcomers seeking information about the church.

## Brand personality & voice

- Natural, authentic church tone — should feel handcrafted, not templated or AI-generated.
- Warm and welcoming while remaining professional and production-quality.

## Visual design & UX direction

- Avoid visible structural markers (e.g. "01", "02", "03" labels with decorative lines) that signal template/AI origin.
- Sections should flow naturally without obvious numbering or scaffolding artifacts.
- Ministry cards may retain small item numbering when it serves functional organization.
- Prefer clean, organic layout patterns over rigidly structured grids with decorative numbering.
- Stack: Vite + React, Tailwind CSS, Lucide React icons; `@/` path alias for imports.

## Decisions, constraints & rationale

- Removed numbered section markers and decorative lines to reduce AI-generated appearance and improve natural flow.
- Kept ministry card numbering because it aids identification and is functionally distinct from section labels.
- Global design constraints from `.bolt/prompt` apply (beautiful, non-cookie-cutter, production-worthy; no extra UI/icon packages unless necessary).

## Open questions & assumptions

- Church name, branding details, and specific content (service times, beliefs, events, staff) not yet specified.
- Exact color palette and typography preferences not yet established beyond implied warmth and authenticity.
- Whether additional pages beyond the current single page are planned is unknown.