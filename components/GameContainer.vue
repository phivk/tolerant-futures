<template>
  <div class="w-100 h-100 relative">
    <div class="absolute w-100 flex justify-between ph3 pt3 z-999">
      <ChapterProgressionList :current-chapter-index="currentChapterIndex" />
      <ButtonExitGame @buttonClicked="onExitClicked" />
    </div>
    <section
      class="w-100 h-100 relative flex flex-column justify-between items-center"
      @click="onClick"
    >
      <slot> </slot>
    </section>
    <TheExitConfirmation
      v-show="showExitConfirmation"
      @stay="onStay"
      @leave="onLeave"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      showExitConfirmation: false,
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
    onStay() {
      this.showExitConfirmation = false
    },
    onLeave() {
      this.$router.push('/')
    },
  },
}
</script>
<style scoped lang="scss">
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
