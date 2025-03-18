export default function ComoComprarPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Como Comprar</h1>
      
      <div className="prose max-w-none">
        <h2>1. Escolha seu evento</h2>
        <p>
          Navegue pelo site e escolha o evento que deseja participar. Você pode usar
          a barra de busca ou navegar pelas categorias disponíveis.
        </p>

        <h2>2. Selecione seus ingressos</h2>
        <p>
          Escolha o tipo e a quantidade de ingressos que deseja comprar. Verifique
          as informações sobre meia-entrada e outros descontos disponíveis.
        </p>

        <h2>3. Faça o pagamento</h2>
        <p>
          Escolha sua forma de pagamento preferida e complete a compra. Aceitamos:
        </p>
        <ul>
          <li>Cartão de crédito</li>
          <li>PIX</li>
          <li>Boleto bancário</li>
        </ul>

        <h2>4. Receba seu ingresso</h2>
        <p>
          Após a confirmação do pagamento, você receberá seu ingresso por e-mail.
          Você também pode acessá-lo através da sua conta no site.
        </p>

        <h2>Dúvidas frequentes</h2>
        <p>
          Se você tiver alguma dúvida sobre o processo de compra, consulte nossa
          página de <a href="/faq" className="text-primary hover:underline">Perguntas Frequentes</a> ou
          entre em contato com nosso suporte.
        </p>
      </div>
    </div>
  );
}