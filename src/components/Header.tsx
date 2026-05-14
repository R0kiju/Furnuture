import React, { useEffect, useState } from 'react';
import { useCartStore } from '../store/cartStore';

interface HeaderProps {
  onOpenModal: (type: 'catalog' | 'shipping' | 'about' | 'cart') => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const totalItems = useCartStore((s) => s.totalItems());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container header__inner">
        <div className="header__logo">furniture — shop</div>

        <nav className="header__nav">
          <button className="header__nav-btn" onClick={() => onOpenModal('catalog')}>
            Каталог
          </button>
          <button className="header__nav-btn" onClick={() => onOpenModal('shipping')}>
            Доставка и оплата
          </button>
          <button className="header__nav-btn" onClick={() => onOpenModal('about')}>
            О компании
          </button>
          <button
            id="cart-button"
            className="header__cart-btn"
            onClick={() => onOpenModal('cart')}
          >
            Корзина{totalItems > 0 ? ` (${totalItems})` : ''}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
