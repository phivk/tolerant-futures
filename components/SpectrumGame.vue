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
      <CardItem :is-present-card="false">{{ currentTurn.object }}</CardItem>
    </DraggableItem>
    <ModalPlayerFeedback v-if="turnValue !== null && isTurnConfirmed" class="spectrum-game-feedback-modal"/>

    <TheFooter>

      <ButtonPrimary
        class="mb4"
        v-if="turnValue !== null && !isTurnConfirmed"
        @buttonClicked="onConfirmTurn"
      >
        Confirm
      </ButtonPrimary>


<!--       <div v-if="turnValue !== null && hasNextTurn && isTurnConfirmed" class="mb4">
        <ButtonPrimary
          v-if="turnValue !== null && hasNextTurn"
          @buttonClicked="onNextTurn"
        >
          Next Turn
        </ButtonPrimary>
        <p>current turn's value: {{ turnValue }}</p>
      </div> -->


      <NuxtLink
        v-if="!hasNextTurn && turnValue !== null"
        class="link-primary mb5"
        :to="nextPath"
        @click.native="onNextChapter"
      >
        Next Chapter
      </NuxtLink>
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
      isTurnConfirmed: false,
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
    onConfirmTurn() {
      this.isTurnConfirmed = true
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

.spectrum-game-feedback-modal {
  left: 50%;
  top: 50%;
  transform:translate(-50%,-50%);
}
</style>
