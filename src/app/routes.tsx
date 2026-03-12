import type { ReactElement } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import FeaturePlaceholder from '../pages/FeaturePlaceholder'
import DashboardPage from '../pages/Dashboard'
import LoginPage from '../pages/Login'
import CustomerList from '../pages/CustomerList'

type AppRoute = {
	path: string
	element: ReactElement
}

const appRoutes: AppRoute[] = [
	{ path: '/login', element: <LoginPage /> },
	{ path: '/dashboard', element: <DashboardPage /> },
	{ path: '/customers', element: <CustomerList /> },
	{
		path: '/award-points',
		element: <FeaturePlaceholder title="Award Points" description="Award points workflows and customer reward actions will be managed here." />,
	},
	{
		path: '/redeem-points',
		element: <FeaturePlaceholder title="Redeem Points" description="Redemption requests, approvals, and redemptions history will appear here." />,
	},
	{
		path: '/settings',
		element: <FeaturePlaceholder title="Settings" description="Application settings, profile preferences, and configuration options will live here." />,
	},
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
