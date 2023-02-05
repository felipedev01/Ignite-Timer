import { ActionTypes } from './Action'
import { produce } from 'immer'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  cycleDate: Date
  interruptCycleDate?: Date
  finishedCycleDate?: Date
}
export interface cycleProps {
  cycleList: Cycle[]
  activeIdCycle: String | null
}

export function Reducers(state: cycleProps, action: any) {
  switch (action.type) {
    case ActionTypes.Iniciar_ciclo:
      /* return {
        ...state,
        cycleList: [...state.cycleList, action.payload.newCycle],
        activeIdCycle: action.payload.newCycle.id,
      } */

      return produce(state, (draft) => {
        draft.cycleList.push(action.payload.newCycle)
        draft.activeIdCycle = action.payload.newCycle.id
      })
    case ActionTypes.Interromper_ciclo: {
      const currentCycleIndex = state.cycleList.findIndex((cycle) => {
        return cycle.id === state.activeIdCycle
      })
      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeIdCycle = null
        draft.cycleList[currentCycleIndex].interruptCycleDate = new Date()
      })
    }
    case ActionTypes.marcar_ciclo: {
      const currentCycleIndex = state.cycleList.findIndex((cycle) => {
        return cycle.id === state.activeIdCycle
      })
      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        draft.activeIdCycle = null
        draft.cycleList[currentCycleIndex].finishedCycleDate = new Date()
      })
    }

    default:
      return state
  }
}
