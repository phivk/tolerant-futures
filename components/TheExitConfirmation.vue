<template>
  <div
    class="w-100 h-100 bg-white-90 absolute top-0 z-999 flex justify-center items-center"
  >
    <ModalTextRevealer
      class="tc mw7"
      :is-hidden="false"
    >
      <div class="lh-copy">
        Are you sure you want to leave? <br>
        All your progress will be lost.
      </div>
      <div class="mv3">
        <ButtonPrimary @buttonClicked="onStay">Stay</ButtonPrimary>
        <ButtonSecondary @buttonClicked="onLeave">Leave</ButtonSecondary>
      </div>
    </ModalTextRevealer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // isIdle: false,
    }
  },
  methods: {
    onStay() {
      this.$emit('stay', {})
    },
    onLeave() {
      this.$emit('leave', {})
    },
  },
}
</script>
