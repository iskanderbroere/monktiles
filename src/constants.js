import { range } from 'ramda'
import { square } from '@/utils'
export const gridSize = 4
export const amountOfPuzzlePieces =
  square(gridSize) -
  // one empty piece
  1
export const puzzlePieces = range(1, amountOfPuzzlePieces + 1)
