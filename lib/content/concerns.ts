export const concerns = [
  "Back and joint pain",
  "Stress and sleep",
  "Skin and beauty",
  "Weight management",
  "Pregnancy care",
  "Stroke recovery",
  "Senior care",
  "Eye care",
  "Not sure",
] as const;

export type Concern = (typeof concerns)[number];
