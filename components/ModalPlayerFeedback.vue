<template>
  <div>
    <form>
      <textarea v-model="inputText" />
      <input
        type="submit"
        value="submit"
        :disabled="isInputInvalid"
        @click="onSubmitFeedback"
      />
    </form>
    <ButtonSecondary @buttonClicked="onSkipFeedback"> Skip </ButtonSecondary>
  </div>
</template>

<script>
export default {
  props: {
    inputPlaceholderText: {
      type: String,
      default: 'I placed the card here because...',
    },
  },
  data() {
    return {
      inputText: this.inputPlaceholderText,
    }
  },
  computed: {
    isInputInvalid() {
      return this.inputText === this.inputPlaceholderText || !this.inputText
    },
  },
  methods: {
    resetInputText() {
      this.inputText = this.inputPlaceholderText
    },
    onSubmitFeedback(e) {
      e.preventDefault()
      this.$emit('feedbackSubmitted', this.inputText)
      this.resetInputText()
    },
    onSkipFeedback() {
      this.$emit('feedbackSkipped')
      this.resetInputText()
    },
  },
}
</script>

<style scoped lang="scss">
div {
  position: absolute;
  z-index: $z-5;
  width: $modal-player-feedback-width;
  height: $modal-player-feedback-height;
  form {
    width: 100%;
    height: 100%;
    border-radius: $border-radius-2;
    padding: $offset-3;
    border: $border-width-3 solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.8);
    @supports (
      (-webkit-backdrop-filter: blur($blur-1)) or
        (backdrop-filter: blur($blur-1))
    ) {
      background-color: rgba(255, 255, 255, 0.3);
      -webkit-backdrop-filter: blur($blur-1);
      backdrop-filter: blur($blur-1);
      border: $border-width-3 solid rgba(255, 255, 255, 0.4);
    }
    textarea {
      background: none;
      outline: none;
      resize: none;
      width: 100%;
      height: $modal-player-feedback-textarea-height;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      border: none;
      color: $black-color;
      font-family: $text-font;
      font-size: $f-2;
      &:focus {
        outline: none;
      }
    }
    input[type='submit'] {
      max-width: $main-button-max-width;
      font-family: $headline-font;
      font-size: $f-2;
      text-align: center;
      box-sizing: border-box;
      padding: $offset-3;
      border-radius: $border-radius-1;
      background-color: $white-color;
      border: none;
      outline: none;
      filter: $main-button-shadow-effect;
      color: $black-color;

      &:hover {
        cursor: pointer;
      }
      &:disabled {
        color: $button-disabled-color;
        border: 2px solid $button-disabled-color;
        background: none;
        filter: none;
        &:hover {
          cursor: not-allowed;
        }
      }
    }
  }
  p {
    margin-top: $offset-3;
    color: $white-color;
    filter: $caption-shadow-effect;
  }
  button[type='button'] {
    margin-top: $offset-3;
  }
}
</style>
