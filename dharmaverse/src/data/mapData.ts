export type MapEra = {
  id: string;
  title: string;
  description: string;
  timelineOrder: number;
  startLabel: string;
  endLabel: string;
  activeLocations: string[]; // Location IDs active in this era
  worldState: string; // Thematic atmosphere
};

export type MapLocation = {
  id: string;
  name: string;
  slug: string;
  x: number; // For SVG map positioning (percentage)
  y: number; // For SVG map positioning (percentage)
  description: string;
  region: string;
  importance: "high" | "medium" | "low";
  theme: string; // Tailwind color class or similar
};

export type LocationPresence = {
  eraId: string;
  locationId: string;
  characters: string[]; // Character IDs present here during this era
  events: string[]; // Event IDs happening here during this era
};

export type MapRoute = {
  id: string;
  eraId: string;
  fromLocationId: string;
  toLocationId: string;
  characters: string[]; // Characters traveling
  description: string;
};

// --- DATA ---

export const mapEras: MapEra[] = [
  {
    id: "golden-age",
    title: "The Golden Age",
    description: "The peak of the Kuru dynasty's prosperity before the seeds of discord were fully sown.",
    timelineOrder: 1,
    startLabel: "Birth of Princes",
    endLabel: "The Dice Game",
    activeLocations: ["hastinapur", "indraprastha", "dwarka"],
    worldState: "from-amber-900/20 to-black" // Warm, prosperous
  },
  {
    id: "great-exile",
    title: "The Great Exile",
    description: "Years of wandering reshape the destiny of the Pandavas as they endure the forest.",
    timelineOrder: 2,
    startLabel: "Vow of Exile",
    endLabel: "Return to Virat",
    activeLocations: ["hastinapur", "kamyaka-forest", "dwarka"],
    worldState: "from-green-900/20 to-black" // Earthy, dark, forest
  },
  {
    id: "kurukshetra-war",
    title: "The Kurukshetra War",
    description: "The devastating 18-day battle that annihilated millions to establish Dharma.",
    timelineOrder: 3,
    startLabel: "Day 1",
    endLabel: "The Night Massacre",
    activeLocations: ["kurukshetra", "hastinapur"],
    worldState: "from-red-900/20 to-black" // Bloody, tragic, fiery
  }
];

export const mapLocations: MapLocation[] = [
  {
    id: "hastinapur",
    name: "Hastinapura",
    slug: "hastinapur",
    x: 45,
    y: 35,
    description: "The capital city of the Kuru Kingdom. The center of all political power and the ultimate prize of the epic.",
    region: "Kuru Kingdom",
    importance: "high",
    theme: "text-amber-500"
  },
  {
    id: "indraprastha",
    name: "Indraprastha",
    slug: "indraprastha",
    x: 40,
    y: 45,
    description: "The magnificent city built by the Pandavas out of the Khandava forest, famously creating immense envy in Duryodhana.",
    region: "Kuru Kingdom (Pandava Territory)",
    importance: "high",
    theme: "text-blue-500"
  },
  {
    id: "kurukshetra",
    name: "Kurukshetra",
    slug: "kurukshetra",
    x: 42,
    y: 28,
    description: "The sacred plains of Dharmakshetra. The chosen battlefield for the greatest war in history.",
    region: "Kuru Kingdom",
    importance: "high",
    theme: "text-red-500"
  },
  {
    id: "dwarka",
    name: "Dwarka",
    slug: "dwarka",
    x: 15,
    y: 65,
    description: "The golden island city of Lord Krishna, immune to the political maneuverings of the mainland.",
    region: "Yadava Kingdom",
    importance: "medium",
    theme: "text-indigo-400"
  },
  {
    id: "kamyaka-forest",
    name: "Kamyaka Forest",
    slug: "kamyaka-forest",
    x: 30,
    y: 38,
    description: "A deep, wild forest situated on the banks of the Saraswati river. A place of severe penance and refuge for the Pandavas during their exile.",
    region: "Wilderness",
    importance: "medium",
    theme: "text-green-500"
  }
];

export const locationPresences: LocationPresence[] = [
  // Golden Age
  {
    eraId: "golden-age",
    locationId: "hastinapur",
    characters: ["bhishma", "vidura", "duryodhana", "karna", "drona"],
    events: ["dice-game", "draupadi-sabha"]
  },
  {
    eraId: "golden-age",
    locationId: "indraprastha",
    characters: ["arjuna", "draupadi"],
    events: []
  },
  {
    eraId: "golden-age",
    locationId: "dwarka",
    characters: ["krishna"],
    events: []
  },
  
  // Great Exile
  {
    eraId: "great-exile",
    locationId: "hastinapur",
    characters: ["bhishma", "vidura", "duryodhana", "karna", "drona"],
    events: []
  },
  {
    eraId: "great-exile",
    locationId: "kamyaka-forest",
    characters: ["arjuna", "draupadi"],
    events: []
  },
  {
    eraId: "great-exile",
    locationId: "dwarka",
    characters: ["krishna"],
    events: []
  },

  // Kurukshetra War
  {
    eraId: "kurukshetra-war",
    locationId: "kurukshetra",
    characters: ["krishna", "arjuna", "karna", "bhishma", "drona", "duryodhana", "ashwatthama"],
    events: ["abhimanyu", "bhishma-vow", "karna-vs-arjuna"]
  },
  {
    eraId: "kurukshetra-war",
    locationId: "hastinapur",
    characters: ["vidura", "kunti", "draupadi"], // Wait, Draupadi was at camp, but for map purposes let's keep it simple. Actually Kunti/Vidura are in Hastinapur.
    events: ["peace-mission"] // technically before the war, but fits the war build-up
  }
];

export const mapRoutes: MapRoute[] = [
  {
    id: "exile-journey",
    eraId: "great-exile",
    fromLocationId: "indraprastha",
    toLocationId: "kamyaka-forest",
    characters: ["arjuna", "draupadi"],
    description: "The Pandavas leave their kingdom for the wilderness."
  }
];
