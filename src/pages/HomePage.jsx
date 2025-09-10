import AnimatedBackground from '../components/AnimatedBackground';
import VhsCategories from '../components/VhsCategories';
import About from '../components/About';
import Contacts from '../components/Contacts';
import Footer from '../components/Footer';
import styles from '../App.module.css';

function HomePage() {
  return (
    <>
      <header className={styles.appHeader}>
        <AnimatedBackground />
        
        <div className={styles.photoContainer}>
          <div className={`${styles.frameContainer} ${styles.backFrame}`}></div>
          <div className={`${styles.frameContainer} ${styles.frontFrame}`}></div>
        </div>
        
        <img src="/my-photo.png" alt="Портрет" className={styles.userPhoto} />

        <div className={styles.textContainer}>
          <img src="/3456743.png" alt="Имя Фамилия" className={styles.nameImage} />
          <p className={styles.role}>Графический дизайнер / Веб-разработчик</p>
        </div>
        
        <div className={styles.scrollDown}>
          <span></span>
        </div>
      </header>

      <VhsCategories />
      
      <About />

      <Contacts />

      <Footer />
    </>
  );
}

export default HomePage;