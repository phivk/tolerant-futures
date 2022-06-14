<template>
  <div class="modal-text-revealer" :style="{ width: overrideWidth }">
    <div class="text">
      <div>
        <p>
          {{ text }}
          <slot></slot>
        </p>
      </div>
    </div>
    <div v-if="isHidden" class="text-hider">
      <span v-if="hint">{{ hint }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: '',
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
    // overrideWith is a hack
    // I needed to wrap this component in ModalContainer component...
    // but in ch4 i couldn't because i don't understand the structure of dynamic components
    // so i came up with this for now
    // sorry !
    overrideWidth: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
div.modal-text-revealer {
  z-index: 10000;
  position: relative;
  width: 100%;
  height: $modal-player-feedback-height;

  &.modal-short {
    height: $modal-player-feedback-height-short;

    .text-hider {
      height: $modal-player-feedback-height-short;
    }
  }

  .text {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: $border-radius-2;
    box-sizing: border-box;
    padding: $offset-3 $offset-4;
    background-color: rgba(255, 255, 255, 0.9);

    div {
      overflow-y: auto;
      height: 100%;

      p {
        text-align: left;
        color: $black-color;
        font-size: $f-2;
        line-height: $f-2;
        @media (max-width: $query-mobile) {
          font-size: $f-3;
          line-height: $f-3;
        }          
      }
    }
  }

  .text-hider {
    position: absolute;
    width: 100%;
    height: $modal-player-feedback-height;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background-color: $dark-blue;
      filter: blur($blur-2);
    }

    span {
      color: $white-color;
      font-family: $text-font;
      font-size: $f-2;
      margin-bottom: $offset-3;
      z-index: $z-6;
      @media (max-width: $query-mobile) {
        font-size: $f-3;
        line-height: $f-3;
      }       
    }
  }
}
</style>
