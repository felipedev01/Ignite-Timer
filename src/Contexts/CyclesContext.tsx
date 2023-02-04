import { createContext, ReactNode, useReducer, useState } from 'react'
import { any } from 'zod';
import { Cycle, Reducers } from '../Reducers/Cycles';



interface CreateCycleData{
  task:any;
  minutesAmount:number;
}


interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeIdCycle: String | null
  amountSecondsPassed: number
  cycleList:Cycle[]

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
  const [cycleState, dispatch] = useReducer(Reducers,{
    cycleList:[],
    activeIdCycle:null
  })

 

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const {cycleList, activeIdCycle}= cycleState

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }
  function markCurrentCycleAsFinished() {

    dispatch({
      type:'marcar_ciclo',
      payload:{
      activeIdCycle
      }
    })
    /*setCycleList((state) =>
      state.map((cycle) => {
        if (cycle.id === activeIdCycle) {
          return { ...cycle, finishedCycleDate: new Date() }
        } else return cycle
      }),
    )*/
  }
  function handleInterruptCycle() {

    dispatch({
      type:"Interromper_ciclo",
      payload:{
        activeIdCycle
      }
    })
    
  }

  function handleCreateNewCycle(data: CreateCycleData) {
    console.log(data)
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      cycleDate: new Date(),
    }

    dispatch({
      type:"Iniciar_ciclo",
      payload:{
        newCycle
      }
    })

    //setCycleList((state) => [...state, newCycle])
   // setActiveIdCycle(newCycle.id)
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
        handleCreateNewCycle,
        cycleList
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
