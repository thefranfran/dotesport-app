export const spacing = {
  xs: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
} as const;

export const margins = {
  xs: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
} as const;

export const radius = {
  xs: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 24,
} as const;

export type Spacing = keyof typeof spacing;
