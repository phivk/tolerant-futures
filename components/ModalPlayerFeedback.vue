<template> 
  <div>
    <form>
      <input type="text" id="fname" name="fname"><br><br>
    </form>
  </div>
</template>

<script>
export default {
    methods: {

    },
}
</script>

<style scoped lang="scss">

div {
  width: 60%;
  height: 600px;
  position: absolute;
  z-index: $z-5;
  border-radius: $border-radius-2;
  padding: $offset-3;  
  background-color: rgba(255, 255, 255, .5);
  @supports ((-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px))) {
    background-color: rgba(255, 255, 255, .3);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  form {
    width: 100%;
    height: 100%;

    input {
      background: none;
      outline: none;
      width: 100%;
      appearance: none; 
      -moz-appearance: none; 
      -webkit-appearance: none; 
      border: none;

      &:focus {
        outline: none;
      }
    }
  }


}
</style>
