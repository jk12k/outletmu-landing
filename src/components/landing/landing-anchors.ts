export const landingSectionIds = {
  pricing: "harga",
  freeTrial: "coba-gratis",
} as const;

export const landingSectionLinks = {
  pricing: `#${landingSectionIds.pricing}`,
  freeTrial: `#${landingSectionIds.freeTrial}`,
  freeTrialFromRoot: `/#${landingSectionIds.freeTrial}`,
} as const;
