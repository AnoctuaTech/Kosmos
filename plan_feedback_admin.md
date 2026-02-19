# Plan de Ajustes - Módulo Admin (Feedback Cliente)

**Fecha:** 19/02/2026
**Fuente:** Feedback de RQR (Rolando Quirós) en capturas de pantalla + Excel "Cosmos_ Ejecución.xlsx"
**Alcance:** Solo módulo Admin - ajustes sobre lo ya implementado

---

## Resumen Ejecutivo

El cliente (RQR) revisó las pantallas del módulo Admin y proporcionó feedback detallado en 11 áreas. Los cambios van desde ajustes menores (renombrar campos, agregar filtros) hasta un rediseño mayor del editor de preguntas. Se agrega una pantalla nueva (Gestión de Categorías) y se amplían los tipos de pregunta de 5 a 16.

---

## 1. Editor de Preguntas — REDISEÑO MAYOR

### Estado actual
- Layout: sidebar con lista de preguntas + panel de edición a la derecha
- 5 tipos de pregunta: selección única, selección múltiple, escala Likert, ranking, texto corto
- Reglas de lógica en tab separado

### Lo que pide el cliente
> "Sugiero una vista de cuestionario donde tenga la izquierda preguntas que puedo añadir y a la derecha una vista 'previa' del cuestionario, donde puedo ir 'saltando' entre preguntas. Siempre se mostraría una pregunta por pantalla."
> "Los tipos de campos de preguntas aparecen acá" (referencia a hoja "Tipos de Variables")
> "Mi recomendación sería realizar un cuestionario como tal, con todas las preguntas que se quieran, luego se podrían establecer los saltos o filtros."

### Cambios requeridos

#### 1.1 Nuevo layout split-view
- **Izquierda:** Lista de preguntas del cuestionario (reordenables) + botón para agregar nueva pregunta (abre selector de tipo)
- **Derecha:** Preview del cuestionario mostrando UNA pregunta por pantalla, con navegación entre preguntas (anterior/siguiente)
- El diseño exacto se definirá iterativamente con Enzo antes de implementar

#### 1.2 Ampliar a 16 tipos de pregunta (de "Tipos de Variables" del Excel)

| # | Tipo | Descripción | Notas de implementación |
|---|------|-------------|------------------------|
| 1 | Texto corto | Una línea, avanza con Enter | Validación: mínimo de caracteres |
| 2 | Texto largo | Varias líneas, párrafos | Enter = nuevo párrafo, Shift+Enter = siguiente pregunta |
| 3 | Imagen o video | Elemento del cuestionario (estímulo) | El cliente sube material a evaluar. En preview: placeholder de imagen/video |
| 4 | Foto | Multimedia: subir foto o seleccionar de galería | Tamaño máximo 10MB. En preview: botón de upload simulado |
| 5 | Selección de imagen | Imágenes pequeñas para selección única/múltiple | Cada imagen con etiqueta opcional. Config: tipo (única/múltiple), mínimo de selección |
| 6 | Ranking | Ordenar conjunto de opciones | Drag-and-drop visual en preview |
| 7 | Escala | Selección numérica en rango | Config: min, max, etiquetas en extremos y centro |
| 8 | Matriz | Tabla de respuesta (filas x columnas) | Config: única o múltiple por fila. Al menos una respuesta por fila |
| 9 | Fecha | Selector de fecha | Config: mayor/menor que fecha determinada |
| 10 | Número | Input numérico sin decimales | Config: número mínimo, número máximo (ambos o ninguno) |
| 11 | Dropdown | Lista desplegable con búsqueda | Permite buscar al digitar |
| 12 | Texto informativo | Solo texto de ayuda, sin pregunta | Config: texto del botón personalizable |
| 13 | Sí o No | Dicotómica | Tipo común, interfaz simplificada |
| 14 | Selección única | Una sola opción, salta automáticamente | Casillas redondas. Incluye opción "Otro" semi-abierta |
| 15 | Selección múltiple | Varias opciones, no salta automáticamente | Casillas cuadradas. Config: mínimo de selección. Incluye "Otro" |
| 16 | Página web | Input de URL validado | Valida formato: algo.algo |

**Nota:** Cada pregunta puede marcarse como obligatoria o no (por defecto: obligatoria).

#### 1.3 Lógica de reglas mejorada (visual + funcional en mock)

El cliente pide que la lógica se configure **después** de crear el cuestionario completo, y distingue tres mecanismos:

**a) Salto (Skip Logic)**
- "Si marca tal respuesta, va para tal pregunta"
- Se configura por variable/pregunta
- UI: selector de condición + pregunta destino

**b) Filtro**
- "Esta pregunta NO se muestra si se cumple una condición previa"
- UI: selector de condición que oculta la pregunta

**c) Rechazo (Screener)**
- Tipo especial de salto-filtro que TERMINA el cuestionario
- "Impide a un usuario avanzar porque no cumple los controles"
- Siempre en las primeras ~10 preguntas
- Muestra pantalla: "Tu perfil no se adecúa a lo requerido, ¡será la próxima!"
- Opcionalmente otorga puntos simbólicos de consuelo
- UI: checkbox "Esta es una pregunta de rechazo/screener" + condición de rechazo

#### 1.4 Answer Piping (visual + funcional en mock)
> "Consultamos sobre la bebida favorita (Coca Cola, Pepsi) y más adelante, dentro del texto de una pregunta indicamos: ¿Qué hace que {respuesta} sea su favorita?"

- En el editor de texto de cualquier pregunta, botón para insertar referencia a respuesta anterior
- Sintaxis visual: `{P1}` o `{respuesta de "Pregunta X"}`
- En el preview: se muestra con placeholder simulado (ej: "¿Qué hace que **Coca-Cola** sea su favorita?")

#### 1.5 Opciones condicionales (Conditional Answer Options)
> El ejemplo del cliente: "¿Qué marcas conoce?" (múltiple) → "¿Cuál es su favorita?" (única) solo muestra las marcas seleccionadas antes.

- Al editar opciones de respuesta de una pregunta, opción de "Mostrar solo opciones seleccionadas en pregunta X"
- UI: toggle + selector de pregunta fuente
- En preview: se muestra con datos mock simulando el filtrado

---

## 2. Lista de Plantillas

### Estado actual
- Tabla con columnas: #, Título, Tipo (con badges de color), Segmento, Respuestas, Estado

### Lo que pide el cliente
> "En lugar de tipo colocaría Categoría. Las categorías se deben poder editar en otra sección. El campo de respuestas acá no procede. Estado puede ser: Activo, Inactivo, Borrador. Además, un campo de fecha con la última edición."

### Cambios requeridos
- [ ] Renombrar columna "Tipo" → "Categoría"
- [ ] Eliminar columna "Respuestas" (no aplica para plantillas)
- [ ] Columna "Estado" con solo 3 valores: Activo (verde), Inactivo (gris), Borrador (amarillo)
- [ ] Agregar columna "Última edición" (fecha)
- [ ] Verificar que cada fila es clickeable para editar

---

## 3. Nueva pantalla: Gestión de Categorías

### Lo que pide el cliente
> "Las categorías se deben poder editar en otra sección, con lo básico: Nombre, Descripción, Uso recomendado."

### Implementación
- **Ubicación en sidebar:** Fábrica → Categorías (debajo de Plantillas)
- **Ruta:** `/categorias`
- **Pantalla:** Tabla CRUD con columnas:
  - Nombre de categoría
  - Descripción
  - Uso recomendado
  - Cantidad de plantillas asociadas
  - Acciones (Editar, Eliminar)
- **Modal/formulario:** Crear/Editar categoría con los 3 campos
- **Mock data:** 6-8 categorías predefinidas (Salud de marca, Evaluación de producto, Experiencia del cliente, Hábitos de consumo, Percepción de valor, Satisfacción NPS, Evaluación publicitaria, Pricing)

---

## 4. Configuración General de Plantilla

### Lo que pide el cliente
> "Incluir una categoría, acá se podría seleccionar de las existentes o añadir una nueva."
> "Lo de la segmentación está perfecto, solamente permitir uno o más segmentos o grupos recomendados como 'muestra' para que el cliente luego pueda elegir."

### Cambios requeridos
- [ ] Agregar campo "Categoría" (dropdown con categorías existentes + opción "Crear nueva")
- [ ] Mejorar sección de segmentación: permitir definir uno o más "grupos muestra" recomendados
- [ ] Incluir variables de categorización del NSE en las opciones de segmentación
- [ ] Etiquetas/intereses: mantener pero aclarar que sirven para priorizar asignación de estudios

---

## 5. Dashboard de Monitoreo

### Lo que pide el cliente
> "Añadiría la posibilidad de aplicar un filtro por país, adicional al de mes (y adicionar a este último la opción de filtro por rango de tiempo). Sumaría un campo para 'clientes nuevos'."

### Cambios requeridos
- [ ] Agregar filtro dropdown "País" (Todos, Costa Rica, Panamá, Guatemala, etc.)
- [ ] Cambiar selector de mes por selector de rango de fechas (desde/hasta) o mantener mes + agregar opción "Rango personalizado"
- [ ] Agregar KPI card "Clientes Nuevos" (registrados en el período seleccionado)
- [ ] Todos los datos del dashboard deben responder a los filtros seleccionados

---

## 6. Gestión de Participantes (Perfil Individual)

### Lo que pide el cliente
> "Colocaría un botón adicional que sea 'forzar cambio de contraseña' que genere una contraseña temporal y la mande al usuario al mail autorizado."
> "La posibilidad de editar también es genial, de poderse mostrar en algún campo un estado de auditoría estaría perfecto, para saber 'quién' fue quien modificó qué cosa."

### Cambios requeridos
- [ ] Agregar botón "Forzar Cambio de Contraseña" en panel izquierdo de acciones
  - Al hacer clic: modal de confirmación → simula generación de contraseña temporal → notificación de envío por email
  - El usuario debe cambiarla en su primer acceso
- [ ] Agregar sección "Historial de Cambios" o "Auditoría" en el perfil
  - Tabla/lista con: Fecha, Usuario admin que hizo el cambio, Campo modificado, Valor anterior → Valor nuevo
  - Especialmente importante para: puntos, estado de cuenta, datos personales
- [ ] Mock data: 5-8 entradas de auditoría de ejemplo

---

## 7. Gestión de Clientes/Empresas

### Lo que pide el cliente
> "Permitir que la persona pueda mostrar la cantidad de empresas a ver por cada página: 5, 10, 20 y 30."

### Cambios requeridos
- [ ] Agregar selector de "Items por página" en el footer de la tabla: 5, 10, 20, 30
- [ ] Actualizar componente DataTable compartido si no lo soporta aún
- [ ] Aplicar mismo cambio a todas las tablas que usen DataTable

---

## 8. Cola de Redenciones

### Lo que pide el cliente
> "Siempre quedarían de primeros los canjes más antiguos. Prioridad Baja los de últimos 3 días. Media de 3 a 7 días. Alta de más de 7 días."
> "Al momento de revisar, se permitirá escribir texto o adjuntar imagen que llegará al usuario."
> "Tan pronto se apruebe, se remueven los puntos de su cuenta, de manera automática."

### Cambios requeridos
- [ ] Ordenamiento por defecto: más antiguo primero
- [ ] Prioridad automática basada en antigüedad:
  - **Baja** (azul): 0-3 días desde la solicitud
  - **Media** (amarillo): 3-7 días
  - **Alta** (rojo): más de 7 días
- [ ] Al aprobar/revisar, agregar modal con:
  - Campo de texto para observaciones/mensaje al usuario
  - Botón para adjuntar imagen (comprobante SINPE, tarjeta regalo, etc.)
  - Preview del archivo adjunto
- [ ] Notificaciones simuladas:
  - Al solicitar canje: email a usuario + email a admin país
  - Al aprobar: puntos se deducen automáticamente + email de confirmación al usuario con comprobante
- [ ] Mock data: ajustar prioridades según regla de días

---

## 9. Sidebar con Indicadores de Notificación

### Lo que pide el cliente
> "Colocaría este tipo de indicadores dentro del menú, al menos hasta que se revise todo lo que requiere atención."

### Cambios requeridos
- [ ] Agregar badge numérico o dot rojo en items del sidebar que tienen items pendientes:
  - **Cola de Redenciones:** cantidad de pendientes
  - **Control de Fraude:** cantidad de alertas activas (alto riesgo)
  - Potencialmente: **Excepciones Neuro/VAS** si hay items en "Recibido"
- [ ] Los badges se calculan desde mock data
- [ ] Visualmente: un círculo rojo pequeño con número, al estilo notificación

---

## 10. Control de Fraude

### Lo que pide el cliente
> "Un usuario con cualquier alerta activa deja de recibir estudios hasta que la alerta sea eliminada. El bloqueo será silencioso."
> "Recomendaría mostrar la alerta amarilla de arriba cada vez que el usuario accede."
> "Hacer lo mismo con las solicitudes de la cola de redenciones."

### Cambios requeridos
- [ ] Botón "Investigar" → navega a vista detallada de la alerta:
  - Datos del usuario
  - Historial de actividad sospechosa
  - Detalle del tipo de alerta (IP, tiempos, patrón)
  - Acciones: Limpiar alerta, Suspender usuario, Marcar como falso positivo
- [ ] Agregar indicador visual en perfil de participante cuando tiene alerta activa
- [ ] Banner persistente en el dashboard admin al hacer login:
  - Alertas de fraude de alto riesgo pendientes (descartable, reaparece en siguiente login)
  - Solicitudes de redención pendientes (descartable, reaparece en siguiente login)
- [ ] Bloqueo silencioso: en mock data, usuarios con alerta tienen flag `bloqueadoSilenciosamente: true`

---

## 11. Etiquetas (Tags) — Aclaración

### Lo que pide el cliente
> "Las etiquetas tienen algún sentido práctico? Lo imagino como en un WordPress, para vincular estudios similares más allá de la categoría."

### Decisión
- Las etiquetas se mantienen como mecanismo secundario de clasificación (similar a tags de WordPress)
- Útiles para vincular plantillas similares más allá de su categoría
- En Configuración General: se usan también como "intereses" para priorizar asignación de estudios a participantes
- No requiere cambios mayores, solo clarificar la UI con un tooltip o help text

---

## 12. Actualizaciones de Mock Data

Para soportar todos los cambios anteriores:

- [ ] Nuevos tipos de pregunta en mock data (16 tipos con ejemplos para cada uno)
- [ ] Categorías mock (8 categorías basadas en los cuestionarios del Excel)
- [ ] Datos de auditoría para perfil de participante
- [ ] Prioridades de redención calculadas por fecha
- [ ] Flags de notificación para sidebar badges
- [ ] Datos de alerta expandidos para vista "Investigar"
- [ ] Banners persistentes mock

---

## Orden de Implementación Sugerido

### Fase 1 — Cambios menores (rápidos, alto impacto visual)
1. Lista de Plantillas (renombrar campos, quitar/agregar columnas)
2. Dashboard de Monitoreo (agregar filtros + KPI)
3. Gestión de Clientes (paginación configurable)
4. Sidebar con badges de notificación
5. Banners persistentes en dashboard

### Fase 2 — Cambios medianos
6. Gestión de Participantes: botón contraseña + auditoría
7. Cola de Redenciones: prioridad automática + modal de aprobación con comprobante
8. Control de Fraude: vista "Investigar" + bloqueo silencioso
9. Configuración General: campo categoría + mejora segmentación

### Fase 3 — Pantalla nueva
10. Gestión de Categorías (nueva ruta + CRUD)

### Fase 4 — Rediseño mayor (editor)
11. Nuevo layout split-view del editor (diseño iterativo con Enzo)
12. Implementar 16 tipos de pregunta
13. Lógica de reglas: salto, filtro, rechazo
14. Answer piping
15. Opciones condicionales

---

## Notas Importantes

- **Editor de preguntas:** El rediseño se hará de forma iterativa. Antes de implementar, se presentará a Enzo el diseño propuesto de cada parte para aprobación.
- **Lenguaje:** Recordar NO usar la palabra "encuesta" en la UI — usar "estudio" o "evaluación" (indicación del Excel, hoja Generales).
- **Prototype scope:** Todo es visual + funcional con mock data. No hay backend real, pero las interacciones deben sentirse reales.
- **Tipos de pregunta del Excel:** La hoja "Tipos de Variables" es la fuente definitiva de los 16 tipos.
- **Cuestionarios básicos:** El Excel incluye 10+ cuestionarios predefinidos (CX, NPS, Hábitos de Consumo, Publicidad, Salud de Marca, Percepción de Valor, Competencia, Pricing, Canales, Perfilamiento, Atributos). Estos se pueden usar como mock data para las plantillas.
