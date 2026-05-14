import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__info">
            <h3 className="footer__logo">𝓕𝓾𝓻𝓷𝓲𝓽𝓾𝓻𝓮 — 𝓼𝓱𝓸𝓹</h3>
            <p className="footer__desc">
              Furniture-shop — это не просто мебель, а искусство и комфорт в повседневной жизни человека. 
              Сочетание изящества и здорового сна. Наш приоритет — ваше удобство и стиль.
            </p>
          </div>
          
          <div className="footer__contacts">
            <h4 className="footer__label">Контакты</h4>
            <p className="footer__text">Тел.: +7 775 453 89 83</p>
            <p className="footer__text">Email: info@furniture-shop.kz</p>
          </div>

          <div className="footer__address">
            <h4 className="footer__label">Юридический адрес</h4>
            <p className="footer__text">г. Астана, ул. Орлыкол 14/3</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2026 Furniture-shop. Все права защищены.</p>
          <div className="footer__socials">
            <a href="#" className="footer__link">Instagram</a>
            <a href="#" className="footer__link">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
