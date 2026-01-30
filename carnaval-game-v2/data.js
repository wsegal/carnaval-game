// 🎴 CARNAVAL GAME V2.0 - DATABASE
// Sistema de personagens, baús e configurações

// ============================================
// PERSONAGENS (30 iniciais)
// ============================================

const PERSONAGENS = [
    // RITMISTAS (8)
    { id: 1, nome: "Mestre Batida", tipo: "ritmista", raridade: "lendario", emoji: "🥁", poder: 100, desc: "Lendário mestre da bateria" },
    { id: 2, nome: "Surdo de Ouro", tipo: "ritmista", raridade: "epico", emoji: "🥁", poder: 80, desc: "Surdo poderoso" },
    { id: 3, nome: "Repique Real", tipo: "ritmista", raridade: "epico", emoji: "🥁", poder: 75, desc: "Repique afiado" },
    { id: 4, nome: "Tamborim Mágico", tipo: "ritmista", raridade: "raro", emoji: "🥁", poder: 60, desc: "Tamborim veloz" },
    { id: 5, nome: "Agogô Sagrado", tipo: "ritmista", raridade: "raro", emoji: "🔔", poder: 55, desc: "Marca o tempo perfeito" },
    { id: 6, nome: "Ritmista Junior", tipo: "ritmista", raridade: "comum", emoji: "🥁", poder: 30, desc: "Aprendiz dedicado" },
    { id: 7, nome: "Cuíca Cantante", tipo: "ritmista", raridade: "comum", emoji: "🎺", poder: 25, desc: "Som característico" },
    { id: 8, nome: "Pandeiro Básico", tipo: "ritmista", raridade: "comum", emoji: "🥁", poder: 20, desc: "Ritmo constante" },
    
    // PASSISTAS (8)
    { id: 9, nome: "Rainha da Passarela", tipo: "passista", raridade: "lendario", emoji: "💃", poder: 95, desc: "Dança hipnotizante" },
    { id: 10, nome: "Bailarina de Elite", tipo: "passista", raridade: "epico", emoji: "💃", poder: 75, desc: "Movimentos perfeitos" },
    { id: 11, nome: "Gingado Imperial", tipo: "passista", raridade: "epico", emoji: "💃", poder: 70, desc: "Ginga incomparável" },
    { id: 12, nome: "Sambafoot Pro", tipo: "passista", raridade: "raro", emoji: "💃", poder: 58, desc: "Pés velozes" },
    { id: 13, nome: "Dançarina Estrela", tipo: "passista", raridade: "raro", emoji: "💃", poder: 52, desc: "Brilha na avenida" },
    { id: 14, nome: "Passista Iniciante", tipo: "passista", raridade: "comum", emoji: "💃", poder: 28, desc: "Aprendendo os passos" },
    { id: 15, nome: "Componente Alegre", tipo: "passista", raridade: "comum", emoji: "💃", poder: 22, desc: "Samba no pé" },
    { id: 16, nome: "Sambista Novato", tipo: "passista", raridade: "comum", emoji: "💃", poder: 18, desc: "Começando na avenida" },
    
    // CARNAVALESCOS (5)
    { id: 17, nome: "Mestre das Cores", tipo: "carnavalesco", raridade: "lendario", emoji: "🎨", poder: 98, desc: "Visão artística única" },
    { id: 18, nome: "Artista Premiado", tipo: "carnavalesco", raridade: "epico", emoji: "🎨", poder: 78, desc: "Alegorias espetaculares" },
    { id: 19, nome: "Designer Criativo", tipo: "carnavalesco", raridade: "raro", emoji: "🎨", poder: 56, desc: "Ideias inovadoras" },
    { id: 20, nome: "Cenógrafo Hábil", tipo: "carnavalesco", raridade: "comum", emoji: "🎨", poder: 32, desc: "Bom senso estético" },
    { id: 21, nome: "Ajudante de Arte", tipo: "carnavalesco", raridade: "comum", emoji: "🎨", poder: 24, desc: "Apoia a produção" },
    
    // COMPOSITORES (5)
    { id: 22, nome: "Poeta do Samba", tipo: "compositor", raridade: "lendario", emoji: "🎤", poder: 92, desc: "Versos inesquecíveis" },
    { id: 23, nome: "Melodia Dourada", tipo: "compositor", raridade: "epico", emoji: "🎤", poder: 72, desc: "Refrãos marcantes" },
    { id: 24, nome: "Letrista Talentoso", tipo: "compositor", raridade: "raro", emoji: "🎤", poder: 54, desc: "Rimas perfeitas" },
    { id: 25, nome: "Sambista Promissor", tipo: "compositor", raridade: "comum", emoji: "🎤", poder: 30, desc: "Primeiras composições" },
    { id: 26, nome: "Versejador Junior", tipo: "compositor", raridade: "comum", emoji: "🎤", poder: 26, desc: "Aprendendo a compor" },
    
    // DESTAQUES (4)
    { id: 27, nome: "Estrela do Carnaval", tipo: "destaque", raridade: "lendario", emoji: "⭐", poder: 105, desc: "Brilha mais que o sol" },
    { id: 28, nome: "Celebridade VIP", tipo: "destaque", raridade: "epico", emoji: "⭐", poder: 82, desc: "Rouba a cena" },
    { id: 29, nome: "Influencer da Avenida", tipo: "destaque", raridade: "raro", emoji: "⭐", poder: 60, desc: "Chama atenção" },
    { id: 30, nome: "Folião Animado", tipo: "destaque", raridade: "comum", emoji: "⭐", poder: 35, desc: "Pura alegria" }
];

// ============================================
// CONFIGURAÇÕES DE RARIDADE
// ============================================

const RARIDADES = {
    comum: {
        nome: "Comum",
        cor: "#9E9E9E",
        corTexto: "#FFFFFF",
        dropRate: 0.60, // 60%
        estrelas: 1,
        gradient: "linear-gradient(135deg, #9E9E9E 0%, #757575 100%)"
    },
    raro: {
        nome: "Raro",
        cor: "#2196F3",
        corTexto: "#FFFFFF",
        dropRate: 0.25, // 25%
        estrelas: 2,
        gradient: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)"
    },
    epico: {
        nome: "Épico",
        cor: "#9C27B0",
        corTexto: "#FFFFFF",
        dropRate: 0.12, // 12%
        estrelas: 3,
        gradient: "linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)"
    },
    lendario: {
        nome: "Lendário",
        cor: "#FFD700",
        corTexto: "#000000",
        dropRate: 0.03, // 3%
        estrelas: 4,
        gradient: "linear-gradient(135deg, #FFD700 0%, #FFA000 100%)"
    }
};

// ============================================
// TIPOS DE PERSONAGENS
// ============================================

const TIPOS = {
    ritmista: {
        nome: "Ritmista",
        emoji: "🥁",
        desc: "Mantém o ritmo da bateria",
        cor: "#FF5722"
    },
    passista: {
        nome: "Passista",
        emoji: "💃",
        desc: "Dança e encanta na avenida",
        cor: "#E91E63"
    },
    carnavalesco: {
        nome: "Carnavalesco",
        emoji: "🎨",
        desc: "Cria alegorias espetaculares",
        cor: "#673AB7"
    },
    compositor: {
        nome: "Compositor",
        emoji: "🎤",
        desc: "Compõe sambas inesquecíveis",
        cor: "#3F51B5"
    },
    destaque: {
        nome: "Destaque",
        emoji: "⭐",
        desc: "Brilha e rouba a cena",
        cor: "#FF9800"
    }
};

// ============================================
// BAÚS
// ============================================

const BAUS = {
    bronze: {
        nome: "Baú Bronze",
        emoji: "📦",
        custo: 0, // grátis
        cooldown: 24 * 60 * 60 * 1000, // 24 horas
        garantias: {
            min: 1,
            max: 3,
            raroMin: 0 // pode não ter raro
        },
        cor: "#CD7F32"
    },
    prata: {
        nome: "Baú Prata",
        emoji: "📦",
        custo: 100, // gemas
        garantias: {
            min: 3,
            max: 5,
            raroMin: 1 // pelo menos 1 raro
        },
        cor: "#C0C0C0"
    },
    ouro: {
        nome: "Baú Ouro",
        emoji: "🎁",
        custo: 300, // gemas
        garantias: {
            min: 5,
            max: 8,
            raroMin: 2, // pelo menos 2 raros
            epicoMin: 1 // pelo menos 1 épico
        },
        cor: "#FFD700"
    },
    lendario: {
        nome: "Baú Lendário",
        emoji: "💎",
        custo: 1000, // gemas
        garantias: {
            min: 10,
            max: 15,
            lendarioMin: 1, // garantido!
            epicoMin: 3
        },
        cor: "#FF00FF"
    }
};

// ============================================
// ECONOMIA
// ============================================

const ECONOMIA = {
    // Ganhos
    desfileVitoria: 150, // estrelinhas
    desfileDerrota: 50,
    xpPorDesfile: 100,
    idleGanhoBase: 10, // estrelinhas/min
    
    // Custos
    energiaBase: 10,
    energiaMax: 10,
    energiaRegenMin: 30, // minutos
    
    // Upgrades
    upgradeIdleBase: 100, // estrelinhas
    upgradeIdleMultiplier: 1.5,
    
    // Gemas iniciais
    gemasIniciais: 100,
    estrelasIniciais: 1000,
    
    // Pacotes de gemas (R$)
    pacotesGemas: [
        { gemas: 100, preco: 4.99, bonus: 0 },
        { gemas: 500, preco: 19.99, bonus: 50 }, // +10%
        { gemas: 1200, preco: 39.99, bonus: 200 }, // +16%
        { gemas: 3000, preco: 79.99, bonus: 700 } // +23%
    ]
};

// ============================================
// LOGIN REWARDS
// ============================================

const LOGIN_REWARDS = [
    { dia: 1, estrelas: 50, gemas: 0, bau: null, especial: null },
    { dia: 2, estrelas: 100, gemas: 0, bau: null, especial: null },
    { dia: 3, estrelas: 0, gemas: 10, bau: null, especial: null },
    { dia: 4, estrelas: 0, gemas: 0, bau: "bronze", especial: null },
    { dia: 5, estrelas: 200, gemas: 0, bau: null, especial: null },
    { dia: 6, estrelas: 0, gemas: 20, bau: null, especial: null },
    { dia: 7, estrelas: 0, gemas: 0, bau: "prata", especial: "personagem_epico" }
];

// ============================================
// NIVEIS & XP
// ============================================

const NIVEIS = {
    xpBase: 100,
    xpMultiplier: 1.2,
    recompensasNivel: [
        { nivel: 5, gemas: 50, bau: "bronze" },
        { nivel: 10, gemas: 100, bau: "prata" },
        { nivel: 15, gemas: 150, bau: "ouro" },
        { nivel: 20, gemas: 300, bau: "lendario" }
        // Repete a cada 20 níveis
    ]
};
