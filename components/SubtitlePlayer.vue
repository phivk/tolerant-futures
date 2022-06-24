<template>
  <p class="subtitle-player">
    <slot></slot>
  </p>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.subtitle-player {
  width: 100%;
  display: block;
  box-sizing: border-box;
  padding-left: $offset-7;
  padding-right: $offset-7;
  text-align: center;
  color: $white-color;
  font-size: $f-1;
  filter: $caption-shadow-effect;
  line-height: 2.8rem;

  @media (max-width: $query-mobile) {
    font-size: $f-4;
    line-height: $f-4;
    padding-left: $offset-3;
    padding-right: $offset-3;
  }

  @media (min-width: $query-mobile) and (max-width:$query-mobile-landscape) {
    padding-left: $offset-3;
    padding-right: $offset-3;
  }

  @media (min-width: $query-mobile) and (max-width:$query-mobile-landscape) and (orientation: landscape) {
      font-size: $f-5;
      line-height: $f-5;
      padding-left: $offset-2;
      padding-right: $offset-2;  
    }  

}
</style>
