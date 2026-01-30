// 🌉 BRIDGE - Conecta jogo 2D com 3D
// Sistema de comunicação entre as duas versões

const GameBridge = {
    // Dados passados do jogo 2D
    schoolData: null,
    
    // Inicializar com dados da escola
    init: function(data) {
        this.schoolData = data;
        console.log('🌉 Bridge inicializado com dados:', data);
        this.applyDataToScene();
    },
    
    // Aplicar dados da escola na cena 3D
    applyDataToScene: function() {
        if (!this.schoolData) return;
        
        const { qualidades, cores, nome } = this.schoolData;
        
        // Atualizar banners com cores da escola
        if (cores && adBanners.length > 0) {
            this.updateBannersWithSchoolColors(cores);
        }
        
        // Ajustar qualidade visual dos elementos
        if (qualidades) {
            this.adjustVisualQuality(qualidades);
        }
        
        // Atualizar nome da escola no HUD
        if (nome) {
            this.updateSchoolName(nome);
        }
        
        console.log('✅ Dados aplicados na cena 3D');
    },
    
    // Atualizar cores dos banners com as cores da escola
    updateBannersWithSchoolColors: function(cores) {
        const [cor1, cor2] = cores;
        
        adBanners.forEach((banner, index) => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 256;
            const ctx = canvas.getContext('2d');
            
            // Gradiente com cores da escola
            const gradient = ctx.createLinearGradient(0, 0, 512, 256);
            gradient.addColorStop(0, cor1);
            gradient.addColorStop(1, cor2);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 256);
            
            // Texto do patrocinador
            ctx.fillStyle = 'white';
            ctx.font = 'bold 42px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 4;
            ctx.fillText(`PATROCINADOR ${index + 1}`, 256, 128);
            
            // Atualizar textura
            const texture = new THREE.CanvasTexture(canvas);
            banner.material.map = texture;
            banner.material.needsUpdate = true;
        });
        
        console.log('🎨 Banners atualizados com cores da escola');
    },
    
    // Ajustar qualidade visual baseado nos investimentos
    adjustVisualQuality: function(qualidades) {
        // Alegorias - afeta qualidade dos carros
        if (qualidades.alegorias && floats.length > 0) {
            const quality = qualidades.alegorias / 100;
            floats.forEach(float => {
                // Mais qualidade = mais brilho
                float.children.forEach(child => {
                    if (child.material.emissiveIntensity !== undefined) {
                        child.material.emissiveIntensity = 0.2 + (quality * 0.5);
                    }
                });
            });
        }
        
        // Fantasias - afeta cores e brilho dos passistas
        if (qualidades.fantasias && dancers.length > 0) {
            const quality = qualidades.fantasias / 100;
            dancers.forEach(dancer => {
                dancer.material.metalness = 0.3 + (quality * 0.4);
                dancer.material.emissive = dancer.material.color;
                dancer.material.emissiveIntensity = quality * 0.3;
            });
        }
        
        // Bateria - afeta aparência da bateria
        if (qualidades.bateria && bateria.length > 0) {
            const quality = qualidades.bateria / 100;
            bateria.forEach(ritmista => {
                ritmista.material.metalness = 0.5 + (quality * 0.3);
            });
        }
        
        console.log('✨ Qualidade visual ajustada:', qualidades);
    },
    
    // Atualizar nome da escola
    updateSchoolName: function(nome) {
        const nameEl = document.getElementById('school-name');
        if (nameEl) {
            nameEl.textContent = nome;
        }
    },
    
    // Gerar notas baseadas na qualidade
    generateScores: function() {
        if (!this.schoolData || !this.schoolData.qualidades) {
            return this.generateRandomScores();
        }
        
        const q = this.schoolData.qualidades;
        const notas = {
            'Samba-Enredo': this.qualityToScore(q.samba || 50),
            'Alegorias': this.qualityToScore(q.alegorias || 50),
            'Bateria': this.qualityToScore(q.bateria || 50),
            'Comissão de Frente': this.qualityToScore(q.comissao || 50),
            'Fantasias': this.qualityToScore(q.fantasias || 50),
            'Harmonia': this.qualityToScore(q.harmonia || 50)
        };
        
        return notas;
    },
    
    // Converter qualidade (0-100) em nota (8.0-10.0)
    qualityToScore: function(quality) {
        const base = 8.0 + (quality / 100) * 2.0;
        const variation = (Math.random() - 0.5) * 0.4;
        return Math.max(8.0, Math.min(10.0, base + variation));
    },
    
    // Gerar notas aleatórias (fallback)
    generateRandomScores: function() {
        return {
            'Samba-Enredo': 8.0 + Math.random() * 2.0,
            'Alegorias': 8.0 + Math.random() * 2.0,
            'Bateria': 8.0 + Math.random() * 2.0,
            'Comissão de Frente': 8.0 + Math.random() * 2.0,
            'Fantasias': 8.0 + Math.random() * 2.0,
            'Harmonia': 8.0 + Math.random() * 2.0
        };
    },
    
    // Salvar resultado de volta pro jogo 2D
    saveResult: function(notas) {
        const result = {
            notas: notas,
            total: Object.values(notas).reduce((a, b) => a + b, 0),
            timestamp: Date.now()
        };
        
        // Salvar no localStorage para o jogo 2D pegar
        localStorage.setItem('desfile3DResult', JSON.stringify(result));
        console.log('💾 Resultado salvo:', result);
        
        return result;
    }
};

// Tentar carregar dados do jogo 2D
window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('desfileData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            GameBridge.init(data);
        } catch (e) {
            console.warn('⚠️ Erro ao carregar dados do jogo 2D:', e);
        }
    }
});
