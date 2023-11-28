import React from 'react';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 pt-8">Bem-vindo ao Sistema de Gerenciamento de Itens</h1>
        <p className="mb-4">Este é um sistema protótipo para gerenciamento de itens com operações CRUD integrado ao Chatbot GPT-3.</p>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Sobre o Sistema</h2>
          <p className="mb-8 text-left">
            Este sistema foi desenvolvido como uma versão protótipo para demonstrar a integração eficaz com tecnologias de inteligência artificial, como o Chatbot GPT-3. As tabelas e dados já definidos servem como exemplos para facilitar a interação e fornecer um contexto claro de uso para os usuários. O objetivo é ilustrar como operações CRUD podem ser gerenciadas de maneira eficiente e integrada a sistemas de IA.
          </p>

          <h2 className="text-2xl font-semibold mb-3">Como usar</h2>
          <ul className="list-disc text-left pl-5 space-y-4">
            <li>Visite a página <strong>Criar</strong> para adicionar novos itens.</li>
            <li>Navegue até a página <strong>Ler</strong> para visualizar todos os itens existentes.</li>
            <li>Use a página <strong>Atualizar</strong> para modificar os detalhes de um item.</li>
            <li>Vá para a página <strong>Deletar</strong> para remover itens indesejados.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-6">Integração com Chat-GPT</h2>
          <p className="text-left">
            A integração com o Chat-GPT permite explorar as potencialidades da IA na otimização de processos de gerenciamento. Usuários podem tirar dúvidas, obter suporte e interagir de forma mais natural e intuitiva com o sistema, promovendo uma experiência de usuário inovadora e eficiente.
          </p>
        </div>
      </main>
    </div>
  );
}
