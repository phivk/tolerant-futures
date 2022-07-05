<template>
  <div class="w-100 h-100 relative">
    <div class="absolute top-0 w-100 flex justify-between ph3 pt4 z-999">
      <ChapterProgressionList :current-chapter-index="currentChapterIndex" />
      <div>
        <ButtonReloadGame @buttonClicked="onReloadClicked" />
        <ButtonExitGame @buttonClicked="onExitClicked" />
      </div>
    </div>
    <section
      class="w-100 h-100 relative flex flex-column justify-between items-center"
      @click="onClick"
    >
      <slot> </slot>
    </section>
    <ModalConfirmation
      v-show="showExitConfirmation"
      title="Are you sure you want to leave?"
      paragraph="All your progress will be lost."
      button-text-primary="Leave"
      button-text-secondary="Stay"
      @buttonClickedPrimary="onLeaveConfirm"
      @buttonClickedSecondary="onLeaveCancel"
    />
    <ModalConfirmation
      v-show="showReloadConfirmation"
      title="Would you like to reload the app?"
      paragraph="This will restart the current chapter."
      button-text-primary="Reload"
      button-text-secondary="Cancel"
      @buttonClickedPrimary="onReloadConfirm"
      @buttonClickedSecondary="onReloadCancel"
    />
  </div>
</template>
<script>
export default {
  props: {
    currentChapterIndex: {
      type: Number, // String, Number, Boolean, Function, Object, Array
      required: true,
      default: null,
    },
  },
  data() {
    return {
      showExitConfirmation: false,
      showReloadConfirmation: false,
    }
  },
  methods: {
    onClick(event) {
      // emit click event to be handled by SpectrumGame components
      this.$emit('clicked', event)
    },
    onExitClicked() {
      this.showExitConfirmation = true
    },
    onReloadClicked() {
      this.showReloadConfirmation = true
    },
    onLeaveConfirm() {
      this.$router.push('/')
    },
    onLeaveCancel() {
      this.showExitConfirmation = false
    },
    onReloadConfirm() {
      this.$router.go(0)
    },
    onReloadCancel() {
      this.showReloadConfirmation = false
    },
  },
}
</script>
<style scoped lang="scss">
.button-reload-game {
  margin-right: $offset-3;
}

section {
  position: relative;
  overflow: hidden;
  background-color: $background-color;

  // background noise texture
  &:before {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    background-size: cover;
    background-image: url('@/static/image/noise_lowres.jpg');
    mix-blend-mode: screen;
    pointer-events: none;
  }
  // background elliptical shadow
  &:after {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    background: radial-gradient(
      ellipse,
      rgba(255, 255, 255, 0) 30%,
      rgba(16, 6, 43, 0.4) 90%
    );
    mix-blend-mode: multiply;
    pointer-events: none;
  }
}
</style>
