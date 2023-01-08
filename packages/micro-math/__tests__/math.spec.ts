import { describe, test, expect, vi } from 'vitest'
import {
  clamp,
  determinant,
  distance,
  distance2D,
  lerp,
  lineSlope,
  lineYIntercept,
  mod,
  normalize,
  normalizeVector,
  polynomial,
  quadraticRoots,
  remap,
  roundTo,
  vectorLength,
} from '../src'

describe('clamp', () => {
  test('it clamps ', () => {
    expect(clamp(-1)).toBe(0)
    expect(clamp(2)).toBe(1)

    expect(clamp(-1, 0, 1)).toBe(0)
    expect(clamp(0, 0, 1)).toBe(0)
    expect(clamp(0.5, 0, 1)).toBe(0.5)
    expect(clamp(1, 0, 1)).toBe(1)
    expect(clamp(2, 0, 1)).toBe(1)
  })
})

describe('distance2D', () => {
  test('it handles no distance2D efficiently', ({ expect }) => {
    const absSpy = vi.spyOn(Math, 'abs')
    const sqrtSpy = vi.spyOn(Math, 'sqrt')

    expect(distance2D(0, 0, 0, 0)).toBe(0)

    expect(absSpy).not.toHaveBeenCalled()
    expect(sqrtSpy).not.toHaveBeenCalled()
  })
  test('it handles vertical and horizontal lines efficiently', ({ expect }) => {
    const sqrtSpy = vi.spyOn(Math, 'sqrt')

    expect(distance2D(0, 0, 0, 10)).toBe(10)
    expect(distance2D(0, 0, 10, 0)).toBe(10)

    expect(sqrtSpy).not.toHaveBeenCalled()
  })
  test('it handles any coordinates', ({ expect }) => {
    expect(distance2D(0, 0, 1, 1)).toBe(Math.sqrt(2))
  })
})

describe('distance', () => {
  test('it handles any coordinates', ({ expect }) => {
    expect(distance([1, 0, 5], [0, 2, 4])).toBe(Math.sqrt(6))
  })
  test('it throws for differently dimensioned points', ({ expect }) => {
    expect(() => distance([1, 2], [3])).toThrowError(
      'Cannot compute the distance between two points with different dimensions'
    )
  })
})

describe('lerp', () => {
  test('it lerps a regular range', () => {
    expect(lerp(0, 0, 10)).toBe(0)
    expect(lerp(1, 0, 10)).toBe(10)
    expect(lerp(0.5, 0, 10)).toBe(5)
  })

  test('it lerps an inverted range', () => {
    expect(lerp(0, 0, -10)).toBe(0)
    expect(lerp(1, 0, -10)).toBe(-10)
    expect(lerp(0.5, 0, -10)).toBe(-5)
  })

  test('it clamps a regular range by default', () => {
    expect(lerp(1.5, 0, 10)).toBe(10)
    expect(lerp(-0.5, 0, 10)).toBe(0)
  })

  test('it extrapolates a regular range', () => {
    expect(lerp(1.5, 0, 10, false)).toBe(15)
    expect(lerp(-0.5, 0, 10, false)).toBe(-5)
  })

  test('it clamps an inverted range by default', () => {
    expect(lerp(1.5, 0, -10)).toBe(-10)
    expect(lerp(-0.5, 0, -10)).toBe(0)
  })

  test('it extrapolates an inverted range', () => {
    expect(lerp(1.5, 0, -10, false)).toBe(-15)
    expect(lerp(-0.5, 0, -10, false)).toBe(5)
  })
})

describe('line', () => {
  describe('lineSlope', () => {
    test('it gets the slope of a line', ({ expect }) => {
      expect(lineSlope(0, 0, 1, 2)).toBe(2)
    })

    test('it handles horizontal lines', ({ expect }) => {
      expect(lineSlope(0, 1, 1, 1)).toBe(0)
    })

    test('it handles vertical lines', ({ expect }) => {
      expect(lineSlope(1, 0, 1, 1)).toBe(Infinity)
    })
  })
  describe('y intercept', () => {
    test('it gets the y intercept of a line', ({ expect }) => {
      expect(lineYIntercept(0, 0, 1, 1)).toBe(0)
    })

    test('it handles vertical lines', ({ expect }) => {
      expect(lineYIntercept(1, 0, 1, 1)).toBeUndefined()
    })
  })
})

describe('matrix', () => {
  test('finds determinant of 1x1 matrices', ({ expect }) => {
    expect(determinant([[1]])).toBe(1)
  })
  test('finds determinant of 2x2 matrices', ({ expect }) => {
    expect(
      determinant([
        [1, 2],
        [3, 4],
      ])
    ).toBe(-2)
  })
  test('finds determinant of larger matrices', ({ expect }) => {
    expect(
      determinant([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ])
    ).toBe(0)

    expect(
      determinant([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ])
    ).toBe(0)
  })
  test('throws for invalid matrix', ({ expect }) => {
    expect(() => determinant([[1, 2]])).toThrowError('Cannot find determinant of non-square matrix')
  })
})

describe('mod', () => {
  test('it returns the min for a 0 range', () => {
    expect(mod(5, 0, 0)).toBe(0)
  })

  test('it handles an inverted range', () => {
    expect(mod(5, 0, -1)).toBe(0)
  })

  test('it returns value within range', () => {
    expect(mod(1, 0, 2)).toBe(1)
    expect(mod(10, 5, 20)).toBe(10)
    expect(mod(-3, -5, 0)).toBe(-3)
  })

  test('it mods value above range', () => {
    expect(mod(10, 0, 3)).toBe(1)
    expect(mod(10, 0, 4)).toBe(2)
    expect(mod(0, -5, -3)).toBe(-4)
  })

  test('it mods value below range', () => {
    expect(mod(2, 10, 20)).toBe(12)
    expect(mod(3, 6, 9)).toBe(6)
    expect(mod(-10, -2, 0)).toBe(-2)
  })

  test('it mods with max exclusive', () => {
    expect(mod(5, 0, 5, 'max')).toBe(0)
  })

  test('it mods with min exclusive', () => {
    expect(mod(-5, 0, 5, 'min')).toBe(5)
  })

  test('it mods with differently signed input and constraints', () => {
    expect(mod(10, -4, -2)).toBe(-2)
    expect(mod(-10, -4, -2)).toBe(-4)
  })

  test('it mods split-signed ranges', () => {
    expect(mod(10, -1, 2)).toBe(1)
    expect(mod(10, -1, 1)).toBe(0)
    expect(mod(-10, -1, 2)).toBe(-1)
    expect(mod(-10, -1, 1)).toBe(0)
  })
})

describe('normalize', () => {
  test('it throws on a zero-sized range', () => {
    expect(() => normalize(0, 0, 0)).toThrow()
  })

  test('it normalizes a regular range', () => {
    expect(normalize(0, 0, 10)).toBe(0)
    expect(normalize(5, 0, 10)).toBe(0.5)
    expect(normalize(10, 0, 10)).toBe(1)
  })

  test('it normalizes an inverted range', () => {
    expect(normalize(0, 0, -10)).toBe(0)
    expect(normalize(-5, 0, -10)).toBe(0.5)
    expect(normalize(-10, 0, -10)).toBe(1)
  })

  test('it extrapolates a regular range', () => {
    expect(normalize(15, 0, 10)).toBe(1.5)
    expect(normalize(-5, 0, 10)).toBe(-0.5)
  })

  test('it extrapolates an inverted range', () => {
    expect(normalize(-15, 0, -10)).toBe(1.5)
    expect(normalize(5, 0, -10)).toBe(-0.5)
  })
})

describe('polynomial', () => {
  test('finds polynomial', ({ expect }) => {
    expect(polynomial(2, [2, -1], 'descending')).toBe(3)
  })
})

describe('quadraticRoots', () => {
  test('it returns no roots where a and c are both zero', () => {
    expect(quadraticRoots(0, 0, 0)).toStrictEqual([])
  })

  test('it returns no roots where the determinant is zero', () => {
    expect(quadraticRoots(1, 0, 1)).toStrictEqual([])
  })

  test('it returns the real roots of a quadratic equation', () => {
    expect(quadraticRoots(-1, 1, 0)).toEqual([0, 1])
  })
})

describe('remap', () => {
  test('it throws on a zero-sized range', () => {
    expect(() => remap(0, 0, 0, 0, 10)).toThrow()
  })

  test('it remaps regular and inverted ranges', () => {
    expect(remap(5, 0, 10, 10, 20)).toBe(15)
    expect(remap(2.5, 0, 10, 20, 10)).toBe(17.5)
    expect(remap(-5, 0, -10, 0, 100)).toBe(50)
    expect(remap(-10, 0, -10, 100, 50)).toBe(50)
  })

  test('it clamps regular and inverted ranges by default', () => {
    expect(remap(-5, 0, 10, 0, 100)).toBe(0)
    expect(remap(15, 0, 10, 100, 0)).toBe(0)
    expect(remap(-15, 0, -10, 0, 100)).toBe(100)
    expect(remap(5, 0, -10, 0, 100)).toBe(0)
  })

  test('it extrapolates regular and inverted ranges', () => {
    expect(remap(-5, 0, 10, 0, 100, false)).toBe(-50)
    expect(remap(15, 0, 10, 100, 0, false)).toBe(-50)
    expect(remap(-15, 0, -10, 0, 100, false)).toBe(150)
    expect(remap(5, 0, -10, 0, 100, false)).toBe(-50)
  })
})

describe('roundTo', () => {
  test('it throws for invalid precisions', () => {
    expect(() => roundTo(10, 0.1)).toThrow()
    expect(() => roundTo(10, -10)).toThrow()
  })

  test('it rounds to the given precision', () => {
    expect(roundTo(1.23456, 0)).toBe(1)
    expect(roundTo(1.23456, 1)).toBe(1.2)
    expect(roundTo(1.23456, 2)).toBe(1.23)
    expect(roundTo(1.23456, 3)).toBe(1.235)

    expect(roundTo(0, 1)).toBe(0)
  })
})

describe('vector', () => {
  describe('vectorLength', () => {
    test('it computes the length of a vector', ({ expect }) => {
      expect(vectorLength(0, 0)).toBe(0)
      expect(vectorLength(0, 1)).toBe(1)
      expect(vectorLength(1, 1)).toBe(Math.sqrt(2))
    })
  })

  describe('normalizeVector', () => {
    test('it normalizes a vector', ({ expect }) => {
      expect(normalizeVector(0, 2)).toStrictEqual([0, 1])
    })
  })
})
