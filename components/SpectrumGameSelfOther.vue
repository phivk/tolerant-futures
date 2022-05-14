<template>
  <GameContainer>
    <header>
      <div class="w-100 flex justify-between ph3 pt3">
        <ChapterProgressionList :current-chapter-index="currentChapterIndex" />
        <ButtonExitGame />
      </div>
      <SubtitlePlayer class="mb3">
        {{ currentState.caption }}
      </SubtitlePlayer>
    </header>
    <DropZone ref="theDropZone" class="spectrum-game-dropzone">
      <DropZoneName>{{ currentTurn.spectrumLeft }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrumRight }}</DropZoneName>
      <DropZoneBackground gradient-class="gradient-1" />
    </DropZone>
    <!-- self -->
    <DraggableItem
      v-show="currentState.elementsVisible.selfCard"
      ref="draggableItemSelf"
      class="spectrum-game-draggable"
      @set-value="onSetValueSelf"
    >
      <CardItem>{{ currentTurn.concept }} </CardItem>
    </DraggableItem>
    <!-- otherGuess -->
    <DraggableItem
      v-show="currentState.elementsVisible.otherGuessCard"
      ref="draggableItemOther"
      class="spectrum-game-draggable-other"
      @set-value="onSetValueOther"
    >
      <CardItem is-present-card>
        {{ currentTurn.conceptOther }}
      </CardItem>
    </DraggableItem>
    <!-- otherTrue -->
    <CardItem
      v-show="currentState.elementsVisible.otherTrueCard"
      is-present-card
      class="o-70 z-5"
      :style="otherTrueTranslateStyle"
    >
      {{ currentTurn.conceptOther }}
    </CardItem>
    <!-- feedbackOther -->
    <ModalTextRevealer
      v-show="currentState.elementsVisible.feedbackModalOther"
      class="spectrum-game-feedback-other"
      text="other visitor's reasoning here"
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
    <TheFooter>
      <div>
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
      </div>
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
      showFeedbackForm: false,
      stateIndex: 0,
    }
  },
  computed: {
    states() {
      return [
        {
          name: 'self',
          caption: this.currentTurn.caption,
          buttonPrimary: {
            text: 'Confirm your choice',
            visible: this.hasTurnValueSelfToConfirm,
            handler: this.onTurnSelfConfirm,
          },
          elementsVisible: {
            selfCard: true,
          },
        },
        {
          name: 'otherGuess',
          caption: this.currentTurn.captionOther,
          buttonPrimary: {
            text: 'Confirm your guess',
            visible: this.hasTurnValueOtherGuessToConfirm,
            handler: this.onTurnOtherConfirm,
          },
          elementsVisible: {
            selfCard: true,
            otherGuessCard: true,
          },
        },
        {
          name: 'otherTrue',
          caption: this.captionOtherGuessConfirmed,
          buttonPrimary: {
            text: 'See their reasoning',
            visible: true,
            handler: this.onFeedbackRequest,
          },
          buttonSecondary: {
            text: 'Skip',
            visible: true,
            handler: this.endTurn,
          },
          elementsVisible: {
            selfCard: true,
            otherGuessCard: true,
            otherTrueCard: true,
          },
        },
        {
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
        {
          name: 'seeFeedback',
          caption: 'This is why they placed it here.',
          buttonPrimary: {
            text: 'Next turn',
            visible: true,
            handler: this.endState,
          },
          elementsVisible: {
            selfCard: true,
            otherGuessCard: true,
            otherTrueCard: true,
            feedbackModalSelfText: true,
            feedbackModalOther: true,
          },
        },
      ]
    },
    hasNextState() {
      return this.stateIndex < this.states.length - 1
    },
    currentState() {
      return this.states[this.stateIndex]
    },
    hasNextTurn() {
      return this.turnIndex < this.turns.length - 1
    },
    currentTurn() {
      return this.turns[this.turnIndex]
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
        this.requirePlayerFeedback ? 'Curious why they placed it here?' : ''
      }`
    },
    feedbackInputPlaceholderText() {
      return `I placed ${this.currentTurn.concept} here because ...`
    },
  },
  mounted() {
    this.dropzoneWidth = this.$refs.theDropZone.$el.clientWidth
  },
  methods: {
    onTurnSelfConfirm() {
      this.turnValueSelfConfirmed = true
      this.endState()
    },
    onTurnOtherConfirm() {
      this.turnValueOtherGuessConfirmed = true
      this.endState()
    },
    onFeedbackRequest() {
      this.showFeedbackForm = true
      this.endState()
    },
    onFeedbackSkipped() {
      this.endState()
    },
    onFeedbackSubmitted(feedbackText) {
      this.feedback = feedbackText
      this.endState()
    },
    endState() {
      // advance game
      if (this.hasNextState) {
        // next state
        this.stateIndex++
      } else {
        // next turn
        this.endTurn()
      }
    },
    endTurn() {
      // store input
      this.submitInput()

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
      this.stateIndex = 0
      this.turnValueSelf = null
      this.turnValueSelfConfirmed = false
      this.turnValueOtherGuess = null
      this.turnValueOtherGuessConfirmed = false
      this.$refs.draggableItemSelf.resetPosition()
      this.$refs.draggableItemOther.resetPosition()
      this.feedback = ''
      this.showFeedbackForm = false
    },
    onSetValueSelf(value) {
      this.turnValueSelf = value
    },
    onSetValueOther(value) {
      this.turnValueOtherGuess = value
    },
    async submitInput() {
      await this.$supabase
        .from('inputSelfOther')
        .insert([
          {
            concept: this.currentTurn.concept,
            spectrumLeft: this.currentTurn.spectrumLeft,
            spectrumRight: this.currentTurn.spectrumRight,
            valueSelf: this.turnValueSelf,
            valueOtherGuess: this.turnValueOtherGuess,
            valueOtherTrue: this.currentTurn.valueOther,
            valueOtherDiff: this.valueOtherDiff,
            feedback: this.feedback,
            turnIndex: this.turnIndex,
            user: this.$store.state.user,
          },
        ])
        .single()
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
  margin-bottom: $offset-7;
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
}
</style>
