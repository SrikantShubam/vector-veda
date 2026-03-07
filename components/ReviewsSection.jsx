"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReviewCard from "./ReviewCard";
import styles from "./ReviewsSection.module.css";

const REVIEWS = [];

function TickerRow({ items, reverse = false }) {
  return (
    <div className={styles.ticker}>
      <ul className={`${styles.track} ${reverse ? styles.trackReverse : ""}`} aria-label="Reviews ticker">
        {[...items, ...items].map((item, index) => (
          <li key={`${item.name}-${index}`} className={styles.item}>
            <ReviewCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const DEFAULT_SECTION = {
  label: "Reviews",
  title: "What Users & Teams Say",
  description: "Feedback from teams that experienced measurable impact through shipped work.",
  items: REVIEWS
};

export default function ReviewsSection({ section = DEFAULT_SECTION }) {
  const data = { ...DEFAULT_SECTION, ...section };
  const reviews = Array.isArray(data.items) && data.items.length ? data.items : REVIEWS;
  const secondRow = [...reviews].reverse();
  const scrollerRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <section className={styles.section} id="reviews" aria-label="Reviews">
      <div className={styles.container}>
        <div className={styles.headingWrapper}>
          <div className={styles.headingMeta}>
            <p className={styles.headingMetaSlash}>//</p>
            <p className={styles.headingMetaText}>
              <span>{data.label}</span>
            </p>
          </div>
          <div className={styles.heading}>
            <h2 className={styles.headingTitle}>
              <span>{data.title}</span>
            </h2>
            <p className={styles.headingDescription}>{data.description}</p>
          </div>
        </div>

        <div className={`${styles.cardsWrap} ${styles.desktopCarousel}`}>
          <TickerRow items={reviews} />
          <TickerRow items={secondRow} reverse />
        </div>

        <div className={styles.mobileCarousel}>
          <div className={styles.mobileScroller} ref={scrollerRef}>
            <ul className={styles.mobileTrack}>
              {reviews.map((item, index) => (
                <li key={`${item.name}-mobile`} className={styles.mobileSlide} ref={(node) => setSlideRef(node, index)}>
                  <ReviewCard item={item} />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.mobileDots}>
            {reviews.map((item, index) => (
              <button
                key={`${item.name}-dot`}
                type="button"
                className={styles.mobileDotButton}
                aria-label={`Show review ${index + 1}`}
                onClick={() => scrollToIndex(index)}
              >
                <span className={`${styles.mobileDot} ${activeIndex === index ? styles.mobileDotActive : ""}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
