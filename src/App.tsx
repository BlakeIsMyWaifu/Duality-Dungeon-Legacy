import { Center, MantineProvider, Text } from '@mantine/core'

const App = () => {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: 'dark'
			}}
		>
			<Center>
				<Text>Hello World</Text>
			</Center>
		</MantineProvider>
	)
}

export default App
