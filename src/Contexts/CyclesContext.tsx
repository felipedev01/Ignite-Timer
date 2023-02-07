import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { Cycle, Reducers } from '../Reducers/Cycles/Reducer'
import {
  handleCreateNewCycleAction,
  handleInterruptCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../Reducers/Cycles/Action'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: any
  minutesAmount: number
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeIdCycle: String | null
  amountSecondsPassed: number
  cycleList: Cycle[]

  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  handleCreateNewCycle: (data: CreateCycleData) => void
  handleInterruptCycle: () => void
}
interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CycleContext({ children }: CyclesContextProviderProps) {
  const [cycleState, dispatch] = useReducer(
    Reducers,
    {
      cycleList: [],
      activeIdCycle: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )
      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }
    },
  )

  const { cycleList, activeIdCycle } = cycleState
  const activeCycle = cycleList.find((cycle) => cycle.id === activeIdCycle)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.cycleDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cycleState])

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }
  /* setCycleList((state) =>
      state.map((cycle) => {
        if (cycle.id === activeIdCycle) {
          return { ...cycle, finishedCycleDate: new Date() }
        } else return cycle
      }),
    ) */

  function handleInterruptCycle() {
    dispatch(handleInterruptCycleAction())
  }

  function handleCreateNewCycle(data: CreateCycleData) {
    console.log(data)
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      cycleDate: new Date(),
    }

    dispatch(handleCreateNewCycleAction(newCycle))

    // setCycleList((state) => [...state, newCycle])
    // setActiveIdCycle(newCycle.id)
    setAmountSecondsPassed(0)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeIdCycle,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        handleInterruptCycle,
        handleCreateNewCycle,
        cycleList,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
