import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';

export default function CreatePage() {
  const [inputData, setInputData] = useState({ tableName: '' });
  const [tableFields, setTableFields] = useState([]);

  const updateInputData = (field, value) => {
    setInputData({ ...inputData, [field]: value });
  };

  const fetchTableStructure = async (tableName) => {
    if (tableName === 'teste1') {
      setTableFields(['name', 'description', 'category']);
    } else if (tableName === 'teste2') {
      setTableFields(['name2', 'description2', 'category2']);
    } else {
      setTableFields([]);
    }
  };

  // Atualiza os campos do formulário quando a tabela é selecionada
  useEffect(() => {
    fetchTableStructure(inputData.tableName);
  }, [inputData.tableName]);

  const handleCreate = async () => {
    if (!inputData.tableName) {
      alert('Por favor, selecione uma tabela.');
      return;
    }

    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newItem = await response.json();
      console.log('Item criado:', newItem);
      alert('Item criado com sucesso!');
      // Reset o estado, mantendo o tableName
      setInputData({ tableName: inputData.tableName });
    } catch (error) {
      console.error('Falha ao criar o item:', error);
      alert(`Falha ao criar o item: ${error.message}`);
    }
  };

  // Gera campos de formulário dinâmicos
  const renderFormFields = () => {
    return tableFields.map(field => (
      <input
        key={field}
        type="text"
        value={inputData[field] || ''}
        onChange={(e) => updateInputData(field, e.target.value)}
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
          <h2 className="text-xl mb-4 font-semibold">Criar Item</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tableName">
              Selecione uma Tabela
            </label>
            <select
              id="tableName"
              value={inputData.tableName}
              onChange={(e) => updateInputData('tableName', e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecione uma tabela</option>
              <option value="teste1">T1</option>
              <option value="teste2">T2</option>
            </select>
          </div>

          {renderFormFields().map(field => (
            <div className="mb-4" key={field.key}>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.key}>
                {field.placeholder}
              </label>
              {field}
            </div>
          ))}

          <button 
            onClick={handleCreate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Criar Item
          </button>
        </div>
      </main> 
    </div>
  );
}
