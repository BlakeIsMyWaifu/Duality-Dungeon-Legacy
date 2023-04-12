import { type StateCreator } from 'zustand'

type ZustandPersist = ['zustand/persist', unknown]

export type Slice<T extends object, K extends object> = StateCreator<T, [ZustandPersist], [], K>