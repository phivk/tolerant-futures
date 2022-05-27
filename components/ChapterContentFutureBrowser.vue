<template>
  <ChapterWrapperFuture
    :title="title"
    :paragraph="currentState.caption"
    :show-button="false"
  >
    <div class="mv4 tc">
      <component
        :is="currentState.component"
        class="mv3"
        v-bind="currentState.dynamicProps"
        @feedbackSubmitted="onFeedbackSubmitted"
        @feedbackSkipped="onFeedbackSkipped"
      />
      <ButtonPrimary
        v-if="currentState.buttonPrimary"
        @buttonClicked="currentState.buttonPrimary.handler"
      >
        {{ currentState.buttonPrimary.text }}
      </ButtonPrimary>
      <ButtonSecondary
        v-if="currentState.buttonSecondary"
        @buttonClicked="currentState.buttonSecondary.handler"
      >
        {{ currentState.buttonSecondary.text }}
      </ButtonSecondary>
    </div>
  </ChapterWrapperFuture>
</template>

<script>
export default {
  data() {
    return {
      title: 'Chapter 4: The Future',
      feedback: '',
      currentStateKey: 'inputFeedback',
    }
  },
  computed: {
    states() {
      return {
        inputFeedback: {
          caption:
            'We invite you to take a moment and reflect: What would a tolerant future look like for you?',
          component: 'FeedbackInput',
          dynamicProps: {
            inputPlaceholderText: 'For me, a tolerant future would look like ',
          },
        },
        displayFeedback: {
          caption:
            'Thank you. Sharing your thought with someone else can be a great first step in making it real. Why not start by sending out your message to a friend?',
          component: 'ModalTextRevealer',
          dynamicProps: {
            text: this.feedback,
            isHidden: false,
          },
          buttonPrimary: {
            text: 'Email a friend',
            handler: this.onEmailClick,
          },
          buttonSecondary: {
            text: 'Skip',
            handler: this.onEmailSkip,
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
    mailtoURL() {
      return `mailto:${encodeURI(
        `add@your-friends-email.here?subject=A tolerant future ...&body=${this.feedback}`
      )}`
    },
  },
  methods: {
    onFeedbackSubmitted(feedbackText) {
      this.feedback = feedbackText
      this.currentStateKey = 'displayFeedback'
      this.$emit('submit-input', feedbackText)
    },
    onFeedbackSkipped() {
      this.currentStateKey = 'endState'
    },
    onEmailClick() {
      window.open(this.mailtoURL)
      this.currentStateKey = 'endState'
    },
    onEmailSkip() {
      this.currentStateKey = 'endState'
    },
    onBackToStart() {
      this.$router.push('/')
    },
  },
}
</script>
