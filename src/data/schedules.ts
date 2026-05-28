export type ScheduleRoute = {
  id: string;
  path: string;
  label: string;
  eventId?: string;
};

export const scheduleRoutes: ScheduleRoute[] = [
  {
    id: "2018-05-01-DECON-China-1",
    path: "/events/defcon-china-1/schedule/",
    label: "DEF CON China 1 schedule",
    eventId: "defcon-china-1",
  },
  {
    id: "2018-08-01-DEFCON-26",
    path: "/events/defcon-26/schedule/",
    label: "DEF CON 26 schedule",
    eventId: "defcon26",
  },
  {
    id: "2019-08-01-DEFCON-27",
    path: "/events/defcon-27/schedule/",
    label: "DEF CON 27 schedule",
    eventId: "defcon27",
  },
  {
    id: "2020-08-01-DEFCON-28",
    path: "/events/defcon-28/schedule/",
    label: "DEF CON 28 schedule",
    eventId: "defcon28",
  },
  {
    id: "2024_Talks",
    path: "/events/defcon-32/talks/",
    label: "DEF CON 32 talks",
    eventId: "defcon32",
  },
];

const scheduleRouteAliases = new Map<string, ScheduleRoute>();

for (const route of scheduleRoutes) {
  scheduleRouteAliases.set(route.id, route);
  scheduleRouteAliases.set(route.id.toLowerCase(), route);
}

// Astro normalizes some collection ids on case-insensitive filesystems; keep
// aliases explicit so schedule routing does not depend on substring matching.
const defcon32TalksRoute = scheduleRoutes.find((route) => route.id === "2024_Talks");
if (defcon32TalksRoute) scheduleRouteAliases.set("2024-talks", defcon32TalksRoute);

export function scheduleRouteForId(id: string) {
  return scheduleRouteAliases.get(id) ?? scheduleRouteAliases.get(id.toLowerCase());
}

export function scheduleRoutesForEvent(eventId: string) {
  return scheduleRoutes.filter((route) => route.eventId === eventId);
}
