// pages/api/read.js
import { readItems } from '../../../database/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { tableName } = req.query;

  if (!tableName) {
    return res.status(400).json({ message: 'Table name is required as a query parameter' });
  }

  try {
    const items = await readItems(tableName);
    return res.status(200).json(items);
  } catch (error) {
    console.error('Failed to read items:', error);
    return res.status(500).json({ message: 'Failed to read items', error: error.message });
  }
}
