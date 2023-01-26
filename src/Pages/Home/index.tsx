import { Play } from 'phosphor-react'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { useForm } from 'react-hook-form'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartcountDownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })
  interface Cycle {
    id: string
    task: string
    minutesAmount: number
  }

  const [cycleList, setCycleList] = useState<Cycle[]>([])
  const [activeIdCycle, setActiveIdCycle] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data)
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycleList((state) => [...state, newCycle])
    setActiveIdCycle(newCycle.id)
    reset()
  }
  const activeCycle = cycleList.find((cycle) => cycle.id === activeIdCycle)
  console.log(cycleList)
  console.log(activeCycle)
  const task = watch('task')
  const isSubmitDisabled = !task

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const totalCurrentSeconds = activeCycle
    ? totalSeconds - amountSecondsPassed
    : 0

  const currentMinutes = Math.floor(totalCurrentSeconds / 60)
  const currentSeconds = totalCurrentSeconds % 60

  console.log(currentMinutes)
  console.log(currentSeconds)
  const minutes = String(currentMinutes).padStart(2, '0')
  const seconds = String(currentSeconds).padStart(2, '0')
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="taskSuggestions"
            placeholder="Vou trabalhar em"
            {...register('task')}
          />
          <datalist id="taskSuggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
            <option value="Projeto 4"></option>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            step={5}
            max={60}
            min={0}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartcountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartcountDownButton>
      </form>
    </HomeContainer>
  )
}
