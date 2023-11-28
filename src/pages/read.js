import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function ReadPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState('');
  const [showSelectTableMessage, setShowSelectTableMessage] = useState(false); // Novo estado

  const fetchItems = async () => {
    if (!selectedTable) {
      setShowSelectTableMessage(true); // Mostrar mensagem
      setIsLoading(false);
      return;
    }

    setShowSelectTableMessage(false); // Esconder mensagem
    try {
      setIsLoading(true);
      const response = await fetch(`/api/read?tableName=${selectedTable}`);
      if (!response.ok) {
        throw new Error('Dados não puderam ser carregados.');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Falha ao buscar itens:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [selectedTable]);

  const renderItemProperties = (item) => {
    return Object.entries(item).map(([key, value]) => (
      <p key={key} className="text-sm">
        <strong>{key}:</strong> {value}
      </p>
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Lista de Itens</h2>

          {showSelectTableMessage && (
            <p className="text-red-500 mb-2">Por favor, selecione uma tabela</p>
          )}

          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="mb-4 p-2 border-2 border-gray-300"
          >
            <option value="">Selecione uma tabela</option>
            <option value="teste1">T1</option>
            <option value="teste2">T2</option>
          </select>

          {isLoading ? (
            <p>Carregando itens...</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-md">
                  {renderItemProperties(item)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
