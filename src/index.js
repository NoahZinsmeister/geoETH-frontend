import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0971f5",
    },
    secondary: {
      main: "#2C90B8",
    },
    success: {
      light: green[300],
      main:  green[500],
      dark:  green[700]
    }
  },
  typography: {
    fontWeightLight: 200,
    fontWeightRegular: 200,
    fontWeightMedium: 300
  },
})

theme.palette.success.contrastText = theme.palette.getContrastText(green[700])

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
)
registerServiceWorker();
