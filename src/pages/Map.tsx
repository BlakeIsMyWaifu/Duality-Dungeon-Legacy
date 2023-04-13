import { Box, Button, Group, Stack, Title } from '@mantine/core'

import { useMapStore } from '~/state/mapStore'

const Map = () => {

	const act = useMapStore(state => state.act)
	const nodes = useMapStore(state => state.nodes)

	const openNode = useMapStore(state => state.openNode)
	const completeNode = useMapStore(state => state.completeNode)

	return (
		<Box style={{
			height: '100vh'
		}}>
			<Stack align='center'>
				<Title p='xl'>Act - {act}</Title>
				<Group position='center' spacing={64}>
					{
						Object.entries(nodes).map(([tier, nodes]) => {
							return <Stack key={tier}>
								{
									Object.values(nodes).map(node => {
										return <Box
											key={node.id}
											sx={theme => ({
												height: '96px',
												aspectRatio: '1 / 1',
												border: `${theme.colors.gray[2]} solid 2px`,
												margin: '8px',
												padding: '8px',
												boxSizing: 'content-box'
											})}
											onClick={() => {
												if (node.status !== 'available') return
												openNode(+tier, node.id)
											}}
										>
											{node.id}
											{node.status}
										</Box>
									})
								}
							</Stack>
						})
					}
				</Group>
				<Button onClick={completeNode}>Complete Node</Button>
			</Stack>
		</Box>
	)
}

export default Map