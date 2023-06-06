firebase.auth().onAuthStateChanged(user => {
    if (user && user !== null) {
        window.location.href = "pages/main.html";
    }
})

const form = {
    email: () => document.getElementById('email'),
    senha: () => document.getElementById('senha'),
    login: () => document.getElementById('login'),
    esqueci_senha: () => document.getElementById('esqueci_senha'),
    icone_carregando: () => document.getElementById('icone_carregando')
}

function validarEmail() {
    const email = form.email().value;
    if (!email) {
        return false
    }
    return emailValido(email);
}

function validarSenha() {
    const senha = form.senha().value;
    if (!senha) {
        return false
    }
    return true;
}

// Input "Login" e "Esqueci a senha" visível (on/off)
function validarInputs() {
    const emailValido = validarEmail();
    const senhaValida = validarSenha();
    form.esqueci_senha().disabled = !emailValido
    form.login().disabled = !emailValido || !senhaValida
}

function mostrarSenha() {
    const senha = form.senha().type;
    if (senha === 'password') {
        form.senha().type = 'text';
    } else if (senha === 'text') {
        form.senha().type = 'password';
    }
}

function fazerLogin() {

    form.icone_carregando().style.opacity = 1;

    firebase.auth().signInWithEmailAndPassword(form.email().value, form.senha().value).then(response => {
        form.icone_carregando().style.opacity = 0;
        window.location.href = "pages/main.html";
    }).catch(error => {
        form.icone_carregando().style.opacity = 0;
        alert(pegarErroFirebase(error));
    })

}

function recuperarSenha() {

    form.icone_carregando().style.opacity = 1;

    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        form.icone_carregando().style.opacity = 0;
        alert('Email de recuperação enviado com sucesso');
    }).catch(error => {
        form.icone_carregando().style.opacity = 0;
        alert(pegarErroFirebase(error));
    });

}

function pegarErroFirebase(error) {
    if (error.code == "auth/user-not-found" || error.code == "auth/wrong-password") {
        return "Usuário ou senha inválida:\nVerifique e tente novamente.";
    }
    if (error.code == "auth/wrong-password") {
        return "Usuário ou senha inválida:\nVerifique e tente novamente.";
    }
    if (error.code == "auth/too-many-requests") {
        return "Muitas tentativas de login com dados incorretos.\nLogin temporariamente bloqueado.\nAguarde e tente novamente.";
    }
    return error.message;
}