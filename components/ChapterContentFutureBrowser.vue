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
        class="test"
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
            'We invite you to pause and consider. How would a tolerant future look for you?',
          component: 'FeedbackInput',
          dynamicProps: {
            inputPlaceholderText: 'For me, a tolerant future would be ...',
          },
        },
        displayFeedback: {
          caption:
            'Thank you. Sharing your thought with someone else can be a great first step in making it real. Why not start by sending out your message to a friend?',
          component: 'ModalText',
          dynamicProps: {
            text: this.feedback,
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

<style scoped lang="scss">

.parent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $offset-4 $offset-3 0 $offset-3;
  width: 100%;

  @media (orientation: landscape) {   
    width: 60%;
  }     

  .button-primary {
    margin-top: $offset-3;
  }

  .button-secondary {
    margin-top: $offset-4;

    @media (min-width: $query-mobile) and (max-width:$query-mobile-landscape) {   margin-top: $offset-3;
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
