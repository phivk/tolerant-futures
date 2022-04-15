<template>
  <section
    class="w-100 h-100 relative flex flex-column justify-between items-center white"
  >
    <h1>{{ title }}</h1>
    <p>{{ paragraph }}</p>

    <NuxtLink class="bg-white purple" :to="nextPath">{{ buttonText }}</NuxtLink>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: null,
    },
    paragraph: {
      type: String,
      required: true,
      default: null,
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Continue',
    },
    nextPath: {
      type: String,
      required: true,
      default: null,
    },
  },
}
</script>
