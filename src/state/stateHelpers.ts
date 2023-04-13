import { type StateCreator, type StoreMutators } from 'zustand'

type Persist = ['zustand/persist', unknown]

type Devtools = ['zustand/devtools', never]

export type Slice<
	TStore extends object,
	TSlice extends object,
	TMiddleware extends [keyof StoreMutators<unknown, unknown>, unknown][] = [Persist, Devtools]
> = StateCreator<TStore, TMiddleware, [], TSlice>

export const createActionName = (storeName: string) => (actionName: string): [false, string] => [false, `${storeName}/${actionName}`]