$(document).ready(function() {
    // Configuración visual del plugin Sparkline (gráficos de barras)
    var sparklineOptions = {
        type: 'bar',
        height: '60',
        barWidth: '4',
        barSpacing: '1',
        barColor: '#ffffff',
        negBarColor: '#eeeeee'
    };

    // Arrays con los datos históricos iniciales de cada gráfico
    var datosUsuarios = [5, 6, 7, 2, 0, 4, 2, 4, 8, 2, 3, 3, 2];
    var datosVentas   = [1, 2, 6, 4, 0, 8, 2, 4, 5, 3, 1, 7, 5];

    /* ========================================================
     * 1. AJAX con JavaScript Nativo (XMLHttpRequest)
     * ======================================================== */
    var btnUsers = document.getElementById("btn-refresh-users");
    if (btnUsers) {
        btnUsers.addEventListener("click", function(e) {
            e.preventDefault();

            // Generar un número aleatorio entre 1 y 3
            var numAleatorio = Math.floor(Math.random() * 3) + 1;
            var url = "resoluciones/ajax/users_online_" + numAleatorio + ".html";

            // Crear instancia de XMLHttpRequest
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    var nuevoValor = parseInt(this.responseText.trim(), 10);

                    // 1. Actualizar el número en la interfaz
                    var elNumber = document.getElementById("users-online-number");
                    if (elNumber) {
                        elNumber.innerHTML = nuevoValor + ' <i class="icon-arrow-up"></i>';
                    }

                    // 2. Punto 3: Actualizar el gráfico de barras Sparkline dinámicamente
                    // Se escala el nuevo valor recibido para que mantenga proporción visual (entre 0 y 10)
                    var barraValor = Math.round(nuevoValor / 50);

                    // Desplaza el historial: elimina el dato más viejo y añade el nuevo al final
                    datosUsuarios.shift();
                    datosUsuarios.push(barraValor);

                    // Redibuja el gráfico de barras dinámicamente con Sparkline
                    $("#users-online-chart").sparkline(datosUsuarios, sparklineOptions);
                }
            };

            // Parámetro ?t= para evitar que el navegador use la respuesta de memoria caché
            xhr.open("GET", url + "?t=" + new Date().getTime(), true);
            xhr.send();
        });
    }

    /* ========================================================
     * 2. AJAX con jQuery ($.ajax)
     * ======================================================== */
    $("#btn-refresh-sales").on("click", function(e) {
        e.preventDefault();

        // Generar un número aleatorio entre 1 y 3
        var numAleatorio = Math.floor(Math.random() * 3) + 1;

        $.ajax({
            url: "resoluciones/ajax/sales_" + numAleatorio + ".html",
            type: "GET",
            cache: false, // Evita la caché automáticamente
            success: function(data) {
                // 1. Obtener el nuevo valor desde la respuesta AJAX
                var nuevoValor = parseInt($.trim(data), 10);

                // 2. Actualizar el número en la interfaz
                $("#sales-number").html(nuevoValor + ' <i class="icon-arrow-up"></i>');

                // 3. Punto 3: Actualizar el gráfico de barras Sparkline dinámicamente
                var barraValor = Math.round(nuevoValor / 40);
                datosVentas.shift();
                datosVentas.push(barraValor);
                $("#sales-chart").sparkline(datosVentas, sparklineOptions);
            },
            error: function(xhr, status, error) {
                console.error("Error al cargar ventas vía AJAX:", error);
            }
        });
    });
});