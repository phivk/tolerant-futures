<template>
  <GameContainer v-if="currentTurn">
    <header>
      <div class="w-100 flex justify-between ph3 pt3">
        <ChapterProgressionList :current-chapter-index="currentChapterIndex" />
        <ButtonExitGame />
      </div>
      <SubtitlePlayer v-show="!showPresent">
        {{ currentTurn.caption }}
      </SubtitlePlayer>
      <SubtitlePlayer v-show="showPresent && !turnValuePresentConfirmed">
        {{ currentTurn.captionPresent }}
      </SubtitlePlayer>
      <SubtitlePlayer
        v-show="requirePlayerFeedback && turnValuePresentConfirmed"
        class="feedback-modal-subtitles"
      >
        Please finish the sentence below
      </SubtitlePlayer>
    </header>
    <DropZone 
      @set-can-drop="onIsCardOnDropzone"
      class="spectrum-game-dropzone">
      <DropZoneName>{{ currentTurn.spectrumLeft }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrumRight }}</DropZoneName>
      <DropZoneBackground
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        :draggable-state="draggableState"
      />
    </DropZone>
    <DraggableItem
      ref="draggableItem"
      class="spectrum-game-draggable"
      :dragging-disabled="turnValueConfirmed"
      @set-drag-state="onSetDraggableState"
      @set-value="onSetValue"
    >
      <CardItem
        :value="turnValue"
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        :draggable-state="draggableState"
        :can-drop-on-drop-zone="isCardOnDropzone"
        class="self-card"
        >{{ currentTurn.concept }}</CardItem
      >
    </DraggableItem>
    <DraggableItem
      v-show="showPresent"
      ref="draggableItemPresent"
      class="spectrum-game-draggable"
      @set-value="onSetValuePresent"
      @set-drag-state="onSetDraggableState"      
    >
      <CardItem
        :value="turnValuePresent"
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        :draggable-state="draggableState"        
        class="self-card"
      >
        {{ currentTurn.conceptPresent }}
      </CardItem>
    </DraggableItem>
    <ModalPlayerFeedback
      v-show="requirePlayerFeedback && turnValuePresentConfirmed"
      class="spectrum-game-feedback-modal"
      :input-placeholder-text="feedbackInputPlaceholderText"
      @feedbackSubmitted="onFeedbackSubmitted"
      @feedbackSkipped="onFeedbackSkipped"
    />
    <TheFooter>
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
      <ButtonSecondary
        v-show="showConceptHints && !showHint && hasHint"
        @buttonClicked="onHintRequest"
      >
        Not familiar with {{ currentTurn.concept }}?
      </ButtonSecondary>
      <SubtitlePlayer
        v-show="showConceptHints && showHint"
        class="subtitle-player-concept-hint"
      >
        {{ currentTurn.hint }}
      </SubtitlePlayer>
    </TheFooter>
  </GameContainer>
</template>

<script>
export default {
  props: {
    currentChapterIndex: {
      type: Number,
      required: true,
      default: null,
    },
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
    showConceptHints: {
      type: Boolean,
      default: true,
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
      showHint: false,
      feedback: null,
      draggableState: "placed",
      isCardOnDropzone: false,
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
    hasHint() {
      return Object.prototype.hasOwnProperty.call(this.currentTurn, 'hint')
    },
    feedbackInputPlaceholderText() {
      return `I placed ${this.currentTurn.concept} here because `
    },
  },
  methods: {
    onTurnConfirm() {
      this.turnValueConfirmed = true
      this.currentTurn.value = this.turnValue
      if (this.hasPresent) {
        this.showPresent = true
      } else {
        this.endTurn()
      }
    },
    onTurnPresentConfirm() {
      this.turnValuePresentConfirmed = true
      this.currentTurn.valuePresent = this.turnValuePresent

      if (!this.requirePlayerFeedback) {
        this.endTurn()
      }
    },
    onFeedbackSkipped() {
      this.endTurn()
    },
    onFeedbackSubmitted(feedbackText) {
      this.feedback = feedbackText
      this.currentTurn.feedback = feedbackText
      this.endTurn()
    },
    onHintRequest() {
      this.showHint = true
    },
    endTurn() {
      // emit input to be stored
      this.$emit('submit-input', this.currentTurn)

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
      this.feedback = null
      this.showHint = false
    },
    onSetValue(value) {
      this.turnValue = value
    },
    onIsCardOnDropzone(boolean) {
      this.isCardOnDropzone = boolean;
    },
    onSetDraggableState(state) {
      this.draggableState = state;
    },
    onSetValuePresent(value) {
      this.turnValuePresent = value
    },
  },
}
</script>

<style scoped lang="scss">
header {
  width: 100%;
  z-index: $z-5;

  .subtitle-player {
    margin-top: $offset-4;
    z-index: $z-5;

    &.feedback-modal-subtitles {
      margin-top: $offset-6;
    }
  }
}

.spectrum-game-dropzone {
  top: 50%;
  transform: translateY(-60%);
}

.spectrum-game-draggable {
  bottom: 10%;
  z-index: $z-5;
}

.spectrum-game-feedback-modal {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

footer {
  margin-bottom: $offset-3;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: $z-5;

  .button-primary {
    margin-bottom: $offset-5;
  }

  .subtitle-player.subtitle-player-concept-hint {
    font-size: $f-4;
    line-height: $f-3;
  }
}
</style>
