<template>
  <div class="touch-action-none">
    <Nuxt />
    <TheIdleView />
  </div>
</template>
<style>
body {
  user-select: none;
  background-color: #3b1b9a;
}
.touch-action-none {
  touch-action: none;
}
</style>
