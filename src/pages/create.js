import React, { useState } from 'react';
import Header from '@/components/Header';

export default function CreatePage() {
  const [inputData, setInputData] = useState({ name: '', description: '', category: '' });

  // Atualiza os campos do inputData com base na entrada do usuário
  const updateInputData = (field, value) => {
    setInputData({ ...inputData, [field]: value });
  };

  // Função para criar um novo item
  const handleCreate = async () => {
    try {
      // Substitua a URL abaixo pela URL do seu endpoint de criação
      // Descomente as linhas a seguir quando conectar com o backend real
      /*
      const response = await fetch('/api/items', {
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
      // Adicione aqui a lógica para lidar com o item recém-criado
      */

      // Simula a criação de item com dados mock
      console.log('Item criado:', inputData);
      alert('Item criado com sucesso! (mock)');
      setInputData({ name: '', description: '', category: '' }); // Limpa o formulário
    } catch (error) {
      console.error('Falha ao criar o item:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            value={inputData.name}
            onChange={(e) => updateInputData('name', e.target.value)}
            placeholder="Nome do item"
            className="border-2 border-blue-500 p-2 rounded-md"
          />
          <input
            type="text"
            value={inputData.description}
            onChange={(e) => updateInputData('description', e.target.value)}
            placeholder="Descrição do item"
            className="border-2 border-blue-500 p-2 rounded-md"
          />
          <input
            type="text"
            value={inputData.category}
            onChange={(e) => updateInputData('category', e.target.value)}
            placeholder="Categoria do item"
            className="border-2 border-blue-500 p-2 rounded-md"
          />
          <button 
            onClick={handleCreate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Criar Item
          </button>
        </div>
      </main>
    </div>
  );
}
