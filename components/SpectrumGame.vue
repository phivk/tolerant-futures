<template>
  <GameContainer>
    <div class="w-100 flex justify-between ph3 pt3">
      <ChapterProgressionList />
      <ButtonExitGame />
    </div>
    <DropZone class="spectrum-game-dropzone">
      <DropZoneName>{{ currentTurn.spectrum_left }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrum_right }}</DropZoneName>
      <DropZoneBackground gradient-style="gradient-1" />
    </DropZone>
    <DraggableItem
      ref="draggableItem"
      class="spectrum-game-draggable"
      @set-value="onSetValue"
    >
      <CardItem>{{ currentTurn.concept }}</CardItem>
    </DraggableItem>
    <TheFooter>
      <div v-if="turnValue !== null" class="mb4">
        <ButtonPrimary v-if="hasNextTurn" @buttonClicked="onNextTurn">
          Next Turn
        </ButtonPrimary>
        <NuxtLink
          v-else
          class="link-primary mb5"
          :to="nextPath"
          @click.native="onNextChapter"
        >
          Next Chapter
        </NuxtLink>
      </div>
      <SubtitlePlayer class="mb3">{{ currentTurn.caption }}</SubtitlePlayer>
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
      this.submitInput(this.currentTurn)

      // reset for next turn
      this.turnValue = null
      this.$refs.draggableItem.resetPosition()

      // increment turnIndex
      if (this.hasNextTurn) {
        this.turnIndex++
      }
    },
    onNextChapter() {
      // store input
      this.currentTurn.value = this.turnValue
      this.submitInput(this.currentTurn)
    },
    onSetValue(value) {
      this.turnValue = value
    },
    async submitInput(currentTurn) {
      await this.$supabase
        .from('spectrumInput')
        .insert([
          {
            object: currentTurn.object,
            spectrum_left: currentTurn.spectrum_left,
            spectrum_right: currentTurn.spectrum_right,
            value: currentTurn.value,
            chapter: this.$store.state.currentChapter,
            user: this.$store.state.user,
          },
        ])
        .single()
    },
  },
}
</script>

<style scoped lang="scss">
.spectrum-game-dropzone {
  top: 50%;
  transform: translateY(-60%);
}

.spectrum-game-draggable {
  bottom: 10%;
}
</style>
