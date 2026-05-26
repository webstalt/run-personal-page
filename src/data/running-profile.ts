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
    { distance: "5 км", time: "0:15:00", race: "Забег в Парке Горького", date: "03.05.2025" },
    { distance: "3 км", time: "0:09:00", race: "Ночной забег СПб", date: "22.07.2025" },
    { distance: "1 км", time: "0:03:00", race: "Спринт Победы", date: "09.05.2025" },
  ],
  upcomingRaces: [
    { distance: "3 км", race: "Весенний забег", date: "05.06.2025" },
    { distance: "5 км", race: "Название марафона", date: "05.06.2026" },
    { distance: "21,1 км", race: "Московский полумарафон", date: "06.09.2026" },
    {
      distance: "42,2 км",
      race: "Московский марафон",
      date: "21.09.2026",
      logoId: "moscow-marathon",
    },
  ],
};
