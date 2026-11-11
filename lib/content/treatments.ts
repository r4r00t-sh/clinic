export type TreatmentCategory =
  | "Massage & Oil Therapies"
  | "Mind & Nervous System"
  | "Detox & Cleansing"
  | "Targeted Therapies"
  | "Beauty";

export type ImageConfidence = "confident" | "unsure" | "placeholder";

export type Treatment = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  helpfulFor: string[];
  category: TreatmentCategory;
  /** Primary photo path under /public, or null for sand placeholder */
  image: string | null;
  imageAlt: string;
  imageConfidence: ImageConfidence;
  imageNote?: string;
  featured: boolean;
};

export const treatmentCategories: Array<TreatmentCategory | "All"> = [
  "All",
  "Massage & Oil Therapies",
  "Mind & Nervous System",
  "Detox & Cleansing",
  "Targeted Therapies",
  "Beauty",
];

/**
 * Photos rematched by visual inspection (v2 filenames were offset).
 * See MOTION.md / closing report for confidence notes.
 */
export const treatments: Treatment[] = [
  {
    id: "abhyanga",
    slug: "abhyanga",
    name: "ABHYANGA",
    tagline: "Rejuvenate your body and mind. The art of Ayurvedic healing.",
    description:
      "A traditional Ayurvedic full-body massage designed to rejuvenate, detoxify and restore balance. Warm herbal oils chosen for your body type are applied with rhythmic strokes to enhance circulation, reduce stress and promote deep relaxation.",
    helpfulFor: ["Stress", "Circulation", "Detox", "Relaxation"],
    category: "Massage & Oil Therapies",
    image: "images/treatments/treatment_1.jpg",
    imageAlt: "Therapist pouring warm herbal oil onto a patient’s back during Abhyanga massage",
    imageConfidence: "confident",
    featured: true,
  },
  {
    id: "podikizhi",
    slug: "podikizhi",
    name: "PODIKIZHI",
    tagline: "Soothe aches, revive energy.",
    description:
      "Warm poultices filled with medicinal herbal powders are massaged over the body to relieve stiffness, improve circulation and detoxify. Ideal for joint pain, muscle tension and inflammation.",
    helpfulFor: ["Joint pain", "Muscle tension", "Inflammation"],
    category: "Massage & Oil Therapies",
    image: "images/treatments/treatment_9.jpg",
    imageAlt: "Practitioners squeezing warm herbal pouches (kizhi) onto a patient’s shoulder",
    imageConfidence: "confident",
    featured: true,
  },
  {
    id: "shirodhara",
    slug: "shirodhara",
    name: "SHIRODHARA",
    tagline: "The blissful flow of tranquillity.",
    description:
      "A signature therapy in which a steady stream of warm herbal oil is poured gently over the forehead, soothing the nervous system. Known for relieving stress, improving sleep and enhancing mental clarity.",
    helpfulFor: ["Stress", "Sleep", "Mental clarity"],
    category: "Mind & Nervous System",
    image: "images/treatments/treatment_6.jpg",
    imageAlt: "Steady stream of warm oil poured onto the forehead during Shirodhara",
    imageConfidence: "confident",
    featured: true,
  },
  {
    id: "nasyam",
    slug: "nasyam",
    name: "NASYAM",
    tagline: "Breathe easy, live healthy.",
    description:
      "An Ayurvedic detox therapy for the nasal passage using medicated herbal oils or extracts. Addresses sinusitis, headaches and respiratory disorders while promoting mental clarity.",
    helpfulFor: ["Sinusitis", "Headaches", "Respiratory health"],
    category: "Detox & Cleansing",
    image: "images/treatments/treatment_7.jpg",
    imageAlt: "Practitioner administering medicated oil into the nostril for Nasyam",
    imageConfidence: "confident",
    featured: true,
  },
  {
    id: "udhwarthanam",
    slug: "udhwarthanam",
    name: "UDHWARTHANAM",
    tagline: "The Ayurvedic dry powder detox.",
    description:
      "Finely ground herbal powders are applied with upward strokes to stimulate the skin, improve circulation and help break down fat deposits. Known to tone the body, reduce cellulite and improve skin texture.",
    helpfulFor: ["Body toning", "Circulation", "Skin texture"],
    category: "Detox & Cleansing",
    image: "images/treatments/treatment_8.jpg",
    imageAlt: "Herbal powder massage on the legs during Udhwarthanam",
    imageConfidence: "confident",
    featured: false,
  },
  {
    id: "pizhichil",
    slug: "pizhichil",
    name: "PIZHICHIL",
    tagline: "The King's Therapy.",
    description:
      "Gentle massage combined with the rhythmic pouring of warm medicated oil across the body. Relieves muscle tension, supports detoxification and vitality, and is valued for stress and joint health.",
    helpfulFor: ["Muscle tension", "Joint health", "Stress"],
    category: "Massage & Oil Therapies",
    image: null,
    imageAlt: "Pizhichil therapy",
    imageConfidence: "placeholder",
    // No verified cloth-oil pour image in the current set — supply before launch
    imageNote: "Photo pending",
    featured: false,
  },
  {
    id: "lepanam",
    slug: "lepanam",
    name: "LEPANAM",
    tagline: "Targeted healing through herbal application.",
    description:
      "Custom herbal pastes are applied to affected areas to address pain, inflammation and skin conditions. Suited to arthritis, joint pain and certain skin disorders.",
    helpfulFor: ["Arthritis", "Joint pain", "Skin conditions"],
    category: "Targeted Therapies",
    image: "images/treatments/treatment_10.jpg",
    imageAlt: "Green herbal paste applied to the upper back during Lepanam",
    imageConfidence: "confident",
    featured: false,
  },
  {
    id: "navara-kizhi",
    slug: "navara-kizhi",
    name: "NAVARA KIZHI",
    tagline: "The nourishing rice therapy.",
    description:
      "Warm pouches of Navara rice cooked in herbal decoction and milk are massaged over the body to nourish the skin, strengthen muscles and improve circulation. Beneficial for arthritis, muscular weakness, joint pain and neurological conditions.",
    helpfulFor: ["Arthritis", "Muscular weakness", "Joint pain"],
    category: "Massage & Oil Therapies",
    image: "images/treatments/treatment_12.jpg",
    imageAlt: "White rice boluses massaged over the back during Navara Kizhi",
    imageConfidence: "confident",
    featured: true,
  },
  {
    id: "takra-dhara",
    slug: "takra-dhara",
    name: "TAKRA DHARA",
    tagline: "Cool and calm your mind.",
    description:
      "A gentle, continuous flow of medicated buttermilk over the forehead to soothe the nervous system. Effective for stress, insomnia, migraines and psychosomatic conditions, and supports concentration and emotional balance.",
    helpfulFor: ["Stress", "Insomnia", "Migraines"],
    category: "Mind & Nervous System",
    image: "images/treatments/treatment_13.jpg",
    imageAlt: "Milky medicated liquid poured from a hanging clay pot onto the forehead",
    imageConfidence: "confident",
    featured: true,
  },
  {
    id: "dhanyamla-dhara",
    slug: "dhanyamla-dhara",
    name: "DHANYAMLA DHARA",
    tagline: "Detox and rejuvenate.",
    description:
      "Warm, fermented herbal liquid is poured continuously over the body with gentle massage. Valued for its anti-inflammatory and detoxifying properties: joint pain, swelling, weight management and circulation.",
    helpfulFor: ["Joint pain", "Swelling", "Circulation"],
    category: "Detox & Cleansing",
    image: "images/treatments/treatment_14.jpg",
    imageAlt: "Reddish herbal liquid poured from a brass vessel onto the chest",
    imageConfidence: "unsure",
    // Confirm with client before launch — may be a general oil/dhara pour
    imageNote: "Image confidence: unsure",
    featured: false,
  },
  {
    id: "avagaham",
    slug: "avagaham",
    name: "AVAGAHAM",
    tagline: "Soak in serenity.",
    description:
      "A bath in a warm herbal decoction of carefully selected medicinal herbs. Relieves muscle stiffness, improves circulation and eases rheumatism, joint pain and stress-related ailments.",
    helpfulFor: ["Muscle stiffness", "Rheumatism", "Stress"],
    category: "Detox & Cleansing",
    image: "images/treatments/treatment_15.jpg",
    imageAlt: "Woman receiving a herbal pour while seated in a copper bath",
    imageConfidence: "confident",
    featured: false,
  },
  {
    id: "herbal-steam-bath",
    slug: "herbal-steam-bath",
    name: "HERBAL STEAM BATH",
    tagline: "Cleanse and rejuvenate.",
    description:
      "Steam infused with medicinal herbs opens the pores, helps eliminate toxins and improves circulation. Relieves muscle tension, reduces stress and supports skin health.",
    helpfulFor: ["Detox", "Muscle tension", "Skin health"],
    category: "Detox & Cleansing",
    image: "images/treatments/treatment_16.jpg",
    imageAlt: "Woman seated in a wooden herbal steam cabinet",
    imageConfidence: "confident",
    featured: false,
  },
  {
    id: "herbal-facial",
    slug: "herbal-facial",
    name: "HERBAL FACIAL",
    tagline: "Glow naturally.",
    description:
      "Carefully selected herbal ingredients cleanse, exfoliate and rejuvenate, leaving skin soft, smooth and glowing. Helps reduce blemishes, hydrate and improve texture.",
    helpfulFor: ["Blemishes", "Hydration", "Skin texture"],
    category: "Beauty",
    image: "images/treatments/treatment_17.jpg",
    imageAlt: "Green herbal clay mask being brushed onto the face",
    imageConfidence: "confident",
    featured: true,
  },
  {
    id: "kati-vasti",
    slug: "kati-vasti",
    name: "KATI VASTI",
    tagline: "Relieve back pain naturally.",
    description:
      "Warm medicated oil is retained in a custom reservoir over the lower back to soothe muscles, lubricate joints and reduce inflammation. Effective for sciatica, lumbar spondylosis, disc issues and chronic back pain.",
    helpfulFor: ["Sciatica", "Back pain", "Disc issues"],
    category: "Targeted Therapies",
    image: "images/treatments/treatment_18.jpg",
    imageAlt: "Warm oil poured into a dough ring on the lower back for Kati Vasti",
    imageConfidence: "confident",
    featured: true,
  },
  {
    id: "uro-vasti",
    slug: "uro-vasti",
    name: "URO VASTI",
    tagline: "Ayurvedic chest therapy.",
    description:
      "Warm medicated oil is retained in a dough ring over the chest to ease tension, improve circulation and revitalise the chest area. Supports respiratory issues, chest discomfort and heart and lung wellness.",
    helpfulFor: ["Respiratory support", "Chest discomfort"],
    category: "Targeted Therapies",
    image: "images/treatments/treatment_19.jpg",
    imageAlt: "Warm oil poured into a dough ring on the chest for Uro Vasti",
    imageConfidence: "confident",
    featured: false,
  },
  {
    id: "tarpanam",
    slug: "tarpanam",
    name: "TARPANAM",
    tagline: "Rejuvenate your eyes.",
    description:
      "A dough ring is formed around the eyes and filled with warm medicated ghee to soothe, remove impurities and strengthen ocular health. Beneficial for eye strain, dryness, redness and irritation.",
    helpfulFor: ["Eye strain", "Dryness", "Irritation"],
    category: "Targeted Therapies",
    image: "images/treatments/treatment_20.jpg",
    imageAlt: "Medicated ghee poured into dough rings around the eyes for Tarpanam",
    imageConfidence: "confident",
    featured: false,
  },
];

export const featuredTreatments = treatments.filter((t) => t.featured);

export const treatmentOptions = [
  ...treatments.map((t) => ({ value: t.id, label: t.name })),
  { value: "consultation", label: "Not sure, I need a consultation" },
];
