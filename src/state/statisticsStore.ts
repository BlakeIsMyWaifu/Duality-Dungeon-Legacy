import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export const useStatisticsStore = create<StatisticsStore>()(persist((...a) => ({
	...statisticsState,
	...statisticsAction(...a)
}), {
	name: 'statistics'
}))