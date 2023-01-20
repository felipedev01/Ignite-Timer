import { Routes, Route } from 'react-router-dom'
import { History } from '../Pages/History'
import { Home } from '../Pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>

      <Route path="/History" element={<History />}></Route>

      <Route></Route>
    </Routes>
  )
}
