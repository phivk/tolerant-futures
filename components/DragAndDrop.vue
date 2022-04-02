<template>
  <section class="w-100 pa3 flex flex-column items-center">
    <div class="w-100 vh-100 relative">
      <div
        class="w-100 mv3 center bg-lightest-blue pa1 h4"
        @drop="onDrop"
        @dragenter.prevent
        @dragover.prevent
      ></div>
      <div
        class="drag-el w5 h4 ba flex justify-center items-center br3 absolute pointer"
        :class="isDragging ? 'rotate' : ''"
        draggable="true"
        :style="styleObject"
        @dragstart="startDrag"
        @dragend="endDrag"
      >
        Test Div
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isDragging: false,
      styleObject: {
        left: '800px',
        top: '500px',
        translate: '-50% -50%',
      },
    }
  },
  methods: {
    getList(list) {
      return this.items.filter((item) => item.list === list)
    },
    startDrag(event) {
      /* eslint-disable */
      console.log('event', event)
      this.isDragging = true
    },
    endDrag(event) {
      /* eslint-disable */
      console.log('event', event)
      this.isDragging = false
    },
    onDrop(event) {
      /* eslint-disable */
      console.log('event', event)
      this.setPosition(event.layerX, event.layerY)
    },
    setPosition(x, y) {
      this.styleObject.left = `${x}px`
      this.styleObject.top = `${y}px`
    },
  },
}
</script>
<style>
.min-h-3 {
  min-height: 1rem;
}
.drag-el {
  transition: all 0.2s ease-in-out;
}
/*.rotate-0 {
  transform: rotate(0deg) scale(1);
  box-shadow: none;
}*/
.rotate {
  transition: all 0.2s ease-in-out;
  transform: rotate(10deg) scale(1.2);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
}
</style>
