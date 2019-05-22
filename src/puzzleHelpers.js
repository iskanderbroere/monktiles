import { shuffle } from 'lodash-es'
import { gridSize, puzzlePieces } from '@/constants'
import { mapIndexed } from '@/utils'
import { modulo, concat, curry } from 'ramda'

export const getXPosition = curry((puzzlePieceIndex, gridSize) =>
  modulo(puzzlePieceIndex, gridSize)
)

export const getYPosition = curry((puzzlePieceIndex, gridSize) =>
  Math.floor(puzzlePieceIndex / gridSize)
)

export const getShuffledPuzzlePieces = () => shuffle(puzzlePieces)

export const mapPositionToPuzzlePieces = shuffledPuzzlePieces => {
  // todo - better name
  const puzzlePieces = mapIndexed((puzzlePiece, index) => {
    return {
      puzzlePieceNumber: puzzlePiece,
      empty: false,
      x: getXPosition(index)(gridSize),
      y: getYPosition(index)(gridSize)
    }
  }, shuffledPuzzlePieces)
  return concat(puzzlePieces, [
    {
      empty: true,
      // last place in grid
      x: gridSize - 1,
      y: gridSize - 1
    }
  ])
}

export const createPuzzlePieces = () => {
  const shuffledPuzzlePieces = getShuffledPuzzlePieces()
  return mapPositionToPuzzlePieces(shuffledPuzzlePieces)
}
