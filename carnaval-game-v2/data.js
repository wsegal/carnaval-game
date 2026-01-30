// 🎴 CARNAVAL GAME V2.0 - DATABASE
// Sistema de personagens, baús e configurações

// ============================================
// PERSONAGENS (30 iniciais)
// ============================================

const PERSONAGENS = [
    // RITMISTAS (Baterias Lendárias do Rio) (8)
    { id: 1, nome: "Mestre Odilon", tipo: "ritmista", raridade: "lendario", emoji: "🥁", poder: 100, desc: "Lenda da Portela, revolucionou as baterias", escola: "Portela" },
    { id: 2, nome: "Mestre Louro", tipo: "ritmista", raridade: "lendario", emoji: "🥁", poder: 98, desc: "Ícone da Imperatriz Leopoldinense", escola: "Imperatriz" },
    { id: 3, nome: "Mestre Ciça", tipo: "ritmista", raridade: "epico", emoji: "🥁", poder: 80, desc: "Lendário da Grande Rio", escola: "Grande Rio" },
    { id: 4, nome: "Primeira Surdo Mangueira", tipo: "ritmista", raridade: "epico", emoji: "🥁", poder: 75, desc: "A mais tradicional bateria verde e rosa", escola: "Mangueira" },
    { id: 5, nome: "Ritmista da Mocidade", tipo: "ritmista", raridade: "raro", emoji: "🥁", poder: 60, desc: "Bateria show da Padre Miguel", escola: "Mocidade" },
    { id: 6, nome: "Tamborim da Beija-Flor", tipo: "ritmista", raridade: "raro", emoji: "🥁", poder: 55, desc: "Precisão e garra de Nilópolis", escola: "Beija-Flor" },
    { id: 7, nome: "Ritmista da Vila", tipo: "ritmista", raridade: "comum", emoji: "🥁", poder: 30, desc: "Aprendiz da Vila Isabel", escola: "Vila Isabel" },
    { id: 8, nome: "Pandeirista Novato", tipo: "ritmista", raridade: "comum", emoji: "🥁", poder: 20, desc: "Iniciante na Sapucaí", escola: null" },
    
    // PASSISTAS (Estrelas da Avenida) (8)
    { id: 9, nome: "Selminha Sorriso", tipo: "passista", raridade: "lendario", emoji: "💃", poder: 95, desc: "Rainha absoluta da Mangueira", escola: "Mangueira" },
    { id: 10, nome: "Evelyn Bastos", tipo: "passista", raridade: "lendario", emoji: "💃", poder: 93, desc: "Musa e rainha de bateria icônica", escola: "Mangueira" },
    { id: 11, nome: "Juliana Paes", tipo: "passista", raridade: "epico", emoji: "💃", poder: 80, desc: "Atriz e musa da Grande Rio", escola: "Grande Rio" },
    { id: 12, nome: "Sabrina Sato", tipo: "passista", raridade: "epico", emoji: "💃", poder: 75, desc: "Estrela da Vila Isabel", escola: "Vila Isabel" },
    { id: 13, nome: "Raissa Oliveira", tipo: "passista", raridade: "raro", emoji: "💃", poder: 65, desc: "Rainha de bateria Beija-Flor", escola: "Beija-Flor" },
    { id: 14, nome: "Passista Mirim", tipo: "passista", raridade: "raro", emoji: "💃", poder: 52, desc: "Nova geração da Portela", escola: "Portela" },
    { id: 15, nome: "Componente Apaixonado", tipo: "passista", raridade: "comum", emoji: "💃", poder: 28, desc: "Folião que ama desfilar" },
    { id: 16, nome: "Primeira Passista", tipo: "passista", raridade: "comum", emoji: "💃", poder: 18, desc: "Estreando na Sapucaí" },
    
    // CARNAVALESCOS (Gênios das Alegorias) (7)
    { id: 17, nome: "Joãosinho Trinta", tipo: "carnavalesco", raridade: "lendario", emoji: "🎨", poder: 100, desc: "O maior de todos! Revolucionou o carnaval", escola: "Beija-Flor" },
    { id: 18, nome: "Fernando Pamplona", tipo: "carnavalesco", raridade: "lendario", emoji: "🎨", poder: 98, desc: "Pai da moderna estética carnavalesca", escola: "Salgueiro" },
    { id: 19, nome: "Paulo Barros", tipo: "carnavalesco", raridade: "epico", emoji: "🎨", poder: 85, desc: "Inovador e multicampeão", escola: "Unidos da Tijuca" },
    { id: 20, nome: "Rosa Magalhães", tipo: "carnavalesco", raridade: "epico", emoji: "🎨", poder: 80, desc: "Primeira mulher campeã", escola: "Imperatriz" },
    { id: 21, nome: "Leandro Vieira", tipo: "carnavalesco", raridade: "epico", emoji: "🎨", poder: 78, desc: "Jovem gênio da Mangueira", escola: "Mangueira" },
    { id: 22, nome: "Cenógrafo Promissor", tipo: "carnavalesco", raridade: "raro", emoji: "🎨", poder: 56, desc: "Futuro grande nome" },
    { id: 23, nome: "Assistente de Barracão", tipo: "carnavalesco", raridade: "comum", emoji: "🎨", poder: 32, desc: "Aprendendo o ofício" },
    
    // COMPOSITORES (Poetas do Samba) (7)
    { id: 24, nome: "Silas de Oliveira", tipo: "compositor", raridade: "lendario", emoji: "🎤", poder: 100, desc: "Autor de 'Heróis da Liberdade' - imortal", escola: "Império Serrano" },
    { id: 25, nome: "Martinho da Vila", tipo: "compositor", raridade: "lendario", emoji: "🎤", poder: 95, desc: "Lenda viva do samba", escola: "Vila Isabel" },
    { id: 26, nome: "Zeca Pagodinho", tipo: "compositor", raridade: "epico", emoji: "🎤", poder: 82, desc: "Rei do pagode e do samba", escola: "Mangueira" },
    { id: 27, nome: "Arlindo Cruz", tipo: "compositor", raridade: "epico", emoji: "🎤", poder: 78, desc: "Mestre do samba e do cavaco", escola: "Império Serrano" },
    { id: 28, nome: "Marquinhos Oseas", tipo: "compositor", raridade: "raro", emoji: "🎤", poder: 60, desc: "Compositor premiado", escola: "Salgueiro" },
    { id: 29, nome: "Compositor da Comunidade", tipo: "compositor", raridade: "comum", emoji: "🎤", poder: 30, desc: "Samba-enredo promissor" },
    { id: 30, nome: "Jovem Versejador", tipo: "compositor", raridade: "comum", emoji: "🎤", poder: 26, desc: "Primeira composição" },
    
    // DESTAQUES (Celebridades & Personalidades) (6)
    { id: 31, nome: "Ivete Sangalo", tipo: "destaque", raridade: "lendario", emoji: "⭐", poder: 100, desc: "Rainha do carnaval baiano na Sapucaí", escola: "Grande Rio" },
    { id: 32, nome: "Claudia Leitte", tipo: "destaque", raridade: "epico", emoji: "⭐", poder: 85, desc: "Axé music na avenida", escola: "Mocidade" },
    { id: 33, nome: "Anitta", tipo: "destaque", raridade: "epico", emoji: "⭐", poder: 82, desc: "Girl from Rio arrasa", escola: "Salgueiro" },
    { id: 34, nome: "Paolla Oliveira", tipo: "destaque", raridade: "epico", emoji: "⭐", poder: 80, desc: "Atriz global musa da Grande Rio", escola: "Grande Rio" },
    { id: 35, nome: "Famoso do Momento", tipo: "destaque", raridade: "raro", emoji: "⭐", poder: 60, desc: "Celebridade convidada" },
    { id: 36, nome: "Folião Animado", tipo: "destaque", raridade: "comum", emoji: "⭐", poder: 35, desc: "Pura alegria na avenida" }
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
