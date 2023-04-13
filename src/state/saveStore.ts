import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type MapNodeType, useMapStore } from './mapStore'
import { createActionName, type Slice } from './stateHelpers'

interface SaveState {
	active: boolean;
	gameStatus: 'map' | MapNodeType;
	deck: string[];
	topCharacter: CharacterState;
	bottomCharacter: CharacterState;
}

interface CharacterState {
	/** Readonly */
	characterInfo: RaphaelInfo | AzraelInfo;
	health: NumberStat;
	mood: Mood;
}

interface RaphaelInfo {
	name: 'raphael';
	type: 'holy';
}

interface AzraelInfo {
	name: 'azrael';
	type: 'demonic';
}

interface NumberStat {
	current: number;
	max: number;
}

interface Mood extends NumberStat {
	thresholds: [number, number];
}

const saveState: SaveState = {
	active: false,
	gameStatus: 'map',
	deck: [],
	topCharacter: {
		characterInfo: {
			name: 'raphael',
			type: 'holy'
		},
		health: {
			current: 50,
			max: 50
		},
		mood: {
			current: 10,
			max: 100,
			thresholds: [60, 80]
		}
	},
	bottomCharacter: {
		characterInfo: {
			name: 'azrael',
			type: 'demonic'
		},
		health: {
			current: 75,
			max: 75
		},
		mood: {
			current: 10,
			max: 100,
			thresholds: [60, 80]
		}
	}
}

interface SaveAction {
	newGame: () => void;
}

const actionName = createActionName('save')

const saveAction: Slice<SaveStore, SaveAction> = (set, _get) => ({
	newGame: () => {
		set({
			...saveState,
			active: true
		}, ...actionName('newGame'))

		useMapStore.getState().generateNodes()
	}
})

type SaveStore = SaveState & SaveAction

export const useSaveStore = create<SaveStore>()(persist(devtools((...a) => ({
	...saveState,
	...saveAction(...a)
}), {
	// Devtools settings
	name: 'save'
}), {
	// Persist settings
	name: 'save'
}))