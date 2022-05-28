<template>
  <div class="touch-action-pany">
    <Nuxt />
    <TheIdleView />
  </div>
</template>
<style>
body {
  user-select: none;
  background-color: #3b1b9a;
}
.touch-action-pany {
  touch-action: pan-y;
}
</style>
