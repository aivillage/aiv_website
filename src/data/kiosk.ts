// Edit this list to add, remove, or reorder kiosk slides. Poster slots draw
// from hosted entries in posters.ts; repeat a brand slide wherever useful.
export type KioskSlide =
  | { type: "brand"; id: string; duration?: number }
  | { type: "poster"; id: string; duration?: number }
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
  { type: "poster", id: "poster-1" },
  {
    type: "embed",
    id: "matrixsmith",
    title: "MatrixSmith",
    url: "https://matrixsmith.atsk.net/?demo=1",
    duration: 40000,
  },
  { type: "poster", id: "poster-2" },
  {
    type: "embed",
    id: "llm-embeddings",
    title: "LLM Embeddings",
    url: "https://llm-embeddings.lab.aivillage.org/",
    duration: 27000,
    requiresWorkshops: true,
  },
  { type: "poster", id: "poster-3" },
  {
    type: "embed",
    id: "email-indirect",
    title: "Email Indirect Prompt Injection",
    url: "https://email-indirect.lab.aivillage.org/",
    duration: 27000,
    requiresWorkshops: true,
  },
  { type: "brand", id: "interlude" },
  {
    type: "embed",
    id: "rag-poisoning",
    title: "RAG Poisoning",
    url: "https://rag-poisoning.lab.aivillage.org/",
    duration: 27000,
    requiresWorkshops: true,
  },
  { type: "poster", id: "poster-4" },
  {
    type: "embed",
    id: "prompt-extraction",
    title: "Prompt Extraction",
    url: "https://prompt-extraction.lab.aivillage.org/",
    duration: 27000,
    requiresWorkshops: true,
  },
];
