import { shuffle } from 'lodash-es'
import { gridSize, puzzlePieces } from '@/constants'
import { mapIndexed } from '@/utils'
import { modulo, concat } from 'ramda'

export const getYPosition = puzzlePieceIndex =>
  Math.floor(puzzlePieceIndex / gridSize)

export const getXPosition = puzzlePieceIndex => {
  return modulo(puzzlePieceIndex, gridSize)
}

export const getShuffledPuzzlePieces = () => shuffle(puzzlePieces)

export const mapPositionToPuzzlePieces = shuffledPuzzlePieces => {
  // todo - better name
  const puzzlePieces = mapIndexed((puzzlePiece, index) => {
    return {
      puzzlePieceNumber: puzzlePiece,
      empty: false,
      x: getXPosition(index),
      y: getYPosition(index)
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
