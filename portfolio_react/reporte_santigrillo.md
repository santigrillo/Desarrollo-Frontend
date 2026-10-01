# Reporte de evaluación — Santiago Grillo (santigrillo)

| Campo | Valor |
|---|---|
| Alumno | Santiago Grillo (auto-descripción: "Desarrollador Backend", estudiante de Tecnicatura en Programación Web y Licenciatura en Sistemas de Información) |
| Usuario GitHub | santigrillo |
| Repositorio | https://github.com/santigrillo/Desarrollo-Frontend |
| Ruta del proyecto en el repo | `portfolio_react/portfolio` (subcarpeta; package.json con react ^19.2.8 + vite ^8.3.0) |
| Stack | React 19.2 · Vite 8.3 · CSS propio (sin Tailwind, sin router, sin librerías extra) · oxlint |
| Build (`npm run build`) | ✅ pasa (vite build, 33 módulos, bundle ~230 KB, sin errores ni warnings) |
| Commits | 8 (último: 2026-09-24 17:37 -0300, "Avance portfolio") |

## Resumen ejecutivo
Portfolio React + Vite en estado de avance: la base está bien montada (estructura Vite correcta, StrictMode, createRoot, hooks con cleanup, build de producción exitoso) pero el trabajo está a medias: las secciones EXPERIENCIA LABORAL y PROYECTOS contienen solo placeholders ("Texto"), el nav tiene 4 de 5 enlaces muertos, no hay diseño responsivo (cero media queries) y el botón de modo oscuro no funciona ni tiene etiqueta. Cumplimiento del checklist: ~66 de ~83 puntos aplicables cumplidos (fragmento T-* excluido por no usar Tailwind; ~90 puntos no aplicables por no haber formularios, fetch, listas, tablas, router, etc.), con 17 hallazgos: 5 🔴 / 10 🟡 / 2 🟢. Nota cualitativa: **Deficiente → Aprobable** (sobre la frontera: la arquitectura React es correcta, pero el producto terminado no funciona en móvil y partes están rotas o vacías).

## Estado general del repositorio
- **Estructura:** Dentro del portfolio la organización es buena: `src/components/{Header,Main,Footer}` con CSS propio por componente, assets SVG en `src/assets`, `index.html` en la raíz, `main.jsx` con `createRoot`. El repo además contiene material de **otra entrega** (`Practica-1/Bootstrap_Metro_Dashboard/`, ~220 archivos de un dashboard Bootstrap con fuentes/imagery) que se ignora para esta evaluación.
- **Commits:** 8 commits con mensajes breves y descriptivos ("Creación de repositorio", "Portfolio React", "Avance portfolio"); historial razonable, sin squash gigante.
- **README:** El README raíz está **vacío (0 bytes)**. El portfolio conserva el README de la plantilla Vite (no personalizado); la documentación real está en `portfolio_react/readme.md` (instrucciones de instalación y estructura de componentes — aunque con errores: sugiere `sudo apt install npm` para todo sistema operativo y lista "Main -> {Main}").
- **Extravíos:** Sin `.env` commitado, sin `node_modules` ni `dist/` versionados (`.gitignore` correcto en `portfolio_react/portfolio/.gitignore:10-11`). El material de `Practica-1` (fuentes .eot/.ttf, imágenes) infla el repo pero no es del portfolio.
- **Datos del alumno:** Nombre "Santiago Grillo" en `src/components/Header/Portada.jsx:10`; GitHub: `https://github.com/santigrillo` (`Portada.jsx:27`); Instagram: `https://instagram.com/grillosanti_` (`Portada.jsx:32`); **sin email** en el sitio ni en el repo.

## Hallazgos

### 🔴 Críticos
- **Sin diseño responsivo: cero media queries en todo el CSS** — `portfolio_react/portfolio/src/index.css:1-9` (y ausencia de `@media` en todos los .css, verificado con grep en `src/`)
  - Problema: El layout no se adapta en absoluto: el título de portada está fijo en `font-size: 4rem` (`src/components/Header/Portada.css:24`) que desborda pantallas < ~400px, la navbar fija de 80px (`Navbar.css:1-16`) no cambia en móvil y no hay ningún breakpoint. Un portfolio sin media queries es un diseño que no funciona en móvil.
  - Corrección sugerida: Aplicar estrategia mobile-first: estilos base para mobile + `@media (min-width: 768px)` para pasar la portada a 2 columnas, acotar el título con `clamp(2rem, 5vw, 4rem)` y reorganizar navbar/acciones por breakpoint.
  - Checklist: C-11 (junto a C-16) · Apunte: apunte CSS, sección 2.2
- **`lang="en"` en contenido íntegramente en español** — `portfolio_react/portfolio/index.html:2`
  - Problema: `<html lang="en">` con todo el texto del portfolio en español; lectores de pantalla anunciarán acentos y vocales en inglés y los buscadores mal clasifican el idioma.
  - Corrección sugerida: Cambiar a `<html lang="es">`.
  - Checklist: H-02 · Apunte: apunte HTML, sección 1.1
- **4 de 5 anclas internas rotas: nav y CTAs que no llevan a ningún lado** — `src/components/Header/Navbar.jsx:27` (`#proyectos`), `Navbar.jsx:28` (`#habilidades`), `src/components/Header/Portada.jsx:15` (`#cv`), `Portada.jsx:21` (`#contacto`)
  - Problema: Solo existe `id="perfil"` (`src/components/Main/Main.jsx:7`). Los enlaces del nav "PROYECTOS" y "HABILIDADES" y los botones "Descargar CV" (con `download` a `#cv` sin archivo) y "Contactame" no resuelven a ningún destino: toda la navegación secundaria y ambos CTAs del hero son muertos. El nivel 🔴 se asigna por el alcance de la rotura funcional (rompe la navegación principal), aunque el código del punto es H-20.
  - Corrección sugerida: Agregar `id="proyectos"` a la sección de proyectos y `id="habilidades"` a la de habilidades en `Main.jsx`, y crear/mapear las secciones de CV (archivo real descargable) y contacto con sus ids.
  - Checklist: H-20 · Apunte: apunte HTML, sección 1.5
- **Botón de modo oscuro sin etiqueta accesible y sin funcionalidad** — `src/components/Header/Navbar.jsx:32-34` (CSS: `Navbar.css:54-68`)
  - Problema: El `<button>` contiene solo `<img alt="">` (sin texto ni `aria-label`) → sin nombre accesible, y no tiene `onClick` ni `type`: es un control de formulario inválido que no hace nada y que un usuario de lector de pantalla escucha como "botón, vacío".
  - Corrección sugerida: Implementar el toggle (`document.documentElement.classList.toggle('dark')` + persistencia) o eliminar el botón; si se queda, añadir `aria-label="Cambiar a modo oscuro"`.
  - Checklist: H-37 · Apunte: apunte HTML, sección 2.3
- **Contraste insuficiente en el footer (~2,7:1, mínimo 4,5:1)** — `src/components/Footer/Footer.css:15-18` (`color: grey` + `opacity: 0.8` sobre fondo `#fafafa` de `Footer.css:8`)
  - Problema: `grey` (#808080) con opacidad 0,8 sobre #fafafa da ≈2,75:1, muy por debajo del 4,5:1 de WCAG para texto normal (0,85rem no es texto grande); el texto del footer es prácticamente ilegible.
  - Corrección sugerida: Usar un gris más oscuro (p. ej. `#6b6b6b`, ≈5,2:1 sobre #fafafa) y quitar la opacidad.
  - Checklist: C-17 · Apunte: apunte CSS, sección 3.1

### 🟡 Importantes
- **Enlaces `target="_blank"` sin `rel="noopener"`** — `src/components/Header/Portada.jsx:27` y `Portada.jsx:32`
  - Problema: GitHub e Instagram se abren en pestaña nueva sin `rel="noopener"`; la página destino podría acceder a `window.opener` y manipular el historial del portfolio.
  - Corrección sugerida: `rel="noopener noreferrer"` en ambos enlaces.
  - Checklist: H-21 · Apunte: apunte HTML, sección 1.5
- **Enlaces sociales sin nombre accesible y sin aviso de pestaña nueva** — `src/components/Header/Portada.jsx:26-34`
  - Problema: Los `<a>` contienen solo un `<img alt="">` (decorativo): el enlace no tiene ningún nombre accesible (un lector anuncia "enlace" sin destino) y no se indica que se abre en una pestaña nueva.
  - Corrección sugerida: Añadir `aria-label="GitHub (se abre en una pestaña nueva)"` y `"Instagram (se abre en una pestaña nueva)"` a cada enlace.
  - Checklist: H-19, H-22 · Apunte: apunte HTML, sección 1.5
- **`new Date()` en el cuerpo del render (no determinismo)** — `src/components/Footer/Footer.jsx:7`
  - Problema: `© {new Date().getFullYear()}` calcula el año en cada render; el apunte exige que el render no llame funciones no deterministas para decidir la UI.
  - Corrección sugerida: Calcular el año una vez fuera del render (constante del módulo) o hardcodearlo al año de despliegue.
  - Checklist: R-13 · Apunte: apunte React, secciones 1.8 y 2
- **Sin skip link para saltar la navegación** — `portfolio_react/portfolio/src/` (ausencia, verificado con grep "skip")
  - Problema: No hay "saltar al contenido"; un usuario de teclado debe Tabear la navbar, los CTAs y las redes antes de llegar al contenido.
  - Corrección sugerida: Agregar un `<a href="#perfil">` como primer hijo del `body`, oculto hasta `:focus-visible`.
  - Checklist: H-51 · Apunte: apunte HTML, sección 3.3
- **Enlaces del nav sin lista (a sueltos dentro de nav)** — `src/components/Header/Navbar.jsx:25-29`
  - Problema: Los 3 enlaces del nav no están en `<ul>/<li>`; los lectores de pantalla no anuncian la estructura de lista ("elemento 2 de 3").
  - Corrección sugerida: Envolver los enlaces en `<ul>` con `<li>` (estilo con flex + `list-style: none`).
  - Checklist: H-09 · Apunte: apunte HTML, sección 1.2
- **`<title>` genérico y sin descriptividad** — `portfolio_react/portfolio/index.html:18` (`<title>portfolio</title>`)
  - Problema: La pestaña dice "portfolio" en lugar de algo descriptivo del autor.
  - Corrección sugerida: `Santiago Grillo — Desarrollador` (o similar).
  - Checklist: H-03 · Apunte: apunte HTML, sección 1.1
- **Tamaños de fuente en px fijos (rompen el redimensionado al 200%)** — `src/components/Main/Main.css:21` (`font-size: 15px`) y `Main.css:27` (`font-size: 15px`)
  - Problema: Los títulos de sección y el texto del cuerpo están en px: al hacer zoom 200% en el navegador no escalan con la preferencia del usuario (también es desajuste de la convención de unidades relativas).
  - Corrección sugerida: `font-size: 0.94rem` / `0.94rem` (o `1rem`), y revisar el resto de px tipográficos.
  - Checklist: C-10 (junto a C-21) · Apunte: apunte CSS, sección 2.1
- **Animaciones/transiciones sin respetar `prefers-reduced-motion`** — `src/components/Header/Navbar.css:15`, `Portada.css:51`, `Navbar.css:25`
  - Problema: Hay varias `transition` y transformaciones (fade del logo, scale de botones/redes) sin condicionarse a la preferencia de movimiento del sistema.
  - Corrección sugerida: Envolver las transiciones/animaciones en `@media (prefers-reduced-motion: no-preference)`.
  - Checklist: C-23 · Apunte: apunte CSS, sección 3.4
- **Objetivo táctil demasiado pequeño en el botón de modo oscuro** — `src/components/Header/Navbar.css:54-68` (`padding: 0`, icono de 20px)
  - Problema: El área clicable es ≈20×20px, muy por debajo de los ~44px recomendados para objetivos táctiles.
  - Corrección sugerida: `padding: 12px` (amplía el área sin agrandar lo visual).
  - Checklist: C-22 · Apunte: apunte CSS, sección 3.3
- **Variables CSS parciales: colores hex duros esparcidos fuera de Portada** — `src/components/Header/Navbar.css:36` (`#005c66`), `src/components/Main/Main.css:17` (`#005c66`), `Footer.css:8-16` (`#fafafa`, `grey`)
  - Problema: Las custom properties existen solo en `:root` de `Portada.css:1-5` y se consumen solo ahí; el resto del CSS repite el mismo teal `#005c66` hardcodeado, así que re-estilizar el sitio requiere buscar-reemplazar en 4 archivos.
  - Corrección sugerida: Mover las variables a `index.css` (`:root` global) y consumirlas con `var()` en Navbar/Main/Footer.
  - Checklist: C-08 · Apunte: apunte CSS, sección 1.11

### 🟢 Deseables
- **Imágenes sin `width`/`height` en HTML (tamaño solo por CSS)** — `src/components/Header/Navbar.jsx:21,33`, `Portada.jsx:17,23,28,33`
  - Problema: Los `<img>` no declaran dimensiones en el markup (las fija el CSS, p. ej. `Navbar.css:22-26`); sin el atributo, el layout puede saltar mientras se carga el recurso en redes lentas.
  - Corrección sugerida: Agregar `width`/`height` coincidentes con el CSS, o `aspect-ratio` equivalente.
  - Checklist: H-25 · Apunte: apunte HTML, sección 1.6
- **Título de hero sin acotación fluida con `clamp()`** — `src/components/Header/Portada.css:19-25` (`font-size: 4rem` fijo)
  - Problema: El titular grande es un tamaño fijo que no se adapta fluidamente al viewport.
  - Corrección sugerida: `font-size: clamp(2.5rem, 8vw, 4rem)` para un hero fluido entre mobile y desktop.
  - Checklist: C-12 · Apunte: apunte CSS, sección 2.2

**Puntos verificados y cumplidos (muestra):** H-01/H-04/H-05 (head correcto, `index.html:1-6`), H-06/H-07/H-08 (landmarks `header/nav/main/section/footer`, único `<main>` en `Main.jsx:5`), H-12/H-13 (outline h1→h2 sin saltos, único `<h1>` en `Portada.jsx:10`), H-23/H-24 (todo `<img>` con `alt`, decorativas con `alt=""`), H-52/C-19 (no se elimina el focus), C-04/C-05/C-07/C-09 (flex bien usado, `:hover`, transiciones, sin float), C-13 (viewport, `index.html:6`), C-19 (focus nativo intacto), J-05/J-06 (solo `const`/destr. de `useState`, sin `var`), J-10/J-14 (ternarios y flechas), J-27/J-32 (sin manipulación de `document.*`; listener `handleScroll` con `removeEventListener` en cleanup, `Navbar.jsx:14-15`), R-01/R-02/R-03/R-04 (React 19 coherente, scripts Vite, estructura correcta, build OK), R-05/R-12 (JSX correcto, hooks en el tope), R-08/R-09 (`isScrolled` estado genuino con prefijo `is`), R-14/R-15/R-27 (deps `[]` correcto: el efecto no lee variables externas cambiantes), R-32/R-33 (StrictMode + createRoot, `main.jsx:1-9`).

**No aplicables (no penalizados):** T-01…T-22 (sin Tailwind en `package.json`); H-11/15/16/17/18/26-31 (sin aside, strong/em, citas, listas, dl, tablas, video, figure, details); H-32-44/47-50 (sin formularios en el portfolio); J-01/03/04/11-13/15-18/20-26/30-31/33-45 (sin dinero, tipos externos, bucles, switch, rest, try/catch, mutación de arrays de estado, sort, Object, optional chaining, JSON, aleatorios, rAF, forms, delegación, debounce, fetch/promesas); R-07/16-26/29-31/34-41/43-49 (sin inputs, useReducer, refs, context, memo, lazy, router, Suspense, APIs R19, tests, Profiler — la app es de una sola vista sin datos externos). R-47: no verificable (sin configuración de despliegue en el repo; no se detectó base path ni fallback de GH Pages).

## Secciones sugeridas para agregar
1. **Stack tecnológico con badges/íconos** — Chips con los tecnologías reales usadas (React, Vite, JS, CSS) y nivel de dominio. Por qué suma: es lo primero que un reclutador filtra en 2025-2026 (ATS y screening visual rápido).
2. **Proyectos con demo en vivo + repositorio + stack por proyecto** — Cards con screenshot/GitHub/preview, tecnologías de cada proyecto y un reto concreto que resolvió. Por qué suma: el patrón dominante de portfolios frontend; hoy se espera "verlo funcionando", no solo describirlo.
3. **Línea de tiempo de experiencia/estudios** — Timeline visual (formato `<ol>` semántico) con roles, instituciones y fechas. Por qué suma: estructura canónica del portfolio junior y valida el "EXPERIENCIA LABORAL" que hoy está vacío.
4. **Sección de contacto real (formulario + email + redes centralizadas)** — Formulario accionable (Formspree/Endpo) o al menos `mailto:`, más las redes reunidas en un solo bloque con nombres visibles. Por qué suma: el CTA "Contactame" está roto; un canal de contacto funcional es la sección que convierte visitas en respuestas.
5. **Sección "Proceso de trabajo" o datos curiosos (fun facts)** — Cómo trabaja (Git flow, testing, revisión), disponibilidad, zona horaria. Por qué suma: diferencial de 2025-2026 para perfiles juniors; humaniza y muestra madurez.
6. **Blog/mini-apuntes técnicos (aunque sean 2 entradas)** — Enlaces a notas cortas sobre lo que aprendió (hooks, Vite, CSS). Por qué suma: escribe = piensa; es un multiplicador de confianza para perfiles junior y mejora el SEO del portfolio.
7. **Testimonios o recomendaciones** — Citas de docentes, líderes de equipo o clientes de los trabajos prácticos. Por qué suma: prueba social; muy solicitada en portfolios senior y cada vez más esperada en juniors con experiencia universitaria/TPs.
8. **Estado de disponibilidad + "siguiente paso"** — Badges de "disponible para prácticas/internships" y un CTA único claro (descargar CV real). Por qué suma: portfolios de 2025-2026 con CTA explícito de acción consiguen más respuestas de reclutamiento.

> Evalúese contra el checklist de Evaluaciones React 2026 (checklist_evaluacion_react.md).
