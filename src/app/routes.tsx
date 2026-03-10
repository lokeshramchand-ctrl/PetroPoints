import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/dashboard/DashboardPage'
import LoginPage from '../pages/login/LoginPage'
import ModernDashboardPage from '../pages/modern/ModernDashboardPage'
import ModernLoginPage from '../pages/modern/ModernLoginPage'

type AppRoute = {
	path: string
	element: ReactElement
}

const appRoutes: AppRoute[] = [
	{ path: '/login', element: <LoginPage /> },
	{ path: '/dashboard', element: <DashboardPage /> },
	{ path: '/modern/login', element: <ModernLoginPage /> },
	{ path: '/modern/dashboard', element: <ModernDashboardPage /> },
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
