/**
 * Computes the distance between two two-dimensional points
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 */
export const distance2D = (x1: number, y1: number, x2: number, y2: number) => {
  if (x1 === x2 && y1 === y2) {
    return 0
  } else if (x1 === x2) {
    return Math.abs(y2 - y1)
  } else if (y1 === y2) {
    return Math.abs(x2 - x1)
  } else {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }
}

export const distance = (p0: number[], p1: number[]): number => {
  if (p0.length !== p1.length) {
    throw new Error('Cannot compute the distance between two points with different dimensions')
  }

  let radicand = 0
  for (let i = 0; i < p0.length; i++) {
    radicand += Math.pow(p1[i] - p0[i], 2)
  }

  return Math.sqrt(radicand)
}
