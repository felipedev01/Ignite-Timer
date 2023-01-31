import { HandPalm, Play } from 'phosphor-react'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { FormProvider, useForm } from 'react-hook-form'
import {
  StartCountDownButton,
  StopCountDownButton,
  HomeContainer,
} from './styles'
import { CountDown } from './Components/CountDown'
import { NewCycleForm } from './Components/newCycleForm/NewCycleForm'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  

  function handleInterruptCycle() {
    setCycleList((state) =>
      state.map((cycle) => {
        if (cycle.id === activeIdCycle) {
          return { ...cycle, interruptCycleDate: new Date() }
        } else return cycle
      }),
    )
    setActiveIdCycle(null)
  }

  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data)
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      cycleDate: new Date(),
    }

    setCycleList((state) => [...state, newCycle])
    setActiveIdCycle(newCycle.id)
    reset()
    setAmountSecondsPassed(0)
  }
  

  

  console.log(activeCycle)
  const task = watch('task')
  const isSubmitDisabled = !task

  console.log(cycleList)
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
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
