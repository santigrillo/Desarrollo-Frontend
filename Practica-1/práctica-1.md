# Práctica 1 - Guía y Resolución.

## Para correr el proyecto.

```bash 
cd Practica-1/Bootstrap_Metro_Dashboard && python3 -m http.server 8000
```

## Ejercicio 2 - Actualizar bibliotecas y plug-ins.
1) Clonar el repositorio: `https://github.com/sharno/Bootstrap_Metro_Dashboard`
* Actualizar las bibliotecas de JQuery, Bootstrap y JQuery UI.
* Agregar modo oscuro, seleccionable a gusto del usuario.

### Versiones  
JQuery -> 1.9.1 - Actualizamos a 3.7.1
jQuery Migrate -> 1.0.0 - Actualizamos a 3.4.1
jQuery UI -> 1.10.0 - Actualizamos a 1.13.3
Boostrap -> 2.3.1 - Actualizamos a 2.3.2 para mantener mas compatibilidad.

### Actualizar versiones.
En el <head> actualizamos jQuery UI a la versión 1.13.3
Al final del <body> reemplazar scripts con las versiones antiguas por las versiones actualizadas, buscar: Actualización bibliotecas.


### Agregar modo oscuro.
En la barra de navegación agregamos el botón para poder cambiar entre modo oscuro/claro y se crea el dark-mode.css con el modo oscuro, buscar: Botón modo oscuro
Javascript embebido, archivo dark-mode.js. Buscar -> Script modo oscuro.


2) Basandose en las sugerencias realizadas en el punto 1, agregue al sitio e implementar en index.html, 3 plug-ins compatibles con las nuevas versiones actualizadas. Puede elegirse de `https://www.npmjs.com/search?q=keywords:jquery-plugin​`

### Resolución: Integración Nativa de 3 Plugins Modernos

1. Lista desplegable para elegir periodo (simulación) para ajustar las estadisticas según el tiempo en la barra principal.
2. Toastr: Sistema de notificaciones de la página (notifica inicio de sesión, cambios de modo, icono de refresco)
3. Modal de "+" en el div de **To Do List** para crear tareas.

### Guía de Implementación Paso a Paso
#### 1. Inclusión de Hojas de Estilo (en el `<head>` de `index.html`)
Colocar justo antes de `resoluciones/dark-mode.css`:

```html
<!-- Plugins Modernos CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
```
#### 2. Modificaciones en la Maquetación HTML (`index.html`)

##### A. Filtro de Período con Select2 en el Breadcrumb (alrededor de la línea 385):
```html
<ul class="breadcrumb">
    <li>
        <i class="icon-home"></i>
        <a href="index.html">Home</a> 
        <i class="icon-angle-right"></i>
    </li>
    <li><a href="#">Dashboard</a></li>
    <!-- Filtro interactivo de período -->
    <li class="pull-right" style="margin-top: -4px;">
        <span style="margin-right: 6px; font-size: 11px; font-weight: bold; text-transform: uppercase;"><i class="icon-calendar"></i> Período:</span>
        <select id="dashboard-period-filter" style="width: 190px;">
            <option value="today">📅 Hoy (Tiempo real)</option>
            <option value="week" selected>📅 Esta Semana</option>
            <option value="month">📅 Este Mes (Septiembre)</option>
            <option value="quarter">📅 Último Trimestre</option>
            <option value="year">📅 Año 2026</option>
        </select>
    </li>
</ul>
```

##### B. Botón de Nueva Tarea en la cabecera de la caja "To Do List" (alrededor de la línea 925):
Reemplazar el botón `.btn-setting` por `.btn-add-todo`:
```html
<div class="box-icon">
    <a href="#" class="btn-add-todo" title="Nueva Tarea"><i class="halflings-icon white plus"></i></a>
    <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
    <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
</div>
```
#### 3. Inclusión de Scripts y Lógica JavaScript (antes de `</body>` de `index.html`)

```html
<!-- Librerías de los Plugins Modernos -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
$(document).ready(function() {
    /* ==========================================
     * 1. TOASTR: Sistema de Notificaciones
     * ========================================== */
    toastr.options = {
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "timeOut": 4000
    };

    // Bienvenida al cargar el Dashboard
    setTimeout(function() {
        toastr.success('Sesión iniciada como Dennis Ji. Panel cargado correctamente.', 'Metro Dashboard');
    }, 800);

    // Sincronización en los botones de refresco del Header (Notificaciones, Tareas, Mensajes)
    $('a[href="#refresh"]').on('click', function(e) {
        e.preventDefault();
        var $menu = $(this).closest('.dropdown-menu');
        var tipo = $menu.hasClass('tasks') ? 'Tareas' : ($menu.hasClass('messages') ? 'Mensajes' : 'Notificaciones');
        toastr.info('Bandeja de ' + tipo + ' sincronizada con el servidor.', 'Sincronización en Vivo');
    });

    /* ==========================================
     * 2. SELECT2: Filtro de Fechas en Breadcrumb
     * ========================================== */
    $('#dashboard-period-filter').select2({
        minimumResultsForSearch: Infinity
    }).on('change', function() {
        var periodo = $(this).find('option:selected').text();
        toastr.info('Métricas del panel actualizadas para: ' + periodo, 'Filtro Aplicado');
    });

    /* ==========================================
     * 3. SWEETALERT2: Agregar Nueva Tarea a la Lista
     * ========================================== */
    $('.btn-add-todo').on('click', function(e) {
        e.preventDefault();
        Swal.fire({
            title: 'Nueva Tarea',
            input: 'text',
            inputLabel: '¿Qué tarea deseas registrar en el panel?',
            inputPlaceholder: 'Ej: Revisar servidor de producción...',
            showCancelButton: true,
            confirmButtonText: '<i class="icon-plus"></i> Agregar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2d89ef',
            inputValidator: function(value) {
                if (!value || !value.trim()) {
                    return 'Por favor escribe una descripción para la tarea.';
                }
            }
        }).then(function(result) {
            if (result.isConfirmed) {
                var taskName = $('<div>').text(result.value.trim()).html();
                var newTask = $('<li class="green" style="display:none;"><a class="action icon-check-empty" href="#"></a> ' + taskName + ' <strong>ahora</strong></li>');
                $('.todo-list').prepend(newTask);
                newTask.slideDown(300);
                toastr.success('Tarea agregada exitosamente.', 'To Do List');
            }
        });
    });

    /* ==========================================
     * 4. SWEETALERT2: Confirmar Tarea Completada
     * ========================================== */
    $(document).on('click', '.todo-list .action', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var $action = $(this);
        var $li = $action.parent();
        var yaCompletada = $action.hasClass('icon-check');
        var taskText = $li.clone().children().remove().end().text().trim();

        if (!yaCompletada) {
            Swal.fire({
                title: '¿Marcar como completada?',
                text: '"' + taskText + '"',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí, completar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#43b55c'
            }).then(function(result) {
                if (result.isConfirmed) {
                    $action.removeClass('icon-check-empty').addClass('icon-check');
                    $li.css('text-decoration', 'line-through');
                    toastr.success('Tarea completada: ' + taskText, 'To Do List');
                }
            });
        } else {
            $action.removeClass('icon-check').addClass('icon-check-empty');
            $li.css('text-decoration', 'none');
            toastr.info('Tarea reactivada: ' + taskText, 'To Do List');
        }
    });

    /* ==========================================
     * 5. SWEETALERT2: Diálogo de Logout Seguro
     * ========================================== */
    $('.header-nav a[href="login.html"]').on('click', function(e) {
        e.preventDefault();
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: 'Se cerrará la sesión actual de Dennis Ji.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ee4f4f',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Permanecer aquí'
        }).then(function(result) {
            if (result.isConfirmed) {
                window.location.href = 'login.html';
            }
        });
    });
});
</script>
```

## Ejercicio 3 Fuentes de datos externas - AJAX.

Continuando con el trabajo anterior, conecte con fuentes de datos externas para colocar contenido en el diseno proporcionado por la plantilla.

1.​ AJAX con JavaScript: modifique en index.html uno de los indicadores de
visitas (hay 2) por uno de usuarios online, permitiendo que el usuario
refresque su contenido a necesidad. ​
Para simular la respuesta dinámica del back-end, cree 3 archivos (por
ejemplo: ajax/users_online_1.html, ajax/users_online_2.html y
ajax/users_online_3.html) con contenidos distintos (solo deben contener un
número: por ejemplo 456). Estos archivos luego serán cargados mediante
AJAX dentro de esta sección, reemplazando al número actual con su
contenido.​Desarrolle el código para cargar aleatoriamente alguno de ellos usando AJAX
en cuanto el usuario haga clic en el footer de la sección. Para ello deberá
adaptar el código proporcionado en `https://www.w3schools.com/js/js_ajax_intro.asp​`

2.​ AJAX con jQuery: realizará la misma operación con el indicador de ventas,
pero utilizando jQuery para realizar la petición AJAX. Para ello deberá
adaptar el código de ejemplo proporcionado en:​ `https://www.w3schools.com/jquery/ajax_ajax.asp​`

3.​ Finalmente, deberá incluir los nuevos valores dinámicamente obtenidos, en
los gráficos de barras adjuntos a los indicadores de visitas y ventas. Para
ello, investigará el plug-in que los genera, su documentación, el código de
inicialización del mismo, y añadirá código a las peticiones AJAX para
refrescar ambos gráficos.

### Resolución.
Se crean 6 archivos con numeros aleatorios en la carpeta resoluciones/ajax para simular respuestas del servidor.
Se agregan/editan divs en el index.html, buscar: Usuarios onlines y ventas - Linea 408.
Creación de archivo resoluciones/ejercicio3.js embebido, buscar: Usuarios online y Ventas JS.

## Ejercicio 4 - Fuente de datos externas - JS Web APIs - Fetch.
Replique la funcionalidad del ejercicio anterior para los 2 indicadores restantes
(pedidos y visitas), pero esta vez en lugar de utilizar AJAX, utilizará la Web API
Fetch. Para ello, deberá adaptar el código de ejemplo que encontrará en: `https://www.w3schools.com/js/js_api_fetch.asp`
Una vez desarrollada la funcionalidad de actualización, implemente una actualización automática en el indicador de visitas, que se realice cada un segundo.

### Guía resolución.
Se crean los archivos Orders y Visits en resoluciones/ajax como fuente de datos.
En <index> a los divs de orders y visits, se agregan id a los gráficos boxchart, number y se reemplaza el footer por un botón interactivo. Buscar -> Order y Visits
Se crea el archivo `ejercicio4.js` para resolverlo y se agrega en el index, al final, buscar -> Orders y visitas.

## Ejercicio 5 - JS Web APIs Geolocation.
Obtener los datos de la ubicación del usuario (latitud y longitud) y mostrarla en un mapa. Para ello se utilizará el plug-in Leaflet, el cual proporciona mapas del proyecto, los cuales son de uso libre y licencia abierta. `https://leafletjs.com`
Investigar como agregar esta biblioteca a la web, y agregue a la página que estamos desarrollando un mapa que indique la posición del usuario, la cual puede obtener usando el código provisto por: `https://www.w3schools.com/js/js_api_geolocation.asp`

### Guía resolución
Se incorpora un <css> en el <head> del index.html, buscar: CSS Leaflet
Se incorporan dos archivos </script> al final del <body> buscar: Scripts Leaflet

Se crea el <div> del mapa en el index.html, buscar: DIV Leaflet
Se crea `ejercicio5.js` para resolver el ejercicio.

## Ejercicio 6 - Fuentes de datos externas - API REST.
La consigna de este punto es obtener datos externos, accediendo a una API REST, y luego alimentar con estos datos a varios de los componentes que hay en la página de desarrollo.
Para ello debemos registrarnos en `https://polygon.io` lo cual nos permitirá acceder a datos de valores bursátiles. Con el registro obtendremos un token para acceder.

1. Utilizar el endpoint detallado en: `https://polygon.io/docs/rest/stocks/aggregates/daily-ticker-summary​`
Para obtener datos de la acción AAPL. En caso de problemas, analizar la situación,
determinar posibles soluciones, y obtener conclusiones de la situación.​

### Resolución.
Obtenemos API_KEY de `polygon.io`.
API_KEY = w_x1sBtbNpaxTRIMfcOmF5fb7h0MGqfw
Detalle del endpoint -> `https://api.polygon.io/v1/open-close/{stocksTicker}/{date}?adjusted=true&apiKey={API_KEY}`
Donde: 
* {stocksTicker} es el símbolo de la empresa, en este caso AAPL.
* {date} es la fecha, en formato YYYY-MM-DD.
* {API_KEY} es el API_KEY que obtuve.

JSON que devolvió el GET con Bruno:
```json
{
  "status": "OK",
  "from": "2026-05-20",
  "symbol": "AAPL",
  "open": 298.18,
  "high": 302.8,
  "low": 298.08,
  "close": 302.25,
  "volume": 3.822984371746e+07,
  "afterHours": 301.2,
  "preMarket": 299
}
```

2.Utilizar el endpoint detallado en ​`https://polygon.io/docs/rest/stocks/aggregates/daily-market-summary​`​ para obtener datos del mercado estadounidense de una fecha en particular

### Resolución.
Detalle del endpoint -> `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/{date}?adjusted=true&apiKey={API_KEY}`
Al usar este endpoint, nos devuelve un json completo con la información de todos los tickers disponibles en una fecha en particular.

3. Duplicar la sección “Demographics” (ocupar las 12 columnas) y graficar los datos obtenidos. Utilizar colores en las barras para indicar si son variaciones positivas o negativas.​

### Resolución.
Creación de <div> en index.html, buscar: DIV Mercado Bursatil
Creación de mercadoBursatil.css para darle color a las velas, embebido en index.html, buscar: CSS Mercado Bursatil
Creación de ejercicio6.js embebido en index.html, buscar: Script Mercado

4.​ Incorporar la biblioteca para realizar gráficos de vela CanvasJS:​
​
`https://canvasjs.com/javascript-stockcharts​`
​
y cuando se haga clic en una de las columnas del gráfico generado en el punto
anterior, hacer aparecer un gráfico de velas que muestre el historial de esa acción.
Para ello, utilizar el endpoint documentado en:​
​
`https://polygon.io/docs/rest/stocks/aggregates/custom-bars`

### Resolución.
Agregar CanvasJS StockChart en index.html
Div de Velas agregado al index.html, buscar: Gráfico velas
Agregar scripts a ejercicio6.js

