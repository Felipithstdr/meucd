import { ScrollShadow } from "@heroui/react";
import Link from "next/link";

import Modal from "@/components/modal";

interface PropsModal {
  params: {
    open: boolean;
    change: (isOpen: boolean) => void;
  };
}

const ModalPrivacyPolicy = ({ params }: PropsModal) => {
  const { change, open } = params;
  return (
    <Modal
      params={{
        title: "Termos de política e privacidade",
        open: open,
        size: "3xl",
        change: change,
        body: (
          <ScrollShadow
            hideScrollBar
            className="max-h-[65vh] overflow-x-hidden"
            offset={100}
          >
            <div className="sm:text-justify">
              <p>
                A sua privacidade é importante para nós. É política do site Meu
                Certificado Digital respeitar a sua privacidade em relação a
                qualquer informação sua que possamos coletar no site{" "}
                <Link
                  href="https://meucd.vercel.app/"
                  target="_blank"
                  rel="noopener"
                  className="text-blue-500 underline"
                >
                  Meu Certificado Digital
                </Link>
                , e outros sites que possuímos e operamos.
              </p>
              <br />
              <p>
                Trabalhamos com base na Lei de Proteção de Dados (13.709/2018)
                que traz garantias de privacidade, confidencialidade, retenção,
                proteção aos direitos fundamentais de liberdade e o livre
                desenvolvimento da personalidade da pessoa. Além disso,
                respeitamos a Constituição Federal da República Federativa do
                Brasil, o Código de Defesa do Consumidor (Lei 8.078/90), Marco
                Civil da Internet (Lei 12.965/14).
              </p>
              <br />
              <p>
                Solicitamos informações pessoais apenas quando realmente
                precisamos delas para lhe fornecer um serviço. Fazemo-lo por
                meios justos e legais, com o seu conhecimento e consentimento.
                Também informamos por que estamos coletando e como será usado.
              </p>
              <br />
              <p>
                Deixamos claro o motivo que estamos coletando e como será usado,
                pois tudo é feito para correta administração geral.
              </p>
              <br />
              <p>
                Apenas retemos as informações coletadas pelo tempo necessário
                para fornecer o serviço solicitado. Quando armazenamos dados,
                protegemos dentro de meios comercialmente aceitáveis pela
                legislação atual ​​para evitar perdas e roubos, bem como acesso,
                divulgação, cópia, uso ou modificação não autorizados.
              </p>
              <br />
              <p>
                Não compartilhamos informações de identificação pessoal
                publicamente ou com terceiros, exceto por determinação judicial.
              </p>
              <br />
              <p>
                O nosso site pode ter links para sites externos que não são
                operados por nós. Diante disto, não nos responsabilizamos por
                danos de terceiros. Esteja ciente de que não temos controle
                sobre o conteúdo e práticas de sites de terceiros e não podemos
                aceitar responsabilidade por suas respectivas políticas de
                privacidade.
              </p>
              <br />
              <p>
                Na qualidade de consumidor, você é livre para recusar a nossa
                solicitação de informações pessoais, entendendo que talvez não
                possamos fornecer alguns dos serviços desejados.
              </p>
              <br />
              <p>
                O uso continuado de nosso site será considerado como aceitação
                de nossas práticas em torno de privacidade e informações
                pessoais. Se você tiver alguma dúvida sobre como lidamos com
                dados do usuário e informações pessoais, entre em contato
                conosco.
              </p>
              <br />
              <p>Nossa política é atualizada de forma constante.</p>
              <br />
              <p>
                Fica, desde já, o titular de dados ciente que o conteúdo desta
                Política de Privacidade pode ser alterado a critério do site Meu
                Certificado Digital, independente de aviso ou notificação. Em
                caso de alteração, as modificações produzem todos os efeitos a
                partir do momento da disponibilização no site.
              </p>
              <br />
              <p>
                O site Meu Certificado Digital não se responsabiliza caso você
                venha utilizar seus dados de forma incorreta ou inverídica,
                ficando excluído de qualquer responsabilidade neste sentido.
              </p>
              <br />
              <h3 className="text-xl font-black">Compromisso do Usuário</h3>
              <br />
              <p>
                O usuário se compromete a fazer uso adequado dos conteúdos e da
                informação que o site Meu Certificado Digital oferece e com
                caráter enunciativo, mas não limitativo:
              </p>
              <br />
              <ul>
                <li>
                  A) Não se envolver em atividades que sejam ilegais ou
                  contrárias à boa fé e à ordem pública;
                </li>
                <li>
                  B) Respeito a todas as legislações nacionais ou internacionais
                  em que o Brasil é signatário;
                </li>
                <li>
                  C) Não difundir propaganda ou conteúdo de natureza racista,
                  xenofóbica, casas de apostas, jogos de sorte e azar, qualquer
                  tipo de pornografia ilegal, de apologia ao terrorismo ou
                  contra os direitos humanos;
                </li>
                <li>
                  D) Não causar danos aos sistemas físicos (hardwares) e lógicos
                  (softwares) do site Meu Certificado Digital, de seus
                  fornecedores ou terceiros, para introduzir ou disseminar vírus
                  informáticos ou quaisquer outros sistemas de hardware ou
                  software que sejam capazes de causar danos anteriormente
                  mencionados;
                </li>
                <li>
                  E) Os conteúdos publicados, possuem direitos autorais e de
                  propriedade intelectual reservados, conforme estabelece a Lei
                  de Direitos Autorais n. 9.610, de 19.2.1998 do Governo Federal
                  Brasileiro e correlatas. Qualquer infringência, serão
                  comunicados às autoridades competentes.
                </li>
              </ul>
              <br />
              <h3 className="text-xl font-black">
                Direitos do titular de dados
              </h3>
              <br />
              <p>
                O titular de dados pessoais possui o direito de solicitar do
                site Meu Certificado Digital, através do canal específico de
                tratamento, a qualquer momento, mediante requisição formal,
                informações referentes aos seus dados.
              </p>
              <br />
              <p>
                Os pedidos serão analisados conforme previsto em legislação
                vigente dentro de um prazo de 72 horas, salvo determinação legal
                e/ou objeto de lei.
              </p>
              <br />
              <p>
                Os titulares de dados, segundo o texto da LGPD, podem exercer os
                seus direitos por meio de:
              </p>
              <br />
              <ul className="list-disc pl-5">
                <li>Confirmação da existência de tratamento;</li>

                <li>Acesso aos seus dados pessoais;</li>

                <li>
                  Correção de dados incompletos, inexatos ou desatualizados;
                </li>

                <li>
                  Anonimização, bloqueio ou eliminação de dados desnecessários,
                  excessivos ou tratados em desconformidade com o disposto nesta
                  Lei;
                </li>

                <li>
                  Portabilidade dos dados a outro fornecedor de serviço ou
                  produto, mediante requisição expressa, de acordo com a
                  regulamentação da autoridade nacional, observados os segredos
                  comercial e industrial;
                </li>

                <li>
                  Eliminação dos dados pessoais tratados com o consentimento do
                  titular;
                </li>

                <li>
                  Informação das entidades públicas e privadas com as quais o
                  controlador realizou uso compartilhado de dados;
                </li>

                <li>
                  Informação sobre a possibilidade de não fornecer consentimento
                  e sobre as consequências da negativa;
                </li>

                <li>Revogação do consentimento.</li>
              </ul>
              <br />
              <h3 className="text-xl font-black">
                Como exercer os seus direitos de titular de dados?
              </h3>
              <br />
              <ul className="list-disc pl-5">
                <li>
                  Para alterar seus dados pessoais acesse a opção {'"Perfil"'};
                </li>

                <li>
                  Para as demais solicitações em relação aos direitos do titular
                  de dados pessoais, entre em contato conosco;
                </li>
              </ul>
              <br />
              <h3 className="text-xl font-black">Mais informações</h3>
              <br />
              <p>
                Esperamos que esteja esclarecido e, como mencionado
                anteriormente, se houver algo que você não tem certeza se
                precisa ou não, geralmente é mais seguro deixar os cookies
                ativados, caso interaja com um dos recursos que você usa em
                nosso site.
              </p>
              <br />
              <p>
                O site Meu Certificado Digital empregará esforços para
                resguardar as informações e dados coletados do usuário pelo
                site. Todavia, considerando que não há meio de transmissão e
                retenção de dados eletrônicos plenamente eficaz e seguro, o site
                Meu Certificado Digital não pode assegurar que terceiros não
                autorizados não logrem êxito no acesso indevido, eximindo-se de
                qualquer responsabilidade por danos e prejuízos decorrentes da
                conduta de terceiros, ataques externos ao site como: vírus,
                invasão ao banco de dados, vícios ou defeitos técnicos, assim
                como operacionais resultante da utilização do site e em razão de
                falhas de conexão.
              </p>
            </div>
          </ScrollShadow>
        ),
      }}
    />
  );
};

export default ModalPrivacyPolicy;
