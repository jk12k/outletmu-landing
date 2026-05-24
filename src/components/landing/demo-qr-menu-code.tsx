"use client";

import Link from "next/link";
import QRCode from "react-qr-code";
import { cn } from "@/lib/utils";
import { DEMO_QR_MENU_URL } from "@/lib/demo-links";

type DemoQrMenuCodeProps = {
  className?: string;
  compact?: boolean;
  label?: string;
  showLink?: boolean;
};

export function DemoQrMenuCode({
  className,
  compact = false,
  label = "Scan menu meja",
  showLink = true,
}: DemoQrMenuCodeProps) {
  return (
    <div className={cn("grid justify-items-center gap-2 text-center", className)}>
      <div
        className={cn(
          "w-32 max-w-full rounded-[1.15rem] bg-white p-2.5 shadow-sm ring-1 ring-[var(--om-ink-950)]/10 sm:w-40",
          compact && "w-28 sm:w-32",
        )}
      >
        <QRCode
          value={DEMO_QR_MENU_URL}
          size={160}
          bgColor="#FFFFFF"
          fgColor="var(--om-primary)"
          level="M"
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          aria-label="QR demo menu Outletmu"
        />
      </div>
      <strong className="text-sm font-black leading-tight text-[var(--om-ink-950)]">{label}</strong>
      {showLink ? (
        <Link
          href="/#coba-gratis"
          className="text-xs font-extrabold text-[var(--om-primary)] underline-offset-4 transition hover:text-[var(--om-primary)] hover:underline"
        >
          Demo
        </Link>
      ) : null}
    </div>
  );
}
