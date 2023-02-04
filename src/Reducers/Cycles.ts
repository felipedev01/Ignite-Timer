export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    cycleDate: Date
    interruptCycleDate?: Date
    finishedCycleDate?: Date
  }
interface cycleProps{
    cycleList:Cycle[]
    activeIdCycle:String | null
  }

export function Reducers(state:cycleProps, action:any){

    switch(action.type){
      case 'Iniciar_ciclo':
        return {...state,
          cycleList:[...state.cycleList, action.payload.newCycle],
          activeIdCycle:action.payload.newCycle.id,
        }
      case 'Interromper_ciclo':
        return{
          ...state,
          cycleList:state.cycleList.map((cycle) => {
            if (cycle.id === state.activeIdCycle) {
              return { ...cycle, interruptCycleDate: new Date() }
            } else return cycle
          }),
          activeIdCycle:null
        }
      case 'marcar_ciclo':
        return{
          ...state,
          cycleList:state.cycleList.map((cycle) => {
            if (cycle.id ===state.activeIdCycle) {
              return { ...cycle, finishedCycleDate: new Date() }
            } else return cycle
          }),
          activeIdCycle:null
          
        }
      default: return state
    

   
  
    }
}