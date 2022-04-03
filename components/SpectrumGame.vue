<template>
  <section class="w-100 h-100 relative flex flex-column items-center">
    <DropZone class="w-100 h-25 flex justify-between items-center">
      <span class="dib f1">{{ turns[turnIndex].spectrum[0] }}</span>
      <span class="dib f1">{{ turns[turnIndex].spectrum[1] }}</span>
    </DropZone>
    <DraggableItem class="bottom-0">
      <CardItem>{{ turns[turnIndex].object }}</CardItem>
    </DraggableItem>
    <div>
      <button v-if="hasNextTurn" @click="incrementTurnIndex">Next Turn</button>
      <button v-else @click="onNextChapterClick">Next Chapter</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    turns: {
      type: Array,
      required: true,
      default: null,
    },
    nextPath: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      turnIndex: 0,
    }
  },
  computed: {
    hasNextTurn() {
      return this.turnIndex < this.turns.length - 1
    },
  },
  methods: {
    incrementTurnIndex() {
      if (this.hasNextTurn) {
        this.turnIndex++
      }
    },
    onNextChapterClick() {
      this.$router.push({
        path: this.nextPath,
      })
    },
  },
}
</script>
