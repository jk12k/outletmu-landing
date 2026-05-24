"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "@/styles/containerScrollShowcase.module.scss";

const showcaseBadges = ["POS Kasir", "QR Menu", "Kitchen Display", "Stok", "Laporan"] as const;

const dashboardImage = {
  src: "/images/landing/outletmu-dashboard-showcase-crisp.png",
  width: 3072,
  height: 1920,
  alt: "Dashboard Outletmu untuk memantau POS, QR menu, stok, kitchen, dan laporan",
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

export function ContainerScrollShowcase() {
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [typedIndex, setTypedIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedIndex(0);
      return;
    }

    const intervalId = window.setInterval(() => {
      setTypedIndex((currentIndex) => (currentIndex + 1) % showcaseBadges.length);
    }, 1600);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [shouldReduceMotion]);

  const desktopRotateX = useTransform(scrollYProgress, [0, 0.65], [24, 0]);
  const mobileRotateX = useTransform(scrollYProgress, [0, 0.62], [8, 0]);
  const desktopScale = useTransform(scrollYProgress, [0, 0.65], [0.84, 1]);
  const mobileScale = useTransform(scrollYProgress, [0, 0.62], [0.95, 1]);
  const desktopY = useTransform(scrollYProgress, [0, 0.65], [140, 0]);
  const mobileY = useTransform(scrollYProgress, [0, 0.62], [36, 0]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.25], [0.82, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.42, 0.78], [44, 0, -14]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.24], [0.86, 1]);

  const frameMotionStyle = shouldReduceMotion
    ? { opacity: 1, rotateX: 0, scale: 1, y: 0 }
    : {
        opacity: frameOpacity,
        rotateX: isMobile ? mobileRotateX : desktopRotateX,
        scale: isMobile ? mobileScale : desktopScale,
        y: isMobile ? mobileY : desktopY,
      };

  const titleMotionStyle = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: titleOpacity, y: titleY };

  return (
    <section
      ref={containerRef}
      className={styles.section}
      data-section="dashboard-scroll-showcase"
      aria-labelledby="dashboard-showcase-title"
    >
      <div className={styles.ambientOne} aria-hidden="true" />
      <div className={styles.ambientTwo} aria-hidden="true" />

      <div className={styles.stickyWrap}>
        <motion.div className={styles.copy} style={titleMotionStyle}>
          <span className={styles.eyebrow}>Dashboard Outletmu</span>
          <h2 id="dashboard-showcase-title">
            Lihat <span className={styles.typedText}>{showcaseBadges[typedIndex]}</span> dalam satu dashboard
          </h2>
          <p>
            Pantau POS kasir, QR menu, kitchen display, stok, transaksi, dan laporan dari satu tempat yang rapi
            untuk owner dan staff.
          </p>

          <div className={styles.actions}>
            <a href="#coba-gratis" className={styles.primaryCta}>
              Coba Gratis
              <span aria-hidden="true">→</span>
            </a>
            <div className={styles.badges} aria-label="Modul Outletmu yang tampil di dashboard">
              {showcaseBadges.map((badge) => (
                <span key={badge}>
                  <i aria-hidden="true" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className={styles.perspective}>
          <motion.div className={styles.frame} style={{ ...frameMotionStyle, transformOrigin: "center top" }}>
            <Image
              src={dashboardImage.src}
              alt={dashboardImage.alt}
              width={dashboardImage.width}
              height={dashboardImage.height}
              quality={100}
              priority
              sizes="(max-width: 768px) 94vw, 1120px"
              className={styles.dashboardImage}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
