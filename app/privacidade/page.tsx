export default function PrivacidadePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Informações Coletadas</h2>
          <p className="text-gray-600 mb-4">
            Coletamos informações que você nos fornece diretamente ao criar uma conta
            ou fazer uma compra, incluindo:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Nome completo</li>
            <li>Endereço de e-mail</li>
            <li>Número de telefone</li>
            <li>CPF</li>
            <li>Informações de pagamento</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Uso das Informações</h2>
          <p className="text-gray-600 mb-4">
            Utilizamos suas informações para:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Processar suas compras e enviar ingressos</li>
            <li>Enviar atualizações sobre eventos</li>
            <li>Melhorar nossos serviços</li>
            <li>Prevenir fraudes</li>
            <li>Cumprir obrigações legais</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Compartilhamento de Dados</h2>
          <p className="text-gray-600 mb-4">
            Compartilhamos suas informações apenas com:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Organizadores dos eventos</li>
            <li>Processadores de pagamento</li>
            <li>Autoridades competentes quando exigido por lei</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Seus Direitos</h2>
          <p className="text-gray-600 mb-4">
            Você tem direito a:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incorretos</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Revogar consentimento para uso dos dados</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Segurança</h2>
          <p className="text-gray-600">
            Implementamos medidas de segurança técnicas e organizacionais para
            proteger suas informações contra acesso não autorizado, alteração,
            divulgação ou destruição não autorizada.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Contato</h2>
          <p className="text-gray-600">
            Para questões relacionadas à privacidade, entre em contato através do
            e-mail: privacidade@maisticket.com.br
          </p>
        </section>
      </div>
    </div>
  );
}