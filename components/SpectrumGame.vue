<template>
  <GameContainer>
    <div class="w-100 flex justify-between ph3 pt3">
      <ChapterProgressionList/>
      <ExitGameButton/>
    </div>
    <DropZone>
      <DropZoneName>{{ turns[turnIndex].spectrum[0] }}</DropZoneName>
      <DropZoneName>{{ turns[turnIndex].spectrum[1] }}</DropZoneName>
      <DropZoneBackground gradient-style="gradient-1"/>
    </DropZone>
    <DraggableItem ref="draggableItem" class="bottom-2" @set-value="onSetValue">
      <CardItem :is-present-card="true">{{ turns[turnIndex].object }}</CardItem>
    </DraggableItem>
    <TheFooter>
      <div>current turn's value: {{ turnValue }}</div>
      <MainButton v-if="turnValue !== null && hasNextTurn" button-text="Hello" @buttonClicked="onNextTurn">
        Next Turn
      </MainButton>


      <SecondaryButton v-if="turnValue !== null && hasNextTurn" button-text="Hello" @buttonClicked="onNextTurn">
        Skip
      </SecondaryButton>      
      <button v-if="!hasNextTurn" @click="onNextChapter">Next Chapter</button>
    </TheFooter>
    <SubtitlePlayer />
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

