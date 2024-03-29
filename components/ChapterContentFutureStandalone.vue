<template>
  <ChapterWrapperFuture
    :title="title"
    :paragraph="currentState.caption"
    :show-button="false"
  >
    <div class="parent">
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
        class=""
        @buttonClicked="currentState.buttonSecondary.handler"
      >
        {{ currentState.buttonSecondary.text }}
      </ButtonSecondary>
    </div>
    <NuxtLink
      v-if="currentStateKey === 'endState'"
      class="link-inline"
      to="/about"
    >
      Read more about the Tolerant Futures project
    </NuxtLink>
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
            'Thank you. Sharing your thought with someone else can be a great first step in making it real. Why not share this thought with someone you know?',
          component: 'ModalText',
          dynamicProps: {
            text: this.feedback,
          },
          buttonPrimary: {
            text: 'Continue',
            handler: this.onFeedbackSkipped,
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
    onFeedbackSubmitted(feedbackText) {
      this.feedback = feedbackText
      this.currentStateKey = 'displayFeedback'
      this.$emit('submit-input', feedbackText)
    },
    onFeedbackSkipped() {
      this.currentStateKey = 'endState'
    },
    onBackToStart() {
      this.$router.push('/')
    },
  },
}
</script>

<style scoped lang="scss">
.parent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $offset-4 $offset-3;
  width: 100%;

  @media (min-width: $query-mobile-landscape) and (orientation: landscape) {
    width: 60%;
  }

  .button-primary {
    margin-top: $offset-3;
    margin-bottom: $offset-4;
  }

  .button-secondary {
    margin-top: $offset-4;

    @media (min-width: $query-mobile) and (max-width: $query-mobile-landscape) {
      margin-top: $offset-3;
    }
  }
}

a {
  color: $white-color;
}

.link-inline {
  padding-top: $offset-5;
}
</style>
