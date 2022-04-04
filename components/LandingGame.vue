<template>
  <section
    class="w-100 h-100 relative flex flex-column justify-between items-center"
  >
    <DropZone class="w-25 min-w5 h-25 flex justify-center items-center">
      Drop
    </DropZone>
    <DraggableItem ref="draggableItem" class="bottom-2" @set-value="onSetValue">
      <CardItem>Drag</CardItem>
    </DraggableItem>
    <TheFooter>
      <div v-if="turnValue !== null">
        <div>Well done!</div>
        <button @click="onNextChapter">Next Chapter</button>
      </div>
    </TheFooter>
  </section>
</template>

<script>
export default {
  props: {
    nextPath: {
      type: String,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      turnValue: null,
    }
  },
  methods: {
    onNextChapter() {
      this.$router.push({
        path: this.nextPath,
      })
    },
    onSetValue(value) {
      this.turnValue = value
    },
  },
}
</script>
<style>
.min-w5 {
  min-width: 16rem;
}
</style>
