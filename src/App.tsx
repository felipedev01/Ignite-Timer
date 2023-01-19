import {Button} from './Components/Button'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyled } from './styles/global'

export function App() {
  

  return (
    <ThemeProvider theme={defaultTheme}>

    <Button variant="primary"/>
    <Button variant="danger"/>
    <Button variant="secondary"/>
    <Button variant="success"/>
    <Button/>

   <GlobalStyled/>

   </ThemeProvider>
  )
}


