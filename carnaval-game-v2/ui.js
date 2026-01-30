// 🎨 UI SYSTEM - Interface e Feedback Visual

const UI = {
    currentScreen: 'loading',
    
    // ============================================
    // RENDERIZAÇÃO PRINCIPAL
    // ============================================
    
    render(state) {
        this.renderHeader(state);
        this.renderXP(state);
        this.renderStats(state);
        this.renderLoginBanner(state);
        this.checkBronzeCooldown(state);
    },
    
    renderHeader(state) {
        document.getElementById('school-level').textContent = `Nível ${state.nivel}`;
        document.getElementById('estrelas-count').textContent = this.formatNumber(state.estrelas);
        document.getElementById('gemas-count').textContent = this.formatNumber(state.gemas);
    },
    
    renderXP(state) {
        const xpNecessario = Game.getXPNecessario();
        const percentual = (state.xp / xpNecessario) * 100;
        
        document.getElementById('xp-fill').style.width = percentual + '%';
        document.getElementById('xp-current').textContent = state.xp;
        document.getElementById('xp-max').textContent = xpNecessario;
    },
    
    renderStats(state) {
        const possuidos = state.personagens.length;
        const total = PERSONAGENS.length;
        document.getElementById('colecao-count').textContent = `${possuidos}/${total}`;
        
        document.getElementById('energia-count').textContent = `${state.energia}/${ECONOMIA.energiaMax}`;
        document.getElementById('vitorias-count').textContent = state.desfilesVencidos;
        document.getElementById('idle-income').textContent = `${state.idleGanhoPorMin}/min`;
    },
    
    renderLoginBanner(state) {
        const banner = document.getElementById('login-banner');
        const hoje = new Date().toISOString().split('T')[0];
        
        if (state.ultimoDiaRecompensa === hoje && state.recompensasRecebidas.includes(state.diasConsecutivos)) {
            banner.style.display = 'none';
        } else {
            banner.style.display = 'flex';
            document.getElementById('streak-days').textContent = state.diasConsecutivos;
        }
    },
    
    checkBronzeCooldown(state) {
        const cooldown = BAUS.bronze.cooldown;
        const tempoPassado = Date.now() - state.ultimoBauBronze;
        
        if (tempoPassado < cooldown) {
            const faltam = Math.ceil((cooldown - tempoPassado) / 1000 / 60);
            document.getElementById('bronze-cooldown').textContent = `${faltam} min`;
            document.getElementById('bronze-cooldown').style.color = '#FF6B6B';
        } else {
            document.getElementById('bronze-cooldown').textContent = 'Disponível!';
            document.getElementById('bronze-cooldown').style.color = '#95E1D3';
        }
    },
    
    // ============================================
    // NAVEGAÇÃO
    // ============================================
    
    irPara(screen) {
        // Remover active de todas
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        
        // Ativar screen
        const screenEl = document.getElementById(screen + '-screen');
        if (screenEl) {
            screenEl.classList.add('active');
            this.currentScreen = screen;
        }
        
        // Ativar botão correspondente
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            if (btn.getAttribute('onclick').includes(screen)) {
                btn.classList.add('active');
            }
        });
    },
    
    voltarHome() {
        this.irPara('home');
    },
    
    abrirBaus() {
        this.irPara('baus');
    },
    
    verColecao() {
        this.irPara('colecao');
        this.renderColecao();
    },
    
    verRankings() {
        this.mostrarNotificacao('🏆 Rankings em breve!');
    },
    
    abrirLoja() {
        this.mostrarNotificacao('💎 Loja em breve!');
    },
    
    abrirConfig() {
        this.mostrarNotificacao('⚙️ Configurações em breve!');
    },
    
    // ============================================
    // COLEÇÃO
    // ============================================
    
    renderColecao(filtro = 'todos') {
        const grid = document.getElementById('colecao-grid');
        grid.innerHTML = '';
        
        let personagensExibir = PERSONAGENS;
        
        if (filtro !== 'todos') {
            personagensExibir = PERSONAGENS.filter(p => p.tipo === filtro);
        }
        
        personagensExibir.forEach(personagem => {
            const possuido = Game.state.personagens.find(p => p.id === personagem.id);
            const card = this.criarCardPersonagem(personagem, possuido);
            grid.appendChild(card);
        });
    },
    
    criarCardPersonagem(personagem, possuido) {
        const div = document.createElement('div');
        div.className = `personagem-card ${personagem.raridade}`;
        
        if (!possuido) {
            div.style.opacity = '0.3';
            div.style.filter = 'grayscale(100%)';
        }
        
        div.innerHTML = `
            <div class="personagem-emoji">${personagem.emoji}</div>
            <div class="personagem-nome">${personagem.nome}</div>
            <div class="personagem-tipo">${TIPOS[personagem.tipo].emoji} ${TIPOS[personagem.tipo].nome}</div>
            ${personagem.escola ? `<div class="personagem-escola" style="font-size:0.7rem;color:#FFD700;margin-top:3px;">${personagem.escola}</div>` : ''}
            <div class="personagem-raridade" style="font-size:0.75rem;margin-top:5px;color:${RARIDADES[personagem.raridade].cor};">
                ${'⭐'.repeat(RARIDADES[personagem.raridade].estrelas)}
            </div>
        `;
        
        if (possuido) {
            div.onclick = () => this.mostrarDetalhesPersonagem(personagem);
        }
        
        return div;
    },
    
    filtrarColecao(filtro) {
        // Atualizar botões
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Renderizar
        this.renderColecao(filtro);
    },
    
    // ============================================
    // ANIMAÇÃO DE BAÚ
    // ============================================
    
    mostrarAnimacaoBau(tipoBau, drops) {
        const modal = document.getElementById('bau-modal');
        const icon = document.getElementById('bau-opening-icon');
        const title = document.getElementById('bau-modal-title');
        const container = document.getElementById('drops-container');
        
        // Configurar ícone do baú
        icon.textContent = BAUS[tipoBau].emoji;
        title.textContent = `Abrindo ${BAUS[tipoBau].nome}...`;
        
        // Limpar drops
        container.innerHTML = '';
        
        // Mostrar modal
        modal.classList.add('active');
        
        // Após animação (2 segundos), mostrar drops
        setTimeout(() => {
            title.textContent = `${drops.length} ${drops.length === 1 ? 'Personagem' : 'Personagens'} Obtidos!`;
            
            drops.forEach((personagemId, index) => {
                setTimeout(() => {
                    const personagem = PERSONAGENS.find(p => p.id === personagemId);
                    const card = this.criarCardDrop(personagem);
                    container.appendChild(card);
                }, index * 200);
            });
        }, 2000);
    },
    
    criarCardDrop(personagem) {
        const div = document.createElement('div');
        div.className = `personagem-card ${personagem.raridade}`;
        div.style.animation = 'slideInUp 0.5s';
        
        const isDuplicata = Game.state.personagens.filter(p => p.id === personagem.id).length > 1;
        
        div.innerHTML = `
            <div class="personagem-emoji">${personagem.emoji}</div>
            <div class="personagem-nome" style="font-size:0.85rem;">${personagem.nome}</div>
            <div class="personagem-raridade" style="font-size:0.7rem;color:${RARIDADES[personagem.raridade].cor};">
                ${'⭐'.repeat(RARIDADES[personagem.raridade].estrelas)}
            </div>
            ${isDuplicata ? '<div style="font-size:0.7rem;color:#FFD700;margin-top:3px;">⭐ Duplicata</div>' : '<div style="font-size:0.7rem;color:#95E1D3;margin-top:3px;">✨ NOVO!</div>'}
        `;
        
        return div;
    },
    
    // ============================================
    // MODAIS
    // ============================================
    
    mostrarDetalhesPersonagem(personagem) {
        const modal = document.getElementById('personagem-modal');
        const content = document.getElementById('personagem-content');
        
        const raridade = RARIDADES[personagem.raridade];
        const tipo = TIPOS[personagem.tipo];
        
        content.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:5rem;margin-bottom:15px;">${personagem.emoji}</div>
                <h2 style="margin-bottom:10px;">${personagem.nome}</h2>
                <div style="display:inline-block;background:${raridade.gradient};padding:5px 15px;border-radius:20px;margin-bottom:15px;">
                    ${'⭐'.repeat(raridade.estrelas)} ${raridade.nome}
                </div>
                ${personagem.escola ? `<div style="color:#FFD700;font-size:1.1rem;margin-bottom:10px;">🏫 ${personagem.escola}</div>` : ''}
                <div style="color:${tipo.cor};margin-bottom:15px;">${tipo.emoji} ${tipo.nome}</div>
                <p style="color:var(--text-secondary);line-height:1.6;margin-bottom:15px;">${personagem.desc}</p>
                <div style="background:var(--bg-dark);padding:15px;border-radius:10px;">
                    <div style="font-size:1.3rem;color:#FFD700;margin-bottom:5px;">⚡ Poder: ${personagem.poder}</div>
                    <div style="font-size:0.9rem;color:var(--text-secondary);">${tipo.desc}</div>
                </div>
            </div>
        `;
        
        modal.classList.add('active');
    },
    
    fecharModal() {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    },
    
    // ============================================
    // LOGIN REWARD
    // ============================================
    
    mostrarLoginReward(dia) {
        const recompensa = LOGIN_REWARDS[dia - 1];
        
        let texto = `🎁 Dia ${dia} de 7\n\n`;
        if (recompensa.estrelas) texto += `⭐ ${recompensa.estrelas} Estrelas\n`;
        if (recompensa.gemas) texto += `💎 ${recompensa.gemas} Gemas\n`;
        if (recompensa.bau) texto += `📦 Baú ${recompensa.bau}\n`;
        if (recompensa.especial) texto += `✨ Personagem Épico!\n`;
        
        if (confirm(texto + '\nColetar recompensa?')) {
            Game.coletarLoginReward();
        }
    },
    
    coletarLoginReward() {
        this.mostrarLoginReward(Game.state.diasConsecutivos);
    },
    
    // ============================================
    // RESULTADO DE DESFILE
    // ============================================
    
    mostrarResultadoDesfile(vitoria, ganho, poderEquipe, poderOponente) {
        let texto = vitoria ? '🎉 VITÓRIA!' : '😔 Derrota...';
        texto += `\n\nSua Escola: ${poderEquipe} ⚡`;
        texto += `\nOponente: ${poderOponente} ⚡`;
        texto += `\n\n💰 +${ganho} estrelas`;
        texto += `\n📈 +${vitoria ? ECONOMIA.xpPorDesfile : ECONOMIA.xpPorDesfile / 2} XP`;
        
        alert(texto);
        this.render(Game.state);
    },
    
    // ============================================
    // IDLE REWARD
    // ============================================
    
    mostrarIdleReward(ganho, minutos) {
        if (ganho < 10) return; // Muito pouco, não mostrar
        
        const horas = Math.floor(minutos / 60);
        const mins = Math.floor(minutos % 60);
        
        let tempo = '';
        if (horas > 0) tempo = `${horas}h ${mins}min`;
        else tempo = `${mins} minutos`;
        
        console.log(`💰 Idle reward: ${ganho} ⭐ (${tempo})`);
        
        // Aguardar DOM estar pronto
        setTimeout(() => {
            this.mostrarNotificacao(`💰 Você ganhou ${ganho} ⭐ enquanto estava offline! (${tempo})`);
        }, 1500);
    },
    
    // ============================================
    // NOTIFICAÇÕES
    // ============================================
    
    mostrarNotificacao(texto) {
        const toast = document.getElementById('toast');
        if (!toast) {
            console.warn('Toast element not found, logging instead:', texto);
            return;
        }
        toast.textContent = texto;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    },
    
    // ============================================
    // UTILIDADES
    // ============================================
    
    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return Math.floor(num).toString();
    }
};

// ============================================
// INICIALIZAÇÃO
// ============================================

window.addEventListener('DOMContentLoaded', () => {
    console.log('🎭 Carnaval Game carregando...');
    
    // Inicializar jogo
    try {
        Game.init();
        console.log('✅ Game inicializado!');
        
        // Esconder loading após 1 segundo
        setTimeout(() => {
            document.getElementById('loading-screen').classList.remove('active');
            document.getElementById('home-screen').classList.add('active');
            UI.currentScreen = 'home';
            console.log('✅ UI pronta!');
        }, 1000);
    } catch (error) {
        console.error('❌ Erro ao inicializar:', error);
        document.getElementById('loading-screen').innerHTML = `
            <div style="color:white;padding:40px;text-align:center;">
                <h1>❌ Erro ao Carregar</h1>
                <p>${error.message}</p>
                <pre style="background:rgba(0,0,0,0.3);padding:20px;border-radius:10px;text-align:left;max-width:600px;margin:20px auto;overflow:auto;">${error.stack}</pre>
                <button onclick="location.reload()" style="padding:15px 30px;background:#FF6B6B;border:none;color:white;border-radius:10px;font-size:1.1rem;cursor:pointer;">🔄 Recarregar</button>
            </div>
        `;
    }
    
    // Fechar modais clicando fora
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                UI.fecharModal();
            }
        });
    });
});
