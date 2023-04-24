export const precision = (number: number) => {
  if (!isFinite(number)) {
    return 0
  }
  let e = 1
  let p = 0
  while (Math.round(number * e) / e !== number) {
    e *= 10
    p++
  }
  return p
}
