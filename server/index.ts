import express from 'express';
import cors from 'cors';
import db from './db.ts';

const app = express();
app.use(cors());
app.use(express.json());

// Products
app.get('/api/products', (req, res) => {
  const rows = db.prepare('SELECT * FROM products').all();
  res.json(rows);
});

app.put('/api/products/:id', (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;
  db.prepare('UPDATE products SET name = ?, price = ? WHERE id = ?').run(name, price, id);
  res.json({ success: true });
});

// Orders
app.post('/api/orders', (req, res) => {
  console.log('Order received:', req.body);
  res.status(201).json({ message: 'Заказ успешно оформлен' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
