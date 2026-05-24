"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import styles from "@/styles/containerScrollShowcase.module.scss";

const typedWords = ["rapi", "cepat", "mudah", "pintar", "otomatis"] as const;
const proofChips = ["POS Kasir", "QR Menu", "Laporan WhatsApp"] as const;
const typingSpeed = 58;
const completedPause = 1150;
const fadeOutDuration = 220;
const nextWordDelay = 120;
const dashboardImage = {
  src: "/images/landing/outletmu-dashboard-showcase-crisp.png",
  width: 3072,
  height: 1920,
  alt: "Dashboard Outletmu untuk memantau POS kasir, QR menu, stok, kitchen, transaksi, dan laporan",
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => {
      mediaQuery.removeEventListener("change", updateMobileState);
    };
  }, []);

  return isMobile;
}

type TypewriterPhase = "typing" | "pause" | "fade" | "reset";

export function ContainerScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<TypewriterPhase>("typing");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 25%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    mass: 0.35,
  });

  const desktopY = useTransform(smoothProgress, [0.08, 0.58], [64, 0]);
  const mobileY = useTransform(smoothProgress, [0.08, 0.58], [24, 0]);
  const desktopScale = useTransform(smoothProgress, [0.08, 0.58], [0.96, 1]);
  const mobileScale = useTransform(smoothProgress, [0.08, 0.58], [0.985, 1]);
  const desktopOpacity = useTransform(smoothProgress, [0.04, 0.42], [0.78, 1]);
  const mobileOpacity = useTransform(smoothProgress, [0.04, 0.42], [0.9, 1]);
  const desktopRotateX = useTransform(smoothProgress, [0.08, 0.58], [6, 0]);
  const mobileRotateX = useTransform(smoothProgress, [0.08, 0.58], [0, 0]);

  const cardY = isMobile ? mobileY : desktopY;
  const cardScale = isMobile ? mobileScale : desktopScale;
  const cardOpacity = isMobile ? mobileOpacity : desktopOpacity;
  const cardRotateX = isMobile ? mobileRotateX : desktopRotateX;

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(typedWords.join(", "));
      return;
    }

    const currentWord = typedWords[wordIndex];
    let timeoutId: number;

    if (phase === "typing") {
      timeoutId = window.setTimeout(() => {
        if (displayText === currentWord) {
          setPhase("pause");
          return;
        }

        setDisplayText(currentWord.slice(0, Math.min(displayText.length + 1, currentWord.length)));
      }, typingSpeed);
    } else if (phase === "pause") {
      timeoutId = window.setTimeout(() => {
        setPhase("fade");
      }, completedPause);
    } else if (phase === "fade") {
      timeoutId = window.setTimeout(() => {
        setDisplayText("");
        setWordIndex((currentIndex) => (currentIndex + 1) % typedWords.length);
        setPhase("reset");
      }, fadeOutDuration);
    } else {
      timeoutId = window.setTimeout(() => {
        setPhase("typing");
      }, nextWordDelay);
    }

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [displayText, phase, prefersReducedMotion, wordIndex]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-section="dashboard-scroll-showcase"
      aria-labelledby="dashboard-showcase-title"
    >
      <div className={styles.stickyWrap}>
        <motion.div
          className={styles.showcaseCard}
          style={{
            y: prefersReducedMotion ? 0 : cardY,
            scale: prefersReducedMotion ? 1 : cardScale,
            opacity: prefersReducedMotion ? 1 : cardOpacity,
            rotateX: prefersReducedMotion ? 0 : cardRotateX,
            transformOrigin: "center center",
          }}
        >
          <div className={styles.copyColumn}>
            <span className={styles.eyebrow}>Satu sistem untuk operasional outlet</span>

            <h2 id="dashboard-showcase-title" className={styles.title}>
              Kelola outlet jadi lebih{" "}
              <span className={styles.typedWrap} aria-live="polite">
                <span
                  className={`${styles.typedWord} ${phase === "fade" ? styles.typedWordFading : ""}`}
                >
                  {displayText}
                </span>
                {!prefersReducedMotion ? <span className={styles.cursor} aria-hidden="true" /> : null}
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

          <div className={styles.imageColumn}>
            <div className={styles.imageFrame}>
              <Image
                src={dashboardImage.src}
                alt={dashboardImage.alt}
                width={dashboardImage.width}
                height={dashboardImage.height}
                quality={100}
                priority
                sizes="(max-width: 768px) 94vw, 1120px"
                className={styles.showcaseImage}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
