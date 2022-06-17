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
      default: 'I placed the card here because ...',
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
  watch: {
    inputPlaceholderText(newValue) {
      this.inputText = newValue
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
  z-index: $z-5;
  width: 100%;
  height: $modal-player-feedback-height;

  @media (max-width: $query-mobile) {
    height: $modal-player-feedback-height-mobile;
  } 

  @media (min-width: $query-mobile) and (max-width:$query-mobile-landscape) {    
    height: $modal-player-feedback-height-mobile-landscape;
  }   



  &.modal-short {
    height: $modal-player-feedback-height-short;
  }

  form {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 50px 70px 0 70px;
    @media (max-width: $query-mobile-landscape) {
      padding: 25px 35px 0 35px;
    } 

    &::before {
      position: absolute;
      border-radius: $border-radius-2;
      left: 0;
      top: 0;
      content: '';
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.95);
      filter: blur($blur-3);
    }

    textarea {
      position: relative;
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
      @media (max-width: $query-mobile) {
        font-size: $f-3;
        height: $modal-player-feedback-textarea-height-mobile;
      }  

      @media (min-width: $query-mobile) and (max-width:$query-mobile-landscape) {    
          font-size: $f-4;
          height: $modal-player-feedback-textarea-height-mobile;
      }      

      &:focus {
        outline: none;
      }
    }
    input[type='submit'] {
      max-width: $main-button-max-width;
      font-family: $headline-font;
      font-size: $f-3;
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
        filter: $shadow-effect-disabled;

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
  button {
    margin-top: $offset-6;
  }
}
</style>
