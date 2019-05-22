import { mapPositionToPuzzlePieces } from '@/puzzleHelpers'

describe('createPuzzlePieces', () => {
  it('creates puzzle pieces', () => {
    const shuffledPuzzlePieces = [1, 2, 3, 4]
    const puzzlePieces = mapPositionToPuzzlePieces(shuffledPuzzlePieces)
    expect(puzzlePieces).toStrictEqual([
      { puzzlePieceNumber: 1, empty: false, x: 0, y: 0 },
      { puzzlePieceNumber: 2, empty: false, x: 1, y: 0 },
      { puzzlePieceNumber: 3, empty: false, x: 2, y: 0 },
      { puzzlePieceNumber: 4, empty: false, x: 3, y: 0 },
      { empty: true, x: 3, y: 3 }
    ])
  })
})
