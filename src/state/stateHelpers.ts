import { type StateCreator, type StoreMutators } from 'zustand'

type Persist = ['zustand/persist', unknown]

type Devtools = ['zustand/devtools', never]

export type Slice<
	Store extends object,
	Slice extends object,
	Middleware extends [keyof StoreMutators<unknown, unknown>, unknown][] = [Persist, Devtools]
> = StateCreator<Store, Middleware, [], Slice>

export const createActionName = (storeName: string) => (actionName: string): [false, string] => [false, `${storeName}/${actionName}`]