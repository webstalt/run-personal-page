import { useState } from "react";
import { Timer, Trophy } from "lucide-react";
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

function SectionTitle({ children }: { children: string }) {
  return (
    <h2
      className="font-['Roboto'] text-[11px] font-semibold uppercase tracking-wide mb-2 mt-1"
      style={{ color: colors.accentPurple, letterSpacing: "0.06em" }}
    >
      {children}
    </h2>
  );
}

function BestResultRow({ result, isLast }: { result: BestResult; isLast: boolean }) {
  return (
    <div
      className="grid w-full min-w-0 grid-cols-[minmax(0,3.25rem)_minmax(0,4rem)_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)] gap-x-2 md:gap-x-4 items-center py-2.5 text-left"
      style={{ borderBottom: isLast ? "none" : `1px solid ${colors.border}` }}
    >
      <span
        className="min-w-0 font-['Roboto_Condensed'] font-bold text-sm leading-none"
        style={{ color: colors.text }}
      >
        {result.distance}
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
          variant="best"
          textColor={colors.text}
          subtitleColor={colors.textMuted}
        />
      </div>
    </div>
  );
}

function UpcomingRaceRow({ race, isLast }: { race: UpcomingRace; isLast: boolean }) {
  return (
    <div
      className="grid w-full min-w-0 grid-cols-[minmax(0,3.25rem)_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-2 md:gap-x-4 items-start py-2.5 text-left"
      style={{ borderBottom: isLast ? "none" : `1px solid ${colors.border}` }}
    >
      <span
        className="min-w-0 font-['Roboto_Condensed'] font-bold text-sm leading-none pt-0.5"
        style={{ color: colors.text }}
      >
        {race.distance}
      </span>
      <div className="min-w-0">
        <RaceInfoCellUI
          title={race.race}
          subtitle={race.date}
          logoSrc={getRaceLogoUrl(race.logoId)}
          variant="upcoming"
          textColor={colors.text}
          subtitleColor={colors.accent}
        />
      </div>
    </div>
  );
}

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

  return (
    <div
      className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden flex items-center justify-center py-8 px-4"
      style={{
        fontFamily: "'Roboto', sans-serif",
        background: `linear-gradient(160deg, ${palette.white} 0%, ${palette.purple}44 50%, ${palette.yellow}55 100%)`,
      }}
    >
      <div
        className="absolute w-72 h-72 rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: palette.purple, top: "8%", left: "0" }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: palette.yellow, bottom: "12%", right: "0" }}
      />
      <div
        className="absolute w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: palette.orange, top: "50%", right: "10%" }}
      />

      <div
        className="relative w-full min-w-0 max-w-sm md:max-w-xl rounded-3xl overflow-hidden"
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.shadow,
        }}
      >
        <div className="min-w-0 px-5 pt-5 pb-4 md:px-7 md:pt-6 md:pb-5 overflow-hidden">
          <header className="mb-4">
            <h1
              className="font-['Roboto_Condensed'] font-extrabold text-3xl leading-tight"
              style={{ color: colors.text, letterSpacing: "-0.02em" }}
            >
              {firstName}
              <br />
              <span style={{ color: colors.accentPurple }}>{lastName}</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Trophy
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: colors.accent }}
                strokeWidth={2.5}
              />
              <span className="text-[10px] font-['Roboto'] font-medium" style={{ color: colors.text }}>
                {bestResults.length} результатов · {upcomingRaces.length} предстоящих
              </span>
            </div>
          </header>

          {showTabs ? (
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
              {tab === "upcoming" && <UpcomingRacesList />}
            </>
          ) : (
            <div className="space-y-4">
              <section>
                <SectionTitle>Лучшие результаты</SectionTitle>
                <BestResultsList />
              </section>
              <section>
                <SectionTitle>Будущие забеги</SectionTitle>
                <UpcomingRacesList />
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
