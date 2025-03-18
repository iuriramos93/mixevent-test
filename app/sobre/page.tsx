export default function SobrePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Sobre Nós</h1>
      
      <div className="prose max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
          <p className="text-gray-600 mb-6">
            O Mais Ticket nasceu da paixão por conectar pessoas a experiências
            memoráveis. Desde nossa fundação, temos trabalhado para tornar a compra
            de ingressos mais simples, segura e acessível para todos.
          </p>
          <p className="text-gray-600">
            Com anos de experiência no mercado de eventos, construímos uma
            plataforma que atende às necessidades tanto dos consumidores quanto
            dos organizadores de eventos.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nossa Missão</h2>
          <p className="text-gray-600">
            Facilitar o acesso à cultura e ao entretenimento, conectando pessoas
            a eventos de qualidade através de uma plataforma segura e intuitiva.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Transparência</h3>
              <p className="text-gray-600">
                Prezamos pela clareza em todas as nossas operações e comunicações.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Segurança</h3>
              <p className="text-gray-600">
                Garantimos a segurança das transações e dados dos nossos usuários.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Inovação</h3>
              <p className="text-gray-600">
                Buscamos constantemente melhorar nossa plataforma e serviços.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Números</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">+1M</div>
              <div className="text-gray-600">Ingressos Vendidos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">+5k</div>
              <div className="text-gray-600">Eventos Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">+500</div>
              <div className="text-gray-600">Parceiros</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">+50</div>
              <div className="text-gray-600">Cidades</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contato</h2>
          <p className="text-gray-600 mb-4">
            Estamos sempre à disposição para atender nossos usuários e parceiros.
          </p>
          <div className="space-y-2">
            <p className="text-gray-600">
              <strong>E-mail:</strong> contato@maisticket.com.br
            </p>
            <p className="text-gray-600">
              <strong>Telefone:</strong> (11) 1234-5678
            </p>
            <p className="text-gray-600">
              <strong>Horário de Atendimento:</strong> Segunda a Sexta, das 9h às 18h
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}