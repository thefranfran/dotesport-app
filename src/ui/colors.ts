type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type Colors = {
  text: Color;
  background: Color;
  transparent: Color;
};

export const lightColors: Colors = {
  text: '#000000',
  background: '#ffffff',
  transparent: 'rgba(0, 0, 0, 0)',
} as const;

export const darkColors: Colors = {
  text: '#ffffff',
  background: '#000000',
  transparent: 'rgba(0, 0, 0, 0)',
} as const;
