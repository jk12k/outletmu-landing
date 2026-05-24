"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import styles from "@/styles/containerScrollShowcase.module.scss";

const showcaseBadges = ["POS Kasir", "QR Menu", "Kitchen", "Stok", "Laporan"] as const;

const dashboardImage = {
  src: "/images/landing/outletmu-cafe-dashboard-hero.png",
  width: 1672,
  height: 941,
  alt: "Dashboard Outletmu untuk memantau POS kasir, QR menu, stok, dan laporan outlet",
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const desktopRotateX = useTransform(scrollYProgress, [0, 0.65], [18, 0]);
  const mobileRotateX = useTransform(scrollYProgress, [0, 0.62], [6, 0]);
  const desktopScale = useTransform(scrollYProgress, [0, 0.65], [0.88, 1]);
  const mobileScale = useTransform(scrollYProgress, [0, 0.62], [0.96, 1]);
  const desktopY = useTransform(scrollYProgress, [0, 0.65], [110, 0]);
  const mobileY = useTransform(scrollYProgress, [0, 0.62], [36, 0]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.25], [0.85, 1]);
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
          <h2 id="dashboard-showcase-title">Lihat semua operasional outlet dalam satu dashboard</h2>
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
            <div className={styles.topAccent} aria-hidden="true" />
            <div className={styles.browserBar}>
              <div className={styles.browserDots} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <strong>dashboard.outletmu</strong>
              <small>Live outlet view</small>
            </div>

            <div className={styles.imageShell}>
              <Image
                src={dashboardImage.src}
                alt={dashboardImage.alt}
                width={dashboardImage.width}
                height={dashboardImage.height}
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 88vw, 1120px"
                className={styles.dashboardImage}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
