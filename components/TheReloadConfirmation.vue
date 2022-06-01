<template>
  <div class="confirm-exit-container">
    <div>
      <h1>Would you like to reload the app?</h1>
      <p class="mv3 large-paragraph">This will restart the current chapter.</p>
      <ButtonPrimary class="outlined" @buttonClicked="onConfirm">
        Reload
      </ButtonPrimary>
      <ButtonSecondary class="outlined" @buttonClicked="onCancel">
        Cancel
      </ButtonSecondary>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onConfirm() {
      this.$emit('confirm')
    },
    onCancel() {
      this.$emit('cancel')
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
