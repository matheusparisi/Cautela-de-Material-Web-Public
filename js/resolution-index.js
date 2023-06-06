let tamanho = screen.height;

function tamanhoTela() {

    let calculo = (tamanho / 10 * 0.01);

    calculo = (calculo - 0.1);

    document.getElementById('overlay').style.zoom = calculo;
    document.getElementById('splash2').style.zoom = calculo;

}

tamanhoTela()

function checkTela() {

    if (screen.height !== tamanho) {
        tamanho = screen.height;
        tamanhoTela()
    }

}

setInterval(() => checkTela(), 1000)