import React from 'react';
import { 
  Bed, 
  BedSingle, 
  Sofa, 
  Armchair, 
  ShoppingBag, 
  Square, 
  Layers 
} from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Матрасы': <Bed size={20} strokeWidth={1.5} />,
  'Кровати': <BedSingle size={20} strokeWidth={1.5} />,
  'Диваны': <Sofa size={20} strokeWidth={1.5} />,
  'Кресла': <Armchair size={20} strokeWidth={1.5} />,
  'Текстиль': <ShoppingBag size={20} strokeWidth={1.5} />,
  'Подушки': <Square size={20} strokeWidth={1.5} />,
  'Одеяла': <Layers size={20} strokeWidth={1.5} />,
};

interface CategoryNavProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryClick: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories, onCategoryClick }) => {
  return (
    <div className="category-nav">
      <div className="container">
        <div className="category-nav__list">
          {categories.map((cat) => (
            <button 
              key={cat} 
              className="category-nav__item"
              onClick={() => onCategoryClick(cat)}
            >
              <span className="category-nav__icon">
                {CATEGORY_ICONS[cat] || <ShoppingBag size={20} strokeWidth={1.5} />}
              </span>
              <span className="category-nav__label">{cat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
