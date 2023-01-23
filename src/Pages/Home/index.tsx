import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartcountDownButton,
  TaskInput,
} from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput id="task" placeholder="Vou trabalhar em" />
          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput type="number" id="minutesAmount" />
          <span>Minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartcountDownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartcountDownButton>
      </form>
    </HomeContainer>
  )
}
