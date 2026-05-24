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

  const desktopY = useTransform(smoothProgress, [0.08, 0.58], [72, 0]);
  const mobileY = useTransform(smoothProgress, [0.08, 0.58], [28, 0]);
  const desktopScale = useTransform(smoothProgress, [0.08, 0.58], [0.96, 1]);
  const mobileScale = useTransform(smoothProgress, [0.08, 0.58], [0.985, 1]);
  const desktopOpacity = useTransform(smoothProgress, [0.04, 0.42], [0.75, 1]);
  const mobileOpacity = useTransform(smoothProgress, [0.04, 0.42], [0.9, 1]);
  const desktopRotateX = useTransform(smoothProgress, [0.08, 0.58], [8, 0]);
  const mobileRotateX = useTransform(smoothProgress, [0.08, 0.58], [0, 0]);
  const desktopImageY = useTransform(smoothProgress, [0.12, 0.7], [96, 0]);
  const mobileImageY = useTransform(smoothProgress, [0.12, 0.7], [36, 0]);
  const desktopImageScale = useTransform(smoothProgress, [0.12, 0.7], [0.94, 1]);
  const mobileImageScale = useTransform(smoothProgress, [0.12, 0.7], [0.985, 1]);
  const desktopImageOpacity = useTransform(smoothProgress, [0.08, 0.5], [0.7, 1]);
  const mobileImageOpacity = useTransform(smoothProgress, [0.08, 0.5], [0.88, 1]);
  const desktopImageRotateX = useTransform(smoothProgress, [0.12, 0.7], [10, 0]);
  const mobileImageRotateX = useTransform(smoothProgress, [0.12, 0.7], [0, 0]);

  const panelY = isMobile ? mobileY : desktopY;
  const panelScale = isMobile ? mobileScale : desktopScale;
  const panelOpacity = isMobile ? mobileOpacity : desktopOpacity;
  const panelRotateX = isMobile ? mobileRotateX : desktopRotateX;
  const imageY = isMobile ? mobileImageY : desktopImageY;
  const imageScale = isMobile ? mobileImageScale : desktopImageScale;
  const imageOpacity = isMobile ? mobileImageOpacity : desktopImageOpacity;
  const imageRotateX = isMobile ? mobileImageRotateX : desktopImageRotateX;

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
          className={styles.typewriterPanel}
          style={{
            y: prefersReducedMotion ? 0 : panelY,
            scale: prefersReducedMotion ? 1 : panelScale,
            opacity: prefersReducedMotion ? 1 : panelOpacity,
            rotateX: prefersReducedMotion ? 0 : panelRotateX,
            transformOrigin: "center center",
          }}
        >
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
        </motion.div>

        <motion.div
          className={styles.showcaseImageCard}
          style={{
            y: prefersReducedMotion ? 0 : imageY,
            scale: prefersReducedMotion ? 1 : imageScale,
            opacity: prefersReducedMotion ? 1 : imageOpacity,
            rotateX: prefersReducedMotion ? 0 : imageRotateX,
            transformOrigin: "center center",
          }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
