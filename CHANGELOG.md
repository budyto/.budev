# Budev - Registro de Cambios (Changelog)

Este documento guarda el historial de todas las implementaciones, optimizaciones y bug-fixes que se han realizado en el código hasta la fecha. 

Sirve como bitácora y permite que cualquier IA o programador entienda rápidamente el contexto de lo modificado ahorrando tokens.

## [v1.0.1] - Mejoras de Layout, Formulario Dual y Git
### 🚀 Funcionalidad y Formularios
- **Botones de Envío Contacto Dual:** Se rediseñó el final del formulario de contacto para incluir **dos botones** independientes (`Enviar por WhatsApp` y `Enviar por Email`) que operan por JavaScript. 
- **Validación Estricta:** Implementación nativa con `reportValidity()` para forzar que el visitante siempre complete nombre, mail y servicio antes de disparar las URLs a correo o WhatsApp.
- **Auto-rellenado Eficiente:** Ambas opciones capturan automáticamente la opción del dropdown (ej: 'Branding') y redactan la plantilla final con saltos de línea codificados adecuadamente (`\n` para JS y `%0A` codificado en URL).

### 📱 Optimizaciones y Layout Móvil (Responsive)
- **Orden del Portfolio Vertical:** Arreglo mediante el hack de `display: contents` y mayor peso de CSS (`.project-scene-inner .project-scene-info`) que organiza estructuralmente la escena a:
  1. Número y Etiqueta
  2. Título Central
  3. **Mockup (Imagen en medio)**
  4. Texto Descriptivo y Tags
  5. Botón
- **Arreglo del Hero Apretado:** Se abandonó el auto-centering del Hero de la página principal a favor de un `padding-top: 140px` forzado, asegurando respiro por debajo del header flotante en resoluciones pequeñas.
- **Centrado de Títulos:** Alineación arreglada (`text-align: center`) en mobile para todas las cabeceras de sección, mejor visual en "Mis Trabajos".
- **Responsive Mockup fix:** Reducción porcentual de las computadoras (85%) y celulares flotantes en `.project-scene` con `max-width: 600px` para que no rompan ni corten horizontalmente la lectura tras el nuevo ordenamiento.

### ⚙️ Assets y SEO
- Metaetiquetas Open Graph (OG) agregadas junto a la vinculación y enlazado limpio del `<link rel="icon">`.
- **Favicons re-sincronizados:** `favicon.ico.svg` convertido a `favicon.svg`. Se adicionó en la carpeta raíz (`/`) el archivo forzado `.ico` copiando la metadata en formato bruto para silenciar los requests fantasmas de Google Chrome DevTools (`GET 404`).
- Integración de `loading="lazy"` estructural a las imágenes densas y renombrado eficiente de `social-banner.png`.

### 📦 Configuración del Proyecto
- Inicialización en Git (`git init`) controlada y enviada satisfactoriamente (vía terminal local con git Credential Manager global) hacia la bóveda en `github.com/budyto/.budev`.
- Creada esta memoria técnica para optimización por tokens de historial futuro.
