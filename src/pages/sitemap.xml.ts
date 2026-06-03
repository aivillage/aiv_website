import { getCollection } from "astro:content";
import { site } from "../data/site";
import { canonicalPostPath, eventPath, schedulePath, sortEventsAscending, sponsorPath } from "../utils/site";

const staticAssets = [
  "/assets/AIVDC31/AIVDC31.pdf",
  "/assets/AIVDC31/DEFCON%20AIV%20KENYEUNG%20FINAL.pdf",
  "/assets/AIVDC31/DSAIL%20DEFCON%20AI%20Village.pdf",
  "/assets/AIVDC31/Defcon%20Presentation_2.pdf",
  "/assets/AIVDC31/Google%20DeepMind%20AIV%20DEFCON%20Talk.pdf",
  "/assets/AIVDC31/scampaign_defcon_2023.pdf",
  "/public/img/fgsm_images/gradient_method/",
  "/public/img/fgsm_images/gradient_sign_method/",
  "/public/img/fgsm_images/normalized_gradient_method/",
  "/public/material/adversarial_pointcloud.html",
  "/public/material/cn18-f1f1cin/slides.pdf",
  "/public/material/cn18-guo/slides1.pdf",
  "/public/material/cn18-guo/slides2.pdf",
  "/public/material/cn18-norwitz/slides.pdf",
  "/public/material/cn18-voss/slides.pdf",
  "/public/material/cn18-zhao/slides.pdf",
  "/public/material/dimensionality_pointcloud.html",
];

function loc(path: string) {
  return `<url><loc>${new URL(path, site.url).toString()}</loc></url>`;
}

export async function GET() {
  const events = sortEventsAscending(await getCollection("events"));
  const posts = [...(await getCollection("blog", ({ data }) => !data.draft))].sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  const sponsors = (await getCollection("sponsors")).filter(
    (sponsor) => sponsor.data.status === "current" || sponsor.data.status === "past",
  );
  const schedules = await getCollection("schedules");

  const urls = Array.from(new Set([
    "/",
    "/events/",
    ...events.map(eventPath),
    ...schedules.map(schedulePath),
    "/blog/",
    ...posts.map(canonicalPostPath),
    "/about/",
    "/about/conduct/",
    "/community/",
    "/discord/",
    "/defcon31/",
    "/grt/",
    "/hacker-journal-club/",
    "/learn/",
    "/research/",
    "/sponsors/",
    ...sponsors.map(sponsorPath),
    ...staticAssets,
  ]));

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(loc).join("\n")}\n</urlset>\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
