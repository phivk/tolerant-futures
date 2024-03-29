<template>
  <GameContainer
    v-if="currentTurn"
    :current-chapter-index="currentChapterIndex"
    @clicked="onGameContainerClick"
  >
    <header class="mt4">
      <SubtitlePlayer v-show="!showPresent">
        {{ currentState.caption }}
      </SubtitlePlayer>
    </header>
    <DropZone class="spectrum-game-dropzone" @set-can-drop="onIsCardOnDropzone">
      <DropZoneName class="dropzone-name-left">{{
        currentTurn.spectrumLeft
      }}</DropZoneName>
      <DropZoneName class="dropzone-name-right">{{
        currentTurn.spectrumRight
      }}</DropZoneName>
      <DropZoneBackground
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        :draggable-state="currentDraggableState"
      />
    </DropZone>
    <!-- Present Concept Card -->
    <DraggableItem
      v-show="currentState.elementsVisible.presentCard"
      ref="draggableItemPresent"
      class="spectrum-game-draggable"
      :dragging-disabled="turnValuePresentConfirmed"
      @set-drag-state="onSetPresentDraggableState"
      @set-value="onSetValuePresent"
    >
      <CardItem
        :value="turnValuePresent"
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        :draggable-state="draggablePresentState"
        :can-drop-on-drop-zone="isCardOnDropzone"
        class="present-card"
      >
        {{ currentTurn.conceptPresent }}
      </CardItem>
    </DraggableItem>
    <!-- Past Concept Card -->
    <DraggableItem
      v-show="currentState.elementsVisible.pastCard"
      ref="draggableItem"
      class="spectrum-game-draggable"
      :dragging-disabled="turnValuePastConfirmed"
      @set-drag-state="onSetPastDraggableState"
      @set-value="onSetValuePast"
    >
      <CardItem
        :value="turnValuePast"
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        :draggable-state="draggablePastState"
        :can-drop-on-drop-zone="isCardOnDropzone"
        class="past-card"
        >{{ currentTurn.concept }}</CardItem
      >
    </DraggableItem>
    <ModalContainer>
      <ModalPlayerFeedback
        v-show="currentState.elementsVisible.feedbackModal"
        class="spectrum-game-feedback-modal"
        :input-placeholder-text="feedbackInputPlaceholderText"
        @feedbackSubmitted="onFeedbackSubmitted"
        @feedbackSkipped="onFeedbackSkipped"
      />
    </ModalContainer>
    <TheFooter>
      <span v-if="currentState.buttonPrimary">
        <ButtonPrimary
          v-show="currentState.buttonPrimary.visible"
          @buttonClicked="currentState.buttonPrimary.handler"
        >
          {{ currentState.buttonPrimary.text }}
        </ButtonPrimary>
      </span>
      <span v-if="currentState.buttonSecondary">
        <ButtonSecondary
          v-show="currentState.buttonSecondary.visible"
          @buttonClicked="currentState.buttonSecondary.handler"
        >
          {{ currentState.buttonSecondary.text }}
        </ButtonSecondary>
      </span>
      <SubtitlePlayer
        v-show="currentState.elementsVisible.hint"
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
      turnValuePast: null,
      turnValuePastConfirmed: false,
      turnValuePresent: null,
      turnValuePresentConfirmed: false,
      showPresent: false,
      showHint: false,
      feedback: null,
      currentStateKey: 'inputPresent',
      draggablePresentState: 'placed',
      draggablePastState: 'placed',
      isCardOnDropzone: false,
    }
  },
  computed: {
    states() {
      return {
        inputPresent: {
          name: 'inputPresent',
          caption: `Where would you place ${this.currentTurn.conceptPresent} on this spectrum?`,
          buttonPrimary: {
            text: 'Confirm',
            visible: this.hasTurnValuePresentToConfirm,
            handler: this.onTurnPresentConfirm,
          },
          elementsVisible: {
            presentCard: true,
            hint: this.showHint,
          },
        },
        inputPast: {
          name: 'inputPast',
          caption: `Our research shows that ${this.currentTurn.conceptPresent} is often associated with ${this.currentTurn.concept}. Where would you place this card on the spectrum?`,
          buttonPrimary: {
            text: 'Confirm',
            visible: this.hasTurnValuePastToConfirm,
            handler: this.onTurnPastConfirm,
          },
          buttonSecondary: {
            text: `Not familiar with ${this.currentTurn.concept}?`,
            visible: !this.showHint,
            handler: this.onHintRequest,
          },
          elementsVisible: {
            presentCard: true,
            pastCard: true,
            hint: this.showHint,
          },
        },
        feedbackPast: {
          name: 'feedbackPast',
          caption: 'Please finish the sentence below',
          elementsVisible: {
            presentCard: true,
            pastCard: true,
            feedbackModal: true,
          },
        },
      }
    },
    currentState() {
      return this.states[this.currentStateKey]
    },
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
    hasTurnValuePastToConfirm() {
      return this.turnValuePast !== null && !this.turnValuePastConfirmed
    },
    hasTurnValuePresentToConfirm() {
      return this.turnValuePresent !== null && !this.turnValuePresentConfirmed
    },
    hasHint() {
      return Object.prototype.hasOwnProperty.call(this.currentTurn, 'hint')
    },
    feedbackInputPlaceholderText() {
      return `I placed ${this.currentTurn.concept} here because ...`
    },
    currentDraggableState() {
      if (this.turnValuePresentConfirmed) {
        return this.draggablePastState
      } else {
        return this.draggablePresentState
      }
    },
  },
  methods: {
    onGameContainerClick(event) {
      if (this.currentState.elementsVisible.feedbackModal) {
        // if click is outside feedback-modal, then hide the virtual keyboard on iPad
        const isFeedbackChild = Boolean(
          event.target.closest('.spectrum-game-feedback-modal')
        )
        if (!isFeedbackChild) {
          document.activeElement.blur()
        }
      }
    },
    onTurnPresentConfirm() {
      this.turnValuePresentConfirmed = true
      this.currentTurn.valuePresent = this.turnValuePresent

      this.currentStateKey = 'inputPast'
    },
    onTurnPastConfirm() {
      this.turnValuePastConfirmed = true
      this.currentTurn.valuePast = this.turnValuePast
      this.currentStateKey = 'feedbackPast'
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
      this.currentStateKey = 'inputPresent'
      this.turnValuePast = null
      this.turnValuePresent = null
      this.turnValuePastConfirmed = false
      this.turnValuePresentConfirmed = false
      this.$refs.draggableItem.resetPosition()
      this.$refs.draggableItemPresent.resetPosition()
      this.showPresent = false
      this.feedback = null
      this.showHint = false
    },
    onIsCardOnDropzone(boolean) {
      this.isCardOnDropzone = boolean
    },
    onSetPresentDraggableState(state) {
      this.draggablePresentState = state
    },
    onSetPastDraggableState(state) {
      this.draggablePastState = state
    },
    onSetValuePast(value) {
      this.turnValuePast = value
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
  z-index: $z-4;
  .subtitle-player {
    margin-top: $offset-4;
    @media (max-width: $query-mobile-landscape) {
      margin-top: $offset-5;
    }
    &.feedback-modal-subtitles {
      margin-top: $offset-6;
      @media (max-width: $query-mobile) {
        margin-top: $offset-8;
      }
    }
  }
}

.spectrum-game-dropzone {
  top: 50%;
  transform: translateY(-60%);
  z-index: $z-4;
}

.spectrum-game-draggable {
  bottom: 10%;
  z-index: $z-5;

  @media (max-width: $query-mobile-landscape) {
    bottom: 15%;
  }
  @media (max-width: $query-mobile-landscape) and (orientation: landscape) {
    bottom: 22%;
  }
}

footer {
  z-index: $z-4;
  margin-bottom: $offset-3;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: $offset-3;

  @media (max-width: $query-mobile-landscape) {
    margin-bottom: calc($offset-4 + 10px);
  }

  .button-primary {
    margin-bottom: $offset-5;

    @media (min-width: $query-mobile) and (max-width: $query-mobile-landscape) and (orientation: landscape) {
      margin-bottom: $offset-3;
    }
  }

  .subtitle-player.subtitle-player-concept-hint {
    font-size: $f-4;
    line-height: $f-4;
    z-index: $z-4;
    margin-bottom: $offset-2;

    @media (max-width: $query-mobile) {
      font-size: $f-5;
      line-height: $f-5;
    }

    @media (max-width: $query-mobile-landscape) and (orientation: landscape) {
      font-size: $f-5;
      line-height: $f-5;
    }
  }
}
</style>
