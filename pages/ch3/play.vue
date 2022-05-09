<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <SpectrumGameSelfOther
      v-if="turns.length"
      :turns="turns"
      :next-path="nextPath"
      :current-chapter-index="2"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      turns: [],
      nextPath: '/ch4',
    }
  },
  created() {
    if (this.$store.state.turnsSelfOther) {
      this.turns = this.$store.state.turnsSelfOther
    } else {
      // navigate back to index page to fetch priorInputs and generate turns
      this.$router.push('/ch3')
    }
  },
}
</script>
