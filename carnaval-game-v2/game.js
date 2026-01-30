// 🎮 CARNAVAL GAME V2.0 - GAME LOGIC

const Game = {
    state: null,
    
    // ============================================
    // INICIALIZAÇÃO
    // ============================================
    
    init() {
        console.log('🎭 Carnaval Game V2.0 iniciando...');
        
        // Carregar save
        this.state = Storage.load();
        
        // Processar idle income
        this.processIdleIncome();
        
        // Regenerar energia
        this.regenerateEnergy();
        
        // Verificar login reward
        this.checkLoginReward();
        
        // Atualizar UI
        UI.render(this.state);
        
        // Auto-save a cada 30 segundos
        setInterval(() => this.save(), 30000);
        
        console.log('✅ Jogo pronto!');
    },
    
    // Salvar
    save() {
        this.state.ultimoLogin = Date.now();
        Storage.save(this.state);
    },
    
    // ============================================
    // SISTEMA GACHA
    // ============================================
    
    abrirBau(tipoBau) {
        const bau = BAUS[tipoBau];
        
        if (!bau) {
            alert('❌ Baú inválido!');
            return;
        }
        
        // Verificar custo
        if (bau.custo > 0) {
            if (this.state.gemas < bau.custo) {
                alert(`❌ Você precisa de ${bau.custo} 💎 gemas!`);
                UI.mostrarLoja(); // Incentivar compra
                return;
            }
        }
        
        // Verificar cooldown (baú bronze)
        if (tipoBau === 'bronze') {
            const agora = Date.now();
            const tempoDesdeUltimo = agora - this.state.ultimoBauBronze;
            if (tempoDesdeUltimo < bau.cooldown) {
                const faltam = Math.ceil((bau.cooldown - tempoDesdeUltimo) / 1000 / 60);
                alert(`⏰ Você poderá abrir outro baú bronze em ${faltam} minutos!`);
                return;
            }
        }
        
        // Cobrar
        if (bau.custo > 0) {
            this.state.gemas -= bau.custo;
            this.state.gemasGastas += bau.custo;
        }
        
        // Atualizar cooldown
        if (tipoBau === 'bronze') {
            this.state.ultimoBauBronze = Date.now();
        }
        
        // Gerar drops
        const drops = this.gerarDrops(bau);
        
        // Adicionar à coleção
        drops.forEach(personagemId => {
            this.adicionarPersonagem(personagemId);
        });
        
        // Stats
        this.state.bausAbertos++;
        
        // Salvar
        this.save();
        
        // Mostrar animação
        UI.mostrarAnimacaoBau(tipoBau, drops);
    },
    
    gerarDrops(bau) {
        const drops = [];
        const quantidade = this.random(bau.garantias.min, bau.garantias.max);
        
        for (let i = 0; i < quantidade; i++) {
            const personagem = this.sortearPersonagem(bau, drops);
            drops.push(personagem.id);
        }
        
        return drops;
    },
    
    sortearPersonagem(bau, dropsJaFeitos) {
        // Garantias
        const totalDrops = dropsJaFeitos.length + 1;
        
        // Lendário garantido?
        if (bau.garantias.lendarioMin && totalDrops >= bau.garantias.min) {
            const lendarios = dropsJaFeitos.filter(id => {
                const p = PERSONAGENS.find(pers => pers.id === id);
                return p && p.raridade === 'lendario';
            });
            
            if (lendarios.length < bau.garantias.lendarioMin) {
                return this.sortearPorRaridade('lendario');
            }
        }
        
        // Épico garantido?
        if (bau.garantias.epicoMin && totalDrops >= bau.garantias.min) {
            const epicos = dropsJaFeitos.filter(id => {
                const p = PERSONAGENS.find(pers => pers.id === id);
                return p && p.raridade === 'epico';
            });
            
            if (epicos.length < bau.garantias.epicoMin) {
                return this.sortearPorRaridade('epico');
            }
        }
        
        // Raro garantido?
        if (bau.garantias.raroMin && totalDrops >= bau.garantias.min) {
            const raros = dropsJaFeitos.filter(id => {
                const p = PERSONAGENS.find(pers => pers.id === id);
                return p && (p.raridade === 'raro' || p.raridade === 'epico' || p.raridade === 'lendario');
            });
            
            if (raros.length < bau.garantias.raroMin) {
                return this.sortearPorRaridade('raro');
            }
        }
        
        // Sorteio normal (drop rates)
        const roll = Math.random();
        let acumulado = 0;
        
        for (const [raridade, config] of Object.entries(RARIDADES)) {
            acumulado += config.dropRate;
            if (roll <= acumulado) {
                return this.sortearPorRaridade(raridade);
            }
        }
        
        // Fallback (não deveria acontecer)
        return this.sortearPorRaridade('comum');
    },
    
    sortearPorRaridade(raridade) {
        const personagensRaridade = PERSONAGENS.filter(p => p.raridade === raridade);
        return personagensRaridade[Math.floor(Math.random() * personagensRaridade.length)];
    },
    
    adicionarPersonagem(personagemId) {
        // Verificar se já tem
        const jatem = this.state.personagens.find(p => p.id === personagemId);
        
        if (jatem) {
            // Duplicata → converte em estrelas
            const personagem = PERSONAGENS.find(p => p.id === personagemId);
            const valor = this.getValorDuplicata(personagem.raridade);
            this.state.estrelas += valor;
            console.log(`⭐ Duplicata! +${valor} estrelas`);
        } else {
            // Novo personagem!
            this.state.personagens.push({
                id: personagemId,
                nivel: 1,
                xp: 0
            });
            console.log(`✨ Novo personagem: ${personagemId}`);
        }
    },
    
    getValorDuplicata(raridade) {
        switch(raridade) {
            case 'comum': return 10;
            case 'raro': return 50;
            case 'epico': return 200;
            case 'lendario': return 1000;
            default: return 10;
        }
    },
    
    // ============================================
    // SISTEMA IDLE
    // ============================================
    
    processIdleIncome() {
        const agora = Date.now();
        const tempoOffline = agora - this.state.ultimoColetaIdle;
        const maxOffline = 12 * 60 * 60 * 1000; // 12 horas
        const tempoValido = Math.min(tempoOffline, maxOffline);
        
        const minutos = tempoValido / 1000 / 60;
        const ganho = Math.floor(minutos * this.state.idleGanhoPorMin);
        
        if (ganho > 0) {
            this.state.estrelas += ganho;
            this.state.ultimoColetaIdle = agora;
            
            // Mostrar popup
            UI.mostrarIdleReward(ganho, minutos);
        }
    },
    
    upgradeIdle() {
        const custo = this.getIdleUpgradeCost();
        
        if (this.state.estrelas < custo) {
            alert(`❌ Você precisa de ${custo} ⭐ estrelas!`);
            return;
        }
        
        this.state.estrelas -= custo;
        this.state.estrelasGastas += custo;
        this.state.idleLevel++;
        this.state.idleGanhoPorMin += 5; // +5 por level
        
        this.save();
        UI.render(this.state);
        
        alert(`✅ Upgrade! Agora ganha ${this.state.idleGanhoPorMin} ⭐/min offline!`);
    },
    
    getIdleUpgradeCost() {
        return Math.floor(ECONOMIA.upgradeIdleBase * Math.pow(ECONOMIA.upgradeIdleMultiplier, this.state.idleLevel - 1));
    },
    
    // ============================================
    // SISTEMA DE ENERGIA
    // ============================================
    
    regenerateEnergy() {
        if (this.state.energia >= ECONOMIA.energiaMax) return;
        
        const agora = Date.now();
        const tempoPassado = agora - this.state.ultimaRegenEnergia;
        const minutosPassados = tempoPassado / 1000 / 60;
        const energiaRegenerada = Math.floor(minutosPassados / ECONOMIA.energiaRegenMin);
        
        if (energiaRegenerada > 0) {
            this.state.energia = Math.min(this.state.energia + energiaRegenerada, ECONOMIA.energiaMax);
            this.state.ultimaRegenEnergia = agora - (tempoPassado % (ECONOMIA.energiaRegenMin * 60 * 1000));
        }
    },
    
    comprarEnergia() {
        const custo = 20; // gemas
        
        if (this.state.gemas < custo) {
            alert('❌ Você precisa de 20 💎 gemas!');
            UI.mostrarLoja();
            return;
        }
        
        this.state.gemas -= custo;
        this.state.energia = Math.min(this.state.energia + 5, ECONOMIA.energiaMax);
        
        this.save();
        UI.render(this.state);
        
        alert('✅ +5 energia!');
    },
    
    // ============================================
    // SISTEMA DE DESFILES
    // ============================================
    
    desfilar() {
        if (this.state.energia < 1) {
            alert('❌ Sem energia! Espere regenerar ou compre mais.');
            return;
        }
        
        // Gastar energia
        this.state.energia--;
        
        // Calcular poder da equipe
        const poderEquipe = this.calcularPoderEquipe();
        
        // Gerar oponente
        const poderOponente = this.gerarPoderOponente();
        
        // Batalha!
        const vitoria = poderEquipe > poderOponente;
        
        // Recompensas
        if (vitoria) {
            const ganho = ECONOMIA.desfileVitoria;
            this.state.estrelas += ganho;
            this.state.desfilesVencidos++;
            this.addXP(ECONOMIA.xpPorDesfile);
            
            UI.mostrarResultadoDesfile(true, ganho, poderEquipe, poderOponente);
        } else {
            const ganho = ECONOMIA.desfileDerrota;
            this.state.estrelas += ganho;
            this.state.desfilesPerdidos++;
            this.addXP(ECONOMIA.xpPorDesfile / 2);
            
            UI.mostrarResultadoDesfile(false, ganho, poderEquipe, poderOponente);
        }
        
        this.save();
        UI.render(this.state);
    },
    
    calcularPoderEquipe() {
        // Soma poder dos 5 melhores personagens
        const personagensOrdenados = this.state.personagens
            .map(p => {
                const data = PERSONAGENS.find(pers => pers.id === p.id);
                return { ...p, poder: data.poder };
            })
            .sort((a, b) => b.poder - a.poder)
            .slice(0, 5);
        
        return personagensOrdenados.reduce((total, p) => total + p.poder, 0) || 50; // mínimo 50
    },
    
    gerarPoderOponente() {
        // Baseado no nível do jogador
        const base = 100 + (this.state.nivel * 20);
        const variacao = base * 0.3;
        return Math.floor(base + (Math.random() * variacao * 2 - variacao));
    },
    
    // ============================================
    // SISTEMA DE NÍVEIS & XP
    // ============================================
    
    addXP(quantidade) {
        this.state.xp += quantidade;
        
        // Level up?
        const xpNecessario = this.getXPNecessario();
        
        if (this.state.xp >= xpNecessario) {
            this.levelUp();
        }
    },
    
    levelUp() {
        this.state.nivel++;
        this.state.xp = 0;
        
        // Recompensas de nível
        const recompensa = this.getRecompensaNivel();
        
        if (recompensa) {
            if (recompensa.gemas) {
                this.state.gemas += recompensa.gemas;
            }
            if (recompensa.bau) {
                UI.mostrarNotificacao(`🎁 Level ${this.state.nivel}! Você ganhou ${recompensa.gemas} 💎 e um ${BAUS[recompensa.bau].nome}!`);
                // Auto-abrir baú
                setTimeout(() => this.abrirBau(recompensa.bau), 1000);
            }
        } else {
            UI.mostrarNotificacao(`🎉 Level ${this.state.nivel}!`);
        }
        
        this.save();
        UI.render(this.state);
    },
    
    getXPNecessario() {
        return Math.floor(NIVEIS.xpBase * Math.pow(NIVEIS.xpMultiplier, this.state.nivel - 1));
    },
    
    getRecompensaNivel() {
        return NIVEIS.recompensasNivel.find(r => r.nivel === this.state.nivel);
    },
    
    // ============================================
    // LOGIN REWARDS
    // ============================================
    
    checkLoginReward() {
        const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        
        if (this.state.ultimoDiaRecompensa === hoje) {
            // Já recebeu hoje
            return;
        }
        
        // Verificar sequência
        const ontem = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        if (this.state.ultimoDiaRecompensa === ontem) {
            // Sequência mantida
            this.state.diasConsecutivos++;
        } else {
            // Sequência quebrada
            this.state.diasConsecutivos = 1;
            this.state.recompensasRecebidas = [];
        }
        
        // Limitar a 7 dias (ciclo)
        if (this.state.diasConsecutivos > 7) {
            this.state.diasConsecutivos = 1;
            this.state.recompensasRecebidas = [];
        }
        
        this.state.ultimoDiaRecompensa = hoje;
        
        // Mostrar recompensa
        UI.mostrarLoginReward(this.state.diasConsecutivos);
    },
    
    coletarLoginReward() {
        const dia = this.state.diasConsecutivos;
        const recompensa = LOGIN_REWARDS[dia - 1];
        
        if (recompensa.estrelas) {
            this.state.estrelas += recompensa.estrelas;
        }
        if (recompensa.gemas) {
            this.state.gemas += recompensa.gemas;
        }
        if (recompensa.bau) {
            this.abrirBau(recompensa.bau);
        }
        if (recompensa.especial === 'personagem_epico') {
            const epicosAleatorios = PERSONAGENS.filter(p => p.raridade === 'epico');
            const sorteado = epicosAleatorios[Math.floor(Math.random() * epicosAleatorios.length)];
            this.adicionarPersonagem(sorteado.id);
            UI.mostrarNotificacao(`✨ Você ganhou: ${sorteado.nome}!`);
        }
        
        this.state.recompensasRecebidas.push(dia);
        this.save();
        UI.render(this.state);
    },
    
    // ============================================
    // UTILITÁRIOS
    // ============================================
    
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};

// Inicializar quando carregar
window.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
