"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import styles from "@/styles/containerScrollShowcase.module.scss";

const dashboardBadges = ["POS Kasir", "QR Menu", "Kitchen", "Stok", "Laporan"] as const;

const dashboardImage = {
  src: "/images/landing/outletmu-cafe-dashboard-hero.png",
  width: 1672,
  height: 941,
  alt: "Screenshot dashboard Outletmu untuk memantau POS kasir, QR menu, stok, transaksi, dan laporan",
};

export function ContainerScrollShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const initialRotateX = shouldReduceMotion ? 0 : isMobile ? 6 : 16;
  const initialScale = shouldReduceMotion ? 1 : isMobile ? 0.96 : 1.04;
  const finalTranslateY = shouldReduceMotion ? 0 : isMobile ? -24 : -80;

  const rotateX = useTransform(scrollYProgress, [0.12, 0.48], [initialRotateX, 0]);
  const scale = useTransform(scrollYProgress, [0.12, 0.48], [initialScale, 1]);
  const translateY = useTransform(scrollYProgress, [0.12, 0.58], [0, finalTranslateY]);
  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0.92, 1, 1, 0.96]);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="dashboard-scroll-title">
      <div className={styles.container}>
        <div className={styles.copy}>
          <div className={styles.badges} aria-label="Fitur dashboard Outletmu">
            {dashboardBadges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          <h2 id="dashboard-scroll-title">Lihat semua operasional outlet dalam satu dashboard</h2>
          <p>
            Pantau POS kasir, QR menu, kitchen display, stok, transaksi, dan laporan dari satu tempat yang rapi
            untuk owner dan staff.
          </p>
          <Link href="#coba-gratis" className={styles.cta}>
            Coba Gratis
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.stage} aria-label="Preview dashboard Outletmu">
          <motion.div
            className={styles.deviceFrame}
            style={{ rotateX, scale, y: translateY, opacity }}
          >
            <div className={styles.browserBar} aria-hidden="true">
              <span />
              <span />
              <span />
              <strong>dashboard.outletmu</strong>
            </div>
            <div className={styles.screen}>
              <Image
                src={dashboardImage.src}
                alt={dashboardImage.alt}
                width={dashboardImage.width}
                height={dashboardImage.height}
                sizes="(max-width: 768px) 92vw, (max-width: 1200px) 86vw, 1120px"
                priority={false}
                className={styles.image}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
