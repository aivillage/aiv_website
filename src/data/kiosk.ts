// Edit this list to add, remove, or reorder kiosk slides. Poster slugs must
// match hosted entries in posters.ts; repeat a brand slide wherever useful.
export type KioskSlide =
  | { type: "brand"; id: string; duration?: number }
  | { type: "poster"; id: string; posterSlug: string; duration?: number }
  | {
      type: "embed";
      id: string;
      title: string;
      url: string;
      duration?: number;
      requiresWorkshops?: boolean;
    };

export const kioskSlides: KioskSlide[] = [
  { type: "brand", id: "welcome" },
  {
    type: "poster",
    id: "agent-worm",
    posterSlug: "agent-to-agent-worm-propagation-in-mcp-based-ai-systems",
  },
  {
    type: "embed",
    id: "matrixsmith",
    title: "MatrixSmith",
    url: "https://matrixsmith.atsk.net/?demo=1",
    duration: 40000,
  },
  {
    type: "poster",
    id: "task-horizon",
    posterSlug: "ai-agents-escape-their-task-horizon",
  },
  {
    type: "poster",
    id: "threat-hunting",
    posterSlug:
      "attackers-dont-need-shells-they-need-prompts-this-is-how-we-hunt-them",
  },
  { type: "brand", id: "interlude" },
  {
    type: "poster",
    id: "web-pentesting",
    posterSlug:
      "beyond-ctfs-engineering-ai-agents-for-real-world-web-pentesting",
  },
];
