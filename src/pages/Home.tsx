import { Text } from '@mantine/core'
import { Link } from 'react-router-dom'

const Home = () => {
	return (
		<Text component={Link} to='/combat'>
			Home
		</Text>
	)
}

export default Home