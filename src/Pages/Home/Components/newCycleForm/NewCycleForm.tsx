import { useContext } from 'react'
import {useFormContext} from 'react-hook-form'

import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { CyclesContext } from '../../../../Contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
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
  )
}
