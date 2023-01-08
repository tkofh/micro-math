export const cubicPolynomial = (x: number, a: number, b: number, c: number, d: number) =>
  a * x ** 3 + b * x ** 2 + c * x + d

export const quadraticPolynomial = (x: number, a: number, b: number, c: number) =>
  a * x ** 2 + b * x + c

export const polynomial = (
  x: number,
  coefficients: number[],
  powerDirection: 'ascending' | 'descending' = 'descending'
): number => {
  let result = 0

  for (const [index, coefficient] of coefficients.entries()) {
    result +=
      Math.pow(x, powerDirection === 'ascending' ? index : coefficients.length - 1 - index) *
      coefficient
  }

  return result
}
