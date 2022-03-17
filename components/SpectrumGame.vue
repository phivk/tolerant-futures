<template>
  <section class="w-100 pa3 flex flex-column items-center">
    <div class="w-100 flex justify-between mv6">
      <span class="dib f1">{{ turns[turnIndex].spectrum[0] }}</span>
      <span class="dib f1">{{ turns[turnIndex].spectrum[1] }}</span>
    </div>
    <CardItem>
      {{ turns[turnIndex].object }}
    </CardItem>
    <div class="mt6">
      <button v-if="hasNextTurn" @click="incrementTurnIndex">Next Turn</button>
      <button v-else @click="onNextChapterClick">Next Chapter</button>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    turns: {
      type: Array,
      required: true,
      default: null,
    },
    nextPath: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      turnIndex: 0,
    }
  },
  computed: {
    hasNextTurn() {
      return this.turnIndex < this.turns.length - 1
    },
  },
  methods: {
    incrementTurnIndex() {
      if (this.hasNextTurn) {
        this.turnIndex++
      }
    },
    onNextChapterClick() {
      this.$router.push({
        path: this.nextPath,
      })
    },
  },
}
</script>
