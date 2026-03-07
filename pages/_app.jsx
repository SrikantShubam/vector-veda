import { useEffect } from "react";
import "../styles/globals.css";
import "../styles/themes.css";
import "../styles/accessibility.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const root = document.documentElement;
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
    const storedA11y = window.localStorage.getItem("phase4-a11y");
    root.dataset.theme = "forest";
    root.dataset.a11y = storedA11y || "enhanced";
    window.requestAnimationFrame(() => {
      root.dataset.appReady = "true";
    });

    if (coarsePointer.matches) {
      root.dataset.cursorActive = "false";
      return;
    }

    const updateCursor = (event) => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.dataset.cursorActive = "true";
    };

    const hideCursor = () => {
      root.dataset.cursorActive = "false";
    };

    window.addEventListener("pointermove", updateCursor, { passive: true });
    window.addEventListener("blur", hideCursor);
    window.addEventListener("pointerleave", hideCursor);

    return () => {
      window.removeEventListener("pointermove", updateCursor);
      window.removeEventListener("blur", hideCursor);
      window.removeEventListener("pointerleave", hideCursor);
    };
  }, []);

  return (
    <>
      <div className="global-cursor-lens" aria-hidden="true" />
      <Component {...pageProps} />
    </>
  );
}
