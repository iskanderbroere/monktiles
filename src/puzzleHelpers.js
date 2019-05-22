import { shuffle } from 'lodash-es'
import { gridSize, puzzlePieces } from '@/constants'
import { mapIndexed, diff } from '@/utils'
import {
  modulo,
  concat,
  curry,
  find,
  propEq,
  map,
  omit,
  sort,
  equals,
  dropLast,
  pluck
} from 'ramda'

export const getXPosition = curry((gridSize, puzzlePieceIndex) =>
  modulo(puzzlePieceIndex, gridSize)
)

export const getYPosition = curry((gridSize, puzzlePieceIndex) =>
  Math.floor(puzzlePieceIndex / gridSize)
)

export const getShuffledPuzzlePieces = () => shuffle(puzzlePieces)

export const mapPositionToPuzzlePieces = shuffledPuzzlePieces => {
  // todo - better name
  const puzzlePieces = mapIndexed((puzzlePiece, index) => {
    return {
      puzzlePieceNumber: puzzlePiece,
      empty: false,
      x: getXPosition(gridSize)(index),
      y: getYPosition(gridSize)(index)
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

// find the position of the empty puzzle piece in state
export const findEmptyPuzzlePiece = puzzlePieces =>
  find(propEq('empty', true), puzzlePieces)

export const puzzlePieceCanBeMoved = curry((puzzlePieces, { empty, x, y }) => {
  // empty puzzle piece is clicked
  if (empty) return false
  const { x: emptyX, y: emptyY } = findEmptyPuzzlePiece(puzzlePieces)
  const xDelta = emptyX - x
  const yDelta = emptyY - y

  // clicked puzzle piece is not on same  x or y axis
  if (yDelta !== 0 && xDelta !== 0) return false

  // clicked puzzle piece is more than one grid tile away
  if (yDelta > 1 || xDelta > 1) return false
  return true
})

export const movePuzzlePiece = curry((puzzlePieces, { puzzlePieceNumber }) =>
  map(puzzleGridItem => {
    // puzzle piece to move the empty piece to
    if (puzzleGridItem.puzzlePieceNumber === puzzlePieceNumber) {
      return {
        ...omit(['puzzlePieceNumber'], puzzleGridItem),
        empty: true
      }
    }
    // empty puzzle piece to move clicked piece to
    if (puzzleGridItem.empty) {
      return {
        ...puzzleGridItem,
        puzzlePieceNumber,
        empty: false
      }
    }
    return puzzleGridItem
  }, puzzlePieces)
)

const getPuzzlePieceNumbers = pluck('puzzlePieceNumber')

export const gameIsWon = puzzlePieces => {
  const puzzlePieceNumbers = getPuzzlePieceNumbers(puzzlePieces)
  const sortedPuzzlePieceNumbers = sort(diff, puzzlePieceNumbers)
  const sortedPuzzlePieceNumbersWithoutEmpty = dropLast(
    1,
    sortedPuzzlePieceNumbers
  )
  const expectedPuzzlePieceNumbersWithoutEmpty = dropLast(
    1,
    getPuzzlePieceNumbers(puzzlePieces)
  )
  return equals(
    sortedPuzzlePieceNumbersWithoutEmpty,
    expectedPuzzlePieceNumbersWithoutEmpty
  )
}

export const createPuzzlePieces = () => {
  const shuffledPuzzlePieces = getShuffledPuzzlePieces()
  return mapPositionToPuzzlePieces(shuffledPuzzlePieces)
}
