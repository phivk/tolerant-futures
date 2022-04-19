<template>
  <GameContainer>
    <div class="w-100 flex justify-between ph3 pt3">
      <ChapterProgressionList/>
      <ExitGameButton/>
    </div>
    <DropZone>
      <DropZoneName>{{ currentTurn.spectrum[0] }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrum[1] }}</DropZoneName>
      <DropZoneBackground gradient-style="gradient-1" />
    </DropZone>
    <DraggableItem ref="draggableItem" class="bottom-2" @set-value="onSetValue">
      <CardItem :is-present-card="false">{{ currentTurn.object }}</CardItem>
    </DraggableItem>
    <TheFooter>
      <div v-if="turnValue !== null && hasNextTurn">
        <p>current turn's value: {{ turnValue }}</p>
        <MainButton v-if="turnValue !== null && hasNextTurn" button-text="Hello" @buttonClicked="onNextTurn">
          Next Turn
        </MainButton>         
      </div>
      <NuxtLink
        v-if="!hasNextTurn && turnValue !== null"
        class="bg-white purple"
        :to="nextPath"
      >
        Next Chapter
      </NuxtLink>
      <SubtitlePlayer>{{ currentTurn.caption }}</SubtitlePlayer>
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
      turnData: [],
    }
  },
  computed: {
    hasNextTurn() {
      return this.turnIndex < this.turns.length - 1
    },
    currentTurn() {
      return this.turns[this.turnIndex]
    },
  },
  methods: {
    onNextTurn() {
      // store input
      this.currentTurn.value = this.turnValue
      this.turnData.push(this.currentTurn)

      // reset for next turn
      this.turnValue = null
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
