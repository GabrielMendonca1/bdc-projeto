import React from 'react';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Sistema de Gerenciamento de Itens</h1>
        <p className="mb-4">Este é um sistema completo para gerenciamento de itens com operações CRUD.</p>
        
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-3">Como usar</h2>
          <ul className="list-disc text-left pl-5 space-y-2">
            <li>Visite a página <strong>Criar</strong> para adicionar novos itens.</li>
            <li>Navegue até a página <strong>Ler</strong> para visualizar todos os itens existentes.</li>
            <li>Use a página <strong>Atualizar</strong> para modificar os detalhes de um item.</li>
            <li>Vá para a página <strong>Deletar</strong> para remover itens indesejados.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
