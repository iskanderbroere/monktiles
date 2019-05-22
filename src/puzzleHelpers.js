import { shuffle } from 'lodash-es'
import { gridSize, puzzlePieces } from '@/constants'
import { mapIndexed } from '@/utils'
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
  pluck,
  subtract
} from 'ramda'

/**
 * Get X position based on array index and grid size
 */
export const getXPosition = curry((gridSize, puzzlePieceIndex) =>
  modulo(puzzlePieceIndex, gridSize)
)

/**
 * Get Y position based on array index and grid size
 */
export const getYPosition = curry((gridSize, puzzlePieceIndex) =>
  Math.floor(puzzlePieceIndex / gridSize)
)

/**
 * Map puzzle piece numbers to objects with position and empty state
 */
export const mapPositionToPuzzlePieces = shuffledPuzzlePieceNumbers => {
  const mappedPuzzlePieces = mapIndexed((puzzlePiece, index) => {
    return {
      puzzlePieceNumber: puzzlePiece,
      empty: false,
      x: getXPosition(gridSize, index),
      y: getYPosition(gridSize, index)
    }
  }, shuffledPuzzlePieceNumbers)
  return concat(mappedPuzzlePieces, [
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

  // find empty puzzle piece to compare position to
  const { x: emptyX, y: emptyY } = findEmptyPuzzlePiece(puzzlePieces)

  // compare positional difference
  const xDelta = emptyX - x
  const yDelta = emptyY - y

  // clicked puzzle piece is not on same  x or y axis
  if (yDelta !== 0 && xDelta !== 0) return false

  // clicked puzzle piece is more than one grid tile away
  if (yDelta > 1 || xDelta > 1) return false
  return true
})

/**
 * Moves a puzzle piece
 */
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

/**
 * Pluck puzzle piece numbers from an array of puzzle piece objects
 */
const getPuzzlePieceNumbers = pluck('puzzlePieceNumber')

/**
 * Whether the puzzle pieces are in the right order
 * @param {*} puzzlePieces Puzzle pieces to check
 */
export const gameIsWon = puzzlePieces => {
  // only the puzzle piece numbers
  const puzzlePieceNumbers = getPuzzlePieceNumbers(puzzlePieces)
  // sort to expected order
  const sortedPuzzlePieceNumbers = sort(subtract, puzzlePieceNumbers)
  // compare to original
  return equals(sortedPuzzlePieceNumbers, getPuzzlePieceNumbers(puzzlePieces))
}

export const createPuzzlePieces = () => {
  const shuffledPuzzlePieces = shuffle(puzzlePieces)
  return mapPositionToPuzzlePieces(shuffledPuzzlePieces)
}
