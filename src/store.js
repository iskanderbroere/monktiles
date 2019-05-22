import Vue from 'vue'
import Vuex from 'vuex'
import { map, omit, find } from 'ramda'
import { createPuzzlePieces } from '@/puzzleHelpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    steps: 0,
    puzzleGridItems: []
  },
  mutations: {
    /**
     * Start the puzzle with randomized puzzle pieces
     */
    startPuzzle(state) {
      const puzzlePieces = createPuzzlePieces()
      state.puzzleGridItems = puzzlePieces
    },
    /**
     * Move a puzzle piece to the empty puzzle piece spot
     * @param {*} state Vuex state
     * @param {*} puzzlePiece The puzzle piece to move
     */
    movePuzzlePiece(state, { puzzlePieceNumber }) {
      state.puzzleGridItems = map(puzzleGridItem => {
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
      }, state.puzzleGridItems)
    },
    /**
     * Increment the step count in state
     */
    incrementStep(state) {
      state.steps++
    }
  },
  actions: {
    /**
     * Check if puzzle piece can be moved
     * @param {*} context Vuex context https://vuex.vuejs.org/api/#actions
     * @param {*} puzzlePieceToMove the puzzle piece clicked by the user
     */
    clickPuzzlePiece({ commit, state }, puzzlePieceToMove) {
      const { empty, x, y } = puzzlePieceToMove

      // empty puzzle piece is clicked
      if (empty) return

      // find the position of the empty puzzle piece in state
      const { x: emptyX, y: emptyY } = find(
        ({ empty }) => empty,
        state.puzzleGridItems
      )
      const xDelta = emptyX - x
      const yDelta = emptyY - y

      // clicked puzzle piece is not adjacent on either x or y axis
      if (yDelta !== 0 && xDelta !== 0) return

      // clicked puzzle piece is more than one grid tile away
      if (yDelta > 1 || xDelta > 1) return

      commit('movePuzzlePiece', puzzlePieceToMove)
      commit('incrementStep')
    }
  }
})
