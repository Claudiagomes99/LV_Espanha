// ==================== CADASTRO.JS ====================

// Função para calcular idade a partir da data de nascimento
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade;
}

// Função para salvar dados do cadastro
function salvarCadastro(event) {
    event.preventDefault();
    
    // Pega os valores dos campos
    const inputs = document.querySelectorAll('.login-form input');
    const nome = inputs[0].value.trim();
    const telefone = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const dataNascimento = inputs[3].value;
    const senha = inputs[4].value;
    const confirmarSenha = inputs[5].value;
    
    // Validações
    if (!nome || !telefone || !email || !dataNascimento || !senha || !confirmarSenha) {
        alert('❌ Por favor, preencha todos os campos!');
        return false;
    }
    
    if (senha !== confirmarSenha) {
        alert('❌ As senhas não coincidem!');
        return false;
    }
    
    if (senha.length < 6) {
        alert('❌ A senha deve ter pelo menos 6 caracteres!');
        return false;
    }
    
    // Valida email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('❌ Por favor, digite um email válido!');
        return false;
    }
    
    // Calcula a idade
    const idade = calcularIdade(dataNascimento);
    
    if (idade < 10) {
        alert('❌ Você precisa ter pelo menos 10 anos para se cadastrar.');
        return false;
    }
    
    // Cria o objeto do usuário
    const usuario = {
        nome: nome,
        telefone: telefone,
        email: email,
        dataNascimento: dataNascimento,
        idade: idade,
        senha: senha,
        dataCadastro: new Date().toISOString(),
        cursosFeitos: [],
        favoritos: []
    };
    
    // Salva no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    alert('✅ Cadastro realizado com sucesso!');
    
    // Redireciona para a página de login
    window.location.href = '../Entrar/Entrar.html';
    
    return false;
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('📝 Página de cadastro carregada');
    
    const formCadastro = document.querySelector('.login-form');
    const btnCadastrar = document.querySelector('.login-btn');
    
    if (formCadastro) {
        formCadastro.addEventListener('submit', salvarCadastro);
    }
    
    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', function(e) {
            e.preventDefault();
            salvarCadastro(e);
        });
    }
    
    // Atualiza o ano no footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});