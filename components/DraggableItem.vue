<template>
  <div ref="myDraggable" class="draggable">
    <slot></slot>
  </div>
</template>

<script>
import interact from 'interactjs'

export default {
  name: 'DraggableItem',
  data() {
    return {
      screenX: 0,
      screenY: 0,
    }
  },
  mounted() {
    const myDraggable = this.$refs.myDraggable
    this.initInteract(myDraggable)
  },
  methods: {
    initInteract(selector) {
      interact(selector).draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
          restriction: 'parent',
          endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        onend: this.onDragEnd,
      })
    },
    dragMoveListener(event) {
      const target = event.target
      // keep the dragged position in the data-x/data-y attributes
      const x =
        (parseFloat(target.getAttribute('data-x')) || this.screenX) + event.dx
      const y =
        (parseFloat(target.getAttribute('data-y')) || this.screenY) + event.dy

      // translate the element
      target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
    },
    onDragEnd(event) {
      const target = event.target
      /* eslint-disable-next-line */
      console.log(target)
      // update the state
      this.screenX = target.getBoundingClientRect().left
      this.screenY = target.getBoundingClientRect().top
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.draggable {
  position: absolute;
}
.can-drop {
  border: solid 4px blue;
}
.dropped {
  border: solid 4px green;
}
</style>
