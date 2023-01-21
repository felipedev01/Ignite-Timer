import { Header } from '../Components/Header'
import { Outlet } from 'react-router-dom'

export function LayoutDefault() {
  return (
    <div>
      <Header />

      <Outlet></Outlet>
    </div>
  )
}
