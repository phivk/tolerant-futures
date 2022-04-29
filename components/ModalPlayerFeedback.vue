<template> 
  <div>
    <form>
      <textarea v-model="inputText"/>
      <input type="submit" value="submit" @click="onSubmit" :disabled="isInputInvalid">
    </form>
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
    onSubmit(e) {
      e.preventDefault();
      console.log("submitting");
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
  width: $modal-player-feedback-width;
  height: $modal-player-feedback-height;
  position: absolute;
  z-index: $z-5;
  border-radius: $border-radius-2;
  padding: $offset-3;  
  border: $border-width-3 solid rgba(255,255,255, .4);
  background-color: rgba(255, 255, 255, .4);
  @supports ((-webkit-backdrop-filter: blur($blur-1)) or (backdrop-filter: blur($blur-1))) {
    background-color: rgba(255, 255, 255, .3);
    -webkit-backdrop-filter: blur($blur-1);
    backdrop-filter: blur($blur-1);
    border: $border-width-3 solid rgba(255,255,255, .4);
  }

  form {
    width: 100%;
    height: 100%;

    textarea {
      background: none;
      outline: none;
      resize: none;
      width: 100%;
      height: 400px;
      appearance: none; 
      -moz-appearance: none; 
      -webkit-appearance: none; 
      border: none;
      border-bottom: 1px solid $black-color;      
      color: $white-color;
      font-family: $text-font;
      font-size: $f-2;
      &:focus {
        outline: none;
      }
    }
  }


}
</style>
