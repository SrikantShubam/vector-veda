"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FaAnglesRight, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "./CaseStudiesSection.module.css";

const CASE_STUDIES = [];

const DEFAULT_SECTION = {
  label: "Work",
  title: "Case Studies",
  description: "A selection of projects where we automated workflows and delivered measurable results.",
  items: CASE_STUDIES
};

export default function CaseStudiesSection({ section = DEFAULT_SECTION }) {
  const data = { ...DEFAULT_SECTION, ...section };
  const items = Array.isArray(data.items) && data.items.length ? data.items : CASE_STUDIES;
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  const slideRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const autoplayPauseRef = useRef(false);
  const interactionTimeoutRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const setSlideRef = useCallback((node, index) => {
    slideRefs.current[index] = node;
  }, []);

  const syncActiveIndex = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || slideRefs.current.length === 0) return;

    const scrollLeft = scroller.scrollLeft;
    let closestIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;
      const slideLeft = slide.offsetLeft - scroller.offsetLeft;
      const distance = Math.abs(slideLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex((previous) => (previous === closestIndex ? previous : closestIndex));
  }, []);

  const scrollToIndex = useCallback((index) => {
    const scroller = scrollerRef.current;
    const slide = slideRefs.current[index];
    if (!scroller || !slide) return;

    const targetLeft = slide.offsetLeft - scroller.offsetLeft;
    scroller.scrollTo({
      left: targetLeft,
      behavior: "smooth"
    });
    setActiveIndex(index);
  }, []);

  const pauseAutoplay = useCallback(() => {
    autoplayPauseRef.current = true;
  }, []);

  const resumeAutoplay = useCallback(() => {
    autoplayPauseRef.current = false;
  }, []);

  const pauseAfterInteraction = useCallback(() => {
    autoplayPauseRef.current = true;
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      autoplayPauseRef.current = false;
    }, 3200);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const handleScroll = () => syncActiveIndex();
    const handleResize = () => syncActiveIndex();

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    syncActiveIndex();

    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [syncActiveIndex]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const autoplay = setInterval(() => {
      if (!isSectionVisible || autoplayPauseRef.current || document.hidden) return;
      const nextIndex = (activeIndexRef.current + 1) % items.length;
      scrollToIndex(nextIndex);
    }, 4200);

    return () => clearInterval(autoplay);
  }, [items.length, isSectionVisible, scrollToIndex]);

  useEffect(
    () => () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isSectionVisible ? styles.sectionVisible : ""}`}
      id="case-studies"
      aria-label="Case Studies"
    >
      <div className={styles.container}>
        <div className={`${styles.headingWrapper} ${isSectionVisible ? styles.headingVisible : ""}`}>
          <div className={styles.headingMeta}>
            <p className={styles.headingMetaSlash}>//</p>
            <p className={styles.headingMetaText}>
              <span>{data.label}</span>
            </p>
          </div>
          <div className={styles.headingRow}>
            <div className={styles.headingTitleWrap}>
              <h2 className={styles.headingTitle}>
                <span>{data.title}</span>
              </h2>
            </div>
            <div className={styles.headingBody}>
              <p className={styles.headingDescription}>{data.description}</p>
            </div>
          </div>
        </div>

        <div
          className={styles.sliderShell}
          onMouseEnter={pauseAutoplay}
          onMouseLeave={resumeAutoplay}
          onFocusCapture={pauseAutoplay}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              resumeAutoplay();
            }
          }}
          onPointerDown={pauseAfterInteraction}
          onTouchStart={pauseAfterInteraction}
          onWheel={pauseAfterInteraction}
        >
          <section className={styles.sliderViewport} aria-label="Case studies slider">
            <div className={styles.sliderScroller} ref={scrollerRef}>
              <ul className={styles.sliderTrack}>
                {items.map((item, index) => (
                  <li
                    key={item.id}
                    className={`${styles.slide} ${isSectionVisible ? styles.slideVisible : ""}`}
                    ref={(node) => setSlideRef(node, index)}
                  >
                    <article
                      className={`${styles.card} ${expandedCardId === item.id ? styles.cardExpanded : ""}`}
                      tabIndex={0}
                      role="button"
                      aria-expanded={expandedCardId === item.id}
                      onClick={() => {
                        setExpandedCardId((current) => (current === item.id ? null : item.id));
                      }}
                      onKeyDown={(event) => {
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        setExpandedCardId((current) => (current === item.id ? null : item.id));
                      }}
                    >
                      <div className={styles.cardImageWrapper}>
                        <div className={styles.cardImageScale}>
                          <img src={item.image} alt="" className={styles.cardImage} decoding="async" />
                        </div>
                      </div>
                      <div className={styles.cardInfo}>
                        <div className={styles.cardInfoTop}>
                          <div className={styles.cardHeading}>
                            <h3 className={styles.cardTitle}>{item.name}</h3>
                            <p className={styles.cardCategory}>{item.category}</p>
                          </div>
                          <FaAnglesRight className={styles.cardArrow} aria-hidden="true" />
                        </div>
                        <div className={styles.cardInfoBottom}>
                          <div className={styles.resultBlock}>
                            <div className={styles.resultHeadingRow}>
                              <span className={styles.resultDot} aria-hidden="true" />
                              <h6 className={styles.resultTitle}>{item.resultHeading}</h6>
                            </div>
                            <p className={styles.resultText}>{item.resultText}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <fieldset className={styles.paginationControls} aria-label="Slideshow pagination controls">
            <div className={styles.arrowControls}>
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="Previous"
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              >
                <FaChevronLeft className={styles.arrowIcon} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={styles.arrowButton}
                aria-label="Next"
                onClick={() => scrollToIndex(Math.min(items.length - 1, activeIndex + 1))}
              >
                <FaChevronRight className={styles.arrowIcon} aria-hidden="true" />
              </button>
            </div>
            <div className={styles.dotRail}>
              {items.map((item, index) => (
                <button
                  key={`${item.id}-dot`}
                  type="button"
                  className={styles.dotButton}
                  aria-label={`Scroll to page ${index + 1}`}
                  onClick={() => scrollToIndex(index)}
                >
                  <span
                    className={`${styles.dot} ${activeIndex === index ? styles.dotActive : styles.dotInactive
                      }`}
                  />
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </section>
  );
}
