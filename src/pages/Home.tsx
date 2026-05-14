import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';
import { type Product } from '../types';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';
import { useInView } from '../hooks/useInView';

const CATEGORIES = ['Диваны', 'Матрасы', 'Кресла'];

/* ── Animated category section ──────────────────────────── */
interface CategorySectionProps {
  category: string;
  items: Product[];
  onProductClick: (p: Product) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, items, onProductClick }) => {
  const { ref, inView } = useInView({ threshold: 0.08 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`category-section fade-section${inView ? ' is-visible' : ''}`}
    >
      <div className="container">
        <h2 className="category-title">{category}</h2>
        <div className="product-grid">
          {items.map((product, i) => (
            <div
              key={product.id}
              className={`card-appear${inView ? ' card-appear--visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <ProductCard product={product} onClick={onProductClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Main Home page ──────────────────────────────────────── */
const Home: React.FC = () => {
  const [modalType, setModalType] = useState<
    'catalog' | 'shipping' | 'about' | 'cart' | 'product' | null
  >(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  const cart         = useCartStore((s) => s.cart);
  const addToCart    = useCartStore((s) => s.addToCart);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const totalItems   = useCartStore((s) => s.totalItems());
  const totalPrice   = useCartStore((s) => s.totalPrice());
  const navigate     = useNavigate();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts)
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const openModal = (
    type: 'catalog' | 'shipping' | 'about' | 'cart' | 'product',
    product?: Product
  ) => {
    setModalType(type);
    if (product) setSelectedProduct(product);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
  };

  return (
    <div>
      <Header onOpenModal={(type) => openModal(type)} />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="hero-section">
        <div className="container">
          <span className="hero__label">Новая коллекция — 2026</span>
          <h1 className="hero__title">
            Современная<br />лаконичность
          </h1>
          <p className="hero__desc">
            Минималистичная мебель для современного дома. Фокус на форме,
            функции и натуральных материалах.
          </p>
        </div>
      </section>

      {/* ── PRODUCTS BY CATEGORY (scroll animations) ── */}
      <main>
        {CATEGORIES.map(cat => {
          const items = products.filter(p => p.category === cat);
          if (items.length === 0) return null;
          return (
            <CategorySection
              key={cat}
              category={cat}
              items={items}
              onProductClick={(p) => openModal('product', p)}
            />
          );
        })}
      </main>

      {/* ── CATALOG MODAL ────────────────────────────── */}
      <Modal isOpen={modalType === 'catalog'} onClose={closeModal}>
        <h2 className="modal-title">Каталог</h2>
        <ul className="catalog-list">
          {CATEGORIES.map(cat => (
            <li key={cat}>
              <button onClick={closeModal}>{cat}</button>
            </li>
          ))}
        </ul>
      </Modal>

      {/* ── SHIPPING MODAL ───────────────────────────── */}
      <Modal isOpen={modalType === 'shipping'} onClose={closeModal}>
        <h2 className="modal-title">Доставка и оплата</h2>
        <div className="info-section">
          <p>
            Доставка осуществляется по всей территории Казахстана. 
            Срок доставки занимает в течение <strong>7–14 дней</strong>.
          </p>
          <p>
            Оплата принимается банковскими картами систем <strong>Visa</strong> и <strong>Mastercard</strong>. 
            Все транзакции защищены.
          </p>
        </div>
      </Modal>

      {/* ── ABOUT MODAL ──────────────────────────────── */}
      <Modal isOpen={modalType === 'about'} onClose={closeModal}>
        <h2 className="modal-title">О компании</h2>
        <div className="info-section">
          <p>
            <strong>furniture — shop</strong> — дизайн-студия, создающая
            минималистичную мебель высокого качества.
          </p>
          <p>
            Основанная в 2026 году, мы придерживаемся философии
            «меньше — значит больше». Экологичные материалы, внимание к деталям.
          </p>
        </div>
      </Modal>

      {/* ── PRODUCT DETAIL MODAL ─────────────────────── */}
      <Modal isOpen={modalType === 'product' && !!selectedProduct} onClose={closeModal}>
        {selectedProduct && (
          <div>
            <div className="product-modal__image" />

            <p className="product-modal__category">{selectedProduct.category}</p>
            <h2 className="product-modal__name">{selectedProduct.name}</h2>
            <p className="product-modal__price">
              ${selectedProduct.price.toLocaleString()}
            </p>

            <div className="product-modal__divider" />

            <p className="product-modal__spec-label">Описание</p>
            <p className="product-modal__spec-val">{selectedProduct.description}</p>

            <p className="product-modal__spec-label">Материал</p>
            <p className="product-modal__spec-val">{selectedProduct.material}</p>

            <p className="product-modal__spec-label">Размеры</p>
            <p className="product-modal__spec-val">{selectedProduct.specs}</p>

            <div className="product-modal__divider" />

            <button
              id={`add-to-cart-${selectedProduct.id}`}
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem' }}
              onClick={() => { addToCart(selectedProduct); closeModal(); }}
            >
              {cart.find(i => i.id === selectedProduct.id)
                ? 'Добавить ещё в корзину'
                : 'Добавить в корзину'}
            </button>
          </div>
        )}
      </Modal>

      {/* ── CART MODAL ───────────────────────────────── */}
      <Modal isOpen={modalType === 'cart'} onClose={closeModal}>
        <h2 className="modal-title">
          Корзина
          {totalItems > 0 && (
            <span
              style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                color: 'var(--gray-mid)',
                marginLeft: '0.75rem',
              }}
            >
              {totalItems} позиции
            </span>
          )}
        </h2>

        {cart.length === 0 ? (
          <p className="cart-empty">
            Ваша корзина пуста. Добавьте товары, чтобы продолжить.
          </p>
        ) : (
          <>
            <ul>
              {cart.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__price-unit">
                      ${item.price.toLocaleString()} / шт.
                    </p>
                  </div>

                  {/* Quantity stepper */}
                  <div className="cart-item__qty-ctrl">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Уменьшить"
                    >
                      −
                    </button>
                    <span className="qty-val">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, +1)}
                      aria-label="Увеличить"
                    >
                      +
                    </button>
                  </div>

                  <span className="cart-item__price">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>

                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-total">
              <span className="cart-total__label">Итого</span>
              <span className="cart-total__value">${totalPrice.toLocaleString()}</span>
            </div>

            <button
              id="checkout-btn"
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem' }}
              onClick={() => { closeModal(); navigate('/checkout'); }}
            >
              Перейти к оформлению
            </button>
          </>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default Home;
