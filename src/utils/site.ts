import type { CollectionEntry } from "astro:content";
import { scheduleRouteForId } from "../data/schedules";

export type BlogEntry = CollectionEntry<"blog">;
export type EventEntry = CollectionEntry<"events">;
export type VolunteerEntry = CollectionEntry<"volunteers">;
export type SponsorEntry = CollectionEntry<"sponsors">;
export type ScheduleEntry = CollectionEntry<"schedules">;

const dateTime = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const shortDateTime = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const monthDateTime = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

const dayDateTime = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  timeZone: "UTC",
});

export function formatDate(date: Date) {
  return dateTime.format(date);
}

export function formatShortDate(date: Date) {
  return shortDateTime.format(date);
}

export function dateMonth(date: Date) {
  return monthDateTime.format(date);
}

export function dateDay(date: Date) {
  return dayDateTime.format(date);
}

export function isoDate(date: Date) {
  return date.toISOString();
}

export function stripDatePrefix(id: string) {
  return id.replace(/\.(md|mdx|markdown)$/i, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function canonicalPostSlug(post: BlogEntry) {
  const raw = post.data.slug ?? post.data.canonicalSlug ?? stripDatePrefix(post.id) ?? post.data.title;
  return slugify(raw);
}

export function canonicalPostPath(post: BlogEntry) {
  return `/blog/${canonicalPostSlug(post)}/`;
}

const eventSlugOverrides: Record<string, string> = {
  defcon26: "defcon-26",
  defcon27: "defcon-27",
  defcon28: "defcon-28",
  defcon29: "defcon-29",
  defcon30: "defcon-30",
  defcon32: "defcon-32",
  defcon33: "defcon-33",
  defcon34: "defcon-34",
};

export function canonicalEventSlug(event: EventEntry) {
  const raw = event.data.canonicalSlug ?? stripDatePrefix(event.id);
  return eventSlugOverrides[raw] ?? slugify(raw);
}

export function eventPath(event: EventEntry) {
  return `/events/${canonicalEventSlug(event)}/`;
}

export function sponsorPath(sponsor: SponsorEntry) {
  return `/sponsors/${slugify(sponsor.data.name || stripDatePrefix(sponsor.id))}/`;
}

function sortSponsorsByName(sponsors: SponsorEntry[]) {
  return [...sponsors].sort((a, b) => a.data.name.localeCompare(b.data.name));
}

export function getCurrentSponsors(sponsors: SponsorEntry[]) {
  return sortSponsorsByName(sponsors.filter((sponsor) => sponsor.data.status === "current"));
}

export function getPastSponsors(sponsors: SponsorEntry[]) {
  return sortSponsorsByName(sponsors.filter((sponsor) => sponsor.data.status === "past"));
}

export function schedulePath(schedule: ScheduleEntry) {
  const id = schedule.id.replace(/\.(md|mdx|markdown)$/i, "");
  const route = scheduleRouteForId(id);
  if (route) return route.path;
  return `/events/${slugify(stripDatePrefix(id))}/schedule/`;
}

export function sortPosts(posts: BlogEntry[]) {
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function sortEventsAscending(events: EventEntry[]) {
  return events.sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}

export function sortEventsDescending(events: EventEntry[]) {
  return events.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function groupByYear<T extends { data: { date?: Date } }>(entries: T[]) {
  const groups = new Map<string, T[]>();
  for (const entry of entries) {
    if (!entry.data.date) continue;
    const year = entry.data.date.toISOString().slice(0, 4);
    groups.set(year, [...(groups.get(year) ?? []), entry]);
  }
  return groups;
}

export function excerptFromBody(body: string, words = 30) {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`[\]()!-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const split = text.split(" ").filter(Boolean);
  return split.length > words ? `${split.slice(0, words).join(" ")}...` : text;
}

export function truncate(text: string, length = 30) {
  return text.length > length ? `${text.slice(0, length - 3)}...` : text;
}
