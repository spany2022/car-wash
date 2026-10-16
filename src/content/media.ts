/**
 * Image registry. All photography is ILLUSTRATIVE stock imagery (Unsplash licence)
 * used for this demo. Replace each `src` with the studio's own photography —
 * never present stock images as customer vehicles or genuine results.
 */

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export type Media = {
  src: string;
  alt: string;
  /** CSS object-position for art direction. */
  position?: string;
};

export const media = {
  heroCoupe: {
    src: unsplash("1485291571150-772bcfc10da5"),
    alt: "Black luxury coupe in profile, picked out by a single studio light against a dark backdrop",
    position: "50% 55%",
  },
  foamWash: {
    src: unsplash("1520340356584-f9917d1eea6f"),
    alt: "Dark sports car being rinsed with a pressure washer, water spraying off the rear wheel",
    position: "60% 50%",
  },
  handWash: {
    src: unsplash("1607860108855-64acf2078ed9"),
    alt: "Detailer hand-washing a black car with a wash mitt and buckets",
  },
  wheelSpray: {
    src: unsplash("1608506375591-b90e1f955e4b"),
    alt: "Close-up of an alloy wheel and tyre under a fine spray of water",
  },
  interior: {
    src: unsplash("1610647752706-3bb12232b3ab"),
    alt: "Clean modern vehicle interior with leather steering wheel and central touchscreen",
  },
  cockpit: {
    src: unsplash("1449965408869-eaa3f722e40d"),
    alt: "Driver's view of a vehicle cockpit, hands resting on the steering wheel",
  },
  emblemDroplets: {
    src: unsplash("1563694983011-6f4d90358083"),
    alt: "Chrome bonnet emblem with water beading on glossy dark paint",
  },
  paintCurve: {
    src: unsplash("1515569067071-ec3b51335dd0"),
    alt: "Abstract close-up of glossy orange paint curving along a car body",
  },
  hoodGloss: {
    src: unsplash("1514316454349-750a7fd3da3a"),
    alt: "Glossy grey bonnet with a yellow stripe reflecting overhead light",
  },
  headlight: {
    src: unsplash("1606577924006-27d39b132ae2"),
    alt: "Red car headlight and front panel detail in sharp close-up",
  },
  silverSupercar: {
    src: unsplash("1617654112368-307921291f42"),
    alt: "Silver supercar facing the camera under a spotlight in a dark studio",
  },
  gtrDusk: {
    src: unsplash("1611859266238-4b98091d9d9b"),
    alt: "Dark performance coupe parked on a mountain road at dusk",
  },
  workshop: {
    src: unsplash("1486006920555-c77dcf18193c"),
    alt: "Dimly lit detailing workshop with a vehicle under inspection lights",
  },
  redGarage: {
    src: unsplash("1590362891991-f776e747a588"),
    alt: "White saloon parked in a garage bay lit with red and teal light",
  },
  tealStudio: {
    src: unsplash("1626668893632-6f3a4466d22f"),
    alt: "Muscle car in a teal-lit industrial studio with glossy reflections on the floor",
  },
  greyCoupe: {
    src: unsplash("1612544448445-b8232cff3b6c"),
    alt: "Silver coupe parked in a dark tunnel with light on its bodywork",
  },
  audiFront: {
    src: unsplash("1606664515524-ed2f786a0bd6"),
    alt: "Front view of a black estate car at twilight",
  },
  porscheSunset: {
    src: unsplash("1580274455191-1c62238fa333"),
    alt: "Black sports car on a waterfront at sunset with warm reflections on the paint",
  },
  redR8: {
    src: unsplash("1502161254066-6c74afbf07aa"),
    alt: "Red supercar with gloss paint parked against a darkening sky",
  },
  darkGarage: {
    src: unsplash("1609521263047-f8f205293f24"),
    alt: "Saloon car parked in fog on a dark road, lit from behind",
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
