import React from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import MainPage from './pages/MainPage'
import './App.scss'
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#27799c',
      dark: '#18475c',
      contrastText: '#fff',
    },
    secondary: {
      light: '##e06852',
      main: '#f44336',
      dark: '##a04b3b',
      contrastText: '#000',
    },
  },
})

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <header></header>
          <MainPage></MainPage>
          <footer></footer>
        </div>
      </MuiThemeProvider>
    )
  }
}
