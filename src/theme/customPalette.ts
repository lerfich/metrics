export const customPallete = {
  name: 'custom',
  palette: {
    background: {
      light: '#f6f8fa',
      lightBlue: '#236B90',
      dark: '#292929',
    },
    primary: {
      main: '#283E55',
      dark: '#162D46', // colorSchema.primary
      side: '#152D46', // colorSchema.sidebar
      light: '#295F7B', // colorSchema.secondary
      icon: '#0089FF', // colorSchema.accent2
    },
    secondary: {
      main: '#f50057',
      light: '#EF5C5C', // colorSchema.accent1
    },
    white: '#FFFFFF',
    muted: '#d2d2d2',
    border: '#E7E7E7',
    borderlight: '#DBDBDB',
    borderGrey: '#f4f4f4',
    text: { primary: '#212121', secondary: '#8B8B8B', light: '#9B9B9B' },
  },
  typography: {
    fontSize: 14,
    fontFamily: 'Barlow',
    subtitle1: {
      fontSize: '2rem',
      lineHeight: '4rem',
    },
    subtitle2: {
      fontSize: '1.8rem',
      lineHeight: '3.6rem',
      fontWeight: 500,
    },
    subtitle3: {
      fontSize: '1.6rem',
      lineHeight: '3.2rem',
      fontWeight: 600,
    },
    subtitle4: {
      fontSize: '1.2rem',
      lineHeight: '2.4rem',
      fontWeight: 600,
    },
    subtitle5: {
      fontSize: '1rem',
      lineHeight: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: '2rem',
    },
  },
  spacing: 8,
  layout: {
    shadow: '0 7px 21px 0 rgba(171, 171, 171, 0.17)',
    borderRadius: '8px',
  },
};

declare module '@material-ui/core/styles/createTypography' {
  type CustomVariant = 'subtitle3' | 'subtitle4' | 'subtitle5';

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Typography extends Record<CustomVariant, TypographyStyle> {}

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TypographyOptions extends Partial<Record<CustomVariant, TypographyStyleOptions>> {}
}
