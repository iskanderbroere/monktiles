import { gameIsWon } from '@/puzzleHelpers'

export default {
  gameIsWon(state) {
    return gameIsWon(state.puzzlePieces)
  }
}
