<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <SpectrumGame :turns="playTurns" :next-path="nextPath" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Play',
      playTurns: [
        {
          object: 'Boudica',
          spectrum: ['Submissive', 'Dominant'],
        },
        {
          object: 'Roman Empire',
          spectrum: ['Proud', 'Modest'],
        },
        {
          object: "Hadrian's Wall",
          spectrum: ['Generous', 'Greedy'],
        },
      ],
      nextPath: '/ch3',
    }
  },
}
</script>

<style lang="scss">
@import '~assets/scss/font-families.scss';
@import '~assets/scss/global.scss';
</style>
