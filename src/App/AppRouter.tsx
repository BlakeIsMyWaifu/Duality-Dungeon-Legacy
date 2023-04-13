import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('~/pages/Home'))
const Map = lazy(() => import('~/pages/Map'))
const Combat = lazy(() => import('~/pages/Combat'))
const Statistics = lazy(() => import('~/pages/Statistics'))

const AppRouter = () => {
	return (
		<Suspense>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/map' element={<Map />} />
				<Route path='/combat' element={<Combat />} />
				<Route path='/statistics' element={<Statistics />} />
			</Routes>
		</Suspense>
	)
}

export default AppRouter