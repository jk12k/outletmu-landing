"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, MessageCircle, X } from "lucide-react";
import {
  globalLeadFormLink,
  globalNavItems,
  type NavTopItem,
} from "./nav-config";
import styles from "./global-navbar.module.scss";

type Theme = "light";

type GlobalNavbarProps = {
  theme?: Theme;
  /** When true, navbar tetap di atas halaman dengan posisi sticky/fixed */
  sticky?: boolean;
};

export function GlobalNavbar({ theme = "light", sticky = true }: GlobalNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobile, setOpenMobile] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 16;
      setIsScrolled((s) => (s === scrolled ? s : scrolled));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMobile) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobile]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setOpenMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleEnter = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDropdown(label);
  };

  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const logoSrc = "/branding/outletmu-full-light.png";

  return (
    <>
      {sticky ? <div className={styles.spacer} aria-hidden="true" /> : null}
      <header
        data-theme={theme}
        data-sticky={sticky ? "true" : "false"}
        data-scrolled={isScrolled ? "true" : "false"}
        className={styles.shell}
      >
        <div className={styles.inner}>
          <Link href="/" className={styles.brand} aria-label="Outletmu homepage">
            <Image
              src={logoSrc}
              alt="Outletmu"
              width={1945}
              height={395}
              priority
              sizes="(max-width: 480px) 124px, (max-width: 768px) 140px, 160px"
              className={styles.brandImage}
            />
          </Link>

          <nav className={styles.desktopNav} aria-label="Navigasi utama Outletmu">
            {globalNavItems.map((item) =>
              renderTopItem(item, openDropdown, handleEnter, handleLeave),
            )}
          </nav>

          <div className={styles.actions}>
            <Link href={globalLeadFormLink} className={styles.loginLink}>
              Coba Gratis
            </Link>
            <Link
              href={globalLeadFormLink}
              className={styles.cta}
            >
              Demo
              <MessageCircle className={styles.ctaIcon} aria-hidden="true" />
            </Link>
          </div>

          <Link
            href={globalLeadFormLink}
            aria-label="Demo Outletmu"
            className={styles.mobileCtaIcon}
          >
            <MessageCircle aria-hidden="true" />
          </Link>
          <button
            type="button"
            className={styles.mobileToggle}
            aria-label={openMobile ? "Tutup menu" : "Buka menu"}
            aria-expanded={openMobile}
            onClick={() => {
              setOpenMobile((v) => !v);
              setOpenMobileGroup(null);
            }}
          >
            {openMobile ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        {openMobile ? (
          <div className={styles.mobileSheet} role="dialog" aria-label="Menu navigasi Outletmu">
            <nav className={styles.mobileNav} aria-label="Menu utama Outletmu">
              {globalNavItems.map((item) => {
                if (item.kind === "link") {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={styles.mobileLink}
                      onClick={() => setOpenMobile(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                const isOpen = openMobileGroup === item.label;
                return (
                  <div
                    key={item.label}
                    className={styles.mobileGroup}
                    data-open={isOpen ? "true" : "false"}
                  >
                    <button
                      type="button"
                      className={styles.mobileGroupTrigger}
                      aria-expanded={isOpen}
                      onClick={() => setOpenMobileGroup(isOpen ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={isOpen ? styles.mobileChevronOpen : styles.mobileChevron}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen ? (
                      <div className={styles.mobileGroupItems}>
                        {item.items.map((leaf) => (
                          <Link
                            key={leaf.href}
                            href={leaf.href}
                            className={styles.mobileLeaf}
                            onClick={() => setOpenMobile(false)}
                          >
                            <span>{leaf.label}</span>
                            {leaf.description ? <small>{leaf.description}</small> : null}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
            <div className={styles.mobileActions}>
              <Link
                href={globalLeadFormLink}
                className={styles.mobileLogin}
                onClick={() => setOpenMobile(false)}
              >
                Coba Gratis
              </Link>
              <Link
                href={globalLeadFormLink}
                className={styles.mobileCta}
                onClick={() => setOpenMobile(false)}
              >
                Demo
                <MessageCircle aria-hidden="true" />
              </Link>
            </div>
          </div>
        ) : null}
      </header>
    </>
  );
}

function renderTopItem(
  item: NavTopItem,
  openLabel: string | null,
  onEnter: (label: string) => void,
  onLeave: () => void,
) {
  if (item.kind === "link") {
    return (
      <Link key={item.href} href={item.href} className={styles.navLink}>
        {item.label}
      </Link>
    );
  }

  const isOpen = openLabel === item.label;
  return (
    <div
      key={item.label}
      className={styles.navItem}
      data-open={isOpen ? "true" : "false"}
      onMouseEnter={() => onEnter(item.label)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(item.label)}
      onBlur={onLeave}
    >
      <button
        type="button"
        className={styles.navTrigger}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown className={styles.navChevron} aria-hidden="true" />
      </button>
      <div className={styles.dropdown} role="menu">
        {item.items.map((leaf) => (
          <Link key={leaf.href} href={leaf.href} className={styles.dropdownItem} role="menuitem">
            <span>{leaf.label}</span>
            {leaf.description ? <small>{leaf.description}</small> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
