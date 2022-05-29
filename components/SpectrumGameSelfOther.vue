<template>
  <GameContainer @clicked="onGameContainerClick">
    <header class="mt4">
      <SubtitlePlayer class="mb3">
        {{ currentState.caption }}
      </SubtitlePlayer>
    </header>
    <DropZone
      ref="theDropZone"
      class="spectrum-game-dropzone"
      @set-can-drop="onIsCardOnDropzone"
    >
      <DropZoneName>{{ currentTurn.spectrumLeft }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrumRight }}</DropZoneName>
      <DropZoneBackground
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        :draggable-state="currentDraggableState"
      />
    </DropZone>
    <!-- self -->
    <DraggableItem
      v-show="currentState.elementsVisible.selfCard"
      ref="draggableItemSelf"
      class="spectrum-game-draggable"
      :dragging-disabled="turnValueSelfConfirmed"
      @set-drag-state="onSetSelfDraggableState"
      @set-value="onSetValueSelf"
    >
      <CardItem
        :value="turnValueSelf"
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        :draggable-state="draggableSelfState"
        :can-drop-on-drop-zone="isCardOnDropzone"
        class="self-card"
        >{{ currentTurn.concept }}</CardItem
      >
    </DraggableItem>
    <!-- otherGuess -->
    <DraggableItem
      v-show="currentState.elementsVisible.otherGuessCard"
      ref="draggableItemOther"
      class="spectrum-game-draggable-other"
      :dragging-disabled="turnValueOtherGuessConfirmed"
      @set-drag-state="onSetOtherDraggableState"
      @set-value="onSetValueOther"
    >
      <CardItem
        :value="turnValueOtherGuess"
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        :draggable-state="draggableOtherState"
        :can-drop-on-drop-zone="isCardOnDropzone"
        class="other-card"
      >
        {{ currentTurn.concept }}
      </CardItem>
    </DraggableItem>
    <!-- otherTrue -->
    <CardItem
      v-show="currentState.elementsVisible.otherTrueCard"
      class="o-70 z-5 other-card"
      :color-a="currentTurn.colorA"
      :color-b="currentTurn.colorB"
      :style="otherTrueTranslateStyle"
    >
      {{ currentTurn.concept }}
    </CardItem>
    <!-- feedbackOther -->
    <div v-if="currentTurn.feedbackOther">
      <ModalTextRevealer
        v-show="currentState.elementsVisible.feedbackModalOther"
        class="spectrum-game-feedback-other"
        :text="currentTurn.feedbackOther"
        hint="provide your input to see theirs"
        :is-hidden="feedback === ''"
      />
      <!-- feedbackSelf -->
      <ModalPlayerFeedback
        v-show="currentState.elementsVisible.feedbackModalSelf"
        class="spectrum-game-feedback-modal"
        :input-placeholder-text="feedbackInputPlaceholderText"
        @feedbackSubmitted="onFeedbackSubmitted"
        @feedbackSkipped="onFeedbackSkipped"
      />
      <ModalTextRevealer
        v-show="currentState.elementsVisible.feedbackModalSelfText"
        class="spectrum-game-feedback-modal"
        :text="feedback"
        :is-hidden="false"
      />
    </div>
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
  },
  data() {
    return {
      turnIndex: 0,
      turnValueSelf: null,
      turnValueSelfConfirmed: false,
      turnValueOtherGuess: null,
      turnValueOtherGuessConfirmed: false,
      cardWidth: 300,
      dropzoneWidth: 0,
      diffThreshold: 0.25,
      feedback: '',
      showHint: false,
      currentStateKey: 'inputSelf',
      draggableSelfState: 'placed',
      draggableOtherState: 'placed',
      isCardOnDropzone: false,
    }
  },
  computed: {
    states() {
      return {
        inputSelf: {
          name: 'inputSelf',
          caption: this.currentTurn.caption,
          buttonPrimary: {
            text: 'Confirm your choice',
            visible: this.hasTurnValueSelfToConfirm,
            handler: this.onTurnSelfConfirm,
          },
          buttonSecondary: {
            text: `Not familiar with ${this.currentTurn.concept}?`,
            visible: !this.showHint,
            handler: this.onHintRequest,
          },
          elementsVisible: {
            selfCard: true,
            hint: this.showHint,
          },
        },
        otherGuess: {
          name: 'otherGuess',
          caption: `Where do you think the other visitor placed ${this.currentTurn.concept} on this spectrum?`,
          buttonPrimary: {
            text: 'Confirm your guess',
            visible: this.hasTurnValueOtherGuessToConfirm,
            handler: this.onTurnOtherConfirm,
          },
          elementsVisible: {
            selfCard: true,
            otherGuessCard: true,
            hint: this.showHint,
          },
        },
        otherTrue: {
          name: 'otherTrue',
          caption: this.captionOtherGuessConfirmed,
          buttonPrimary: {
            text: this.currentTurn.feedbackOther
              ? 'See their reasoning'
              : 'Continue',
            visible: true,
            handler: this.currentTurn.feedbackOther
              ? this.onFeedbackRequest
              : this.endTurn,
          },
          buttonSecondary: {
            text: 'Skip',
            visible: this.currentTurn.feedbackOther,
            handler: this.endTurn,
          },
          elementsVisible: {
            selfCard: true,
            otherGuessCard: true,
            otherTrueCard: true,
          },
        },
        giveFeedback: {
          name: 'giveFeedback',
          caption: 'Please provide your reasoning to see theirs.',
          elementsVisible: {
            selfCard: true,
            otherGuessCard: true,
            otherTrueCard: true,
            feedbackModalSelf: true,
            feedbackModalOther: true,
          },
        },
        seeFeedback: {
          name: 'seeFeedback',
          caption: 'This is why they placed it here.',
          buttonPrimary: {
            text: 'Next turn',
            visible: true,
            handler: this.endTurn,
          },
          elementsVisible: {
            selfCard: true,
            otherGuessCard: true,
            otherTrueCard: true,
            feedbackModalSelfText: true,
            feedbackModalOther: true,
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
      return {
        ...this.turns[this.turnIndex],
        turnIndex: this.turnIndex,
      }
    },
    hasTurnValueSelfToConfirm() {
      return this.turnValueSelf !== null && !this.turnValueSelfConfirmed
    },
    hasTurnValueOtherGuessToConfirm() {
      return (
        this.turnValueOtherGuess !== null && !this.turnValueOtherGuessConfirmed
      )
    },
    valueOtherDiff() {
      return this.turnValueOtherGuess - this.currentTurn.valueOther
    },
    otherTrueTranslateStyle() {
      const valueOtherMapped = this.currentTurn.valueOther - 0.5
      const cardTranslation =
        valueOtherMapped * (this.dropzoneWidth - this.cardWidth)
      return {
        transform: `translateX(${cardTranslation}px)`,
      }
    },
    captionOtherGuessConfirmed() {
      return `${
        Math.abs(this.valueOtherDiff) > this.diffThreshold
          ? 'Not quite...'
          : 'Well done!'
      } This is where the other visitor placed ${this.currentTurn.concept}. ${
        this.currentTurn.feedbackOther ? 'Curious why they placed it here?' : ''
      }`
    },
    feedbackInputPlaceholderText() {
      return `I placed ${this.currentTurn.concept} here because `
    },
    currentDraggableState() {
      if (this.turnValueSelfConfirmed) {
        return this.draggableOtherState
      } else {
        return this.draggableSelfState
      }
    },
  },
  mounted() {
    this.dropzoneWidth = this.$refs.theDropZone.$el.clientWidth
  },
  methods: {
    onTurnSelfConfirm() {
      this.turnValueSelfConfirmed = true
      this.currentTurn.valueSelf = this.turnValueSelf
      this.currentStateKey = 'otherGuess'
    },
    onTurnOtherConfirm() {
      this.turnValueOtherGuessConfirmed = true
      this.currentTurn.valueOtherGuess = this.turnValueOtherGuess
      this.currentTurn.valueOtherDiff = this.valueOtherDiff
      this.currentStateKey = 'otherTrue'
    },
    onFeedbackRequest() {
      this.currentStateKey = 'giveFeedback'
    },
    onHintRequest() {
      this.showHint = true
    },
    onFeedbackSkipped() {
      this.endTurn()
    },
    onFeedbackSubmitted(feedbackText) {
      this.feedback = feedbackText
      this.currentTurn.feedback = feedbackText
      this.currentStateKey = 'seeFeedback'
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
      this.currentStateKey = 'inputSelf'
      this.turnValueSelf = null
      this.turnValueSelfConfirmed = false
      this.turnValueOtherGuess = null
      this.turnValueOtherGuessConfirmed = false
      this.$refs.draggableItemSelf.resetPosition()
      this.$refs.draggableItemOther.resetPosition()
      this.feedback = ''
      this.showHint = false
    },
    onIsCardOnDropzone(boolean) {
      this.isCardOnDropzone = boolean
    },
    onSetSelfDraggableState(state) {
      this.draggableSelfState = state
    },
    onSetOtherDraggableState(state) {
      this.draggableOtherState = state
    },
    onSetValueSelf(value) {
      this.turnValueSelf = value
    },
    onSetValueOther(value) {
      this.turnValueOtherGuess = value
    },
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
  },
}
</script>

<style scoped lang="scss">
header {
  width: 100%;

  .subtitle-player {
    margin-top: $offset-4;
  }
}

.spectrum-game-dropzone {
  top: 50%;
  transform: translateY(-60%);
}
.spectrum-game-draggable {
  bottom: 10%;
}
.spectrum-game-draggable-other {
  bottom: 10%;
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
.spectrum-game-feedback-modal {
  left: 50%;
  top: 70%;
  height: 35%;
  transform: translate(-50%, -50%);
}
.spectrum-game-feedback-other {
  /* TODO: improve these temp placeholder styles */
  left: 50%;
  top: 33%;
  transform: translate(-50%, -50%);

  // moved here from ModalTextRevealer
  position: absolute;
  z-index: $z-5;
  width: $modal-player-feedback-width;
  height: 35%;
}
</style>
