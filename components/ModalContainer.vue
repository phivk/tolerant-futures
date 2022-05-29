<template>
  <div class="modals-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
  div.modals-container {
      z-index: $z-6;
      width: $modal-player-feedback-width;
      position: absolute;  
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
  }
</style>
