import { useContext, useEffect } from 'react'

import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../Contexts/CyclesContext'

import { CountdownContainer, Separator } from './styles'

export function CountDown() {
  const {
    activeCycle,
    activeIdCycle,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.cycleDate),
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          clearInterval(interval)
          setSecondsPassed(totalSeconds)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [
    activeCycle,
    totalSeconds,
    activeIdCycle,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

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
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])
  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
