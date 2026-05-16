import Image from "next/image";
import { cn } from "@/lib/utils";
import landingStyles from "@/styles/landing.module.scss";

type ThemeMode = "light" | "dark";

const animatedLogoAssets = {
  icon: {
    light: {
      src: "/branding/outletmu-icon-light.png",
      width: 925,
      height: 925,
      alt: "",
    },
    dark: {
      src: "/branding/outletmu-icon-light.png",
      width: 925,
      height: 925,
      alt: "",
    },
  },
  wordmark: {
    light: {
      src: "/branding/outletmu-wordmark-light.png",
      width: 2002,
      height: 451,
      alt: "",
    },
    dark: {
      src: "/branding/outletmu-wordmark-light.png",
      width: 2002,
      height: 451,
      alt: "",
    },
  },
};

export function AnimatedLogo({
  theme,
  className,
}: {
  theme: ThemeMode;
  className?: string;
}) {
  const icon = animatedLogoAssets.icon[theme];
  const wordmark = animatedLogoAssets.wordmark[theme];

  return (
    <span className={cn(landingStyles.animatedLogo, className)} aria-hidden="true">
      <span className={landingStyles.animatedLogoIcon}>
        <Image
          src={icon.src}
          alt={icon.alt}
          width={icon.width}
          height={icon.height}
          className={cn(landingStyles.brandLogo, landingStyles.brandLogoIcon)}
          priority
          sizes="44px"
        />
      </span>
      <span className={landingStyles.animatedLogoWordmark}>
        <Image
          src={wordmark.src}
          alt={wordmark.alt}
          width={wordmark.width}
          height={wordmark.height}
          className={cn(landingStyles.brandLogo, landingStyles.brandLogoWordmark)}
          priority
          sizes="(max-width: 480px) 92px, (max-width: 768px) 116px, 138px"
        />
      </span>
    </span>
  );
}
