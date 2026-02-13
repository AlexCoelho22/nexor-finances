import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'Juros Compostos',
    content: `Os juros compostos são considerados a oitava maravilha do mundo por Albert Einstein. Eles funcionam de uma maneira simples: você ganha juros sobre o capital inicial e, nos períodos seguintes, também ganha juros sobre os juros acumulados.

Por exemplo, se você investir R$ 1.000 com rendimento de 1% ao mês, no primeiro mês terá R$ 1.010. No segundo mês, os juros serão calculados sobre R$ 1.010, não sobre os R$ 1.000 iniciais. Com o tempo, esse efeito se multiplica exponencialmente.

A fórmula dos juros compostos é: M = C × (1 + i)^t, onde M é o montante final, C é o capital inicial, i é a taxa de juros e t é o tempo.

O segredo está na consistência e no tempo. Quanto mais cedo você começar a investir e quanto mais tempo deixar o dinheiro rendendo, maior será o efeito dos juros compostos no seu patrimônio.`,
    xpReward: 25,
    order: 1
  },
  {
    id: 2,
    title: 'Renda Fixa vs Renda Variável',
    content: `Existem dois tipos principais de investimentos: renda fixa e renda variável. Entender a diferença entre eles é fundamental para construir uma carteira equilibrada.

Renda Fixa são investimentos onde você sabe (ou tem uma boa previsibilidade) de quanto vai receber no futuro. Exemplos incluem Tesouro Direto, CDBs e LCIs. São mais seguros mas tendem a ter retornos menores.

Renda Variável são investimentos onde o retorno não é garantido e pode variar bastante. Ações, FIIs e criptomoedas são exemplos. Têm potencial de retornos maiores, mas também riscos maiores.

A estratégia ideal geralmente envolve diversificação entre ambos os tipos, ajustando a proporção de acordo com seu perfil de risco, objetivos e horizonte de tempo.`,
    xpReward: 25,
    order: 2
  },
  {
    id: 3,
    title: 'Gestão de Risco',
    content: `Gerenciar risco é tão importante quanto buscar retornos. A primeira regra é: nunca coloque todos os ovos na mesma cesta. Diversificação é a chave para reduzir riscos.

Diversifique entre diferentes classes de ativos (ações, FIIs, renda fixa, criptomoedas), setores econômicos e até geograficamente. Se um ativo cair, outros podem compensar.

Outro ponto crucial é ter uma reserva de emergência antes de investir agressivamente. Recomenda-se ter de 6 a 12 meses de despesas em investimentos líquidos e seguros.

Por fim, entenda seu perfil de risco. Você consegue dormir tranquilo vendo sua carteira cair 20%? Seja honesto consigo mesmo e invista de acordo com sua tolerância ao risco.`,
    xpReward: 30,
    order: 3
  },
  {
    id: 4,
    title: 'Psicologia do Investidor',
    content: `A maior inimiga do investidor muitas vezes é sua própria mente. Vieses comportamentais podem fazer você tomar decisões ruins, mesmo tendo conhecimento técnico.

O viés de confirmação faz você buscar apenas informações que confirmam o que já acredita. O efeito manada te leva a comprar quando todos estão comprando (preços altos) e vender quando todos estão vendendo (preços baixos).

A aversão à perda faz você sentir a dor de perder R$ 100 muito mais do que a alegria de ganhar R$ 100. Isso pode te paralisar ou fazer vender bons ativos no momento errado.

Para combater isso, tenha um plano de investimentos e siga-o disciplinadamente. Evite checar seu portfólio todo dia. Emoções devem ficar de fora das decisões financeiras.`,
    xpReward: 30,
    order: 4
  },
  {
    id: 5,
    title: 'Dividendos',
    content: `Dividendos são parte do lucro que empresas distribuem aos acionistas. No Brasil, ações e especialmente FIIs são conhecidos por pagar bons dividendos regularmente.

Para viver de renda, você precisa acumular patrimônio suficiente para que os dividendos cubram suas despesas. Se você gasta R$ 3.000 por mês e seus investimentos rendem 0,5% ao mês em dividendos, você precisaria de R$ 600.000 investidos.

A beleza dos dividendos é que são renda passiva - você recebe sem precisar vender seus ativos. E se você reinvestir os dividendos enquanto está construindo patrimônio, aproveitará o poder dos juros compostos.

Foque em empresas e FIIs com histórico consistente de pagamento, boa governança e fundamentos sólidos. Dividend yield alto pode ser armadilha se a empresa estiver em crise.`,
    xpReward: 25,
    order: 5
  },
  {
    id: 6,
    title: 'Mentalidade de Longo Prazo',
    content: `Warren Buffett disse: "O mercado é um mecanismo de transferir dinheiro dos impacientes para os pacientes." A mentalidade de longo prazo é essencial para o sucesso nos investimentos.

Investidores de curto prazo tentam timing de mercado, compram e vendem frequentemente, pagam mais impostos e taxas. Estatisticamente, a maioria perde dinheiro.

Investidores de longo prazo compram ativos de qualidade e mantêm por anos ou décadas. Passam por crises sem vender, aproveitam momentos de pânico para comprar mais barato, e deixam os juros compostos trabalharem a seu favor.

Desenvolva essa mentalidade desde cedo. Não se desespere com quedas temporárias. Mantenha aportes regulares independente do cenário. Paciência e disciplina são suas maiores aliadas.`,
    xpReward: 30,
    order: 6
  }
];
