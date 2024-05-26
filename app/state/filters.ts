import { atom } from 'jotai'
import type { ToneFilters, BrightnessFilters, SchemeFilters } from '@/types/filters'

export const ToneFilterState = atom<ToneFilters>('calm')
export const BrightnessFilterState = atom<BrightnessFilters>('light')
export const SchemeFilterState = atom<SchemeFilters>('analogous')
