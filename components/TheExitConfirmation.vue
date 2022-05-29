<template>
  <div class="confirm-exit-container">
    <div>
      <h1>Are you sure you want to leave?</h1>
      <p class="mv3 large-paragraph">All your progress will be lost.</p>
      <ButtonPrimary class="outlined" @buttonClicked="onStay"
        >Stay</ButtonPrimary
      >
      <ButtonSecondary class="outlined" @buttonClicked="onLeave"
        >Leave</ButtonSecondary
      >
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onStay() {
      this.$emit('stay', {})
    },
    onLeave() {
      this.$emit('leave', {})
    },
  },
}
</script>

<style scoped lang="scss">
.confirm-exit-container {
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
    display: flex;
    flex-direction: column;
    align-items: center;

    .button-primary {
      margin-top: $offset-3;
    }

    .button-secondary {
      margin-top: $offset-3;
    }

    &:before {
      z-index: -1;
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      width: 100%;
      height: 100%;
      background-color: $very-dark-blue;
      filter: blur($blur-3);
    }
  }
}
</style>
