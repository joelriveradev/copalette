'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ToneFilterState, BrightnessFilterState, SchemeFilterState } from '@/app/state/filters'
import { useAtom } from 'jotai'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem
} from '@/components/ui/select'

import { BrightnessFilters, SchemeFilters, ToneFilters } from '@/types/filters'
import { startTransition, useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  className?: string
}

const toneOptions = [
  { value: 'calm', label: 'Calm' },
  { value: 'energetic', label: 'Energetic' },
  { value: 'sophisticated', label: 'Sophisticated' },
  { value: 'playful', label: 'Playful' },
  { value: 'muted', label: 'Muted' },
  { value: 'bold', label: 'Bold' }
]

const brightnessOptions = [
  { value: 'light', label: 'Light' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'dim', label: 'Dim' },
  { value: 'dark', label: 'Dark' }
]

const schemeOptions = [
  { value: 'monochrome', label: 'Monochrome' },
  { value: 'analogous', label: 'Analogous' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'triadic', label: 'Triadic' },
  { value: 'tetradic', label: 'Tetradic' }
]

export function PaletteFilters({ className = '' }: Props) {
  const [toneFilter, setToneFilter] = useAtom(ToneFilterState)
  const [brightnessFilter, setBrightnessFilter] = useAtom(BrightnessFilterState)
  const [schemeFilter, setSchemeFilter] = useAtom(SchemeFilterState)
  const [applyEnabled, setApplyEnabled] = useState(false)

  const toneFilterRef = useRef(toneFilter)
  const brightnessFilterRef = useRef(brightnessFilter)
  const schemeFilterRef = useRef(schemeFilter)

  useEffect(() => {
    if (
      toneFilterRef.current !== toneFilter ||
      brightnessFilterRef.current !== brightnessFilter ||
      schemeFilterRef.current !== schemeFilter
    ) {
      startTransition(() => {
        setApplyEnabled(true)
        toneFilterRef.current = toneFilter
        brightnessFilterRef.current = brightnessFilter
        schemeFilterRef.current = schemeFilter
      })
    } else {
      setApplyEnabled(false)
    }
  }, [toneFilter, brightnessFilter, schemeFilter])

  const handleApply = useCallback(() => {
    window.dispatchEvent(new CustomEvent('apply-filters'))
    setApplyEnabled(false)
  }, [])

  return (
    <div className={cn('p-5 pt-10', className)}>
      <div className=''>
        <span className='font-bold block mb-2 text-sm'>Tone</span>

        <Select value={toneFilter} onValueChange={(tone) => setToneFilter(tone as ToneFilters)}>
          <SelectTrigger className=''>
            <SelectValue placeholder='Muted' />
          </SelectTrigger>

          <SelectContent>
            {toneOptions.map(({ value, label }, i) => {
              return (
                <SelectItem key={i} value={value}>
                  {label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      <div className='my-8'>
        <span className='font-bold block mb-2 text-sm'>Brightness</span>

        <Select
          value={brightnessFilter}
          onValueChange={(brightness) => setBrightnessFilter(brightness as BrightnessFilters)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Dark' />
          </SelectTrigger>

          <SelectContent>
            {brightnessOptions.map(({ value, label }, i) => {
              return (
                <SelectItem key={i} value={value}>
                  {label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      <div className=''>
        <span className='font-bold block mb-2 text-sm'>Scheme</span>

        <Select
          value={schemeFilter}
          onValueChange={(scheme) => setSchemeFilter(scheme as SchemeFilters)}
        >
          <SelectTrigger>
            <SelectValue placeholder='Monochrome' />
          </SelectTrigger>

          <SelectContent>
            {schemeOptions.map(({ value, label }, i) => {
              return (
                <SelectItem key={i} value={value}>
                  {label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleApply}
        className='mt-8 disabled:bg-neutral-400'
        disabled={!applyEnabled}
      >
        Apply
      </Button>
    </div>
  )
}
