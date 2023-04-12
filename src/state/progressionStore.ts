import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type Slice } from './stateHelpers'

interface ProgressionState {

}

const progressionState: ProgressionState = {

}

interface ProgressionAction {

}

const progressionAction: Slice<ProgressionStore, ProgressionAction> = (_set, _get) => ({

})

type ProgressionStore = ProgressionState & ProgressionAction

export const useProgressionStore = create<ProgressionStore>()(persist((...a) => ({
	...progressionState,
	...progressionAction(...a)
}), {
	name: 'progression'
}))