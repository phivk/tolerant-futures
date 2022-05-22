<template>
  <div>
    <Nuxt />
    <div
      v-if="isIdle"
      class="w-100 vh-100 bg-white-90 absolute top-0 z-999 flex justify-center items-center"
    >
      <ModalTextRevealer
        class="tc"
        text="Are you still there?"
        :is-hidden="false"
      >
        <p class="mv3">Interact to continue</p>
        <p class="mv3">Restarting in {{ timerCount }}</p>
      </ModalTextRevealer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isIdle: false,
      timerEnabled: false,
      timerCountStart: 10,
      timerCount: this.timerCountStart,
    }
  },
  onIdle() {
    console.log('ZZZ')
    this.isIdle = true
    this.timerEnabled = true
  },
  onActive() {
    console.log('Hello')
    this.resetTimer()
    this.isIdle = false
  },
  watch: {
    timerEnabled(value) {
      console.log('timerEnabled value', value)
      if (value) {
        setTimeout(() => {
          this.timerCount--
        }, 1000)
      }
    },
    timerCount: {
      handler(value) {
        console.log('timerCount value', value)
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--
          }, 1000)
        } else if (value <= 0 && this.timerEnabled) {
          this.onTimerEnded()
        }
      },
      // immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
  methods: {
    resetTimer() {
      this.timerEnabled = false
      this.timerCount = this.timerCountStart
    },
    onTimerEnded() {
      this.resetTimer()
      this.isIdle = false
      this.$router.push('/')
    },
  },
}
</script>

<style>
body {
  touch-action: none;
  user-select: none;
  background-color: #3b1b9a;
}
</style>
