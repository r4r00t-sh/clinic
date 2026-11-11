export type Speciality = {
  id: string;
  anchor: string;
  title: string;
  short: string;
  body: string;
  homeImage: string;
  pageImage: string;
};

export const specialities: Speciality[] = [
  {
    id: "therapies",
    anchor: "Therapies",
    title: "Ayurvedic Therapies",
    short: "Time-honoured therapies tailored to your constitution.",
    body: "Authentic Ayurvedic therapies that combine traditional techniques with personalised care. From oil massages to specialised treatments, each session is designed around your body type and wellness goals.",
    homeImage: "images/product/product-img-01.png",
    pageImage: "images/product/product-img-01.png",
  },
  {
    id: "beauty",
    anchor: "Beauty",
    title: "Beauty & Skin",
    short: "Natural radiance from within.",
    body: "Ayurveda believes true beauty comes from within. Time-tested treatments address acne, pigmentation and premature ageing while enhancing natural radiance. Herbal oils, natural scrubs and rejuvenating facials cleanse, nourish and revitalise. By balancing the doshas and detoxifying the body, we aim for long-lasting, healthy, glowing skin.",
    homeImage: "images/product/product-img-02.png",
    pageImage: "images/specialities/beauty-and-skin.jpg",
  },
  {
    id: "pre",
    anchor: "Pre",
    title: "Pre & Post Natal Care",
    short: "Gentle support through pregnancy and recovery.",
    body: "Comprehensive care for mothers during pregnancy and after childbirth. Pre-natal therapies promote relaxation and reduce stress. Post-natal care emphasises recovery, lactation support and restoring balance with tailored massages, herbal supplements and dietary guidance.",
    homeImage: "images/product/product-img-03.jpg",
    pageImage: "images/specialities/pre-and-post-natal-care.jpg",
  },
  {
    id: "stroke",
    anchor: "Stroke",
    title: "Stroke Rehabilitation",
    short: "Natural support for neurological recovery.",
    body: "A natural approach to recovery focused on improving mobility, reducing pain and supporting neurological function through abhyanga, panchakarma and shirodhara, combined with herbal remedies and customised exercises.",
    homeImage: "images/product/product-img-04.jpg",
    pageImage: "images/specialities/stroke-rehabilitation.jpg",
  },
  {
    id: "senior",
    anchor: "Senior",
    title: "Senior Care",
    short: "Comfort, mobility and vitality for later years.",
    body: "Gentle support for joint pain, reduced mobility, digestive disorders and fatigue through personalised herbal massages, rejuvenation therapies and dietary recommendations, enhancing vitality and mental clarity.",
    homeImage: "images/specialities/senior-care.jpg",
    pageImage: "images/specialities/senior-care.jpg",
  },
  {
    id: "weight",
    anchor: "Weight",
    title: "Weight Loss",
    short: "Sustainable balance of metabolism and toxins.",
    body: "Balancing metabolism (agni) and eliminating toxins (ama) for sustainable results. Detoxifying treatments such as udvartana, dietary guidance and personalised exercise plans address root causes such as dosha imbalance.",
    homeImage: "images/specialities/weight-loss.jpg",
    pageImage: "images/specialities/weight-loss.jpg",
  },
];

