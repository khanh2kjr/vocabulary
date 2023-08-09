import { createTheme } from '@mui/material/styles'

const themeColors = {
  color: {
    blue: {
      primary: '#205DCE',
    },
  },
}

const themeOptions = {
  ...themeColors,
  // palette: {
  //   primary: {
  //     main: themeColors.color.blue.primary,
  //   },
  // },
  typography: {
    fontSize: 14,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {},
      },
    },
  },
}

export const theme = createTheme({ ...themeColors, ...themeOptions })
