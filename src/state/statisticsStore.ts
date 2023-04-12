import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { type Slice } from './stateHelpers'

interface StatisticsState {

}

const statisticsState: StatisticsState = {

}

interface StatisticsAction {

}

const statisticsAction: Slice<StatisticsStore, StatisticsAction> = (_set, _get) => ({

})

type StatisticsStore = StatisticsState & StatisticsAction

export const useStatisticsStore = create<StatisticsStore>()(persist(devtools((...a) => ({
	...statisticsState,
	...statisticsAction(...a)
}), {
	// Devtools settings
	name: 'statistics'
}), {
	// Persist Settings
	name: 'statistics'
}))