// 💾 STORAGE SYSTEM - Save/Load Game State

const Storage = {
    SAVE_KEY: 'carnaval_v2_save',
    
    // Estado padrão (novo jogador)
    getDefaultState() {
        return {
            // Meta
            versao: '2.0.0',
            primeiroJogo: Date.now(),
            ultimoLogin: Date.now(),
            
            // Recursos
            estrelas: ECONOMIA.estrelasIniciais,
            gemas: ECONOMIA.gemasIniciais,
            
            // Coleção de personagens (IDs)
            personagens: [], // [{id, nivel, xp}]
            
            // Progressão
            nivel: 1,
            xp: 0,
            
            // Energia
            energia: ECONOMIA.energiaMax,
            ultimaRegenEnergia: Date.now(),
            
            // Idle
            idleLevel: 1,
            idleGanhoPorMin: ECONOMIA.idleGanhoBase,
            ultimoColetaIdle: Date.now(),
            
            // Desfiles
            desfilesVencidos: 0,
            desfilesPerdidos: 0,
            
            // Baús
            ultimoBauBronze: 0, // timestamp
            
            // Login Rewards
            diasConsecutivos: 0,
            ultimoDiaRecompensa: null, // YYYY-MM-DD
            recompensasRecebidas: [], // [dia1, dia2, ...]
            
            // Stats
            tempoDeJogo: 0, // minutos
            bausAbertos: 0,
            gemasGastas: 0,
            estrelasGastas: 0,
            
            // Monetização (tracking)
            totalGasto: 0, // R$
            comprasRealizadas: []
        };
    },
    
    // Salvar jogo
    save(state) {
        try {
            const json = JSON.stringify(state);
            localStorage.setItem(this.SAVE_KEY, json);
            console.log('💾 Jogo salvo!', state);
            return true;
        } catch (error) {
            console.error('❌ Erro ao salvar:', error);
            return false;
        }
    },
    
    // Carregar jogo
    load() {
        try {
            const json = localStorage.getItem(this.SAVE_KEY);
            if (!json) {
                console.log('📦 Novo jogador! Criando save...');
                return this.getDefaultState();
            }
            
            const state = JSON.parse(json);
            console.log('✅ Save carregado!', state);
            
            // Migração de versão (se necessário)
            return this.migrate(state);
        } catch (error) {
            console.error('❌ Erro ao carregar save:', error);
            return this.getDefaultState();
        }
    },
    
    // Migração entre versões
    migrate(state) {
        // Se precisar adicionar novos campos no futuro
        const defaultState = this.getDefaultState();
        
        // Adicionar campos que não existem
        for (const key in defaultState) {
            if (state[key] === undefined) {
                state[key] = defaultState[key];
                console.log(`🔧 Adicionando campo: ${key}`);
            }
        }
        
        return state;
    },
    
    // Deletar save (reset)
    reset() {
        if (confirm('⚠️ Tem certeza? Isso vai APAGAR TODO o progresso!')) {
            localStorage.removeItem(this.SAVE_KEY);
            console.log('🗑️ Save deletado!');
            location.reload();
        }
    },
    
    // Export (backup)
    export() {
        const state = this.load();
        const json = JSON.stringify(state, null, 2);
        
        // Download como arquivo
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `carnaval_backup_${Date.now()}.json`;
        a.click();
        
        console.log('📥 Backup exportado!');
    },
    
    // Import (restaurar)
    import(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const state = JSON.parse(e.target.result);
                this.save(state);
                alert('✅ Backup restaurado! Recarregando...');
                location.reload();
            } catch (error) {
                alert('❌ Arquivo inválido!');
                console.error(error);
            }
        };
        reader.readAsText(file);
    }
};
