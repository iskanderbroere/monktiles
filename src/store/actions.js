import { puzzlePieceCanBeMoved } from '@/puzzleHelpers'

export default {
  /**
   * Check if puzzle piece can be moved
   * @param {*} context Vuex context https://vuex.vuejs.org/api/#actions
   * @param {*} puzzlePieceToMove the puzzle piece clicked by the user
   */
  clickPuzzlePiece({ commit, state }, puzzlePieceToMove) {
    if (!puzzlePieceCanBeMoved(state.puzzlePieces, puzzlePieceToMove)) return
    commit('movePuzzlePiece', puzzlePieceToMove)
    commit('incrementStep')
  }
}
