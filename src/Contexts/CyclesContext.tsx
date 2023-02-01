import { createContext, ReactNode, useState } from 'react'



interface CreateCycleData{
  task:any;
  minutesAmount:number;
}
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  cycleDate: Date
  interruptCycleDate?: Date
  finishedCycleDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeIdCycle: String | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  handleCreateNewCycle:(data:CreateCycleData)=>void
  handleInterruptCycle:()=>void
}
interface CyclesContextProviderProps{
children:ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CycleContext({children}:CyclesContextProviderProps) {
  const [cycleList, setCycleList] = useState<Cycle[]>([])
  const [activeIdCycle, setActiveIdCycle] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markCurrentCycleAsFinished() {
    setCycleList((state) =>
      state.map((cycle) => {
        if (cycle.id === activeIdCycle) {
          return { ...cycle, finishedCycleDate: new Date() }
        } else return cycle
      }),
    )
  }
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

  function handleCreateNewCycle(data: CreateCycleData) {
    console.log(data)
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      cycleDate: new Date(),
    }

    setCycleList((state) => [...state, newCycle])
    setActiveIdCycle(newCycle.id)
   // reset()
    setAmountSecondsPassed(0)
  }
  const activeCycle = cycleList.find((cycle) => cycle.id === activeIdCycle)
  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeIdCycle,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        handleInterruptCycle,
        handleCreateNewCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
