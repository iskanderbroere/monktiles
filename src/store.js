import Vue from 'vue'
import Vuex from 'vuex'
import { map, concat, omit, find } from 'ramda'
import { puzzlePieces as randomPuzzlePieces, gridSize } from '@/constants'
import { getYPosition, getXPosition, mapIndexed } from '@/utils'
import { shuffle } from 'lodash-es'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    steps: 0,
    puzzleGridItems: []
  },
  mutations: {
    startPuzzle(state) {
      const shuffledPuzzlePieces = shuffle(randomPuzzlePieces)
      // todo - better name
      const puzzlePieces = mapIndexed((puzzlePiece, index) => {
        return {
          puzzlePieceNumber: puzzlePiece,
          empty: false,
          x: getXPosition(index),
          y: getYPosition(index)
        }
      }, shuffledPuzzlePieces)
      const puzzlePiecesObjectWithEmptyPiece = concat(puzzlePieces, [
        {
          empty: true,
          // last place in grid
          x: gridSize - 1,
          y: gridSize - 1
        }
      ])
      state.puzzleGridItems = puzzlePiecesObjectWithEmptyPiece
    },
    movePuzzlePiece(state, { empty, puzzlePieceNumber, x, y }) {
      if (empty) return

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

      state.puzzleGridItems = map(puzzleGridItem => {
        if (puzzleGridItem.puzzlePieceNumber === puzzlePieceNumber) {
          return {
            ...omit(['puzzlePieceNumber'], puzzleGridItem),
            empty: true
          }
        }
        if (puzzleGridItem.empty) {
          return {
            ...puzzleGridItem,
            puzzlePieceNumber,
            empty: false
          }
        }
        return puzzleGridItem
      }, state.puzzleGridItems)
    }
  }
})
