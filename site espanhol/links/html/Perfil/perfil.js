// ==================== PERFIL.JS ====================

// Função para formatar data no formato brasileiro
function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate() + 1).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Função para obter iniciais do nome
function obterIniciais(nome) {
    const partes = nome.trim().split(' ');
    if (partes.length >= 2) {
        return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
    }
    return partes[0][0].toUpperCase();
}

// Função para calcular idade
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

// Carregar dados do usuário no perfil
function carregarPerfil() {
    const usuarioJSON = localStorage.getItem('usuario');
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    
    // Verifica se o usuário está logado
    if (!usuarioLogado || usuarioLogado !== 'true') {
        alert('❌ Você precisa fazer login primeiro!');
        window.location.href = '../Entrar/Entrar.html';
        return;
    }
    
    if (!usuarioJSON) {
        alert('❌ Nenhum usuário encontrado! Faça o cadastro.');
        window.location.href = '../Cadastro/cadastro.html';
        return;
    }

    const usuario = JSON.parse(usuarioJSON);

    // Preenche os dados na página de perfil
    const nomeElement = document.getElementById('nomeUsuario');
    const idadeElement = document.getElementById('idadeUsuario');
    const emailElement = document.getElementById('emailUsuario');
    const telefoneElement = document.getElementById('telefoneUsuario');
    const dataNascElement = document.getElementById('dataNascimento');
    const dataCadastroElement = document.getElementById('dataCadastro');
    const cursosFeitosElement = document.getElementById('cursosFeitos');
    const favoritosElement = document.getElementById('favoritos');
    const avatarElement = document.getElementById('avatar');

    if (nomeElement) nomeElement.textContent = usuario.nome;
    if (idadeElement) idadeElement.textContent = usuario.idade;
    if (emailElement) emailElement.textContent = usuario.email;
    if (telefoneElement) telefoneElement.textContent = usuario.telefone || '--';
    if (dataNascElement) dataNascElement.textContent = formatarData(usuario.dataNascimento);
    if (dataCadastroElement) dataCadastroElement.textContent = formatarData(usuario.dataCadastro);
    if (cursosFeitosElement) cursosFeitosElement.textContent = usuario.cursosFeitos ? usuario.cursosFeitos.length : 0;
    if (favoritosElement) favoritosElement.textContent = usuario.favoritos ? usuario.favoritos.length : 0;
    if (avatarElement) avatarElement.textContent = obterIniciais(usuario.nome);

    // Carrega foto de perfil se existir
    const fotoPerfil = localStorage.getItem('fotoPerfil');
    if (fotoPerfil && avatarElement) {
        avatarElement.style.backgroundImage = `url(${fotoPerfil})`;
        avatarElement.style.backgroundSize = 'cover';
        avatarElement.textContent = '';
    }

    // Atualiza o ano no footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Carrega cursos se existirem
    carregarCursos();
}

// Função para carregar lista de cursos
function carregarCursos() {
    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) return;
    
    const usuario = JSON.parse(usuarioJSON);
    const listaCursos = document.getElementById('listaCursos');
    
    if (!listaCursos) return;
    
    listaCursos.innerHTML = '';
    
    if (!usuario.cursosFeitos || usuario.cursosFeitos.length === 0) {
        listaCursos.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Você ainda não tem cursos matriculados.</p>';
        return;
    }
    
    usuario.cursosFeitos.forEach(function(curso) {
        const cursoDiv = document.createElement('div');
        cursoDiv.classList.add('curso-item');
        cursoDiv.innerHTML = '<p><strong>' + curso.nome + '</strong></p><progress value="' + curso.progresso + '" max="100"></progress> ' + curso.progresso + '%';
        listaCursos.appendChild(cursoDiv);
    });
}

// Função para carregar lista de favoritos
function carregarFavoritos() {
    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) return;
    
    const usuario = JSON.parse(usuarioJSON);
    const listaFavoritos = document.getElementById('listaFavoritos');
    
    if (!listaFavoritos) return;
    
    listaFavoritos.innerHTML = '';
    
    if (!usuario.favoritos || usuario.favoritos.length === 0) {
        listaFavoritos.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Você ainda não tem posts favoritos.</p>';
        return;
    }
    
    usuario.favoritos.forEach(function(favorito) {
        const favDiv = document.createElement('div');
        favDiv.classList.add('favorito-card');
        favDiv.style.cssText = 'background: white; padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem; box-shadow: 0 3px 10px rgba(0,0,0,0.1); transition: all 0.3s ease;';
        
        favDiv.innerHTML = '<div style="display: flex; gap: 1rem; align-items: center;">' +
            '<div style="min-width: 80px; height: 80px; border-radius: 10px; overflow: hidden; flex-shrink: 0;">' +
            '<img src="' + favorito.imagem + '" style="width: 100%; height: 100%; object-fit: cover;" alt="' + favorito.titulo + '">' +
            '</div>' +
            '<div style="flex: 1;">' +
            '<span style="display: inline-block; background: #a439db; color: white; font-size: 0.7rem; padding: 3px 8px; border-radius: 10px; margin-bottom: 0.5rem;">' + favorito.categoria + '</span>' +
            '<h4 style="color: #ff6600; margin: 0 0 0.5rem 0; font-size: 1.1rem;">' + favorito.titulo + '</h4>' +
            '<p style="color: #666; margin: 0; font-size: 0.9rem;">' + favorito.descricao + '</p>' +
            '<button onclick="removerFavorito(\'' + favorito.titulo + '\')" style="margin-top: 0.8rem; background: #ff6600; color: white; border: none; padding: 5px 15px; border-radius: 15px; cursor: pointer; font-size: 0.85rem;">Remover ❌</button>' +
            '</div>' +
            '</div>';
        
        listaFavoritos.appendChild(favDiv);
    });
}

// Função para remover favorito
function removerFavorito(titulo) {
    if (!confirm('Tem certeza que deseja remover este post dos favoritos?')) {
        return;
    }
    
    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) return;
    
    const usuario = JSON.parse(usuarioJSON);
    
    // Remove do array de favoritos
    usuario.favoritos = usuario.favoritos.filter(function(fav) {
        return fav.titulo !== titulo;
    });
    
    // Atualiza contador global
    const contadores = JSON.parse(localStorage.getItem('contadoresFavoritos') || '{}');
    if (contadores[titulo] > 0) {
        contadores[titulo]--;
    }
    localStorage.setItem('contadoresFavoritos', JSON.stringify(contadores));
    
    // Salva no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    alert('✅ Favorito removido com sucesso!');
    
    // Recarrega o perfil
    carregarPerfil();
}

// Função para abrir modal de edição
function abrirModalEdicao() {
    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) {
        alert('❌ Usuário não encontrado!');
        return;
    }
    
    const usuario = JSON.parse(usuarioJSON);
    const modal = document.getElementById('modalEdicao');
    
    // Preenche os campos do formulário com os dados atuais
    document.getElementById('editNome').value = usuario.nome;
    document.getElementById('editTelefone').value = usuario.telefone || '';
    document.getElementById('editEmail').value = usuario.email;
    document.getElementById('editDataNasc').value = usuario.dataNascimento;
    
    // Exibe o modal
    modal.style.display = 'block';
}

// Função para fechar modal de edição
function fecharModalEdicao() {
    const modal = document.getElementById('modalEdicao');
    modal.style.display = 'none';
}

// Função para salvar edição do perfil
function salvarEdicao(event) {
    event.preventDefault();
    
    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) {
        alert('❌ Usuário não encontrado!');
        return;
    }
    
    const usuario = JSON.parse(usuarioJSON);
    
    // Pega os novos valores
    const novoNome = document.getElementById('editNome').value.trim();
    const novoTelefone = document.getElementById('editTelefone').value.trim();
    const novoEmail = document.getElementById('editEmail').value.trim();
    const novaDataNasc = document.getElementById('editDataNasc').value;
    
    // Validações
    if (!novoNome || !novoTelefone || !novoEmail || !novaDataNasc) {
        alert('❌ Por favor, preencha todos os campos!');
        return;
    }
    
    // Valida email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(novoEmail)) {
        alert('❌ Por favor, digite um email válido!');
        return;
    }
    
    // Calcula nova idade
    const novaIdade = calcularIdade(novaDataNasc);
    
    if (novaIdade < 10) {
        alert('❌ Você precisa ter pelo menos 10 anos.');
        return;
    }
    
    // Atualiza os dados do usuário
    usuario.nome = novoNome;
    usuario.telefone = novoTelefone;
    usuario.email = novoEmail;
    usuario.dataNascimento = novaDataNasc;
    usuario.idade = novaIdade;
    
    // Salva no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    alert('✅ Perfil atualizado com sucesso!');
    
    // Fecha o modal
    fecharModalEdicao();
    
    // Recarrega o perfil
    carregarPerfil();
}

// Função para adicionar curso
function adicionarCurso() {
    const nomeCurso = document.getElementById('cursoNome');
    const progresso = document.getElementById('cursoProgresso');
    
    if (!nomeCurso || !progresso) {
        alert('⚠️ Campos de curso não encontrados!');
        return;
    }
    
    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) {
        alert('❌ Usuário não encontrado!');
        return;
    }
    
    const usuario = JSON.parse(usuarioJSON);
    
    if (nomeCurso.value && progresso.value) {
        const curso = {
            nome: nomeCurso.value,
            progresso: progresso.value,
            data: new Date().toISOString()
        };
        
        if (!usuario.cursosFeitos) {
            usuario.cursosFeitos = [];
        }
        
        usuario.cursosFeitos.push(curso);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        
        // Atualiza a exibição
        carregarPerfil();
        
        nomeCurso.value = '';
        progresso.value = '';
        
        alert('✅ Curso adicionado com sucesso!');
    } else {
        alert('❌ Por favor, preencha o nome do curso e o progresso!');
    }
}

// Função para sair
function sair(event) {
    if (event) {
        event.preventDefault();
    }
    
    if (confirm('❓ Tem certeza que deseja sair?')) {
        localStorage.removeItem('usuarioLogado');
        alert('✅ Você saiu com sucesso!');
        window.location.href = '../Entrar/Entrar.html';
        return false;
    }
    
    return false;
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modalEdicao');
    if (modal && event.target === modal) {
        fecharModalEdicao();
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('👤 Página de perfil carregada');
    carregarPerfil();
});

// Torna as funções disponíveis globalmente para uso nos botões HTML
window.abrirModalEdicao = abrirModalEdicao;
window.fecharModalEdicao = fecharModalEdicao;
window.salvarEdicao = salvarEdicao;
window.sair = sair;
window.adicionarCurso = adicionarCurso;