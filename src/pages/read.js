import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function ReadPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState('');
  const [showSelectTableMessage, setShowSelectTableMessage] = useState(false); 

  const fetchItems = async () => {
    if (!selectedTable) {
      setShowSelectTableMessage(true); 
      setIsLoading(false);
      return;
    }

    setShowSelectTableMessage(false); 
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

  const renderItemProperties = (item) => (
    <div className="flex flex-col gap-1">
      {Object.entries(item).map(([key, value]) => (
        <p key={key} className="text-sm">
          <strong>{key}:</strong> {value}
        </p>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold mb-4">Lista de Itens</h2>

          {showSelectTableMessage && (
            <p className="text-red-600 mb-3">Por favor, selecione uma tabela</p>
          )}

          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="mb-5 p-2 border border-gray-400 rounded-md w-full"
          >
            <option value="">Selecione uma tabela</option>
            <option value="teste1">T1</option>
            <option value="teste2">T2</option>
          </select>

          {isLoading ? (
            <p className="text-lg text-center text-gray-500">Carregando itens...</p>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                  {renderItemProperties(item)}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
