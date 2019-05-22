import { getXPosition, mapPositionToPuzzlePieces } from '@/puzzleHelpers'

const shuffledPuzzlePieces = [1, 2, 3, 4]

const mockPuzzlePieces = [
  { puzzlePieceNumber: 1, empty: false, x: 0, y: 0 },
  { puzzlePieceNumber: 2, empty: false, x: 1, y: 0 },
  { puzzlePieceNumber: 3, empty: false, x: 2, y: 0 },
  { puzzlePieceNumber: 4, empty: false, x: 3, y: 0 },
  { empty: true, x: 3, y: 3 }
]

describe('createPuzzlePieces', () => {
  it('creates puzzle pieces', () => {
    const puzzlePieces = mapPositionToPuzzlePieces(shuffledPuzzlePieces)
    expect(puzzlePieces).toStrictEqual(mockPuzzlePieces)
  })
})

describe('Position helpers', () => {
  it('gets x position based on index', () => {
    const xPosition1 = getXPosition(1)(4)
    expect(xPosition1).toBe(1)
    const xPosition2 = getXPosition(2)(4)
    expect(xPosition2).toBe(2)
    const xPosition3 = getXPosition(8)(4)
    expect(xPosition3).toBe(0)
    const xPosition4 = getXPosition(19)(4)
    expect(xPosition4).toBe(3)
    const xPosition5 = getXPosition(4)(4)
    expect(xPosition5).toBe(0)
  })
})
