# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Code Conventions

- **No comments in code.** If something absolutely must be commented, use the format: `Enzo (dd/mm/aaaa)` where the date is the current day.
- All UI text is in **Spanish**.
- When in doubt about any decision, **ask — never assume**.

## Git Conventions

- **Commits**: Conventional Commits en español. Ejemplos: `feat: agregar página de login`, `fix: corregir validación del wizard`, `chore: configurar tailwind`.
- **Never** add co-authorship lines, AI attribution, or similar ("Co-Authored-By", "Generated with", etc.) in commits or anywhere in the codebase.
- **Mensajes de commit en español.**
- **Branches**: usar convenciones profesionales (e.g., `feat/`, `fix/`, `chore/`, `docs/`).
- `.gitignore` debe cubrir: node_modules, .next, .turbo, .env*, dist, OS files (.DS_Store).

## Project Context and Strategy

Kosmos is a **market research platform** with 3 modules. The project starts as a **functional prototype** but the architecture, components, types, and service layer are designed to **scale directly into production applications**. This is NOT throwaway prototype code — every decision is made with production in mind.

The current `Demo Navegable/` directory contains the original static HTML mockups presented to the client as high-fidelity designs. The new codebase (monorepo) replaces these with real Next.js applications.

### Why this approach

The client receives a prototype they can navigate alone (public URL), but underneath it's a real frontend codebase. When the backend is built, the mock data layer gets swapped for real API calls and the UI is already done. Zero rewrite.

## Architecture: Monorepo

**Tool**: Turborepo
**Deploy**: AWS Amplify (one site per app, auto-deploy from Git)

```
kosmos/
├── apps/
│   ├── clientes/            # B2B SaaS portal — desktop (Next.js 15)
│   ├── admin/               # Backoffice interno — desktop (Next.js 15)
│   └── participantes/       # B2C panelistas — mobile-first responsive (Next.js 15)
├── packages/
│   ├── ui/                  # Shared component library (Button, Card, Table, Input, etc.)
│   ├── types/               # TypeScript types matching the data model (Empresa, Estudio, Participante, Transacción, Suscripción/Tier, etc.)
│   ├── mock-data/           # Service layer interfaces + mock implementations
│   └── config/              # Shared Tailwind config, ESLint, tsconfig
├── turbo.json
└── package.json
```

### Stack

- **Next.js 15** (App Router) — framework for all 3 apps
- **TypeScript** — types map to the domain model from requirements docs
- **Tailwind CSS** — design system tokens translated from `Demo Navegable/styles-kosmos.css`
- **shadcn/ui** — accessible base components, customized to Kosmos design
- **Recharts** — dashboard charts with mock data

### Design System (from existing CSS)

```
Primary: #FF4136
Primary Dark: #E8382D
Primary Light: #FF6B61
Font: Inter (400, 500, 600, 700)
Border Radius: 4px / 8px / 12px / 16px
Status: success #22c55e, warning #f59e0b, error #ef4444
```

### Mock Data Layer Pattern

Each domain has a service interface. Today: mock implementation (JSON). Production: API implementation (fetch). The UI never changes.

```typescript
interface StudyService {
  getAll(): Promise<Study[]>
  getById(id: string): Promise<Study>
  launch(config: StudyConfig): Promise<Study>
}
```

## Modules and Screens

### Clientes (B2B SaaS — desktop) — 10 screens

Designs exist in `Demo Navegable/Alta Fidelidad - Clientes/`.

1. Landing Page
2. Registro Corporativo (datos personales + empresa, industria/país)
3. Verificación Email
4. Login (email corporativo + OTP por email, token 3 meses, sin social login)
5. Lista de Estudios
6. Dashboard de Resultados (visualización directa + export Excel, sin IA)
7. Wizard Paso 1: Seleccionar Plantilla (instancia copia, sin preguntas custom)
8. Wizard Paso 2: Definir Segmento/Target
9. Wizard Paso 3: Volumen y Lanzamiento (validación saldo → descontar créditos o upgrade)
10. Configuración de Cuenta / Suscripción (tiers, upgrade inmediato, downgrade diferido)

Business logic: Billing via Stripe/GreenPay tokenization. Trial = 5 respuestas gratis. Backend acts as clearing house before activating data collection.

### Admin / Backoffice (internal — desktop) — 12+ screens

Designs exist in `Demo Navegable/Alta Fidelidad - Admin/` (editor) and `Demo Navegable/Wireframes - Backoffice Operativo/` (operations).

Roles: SuperAdmin (global) and Admin País (limited to their territory).

1. Login Admin (2FA)
2. Lista de Plantillas
3. Editor de Preguntas (toolbox: selección única/múltiple, escala 1-10, ranking, texto abierto; drag-and-drop)
4. Editor de Reglas de Lógica (screener logic, skip logic)
5. Configuración General de Plantilla
6. Dashboard de Monitoreo / Suscripciones (MRR, renovaciones pendientes)
7. Gestión de Participantes (búsqueda por cédula/email/teléfono, perfil, NSE score, forzar actualización NSE)
8. Gestión de Clientes/Empresas (tabla con tier/estado/país, funcionalidad de impersonación)
9. Cola de Redenciones (flujo: solicitud → revisión → procesamiento externo SINPE/Banco → confirmación → cierre)
10. Catálogo de Premios (CRUD: título, imagen, valor monetario, costo en puntos, disponibilidad geográfica)
11. Cola de Fraude y Alertas (IP duplicada, tiempos anómalos, límite de referidos configurable)
12. Gestión de Excepciones Neuro/VAS (kanban: Recibido → En Análisis Externo → Resultados Entregados)

Calibración NSE: variables de encuesta con pesos configurables, niveles Alto/Medio/Bajo, danger zone para actualización masiva.

### Participantes (B2C — mobile-first responsive) — 12 screens

No existing designs — to be designed collaboratively based on flow specs in `requerimientos_cliente/kosmos-participantes-mvp (1).pdf`.

1. Landing / Detección de dispositivo (sugerir app si móvil)
2. Registro (País dropdown, Nombre, Apellidos, ID/Cédula, Email, Contraseña — sin social login, requiere ID nacional)
3. Verificación de Email (obligatoria antes del primer login)
4. Cuestionario NSE (Quality Gate bloqueante: sin perfil = sin estudios)
5. Dashboard (puntos acumulados, barra de progreso hacia canje, lista de estudios disponibles, aviso legal antifraude)
6. Ejecución de Encuesta (renderizado de preguntas desde plantilla, validación de cupo backend, monitoreo tiempos + IP)
7. Billetera (saldo en puntos, historial de transacciones con libro mayor inmutable, conversión multi-divisa)
8. Catálogo de Premios (filtrado por disponibilidad geográfica)
9. Solicitud de Canje (datos SINPE/Banco, débito provisional → aprobación manual admin → dispersión)
10. Perfil (edición datos personales, reactivación NSE)
11. Referidos (código personal, puntos bloqueados hasta que referido complete primer estudio válido, cap configurable)
12. Soporte (formulario web → ticket en BD → email a Admin País, sin chat en vivo)

Backend architecture: Motor de Decisiones y Reglas (Auth Core, Motor de Reglas/NSE, Antifraude Pasivo, Tesorería Digital).
Infrastructure: AWS with auto-scaling, data segregation by country, tokenized payments.

## Requirements Documents

Located in `requerimientos_cliente/`:
- `modulo-clientes-mvp.pdf` — Client module flows, business logic, data model, phase 2 exclusions
- `modulo-admin-mvp.pdf` — Admin backoffice flows, roles, governance, operations
- `kosmos-participantes-mvp (1).pdf` — Participant flows, quality gates, rewards, anti-fraud, infrastructure

## Legacy Demo

The original static HTML demo lives in `Demo Navegable/`. It serves as visual reference for implementing the new apps. Key files:
- `styles-kosmos.css` — design tokens and component classes (source of truth for Tailwind config)
- `00-INDICE.html` — screen index
- `scripts/build-portable.mjs` — portable single-file builder (no longer needed for the new apps)
