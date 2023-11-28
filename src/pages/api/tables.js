// pages/api/tables.js
import { getAvailableTables } from '../../../database/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const tables = await getAvailableTables();
    res.status(200).json(tables);
  } catch (error) {
    console.error('Failed to get available tables:', error);
    res.status(500).json({ message: 'Failed to get available tables', error: error.message });
  }
}
