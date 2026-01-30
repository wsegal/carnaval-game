// 💰 ADS MANAGER - Sistema de Gerenciamento de Anúncios
// Permite upload/configuração de banners publicitários

const AdsManager = {
    // Configuração de anúncios
    config: {
        banners: [],
        impressions: 0,
        clicks: 0,
        revenue: 0
    },
    
    // Inicializar sistema
    init: function() {
        this.loadConfig();
        this.setupTracking();
        console.log('💰 Ads Manager inicializado');
    },
    
    // Carregar configuração salva
    loadConfig: function() {
        const saved = localStorage.getItem('adsConfig');
        if (saved) {
            try {
                this.config = JSON.parse(saved);
                console.log('📊 Config de anúncios carregada:', this.config);
            } catch (e) {
                console.warn('⚠️ Erro ao carregar config de anúncios');
            }
        }
    },
    
    // Salvar configuração
    saveConfig: function() {
        localStorage.setItem('adsConfig', JSON.stringify(this.config));
        console.log('💾 Config de anúncios salva');
    },
    
    // Adicionar anúncio
    addBanner: function(bannerData) {
        this.config.banners.push({
            id: Date.now(),
            ...bannerData,
            impressions: 0,
            clicks: 0,
            created: new Date().toISOString()
        });
        this.saveConfig();
        console.log('✅ Banner adicionado:', bannerData);
    },
    
    // Remover anúncio
    removeBanner: function(bannerId) {
        this.config.banners = this.config.banners.filter(b => b.id !== bannerId);
        this.saveConfig();
        console.log('🗑️ Banner removido:', bannerId);
    },
    
    // Aplicar anúncios na cena
    applyAdsToScene: function() {
        if (!adBanners || adBanners.length === 0) return;
        
        this.config.banners.forEach((ad, index) => {
            if (index >= adBanners.length) return;
            
            const banner = adBanners[index];
            
            // Criar textura do anúncio
            if (ad.imageUrl) {
                // Carregar imagem externa
                const loader = new THREE.TextureLoader();
                loader.load(ad.imageUrl, (texture) => {
                    banner.material.map = texture;
                    banner.material.needsUpdate = true;
                    console.log(`🖼️ Banner ${index} carregado:`, ad.name);
                });
            } else if (ad.text) {
                // Gerar banner com texto
                this.generateTextBanner(banner, ad);
            }
            
            // Adicionar dados do anúncio
            banner.userData.ad = ad;
            banner.userData.clickable = true;
        });
        
        console.log(`✅ ${this.config.banners.length} anúncios aplicados`);
    },
    
    // Gerar banner com texto
    generateTextBanner: function(banner, ad) {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Background
        if (ad.bgColor) {
            ctx.fillStyle = ad.bgColor;
        } else {
            const gradient = ctx.createLinearGradient(0, 0, 512, 256);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            ctx.fillStyle = gradient;
        }
        ctx.fillRect(0, 0, 512, 256);
        
        // Texto principal
        ctx.fillStyle = ad.textColor || 'white';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 4;
        ctx.fillText(ad.text, 256, 100);
        
        // Subtexto (se houver)
        if (ad.subtext) {
            ctx.font = '28px Arial';
            ctx.fillText(ad.subtext, 256, 150);
        }
        
        // URL (se houver)
        if (ad.url) {
            ctx.font = '20px Arial';
            ctx.fillStyle = '#FFD700';
            ctx.fillText(ad.url, 256, 200);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        banner.material.map = texture;
        banner.material.needsUpdate = true;
    },
    
    // Setup de tracking
    setupTracking: function() {
        // Raycaster para detectar cliques
        window.addEventListener('click', (event) => {
            this.handleClick(event);
        });
    },
    
    // Registrar impressão
    registerImpression: function(bannerId) {
        const banner = this.config.banners.find(b => b.id === bannerId);
        if (banner) {
            banner.impressions++;
            this.config.impressions++;
            this.saveConfig();
        }
    },
    
    // Registrar clique
    registerClick: function(bannerId) {
        const banner = this.config.banners.find(b => b.id === bannerId);
        if (banner) {
            banner.clicks++;
            this.config.clicks++;
            
            // Simular receita (R$ 0.50 por clique)
            this.config.revenue += 0.50;
            
            this.saveConfig();
            console.log('💰 Clique registrado! Revenue: R$', this.config.revenue.toFixed(2));
            
            // Abrir URL do anunciante (se houver)
            if (banner.clickUrl) {
                window.open(banner.clickUrl, '_blank');
            }
        }
    },
    
    // Detectar clique em banner
    handleClick: function(event) {
        if (!camera || !adBanners) return;
        
        // Raycaster
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(adBanners);
        
        if (intersects.length > 0) {
            const banner = intersects[0].object;
            if (banner.userData.ad) {
                this.registerClick(banner.userData.ad.id);
                console.log('🖱️ Banner clicado:', banner.userData.ad.name);
            }
        }
    },
    
    // Estatísticas
    getStats: function() {
        return {
            totalBanners: this.config.banners.length,
            totalImpressions: this.config.impressions,
            totalClicks: this.config.clicks,
            ctr: this.config.impressions > 0 
                ? (this.config.clicks / this.config.impressions * 100).toFixed(2) + '%'
                : '0%',
            revenue: 'R$ ' + this.config.revenue.toFixed(2)
        };
    },
    
    // Interface de admin (simples)
    showAdminPanel: function() {
        const stats = this.getStats();
        alert(`
📊 ESTATÍSTICAS DE ANÚNCIOS

🎯 Banners Ativos: ${stats.totalBanners}
👁️ Impressões: ${stats.totalImpressions}
🖱️ Cliques: ${stats.totalClicks}
📈 CTR: ${stats.ctr}
💰 Receita: ${stats.revenue}
        `);
    }
};

// Exemplos de anúncios (demo)
const demoAds = [
    {
        name: 'Patrocinador 1',
        text: 'COCA-COLA',
        subtext: 'Abra a Felicidade',
        bgColor: '#FF0000',
        textColor: '#FFFFFF',
        clickUrl: 'https://coca-cola.com'
    },
    {
        name: 'Patrocinador 2',
        text: 'BRAHMA',
        subtext: 'A Número 1',
        bgColor: '#FFD700',
        textColor: '#000000',
        clickUrl: 'https://brahma.com.br'
    },
    {
        name: 'Patrocinador 3',
        text: 'SKOL',
        subtext: 'A Cerveja que Desce Redondo',
        bgColor: '#00A651',
        textColor: '#FFFFFF',
        clickUrl: 'https://skol.com.br'
    }
];

// Carregar anúncios demo (apenas se não tiver nada salvo)
window.addEventListener('DOMContentLoaded', () => {
    AdsManager.init();
    
    if (AdsManager.config.banners.length === 0) {
        console.log('📦 Carregando anúncios demo...');
        demoAds.forEach(ad => AdsManager.addBanner(ad));
        AdsManager.applyAdsToScene();
    }
});
