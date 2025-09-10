import { FaTelegramPlane, FaVk, FaInstagram } from 'react-icons/fa';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.column} ${styles.navigation}`}>
        <h4>Навигация</h4>
        <a href="#works">Работы</a>
        <a href="#about">Обо мне</a>
        <a href="#arsenal">Арсенал</a>
        <a href="#contacts">Контакты</a>
      </div>

      <div className={`${styles.column} ${styles.identity}`}>
        <img src="/logo.png" alt="Логотип" className={styles.logo} />
        <img src="/zamzamich.png" alt="Zamzamich" className={styles.nameLogo} />
      </div>
      
      <div className={`${styles.column} ${styles.contactsInfo}`}>
        <h4>Контакты</h4>
        <a href="mailto:edgaaarrr@mail.ru">edgaaarrr@mail.ru</a>
        <a href="mailto:zmgarik@gmail.com">zmgarik@gmail.com</a>
        <a href="tel:+77021582932">+7 (702) 158-29-32</a>
        <div className={styles.socials}>
          <a href="https://t.me/+77021582932" target="_blank" rel="noopener noreferrer"><FaTelegramPlane /></a>
          <a href="https://vk.com/minerofyourhearts" target="_blank" rel="noopener noreferrer"><FaVk /></a>
          <a href="https://www.instagram.com/mcciahha.oos" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        </div>
        <p className={styles.location}>Шымкент</p>
      </div>
    </footer>
  );
}

export default Footer;