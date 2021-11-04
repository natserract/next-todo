import jss from 'jss'
import camelCase from 'jss-plugin-camel-case'

jss.use(camelCase())

// https://material-ui.com/customization/default-theme/

/* Global */

const global = {
  // Width of permanent drawer
  drawerWidth: '240px',
  // Display permanent drawer for this and up
  drawerBreakpoint: 'lg',
  // Hide certain information in app bar for this and down
  appBarBreakpoint: 'xs',
  // max content width when monitor is very big
  maxContentWidth: '1160px',
  headerHeight: '64px',
}

/* Colors */

const colors = {
  primary: '#16ABF8',
  secondary: '#ff78a7',
  green: '#5cc2ab',
  black: '#000000',
  grey: '#eee',
  white: '#ffffff',
  textPrimary: '#666',
  textDisabled: '#acacac',
  // red: '#d50000',
  red: '#ED4C5C',
  transparent: 'rgba(0, 0, 0, 0)',
}

const palette = {
  common: colors,
  primary: {
    main: colors.primary,
    contrastText: colors.white,
  },
  secondary: {
    main: colors.secondary,
    contrastText: colors.white,
  },
  error: {
    main: colors.red,
    contrastText: colors.white,
  },
  text: {
    primary: colors.textPrimary,
  },
  background: {
    default: colors.white,
  },
}

const typography = {
  fontFamily: 'Avenir',
  htmlFontSize: 16,
  fontSize: 16,
  color: 'textPrimary',
  a: {
    fontFamily: 'Avenir',
  },
  h1: {
    fontFamily: 'Avenir',
  },
  h2: {
    fontFamily: 'Avenir',
  },
  h3: {
    fontFamily: 'Avenir',
  },
  h4: {
    fontFamily: 'Avenir',
  },
  h5: {
    fontFamily: 'Avenir',
  },
  h6: {
    fontFamily: 'Avenir',
  },
  h7: {
    fontFamily: 'Avenir',
  },
}

const overrides = {
  MuiAppBar: {
    colorPrimary: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
  },

  MuiDrawer: {
    paperAnchorDockedLeft: {
      borderRight: '0',
    },
  },

  MuiOutlinedInput: {
    root: {
      backgroundColor: colors.transparent,
      '& $notchedOutline': {
        border: 0,
      },
    },
    input: {
      fontSize: '1rem',
      padding: '0.5rem',
    },
  },

  MuiFormControlLabel: {
    root: {
      marginRight: 0,
    },
  },

  MuiLink: {
    root: {
      fontFamily: 'Avenir',
    },
  },

  MuiButton: {
    root: {
      width: '110px',
      borderRadius: '30px',
      height: '40px',
    },
  },
}
const theme = {
  global,
  colors,
  palette,
  typography,
  overrides,
} as const

export default theme