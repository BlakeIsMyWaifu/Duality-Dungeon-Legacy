import { MantineProvider } from '@mantine/core'
import { MemoryRouter } from 'react-router-dom'

import AppRouter from './AppRouter'

const App = () => {
	return (
		<MemoryRouter>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark'
				}}
			>
				<AppRouter />
			</MantineProvider>
		</MemoryRouter>
	)
}

export default App