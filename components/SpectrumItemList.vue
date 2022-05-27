<template>
  <ul class="spectra-container">
    <li v-for="input in spectra" :key="input.id">
      <SpectrumItem
        :color-a="input.colorA"
        :color-b="input.colorB"
        :spectrum-position="input.value"
      >
        <SpectrumName>{{ input.spectrumLeft }}</SpectrumName>
        <SpectrumName>{{ input.spectrumRight }}</SpectrumName>
      </SpectrumItem>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    spectra: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style scoped lang="scss">
.spectra-container {
  width: 100%;
  list-style: none;
  padding-bottom: $offset-4;

  li {
    margin-bottom: $offset-4;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
