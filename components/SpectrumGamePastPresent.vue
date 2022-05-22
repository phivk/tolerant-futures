<template>
  <GameContainer v-if="currentTurn">
    <header>
      <div class="w-100 flex justify-between ph3 pt3">
        <ChapterProgressionList :current-chapter-index="currentChapterIndex" />
        <ButtonExitGame />
      </div>
      <SubtitlePlayer v-show="!showPresent">
        {{ currentState.caption }}
      </SubtitlePlayer>
      <!-- <SubtitlePlayer v-show="showPresent && !turnValuePresentConfirmed">
        {{ currentTurn.captionPresent }}
      </SubtitlePlayer>
      <SubtitlePlayer
        v-show="requirePlayerFeedback && turnValuePresentConfirmed"
        class="feedback-modal-subtitles"
      >
        Please finish the sentence below
      </SubtitlePlayer> -->
    </header>
    <DropZone class="spectrum-game-dropzone">
      <DropZoneName>{{ currentTurn.spectrumLeft }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrumRight }}</DropZoneName>
      <DropZoneBackground
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
      />
    </DropZone>
    <!-- Present Concept Card -->
    <DraggableItem
      v-show="currentState.elementsVisible.presentCard"
      ref="draggableItemPresent"
      class="spectrum-game-draggable"
      :dragging-disabled="turnValuePresentConfirmed"
      @set-value="onSetValuePresent"
    >
      <CardItem
        :value="turnValuePresent"
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
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
      @set-value="onSetValuePast"
    >
      <CardItem
        :value="turnValuePast"
        :color-a="currentTurn.colorA"
        :color-b="currentTurn.colorB"
        >{{ currentTurn.concept }}</CardItem
      >
    </DraggableItem>
    <ModalPlayerFeedback
      v-show="currentState.elementsVisible.feedbackModal"
      class="spectrum-game-feedback-modal"
      :input-placeholder-text="feedbackInputPlaceholderText"
      @feedbackSubmitted="onFeedbackSubmitted"
      @feedbackSkipped="onFeedbackSkipped"
    />
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
          caption: `Our research shows that ${this.currentTurn.conceptPresent} is often associated with ${this.currentTurn.concept}. Where would you place it on the spectrum?`,
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
      return `I placed ${this.currentTurn.concept} here because `
    },
  },
  methods: {
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

  .subtitle-player {
    margin-top: $offset-4;

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

  .button-primary {
    margin-bottom: $offset-5;
  }

  .subtitle-player.subtitle-player-concept-hint {
    //margin-top: $offset-7;
    font-size: $f-4;
    line-height: $f-3;
  }
}
</style>