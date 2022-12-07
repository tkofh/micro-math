/**
 * Gets the slope of a line based on two of its points
 * Returns Infinity when x1 === x2
 *
 * @param x1: the x component of the first point
 * @param y1: the y component of the first point
 * @param x2: the x component of the second point
 * @param y2: the y component of the second point
 */
export const lineSlope = (x1: number, y1: number, x2: number, y2: number) => {
  let result: number

  const dx = x2 - x1

  if (dx === 0) {
    result = Infinity
  } else {
    result = (y2 - y1) / dx
  }

  return result
}

/**
 * Gets the Y Intercept of a line based on two of its points
 * Returns undefined in the case of a vertical line
 *
 * @param x1: the x component of the first point
 * @param y1: the y component of the first point
 * @param x2: the x component of the second point
 * @param y2: the y component of the second point
 */
export const lineYIntercept = (x1: number, y1: number, x2: number, y2: number) => {
  let result: number | undefined = undefined

  const slope = lineSlope(x1, y1, x2, y2)

  if (slope !== Infinity) {
    result = y1 - slope * x1
  }

  return result
}