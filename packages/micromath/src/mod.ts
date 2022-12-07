

/**
 * Modulates an input value within a specified range
 *
 * @param value input value to modulate
 * @param min the minimum value in the modulation range
 * @param max the maximum value in the modulation range
 * @param exclusive whether the min and max are exclusive
 */
export const mod = (value: number, min: number, max: number, exclusive: 'min' | 'max' | 'neither' = 'neither') => {
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
    result = min + ((result - min) % delta)
  }

  if(exclusive === 'min' && result === min) {
    result = max
  } else if(exclusive === 'max' && result === max) {
    result = min
  }

  return result
}
