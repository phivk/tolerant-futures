<template>
  <div
    v-show="isIdle" 
    class="idle-container">
      <div>
        <h1> Are you still there? </h1>
        <p class="mv3 large-paragraph">Interact to continue</p>
        <p class="mv3 large-paragraph">Restarting in {{ timerCount }}</p>
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

<style scoped lang="scss">
  .idle-container {
    position: absolute;    
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: $z-top;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $warn-overlay-color;
    pointer-events: auto;

    div {
      width: 500px;
      padding: $offset-6;
      text-align: center;
      color: $white-color;
      position: relative;
      box-sizing: border-box;

      &:before {
        z-index: -1;        
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 100%;
        height: 100%;
        background-color: $very-dark-blue;
        filter: blur($blur-3);
      }
    }

  }


</style>
