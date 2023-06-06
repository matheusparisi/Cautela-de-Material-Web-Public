function deslogar() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../index.html";
    }).catch(() => {
        alert("Ocorreu um erro ao tentar deslogar");
    })
}

function addToScreen(material, quantia, militar, data, info) {

    const lista = document.getElementById('items');

    const div = document.createElement('div');
    div.setAttribute('class', `listainventario`);

    const li = document.createElement('li');

    const itemmaterial = document.createElement('p');
    itemmaterial.innerHTML = '<b>Material:</b> ' + material;
    li.appendChild(itemmaterial);

    const itemquantia = document.createElement('p');
    itemquantia.innerHTML = '<b>Quantia:</b> ' + quantia;
    li.appendChild(itemquantia);

    const itemmilitar = document.createElement('p');
    itemmilitar.innerHTML = '<b>Último:</b> ' + militar;
    li.appendChild(itemmilitar);

    const itemdata = document.createElement('p');
    itemdata.innerHTML = '<b>Data:</b> ' + data;
    li.appendChild(itemdata);

    const iteminfo = document.createElement('p');
    iteminfo.innerHTML = '<b>Info:</b> ' + info;
    li.appendChild(iteminfo);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.setAttribute('class', `botao_excluir_inventario`);
    botaoExcluir.setAttribute('onclick', `desativaScan(); excluirMaterialInventario('${material}')`);
    li.appendChild(botaoExcluir);

    const iconeExcluir = document.createElement('span');
    iconeExcluir.setAttribute('class', 'fa fa-x icone_excluir_inventario');
    botaoExcluir.appendChild(iconeExcluir);

    const botaoEditar = document.createElement('button');
    botaoEditar.setAttribute('class', `botao_editar_inventario`);
    botaoEditar.setAttribute('onclick', `desativaScan(); editarMaterialInventario('${material}')`);
    li.appendChild(botaoEditar);

    const iconeEditar = document.createElement('span');
    iconeEditar.setAttribute('class', 'fa fa-pencil icone_editar_inventario');
    botaoEditar.appendChild(iconeEditar);

    const botaoCautelar = document.createElement('button');
    botaoCautelar.setAttribute('class', `botao_cautelar_inventario`);
    botaoCautelar.setAttribute('onclick', `desativaScan(); cautelarMaterialInventario('${material}')`);
    li.appendChild(botaoCautelar);

    const iconeCautelar = document.createElement('span');
    iconeCautelar.setAttribute('class', 'fa fa-arrow-up icone_cautelar_inventario');
    botaoCautelar.appendChild(iconeCautelar);

    div.appendChild(li)
    lista.appendChild(div);

}

function addToScreenCautelados(material, quantia, destino, militar, data, info, key) {

    const lista = document.getElementById('cautelados');

    const div = document.createElement('div');
    div.setAttribute('class', `listainventario`);

    const li = document.createElement('li');

    const itemmaterial = document.createElement('p');
    itemmaterial.innerHTML = '<b>Material:</b> ' + material;
    li.appendChild(itemmaterial);

    const itemquantia = document.createElement('p');
    itemquantia.innerHTML = '<b>Quantia:</b> ' + quantia;
    li.appendChild(itemquantia);

    const itemdestino = document.createElement('p');
    itemdestino.innerHTML = '<b>Destino:</b> ' + destino;
    li.appendChild(itemdestino);

    const itemmilitar = document.createElement('p');
    itemmilitar.innerHTML = '<b>Militar:</b> ' + militar;
    li.appendChild(itemmilitar);

    const itemdata = document.createElement('p');
    itemdata.innerHTML = '<b>Data:</b> ' + data;
    li.appendChild(itemdata);

    const iteminfo = document.createElement('p');
    iteminfo.innerHTML = '<b>Info:</b> ' + info;
    li.appendChild(iteminfo);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.setAttribute('class', `botao_excluir_cautelados`);
    botaoExcluir.setAttribute('onclick', `desativaScan(); excluirMaterialCautelados('${key}', '${material}')`);
    li.appendChild(botaoExcluir);

    const iconeExcluir = document.createElement('span');
    iconeExcluir.setAttribute('class', 'fa fa-x icone_excluir_cautelados');
    botaoExcluir.appendChild(iconeExcluir);

    const botaoDescautelar = document.createElement('button');
    botaoDescautelar.setAttribute('class', `botao_descautelar_cautelados`);
    botaoDescautelar.setAttribute('onclick', `desativaScan(); descautelarMaterialCautelados('${key}', '${material}', '${quantia}', '${destino}', '${militar}', '${data}', '${info}')`);
    li.appendChild(botaoDescautelar);

    const iconeDescautelar = document.createElement('span');
    iconeDescautelar.setAttribute('class', 'fa fa-arrow-down icone_descautelar_inventario');
    botaoDescautelar.appendChild(iconeDescautelar);

    div.appendChild(li)
    lista.appendChild(div);

}

function removerDaTelaInventario() {
    const lista = document.getElementById('items')

    function removeAllChildNodes(lista) {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
    }

    removeAllChildNodes(lista);

}

function removerDaTelaCautelados() {
    const lista = document.getElementById('cautelados')

    function removeAllChildNodes(lista) {
        while (lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
    }

    removeAllChildNodes(lista);

}

let usuario = null;
let nomeUsuario = null;
let emailDB = null;

firebase.auth().onAuthStateChanged(user => {

    const nomeUsuarioFormatado = user.email.replace(/\@.*/, '');
    const emailDBFormatado = user.email.replaceAll('.', '');

    usuario = user;
    nomeUsuario = nomeUsuarioFormatado;
    emailDB = emailDBFormatado;

    if (!user || user == null) {
        return;
    }

    else if (user && user !== null) {

        document.getElementById('logado_como').innerText = `Logado como: ${nomeUsuario}`;

    }


})

function fetchData() {
    removerDaTelaInventario()
    firebase.database().ref(`Users/${emailDB}/Inventario`).once('value', function (snapshot) {
        snapshot.forEach(
            function (ChildSnapshot) {
                let material = ChildSnapshot.val().itemmaterial;
                let quantia = ChildSnapshot.val().itemquantia;
                let militar = ChildSnapshot.val().itemmilitar;
                let data = ChildSnapshot.val().itemdata;
                let info = ChildSnapshot.val().iteminfo;
                addToScreen(material, quantia, militar, data, info)
            }
        )
    })
}

function fetchDataCautelados() {
    removerDaTelaCautelados()
    firebase.database().ref(`Users/${emailDB}/Cautelados`).once('value', function (snapshot) {
        snapshot.forEach((childSnapshot) => {
            childSnapshot.forEach(
                function (ChildSnapshot2) {
                    let key = ChildSnapshot2.key;
                    let material = ChildSnapshot2.val().itemmaterial;
                    let quantia = ChildSnapshot2.val().itemquantia;
                    let destino = ChildSnapshot2.val().itemdestino;
                    let militar = ChildSnapshot2.val().itemmilitar;
                    let data = ChildSnapshot2.val().itemdata;
                    let info = ChildSnapshot2.val().iteminfo;
                    addToScreenCautelados(material, quantia, destino, militar, data, info, key)
                }
            )
        })
    })
}

function esconderMenu() {
    $('.menu_botao').hide();
    $('#esconder_menu').hide();
    $('#mostrar_menu').hide().fadeIn('slow')
    document.getElementById('inventario').style.marginLeft = '-350px';
    document.getElementById('cautelado').style.marginLeft = '-350px';
    document.getElementById('adicionar').style.marginLeft = '-350px';
    document.getElementById('cautelar').style.marginLeft = '-350px';
}

function mostrarMenu() {
    $('#mostrar_menu').hide();
    $('#esconder_menu').hide().fadeIn('slow')
    $('.menu_botao').hide().fadeIn('slow');
    document.getElementById('inventario').style.marginLeft = '100px';
    document.getElementById('cautelado').style.marginLeft = '100px';
    document.getElementById('adicionar').style.marginLeft = '100px';
    document.getElementById('cautelar').style.marginLeft = '100px';
}

function paginaQRCODE() {
    document.getElementById('menu_atual').innerText = 'Gerador de QrCode';
    $('.menu_botao').hide();
    $('#esconder_menu').hide();
    $('#mostrar_menu').hide();
    $('#inventario').hide();
    $('#cautelado').hide();
    $('#adicionar').hide();
    $('#cautelar').hide();
    $('#gerar-id').hide()
    $('#gerar-relatorio').hide()
    $('#gerar-qrcode').hide().fadeIn('slow')
    $('.fimdapagina').hide().fadeIn('slow')
    document.getElementById('inventario').style.marginLeft = '100px';
    document.getElementById('cautelado').style.marginLeft = '100px';
    document.getElementById('adicionar').style.marginLeft = '100px';
    document.getElementById('cautelar').style.marginLeft = '100px';

    document.getElementById('material_input_adicionar').readOnly = false;
    document.getElementById('material_input_adicionar').style.cursor = 'text';

    document.getElementById('texto_editando').innerText = `Editando:`;
    $('#texto_editando').hide()
    $('#editar_div').hide()
    $('#adicionar_div').show()

}

function paginaID() {
    document.getElementById('menu_atual').innerText = 'Gerador de ID';
    $('.menu_botao').hide();
    $('#esconder_menu').hide();
    $('#mostrar_menu').hide();
    $('#inventario').hide();
    $('#cautelado').hide();
    $('#adicionar').hide();
    $('#cautelar').hide();
    $('#gerar-qrcode').hide()
    $('#gerar-relatorio').hide()
    $('#gerar-id').hide().fadeIn('slow')
    $('.fimdapagina').hide().fadeIn('slow')
    document.getElementById('inventario').style.marginLeft = '100px';
    document.getElementById('cautelado').style.marginLeft = '100px';
    document.getElementById('adicionar').style.marginLeft = '100px';
    document.getElementById('cautelar').style.marginLeft = '100px';

    document.getElementById('material_input_adicionar').readOnly = false;
    document.getElementById('material_input_adicionar').style.cursor = 'text';

    document.getElementById('texto_editando').innerText = `Editando:`;
    $('#texto_editando').hide()
    $('#editar_div').hide()
    $('#adicionar_div').show()

}

function paginaRelatorio() {
    document.getElementById('menu_atual').innerText = 'Gerador de Relatório';
    document.getElementById('data_input_relatorio').valueAsDate = new Date();
    $('.menu_botao').hide();
    $('#esconder_menu').hide();
    $('#mostrar_menu').hide();
    $('#inventario').hide();
    $('#cautelado').hide();
    $('#adicionar').hide();
    $('#cautelar').hide();
    $('#gerar-qrcode').hide()
    $('#gerar-id').hide()
    $('#gerar-relatorio').hide().fadeIn('slow')
    $('.fimdapagina').hide().fadeIn('slow')
    document.getElementById('inventario').style.marginLeft = '100px';
    document.getElementById('cautelado').style.marginLeft = '100px';
    document.getElementById('adicionar').style.marginLeft = '100px';
    document.getElementById('cautelar').style.marginLeft = '100px';

    document.getElementById('material_input_adicionar').readOnly = false;
    document.getElementById('material_input_adicionar').style.cursor = 'text';

    document.getElementById('texto_editando').innerText = `Editando:`;
    $('#texto_editando').hide()
    $('#editar_div').hide()
    $('#adicionar_div').show()

}

function paginaInicio() {
    document.getElementById('botaoCautelar').style.opacity = 1;
    document.getElementById('botaoAdicionar').style.opacity = 1;
    document.getElementById('botaoCautelados').style.opacity = 1;
    document.getElementById('botaoInventario').style.opacity = 1;
    document.getElementById('menu_atual').innerText = 'Menu Principal';
    $('.menu_botao').hide().fadeIn('slow');
    $('#esconder_menu').hide().fadeIn('slow')
    $('#mostrar_menu').hide();
    $('#inventario').hide()
    $('#cautelado').hide()
    $('#adicionar').hide()
    $('#cautelar').hide()
    $('#gerar-qrcode').hide()
    $('#gerar-id').hide()
    $('#gerar-relatorio').hide()
    $('.fimdapagina').hide()

    document.getElementById('inventario').style.marginLeft = '100px';
    document.getElementById('cautelado').style.marginLeft = '100px';
    document.getElementById('adicionar').style.marginLeft = '100px';
    document.getElementById('cautelar').style.marginLeft = '100px';

    document.getElementById('material_input_adicionar').readOnly = false;
    document.getElementById('material_input_adicionar').style.cursor = 'text';

    document.getElementById('texto_editando').innerText = `Editando:`;
    $('#texto_editando').hide()
    $('#editar_div').hide()
    $('#adicionar_div').show()

}

function mostrarInventario() {
    document.getElementById('botaoCautelar').style.opacity = 0.8;
    document.getElementById('botaoAdicionar').style.opacity = 0.8;
    document.getElementById('botaoCautelados').style.opacity = 0.8;
    document.getElementById('botaoInventario').style.opacity = 1;
    document.getElementById('menu_atual').innerText = 'Inventário';
    $('#inventario').hide().fadeIn('slow')
    $('#cautelado').hide()
    $('#adicionar').hide()
    $('#cautelar').hide()

    document.getElementById('material_input_adicionar').readOnly = false;
    document.getElementById('material_input_adicionar').style.cursor = 'text';

    document.getElementById('texto_editando').innerText = `Editando:`;
    $('#texto_editando').hide()
    $('#editar_div').hide()
    $('#adicionar_div').show()


}

function mostrarCautelados() {
    document.getElementById('botaoCautelar').style.opacity = 0.8;
    document.getElementById('botaoAdicionar').style.opacity = 0.8;
    document.getElementById('botaoCautelados').style.opacity = 1;
    document.getElementById('botaoInventario').style.opacity = 0.8;
    document.getElementById('menu_atual').innerText = 'Materiais Cautelados';
    $('#inventario').hide()
    $('#cautelado').hide().fadeIn('slow')
    $('#adicionar').hide()
    $('#cautelar').hide()

    document.getElementById('material_input_adicionar').readOnly = false;
    document.getElementById('material_input_adicionar').style.cursor = 'text';

    document.getElementById('texto_editando').innerText = `Editando:`;
    $('#texto_editando').hide()
    $('#editar_div').hide()
    $('#adicionar_div').show()


}

function mostrarAdicionar() {

    document.getElementById('botaoCautelar').style.opacity = 0.8;
    document.getElementById('botaoAdicionar').style.opacity = 1;
    document.getElementById('botaoCautelados').style.opacity = 0.8;
    document.getElementById('botaoInventario').style.opacity = 0.8;
    document.getElementById('menu_atual').innerText = 'Adicionar ao Inventário';
    $('#inventario').hide()
    $('#cautelado').hide()
    $('#adicionar').hide().fadeIn('slow')
    $('#cautelar').hide()

    document.getElementById('material_input_adicionar').readOnly = false;
    document.getElementById('material_input_adicionar').style.cursor = 'text';

    document.getElementById('texto_editando').innerText = `Editando:`;
    $('#texto_editando').hide()
    $('#editar_div').hide()
    $('#adicionar_div').show()

}

function mostrarEditar(snapshot) {
    document.getElementById('botaoCautelar').style.opacity = 0.8;
    document.getElementById('botaoAdicionar').style.opacity = 1;
    document.getElementById('botaoCautelados').style.opacity = 0.8;
    document.getElementById('botaoInventario').style.opacity = 0.8;
    $('#inventario').hide()
    $('#cautelado').hide()
    $('#adicionar').hide().fadeIn('slow')
    $('#cautelar').hide()

    document.getElementById('material_input_adicionar').readOnly = true;
    document.getElementById('material_input_adicionar').style.cursor = 'not-allowed';

    $('#texto_editando').show()
    $('#editar_div').show()
    $('#adicionar_div').hide()

    document.getElementById('editar_input').setAttribute('onclick', 'desativaScan(); editarInventario("inventario")');

    document.getElementById('texto_editando').innerText = `Editando: ${snapshot.val().itemmaterial}`;
    document.getElementById('menu_atual').innerText = 'Editar Material';

    document.getElementById('material_input_adicionar').value = snapshot.val().itemmaterial;
    document.getElementById('quantia_input_adicionar').value = snapshot.val().itemquantia;
    document.getElementById('info_input_adicionar').value = snapshot.val().iteminfo;
}

function mostrarCautelar() {
    document.getElementById('botaoCautelar').style.opacity = 1;
    document.getElementById('botaoAdicionar').style.opacity = 0.8;
    document.getElementById('botaoCautelados').style.opacity = 0.8;
    document.getElementById('botaoInventario').style.opacity = 0.8;
    document.getElementById('menu_atual').innerText = 'Cautelar Material';
    $('#inventario').hide()
    $('#cautelado').hide()
    $('#adicionar').hide()
    $('#cautelar').hide().fadeIn('slow')
    document.getElementById('material_input_adicionar').readOnly = false;
    document.getElementById('material_input_adicionar').style.cursor = 'text';

    document.getElementById('texto_editando').innerText = `Editando:`;
    $('#texto_editando').hide()
    $('#editar_div').hide()
    $('#adicionar_div').show()

}

function preencherInfoAdicionar() {
    document.getElementById('info_input_adicionar').value = `Sem alteração`;
}
function preencherInfoCautelar() {
    document.getElementById('info_input_cautelar').value = `Sem alteração`;
}

const botoes = {
    quantiaAdicionar: () => document.getElementById('quantia_input_adicionar'),
    quantiaCautelar: () => document.getElementById('quantia_input_cautelar'),
    quantiaQrcode: () => document.getElementById('quantia_input_qrcode'),
    quantiaTamanho: () => document.getElementById('quantia_input_tamanho'),
    quantiaID: () => document.getElementById('quantia_input_id')
}

function quantiaMaisAdicionar() {
    let valor = botoes.quantiaAdicionar().value;
    if (valor === null || valor == '') {
        botoes.quantiaAdicionar().value = 1;
    } else if (valor >= 0) {
        valor++
        botoes.quantiaAdicionar().value = valor;
    }
}

function quantiaMenosAdicionar() {
    let valor = botoes.quantiaAdicionar().value;
    if (valor === null || valor == '' || valor == 0 || valor == 1) {
        return;
    } else if (valor >= 2) {
        valor--
        botoes.quantiaAdicionar().value = valor;
    }
}

function quantiaMaisCautelar() {
    let valor = botoes.quantiaCautelar().value;
    if (valor === null || valor == '') {
        botoes.quantiaCautelar().value = 1;
    } else if (valor >= 0) {
        valor++
        botoes.quantiaCautelar().value = valor;
    }
}

function quantiaMenosCautelar() {
    let valor = botoes.quantiaCautelar().value;
    if (valor === null || valor == '' || valor == 0 || valor == 1) {
        return;
    } else if (valor >= 2) {
        valor--
        botoes.quantiaCautelar().value = valor;
    }
}

function quantiaMaisQrcode() {
    let valor = botoes.quantiaQrcode().innerHTML;
    if (valor === null || valor == '') {
        botoes.quantiaQrcode().innerHTML = 1;
    } else if (valor >= 0 && valor < 30) {
        valor++
        botoes.quantiaQrcode().innerHTML = valor;
        adicionarQrcode();
    }
}

function quantiaMenosQrcode() {
    let valor = botoes.quantiaQrcode().innerHTML;
    if (valor === null || valor == '' || valor == 0) {
        return;
    } else if (valor >= 1) {
        removerQrcode();
        valor--
        botoes.quantiaQrcode().innerHTML = valor;
    }
}

function quantiaMaisTamanho() {
    let valor = botoes.quantiaTamanho().innerHTML;
    if (valor == 'P') {
        botoes.quantiaTamanho().innerHTML = 'M';
    } else if (valor == 'M') {
        botoes.quantiaTamanho().innerHTML = 'G';
    } else if (valor == 'G') {
        return;
    }
}

function quantiaMenosTamanho() {
    let valor = botoes.quantiaTamanho().innerHTML;
    if (valor == 'P') {
        return;
    } else if (valor == 'M') {
        botoes.quantiaTamanho().innerHTML = 'P';
    } else if (valor == 'G') {
        botoes.quantiaTamanho().innerHTML = 'M';
    }
}

function quantiaMaisID() {
    let valor = botoes.quantiaID().innerHTML;
    if (valor === null || valor == '') {
        botoes.quantiaID().innerHTML = 1;
    } else if (valor >= 0 && valor < 4) {
        valor++
        botoes.quantiaID().innerHTML = valor;
        adicionarID();
    }
}

function quantiaMenosID() {
    let valor = botoes.quantiaID().innerHTML;
    if (valor === null || valor == '' || valor == 0) {
        return;
    } else if (valor >= 1) {
        removerID();
        valor--
        botoes.quantiaID().innerHTML = valor;
    }
}

// Quando o usuario aperta o botao, mostra/esconde o menu dropdown
function mostrarDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
    document.getElementById("myDropdown2").classList.toggle("show");
}

// Fechar o menu dropdown se o usuario clicar fora
window.onclick = function (event) {
    if (!event.target.matches('.destino_button_cautelar')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var dropdowns2 = document.getElementsByClassName("dropdown-content2");
        var i;
        var i2;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
        for (i2 = 0; i2 < dropdowns2.length; i2++) {
            var openDropdown2 = dropdowns2[i2];
            if (openDropdown2.classList.contains('show')) {
                openDropdown2.classList.remove('show');
            }
        }
    }
}

function destinoInput(a) {
    document.getElementById("destino_button_cautelar").textContent = a;
}

function generateBarCode(a, b, c) {
    let qrAtual = $(`#${c}`).attr('placeholder');
    let nric = $(`#${c}`).val();
    if (nric == '' || nric === null) {
        toDataURL(`https://api.qrserver.com/v1/create-qr-code/?data=${qrAtual}&amp;size=${b}x${b}`, function (dataUrl) {
            $(`#barcode${a}`).attr('src', dataUrl);
        })
    } else {
        toDataURL(`https://api.qrserver.com/v1/create-qr-code/?data=${nric}&amp;size=${b}x${b}`, function (dataUrl) {
            $(`#barcode${a}`).attr('src', dataUrl);
        })
    }
}

function generateBarCodeID(a, b, c) {
    let barraEspaco = ' ';
    let nric = $(`#${c}`).val();
    if (nric == '' || nric === null) {
        toDataURL(`https://api.qrserver.com/v1/create-qr-code/?data=QrCode${barraEspaco}Militar&amp;size=${b}x${b}`, function (dataUrl) {
            $(`#carteirinhaqr${a}`).attr('src', dataUrl);
        })
    } else {
        toDataURL(`https://api.qrserver.com/v1/create-qr-code/?data=${nric}&amp;size=${b}x${b}`, function (dataUrl) {
            $(`#carteirinhaqr${a}`).attr('src', dataUrl);
        })
    }
}

const qrs = {
    qr1: () => document.getElementById('qr1')
}

function qrCode() {
    let qr1 = qrs.qr1().value;
    if (qr1 === null || qr1 == '' || qr1 == 0) {
        return;
    } else if (qr1 == 1) {
        $('#qr1').hide().fadeIn('slow')
    }
}

function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}

let tembreak1 = false;
let tembreak2 = false;
let tembreak3 = false;

function quebrarPagina() {

    let atual = document.getElementById('quantia_input_qrcode').innerHTML;

    const div1 = document.getElementById('b2');
    const div2 = document.getElementById('c2');
    const div3 = document.getElementById('d2');

    function quebrarPagina1() {
        const breakpage = document.createElement('div');
        breakpage.setAttribute('class', 'html2pdf__page-break');
        breakpage.setAttribute('id', 'break1');
        div1.appendChild(breakpage);
    }

    function quebrarPagina2() {
        const breakpage = document.createElement('div');
        breakpage.setAttribute('class', 'html2pdf__page-break');
        breakpage.setAttribute('id', 'break2');
        div2.appendChild(breakpage);
    }

    function quebrarPagina3() {
        const breakpage = document.createElement('div');
        breakpage.setAttribute('class', 'html2pdf__page-break');
        breakpage.setAttribute('id', 'break3');
        div3.appendChild(breakpage);
    }

    if (Number(atual) === 5 && tembreak1 === false) {
        quebrarPagina1()
        tembreak1 = true;
    } else if (Number(atual) < 5 && tembreak1 === true) {
        let breakRemover = document.getElementById(`break1`);
        div1.removeChild(breakRemover);
        tembreak1 = false;
    }

    if (Number(atual) === 15 && tembreak2 === false) {
        quebrarPagina2()
        tembreak2 = true;
    } else if (Number(atual) < 15 && tembreak2 === true) {
        let breakRemover = document.getElementById(`break2`);
        div2.removeChild(breakRemover);
        tembreak2 = false;
    }

    if (Number(atual) === 25 && tembreak3 === false) {
        quebrarPagina3()
        tembreak3 = true;
    } else if (Number(atual) < 25 && tembreak3 === true) {
        let breakRemover = document.getElementById(`break3`);
        div3.removeChild(breakRemover);
        tembreak3 = false;
    }

}

function adicionarQrcode() {

    let atual = document.getElementById('quantia_input_qrcode').innerHTML;
    let valor = botoes.quantiaTamanho().innerHTML;

    function tamanhoQrcode() {
        if (valor == 'P') {
            return '100';
        } else if (valor == 'M') {
            return '125';
        } else if (valor == 'G') {
            return '150';
        }
    }

    if (atual >= 0 && atual <= 10) {
        const div1 = document.getElementById('b2');
        gerarDiv(div1, tamanhoQrcode());
    } else if (atual >= 11 && atual <= 20) {
        const div1 = document.getElementById('c2');
        gerarDiv(div1, tamanhoQrcode());
    } else if (atual >= 21 && atual <= 30) {
        const div1 = document.getElementById('d2');
        gerarDiv(div1, tamanhoQrcode());
    }

    function gerarDiv(div1, tamanho) {

        const qr = document.createElement('div');
        qr.setAttribute('id', `div${atual}`);

        const icone = document.createElement('span');
        icone.setAttribute('class', 'fa fa-qrcode fa-lg fa-fw icone_qrcode');
        qr.appendChild(icone);

        const input = document.createElement('input');
        input.setAttribute('class', 'qrcode_input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `qrcode${atual}`);
        input.setAttribute('placeholder', `QrCode ${atual}`);
        input.setAttribute('onkeyup', `generateBarCode("${atual}", 165, 'qrcode${atual}')`);
        qr.appendChild(input);

        let barraEspaco = ' ';

        const imagem = document.createElement('img');
        imagem.setAttribute('class', 'barcode');
        imagem.setAttribute('id', `barcode${atual}`);
        toDataURL(`https://api.qrserver.com/v1/create-qr-code/?data=QrCode${barraEspaco + atual}&amp;size=${tamanho}x${tamanho}`, function (dataUrl) {
            imagem.setAttribute('src', dataUrl);
        })
        imagem.setAttribute('width', `${tamanho}`);
        imagem.setAttribute('height', `${tamanho}`);
        qr.appendChild(imagem);

        div1.appendChild(qr);

    }

}

function removerQrcode() {

    let atual = document.getElementById('quantia_input_qrcode').innerHTML;

    let paraRemover = document.getElementById(`div${atual}`);

    if (atual >= 0 && atual <= 10) {
        const div1 = document.getElementById('b2');
        div1.removeChild(paraRemover);
    } else if (atual >= 11 && atual <= 20) {
        const div1 = document.getElementById('c2');
        div1.removeChild(paraRemover);
    } else if (atual >= 21 && atual <= 30) {
        const div1 = document.getElementById('d2');
        div1.removeChild(paraRemover);
    }

}

function adicionarID() {

    let atual = document.getElementById('quantia_input_id').innerHTML;

    if (atual >= 0 && atual <= 4) {
        const div1 = document.getElementById('z2');
        gerarDiv(div1);
    }

    function gerarDiv(div1) {

        const identidade = document.createElement('div');
        identidade.setAttribute('id', `iddiv${atual}`);
        identidade.setAttribute('class', `centroid2 espaco20`);

        const identidadediv2 = document.createElement('div');
        identidadediv2.setAttribute('class', `centroid excluirImprimir`);
        identidade.appendChild(identidadediv2);


        const identidadediv2_1 = document.createElement('div');
        identidadediv2.appendChild(identidadediv2_1);

        const icone1 = document.createElement('span');
        icone1.setAttribute('class', 'fa fa-user fa-lg fa-fw icone_id');
        identidadediv2_1.appendChild(icone1);

        const input = document.createElement('input');
        input.setAttribute('class', 'id_input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', `nome${atual}`);
        input.setAttribute('maxlength', '40');
        input.setAttribute('placeholder', `Nome do Militar`);
        input.setAttribute('onkeyup', `modificarTexto1ID('texto1${atual}', 'nome${atual}')`);
        identidadediv2_1.appendChild(input);

        const identidadediv2_2 = document.createElement('div');
        identidadediv2.appendChild(identidadediv2_2);

        const icone2 = document.createElement('span');
        icone2.setAttribute('class', 'fa fa-person-military-rifle fa-lg fa-fw icone_id');
        identidadediv2_2.appendChild(icone2);

        const input2 = document.createElement('input');
        input2.setAttribute('class', 'id_input');
        input2.setAttribute('type', 'text');
        input2.setAttribute('id', `nomedeguerra${atual}`);
        input2.setAttribute('maxlength', '30');
        input2.setAttribute('placeholder', `Nome de Guerra`);
        input2.setAttribute('onkeyup', `modificarTexto2ID('texto2${atual}', 'nomedeguerra${atual}')`);
        identidadediv2_2.appendChild(input2);

        const identidadediv2_3 = document.createElement('div');
        identidadediv2.appendChild(identidadediv2_3);

        const icone3 = document.createElement('span');
        icone3.setAttribute('class', 'fa fa-arrow-down-1-9 fa-lg fa-fw icone_id');
        identidadediv2_3.appendChild(icone3);

        const input3 = document.createElement('input');
        input3.setAttribute('class', 'id_input');
        input3.setAttribute('type', 'text');
        input3.setAttribute('id', `numero${atual}`);
        input3.setAttribute('maxlength', '12');
        input3.setAttribute('placeholder', `Número`);
        input3.setAttribute('onkeyup', `modificarTexto3ID('texto3${atual}', 'numero${atual}')`);
        identidadediv2_3.appendChild(input3);

        const identidadediv3 = document.createElement('div');
        identidadediv3.setAttribute('class', `centroid espaco20 excluirImprimir`);
        identidade.appendChild(identidadediv3);

        const identidadediv3_1 = document.createElement('div');
        identidadediv3.appendChild(identidadediv3_1);

        const icone4 = document.createElement('span');
        icone4.setAttribute('class', 'fa fa-medal fa-lg fa-fw icone_id');
        identidadediv3_1.appendChild(icone4);

        const input4 = document.createElement('input');
        input4.setAttribute('class', 'id_input');
        input4.setAttribute('type', 'text');
        input4.setAttribute('id', `posto${atual}`);
        input4.setAttribute('maxlength', '30');
        input4.setAttribute('placeholder', `Posto / Graduação`);
        input4.setAttribute('onkeyup', `modificarTexto4ID('texto4${atual}', 'posto${atual}')`);
        identidadediv3_1.appendChild(input4);

        const identidadediv3_2 = document.createElement('div');
        identidadediv3.appendChild(identidadediv3_2);

        const icone5 = document.createElement('span');
        icone5.setAttribute('class', 'fa fa-building-flag fa-lg fa-fw icone_id');
        identidadediv3_2.appendChild(icone5);

        const input5 = document.createElement('input');
        input5.setAttribute('class', 'id_input');
        input5.setAttribute('type', 'text');
        input5.setAttribute('id', `om${atual}`);
        input5.setAttribute('maxlength', '10');
        input5.setAttribute('placeholder', `Organização Militar`);
        input5.setAttribute('onkeyup', `modificarTexto5ID('texto5${atual}', 'om${atual}')`);
        identidadediv3_2.appendChild(input5);

        const identidadediv3_3 = document.createElement('div');
        identidadediv3.appendChild(identidadediv3_3);

        const icone6 = document.createElement('span');
        icone6.setAttribute('class', 'fa fa-qrcode fa-lg fa-fw icone_id');
        identidadediv3_3.appendChild(icone6);

        const input6 = document.createElement('input');
        input6.setAttribute('class', 'id_input');
        input6.setAttribute('type', 'text');
        input6.setAttribute('id', `idqrcode${atual}`);
        input6.setAttribute('placeholder', `QrCode Militar`);
        input6.setAttribute('onkeyup', `generateBarCodeID("${atual}", 165, 'idqrcode${atual}')`);
        identidadediv3_3.appendChild(input6);

        const identidadediv4 = document.createElement('div');
        identidadediv4.setAttribute('class', `centroid2`);
        identidade.appendChild(identidadediv4);

        const imagem = document.createElement('img');
        imagem.setAttribute('id', `carteirinha${atual}`);
        toDataURL(`https://i.imgur.com/S8ZsUhT.png`, function (dataUrl) {
            imagem.setAttribute('src', dataUrl);
        })
        //imagem.setAttribute('src', '../imgs/id.png');
        imagem.setAttribute('width', `778`);
        imagem.setAttribute('height', `245`);
        identidadediv4.appendChild(imagem);

        let barraEspaco = ' ';

        const imagemQr = document.createElement('img');
        imagemQr.setAttribute('class', 'barcodeID');
        imagemQr.setAttribute('id', `carteirinhaqr${atual}`);
        toDataURL(`https://api.qrserver.com/v1/create-qr-code/?data=QrCode${barraEspaco}Militar&amp;size=165x165`, function (dataUrl) {
            imagemQr.setAttribute('src', dataUrl);
        })
        imagemQr.setAttribute('width', `165`);
        imagemQr.setAttribute('height', `165`);
        identidadediv4.appendChild(imagemQr);

        const texto1 = document.createElement('a');
        texto1.setAttribute('class', 'id_texto1 carteirinha_extra');
        texto1.setAttribute('id', `texto1${atual}`);
        identidadediv4.appendChild(texto1);

        const texto2 = document.createElement('a');
        texto2.setAttribute('class', 'id_texto2 carteirinha_extra');
        texto2.setAttribute('id', `texto2${atual}`);
        identidadediv4.appendChild(texto2);

        const texto3 = document.createElement('a');
        texto3.setAttribute('class', 'id_texto3 carteirinha_extra');
        texto3.setAttribute('id', `texto3${atual}`);
        identidadediv4.appendChild(texto3);

        const texto4 = document.createElement('a');
        texto4.setAttribute('class', 'id_texto4 carteirinha_extra');
        texto4.setAttribute('id', `texto4${atual}`);
        identidadediv4.appendChild(texto4);

        const texto5 = document.createElement('a');
        texto5.setAttribute('class', 'id_texto5 carteirinha_extra');
        texto5.setAttribute('id', `texto5${atual}`);
        identidadediv4.appendChild(texto5);

        div1.appendChild(identidade);

    }

}

function modificarTexto1ID(valor, valor2) {
    let input = document.getElementById(valor2)
    let texto = document.getElementById(valor);
    texto.innerHTML = input.value.toUpperCase();
    if (input.value.length >= 0 && input.value.length <= 16) {
        texto.style.marginTop = '-8px';
        texto.style.fontSize = '14px';
    } else if (input.value.length >= 17 && input.value.length <= 23) {
        texto.style.marginTop = '-6px';
        texto.style.fontSize = '12px';
    } else if (input.value.length >= 24 && input.value.length <= 30) {
        texto.style.marginTop = '-6px';
        texto.style.fontSize = '10px';
    } else if (input.value.length >= 31 && input.value.length <= 40) {
        texto.style.marginTop = '-4px';
        texto.style.fontSize = '8px';
    }
}

function modificarTexto2ID(valor, valor2) {
    let input = document.getElementById(valor2)
    let texto = document.getElementById(valor);
    texto.innerHTML = input.value.toUpperCase();
    if (input.value.length >= 0 && input.value.length <= 10) {
        texto.style.marginTop = '70px';
        texto.style.fontSize = '14px';
    } else if (input.value.length >= 11 && input.value.length <= 17) {
        texto.style.marginTop = '72px';
        texto.style.fontSize = '12px';
    } else if (input.value.length >= 18 && input.value.length <= 24) {
        texto.style.marginTop = '72px';
        texto.style.fontSize = '10px';
    } else if (input.value.length >= 25 && input.value.length <= 30) {
        texto.style.marginTop = '74px';
        texto.style.fontSize = '8px';
    }
}

function modificarTexto3ID(valor, valor2) {
    let input = document.getElementById(valor2)
    let texto = document.getElementById(valor);
    texto.innerHTML = input.value.toUpperCase();
    if (input.value.length >= 0 && input.value.length <= 7) {
        texto.style.marginTop = '70px';
        texto.style.fontSize = '14px';
    } else if (input.value.length == 8) {
        texto.style.marginTop = '72px';
        texto.style.fontSize = '12px';
    } else if (input.value.length == 9 || input.value.length == 10) {
        texto.style.marginTop = '72px';
        texto.style.fontSize = '10px';
    } else if (input.value.length == 11 || input.value.length == 12) {
        texto.style.marginTop = '74px';
        texto.style.fontSize = '8px';
    }
}

function modificarTexto4ID(valor, valor2) {
    let input = document.getElementById(valor2)
    let texto = document.getElementById(valor);
    texto.innerHTML = input.value.toUpperCase();
    if (input.value.length >= 0 && input.value.length <= 10) {
        texto.style.marginTop = '147px';
        texto.style.fontSize = '14px';
    } else if (input.value.length >= 11 && input.value.length <= 17) {
        texto.style.marginTop = '149px';
        texto.style.fontSize = '12px';
    } else if (input.value.length >= 18 && input.value.length <= 24) {
        texto.style.marginTop = '149px';
        texto.style.fontSize = '10px';
    } else if (input.value.length >= 25 && input.value.length <= 30) {
        texto.style.marginTop = '151px';
        texto.style.fontSize = '8px';
    }
}

function modificarTexto5ID(valor, valor2) {
    let input = document.getElementById(valor2)
    let texto = document.getElementById(valor);
    texto.innerHTML = input.value.toUpperCase();
    if (input.value.length >= 0 && input.value.length <= 5) {
        texto.style.marginTop = '147px';
        texto.style.fontSize = '14px';
    } else if (input.value.length == 6) {
        texto.style.marginTop = '149px';
        texto.style.fontSize = '12px';
    } else if (input.value.length == 7 || input.value.length == 8) {
        texto.style.marginTop = '149px';
        texto.style.fontSize = '10px';
    } else if (input.value.length == 9 || input.value.length == 10) {
        texto.style.marginTop = '151px';
        texto.style.fontSize = '8px';
    }
}

function removerID() {

    let atual = document.getElementById('quantia_input_id').innerHTML;

    let paraRemover = document.getElementById(`iddiv${atual}`);

    if (atual >= 0 && atual <= 4) {
        const div1 = document.getElementById('z2');
        div1.removeChild(paraRemover);
    }

}

function adicionarAoInventario() {

    let date = new Date();

    let diaAtual = date.getDate()
    let horaAtual = date.toLocaleTimeString();
    let anoAtual = date.getFullYear();
    let mesAtual = date.getMonth() + 1;

    if (mesAtual <= 9) {
        mesAtual = '0' + String(mesAtual)
    }

    if (diaAtual <= 9) {
        diaAtual = '0' + String(diaAtual)
    }

    let materialbox = document.getElementById('material_input_adicionar').value
    let quantiabox = document.getElementById('quantia_input_adicionar').value
    let infobox = document.getElementById('info_input_adicionar').value


    if (materialbox !== null && materialbox !== '' && quantiabox !== null && quantiabox !== '' && infobox !== null && infobox !== '') {

        firebase.database().ref(`Users/${emailDB}/Inventario/${materialbox}`).once("value", snapshot => {
            if (snapshot.exists()) {

                let perguntar = window.confirm('O material informado já está no inventário.\nDeseja editar?')

                if (perguntar) {
                    document.getElementById('material_input_adicionar').readOnly = true;
                    document.getElementById('material_input_adicionar').style.cursor = 'not-allowed';

                    $('#texto_editando').show()
                    document.getElementById('texto_editando').innerText = `Editando: ${snapshot.val().itemmaterial}`;
                    document.getElementById('menu_atual').innerText = 'Editar Material';
                    $('#adicionar_div').hide()
                    $('#editar_div').show()
                    document.getElementById('material_input_adicionar').value = snapshot.val().itemmaterial;
                    document.getElementById('quantia_input_adicionar').value = snapshot.val().itemquantia;
                    document.getElementById('info_input_adicionar').value = snapshot.val().iteminfo;
                } else {
                    return;
                }

            } else {

                firebase.database().ref(`Users/${emailDB}/Relatorio/${anoAtual}/${mesAtual}/${diaAtual}`).push().set({
                    itemano: String(anoAtual),
                    itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                    itemdestino: 'Inventario',
                    iteminfo: infobox,
                    itemmaterial: materialbox,
                    itemmes: String(mesAtual),
                    itemmilitar: 'Sistema',
                    itemquantia: String(quantiabox),
                    itemtipo: 'Adicionado'
                })

                firebase.database().ref(`Users/${emailDB}/Inventario/${materialbox}`).set({
                    itemano: String(anoAtual),
                    itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                    itemdestino: 'Inventario',
                    iteminfo: infobox,
                    itemmaterial: materialbox,
                    itemmes: String(mesAtual),
                    itemmilitar: 'Sistema',
                    itemquantia: String(quantiabox),
                    itemtipo: 'Inventario'
                })

                document.getElementById('material_input_adicionar').value = '';
                document.getElementById('quantia_input_adicionar').value = '';
                document.getElementById('info_input_adicionar').value = '';

            }

        })

    } else {
        alert('Não é possível adicionar um material com campos vazios.\nVerifique e tente novamente.')
    }

}

function editarInventario(voltarPagina) {

    let date = new Date();

    let diaAtual = date.getDate()
    let horaAtual = date.toLocaleTimeString();
    let anoAtual = date.getFullYear();
    let mesAtual = date.getMonth() + 1;

    if (mesAtual <= 9) {
        mesAtual = '0' + String(mesAtual)
    }

    if (diaAtual <= 9) {
        diaAtual = '0' + String(diaAtual)
    }

    let materialbox = document.getElementById('material_input_adicionar').value
    let quantiabox = document.getElementById('quantia_input_adicionar').value
    let infobox = document.getElementById('info_input_adicionar').value

    if (materialbox !== null && materialbox !== '' && quantiabox !== null && quantiabox !== '' && infobox !== null && infobox !== '') {

        firebase.database().ref(`Users/${emailDB}/Inventario/${materialbox}`).once("value", snapshot => {

            if (snapshot.exists()) {

                let itemdestino = snapshot.val().itemdestino;
                let iteminfo = snapshot.val().iteminfo;
                let itemmaterial = snapshot.val().itemmaterial;
                let itemmilitar = snapshot.val().itemmilitar;
                let itemquantia = snapshot.val().itemquantia;

                //  armazenar no relatorio
                firebase.database().ref(`Users/${emailDB}/Relatorio/${anoAtual}/${mesAtual}/${diaAtual}`).push().set({
                    itemano: String(anoAtual),
                    itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                    itemdestino: itemdestino,
                    iteminfo: 'De: '+iteminfo+' Para: '+infobox,
                    itemmaterial: itemmaterial,
                    itemmes: String(mesAtual),
                    itemmilitar: itemmilitar,
                    itemquantia: 'De: '+itemquantia+' Para: '+String(quantiabox),
                    itemtipo: 'Editado'
                })

                firebase.database().ref(`Users/${emailDB}/Inventario/${materialbox}`).update({
                    itemano: String(anoAtual),
                    itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                    itemdestino: 'Inventario',
                    iteminfo: infobox,
                    itemmaterial: materialbox,
                    itemmes: String(mesAtual),
                    itemmilitar: 'Sistema',
                    itemquantia: String(quantiabox),
                    itemtipo: 'Inventario'
                })

                if (voltarPagina === 'adicionar') {
                    mostrarAdicionar();
                    zerarInputs();
                } else if (voltarPagina === 'inventario') {
                    mostrarInventario();
                    alterarOrdemMaterial();
                    zerarInputs();
                    document.getElementById('editar_input').setAttribute('onclick', 'desativaScan(); editarInventario("adicionar")');
                }

            } else {
                alert('Material informado não existe no inventário.\nVerifique se o mesmo foi removido e tente novamente.')
            }

        })

    } else {
        alert('Não é possível editar um material com campos vazios.\nVerifique e tente novamente.')
    }

}

function cautelarMaterial() {

    let date = new Date();

    let diaAtual = date.getDate()
    let horaAtual = date.toLocaleTimeString();
    let anoAtual = date.getFullYear();
    let mesAtual = date.getMonth() + 1;

    if (mesAtual <= 9) {
        mesAtual = '0' + String(mesAtual)
    }

    if (diaAtual <= 9) {
        diaAtual = '0' + String(diaAtual)
    }

    let militarbox = document.getElementById('militar_input_cautelar').value;
    let materialbox = document.getElementById('material_input_cautelar').value;
    let quantiabox = document.getElementById('quantia_input_cautelar').value;
    let infobox = document.getElementById('info_input_cautelar').value;
    let destinobox = document.getElementById('destino_button_cautelar').textContent;

    function limparCampos() {
        document.getElementById('militar_input_cautelar').value = '';
        document.getElementById('material_input_cautelar').value = '';
        document.getElementById('quantia_input_cautelar').value = '';
        document.getElementById('info_input_cautelar').value = '';
        document.getElementById('destino_button_cautelar').textContent = 'Sem destino';
    }


    if (militarbox !== null && militarbox !== '' && materialbox !== null && materialbox !== '' && quantiabox !== null && quantiabox !== '' && infobox !== null && infobox !== '' && destinobox !== null && destinobox !== '') {

        firebase.database().ref(`Users/${emailDB}/Inventario/${materialbox}`).once("value", snapshot => {
            if (snapshot.exists()) {

                if (Number(snapshot.val().itemquantia) > Number(quantiabox)) {


                    // atualizar inventario
                    firebase.database().ref(`Users/${emailDB}/Inventario/${materialbox}`).update({
                        itemquantia: String(snapshot.val().itemquantia - Number(quantiabox)),
                    })

                    // armazenar em cautelados
                    firebase.database().ref(`Users/${emailDB}/Cautelados/${materialbox}`).push().set({
                        itemano: String(anoAtual),
                        itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                        itemdestino: destinobox,
                        iteminfo: infobox,
                        itemmaterial: materialbox,
                        itemmes: String(mesAtual),
                        itemmilitar: militarbox,
                        itemquantia: String(quantiabox),
                        itemtipo: 'Cautelado'
                    })

                    //  armazenar no relatorio
                    firebase.database().ref(`Users/${emailDB}/Relatorio/${anoAtual}/${mesAtual}/${diaAtual}`).push().set({
                        itemano: String(anoAtual),
                        itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                        itemdestino: destinobox,
                        iteminfo: infobox,
                        itemmaterial: materialbox,
                        itemmes: String(mesAtual),
                        itemmilitar: militarbox,
                        itemquantia: String(quantiabox),
                        itemtipo: 'Cautelado'
                    })

                    limparCampos()

                } else if (Number(snapshot.val().itemquantia) === Number(quantiabox)) {

                    //  remover do inventario
                    firebase.database().ref(`Users/${emailDB}/Inventario/${materialbox}`).remove()

                    //  armazenar em cautelados
                    firebase.database().ref(`Users/${emailDB}/Cautelados/${materialbox}`).push().set({
                        itemano: String(anoAtual),
                        itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                        itemdestino: destinobox,
                        iteminfo: infobox,
                        itemmaterial: materialbox,
                        itemmes: String(mesAtual),
                        itemmilitar: militarbox,
                        itemquantia: String(quantiabox),
                        itemtipo: 'Cautelado'
                    })

                    //  armazenar no relatorio
                    firebase.database().ref(`Users/${emailDB}/Relatorio/${anoAtual}/${mesAtual}/${diaAtual}`).push().set({
                        itemano: String(anoAtual),
                        itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                        itemdestino: destinobox,
                        iteminfo: infobox,
                        itemmaterial: materialbox,
                        itemmes: String(mesAtual),
                        itemmilitar: militarbox,
                        itemquantia: String(quantiabox),
                        itemtipo: 'Cautelado'
                    })

                    limparCampos()

                } else if (Number(snapshot.val().itemquantia) < Number(quantiabox)) {
                    alert(`A quantia informada é menor que a disponível no inventário.\nQuantia disponível: ${snapshot.val().itemquantia}.\nVerifique e tente novamente.`)
                }

            } else {
                alert('Material informado não existe no inventário.\nVerifique e tente novamente.')
            }

        })

    } else {
        alert('Não é possível cautelar um material com campos vazios.\nVerifique e tente novamente.')
    }

}

function excluirMaterialInventario(material) {

    let date = new Date();

    let diaAtual = date.getDate()
    let horaAtual = date.toLocaleTimeString();
    let anoAtual = date.getFullYear();
    let mesAtual = date.getMonth() + 1;

    if (mesAtual <= 9) {
        mesAtual = '0' + String(mesAtual)
    }

    if (diaAtual <= 9) {
        diaAtual = '0' + String(diaAtual)
    }

    firebase.database().ref(`Users/${emailDB}/Inventario/${material}`).once("value", snapshot => {

        if (snapshot.exists()) {

            let itemdestino = snapshot.val().itemdestino;
            let iteminfo = snapshot.val().iteminfo;
            let itemmaterial = snapshot.val().itemmaterial;
            let itemmilitar = snapshot.val().itemmilitar;
            let itemquantia = snapshot.val().itemquantia;

            let confirmar = window.confirm(`Tem certeza que deseja EXCLUIR o material "${material}"?`)

            if (confirmar) {

                //  armazenar no relatorio
                firebase.database().ref(`Users/${emailDB}/Relatorio/${anoAtual}/${mesAtual}/${diaAtual}`).push().set({
                    itemano: String(anoAtual),
                    itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                    itemdestino: itemdestino,
                    iteminfo: iteminfo,
                    itemmaterial: itemmaterial,
                    itemmes: String(mesAtual),
                    itemmilitar: itemmilitar,
                    itemquantia: itemquantia,
                    itemtipo: 'Removido'
                })

                //  excluir do inventario
                firebase.database().ref(`Users/${emailDB}/Inventario/${material}`).remove()
                fetchData();
                let input = document.getElementById('buscar_input_inventario');
                input.value = '';

            } else {
                return;
            }

        } else {
            fetchData();
            let input = document.getElementById('buscar_input_inventario');
            input.value = '';
            alert('Material não encontrado.\nVerifique se o mesmo já foi removido.')
        }

    })

}

function excluirMaterialCautelados(key, material) {

    let date = new Date();

    let diaAtual = date.getDate()
    let horaAtual = date.toLocaleTimeString();
    let anoAtual = date.getFullYear();
    let mesAtual = date.getMonth() + 1;

    if (mesAtual <= 9) {
        mesAtual = '0' + String(mesAtual)
    }

    if (diaAtual <= 9) {
        diaAtual = '0' + String(diaAtual)
    }

    firebase.database().ref(`Users/${emailDB}/Cautelados/${material}/${key}`).once('value', function (snapshot) {

        if (snapshot.exists()) {

            let itemdestino = snapshot.val().itemdestino;
            let iteminfo = snapshot.val().iteminfo;
            let itemmaterial = snapshot.val().itemmaterial;
            let itemmilitar = snapshot.val().itemmilitar;
            let itemquantia = snapshot.val().itemquantia;

            let confirmar = window.confirm(`Tem certeza que deseja EXCLUIR o material "${material}"?`)

            if (confirmar) {

                //  armazenar no relatorio
                firebase.database().ref(`Users/${emailDB}/Relatorio/${anoAtual}/${mesAtual}/${diaAtual}`).push().set({
                    itemano: String(anoAtual),
                    itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                    itemdestino: itemdestino,
                    iteminfo: iteminfo,
                    itemmaterial: itemmaterial,
                    itemmes: String(mesAtual),
                    itemmilitar: itemmilitar,
                    itemquantia: itemquantia,
                    itemtipo: 'Removido'
                })

                //  excluir do cautelados
                firebase.database().ref(`Users/${emailDB}/Cautelados/${material}/${key}`).remove()
                fetchDataCautelados();
                let input = document.getElementById('buscar_input_cautelados');
                input.value = '';

            } else {
                return;
            }

        } else {
            fetchDataCautelados();
            let input = document.getElementById('buscar_input_cautelados');
            input.value = '';
            alert('Material não encontrado.\nVerifique se o mesmo já foi removido.')
        }

    })

}

function descautelarMaterialCautelados(key, material, quantia, destino, militar, data, info) {

    let date = new Date();

    let diaAtual = date.getDate()
    let horaAtual = date.toLocaleTimeString();
    let anoAtual = date.getFullYear();
    let mesAtual = date.getMonth() + 1;

    if (mesAtual <= 9) {
        mesAtual = '0' + String(mesAtual)
    }

    if (diaAtual <= 9) {
        diaAtual = '0' + String(diaAtual)
    }

    firebase.database().ref(`Users/${emailDB}/Cautelados/${material}/${key}`).once('value', function (snapshot) {

        if (snapshot.exists()) {

            let itemdestino = snapshot.val().itemdestino;
            let iteminfo = snapshot.val().iteminfo;
            let itemmaterial = snapshot.val().itemmaterial;
            let itemmilitar = snapshot.val().itemmilitar;
            let itemquantia = snapshot.val().itemquantia;

            let confirmar = window.confirm(`Descautelar o material "${material}"?`)

            function excluir() {
                firebase.database().ref(`Users/${emailDB}/Cautelados/${material}/${key}`).remove()
                fetchDataCautelados();
                let input = document.getElementById('buscar_input_cautelados');
                input.value = '';
            }

            if (confirmar) {

                //  armazenar no relatorio
                firebase.database().ref(`Users/${emailDB}/Relatorio/${anoAtual}/${mesAtual}/${diaAtual}`).push().set({
                    itemano: String(anoAtual),
                    itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                    itemdestino: itemdestino,
                    iteminfo: iteminfo,
                    itemmaterial: itemmaterial,
                    itemmes: String(mesAtual),
                    itemmilitar: itemmilitar,
                    itemquantia: itemquantia,
                    itemtipo: 'Descautelado'
                })

                firebase.database().ref(`Users/${emailDB}/Inventario/${material}`).once("value", snapshot => {

                    if (snapshot.exists()) {

                        let quantiaInventario = snapshot.val().itemquantia;

                        console.log(quantiaInventario);

                        firebase.database().ref(`Users/${emailDB}/Inventario/${material}`).update({
                            itemano: String(anoAtual),
                            itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                            itemdestino: 'Inventario',
                            iteminfo: info,
                            itemmaterial: material,
                            itemmes: String(mesAtual),
                            itemmilitar: 'Sistema',
                            itemquantia: String(Number(quantia) + Number(quantiaInventario)),
                            itemtipo: 'Inventario'
                        })

                        excluir();

                    } else {

                        firebase.database().ref(`Users/${emailDB}/Inventario/${material}`).set({
                            itemano: String(anoAtual),
                            itemdata: diaAtual + '-' + mesAtual + '-' + anoAtual + ' | ' + horaAtual,
                            itemdestino: 'Inventario',
                            iteminfo: info,
                            itemmaterial: material,
                            itemmes: String(mesAtual),
                            itemmilitar: 'Sistema',
                            itemquantia: String(quantia),
                            itemtipo: 'Inventario'
                        })

                        excluir()
                    }

                })

            } else {
                return;
            }

        } else {
            fetchData();
            let input = document.getElementById('buscar_input_cautelados');
            input.value = '';
            alert('Material não encontrado.\nVerifique se o mesmo foi removido.')
        }

    })

}

function editarMaterialInventario(material) {

    firebase.database().ref(`Users/${emailDB}/Inventario/${material}`).once("value", snapshot => {

        if (snapshot.exists()) {

            let confirmar = window.confirm(`Editar o material "${material}"?`)

            if (confirmar) {
                mostrarEditar(snapshot);
            } else {
                return;
            }

        } else {
            fetchData();
            let input = document.getElementById('buscar_input_inventario');
            input.value = '';
            alert('Material não encontrado.\nVerifique se o mesmo foi removido.')
        }

    })

}

function cautelarMaterialInventario(material) {

    firebase.database().ref(`Users/${emailDB}/Inventario/${material}`).once("value", snapshot => {

        if (snapshot.exists()) {

            let confirmar = window.confirm(`Cautelar o material "${material}"?`)

            if (confirmar) {
                mostrarCautelar();
                document.getElementById('material_input_cautelar').value = snapshot.val().itemmaterial;
                document.getElementById('info_input_cautelar').value = snapshot.val().iteminfo;
            } else {
                return;
            }

        } else {
            fetchData();
            let input = document.getElementById('buscar_input_inventario');
            input.value = '';
            alert('Material não encontrado.\nVerifique se o mesmo foi removido.')
        }

    })

}

function printDocuments() {

    let atual = document.getElementById('quantia_input_qrcode').innerHTML;

    if (atual == '0') {
        alert('Não é possível imprimir sem inserir nenhum QrCode.\nVerifique e tente novamente.')
    } else {
        var opt = {
            margin: 5,
            filename: 'Imprimir QrCode.pdf',
            image: { type: 'png' },
            html2canvas: { scale: 1, dpi: 194, letterRendering: true },
            //jsPDF:{ unit: 'in', format: 'letter', orientation: 'portrait' }
        }
        
        var input = document.getElementById("gerar-qrcode");
        document.getElementsByTagName("body")[0].style.overflow = 'hidden';
        $('.excluirImprimir').hide();

        function mostrarItens() {
            $('.excluirImprimir').show();
            document.getElementsByTagName("body")[0].style.overflow = 'auto'
        }

        function imprimirQR() {
            html2pdf(input, opt)
                .then(() => mostrarItens())
        }

        setTimeout(imprimirQR(), 2500)

    }

}

function printDocumentsID() {

    let atual = document.getElementById('quantia_input_id').innerHTML;

    if (atual == '0') {
        alert('Não é possível imprimir sem inserir nenhum ID.\nVerifique e tente novamente.')
    } else {
        var opt = {
            margin: [10, 0, 0, 0],
            filename: 'Imprimir ID.pdf',
            image: { type: 'png' },
            html2canvas: { scale: 1, dpi: 194, letterRendering: true },
            //jsPDF:{ unit: 'in', format: 'letter', orientation: 'portrait' }
        }

        var input = document.getElementById("z2");
        document.getElementsByTagName("body")[0].style.overflow = 'hidden';
        $('.excluirImprimir').hide();

        function mostrarItens() {
            $('.excluirImprimir').show();
            document.getElementsByTagName("body")[0].style.overflow = 'auto'
        }

        function imprimirID() {
            html2pdf(input, opt)
                .then(() => mostrarItens())
        }

        setTimeout(imprimirID(), 2500)

    }

}


function buscarInventario() {

    input = document.getElementById('buscar_input_inventario');

    let numeroOrdem;

    if (input.placeholder == 'Material') {
        numeroOrdem = 0
    } else if (input.placeholder == 'Último Militar') {
        numeroOrdem = 2
    } else if (input.placeholder == 'Data') {
        numeroOrdem = 3
    }

    var input, filter, ol, li, p, i, txtValue;

    filter = input.value.toUpperCase();
    ol = document.getElementById("items");
    li = ol.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        p = li[i].getElementsByTagName("p")[numeroOrdem];
        txtValue = p.textContent || p.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function alterarOrdemMaterial() {
    desativaScan();
    fetchData();
    let input = document.getElementById('buscar_input_inventario');
    input.placeholder = 'Material';
    input.value = '';
    document.getElementById('buscar_button_inventario_material').style.opacity = 1;
    document.getElementById('buscar_button_inventario_ultimo').style.opacity = 0.7;
    document.getElementById('buscar_button_inventario_data').style.opacity = 0.7;
    $('#buscar_button_inventario').show()
    $('#buscar_icone_inventario_2').hide();
    $('#buscar_icone_inventario').show();
}

function alterarOrdemUltimo() {
    desativaScan();
    fetchData();
    let input = document.getElementById('buscar_input_inventario');
    input.placeholder = 'Último Militar';
    input.value = '';
    document.getElementById('buscar_button_inventario_material').style.opacity = 0.7;
    document.getElementById('buscar_button_inventario_ultimo').style.opacity = 1;
    document.getElementById('buscar_button_inventario_data').style.opacity = 0.7;
    $('#buscar_button_inventario').show()
    $('#buscar_icone_inventario_2').hide();
    $('#buscar_icone_inventario').show();
}

function alterarOrdemData() {
    desativaScan();
    fetchData();
    let input = document.getElementById('buscar_input_inventario');
    input.placeholder = 'Data';
    input.value = '';
    document.getElementById('buscar_button_inventario_material').style.opacity = 0.7;
    document.getElementById('buscar_button_inventario_ultimo').style.opacity = 0.7;
    document.getElementById('buscar_button_inventario_data').style.opacity = 1;
    $('#buscar_button_inventario').hide()
    $('#buscar_icone_inventario').hide();
    $('#buscar_icone_inventario_2').show();
}


function buscarCautelados() {

    input = document.getElementById('buscar_input_cautelados');

    let numeroOrdem;

    if (input.placeholder == 'Material') {
        numeroOrdem = 0
    } else if (input.placeholder == 'Militar') {
        numeroOrdem = 3
    } else if (input.placeholder == 'Data') {
        numeroOrdem = 4
    } else if (input.placeholder == 'Destino') {
        numeroOrdem = 2
    }

    var input, filter, ol, li, p, i, txtValue;

    filter = input.value.toUpperCase();
    ol = document.getElementById("cautelados");
    li = ol.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        p = li[i].getElementsByTagName("p")[numeroOrdem];
        txtValue = p.textContent || p.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function alterarOrdemMaterialCautelados() {
    desativaScan();
    fetchDataCautelados();
    let input = document.getElementById('buscar_input_cautelados');
    input.placeholder = 'Material';
    input.value = '';
    document.getElementById('buscar_button_cautelados_material').style.opacity = 1;
    document.getElementById('buscar_button_cautelados_militar').style.opacity = 0.7;
    document.getElementById('buscar_button_cautelados_data').style.opacity = 0.7;
    document.getElementById('buscar_button_cautelados_destino').style.opacity = 0.7;
    $('#buscar_button_cautelados').show()
    $('#buscar_icone_cautelados_2').hide();
    $('#buscar_icone_cautelados').show();
    $('#buscar_icone_cautelados_3').hide();
}

function alterarOrdemUltimoCautelados() {
    desativaScan();
    fetchDataCautelados();
    let input = document.getElementById('buscar_input_cautelados');
    input.placeholder = 'Militar';
    input.value = '';
    document.getElementById('buscar_button_cautelados_material').style.opacity = 0.7;
    document.getElementById('buscar_button_cautelados_militar').style.opacity = 1;
    document.getElementById('buscar_button_cautelados_data').style.opacity = 0.7;
    document.getElementById('buscar_button_cautelados_destino').style.opacity = 0.7;
    $('#buscar_button_cautelados').show()
    $('#buscar_icone_cautelados_2').hide();
    $('#buscar_icone_cautelados').show();
    $('#buscar_icone_cautelados_3').hide();
}

function alterarOrdemDataCautelados() {
    desativaScan();
    fetchDataCautelados();
    let input = document.getElementById('buscar_input_cautelados');
    input.placeholder = 'Data';
    input.value = '';
    document.getElementById('buscar_button_cautelados_material').style.opacity = 0.7;
    document.getElementById('buscar_button_cautelados_militar').style.opacity = 0.7;
    document.getElementById('buscar_button_cautelados_data').style.opacity = 1;
    document.getElementById('buscar_button_cautelados_destino').style.opacity = 0.7;
    $('#buscar_button_cautelados').hide()
    $('#buscar_icone_cautelados').hide();
    $('#buscar_icone_cautelados_2').show();
    $('#buscar_icone_cautelados_3').hide();
}

function alterarOrdemDestinoCautelados() {
    desativaScan();
    fetchDataCautelados();
    let input = document.getElementById('buscar_input_cautelados');
    input.placeholder = 'Destino';
    input.value = '';
    document.getElementById('buscar_button_cautelados_material').style.opacity = 0.7;
    document.getElementById('buscar_button_cautelados_militar').style.opacity = 0.7;
    document.getElementById('buscar_button_cautelados_data').style.opacity = 0.7;
    document.getElementById('buscar_button_cautelados_destino').style.opacity = 1;
    $('#buscar_button_cautelados').hide()
    $('#buscar_icone_cautelados').hide();
    $('#buscar_icone_cautelados_2').hide();
    $('#buscar_icone_cautelados_3').show();
}

function zerarInputs() {
    document.getElementById('material_input_adicionar').value = '';
    document.getElementById('quantia_input_adicionar').value = '';
    document.getElementById('info_input_adicionar').value = '';
    document.getElementById('militar_input_cautelar').value = '';
    document.getElementById('material_input_cautelar').value = '';
    document.getElementById('quantia_input_cautelar').value = '';
    document.getElementById('info_input_cautelar').value = '';
    document.getElementById('destino_button_cautelar').textContent = 'Sem destino';
}