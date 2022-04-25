<template>
  <GameContainer>
    <div class="w-100 flex justify-between ph3 pt3">
      <ChapterProgressionList />
      <ButtonExitGame />
    </div>
    <DropZone>
      <DropZoneName>{{ currentTurn.spectrum_left }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrum_right }}</DropZoneName>
      <DropZoneBackground gradient-style="gradient-1" />
    </DropZone>
    <DraggableItem ref="draggableItem" class="bottom-2" @set-value="onSetValue">
      <CardItem :is-present-card="false">{{ currentTurn.object }}</CardItem>
    </DraggableItem>
    <TheFooter>
      <p>{{ currentTurn.caption }}</p>
      <div v-if="turnValue !== null && hasNextTurn">
        <p>current turn's value: {{ turnValue }}</p>
        <ButtonPrimary
          v-if="turnValue !== null && hasNextTurn"
          button-text="Hello"
          @buttonClicked="onNextTurn"
        >
          Next Turn
        </ButtonPrimary>
      </div>
      <NuxtLink
        v-if="!hasNextTurn && turnValue !== null"
        class="bg-white purple"
        :to="nextPath"
        @click.native="onNextChapter"
      >
        Next Chapter
      </NuxtLink>
    </TheFooter>
    <SubtitlePlayer/>
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
