import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/Dashboard'
import LoginPage from '../pages/Login'

type AppRoute = {
	path: string
	element: ReactElement
}

const appRoutes: AppRoute[] = [
	{ path: '/login', element: <LoginPage /> },
	{ path: '/dashboard', element: <DashboardPage /> },
]

export function AppRoutes() {
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
