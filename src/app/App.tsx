import React, { useEffect, useState } from "react";
import { Download, Moon, Share2, Sun, Timer, Trophy } from "lucide-react";
import { toPng } from "html-to-image";
import {
  getRaceLogoUrl,
  runningProfile,
  type BestResult,
  type UpcomingRace,
} from "../data/running-profile";
import { RaceInfoCellUI } from "./components/race-info-cell-ui";

const { firstName, lastName, bestResults, upcomingRaces } = runningProfile;

const SHOW_TABS_THRESHOLD = 3;

const palette = {
  white: "#ECE9E9",
  purple: "#7A64F0",
  black: "#1B1917",
  orange: "#FF5400",
  yellow: "#FCE172",
} as const;

const colors = {
  bg: palette.white,
  card: "#FFFFFF",
  text: palette.black,
  textMuted: "rgba(27, 25, 23, 0.55)",
  tabInactive: "rgba(27, 25, 23, 0.78)",
  accent: palette.orange,
  accentPurple: palette.purple,
  accentYellow: palette.yellow,
  border: "rgba(27, 25, 23, 0.08)",
  shadow: "0 8px 32px rgba(27, 25, 23, 0.1)",
};

const showTabs =
  bestResults.length > SHOW_TABS_THRESHOLD ||
  upcomingRaces.length > SHOW_TABS_THRESHOLD;
const hasUpcomingRaces = upcomingRaces.length > 0;
const shouldShowTabs = hasUpcomingRaces && showTabs;
const hasAnyRaceLogo =
  bestResults.some((result) => Boolean(getRaceLogoUrl(result.logoId))) ||
  upcomingRaces.some((race) => Boolean(getRaceLogoUrl(race.logoId)));

function formatDistance(distance: string) {
  return `${distance}\u00A0км`;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-['Roboto'] text-[11px] font-semibold uppercase tracking-wide mb-2 mt-1"
      style={{ color: colors.accentPurple, letterSpacing: "0.06em" }}
    >
      {children}
    </h2>
  );
}

const BestResultRow: React.FC<{ result: BestResult; isLast: boolean }> = ({ result, isLast }) => {
  return (
    <div
      className="grid w-full min-w-0 grid-cols-[minmax(0,2.6rem)_minmax(0,3.75rem)_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)] gap-x-3 md:gap-x-4 items-center py-2.5 text-left"
      style={{ borderBottom: isLast ? "none" : `1px solid ${colors.border}` }}
    >
      <span
        className="min-w-0 whitespace-nowrap font-['Roboto_Condensed'] font-bold text-sm leading-none"
        style={{ color: colors.text }}
      >
        {formatDistance(result.distance)}
      </span>
      <div className="flex min-w-0 items-center gap-1 justify-start">
        <Timer className="w-3 h-3 shrink-0" style={{ color: colors.accent }} strokeWidth={2.5} />
        <span
          className="font-['Roboto_Condensed'] font-semibold text-base leading-none tabular-nums"
          style={{ color: colors.accent }}
        >
          {result.time}
        </span>
      </div>
      <div className="min-w-0">
        <RaceInfoCellUI
          title={result.race}
          subtitle={result.date}
          logoSrc={getRaceLogoUrl(result.logoId)}
          reserveLogoSpace={hasAnyRaceLogo}
          variant="best"
          textColor={colors.text}
          subtitleColor={colors.textMuted}
        />
      </div>
    </div>
  );
};

const UpcomingRaceRow: React.FC<{ race: UpcomingRace; isLast: boolean }> = ({ race, isLast }) => {
  return (
    <div
      className="grid w-full min-w-0 grid-cols-[minmax(0,3.25rem)_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-2 md:gap-x-4 items-start py-2.5 text-left"
      style={{ borderBottom: isLast ? "none" : `1px solid ${colors.border}` }}
    >
      <span
        className="min-w-0 whitespace-nowrap font-['Roboto_Condensed'] font-bold text-sm leading-none pt-0.5"
        style={{ color: colors.text }}
      >
        {formatDistance(race.distance)}
      </span>
      <div className="min-w-0">
        <RaceInfoCellUI
          title={race.race}
          subtitle={race.date}
          logoSrc={getRaceLogoUrl(race.logoId)}
          reserveLogoSpace={hasAnyRaceLogo}
          variant="upcoming"
          textColor={colors.text}
          subtitleColor={colors.accent}
        />
      </div>
    </div>
  );
};

function BestResultsList() {
  return (
    <div role="list" className="w-full">
      {bestResults.map((result, i) => (
        <BestResultRow key={i} result={result} isLast={i === bestResults.length - 1} />
      ))}
    </div>
  );
}

function UpcomingRacesList() {
  return (
    <div className="w-full">
      {upcomingRaces.map((race, i) => (
        <UpcomingRaceRow key={i} race={race} isLast={i === upcomingRaces.length - 1} />
      ))}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<"best" | "upcoming">("best");
  const [isSharing, setIsSharing] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    if (typeof window === "undefined") return false;
    const savedTheme = window.localStorage.getItem("running-page-theme");
    return savedTheme === "dark" || savedTheme === "true";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("running-page-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  async function exportCardAsPng() {
    const cardNode = document.getElementById("share-card");
    if (!cardNode) return null;

    const dataUrl = await toPng(cardNode, {
      backgroundColor: colors.card,
      cacheBust: true,
      pixelRatio: 2,
      style: isDarkTheme
        ? {
            borderRadius: "0",
          }
        : undefined,
      filter: (node) => {
        if (node instanceof HTMLElement && node.dataset.exportIgnore === "true") {
          return false;
        }
        return true;
      },
    });

    const response = await fetch(dataUrl);
    const blob = await response.blob();
    const file = new File([blob], "running-results.png", { type: "image/png" });

    return { dataUrl, file };
  }

  function downloadPng(dataUrl: string, filename: string) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
  }

  async function handleShareClick() {
    if (isSharing) return;

    try {
      setIsSharing(true);
      const exported = await exportCardAsPng();
      if (!exported) return;

      const { dataUrl, file } = exported;
      const canNativeShare =
        typeof navigator !== "undefined" &&
        "share" in navigator &&
        "canShare" in navigator &&
        navigator.canShare({ files: [file] });

      if (canNativeShare) {
        await navigator.share({
          title: "Мои беговые результаты",
          text: "Поделиться результатом",
          files: [file],
        });
        return;
      }

      downloadPng(dataUrl, file.name);
    } finally {
      setIsSharing(false);
    }
  }

  async function handleDownloadClick() {
    if (isSharing) return;

    try {
      setIsSharing(true);
      const exported = await exportCardAsPng();
      if (!exported) return;
      downloadPng(exported.dataUrl, exported.file.name);
    } finally {
      setIsSharing(false);
    }
  }

  return (
    <div
      className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden flex items-center justify-center py-8 px-4"
      style={{
        fontFamily: "'Roboto', sans-serif",
        background: isDarkTheme
          ? `linear-gradient(160deg, #1c2431 0%, #2b1f3d 50%, #2f3020 100%)`
          : `linear-gradient(160deg, ${palette.white} 0%, ${palette.purple}44 50%, ${palette.yellow}55 100%)`,
      }}
    >
      <button
        type="button"
        onClick={() => setIsDarkTheme((prev) => !prev)}
        data-export-ignore="true"
        className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-opacity"
        style={{
          borderColor: isDarkTheme ? "rgba(255,255,255,0.2)" : colors.border,
          color: isDarkTheme ? "#ECE9E9" : colors.text,
          background: isDarkTheme ? "rgba(255,255,255,0.08)" : `${palette.purple}1A`,
        }}
      >
        {isDarkTheme ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        Сменить тему
      </button>
      <div
        className="absolute w-72 h-72 rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: isDarkTheme ? "#5f4cc8" : palette.purple, top: "8%", left: "0" }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: isDarkTheme ? "#6e5f21" : palette.yellow, bottom: "12%", right: "0" }}
      />
      <div
        className="absolute w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: isDarkTheme ? "#b34717" : palette.orange, top: "50%", right: "10%" }}
      />

      <div
        id="share-card"
        className="relative w-full min-w-0 max-w-sm md:max-w-xl rounded-3xl overflow-hidden"
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.shadow,
          filter: isDarkTheme
            ? "invert(0.92) hue-rotate(180deg) saturate(0.92) contrast(0.94)"
            : "none",
        }}
      >
        <div className="min-w-0 px-5 pt-5 pb-4 md:px-7 md:pt-6 md:pb-5 overflow-hidden">
          <header className="mb-4 flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h1
                className="font-['Roboto_Condensed'] font-extrabold text-3xl leading-tight"
                style={{ color: colors.text, letterSpacing: "-0.02em" }}
              >
                {firstName}
                <br />
                <span style={{ color: colors.accentPurple }}>{lastName}</span>
              </h1>
              <div className="mt-1.5 flex items-center gap-1.5 whitespace-nowrap">
                <Trophy
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: colors.accent }}
                  strokeWidth={2.5}
                />
                <span className="text-[10px] font-['Roboto'] font-medium" style={{ color: colors.text }}>
                  {bestResults.length} результатов · {upcomingRaces.length} предстоящих
                </span>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1" data-export-ignore="true">
              <button
                type="button"
                onClick={handleShareClick}
                disabled={isSharing}
                title="Поделиться"
                aria-label="Поделиться"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                style={{ borderColor: colors.border, color: colors.text, background: `${palette.purple}1A` }}
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleDownloadClick}
                disabled={isSharing}
                title="Скачать"
                aria-label="Скачать"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                style={{ borderColor: colors.border, color: colors.text, background: `${palette.purple}1A` }}
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </header>

          {shouldShowTabs ? (
            <>
              <div
                className="flex rounded-xl p-0.5 mb-4"
                style={{
                  background: palette.purple + "33",
                  border: `1px solid ${colors.border}`,
                }}
              >
                {(["best", "upcoming"] as const).map((t) => {
                  const active = tab === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className="min-w-0 flex-1 rounded-[10px] px-1 py-1.5 text-[10px] sm:text-xs font-semibold font-['Roboto'] transition-all duration-200"
                      style={{
                        background: active ? colors.card : "transparent",
                        color: active ? colors.text : colors.tabInactive,
                        boxShadow: active
                          ? `0 1px 6px ${palette.black}14`
                          : "none",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {t === "best" ? "Лучшие результаты" : "Будущие забеги"}
                    </button>
                  );
                })}
              </div>

              {tab === "best" && <BestResultsList />}
              {tab === "upcoming" && hasUpcomingRaces && <UpcomingRacesList />}
            </>
          ) : (
            <div className="space-y-4">
              <section>
                <SectionTitle children="Лучшие результаты" />
                <BestResultsList />
              </section>
              {hasUpcomingRaces ? (
                <section>
                  <SectionTitle children="Будущие забеги" />
                  <UpcomingRacesList />
                </section>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
