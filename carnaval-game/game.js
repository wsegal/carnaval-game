// Game State
const game = {
    state: {
        school: null,
        year: 2026,
        money: 50000,
        group: 'acesso', // acesso, serie-a, serie-especial
        sections: {
            samba: { quality: 0, chosen: false, name: '' },
            alegoria: { quality: 50 },
            bateria: { quality: 50 },
            comissao: { quality: 50 },
            fantasia: { quality: 50 },
            harmonia: { quality: 50 }
        },
        soundEnabled: true // Controle de som
    },

    // Sistema de Som (Web Audio API)
    audioContext: null,

    async initAudio() {
        if (!this.audioContext) {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Resume context se estiver suspendido (política do navegador)
                if (this.audioContext.state === 'suspended') {
                    await this.audioContext.resume();
                }
                
                console.log('🔊 Audio Context initialized:', this.audioContext.state);
            } catch (error) {
                console.error('❌ Audio initialization failed:', error);
            }
        } else if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
    },

    async playSound(type) {
        if (!this.state.soundEnabled) {
            console.log('🔇 Som desativado');
            return;
        }
        
        await this.initAudio();
        
        if (!this.audioContext || this.audioContext.state !== 'running') {
            console.warn('⚠️ AudioContext não está rodando:', this.audioContext?.state);
            return;
        }
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            const now = this.audioContext.currentTime;
            
            // Diferentes sons para diferentes ações
            switch(type) {
                case 'click':
                    oscillator.frequency.value = 800;
                    gainNode.gain.value = 0.1;
                    oscillator.start(now);
                    oscillator.stop(now + 0.1);
                    console.log('🔊 Som: click');
                    break;
                case 'invest':
                    oscillator.frequency.value = 600;
                    gainNode.gain.value = 0.15;
                    oscillator.start(now);
                    oscillator.stop(now + 0.15);
                    console.log('🔊 Som: invest');
                    break;
                case 'parade':
                    oscillator.frequency.value = 200;
                    gainNode.gain.value = 0.2;
                    oscillator.start(now);
                    oscillator.stop(now + 0.3);
                    console.log('🔊 Som: parade');
                    break;
                case 'success':
                    oscillator.frequency.value = 1000;
                    gainNode.gain.value = 0.15;
                    oscillator.start(now);
                    oscillator.stop(now + 0.2);
                    
                    // Segunda nota
                    setTimeout(() => {
                        const osc2 = this.audioContext.createOscillator();
                        const gain2 = this.audioContext.createGain();
                        osc2.connect(gain2);
                        gain2.connect(this.audioContext.destination);
                        osc2.frequency.value = 1200;
                        gain2.gain.value = 0.15;
                        const now2 = this.audioContext.currentTime;
                        osc2.start(now2);
                        osc2.stop(now2 + 0.2);
                    }, 100);
                    console.log('🔊 Som: success');
                    break;
                case 'fail':
                    oscillator.frequency.value = 300;
                    gainNode.gain.value = 0.2;
                    oscillator.start(now);
                    oscillator.stop(now + 0.5);
                    console.log('🔊 Som: fail');
                    break;
            }
        } catch (error) {
            console.error('❌ Erro ao tocar som:', error);
        }
    },

    toggleSound() {
        this.state.soundEnabled = !this.state.soundEnabled;
        const btn = document.getElementById('sound-toggle');
        if (btn) {
            btn.textContent = this.state.soundEnabled ? '🔊 Som: ON' : '🔇 Som: OFF';
        }
        
        // Tocar som de teste
        if (this.state.soundEnabled) {
            this.playSound('click');
        }
        
        this.saveGame();
    },

    groups: {
        'acesso': { name: 'Grupo de Acesso', next: 'serie-a', prev: null },
        'serie-a': { name: 'Série A', next: 'serie-especial', prev: 'acesso' },
        'serie-especial': { name: 'Grupo Especial', next: null, prev: 'serie-a' }
    },

    // Inicialização
    init() {
        this.checkSavedGame();
        this.updateContinueButton();
        console.log('🎮 Jogo inicializado!');
        console.log('🔊 Sistema de som:', this.state.soundEnabled ? 'ATIVADO' : 'DESATIVADO');
    },

    // Navegação de telas
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
    },

    // Menu
    startNewGame() {
        this.state = {
            school: null,
            year: 2026,
            money: 50000,
            group: 'acesso',
            sections: {
                samba: { quality: 0, chosen: false, name: '' },
                alegoria: { quality: 50 },
                bateria: { quality: 50 },
                comissao: { quality: 50 },
                fantasia: { quality: 50 },
                harmonia: { quality: 50 }
            }
        };
        this.showScreen('screen-create');
    },

    // Criação da Escola
    createSchool(event) {
        event.preventDefault();
        const name = document.getElementById('school-name').value;
        const color1 = document.getElementById('color1').value;
        const color2 = document.getElementById('color2').value;

        this.state.school = { name, colors: [color1, color2] };
        this.playSound('success');
        this.saveGame();
        this.showDashboard();
    },

    // Dashboard
    showDashboard() {
        this.showScreen('screen-dashboard');
        this.updateDashboard();
    },

    updateDashboard() {
        const { school, money, group, year, sections } = this.state;

        // Header
        document.getElementById('dashboard-school-name').textContent = school.name;
        document.getElementById('stat-money').textContent = `R$ ${money.toLocaleString('pt-BR')}`;
        document.getElementById('stat-group').textContent = this.groups[group].name;
        document.getElementById('stat-year').textContent = year;

        // Cores da escola
        const colorsDisplay = document.getElementById('school-colors-display');
        colorsDisplay.innerHTML = school.colors
            .map(c => `<div class="color" style="background: ${c}"></div>`)
            .join('');

        // Samba-Enredo
        const sambaStatus = sections.samba.chosen 
            ? `"${sections.samba.name}" - ${sections.samba.quality}%`
            : 'Não escolhido';
        document.getElementById('samba-status').textContent = sambaStatus;
        document.querySelector('#samba-quality .quality-fill').style.width = `${sections.samba.quality}%`;

        // Outras seções
        ['alegoria', 'bateria', 'comissao', 'fantasia', 'harmonia'].forEach(section => {
            const quality = sections[section].quality;
            document.getElementById(`${section}-status`).textContent = `Qualidade: ${quality}%`;
            document.getElementById(`${section}-quality`).style.width = `${quality}%`;
        });

        // Atualizar botões
        this.updateInvestButtons();
    },

    updateInvestButtons() {
        const costs = {
            alegoria: 10000,
            bateria: 8000,
            comissao: 7000,
            fantasia: 12000,
            harmonia: 6000
        };

        Object.keys(costs).forEach(section => {
            const btn = document.querySelector(`button[onclick="game.investSection('${section}')"]`);
            const canAfford = this.state.money >= costs[section];
            const maxQuality = this.state.sections[section].quality >= 100;
            
            btn.disabled = !canAfford || maxQuality;
            
            if (maxQuality) {
                btn.textContent = '✅ Máximo';
            }
        });
    },

    // Biblioteca expandida de sambas
    sambaLibrary: [
        'Glórias e Tradições', 'Cores do Brasil', 'Histórias de Um Povo',
        'Festa na Avenida', 'Lendas da Sapucaí', 'Samba que Encanta',
        'Raízes do Carnaval', 'Alegria sem Fim', 'Sonhos de Uma Escola',
        'Ritmo da Cidade', 'Memórias da Passarela', 'Coração Sambista',
        'Ecos do Morro', 'Tradição e Emoção', 'Batucada do Povo',
        'Folia Brasileira', 'Canto da Vitória', 'Magia da Avenida'
    ],

    // Escolha de Samba
    chooseSamba() {
        this.showScreen('screen-samba');
        const container = document.getElementById('samba-options');
        
        // Selecionar 4 sambas aleatórios da biblioteca
        const shuffled = [...this.sambaLibrary].sort(() => Math.random() - 0.5);
        const selectedSambas = shuffled.slice(0, 4);
        
        // Qualidade base ajustada pelo grupo
        const baseQuality = this.state.group === 'acesso' ? 60 : 
                           this.state.group === 'serie-a' ? 70 : 80;
        
        const sambas = selectedSambas.map(name => ({
            name,
            quality: Math.floor(Math.random() * 20) + baseQuality
        }));

        container.innerHTML = sambas.map((samba, i) => `
            <div class="option-card" onclick="game.selectSamba(${i}, ${samba.quality}, '${samba.name}')">
                <h3>🎵 ${samba.name}</h3>
                <p>Compositor ${i + 1}</p>
                <span class="quality">Potencial: ${samba.quality}%</span>
            </div>
        `).join('');
    },

    selectSamba(index, quality, name) {
        this.state.sections.samba = { quality, chosen: true, name };
        this.playSound('click');
        this.saveGame();
        this.showDashboard();
    },

    // Investimento em Seções
    investSection(section) {
        const costs = {
            alegoria: 10000,
            bateria: 8000,
            comissao: 7000,
            fantasia: 12000,
            harmonia: 6000
        };

        const cost = costs[section];
        
        if (this.state.money >= cost && this.state.sections[section].quality < 100) {
            this.state.money -= cost;
            this.state.sections[section].quality = Math.min(100, this.state.sections[section].quality + Math.floor(Math.random() * 15) + 10);
            this.playSound('invest');
            this.saveGame();
            this.updateDashboard();
        }
    },

    // Eventos aleatórios
    randomEvents: [
        { 
            name: '🌧️ CHUVA!', 
            message: 'Começou a chover! Os componentes escorregam na avenida!',
            effect: -5,
            chance: 0.15
        },
        { 
            name: '⚡ APAGÃO!', 
            message: 'Houve uma queda de energia! As alegorias ficaram no escuro!',
            effect: -8,
            chance: 0.10
        },
        { 
            name: '🎤 PROBLEMA NO SOM!', 
            message: 'Falha no sistema de som! A escola teve que cantar sem amplificação!',
            effect: -6,
            chance: 0.12
        },
        { 
            name: '🎭 SURPRESA POSITIVA!', 
            message: 'Um artista famoso apareceu no desfile! O público vai à loucura!',
            effect: 4,
            chance: 0.08
        },
        { 
            name: '🔥 DESFILE PERFEITO!', 
            message: 'Tudo saiu melhor do que o esperado! Os jurados estão impressionados!',
            effect: 6,
            chance: 0.05
        }
    ],

    // Desfile
    showParade() {
        if (!this.state.sections.samba.chosen) {
            alert('⚠️ Você precisa escolher um samba-enredo antes de desfilar!');
            return;
        }

        this.showScreen('screen-parade');
        this.playSound('parade');
        
        // Reset do evento
        this.state.currentEvent = null;
        console.log('🎊 Iniciando desfile...');
        
        const commentaries = [
            'A escola está entrando na avenida...',
            'A bateria está dando um show!',
            'As alegorias impressionam o público!',
            'A comissão de frente encanta os jurados!',
            'A harmonia está perfeita!',
            'As fantasias brilham sob os holofotes!'
        ];

        let index = 0;
        const interval = setInterval(() => {
            if (index < commentaries.length) {
                const commentary = document.querySelector('#parade-commentary p');
                
                // Reset estilos antes de cada comentário
                commentary.style.color = '';
                commentary.style.fontWeight = 'normal';
                
                commentary.textContent = commentaries[index];
                console.log(`📢 Comentário ${index + 1}:`, commentaries[index]);
                
                // Som de bateria a cada comentário
                this.playSound('parade');
                
                // Tentar evento aleatório no comentário 4 (índice 3)
                if (index === 3) {
                    this.triggerRandomEvent(commentary);
                }
                
                index++;
            } else {
                clearInterval(interval);
                console.log('🏁 Desfile finalizado!');
                setTimeout(() => this.showResults(), 2000);
            }
        }, 2000);
    },

    // Disparar evento aleatório
    triggerRandomEvent(commentaryElement) {
        console.log('🎲 Tentando evento aleatório...');
        
        // 50% de chance geral de ter algum evento
        if (Math.random() < 0.5) {
            // Escolher evento aleatório da lista
            const selectedEvent = this.randomEvents[Math.floor(Math.random() * this.randomEvents.length)];
            
            this.state.currentEvent = selectedEvent;
            
            console.log('⚡ EVENTO:', selectedEvent.name, 'Efeito:', selectedEvent.effect);
            
            // Exibir evento
            setTimeout(() => {
                commentaryElement.textContent = `${selectedEvent.name} ${selectedEvent.message}`;
                commentaryElement.style.color = selectedEvent.effect > 0 ? '#4CAF50' : '#ff5252';
                commentaryElement.style.fontWeight = 'bold';
                
                // Voltar ao normal depois
                setTimeout(() => {
                    commentaryElement.style.color = '';
                    commentaryElement.style.fontWeight = 'normal';
                }, 3000);
            }, 500);
        } else {
            console.log('❌ Nenhum evento desta vez');
        }
    },

    // Resultados
    showResults() {
        this.showScreen('screen-results');
        
        const { school, sections } = this.state;
        
        // Nome da escola
        document.getElementById('results-school-name').textContent = school.name;

        // Calcular notas
        const scores = {
            'Samba-Enredo': this.calculateScore(sections.samba.quality),
            'Alegorias': this.calculateScore(sections.alegoria.quality),
            'Bateria': this.calculateScore(sections.bateria.quality),
            'Comissão de Frente': this.calculateScore(sections.comissao.quality),
            'Fantasias': this.calculateScore(sections.fantasia.quality),
            'Harmonia': this.calculateScore(sections.harmonia.quality)
        };

        // Exibir notas
        const scoresContainer = document.getElementById('results-scores');
        scoresContainer.innerHTML = Object.entries(scores).map(([category, score]) => `
            <div class="score-item">
                <span class="category">${category}</span>
                <span class="score">${score.toFixed(1)}</span>
            </div>
        `).join('');

        // Total
        const total = Object.values(scores).reduce((a, b) => a + b, 0);
        let totalText = `Nota Total: ${total.toFixed(1)}`;
        
        // Adicionar info do evento se houve
        if (this.state.currentEvent) {
            const eventEmoji = this.state.currentEvent.effect > 0 ? '✨' : '⚠️';
            totalText += ` ${eventEmoji}`;
            console.log('📊 Evento aplicado:', this.state.currentEvent.name, 'Efeito:', this.state.currentEvent.effect);
        }
        
        document.getElementById('results-total').textContent = totalText;

        // Mostrar evento se houve
        let eventInfo = document.getElementById('results-event-info');
        if (!eventInfo) {
            eventInfo = document.createElement('div');
            eventInfo.id = 'results-event-info';
            eventInfo.style.textAlign = 'center';
            eventInfo.style.padding = '15px';
            eventInfo.style.marginBottom = '20px';
            eventInfo.style.borderRadius = '10px';
            eventInfo.style.fontSize = '1.1em';
            document.getElementById('results-total').after(eventInfo);
        }
        
        if (this.state.currentEvent) {
            eventInfo.style.background = this.state.currentEvent.effect > 0 
                ? 'rgba(76, 175, 80, 0.3)' 
                : 'rgba(255, 82, 82, 0.3)';
            eventInfo.innerHTML = `<strong>${this.state.currentEvent.name}</strong><br>${this.state.currentEvent.message}<br><small>Efeito: ${this.state.currentEvent.effect > 0 ? '+' : ''}${this.state.currentEvent.effect}%</small>`;
            eventInfo.style.display = 'block';
        } else {
            eventInfo.style.display = 'none';
        }

        // Classificação
        const classification = this.getClassification(total);
        const classDiv = document.getElementById('results-classification');
        classDiv.textContent = classification.message;
        classDiv.className = `classification ${classification.class}`;

        // Tocar som de acordo com resultado
        if (classification.promoted) {
            this.playSound('success');
        } else if (classification.relegated) {
            this.playSound('fail');
        } else {
            this.playSound('click');
        }

        // Atualizar estado
        if (classification.promoted) {
            if (this.groups[this.state.group].next) {
                this.state.group = this.groups[this.state.group].next;
            }
        } else if (classification.relegated) {
            if (this.groups[this.state.group].prev) {
                this.state.group = this.groups[this.state.group].prev;
            }
        }
    },

    calculateScore(quality) {
        // Base score from quality
        let base = (quality / 100) * 10;
        
        // Variação aleatória
        const variation = (Math.random() - 0.5) * 0.5;
        
        // Dificuldade progressiva: grupos superiores são mais exigentes
        let difficultyPenalty = 0;
        if (this.state.group === 'serie-a') {
            difficultyPenalty = 0.3; // Jurados mais críticos
        } else if (this.state.group === 'serie-especial') {
            difficultyPenalty = 0.5; // Jurados muito críticos
        }
        
        // Aplicar efeito do evento aleatório
        let eventBonus = 0;
        if (this.state.currentEvent) {
            eventBonus = this.state.currentEvent.effect / 10; // Converter para escala 0-1
        }
        
        let finalScore = base + variation - difficultyPenalty + eventBonus;
        
        return Math.max(8, Math.min(10, finalScore));
    },

    getClassification(total) {
        if (total >= 59) {
            return { 
                message: '🎉 CAMPEÃ! Sua escola subiu de grupo!', 
                class: 'promoted', 
                promoted: true 
            };
        } else if (total >= 57) {
            return { 
                message: '✨ Vice-Campeã! Sua escola subiu de grupo!', 
                class: 'promoted', 
                promoted: true 
            };
        } else if (total >= 54) {
            return { 
                message: '👏 Boa colocação! Permanece no grupo.', 
                class: '', 
                promoted: false 
            };
        } else {
            return { 
                message: '😔 Rebaixada... Sua escola desceu de grupo.', 
                class: 'relegated', 
                relegated: true 
            };
        }
    },

    // Próximo Ano
    nextYear() {
        this.state.year++;
        this.state.money += 60000; // Verba anual
        
        // Reset das seções
        this.state.sections = {
            samba: { quality: 0, chosen: false, name: '' },
            alegoria: { quality: 50 },
            bateria: { quality: 50 },
            comissao: { quality: 50 },
            fantasia: { quality: 50 },
            harmonia: { quality: 50 }
        };

        this.saveGame();
        this.showDashboard();
    },

    backToDashboard() {
        this.showDashboard();
    },

    // Save/Load
    saveGame() {
        localStorage.setItem('carnaval-game-save', JSON.stringify(this.state));
    },

    loadGame() {
        const saved = localStorage.getItem('carnaval-game-save');
        if (saved) {
            this.state = JSON.parse(saved);
            this.showDashboard();
        } else {
            alert('Nenhum jogo salvo encontrado!');
        }
    },

    checkSavedGame() {
        return localStorage.getItem('carnaval-game-save') !== null;
    },

    updateContinueButton() {
        const btn = document.getElementById('btn-continue');
        if (!this.checkSavedGame()) {
            btn.disabled = true;
            btn.style.opacity = '0.5';
        }
    },

    // Desfile 3D (novo!)
    showParade3D() {
        if (!this.state.sections.samba.chosen) {
            alert('⚠️ Você precisa escolher um samba-enredo antes de desfilar!');
            return;
        }

        console.log('🎬 Iniciando desfile 3D...');
        
        // Preparar dados para passar pro 3D
        const desfileData = {
            nome: this.state.school.name,
            cores: this.state.school.colors,
            qualidades: {
                samba: this.state.sections.samba.quality,
                alegorias: this.state.sections.alegoria.quality,
                bateria: this.state.sections.bateria.quality,
                comissao: this.state.sections.comissao.quality,
                fantasias: this.state.sections.fantasia.quality,
                harmonia: this.state.sections.harmonia.quality
            },
            grupo: this.state.group,
            ano: this.state.year
        };
        
        // Salvar dados no localStorage para o 3D pegar
        localStorage.setItem('desfileData', JSON.stringify(desfileData));
        localStorage.setItem('returnUrl', window.location.href);
        
        // Abrir desfile 3D em nova aba
        const url = window.location.href.replace('carnaval-game/index.html', 'carnaval-game-3d/index.html');
        window.open(url, '_blank');
    },

    // Créditos
    showCredits() {
        this.showScreen('screen-credits');
    }
};

// Inicializar ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    game.init();
});
