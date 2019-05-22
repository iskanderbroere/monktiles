import {
  getXPosition,
  getYPosition,
  mapPositionToPuzzlePieces,
  puzzlePieceCanBeMoved,
  movePuzzlePiece
} from '@/puzzleHelpers'

const shuffledPuzzlePieces = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const mockPuzzlePieces = [
  { empty: false, puzzlePieceNumber: 1, x: 0, y: 0 },
  { empty: false, puzzlePieceNumber: 2, x: 1, y: 0 },
  { empty: false, puzzlePieceNumber: 3, x: 2, y: 0 },
  { empty: false, puzzlePieceNumber: 4, x: 3, y: 0 },
  { empty: false, puzzlePieceNumber: 5, x: 0, y: 1 },
  { empty: false, puzzlePieceNumber: 6, x: 1, y: 1 },
  { empty: false, puzzlePieceNumber: 7, x: 2, y: 1 },
  { empty: false, puzzlePieceNumber: 8, x: 3, y: 1 },
  { empty: false, puzzlePieceNumber: 9, x: 0, y: 2 },
  { empty: false, puzzlePieceNumber: 10, x: 1, y: 2 },
  { empty: false, puzzlePieceNumber: 11, x: 2, y: 2 },
  { empty: false, puzzlePieceNumber: 12, x: 3, y: 2 },
  { empty: false, puzzlePieceNumber: 13, x: 0, y: 3 },
  { empty: false, puzzlePieceNumber: 14, x: 1, y: 3 },
  { empty: false, puzzlePieceNumber: 15, x: 2, y: 3 },
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
    const getXPositionGridSize4 = getXPosition(4)
    const xPosition1 = getXPositionGridSize4(1)
    expect(xPosition1).toBe(1)
    const xPosition2 = getXPositionGridSize4(2)
    expect(xPosition2).toBe(2)
    const xPosition3 = getXPositionGridSize4(8)
    expect(xPosition3).toBe(0)
    const xPosition4 = getXPositionGridSize4(19)
    expect(xPosition4).toBe(3)
    const xPosition5 = getXPositionGridSize4(4)
    expect(xPosition5).toBe(0)
  })
  it('gets y position based on index', () => {
    const getYPositionGridSize4 = getYPosition(4)
    const yPosition1 = getYPositionGridSize4(1)
    expect(yPosition1).toBe(0)
    const yPosition2 = getYPositionGridSize4(2)
    expect(yPosition2).toBe(0)
    const yPosition3 = getYPositionGridSize4(5)
    expect(yPosition3).toBe(1)
    const yPosition4 = getYPositionGridSize4(19)
    expect(yPosition4).toBe(4)
    const yPosition5 = getYPositionGridSize4(4)
    expect(yPosition5).toBe(1)
  })
})

describe('puzzlePieceCanBeMoved', () => {
  const puzzlePieceCanBeMovedWithMockPieces = puzzlePieceCanBeMoved(
    mockPuzzlePieces
  )
  it('returns false when piece is empty', () => {
    expect(puzzlePieceCanBeMovedWithMockPieces(mockPuzzlePieces[14])).toBe(true)
    expect(puzzlePieceCanBeMovedWithMockPieces(mockPuzzlePieces[11])).toBe(true)
  })
  it('returns false when piece is empty', () => {
    expect(puzzlePieceCanBeMovedWithMockPieces(mockPuzzlePieces[15])).toBe(
      false
    )
  })
  it('returns false when piece is not adjacent on x or y axis', () => {
    expect(puzzlePieceCanBeMovedWithMockPieces(mockPuzzlePieces[10])).toBe(
      false
    )
  })
  it('returns false when piece is more than one grid tile away', () => {
    expect(puzzlePieceCanBeMovedWithMockPieces(mockPuzzlePieces[13])).toBe(
      false
    )
  })
})

describe('movePuzzlePiece', () => {
  const movePuzzlePieceWithPieces = movePuzzlePiece(mockPuzzlePieces)
  expect(movePuzzlePieceWithPieces(mockPuzzlePieces[14])).toEqual([
    { empty: false, puzzlePieceNumber: 1, x: 0, y: 0 },
    { empty: false, puzzlePieceNumber: 2, x: 1, y: 0 },
    { empty: false, puzzlePieceNumber: 3, x: 2, y: 0 },
    { empty: false, puzzlePieceNumber: 4, x: 3, y: 0 },
    { empty: false, puzzlePieceNumber: 5, x: 0, y: 1 },
    { empty: false, puzzlePieceNumber: 6, x: 1, y: 1 },
    { empty: false, puzzlePieceNumber: 7, x: 2, y: 1 },
    { empty: false, puzzlePieceNumber: 8, x: 3, y: 1 },
    { empty: false, puzzlePieceNumber: 9, x: 0, y: 2 },
    { empty: false, puzzlePieceNumber: 10, x: 1, y: 2 },
    { empty: false, puzzlePieceNumber: 11, x: 2, y: 2 },
    { empty: false, puzzlePieceNumber: 12, x: 3, y: 2 },
    { empty: false, puzzlePieceNumber: 13, x: 0, y: 3 },
    { empty: false, puzzlePieceNumber: 14, x: 1, y: 3 },
    { empty: true, x: 2, y: 3 },
    { empty: false, x: 3, y: 3, puzzlePieceNumber: 15 }
  ])
})
