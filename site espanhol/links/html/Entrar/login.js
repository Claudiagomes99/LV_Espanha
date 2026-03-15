// ==================== LOGIN.JS ====================

// Função para realizar login
function realizarLogin(event) {
    event.preventDefault();
    
    const usuarioJSON = localStorage.getItem('usuario');
    
    if (!usuarioJSON) {
        alert('❌ Nenhum usuário cadastrado! Por favor, faça o cadastro primeiro.');
        window.location.href = '../Cadastro/cadastro.html';
        return false;
    }
    
    const usuario = JSON.parse(usuarioJSON);
    
    const inputs = document.querySelectorAll('.login-form input');
    const nomeDigitado = inputs[0].value.trim();
    const senhaDigitada = inputs[1].value;
    
    // Validação dos campos
    if (!nomeDigitado || !senhaDigitada) {
        alert('❌ Por favor, preencha todos os campos!');
        return false;
    }
    
    // Validação de login
    if (nomeDigitado === usuario.nome && senhaDigitada === usuario.senha) {
        alert('✅ Login realizado com sucesso!');
        // Marca o usuário como logado
        localStorage.setItem('usuarioLogado', 'true');
        window.location.href = '../Perfil/perfil.html';
    } else {
        alert('❌ Nome de usuário ou senha incorretos!');
    }
    
    return false;
}

// Upload de foto de perfil (funcionalidade extra)
function carregarFotoPerfil() {
    const fileInput = document.getElementById('fileUpload');
    const imgPreview = document.getElementById('foto-preview');

    if (fileInput && imgPreview) {
        fileInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    imgPreview.src = e.target.result;
                    // Salva a foto no localStorage
                    localStorage.setItem('fotoPerfil', e.target.result);
                }
                reader.readAsDataURL(file);
            }
        });
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
    console.log('🔐 Página de login carregada');
    
    const formLogin = document.querySelector('.login-form');
    const btnLogin = document.querySelector('.login-btn');
    
    if (formLogin) {
        formLogin.addEventListener('submit', realizarLogin);
    }
    
    if (btnLogin) {
        btnLogin.addEventListener('click', function(e) {
            e.preventDefault();
            realizarLogin(e);
        });
    }
    
    // Carrega funcionalidade de foto (se existir)
    carregarFotoPerfil();
    
    // Atualiza o ano no footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});