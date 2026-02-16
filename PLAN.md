# Plan de Implementacion - Kosmos Frontend

**Creado:** 15/02/2026
**Duracion:** 4 semanas (20 dias habiles)
**Alcance:** 34 pantallas across 3 apps + libreria de componentes compartidos + deploy AWS Amplify

## Decisiones Arquitectonicas

| Decision | Resultado |
|---|---|
| Orden de modulos | Admin -> Clientes -> Participantes |
| Layout Admin | Sidebar para toda la app. Editor de plantillas se abre full-screen (sin sidebar) |
| Layout Clientes | Header minimalista (logo + avatar). Sin sidebar. Contenido full-width |
| Layout Participantes | Mobile-first responsive. Diseno sobre la marcha basado en requerimientos PDF |
| Auth screens (Clientes) | Split-screen: formulario izquierda, gradiente marca derecha |
| Deploy | AWS Amplify desde Semana 1, auto-deploy desde Git |
| Componentes | shadcn/ui instalado en packages/ui, customizado con tokens Kosmos |
| Font | Inter via next/font (no CSS generico) |
| Admin sidebar estilo | Adaptado al design system Kosmos (no el estilo oscuro de wireframes) |
| Participantes sin disenos | Se disenan durante implementacion, aprobacion de Enzo por pantalla |

## Estado Actual del Codebase

**Implementado (fundacion):**
- Monorepo Turborepo + pnpm workspaces
- 14 tipos TypeScript del dominio
- 12 datasets mock data realistas
- 6 interfaces de servicio + 3 implementaciones mock
- Tailwind config con todos los tokens del design system
- 3 apps Next.js 15 scaffoldeadas (solo paginas placeholder)

**Pendiente:**
- 0 de 34 pantallas implementadas
- 0 componentes UI compartidos (solo utilidad cn())
- 3 mock implementations faltantes (plantilla, premio, redencion)
- 7 service interfaces faltantes
- shadcn/ui no instalado
- Inter font no cargada via next/font
- ESLint config no conectada en apps
- Dato incorrecto: trial con 500 respuestas (deberia ser 5)

## Componentes Compartidos (@kosmos/ui)

### Core (shadcn/ui base + customizacion Kosmos)
1. **Button** - primary, outline, ghost, destructive, sm/default/lg
2. **Input** - bordered estandar + variante bottom-border para auth
3. **Label** - form labels
4. **Card** - CardHeader, CardContent, CardFooter
5. **Badge** - status pills (success, warning, error, info, default)
6. **Table** - TableHeader, TableBody, TableRow, TableHead, TableCell
7. **Select** - dropdown customizado
8. **Dialog/Modal** - overlay centrado
9. **Tabs** - variante underline y pill
10. **Avatar** - circulo con iniciales, sizes sm/md/lg
11. **Dropdown Menu** - para acciones y avatar menu
12. **Switch/Toggle** - toggle on/off
13. **Tooltip** - hover info
14. **Separator** - linea divisora
15. **Textarea** - para textos largos

### Composite (construidos sobre core)
1. **KPICard** - icono + label + valor + meta/trend
2. **StatusBadge** - Badge con colores semanticos por estado de estudio/redencion/etc
3. **DataTable** - Table + paginacion + busqueda + filtros + ordenamiento
4. **SearchBox** - icono lupa + input
5. **Breadcrumb** - con separador y pagina actual
6. **Pagination** - botones numerados con estado activo
7. **Stepper** - indicador de pasos para wizard (active/completed/inactive)
8. **OptionCard** - card seleccionable con borde highlight
9. **ChipSelector** - chips toggleables para seleccion multiple
10. **FilterBar** - fila de dropdowns + search
11. **EmptyState** - ilustracion + mensaje cuando no hay datos

### Layout Components
1. **AdminSidebar** - navegacion lateral admin con secciones agrupadas
2. **AdminLayout** - sidebar + area de contenido + breadcrumb
3. **ClientesHeader** - header con logo + nav + avatar
4. **ClientesLayout** - header + contenido full-width
5. **ParticipantesLayout** - mobile-first con navegacion bottom/sidebar
6. **AuthLayout** - split-screen para pantallas de auth (Clientes)
7. **EditorLayout** - topbar + tabs + contenido full-screen (Admin editor)

---

## Semana 1: Fundacion + Admin Core

### Dia 1 - Setup Fundacional ✅
- [x] Instalar y configurar shadcn/ui en packages/ui
- [x] Configurar next/font (Inter) en las 3 apps
- [x] Construir componentes core: Button, Input, Label, Card, Badge, Avatar, Separator
- [x] Corregir mock data: trial limit 5 (no 500), agregar transacciones.ts, tiers.ts
- [x] Setup AWS Amplify (3 sites, amplify.yml por app)
- [x] Conectar ESLint config compartida en las 3 apps

### Dia 2 - Admin Layout + Auth ✅
- [x] Construir AdminSidebar (navegacion con secciones: Principal, Gestion, Fabrica, Tesoreria, Control)
- [x] Construir AdminLayout (sidebar + content area + breadcrumb)
- [x] Construir routing structure completa para Admin (14 rutas con route groups)
- [x] Implementar Login Admin (formulario email/password + 2FA simulado con código 6 dígitos)

### Dia 3 - Admin: Lista Plantillas + Editor Preguntas
- [ ] Construir DataTable compartido (sortable, pagination, search)
- [ ] Construir StatusBadge, Tag components
- [ ] Implementar Lista de Plantillas (tabla con filtros, busqueda, paginacion)
- [ ] Implementar EditorLayout (topbar editable + pill tabs + close)
- [ ] Implementar Editor de Preguntas: sidebar de preguntas + panel editor
- [ ] Toolbox: 5 tipos de pregunta (seleccion unica/multiple, escala, ranking, texto)

### Dia 4 - Admin: Editor Reglas + Config General
- [ ] Implementar Editor de Reglas (accordion preguntas + rule cards CRUD)
- [ ] Tipos de regla: mostrar/ocultar, agrupar, redireccionar, referencia
- [ ] Implementar Editor Config General (sidebar nav + secciones)
- [ ] Secciones: imagen, premio, programar, mensaje confirmacion, segmento
- [ ] ChipSelector para tags de segmento

### Dia 5 - Admin: Dashboard Monitoreo
- [ ] Construir KPICard compartido
- [ ] Implementar Dashboard de Monitoreo:
  - KPIs: MRR, Clientes Activos, Estudios Completados, Renovaciones
  - Chart MRR mensual (Recharts BarChart)
  - Lista proximos vencimientos
  - Tabla desempeno por pais
  - Tabla actividad del panel
- [ ] Construir chart wrappers reutilizables

---

## Semana 2: Admin Completo

### Dia 6 - Admin: Gestion Participantes + Clientes
- [ ] Implementar Gestion de Participantes:
  - Busqueda por cedula/email/telefono
  - Tarjeta perfil (info + indicadores NSE + balance puntos)
  - Boton "Forzar Actualizacion NSE"
  - Actividad reciente
- [ ] Implementar Gestion de Clientes/Empresas:
  - Stat cards (activos, trial, mora, MRR)
  - Tabla con filtros (pais, plan, estado)
  - Boton impersonacion
- [ ] Completar mock: mockPlantillaService, mockPremioService

### Dia 7 - Admin: Cola Redenciones + Catalogo Premios
- [ ] Implementar Cola de Redenciones:
  - Stat cards con bordes de color
  - Tabs: Pendientes, En Proceso, Historial
  - Tabla con datos bancarios, prioridad, acciones (revisar/aprobar/rechazar)
- [ ] Implementar Catalogo de Premios:
  - Grid de prize cards con gradientes
  - Formulario crear/editar premio
  - Preview mobile del premio
  - Checkboxes disponibilidad geografica
- [ ] Completar mock: mockRedencionService

### Dia 8 - Admin: Fraude + NSE Calibracion
- [ ] Implementar Cola de Fraude y Alertas:
  - Banner de alerta
  - Stat cards con bordes de riesgo
  - Config limite referidos (input configurable)
  - Tabla de alertas con niveles de riesgo y acciones
- [ ] Implementar Calibracion NSE:
  - Tabla variables con pesos editables
  - Definicion de niveles (alto/medio/bajo con thresholds)
  - Danger zone: forzar actualizacion masiva

### Dia 9 - Admin: Neuro/VAS + Polish
- [ ] Implementar Gestion de Excepciones Neuro/VAS:
  - Kanban board 3 columnas (Recibido, En Analisis, Resultados Entregados)
  - Cards con cliente, solicitud, proveedor, estado
  - Drag conceptual (sin DnD real para prototype)
- [ ] Polish completo del modulo Admin:
  - Verificar navegacion entre todas las pantallas
  - Verificar responsive (desktop)
  - Verificar datos mock consistentes
  - Verificar feedback visual (hover, active states)

### Dia 10 - Clientes: Landing Page
- [ ] Construir ClientesHeader (logo + nav links + CTA)
- [ ] Construir ClientesLayout
- [ ] Implementar Landing Page:
  - Hero section (2 columnas: copy + preview card con stats)
  - Features section (3 columnas de feature cards)
  - Pricing section (3 tiers: Freemium, Profesional, Empresarial)
  - Security section (badges)
  - Footer

---

## Semana 3: Clientes Completo

### Dia 11 - Clientes: Auth Flow
- [ ] Construir AuthLayout (split-screen: form + gradiente)
- [ ] Implementar Registro Corporativo:
  - Datos personales (email, contrasena)
  - Datos empresa (nombre, industria dropdown, pais dropdown)
  - Bottom-border inputs
- [ ] Implementar Verificacion Email:
  - 4 code inputs individuales
  - Reenviar codigo link
- [ ] Implementar Login:
  - Email + contrasena
  - Flujo OTP (pantalla codigo)

### Dia 12 - Clientes: Lista Estudios + Dashboard
- [ ] Implementar Lista de Estudios:
  - Reutilizar DataTable
  - Columnas: codigo, titulo, tipo (tags color), etiquetas, respuestas, estado, acciones
  - Boton "+ Nuevo estudio" -> Wizard
- [ ] Implementar Dashboard de Resultados:
  - Breadcrumb
  - Card con titulo estudio + filtros + "Descargar Excel"
  - KPI grid 2x2 (respuestas, incidencia, tiempo, abandono)
  - 3 chart cards (representatividad barras, ritmo diario, meta gauge)

### Dia 13 - Clientes: Wizard (3 pasos)
- [ ] Construir Stepper component
- [ ] Construir wizard modal overlay (sobre fondo difuminado)
- [ ] Implementar Paso 1: Seleccionar Plantilla
  - Grid 2 columnas de OptionCards
  - Seleccion unica
- [ ] Implementar Paso 2: Definir Segmento/Target
  - OptionCards con descripcion demografica
  - Boton deseleccionar (X)
- [ ] Implementar Paso 3: Volumen y Lanzamiento
  - OptionCards con volumenes
  - Logica: validacion saldo -> modal upgrade si insuficiente
  - Boton "Crear estudio"

### Dia 14 - Clientes: Cuenta + Polish
- [ ] Implementar Configuracion de Cuenta:
  - Avatar dropdown menu (Tu cuenta, Cerrar sesion)
  - 3 info cards (Perfil, Pago, Suscripcion)
  - Tabla historial de creditos
  - Links: actualizar metodo pago, cambiar plan
- [ ] Polish completo del modulo Clientes:
  - Verificar navegacion completa
  - Verificar consistencia visual con Demo Navegable
  - Verificar estados vacios y edge cases

### Dia 15 - Participantes: Fundacion + Diseno
- [ ] Disenar layout mobile-first para Participantes:
  - Sidebar/bottom nav con items: Inicio, Perfil, Premios, Soporte
  - Header mobile con puntos visibles
- [ ] Construir ParticipantesLayout
- [ ] Construir mobile-specific components si se necesitan
- [ ] Definir paleta de colores/variaciones para mobile

---

## Semana 4: Participantes Completo + Deploy Final

### Dia 16 - Participantes: Auth + NSE
- [ ] Implementar Landing / Deteccion de dispositivo
- [ ] Implementar Registro:
  - Pais dropdown, Nombre, Apellidos, Cedula, Email, Contrasena
  - Codigo referido opcional
  - Mobile-first form
- [ ] Implementar Verificacion Email (adaptado mobile)
- [ ] Implementar Cuestionario NSE:
  - Quality gate bloqueante
  - Preguntas con opciones
  - Resultado: clasificacion Alto/Medio/Bajo
  - Puntos de incentivo al completar

### Dia 17 - Participantes: Dashboard + Encuesta
- [ ] Implementar Dashboard:
  - Metrica de incentivo (puntos + barra de progreso)
  - Lista de estudios disponibles con "Iniciar Encuesta"
  - Aviso legal antifraude (primera vez)
- [ ] Implementar Ejecucion de Encuesta:
  - Renderizado de preguntas por tipo (seleccion, escala, ranking, texto)
  - Navegacion entre preguntas
  - Progress bar
  - Pantalla de finalizacion con puntos otorgados

### Dia 18 - Participantes: Rewards
- [ ] Implementar Billetera:
  - Saldo en puntos prominente
  - Historial de transacciones (inmutable)
  - Tipo + fecha + puntos (+/-)
- [ ] Implementar Catalogo de Premios:
  - Cards de premios filtrados por pais
  - Valor en puntos + valor monetario
- [ ] Implementar Solicitud de Canje:
  - Formulario datos SINPE/Banco
  - Confirmacion y debito provisional
  - Estado de solicitud

### Dia 19 - Participantes: Perfil + Social
- [ ] Implementar Perfil:
  - Edicion datos personales
  - Estado NSE con opcion reactivacion
  - Cerrar sesion
- [ ] Implementar Referidos:
  - Codigo personal copiable
  - Lista de referidos con estado
  - Puntos bloqueados vs liberados
  - Indicador de cap
- [ ] Implementar Soporte:
  - Formulario: asunto + mensaje
  - Lista de tickets enviados con estado
  - Sin chat en vivo

### Dia 20 - Polish Final + Deploy
- [ ] Verificar las 34 pantallas completas
- [ ] Verificar navegacion end-to-end en cada modulo
- [ ] Verificar responsive:
  - Admin y Clientes: desktop (min 1024px)
  - Participantes: mobile-first (320px-768px) + desktop
- [ ] Verificar AWS Amplify deployment de los 3 apps
- [ ] Verificar datos mock consistentes entre modulos
- [ ] Limpiar codigo y verificar que no hay imports/componentes sin usar
- [ ] Verificar performance basica (no heavy renders, lazy loading donde aplique)

---

## Estructura de Archivos por App

### apps/admin/src/
```
app/
  layout.tsx                    (AdminLayout con sidebar)
  page.tsx                      (redirect a /dashboard)
  login/page.tsx                (Login 2FA)
  dashboard/page.tsx            (Dashboard Monitoreo)
  plantillas/
    page.tsx                    (Lista Plantillas)
    [id]/
      page.tsx                  (redirect a preguntas)
      preguntas/page.tsx        (Editor Preguntas - full screen)
      reglas/page.tsx           (Editor Reglas - full screen)
      configuracion/page.tsx    (Editor Config - full screen)
  participantes/page.tsx        (Gestion Participantes)
  clientes/page.tsx             (Gestion Clientes/Empresas)
  redenciones/page.tsx          (Cola Redenciones)
  premios/page.tsx              (Catalogo Premios)
  fraude/page.tsx               (Cola Fraude)
  nse/page.tsx                  (Calibracion NSE)
  excepciones/page.tsx          (Neuro/VAS Kanban)
components/
  admin-sidebar.tsx
  editor-layout.tsx
  kpi-dashboard.tsx
  kanban-board.tsx
  ...
```

### apps/clientes/src/
```
app/
  layout.tsx                    (metadata, fonts)
  page.tsx                      (Landing Page - publica)
  (auth)/
    layout.tsx                  (AuthLayout split-screen)
    registro/page.tsx
    verificacion/page.tsx
    login/page.tsx
  (app)/
    layout.tsx                  (ClientesLayout con header)
    estudios/
      page.tsx                  (Lista Estudios)
      [id]/page.tsx             (Dashboard Resultados)
      nuevo/page.tsx            (Wizard 3 pasos)
    cuenta/page.tsx             (Config Cuenta)
components/
  clientes-header.tsx
  auth-layout.tsx
  wizard/
    stepper.tsx
    paso-1.tsx
    paso-2.tsx
    paso-3.tsx
  dashboard/
    kpi-grid.tsx
    chart-*.tsx
  ...
```

### apps/participantes/src/
```
app/
  layout.tsx                    (metadata, viewport mobile)
  page.tsx                      (Landing / Deteccion dispositivo)
  (auth)/
    layout.tsx
    registro/page.tsx
    verificacion/page.tsx
  (onboarding)/
    nse/page.tsx                (Cuestionario NSE - quality gate)
  (app)/
    layout.tsx                  (ParticipantesLayout con nav)
    inicio/page.tsx             (Dashboard)
    encuesta/[id]/page.tsx      (Ejecucion Encuesta)
    billetera/page.tsx          (Billetera)
    premios/page.tsx            (Catalogo Premios)
    canje/page.tsx              (Solicitud Canje)
    perfil/page.tsx             (Perfil)
    referidos/page.tsx          (Referidos)
    soporte/page.tsx            (Soporte)
components/
  participantes-nav.tsx
  survey-renderer.tsx
  wallet-transaction.tsx
  ...
```

---

## Datos Mock Pendientes de Completar

1. **transacciones.ts** - Array de transacciones (suscripcion, pack_extra, redencion, reembolso)
2. **tiers.ts** - Definicion de tiers con precios y limites (Freemium, Profesional, Empresarial)
3. **Fix sus-003** - trial.respuestasLimite debe ser 5, no 500
4. **mockPlantillaService** - CRUD completo para el editor
5. **mockPremioService** - CRUD premios
6. **mockRedencionService** - Flujo aprobacion/rechazo
7. **Services faltantes** - Empresa, Suscripcion, Transaccion, AlertaFraude, TicketSoporte, AdminUsuario, Pais

---

## Metricas de Exito

- [ ] 34 pantallas implementadas y navegables
- [ ] 3 URLs publicas en AWS Amplify
- [ ] Datos mock realistas en todas las pantallas
- [ ] Navegacion completa sin dead ends
- [ ] Consistencia visual con Demo Navegable (Clientes + Admin)
- [ ] Mobile-first funcional en Participantes
- [ ] Zero TypeScript errors
- [ ] Performance aceptable (< 3s initial load)
