import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import { useForm } from 'react-hook-form'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountDownButton,
  StopCountDownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60),
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
    cycleDate: Date
    interruptCycleDate?: Date
    finishedCycleDate?: Date
  }

  const [cycleList, setCycleList] = useState<Cycle[]>([])
  const [activeIdCycle, setActiveIdCycle] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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
  const activeCycle = cycleList.find((cycle) => cycle.id === activeIdCycle)

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
  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.cycleDate,
        )
        if (secondsDifference >= totalSeconds) {
          setCycleList((state) =>
            state.map((cycle) => {
              if (cycle.id === activeIdCycle) {
                return { ...cycle, finishedCycleDate: new Date() }
              } else return cycle
            }),
          )
          clearInterval(interval)
          setAmountSecondsPassed(totalSeconds)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [activeCycle, totalSeconds, activeIdCycle])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  console.log(cycleList)
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="taskSuggestions"
            placeholder="Vou trabalhar em"
            disabled={!!activeCycle}
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
            step={1}
            max={60}
            min={0}
            disabled={!!activeCycle}
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
