<template>
  <GameContainer>
    <div class="w-100 flex justify-between ph3 pt3">
      <ChapterProgressionList />
      <ButtonExitGame />
    </div>
    <DropZone ref="theDropZone" class="spectrum-game-dropzone">
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
      v-show="showOtherGuess"
      ref="draggableItemOther"
      class="spectrum-game-draggable-other"
      @set-value="onSetValueOther"
    >
      <CardItem is-present-card>
        {{ currentTurn.conceptOther }}
      </CardItem>
    </DraggableItem>
    <CardItem
      v-show="showOtherTrue"
      is-present-card
      class="o-70 z-5"
      :style="otherTrueStyle"
    >
      {{ currentTurn.conceptOther }}
    </CardItem>
    <TheFooter>
      <div class="mb4">
        <ButtonPrimary
          v-if="hasTurnValueToConfirm"
          @buttonClicked="onTurnConfirm"
        >
          Confirm
        </ButtonPrimary>
        <ButtonPrimary
          v-if="hasTurnValueOtherToConfirm"
          @buttonClicked="onTurnOtherConfirm"
        >
          Confirm
        </ButtonPrimary>
        <ButtonPrimary v-if="showOtherTrue" @buttonClicked="endTurn">
          Next turn
        </ButtonPrimary>
      </div>
      <SubtitlePlayer v-show="!showOtherGuess" class="mb3">
        {{ currentTurn.caption }}
      </SubtitlePlayer>
      <SubtitlePlayer
        v-show="showOtherGuess && !turnValueOtherConfirmed"
        class="mb3"
      >
        {{ currentTurn.captionOther }}
      </SubtitlePlayer>
      <SubtitlePlayer
        v-show="showOtherGuess && turnValueOtherConfirmed"
        class="mb3"
      >
        {{ captionOtherGuessConfirmed }}
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
  },
  data() {
    return {
      turnIndex: 0,
      turnValue: null,
      turnValueConfirmed: false,
      turnValueOther: null,
      turnValueOtherConfirmed: false,
      showOtherGuess: false,
      showOtherTrue: false,
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
    hasTurnValueToConfirm() {
      return this.turnValue !== null && !this.turnValueConfirmed
    },
    hasTurnValueOtherToConfirm() {
      return this.turnValueOther !== null && !this.turnValueOtherConfirmed
    },
    turnValueDiff() {
      return this.turnValueOther - this.currentTurn.valueOther
    },
    otherTrueStyle() {
      const valueOtherMapped = this.currentTurn.valueOther - 0.5
      const cardTranslation =
        valueOtherMapped * (this.dropzoneWidth - this.cardWidth)
      return {
        transform: `translateX(${cardTranslation}px)`,
      }
    },
    captionOtherGuessConfirmed() {
      return `${
        this.turnValueDiff > this.diffThreshold ? 'Not bad!' : 'Well done!'
      } This is where the other visitor placed ${this.currentTurn.concept}`
    },
  },
  mounted() {
    this.dropzoneWidth = this.$refs.theDropZone.$el.clientWidth
  },
  methods: {
    onTurnConfirm() {
      this.turnValueConfirmed = true
      this.showOtherGuess = true
    },
    onTurnOtherConfirm() {
      this.turnValueOtherConfirmed = true
      this.showOtherTrue = true
    },
    endTurn() {
      // store input
      this.currentTurn.value = this.turnValue
      this.currentTurn.valueOther = this.turnValueOther
      // this.submitInput(this.currentTurn)

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
      this.turnValueOther = null
      this.turnValueConfirmed = false
      this.turnValueOtherConfirmed = false
      this.$refs.draggableItem.resetPosition()
      this.$refs.draggableItemOther.resetPosition()
      this.showOtherGuess = false
      this.showOtherTrue = false
    },
    onSetValue(value) {
      this.turnValue = value
    },
    onSetValueOther(value) {
      this.turnValueOther = value
    },
    async submitInput(currentTurn) {
      await this.$supabase
        .from('spectrumInput')
        .insert([
          {
            concept: currentTurn.concept,
            conceptOther: currentTurn.conceptOther,
            value: currentTurn.value,
            valueOther: currentTurn.valueOther,
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
.spectrum-game-draggable-other {
  top: 5%;
}
</style>
