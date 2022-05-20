<template>
  <StandaloneConditionalDisplay>
    <template #standalone>
      <ChapterOpening
        :title="title"
        :paragraph="paragraphStandalone"
        :button-text="nextButtonText"
        :next-path="nextPath"
      />
    </template>
    <template #browser>
      <ChapterOpening
        :title="title"
        :paragraph="paragraphBrowser"
        :button-text="nextButtonText"
        :next-path="nextPath"
      >
        <div class="mv4 tc">
          <FeedbackInput
            v-show="showFeedbackForm"
            class="mv3"
            :input-placeholder-text="inputPlaceholderText"
            @feedbackSubmitted="onFeedbackSubmitted"
            @feedbackSkipped="onFeedbackSkipped"
          />
          <ModalTextRevealer
            v-show="showFeedbackResponse"
            class="mv3"
            :text="feedback"
            :is-hidden="false"
          />
          <ButtonPrimary
            v-show="showFeedbackResponse"
            @buttonClicked="onEmailClick"
          >
            Email a friend
          </ButtonPrimary>
          <ButtonSecondary
            v-show="showFeedbackResponse"
            @buttonClicked="onEmailSkip"
          >
            Skip
          </ButtonSecondary>
        </div>
      </ChapterOpening>
    </template>
  </StandaloneConditionalDisplay>
</template>

<script>
export default {
  data() {
    return {
      title: 'Chapter 4: The Future',
      paragraphStandalone:
        "As part of this installation, you'll find a set of physical cards. We invite you to pick one and take it with you. What meaning do you attach to this card? And how would someone else see it? Feel free to use this card as a keepsake or a conversation starter whenever the moment is right.",
      paragraphBrowser:
        'We invite you to take a moment and reflect: What does a tolerant future look like to you?',
      inputPlaceholderText: 'A tolerant future unfolds for me, when ...',
      feedback: '',
      showFeedbackForm: true,
      showFeedbackResponse: false,
      nextButtonText: 'Back to start',
      nextPath: '/',
    }
  },
  computed: {
    mailtoURL() {
      return `mailto:${encodeURI(
        `add@your-friends-email.here?subject=A tolerant future ...&body=${this.feedback}`
      )}`
    },
  },
  mounted() {
    this.$store.commit('setCurrentChapter', 'ch4')
  },
  methods: {
    onFeedbackSubmitted(feedbackText) {
      this.feedback = feedbackText
      this.showFeedbackForm = false
      this.showFeedbackResponse = true
    },
    onFeedbackSkipped() {
      this.showFeedbackForm = false
    },
    onEmailClick() {
      window.open(this.mailtoURL)
    },
    onEmailSkip() {},
  },
}
</script>
