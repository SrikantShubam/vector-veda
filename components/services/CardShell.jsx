import styles from "../ServicesSection.module.css";

export default function CardShell({
  icon: Icon,
  title,
  description,
  className = "",
  markers = ["active", "active", "active"],
  children
}) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      <div className={styles.cardTop}>
        <div className={styles.iconRow}>
          <div className={styles.iconWrapper}>{Icon ? <Icon /> : null}</div>
          <div className={styles.headerTicks} aria-hidden="true">
            {markers.map((tone, idx) => (
              <span
                // index is stable because marker count and order are static per card.
                key={`${tone}-${idx}`}
                className={tone === "muted" ? styles.markerMuted : styles.markerActive}
              />
            ))}
          </div>
        </div>
        <div className={styles.textContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </div>
      {children}
    </article>
  );
}
