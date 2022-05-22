<template>
  <div>
    <Nuxt />
    <div
      v-if="isAppIdle"
      class="w-100 vh-100 bg-white-50 absolute top-0 z-999 flex justify-center items-center"
    >
      Idle View!
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAppIdle: false,
    }
  },
  onIdle() {
    console.log('ZZZ')
    this.isAppIdle = true
  },
  onActive() {
    console.log('Hello')
    this.isAppIdle = false
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
