import { Cycle, cycleProps } from "./Reducer"

export enum ActionTypes{
    Interromper_ciclo= 'Interromper_ciclo',
    Iniciar_ciclo= 'Iniciar_ciclo',
    marcar_ciclo= 'marcar_ciclo',
}

interface activeIdCycleProps{
    activeIdCycle: String | null
}

export function markCurrentCycleAsFinishedAction(){
    return{
        type:'marcar_ciclo',
      
    }
}
export function handleInterruptCycleAction(){
    return{
    
        type:"Interromper_ciclo",
        
      }

    
}
export function handleCreateNewCycleAction(newCycle:Cycle){
    return{
        type:"Iniciar_ciclo",
        payload:{
        newCycle
      }
    }
}