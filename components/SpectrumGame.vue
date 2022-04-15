<template>
  <GameContainer class="white">
    <div class="w-100 flex justify-between ph3">
      <ChapterProgressionList />
      <ExitGameButton />
    </div>
    <DropZone>
      <DropZoneName>{{ turns[turnIndex].spectrum[0] }}</DropZoneName>
      <DropZoneName>{{ turns[turnIndex].spectrum[1] }}</DropZoneName>
      <DropZoneBackground gradient-style="gradient-1" />
    </DropZone>
    <DraggableItem ref="draggableItem" class="bottom-2" @set-value="onSetValue">
      <CardItem :is-present-card="false">{{
        turns[turnIndex].object
      }}</CardItem>
    </DraggableItem>
    <TheFooter>
      <p>{{ turns[turnIndex].caption }}</p>
      <div v-if="turnValue !== null && hasNextTurn">
        <p>current turn's value: {{ turnValue }}</p>
        <button @click="onNextTurn">Next Turn</button>
      </div>
      <NuxtLink v-if="!hasNextTurn" class="bg-white purple" :to="nextPath">
        Next Chapter
      </NuxtLink>
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
