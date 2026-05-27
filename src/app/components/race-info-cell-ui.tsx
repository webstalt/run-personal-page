import React from "react";
import { ImageWithFallback } from "./image-with-fallback";

export type RaceInfoCellVariant = "best" | "upcoming";

export type RaceInfoCellUIProps = {
  title: string;
  subtitle: string;
  logoSrc?: string;
  reserveLogoSpace?: boolean;
  variant: RaceInfoCellVariant;
  textColor: string;
  subtitleColor: string;
};

const titleClassName: Record<RaceInfoCellVariant, string> = {
  best: "font-['Roboto'] font-medium text-xs leading-tight md:text-sm",
  upcoming: "font-['Roboto_Condensed'] font-bold text-sm leading-tight md:text-base",
};

const subtitleClassName: Record<RaceInfoCellVariant, string> = {
  best: "text-[9px] tabular-nums mt-0.5 font-['Roboto']",
  upcoming: "font-['Roboto_Condensed'] font-semibold text-base md:text-xl leading-none tabular-nums mt-0.5",
};

function RaceLogo({ src, title }: { src?: string; title: string }) {
  if (!src) return null;

  return (
    <ImageWithFallback
      src={src}
      alt={`Логотип: ${title}`}
      className="w-5 h-5 shrink-0 rounded object-contain"
    />
  );
}

export function RaceInfoCellUI({
  title,
  subtitle,
  logoSrc,
  reserveLogoSpace = false,
  variant,
  textColor,
  subtitleColor,
}: RaceInfoCellUIProps) {
  return (
    <div className="flex w-full min-w-0 items-start gap-1.5 justify-self-stretch">
      {logoSrc ? (
        <RaceLogo src={logoSrc} title={title} />
      ) : reserveLogoSpace ? (
        <span className="w-5 h-5 shrink-0" aria-hidden />
      ) : null}
      <div className="min-w-0 flex-1 text-left">
        <p className={`${titleClassName[variant]} break-words`} style={{ color: textColor }}>
          {title}
        </p>
        <p className={`${subtitleClassName[variant]} break-words`} style={{ color: subtitleColor }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
