<template>
  <li
    @click.prevent="$emit('click')"
    :class="$style.puzzle_grid_item"
    :style="style"
  >
    <h1 :class="$style.puzzle_grid_item_number">{{ { x, y } }}</h1>
  </li>
</template>

<script>
export default {
  props: {
    puzzlePieceNumber: {
      type: Number,
      default: 1
    },
    y: {
      type: Number,
      required: true
    },
    x: {
      type: Number,
      required: true
    }
  },
  computed: {
    style() {
      return {
        'background-image': `url(${require(`@/assets/parts/${
          this.puzzlePieceNumber
        }.jpg`)}`,
        'grid-column': `${this.x + 1} / span 1`,
        'grid-row': `${this.y + 1} / span 1`
      }
    }
  }
}
</script>

<style lang="postcss" module>
.puzzle_grid_item {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  background-size: cover;
  border: 1px dashed white;
  border-radius: 5px;
}
.puzzle_grid_item_number {
  color: white;
  margin: 20px;
}
</style>
