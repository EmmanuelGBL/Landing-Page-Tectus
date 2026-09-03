import { DiagramaFluxo } from "@/components/brand/DiagramaFluxo";
import { BotaoLink, IconeSeta, IconeWhatsApp } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HERO } from "@/lib/conteudo";
import { WHATSAPP_MESSAGES, whatsappLink } from "@/lib/site";

/**
 * O H1 fala do leitor, não da Tectus. Headline sobre a própria empresa não
 * converte quem ainda não sabe se tem o problema.
 *
 * Terceira versão. A segunda tentou impressionar empilhando: malha de fundo,
 * halo desfocado, selo, título grifado, subtítulo, dois botões, três provas,
 * slogan com filete e um diagrama flutuando. Nove camadas competindo, e o
 * resultado foi poluição, não impacto.
 *
 * O corte seguiu uma regra: cada elemento aqui precisa fazer o visitante
 * avançar. Saíram a malha, o halo, a flutuação e o slogan. O slogan é a
 * frase da marca, não do leitor, e ele já vive no rodapé e nos metadados.
 *
 * Quarta versão, e o corte continuou pela mesma régua. A barra com as três
 * promessas de processo saiu daqui e virou a faixa logo abaixo
 * (`Compromissos`). Ela é boa, mas não pertence a este instante: quem ainda
 * não decidiu se fica não lê compromisso de entrega. A faixa de logos de
 * clientes também saiu da sequência, pelo mesmo motivo de acúmulo.
 *
 * Quinta versão: saiu o selo "Consultoria antes de desenvolvimento" que
 * ficava acima do título. Dois motivos, e o segundo é o que importa. O
 * primeiro é de tom: a construção "X antes de Y" virou tique de copy
 * automática e soa fabricada. O segundo é que ele era redundante. O
 * subtítulo, três linhas abaixo, já diz "a Tectus começa descobrindo onde a
 * operação trava, antes de propor qualquer sistema", que é exatamente o
 * mesmo argumento. Selo e subtítulo brigavam pelo mesmo trabalho.
 *
 * Sobrou o essencial de uma primeira dobra: de quem é o problema, quanto ele
 * custa, o que fazer agora, e um objeto que mostra a tese.
 */
export function Hero() {
  return (
    <section id="topo" className="bg-papel pb-16 pt-12 lg:pb-24 lg:pt-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
          <div>
            <h1 className="text-[2.6rem] font-extrabold leading-[1.05] tracking-[-0.034em] text-grafite sm:text-[3.3rem] lg:text-[3.85rem]">
              {/* O espaço é obrigatório: o `span` quebra a linha na tela, mas
                  sem ele o texto acessível do h1 sai "lenta.Ela refaz", que é
                  o que leitor de tela e extrator de snippet realmente leem. */}
              <span className="block text-chumbo">{HERO.titulo.linha1}</span>{" "}
              {HERO.titulo.linha2}
            </h1>

            <p className="mt-7 max-w-lg text-[1.06rem] leading-relaxed text-chumbo lg:text-[1.13rem]">
              {HERO.subtitulo}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BotaoLink
                href={whatsappLink(WHATSAPP_MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
                tamanho="lg"
                className="elevacao-2"
              >
                <IconeWhatsApp className="h-[18px] w-[18px]" />
                {HERO.ctaPrimario}
              </BotaoLink>

              <BotaoLink href="#metodo" variante="secundario" tamanho="lg" className="group">
                {HERO.ctaSecundario}
                <IconeSeta className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </BotaoLink>
            </div>
          </div>

          {/* No mobile o diagrama vem depois do texto: a dobra estreita
              pertence ao título, não à ilustração. */}
          <div className="order-last lg:order-none">
            <DiagramaFluxo />
          </div>
        </div>
      </Container>
    </section>
  );
}
