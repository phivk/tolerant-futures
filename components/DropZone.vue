<template>
  <div ref="myDropZone" class="dropzone">
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
    const myDropZone = this.$refs.myDropZone
    this.initInteract(myDropZone)
  },
  methods: {
    initInteract(selector) {
      const that = this
      interact(selector).dropzone({
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,

        // listen for drop related events:

        ondropactivate(event) {
          // add active dropzone feedback
          event.target.classList.add('drop-active')
        },
        ondragenter(event) {
          // const draggableElement = event.relatedTarget
          const dropzoneElement = event.target

          // feedback the possibility of a drop
          dropzoneElement.classList.add('drop-target')
          // draggableElement.classList.add('can-drop')
          that.$emit('set-can-drop', true)
        },
        ondragleave(event) {
          // remove the drop feedback style
          event.target.classList.remove('drop-target')
          event.target.classList.remove('drop-received')
          that.$emit('set-can-drop')
          // event.relatedTarget.classList.remove('can-drop')
          // event.relatedTarget.classList.remove('dropped')
        },
        ondrop(event) {
          event.target.classList.add('drop-received')
          // event.relatedTarget.classList.add('dropped')
        },
        ondropdeactivate(event) {
          // remove active dropzone feedback
          event.target.classList.remove('drop-active')
          event.target.classList.remove('drop-target')
        },
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
<style scoped lang="scss">
.dropzone {
  margin: 10px auto 30px;
  padding: 10px;
  transition: background-color 0.3s;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $drop-zone-height;
  width: 100%;
  // z-index: $z-1;
}
.drop-active {
  border-color: #aaa;
}
.drop-target {
  // background-color: #29e;
  border-color: blue;
  border-style: solid;
}
.drop-received {
  border-color: green;
  border-style: solid;
}
</style>
