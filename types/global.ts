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
    name: 'Whimsy Wonderland',
    sentiment: 'Playful',
    colors: [
      {
        hex: '#FFD700',
        rgb: [255, 215, 0],
        hsl: [51, 100, 50]
      },
      {
        hex: '#FF69B4',
        rgb: [255, 105, 180],
        hsl: [330, 100, 71]
      },
      {
        hex: '#00FF00',
        rgb: [0, 255, 0],
        hsl: [120, 100, 50]
      },
      {
        hex: '#0000FF',
        rgb: [0, 0, 255],
        hsl: [240, 100, 50]
      },
      {
        hex: '#FF4500',
        rgb: [255, 69, 0],
        hsl: [16, 100, 50]
      },
      {
        hex: '#8A2BE2',
        rgb: [138, 43, 226],
        hsl: [275, 76, 52]
      }
    ]
  },
  {
    name: 'Blooming Optimism',
    sentiment: 'Hopeful',
    colors: [
      {
        hex: '#FFA07A',
        rgb: [255, 160, 122],
        hsl: [16, 100, 74]
      },
      {
        hex: '#FFD700',
        rgb: [255, 215, 0],
        hsl: [51, 100, 50]
      },
      {
        hex: '#00FF00',
        rgb: [0, 255, 0],
        hsl: [120, 100, 50]
      },
      {
        hex: '#0000FF',
        rgb: [0, 0, 255],
        hsl: [240, 100, 50]
      },
      {
        hex: '#FF4500',
        rgb: [255, 69, 0],
        hsl: [16, 100, 50]
      },
      {
        hex: '#8A2BE2',
        rgb: [138, 43, 226],
        hsl: [275, 76, 52]
      }
    ]
  },
  {
    name: 'Tranquil Oasis',
    sentiment: 'Trustful',
    colors: [
      {
        hex: '#00FF00',
        rgb: [0, 255, 0],
        hsl: [120, 100, 50]
      },
      {
        hex: '#FFD700',
        rgb: [255, 215, 0],
        hsl: [51, 100, 50]
      },
      {
        hex: '#0000FF',
        rgb: [0, 0, 255],
        hsl: [240, 100, 50]
      },
      {
        hex: '#FF69B4',
        rgb: [255, 105, 180],
        hsl: [330, 100, 71]
      },
      {
        hex: '#FF4500',
        rgb: [255, 69, 0],
        hsl: [16, 100, 50]
      },
      {
        hex: '#8A2BE2',
        rgb: [138, 43, 226],
        hsl: [275, 76, 52]
      }
    ]
  }
]
