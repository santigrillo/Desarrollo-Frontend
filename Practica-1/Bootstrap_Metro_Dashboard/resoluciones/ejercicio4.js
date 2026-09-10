$(document).ready(function(){
    const opcionesSparkline = { 
        type: "bar",
        height: "60",
        barWidth: "4",
        barSpacing: "1",
        barColor: "#FFFFFF",
        negBarColor: "#EEEEEE"
    }

    // Datos para inicializar el Sparkline
    const datosOrders = [5, 6, 7, 2, 0, -4, -2, 4, 8, 2, 3, 3, 2];
    const datosVisits = [7, 2, 2, 2, 1, -4, -2, 4, 8, 0, 3, 3, 5];

    // Actualización de Orders con fetch
    async function actualizarPedidos(){
        try{       
            // Número aleatorio entre 1 y 3.
            const numAleatorio = Math.floor(Math.random()*3)+1;

            // ?t= evita que el navegador entregue la respuesta desde la memoria cache.
            const url = `resoluciones/ajax/orders_${numAleatorio}.html?t=${Date.now()}`;
            
            // Función async.
            const response = await fetch(url);
            // ? Fetch es una función nativa de javascript para solicitar datos por red, por lo que devuelve una promesa.
            if(!response.ok){
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            // Lectura de la respuesta, se parsea a texto.
            const texto = await response.text();
            const nuevoValor = parseInt(texto.trim(), 10);
            // ? Función trim elimina los espacios en blanco de la cadena.

            // Actualización del numero en la interfaz.
            $('#orders-number').html(`${nuevoValor} <i class = "icon-arrow-up"></i>`);

            // Actualizar el gráfico sparkline.
            const barraValor = Math.round(nuevoValor/100); // Redondea.
            datosOrders.shift(); // shift elimina el primer elemento.
            datosOrders.push(barraValor);
            $('#orders-chart').sparkline(datosOrders, opcionesSparkline);
        } catch (error){
            console.error("Error al actualizar Orders con Fetch:", error)
        }
    }

    // Botón para actualizar orders.
    $('#btn-refresh-orders').on('click', function(e) {
        e.preventDefault();
        actualizarPedidos();
    });

    // Actualización de Visitas con fetch cada 1 segundo.
    async function actualizarVisitas(){
        try{
            const numAleatorio = Math.floor(Math.random()*3)+1;
            const url = `resoluciones/ajax/visits_${numAleatorio}.html?t=${Date.now()}`;

            const response = await fetch(url);
            if (!response.ok){
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const texto = await response.text();
            const nuevoValor = parseInt(texto.trim(), 10);

            $('#visits-number').html(`${nuevoValor} <i class="icon-arrow-down"></i>`);

            const barraValor = Math.round(nuevoValor / 80);
            datosVisits.shift();
            datosVisits.push(barraValor);
            $('#visits-chart').sparkline(datosVisits, opcionesSparkline);

        } catch (error) {
            console.error ("Error al actualizar Visitas con fetch:", error)
        }
    }

    $('#btn-refresh-visits').on('click', function(e) {
        e.preventDefault();
        actualizarVisitas();
    });

    // Actualizar las visitas cada segundo.
    setInterval(actualizarVisitas, 1000);
});