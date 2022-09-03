/**
 * Get the length of a vector
 * This method can also be used as the pythagorean theorem
 *
 * @param components: list of dimensions of the vector
 */
export const vectorLength = (...components: number[]): number => {
  let lengthSquared = 0
  for (const component of components) {
    lengthSquared += component * component
  }

  return Math.sqrt(lengthSquared)
}

/**
 * Normalizes a vector, making its total length = 1
 *
 * @param components: list of dimensions of the vector
 */
export const normalizeVector = <T extends number[]>(...components: T): T => {
  const length = vectorLength(...components)

  return components.map(component => component / length) as T
}
