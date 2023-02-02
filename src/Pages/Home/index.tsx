import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'
import{CyclesContext} from '../../Contexts/CyclesContext'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { FormProvider, useForm } from 'react-hook-form'
import {
  StartCountDownButton,
  StopCountDownButton,
  HomeContainer,
} from './styles'
import { CountDown } from './Components/CountDown'
import { NewCycleForm } from './Components/newCycleForm/index'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const{handleCreateNewCycle,handleInterruptCycle,activeCycle}=useContext(CyclesContext)
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  

  function createNewCycle(data:newCycleFormData){
    handleCreateNewCycle(data)
    reset()
  }
  

  

  console.log(activeCycle)
  const task = watch('task')
  const isSubmitDisabled = !task


  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm></NewCycleForm>
        </FormProvider>

        <CountDown></CountDown>

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
