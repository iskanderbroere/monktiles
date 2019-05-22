import { addIndex, map } from 'ramda'

export const mapIndexed = addIndex(map)

export const square = n => n * n
