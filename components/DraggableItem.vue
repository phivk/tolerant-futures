<template>
  <div
    ref="myDraggable"
    class="draggable"
    :class="{ 'not-draggable': draggingDisabled }"
  >
    <slot></slot>
  </div>
</template>

<script>
import interact from 'interactjs'

export default {
  name: 'DraggableItem',
  props: {
    draggingDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      screenX: 0,
      screenY: 0,
      value: null,
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
          // endOnly: true,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        },
        // enable autoScroll
        autoScroll: false,

        // call this function on every dragmove event
        onmove: this.dragMoveListener,
        // call this function on every dragend event
        onend: this.onDragEnd,
      })
    },
    dragMoveListener(event) {
      if (!this.draggingDisabled) {
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

        this.$emit('set-drag-state', 'placing')
      }
    },
    onDragEnd(event) {
      // update the state
      const boundingClientRect = event.target.getBoundingClientRect()
      this.screenX = boundingClientRect.left
      this.screenY = boundingClientRect.top
      if (event.relatedTarget) {
        // dropped on dropzone
        const value =
          this.screenX / (window.innerWidth - boundingClientRect.width)
        event.target.setAttribute('data-value', value.toFixed(2))
        this.value = value
        this.$emit('set-value', value)
        this.$emit('set-drag-state', 'placed-spectrum')
      } else if (!this.isOutOfBounds(boundingClientRect)) {
        // dropped outside of dropzone
        this.value = null
        this.$emit('set-value', null)
        this.$emit('set-drag-state', 'placed')
      } else {
        // occasional displacement outside of screen: fix by reset
        this.resetPosition()
      }
    },
    isOutOfBounds(boundingClientRect) {
      return (
        boundingClientRect.left >
          window.innerWidth - boundingClientRect.width ||
        boundingClientRect.left < 0 ||
        boundingClientRect.top >
          window.innerHeight - boundingClientRect.height ||
        boundingClientRect.top < 0
      )
    },
    resetPosition() {
      const myDraggable = this.$refs.myDraggable

      // translate the element
      myDraggable.style.webkitTransform = myDraggable.style.transform =
        'translate(' + 0 + 'px, ' + 0 + 'px)'

      // update the posiion attributes
      myDraggable.setAttribute('data-x', 0)
      myDraggable.setAttribute('data-y', 0)

      // update the state
      this.screenX = 0
      this.screenY = 0

      this.$emit('set-drag-state', 'placed')
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.draggable {
  position: absolute;
  z-index: $z-5;

  &.not-draggable {
    cursor: default !important;
  }
}
</style>
