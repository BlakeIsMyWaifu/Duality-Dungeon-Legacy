import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type Slice } from './stateHelpers'

interface SaveState {
	active: boolean;
	deck: string[];
	top: CharacterState;
	bottom: CharacterState;
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
	deck: [],
	top: {
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
	bottom: {
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

}

const saveAction: Slice<SaveStore, SaveAction> = (_set, _get) => ({

})

type SaveStore = SaveState & SaveAction

export const useSaveStore = create<SaveState>()(persist((...a) => ({
	...saveState,
	...saveAction(...a)
}), {
	name: 'save'
}))