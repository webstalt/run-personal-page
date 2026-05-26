import { ImageWithFallback } from "./image-with-fallback";

export type RaceInfoCellVariant = "best" | "upcoming";

export type RaceInfoCellUIProps = {
  title: string;
  subtitle: string;
  logoSrc?: string;
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
  if (src) {
    return (
      <ImageWithFallback
        src={src}
        alt={`Логотип: ${title}`}
        className="w-5 h-5 shrink-0 rounded object-contain"
      />
    );
  }

  return (
    <span
      className="flex w-5 h-5 shrink-0 items-center justify-center rounded text-[9px] font-bold leading-none"
      style={{ background: "#ECE9E9", color: "#1B1917" }}
      aria-hidden
    >
      {title.charAt(0).toUpperCase()}
    </span>
  );
}

export function RaceInfoCellUI({
  title,
  subtitle,
  logoSrc,
  variant,
  textColor,
  subtitleColor,
}: RaceInfoCellUIProps) {
  return (
    <div className="flex w-full min-w-0 items-start gap-1.5 justify-self-stretch">
      <RaceLogo src={logoSrc} title={title} />
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
