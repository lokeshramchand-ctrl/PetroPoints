import './App.css'
import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../Components/Dashboard/dash'
import LoginScreen from '../Components/LoginScreen/login'
import ModernDashboard from '../Components/Modern/dashboard'
import ModernLogin from '../Components/Modern/login'

type AppRoute = {
  path: string
  element: ReactElement
}

const appRoutes: AppRoute[] = [
  { path: '/login', element: <LoginScreen /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/modern/login', element: <ModernLogin /> },
  { path: '/modern/dashboard', element: <ModernDashboard /> },
]

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      {appRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    
  )
}

export default App
