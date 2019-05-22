import {
  getXPosition,
  getYPosition,
  mapPositionToPuzzlePieces
} from '@/puzzleHelpers'

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
  it('gets y position based on index', () => {
    const yPosition1 = getYPosition(1)(4)
    expect(yPosition1).toBe(0)
    const yPosition2 = getYPosition(2)(4)
    expect(yPosition2).toBe(0)
    const yPosition3 = getYPosition(5)(4)
    expect(yPosition3).toBe(1)
    const yPosition4 = getYPosition(19)(4)
    expect(yPosition4).toBe(4)
    const yPosition5 = getYPosition(4)(4)
    expect(yPosition5).toBe(1)
  })
})
