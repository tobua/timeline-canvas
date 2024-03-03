declare module '*.png' {
  const value: string
  // biome-ignore lint/correctness/noUndeclaredVariables: These are just types.
  // biome-ignore lint/style/noDefaultExport: Default export is required here.
  export default value
}
