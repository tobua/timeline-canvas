import { writeFileSync } from 'node:fs'
import stats from 'download-stats'
import type { Labels, Values } from './data'

// Alternative: npm-stats-api

enum Frameworks {
  React = 0,
  Preact = 1,
  Solid = 2,
}

const start = new Date('2023-01-01')
const end = new Date()

const data: Values<number> = []

async function loadDataForPackage(packageName: string, framework: Frameworks) {
  let index = 0
  return new Promise((done, fail) => {
    stats
      .get(start, end, packageName)
      .on('error', fail)
      .on('data', ({ day, downloads }) => {
        if (data[index]) {
          data[index][framework] = downloads
        } else {
          data.push({ unit: day, [framework]: downloads })
        }
        index += 1
      })
      .on('end', done)
  })
}

// biome-ignore lint/suspicious/noConsoleLog: This is a one off script.
console.log('Loading data...')
await loadDataForPackage('react', Frameworks.React)
// biome-ignore lint/suspicious/noConsoleLog: This is a one off script.
console.log('Finished loading React.')
await loadDataForPackage('preact', Frameworks.Preact)
// biome-ignore lint/suspicious/noConsoleLog: This is a one off script.
console.log('Finished loading Preact.')
await loadDataForPackage('solid', Frameworks.Solid)
// biome-ignore lint/suspicious/noConsoleLog: This is a one off script.
console.log('Finished loading Solid.')

const labels: Labels<Frameworks> = {
  [Frameworks.React]: {
    label: 'React',
    color: '#61dbfb',
  },
  [Frameworks.Preact]: {
    label: 'Preact',
    color: '#6538b3',
  },
  [Frameworks.Solid]: {
    label: 'Solid',
    color: 'rgb(68, 107, 158)',
  },
}

writeFileSync('./data/jsx-frameworks.json', JSON.stringify({ labels, data }, null, 2))
