import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function ReadPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para buscar os itens do backend
  const fetchItems = async () => {
    try {
      setIsLoading(true);
      // Descomente a linha abaixo e configure a URL do seu backend
      // const response = await fetch('URL_DA_SUA_API_AQUI');
      // if (!response.ok) {
      //   throw new Error('Dados não puderam ser carregados.');
      // }
      // const data = await response.json();
      // setItems(data);

      // Dados mock para ilustração
      const mockData = [
        { id: 1, name: 'Item 1', description: 'Descrição 1', category: 'Categoria 1' },
        { id: 2, name: 'Item 2', description: 'Descrição 2', category: 'Categoria 2' },
        // ... outros itens
      ];
      setItems(mockData); // Substitua isso pela variável 'data' quando descomentar o código acima
    } catch (error) {
      console.error('Falha ao buscar itens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega os itens quando o componente é montado
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Lista de Itens</h2>
          {isLoading ? (
            <p>Carregando itens...</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li 
                  key={item.id}
                  className="bg-gray-100 p-4 rounded-md"
                >
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-sm">{item.description}</p>
                  <p className="text-sm">{item.category}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
