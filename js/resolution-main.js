let tamanho = screen.height;

function tamanhoTela() {

    let calculo = (tamanho / 10 * 0.01);

    calculo = (calculo - 0.05);

    document.getElementById('overlay').style.zoom = calculo;

}

tamanhoTela()

function checkTela() {

    if (screen.height !== tamanho) {
        tamanho = screen.height;
        tamanhoTela()
    }

}

setInterval(() => checkTela(), 1000)