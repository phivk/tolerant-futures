<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <h1>{{ title }}</h1>
    <SpectrumGame :turns="tutorialTurns" :next-path="nextPath" />
    <TheFooter></TheFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Tutorial',
      tutorialTurns: [
        {
          object: 'ice',
          spectrum: ['hot', 'cold'],
        },
        {
          object: 'matchbox',
          spectrum: ['small', 'big'],
        },
      ],
      nextPath: '/play',
    }
  },
}
</script>
