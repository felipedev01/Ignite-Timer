import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyled } from './styles/global'
import { Router } from './Router'
import { CycleContext } from './Contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContext>
          <Router></Router>
        </CycleContext>

        <GlobalStyled />
      </BrowserRouter>
    </ThemeProvider>
  )
}
