import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "./Button";
import styles from "./Navbar.module.css";
import { resolveSiteHref } from "../lib/resolveHref";

const DEFAULT_NAV = {
  brandName: "Vector Veda",
  brandHref: "/",
  ctaLabel: "Get in touch",
  ctaHref: "#contact",
  items: [
    { label: "Services", href: "#services" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "How It Works", href: "#process" },
    { label: "Expertise", href: "#metrix" },
    { label: "FAQ", href: "#faqs" },
    { label: "Reviews", href: "#reviews" },
    { label: "Get in touch", href: "#contact" }
  ]
};

export default function Navbar({ navigation = DEFAULT_NAV }) {
  const router = useRouter();
  const { items, brandName, brandHref, ctaLabel, ctaHref } = { ...DEFAULT_NAV, ...navigation };
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const barRef = useRef(null);
  const pathname = router.pathname || "/";
  const resolvedBrandHref = resolveSiteHref(brandHref, pathname);
  const resolvedCtaHref = resolveSiteHref(ctaHref, pathname);
  const resolvedItems = items.map((item) => ({
    ...item,
    resolvedHref: resolveSiteHref(item.href, pathname)
  }));

  const setCursorActive = useCallback((active) => {
    const bar = barRef.current;
    if (!bar) {
      return;
    }
    bar.dataset.cursorActive = active ? "true" : "false";
  }, []);

  const handleBarMouseMove = useCallback((event) => {
    const bar = barRef.current;
    if (!bar) {
      return;
    }
    const bounds = bar.getBoundingClientRect();
    bar.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    bar.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
  }, []);

  const panelClassName = useMemo(
    () => `${styles.mobilePanel} ${isOpen ? styles.mobilePanelOpen : ""}`,
    [isOpen]
  );
  const buttonClassName = useMemo(
    () => `${styles.menuButton} ${isOpen ? styles.menuButtonOpen : ""}`,
    [isOpen]
  );

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 24;
      const doc = document.documentElement;
      const nearBottom = window.innerHeight + scrollY >= doc.scrollHeight - 64;
      setIsScrolled(scrolled);

      if (!scrolled) {
        document.body.dataset.scrollState = "top";
      } else if (nearBottom) {
        document.body.dataset.scrollState = "bottom";
      } else {
        document.body.dataset.scrollState = "scrolled";
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      delete document.body.dataset.scrollState;
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveHref("");
      return undefined;
    }

    const sectionItems = items.filter((item) => item.href && item.href.startsWith("#") && item.href.length > 1);
    if (!sectionItems.length) return undefined;

    const resolveActive = () => {
      const probeY = window.scrollY + 180;
      let current = "";

      sectionItems.forEach((item) => {
        const sectionNode = document.querySelector(item.href);
        if (!sectionNode) return;
        if (sectionNode.offsetTop - 140 <= probeY) {
          current = item.href;
        }
      });

      setActiveHref(current);
    };

    resolveActive();
    window.addEventListener("scroll", resolveActive, { passive: true });
    window.addEventListener("resize", resolveActive);
    return () => {
      window.removeEventListener("scroll", resolveActive);
      window.removeEventListener("resize", resolveActive);
    };
  }, [items, pathname]);

  return (
    <header className={styles.shell} data-scrolled={isScrolled ? "true" : "false"}>
      <div className={styles.track}>
        <nav
          ref={barRef}
          className={styles.bar}
          aria-label="Primary"
          data-cursor-active="false"
          data-scrolled={isScrolled ? "true" : "false"}
          onMouseMove={handleBarMouseMove}
          onMouseLeave={() => setCursorActive(false)}
        >
          <a
            className={styles.logoWrap}
            href={resolvedBrandHref}
            aria-label="Logo Link"
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
          >
            <img
              className={styles.logoImage}
              src="/logo-vector-veda.png"
              alt="Vector Veda logo"
              width="42"
              height="42"
            />
            <span className={styles.logoText}>{brandName}</span>
          </a>

          <div className={styles.menu}>
            {resolvedItems.map((item) => (
              (() => {
                const chars = Array.from(item.label);
                const spread = chars.length > 1 ? chars.length - 1 : 1;
                return (
                  <a
                    key={item.href}
                    className={`${styles.menuLink} ${isScrolled && activeHref === item.href ? styles.menuLinkActive : ""
                      }`}
                    href={item.resolvedHref}
                    aria-label={item.label}
                    onMouseEnter={() => setCursorActive(true)}
                    onMouseLeave={() => setCursorActive(false)}
                  >
                    <span className={styles.menuRollGlyphs} aria-hidden="true">
                      {chars.map((char, index) => (
                        <span
                          key={`${item.href}-${index}`}
                          className={styles.menuGlyph}
                          style={{
                            "--char-delay": `${((0.4 * 0.35) / spread) * index}s`
                          }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </span>
                  </a>
                );
              })()
            ))}
          </div>

          <Button
            className={styles.cta}
            href={resolvedCtaHref}
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
          >
            {ctaLabel}
          </Button>

          <button
            type="button"
            className={buttonClassName}
            aria-expanded={isOpen}
            aria-controls="phase4-mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((prev) => !prev)}
            onMouseEnter={() => setCursorActive(true)}
            onMouseLeave={() => setCursorActive(false)}
          >
            <span className={styles.menuLineTop} />
            <span className={styles.menuLineBottom} />
          </button>

          <span className={styles.pointerLens} aria-hidden="true" />
        </nav>

        <div className={panelClassName} id="phase4-mobile-menu">
          {resolvedItems.map((item) => (
            <a
              key={`mobile-${item.href}`}
              className={styles.mobileLink}
              href={item.resolvedHref}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button
            className={styles.mobileCtaButton}
            href={resolvedCtaHref}
            onClick={() => setIsOpen(false)}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </header>
  );
}
