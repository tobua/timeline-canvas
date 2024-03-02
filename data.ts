const getRandomInteger = (minimum: number, maximum: number) => Math.floor(Math.random() * (maximum - minimum + 1)) + minimum

export function jsxFrameworks() {
  type Downloads = number
  type Frameworks = 'react' | 'preact' | 'solid'
  const data = [] as ({ [Key in Frameworks]: Downloads } & { year: number })[]

  for (let year = 1990; year <= 2023; year++) {
    data.push({
      year,
      react: getRandomInteger(1, 100),
      preact: getRandomInteger(1, 100),
      solid: getRandomInteger(1, 100),
    })
  }

  return data
}
