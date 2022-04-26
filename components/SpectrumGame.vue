<template>
  <GameContainer>
    <div class="w-100 flex self-start justify-between ph3 pt3">
      <ChapterProgressionList />
      <ButtonExitGame />
    </div>
    <DropZone>
      <DropZoneName>{{ currentTurn.spectrum_left }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrum_right }}</DropZoneName>
      <DropZoneBackground gradient-style="gradient-1" />
    </DropZone>
    <div class="flex flex-column items-center static">
      <DraggableItem ref="draggableItem" @set-value="onSetValue">
        <CardItem :is-present-card="false">{{ currentTurn.object }}</CardItem>
      </DraggableItem>
      <TheFooter>
        <div class="mb4"
  v-if="turnValue !== null && hasNextTurn">
          <ButtonPrimary 
            v-if="turnValue !== null && hasNextTurn"
            @buttonClicked="onNextTurn">
            Next Turn
          </ButtonPrimary>
          <p>current turn's value: {{ turnValue }}</p>        
        </div>
        <NuxtLink
          v-if="!hasNextTurn && turnValue !== null"
          class="link-primary mb4"
          :to="nextPath"
          @click.native="onNextChapter"
        >
          Next Chapter
        </NuxtLink>
        <SubtitlePlayer class="mb3">{{ currentTurn.caption }}</SubtitlePlayer>
      </TheFooter>
    </div>
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
