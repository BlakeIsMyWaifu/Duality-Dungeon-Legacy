import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { type Slice } from './stateHelpers'

interface CombatState {

}

const combatState: CombatState = {

}

interface CombatAction {

}

const combatAction: Slice<CombatStore, CombatAction> = (_set, _get) => ({

})

type CombatStore = CombatState & CombatAction

export const useCombatStore = create<CombatStore>()(persist((...a) => ({
	...combatState,
	...combatAction(...a)
}), {
	name: 'combat'
}))