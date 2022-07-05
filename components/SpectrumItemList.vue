<template>
  <ul class="spectra-container">
    <li v-for="input in spectra" :key="input.id">
      <SpectrumItem
        :color-a="input.colorA"
        :color-b="input.colorB"
        :spectrum-position="input.value"
      >
        <SpectrumName class="spectrum-name-left">{{
          input.spectrumLeft
        }}</SpectrumName>
        <SpectrumName class="spectrum-name-right">{{
          input.spectrumRight
        }}</SpectrumName>
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

  @media (max-width: $query-mobile-landscape) and (orientation: landscape) {
    padding-bottom: $offset-1;
  }

  .spectrum-name-left {
    text-align: left;
  }

  .spectrum-name-right {
    text-align: right;
  }

  li {
    margin-bottom: $offset-4;

    @media (max-width: $query-mobile-landscape) and (orientation: landscape) {
      margin-bottom: $offset-2;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
