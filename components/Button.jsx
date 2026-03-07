import styles from "./Button.module.css";

function joinClassNames(...parts) {
  return parts.filter(Boolean).join(" ");
}

export default function Button({
  href,
  type = "button",
  children,
  className,
  onMouseEnter,
  onMouseLeave,
  onClick,
  target,
  rel,
  ariaLabel
}) {
  const classes = joinClassNames(styles.button, className);
  const text = typeof children === "string" ? children : "Button";

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel || text}
      >
        <span className={styles.gradient} />
        <span className={styles.background} />
        <span className={styles.textWrap}>
          <span className={styles.text}>{children}</span>
          <span className={styles.text} aria-hidden="true">
            {children}
          </span>
        </span>
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel || text}
    >
      <span className={styles.gradient} />
      <span className={styles.background} />
      <span className={styles.textWrap}>
        <span className={styles.text}>{children}</span>
        <span className={styles.text} aria-hidden="true">
          {children}
        </span>
      </span>
    </button>
  );
}
