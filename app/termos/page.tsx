export default function TermosPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
          <p className="text-gray-600">
            Ao acessar e usar o Mais Ticket, você concorda com estes termos de uso.
            Se você não concordar com qualquer parte destes termos, não deverá usar
            nossos serviços.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso do Serviço</h2>
          <p className="text-gray-600 mb-4">
            Ao usar nossos serviços, você concorda em:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Fornecer informações verdadeiras e precisas</li>
            <li>Manter suas credenciais de acesso seguras</li>
            <li>Não compartilhar sua conta com terceiros</li>
            <li>Não usar o serviço para fins ilegais</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Compra de Ingressos</h2>
          <p className="text-gray-600 mb-4">
            Ao comprar ingressos, você concorda que:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>É responsável por verificar os detalhes do evento</li>
            <li>Deve apresentar documentação válida para meia-entrada</li>
            <li>Ingressos não podem ser revendidos acima do valor face</li>
            <li>Cancelamentos seguem nossa política de reembolso</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Responsabilidades</h2>
          <p className="text-gray-600 mb-4">
            O Mais Ticket não é responsável por:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Cancelamento ou alteração de eventos</li>
            <li>Conteúdo gerado por usuários</li>
            <li>Problemas técnicos fora de nosso controle</li>
            <li>Perda ou roubo de ingressos</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Propriedade Intelectual</h2>
          <p className="text-gray-600">
            Todo o conteúdo do site, incluindo logos, textos, imagens e software,
            é propriedade do Mais Ticket ou de seus parceiros e está protegido por
            leis de propriedade intelectual.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Alterações nos Termos</h2>
          <p className="text-gray-600">
            Reservamos o direito de modificar estes termos a qualquer momento.
            Alterações significativas serão notificadas aos usuários.
          </p>
        </section>
      </div>
    </div>
  );
}