import Image from "next/image";
import { ClipboardList, MonitorSmartphone, ShoppingBag, type LucideIcon } from "lucide-react";
import { Icone } from "@/components/ui/Icone";
import { Reveal } from "@/components/ui/Reveal";
import { Container, Section, TituloSecao } from "@/components/ui/Section";
import { PROJETOS, PROJETOS_OUTROS, PROJETOS_TITULO } from "@/lib/conteudo";

/**
 * Somente clientes autorizados a aparecer com nome e com marca (ver
 * CLAUDE.md). Mostra amplitude de segmento, que é o que sustenta a promessa
 * de atender qualquer operação. Sem métrica atribuída a nenhum deles.
 *
 * A seção se chamava "Outros projetos" e agora se chama "Empresas atendidas".
 * A troca não é cosmética: "projetos" descreve o que a Tectus fez, "empresas
 * atendidas" descreve quem confiou, e é a segunda informação que responde à
 * dúvida de quem está decidindo.
 *
 * Cada card abre com a marca do cliente, não com ícone genérico. Marca real
 * é a prova; ícone é ilustração. Quem não tem arquivo de logo cai no ícone
 * do tipo de entrega, que é degradação honesta em vez de espaço vazio.
 *
 * Desde 24/08/2026 esta é a única aparição das marcas na página. A faixa de
 * logos que ficava abaixo do hero saiu, e o argumento de tê-la mantido antes
 * (pergunta diferente, momento diferente) não sobreviveu ao acúmulo na
 * primeira dobra. Aqui a marca vem com a entrega escrita embaixo, que é a
 * versão da prova que responde alguma coisa.
 *
 * A lista sem nome no rodapé da seção existe porque quatro cards e mais nada
 * davam a entender que a carteira inteira são quatro clientes. Não são: a
 * restrição é de autorização, não de volume. Só cinco clientes liberaram o
 * nome, e os demais só podem aparecer descritos pelo tipo de entrega. Dizer
 * isso em voz alta transforma a limitação em postura, e é verdade.
 */

/** Ícone de reserva, pelo tipo de entrega, para quem não tem logo. */
const ICONES: Record<string, LucideIcon> = {
  "Marketplace com painel": ShoppingBag,
  "Sistema de pedidos": ClipboardList,
  "Landing page": MonitorSmartphone,
};

export function Projetos() {
  return (
    <Section id="projetos" fundo="cinza">
      <Container>
        <TituloSecao
          eyebrow={PROJETOS_TITULO.eyebrow}
          titulo={PROJETOS_TITULO.titulo}
          subtitulo={PROJETOS_TITULO.subtitulo}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PROJETOS.map((projeto, indice) => (
            <Reveal key={projeto.cliente} delay={indice * 60} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-cinza-linha bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-cinza hover:elevacao-2">
                {/* Caixa de altura fixa para as marcas se alinharem entre si
                    apesar das proporções diferentes. Sem ela, cada card
                    começaria o texto numa altura. */}
                <div className="flex h-10 items-center">
                  {projeto.logo ? (
                    <Image
                      src={projeto.logo.arquivo}
                      alt={projeto.logo.nome}
                      width={projeto.logo.largura}
                      height={projeto.logo.altura}
                      className="h-8 w-auto object-contain"
                    />
                  ) : (
                    <Icone icone={ICONES[projeto.tipo] ?? MonitorSmartphone} tamanho="sm" />
                  )}
                </div>

                <h3 className="mt-6 text-[1.1rem] font-semibold tracking-[-0.01em] text-grafite">
                  {projeto.cliente}
                </h3>
                <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.08em] text-cinza-texto">
                  {projeto.tipo}
                </p>

                {/* Antes e depois em vez de só a entrega. A seção descrevia
                    o que foi construído, que é descrição; o par mostra a
                    mudança, que é prova. Os estados anteriores foram
                    confirmados pelo Emmanuel em 25/08/2026. O "Antes" fica
                    em cinza-texto e o "Depois" em grafite: a diferença de
                    peso diz qual dos dois é o assunto. */}
                <dl className="mt-5">
                  <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.09em] text-cinza-texto">
                    {PROJETOS_TITULO.rotuloAntes}
                  </dt>
                  <dd className="mt-1 text-[0.93rem] leading-relaxed text-cinza-texto">
                    {projeto.antes}
                  </dd>
                  <dt className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.09em] text-petroleo-escuro">
                    {PROJETOS_TITULO.rotuloDepois}
                  </dt>
                  <dd className="mt-1 text-[0.95rem] leading-relaxed text-grafite">
                    {projeto.resolveu}
                  </dd>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Peso visual deliberadamente menor que o dos cards: aqui não há
            marca para provar nada, só o tipo de entrega. Cresce a carteira
            sem competir com quem autorizou aparecer. */}
        <div className="mt-8 border-t border-cinza-linha pt-7">
          <p className="text-[0.9rem] text-chumbo">{PROJETOS_OUTROS.legenda}</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {PROJETOS_OUTROS.itens.map((item) => (
              <li
                key={item}
                className="rounded-full border border-cinza-linha bg-white px-3.5 py-1.5 text-[0.85rem] text-chumbo"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
