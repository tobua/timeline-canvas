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
} & { [key in Label]: Value })[]

export type Labels<Label extends number> = { [key in Label]: { label: string; image: string; color: string } }

const getRandomInteger = (minimum: number, maximum: number) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

export function jsxFrameworkDownloads() {
  enum Frameworks {
    react = 0,
    preact = 1,
    solid = 2
  }
  const values = [] as Values<Frameworks>

  values.push({
    unit: 1989,
    [Frameworks.react]: getRandomInteger(0, 6),
    [Frameworks.preact]: getRandomInteger(0, 5),
    [Frameworks.solid]: getRandomInteger(0, 4),
  })

  for (let year = 1990; year <= 2023; year++) {
    const previousValues = values[values.length - 1] // Ensure next values are close and will slightly go up.
    values.push({
      unit: year,
      [Frameworks.react]: getRandomInteger(Math.max(0, previousValues[Frameworks.react] - 1), Math.min(100, previousValues[Frameworks.react] + 6)),
      [Frameworks.preact]: getRandomInteger(Math.max(0, previousValues[Frameworks.preact] - 2), Math.min(100, previousValues[Frameworks.preact] + 5)),
      [Frameworks.solid]: getRandomInteger(Math.max(0, previousValues[Frameworks.solid] - 3), Math.min(100, previousValues[Frameworks.solid] + 4)),
    })
  }

  const labels: Labels<Frameworks> = {
    [Frameworks.react]: {
      label: 'React',
      image: react,
      color: 'red',
    },
    [Frameworks.preact]: {
      label: 'Preact',
      image: preact,
      color: 'blue',
    },
    [Frameworks.solid]: {
      label: 'Solid',
      image: solid,
      color: 'green',
    },
  }

  return { values, labels }
}

export function largeCapCompanies() {
  enum Companies {
    microsoft = 0,
    apple = 1,
    nvidia = 2,
    saudiAramco = 3,
    amazon = 4,
    alphabet = 5,
    meta = 6,
  }
  const values = [] as Values<Companies>

  values.push({
    unit: 1989,
    [Companies.microsoft]: getRandomInteger(0, 7),
    [Companies.apple]: getRandomInteger(0, 6),
    [Companies.nvidia]: getRandomInteger(0, 5),
    [Companies.saudiAramco]: getRandomInteger(0, 4),
    [Companies.amazon]: getRandomInteger(0, 3),
    [Companies.alphabet]: getRandomInteger(0, 2),
    [Companies.meta]: getRandomInteger(0, 1),
  })

  for (let year = 1990; year <= 2023; year++) {
    const previousValues = values[values.length - 1] // Ensure next values are close and will slightly go up.
    values.push({
      unit: year,
      [Companies.microsoft]: getRandomInteger(Math.max(0, previousValues[Companies.microsoft] - 1), Math.min(100, previousValues[Companies.microsoft] + 6)),
      [Companies.apple]: getRandomInteger(Math.max(0, previousValues[Companies.apple] - 1), Math.min(100, previousValues[Companies.apple] + 6)),
      [Companies.nvidia]: getRandomInteger(Math.max(0, previousValues[Companies.nvidia] - 1), Math.min(100, previousValues[Companies.nvidia] + 6)),
      [Companies.saudiAramco]: getRandomInteger(Math.max(0, previousValues[Companies.saudiAramco] - 1), Math.min(100, previousValues[Companies.saudiAramco] + 6)),
      [Companies.amazon]: getRandomInteger(Math.max(0, previousValues[Companies.amazon] - 1), Math.min(100, previousValues[Companies.amazon] + 6)),
      [Companies.alphabet]: getRandomInteger(Math.max(0, previousValues[Companies.alphabet] - 1), Math.min(100, previousValues[Companies.alphabet] + 6)),
      [Companies.meta]: getRandomInteger(Math.max(0, previousValues[Companies.meta] - 1), Math.min(100, previousValues[Companies.meta] + 6)),
    })
  }

  const labels = {
    [Companies.microsoft]: {
      label: 'Microsoft',
      legalName: 'Microsoft Corporation',
      image: microsoft,
      color: 'red'
    },
    [Companies.apple]: {
      label: 'Apple',
      legalName: 'Apple Inc.',
      image: apple,
      color: 'blue'
    },
    [Companies.nvidia]: {
      label: 'Nvidia',
      legalName: 'Nvidia Corporation',
      image: nvidia,
      color: 'green'
    },
    [Companies.saudiAramco]: {
      label: 'Saudi Aramco',
      legalName: 'Saudi Arabian Oil Group',
      image: saudiAramco,
      color: 'yellow'
    },
    [Companies.amazon]: {
      label: 'Amazon',
      legalName: 'Amazon.com, Inc.',
      image: amazon,
      color: 'purple'
    },
    [Companies.alphabet]: {
      label: 'Google',
      legalName: 'Alphabet Inc.',
      image: alphabet,
      color: 'orange'
    },
    [Companies.meta]: {
      label: 'Meta',
      legalName: 'Meta Platforms, Inc.',
      image: meta,
      color: 'pink'
    },
  }

  return { values, labels }
}
