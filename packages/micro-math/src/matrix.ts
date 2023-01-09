export const determinant = (matrix: number[][]) => {
  const size = matrix.length
  for (const row of matrix) {
    if (row.length !== size) {
      throw new Error('Cannot find determinant of non-square matrix')
    }
  }

  let result = 0
  if (size === 1) {
    result = matrix[0][0]
  } else if (size === 2) {
    result = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
  } else {
    for (const [columnIndex, value] of matrix[0].entries()) {
      const subMatrix: number[][] = []
      for (const row of matrix.slice(1)) {
        const subMatrixRow: number[] = []
        for (const [subColumnIndex, subColumnValue] of row.entries()) {
          if (subColumnIndex !== columnIndex) {
            subMatrixRow.push(subColumnValue)
          }
        }
        subMatrix.push(subMatrixRow)
      }

      result = result + Math.pow(-1, columnIndex + 2) * value * determinant(subMatrix)
    }
  }
  return result
}

export const solveLinearSystem = (coefficients: number[][], solutions: number[]): number[] => {
  const coefficientDeterminant = determinant(coefficients)

  if (coefficientDeterminant === 0) {
    throw new Error('Cannot solve system of equations when coefficient matrix determinant is zero')
  }

  const variables: number[] = []

  for (let index = 0; index < solutions.length; index++) {
    const solutionMatrix: number[][] = []
    for (const [rowIndex, row] of coefficients.entries()) {
      const solutionMatrixRow: number[] = []
      for (const [columnIndex, column] of row.entries()) {
        solutionMatrixRow.push(columnIndex === index ? solutions[rowIndex] : column)
      }
      solutionMatrix.push(solutionMatrixRow)
    }

    variables.push(determinant(solutionMatrix) / coefficientDeterminant)
  }

  return variables
}
