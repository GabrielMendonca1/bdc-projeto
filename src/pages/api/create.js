// pages/api/create.js
import { createItem } from '../../../database/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { tableName, ...itemData } = req.body;

  // Validar se o nome da tabela foi fornecido
  if (!tableName) {
    return res.status(400).json({ message: 'Table name is required in the request body' });
  }

  // Validar se os dados do item foram fornecidos
  if (Object.keys(itemData).length === 0) {
    return res.status(400).json({ message: 'Item data is required in the request body' });
  }

  try {
    const newItem = await createItem(tableName, itemData);
    return res.status(201).json(newItem);
  } catch (error) {
    console.error('Failed to create item:', error);
    return res.status(500).json({ message: 'Failed to create item', error: error.message });
  }
}
