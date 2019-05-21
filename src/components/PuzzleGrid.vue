<template>
  <ol :class="$style.puzzle_grid" :style="style">
    <slot />
  </ol>
</template>

<script>
export default {
  props: {
    gridSize: {
      type: Number,
      default: 4
    }
  },
  computed: {
    style() {
      // todo - better name
      const gridRepeat = `repeat(${this.gridSize}, 1fr)`

      return {
        'grid-template-columns': gridRepeat,
        'grid-template-rows': gridRepeat
      }
    }
  }
}
</script>

<style module>
.puzzle_grid {
  display: grid;
  list-style: none;
  padding: 0;
  width: 750px;
  height: 750px;
  margin: 0 auto;
  background-image: url('@/assets/monks.jpg');
  background-size: cover;
}
</style>
