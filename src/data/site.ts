import heroLiving from "@/assets/hero-living-room.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import modernMinimal from "@/assets/project-modern-minimal.jpg";
import warmLuxury from "@/assets/project-warm-luxury.jpg";
import aurora from "@/assets/project-aurora.jpg";
import coastal from "@/assets/project-coastal.jpg";
import beforeLiving from "@/assets/before-living.jpg";
import afterLiving from "@/assets/after-living.jpg";

export const images = {
  heroLiving,
  heroKitchen,
  modernMinimal,
  warmLuxury,
  aurora,
  coastal,
  beforeLiving,
  afterLiving,
};

export type Project = {
  id: string;
  name: string;
  category: "Residential" | "Commercial";
  location: string;
  year: string;
  area: string;
  image: string;
  gallery: string[];
  summary: string;
  overview: string;
  services: string[];
};

export const projects: Project[] = [
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    category: "Residential",
    location: "Marina Heights",
    year: "2025",
    area: "240 m²",
    image: modernMinimal,
    gallery: [modernMinimal, coastal, afterLiving],
    summary: "A restrained, light-filled apartment framed around a skyline view.",
    overview:
      "A full interior renovation of a high-rise residence. We stripped the plan back to its structure, widened the sightlines toward the skyline and layered a quiet palette of oak, linen and plaster so the view stays the loudest element in the room.",
    services: ["Interior Design", "Space Planning", "Custom Joinery", "Styling"],
  },
  {
    id: "warm-luxury",
    name: "Warm Luxury",
    category: "Residential",
    location: "Old Town Villa",
    year: "2025",
    area: "410 m²",
    image: warmLuxury,
    gallery: [warmLuxury, heroKitchen, afterLiving],
    summary: "Walnut, brass and book-matched marble in a family kitchen and dining wing.",
    overview:
      "The brief asked for a kitchen that could host thirty people and still feel intimate for two. A waterfall marble island anchors the room, wrapped in walnut cabinetry and low warm lighting that keeps the space soft after dark.",
    services: ["Interior Design", "Custom Joinery", "Lighting Design", "Project Management"],
  },
  {
    id: "aurora-wellness",
    name: "Aurora Wellness",
    category: "Commercial",
    location: "Riverside District",
    year: "2024",
    area: "320 m²",
    image: aurora,
    gallery: [aurora, coastal, modernMinimal],
    summary: "A wellness flagship built on calm geometry and diffused light.",
    overview:
      "A ground-up fit-out for a wellness brand. Curved oak joinery, hand-troweled plaster and concealed lighting create a sequence that slows visitors down from the street to the treatment rooms.",
    services: ["Commercial Interiors", "Brand Environments", "Lighting Design", "Space Planning"],
  },
  {
    id: "coastal-retreat",
    name: "Coastal Retreat",
    category: "Residential",
    location: "Cape Verde Bay",
    year: "2024",
    area: "180 m²",
    image: coastal,
    gallery: [coastal, modernMinimal, afterLiving],
    summary: "Sand, linen and woven texture in a bedroom suite above the water.",
    overview:
      "A weekend house reworked as a single calm suite. Every surface was chosen for how it ages in salt air: washed linen, unfinished oak, limewash walls and woven jute underfoot.",
    services: ["Interior Design", "Styling", "Furniture Sourcing"],
  },
];

export type Service = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  deliverables: string[];
  image: string;
};

export const services: Service[] = [
  {
    slug: "interior-design",
    title: "Interior Design",
    excerpt: "Full residential and commercial interiors, concept through completion.",
    description:
      "A complete design service covering layout, materials, joinery, lighting and furniture. We work as a single point of responsibility from the first concept board to the final styling day.",
    deliverables: ["Concept direction", "Material palettes", "Technical drawings", "Furniture schedule", "Final styling"],
    image: modernMinimal,
  },
  {
    slug: "exterior-design",
    title: "Exterior & Facade",
    excerpt: "Facades, terraces and outdoor rooms designed as part of the whole.",
    description:
      "Exterior work that carries the same material language as the interior — stone, timber, planting and lighting composed so the building reads as one considered piece.",
    deliverables: ["Facade studies", "Terrace layouts", "Planting direction", "Exterior lighting"],
    image: coastal,
  },
  {
    slug: "custom-joinery",
    title: "Custom Joinery",
    excerpt: "Bespoke cabinetry and millwork made for the room it sits in.",
    description:
      "Every project includes pieces that cannot be bought. We detail them ourselves and work with a small group of makers who build to the drawing, not to the catalogue.",
    deliverables: ["Joinery drawings", "Material samples", "Maker coordination", "On-site installation"],
    image: warmLuxury,
  },
  {
    slug: "lighting-design",
    title: "Lighting Design",
    excerpt: "Layered, low-key lighting schemes that shape mood after dark.",
    description:
      "Lighting is the difference between a photographed room and a lived-in one. We plan circuits, temperatures and dimming scenes alongside the architecture.",
    deliverables: ["Lighting plans", "Fixture selection", "Scene programming", "Commissioning"],
    image: aurora,
  },
  {
    slug: "project-management",
    title: "Project Management",
    excerpt: "Contractors, budgets and programme held to the design intent.",
    description:
      "We run the site so the built result matches the drawings — tendering, sequencing, site visits and snagging, with weekly reporting to you.",
    deliverables: ["Tender packages", "Programme & budget", "Site supervision", "Snagging & handover"],
    image: afterLiving,
  },
  {
    slug: "styling-art",
    title: "Styling & Art",
    excerpt: "The last ten percent: objects, art and textiles that make it yours.",
    description:
      "Sourcing and placing the layer that photographs never explain — art, ceramics, books, textiles and the small objects that give a finished room its warmth.",
    deliverables: ["Art curation", "Object sourcing", "Textile layering", "Install day styling"],
    image: heroLiving,
  },
];

export const expertise = [
  { title: "Residential Interiors", text: "Apartments, villas and family homes designed around how you actually live." },
  { title: "Commercial Spaces", text: "Hospitality, wellness and workplace interiors with a brand-led point of view." },
  { title: "Renovation & Restoration", text: "Older buildings brought forward without erasing their character." },
  { title: "Furniture & Material Curation", text: "Considered sourcing from makers, mills and galleries we trust." },
];

export const processSteps = [
  { no: "01", title: "Discover", text: "We listen, measure and understand how the space needs to work." },
  { no: "02", title: "Concept", text: "Direction, references and material mood set before anything is drawn." },
  { no: "03", title: "Design", text: "Plans, elevations and detailing resolved down to the millimetre." },
  { no: "04", title: "Select", text: "Materials, finishes, lighting and furniture chosen and sampled." },
  { no: "05", title: "Execute", text: "We run the site, the makers and the programme to the drawing." },
  { no: "06", title: "Deliver", text: "Styling, handover and a space ready to be lived in." },
];

export type Transformation = {
  id: string;
  title: string;
  category: "Residential" | "Commercial";
  before: string;
  after: string;
  text: string;
};

export const transformations: Transformation[] = [
  {
    id: "family-living-room",
    title: "Family Living Room",
    category: "Residential",
    before: beforeLiving,
    after: afterLiving,
    text: "A dated carpeted lounge reworked into a warm, layered living room with slatted walnut, concealed lighting and a deep modular sofa.",
  },
  {
    id: "kitchen-dining-wing",
    title: "Kitchen & Dining Wing",
    category: "Residential",
    before: beforeLiving,
    after: heroKitchen,
    text: "Two cramped rooms opened into a single dining and cooking space around a book-matched marble island.",
  },
  {
    id: "wellness-reception",
    title: "Wellness Reception",
    category: "Commercial",
    before: beforeLiving,
    after: aurora,
    text: "A tired retail unit rebuilt as a calm arrival sequence in oak, plaster and diffused light.",
  },
];

export const testimonials = [
  {
    name: "Elena Marchetti",
    role: "Private client, Old Town Villa",
    quote:
      "They understood the house better than we did. Every material choice still feels right two years later.",
  },
  {
    name: "Daniel Okonjo",
    role: "Founder, Aurora Wellness",
    quote:
      "Our guests comment on the space before they comment on the treatments. That is the whole business case.",
  },
  {
    name: "Sofia Lind",
    role: "Private client, Marina Heights",
    quote:
      "Calm, precise and completely on top of the builders. The apartment feels twice its size now.",
  },
  {
    name: "Marcus Reyes",
    role: "Private client, Cape Verde Bay",
    quote:
      "A quiet, confident studio. They resisted every temptation to over-decorate, and the house is better for it.",
  },
];

export const faqs = [
  {
    category: "Working together",
    question: "How does a project usually start?",
    answer:
      "With a conversation and a site visit. From there we prepare a proposal covering scope, fee and programme before any design work begins.",
  },
  {
    category: "Working together",
    question: "Do you take on single rooms?",
    answer:
      "Yes, when the room carries the house — a kitchen, a primary suite or a main living space. We are less suited to small cosmetic refreshes.",
  },
  {
    category: "Timelines",
    question: "How long does a full interior take?",
    answer:
      "Design typically runs eight to fourteen weeks. Construction and joinery depend on scope, usually four to nine months.",
  },
  {
    category: "Timelines",
    question: "Can you work while we live in the property?",
    answer:
      "Often yes, by phasing the work. We will be direct if the programme or dust levels make it unrealistic.",
  },
  {
    category: "Investment",
    question: "How are fees structured?",
    answer:
      "A fixed design fee based on scope, then an agreed percentage for procurement and site management. Everything is set out before we start.",
  },
  {
    category: "Investment",
    question: "Do you work to a budget we set?",
    answer:
      "Always. We build a cost plan early and tell you honestly if the brief and budget do not meet.",
  },
];

export const values = [
  { title: "Restraint", text: "We remove before we add. Nothing enters a room without a reason." },
  { title: "Craft", text: "Detailing and makers matter more than trends or logos." },
  { title: "Honesty", text: "Clear budgets, clear programmes and direct answers." },
  { title: "Longevity", text: "Interiors that still look considered in fifteen years." },
];

export const team = [
  { name: "Adriana Sur", role: "Founder & Creative Director" },
  { name: "Tomás Deco", role: "Design Director" },
  { name: "Noor Haddad", role: "Head of Projects" },
  { name: "Liam Bauer", role: "Joinery & Detailing" },
];

export const contact = {
  studio: "Deco Sur Studio",
  address: "12 Almeria Lane, Riverside District",
  email: "studio@decosur.example",
  phone: "+1 (555) 0142 · placeholder",
  hours: "Monday – Friday, 09:00 – 18:00",
};
