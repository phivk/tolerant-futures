<template>
  <GameContainer v-if="currentTurn">
    <div class="w-100 flex justify-between ph3 pt3">
      <ChapterProgressionList />
      <ButtonExitGame />
    </div>
    <DropZone class="spectrum-game-dropzone">
      <DropZoneName>{{ currentTurn.spectrumLeft }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrumRight }}</DropZoneName>
      <DropZoneBackground gradient-style="gradient-1" />
    </DropZone>
    <DraggableItem
      ref="draggableItem"
      class="spectrum-game-draggable"
      @set-value="onSetValue"
    >
      <CardItem>{{ currentTurn.concept }}</CardItem>
    </DraggableItem>
    <DraggableItem
      v-show="showPresent"
      ref="draggableItemPresent"
      class="spectrum-game-draggable"
      @set-value="onSetValuePresent"
    >
      <CardItem is-present-card>
        {{ currentTurn.conceptPresent }}
      </CardItem>
    </DraggableItem>
    <ModalPlayerFeedback
      v-show="requirePlayerFeedback && turnValuePresentConfirmed"
      class="spectrum-game-feedback-modal"
      input-placeholder-text="I placed the card here because..."
      @feedbackSubmitted="onFeedbackSubmitted"
      @feedbackSkipped="onFeedbackSkipped"
    />

    <TheFooter>
      <div class="mb4">
        <ButtonPrimary
          v-if="hasTurnValueToConfirm"
          @buttonClicked="onTurnConfirm"
        >
          Confirm
        </ButtonPrimary>
        <ButtonPrimary
          v-if="hasTurnValuePresentToConfirm"
          @buttonClicked="onTurnPresentConfirm"
        >
          Confirm
        </ButtonPrimary>
      </div>
      <SubtitlePlayer v-show="!showPresent" class="mb3">
        {{ currentTurn.caption }}
      </SubtitlePlayer>
      <SubtitlePlayer v-show="showPresent" class="mb3">
        {{ currentTurn.captionPresent }}
      </SubtitlePlayer>
    </TheFooter>
  </GameContainer>
</template>

<script>
export default {
  props: {
    turns: {
      type: Array,
      required: true,
      default: () => [],
    },
    nextPath: {
      type: String,
      required: true,
      default: null,
    },
    requirePlayerFeedback: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      turnIndex: 0,
      turnValue: null,
      turnValueConfirmed: false,
      turnValuePresent: null,
      turnValuePresentConfirmed: false,
      showPresent: false,
    }
  },
  computed: {
    hasNextTurn() {
      return this.turnIndex < this.turns.length - 1
    },
    currentTurn() {
      return this.turns[this.turnIndex]
    },
    hasPresent() {
      return Object.prototype.hasOwnProperty.call(
        this.currentTurn,
        'conceptPresent'
      )
    },
    hasTurnValueToConfirm() {
      return this.turnValue !== null && !this.turnValueConfirmed
    },
    hasTurnValuePresentToConfirm() {
      return this.turnValuePresent !== null && !this.turnValuePresentConfirmed
    },
  },
  methods: {
    onTurnConfirm() {
      this.turnValueConfirmed = true
      if (this.hasPresent) {
        this.showPresent = true
      } else {
        this.endTurn()
      }
    },
    onTurnPresentConfirm() {
      this.turnValuePresentConfirmed = true
      if (!this.requirePlayerFeedback) {
        this.endTurn()
      }
    },
    onFeedbackSkipped() {
      this.endTurn()
    },
    onFeedbackSubmitted(e) {
      // const feedbackData = e;
      this.endTurn()
    },

    endTurn() {
      // store input
      this.currentTurn.value = this.turnValue
      this.currentTurn.valuePresent = this.turnValuePresent
      this.submitInput(this.currentTurn)

      // advance game
      if (this.hasNextTurn) {
        // reset for next turn
        this.reset()
        // next turn
        this.turnIndex++
      } else {
        // next chapter
        this.$router.push(this.nextPath)
      }
    },
    reset() {
      this.turnValue = null
      this.turnValuePresent = null
      this.turnValueConfirmed = false
      this.turnValuePresentConfirmed = false
      this.$refs.draggableItem.resetPosition()
      this.$refs.draggableItemPresent.resetPosition()
      this.showPresent = false
    },
    onSetValue(value) {
      this.turnValue = value
    },
    onSetValuePresent(value) {
      this.turnValuePresent = value
    },
    async submitInput(currentTurn) {
      await this.$supabase
        .from('spectrumInput')
        .insert([
          {
            concept: currentTurn.concept,
            conceptPresent: currentTurn.conceptPresent,
            value: currentTurn.value,
            valuePresent: currentTurn.valuePresent,
            spectrumLeft: currentTurn.spectrumLeft,
            spectrumRight: currentTurn.spectrumRight,
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
  transform: translate(-50%, -50%);
}
</style>
