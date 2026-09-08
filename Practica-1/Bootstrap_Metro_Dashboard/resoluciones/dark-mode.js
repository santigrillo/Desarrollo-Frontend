$(document).ready(function() {
    if (localStorage.getItem('theme-mode') === 'dark') {
        $('body').addClass('dark-mode');
        $('#text-dark-mode').text('Claro');
    }

    $('#toggle-dark-mode').on('click', function(e) {
        e.preventDefault();
        $('body').toggleClass('dark-mode');
        var esOscuro = $('body').hasClass('dark-mode');
        localStorage.setItem('theme-mode', esOscuro ? 'dark' : 'light');
        $('#text-dark-mode').text(esOscuro ? 'Claro' : 'Oscuro');
    });
});
