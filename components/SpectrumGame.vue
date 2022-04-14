<template>
  <GameContainer>
    <div class="w-100 flex justify-between ph3">
      <ChapterProgression/>
      <ExitGameButton/>
    </div>
    <DropZone class="w-100 h-25 flex justify-between items-center">
      <span class="dib f1 headline_font">{{ turns[turnIndex].spectrum[0] }}</span>
      <span class="dib f1">{{ turns[turnIndex].spectrum[1] }}</span>
    </DropZone>
    <DraggableItem ref="draggableItem" class="bottom-2" @set-value="onSetValue">
      <CardItem>{{ turns[turnIndex].object }}</CardItem>
    </DraggableItem>
    <TheFooter>
      <div>current turn's value: {{ turnValue }}</div>
      <button v-if="turnValue !== null && hasNextTurn" @click="onNextTurn">
        Next Turn
      </button>
      <button v-if="!hasNextTurn" @click="onNextChapter">Next Chapter</button>
    </TheFooter>
  </GameContainer>
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
      turnValue: null,
    }
  },
  computed: {
    hasNextTurn() {
      return this.turnIndex < this.turns.length - 1
    },
  },
  methods: {
    onNextTurn() {
      // reset card position
      this.$refs.draggableItem.resetPosition()

      // increment turnIndex
      if (this.hasNextTurn) {
        this.turnIndex++
      }
    },
    onNextChapter() {
      this.$router.push({
        path: this.nextPath,
      })
    },
    onSetValue(value) {
      this.turnValue = value
    },
  },
}
</script>

