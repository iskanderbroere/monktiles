import { createPuzzlePieces, movePuzzlePiece } from '@/puzzleHelpers'

export default {
  /**
   * Start the puzzle with randomized puzzle pieces
   */
  startPuzzle(state) {
    const puzzlePieces = createPuzzlePieces()
    state.puzzlePieces = puzzlePieces
  },
  /**
   * Move a puzzle piece to the empty puzzle piece spot
   * @param {*} state Vuex state
   * @param {*} puzzlePiece The puzzle piece to move
   */
  movePuzzlePiece(state, puzzlePiece) {
    state.puzzlePieces = movePuzzlePiece(state.puzzlePieces, puzzlePiece)
  },
  /**
   * Increment the step count in state
   */
  incrementStep(state) {
    state.steps++
  }
}
