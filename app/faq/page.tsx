export default function FAQPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Perguntas Frequentes</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Compra de Ingressos</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Como faço para comprar ingressos?</h3>
              <p className="text-gray-600">
                Para comprar ingressos, basta escolher o evento desejado, selecionar a quantidade
                e tipo de ingresso, e finalizar a compra usando uma das formas de pagamento disponíveis.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Quais formas de pagamento são aceitas?</h3>
              <p className="text-gray-600">
                Aceitamos cartão de crédito, PIX e boleto bancário.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Ingressos</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Como recebo meu ingresso?</h3>
              <p className="text-gray-600">
                Após a confirmação do pagamento, você receberá seu ingresso por e-mail.
                Você também pode acessá-lo através da sua conta no site.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Posso transferir meu ingresso?</h3>
              <p className="text-gray-600">
                Sim, você pode transferir seu ingresso para outra pessoa através da sua conta no site.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Meia-Entrada</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Quem tem direito à meia-entrada?</h3>
              <p className="text-gray-600">
                Estudantes, idosos, pessoas com deficiência e jovens de baixa renda têm direito
                à meia-entrada mediante apresentação de documentação comprobatória.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Que documentos preciso apresentar?</h3>
              <p className="text-gray-600">
                É necessário apresentar documento oficial com foto e comprovante do benefício
                (carteirinha de estudante, documento de identidade para idosos, etc).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cancelamento e Reembolso</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Posso cancelar minha compra?</h3>
              <p className="text-gray-600">
                Sim, você pode cancelar sua compra em até 7 dias após a data da compra,
                desde que o evento ainda não tenha ocorrido.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Como solicito reembolso?</h3>
              <p className="text-gray-600">
                Para solicitar reembolso, acesse sua conta, vá até seus pedidos e
                selecione a opção de cancelamento. O valor será estornado de acordo
                com a forma de pagamento utilizada.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}