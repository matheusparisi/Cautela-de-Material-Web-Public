$('div').hide()
$('.sem_clique').hide()
$('.splash2').hide()

setTimeout(function () {
    $('.splash2').hide().fadeIn('slow')
}, 1000);

setTimeout(function () {
    $('.splash').fadeOut('slow');
    $('.splash2').fadeOut('slow');
}, 5000);

setTimeout(function () {
    $('.sem_clique').hide().fadeIn('slow')
    $('div').hide().fadeIn('slow')
}, 7000);