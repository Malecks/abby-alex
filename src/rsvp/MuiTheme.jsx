import { extendTheme } from '@mui/joy/styles';

// --color-sage10: #B2C29E;
// --color-sage50: #8A9A77;
// --color-sage65: #647056;
// --color-sage80: #444E39;
// --color-cream: #F4F2E9;
// --color-grey10: #f5f5f5;
// --color-grey40: #7A878C;
// --color-text-placeholder: #aeb0ab;
// --color-text: #20260C;

export const rsvpTheme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            solidBg: '#8A9A77',
            solidHoverBg: '#647056',
            solidActiveBg: '#444E39',
            softColor: '#B2C29E',
            softBg: '#f5f5f5',
            softHoverBg: 'rgba(208, 235, 255, 0.65)',
            softActiveBg: undefined,
            outlinedColor: '#8A9A77',
            outlinedBorder: '#8A9A77',
            outlinedHoverBg: 'rgba(231, 245, 255, 0.35)',
            outlinedHoverBorder: '#444E39',
            outlinedActiveBg: '#444E39',
          },
        },
      },
    },
    fontFamily: {
      body: 'Noto Serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    },
    focus: {
      default: {
        outlineWidth: '2px',
        outlineOffset: '2px',
        outlineColor: '#339af0',
      },
    },
    components: {
      JoyButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            transition: 'all 200ms ease-in-out',
            borderRadius: '8px',
            fontWeight: 400,
            ...(ownerState.size === 'md' && {
              minHeight: '50px',
              fontSize: '20px',
              padding: '18px 24px',
            }),
            '&:hover': {
                boxShadow: '0px 4px 20px rgba(0, 15, 0, 0.10)',
            },
            '&:active': {
              transform: 'translateY(1px)',
            },
          }),
        },
      },
      JoyRadioGroup: {
        styleOverrides: {
            root: () => ({
                gap: '12px',
            })
        },
      },
      JoyFormControl: {
        styleOverrides: {
            root: () => ({
                display: 'flex',
                flexDirection: 'row',
                gap: '12px',
                padding: '20px 16px',
                borderRadius: '8px',
                boxShadow: '0px 4px 20px rgba(0, 15, 0, 0.03)',
                '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 15, 0, 0.10)',
                },
                '&:active': {
                    transform: 'translateY(1px)',
                    backgroundColor: '#f8f8f8'
                },
                transition: 'all 200ms ease-in-out',
            })
        }
      }
    },
  })