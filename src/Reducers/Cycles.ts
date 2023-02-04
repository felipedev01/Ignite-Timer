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

  export enum ActionTypes{
    Interromper_ciclo= 'Interromper_ciclo',
    Iniciar_ciclo= 'Iniciar_ciclo',
    marcar_ciclo= 'marcar_ciclo',
}
  

export function Reducers(state:cycleProps, action:any){

    switch(action.type){
      case ActionTypes.Iniciar_ciclo:
        return {...state,
          cycleList:[...state.cycleList, action.payload.newCycle],
          activeIdCycle:action.payload.newCycle.id,
        }
      case ActionTypes.Interromper_ciclo:
        return{
          ...state,
          cycleList:state.cycleList.map((cycle) => {
            if (cycle.id === state.activeIdCycle) {
              return { ...cycle, interruptCycleDate: new Date() }
            } else return cycle
          }),
          activeIdCycle:null
        }
      case ActionTypes.marcar_ciclo:
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