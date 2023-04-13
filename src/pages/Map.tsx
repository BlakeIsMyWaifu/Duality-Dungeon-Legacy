import { Box, Button, Group, Stack, Title } from '@mantine/core'
import { Fragment, useRef, useState } from 'react'
import { StraightLine } from 'react-drawline'

import useMountEffect from '~/hooks/useMountEffect'
import { type NodeStatus, useMapStore } from '~/state/mapStore'

const lineColours: Record<NodeStatus, string> = {
	available: 'gray',
	locked: 'red',
	completed: 'white',
	active: 'gray'
}

const Map = () => {

	const act = useMapStore(state => state.act)
	const nodes = useMapStore(state => state.nodes)

	const openNode = useMapStore(state => state.openNode)
	const completeNode = useMapStore(state => state.completeNode)

	const nodeRefs = useRef<(HTMLDivElement | null)[]>([])

	/**
	 * Scuffed way to rerender after refs have been reassigned.
	 * This is needed for the lines between nodes to be rendered
	 */
	const [, setForce] = useState(0)
	useMountEffect(() => {
		setForce(1)
	})

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
										return (
											<Fragment key={node.id}>
												<Box
													ref={ref => {
														nodeRefs.current[node.id] = ref
													}}
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
												{
													nodeRefs.current[0] && Object.values(node.childrenId).flat().map((childId, i) => {
														return <StraightLine
															key={i}
															startingElement={{
																ref: { current: nodeRefs.current[node.id] },
																x: 'right',
																y: 'mid'
															}}
															endingElement={{
																ref: { current: nodeRefs.current[childId] },
																x: 'left',
																y: 'mid'
															}}
															style={{
																backgroundColor: lineColours[node.status]
															}}
														/>
													})
												}
											</Fragment>
										)
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