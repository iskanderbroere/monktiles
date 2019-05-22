<template>
  <div id="app" :class="$style.app">
    <PuzzleGrid :grid-size="gridSize">
      <template v-for="puzzleGridItem in puzzleGridItems">
        <transition
          name="fade"
          mode="out-in"
          :key="puzzleGridItem.puzzlePieceNumber"
        >
          <PuzzleGridItem
            @click="clickPuzzlePiece(puzzleGridItem)"
            v-if="!puzzleGridItem.empty"
            v-bind="puzzleGridItem"
          />
          <div v-else></div>
        </transition>
      </template>
    </PuzzleGrid>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { gridSize } from '@/constants'
import PuzzleGrid from '@/components/PuzzleGrid.vue'
import PuzzleGridItem from '@/components/PuzzleGridItem.vue'

export default {
  name: 'app',
  components: {
    PuzzleGrid,
    PuzzleGridItem
  },
  computed: mapState(['puzzleGridItems', 'steps']),
  methods: {
    ...mapMutations(['startPuzzle']),
    ...mapActions(['clickPuzzlePiece'])
  },
  created() {
    this.gridSize = gridSize
    this.startPuzzle()
  }
}
</script>

<style module>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
