import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './DefaultLayouts'
import { History } from './Pages/History'
import { Home } from './Pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />}></Route>

        <Route path="/History" element={<History />}></Route>
      </Route>
    </Routes>
  )
}
