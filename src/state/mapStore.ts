import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { createActionName, type Slice } from './stateHelpers'

interface MapState {
	act: number;
	currentNode: [nodeTier: number, nodeId: number] | null;
	lastCompletedNode: [nodeTier: number, nodeId: number] | null;
	/** Fist key is the tier, the value key is the node id */
	nodes: Record<number, Record<number, MapNode>>;
}

interface MapNode {
	id: number;
	tier: number;
	/** Key is the tier and the value is an array of ids */
	childrenId: Record<number, number[]>;
	status: NodeStatus;
	type: MapNodeType;
	data: unknown;
}

export type NodeStatus = 'available' | 'locked' | 'completed' | 'active';

interface CombatNode extends MapNode {
	type: 'combat';
	data: {
		monsters: string[];
	};
}

interface EventNode extends MapNode {
	type: 'event';
	data: unknown;
}

interface ShopNode extends MapNode {
	type: 'shop';
	data: {
		cards: Record<string, number>;
	};
}

export type MapNodeType = 'combat' | 'event' | 'shop';

const mapState: MapState = {
	act: 1,
	currentNode: null,
	lastCompletedNode: null,
	nodes: []
}

interface MapAction {
	/**
	 * Creates the whole map for the act.
	 * Only call at the start of a new game or start of a new act.
	 */
	generateNodes: () => void;

	/**
	 * Sets the given node as the current.
	 * If the node is tier0, locks the other tier0 nodes.
	 */
	openNode: (nodeTier: number, nodeId: number) => void;

	/**
	 * Marks the current node as complete and unlocks child nodes.
	 * Call after the node has fully finished.
	 */
	completeNode: () => void;

	/**
	 * Changes the given nodes status.
	 * Does not affect other nodes around it.
	 * For internal use only.
	 */
	changeNodeStatus: (nodeTier: number, nodeId: number, status: NodeStatus) => void;
}

const actionName = createActionName('map')

const mapAction: Slice<MapStore, MapAction> = (set, get) => ({
	generateNodes: () => {
		const combatNode = (id: number, tier: number, childrenId: Record<number, number[]>) => {
			const out: CombatNode = {
				id,
				tier,
				childrenId,
				status: tier === 0 ? 'available' : 'locked',
				type: 'combat',
				data: {
					monsters: ['one', 'two']
				}
			}
			return out
		}

		set({
			nodes: {
				0: {
					0: combatNode(0, 0, { 1: [3] }),
					1: combatNode(1, 0, { 1: [3] }),
					2: combatNode(2, 0, { 1: [4] })
				},
				1: {
					3: combatNode(3, 1, { 2: [5, 6] }),
					4: combatNode(4, 1, { 2: [6, 7] })
				},
				2: {
					5: combatNode(5, 2, []),
					6: combatNode(6, 2, []),
					7: combatNode(7, 2, [])
				}
			}
		}, ...actionName('generateNodes'))
	},
	openNode: (nodeTier, nodeId) => {
		if (nodeTier === 0) {
			const nodes = get().nodes[0]
			Object.values(nodes).forEach(node => {
				get().changeNodeStatus(0, node.id, node.id === nodeId ? 'active' : 'locked')
			})
		} else {
			get().changeNodeStatus(nodeTier, nodeId, 'active')
			const { lastCompletedNode } = get()
			if (!lastCompletedNode) return
			const { childrenId } = get().nodes[lastCompletedNode[0]][lastCompletedNode[1]]
			Object.entries(childrenId).forEach(([tier, ids]) => {
				ids.forEach(id => {
					if (id === nodeId) return
					get().changeNodeStatus(+tier, id, 'locked')
				})
			})
		}

		set({ currentNode: [nodeTier, nodeId] }, ...actionName('openNode'))
	},
	completeNode: () => {
		const [nodeTier, nodeId] = get().currentNode ?? [-1, -1]
		const node = get().nodes[nodeTier]?.[nodeId]
		if (!node) return

		get().changeNodeStatus(nodeTier, nodeId, 'completed')

		set({
			currentNode: null,
			lastCompletedNode: [nodeTier, nodeId]
		}, ...actionName('completeNode'))

		Object.entries(node.childrenId).forEach(([tier, ids]) => {
			ids.forEach(id => {
				get().changeNodeStatus(+tier, id, 'available')
			})
		})
	},
	changeNodeStatus: (nodeTier, nodeId, status) => {
		set(state => ({
			nodes: {
				...state.nodes,
				[nodeTier]: {
					...state.nodes[nodeTier],
					[nodeId]: {
						...state.nodes[nodeTier][nodeId],
						status
					}
				}
			}
		}), ...actionName('changeNodeStatus'))
	}
})

type MapStore = MapState & MapAction

export const useMapStore = create<MapStore>()(persist(devtools((...a) => ({
	...mapState,
	...mapAction(...a)
}), {
	// Devtools settings
	name: 'map'
}), {
	// Persist settings
	name: 'map'
}))