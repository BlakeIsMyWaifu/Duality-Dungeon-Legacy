import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('~/pages/Home'))
const Game = lazy(() => import('~/pages/Combat'))

const AppRouter = () => {
	return (
		<Suspense>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/combat' element={<Game />} />
			</Routes>
		</Suspense>
	)
}

export default AppRouter