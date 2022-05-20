<template>
  <div class="modal-text-revealer">
    <section>
      <div class="text-area">
        {{ text }}
      </div>
    </section>
    <div
      v-if="isHidden"
      class="text-hider absolute w-100 h-100 top-0 bg-white-90 bg-blur f2 pa3 br4"
    >
      <span v-if="hint">{{ hint }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
      default: 'Some text to reveal',
    },
    hint: {
      type: String,
      required: false,
      default: null,
    },
    isHidden: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
}
</script>

<style scoped lang="scss">
// TODO: replace these hacky copied styles with something proper
// ideally in a way that doesn't duplicate much
div.modal-text-revealer {
  section {
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
    .text-area {
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
    .text-hider {
      color: $black-color;
      font-family: $text-font;
      font-size: $f-2;
      @supports (
        (-webkit-backdrop-filter: blur($blur-1)) or
          (backdrop-filter: blur($blur-1))
      ) {
        background-color: rgba(255, 255, 255, 0.7);
        -webkit-backdrop-filter: blur($blur-1);
        backdrop-filter: blur($blur-1);
        border: $border-width-3 solid rgba(255, 255, 255, 0.4);
      }
    }
  }
}
.bg-blur {
  -webkit-backdrop-filter: blur($blur-1);
  backdrop-filter: blur($blur-1);
}
</style>
