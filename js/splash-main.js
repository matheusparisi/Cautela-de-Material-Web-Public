$('#overlay').hide()
$('#particle').hide()
$('.footer').hide()
$('#inventario').hide()
$('#cautelado').hide()
$('#adicionar').hide()
$('#cautelar').hide()
$('#mostrar_menu').hide()
$('#gerar-qrcode').hide()
$('.fimdapagina').hide()
$('#buscar_icone_inventario_2').hide();
$('#buscar_icone_cautelados_2').hide();
$('#buscar_icone_cautelados_3').hide();
$('#editar_div').hide()
$('#texto_editando').hide()
$('#gerar-id').hide()
$('#gerar-relatorio').hide()

setTimeout(function () {
    $('.splash').fadeOut('slow');
}, 1500);

setTimeout(function () {
    $('#overlay').hide().fadeIn('slow')
    $('#particle').hide().fadeIn('slow')
    $('.footer').hide().fadeIn('slow')
}, 3000);