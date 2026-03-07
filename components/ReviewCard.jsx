import { FaQuoteRight } from "react-icons/fa6";
import styles from "./ReviewCard.module.css";

export default function ReviewCard({ item }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardContent}>
        <h3 className={styles.quote}>{item.quote}</h3>
        <div className={styles.avatar}>
          <div className={styles.avatarImageWrap}>
            <img className={styles.avatarImage} src={item.image} alt={item.name} loading="lazy" />
          </div>
          <div className={styles.avatarText}>
            <h4 className={styles.name}>{item.name}</h4>
            <p className={styles.role}>
              <span>{item.role}</span>
            </p>
          </div>
          <FaQuoteRight className={styles.avatarIcon} aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}
