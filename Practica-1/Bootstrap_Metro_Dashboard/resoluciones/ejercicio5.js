$(document).ready(function(){
    const $status = $('#status-geoloc');

    if (!navigator.geolocation){
        $status.html('<span style ="color: red;">El navegador no soporte geolocalización</span>');
        return;
    }

    $status.html("Obteniendo coordenadas...")

    // Opciones de geolocalización.
    const geoOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    // Solicitar la posición actual del usuario
    navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOptions);       
    //? 1er Parámetro función callback obligatoria, lo que se hará si se encuentran las coordenadas.
    //? 2do parámetro función callback opcional, lo que hará el navegador si falla la obtención de coordenadas.
    //? Objeto de configuración.
    
    // Callback de éxito si se obtienen las coordenadas.
    function onSuccess(position){
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = Math.round(position.coords.accuracy);

        $status.html(
            `<strong>Ubicación encontrada:</strong> Latitud: ${lat.toFixed(5)} - Longitud ${lon.toFixed(5)}` + `(Precisión aproximada: ${accuracy} metros)`
            //? .toFixed(5) formatea el número con la cantidad de decimales deseados a mostrar.
        );

        // Inicializamos el mapa de Leaflet centrado en la posición obtenida anteriormente.
        const map = L.map('map').setView([lat,lon], 14);
        // 14 nivel de zoom.

        // Cargar la capa de mosaicos gratuita de OpenStreetMap.
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Colocamos un marcador en las coordenadas del user.
        const marker = L.marker([lat,lon]).addTo(map);

        // Asociar y abrir un popup descriptivo sobre el marcador.
        marker.bindPopup(
            `<b>Estás acá!</b> Lat: ${lat.toFixed(5)} Lon: ${lon.toFixed(5)}`
        ).openPopup();
    }

    // Callback de error.
    function onError(error){
        let mensaje = '';
        switch(error.code){
            case error.PERMISSION_DENIED:
                mensaje = "Permiso denegado por el usuario";
                break;
            case error.POSITION_UNAVAILABLE:
                mensaje = "Posición no disponble";
            case error.TIMEOUT:
                mensaje = "Se agotó el tiempo de espera";
                break;
            default:
                mensaje = "Error desconocido al obtener ubicación";
                break;
        }

        $status.html(`<span style="color: red;"> Error: ${mensaje}</span>`);
    }
});