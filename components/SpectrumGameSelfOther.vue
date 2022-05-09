<template>
  <GameContainer>
    <header>
      <div class="w-100 flex justify-between ph3 pt3">
        <ChapterProgressionList />
        <ButtonExitGame />
      </div>
      <SubtitlePlayer v-show="!turnValueSelfConfirmed">
        {{ currentTurn.caption }}
      </SubtitlePlayer>
      <SubtitlePlayer
        v-show="turnValueSelfConfirmed && !turnValueOtherGuessConfirmed"
      >
        {{ currentTurn.captionOther }}
      </SubtitlePlayer>
      <SubtitlePlayer
        v-show="turnValueSelfConfirmed && turnValueOtherGuessConfirmed"
      >
        {{ captionOtherGuessConfirmed }}
      </SubtitlePlayer>
    </header>
    <DropZone ref="theDropZone" class="spectrum-game-dropzone">
      <DropZoneName>{{ currentTurn.spectrumLeft }}</DropZoneName>
      <DropZoneName>{{ currentTurn.spectrumRight }}</DropZoneName>
      <DropZoneBackground gradient-class="gradient-1" />
    </DropZone>
    <DraggableItem
      ref="draggableItemSelf"
      class="spectrum-game-draggable"
      @set-value="onSetValueSelf"
    >
      <CardItem>{{ currentTurn.concept }}</CardItem>
    </DraggableItem>
    <DraggableItem
      v-show="turnValueSelfConfirmed"
      ref="draggableItemOther"
      class="spectrum-game-draggable-other"
      @set-value="onSetValueOther"
    >
      <CardItem is-present-card>
        {{ currentTurn.conceptOther }}
      </CardItem>
    </DraggableItem>
    <CardItem
      v-show="turnValueOtherGuessConfirmed"
      is-present-card
      class="o-70 z-5"
      :style="otherTrueTranslateStyle"
    >
      {{ currentTurn.conceptOther }}
    </CardItem>
    <TheFooter>
      <div>
        <ButtonPrimary
          v-if="hasTurnValueSelfToConfirm"
          @buttonClicked="onTurnSelfConfirm"
        >
          Confirm your choice
        </ButtonPrimary>
        <ButtonPrimary
          v-if="hasTurnValueOtherGuessToConfirm"
          @buttonClicked="onTurnOtherConfirm"
        >
          Confirm your guess
        </ButtonPrimary>
        <ButtonPrimary
          v-if="turnValueOtherGuessConfirmed"
          @buttonClicked="endTurn"
        >
          {{ hasNextTurn ? 'Next turn' : 'Next Chapter' }}
        </ButtonPrimary>
      </div>
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
    }
  },
  computed: {
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
          ? 'Not bad!'
          : 'Well done!'
      } This is where the other visitor placed ${this.currentTurn.concept}`
    },
  },
  mounted() {
    this.dropzoneWidth = this.$refs.theDropZone.$el.clientWidth
  },
  methods: {
    onTurnSelfConfirm() {
      this.turnValueSelfConfirmed = true
    },
    onTurnOtherConfirm() {
      this.turnValueOtherGuessConfirmed = true
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
      this.turnValueSelf = null
      this.turnValueSelfConfirmed = false
      this.turnValueOtherGuess = null
      this.turnValueOtherGuessConfirmed = false
      this.$refs.draggableItemSelf.resetPosition()
      this.$refs.draggableItemOther.resetPosition()
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
</style>
