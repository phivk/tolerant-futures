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
<<<<<<< HEAD
        this.$emit('stateChange', 'dragging')        
=======

>>>>>>> f7ceb34c823da8b87d59f1c4e6f22f4b1131142b
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
      }
    },
    onDragEnd(event) {
      // update the state
      const boundingClientRect = event.target.getBoundingClientRect()
      this.screenX = boundingClientRect.left
      this.screenY = boundingClientRect.top

      if (event.relatedTarget) { 
        this.$emit('stateChange', 'passive')                     
        // dropped on dropzone!
        const cardWidth = boundingClientRect.width
        const value = this.screenX / (window.innerWidth - cardWidth)
        event.target.setAttribute('data-value', value.toFixed(2))
        this.value = value
        this.$emit('set-value', value)
      } else {
        this.value = null
        this.$emit('set-value', null)
      }
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
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.draggable {
  position: absolute;
  z-index: $z-3;

  &.not-draggable {
    cursor: default !important;
  }

  /* TO DO: add dragged class to this component while it's being dragged */
  &.dragged {
    //filter: $draggable-item-shadow-effect-active;
  }

  &.can-drop {
    //box-shadow: 0 0 40px 20px rgba(255, 255, 255, 0.8);
    filter: $draggable-item-shadow-effect-can-drop
            $draggable-item-shadow-effect-can-drop;
    //filter: $draggable-item-shadow-effect-active;
  }

  &.dropped {
  }
}
</style>
