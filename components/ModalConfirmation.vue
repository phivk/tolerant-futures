<template>
  <div class="confirmation-container">
    <div>
      <h1>{{ title }}</h1>
      <p class="mv3 large-paragraph">{{ paragraph }}</p>
      <ButtonPrimary class="outlined" @buttonClicked="onClickPrimary">
        {{ buttonTextPrimary }}
      </ButtonPrimary>
      <ButtonSecondary class="outlined" @buttonClicked="onClickSecondary">
        {{ buttonTextSecondary }}
      </ButtonSecondary>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Are you sure?',
    },
    paragraph: {
      type: String,
      required: true,
      default: '',
    },
    buttonTextPrimary: {
      type: String,
      required: true,
      default: 'Confirm',
    },
    buttonTextSecondary: {
      type: String,
      required: true,
      default: 'Cancel',
    },
  },
  methods: {
    onClickPrimary() {
      this.$emit('buttonClickedPrimary')
    },
    onClickSecondary() {
      this.$emit('buttonClickedSecondary')
    },
  },
}
</script>

<style scoped lang="scss">
.confirmation-container {
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
