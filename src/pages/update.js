import React, { useState } from 'react';
import Header from '@/components/Header';

export default function UpdatePage() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', description: 'Descrição 1', category: 'Categoria 1' },
    { id: 2, name: 'Item 2', description: 'Descrição 2', category: 'Categoria 2' },
    // ... outros itens
  ]);
  
  const [inputData, setInputData] = useState({ name: '', description: '', category: '' });
  const [editItemId, setEditItemId] = useState(null);

  const handleInputChange = (e, field) => {
    setInputData({ ...inputData, [field]: e.target.value });
  };

  const handleEditItem = (item) => {
    setEditItemId(item.id);
    setInputData({ name: item.name, description: item.description, category: item.category });
  };

  const handleUpdate = async () => {
    if (editItemId === null) return;
    
    try {
      const response = await fetch(`/api/items/${editItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedItem = await response.json();
      setItems(items.map(item => item.id === editItemId ? updatedItem : item));
      setEditItemId(null); // Reset the item being edited
      setInputData({ name: '', description: '', category: '' }); // Clear input form
    } catch (error) {
      console.error('Falha ao atualizar o item:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-start p-8">
      <h2 className="text-2xl font-bold mb-6">Atualize um item</h2>
        {editItemId !== null && (
          <div className="flex flex-col gap-3 mb-8 ">
            <input
              type="text"
              value={inputData.name}
              onChange={(e) => handleInputChange(e, 'name')}
              placeholder="Nome do item"
              className="border-2 border-blue-500 p-2 rounded-md"
            />
            <input
              type="text"
              value={inputData.description}
              onChange={(e) => handleInputChange(e, 'description')}
              placeholder="Descrição do item"
              className="border-2 border-blue-500 p-2 rounded-md"
            />
            <input
              type="text"
              value={inputData.category}
              onChange={(e) => handleInputChange(e, 'category')}
              placeholder="Categoria do item"
              className="border-2 border-blue-500 p-2 rounded-md"
            />
            <button 
              onClick={handleUpdate}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Atualizar Item
            </button>
          </div>
        )}

        <ul className="w-[50%] list-none space-y-4">
          {items.map((item) => (
            <li 
              key={item.id}
              className={`flex justify-between items-center p-4 rounded-md ${editItemId === item.id ? 'bg-gray-300' : 'bg-gray-100'}`}
              onClick={() => handleEditItem(item)}
            >
              <div>
                <span className="text-lg font-medium">{item.name}</span>
                <span className="text-sm block">{item.description}</span>
                <span className="text-sm block">{item.category}</span>
              </div>
              <button 
                onClick={() => setEditItemId(item.id)}
                className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
