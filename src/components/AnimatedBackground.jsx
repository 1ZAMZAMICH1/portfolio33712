import styles from './AnimatedBackground.module.css';

function AnimatedBackground() {
  return (
    <div className={styles.animatedBackground}>
      <div className={`${styles.bgColumn} ${styles.scrollUp}`}></div>
      <div className={`${styles.bgColumn} ${styles.scrollDown}`}></div>
      <div className={`${styles.bgColumn} ${styles.scrollUp}`}></div>
      <div className={`${styles.bgColumn} ${styles.scrollDown}`}></div>
      <div className={`${styles.bgColumn} ${styles.scrollUp}`}></div>
    </div>
  );
}

export default AnimatedBackground;