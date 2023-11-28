import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function UpdatePage() {
  const [tableName, setTableName] = useState('');
  const [itemId, setItemId] = useState('');
  const [itemData, setItemData] = useState({});
  const [tableFields, setTableFields] = useState([]);

  const updateItemData = (field, value) => {
    setItemData({ ...itemData, [field]: value });
  };

  const tableStructures = {
    teste1: ['name', 'description', 'category'],
    teste2: ['name2', 'description2', 'category2'],
  };
  
  const fetchTableStructure = (selectedTableName) => {
    const fields = tableStructures[selectedTableName] || [];
    setTableFields(fields);
  };

  useEffect(() => {
    if (tableName) {
      fetchTableStructure(tableName);
    }
  }, [tableName]);

  const handleUpdate = async () => {
    if (!tableName || !itemId) {
      alert('Por favor, selecione uma tabela e forneça o ID do item.');
      return;
    }

    try {
      const response = await fetch('/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName, itemId, ...itemData }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedItem = await response.json();
      console.log('Item atualizado:', updatedItem);
      alert('Item atualizado com sucesso!');
    } catch (error) {
      console.error('Falha ao atualizar o item:', error);
      alert(`Falha ao atualizar o item: ${error.message}`);
    }
  };


  const renderFormFields = () => {
    return tableFields.map(field => (
      <input
        key={field}
        type="text"
        value={itemData[field] || ''}
        onChange={(e) => updateItemData(field, e.target.value)}
        placeholder={field}
        className="border-2 border-blue-500 p-2 rounded-md"
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl mb-4 font-semibold">Atualizar Item</h2>

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

          {tableFields.map(field => (
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                {field}
              </label>
              <input
                id={field}
                type="text"
                value={itemData[field] || ''}
                onChange={(e) => updateItemData(field, e.target.value)}
                placeholder={field}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}

          <button 
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Atualizar Item
          </button>
        </div>
      </main>
    </div>
  );
}
