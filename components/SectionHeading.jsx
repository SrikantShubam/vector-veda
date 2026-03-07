import styles from "./SectionHeading.module.css";

function joinClassNames(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function SectionHeading({ label, title, description, align = "left" }) {
  const alignClass = align === "center" ? styles.center : styles.left;

  return (
    <header className={joinClassNames(styles.root, alignClass)}>
      <p className={styles.label}>{label}</p>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}

