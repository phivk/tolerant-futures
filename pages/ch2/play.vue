<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <SpectrumGame :turns="turns" :next-path="nextPath" />
  </div>
</template>

<script>
import turnsPast from '~/data/turns-ch2.json'
export default {
  data() {
    return {
      title: 'Play',
      turns: turnsPast,
      nextPath: '/ch3',
      inputs: [],
    }
  },
  async mounted() {
    const { data: inputs } = await this.$supabase
      .from('spectrumInput')
      .select('*')
    this.inputs = inputs

    this.$store.commit('setCurrentChapter', 'ch2')
  },
}
</script>
