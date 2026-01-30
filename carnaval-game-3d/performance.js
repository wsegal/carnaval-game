// ⚡ PERFORMANCE OPTIMIZER
// Sistema de otimização para mobile e desktop

const Performance = {
    // Detectar dispositivo
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isLowEnd: false,
    
    // Settings adaptativos
    settings: {
        shadows: true,
        particleCount: 2000,
        dancerCount: 120,
        antialiasing: true,
        pixelRatio: window.devicePixelRatio
    },
    
    // Inicializar otimizador
    init: function() {
        this.detectPerformance();
        this.applyOptimizations();
        this.setupQualityToggle();
        console.log('⚡ Performance Optimizer ativo:', this.settings);
    },
    
    // Detectar capacidade do dispositivo
    detectPerformance: function() {
        // Mobile = reduzir qualidade
        if (this.isMobile) {
            this.isLowEnd = true;
            this.settings.shadows = false;
            this.settings.particleCount = 500;
            this.settings.dancerCount = 60;
            this.settings.antialiasing = false;
            this.settings.pixelRatio = Math.min(window.devicePixelRatio, 1.5);
            console.log('📱 Modo Mobile ativado');
        }
        
        // Detectar GPU fraca (se FPS < 30 por muito tempo)
        setTimeout(() => {
            this.monitorFPS();
        }, 5000);
    },
    
    // Aplicar otimizações
    applyOptimizations: function() {
        if (!renderer) return;
        
        // Pixel ratio
        renderer.setPixelRatio(this.settings.pixelRatio);
        
        // Shadows
        renderer.shadowMap.enabled = this.settings.shadows;
        
        // Antialiasing (não pode mudar depois de criar)
        // Precisa ser definido na criação do renderer
        
        console.log('✅ Otimizações aplicadas');
    },
    
    // Monitorar FPS e ajustar qualidade
    monitorFPS: function() {
        let lowFPSCount = 0;
        
        setInterval(() => {
            const currentFPS = parseInt(document.getElementById('fps')?.textContent || '60');
            
            if (currentFPS < 30) {
                lowFPSCount++;
                
                // Se FPS baixo por 3 medições seguidas, reduzir qualidade
                if (lowFPSCount >= 3 && !this.isLowEnd) {
                    console.warn('⚠️ FPS baixo detectado! Reduzindo qualidade...');
                    this.reducyQuality();
                    this.isLowEnd = true;
                    lowFPSCount = 0;
                }
            } else {
                lowFPSCount = 0;
            }
        }, 2000);
    },
    
    // Reduzir qualidade dinamicamente
    reduceQuality: function() {
        // Desabilitar sombras
        if (renderer && renderer.shadowMap.enabled) {
            renderer.shadowMap.enabled = false;
            console.log('🔧 Sombras desabilitadas');
        }
        
        // Reduzir confete
        if (confetti) {
            const positions = confetti.geometry.attributes.position.array;
            const newCount = Math.floor(positions.length / 4);
            const newPositions = positions.slice(0, newCount);
            confetti.geometry.setAttribute('position', 
                new THREE.Float32BufferAttribute(newPositions, 3));
            console.log('🔧 Confete reduzido para', newCount / 3);
        }
        
        // Reduzir passistas
        if (dancers && dancers.length > 60) {
            const toRemove = dancers.slice(60);
            toRemove.forEach(dancer => {
                scene.remove(dancer);
                dancer.geometry.dispose();
                dancer.material.dispose();
            });
            dancers.length = 60;
            console.log('🔧 Passistas reduzidos para 60');
        }
        
        alert('⚡ Modo de Performance Ativado!\n\nQualidade reduzida para melhorar FPS.');
    },
    
    // Toggle manual de qualidade
    setupQualityToggle: function() {
        // Adicionar botão de qualidade
        const controls = document.getElementById('controls');
        if (controls) {
            const btn = document.createElement('button');
            btn.id = 'btn-quality';
            btn.textContent = this.isLowEnd ? '⚡ Baixa' : '✨ Alta';
            btn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            btn.addEventListener('click', () => this.toggleQuality());
            controls.appendChild(btn);
        }
    },
    
    // Alternar qualidade manualmente
    toggleQuality: function() {
        this.isLowEnd = !this.isLowEnd;
        
        if (this.isLowEnd) {
            this.reduceQuality();
            document.getElementById('btn-quality').textContent = '⚡ Baixa';
        } else {
            alert('✨ Qualidade Alta requer recarregar a página.');
            location.reload();
        }
    },
    
    // Stats de performance
    getStats: function() {
        return {
            device: this.isMobile ? 'Mobile' : 'Desktop',
            quality: this.isLowEnd ? 'Baixa' : 'Alta',
            shadows: this.settings.shadows ? 'ON' : 'OFF',
            particles: this.settings.particleCount,
            dancers: this.settings.dancerCount
        };
    }
};

// Inicializar ao carregar
window.addEventListener('DOMContentLoaded', () => {
    // Aguardar renderer ser criado
    setTimeout(() => {
        Performance.init();
    }, 1000);
});
