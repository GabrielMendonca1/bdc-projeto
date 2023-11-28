// pages/api/update.js
import { updateItem } from '../../../database/db.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { tableName, itemId, ...itemData } = req.body;

  if (!tableName) {
    return res.status(400).json({ message: 'Table name is required in the request body' });
  }
  if (!itemId) {
    return res.status(400).json({ message: 'Item ID is required in the request body' });
  }

  if (Object.keys(itemData).length === 0) {
    return res.status(400).json({ message: 'Item data is required in the request body' });
  }

  try {
    const updatedItem = await updateItem(tableName, itemId, itemData);
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    return res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Failed to update item:', error);
    return res.status(500).json({ message: 'Failed to update item', error: error.message });
  }
}
