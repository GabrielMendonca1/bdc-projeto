// database/db.js
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Operações com Tabelas
const createTable = async (tableName, columns) => {
  const query = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      ${columns.map(col => `${col.name} ${col.type}`).join(', ')}
    );
  `;
  await pool.query(query);
};


const dropTable = async (tableName) => {
  const query = `DROP TABLE IF EXISTS ${tableName};`;
  await pool.query(query);
};


// CRUD para itens
  const createItem = async (tableName, itemData) => {
  const columns = Object.keys(itemData).join(', ');
  const values = Object.values(itemData);
  const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

  const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *;`;
  const { rows } = await pool.query(query, values);
  return rows[0];
};


const readItems = async (tableName) => {
  const query = `SELECT * FROM ${tableName};`;
  const { rows } = await pool.query(query);
  return rows;
};

const updateItem = async (tableName, itemId, itemData) => {
  const columns = Object.keys(itemData);
  const values = Object.values(itemData);

  const setQuery = columns.map((col, i) => `${col} = $${i + 1}`).join(', ');
  const query = `UPDATE ${tableName} SET ${setQuery} WHERE id = $${columns.length + 1} RETURNING *;`;

  const { rows } = await pool.query(query, [...values, itemId]);
  return rows[0];
};

const deleteItem = async (tableName, itemId) => {
  const query = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *;`;
  const { rows } = await pool.query(query, [itemId]);
  return rows[0];
};

export { createTable, dropTable, createItem, readItems, updateItem, deleteItem };
