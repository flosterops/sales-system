export enum BreakPoints {
  wideDesktop = 1920,
  lgDesktop = 1440,
  desktop = 1200,
  smallDesktop = 992,
  tablet = 768,
  phone = 480,
  smallPhone = 320,
}

interface Media {
  lessThan: (breakPoint: BreakPoints) => string;
  moreThan: (breakPoint: BreakPoints) => string;
}

export const media: Media = {
  lessThan: (breakPoint: BreakPoints): string => `@media(max-width: ${breakPoint}px)`,
  moreThan: (breakPoint: BreakPoints): string => `@media(min-width: ${breakPoint + 1}px)`,
};
