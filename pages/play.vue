<template>
  <div class="flex flex-column justify-between items-center tc vh-100">
    <h1>{{ title }}</h1>
    <SpectrumGame :turns="playTurns" :next-path="nextPath" />
    <!-- <DragAndDrop></DragAndDrop> -->
    <!-- <DropZone class="w-100 h-25"></DropZone>
    <DraggableItem>
      <CardItem>Boudica</CardItem>
    </DraggableItem> -->
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
      nextPath: '/future',
    }
  },
}
</script>
