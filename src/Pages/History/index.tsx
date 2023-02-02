import { useContext } from 'react'
import { CyclesContext } from '../../Contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {

  const {cycleList} =useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            
              {
                cycleList.map(cycle=>{

                  return(
                    <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount}</td>
                     <td>{cycle.cycleDate.toISOString()}</td>
                     <td>
                      {cycle.finishedCycleDate && (<Status colors="green">Concluído</Status>)}
                      {cycle.interruptCycleDate &&(<Status colors="red">Interrompido</Status>)}
                      {!cycle.finishedCycleDate && !cycle.interruptCycleDate &&(<Status colors="yellow">Em andamento</Status>)}
                         
                       </td>
                    </tr>
                  )
                })
              }
              
            
            
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
