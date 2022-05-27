<template>
  <div
    v-show="isIdle"
    class="w-100 h-100 bg-white-90 absolute top-0 z-999 flex justify-center items-center"
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
</template>
<script>
export default {
  data() {
    return {
      isIdle: false,
      timerEnabled: false,
      timerCountStart: 10,
      timerCount: 10,
    }
  },
  onIdle() {
    if (this.$route.path !== '/') {
      this.isIdle = true
      this.timerEnabled = true
    }
  },
  onActive() {
    this.resetTimer()
    this.isIdle = false
  },
  watch: {
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--
        }, 1000)
      }
    },
    timerCount: {
      handler(value) {
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
