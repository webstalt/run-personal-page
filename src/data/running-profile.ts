export type RaceLogo = {
  id: string;
  /** Прямая ссылка на файл (https://i.ibb.co/…/file.png), не страница галереи */
  url: string;
  alt: string;
};

/** Справочник логотипов забегов (как отдельная таблица в БД) */
export const raceLogos: Record<string, RaceLogo> = {
  "moscow-marathon": {
    id: "moscow-marathon",
    url: "https://i.ibb.co/8DczdDX4/moscow-marathon.png",
    alt: "Московский марафон",
  },
};

export type RaceInfo = {
  race: string;
  date: string;
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
  const url = raceLogos[logoId]?.url.trim();
  return url || undefined;
}

export const runningProfile: RunningProfile = {
  firstName: "Евгений",
  lastName: "Иванов",
  bestResults: [
    {
      distance: "42,2",
      time: "3:01:00",
      race: "Московский марафон",
      date: "05.06.2025",
      logoId: "moscow-marathon",
    },
    { distance: "21,1", time: "1:40:00", race: "Полумарафон Лужники", date: "12.09.2025" },
    { distance: "5", time: "0:15:00", race: "Забег в Парке Горького", date: "03.05.2025" },
    { distance: "3", time: "0:09:00", race: "Ночной забег СПб", date: "22.07.2025" },
  ],
  upcomingRaces: [
    { distance: "3", race: "Весенний забег", date: "05.06.2025" },
    { distance: "5", race: "Название марафона", date: "05.06.2026" },
    { distance: "21,1", race: "Московский полумарафон", date: "06.09.2026" },
    {
      distance: "42,2",
      race: "Московский марафон",
      date: "21.09.2026",
      logoId: "moscow-marathon",
    },
  ],
};
