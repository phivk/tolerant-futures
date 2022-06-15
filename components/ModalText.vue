<template>
  <div class="modal-text">
      <p>
        {{text}}          
      </p>
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
  },
}
</script>

<style scoped lang="scss">
div.modal-text {
  z-index: 10000;
  width: 60%;
  height: $modal-player-feedback-height;
  border-radius: $border-radius-2;
  box-sizing: border-box;
  padding: $offset-3 $offset-4;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0 $offset-3;

  @media (max-width: $query-mobile) {
    width: 100%;
  }      
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
</style>
