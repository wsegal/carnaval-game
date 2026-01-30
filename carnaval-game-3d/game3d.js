// 🎭 CARNAVAL 3D - SAMBÓDROMO
// Desenvolvido por ClawdMan AI - Vibecoding 24/7

// ============================================
// CONFIGURAÇÃO INICIAL
// ============================================

let scene, camera, renderer;
let sambodrome = {};
let adBanners = [];
let paradeElements = [];
let floats = []; // Carros alegóricos
let dancers = []; // Passistas
let bateria = []; // Bateria
let confetti = null; // Sistema de confete
let clock, stats;
let cameraMode = 'fixed'; // fixed, follow, cinematic
let isParading = false;
let paradeProgress = 0; // 0 a 1 (progresso do desfile)
let paradeTime = 0; // tempo do desfile em segundos
let scoresShown = false;

// Configurações
const CONFIG = {
    sambodrome: {
        length: 80,      // metros
        width: 14,       // metros
        height: 15       // altura das arquibancadas
    },
    ads: {
        count: 20,       // número de banners
        width: 4,        // largura do banner
        height: 2        // altura do banner
    },
    camera: {
        fov: 75,
        near: 0.1,
        far: 1000,
        startPosition: { x: 0, y: 10, z: 30 }
    }
};

// ============================================
// INICIALIZAÇÃO
// ============================================

function init() {
    console.log('🎭 Inicializando Sambódromo 3D...');

    // Cena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a); // Céu noturno
    scene.fog = new THREE.Fog(0x0a0a1a, 50, 150);

    // Câmera
    camera = new THREE.PerspectiveCamera(
        CONFIG.camera.fov,
        window.innerWidth / window.innerHeight,
        CONFIG.camera.near,
        CONFIG.camera.far
    );
    camera.position.set(
        CONFIG.camera.startPosition.x,
        CONFIG.camera.startPosition.y,
        CONFIG.camera.startPosition.z
    );
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Clock para animações
    clock = new THREE.Clock();

    // Criar elementos
    createLights();
    createSambodrome();
    createAdBanners();
    createGround();
    createSky();
    createParadeElements(); // Novo!

    // Event listeners
    setupControls();
    window.addEventListener('resize', onWindowResize, false);
    
    // Aplicar dados do jogo 2D (se existir)
    if (typeof GameBridge !== 'undefined' && GameBridge.schoolData) {
        GameBridge.applyDataToScene();
    }
    
    // Aplicar anúncios (após criar banners)
    setTimeout(() => {
        if (typeof AdsManager !== 'undefined') {
            AdsManager.applyAdsToScene();
        }
    }, 500);

    // Esconder loading
    document.getElementById('loading').classList.add('hidden');

    console.log('✅ Sambódromo 3D pronto!');
    updateAdCount();
    updateElementCount();

    // Iniciar loop de renderização
    animate();
}

// ============================================
// ILUMINAÇÃO
// ============================================

function createLights() {
    // Luz ambiente
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    // Luz direcional (lua)
    const moonLight = new THREE.DirectionalLight(0xffffff, 0.8);
    moonLight.position.set(20, 40, 20);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = 2048;
    moonLight.shadow.mapSize.height = 2048;
    scene.add(moonLight);

    // Luzes coloridas da avenida (RGB)
    const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff];
    for (let i = 0; i < 5; i++) {
        const light = new THREE.PointLight(colors[i], 1, 30);
        light.position.set(
            (i - 2) * 10,
            8,
            0
        );
        scene.add(light);
    }
}

// ============================================
// SAMBÓDROMO
// ============================================

function createSambodrome() {
    const { length, width, height } = CONFIG.sambodrome;

    // Pista (chão da avenida)
    const trackGeometry = new THREE.PlaneGeometry(width, length);
    const trackMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        roughness: 0.8
    });
    const track = new THREE.Mesh(trackGeometry, trackMaterial);
    track.rotation.x = -Math.PI / 2;
    track.receiveShadow = true;
    scene.add(track);

    // Arquibancadas (esquerda e direita)
    createStands('left', -width/2 - 2, length, height);
    createStands('right', width/2 + 2, length, height);

    sambodrome.track = track;
}

function createStands(side, xPosition, length, height) {
    const standGeometry = new THREE.BoxGeometry(4, height, length);
    const standMaterial = new THREE.MeshStandardMaterial({ 
        color: side === 'left' ? 0x8b4513 : 0x654321,
        roughness: 0.7
    });
    const stand = new THREE.Mesh(standGeometry, standMaterial);
    stand.position.set(xPosition, height/2, 0);
    stand.castShadow = true;
    stand.receiveShadow = true;
    scene.add(stand);

    sambodrome[side + 'Stand'] = stand;
}

// ============================================
// BANNERS PUBLICITÁRIOS
// ============================================

function createAdBanners() {
    const { count, width, height } = CONFIG.ads;
    const { length } = CONFIG.sambodrome;
    const spacing = length / (count / 2);

    // Banners na esquerda
    for (let i = 0; i < count / 2; i++) {
        const banner = createBanner(width, height, i);
        banner.position.set(
            -10,                          // x (esquerda)
            5,                            // y (altura)
            (i * spacing) - length/2 + spacing/2  // z (ao longo da pista)
        );
        banner.userData.side = 'left';
        banner.userData.index = i;
        scene.add(banner);
        adBanners.push(banner);
    }

    // Banners na direita
    for (let i = 0; i < count / 2; i++) {
        const banner = createBanner(width, height, i + count/2);
        banner.position.set(
            10,                           // x (direita)
            5,                            // y (altura)
            (i * spacing) - length/2 + spacing/2  // z (ao longo da pista)
        );
        banner.rotation.y = Math.PI; // Rotacionar para dentro
        banner.userData.side = 'right';
        banner.userData.index = i + count/2;
        scene.add(banner);
        adBanners.push(banner);
    }

    console.log(`✅ ${adBanners.length} espaços publicitários criados!`);
}

function createBanner(width, height, index) {
    const geometry = new THREE.PlaneGeometry(width, height);
    
    // Textura placeholder (gradiente colorido)
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Gradiente de fundo
    const gradient = ctx.createLinearGradient(0, 0, 512, 256);
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'];
    gradient.addColorStop(0, colors[index % colors.length]);
    gradient.addColorStop(1, colors[(index + 1) % colors.length]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 256);
    
    // Texto
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`ANÚNCIO ${index + 1}`, 256, 100);
    ctx.font = '24px Arial';
    ctx.fillText('Seu logo aqui', 256, 150);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        side: THREE.DoubleSide
    });
    
    const banner = new THREE.Mesh(geometry, material);
    return banner;
}

// ============================================
// CHÃO E CÉU
// ============================================

function createGround() {
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a2e,
        roughness: 0.9
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);
}

function createSky() {
    // Céu estrelado (partículas)
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ 
        color: 0xffffff,
        size: 0.5
    });

    const starsVertices = [];
    for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 400;
        const y = Math.random() * 200 + 50;
        const z = (Math.random() - 0.5) * 400;
        starsVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', 
        new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
}

// ============================================
// ELEMENTOS DO DESFILE
// ============================================

function createParadeElements() {
    console.log('🎭 Criando elementos do desfile...');
    
    createFloats();
    createDancers();
    createBateria();
    createConfetti();
    
    console.log(`✅ Desfile criado: ${floats.length} carros, ${dancers.length} passistas, ${bateria.length} ritmistas`);
}

// CARROS ALEGÓRICOS
function createFloats() {
    const floatConfigs = [
        { color: 0xff0000, size: 6, height: 8, z: -50 },  // Carro 1 - Vermelho
        { color: 0x00ff00, size: 5, height: 7, z: -30 },  // Carro 2 - Verde
        { color: 0x0000ff, size: 7, height: 9, z: -10 }   // Carro 3 - Azul
    ];

    floatConfigs.forEach((config, index) => {
        const float = createFloat(config.color, config.size, config.height);
        float.position.set(0, config.height / 2, config.z);
        float.userData.startZ = config.z;
        scene.add(float);
        floats.push(float);
    });
}

function createFloat(color, size, height) {
    const group = new THREE.Group();

    // Base do carro
    const baseGeometry = new THREE.BoxGeometry(size, 2, size * 1.5);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x333333,
        metalness: 0.5,
        roughness: 0.5
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    group.add(base);

    // Parte decorativa (pirâmide)
    const decorGeometry = new THREE.ConeGeometry(size / 2, height - 2, 8);
    const decorMaterial = new THREE.MeshStandardMaterial({ 
        color: color,
        metalness: 0.3,
        roughness: 0.4,
        emissive: color,
        emissiveIntensity: 0.3
    });
    const decor = new THREE.Mesh(decorGeometry, decorMaterial);
    decor.position.y = height / 2;
    decor.castShadow = true;
    group.add(decor);

    // Detalhes brilhantes
    for (let i = 0; i < 4; i++) {
        const sphereGeometry = new THREE.SphereGeometry(0.3, 8, 8);
        const sphereMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffff00,
            emissive: 0xffff00,
            emissiveIntensity: 0.8
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        const angle = (i / 4) * Math.PI * 2;
        sphere.position.set(
            Math.cos(angle) * size / 2,
            1,
            Math.sin(angle) * size / 2
        );
        group.add(sphere);
    }

    return group;
}

// PASSISTAS (CROWD SYSTEM)
function createDancers() {
    const dancerGeometry = new THREE.CylinderGeometry(0.3, 0.2, 1.8, 6);
    const colors = [0xff00ff, 0x00ffff, 0xffff00, 0xff0000, 0x00ff00];
    
    // Criar 120 passistas em grupos
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 20; col++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const material = new THREE.MeshStandardMaterial({ 
                color: color,
                metalness: 0.4,
                roughness: 0.6
            });
            
            const dancer = new THREE.Mesh(dancerGeometry, material);
            
            // Posicionar em formação
            const xSpread = 12;
            const zSpread = 60;
            dancer.position.set(
                (col / 20 - 0.5) * xSpread,
                0.9,
                -zSpread + (row * 8)
            );
            
            dancer.userData.startZ = dancer.position.z;
            dancer.userData.xOffset = dancer.position.x;
            dancer.userData.animOffset = Math.random() * Math.PI * 2;
            dancer.castShadow = true;
            
            scene.add(dancer);
            dancers.push(dancer);
        }
    }
}

// BATERIA
function createBateria() {
    const bateriaGeometry = new THREE.BoxGeometry(0.4, 1.5, 0.4);
    const bateriaMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff0000,
        metalness: 0.6,
        roughness: 0.4
    });
    
    // 80 ritmistas em formação de bateria
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 10; col++) {
            const ritmista = new THREE.Mesh(bateriaGeometry, bateriaMaterial);
            
            ritmista.position.set(
                (col - 4.5) * 1.2,
                0.75,
                15 + (row * 1.5)
            );
            
            ritmista.userData.startZ = ritmista.position.z;
            ritmista.userData.beatOffset = (row + col) * 0.1;
            ritmista.castShadow = true;
            
            scene.add(ritmista);
            bateria.push(ritmista);
        }
    }
}

// SISTEMA DE CONFETE
function createConfetti() {
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        // Posições iniciais
        positions.push(
            (Math.random() - 0.5) * 20,
            Math.random() * 15 + 5,
            (Math.random() - 0.5) * 80
        );

        // Cores aleatórias
        const color = new THREE.Color();
        color.setHSL(Math.random(), 1.0, 0.5);
        colors.push(color.r, color.g, color.b);

        // Velocidades
        velocities.push(
            (Math.random() - 0.5) * 0.02,
            -Math.random() * 0.05 - 0.02,
            (Math.random() - 0.5) * 0.02
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    confetti = new THREE.Points(geometry, material);
    confetti.userData.velocities = velocities;
    scene.add(confetti);
}

// ============================================
// CONTROLES
// ============================================

function setupControls() {
    document.getElementById('btn-camera').addEventListener('click', toggleCamera);
    document.getElementById('btn-parade').addEventListener('click', startParade);
    document.getElementById('btn-reset').addEventListener('click', resetCamera);
    
    const finishBtn = document.getElementById('btn-finish');
    if (finishBtn) {
        finishBtn.addEventListener('click', finishParade);
    }
    
    const adsBtn = document.getElementById('btn-ads');
    if (adsBtn) {
        adsBtn.addEventListener('click', () => {
            if (typeof AdsManager !== 'undefined') {
                AdsManager.showAdminPanel();
            }
        });
    }
}

function toggleCamera() {
    const modes = ['fixed', 'follow', 'cinematic'];
    const currentIndex = modes.indexOf(cameraMode);
    cameraMode = modes[(currentIndex + 1) % modes.length];
    
    const modeNames = {
        'fixed': 'Fixa',
        'follow': 'Seguindo',
        'cinematic': 'Cinemática'
    };
    
    document.getElementById('btn-camera').textContent = `📹 Câmera: ${modeNames[cameraMode]}`;
    document.getElementById('camera-mode').textContent = modeNames[cameraMode];
}

function startParade() {
    if (isParading) {
        console.log('⏸️ Desfile pausado');
        isParading = false;
        document.getElementById('btn-parade').textContent = '▶️ Continuar Desfile';
    } else {
        console.log('🎊 Iniciando desfile!');
        isParading = true;
        paradeProgress = 0;
        paradeTime = 0;
        scoresShown = false;
        document.getElementById('btn-parade').textContent = '⏸️ Pausar Desfile';
        document.getElementById('scores-panel').classList.add('hidden');
    }
    updateParadeStatus();
}

function finishParade() {
    console.log('✅ Finalizando desfile');
    
    // Voltar pro jogo 2D (se veio de lá)
    const returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl) {
        window.location.href = returnUrl;
    } else {
        // Resetar para continuar testando
        isParading = false;
        paradeProgress = 0;
        paradeTime = 0;
        scoresShown = false;
        document.getElementById('btn-parade').textContent = '🎊 Iniciar Desfile';
        document.getElementById('scores-panel').classList.add('hidden');
        updateParadeStatus();
    }
}

function resetCamera() {
    camera.position.set(
        CONFIG.camera.startPosition.x,
        CONFIG.camera.startPosition.y,
        CONFIG.camera.startPosition.z
    );
    camera.lookAt(0, 0, 0);
    cameraMode = 'fixed';
    document.getElementById('btn-camera').textContent = '📹 Câmera: Fixa';
    document.getElementById('camera-mode').textContent = 'Fixa';
}

// ============================================
// ANIMAÇÃO E LÓGICA
// ============================================

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // Atualizar câmera baseado no modo
    updateCamera(elapsed);

    // Animar banners (pulsar levemente)
    animateBanners(elapsed);

    // Animar elementos do desfile
    if (isParading) {
        animateParade(delta, elapsed);
    }

    // Animar confete sempre
    animateConfetti(delta);

    // Calcular FPS
    updateFPS(delta);

    // Renderizar
    renderer.render(scene, camera);
}

// ============================================
// ANIMAÇÃO DO DESFILE
// ============================================

function animateParade(delta, elapsed) {
    const paradeSpeed = 3; // velocidade do desfile
    paradeProgress += delta * 0.05;
    paradeTime += delta;
    
    // Mostrar notas após 15 segundos de desfile
    if (paradeTime >= 15 && !scoresShown) {
        showScores();
        scoresShown = true;
    }

    // Animar carros alegóricos
    floats.forEach((float, index) => {
        float.position.z += paradeSpeed * delta;
        
        // Rotação dos detalhes
        float.children.forEach((child, i) => {
            if (i > 1) { // Esferas decorativas
                child.rotation.y += delta * 2;
            }
        });
        
        // Balançar levemente
        float.rotation.z = Math.sin(elapsed * 2 + index) * 0.05;
        
        // Reset quando sair da pista
        if (float.position.z > 50) {
            float.position.z = float.userData.startZ;
        }
    });

    // Animar passistas
    dancers.forEach((dancer, index) => {
        dancer.position.z += paradeSpeed * delta;
        
        // Dançar (movimento ondulatório)
        const wave = Math.sin(elapsed * 3 + dancer.userData.animOffset);
        dancer.position.x = dancer.userData.xOffset + wave * 0.5;
        dancer.rotation.y = wave * 0.3;
        dancer.position.y = 0.9 + Math.abs(Math.sin(elapsed * 4 + dancer.userData.animOffset)) * 0.3;
        
        // Reset
        if (dancer.position.z > 50) {
            dancer.position.z = dancer.userData.startZ;
        }
    });

    // Animar bateria
    bateria.forEach((ritmista, index) => {
        ritmista.position.z += paradeSpeed * delta;
        
        // "Tocar tambor" (movimento vertical)
        const beat = Math.sin(elapsed * 8 + ritmista.userData.beatOffset);
        ritmista.scale.y = 1 + beat * 0.1;
        ritmista.rotation.x = beat * 0.2;
        
        // Reset
        if (ritmista.position.z > 50) {
            ritmista.position.z = ritmista.userData.startZ;
        }
    });
}

function animateConfetti(delta) {
    if (!confetti) return;

    const positions = confetti.geometry.attributes.position.array;
    const velocities = confetti.userData.velocities;

    for (let i = 0; i < positions.length; i += 3) {
        // Atualizar posição
        positions[i] += velocities[i];     // x
        positions[i + 1] += velocities[i + 1]; // y
        positions[i + 2] += velocities[i + 2]; // z

        // Reset confete que caiu
        if (positions[i + 1] < 0) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = Math.random() * 10 + 15;
            positions[i + 2] = (Math.random() - 0.5) * 80;
        }

        // Manter dentro da área
        if (Math.abs(positions[i]) > 15) {
            velocities[i] *= -1;
        }
        if (Math.abs(positions[i + 2]) > 45) {
            velocities[i + 2] *= -1;
        }
    }

    confetti.geometry.attributes.position.needsUpdate = true;
}

function updateCamera(elapsed) {
    if (cameraMode === 'follow' && isParading) {
        // Câmera segue o desfile
        const speed = 2;
        const z = Math.sin(elapsed * speed) * 30;
        camera.position.z = z;
        camera.lookAt(0, 2, z - 10);
    } else if (cameraMode === 'cinematic') {
        // Câmera rotaciona ao redor
        const radius = 35;
        camera.position.x = Math.sin(elapsed * 0.3) * radius;
        camera.position.z = Math.cos(elapsed * 0.3) * radius;
        camera.lookAt(0, 0, 0);
    }
}

function animateBanners(elapsed) {
    adBanners.forEach((banner, index) => {
        const offset = index * 0.5;
        banner.position.y = 5 + Math.sin(elapsed * 2 + offset) * 0.2;
    });
}

let fpsFrames = 0;
let fpsTime = 0;

function updateFPS(delta) {
    fpsFrames++;
    fpsTime += delta;
    
    if (fpsTime >= 1.0) {
        const fps = Math.round(fpsFrames / fpsTime);
        document.getElementById('fps').textContent = fps;
        fpsFrames = 0;
        fpsTime = 0;
    }
}

function updateAdCount() {
    document.getElementById('ad-count').textContent = adBanners.length;
}

function updateElementCount() {
    const total = floats.length + dancers.length + bateria.length;
    document.getElementById('element-count').textContent = 
        `${floats.length} carros, ${dancers.length} passistas, ${bateria.length} ritmistas`;
}

function updateParadeStatus() {
    const status = isParading ? '🎊 Desfilando' : '⏸️ Parado';
    document.getElementById('parade-status').textContent = status;
}

// ============================================
// SISTEMA DE NOTAS
// ============================================

function showScores() {
    console.log('📊 Mostrando notas dos jurados');
    
    // Pausar desfile
    isParading = false;
    updateParadeStatus();
    
    // Gerar notas
    const scores = typeof GameBridge !== 'undefined' 
        ? GameBridge.generateScores() 
        : generateRandomScores();
    
    // Calcular total
    const total = Object.values(scores).reduce((a, b) => a + b, 0).toFixed(1);
    
    // Montar HTML
    let html = '';
    for (const [quesito, nota] of Object.entries(scores)) {
        html += `
            <div class="score-item">
                <span><strong>${quesito}:</strong></span>
                <span>${nota.toFixed(1)}</span>
            </div>
        `;
    }
    
    document.getElementById('scores-content').innerHTML = html;
    document.getElementById('total-score').innerHTML = `
        🏆 NOTA FINAL: <span style="font-size: 28px; color: #FFD700;">${total}</span>
    `;
    
    // Mostrar painel
    document.getElementById('scores-panel').classList.remove('hidden');
    
    // Salvar resultado
    if (typeof GameBridge !== 'undefined') {
        GameBridge.saveResult(scores);
    }
}

function generateRandomScores() {
    return {
        'Samba-Enredo': 8.0 + Math.random() * 2.0,
        'Alegorias': 8.0 + Math.random() * 2.0,
        'Bateria': 8.0 + Math.random() * 2.0,
        'Comissão de Frente': 8.0 + Math.random() * 2.0,
        'Fantasias': 8.0 + Math.random() * 2.0,
        'Harmonia': 8.0 + Math.random() * 2.0
    };
}

// ============================================
// RESPONSIVIDADE
// ============================================

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ============================================
// INICIAR APLICAÇÃO
// ============================================

window.addEventListener('DOMContentLoaded', init);
