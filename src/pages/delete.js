import React, { useState } from 'react';
import Header from '@/components/Header';

export default function DeletePage() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', description: 'Descrição 1', category: 'Categoria 1' },
    { id: 2, name: 'Item 2', description: 'Descrição 2', category: 'Categoria 2' },
    // Adicione mais itens conforme necessário para teste
  ]);

  // Função para deletar um item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      // Atualizar a lista de itens sem o item deletado
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Falha ao deletar o item:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-start p-8">
      <h2 className="text-2xl font-bold mb-6">Delete</h2>
        <ul className="list-none space-y-4 w-[50%]">
          {items.map((item) => (
            <li 
              key={item.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
            >
              <div className="flex flex-col">
                <span className="text-lg font-medium">{item.name}</span>
                <span className="text-sm">{item.description}</span>
                <span className="text-sm">{item.category}</span>
              </div>
              <button 
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
