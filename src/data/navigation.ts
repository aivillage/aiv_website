import { volunteerApplicationUrl } from "./site";

export const primaryNav = [
  { label: "Events", href: "/events/" },
  { label: "Blog", href: "/blog/" },
  { label: "GRT", href: "/grt/" },
  { label: "Learn", href: "/learn/" },
  { label: "Community", href: "/community/" },
  { label: "About", href: "/about/" },
] as const;

export const sponsorCta = { label: "Sponsor", href: "/sponsors/" } as const;

export const footerNavSections = [
  {
    title: "Programs",
    links: [
      { label: "Generative Red Team", href: "/grt/" },
      { label: "Learn / Workshops", href: "/learn/" },
      { label: "Events", href: "/events/" },
      { label: "Research", href: "/research/" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Community", href: "/community/" },
      { label: "Discord", href: "/discord/" },
      { label: "Volunteer Application", href: volunteerApplicationUrl, external: true },
      { label: "Code of Conduct", href: "/about/conduct/" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "About", href: "/about/" },
      { label: "Sponsors", href: "/sponsors/" },
      { label: "Blog", href: "/blog/" },
      { label: "GitHub", href: "https://github.com/aivillage", external: true },
    ],
  },
  {
    title: "Utility",
    links: [
      { label: "RSS", href: "/feed.xml" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/aivillage", external: true },
      { label: "X/Twitter", href: "https://twitter.com/aivillage_dc", external: true },
    ],
  },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/aivillage" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/aivillage" },
  { label: "X/Twitter", href: "https://twitter.com/aivillage_dc" },
  { label: "Discord", href: "/discord/" },
] as const;
