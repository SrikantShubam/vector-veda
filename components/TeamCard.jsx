import { FaAnglesRight, FaLinkedinIn } from "react-icons/fa6";
import styles from "./TeamCard.module.css";

export default function TeamCard({ member, isExpanded, onToggle }) {
  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <article
      className={`${styles.card} ${isExpanded ? styles.cardExpanded : ""}`}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      onClick={onToggle}
      onKeyDown={onKeyDown}
    >
      <div className={styles.cardImageWrapper}>
        <div className={styles.cardImageScale}>
          <img src={member.image} alt={member.name} className={styles.cardImage} decoding="async" />
        </div>
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTop}>
          <div className={styles.cardHeading}>
            <h3 className={styles.cardTitle}>{member.name}</h3>
            <p className={styles.cardRole}>
              <span>{member.role}</span>
            </p>
          </div>
          <FaAnglesRight className={styles.cardArrow} aria-hidden="true" />
        </div>

        <div className={styles.cardInfoBottom}>
          <p className={styles.cardBio}>{member.bio}</p>
          <a
            className={styles.socialLink}
            href={member.socialUrl || "#"}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} social profile`}
            onClick={(event) => event.stopPropagation()}
          >
            <FaLinkedinIn aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
