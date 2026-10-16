import type { MediaKey } from "./media";

export type CategoryId = "exterior" | "interior" | "correction" | "protection";

export type Category = {
  id: CategoryId;
  code: string;
  title: string;
  heading: string;
  intro: string;
};

export const categories: Category[] = [
  {
    id: "exterior",
    code: "A",
    title: "Exterior Car Care",
    heading: "Exterior",
    intro:
      "Safe, methodical cleaning for paint, glass, wheels and the surfaces you rarely see — the foundation of every finish.",
  },
  {
    id: "interior",
    code: "B",
    title: "Interior Detailing",
    heading: "Interior",
    intro:
      "The cabin is where you spend your time. We clean it with surface-specific products, patience and an eye for the details in between.",
  },
  {
    id: "correction",
    code: "C",
    title: "Paint Correction & Finishing",
    heading: "Correction",
    intro:
      "Machine polishing and careful correction to bring back clarity, depth and reflection — always matched to what your paint can safely take.",
  },
  {
    id: "protection",
    code: "D",
    title: "Advanced Protection",
    heading: "Protection",
    intro:
      "Ceramic and graphene coatings and paint protection film, for owners who want their finish to stay looking its best for longer.",
  },
];

export type Service = {
  slug: string;
  title: string;
  category: CategoryId;
  /** One-line, benefit-focused summary for cards. */
  short: string;
  image: MediaKey;
  imagePosition?: string;
  description: string;
  process: string[];
  benefits: string[];
  considerations: string[];
  options?: { name: string; detail: string }[];
  related: string[];
  /** Only set when supplied and confirmed by the business, e.g. "From £45". */
  startingPrice: string | null;
  /** Original service names this customer-facing service covers. */
  covers: string[];
  featured?: boolean;
};

export const services: Service[] = [
  // ── A · Exterior ──────────────────────────────────────────
  {
    slug: "pressure-car-wash",
    title: "Pressure Car Wash",
    category: "exterior",
    short: "A controlled pre-rinse and wash that lifts road grime before anything touches the paint.",
    image: "foamWash",
    description:
      "Most wash scratches happen when grit is dragged across paint. Our pressure wash removes as much loose dirt as possible first, then follows with a careful wash and a soft, safe dry.",
    process: [
      "Pressure pre-rinse to remove loose dirt and grit",
      "Pre-wash foam to soften bonded road film",
      "Hand wash with clean mitts and pH-balanced shampoo",
      "Final rinse and soft-touch drying",
    ],
    benefits: [
      "Removes abrasive grime before contact washing",
      "Helps reduce the risk of wash-induced swirl marks",
      "Creates a clean base for any further detailing",
    ],
    considerations: [
      "Tar, iron fallout or tree sap may need decontamination as an add-on.",
      "The process is adapted for matte paint, wraps and older finishes.",
    ],
    related: ["rim-wheel-tyre-care", "undercarriage-wash", "car-waxing"],
    startingPrice: null,
    covers: ["Pressure Car Washing"],
  },
  {
    slug: "window-glass-cleaning",
    title: "Window & Glass Cleaning",
    category: "exterior",
    short: "Streak-free clarity for windscreens, windows and mirrors — inside and out.",
    image: "audiFront",
    description:
      "Clean glass is a safety feature as much as a finishing touch. We remove exterior road film and the interior haze that builds up on windscreens, using products suited to tinted and coated glass.",
    process: [
      "Inspect glass and note any chips or cracks",
      "Remove exterior road film, bugs and water marks",
      "Clean interior glass with an ammonia-free, tint-safe cleaner",
      "Finish mirrors and camera lenses",
    ],
    benefits: [
      "Clearer visibility in low sun and at night",
      "Removes interior windscreen haze",
      "Suitable for most aftermarket window tints",
    ],
    considerations: [
      "Chips and cracks are noted but not repaired.",
      "Etched water spots may need dedicated glass polishing.",
    ],
    related: ["pressure-car-wash", "interior-deep-cleaning"],
    startingPrice: null,
    covers: ["Car Window Cleaning"],
  },
  {
    slug: "rim-wheel-tyre-care",
    title: "Rim, Wheel & Tyre Care",
    category: "exterior",
    short: "Brake dust removed, barrels cleaned and tyres finished in satin or gloss.",
    image: "wheelSpray",
    description:
      "Wheels collect the most aggressive dirt on the car. We clean faces, barrels and calipers with dedicated brushes and finish tyres with a dressing that suits your taste.",
    process: [
      "Wheel faces, barrels and visible calipers cleaned",
      "Iron and brake-dust remover where safe for the finish",
      "Tyre sidewalls scrubbed clean",
      "Tyre dressing applied for a satin or gloss look",
    ],
    benefits: [
      "Removes corrosive brake dust",
      "Refreshes tyre sidewalls for a sharper look",
      "Finish level chosen by you",
    ],
    considerations: [
      "Kerb damage and existing corrosion are cleaned around, not repaired.",
      "Specialist finishes such as polished or matte wheels need specific products.",
    ],
    options: [
      { name: "Rim & wheel clean", detail: "Faces, barrels and arches cleaned and decontaminated." },
      { name: "Tyre gloss", detail: "Sidewalls cleaned and dressed in a satin or high-gloss finish." },
    ],
    related: ["pressure-car-wash", "undercarriage-wash"],
    startingPrice: null,
    covers: ["Rim and Wheel Cleaning", "Tyre Gloss"],
  },
  {
    slug: "undercarriage-wash",
    title: "Undercarriage Wash",
    category: "exterior",
    short: "A targeted underbody rinse to clear mud, salt and road film from hidden areas.",
    image: "gtrDusk",
    description:
      "Salt, mud and grime collect in places you never see. An undercarriage wash flushes the underbody, sills and wheel arches so dirt is not left sitting on the vehicle.",
    process: [
      "Pre-treat wheel arches and sills",
      "Rinse the underbody with an angled lance",
      "Final rinse and visual check of arches",
    ],
    benefits: [
      "Helps remove salt and grime that can encourage corrosion",
      "Cleaner arches lift the whole car's presentation",
      "Useful after winter driving or rural roads",
    ],
    considerations: [
      "This is a cleaning service, not a rust-proofing treatment.",
      "Existing corrosion is not treated.",
    ],
    related: ["pressure-car-wash", "rim-wheel-tyre-care"],
    startingPrice: null,
    covers: ["Undercarriage Washing"],
  },
  {
    slug: "car-waxing",
    title: "Car Waxing",
    category: "exterior",
    short: "A hand-applied wax for warmth, depth and short-term protection.",
    image: "porscheSunset",
    description:
      "Wax adds a rich, warm gloss and a sacrificial layer between your paint and the elements. It is a classic finish and a good fit for regular upkeep.",
    process: [
      "Wash and dry the vehicle",
      "Apply wax by hand, panel by panel",
      "Buff to a clear, even finish",
    ],
    benefits: [
      "Adds gloss and visual depth",
      "Encourages water to bead and run off",
      "Makes routine washing easier",
    ],
    considerations: [
      "Wax is sacrificial; how long it lasts depends on weather, washing and storage.",
      "For longer-term protection, ask about ceramic or graphene coating.",
    ],
    related: ["machine-polishing", "ceramic-graphene-coating"],
    startingPrice: null,
    covers: ["Car Waxing"],
  },

  // ── B · Interior ──────────────────────────────────────────
  {
    slug: "interior-deep-cleaning",
    title: "Interior Deep Cleaning",
    category: "interior",
    short: "A methodical clean of the whole cabin — surfaces, vents, door shuts and the gaps between.",
    image: "interior",
    description:
      "A thorough reset for the cabin. Every surface is cleaned with a product suited to it, from soft-touch plastics to screens and trim, finished without greasy residue.",
    process: [
      "Remove loose items and debris",
      "Full vacuum including seats, carpets and boot",
      "Dashboard, console, vents and door cards cleaned",
      "Screens and interior glass wiped; non-greasy dressing applied",
    ],
    benefits: [
      "A cabin that looks and feels fresh",
      "Surface-safe products for modern materials",
      "Attention to vents, seams and door shuts",
    ],
    considerations: [
      "Heavy staining or odours may need upholstery or dry cleaning as well.",
      "Personal items should be removed before your appointment.",
    ],
    related: ["interior-vacuuming", "upholstery-cleaning", "air-freshener-treatment"],
    startingPrice: null,
    covers: ["Interior Cleaning"],
  },
  {
    slug: "interior-vacuuming",
    title: "Interior Vacuuming",
    category: "interior",
    short: "Seats, carpets, mats, boot and crevices — vacuumed properly, not just quickly.",
    image: "cockpit",
    description:
      "Grit in carpets wears fibres and dulls the cabin. Our vacuuming reaches under seats, along rails and into the boot, with crevice tools for the tight spots.",
    process: [
      "Mats removed and cleaned separately",
      "Seats, carpets and boot vacuumed",
      "Crevices, seat rails and pockets detailed",
    ],
    benefits: [
      "Removes abrasive grit and debris",
      "Quick turnaround between deeper cleans",
      "Pairs with any exterior wash",
    ],
    considerations: ["Ground-in stains need dry cleaning or upholstery cleaning."],
    options: [
      { name: "Express vacuum", detail: "Seats, carpets and mats." },
      { name: "Full vacuum", detail: "Includes boot, under seats, rails and crevices." },
    ],
    related: ["interior-deep-cleaning", "dry-cleaning"],
    startingPrice: null,
    covers: ["Vehicle Interior Vacuuming", "Vacuuming"],
  },
  {
    slug: "dry-cleaning",
    title: "Interior Dry Cleaning",
    category: "interior",
    short: "Low-moisture cleaning for fabrics, carpets and headlining that shouldn't be soaked.",
    image: "interior",
    imagePosition: "30% 60%",
    description:
      "Some materials don't respond well to saturation. Low-moisture dry cleaning lifts dirt from fabrics and headlining while keeping drying times short.",
    process: [
      "Vacuum to remove loose debris",
      "Low-moisture cleaner applied and agitated",
      "Soil lifted with clean microfibre",
    ],
    benefits: [
      "Faster drying than wet extraction",
      "Suitable for headlining and delicate fabrics",
      "Freshens without over-wetting",
    ],
    considerations: ["Long-set stains may lighten rather than disappear completely."],
    related: ["upholstery-cleaning", "interior-deep-cleaning"],
    startingPrice: null,
    covers: ["Dry Cleaning"],
  },
  {
    slug: "upholstery-cleaning",
    title: "Upholstery Cleaning",
    category: "interior",
    short: "Fabric and leather seats cleaned and cared for with the right method for each.",
    image: "interior",
    imagePosition: "70% 70%",
    description:
      "Fabric seats are deep cleaned to lift body oils and spills; leather is cleaned with a pH-appropriate cleaner and conditioned to help keep it supple.",
    process: [
      "Assess material type and condition",
      "Fabric: agitate and extract; leather: clean and wipe",
      "Leather conditioned where appropriate",
    ],
    benefits: [
      "Lifts everyday grime and spills",
      "Helps keep leather supple",
      "Restores a cleaner look and feel",
    ],
    considerations: ["Wear, cracking or colour loss in leather cannot be reversed by cleaning."],
    related: ["dry-cleaning", "interior-deep-cleaning"],
    startingPrice: null,
    covers: ["Vehicle Upholstery Cleaning"],
  },
  {
    slug: "air-freshener-treatment",
    title: "Air-Freshener Treatment",
    category: "interior",
    short: "A finishing fragrance treatment to leave the cabin fresh after cleaning.",
    image: "cockpit",
    imagePosition: "50% 30%",
    description:
      "A light finishing treatment applied after cleaning, so the cabin smells as fresh as it looks. Fragrance-free requests are always welcome.",
    process: ["Cabin cleaned first", "Fragrance treatment applied", "Cabin aired before handover"],
    benefits: ["A fresh finish to any interior service", "Subtle, not overpowering"],
    considerations: [
      "Persistent odours (smoke, pets, spills) are best tackled with deep cleaning first.",
      "Let us know about sensitivities or allergies.",
    ],
    related: ["interior-deep-cleaning"],
    startingPrice: null,
    covers: ["Air-Freshener Treatment"],
  },

  // ── C · Correction ────────────────────────────────────────
  {
    slug: "auto-detailing",
    title: "Full Auto Detailing",
    category: "correction",
    short: "A comprehensive inside-and-out detail, tailored to your vehicle's condition.",
    image: "handWash",
    description:
      "Our most complete cleaning service. We inspect the vehicle, agree priorities with you, then work through exterior, wheels, glass and interior to a consistent standard.",
    process: [
      "Inspection and agreed scope",
      "Exterior wash, decontamination and wheels",
      "Interior clean matched to materials",
      "Finishing touches and walk-around handover",
    ],
    benefits: [
      "One appointment, the whole vehicle",
      "Scope tailored to condition and budget",
      "Ideal before a sale, event or coating",
    ],
    considerations: ["Paint correction is quoted separately after inspection."],
    related: ["machine-polishing", "interior-deep-cleaning", "ceramic-graphene-coating"],
    startingPrice: null,
    covers: ["Auto Detailing"],
  },
  {
    slug: "machine-polishing",
    title: "Machine Polishing",
    category: "correction",
    short: "Restores clarity, depth and reflection by refining the paint surface.",
    image: "paintCurve",
    description:
      "Polishing removes a microscopic layer of clear coat to reduce haze, swirls and light defects. The level of correction is chosen after inspecting your paint, never guessed.",
    process: [
      "Wash, decontaminate and inspect under detailing lights",
      "Measure and assess paint where needed",
      "Test section to choose pad and polish",
      "Machine polish panel by panel, then inspect",
    ],
    benefits: [
      "Noticeably sharper gloss and reflections",
      "Reduces swirls and light marring",
      "Ideal preparation for wax or coating",
    ],
    considerations: [
      "Polishing removes clear coat, so we correct only as far as is safe.",
      "Some defects can be reduced but not fully removed.",
    ],
    options: [
      { name: "Gloss enhancement", detail: "A single, light stage to lift clarity and shine." },
      { name: "One-step correction", detail: "Balanced defect reduction with a high-gloss finish." },
      { name: "Multi-stage correction", detail: "Maximum safe correction for enthusiast finishes." },
    ],
    related: ["scratch-swirl-treatment", "ceramic-graphene-coating", "car-waxing"],
    startingPrice: null,
    covers: ["Car Polishing", "Polishing"],
    featured: true,
  },
  {
    slug: "scratch-swirl-treatment",
    title: "Scratch & Swirl Treatment",
    category: "correction",
    short: "Reduces or removes light scratches and swirls that sit within the clear coat.",
    image: "headlight",
    description:
      "Targeted correction for visible marks — from wash swirls to light scuffs. We'll tell you honestly what can be removed, what can be improved and what needs a paint specialist.",
    process: [
      "Inspect each mark under strong light",
      "Assess depth and agree expectations",
      "Localised machine correction",
      "Refine to blend with surrounding paint",
    ],
    benefits: [
      "Removes or reduces light surface marks",
      "Restores uniform gloss on treated areas",
      "Honest assessment before any work",
    ],
    considerations: [
      "Scratches that catch a fingernail may only be reduced.",
      "Damage through the clear coat needs paint repair, not polishing.",
    ],
    related: ["machine-polishing", "paint-protection-film"],
    startingPrice: null,
    covers: ["Scratch Removal"],
  },

  // ── D · Protection ────────────────────────────────────────
  {
    slug: "ceramic-graphene-coating",
    title: "Ceramic & Graphene Coating",
    category: "protection",
    short: "A durable, high-gloss protective layer that makes your finish easier to keep clean.",
    image: "emblemDroplets",
    description:
      "Coatings bond to the clear coat to form a hard, glossy, water-repellent layer. Graphene-enhanced options are formulated for extra slickness and to help reduce water spotting. Correct preparation is what makes either perform.",
    process: [
      "Wash and full decontamination",
      "Paint correction as required",
      "Panel wipe to remove oils",
      "Coating applied and levelled panel by panel",
      "Controlled curing before handover",
    ],
    benefits: [
      "Deep, glossy finish",
      "Strong water-beading and easier washing",
      "Added resistance to UV, bird droppings and chemical etching when cleaned promptly",
    ],
    considerations: [
      "Coatings are not scratch-proof and do not stop stone chips.",
      "Lifespan depends on product, preparation, use and maintenance.",
    ],
    related: ["machine-polishing", "paint-protection-film"],
    startingPrice: null,
    covers: ["Ceramic and Graphene Coating"],
    featured: true,
  },
  {
    slug: "paint-protection-film",
    title: "Paint Protection Film (PPF)",
    category: "protection",
    short: "A clear, durable film that helps defend vulnerable panels from everyday road wear.",
    image: "redR8",
    description:
      "PPF is a transparent urethane film applied to painted panels. It adds a physical layer that helps absorb light impacts from road debris and helps protect against light scuffs.",
    process: [
      "Consultation and coverage plan",
      "Wash, decontaminate and prepare paint",
      "Film cut or patterned to each panel",
      "Installed, edges finished and inspected",
    ],
    benefits: [
      "Helps protect high-impact areas from stone chips",
      "Optically clear, preserving the factory look",
      "Can be combined with a coating for easier care",
    ],
    considerations: [
      "PPF reduces risk but does not make paint immune to chips, scratches or damage.",
      "Existing chips and defects will remain visible under the film.",
    ],
    related: ["ceramic-graphene-coating", "scratch-swirl-treatment"],
    startingPrice: null,
    covers: ["Paint Protection Film (PPF)"],
    featured: true,
  },
];

export const servicesByCategory = (id: CategoryId) => services.filter((s) => s.category === id);

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const categoryOf = (id: CategoryId) => categories.find((c) => c.id === id)!;
