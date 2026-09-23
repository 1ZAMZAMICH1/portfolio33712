import styles from './LiquidGold.module.css';

export default function LiquidGold() {
  return (
    <div className={styles.liquidContainer}>
      <div className={styles.blobMaster}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>
        <div className={styles.blob4}></div>
      </div>
      <div className={styles.noiseOverlay}></div>
    </div>
  );
}
