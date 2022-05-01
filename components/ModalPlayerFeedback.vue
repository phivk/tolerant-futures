<template> 
  <div>
    <form>
      <textarea v-model="inputText"/>
      <input type="submit" value="submit" @click="onSubmitFeedback" :disabled="isInputInvalid">
    </form>
      <p> Finish the sentence above or continue...</p>
      <ButtonSecondary @handleClick="onSkipFeedback"> Skip </ButtonSecondary>
  </div>
</template>

<script>
export default {
  props: {
    inputPlaceholderText: {
      type: String,
      default: "I placed the card here because..."
    }
  },
  data() {
    return {
      inputText: this.inputPlaceholderText,
      canSubmit: false
    }
  }, 
  methods: {
    onSubmitFeedback(e) {
      e.preventDefault();
      console.log("submitting");
    },
    onSkipFeedback() {
      console.log("skip feedback");
    }
  },
  computed: {
    isInputInvalid() {
      return this.inputText === this.inputPlaceholderText || !this.inputText
    }
  }
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
    border: $border-width-3 solid rgba(255,255,255, .4);
    background-color: rgba(255, 255, 255, .8);
    @supports ((-webkit-backdrop-filter: blur($blur-1)) or (backdrop-filter: blur($blur-1))) {
      background-color: rgba(255, 255, 255, .3);
      -webkit-backdrop-filter: blur($blur-1);
      backdrop-filter: blur($blur-1);
      border: $border-width-3 solid rgba(255,255,255, .4);
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

    input[type=submit] {
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

        &:disabled {
          color: $button-disabled-text-color;
          border: 2px solid $button-disabled-text-color;;
          background: none;
          filter: none;
        }

        &:hover {
          cursor: pointer;
        }
    }
  }
  p {
    margin-top: $offset-3;
    color: $white-color;
    filter: $caption-shadow-effect;
  }

  button[type=button] {
    margin-top: $offset-3;
  }
}
</style>