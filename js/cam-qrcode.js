let scanAtual = null;

var scanner = new Instascan.Scanner({ video: document.getElementById('preview'), mirror: false });

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.camera = cameras[0];
        scanner.start();
        $('[name="options"]').on('change', function () {
            if ($(this).val() == 1) {
                if (cameras[0] != "") {
                    scanner.camera = cameras[0];
                    scanner.start();
                } else {
                    alert('Câmera 1 não encontrada.');
                }
            } else if ($(this).val() == 2) {
                if (cameras[1] != "") {
                    scanner.camera = cameras[1];
                    scanner.start();
                } else {
                    alert('Câmera 2 não encontrada.');
                }
            }
        });
    } else {
        alert('Nenhuma câmera encontrada.');
    }
}).catch(function (e) {
    console.error(e);
    alert(e);
});

function escanear(id, busca) {

    document.getElementById("preview_camera").className = "show";

    scanAtual = scanner;

    const ids = {
        input: () => document.getElementById(`${id}`)
    }

    scanner.addListener('scan', function (content) {
        ids.input().value = content;
        if (busca == `inventario`) {
            buscarInventario();
        } else if (busca == `cautelados`) {
            buscarCautelados();
        }
        //scanner.stop();
        document.getElementById("preview_camera").className = "hide";
    })

};

function desativaScan() {
    if (scanAtual !== null && scanAtual !== '') {
        //scanAtual.stop();
        document.getElementById("preview_camera").className = "hide";
    } else {
        return;
    }
}