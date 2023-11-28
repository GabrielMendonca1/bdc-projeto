import React, { useState } from 'react';
import Header from '@/components/Header';

export default function DeletePage() {
  const [tableName, setTableName] = useState('');
  const [itemId, setItemId] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleDelete = async () => {
    setMessage('');
    if (!tableName || !itemId) {
      setMessage('Por favor, selecione uma tabela e forneça o ID do item.');
      setIsError(true);
      return;
    }

    try {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName, itemId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setMessage(result.message);
      setIsError(false);
    } catch (error) {
      console.error('Falha ao deletar o item:', error);
      setMessage(`Falha ao deletar o item: ${error.message}`);
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl mb-4 font-semibold">Deletar Item</h2>
          
          {message && (
            <div className={`mb-4 text-center ${isError ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableName">
              Selecione uma Tabela
            </label>
            <select
              id="tableName"
              value={tableName}
              onChange={(e) => setTableName(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecione uma tabela</option>
              <option value="teste1">T1</option>
              <option value="teste2">T2</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="itemId">
              ID do Item
            </label>
            <input
              id="itemId"
              type="text"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              placeholder="ID do Item"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button 
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Deletar Item
          </button>
        </div>
      </main>
    </div>
  );
}
