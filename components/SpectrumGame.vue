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
    <DropZone class="spectrum-game-dropzone">
      <DropZoneName>{{ currentTurn.spectrumLeft }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrumRight }}</DropZoneName>
      <DropZoneBackground gradient-class="gradient-1" />
    </DropZone>
    <DraggableItem
      ref="draggableItem"
      class="spectrum-game-draggable"
      :dragging-disabled="turnValueConfirmed"
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
        v-show="showConceptHints && !showCurrentHint && !showPresent"
        @buttonClicked="onShowCurrentHint"
      >
        Not familiar with {{ currentTurn.concept }}?
      </ButtonSecondary>
      <SubtitlePlayer
        v-show="showConceptHints && showCurrentHint && !showPresent"
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
      showCurrentHint: false,
      feedback: null,
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
    feedbackInputPlaceholderText() {
      return `I placed ${this.currentTurn.conceptPresent} here because ...`
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
    onFeedbackSubmitted(feedbackText) {
      this.feedback = feedbackText
      this.endTurn()
    },
    onShowCurrentHint() {
      this.showCurrentHint = true
    },
    endTurn() {
      // reset hint visibility
      if (this.showConceptHints) {
        this.showCurrentHint = false
      }

      // store input
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
      this.feedback = null
    },
    onSetValue(value) {
      this.turnValue = value
    },
    onSetValuePresent(value) {
      this.turnValuePresent = value
    },
    async submitInput() {
      await this.$supabase
        .from('spectrumInput')
        .insert([
          {
            concept: this.currentTurn.concept,
            conceptPresent: this.currentTurn.conceptPresent,
            value: this.turnValue,
            valuePresent: this.turnValuePresent,
            feedback: this.feedback,
            spectrumLeft: this.currentTurn.spectrumLeft,
            spectrumRight: this.currentTurn.spectrumRight,
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
