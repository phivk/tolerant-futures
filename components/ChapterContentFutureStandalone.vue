<template>
  <ChapterWrapperFuture
    :title="title"
    :paragraph="currentState.caption"
    :show-button="false"
  >
    <ButtonPrimary
      v-if="currentState.buttonPrimary"
      @buttonClicked="currentState.buttonPrimary.handler"
    >
      {{ currentState.buttonPrimary.text }}
    </ButtonPrimary>
  </ChapterWrapperFuture>
</template>

<script>
export default {
  data() {
    return {
      title: 'Chapter 4: The Future',
      currentStateKey: 'pickupCard',
    }
  },
  computed: {
    states() {
      return {
        pickupCard: {
          caption:
            "As part of this installation, you'll find a set of physical cards. We invite you to pick one and take it with you. What meaning do you attach to this card? And how would someone else see it? Feel free to use this card as a keepsake or a conversation starter whenever the moment is right.",
          buttonPrimary: {
            text: 'Continue',
            handler: this.onContinue,
          },
        },
        endState: {
          caption:
            'Thank you for participating. May your future be bright and tolerant!',
          buttonPrimary: {
            text: 'Back to start',
            handler: this.onBackToStart,
          },
        },
      }
    },
    currentState() {
      return this.states[this.currentStateKey]
    },
  },
  methods: {
    onContinue() {
      this.currentStateKey = 'endState'
    },
    onBackToStart() {
      this.$router.push('/')
    },
  },
}
</script>
