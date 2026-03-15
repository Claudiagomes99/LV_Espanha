// ==================== BLOGS.JS ====================

// Inicializar contadores de favoritos globais
function inicializarContadores() {
    const contadoresGlobais = localStorage.getItem('contadoresFavoritos');
    if (!contadoresGlobais) {
        const contadores = {
            'A moda tradicional antiga': 0,
            'Pratos típicos espanhóis': 0,
            'Gaudí e a Arquitetura Espanhola': 0,
            'Coisa que talvez não saiba': 0,
            'Segundo maior Pais da União Europeia': 0,
            'Futebol e times': 0
        };
        localStorage.setItem('contadoresFavoritos', JSON.stringify(contadores));
    }
}

// Carregar contadores ao carregar a página
function carregarContadores() {
    const contadores = JSON.parse(localStorage.getItem('contadoresFavoritos') || '{}');
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(function(card) {
        const titulo = card.querySelector('.title').textContent.trim();
        const countSpan = card.querySelector('.favorite-count');
        
        if (contadores[titulo] !== undefined) {
            countSpan.textContent = contadores[titulo];
        }
    });
}

// Verificar se o post já está nos favoritos do usuário
function verificarFavoritosUsuario() {
    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) return;
    
    const usuario = JSON.parse(usuarioJSON);
    if (!usuario.favoritos) {
        usuario.favoritos = [];
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }
    
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(function(card) {
        const titulo = card.querySelector('.title').textContent.trim();
        const heart = card.querySelector('.heart');
        const btn = card.querySelector('.favorite-btn');
        
        const jaFavoritado = usuario.favoritos.some(function(fav) {
            return fav.titulo === titulo;
        });
        
        if (jaFavoritado) {
            heart.classList.add('favorited');
            heart.textContent = '♥';
            btn.setAttribute('data-favoritado', 'true');
        } else {
            btn.setAttribute('data-favoritado', 'false');
        }
    });
}

// Função para adicionar/remover favorito
function toggleFavorite(button) {
    const card = button.closest('.card');
    const heart = button.querySelector('.heart');
    const countSpan = button.parentElement.querySelector('.favorite-count');
    const titulo = card.querySelector('.title').textContent.trim();
    const tag = card.querySelector('.tag').textContent.trim();
    const excerpt = card.querySelector('.excerpt').textContent.trim();
    const imagem = card.querySelector('.thumb').src;
    
    const jaFavoritado = button.getAttribute('data-favoritado') === 'true';
    
    // Verifica se usuário está logado
    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) {
        alert('❌ Você precisa fazer login para favoritar posts!');
        return;
    }
    
    const usuario = JSON.parse(usuarioJSON);
    
    // Inicializa array de favoritos se não existir
    if (!usuario.favoritos) {
        usuario.favoritos = [];
    }
    
    // Pega os contadores globais
    const contadores = JSON.parse(localStorage.getItem('contadoresFavoritos') || '{}');
    
    if (jaFavoritado) {
        // Remove dos favoritos
        heart.classList.remove('favorited');
        heart.textContent = '♡';
        button.setAttribute('data-favoritado', 'false');
        
        // Remove do array de favoritos do usuário
        usuario.favoritos = usuario.favoritos.filter(function(fav) {
            return fav.titulo !== titulo;
        });
        
        // Decrementa contador global
        if (contadores[titulo] > 0) {
            contadores[titulo]--;
        }
        
        alert('💔 Removido dos favoritos!');
    } else {
        // Adiciona aos favoritos
        heart.classList.add('favorited');
        heart.textContent = '♥';
        button.setAttribute('data-favoritado', 'true');
        
        // Adiciona ao array de favoritos do usuário
        const favorito = {
            titulo: titulo,
            categoria: tag,
            descricao: excerpt,
            imagem: imagem,
            dataAdicionado: new Date().toISOString()
        };
        
        usuario.favoritos.push(favorito);
        
        // Incrementa contador global
        if (contadores[titulo] === undefined) {
            contadores[titulo] = 0;
        }
        contadores[titulo]++;
        
        alert('❤️ Adicionado aos favoritos!');
    }
    
    // Atualiza o contador visual
    countSpan.textContent = contadores[titulo];
    
    // Salva tudo no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('contadoresFavoritos', JSON.stringify(contadores));
}

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    console.log('📚 Página de blogs carregada');
    inicializarContadores();
    carregarContadores();
    verificarFavoritosUsuario();
});

// Torna a função disponível globalmente
window.toggleFavorite = toggleFavorite;