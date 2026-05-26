export type RaceLogo = {
  id: string;
  url: string;
  alt: string;
};

/** Справочник логотипов забегов (как отдельная таблица в БД) */
export const raceLogos: Record<string, RaceLogo> = {
  "moscow-marathon": {
    id: "moscow-marathon",
    url: "/logos/moscow-marathon.png",
    alt: "Московский марафон",
  },
};

export type RaceInfo = {
  race: string;
  date: string;
  /** Ссылка на запись в raceLogos */
  logoId?: string;
};

export type BestResult = RaceInfo & {
  distance: string;
  time: string;
};

export type UpcomingRace = RaceInfo & {
  distance: string;
};

export type RunningProfile = {
  firstName: string;
  lastName: string;
  bestResults: BestResult[];
  upcomingRaces: UpcomingRace[];
};

export function getRaceLogoUrl(logoId?: string): string | undefined {
  if (!logoId) return undefined;
  return raceLogos[logoId]?.url;
}

export const runningProfile: RunningProfile = {
  firstName: "Евгений",
  lastName: "Иванов",
  bestResults: [
    {
      distance: "42,2 км",
      time: "3:01:00",
      race: "Московский марафон",
      date: "05.06.2025",
      logoId: "moscow-marathon",
    },
    { distance: "21,1 км", time: "1:40:00", race: "Полумарафон Лужники", date: "12.09.2025" },
  ],
  upcomingRaces: [
    {
      distance: "42,2 км",
      race: "Московский марафон",
      date: "21.09.2026",
      logoId: "moscow-marathon",
    },
  ],
};
