const API_KEY = `w_x1sBtbNpaxTRIMfcOmF5fb7h0MGqfw` 
$(document).ready(function(){
    //? Debería estar privado en archivos de entorno.

    const FECHA = '2026-09-09' //? Formato YYYY-MM-DD

    // Listade algunos tickers para no mostrar todos.
    const TICKERS = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA'];

    // Función async para cargar el gráfico.
    async function cargarGrafico(params) {   
        const URL = `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${FECHA}?adjusted=true&apiKey=${API_KEY}`
        const $contenedor = $('#stocks-vertical-chart');
        
        try{
            const response = await fetch(URL);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            // Extraemos solo los tickers que declaramos arriba.
            const data = await response.json();
            const tickersLimpios = data.results.filter(stock => TICKERS.includes(stock.T));
            $contenedor.empty(); // Vaciamos el contenedor.

            // Generamos cada barra.
            tickersLimpios.forEach(stock => {
                const apertura = stock.o;
                const cierre = stock.c;
                const variacion = ((cierre - apertura) / apertura)*100;
                const esPositiva = variacion >= 0;
            
                // Formatear el texto.
                const textoVariacion = (esPositiva ? '+' : '') + variacion.toFixed(1)+'%';
                const claseColor = esPositiva ? 'positive' : 'negative';

                // Escalamos la altura visual para que la barra no quede chica.
                const alturaVisual = Math.min(Math.max(Math.abs(variacion)*15+15,20), 100)+'%';

                // Crear e insertar el HTML con la estructura.
                const barraHTML = `
                <div class="singleBar">
                    <div class="bar">
                        <div class="value ${claseColor}" data-target-height="${alturaVisual}">
                            <span>${textoVariacion}</span>
                        </div>
                    </div>
                    <div class="title">${stock.T}</div>
                </div> `;

                $contenedor.append(barraHTML);
            });

            // Animar la subida de barras.
            $contenedor.find('.singleBar').each(function(){
                const $value = $(this).find('.value');
                const alturaFinal = $value.attr('data-target-height');

                $value.css('height', '0%');
                $value.animate({height: alturaFinal}, 1500, function(){
                    $(this).find('span').fadeIn(300);
                });
            });
            
        } catch (error) {
            console.error("Error al cargar datos del mercado:", error);
            $contenedor.html(`<p style="color: red; text-align: center;">Error al cargar datos: ${error.message}</p>`);
        }
    }


    cargarGrafico();
});

//? Ejercicio 6.4

$(document).on('click', '.verticalChart .singleBar', function(){
    const ticker = $(this).attr('data-ticker') || $(this).find('.title').text().trim();
    if (ticker){
        cargarVelas(ticker);
    }
});

async function cargarVelas(ticker){
    const $wrapper = $('#candlestick-wrapper');
    const $titulo = $('#candlestick-ticker-title');
    const $status = $('#candlestick-status');

    // Mostrar contenedor y loader
    $titulo.text(ticker);
    $status.html(`<span style="color: #007acc;">Cargando las velas de ${ticker}</span>`);
    $wrapper.slideDown(400);

    //Rango de fechas para mostrar las velas.
    const fechaDesde = '2026-04-01';
    const fechaHasta = '2026-07-01';

    const URL = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${fechaDesde}/${fechaHasta}?adjusted=true&sort=asc&apiKey=${API_KEY}`;

    try {
        const response = await fetch (URL);
        if(!response.ok){
            if (response.status === 429){
                throw new Error("Limite de 5 peticiones por minuto alcanzado, espera.");
            }
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        if(!data.results || data.results.length === 0){
            throw new Error(`No se encontraron velas para ${ticker}`);
        }

        // Transformamos los datos de Polygon al formato Open, High, Low y CLose
        const dataPoints = data.results.map(bar => ({
            x: new Date(bar.t),
            y: [bar.o, bar.h, bar.l, bar.c]
        }));

        $status.html('');

        // Iniciar StockChart de Canva
        const stockChart = new CanvasJS.StockChart("stockChartContainer",
            {
                theme: "light2", //? Se puede modificar a dark1
                title: {
                    text: `Historial de Cotización - ${ticker}`
                },
                charts: [{
                    axisY: {
                        prefix: "$",
                        title: "Precio (USD)"
                    },
                    data: [{
                        type: "candlestick",
                        yValueFormatString: "$#,###.00",
                        risingColor: "#43b55c",  
                        fallingColor: "#ee4f4f", 
                        dataPoints: dataPoints
                    }]
                }],
                navigator: {
                    slider: {
                        minimum: new Date(fechaDesde),
                        maximum: new Date(fechaHasta)
                    }
                }
            }
        );

        //Renderizar el grafico.
        stockChart.render();

        $('html, body').animate({
            scrollTop: $wrapper.offset().top -60
        }, 600);
        
    } catch (error){
        console.error("Error al cargar velas:", error);
        $status.html(`<span style="color: red;">Error: ${error.message}</span>`);
    }
}