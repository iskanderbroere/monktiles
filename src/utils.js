import { gridSize } from '@/constants'
import { modulo, addIndex, map } from 'ramda'

export const mapIndexed = addIndex(map)

export const square = n => n * n

export const getYPosition = puzzlePieceIndex =>
  Math.floor(puzzlePieceIndex / gridSize)

export const getXPosition = puzzlePieceIndex => {
  return modulo(puzzlePieceIndex, gridSize)
}
