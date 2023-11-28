// pages/api/delete.js
import { deleteItem } from '../../../database/db.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { tableName, itemId } = req.body;

  if (!tableName) {
    return res.status(400).json({ message: 'Table name is required in the request body' });
  }
  if (!itemId) {
    return res.status(400).json({ message: 'Item ID is required in the request body' });
  }

  try {
    const deletedItem = await deleteItem(tableName, itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found or already deleted' });
    }
    return res.status(200).json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    console.error('Failed to delete item:', error);
    return res.status(500).json({ message: 'Failed to delete item', error: error.message });
  }
}
