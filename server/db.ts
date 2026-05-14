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
    specs TEXT,
    image TEXT,
    images TEXT
  )
`);

// Seed if empty
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, category, price, description, material, specs, image, images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const initialData = [
    // Матрасы
    ["Матрас Азур", "Матрасы", 150000, "Премиальный матрас Азур.", "Латекс, пена", "200x160", "/mattresses/azur/Airbrush-IMAGE-ENHANCER-1778788602343-1778788602343.png", JSON.stringify(["/mattresses/azur/Airbrush-IMAGE-ENHANCER-1778788602343-1778788602343.png", "/mattresses/azur/Airbrush-IMAGE-ENHANCER-1778788656845-1778788656845.png", "/mattresses/azur/azur-3.png"])],
    ["Матрас Нуар", "Матрасы", 160000, "Элегантный матрас Нуар.", "Пена с памятью", "200x180", "/mattresses/noir/snapedit_1778788706583.jpeg", JSON.stringify(["/mattresses/noir/snapedit_1778788706583.jpeg", "/mattresses/noir/Airbrush-IMAGE-ENHANCER-1778788737646-1778788737646.png", "/mattresses/noir/noir-3.png"])],
    ["Матрас Серенти", "Матрасы", 145000, "Спокойный сон с Серенти.", "Пружинный блок", "200x160", "/mattresses/serenti/snapedit_1778789265252.jpeg", JSON.stringify(["/mattresses/serenti/snapedit_1778789265252.jpeg", "/mattresses/serenti/snapedit_1778789287414.jpeg", "/mattresses/serenti/snapedit_1778789309549.jpeg"])],
    ["Матрас Эмеральд", "Матрасы", 170000, "Роскошный Эмеральд.", "Натуральные материалы", "200x180", "/mattresses/emerald/snapedit_1778789366415.jpeg", JSON.stringify(["/mattresses/emerald/snapedit_1778789366415.jpeg", "/mattresses/emerald/snapedit_1778789377680.jpeg", "/mattresses/emerald/snapedit_1778789384896.jpeg"])],

    // Диваны
    ["Белый Диван", "Диваны", 250000, "Минималистичный белый диван.", "Ткань, дерево", "220x100", "/sofa-white.jpg", null],
    ["Серый Диван", "Диваны", 230000, "Современный серый диван.", "Велюр", "200x90", "/sofa-gray.jpeg", null],
    ["Темно-синий Диван", "Диваны", 240000, "Глубокий синий цвет.", "Рогожка", "210x95", "/sofa-darkblue.jpeg", null],
    ["Коричневый Диван", "Диваны", 220000, "Классический коричневый.", "Экокожа", "200x100", "/sofa-brown.jpeg", null],

    // Кровати (Каркасы)
    ["Белый Каркас", "Кровати", 120000, "Прочный белый каркас.", "Металл", "200x160", "/bed-white.jpg", null],
    ["Черный Каркас", "Кровати", 115000, "Стильный черный каркас.", "Металл", "200x160", "/bed-black.jpg", null],
    ["Серый Каркас", "Кровати", 118000, "Нейтральный серый каркас.", "Металл", "200x160", "/bed-gray.jpg", null],

    // Кресла
    ["Белое Кресло", "Кресла", 45000, "Мягкое белое кресло.", "Букле", "80x80", "/chair-white.jpg", null],
    ["Серое Кресло", "Кресла", 42000, "Удобное серое кресло.", "Текстиль", "80x80", "/chair-gray.jpg", null],
    ["Темно-синее Кресло", "Кресла", 46000, "Элегантное синее кресло.", "Бархат", "85x85", "/chair-darkblue.jpg", null],

    // Текстиль
    ["Белый Текстиль", "Текстиль", 15000, "Качественный белый текстиль.", "Хлопок", "Set", "/textile-white.png", null],
    ["Розовый Текстиль", "Текстиль", 16000, "Нежный розовый текстиль.", "Сатин", "Set", "/textile-pink.png", null],
    ["Серый Текстиль", "Текстиль", 15500, "Практичный серый текстиль.", "Лен", "Set", "/textile-gray.png", null],

    // Подушки
    ["Белая Подушка", "Подушки", 5000, "Мягкая белая подушка.", "Пух", "50x70", "/pillow-white.jpg", null],
    ["Серая Подушка", "Подушки", 5200, "Стильная серая подушка.", "Хлопок", "50x70", "/pillow-gray.jpg", null],
    ["Черная Подушка", "Подушки", 5500, "Строгая черная подушка.", "Лен", "50x70", "/pillow-black.jpg", null],

    // Одеяла
    ["Белое Одеяло", "Одеяла", 12000, "Теплое белое одеяло.", "Шерсть", "200x220", "/blanket-white.png", null],
    ["Розовое Одеяло", "Одеяла", 12500, "Уютное розовое одеяло.", "Хлопок", "200x220", "/blanket-pink.png", null],
    ["Серое Одеяло", "Одеяла", 12000, "Классическое серое одеяло.", "Синтепон", "200x220", "/blanket-gray.png", null]
  ];
  for (const row of initialData) insert.run(...row);
}

export default db;
