"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "@/styles/containerScrollShowcase.module.scss";

const typedWords = ["rapi", "cepat", "mudah", "pintar", "otomatis"] as const;
const proofChips = ["POS Kasir", "QR Menu", "Laporan WhatsApp"] as const;

export function ContainerScrollShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(typedWords.join(", "));
      return;
    }

    const currentWord = typedWords[wordIndex];
    const isComplete = displayText === currentWord;
    const isEmpty = displayText.length === 0;
    const delay = isComplete ? 1250 : isDeleting ? 40 : 62;

    const timeoutId = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setWordIndex((currentIndex) => (currentIndex + 1) % typedWords.length);
        return;
      }

      setDisplayText((currentText) =>
        isDeleting
          ? currentText.slice(0, -1)
          : currentWord.slice(0, Math.min(currentText.length + 1, currentWord.length)),
      );
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [displayText, isDeleting, shouldReduceMotion, wordIndex]);

  return (
    <section
      className={styles.section}
      data-section="dashboard-scroll-showcase"
      aria-labelledby="dashboard-showcase-title"
    >
      <div className={styles.panel}>
        <span className={styles.eyebrow}>Satu sistem untuk operasional outlet</span>

        <h2 id="dashboard-showcase-title" className={styles.title}>
          Kelola outlet jadi lebih{" "}
          <span className={styles.typedWrap} aria-live="polite">
            <span className={styles.typedText}>{displayText || typedWords[wordIndex]}</span>
            {!shouldReduceMotion ? <span className={styles.cursor} aria-hidden="true" /> : null}
          </span>
        </h2>

        <p className={styles.subtitle}>
          Pantau POS kasir, QR menu, kitchen, stok, transaksi, dan laporan dari satu tempat yang mudah dipakai
          owner maupun staff.
        </p>

        <div className={styles.actions}>
          <a href="#coba-gratis" className={styles.primaryCta}>
            Coba Gratis
          </a>
          <a href="#harga" className={styles.secondaryCta}>
            Lihat Harga
          </a>
        </div>

        <div className={styles.proofChips} aria-label="Modul utama Outletmu">
          {proofChips.map((chip) => (
            <span key={chip}>
              <i aria-hidden="true" />
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
