/**
 * Modulates an input value within a specified range
 *
 * @param value input value to modulate
 * @param min the minimum value in the modulation range
 * @param max the maximum value in the modulation range
 * @param exclude whether the min and max are excluded
 */
export const mod = (
  value: number,
  min: number,
  max: number,
  exclude: 'min' | 'max' | 'neither' = 'neither'
) => {
  if (min === max) {
    return min
  }

  if (max < min) {
    const tmp = min
    min = max
    max = tmp
  }

  const delta = max - min

  let result = value

  if (result < min) {
    while (result < min) {
      result += delta
    }
  } else if (result > max) {
    while (result > max) {
      result -= delta
    }
  }

  if (exclude === 'min' && result === min) {
    result = max
  } else if (exclude === 'max' && result === max) {
    result = min
  }

  if (result === -0) {
    result = 0
  }

  return result
}
