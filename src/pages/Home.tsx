import { Button, Center, Stack, Title } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'

import { useSaveStore } from '~/state/saveStore'

const Home = () => {

	const navigate = useNavigate()

	const active = useSaveStore(state => state.active)
	const newGame = useSaveStore(state => state.newGame)

	return (
		<Center style={{
			height: '100vh'
		}}>
			<Stack>

				<Title>Duality Dungeon</Title>

				<Button disabled={!active}>
					Continue
				</Button>

				<Button onClick={() => {
					navigate('/combat')
					newGame()
				}}>
					New Game
				</Button>

				<Button
					component={Link}
					to='/statistics'
				>
					Statistics
				</Button>

			</Stack>
		</Center>
	)
}

export default Home