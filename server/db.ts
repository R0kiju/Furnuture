import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const dbPath = path.resolve('./database.sqlite');
const db = new Database(dbPath);

// Initialize table
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    material TEXT,
    specs TEXT
  )
`);

// Seed if empty
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, category, price, description, material, specs)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const initialData = [
    ["Минималистичный диван", "Диваны", 1200, "Стильный диван...", "Шерсть, дуб", "220x75x95"],
    ["Ортопедический матрас", "Матрасы", 850, "Комфорт...", "Латекс", "200x160x25"]
  ];
  for (const row of initialData) insert.run(...row);
}

export default db;
