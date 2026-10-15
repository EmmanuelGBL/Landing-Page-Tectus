/**
 * Texto da prévia `/v4`, pedida pelo Emmanuel em 15/10/2026: a home montada
 * do zero na estrutura de conversaoextrema.com.br, sem reaproveitar o texto
 * nem o formato da home no ar. Nenhuma constante daqui importa de
 * `conteudo.ts`; os fatos são os mesmos, a redação é nova.
 *
 * Os fatos têm lastro em `Marca/06-Funil-de-Entrada.md`,
 * `Marca/03-Portfolio-e-Precos.md` e no antes e depois confirmado pelo
 * Emmanuel em 25/08/2026. Onde a referência usa número, foto de fundador ou
 * depoimento, aqui entra o equivalente honesto (ver
 * `docs/estrategia-copy-home.md`, seção da v4).
 *
 * Trechos entre `**` saem em destaque branco, como os grifos da referência.
 * O componente `Realce`, em `src/components/v4/ui.tsx`, faz a conversão.
 */

export type TituloDuplo = readonly [string, string];

/* ------------------------------------------------------------------ */
/* Cabeçalho e hero                                                    */
/* ------------------------------------------------------------------ */

export const NAV_V4 = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#clientes", label: "Clientes" },
  { href: "#planos", label: "Planos" },
  { href: "#sobre", label: "Sobre" },
  { href: "#faq", label: "FAQ" },
] as const;

export const CABECALHO_V4 = {
  cta: "Falar no WhatsApp",
  ctaCurto: "WhatsApp",
  mensagem: "Olá! Vim pelo site da Tectus e queria entender como vocês trabalham.",
} as const;

export const HERO_V4 = {
  selo: "Sistemas, automações e IA para pequenas e médias empresas",
  titulo: ["Sistemas e automações sob medida,", "feitos a partir do seu processo."] as TituloDuplo,
  subtitulo:
    "A Tectus encontra onde a sua operação perde tempo e constrói o que resolve: **sistema de gestão, automação de tarefas, atendimento com IA no WhatsApp, integração entre programas e painel de indicadores.** Escopo, valor e prazo ficam fechados por escrito.",
  ctaPrimario: "Quero conversar sobre a minha empresa",
  ctaSecundario: "Ver soluções",
  nota: "Primeira conversa gratuita, de 30 a 40 minutos.",
  mensagem:
    "Olá! Vim pelo site da Tectus. Quero conversar sobre um processo da minha empresa que está travando.",
  /** O painel do hero é ilustração. A legenda diz isso para não virar prova. */
  legenda: "Ilustração de entregas possíveis",
} as const;

/* ------------------------------------------------------------------ */
/* Na prática                                                          */
/* ------------------------------------------------------------------ */

export const PRATICA_V4 = {
  eyebrow: "Na prática",
  titulo: ["Sua empresa cresceu.", "O processo ficou para trás."] as TituloDuplo,
  subtitulo:
    "O pedido chega pelo WhatsApp, vai para uma planilha, alguém copia para o sistema e outra pessoa confere no fim do mês. Funciona até o movimento aumentar. Daí em diante:",
  dores: [
    "O cliente manda mensagem à noite e só tem resposta no dia seguinte, quando já fechou com outro.",
    "A mesma informação é digitada em dois ou três programas, e cada cópia é uma chance de erro.",
    "O relatório do mês é montado à mão, juntando planilhas que não se conversam.",
    "Compra, contratação e preço são decididos no feeling, sem um número confiável na mão.",
  ],
  fecho: ["Ferramenta a sua empresa já tem.", "Falta alguém juntar as peças."] as TituloDuplo,
  fechoApoio: "A Tectus faz esse trabalho com você, da primeira conversa à entrega.",
} as const;

/* ------------------------------------------------------------------ */
/* O que você recebe                                                   */
/* ------------------------------------------------------------------ */

export type FrenteV4 = {
  id: "diagnostico" | "construcao" | "entrega" | "depois";
  eyebrow: string;
  titulo: TituloDuplo;
  texto: string;
  link?: { rotulo: string; href: string };
};

export const SOLUCOES_V4 = {
  eyebrow: "Como funciona",
  titulo: ["Tudo o que a sua empresa precisa para", "tirar o processo da planilha."] as TituloDuplo,
  subtitulo:
    "Um diagnóstico que aponta o gargalo, uma equipe que constrói a solução, **entregas que você acompanha** e suporte quando tudo já estiver no ar.",
  /** Único botão de WhatsApp da seção, na primeira frente. */
  ctaWhatsapp: "Marcar a conversa gratuita",
  mensagem: "Olá! Vim pelo site da Tectus e queria marcar a conversa gratuita. Como funciona?",
  frentes: [
    {
      id: "diagnostico",
      eyebrow: "Diagnóstico",
      titulo: ["Primeiro, descobrimos", "onde a operação trava."],
      texto:
        "Na conversa gratuita você conta como o trabalho anda hoje. Se fizer sentido seguir, o diagnóstico mapeia o processo e mostra **o que vale construir, em que ordem e quanto custa.** Ele custa R$ 500, abatidos do projeto se você fechar e devolvidos se achar que não valeu.",
    },
    {
      id: "construcao",
      eyebrow: "Construção",
      titulo: ["Construímos só o que", "o diagnóstico pediu."],
      texto:
        "Pode ser um sistema de gestão, um agente de IA que atende no WhatsApp, uma automação que manda o relatório sozinha ou a ligação entre dois programas. **Quando a resposta certa é a menor, dizemos isso**, mesmo que o projeto saia mais barato.",
      link: { rotulo: "Ver projetos entregues", href: "#clientes" },
    },
    {
      id: "entrega",
      eyebrow: "Entrega",
      titulo: ["Você acompanha cada entrega,", "do começo ao fim."],
      texto:
        "A proposta traz escopo, valor e prazo por escrito. O desenvolvimento sai em entregas parciais, o pagamento acompanha essas entregas com uma parte na entrada, e **no fim a sua equipe recebe documentação e treinamento.**",
    },
    {
      id: "depois",
      eyebrow: "Depois da entrega",
      titulo: ["Suporte para manter", "tudo funcionando."],
      texto:
        "O que foi construído é da sua empresa. Se quiser, um plano mensal mantém a solução no ar, corrige o que aparecer e **evolui o sistema conforme a empresa cresce.**",
      link: { rotulo: "Ver os planos", href: "#planos" },
    },
  ] satisfies readonly FrenteV4[],
} as const;

/* ------------------------------------------------------------------ */
/* Para quem é                                                         */
/* ------------------------------------------------------------------ */

/**
 * Segmentos com lastro em `01-Publico-e-Oferta.md` (perfil confirmado pelos
 * clientes) e nos projetos descritos por tipo. Cada linha diz o que a Tectus
 * constrói para aquele tipo de empresa, nunca um resultado.
 */
export const PARA_QUEM_V4 = {
  eyebrow: "Para quem é",
  titulo: ["Feito para empresas que", "já passaram da planilha."] as TituloDuplo,
  subtitulo:
    "Para donos e sócios de pequenas e médias empresas que sentem o processo segurar o crescimento e querem **tecnologia com critério, sem montar uma equipe de TI.**",
  segmentos: [
    {
      nome: "Petshops",
      texto: "Cadastro de clientes e pets, agenda e venda on-line no mesmo lugar.",
    },
    {
      nome: "Restaurantes e delivery",
      texto: "Pedido registrado da chegada à entrega, com controle de entrada e saída.",
    },
    {
      nome: "Corretoras de seguros",
      texto: "Página que aparece para quem pesquisa seguro e atendimento que responde rápido.",
    },
    {
      nome: "Escritórios de advocacia",
      texto: "Presença nas buscas e organização dos contatos que chegam pelo site.",
    },
    {
      nome: "Barbearias e salões",
      texto: "Agendamento com lembrete automático para o cliente não esquecer o horário.",
    },
    {
      nome: "Saúde e consultoria corporativa",
      texto: "Sistema para cadastrar as empresas atendidas, enviar formulários e acompanhar respostas.",
    },
    {
      nome: "Empresas de serviço",
      texto: "Orçamento, ordem de serviço e acompanhamento sem nada se perder na conversa.",
    },
    {
      nome: "Igrejas e organizações",
      texto: "Escala de voluntários organizada sem planilha e sem grupo lotado de mensagens.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Clientes                                                            */
/* ------------------------------------------------------------------ */

/**
 * No lugar dos depoimentos da referência. Sem aspas, estrela ou número: o
 * antes e depois confirmado pelo Emmanuel em 25/08/2026, com redação nova.
 */
export const CLIENTES_V4 = {
  eyebrow: "Clientes",
  titulo: ["Empresas que já", "trabalham com a Tectus."] as TituloDuplo,
  subtitulo:
    "Cada projeto começou por uma conversa sobre o que travava. **Veja o que mudou em cada operação.**",
  destaque: {
    cliente: "Priorize",
    segmento: "Saúde emocional corporativa",
    resumo:
      "Começou com um diagnóstico, seguiu com o site e hoje a Priorize opera com sistema próprio.",
    fases: ["Diagnóstico", "Site no ar", "Sistema em operação"],
    rotuloAntes: "Antes",
    rotuloDepois: "Hoje",
    antes: [
      "Relatórios enviados às empresas por formulário do Google.",
      "Contratos de clientes guardados em papel.",
      "Controle espalhado em planilhas separadas.",
    ],
    depois: [
      "Relatórios enviados e respondidos no sistema próprio.",
      "Todas as empresas atendidas cadastradas num lugar só.",
      "Quantos funcionários de cada empresa já responderam, à vista.",
    ],
  },
  outros: [
    {
      cliente: "Patinhas de Ouro",
      tipo: "Marketplace com painel",
      antes: "Não aparecia no Google e não vendia em marketplaces.",
      depois: "Catálogo, pedidos e painel de gestão na mesma plataforma.",
    },
    {
      cliente: "Paladar Gaúcho",
      tipo: "Sistema de pedidos",
      antes: "Pedidos, entradas e saídas sem nenhum controle.",
      depois: "Cada pedido registrado da chegada à entrega.",
    },
    {
      cliente: "Mariah Seguros",
      tipo: "Landing page",
      antes: "Não aparecia para quem buscava seguro no Google.",
      depois: "Página própria para apresentar o serviço e receber contatos.",
    },
    {
      cliente: "Pontes & Rocha Advogados Associados",
      tipo: "Landing page",
      antes: "Fora das buscas de quem procurava um escritório.",
      depois: "Presença digital para ser encontrado por quem pesquisa no Google.",
    },
  ],
  rotuloAntes: "Antes",
  rotuloDepois: "Depois",
  outrosProjetosLegenda: "Outros projetos entregues",
  outrosProjetos: [
    "ERP e CRM com IA no WhatsApp",
    "Plataforma para rede de petshops",
    "Escala de voluntários",
    "Relatórios automáticos",
    "Integração entre programas",
  ],
  cta: "Conversar sobre a minha empresa",
  mensagem:
    "Olá! Vi os projetos no site da Tectus e queria conversar sobre a minha empresa.",
} as const;

/* ------------------------------------------------------------------ */
/* Planos                                                              */
/* ------------------------------------------------------------------ */

/**
 * Os três níveis de recorrência de `Marca/03-Portfolio-e-Precos.md`.
 * Valor em branco, a pedido do Emmanuel. A recorrência é oferecida depois da
 * entrega, e a seção diz isso logo no subtítulo.
 */
export const PLANOS_V4 = {
  eyebrow: "Planos de acompanhamento",
  titulo: ["Escolha como a Tectus", "segue com você."] as TituloDuplo,
  subtitulo:
    "Cada projeto é orçado a partir do diagnóstico. Depois da entrega, um plano mensal mantém a solução funcionando e evoluindo. **O que foi construído é seu, com ou sem plano.**",
  rotuloValor: "Valor em definição",
  periodo: "/mês",
  recursos: [
    "Sistema mantido no ar",
    "Correção de erros",
    "Dúvidas da equipe respondidas",
    "Melhorias contínuas na solução",
    "Participação nas decisões de tecnologia",
  ],
  planos: [
    {
      nome: "Suporte",
      descricao: "Para manter o que foi entregue funcionando, sem surpresa.",
      inclui: 3,
      cta: "Quero o Suporte",
      mensagem: "Olá! Vi o plano Suporte no site da Tectus e queria saber mais.",
    },
    {
      nome: "Evolução",
      descricao: "Tudo do Suporte, mais melhorias contínuas na solução.",
      inclui: 4,
      selo: "Indicado para automações e IA",
      cta: "Quero a Evolução",
      mensagem: "Olá! Vi o plano Evolução no site da Tectus e queria saber mais.",
    },
    {
      nome: "Parceria estratégica",
      descricao: "Tudo da Evolução, mais a Tectus nas decisões de tecnologia da empresa.",
      inclui: 5,
      cta: "Quero a Parceria",
      mensagem: "Olá! Vi o plano Parceria estratégica no site da Tectus e queria saber mais.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Sobre                                                               */
/* ------------------------------------------------------------------ */

/**
 * No lugar da seção dos sócios. O nome do fundador não aparece (diretriz de
 * marca). Os três destaques são fatos, não métricas: seis pilares, atuação
 * nacional remota e a conversa gratuita do funil.
 */
export const SOBRE_V4 = {
  eyebrow: "Quem está por trás",
  titulo: ["Uma empresa de tecnologia", "que começa pelo negócio."] as TituloDuplo,
  rotulo: "Serviços digitais e consultoria em TI",
  nome: "Tectus",
  texto:
    "A Tectus desenvolve **sistemas, automações, integrações, sites e painéis de dados** para pequenas e médias empresas de todo o Brasil, com atendimento remoto. Todo projeto parte de um diagnóstico do problema de negócio, e a tecnologia entra na medida do que esse diagnóstico mostrou.",
  destaques: [
    { valor: "6 frentes", rotulo: "do site ao sistema sob medida" },
    { valor: "Todo o Brasil", rotulo: "atendimento remoto" },
    { valor: "1 conversa", rotulo: "gratuita para começar" },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const FAQ_V4 = {
  eyebrow: "Perguntas frequentes",
  titulo: ["O que costumam perguntar", "na primeira conversa."] as TituloDuplo,
  itens: [
    {
      pergunta: "O que a Tectus faz?",
      resposta:
        "Desenvolve sistemas de gestão, automações, agentes de IA para WhatsApp, integrações entre programas, sites e painéis de dados para pequenas e médias empresas. Todo projeto começa por um diagnóstico do problema, para que a solução tenha a medida certa.",
    },
    {
      pergunta: "Preciso saber o que quero para começar?",
      resposta:
        "Não. A primeira conversa serve para entender como a sua operação funciona hoje. Você descreve o que trava, e nós dizemos se faz sentido seguir e por onde.",
    },
    {
      pergunta: "Quanto custa?",
      resposta:
        "A primeira conversa é gratuita e dura de 30 a 40 minutos. Se fizer sentido seguir, o diagnóstico custa R$ 500, abatidos do projeto se você fechar e devolvidos se achar que não valeu. O projeto é orçado a partir do diagnóstico, com escopo, valor e prazo por escrito.",
    },
    {
      pergunta: "Como é o pagamento do projeto?",
      resposta:
        "Uma parte na entrada e o restante acompanhando as entregas parciais, conforme o que estiver escrito na proposta.",
    },
    {
      pergunta: "Como funciona o atendimento a distância?",
      resposta:
        "Todo o trabalho é remoto, com conversas por WhatsApp e videochamada e entregas acompanhadas on-line. A Tectus atende empresas de todo o Brasil.",
    },
    {
      pergunta: "Minha equipe vai conseguir usar?",
      resposta:
        "Na entrega, a sua equipe recebe documentação e treinamento. Se surgir dúvida depois, os planos de acompanhamento cobrem isso.",
    },
    {
      pergunta: "Fico preso à Tectus depois da entrega?",
      resposta:
        "Não. O que foi construído é da sua empresa, com documentação. O plano de acompanhamento é opcional.",
    },
    {
      pergunta: "Qual a diferença entre os planos?",
      resposta:
        "O Suporte mantém a solução no ar, corrige erros e responde dúvidas da equipe. A Evolução inclui tudo isso e melhorias contínuas. A Parceria estratégica soma a participação da Tectus nas decisões de tecnologia da empresa.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Fechamento, rodapé e botão flutuante                                */
/* ------------------------------------------------------------------ */

export const CTA_FINAL_V4 = {
  eyebrow: "Comece agora",
  titulo: ["Pronto para tirar o processo", "da planilha?"] as TituloDuplo,
  subtitulo:
    "Conte em poucas linhas o que está travando. **A primeira conversa é gratuita**, e você sai dela sabendo se faz sentido seguir.",
  cta: "Quero conversar sobre a minha empresa",
  formulario: {
    titulo: "Prefere escrever?",
    apoio: "Preencha e a mensagem abre pronta no WhatsApp.",
    nome: { rotulo: "Seu nome", exemplo: "Como podemos te chamar" },
    empresa: { rotulo: "Empresa", exemplo: "Opcional" },
    gargalo: {
      rotulo: "O que está travando hoje?",
      exemplo: "Ex.: os pedidos chegam pelo WhatsApp e alguém digita tudo de novo no sistema.",
    },
    erro: "Conte um pouco mais, em pelo menos uma frase, para a conversa já começar no ponto certo.",
    botao: "Abrir no WhatsApp",
    origem: "Olá! Vim pelo site da Tectus.",
  },
} as const;

export const AJUDA_V4 = {
  botao: "Falar com a Tectus",
  titulo: "Como podemos ajudar?",
  apoio: "Escolha por onde prefere continuar.",
  opcoes: [
    {
      rotulo: "Quero começar um projeto",
      mensagem: "Olá! Vim pelo site da Tectus e quero começar um projeto.",
    },
    {
      rotulo: "Já sou cliente",
      mensagem: "Olá! Já sou cliente da Tectus e preciso de ajuda.",
    },
  ],
  fechar: "Fechar",
} as const;
