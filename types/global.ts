export type LayoutProps = Readonly<{
  children: React.ReactNode
}>

interface Color {
  hex: string
  rgb?: [number, number, number]
  hsl?: [number, number, number]
}

export type Colors = Array<Color>

export interface Palette {
  name: string
  sentiment: string
  colors: Colors
}

export const DemoPalettes: Array<Palette> = [
  {
    name: 'Joyful Jubilations',
    sentiment: 'Playful',
    colors: [
      { hex: '#FFD700' },
      { hex: '#FF7F50' },
      { hex: '#FFFFE0' },
      { hex: '#FFA07A' },
      { hex: '#E0FFFF' },
      { hex: '#98FB98' }
    ]
  },
  {
    name: 'Euphoric Radiance',
    sentiment: 'Hopeful',
    colors: [
      { hex: '#FFD700' },
      { hex: '#FFA500' },
      { hex: '#FF4500' },
      { hex: '#FFFF00' },
      { hex: '#FF69B4' },
      { hex: '#FF1493' }
    ]
  },
  {
    name: 'Heavenly Liberation',
    sentiment: 'Trustful',
    colors: [
      { hex: '#FFEE93' },
      { hex: '#A8E6CF' },
      { hex: '#FFD3B6' },
      { hex: '#FFAAA5' },
      { hex: '#DCEDC1' },
      { hex: '#FF8B94' }
    ]
  },
  {
    name: 'Hidden Sorrows',
    sentiment: 'Sad',
    colors: [
      { hex: '#2E2E38' },
      { hex: '#4B4B59' },
      { hex: '#6A7790' },
      { hex: '#948C99' },
      { hex: '#B1A6A4' },
      { hex: '#D1C8C0' }
    ]
  }
]
