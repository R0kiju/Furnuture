import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const cart      = useCartStore((s) => s.cart);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice());

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const orderData = {
      name:    formData.get('name'),
      phone:   formData.get('phone'),
      address: formData.get('address'),
      cart,
      total:   totalPrice,
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        clearCart();
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Ошибка отправки заказа:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div>
        <Header onOpenModal={() => {}} />
        <div className="thankyou">
          <CheckCircle size={40} strokeWidth={1.5} />
          <h1 className="thankyou__title">Спасибо!</h1>
          <p className="thankyou__sub">
            Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время.
          </p>
          <button
            id="back-to-home-btn"
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Вернуться в магазин
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header onOpenModal={() => {}} />
      <div className="checkout-page">
        <div className="container">

          <button
            id="back-btn"
            className="btn btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={15} /> Назад в магазин
          </button>

          <div className="checkout-grid">

            {/* ── FORM ── */}
            <div>
              <h1 className="checkout-form-title">Оформление заказа</h1>
              <form id="checkout-form" onSubmit={handleSubmit}>

                <div className="form-group">
                  <label className="form-label" htmlFor="name">ФИО</label>
                  <input id="name" name="name" type="text"
                    className="form-input" placeholder="Иван Иванов" required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Телефон</label>
                  <input id="phone" name="phone" type="tel"
                    className="form-input" placeholder="+7 (999) 000-00-00" required />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Адрес доставки</label>
                  <input id="address" name="address" type="text"
                    className="form-input" placeholder="г. Москва, ул. Примерная, д. 1" required />
                </div>

                <div className="checkout-divider" />

                <div className="form-group">
                  <label className="form-label" htmlFor="card">Номер карты</label>
                  <input id="card" type="text" className="form-input"
                    placeholder="0000 0000 0000 0000" maxLength={19} required
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      e.target.value = raw.replace(/(.{4})/g, '$1 ').trim();
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="expiry">Срок</label>
                    <input id="expiry" type="text" className="form-input"
                      placeholder="MM/YY" maxLength={5} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="cvv">CVV</label>
                    <input id="cvv" type="text" className="form-input"
                      placeholder="•••" maxLength={3} required />
                  </div>
                </div>

                <button
                  id="submit-order-btn"
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}
                  disabled={loading || cart.length === 0}
                >
                  {loading
                    ? 'Отправляем…'
                    : `Подтвердить — $${totalPrice.toLocaleString()}`}
                </button>
              </form>
            </div>

            {/* ── ORDER SUMMARY ── */}
            <div>
              <div className="checkout-summary-card">
                <h2 className="checkout-summary-title">Ваш заказ</h2>

                {cart.length === 0 ? (
                  <p style={{ color: 'var(--gray-mid)', fontSize: '0.88rem' }}>
                    Корзина пуста
                  </p>
                ) : (
                  <>
                    {cart.map(item => (
                      <div key={item.id} className="checkout-summary-item">
                        <span>
                          {item.name}
                          <span style={{ color: 'var(--gray-mid)', marginLeft: '0.4rem', fontSize: '0.82rem' }}>
                            × {item.quantity}
                          </span>
                        </span>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="checkout-summary-total">
                      <span className="checkout-summary-total-label">Итого</span>
                      <span className="checkout-summary-total-value">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
