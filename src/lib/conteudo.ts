/**
 * Conteúdo editorial da página.
 * As skills `persuasao` e `revisao-textual` editam este arquivo.
 * Layout e JSX ficam fora daqui.
 *
 * Regra que vale para tudo neste arquivo: nenhum número, prazo, percentual
 * ou depoimento sem lastro documentado. Ver CLAUDE.md, seção de veracidade.
 */

/* ------------------------------------------------------------------ */
/* 02 · Hero                                                           */
/* ------------------------------------------------------------------ */

/**
 * O H1 fala do leitor, não da Tectus. O subtítulo segue a estrutura
 * sintoma, consequência, ponte: lista o que ele reconhece, nomeia o que
 * isso custa, e só então diz o que a Tectus faz de diferente.
 */
export type ConteudoHero = {
  /** Só nas rotas de oferta: nomeia o que a pessoa buscou. */
  eyebrow?: string;
  titulo: { linha1: string; linha2: string };
  subtitulo: string;
  ctaPrimario: string;
  ctaNota: string;
  ctaSecundario: string;
};

export const HERO: ConteudoHero = {
  /**
   * Duas linhas separadas porque a segunda recebe tratamento visual próprio
   * no hero. A quebra é informação: a virada da frase está entre elas.
   *
   * A versão anterior ("Sua empresa cresceu. Seus processos continuaram os
   * mesmos.") descrevia a categoria do problema. Esta nomeia a cena e ainda
   * tira a culpa da equipe, que é a leitura defensiva mais comum de quem
   * chega aqui. Quem se reconhece na frase já concordou com o diagnóstico
   * antes de saber que existe uma empresa vendendo alguma coisa.
   */
  titulo: {
    linha1: "Sua equipe não é lenta.",
    linha2: "Ela refaz o que já foi feito.",
  },
  /**
   * Terceiro encurtamento: 60 palavras, depois 44, agora 26.
   *
   * As três cenas que abriam o parágrafo ("informação digitada duas vezes",
   * "relatório montado à mão", "fechamento que come o fim de semana") saíram
   * por duplicação, não por serem fracas. A seção seguinte é uma lista de
   * seis cenas dessas, com caixa de marcar, e é lá que elas convencem. Gastar
   * a primeira dobra fazendo o trabalho da segunda seção custa duas vezes:
   * a dobra fica cheia e a lista chega sem novidade.
   *
   * Sobraram as duas únicas coisas que o subtítulo precisa fazer depois de um
   * H1 que já mostrou a cena: nomear o custo e dizer o que a Tectus faz de
   * diferente. "Retrabalho" pega carona no H1, que acabou de descrever um.
   */
  subtitulo:
    "Retrabalho não aparece no balanço, mas sai da sua margem todo mês. A Tectus começa descobrindo onde a operação trava, antes de propor qualquer sistema.",
  /**
   * "Quero falar no WhatsApp" nomeava o canal e não o que acontece nele. O
   * visitante não sabia se ia receber orçamento, abordagem de venda ou uma
   * conversa. O rótulo agora diz a ação, e a nota abaixo diz o que ela custa
   * em tempo e dinheiro, com os dois fatos do funil de entrada
   * (`Marca/06-Funil-de-Entrada.md`). O R$ 500 do diagnóstico não entra aqui:
   * no topo da página "pague" converte muito pior que "converse".
   */
  ctaPrimario: "Quero marcar uma conversa",
  ctaNota: "Pelo WhatsApp. A primeira conversa leva de 30 a 40 minutos e não tem custo.",
  ctaSecundario: "Entender o método",
};

/* ------------------------------------------------------------------ */
/* 02b · Compromissos                                                  */
/* ------------------------------------------------------------------ */

/**
 * Faixa fina logo abaixo do hero. Substitui a prova social que a marca ainda
 * não tem por compromisso verificável de processo.
 *
 * Morava dentro do hero, e foi de lá que saiu. A primeira dobra acumulava
 * selo, título, subtítulo, dois botões, diagrama e mais três linhas de
 * promessa: informação demais para o instante em que o visitante ainda está
 * decidindo se fica. Aqui embaixo o mesmo conteúdo vira uma batida própria
 * de leitura, e a dobra volta a ter um assunto só.
 *
 * Os três têm lastro no CLAUDE.md (promessas confirmadas em 20/08/2026 e
 * modelo comercial). Nenhum número, nenhum depoimento.
 *
 * O primeiro item chamava-se "Diagnóstico antes do código", e o corpo dele
 * repetia "onde a operação trava", que o subtítulo do hero já diz três linhas
 * acima. Dois defeitos numa frase só: a construção "X antes de Y" é o mesmo
 * tique que derrubou o selo do hero, e o mesmo gancho em duas dobras seguidas
 * gasta o argumento. A versão atual troca a repetição pelo contraste que o
 * leitor entende sozinho: proposta feita para ele, não pacote de prateleira.
 */
export const COMPROMISSOS = {
  itens: [
    {
      titulo: "Diagnóstico primeiro",
      texto: "Nenhuma linha de código é escrita antes de mapearmos como a operação funciona hoje.",
    },
    {
      titulo: "Entregas parciais",
      texto: "O pagamento acompanha as etapas, nunca o valor inteiro adiantado.",
    },
    {
      titulo: "Sua equipe treinada",
      texto: "A entrega inclui documentação e treinamento de quem vai operar.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 02c · Logos de clientes                                             */
/* ------------------------------------------------------------------ */

/**
 * Fonte única das logos de clientes.
 *
 * Só entram os clientes que o Emmanuel liberou para aparecer com nome e com
 * marca (ver CLAUDE.md). Paladar Gaúcho não tem arquivo de logo, então
 * aparece só com o nome escrito, no card da seção de empresas atendidas.
 *
 * Havia também uma faixa dessas mesmas logos logo abaixo do hero. Ela saiu
 * em 24/08/2026: as quatro marcas já aparecem nos cards da seção de empresas
 * atendidas, onde vêm acompanhadas do que foi entregue, e a faixa repetia a
 * informação no ponto da página em que a primeira dobra já estava carregada
 * demais. Marca sem contexto ao lado é decoração; marca com a entrega escrita
 * embaixo é prova.
 *
 * Exibir a marca continua não autorizando afirmar recomendação, satisfação
 * nem resultado.
 *
 * Os arquivos vêm de `npm run logos`, que apara a moldura transparente e
 * normaliza tudo em 96px de altura (48px de exibição em tela retina). As
 * larguras são as reais de cada arquivo gerado: passá-las evita que o layout
 * pule enquanto as imagens carregam.
 *
 * Uso das marcas autorizado pelo Emmanuel em 21/08/2026.
 */
export const LOGOS = {
  priorize: { nome: "Priorize", arquivo: "/clientes/priorize.webp", largura: 205, altura: 96 },
  mariah: {
    nome: "Mariah Seguros",
    arquivo: "/clientes/mariah-seguros.webp",
    largura: 401,
    altura: 96,
  },
  pontesRocha: {
    nome: "Pontes & Rocha Advogados Associados",
    arquivo: "/clientes/pontes-e-rocha.webp",
    largura: 400,
    altura: 96,
  },
  patinhas: {
    nome: "Patinhas de Ouro",
    arquivo: "/clientes/patinhas-de-ouro.webp",
    largura: 191,
    altura: 96,
  },
} as const;

/* ------------------------------------------------------------------ */
/* 03 · Sintomas                                                       */
/* ------------------------------------------------------------------ */

export type Sintoma = {
  /**
   * Chave estável do sintoma. As rotas de oferta escolhem quais sintomas
   * mostram por ela, e o componente mapeia o ícone por ela, para que reordenar
   * ou reescrever a lista não troque ícone nem quebre filtro.
   */
  id: string;
  texto: string;
  /**
   * O mesmo sintoma na voz de quem envia a mensagem.
   *
   * Na tela o texto fala com o leitor ("Você refaz no sistema..."). Na
   * mensagem do WhatsApp quem fala é ele, e reaproveitar a segunda pessoa
   * fazia o lead abrir a conversa dizendo "Você refaz no sistema o que a
   * equipe já digitou", que lê como acusação à Tectus. A primeira impressão
   * do lead não pode depender de o leitor relevar um erro de pessoa.
   */
  naPrimeiraPessoa: string;
  /** Pilar que resolve este sintoma. Usado como legenda do card. */
  resolvePor: string;
};

/**
 * O título pergunta "quantas", não "alguma". A diferença não é estilo: "alguma"
 * aceita zero como resposta e deixa o leitor sair da seção sem se comprometer,
 * enquanto "quantas" pressupõe contagem e engata direto no gesto de marcar e no
 * fecho, que separa uma de duas ou mais. "Cenas" saiu junto por ser vocabulário
 * nosso: ninguém chama o próprio dia de trabalho de cena.
 */
export const SINTOMAS_TITULO = {
  eyebrow: "Diagnóstico rápido",
  titulo: "Quantas dessas acontecem na sua empresa?",
  subtitulo:
    "Nenhuma é sinal de equipe ruim. São sinais de uma operação que cresceu mais rápido que o processo.",
  /** Convite para interagir. Sem ele o visitante não percebe que pode marcar. */
  instrucao: "Marque as que você reconhece.",
  /**
   * O fecho reenquadra o problema e fecha a saída fácil ("a equipe se esforça
   * mais e resolve"), que é a alternativa silenciosa contra a qual esta
   * página compete.
   *
   * Três versões porque a seção virou interativa: o texto responde ao que a
   * pessoa marcou. Reconhecimento próprio convence mais que afirmação nossa,
   * e quem acabou de marcar três itens já concordou com o diagnóstico antes
   * de ler o argumento.
   */
  fechoUm: "Uma só já custa horas da sua semana. E vai custar de novo na semana que vem.",
  fecho:
    "Duas ou mais, e não é caso isolado. É a soma delas que costuma segurar o crescimento.",
  ctaMarcados: "Conversar sobre o que marquei",
} as const;

export const SINTOMAS: readonly Sintoma[] = [
  {
    id: "redigitar",
    texto: "Você refaz no sistema o que a equipe já digitou no WhatsApp.",
    naPrimeiraPessoa: "Refaço no sistema o que a equipe já digitou no WhatsApp.",
    resolvePor: "Integrações",
  },
  {
    id: "fechamento",
    texto: "Fechar o mês consome um fim de semana inteiro.",
    naPrimeiraPessoa: "Fechar o mês consome um fim de semana inteiro.",
    resolvePor: "Dados e Inteligência",
  },
  {
    id: "tarefa-manual",
    texto: "A mesma tarefa é feita à mão toda semana, e ninguém questiona mais.",
    naPrimeiraPessoa: "A mesma tarefa é feita à mão toda semana, e ninguém questiona mais.",
    resolvePor: "Automação de Processos",
  },
  {
    id: "planilhas",
    texto: "A planilha que controlava tudo virou três planilhas em que ninguém confia.",
    naPrimeiraPessoa: "A planilha que controlava tudo virou três planilhas em que ninguém confia.",
    resolvePor: "Sistemas Sob Medida",
  },
  {
    id: "atendimento",
    /**
     * A cena de atendimento, acrescentada em 31/08/2026.
     *
     * Entrou porque a página não tinha uma linha em que quem procura chatbot
     * ou IA se reconhecesse, e é aqui que o reconhecimento acontece. Fica na
     * quinta posição de propósito: as quatro primeiras são dores internas, e
     * esta abre o par de dores que o cliente do cliente sente, junto com a de
     * Presença Digital logo abaixo.
     *
     * O texto nomeia a cena e o custo dela sem número: "desiste de esperar" é
     * venda perdida escrita sem percentual inventado.
     */
    texto: "A mesma pergunta chega no WhatsApp o dia inteiro, e quem tem pressa desiste de esperar.",
    naPrimeiraPessoa:
      "A mesma pergunta chega no WhatsApp o dia inteiro, e quem tem pressa desiste de esperar.",
    // Qualificado além do nome do pilar: quando a mensagem chegar, o parêntese
    // já diz que o caminho provável é IA no atendimento, não automação interna.
    resolvePor: "Automação de Processos, com IA no atendimento",
  },
  {
    id: "presenca",
    texto: "Um cliente pesquisa sua empresa antes de fechar e não encontra nada que passe confiança.",
    naPrimeiraPessoa:
      "Um cliente pesquisa minha empresa antes de fechar e não encontra nada que passe confiança.",
    resolvePor: "Presença Digital",
  },
  {
    id: "por-onde-comecar",
    texto: "Você sabe que precisa mudar alguma coisa, mas não sabe por onde começar.",
    naPrimeiraPessoa: "Sei que preciso mudar alguma coisa, mas não sei por onde começar.",
    resolvePor: "Consultoria Tecnológica",
  },
] as const;

/* ------------------------------------------------------------------ */
/* 04 · Método                                                         */
/* ------------------------------------------------------------------ */

/**
 * O coração da página, e a única seção onde a confiança é construída sem
 * prova social. Passa no teste do concorrente: trocar "Tectus" por qualquer
 * software house torna os dois últimos parágrafos falsos, porque quem cobra
 * por hora tem incentivo oposto.
 */
export const METODO = {
  eyebrow: "O diferencial",
  titulo: ["Primeiro entendemos.", "Depois construímos."],
  paragrafos: [
    "Dinheiro perdido em tecnologia raramente vai embora em código mal feito. Vai em sistema caro que resolveu o problema errado.",
    "Por isso todo projeto começa por diagnóstico, não por orçamento. Primeiro olhamos onde a operação emperra e quanto isso custa.",
  ],
  /**
   * Fecho em destaque. Escrito como compromisso, não como caso passado:
   * o modelo de cobrança por problema resolvido está documentado, uma
   * anedota de projeto reduzido não está. Ver regra de veracidade.
   */
  fecho:
    "Se a resposta certa for uma automação simples no lugar do sistema que você imaginava, é ela que vamos recomendar. Quem cobra por hora não tem esse incentivo.",
  cta: "Conversar sobre o meu caso",
  /**
   * Título do cartão lateral.
   *
   * Ali morava a etimologia da marca ("Tectus vem do latim: construído").
   * Saiu em 24/08/2026 a pedido do Emmanuel, e a razão vale como regra: era
   * o único trecho da página que falava da Tectus para a Tectus. Ninguém
   * contrata software por origem de nome. O espaço foi para o que o leitor
   * ganha, que já estava logo abaixo e merecia o topo do cartão.
   */
  compromissosTitulo: "O que fica combinado antes de começar.",
  compromissos: [
    "Cobramos por problema resolvido, nunca por hora trabalhada.",
    "O escopo e o valor são fechados antes de começar.",
    "Se a solução certa for menor, é ela que vamos recomendar.",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 05 · Pilares                                                        */
/* ------------------------------------------------------------------ */

export type Pilar = {
  numero: string;
  nome: string;
  /** Abre pelo problema, nunca pelo nome da tecnologia. */
  problema: string;
  descricao: string;
  /** Tag qualitativa de contratação. Nunca valor em reais. */
  contratacao: string;
  /** O pilar 06 é a porta de entrada do funil e recebe destaque próprio. */
  destaque?: boolean;
};

/**
 * Título da seção. Estava chumbado no JSX, o que deixava a seção fora do
 * alcance das skills de texto. Migrado em 24/08/2026 pelo mesmo motivo que
 * levou `PROJETOS_TITULO` e `CTA_FINAL` para cá.
 */
export const PILARES_TITULO = {
  /**
   * Reenquadrada em 06/10/2026. Como vitrine ("O que construímos"), a seção
   * desfazia o que a página inteira ensina: depois de ouvir que não precisa
   * saber o que comprar, o visitante recebia seis coisas para escolher.
   * Agora ela mostra o que pode sair do diagnóstico, e vem depois do "Como
   * funciona", onde o diagnóstico já foi explicado. O título antigo também
   * caía no colon-drop ("Seis frentes, um critério: ..."), vetado pela regra 2
   * de escrita.
   */
  eyebrow: "O que pode sair do diagnóstico",
  titulo: "Seis caminhos possíveis. O diagnóstico aponta o seu.",
  subtitulo:
    "Você não precisa escolher antes de conversar. Pode ser uma frente só, e menor do que você imaginava.",
} as const;

export const PILARES: readonly Pilar[] = [
  {
    numero: "01",
    nome: "Presença Digital",
    problema: "Sua empresa não existe direito na internet.",
    descricao: "Site que explica o que você faz e transforma visitante em contato. Canal de venda, não cartão de visitas.",
    contratacao: "Pacote fechado",
  },
  {
    numero: "02",
    nome: "Automação de Processos",
    problema: "Sua equipe repete a mesma tarefa manual todo dia.",
    /**
     * O atendimento por IA entra aqui, na descrição, e não como pilar próprio.
     * Mesmo precedente do pilar 05, onde "Dashboard" foi para a descrição sem
     * mexer no nome da frente: o nome nomeia, a descrição entrega. Chatbot que
     * responde a mesma pergunta o dia inteiro é tarefa repetitiva automatizada,
     * que é exatamente o que este pilar já vende. Ver `03-Portfolio-e-Precos.md`,
     * que veda pilar 07.
     *
     * A oração final não é enfeite: o medo de robô atendendo cliente é a
     * objeção número um de quem cogita chatbot, e ela é desarmada aqui, no
     * ponto em que aparece, e não numa seção adiante que o leitor pode pular.
     */
    descricao:
      "O que alguém repete todo dia passa a acontecer sozinho. No atendimento, a IA responde a pergunta de sempre e chama uma pessoa quando o caso foge do previsto.",
    contratacao: "Pacote fechado, com módulo extra por canal",
  },
  {
    numero: "03",
    nome: "Sistemas Sob Medida",
    problema: "O negócio cresceu e a planilha não aguenta mais.",
    descricao: "Construído para a sua operação, não um pacote genérico que você precisa contornar. Cresce junto com a empresa.",
    contratacao: "Orçamento sob escopo",
  },
  {
    numero: "04",
    nome: "Integrações",
    problema: "Suas ferramentas não conversam entre si.",
    descricao: "O dado que entra num lugar aparece no outro sem ninguém redigitar. Menos retrabalho, menos erro, menos coisa perdida.",
    contratacao: "Pacote fechado",
  },
  {
    numero: "05",
    nome: "Dados e Inteligência",
    problema: "Você decide no feeling porque não tem número na mão.",
    descricao:
      "Dashboard que mostra como a operação está indo agora, não no relatório que alguém monta à mão no fim do mês.",
    contratacao: "Pacote fechado",
  },
  {
    numero: "06",
    nome: "Consultoria Tecnológica",
    problema: "Você sente que precisa de algo, mas não sabe o quê.",
    descricao: "Entendemos a operação, encontramos onde ela trava e mostramos o que resolve. O valor é creditado no projeto.",
    contratacao: "Entrada acessível, creditada no projeto",
    destaque: true,
  },
] as const;

/* ------------------------------------------------------------------ */
/* 06 · Processo                                                       */
/* ------------------------------------------------------------------ */

export type Etapa = {
  numero: string;
  titulo: string;
  descricao: string;
};

/** Título da seção. Migrado do JSX em 24/08/2026. */
export const PROCESSO_TITULO = {
  eyebrow: "Como funciona",
  titulo: "Quatro etapas, nenhuma surpresa no meio.",
  subtitulo:
    "Você sabe onde está, o que vem depois e quanto custa antes de o desenvolvimento começar.",
} as const;

/**
 * Fecho da seção. Estava chumbado no JSX do componente, com 39 palavras.
 * Veio para cá e caiu para 21: as orações de ligação ("na prática", "e o que
 * você paga nele") não carregavam argumento nenhum.
 *
 * Até 06/10/2026 dizia "O diagnóstico é a porta de entrada" e o botão era
 * "Começar pelo diagnóstico". O funil fechado em 03/09/2026 mudou a porta: a
 * entrada é a conversa gratuita, e o diagnóstico (pago) é oferecido nela. O
 * botão antigo pedia, sem dizer, a etapa que custa dinheiro. "Dizer com
 * franqueza se dá para ajudar" é o que a conversa entrega, segundo o funil.
 */
export const PROCESSO_FECHO = {
  destaque: "O primeiro passo não custa nada.",
  texto: "Você sai da conversa com uma leitura inicial do problema e sabendo se faz sentido seguir.",
  cta: "Marcar a primeira conversa",
} as const;

/**
 * Reescrito em 06/10/2026 para mostrar o funil de entrada inteiro
 * (`Marca/06-Funil-de-Entrada.md`). Antes a etapa 01 era o diagnóstico, e a
 * conversa gratuita, que é a porta de verdade, não aparecia em lugar nenhum.
 * O visitante via "diagnóstico" sem preço e concluía o pior.
 *
 * Esta é a única seção da página com o R$ 500 (além das duas respostas de
 * preço do FAQ), de propósito: aqui o preço chega depois da conversa grátis, já
 * com o abatimento e a devolução ao lado, e lê como etapa da jornada em vez
 * de taxa de entrada. No hero ele espantaria quem ainda não confia.
 *
 * Quatro etapas e não cinco: o layout é uma linha do tempo de quatro colunas,
 * e "Construção" e "Entrega" sempre andaram juntas no texto.
 */
export const PROCESSO: readonly Etapa[] = [
  {
    numero: "01",
    titulo: "Conversa",
    descricao: "De 30 a 40 minutos, sem custo. Entendemos o problema e dizemos com franqueza se dá para ajudar.",
  },
  {
    numero: "02",
    titulo: "Diagnóstico",
    descricao: "R$ 500 fixos para mapear onde a operação trava e o que resolver primeiro. O valor é abatido do projeto, e devolvido se você achar que não valeu.",
  },
  {
    numero: "03",
    titulo: "Proposta",
    descricao: "Escopo, valor e prazo fechados antes da primeira linha de código.",
  },
  {
    numero: "04",
    titulo: "Construção e entrega",
    descricao: "Entregas parciais, com o pagamento acompanhando as etapas. No fim, sua equipe sai treinada e o que foi construído é seu.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* 07 · Case âncora                                                    */
/* ------------------------------------------------------------------ */

/**
 * Único case contado por inteiro, porque é o único que percorre a escada
 * completa. Autorizado pelo Emmanuel em 20/08/2026.
 * Proibido acrescentar aspas, percentual ou prazo: nada disso foi medido.
 */
export const CASE_ANCORA = {
  cliente: "Priorize",
  segmento: "Saúde emocional corporativa",
  chamada: "Começou por um diagnóstico. Hoje as três etapas estão no ar.",
  contexto:
    "A Priorize atende empresas na adequação a riscos psicossociais. A pergunta inicial não era qual tecnologia usar. Era o que o negócio precisava primeiro.",
  /**
   * Antes e depois, confirmado pelo Emmanuel em 25/08/2026.
   *
   * Esta é a única prova de resultado que a página tem, e ela existe porque
   * o estado anterior foi confirmado, não deduzido. Todos os itens descrevem
   * mudança de ferramenta e de capacidade, nunca ganho medido: não há
   * percentual, hora economizada nem prazo, porque nada disso foi medido.
   *
   * A linha sobre contagem de funcionários descreve o que o sistema permite
   * ver, não um número. "Quantos já responderam" é recurso, não estatística.
   */
  antesDepois: {
    titulo: "O que mudou na operação",
    rotuloAntes: "Antes",
    rotuloDepois: "Hoje",
    antes: [
      "Relatório enviado às empresas por formulário do Google.",
      "Carteira de clientes controlada por contrato em papel.",
      "Planilhas soltas, que não conversavam entre si.",
    ],
    depois: [
      "Relatório enviado e preenchido dentro do sistema da própria Priorize.",
      "Empresas atendidas cadastradas e ligadas num lugar só.",
      "Quantos funcionários cada empresa tem, e quantos já responderam.",
    ],
  },
  etapas: [
    {
      fase: "Diagnóstico",
      estado: "Concluído",
      texto: "Entender o serviço e o fluxo de atendimento, antes de qualquer proposta técnica.",
    },
    {
      fase: "Presença digital",
      estado: "No ar",
      texto: "A landing page que apresenta o serviço e recebe as empresas interessadas.",
    },
    {
      fase: "Sistema",
      // Era "Em planejamento" até 25/08/2026, quando o Emmanuel confirmou
      // que o sistema entrou em uso e substituiu o formulário do Google.
      estado: "Em operação",
      texto: "Cadastro das empresas atendidas, envio dos relatórios e acompanhamento de quem já respondeu.",
    },
  ],
  /**
   * O fecho é o argumento inteiro da página em duas frases. Descreve a
   * sequência real dos fatos, sem métrica, porque nenhuma foi medida.
   */
  fecho:
    "Nenhuma etapa foi vendida de antemão. Cada uma nasceu do que a anterior mostrou ser necessário.",
  /**
   * Estava chumbado no JSX como "Quero esse tipo de conversa", que não dizia
   * que conversa era essa. Quem acabou de ler a operação de outra empresa
   * está pensando na própria, e o botão nomeia isso.
   */
  cta: "Conversar sobre a minha operação",
} as const;

/* ------------------------------------------------------------------ */
/* 08 · Empresas atendidas                                             */
/* ------------------------------------------------------------------ */

/**
 * Somente clientes autorizados a aparecer com nome. Ver CLAUDE.md.
 *
 * As descrições dizem o que foi construído, não o que existia antes.
 * A versão anterior afirmava estados anteriores ("pedido anotado no papel",
 * "vendas espalhadas") que não estão documentados em lugar nenhum. Se o
 * Emmanuel confirmar cada um deles, dá para reescrever no formato antes e
 * depois, que persuade mais. Até lá, descrever a entrega é o que tem lastro.
 */
/**
 * Título da seção. Estava chumbado no JSX, o que impedia as skills de texto
 * de trabalhar sem tocar em layout. Trazido para cá junto com a renomeação.
 *
 * "Outros projetos" foi trocado por "Empresas atendidas" a pedido do
 * Emmanuel em 21/08/2026: o rótulo antigo lia como portfólio de freelancer,
 * não como carteira de clientes de empresa, e é a carteira que a seção mostra.
 */
export const PROJETOS_TITULO = {
  eyebrow: "Empresas atendidas",
  titulo: "Empresas de segmentos diferentes, o mesmo ponto de partida.",
  // Não rotula o ramo de cada cliente ("restaurante", "corretora"): nenhum
  // dos dois está documentado, é inferência a partir do nome. Também não
  // afirma o estado anterior de nenhuma delas.
  subtitulo:
    "Uma não aparecia para quem procurava no Google. Outra não tinha controle dos próprios pedidos. Cada caso começou pelo mesmo lugar: entender o que estava faltando.",
  rotuloAntes: "Antes",
  rotuloDepois: "Depois",
} as const;

export type Projeto = {
  cliente: string;
  tipo: string;
  /**
   * Estado anterior do cliente, confirmado pelo Emmanuel em 25/08/2026.
   * Descreve o que faltava, nunca um número. Sem esse campo a seção só
   * dizia o que foi entregue, que é descrição, não prova.
   */
  antes: string;
  resolveu: string;
  /**
   * Logo da empresa, quando existe arquivo. É o que dá cara corporativa à
   * seção: card com marca real pesa diferente de card com ícone genérico.
   * Opcional porque nem todo cliente autorizado tem arte disponível, e
   * inventar uma seria pior que não mostrar.
   */
  logo?: (typeof LOGOS)[keyof typeof LOGOS];
};

export const PROJETOS: readonly Projeto[] = [
  {
    cliente: "Patinhas de Ouro",
    logo: LOGOS.patinhas,
    tipo: "Marketplace com painel",
    antes: "Sem visibilidade no Google e fora dos marketplaces.",
    resolveu: "Catálogo, pedidos e acompanhamento numa interface só, com painel de gestão para enxergar o movimento.",
  },
  {
    cliente: "Paladar Gaúcho",
    tipo: "Sistema de pedidos",
    antes: "Pedidos, entradas e saídas sem controle nenhum.",
    resolveu: "O pedido registrado do recebimento à entrega, sem depender de anotação avulsa ou de memória.",
  },
  {
    cliente: "Mariah Seguros",
    logo: LOGOS.mariah,
    tipo: "Landing page",
    antes: "Sem aparecer para quem procurava seguro no Google.",
    resolveu: "Canal próprio para apresentar o serviço e receber contato, em vez de depender só de indicação.",
  },
  {
    // Grafia confirmada pelo Emmanuel em 25/08/2026. A página usava três
    // formas do mesmo nome, duas delas no mesmo card. Esta é a do cliente.
    cliente: "Pontes & Rocha Advogados Associados",
    logo: LOGOS.pontesRocha,
    tipo: "Landing page",
    antes: "Sem presença nas buscas de quem procurava um escritório.",
    resolveu: "Presença à altura do escritório, para quem pesquisa antes de decidir com quem vai falar.",
  },
] as const;

/**
 * Os outros projetos entregues, descritos por tipo e sem nome.
 *
 * Existe porque a seção mostrava quatro cards e só quatro, o que dava a
 * entender que a carteira inteira são quatro clientes. Não são. A restrição
 * é de autorização, não de volume: só cinco clientes liberaram o nome (ver
 * CLAUDE.md), e os demais só podem aparecer descritos pelo tipo de entrega.
 *
 * A frase que abre a lista transforma a limitação em postura, e é verdade:
 * cliente que não autorizou não aparece. Isso diz mais sobre como a Tectus
 * trata informação de cliente do que qualquer adjetivo diria.
 *
 * Regra que continua valendo: descrever o tipo de entrega é permitido,
 * atribuir resultado, prazo ou opinião do cliente não é.
 */
export const PROJETOS_OUTROS = {
  legenda: "Outros exemplos de projetos entregues:",
  // A entrega com IA subiu para o topo da lista em 31/08/2026. Custa zero
  // palavra e é a única prova de capacidade em IA que a página tem, então
  // ficar em segundo lugar numa lista de seis era desperdício de posição.
  itens: [
    "ERP e CRM com atendimento por IA no WhatsApp",
    "SaaS multiempresa para rede de petshops",
    "Landing page para escritório de advocacia",
    "Mini-sistema de escalas de voluntários",
    "Automação de relatórios recorrentes",
    "Integração entre ferramentas que não conversavam",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* 09 · FAQ                                                            */
/* ------------------------------------------------------------------ */

export type FaqItem = { pergunta: string; resposta: string };

/** Título da seção. Migrado do JSX em 24/08/2026. */
export const FAQ_TITULO = {
  eyebrow: "Dúvidas",
  titulo: "O que costuma travar a decisão.",
  subtitulo: "Se a sua pergunta não está aqui, ela cabe numa conversa de WhatsApp.",
} as const;

export const FAQ: readonly FaqItem[] = [
  {
    pergunta: "Quanto custa?",
    resposta:
      "A primeira conversa não tem custo. Se fizer sentido seguir, o diagnóstico custa R$ 500 fixos, abatidos integralmente do projeto. O valor do projeto sai do diagnóstico, porque orçamento fechado antes de entender o problema costuma vir errado, para mais ou para menos.",
  },
  {
    /**
     * Acrescentada em 06/10/2026. "Quanto custa?" diz o preço, esta diz o que
     * ele compra, que é a objeção seguinte de quem nunca pagou para descobrir
     * o que precisa. A descrição do entregável é a de
     * `Marca/06-Funil-de-Entrada.md`, sem acrescentar nada.
     */
    pergunta: "Por que pagar R$ 500 pelo diagnóstico?",
    resposta:
      "Porque nele o trabalho já começa. Mapeamos o processo, encontramos onde o tempo e o dinheiro vazam e entregamos um documento com a recomendação e o escopo do que fazer. Se você fechar o projeto, os R$ 500 são abatidos. Se achar que não valeu, devolvemos o valor.",
  },
  {
    pergunta: "E se eu não souber o que preciso?",
    resposta:
      "Esse é o ponto de partida mais comum, e não é problema nenhum. Descobrir o que precisa ser feito é justamente o trabalho do diagnóstico. Você chega com o incômodo, não com a especificação técnica.",
  },
  {
    /**
     * Acrescentada em 31/08/2026. É a única pergunta do FAQ que existe tanto
     * para desarmar objeção quanto para ser encontrada: o FAQ vira `FAQPage`
     * no structured data, então esta resposta é o lugar em que a palavra
     * aparece para quem procura por IA sem conhecer a marca.
     *
     * O "sim" tem lastro: `Marca/04-Cases.md` registra ERP com CRM e IA no
     * WhatsApp, e a própria página já publica essa entrega em
     * `PROJETOS_OUTROS`. Nenhum número, nenhum nome de cliente.
     *
     * A resposta recusa metade do pedido de propósito. Dizer onde IA não vale
     * a pena é o que impede a seção de virar folheto, e é coerente com o
     * fecho do Método, que promete recomendar a solução menor quando ela
     * resolve.
     */
    pergunta: "Vocês fazem atendimento com IA?",
    resposta:
      "Fazemos, quando ela resolve o problema. IA no atendimento se paga onde a mesma pergunta chega o dia inteiro e o cliente espera resposta fora do horário comercial. Para um processo que roda poucas vezes por mês, uma automação simples costuma custar menos e quebrar menos. Saber em qual dos dois casos você está é trabalho do diagnóstico.",
  },
  {
    pergunta: "Minha empresa é pequena demais para isso?",
    resposta:
      "Pequena costuma ser o melhor tamanho para começar. Em operação enxuta cada hora perdida pesa mais, e é justamente aí que organizar o processo se nota. E o diagnóstico pode concluir que a solução certa é pequena e barata. Isso não é fracasso, é o resultado correto.",
  },
  {
    pergunta: "Quanto tempo demora?",
    resposta:
      "Varia muito conforme o escopo, e prometer prazo antes de conhecer a operação seria chute. O que dá para garantir é que o prazo entra na proposta, junto com o escopo, antes de o desenvolvimento começar.",
  },
  {
    pergunta: "Eu fico dependente da Tectus depois da entrega?",
    resposta:
      "Não. O que é construído é seu, com documentação e a equipe treinada para operar. Existe acompanhamento contínuo para quem quer, mas é opção, não amarra. Sistema que só funciona enquanto o desenvolvedor está por perto é problema, não modelo de negócio.",
  },
  {
    pergunta: "Já contratei quem sumiu no meio do projeto. Como sei que não vai acontecer de novo?",
    // O texto anterior dizia "você nunca está pagando adiantado", o que
    // contradiz o modelo comercial documentado: existe entrada de 30% ou 50%
    // conforme o pilar. A versão atual descreve o parcelamento real.
    resposta:
      "Pela forma como o trabalho é dividido. O desenvolvimento acontece em entregas parciais, então você vê a solução tomando forma desde cedo, em vez de esperar meses por um resultado final. O pagamento acompanha essas etapas: uma parte na entrada, o restante amarrado às entregas. Nunca o valor inteiro adiantado.",
  },
  {
    pergunta: "Vocês trabalham com empresas de todo o Brasil?",
    resposta:
      "Sim. O atendimento é remoto do começo ao fim: reuniões por chamada e entregas online dão conta do processo inteiro.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* 10 · CTA final                                                      */
/* ------------------------------------------------------------------ */

/**
 * Território do formulário, o CTA secundário da página.
 *
 * O título estava chumbado no JSX, o que impedia as skills de texto de
 * trabalhar sem tocar em layout. Veio para cá junto com a correção do
 * pedido: "Me conte o que está travando" deixava o sujeito solto, e podia
 * ser lido como um convite a desabafar sobre qualquer coisa. Nomear o
 * sujeito (a operação) devolve o assunto para o terreno do negócio, que é
 * onde a conversa precisa começar.
 *
 * Em 06/10/2026 o "Me conte" e o "Como devo te chamar" perderam a primeira
 * pessoa do singular: a voz da página é da empresa (ver `../CLAUDE.md`,
 * "Postura"). O subtítulo trocou "o resto é trabalho do diagnóstico", que
 * não dizia o que acontece depois do envio, pelo próximo passo concreto.
 */
export const CTA_FINAL = {
  eyebrow: "Próximo passo",
  titulo: "Conte onde a sua operação está travando.",
  subtitulo:
    "Não precisa saber qual é a solução, nem usar termo técnico. Descreva a situação como contaria para um sócio. Respondemos pelo WhatsApp para marcar a conversa de 30 a 40 minutos, sem custo.",
  atalho: "Prefere falar direto? O WhatsApp é o canal mais rápido.",
  campos: {
    nome: { rotulo: "Seu nome", exemplo: "Como podemos te chamar" },
    empresa: { rotulo: "Empresa", exemplo: "Nome do seu negócio" },
    gargalo: {
      rotulo: "O que está travando hoje",
      exemplo:
        "Ex.: fecho o mês na mão porque os pedidos ficam espalhados entre o WhatsApp e uma planilha.",
    },
  },
  erroGargalo: "Descreva o gargalo com um pouco mais de detalhe, nem que seja em uma frase.",
  botao: "Enviar e abrir o WhatsApp",
  aviso: "O que você escrever abre o WhatsApp já preenchido. Você revisa antes de enviar.",
} as const;
