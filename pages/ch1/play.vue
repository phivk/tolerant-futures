<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <h1>{{ title }}</h1>
    <SpectrumGame :turns="reflectionTurns" :next-path="nextPath" />
    <TheFooter></TheFooter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Ch1 Reflection',
      reflectionTurns: [
        {
          object: 'You',
          spectrum: ['Left handed', 'Right handed'],
          caption:
            'Are you more left handed, right handed, or somewhere in between? Go ahead and place yourself on the spectrum.',
        },
        {
          object: 'You',
          spectrum: ['Young', 'Old'],
          caption:
            'Well done! Now, on the spectrum between Young and Old, where would you place yourself?',
        },
        {
          object: 'You',
          spectrum: ['Near', 'Far'],
          caption:
            "Neat! Let's now reflect on where is home for you right now. At this moment, you Near or Far from home?",
        },
      ],
      nextPath: '/ch2',
    }
  },
}
</script>
