import alphabet from './asset/company/alphabet.png'
import amazon from './asset/company/amazon.png'
import apple from './asset/company/apple.png'
import meta from './asset/company/meta.png'
import microsoft from './asset/company/microsoft.png'
import nvidia from './asset/company/nvidia.png'
import saudiAramco from './asset/company/saudiAramco.png'
import preact from './asset/jsx/preact.png'
import react from './asset/jsx/react.png'
import solid from './asset/jsx/solid.png'

export type Value = number
export type Unit = number | string

export type Values<Label extends number> = ({
  unit: Unit
} & { [Key in Label]: Value })[]

export type Labels<Label extends number> = { [Key in Label]: { label: string; image?: string; color: string } }

const getRandomInteger = (minimum: number, maximum: number) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

export function jsxFrameworkDownloads() {
  enum Frameworks {
    React = 0,
    Preact = 1,
    Solid = 2,
  }
  const values = [] as Values<Frameworks>

  values.push({
    unit: 1989,
    [Frameworks.React]: getRandomInteger(0, 6),
    [Frameworks.Preact]: getRandomInteger(0, 5),
    [Frameworks.Solid]: getRandomInteger(0, 4),
  })

  for (let year = 1990; year <= 2023; year++) {
    const previousValues = values[values.length - 1] // Ensure next values are close and will slightly go up.
    values.push({
      unit: year,
      [Frameworks.React]: getRandomInteger(
        Math.max(0, previousValues[Frameworks.React] - 1),
        Math.min(100, previousValues[Frameworks.React] + 6),
      ),
      [Frameworks.Preact]: getRandomInteger(
        Math.max(0, previousValues[Frameworks.Preact] - 2),
        Math.min(100, previousValues[Frameworks.Preact] + 5),
      ),
      [Frameworks.Solid]: getRandomInteger(
        Math.max(0, previousValues[Frameworks.Solid] - 3),
        Math.min(100, previousValues[Frameworks.Solid] + 4),
      ),
    })
  }

  const labels: Labels<Frameworks> = {
    [Frameworks.React]: {
      label: 'React',
      image: react,
      color: '#61dbfb',
    },
    [Frameworks.Preact]: {
      label: 'Preact',
      image: preact,
      color: '#6538b3',
    },
    [Frameworks.Solid]: {
      label: 'Solid',
      image: solid,
      color: 'rgb(68, 107, 158)',
    },
  }

  return { values, labels }
}

export function largeCapCompanies() {
  enum Companies {
    Microsoft = 0,
    Apple = 1,
    Nvidia = 2,
    SaudiAramco = 3,
    Amazon = 4,
    Alphabet = 5,
    Meta = 6,
  }
  const values = [] as Values<Companies>

  values.push({
    unit: 1989,
    [Companies.Microsoft]: getRandomInteger(0, 7),
    [Companies.Apple]: getRandomInteger(0, 6),
    [Companies.Nvidia]: getRandomInteger(0, 5),
    [Companies.SaudiAramco]: getRandomInteger(0, 4),
    [Companies.Amazon]: getRandomInteger(0, 3),
    [Companies.Alphabet]: getRandomInteger(0, 2),
    [Companies.Meta]: getRandomInteger(0, 1),
  })

  for (let year = 1990; year <= 2023; year++) {
    const previousValues = values[values.length - 1] // Ensure next values are close and will slightly go up.
    values.push({
      unit: year,
      [Companies.Microsoft]: getRandomInteger(
        Math.max(0, previousValues[Companies.Microsoft] - 1),
        Math.min(100, previousValues[Companies.Microsoft] + 6),
      ),
      [Companies.Apple]: getRandomInteger(
        Math.max(0, previousValues[Companies.Apple] - 1),
        Math.min(100, previousValues[Companies.Apple] + 6),
      ),
      [Companies.Nvidia]: getRandomInteger(
        Math.max(0, previousValues[Companies.Nvidia] - 1),
        Math.min(100, previousValues[Companies.Nvidia] + 6),
      ),
      [Companies.SaudiAramco]: getRandomInteger(
        Math.max(0, previousValues[Companies.SaudiAramco] - 1),
        Math.min(100, previousValues[Companies.SaudiAramco] + 6),
      ),
      [Companies.Amazon]: getRandomInteger(
        Math.max(0, previousValues[Companies.Amazon] - 1),
        Math.min(100, previousValues[Companies.Amazon] + 6),
      ),
      [Companies.Alphabet]: getRandomInteger(
        Math.max(0, previousValues[Companies.Alphabet] - 1),
        Math.min(100, previousValues[Companies.Alphabet] + 6),
      ),
      [Companies.Meta]: getRandomInteger(
        Math.max(0, previousValues[Companies.Meta] - 1),
        Math.min(100, previousValues[Companies.Meta] + 6),
      ),
    })
  }

  const labels = {
    [Companies.Microsoft]: {
      label: 'Microsoft',
      legalName: 'Microsoft Corporation',
      image: microsoft,
      color: 'red',
    },
    [Companies.Apple]: {
      label: 'Apple',
      legalName: 'Apple Inc.',
      image: apple,
      color: 'blue',
    },
    [Companies.Nvidia]: {
      label: 'Nvidia',
      legalName: 'Nvidia Corporation',
      image: nvidia,
      color: 'green',
    },
    [Companies.SaudiAramco]: {
      label: 'Saudi Aramco',
      legalName: 'Saudi Arabian Oil Group',
      image: saudiAramco,
      color: 'yellow',
    },
    [Companies.Amazon]: {
      label: 'Amazon',
      legalName: 'Amazon.com, Inc.',
      image: amazon,
      color: 'purple',
    },
    [Companies.Alphabet]: {
      label: 'Google',
      legalName: 'Alphabet Inc.',
      image: alphabet,
      color: 'orange',
    },
    [Companies.Meta]: {
      label: 'Meta',
      legalName: 'Meta Platforms, Inc.',
      image: meta,
      color: 'pink',
    },
  }

  return { values, labels }
}
