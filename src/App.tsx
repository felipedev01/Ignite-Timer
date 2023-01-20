import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyled } from './styles/global'
import { Router } from './Components/Router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router></Router>
        <GlobalStyled />
      </BrowserRouter>
    </ThemeProvider>
  )
}
